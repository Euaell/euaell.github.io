'use client';
import anime from "animejs";
import { useEffect, useRef } from "react";

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
    date: 'Jan 2023 – Jun 2023',
    position: 'Software Developer Intern',
    company: 'HISP Ethiopia',
    location: 'Addis Ababa, Ethiopia',
    responsibilities: [
      'Developed and maintained web applications using Django and Flask.',
      'Designed and implemented RESTful APIs for web applications.',
      'Created and maintained database schemas using PostgreSQL and SQLite.',
      'Developed and maintained DHIS2 customizations, including data entry forms, dashboards, and reports.',
    ],
  }
  // Add more experiences as needed
]

function Experience(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    const currentSection = sectionRef.current;

    if (currentSection) {
      observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Start the anime.js animation
              anime({
                targets: '.popping-animation',
                rotateY: '1turn',
                easing: 'easeOutQuad',
                opacity: [0, 1],
                scale: [0, 1],
                // rotate: ['-90deg', '0deg'],
                duration: 750,
                delay: anime.stagger(400, { start: 300 }),
                loop: false,
              });

              // Stop observing after the animation has started
              observerInstance.unobserve(currentSection);
            }
          });
        },
        {
          root: null, // Observe within viewport
          threshold: 0.3, // Trigger when 30% of the section is visible
        }
      );

      observer.observe(currentSection);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (observer && currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section
      id="experience"
      className="py-16 bg-slate-200"
      ref={sectionRef}
    >
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Professional Experience</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute w-1 bg-blue-500 h-full left-1/2 transform -translate-x-1/2"></div>
          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index}>
                {/* Popping animation */}
                <div className={`popping-animation opacity-0 scale-0 relative md:w-1/2 px-6 ${index % 2 === 0 ? 'md:pr-8 md:ml-auto' : 'md:pl-8 md:mr-auto'} `}>
                  <div
                    className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer animate-pop`}
                  >
                    <p className="text-sm text-gray-500">{exp.date}</p>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {exp.position} - {exp.company}
                    </h3>
                    <p className="text-gray-600">{exp.location}</p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="hidden md:block absolute w-4 h-4 bg-blue-500 rounded-full left-1/2 transform -translate-x-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
