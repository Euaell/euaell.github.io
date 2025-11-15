import Navigation from '@/app/components/Navigation'
import HeroSectionNew from '@/app/components/HeroSectionNew'
import AboutSection from '@/app/components/AboutSection'
import WorkSectionNew from '@/app/components/WorkSectionNew'
import ContactSection from '@/app/components/ContactSection'

export default function Home() {
	return (
		<>
			<Navigation />
			<main className="relative">
				<HeroSectionNew />
				<AboutSection />
				<WorkSectionNew />
				<ContactSection />
			</main>
		</>
	)
}
