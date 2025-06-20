'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react'

const contactInfo = [
	{
		icon: Mail,
		label: 'Email',
		value: 'euaelmeko@gmail.com',
		href: 'mailto:euaelmeko@gmail.com',
		color: 'from-red-500 to-pink-500'
	},
	{
		icon: Phone,
		label: 'Phone',
		value: '+251 91 234 5678',
		href: 'tel:+251912345678',
		color: 'from-green-500 to-emerald-500'
	},
	{
		icon: MapPin,
		label: 'Location',
		value: 'Addis Ababa, Ethiopia',
		href: 'https://maps.google.com/?q=Addis+Ababa,Ethiopia',
		color: 'from-blue-500 to-cyan-500'
	}
]

const socialLinks = [
	{
		name: 'GitHub',
		icon: Github,
		href: 'https://github.com/euaell',
		color: 'hover:text-gray-300'
	},
	{
		name: 'LinkedIn',
		icon: Linkedin,
		href: 'https://linkedin.com/in/euael',
		color: 'hover:text-blue-400'
	},
	{
		name: 'Twitter',
		icon: Twitter,
		href: 'https://twitter.com/euael',
		color: 'hover:text-sky-400'
	}
]

interface FormData {
	name: string
	email: string
	subject: string
	message: string
}

interface FormErrors {
	name?: string
	email?: string
	subject?: string
	message?: string
}

export default function ContactSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		subject: '',
		message: ''
	})
	
	const [errors, setErrors] = useState<FormErrors>({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {}

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required'
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email'
		}

		if (!formData.subject.trim()) {
			newErrors.subject = 'Subject is required'
		}

		if (!formData.message.trim()) {
			newErrors.message = 'Message is required'
		} else if (formData.message.trim().length < 10) {
			newErrors.message = 'Message must be at least 10 characters'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!validateForm()) return

		setIsSubmitting(true)
		setSubmitStatus('idle')

		try {
			// Create mailto link with form data
			const subject = encodeURIComponent(formData.subject)
			const body = encodeURIComponent(`Hello Euael,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`)
			const mailtoLink = `mailto:euaelmeko@gmail.com?subject=${subject}&body=${body}`
			
			// Open email client
			window.location.href = mailtoLink
			
			setSubmitStatus('success')
			setFormData({ name: '', email: '', subject: '', message: '' })
		} catch {
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		
		// Clear error when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors(prev => ({ ...prev, [name]: undefined }))
		}
	}

	return (
		<section id="contact" className="section-padding relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent" />
			
			<div className="container-custom" ref={ref}>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						<span className="gradient-text">Get In Touch</span>
					</h2>
					<p className="text-xl text-white/70 max-w-3xl mx-auto">
						Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-16">
					{/* Contact Information */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
								Let&apos;s Start a Conversation
							</h3>
							<p className="text-white/70 leading-relaxed mb-8">
								I&apos;m always interested in hearing about new projects and opportunities. 
								Whether you&apos;re a company looking to hire, or you&apos;re a fellow developer 
								wanting to collaborate, I&apos;d love to hear from you.
							</p>
						</div>

						{/* Contact Info Cards */}
						<div className="space-y-4">
							{contactInfo.map((info, index) => (
								<motion.a
									key={info.label}
									href={info.href}
									target={info.href.startsWith('http') ? '_blank' : undefined}
									rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
									initial={{ opacity: 0, y: 20 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
									className="flex items-center p-4 card-hover group cursor-pointer"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<div className={`p-3 rounded-lg bg-gradient-to-r ${info.color} mr-4 group-hover:scale-110 transition-transform`}>
										<info.icon size={20} className="text-white" />
									</div>
									<div>
										<h4 className="font-semibold text-white">{info.label}</h4>
										<p className="text-white/60">{info.value}</p>
									</div>
								</motion.a>
							))}
						</div>

						{/* Social Links */}
						<div>
							<h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
							<div className="flex space-x-4">
								{socialLinks.map((social, index) => (
									<motion.a
										key={social.name}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										initial={{ opacity: 0, scale: 0 }}
										animate={isInView ? { opacity: 1, scale: 1 } : {}}
										transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
										className={`p-3 glass rounded-full text-white/70 transition-all duration-300 hover:scale-110 cursor-pointer ${social.color}`}
										whileHover={{ y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<social.icon size={20} />
									</motion.a>
								))}
							</div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="card"
					>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="name" className="block text-sm font-medium text-white mb-2">
										Name *
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
											errors.name ? 'border-red-500' : 'border-white/20 focus:border-blue-500'
										}`}
										placeholder="Your full name"
									/>
									{errors.name && (
										<p className="mt-1 text-sm text-red-400">{errors.name}</p>
									)}
								</div>

								<div>
									<label htmlFor="email" className="block text-sm font-medium text-white mb-2">
										Email *
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
											errors.email ? 'border-red-500' : 'border-white/20 focus:border-blue-500'
										}`}
										placeholder="your.email@example.com"
									/>
									{errors.email && (
										<p className="mt-1 text-sm text-red-400">{errors.email}</p>
									)}
								</div>
							</div>

							<div>
								<label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
									Subject *
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
										errors.subject ? 'border-red-500' : 'border-white/20 focus:border-blue-500'
									}`}
									placeholder="What's this about?"
								/>
								{errors.subject && (
									<p className="mt-1 text-sm text-red-400">{errors.subject}</p>
								)}
							</div>

							<div>
								<label htmlFor="message" className="block text-sm font-medium text-white mb-2">
									Message *
								</label>
								<textarea
									id="message"
									name="message"
									rows={6}
									value={formData.message}
									onChange={handleChange}
									className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
										errors.message ? 'border-red-500' : 'border-white/20 focus:border-blue-500'
									}`}
									placeholder="Tell me about your project or just say hello!"
								/>
								{errors.message && (
									<p className="mt-1 text-sm text-red-400">{errors.message}</p>
								)}
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
							>
								{isSubmitting ? (
									<div className="flex items-center justify-center">
										<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
										Sending...
									</div>
								) : (
									<div className="flex items-center justify-center">
										<Send size={18} className="mr-2" />
										Send Message
									</div>
								)}
							</button>

							{/* Status Messages */}
							{submitStatus === 'success' && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="flex items-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
								>
									<CheckCircle size={20} className="text-green-400 mr-3" />
									<span className="text-green-300">
										Your email client should open shortly. Thank you for reaching out!
									</span>
								</motion.div>
							)}

							{submitStatus === 'error' && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
								>
									<AlertCircle size={20} className="text-red-400 mr-3" />
									<span className="text-red-300">
										Something went wrong. Please try again or contact me directly.
									</span>
								</motion.div>
							)}
						</form>
					</motion.div>
				</div>

				{/* Additional Contact Methods */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="text-center mt-16"
				>
					<p className="text-white/60 mb-4">
						Prefer a different way to connect?
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="https://linkedin.com/in/euael"
							target="_blank"
							rel="noopener noreferrer"
							className="btn-secondary cursor-pointer"
						>
							Connect on LinkedIn
						</a>
						<a
							href="https://github.com/euaell"
							target="_blank"
							rel="noopener noreferrer"
							className="btn-secondary cursor-pointer"
						>
							View My GitHub
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
