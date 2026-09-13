import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = result.data;

    // Optional webhook integration (GoHighLevel / LeadConnector / Zapier / Slack)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL || process.env.GHL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'thekeithhopkins.com - Contact Form',
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (webhookErr) {
        console.error('Webhook forward error:', webhookErr);
      }
    } else {
      console.log('Contact inquiry received:', { name, email, subject, message });
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received. Keith Hopkins will respond within 24 hours.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing contact form.' },
      { status: 500 },
    );
  }
}
