'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

export default function ParallaxElement({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const yPercent = direction === 'vertical' ? speed * 100 : 0;
    const xPercent = direction === 'horizontal' ? speed * 100 : 0;

    // Store the animation to access its ScrollTrigger
    const animation = gsap.to(element, {
      yPercent,
      xPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Cleanup: kill only this specific ScrollTrigger to prevent memory leaks
    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
