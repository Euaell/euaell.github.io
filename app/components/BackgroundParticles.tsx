'use client';

import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface BackgroundParticlesProps {
  type: string;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ type }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      // Clear any existing animations
      ref.current.innerHTML = '';

      if (type === 'about') {
        // Create floating bubbles with improved visuals
        for (let i = 0; i < 30; i++) {
          const bubble = document.createElement('div');
          bubble.classList.add('bubble');
          bubble.style.opacity = '0';
          
          // Add more variety to bubbles
          const size = anime.random(10, 30);
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          
          // Add a subtle glow effect
          bubble.style.boxShadow = `0 0 ${size/2}px rgba(0, 122, 255, 0.3)`;
          
          ref.current.appendChild(bubble);
        }

        // Animate bubbles with more dynamic movement
        anime({
          targets: '.bubble',
          translateY: () => anime.random(-200, -1000),
          translateX: () => anime.random(-500, 500),
          scale: [0, () => anime.random(0.5, 1.5)],
          opacity: [0, 0.7, 0],
          easing: 'easeOutSine',
          duration: () => anime.random(4000, 8000),
          delay: anime.stagger(100),
          loop: true,
          complete: (anim) => {
            // Reset and replay for continuous effect
            anim.restart();
          }
        });
      } else if (type === 'experience') {
        // Create diagonal lines with modern aesthetics
        for (let i = 0; i < 20; i++) {
          const line = document.createElement('div');
          line.classList.add('diagonal-line');
          
          // Style variations
          const width = anime.random(1, 3);
          line.style.width = `${width}px`;
          line.style.height = `${anime.random(200, 500)}px`;
          line.style.opacity = '0';
          
          ref.current.appendChild(line);
        }

        // Advanced animation pattern
        anime({
          targets: '.diagonal-line',
          translateX: [
            { value: 0, duration: 0 },
            { value: 1500, duration: 6000, easing: 'easeInOutQuad' }
          ],
          translateY: [
            { value: -100, duration: 0 },
            { value: 1000, duration: 6000, easing: 'easeInOutQuad' }
          ],
          rotate: () => anime.random(30, 60) + 'deg',
          opacity: [
            { value: 0, duration: 0 },
            { value: 0.7, duration: 1000 },
            { value: 0, duration: 1000, delay: 4000 }
          ],
          delay: anime.stagger(200),
          loop: true
        });
      } else {
        // Create interactive particles
        for (let i = 0; i < 60; i++) {
          const particle = document.createElement('div');
          particle.classList.add('particle', `${type}-particle`);
          
          // More variety in size
          const size = anime.random(5, 15);
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          
          // Starting positions
          particle.style.left = `${anime.random(0, 100)}%`;
          particle.style.top = `${anime.random(0, 100)}%`;
          particle.style.opacity = '0';
          
          ref.current.appendChild(particle);
        }

        // Create interactive effect when mouse moves
        const handleInteraction = () => {
          if (ref.current && isActive) {
            const particles = ref.current.querySelectorAll(`.${type}-particle`);
            particles.forEach((particle, i) => {
              const rect = particle.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              
              // Calculate distance from mouse
              const dx = mousePosition.x - centerX;
              const dy = mousePosition.y - centerY;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // Apply subtle movement away from cursor
              if (distance < 200) {
                const angle = Math.atan2(dy, dx);
                const force = (200 - distance) / 10;
                
                anime({
                  targets: particle,
                  translateX: `+=${Math.cos(angle) * -force}`,
                  translateY: `+=${Math.sin(angle) * -force}`,
                  duration: 500,
                  easing: 'easeOutQuad'
                });
              }
            });
          }
        };

        // Set up interval for interaction checks
        const interactionInterval = setInterval(handleInteraction, 100);
        
        // Clear interval on cleanup
        return () => clearInterval(interactionInterval);
      }
    }
    
    // Set active after initial animation
    setTimeout(() => setIsActive(true), 2000);
  }, [type]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Particles will be appended here */}
    </div>
  );
};

export default BackgroundParticles;
