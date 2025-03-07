'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling down a bit
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine which section is in view
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(navItems[index].id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <motion.div
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-[rgba(10,10,10,0.5)] backdrop-blur-lg p-3 rounded-full flex flex-col items-center space-y-4 border border-[rgba(255,255,255,0.05)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="relative p-2 rounded-full focus:outline-none group"
            aria-label={`Navigate to ${item.label} section`}
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/50'
                  : 'bg-gray-500'
              }`}
            />
            <span 
              className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded bg-[rgba(10,10,10,0.8)] text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingNav; 