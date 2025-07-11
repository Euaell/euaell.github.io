import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Define the request body type
interface ContactFormData {
	name: string
	email: string
	subject: string
	message: string
}

// Create reusable transporter object using the default SMTP transport
const createTransporter = () => {
	return nodemailer.createTransport({
		host: process.env.NODE_MAILER_HOST,
		port: parseInt(process.env.NODE_MAILER_PORT || '465'),
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.NODE_MAILER_USER,
			pass: process.env.NODE_MAILER_PASS,
		},
	})
}

// Validate environment variables
const validateEnvVars = () => {
	const requiredVars = [
		'NODE_MAILER_HOST',
		'NODE_MAILER_PORT', 
		'NODE_MAILER_USER',
		'NODE_MAILER_PASS'
	]
	
	const missing = requiredVars.filter(varName => !process.env[varName])
	
	if (missing.length > 0) {
		throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
	}
}

// Validate form data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateFormData = (data: any): data is ContactFormData => {
	if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
		return false
	}
	
	if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
		return false
	}
	
	if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
		return false
	}
	
	if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
		return false
	}
	
	return true
}

export async function POST(request: NextRequest) {
	try {
		// Validate environment variables
		validateEnvVars()
		
		// Parse request body
		const body = await request.json()
		
		// Validate form data
		if (!validateFormData(body)) {
			return NextResponse.json(
				{ error: 'Invalid form data. Please check all required fields.' },
				{ status: 400 }
			)
		}
		
		const { name, email, subject, message }: ContactFormData = body
		
		// Create transporter
		const transporter = createTransporter()
		
		// Verify connection configuration
		await transporter.verify()
		
		// Prepare email content
		const htmlContent = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
				<div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
					<h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
					
					<div style="margin: 20px 0;">
						<h3 style="color: #555; margin-bottom: 5px;">From:</h3>
						<p style="margin: 0; padding: 10px; background-color: #f8f9fa; border-left: 4px solid #007bff;">
							<strong>${name}</strong><br>
							<a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
						</p>
					</div>
					
					<div style="margin: 20px 0;">
						<h3 style="color: #555; margin-bottom: 5px;">Subject:</h3>
						<p style="margin: 0; padding: 10px; background-color: #f8f9fa; border-left: 4px solid #28a745;">
							${subject}
						</p>
					</div>
					
					<div style="margin: 20px 0;">
						<h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
						<div style="margin: 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #17a2b8; white-space: pre-wrap; line-height: 1.6;">
							${message}
						</div>
					</div>
					
					<hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
					
					<p style="color: #666; font-size: 12px; margin: 0;">
						This message was sent from your portfolio contact form at ${new Date().toLocaleString()}.
					</p>
				</div>
			</div>
		`
		
		// Plain text version
		const textContent = `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from portfolio contact form at ${new Date().toLocaleString()}
		`.trim()
		
		// Send notification email to site owner
		const notificationInfo = await transporter.sendMail({
			from: `"Portfolio Contact Form" <${process.env.NODE_MAILER_USER}>`,
			to: process.env.NODE_MAILER_USER, // Send to yourself
			replyTo: email, // Set reply-to as the sender's email
			subject: `Portfolio Contact: ${subject}`,
			text: textContent,
			html: htmlContent,
		})
		

		// Prepare confirmation email content for sender
		const confirmationHtmlContent = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
				<div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
					<div style="text-align: center; margin-bottom: 30px;">
						<h1 style="color: #333; margin: 0; font-size: 28px;">Thank You for Reaching Out!</h1>
						<div style="width: 50px; height: 3px; background: linear-gradient(90deg, #007bff, #28a745); margin: 15px auto;"></div>
					</div>
					
					<p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
						Hi <strong>${name}</strong>,
					</p>
					
					<p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
						Thank you for contacting me through my portfolio website. I've received your message and I appreciate you taking the time to reach out.
					</p>
					
					<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #007bff; margin: 25px 0;">
						<h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Your Message Summary:</h3>
						<p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${subject}</p>
						<p style="margin: 5px 0; color: #666;"><strong>Message:</strong></p>
						<div style="background-color: white; padding: 15px; border-radius: 6px; margin-top: 10px; white-space: pre-wrap; line-height: 1.6; color: #555;">
							${message}
						</div>
					</div>
					
					<p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
						I typically respond within 24-48 hours. In the meantime, feel free to:
					</p>
					
					<div style="margin: 25px 0;">
						<p style="margin: 10px 0; color: #555;">
							• <a href="https://github.com/euaell" style="color: #007bff; text-decoration: none;">Check out my GitHub projects</a>
						</p>
						<p style="margin: 10px 0; color: #555;">
							• <a href="https://linkedin.com/in/euael-eshete/" style="color: #007bff; text-decoration: none;">Connect with me on LinkedIn</a>
						</p>
						<p style="margin: 10px 0; color: #555;">
							• <a href="https://portfolio.euaell.me" style="color: #007bff; text-decoration: none;">Explore more of my portfolio</a>
						</p>
					</div>
					
					<div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
						<p style="margin: 0; color: #0c5460; font-size: 16px; font-weight: 500;">
							🚀 Looking forward to our conversation!
						</p>
					</div>
					
					<hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
					
					<div style="text-align: center;">
						<p style="color: #666; font-size: 14px; margin: 0;">
							Best regards,<br>
							<strong style="color: #333;">Euael M. Eshete</strong><br>
							<span style="color: #666;">Full Stack Developer & AI Engineer</span>
						</p>
						<p style="color: #999; font-size: 12px; margin: 15px 0 0 0;">
							This is an automated confirmation email. Please do not reply to this email.
						</p>
					</div>
				</div>
			</div>
		`
		
		// Plain text version for confirmation email
		const confirmationTextContent = `
Hi ${name},

Thank you for contacting me through my portfolio website. I've received your message and I appreciate you taking the time to reach out.

Your Message Summary:
Subject: ${subject}
Message: ${message}

I typically respond within 24-48 hours. In the meantime, feel free to:
• Check out my GitHub projects: https://github.com/euaell
• Connect with me on LinkedIn: https://linkedin.com/in/euael-eshete/
• Explore more of my portfolio: https://portfolio.euaell.me

Looking forward to our conversation!

Best regards,
Euael M. Eshete
Full Stack Developer & AI Engineer

---
This is an automated confirmation email.
		`.trim()

		// Send confirmation email to sender
		const confirmationInfo = await transporter.sendMail({
			from: `"Euael M. Eshete" <${process.env.NODE_MAILER_USER}>`,
			to: email, // Send to the person who submitted the form
			subject: `Thank you for contacting me - Message received`,
			text: confirmationTextContent,
			html: confirmationHtmlContent,
		})
		
		return NextResponse.json(
			{ 
				success: true, 
				message: 'Emails sent successfully! You should receive a confirmation email shortly.',
				notificationId: notificationInfo.messageId,
				confirmationId: confirmationInfo.messageId
			},
			{ status: 200 }
		)
		
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error('Error sending email:', error)
		
		// Return appropriate error message
		if (error.message.includes('Missing required environment variables')) {
			return NextResponse.json(
				{ error: 'Server configuration error. Please try again later.' },
				{ status: 500 }
			)
		}
		
		if (error.code === 'EAUTH' || error.code === 'ENOTFOUND') {
			return NextResponse.json(
				{ error: 'Email service unavailable. Please try again later.' },
				{ status: 503 }
			)
		}
		
		return NextResponse.json(
			{ error: 'Failed to send email. Please try again later.' },
			{ status: 500 }
		)
	}
}

// Handle unsupported methods
export async function GET() {
	return NextResponse.json(
		{ error: 'Method not allowed' },
		{ status: 405 }
	)
} 