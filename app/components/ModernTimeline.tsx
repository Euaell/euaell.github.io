'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';

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
              className={`relative mb-20 ${
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
              
              {/* Timeline content */}
              <div className="timeline-item-content">
                <div className="bg-gradient-to-r from-purple-700 to-blue-500 text-white py-1 px-4 rounded-full inline-block mb-3">
                  {item.date}
                </div>
                <h3 className="timeline-item-title">{item.title}</h3>
                <p className="timeline-item-subtitle mb-1">{item.subtitle}</p>
                <p className="text-gray-400 text-sm mb-4">{item.location}</p>
                
                <ul className="space-y-2">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-[var(--accent)] rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-300">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernTimeline; 