'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: 'words' | 'chars' | 'lines';
}

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.02,
  type = 'words',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text into elements
    const text = children;
    let elements: string[] = [];

    switch (type) {
      case 'chars':
        elements = text.split('');
        break;
      case 'words':
        elements = text.split(' ');
        break;
      case 'lines':
        elements = text.split('\n');
        break;
    }

    // Create HTML with wrapped elements
    const wrappedHTML = elements
      .map((element, index) => {
        const content = element === '' ? '&nbsp;' : element;
        return `<span class="inline-block overflow-hidden"><span class="inline-block text-reveal-inner">${content}${
          type === 'words' && index < elements.length - 1 ? '&nbsp;' : ''
        }</span></span>`;
      })
      .join('');

    container.innerHTML = wrappedHTML;

    // Animate
    const innerElements = container.querySelectorAll('.text-reveal-inner');

    gsap.fromTo(
      innerElements,
      {
        y: '100%',
        opacity: 0,
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [children, delay, stagger, type]);

  return <div ref={containerRef} className={className} />;
}
