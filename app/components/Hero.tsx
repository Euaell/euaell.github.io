'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import AnimatedText from './AnimatedText';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    // Set initial animation state
    gsap.set('.float-element', { opacity: 0, scale: 0 });
    
    // Animate floating elements around profile
    gsap.to('.float-element', {
      opacity: 0.6,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
    
    // Create floating animation for elements
    gsap.to('.float-element', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      rotation: 'random(-15, 15)',
      duration: 'random(3, 6)',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
    });
  }, []);
  
  // Magnetic effect for social icons
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, strength = 25) => {
    const { currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    const moveX = (x - centerX) / centerX * strength;
    const moveY = (y - centerY) / centerY * strength;
    
    gsap.to(currentTarget, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };
  
  return (
    <section ref={containerRef} className="hero-section">
      <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Text content */}
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <AnimatedText
            text="Hello, I'm"
            animation="words"
            tag="h2"
            className="text-xl font-light text-gray-400 mb-3"
          />
          
          <AnimatedText
            text="Euael M. Eshete"
            animation="chars" 
            tag="h1"
            staggerValue={0.03}
            delay={0.2}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-syne"
          />
          
          <AnimatedText
            text="Computer Engineer & Python Developer"
            animation="words"
            tag="h3"
            staggerValue={0.04}
            delay={0.6}
            className="text-xl text-gradient bg-gradient-to-r from-[var(--accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent font-medium mb-6"
          />
          
          <AnimatedText
            text="I'm a passionate software developer with expertise in AI-driven applications and responsive web design, currently pursuing a Master's degree at Addis Ababa University."
            animation="lines"
            tag="p"
            delay={1}
            className="text-gray-300 text-lg max-w-lg leading-relaxed mb-8"
          />
          
          {/* Social links with magnetic effect */}
          <div className="flex gap-6">
            <motion.a
              href="https://github.com/euaell"
              target="_blank"
              rel="noreferrer"
              className="magnetic-element text-white text-2xl p-2 hover:text-[var(--accent)] transition-colors relative"
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <FaGithub />
            </motion.a>
            
            <motion.a
              href="https://linkedin.com/in/euael-mekonen"
              target="_blank"
              rel="noreferrer"
              className="magnetic-element text-white text-2xl p-2 hover:text-[var(--accent)] transition-colors relative"
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <FaLinkedin />
            </motion.a>
            
            <motion.a
              href="https://twitter.com/euael_mekonen"
              target="_blank"
              rel="noreferrer"
              className="magnetic-element text-white text-2xl p-2 hover:text-[var(--accent)] transition-colors relative"
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <FaTwitter />
            </motion.a>
          </div>
        </div>
        
        {/* Profile image with animated elements */}
        <div ref={imageContainerRef} className="lg:w-1/2 flex justify-center">
          <motion.div 
            className="profile-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Floating elements */}
            <div className="float-element bg-[var(--accent)] w-12 h-12 top-0 left-10 opacity-0" />
            <div className="float-element bg-[var(--secondary-accent)] w-8 h-8 bottom-12 left-0 opacity-0" />
            <div className="float-element bg-[var(--accent)] w-10 h-10 top-20 right-0 opacity-0" />
            <div className="float-element bg-[var(--secondary-accent)] w-14 h-14 bottom-0 right-16 opacity-0" />
            
            {/* Profile image */}
            <div className="profile-image w-[280px] h-[280px] relative">
              <Image
                src="/images/profile.jpg"
                alt="Euael M. Eshete"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 