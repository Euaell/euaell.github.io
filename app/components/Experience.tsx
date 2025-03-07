'use client';
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import BackgroundParticles from './BackgroundParticles';

interface ExperienceItem {
  date: string;
  position: string;
  company: string;
  location: string;
  responsibilities: string[]
}

const experiences: ExperienceItem[] = [
  {
    date: 'Sep 2023 – Present',
    position: 'Software Engineer at AfroChat',
    company: 'Africa to Silicon Valley',
    location: 'Addis Ababa, Ethiopia',
    responsibilities: [
      'Developed and integrated advanced LLMs (GPT, Mistral, Gemini) and image models (DALL-E, Stable Diffusion) to power AI-driven conversational agents, enhancing user engagement and interaction.',
      'Architected and developed a robust backend using FastAPI and LiteStar, supporting user base growth from 60 to almost 2000 and increasing message volume from 1,250 to over 58,000 over 12 months.',
      'Created an intuitive frontend for the AfroChat Telegram mini-app using Vue.js, focusing on UI/UX design and state management to optimize user experience.',
      'Currently developing a functional calling tools model to integrate multi-media interactions and third-party app integrations into the chat module.',
    ],
  },
  {
    date: 'Jul 2023 – Sep 2023',
    position: 'Computer Engineer',
    company: 'HISP Ethiopia',
    location: 'Addis Ababa, Ethiopia',
    responsibilities: [
      'Developed responsive WordPress websites.',
      'Customized WordPress themes and plugins to meet client requirements.',
      'Ensured websites are optimized for performance, security, and SEO.',
      'Customized DHIS2 instances to align with client needs, including data entry forms, dashboards, and reports.',
      'Created clear and comprehensive documentation for WordPress websites, DHIS2 customizations, and web applications.',
    ],
  },
  {
    date: 'Mar 2022 - Jul 2022',
    position: 'Computer Engineer intern',
    company: 'New Era Research and Development Center',
    location: 'Addis Ababa, Ethiopia',
    responsibilities: [
      'Worked on making customer 3D printers and CNC machines. Was part of a team that worked on simultaneous control of the 3-axis motors.',
      'I also worked as a full-stack engineer in a team working on the company ordering website.'
    ]
  },
  // Add more experiences as needed
]

function Experience(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      // Animate timeline line growth
      if (timelineRef.current) {
        const timeline = timelineRef.current;
        timeline.style.height = "0%";
        const animation = timeline.animate(
          [
            { height: "0%" },
            { height: "100%" }
          ],
          {
            duration: 1500,
            easing: "ease-out",
            fill: "forwards"
          }
        );
        
        animation.onfinish = () => {
          timeline.style.height = "100%";
        };
      }
    } else {
      controls.start("hidden");
      if (timelineRef.current) {
        timelineRef.current.style.height = "0%";
      }
      setActiveIndex(null);
    }
  }, [controls, isInView]);

  // Variants for staggered animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Handle hover effects
  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };
  
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section
      id="experience"
      className="py-16 bg-slate-200 relative"
      ref={sectionRef}
    >
      <BackgroundParticles type="experience" />
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Professional Experience
        </motion.h2>
        
        <div className="relative mt-16">
          {/* Animated timeline line */}
          <div 
            ref={timelineRef}
            className="timeline-line"
          ></div>
          
          {/* Timeline items container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="relative z-10"
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                custom={index}
                className="relative mb-16"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="timeline-dot"
                  style={{ top: '24px' }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.8 + (index * 0.2), duration: 0.4 }}
                ></motion.div>
                
                <div className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Date column */}
                  <div className="w-full md:w-1/2 pb-8 md:pb-0 flex justify-center md:px-12">
                    <motion.div 
                      className="timeline-item"
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      transition={{ delay: 1 + (index * 0.2), duration: 0.6 }}
                    >
                      <div className="bg-blue-500 text-white py-2 px-6 rounded-full font-medium text-center">
                        {exp.date}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Content column */}
                  <div className="w-full md:w-1/2 md:px-12">
                    <motion.div 
                      className="timeline-item-content"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={isInView ? 
                        { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          boxShadow: activeIndex === index ? "0 15px 30px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,0,0,0.1)"
                        } : 
                        { opacity: 0, y: 30, scale: 0.9 }
                      }
                      transition={{ delay: 1.2 + (index * 0.2), duration: 0.6 }}
                      whileHover={{ 
                        y: -8,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <p className="timeline-item-date">{exp.location}</p>
                      <h3 className="timeline-item-title">{exp.position}</h3>
                      <p className="timeline-item-subtitle">{exp.company}</p>
                      
                      <motion.ul 
                        className="mt-4 space-y-2 text-gray-600"
                        initial="hidden"
                        animate={activeIndex === index ? "visible" : "hidden"}
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { 
                            opacity: 1,
                            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                          }
                        }}
                      >
                        {exp.responsibilities.map((resp, i) => (
                          <motion.li 
                            key={i}
                            variants={{
                              hidden: { opacity: 0, x: -10 },
                              visible: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start"
                          >
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                            <span>{resp}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
