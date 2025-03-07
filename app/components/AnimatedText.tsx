'use client';

import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import SplitType from 'split-type';
import { gsap } from 'gsap';

interface AnimatedTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  once?: boolean;
  threshold?: number;
  animation?: 'chars' | 'words' | 'lines' | 'fade';
  staggerValue?: number;
  delay?: number;
  duration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  tag = 'div',
  className = '',
  once = true,
  threshold = 0.2,
  animation = 'chars',
  staggerValue = 0.02,
  delay = 0,
  duration = 0.7,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  });

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    
    // Use SplitType to split the text into characters, words, or lines
    const splitText = new SplitType(element, { 
      types: ['chars', 'words', 'lines'],
      tagName: 'span'
    });
    
    // Reset any previous animations
    gsap.set(element, { opacity: 1 });
    
    let targets: HTMLElement[] | HTMLDivElement | null = [];
    
    if (animation === 'chars') {
      targets = splitText.chars;
      gsap.set(targets, { opacity: 0, y: 50, rotateX: 90 });
    } else if (animation === 'words') {
      targets = splitText.words;
      gsap.set(targets, { opacity: 0, y: 30 });
    } else if (animation === 'lines') {
      targets = splitText.lines;
      gsap.set(targets, { opacity: 0, y: 20 });
    } else if (animation === 'fade') {
      targets = element;
      gsap.set(targets, { opacity: 0 });
    }
    
    // Define a function to animate the text
    const animateText = () => {
      if (animation === 'chars') {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: duration,
          stagger: staggerValue,
          delay: delay,
          ease: 'power3.out',
        });
      } else if (animation === 'words' || animation === 'lines') {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: duration,
          stagger: staggerValue,
          delay: delay,
          ease: 'power2.out',
        });
      } else if (animation === 'fade') {
        gsap.to(targets, {
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: 'power2.out',
        });
      }
    };
    
    // Reset if not in view
    if (!inView) {
      if (animation === 'chars') {
        gsap.set(targets, { opacity: 0, y: 50, rotateX: 90 });
      } else if (animation === 'words' || animation === 'lines') {
        gsap.set(targets, { opacity: 0, y: animation === 'words' ? 30 : 20 });
      } else if (animation === 'fade') {
        gsap.set(targets, { opacity: 0 });
      }
    } else {
      // Animate when in view
      animateText();
    }
    
    // Cleanup function
    return () => {
      splitText.revert();
    };
  }, [inView, animation, staggerValue, delay, duration]);

  const TagName = tag as keyof JSX.IntrinsicElements;

  return (
    // @ts-expect-error - ignore the type error for the ref
    <TagName ref={el => {
      // @ts-expect-error - both refs need to be set
      textRef.current = el;
      ref(el);
    }} className={`reveal-text ${className}`}>
      {text}
    </TagName>
  );
};

export default AnimatedText; 