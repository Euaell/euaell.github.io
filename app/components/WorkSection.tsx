'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, Eye, Filter } from 'lucide-react'

const categories = ['All', 'Web App', 'Mobile', 'API', 'Open Source']

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js, featuring real-time inventory, payment processing, and admin dashboard.',
    category: 'Web App',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/euaell/ecommerce',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Cross-platform mobile app for team collaboration and project management with real-time synchronization.',
    category: 'Mobile',
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/euaell/taskapp',
    featured: true
  },
  {
    id: 3,
    title: 'GraphQL API Gateway',
    description: 'Scalable GraphQL API gateway with microservices architecture, authentication, and rate limiting.',
    category: 'API',
    technologies: ['Node.js', 'GraphQL', 'Docker', 'Redis', 'PostgreSQL'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/euaell/graphql-gateway',
    featured: false
  },
  {
    id: 4,
    title: 'React Component Library',
    description: 'Open-source React component library with TypeScript support, Storybook documentation, and automated testing.',
    category: 'Open Source',
    technologies: ['React', 'TypeScript', 'Storybook', 'Jest', 'Rollup'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/euaell/react-components',
    featured: false
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'Modern portfolio website with smooth animations, dark mode, and responsive design.',
    category: 'Web App',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/euaell/portfolio',
    featured: false
  },
  {
    id: 6,
    title: 'Weather App',
    description: 'Beautiful weather application with location-based forecasts and interactive maps.',
    category: 'Mobile',
    technologies: ['Flutter', 'Dart', 'OpenWeather API', 'Maps'],
    image: '/api/placeholder/600/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/euaell/weather-app',
    featured: false
  }
]

export default function WorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const featuredProjects = projects.filter(project => project.featured)

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
            A collection of projects that showcase my skills and passion for creating innovative solutions
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
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="card-hover interactive-card group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">🚀</div>
                  </div>
                  
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4"
                  >
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass rounded-full text-white hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass rounded-full text-white hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-white/70 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center space-x-2 text-white/60 mb-4">
            <Filter size={18} />
            <span>Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            All Projects
          </h3>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="card-hover interactive-card group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-lg mb-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl">📱</div>
                    </div>
                    
                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-3"
                    >
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 glass rounded-full text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye size={16} />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 glass rounded-full text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={16} />
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white">{project.title}</h4>
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/5 rounded text-xs text-white/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/50">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-white/70 mb-8">
            Interested in working together? Let's create something amazing!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.a>
            <motion.a
              href="https://github.com/euaell"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All on GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 