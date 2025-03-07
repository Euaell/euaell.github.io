'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

interface ModernTimelineProps {
  items: TimelineItem[];
  title: string;
}

const ModernTimeline: React.FC<ModernTimelineProps> = ({ items, title }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    if (!timelineRef.current) return;
    
    // Create timeline line animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });
    
    // Animate timeline line
    tl.fromTo('.timeline-line', 
      { height: 0 },
      { height: '100%', duration: 1.5, ease: 'power3.inOut' }
    );
    
    // Animate timeline dots
    gsap.fromTo('.timeline-dot',
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.2, 
        delay: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Animate timeline items
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6 + (index * 0.2),
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          }
        }
      );
    });
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const openModal = (item: TimelineItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = '';
  };
  
  return (
    <section 
      className="py-20 bg-[#080808] relative"
      id={title.toLowerCase().includes('experience') ? 'experience' : 'education'}
    >
      <div className="container mx-auto px-6">
        <AnimatedText
          text={title}
          tag="h2"
          animation="chars"
          staggerValue={0.02}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        />
        
        <div ref={timelineRef} className="timeline relative mt-20">
          {/* Timeline center line */}
          <div className="timeline-line"></div>
          
          {/* Timeline items */}
          {items.map((item, index) => (
            <div 
              key={index}
              ref={el => {
                if (el) itemsRef.current[index] = el;
              }}
              className={`relative mb-16 ${
                index % 2 === 0 
                  ? 'md:ml-[50%] md:pl-12 pl-10'
                  : 'md:mr-[50%] md:pr-12 pl-10 md:pl-0'
              }`}
            >
              {/* Timeline dot */}
              <div 
                className="timeline-dot"
                style={{ 
                  top: '24px',
                  [index % 2 === 0 ? 'left' : 'right']: '0',
                  transform: 'translateX(-50%)'
                }}
              ></div>
              
              {/* Timeline content - simplified */}
              <motion.div 
                className="timeline-item-content cursor-pointer"
                onClick={() => openModal(item)}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-r from-purple-700 to-blue-500 text-white py-1 px-4 rounded-full inline-block mb-3">
                  {item.date}
                </div>
                <h3 className="timeline-item-title">{item.title}</h3>
                <p className="timeline-item-subtitle mb-1">{item.subtitle}</p>
                <p className="text-gray-400 text-sm mb-4">{item.location}</p>
                
                {/* View details button */}
                <div className="flex items-center text-[var(--accent)] text-sm mt-2">
                  <span>View Details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed view */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            
            {/* Modal content */}
            <motion.div 
              className="bg-[#101010] rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative z-10"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Close button */}
              <button 
                onClick={closeModal}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Modal header */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-purple-700 to-blue-500 text-white py-1 px-4 rounded-full inline-block mb-3">
                  {selectedItem.date}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedItem.title}</h3>
                <p className="text-xl text-gray-300 mb-1">{selectedItem.subtitle}</p>
                <p className="text-gray-400">{selectedItem.location}</p>
              </div>
              
              {/* Modal body - detailed description */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Responsibilities:</h4>
                <ul className="space-y-3">
                  {selectedItem.description.map((desc, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-[var(--accent)] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span className="text-gray-300">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ModernTimeline; 