'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code, Database, Globe, Smartphone, Server, Zap } from 'lucide-react'

const skills = [
  {
    category: 'Frontend',
    icon: Globe,
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    category: 'Backend',
    icon: Server,
    technologies: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    category: 'Database',
    icon: Database,
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase'],
    color: 'from-purple-500 to-violet-500'
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    technologies: ['React Native', 'Expo', 'Flutter', 'iOS', 'Android'],
    color: 'from-pink-500 to-rose-500'
  },
  {
    category: 'DevOps',
    icon: Zap,
    technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    color: 'from-orange-500 to-red-500'
  },
  {
    category: 'Tools',
    icon: Code,
    technologies: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest'],
    color: 'from-indigo-500 to-blue-500'
  }
]

const stats = [
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Projects Completed', value: 50, suffix: '+' },
  { label: 'Technologies Mastered', value: 20, suffix: '+' },
  { label: 'Happy Clients', value: 30, suffix: '+' }
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
    <section id="about" className="section-padding relative overflow-hidden">
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
            Passionate developer with a love for creating innovative solutions and beautiful user experiences
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center card"
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
                I started my journey in software development over 5 years ago, driven by curiosity 
                and a passion for solving complex problems. What began as a hobby quickly evolved 
                into a career focused on creating impactful digital solutions.
              </p>
              <p>
                I specialize in full-stack development, with expertise spanning modern frontend 
                frameworks, robust backend systems, and cloud infrastructure. I believe in writing 
                clean, maintainable code and creating user experiences that delight and inspire.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community. I'm 
                always eager to take on new challenges and collaborate on innovative projects.
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
                <h4 className="text-xl font-semibold text-white mb-2">Euael</h4>
                <p className="text-white/60">Full Stack Developer</p>
                <div className="mt-4 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-white/60">Available for work</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
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
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="card-hover interactive-card group"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} mr-4`}>
                    <skill.icon size={24} className="text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">{skill.category}</h4>
                </div>
                <div className="space-y-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 1.2 + index * 0.1 + techIndex * 0.05 }}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-white/80">{tech}</span>
                      <div className="skill-bar w-16">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${85 + Math.random() * 15}%` } : {}}
                          transition={{ duration: 1, delay: 1.5 + index * 0.1 + techIndex * 0.05 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center"
        >
          <p className="text-xl text-white/70 mb-8">
            Ready to bring your ideas to life? Let's work together!
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
} 