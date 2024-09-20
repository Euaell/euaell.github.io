import About from '@/app/components/About';
import Experience from '@/app/components/Experience';
import Education from '@/app/components/Education';
import Projects from '@/app/components/Projects';
import ContactForm from '@/app/components/ContactForm';

export default function Home() {
 

  return (
    <main>
      {/* Hero Section (Optional) */}
      <About />
      <Experience />
      <Education />
      <Projects />
      <ContactForm />
    </main>
  )
}
