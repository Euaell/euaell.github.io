// app/page.tsx
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import About from '@/app/components/About';
import Experience from '@/app/components/Experience';
import Education from '@/app/components/Education';
import Projects from '@/app/components/Projects';
import ContactForm from '@/app/components/ContactForm';

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <>
      <main className="overflow-hidden">
        {/* Hero Section (Optional) */}
        <About />
        <Experience />
        <Education />
        <Projects />
        <ContactForm />
      </main>
    </>
  );
}
