'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { projectsData } from '../data/projects'
import Link from 'next/link'

// Separate featured projects (with live links) from smaller projects
const featuredProjects = projectsData.filter(project => project.featured)
const smallerProjects = projectsData.filter(project => !project.featured)

// All unique technologies from projects
const allTechnologies = Array.from(
	new Set(projectsData.flatMap(project => project.tags))
).sort()

export default function WorkSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const [selectedTech, setSelectedTech] = useState<string>('All')
	
	const filteredProjects = selectedTech === 'All' 
		? smallerProjects 
		: smallerProjects.filter(project => 
				project.tags.some(tag => tag.toLowerCase().includes(selectedTech.toLowerCase()))
			)

	const techFilters = ['All', ...allTechnologies.slice(0, 8)] // Limit to top 8 technologies

	return (
		<section id="work" className="section-padding relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
			
			<div className="container-custom" ref={ref}>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						<span className="gradient-text">My Work</span>
					</h2>
					<p className="text-xl text-white/70 max-w-3xl mx-auto">
						A collection of projects that showcase my skills in full-stack development, 
						from web applications to AI-driven solutions.
					</p>
				</motion.div>

				{/* Featured Projects */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mb-20"
				>
					<h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
						Featured Projects
					</h3>
					<div className="grid lg:grid-cols-2 gap-8">
						{featuredProjects.map((project, index) => (
							<motion.div
								key={project.title}
								initial={{ opacity: 0, y: 30 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
								className="card-hover interactive-card group"
							>
								{/* Project Image */}
								<div className="relative overflow-hidden rounded-lg mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 aspect-video">
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="text-4xl">🚀</div>
									</div>
									
									{/* Overlay with links */}
									<div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
										{project.link && (
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="p-3 glass rounded-full text-white hover:scale-110 transition-transform"
												title="View Live Site"
											>
												<ExternalLink size={20} />
											</a>
										)}
										<a
											href={project.repositoryLink}
											target="_blank"
											rel="noopener noreferrer"
											className="p-3 glass rounded-full text-white hover:scale-110 transition-transform"
											title="View Source Code"
										>
											<Github size={20} />
										</a>
									</div>
								</div>

								{/* Project Details */}
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<h4 className="text-xl font-semibold text-white">{project.title}</h4>
										<span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
											Featured
										</span>
									</div>
									
									<p className="text-white/70 leading-relaxed">
										{project.description}
									</p>

									{project.responsibilities.length > 0 && (
										<div className="space-y-2">
											<h5 className="text-sm font-semibold text-white/90">Key Features:</h5>
											<ul className="text-sm text-white/60 space-y-1">
												{project.responsibilities.slice(0, 3).map((responsibility, idx) => (
													<li key={idx} className="flex items-start">
														<span className="text-blue-400 mr-2">•</span>
														{responsibility}
													</li>
												))}
											</ul>
										</div>
									)}
									
									<div className="flex flex-wrap gap-2">
										{project.tags.map((tech) => (
											<span
												key={tech}
												className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/60 hover:bg-white/10 transition-colors"
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

				{/* Technology Filter */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="flex flex-wrap justify-center gap-4 mb-12"
				>
					<div className="flex items-center space-x-2 text-white/60 mb-4">
						<span>Filter by technology:</span>
					</div>
					<div className="flex flex-wrap gap-2">
						{techFilters.map((tech) => (
							<button
								key={tech}
								onClick={() => setSelectedTech(tech)}
								className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
									selectedTech === tech
										? 'bg-blue-500 text-white'
										: 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
								}`}
							>
								{tech}
							</button>
						))}
					</div>
				</motion.div>

				{/* Other Projects Grid */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
						Other Projects
					</h3>
					
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredProjects.map((project, index) => (
							<motion.div
								key={project.title}
								initial={{ opacity: 0, y: 30 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
								className="card-hover interactive-card group"
							>
								{/* Project Image */}
								<div className="relative overflow-hidden rounded-lg mb-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 aspect-video">
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="text-2xl">📱</div>
									</div>
									
									{/* Overlay with links */}
									<div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
										<a
											href={project.repositoryLink}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2 glass rounded-full text-white hover:scale-110 transition-transform"
											title="View Source Code"
										>
											<Github size={16} />
										</a>
									</div>
								</div>

								{/* Project Details */}
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<h4 className="font-semibold text-white">{project.title}</h4>
										<span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
											Project
										</span>
									</div>
									
									<p className="text-white/60 text-sm leading-relaxed line-clamp-2">
										{project.description || 'A comprehensive project showcasing modern development practices and technologies.'}
									</p>
									
									<div className="flex flex-wrap gap-1">
										{project.tags.slice(0, 3).map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 bg-white/5 rounded text-xs text-white/50"
											>
												{tech}
											</span>
										))}
										{project.tags.length > 3 && (
											<span className="px-2 py-1 bg-white/5 rounded text-xs text-white/50">
												+{project.tags.length - 3} more
											</span>
										)}
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 1.2 }}
					className="text-center mt-16"
				>
					<p className="text-xl text-white/70 mb-8">
						Interested in working together? Let&apos;s create something amazing!
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="#contact"
							className="btn-primary cursor-pointer"
						>
							Start a Project
						</Link>
						<a
							href="https://github.com/euaell"
							target="_blank"
							rel="noopener noreferrer"
							className="btn-secondary cursor-pointer"
						>
							View All Projects
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	)
} 