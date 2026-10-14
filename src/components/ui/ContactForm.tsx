import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  EMAIL_PATTERN,
  MAX_LENGTH,
  MIN_MESSAGE_LENGTH,
  type ContactField as FieldName,
  type ContactFormData as FormData,
} from '@/lib/contact';

type FormErrors = Partial<Record<FieldName, string>>;
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: FormData = { name: '', email: '', subject: '', message: '' };
const SUCCESS_RESET_MS = 5000;
const DEFAULT_ERROR = 'Failed to send message. Please try again or email me directly.';
const RATE_LIMITED_ERROR = 'Too many messages in a short time. Please wait a few minutes and try again.';

const FIELDS: {
  name: FieldName;
  label: string;
  type?: 'text' | 'email';
  autoComplete?: string;
  placeholder: string;
  multiline?: boolean;
}[] = [
  { name: 'name', label: 'Name', autoComplete: 'name', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'your.email@example.com' },
  { name: 'subject', label: 'Subject', placeholder: "What's this about?" },
  { name: 'message', label: 'Message', placeholder: 'Tell me about your project or question...', multiline: true },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = 'Name is required';

  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!EMAIL_PATTERN.test(data.email)) errors.email = 'Invalid email format';

  if (!data.subject.trim()) errors.subject = 'Subject is required';

  if (!data.message.trim()) errors.message = 'Message is required';
  else if (data.message.trim().length < MIN_MESSAGE_LENGTH)
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;

  return errors;
}

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white transition placeholder:text-white/40 focus:border-primary-400/60 focus:ring-2 focus:ring-primary-400/60 focus:outline-hidden aria-invalid:border-red-500/60 aria-invalid:ring-2 aria-invalid:ring-red-500';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR);

  useEffect(() => {
    if (status !== 'success') return;
    const timer = setTimeout(() => setStatus('idle'), SUCCESS_RESET_MS);
    return () => clearTimeout(timer);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);

    const firstInvalid = FIELDS.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`#${firstInvalid.name}`)?.focus();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setErrorMessage(response.status === 429 ? RATE_LIMITED_ERROR : DEFAULT_ERROR);
        setStatus('error');
        return;
      }

      setFormData(EMPTY_FORM);
      setStatus('success');
    } catch {
      setErrorMessage(DEFAULT_ERROR);
      setStatus('error');
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as FieldName;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {FIELDS.map(({ name, label, type = 'text', autoComplete, placeholder, multiline }) => {
        const error = errors[name];
        const errorId = `${name}-error`;
        const shared = {
          id: name,
          name,
          value: formData[name],
          onChange: handleChange,
          placeholder,
          autoComplete,
          maxLength: MAX_LENGTH[name],
          required: true,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
        };

        return (
          <div key={name}>
            <label htmlFor={name} className="mb-2 block text-xs tracking-caps text-white/60 uppercase">
              {label} <span aria-hidden="true">*</span>
            </label>
            {multiline ? (
              <textarea {...shared} rows={6} className={`${inputClass} resize-none`} />
            ) : (
              <input {...shared} type={type} className={inputClass} />
            )}
            {error && (
              <p id={errorId} className="mt-1 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full py-4 text-base font-semibold">
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="size-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      <div role="status" aria-live="polite">
        {status === 'success' && (
          <p className="glass-strong flex items-center gap-2 rounded-lg border-green-500/50 p-4 text-green-400">
            <svg className="size-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Message sent successfully! I'll get back to you soon.
          </p>
        )}
      </div>

      <div role="alert">
        {status === 'error' && (
          <p className="glass-strong flex items-center gap-2 rounded-lg border-red-500/50 p-4 text-red-400">
            <svg className="size-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
