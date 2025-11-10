import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/app/components/ThemeProvider'
import { SmoothScrollProvider } from '@/app/components/SmoothScrollProvider'
import { GoogleAnalytics } from '@next/third-parties/google'
import { AllStructuredData } from '@/app/components/seo/StructuredData'

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
	metadataBase: new URL('https://portfolio.euaell.me'),
	title: {
		default: 'Euael M. Eshete - Full Stack Developer & AI Engineer',
		template: '%s | Euael M. Eshete'
	},
	description: 'Full Stack Developer & AI Engineer specializing in React, Next.js, Python, TypeScript, and machine learning. Computer Engineering graduate from AAU with 2+ years of experience building scalable web applications and AI-driven solutions.',
	keywords: [
		'Euael M. Eshete',
		'Euael Eshete',
		'Full Stack Developer',
		'React Developer',
		'Next.js Developer',
		'TypeScript Developer',
		'Python Developer',
		'AI Engineer',
		'Machine Learning Engineer',
		'Web Development',
		'Software Engineer',
		'AASTU Alumni',
		'Addis Ababa Developer',
		'Portfolio Website',
		'Freelance Developer',
		'Node.js Developer',
		'MongoDB',
		'PostgreSQL',
		'Docker',
		'Frontend Development',
		'Backend Development'
	],
	authors: [{ name: 'Euael M. Eshete', url: 'https://portfolio.euaell.me' }],
	creator: 'Euael M. Eshete',
	publisher: 'Euael M. Eshete',
	applicationName: 'Euael M. Eshete Portfolio',
	category: 'Technology',
	classification: 'Portfolio Website',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://portfolio.euaell.me',
		title: 'Euael M. Eshete - Full Stack Developer & AI Engineer',
		description: 'Full Stack Developer & AI Engineer from specializing in React, Next.js, Python, and modern web technologies. Explore my projects and get in touch for collaboration opportunities.',
		siteName: 'Euael M. Eshete Portfolio',
		images: [
			{
				url: '/images/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Euael M. Eshete - Full Stack Developer & AI Engineer Portfolio',
				type: 'image/png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Euael M. Eshete - Full Stack Developer & AI Engineer',
		description: 'Full Stack Developer & AI Engineer specializing in React, Next.js, Python, and modern web technologies.',
		images: ['/images/og-image.png'],
		creator: '@euaell',
		site: '@euaell',
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: 'https://portfolio.euaell.me',
	},
	verification: {
		google: 'your-actual-google-verification-code-here',
	},
	icons: {
		icon: [
			{ url: '/icons/personal_icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/icons/personal_icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/icons/personal_icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
		],
		apple: [
			{ url: '/icons/personal_icons/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
			{ url: '/icons/personal_icons/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
			{ url: '/icons/personal_icons/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
			{ url: '/icons/personal_icons/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
			{ url: '/icons/personal_icons/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
			{ url: '/icons/personal_icons/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
			{ url: '/icons/personal_icons/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
			{ url: '/icons/personal_icons/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
			{ url: '/icons/personal_icons/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
		],
		other: [
			{
				rel: 'mask-icon',
				url: '/icons/personal_icons/favicon.ico',
			},
		],
	},
	manifest: '/manifest.json',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<head>
				<AllStructuredData />
			</head>
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
			<GoogleAnalytics gaId="G-QZW3GEJSTM" />
		</html>
	)
}
