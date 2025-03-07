'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;
    
    const onMouseMove = (e: MouseEvent) => {
      // Main cursor follows mouse exactly
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      
      // Follower follows with some delay
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };
    
    // Handle hover states for interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
      });
      gsap.to(follower, {
        scale: 1.5,
        opacity: 0.2,
        duration: 0.3,
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      });
      gsap.to(follower, {
        scale: 1,
        opacity: 0.5,
        duration: 0.3,
      });
    };
    
    // Apply hover effects to interactive elements
    const links = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Listen for mouse movements
    window.addEventListener('mousemove', onMouseMove);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Clean up event listeners
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMouseMove);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  // Hide cursor on mobile devices
  const isMobile = typeof window !== 'undefined' && 
    (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i));
  
  if (isMobile) return null;
  
  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
};

export default AnimatedCursor; 