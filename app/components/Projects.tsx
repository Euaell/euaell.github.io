'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import LinkIcon from './icons/LinkSVG';
import projectStyle from "./project.module.css";
import RepoSVG from './icons/RepoSVG';

interface ProjectItem {
  title: string;
  description: string;
  responsibilities: string[];
  tags?: string[]; // Optional tags
  link?: string;
  githubLink?: string; // Optional GitHub link
  image?: string; // Optional image URL
}

const projects: ProjectItem[] = [
	{
		title: 'Mekdim - School Portal',
		description: '',
		responsibilities: [
			'Actively engaged in the requirements, design, coding, and testing phase of the software.',
			'Managed a team of 26 during the requirement phase of the development, to design a reliable system.',
			'Developed and tested more than 2000 lines of back-end code in the development and testing phase.',
		],
		tags: ['ExpressJS', 'React', 'MongoDB'],
		githubLink: 'https://github.com/NathanZK/Mekdim'
	},
	{
		title: "Tic Tac Toe Game",
		description: "A simple Tic Tac Toe game built with React and NestJS.",
		responsibilities: [
			"Developed the front-end using React and the back-end using NestJS.",
			"Implemented the game logic using Socket.io for real-time communication.",
			"Use Redis for caching and storing game state.",
			"Deployed the application on Google Cloud Platform.",
		],
		link: "https://euaell.github.io/tick_tack_toe",
		githubLink: 'https://github.com/Euaell/tick_tack_toe',
		tags: ["React", "NestJS", "Socket.io", "Redis", "Docker"],
	},
	{
		title: 'Car Dealership Website',
		description:
		'The program optimizes inventory management and transaction tracking for auto dealers, monitoring goods and financial exchanges, and enables customer searches for preferred car models.',
		responsibilities: [],
		tags: ['React', 'Node.js', 'MySQL'],
		githubLink: 'https://github.com/Euaell/Car-Dealership'
	},
	{
		title: 'Wordcloud Generator',
		description: 'The program generates word clouds from a text file, with the size of each word indicating its frequency in the text.',
		responsibilities: [],
		link: 'https://euaell.github.io/word_counter',
		githubLink: 'https://github.com/Euaell/word_counter',
		tags: ['React', 'react-d3-cloud', 'Next.js'],
	},
	// Add more projects if needed
]

const projectsVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.3 },
	},
	exit: { opacity: 0, transition: { duration: 0.6 } },
}

export default function Projects(): React.ReactElement {
	return (
		<motion.section
			id="projects"
			className="py-16 bg-slate-200"
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={projectsVariants}
		>
			<div className="container mx-auto px-6 lg:px-20 projects">
				<h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Projects</h2>
				<div className={projectStyle.projects_scroll_bar}>
					<div className="flex space-x-6">
						{projects.map((project, index) => (
							<div
								key={index}
								className="relative group flex-shrink-0 w-80 bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
							>
								<h3 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h3>
								<p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>

								{project.responsibilities.length > 0 && (
									<ul className="list-disc list-inside text-gray-700 space-y-2">
										{project.responsibilities.map((item, idx) => (
											<li key={idx}>{item}</li>
										))}
									</ul>
								)}

								{/* Overlay */}
								{(project.link || project.image || project.githubLink) && (
									<div
										className="absolute inset-0 flex items-center justify-center bg-slate-700 bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
									>
										{project.link && 
											<Link
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-white text-center px-4"
											>
												<div className="flex items-center justify-center rounded-full px-4 py-2 shadow-xl hover:shadow-2xl bg-slate-500 hover:bg-slate-600 transition-colors duration-300">
													{/* SVG Icon */}
													<LinkIcon width={16} height={20} fillColor='#fff' />
													<span className="text-lg font-semibold ml-1">Visit</span>
												</div>
											</Link>
										}

										{project.githubLink && 
											<Link
												href={project.githubLink}
												target="_blank"
												rel="noopener noreferrer"
												className="text-white text-center px-4"
											>
												<div className="flex items-center justify-center rounded-full px-4 py-2 shadow-xl hover:shadow-2xl bg-slate-500 hover:bg-slate-600 transition-colors duration-300">
													{/* SVG Icon */}
													<RepoSVG width={20} height={24} fillColor='#fff' />
													<span className="text-lg font-semibold ml-1">Repo</span>
												</div>
											</Link>
										}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</motion.section>
	)
}
