'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NoiseBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create floating gradient blobs
  useEffect(() => {
    if (!containerRef.current) return;

    // Create gradient blobs
    const colors = ['#6337ff', '#00ffd5', '#fb30ff'];
    const blobs: HTMLElement[] = [];

    for (let i = 0; i < 3; i++) {
      const blob = document.createElement('div');
      blob.className = 'gradient-blob';
      blob.style.background = colors[i % colors.length];
      blob.style.left = `${Math.random() * 80}%`;
      blob.style.top = `${Math.random() * 80}%`;
      containerRef.current.appendChild(blob);
      blobs.push(blob);
    }

    // Animate blobs
    blobs.forEach((blob, index) => {
      gsap.to(blob, {
        x: `random(-20, 20, 5)%`,
        y: `random(-20, 20, 5)%`,
        duration: 10 + index * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    return () => {
      // Cleanup
      blobs.forEach(blob => {
        if (blob.parentNode) {
          blob.parentNode.removeChild(blob);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="noise-effect"></div>
      <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"></div>
    </>
  );
};

export default NoiseBackground; 