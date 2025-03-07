'use client';

import { useEffect } from 'react';
import SmoothScroll from '@/app/components/SmoothScroll';
import Hero from '@/app/components/Hero';
import ModernTimeline from '@/app/components/ModernTimeline';
import ProjectsGrid from '@/app/components/ProjectsGrid';
import ModernContact from '@/app/components/ModernContact';
import { experienceData } from '@/app/data/experience';
import { educationData } from '@/app/data/education';
import { projectsData } from '@/app/data/projects';
import FloatingNav from '@/app/components/FloatingNav';

export default function Home() {
  // Initialize GSAP plugins and configurations
  useEffect(() => {
    // Ensure smooth scrolling on page load
    window.scrollTo(0, 0);
    
    // Clean up when component unmounts
    return () => {
      // Any cleanup needed
    };
  }, []);

  return (
    <SmoothScroll>
      <main className="main-container">
        <FloatingNav />
        <Hero />
        
        <ModernTimeline 
          items={experienceData} 
          title="Professional Experience" 
        />
        
        <ModernTimeline 
          items={educationData} 
          title="Education" 
        />
        
        <ProjectsGrid 
          projects={projectsData} 
          title="Featured Projects" 
        />
        
        <ModernContact />
        
        {/* Other sections will be added in upcoming steps */}
      </main>
    </SmoothScroll>
  );
}
