'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const ProfilePictureAnimation: React.FC = () => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationRef.current) {
      // Clear any previous content
      animationRef.current.innerHTML = '';

      // Create particles
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.classList.add('orbiting-particle');
        animationRef.current.appendChild(particle);
      }

      // Animate particles in a circular orbit
      anime({
        targets: '.orbiting-particle',
        translateX: function (el: unknown, i: number) {
          const angle = (i / 12) * 360;
          return 120 * Math.cos((angle * Math.PI) / 180);
        },
        translateY: function (el: unknown, i: number) {
          const angle = (i / 12) * 360;
          return 120 * Math.sin((angle * Math.PI) / 180);
        },
        rotate: '1turn',
        easing: 'linear',
        duration: 2000,
        delay: anime.stagger(100),
        loop: false,
      });

      anime({
        targets: ".profile-animation",
        rotate: '1turn',
        easing: 'linear',
        duration: 5000,
        loop: true,
      })
    }
  }, []);

  return (
    <div
      ref={animationRef}
      className="profile-animation absolute inset-0 flex -z-10 justify-center items-center pointer-events-none"
    ></div>
  );
};

export default ProfilePictureAnimation;
