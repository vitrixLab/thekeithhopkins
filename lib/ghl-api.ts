/**
 * GoHighLevel API Integration
 * 
 * This module provides functions to interact with the GoHighLevel API
 * for creating contacts and triggering workflows.
 */

const BASE_URL = process.env.GOHIGHLEVEL_BASE_URL || 'https://rest.gohighlevel.com';

function getApiKey(): string {
  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  if (!apiKey || apiKey === 'your_ghl_api_key_here') {
    throw new Error('GOHIGHLEVEL_API_KEY is not configured. Please set it in .env.local');
  }
  return apiKey;
}

export interface GHLContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  [key: string]: unknown;
}

export interface GHLWorkflowTriggerInput {
  leadId: string;
  email: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown;
}

export interface GHLResponse {
  success?: boolean;
  id?: string;
  [key: string]: unknown;
}

/**
 * Creates a contact in GoHighLevel
 * @param {GHLContactInput} contactData - Contact information
 * @returns {Promise<GHLResponse>} - API response
 */
export async function createGHLContact(contactData: GHLContactInput): Promise<GHLResponse> {
  const apiKey = getApiKey();
  const endpoint = '/v1/contact';
  const url = `${BASE_URL}${endpoint}`;
  
  const payload = {
    firstName: contactData.firstName,
    lastName: contactData.lastName,
    email: contactData.email,
    phone: contactData.phone,
    address: contactData.address,
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`GHL API Error: ${response.status} - ${(errorData as { message?: string })?.message || response.statusText}`);
  }
  
  return response.json();
}

/**
 * Triggers a GoHighLevel workflow
 * @param {string} workflowId - The workflow ID to trigger
 * @param {GHLWorkflowTriggerInput} triggerData - Data to pass to the workflow
 * @returns {Promise<GHLResponse>} - API response
 */
export async function triggerGHLWorkflow(workflowId: string, triggerData: GHLWorkflowTriggerInput): Promise<GHLResponse> {
  const apiKey = getApiKey();
  const endpoint = `/v1/workflows/${workflowId}/trigger`;
  const url = `${BASE_URL}${endpoint}`;
  
  const payload = {
    ...triggerData,
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`GHL Workflow Trigger Error: ${response.status} - ${(errorData as { message?: string })?.message || response.statusText}`);
  }
  
  return response.json();
}

/**
 * Creates a contact and triggers a workflow for email notification
 * This is the main function to use when a form is submitted
 * @param {Object} formData - Form submission data
 * @param {string} workflowId - GHL workflow ID to trigger for email notification
 * @returns {Promise<{ contact: GHLResponse; workflow: GHLResponse }>} - Results from both operations
 */
export async function handleFormSubmission(
  formData: { firstName: string; lastName: string; email: string; phone?: string },
  workflowId: string
): Promise<{ contact: GHLResponse; workflow: GHLResponse }> {
  // 1. Create the contact
  const contactResult = await createGHLContact({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
  });
  
  // 2. Trigger the workflow for email notification
  const workflowResult = await triggerGHLWorkflow(workflowId, {
    leadId: (contactResult as { id?: string })?.id || '',
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
  });
  
  return {
    contact: contactResult,
    workflow: workflowResult,
  };
}

const ghlApi = {
  createGHLContact,
  triggerGHLWorkflow,
  handleFormSubmission,
};

export default ghlApi;