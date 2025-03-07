'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import emailjs from '@emailjs/browser';

const ModernContact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Form hover animations
  useEffect(() => {
    if (!containerRef.current) return;
    
    const formElements = containerRef.current.querySelectorAll('input, textarea');
    
    formElements.forEach(element => {
      // Add focus effect
      element.addEventListener('focus', () => {
        gsap.to(element, {
          borderColor: 'rgba(99, 55, 255, 1)',
          boxShadow: '0 0 15px rgba(99, 55, 255, 0.3)',
          duration: 0.3,
        });
      });
      
      // Remove focus effect
      element.addEventListener('blur', () => {
        gsap.to(element, {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
          duration: 0.3,
        });
      });
    });
    
    // Clean up
    return () => {
      formElements.forEach(element => {
        element.removeEventListener('focus', () => {});
        element.removeEventListener('blur', () => {});
      });
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
        'service_id_here', // Replace with your EmailJS service ID
        'template_id_here', // Replace with your EmailJS template ID
        formRef.current,
        'public_key_here' // Replace with your EmailJS public key
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
  
  // Floating label animations
  const handleFocus = (index: number) => {
    gsap.to(`label[for="input-${index}"]`, {
      y: -25,
      scale: 0.8,
      color: 'var(--accent)',
      duration: 0.3,
    });
  };
  
  const handleBlur = (index: number) => {
    const input = inputRefs.current[index];
    if (input && !input.value) {
      gsap.to(`label[for="input-${index}"]`, {
        y: 0,
        scale: 1,
        color: 'var(--muted)',
        duration: 0.3,
      });
    }
  };
  
  return (
    <section className="py-20 bg-[#070707] relative">
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
              Thank you for your message! I'll get back to you soon.
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
              <div className="relative">
                <input
                  id="input-0"
                  ref={(el) => {
                    if (el) inputRefs.current[0] = el;
                  }}
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus(0)}
                  onBlur={() => handleBlur(0)}
                  required
                  className="w-full bg-[#111111] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 text-white focus:outline-none transition-all"
                />
                <label
                  htmlFor="input-0"
                  className="absolute left-4 top-4 text-gray-400 pointer-events-none transition-all"
                >
                  Your Name
                </label>
              </div>
              
              <div className="relative">
                <input
                  id="input-1"
                  ref={(el) => {
                    if (el) inputRefs.current[1] = el;
                  }}
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus(1)}
                  onBlur={() => handleBlur(1)}
                  required
                  className="w-full bg-[#111111] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 text-white focus:outline-none transition-all"
                />
                <label
                  htmlFor="input-1"
                  className="absolute left-4 top-4 text-gray-400 pointer-events-none transition-all"
                >
                  Your Email
                </label>
              </div>
            </div>
            
            <div className="relative mb-8">
              <textarea
                id="input-2"
                ref={(el) => {
                  if (el) inputRefs.current[2] = el as unknown as HTMLInputElement;
                }}
                name="message"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => handleFocus(2)}
                onBlur={() => handleBlur(2)}
                required
                rows={6}
                className="w-full bg-[#111111] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 text-white focus:outline-none transition-all"
              />
              <label
                htmlFor="input-2"
                className="absolute left-4 top-4 text-gray-400 pointer-events-none transition-all"
              >
                Your Message
              </label>
            </div>
            
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default ModernContact; 