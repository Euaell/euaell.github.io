'use client';

import Image from 'next/image';
import BackgroundParticles from './BackgroundParticles';
// import ProfilePictureAnimation from './ProfileImageAnimation';
import React, { useEffect, useRef } from 'react';
import profileImage from '@/public/images/profile.jpg';
import TypingAnimation from './TypingAnimation';
import { motion, useInView, useAnimation } from 'framer-motion';

function About(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section
      id="about"
      className="py-16 bg-transparent relative overflow-hidden"
      ref={sectionRef}
    >
      <BackgroundParticles type="about" />
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          <TypingAnimation 
            text="Euael M. Eshete" 
            speed={80} 
            className="inline-block"
          />
        </motion.h1>
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/3 mb-4 md:mb-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative w-64 h-64 mx-auto profile-image-container">
              {/* Profile Picture */}
              <Image
                src={profileImage}
                alt="Euael M. Eshete"
                className="rounded-full object-cover"
                fill
                priority
              />
              {/* Orbiting animation */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <motion.div 
                  className="absolute top-0 w-3 h-3 bg-blue-500 rounded-full"
                  style={{ left: 'calc(50% - 8px)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </motion.div>
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <motion.div 
                  className="absolute bottom-0 w-4 h-4 bg-green-400 rounded-full"
                  style={{ left: 'calc(50% - 8px)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 1, delay: 1.5 }}
                />
              </motion.div>
            </div>
          </motion.div>
          <motion.article 
            className="md:w-2/3 md:pl-12"
            custom={1}
            variants={fadeInVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="text-lg text-gray-700 leading-relaxed">
              I&apos;m a <motion.strong 
                  custom={2}
                  variants={fadeInVariants}
                  initial="hidden"
                  animate={controls}
                  className="text-blue-600"
                >Computer Engineer</motion.strong> and <motion.strong 
                  custom={3}
                  variants={fadeInVariants}
                  initial="hidden"
                  animate={controls}
                  className="text-blue-600"
                >Python Developer</motion.strong> 
              with a Bachelor&apos;s degree from <motion.strong 
                custom={4}
                variants={fadeInVariants}
                initial="hidden"
                animate={controls}
                className="text-blue-600"
              >Addis Ababa University</motion.strong>, currently 
              pursuing a Master&apos;s degree. With hands-on experience in developing AI-driven 
              conversational agents and responsive websites, I thrive on turning complex challenges 
              into innovative solutions. I&apos;ve collaborated on projects that range from integrating 
              advanced machine learning models to optimizing user experiences on web platforms. 
              I&apos;m a team player who values precision and organizational excellence.
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}


export default About;
