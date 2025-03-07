'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Card3DProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  tags?: string[];
  className?: string;
}

const Card3D: React.FC<Card3DProps> = ({
  title,
  description,
  image,
  link,
  tags = [],
  className = '',
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    
    // Calculate cursor position on the card (0 to 1)
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Set the rotation values (max 15 degrees)
    const rotateXValue = 15 - y * 30;
    const rotateYValue = x * 30 - 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    // Update the shine effect position
    setMouseX(x * 100);
    setMouseY(y * 100);
  };
  
  const handleMouseLeave = () => {
    // Reset to initial position smoothly
    setRotateX(0);
    setRotateY(0);
  };
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Update CSS variables for the shine effect
    const card = cardRef.current;
    card.style.setProperty('--x', `${mouseX}%`);
    card.style.setProperty('--y', `${mouseY}%`);
  }, [mouseX, mouseY]);
  
  return (
    <motion.div
      ref={cardRef}
      className={`card-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="card-3d-content">
        <div className="relative w-full h-48 md:h-60 overflow-hidden rounded-t-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-5 bg-opacity-10 bg-white backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-black bg-opacity-30 text-gray-200 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              View Project
            </a>
          )}
        </div>
        
        {/* Shine effect */}
        <div className="card-3d-shine" style={{ opacity: Math.max(rotateX, rotateY) !== 0 ? 1 : 0 }} />
      </div>
    </motion.div>
  );
};

export default Card3D; 