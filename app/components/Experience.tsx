// app/components/Experience.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ExperienceItem {
  date: string;
  position: string;
  company: string;
  location: string;
  responsibilities: string[];
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
  // Add more experiences as needed
];

const Experience: React.FC = () => {
  const expRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expRef.current) {
      gsap.from(expRef.current.querySelectorAll('.exp-item'), {
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.2,
      });
    }
  }, []);

  return (
    <section id="experience" ref={expRef} className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="exp-item">
              <h3 className="text-2xl font-semibold">
                {exp.position} - {exp.company}
              </h3>
              <p className="text-sm text-gray-600">
                {exp.date} | {exp.location}
              </p>
              <ul className="list-disc list-inside mt-2">
                {exp.responsibilities.map((item, idx) => (
                  <li key={idx} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
