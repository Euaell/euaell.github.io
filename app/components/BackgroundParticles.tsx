'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface BackgroundParticlesProps {
  type: string;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ type }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Clear any existing animations
      ref.current.innerHTML = '';

      if (type === 'about') {
        // Floating bubbles
        for (let i = 0; i < 20; i++) {
          const bubble = document.createElement('div');
          bubble.classList.add('bubble');
          ref.current.appendChild(bubble);
        }

        anime({
          targets: '.bubble',
          translateY: () => anime.random(50, -800),
          translateX: () => anime.random(-400, 400),
          scale: () => anime.random(0.5, 1.5),
          opacity: [0, 1],
          easing: 'easeOutQuad',
          duration: 5000,
          delay: anime.stagger(100),
          loop: false,
        });
      } else if (type === 'experience') {
        // Diagonal lines
        for (let i = 0; i < 15; i++) {
          const line = document.createElement('div');
          line.classList.add('diagonal-line');
          ref.current.appendChild(line);
        }

        anime({
          targets: '.diagonal-line',
          translateX: [0, 1200],
          translateY: [0, 800],
          easing: 'easeInOutQuad',
          duration: 9000,
          delay: anime.stagger(230),
          loop: true,
        });
      } else {
        // Create particle elements
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle', `${type}-particle`);
            ref.current.appendChild(particle);
        }

        // Define animations based on type
        anime({
            targets: `.${type}-particle`,
            translateX: () => anime.random(-200, 2000),
            translateY: () => anime.random(-200, 2000),
            scale: () => anime.random(0.5, 1.5),
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            duration: 2000,
            delay: anime.stagger(50),
            loop: true,
            direction: 'alternate',
        });
    }
    }
  }, [type]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      {/* Particles will be appended here */}
    </div>
  );
};

export default BackgroundParticles;
