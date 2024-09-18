// app/components/About.tsx
'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      gsap.from(aboutRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      });
    }
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/profile.jpg"
            alt="Euael M. Eshete"
            className="w-auto h-auto rounded-full mb-6 md:mb-0 md:mr-8"
            width={192}
            height={192}
          />
          <p className="text-lg">
            Passionate Computer Engineer with a Bachelor's degree from Addis Ababa University,
            currently pursuing a Master's degree. With hands-on experience in developing AI-driven
            conversational agents and responsive websites, I thrive on turning complex challenges
            into innovative solutions. I’ve collaborated on projects that range from integrating
            advanced machine learning models to optimizing user experiences on web platforms. I'm a
            team player who values precision and organizational excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
