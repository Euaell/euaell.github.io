import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/app/components/ThemeProvider'
import { SmoothScrollProvider } from '@/app/components/SmoothScrollProvider'

const inter = Inter({ 
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
	subsets: ['latin'],
	variable: '--font-jetbrains-mono',
	display: 'swap',
})

export const metadata: Metadata = {
	title: {
		default: 'Euael M. Eshete - Full Stack Developer & AI Engineer',
		template: '%s | Euael M. Eshete'
	},
	description: 'Full Stack Developer specializing in AI-driven solutions, React, Next.js, Python, and modern web technologies. Computer Engineering graduate with 2+ years experience building scalable applications.',
	keywords: [
		'Full Stack Developer', 
		'React Developer', 
		'Next.js Developer', 
		'TypeScript Developer', 
		'Python Developer',
		'AI Engineer',
		'Machine Learning',
		'Web Development', 
		'Frontend Developer', 
		'Backend Developer',
		'Software Engineer',
		'Euael Eshete',
		'Portfolio',
		'Ethiopia Developer'
	],
	authors: [{ name: 'Euael M. Eshete', url: 'https://portfoli.euaell.me' }],
	creator: 'Euael M. Eshete',
	publisher: 'Euael M. Eshete',
	applicationName: 'Euael Portfolio',
	category: 'Technology',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://portfoli.euaell.me',
		title: 'Euael M. Eshete - Full Stack Developer & AI Engineer',
		description: 'Full Stack Developer specializing in AI-driven solutions, React, Next.js, Python, and modern web technologies. View my portfolio and get in touch!',
		siteName: 'Euael Portfolio',
		images: [
			{
				url: '/images/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Euael M. Eshete - Full Stack Developer Portfolio',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Euael M. Eshete - Full Stack Developer & AI Engineer',
		description: 'Full Stack Developer specializing in AI-driven solutions, React, Next.js, Python, and modern web technologies.',
		images: ['/images/og-image.png'],
		creator: '@euaell', // Add your Twitter handle if you have one
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: 'https://portfoli.euaell.me',
	},
	other: {
		'google-site-verification': 'your-actual-google-verification-code-here',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider>
					<SmoothScrollProvider>
						<div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
							{/* Background Effects */}
							<div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 pointer-events-none" />
							<div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
							<div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent pointer-events-none" />
							
							{/* Noise Texture */}
							<div 
								className="fixed inset-0 opacity-[0.015] pointer-events-none" 
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
								}}
							/>
							
							{children}
						</div>
					</SmoothScrollProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
