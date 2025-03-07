'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { Project } from '@/app/data/projects';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectsGridProps {
  projects: Project[];
  title: string;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, title }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!horizontalRef.current || !sectionRef.current) return;
    
    const horizontalSection = horizontalRef.current;
    const sectionWidth = horizontalSection.scrollWidth;
    
    // Create horizontal scrolling effect
    gsap.to(horizontalSection, {
      x: () => -(sectionWidth - window.innerWidth + 80), // Add some padding
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${sectionWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
    
    // Animate cards on scroll
    projectRefs.current.forEach((card) => {
      if (!card) return;
      
      gsap.fromTo(card, 
        { 
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "left center",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects]);
  
  // Initialize projectRefs array with the correct length
  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projects.length);
  }, [projects]);
  
  return (
    <section ref={sectionRef} className="py-20 bg-[#090909] relative overflow-hidden" id="projects">
      <div className="container mx-auto px-6">
        <AnimatedText
          text={title}
          tag="h2"
          animation="chars"
          staggerValue={0.02}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        />
      </div>
      
      <div className="relative w-full">
        {/* Horizontal scroll container */}
        <div 
          ref={horizontalRef}
          className="horizontal-scroll flex items-stretch pl-6 md:pl-20 gap-6 md:gap-8 will-change-transform"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                if (el) projectRefs.current[index] = el;
              }}
              className="project-card flex-shrink-0 w-80 md:w-96 h-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-[rgba(20,20,20,0.5)] backdrop-blur-sm rounded-xl overflow-hidden h-full flex flex-col border border-[rgba(255,255,255,0.05)]">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  
                  {project.description && (
                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  )}
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-auto mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="text-xs px-2 py-1 rounded-full bg-[rgba(99,55,255,0.1)] text-[var(--accent)]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[rgba(255,255,255,0.1)] text-gray-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-4 mt-2">
                    <a 
                      href={project.repositoryLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                      aria-label={`View ${project.title} GitHub repository`}
                    >
                      <FaGithub className="mr-1" /> GitHub
                    </a>
                    
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:text-[var(--secondary-accent)] transition-colors flex items-center"
                        aria-label={`Visit ${project.title} website`}
                      >
                        <FaExternalLinkAlt className="mr-1" /> Visit
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Add spacer at the end for better scrolling */}
          <div className="flex-shrink-0 w-20 md:w-40"></div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute right-6 bottom-4 text-gray-400 text-sm flex items-center animate-pulse">
          <span className="mr-2">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid; 