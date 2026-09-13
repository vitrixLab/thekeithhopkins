import { NextResponse } from 'next/server';
import { z } from 'zod';

const auditSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid work email address'),
  company: z.string().min(2, 'Company name is required'),
  website: z.string().url().optional().or(z.literal('')),
  currentRevenue: z.string().min(1, 'Revenue range is required'),
  primaryBottleneck: z.string().min(1, 'Primary bottleneck is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = auditSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = result.data;

    // Optional webhook integration (GoHighLevel / LeadConnector / Zapier / Slack)
    const webhookUrl = process.env.AUDIT_WEBHOOK_URL || process.env.GHL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'thekeithhopkins.com - Fill My Pipeline Audit',
            ...data,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (webhookErr) {
        console.error('Audit webhook forward error:', webhookErr);
      }
    } else {
      console.log('Pipeline audit request received:', data);
    }

    return NextResponse.json({
      success: true,
      message: 'Pipeline audit request received successfully.',
    });
  } catch (error) {
    console.error('Audit Lead API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing audit request.' },
      { status: 500 },
    );
  }
}
