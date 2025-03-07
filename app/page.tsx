'use client';

import { useEffect } from 'react';
import SmoothScroll from '@/app/components/SmoothScroll';
import Hero from '@/app/components/Hero';
import ModernTimeline from '@/app/components/ModernTimeline';
import ProjectsGrid from '@/app/components/ProjectsGrid';
import ModernContact from '@/app/components/ModernContact';

// Experience data
const experienceData = [
  {
    date: 'Sep 2023 – Present',
    title: 'Software Engineer at AfroChat',
    subtitle: 'Africa to Silicon Valley',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Developed and integrated advanced LLMs (GPT, Mistral, Gemini) and image models (DALL-E, Stable Diffusion) to power AI-driven conversational agents, enhancing user engagement and interaction.',
      'Architected and developed a robust backend using FastAPI and LiteStar, supporting user base growth from 60 to almost 2000 and increasing message volume from 1,250 to over 58,000 over 12 months.',
      'Created an intuitive frontend for the AfroChat Telegram mini-app using Vue.js, focusing on UI/UX design and state management to optimize user experience.',
      'Currently developing a functional calling tools model to integrate multi-media interactions and third-party app integrations into the chat module.',
    ],
  },
  {
    date: 'Jul 2023 – Sep 2023',
    title: 'Computer Engineer',
    subtitle: 'HISP Ethiopia',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Developed responsive WordPress websites.',
      'Customized WordPress themes and plugins to meet client requirements.',
      'Ensured websites are optimized for performance, security, and SEO.',
      'Customized DHIS2 instances to align with client needs, including data entry forms, dashboards, and reports.',
      'Created clear and comprehensive documentation for WordPress websites, DHIS2 customizations, and web applications.',
    ],
  },
  {
    date: 'Mar 2022 - Jul 2022',
    title: 'Computer Engineer intern',
    subtitle: 'New Era Research and Development Center',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Worked on making customer 3D printers and CNC machines. Was part of a team that worked on simultaneous control of the 3-axis motors.',
      'I also worked as a full-stack engineer in a team working on the company ordering website.'
    ]
  },
];

// Education data
const educationData = [
  {
    date: '2023 - Present',
    title: 'Master of Science in Computer Science',
    subtitle: 'Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Focus on Artificial Intelligence and Machine Learning',
      'Research on Large Language Models and their applications',
    ],
  },
  {
    date: '2018 - 2023',
    title: 'Bachelor of Science in Computer Engineering',
    subtitle: 'Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Graduated with distinction',
      'Focus on software engineering, embedded systems, and computer architecture',
      'Completed senior project on AI-driven conversational agents',
    ],
  },
];

// Projects data
const projectsData = [
  {
    title: 'AfroChat AI',
    description: 'A conversational AI application powered by large language models and custom integrations.',
    image: '/images/project1.jpg',
    link: 'https://github.com/euaell/afrochat',
    tags: ['Python', 'FastAPI', 'Vue.js', 'AI', 'LLM'],
  },
  {
    title: 'DHIS2 Customizations',
    description: 'Custom dashboards and data visualizations for health information systems.',
    image: '/images/project2.jpg',
    link: 'https://github.com/euaell/dhis2-custom',
    tags: ['JavaScript', 'React', 'D3.js', 'Data Visualization'],
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with inventory management and payment processing.',
    image: '/images/project3.jpg',
    link: 'https://github.com/euaell/ecommerce',
    tags: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
  },
  {
    title: 'AI Image Generator',
    description: 'Web application utilizing Stable Diffusion to generate images from text prompts.',
    image: '/images/project4.jpg',
    link: 'https://github.com/euaell/image-gen',
    tags: ['Python', 'Stable Diffusion', 'React', 'FastAPI'],
  },
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio website built with Next.js and GSAP animations.',
    image: '/images/project5.jpg',
    link: 'https://github.com/euaell/portfolio',
    tags: ['Next.js', 'GSAP', 'Framer Motion', 'TypeScript'],
  },
  {
    title: 'Language Learning App',
    description: 'Interactive language learning application with spaced repetition algorithm.',
    image: '/images/project6.jpg',
    link: 'https://github.com/euaell/language-app',
    tags: ['React Native', 'Firebase', 'Redux', 'Machine Learning'],
  },
];

export default function Home() {
  // Initialize GSAP plugins and configurations
  useEffect(() => {
    // Ensure smooth scrolling on page load
    window.scrollTo(0, 0);
    
    // Clean up when component unmounts
    return () => {
      // Any cleanup needed
    };
  }, []);

  return (
    <SmoothScroll>
      <main className="main-container">
        <Hero />
        
        <ModernTimeline 
          items={experienceData} 
          title="Professional Experience" 
        />
        
        <ModernTimeline 
          items={educationData} 
          title="Education" 
        />
        
        <ProjectsGrid projects={projectsData} title="Featured Projects" />
        
        <ModernContact />
        
        {/* Other sections will be added in upcoming steps */}
      </main>
    </SmoothScroll>
  );
}
