import Navigation from '@/app/components/Navigation'
import HeroSection from '@/app/components/HeroSection'
import AboutSection from '@/app/components/AboutSection'
import WorkSection from '@/app/components/WorkSection'
import ContactSection from '@/app/components/ContactSection'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
    </>
  )
}
