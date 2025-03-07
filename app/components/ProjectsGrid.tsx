'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import AnimatedText from './AnimatedText';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

interface ProjectsGridProps {
  projects: Project[];
  title: string;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, title }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !cardsRef.current) return;
    
    // Create staggered animation for project cards
    const cards = Array.from(cardsRef.current.children);
    
    gsap.fromTo(cards,
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8 
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-20 bg-[#090909] relative" id="projects">
      <div className="container mx-auto px-6">
        <AnimatedText
          text={title}
          tag="h2"
          animation="chars"
          staggerValue={0.02}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        />
        
        <div 
          ref={cardsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div key={index} className="opacity-0">
              <Card3D
                title={project.title}
                description={project.description}
                image={project.image}
                link={project.link}
                tags={project.tags}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid; 