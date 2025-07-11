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
		
		// Send mail with defined transport object
		const info = await transporter.sendMail({
			from: `"Portfolio Contact Form" <${process.env.NODE_MAILER_USER}>`,
			to: process.env.NODE_MAILER_USER, // Send to yourself
			replyTo: email, // Set reply-to as the sender's email
			subject: `Portfolio Contact: ${subject}`,
			text: textContent,
			html: htmlContent,
		})
		
		console.log('Message sent: %s', info.messageId)
		
		return NextResponse.json(
			{ 
				success: true, 
				message: 'Email sent successfully!',
				messageId: info.messageId
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