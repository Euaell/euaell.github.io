'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code, Database, Globe, Smartphone, Server, Zap, Calendar, MapPin, Building } from 'lucide-react'
import { experienceData } from '../data/experience'
import { educationData } from '../data/education'

const skills = [
	{
		category: 'Frontend',
		icon: Globe,
		technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vue.js'],
		color: 'from-sky-600 to-cyan-600'
	},
	{
		category: 'Backend',
		icon: Server,
		technologies: ['Node.js', 'Python', 'FastAPI', 'LiteStar', 'Express', 'NestJS'],
		color: 'from-green-500 to-emerald-500'
	},
	{
		category: 'Database',
		icon: Database,
		technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Supabase'],
		color: 'from-purple-500 to-violet-500'
	},
	{
		category: 'Mobile',
		icon: Smartphone,
		technologies: ['React Native', 'Expo', 'Flutter', 'iOS', 'Android'],
		color: 'from-pink-500 to-rose-500'
	},
	{
		category: 'AI/ML',
		icon: Zap,
		technologies: ['GPT', 'Mistral', 'Gemini', 'DALL-E', 'Stable Diffusion', 'LLMs'],
		color: 'from-orange-500 to-red-500'
	},
	{
		category: 'Tools',
		icon: Code,
		technologies: ['Git', 'Docker', 'WordPress', 'DHIS2', 'Socket.io', 'Jest'],
		color: 'from-indigo-500 to-blue-500'
	}
]

const stats = [
	{ label: 'Years Experience', value: new Date().getFullYear() - 2023, suffix: '+' },
	{ label: 'Projects Completed', value: 10, suffix: '+' },
	{ label: 'Technologies Mastered', value: 15, suffix: '+' },
	// { label: 'Happy Clients', value: 10, suffix: '+' }
]

export default function AboutSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))

	useEffect(() => {
		if (isInView) {
			stats.forEach((stat, index) => {
				let start = 0
				const end = stat.value
				const duration = 2000
				const increment = end / (duration / 16)

				const timer = setInterval(() => {
					start += increment
					if (start >= end) {
						start = end
						clearInterval(timer)
					}
					setAnimatedStats(prev => {
						const newStats = [...prev]
						newStats[index] = Math.floor(start)
						return newStats
					})
				}, 16)
			})
		}
	}, [isInView])

	return (
		<section id="about" className="pt-12 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />
			
			<div className="container-custom" ref={ref}>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						<span className="gradient-text">About Me</span>
					</h2>
					<p className="text-xl text-white/70 max-w-3xl mx-auto">
						Passionate full-stack developer specializing in AI-driven solutions and modern web technologies
					</p>
				</motion.div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="flex flex-col md:flex-row gap-6 mb-20 justify-center items-center"
				>
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.5 }}
							animate={isInView ? { opacity: 1, scale: 1 } : {}}
							transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
							className="text-center card w-full"
						>
							<div className="text-3xl md:text-4xl font-bold gradient-text-primary mb-2">
								{animatedStats[index]}{stat.suffix}
							</div>
							<div className="text-white/60 text-sm md:text-base">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>

				{/* Main Content */}
				<div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
					{/* Personal Story */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="space-y-6"
					>
						<h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
							My Journey
						</h3>
						<div className="space-y-4 text-white/80 leading-relaxed">
							<p>
								I&apos;m a Computer Engineering graduate from Addis Ababa University with a passion for 
								creating innovative digital solutions. My journey in software development has taken me 
								from building 3D printers and CNC machines to developing AI-driven conversational agents.
							</p>
						</div>
					</motion.div>

					{/* Profile Image Placeholder */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.6 }}
						className="relative"
					>
						<div className="relative w-full max-w-md mx-auto">
							{/* Decorative Elements */}
							<div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
							<div className="relative glass-card rounded-2xl p-8 text-center">
								<div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
									<div className="text-6xl">👨‍💻</div>
								</div>
								<h4 className="text-xl font-semibold text-white mb-2">Euael M. Eshete</h4>
								<p className="text-white/60">Full Stack Developer</p>
								<div className="mt-4 flex justify-center space-x-2">
									<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
									<span className="text-sm text-white/60">Available for work</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Experience Timeline */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="mb-20"
				>
					<h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
						Professional Experience
					</h3>
					<div className="space-y-8">
						{experienceData.map((experience, index) => (
							<motion.div
								key={experience.title}
								initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
								className="card-hover interactive-card py-6 px-8 rounded-lg"
							>
								<div className="flex flex-col md:flex-row gap-6">
									<div className="md:w-1/3">
										<div className="flex items-center gap-2 text-blue-400 mb-2">
											<Calendar size={16} />
											<span className="text-sm font-medium">{experience.date}</span>
										</div>
										<div className="flex items-center gap-2 text-white/60 mb-2">
											<MapPin size={16} />
											<span className="text-sm">{experience.location}</span>
										</div>
									</div>
									<div className="md:w-2/3">
										<h4 className="text-lg font-semibold text-white mb-1">{experience.title}</h4>
										<div className="flex items-center gap-2 text-purple-400 mb-3">
											<Building size={16} />
											<span className="text-sm font-medium">{experience.subtitle}</span>
										</div>
										<ul className="space-y-2">
											{experience.description.map((desc, idx) => (
												<li key={idx} className="text-white/70 text-sm flex items-start">
													<span className="text-blue-400 mr-2 mt-1">•</span>
													{desc}
												</li>
											))}
										</ul>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Education */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 1.4 }}
					className="mb-20"
				>
					<h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
						Education
					</h3>
					<div className="max-w-2xl mx-auto">
						{educationData.map((education, index) => (
							<motion.div
								key={education.title}
								initial={{ opacity: 0, y: 30 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
								className="card-hover interactive-card py-6 px-8 rounded-lg"
							>
								<div className="text-center">
									<div className="flex justify-center items-center gap-2 text-blue-400 mb-2">
										<Calendar size={16} />
										<span className="text-sm font-medium">{education.date}</span>
									</div>
									<h4 className="text-xl font-semibold text-white mb-2">{education.title}</h4>
									<div className="flex justify-center items-center gap-2 text-purple-400 mb-4">
										<Building size={16} />
										<span className="font-medium">{education.subtitle}</span>
									</div>
									<div className="flex justify-center items-center gap-2 text-white/60 mb-4">
										<MapPin size={16} />
										<span className="text-sm">{education.location}</span>
									</div>
									<ul className="space-y-2 text-left max-w-md mx-auto">
										{education.description.map((desc, idx) => (
											<li key={idx} className="text-white/70 text-sm flex items-start">
												<span className="text-blue-400 mr-2 mt-1">•</span>
												{desc}
											</li>
										))}
									</ul>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Skills Grid */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 1.8 }}
					className="mb-16"
				>
					<h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
						Technical Skills
					</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{skills.map((skill, index) => (
							<motion.div
								key={skill.category}
								initial={{ opacity: 0, y: 30 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
								className="card-hover group py-6 px-8 rounded-lg"
							>
								<div className="text-center p-6">
									<div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${skill.color} mb-4 group-hover:scale-110 transition-transform`}>
										<skill.icon size={24} className="text-white" />
									</div>
									<h4 className="text-lg font-semibold text-white mb-4">{skill.category}</h4>
									<div className="flex flex-wrap gap-2 justify-center">
										{skill.technologies.map((tech) => (
											<span
												key={tech}
												className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 hover:bg-white/20 transition-colors"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Call to Action */}
				{/* <motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 2.2 }}
					className="text-center"
				>
					<p className="text-xl text-white/70 mb-8">
						Ready to bring your ideas to life? Let&apos;s collaborate!
					</p>
					<Link
						href="#contact"
						className="btn-primary inline-flex items-center"
					>
						<span>Get In Touch</span>
						<span className="ml-2">→</span>
					</Link>
				</motion.div> */}
			</div>
		</section>
	)
}
