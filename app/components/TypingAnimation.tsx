'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  className = '',
  speed = 50,
  startDelay = 500,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (!isInView) {
      setDisplayedText('');
      setCurrentIndex(0);
      return;
    }

    // Start typing effect after delay
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        const typingInterval = setInterval(() => {
          setDisplayedText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => {
            const nextIndex = prevIndex + 1;
            if (nextIndex >= text.length) {
              clearInterval(typingInterval);
            }
            return nextIndex;
          });
        }, speed);

        return () => clearInterval(typingInterval);
      }
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, currentIndex, speed, startDelay, isInView]);

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {displayedText}
      <span className="typing-cursor">|</span>
    </motion.div>
  );
};

export default TypingAnimation; 