'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  revealDirection?: 'left' | 'right' | 'top' | 'bottom' | 'center';
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  revealDirection = 'left',
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;

    if (!container || !image || !overlay) return;

    const clipPaths = {
      left: {
        from: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      right: {
        from: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      top: {
        from: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      bottom: {
        from: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      center: {
        from: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
    };

    const clipPath = clipPaths[revealDirection];

    gsap.set(image, { clipPath: clipPath.from });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(image, {
      clipPath: clipPath.to,
      duration: 1.2,
      ease: 'power3.inOut',
    }).to(
      overlay,
      {
        scaleX: 0,
        duration: 1,
        ease: 'power3.inOut',
      },
      '<0.2'
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [revealDirection]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imageRef} className="relative w-full h-full">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 origin-left"
      />
    </div>
  );
}
