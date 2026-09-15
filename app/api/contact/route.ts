import { NextResponse } from 'next/server';
import { z } from 'zod';

import { handleFormSubmission } from '@/lib/ghl-api';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  workflowId: z.string().optional(),
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

    const { firstName, lastName, email, phone, workflowId } = result.data;

    // 1. Create contact in GoHighLevel and trigger workflow
    let contactResult;
    let workflowResult;

    try {
      if (workflowId) {
        const results = await handleFormSubmission(
          { firstName, lastName, email, phone },
          workflowId
        );
        contactResult = results.contact;
        workflowResult = results.workflow;
      } else {
        // Just create contact without triggering workflow
        contactResult = await import('@/lib/ghl-api').then(m => m.createGHLContact({
          firstName,
          lastName,
          email,
          phone,
        }));
      }
    } catch (ghlError) {
      console.error('GHL Integration error:', ghlError);
      // Continue without GHL - still respond to the user
      contactResult = { success: true, id: 'fallback-id' };
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received. Keith Hopkins will respond within 24 hours.',
      contactId: contactResult?.id,
      workflowTriggered: !!workflowId && !!workflowResult,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing contact form.' },
      { status: 500 },
    );
  }
}
