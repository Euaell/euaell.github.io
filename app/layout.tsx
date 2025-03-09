import type { Metadata } from "next";
import "@/app/globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter, Syne } from 'next/font/google'
import AnimatedCursor from "@/app/components/AnimatedCursor";
import NoiseBackground from "@/app/components/NoiseBackground";

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
	preload: true,
});

const syne = Syne({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-syne',
	preload: true,
});

export const metadata: Metadata = {
	metadataBase: new URL('https://euaell.github.io/'),
	title: 'Euael M. Eshete - Portfolio',
	description: 'Euael Mekonen Eshete—Computer Engineer, Python Developer, and AI enthusiast from Addis Ababa University. Explore my portfolio showcasing software and web development projects in Addis Ababa, Ethiopia.',
	applicationName: 'Euael M. Eshete - Portfolio',
	authors: { name: 'Euael Mekonen Eshete' },
	creator: 'Euael M. Eshete',
	publisher: 'GitHub',
	formatDetection: {
		email: true,
		address: true,
		telephone: true,
	},
	generator: 'Next.js',
	referrer: 'origin-when-cross-origin',
	keywords: ['Euael M. Eshete', 'Portfolio', 'Computer Engineer', 'Python Developer', 'AI', 'Addis Ababa', 'Ethiopia', 'Web Development', 'Software Engineer'],
	colorScheme: 'dark',
	themeColor: '#6337ff',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 5,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: [
			{
				url: '/icons/personal_icons/favicon.ico',
				type: 'image/x-icon',
				sizes: '48x48',
				rel: 'icon',
				fetchPriority: 'high',
			},
			{
				url: '/icons/personal_icons/android-icon-192x192.png',
				type: 'image/png',
				sizes: '192x192',
				rel: 'icon',
				fetchPriority: 'low',
			}
		],
		apple: [
			{
				url: '/icons/personal_icons/apple-icon.png',
				type: 'image/png',
				sizes: '192x192',
				rel: 'apple-touch-icon',
				fetchPriority: 'high',
			},
			{
				url: '/icons/personal_icons/apple-icon-180x180.png',
				type: 'image/png',
				sizes: '180x180',
				rel: 'apple-touch-icon',
				fetchPriority: 'low',
			}
		]
	},
	openGraph: {
		type: 'website',
		title: 'Euael M. Eshete - Portfolio',
		description: 'Euael Mekonen Eshete—Computer Engineer, Python Developer, and AI enthusiast from Addis Ababa University. Explore my portfolio showcasing software and web development projects in Addis Ababa, Ethiopia.',
		siteName: 'Euael M. Eshete - Portfolio',
		url: 'https://euaell.github.io/',
		locale: 'en_US',
		images: [
			{
				url: '/icons/personal_icons/apple-icon.png',
				secureUrl: 'https://euaell.github.io/icons/personal_icons/apple-icon.png',
				width: 512,
				height: 512,
				alt: 'Euael M. Eshete - Portfolio',
			},
		],
		countryName: 'Ethiopia',
	},
	alternates: {
		canonical: 'https://portfolio.euaell.me',
	},
	manifest: '/manifest.json',
	verification: {
		google: 'wrlJdVvMi6HIsFSGq8Gy99eYLql-rKl2ONU4Gp_KzPM'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Euael M. Eshete - Portfolio',
		description: 'Euael Mekonen Eshete—Computer Engineer, Python Developer, and AI enthusiast from Addis Ababa University.',
		creator: '@euael_mekonen',
		images: [{
			url: '/icons/personal_icons/apple-icon.png',
			secureUrl: 'https://euaell.github.io/icons/personal_icons/ms-icon-310x310.png',
			width: 310,
			height: 310,
			alt: 'Euael M. Eshete - Portfolio',
		}],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${syne.variable}`}>
			<body className="antialiased overflow-x-hidden">
				<NoiseBackground />
				<AnimatedCursor />
				{children}
				<GoogleAnalytics gaId="G-QZW3GEJSTM" />
			</body>
		</html>
	);
}
