'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const socialLinks = [
	{ name: 'GitHub', icon: Github, href: 'https://github.com/euaell', color: 'hover:text-gray-300' },
	{ name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/euael-eshete/', color: 'hover:text-blue-400' },
	{ name: 'Email', icon: Mail, href: 'mailto:euaelmeko@gmail.com', color: 'hover:text-red-400' },
]

const skills = ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'AI/ML']

export default function HeroSection() {
	const [currentSkill, setCurrentSkill] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSkill((prev) => (prev + 1) % skills.length)
		}, 2000)
		return () => clearInterval(interval)
	}, [])

	const scrollToAbout = () => {
		document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<section 
			id="home" 
			className="relative h-screen pt-24 flex items-center justify-center overflow-hidden"
			aria-label="Hero section with introduction"
		>
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" aria-hidden="true" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" aria-hidden="true" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" aria-hidden="true" />
			
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden" aria-hidden="true">
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 bg-white/10 rounded-full"
						initial={{
							x: Math.random() * 1200,
							y: Math.random() * 800,
						}}
						animate={{
							x: Math.random() * 1200,
							y: Math.random() * 800,
						}}
						transition={{
							duration: Math.random() * 10 + 10,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
						aria-hidden="true"
					/>
				))}
			</div>

			{/* Main Content */}
			<div className="container-custom relative z-10">
				<header className="text-center max-w-4xl mx-auto">
					{/* Greeting */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-6"
					>
						<span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-white/80 mb-4">
							👋 Hello, I&apos;m
						</span>
					</motion.div>

					{/* Name */}
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow-lg"
					>
						<span className="gradient-text">Euael M. Eshete</span>
					</motion.h1>

					{/* Title with rotating skills */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-xl md:text-2xl lg:text-3xl font-light mb-8 text-white/90"
						role="banner"
						aria-live="polite"
						aria-label="Professional title and specialization"
					>
						<span>Full Stack Developer specializing in </span>
						<motion.span
							key={currentSkill}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
							className="gradient-text-primary font-semibold"
							aria-label={`Current specialty: ${skills[currentSkill]}`}
						>
							{skills[currentSkill]}
						</motion.span>
					</motion.div>

					{/* Description */}
					{/* <motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
					>
						I create modern, scalable web applications with beautiful user experiences. 
						Passionate about clean code, innovative solutions, and continuous learning.
					</motion.p> */}

					{/* CTA Buttons */}
					<motion.nav
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
						role="navigation"
						aria-label="Main call-to-action buttons"
					>
						<button
							onClick={scrollToAbout}
							className="btn-primary group flex justify-center items-center flex-row"
							aria-label="Explore my work and projects"
						>
							<span className='hidden md:inline'>Explore</span><span className='ml-1'> My Work</span>
							<ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
						</button>
						<Link
							href="#contact"
							className="btn-secondary group flex justify-center items-center flex-row"
							aria-label="Get in touch with me"
						>
							<span>Get In Touch</span>
							<Mail size={18} className="ml-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
						</Link>
					</motion.nav>

					{/* Social Links */}
					<motion.nav
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1 }}
						className="flex justify-center space-x-6 mb-8"
						role="navigation"
						aria-label="Social media links"
					>
						{socialLinks.map((social, index) => (
							<a
								key={social.name}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`p-3 glass rounded-full text-white/70 transition-all duration-300 hover:scale-110 ${social.color}`}
								aria-label={`Visit my ${social.name} profile`}
							>
								<motion.div
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									<social.icon size={20} aria-hidden="true" />
								</motion.div>
							</a>
						))}
					</motion.nav>

					{/* Scroll Indicator */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.4 }}
						className="flex flex-col items-center"
						role="button"
						aria-label="Scroll down to explore more content"
					>
						<span className="text-white/50 text-sm mb-2">Scroll to explore</span>
						<motion.button
							onClick={scrollToAbout}
							animate={{ y: [0, 10, 0] }}
							transition={{ duration: 2, repeat: Infinity }}
							className="p-2 text-white/50 hover:text-white transition-colors"
							aria-label="Scroll down to about section"
						>
							<ArrowDown size={24} aria-hidden="true" />
						</motion.button>
					</motion.div>
				</header>
			</div>

			{/* Floating Elements */}
			<div className="absolute top-20 left-10 animate-float" aria-hidden="true">
				<div className="w-20 h-20 glass rounded-full flex items-center justify-center">
					<span className="text-2xl" role="img" aria-label="lightning bolt">⚡</span>
				</div>
			</div>
			<div className="absolute top-40 right-10 animate-float" style={{ animationDelay: '2s' }} aria-hidden="true">
				<div className="w-16 h-16 glass rounded-full flex items-center justify-center">
					<span className="text-xl" role="img" aria-label="rocket">🚀</span>
				</div>
			</div>
			<div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }} aria-hidden="true">
				<div className="w-12 h-12 glass rounded-full flex items-center justify-center">
					<span className="text-lg" role="img" aria-label="light bulb">💡</span>
				</div>
			</div>
		</section>
	)
} 