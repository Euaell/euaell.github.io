'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const socialLinks = [
	{ name: 'GitHub', icon: Github, href: 'https://github.com/euaell', color: 'hover:text-gray-300' },
	{ name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/euael', color: 'hover:text-blue-400' },
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
		<section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
			
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
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
					/>
				))}
			</div>

			{/* Main Content */}
			<div className="container-custom relative z-10">
				<div className="text-center max-w-4xl mx-auto">
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
						<span className="gradient-text">Euael</span>
					</motion.h1>

					{/* Title with rotating skills */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-xl md:text-2xl lg:text-3xl font-light mb-8 text-white/90"
					>
						<span>Full Stack Developer specializing in </span>
						<motion.span
							key={currentSkill}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
							className="gradient-text-primary font-semibold"
						>
							{skills[currentSkill]}
						</motion.span>
					</motion.div>

					{/* Description */}
					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
					>
						I create modern, scalable web applications with beautiful user experiences. 
						Passionate about clean code, innovative solutions, and continuous learning.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
					>
						<button
							onClick={scrollToAbout}
							className="btn-primary group cursor-pointer"
						>
							<span>Explore My Work</span>
							<ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
						</button>
						<Link
							href="#contact"
							className="btn-secondary group cursor-pointer"
						>
							<span>Get In Touch</span>
							<Mail size={18} className="ml-2 group-hover:scale-110 transition-transform" />
						</Link>
					</motion.div>

					{/* Social Links */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1 }}
						className="flex justify-center space-x-6 mb-16"
					>
						{socialLinks.map((social, index) => (
							<a
								key={social.name}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`p-3 glass rounded-full text-white/70 transition-all duration-300 hover:scale-110 cursor-pointer ${social.color}`}
							>
								<motion.div
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									<social.icon size={20} />
								</motion.div>
							</a>
						))}
					</motion.div>

					{/* Scroll Indicator */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.4 }}
						className="flex flex-col items-center"
					>
						<span className="text-white/50 text-sm mb-2">Scroll to explore</span>
						<motion.button
							onClick={scrollToAbout}
							animate={{ y: [0, 10, 0] }}
							transition={{ duration: 2, repeat: Infinity }}
							className="p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
						>
							<ArrowDown size={24} />
						</motion.button>
					</motion.div>
				</div>
			</div>

			{/* Floating Elements */}
			<div className="absolute top-20 left-10 animate-float">
				<div className="w-20 h-20 glass rounded-full flex items-center justify-center">
					<span className="text-2xl">⚡</span>
				</div>
			</div>
			<div className="absolute top-40 right-10 animate-float" style={{ animationDelay: '2s' }}>
				<div className="w-16 h-16 glass rounded-full flex items-center justify-center">
					<span className="text-xl">🚀</span>
				</div>
			</div>
			<div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
				<div className="w-12 h-12 glass rounded-full flex items-center justify-center">
					<span className="text-lg">💡</span>
				</div>
			</div>
		</section>
	)
} 