// Shared by the contact form and /api/contact so client and server validate the same way

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactFormData;

export const CONTACT_FIELDS = ['name', 'email', 'subject', 'message'] as const satisfies readonly ContactField[];

export const MAX_LENGTH: Record<ContactField, number> = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
};

export const MIN_MESSAGE_LENGTH = 10;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
