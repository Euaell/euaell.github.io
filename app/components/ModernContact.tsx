'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import emailjs from '@emailjs/browser';
import SchedulingButton from './GoogleSchedulingButton';

const ModernContact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up GSAP animations
    gsap.registerPlugin();
    
    // Initial setup for label animations
    const inputs = containerRef.current.querySelectorAll('input, textarea');
    inputs.forEach((input, index) => {
      // Set initial state for labels based on if input has value
      const hasValue = (input as HTMLInputElement).value.length > 0;
      
      gsap.set(`.input-label-${index}`, {
        y: hasValue ? -25 : 0,
        scale: hasValue ? 0.8 : 1,
        color: hasValue ? 'var(--accent)' : 'var(--muted)',
        transformOrigin: 'left top',
      });
    });
    
    // Clean up animations
    return () => {
      // gsap cleanup if needed
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    try {
      setStatus('sending');
      
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! 
      );
      
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    }
  };
  
  // Handle input focus
  const handleFocus = (index: number) => {
    gsap.to(`.input-label-${index}`, {
      y: -25,
      scale: 0.8,
      color: 'var(--accent)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  
  // Handle input blur
  const handleBlur = (index: number) => {
    const input = document.getElementById(`input-${index}`) as HTMLInputElement | HTMLTextAreaElement;
    
    if (input && !input.value) {
      gsap.to(`.input-label-${index}`, {
        y: 0,
        scale: 1,
        color: 'var(--muted)',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      // Keep the label up but change color to indicate it's not focused
      gsap.to(`.input-label-${index}`, {
        color: 'var(--muted)',
        duration: 0.3,
      });
    }
  };
  
  return (
    <section className="py-20 bg-[#070707] relative" id="contact">
      <div ref={containerRef} className="container mx-auto px-6">
        <AnimatedText
          text="Get In Touch"
          tag="h2"
          animation="chars"
          staggerValue={0.02}
          className="text-4xl md:text-5xl font-bold text-center mb-6 text-white"
        />
        
        <AnimatedText
          text="Let&apos;s build something amazing together"
          tag="p"
          animation="words"
          className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto"
        />
        
        <div className="max-w-3xl mx-auto">
          {status === 'success' && (
            <motion.div 
              className="bg-green-500 bg-opacity-20 border border-green-500 text-green-200 p-4 rounded-lg mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Thank you for your message! I&apos;ll get back to you soon.
            </motion.div>
          )}
          
          {status === 'error' && (
            <motion.div 
              className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 p-4 rounded-lg mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Oops! Something went wrong. Please try again later.
            </motion.div>
          )}
          
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative group">
                <input
                  id="input-0"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus(0)}
                  onBlur={() => handleBlur(0)}
                  required
                  className="input-field w-full bg-[#111111] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 text-white focus:outline-none transition-all focus:border-[var(--accent)] focus:shadow-input peer"
                  autoComplete="name"
                />
                <label
                  htmlFor="input-0"
                  className="input-label-0 absolute left-4 top-4 text-gray-400 transition-all duration-300 ease-out pointer-events-none"
                >
                  Your Name
                </label>
              </div>
              
              <div className="relative group">
                <input
                  id="input-1"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus(1)}
                  onBlur={() => handleBlur(1)}
                  required
                  className="input-field w-full bg-[#111111] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 text-white focus:outline-none transition-all focus:border-[var(--accent)] focus:shadow-input peer"
                  autoComplete="email"
                />
                <label
                  htmlFor="input-1"
                  className="input-label-1 absolute left-4 top-4 text-gray-400 transition-all duration-300 ease-out pointer-events-none"
                >
                  Your Email
                </label>
              </div>
            </div>
            
            {/* Message input */}
            <div className="relative mb-8 group">
              <textarea
                id="input-2"
                name="message"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => handleFocus(2)}
                onBlur={() => handleBlur(2)}
                required
                rows={6}
                className="input-field w-full bg-[#111111] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 text-white focus:outline-none transition-all focus:border-[var(--accent)] focus:shadow-input peer resize-none"
              />
              <label
                htmlFor="input-2"
                className="input-label-2 absolute left-4 top-4 text-gray-400 transition-all duration-300 ease-out pointer-events-none"
              >
                Your Message
              </label>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col md:flex-row md:items-center">
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="bg-gradient-to-r from-[var(--accent)] to-[var(--secondary-accent)] text-white py-4 px-8 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[var(--accent)]/20 w-full md:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
              
              {/* Divider with "or" text for mobile */}
              <div className="md:hidden my-4 relative flex items-center justify-center">
                <div className="border-t border-gray-700 flex-grow"></div>
                <span className="mx-4 text-gray-500">or</span>
                <div className="border-t border-gray-700 flex-grow"></div>
              </div>
              
              {/* Desktop divider */}
              <div className="hidden md:block md:mx-4 text-gray-500">or</div>
              
              {/* Schedule Meeting Button */}
              <div className="md:ml-2">
                <SchedulingButton />
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Add custom CSS for the enhanced input animations */}
      <style jsx global>{`
        .input-field:focus {
          box-shadow: 0 0 0 2px rgba(99, 55, 255, 0.2);
        }
        
        /* When input has content, move label up (using peer class) */
        .input-field:not(:placeholder-shown) + label,
        .input-field:focus + label {
          transform: translateY(-25px) scale(0.8);
          color: var(--accent);
        }
        
        .focus:shadow-input {
          box-shadow: 0 0 15px rgba(99, 55, 255, 0.3);
        }
      `}</style>
    </section>
  );
};

export default ModernContact; 