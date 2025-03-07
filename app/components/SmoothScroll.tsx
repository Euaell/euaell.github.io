'use client';

import { ReactNode, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger when the window resizes
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });
    
    // Enable native smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', () => {});
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return <div className="smooth-scroll-container">{children}</div>;
};

export default SmoothScroll; 