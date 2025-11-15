'use client';

import { useRef, useState, ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.3,
  ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const targetPosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Store target position and schedule RAF update
    targetPosition.current = { x: deltaX, y: deltaY };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  };

  const updatePosition = () => {
    setPosition(targetPosition.current);
    rafRef.current = null;
  };

  const handleMouseLeave = () => {
    targetPosition.current = { x: 0, y: 0 };
    setPosition({ x: 0, y: 0 });

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

  const Component = href ? 'a' : 'button';
  const linkProps = href
    ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined }
    : {};
  const buttonProps = !href ? { onClick, type: 'button' as const } : {};
  const accessibilityProps = ariaLabel ? { 'aria-label': ariaLabel } : {};

  return (
    <div ref={buttonRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <Component
          {...linkProps}
          {...buttonProps}
          {...accessibilityProps}
          className={`magnetic relative inline-flex items-center justify-center overflow-hidden group ${className}`}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          <span className="relative z-10">{children}</span>

          {/* Ripple effect */}
          <span className="absolute inset-0 opacity-0 group-active:opacity-100">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-white/30 group-active:w-full group-active:h-full transition-all duration-500" />
          </span>
        </Component>
      </motion.div>
    </div>
  );
}
