import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function createTransporter() {
  const host = process.env.NODE_MAILER_HOST || 'smtp.gmail.com';
  const port = Number.parseInt(process.env.NODE_MAILER_PORT || '465', 10);
  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
  });
}

function validateFormData(data: any): data is ContactFormData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.subject === 'string' &&
    typeof data.message === 'string' &&
    data.name.trim().length > 0 &&
    data.email.trim().length > 0 &&
    data.subject.trim().length > 0 &&
    data.message.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  );
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate form data
    if (!validateFormData(body)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid form data',
          message: 'Please provide all required fields with valid data',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { name, email, subject, message } = body;

    // Create transporter and verify connection
    const transporter = createTransporter();

    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP connection error:', error);
      return new Response(
        JSON.stringify({
          error: 'Email service unavailable',
          message: 'Unable to connect to email service',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Email template for site owner
    const ownerMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.NODE_MAILER_USER}>`,
      to: process.env.NODE_MAILER_USER,
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                padding: 20px;
                border-radius: 8px 8px 0 0;
                color: white;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 5px;
              }
              .value {
                background: white;
                padding: 12px;
                border-radius: 4px;
                border-left: 4px solid #3b82f6;
              }
              .message-box {
                background: white;
                padding: 15px;
                border-radius: 4px;
                border-left: 4px solid #8b5cf6;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #6b7280;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from your portfolio contact form</p>
              <p>Sent at: ${new Date().toLocaleString()}</p>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent at: ${new Date().toLocaleString()}
      `,
    };

    // Confirmation email for sender
    const senderMailOptions = {
      from: `"Euael M. Eshete" <${process.env.NODE_MAILER_USER}>`,
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                padding: 20px;
                border-radius: 8px 8px 0 0;
                color: white;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .greeting {
                font-size: 18px;
                margin-bottom: 20px;
              }
              .message-preview {
                background: white;
                padding: 15px;
                border-radius: 4px;
                border-left: 4px solid #3b82f6;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2 style="margin: 0;">Thank You for Your Message!</h2>
            </div>
            <div class="content">
              <div class="greeting">
                Hi ${name},
              </div>
              <p>
                Thank you for reaching out! I've received your message and I'll get back to you as soon as possible.
              </p>
              <div class="message-preview">
                <strong>Your message:</strong><br/>
                "${message}"
              </div>
              <p>
                I typically respond within 24-48 hours. If your inquiry is urgent, feel free to connect with me on LinkedIn or Twitter.
              </p>
              <p>
                Best regards,<br/>
                <strong>Euael M. Eshete</strong><br/>
                Full Stack Developer & AI Engineer
              </p>
            </div>
            <div class="footer">
              <p>
                <a href="https://portfolio.euaell.me">portfolio.euaell.me</a> |
                <a href="https://github.com/euaell">GitHub</a> |
                <a href="https://www.linkedin.com/in/euael-eshete">LinkedIn</a>
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
Hi ${name},

Thank you for reaching out! I've received your message and I'll get back to you as soon as possible.

Your message:
"${message}"

I typically respond within 24-48 hours. If your inquiry is urgent, feel free to connect with me on LinkedIn or Twitter.

Best regards,
Euael M. Eshete
Full Stack Developer & AI Engineer

---
portfolio.euaell.me
GitHub: github.com/euaell
LinkedIn: linkedin.com/in/euael-eshete
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(senderMailOptions),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully!',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to send email',
        message: 'An unexpected error occurred. Please try again later.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// Disable prerendering for this API route (SSR only)
export const prerender = false;
