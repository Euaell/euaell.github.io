'use client';

import { useRef, useState, ReactNode, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.5)',
  intensity = 15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetPosition = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    // Store target position and schedule RAF update
    targetPosition.current = { x: xPct, y: yPct };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updateMousePosition);
    }
  };

  const updateMousePosition = () => {
    mouseX.set(targetPosition.current.x);
    mouseY.set(targetPosition.current.y);
    rafRef.current = null;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    targetPosition.current = { x: 0, y: 0 };
    mouseX.set(0);
    mouseY.set(0);

    // Cancel any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-2xl blur-xl opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mouseX.get() * 100 + 50}% ${
              mouseY.get() * 100 + 50
            }%, ${glowColor}, transparent)`,
            opacity: isHovering ? 0.6 : 0,
          }}
        />

        {/* Card content */}
        <div
          className="relative w-full h-full"
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          {children}
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mouseX.get() * 100 + 50}% ${
              mouseY.get() * 100 + 50
            }%, rgba(255, 255, 255, 0.2), transparent 50%)`,
            opacity: isHovering ? 1 : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
