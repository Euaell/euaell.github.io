'use client';

import { useState, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../data/projects';
import Link from 'next/link';
import TiltCard from './TiltCard';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import { motion } from 'framer-motion';

const featuredProjects = projectsData.filter((project) => project.featured);
const smallerProjects = projectsData.filter((project) => !project.featured);

const allTechnologies = Array.from(new Set(projectsData.flatMap((project) => project.tags))).sort();

export default function WorkSectionNew() {
  const ref = useRef(null);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    selectedTech === 'All'
      ? smallerProjects
      : smallerProjects.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase().includes(selectedTech.toLowerCase()))
        );

  const techFilters = ['All', ...allTechnologies.slice(0, 8)];

  return (
    <section id="work" className="relative overflow-hidden section-padding">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-6 py-3 glass rounded-full text-sm font-medium border border-white/20">
                💼 Portfolio
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
              <TextReveal className="gradient-text inline-block" type="words">
                Selected Works
              </TextReveal>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
              Crafting digital experiences with passion and precision
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Projects - Bento Grid */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-32">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              <span className="gradient-text-primary">Featured Projects</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
              {featuredProjects.map((project, index) => {
                const isLarge = index === 0;
                const isTall = index === 1;

                return (
                  <ScrollReveal
                    key={project.title}
                    direction="scale"
                    delay={0.3 + index * 0.1}
                    className={`${isLarge ? 'md:col-span-2 md:row-span-2' : ''} ${
                      isTall ? 'md:row-span-2' : ''
                    }`}
                  >
                    <TiltCard
                      className="h-full"
                      glowColor={
                        index % 3 === 0
                          ? 'rgba(59, 130, 246, 0.5)'
                          : index % 3 === 1
                            ? 'rgba(139, 92, 246, 0.5)'
                            : 'rgba(236, 72, 153, 0.5)'
                      }
                    >
                      <div
                        className="glass-card rounded-3xl overflow-hidden h-full group cursor-pointer relative"
                        onMouseEnter={() => setHoveredProject(index)}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        {/* Background Gradient */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${
                            index % 3 === 0
                              ? 'from-blue-500/20 to-cyan-500/20'
                              : index % 3 === 1
                                ? 'from-purple-500/20 to-pink-500/20'
                                : 'from-pink-500/20 to-orange-500/20'
                          }`}
                        />

                        {/* Content */}
                        <div className="relative p-8 h-full flex flex-col justify-between">
                          {/* Header */}
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 inline-block mb-3">
                                  Featured
                                </span>
                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                  {project.title}
                                </h4>
                              </div>
                            </div>

                            <p className="text-white/70 leading-relaxed mb-6 line-clamp-3">
                              {project.description}
                            </p>

                            {/* Key Features - only for large cards */}
                            {isLarge && project.responsibilities.length > 0 && (
                              <div className="mb-6">
                                <h5 className="text-sm font-semibold text-white/90 mb-3">
                                  Key Features:
                                </h5>
                                <ul className="text-sm text-white/60 space-y-2">
                                  {project.responsibilities.slice(0, 3).map((responsibility, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="text-blue-400 mr-2">✓</span>
                                      {responsibility}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.slice(0, isLarge ? 6 : 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Links */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{
                                opacity: hoveredProject === index ? 1 : 0.6,
                                y: hoveredProject === index ? 0 : 10,
                              }}
                              transition={{ duration: 0.3 }}
                              className="flex gap-3"
                            >
                              <Link
                                href={project.repositoryLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 glass rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
                              >
                                <Github size={16} />
                                <span className="text-sm">Code</span>
                              </Link>
                              {project.link && (
                                <Link
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 glass rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
                                >
                                  <ExternalLink size={16} />
                                  <span className="text-sm">Demo</span>
                                </Link>
                              )}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Technology Filter */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {techFilters.map((tech) => (
                <MagneticButton
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                    selectedTech === tech
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                      : 'glass border border-white/20 text-white/70 hover:text-white hover:border-white/40'
                  }`}
                  strength={0.15}
                >
                  {tech}
                </MagneticButton>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Other Projects - Masonry Grid */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              More Projects
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ScrollReveal
                  key={project.title}
                  direction="up"
                  delay={0.6 + index * 0.05}
                  className="h-full"
                >
                  <TiltCard className="h-full" glowColor="rgba(59, 130, 246, 0.3)">
                    <div className="glass-card rounded-2xl overflow-hidden h-full group cursor-pointer hover:border-white/20 transition-all">
                      {/* Project Icon/Emoji */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 aspect-video flex items-center justify-center">
                        <div className="text-6xl">📱</div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Project Details */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-2">
                            {project.title}
                          </h4>
                          <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                            {project.description ||
                              'A comprehensive project showcasing modern development practices.'}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
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
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Link
                            href={project.repositoryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                          >
                            <Github size={14} />
                            <span>Code</span>
                          </Link>
                          {project.link && (
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                            >
                              <ExternalLink size={14} />
                              <span>Demo</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
