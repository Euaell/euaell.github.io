'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScrollContextProps {
  currentSection: string;
  progress: number;
  scrollTo: (sectionId: string) => void;
}

const ScrollContext = createContext<ScrollContextProps>({
  currentSection: 'about',
  progress: 0,
  scrollTo: () => {},
});

export const useScroll = () => useContext(ScrollContext);

interface ScrollAnimationProviderProps {
  children: ReactNode;
}

export default function ScrollAnimationProvider({ children }: ScrollAnimationProviderProps) {
  const [currentSection, setCurrentSection] = useState('about');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate overall scroll progress (0 to 1)
      const calculatedProgress = Math.min(scrollY / (documentHeight - windowHeight), 1);
      setProgress(calculatedProgress);
      
      // Determine which section is currently in view
      let currentSectionId = '';
      let maxVisibility = 0;
      
      sections.forEach((section) => {
        const sectionId = section.id;
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.getBoundingClientRect().height;
        
        // Calculate how much of the section is visible in the viewport
        let visibility = 0;
        if (sectionTop <= 0) {
          visibility = Math.min(Math.abs(sectionTop) < sectionHeight ? 1 - Math.abs(sectionTop) / sectionHeight : 0, 1);
        } else if (sectionTop <= windowHeight) {
          visibility = Math.min((windowHeight - sectionTop) / sectionHeight, 1);
        }
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          currentSectionId = sectionId;
        }
      });
      
      if (currentSectionId && currentSectionId !== currentSection) {
        setCurrentSection(currentSectionId);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  const scrollTo = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
  };

  return (
    <ScrollContext.Provider value={{ currentSection, progress, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
} 