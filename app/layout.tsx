import type { Metadata } from "next";
import "@/app/globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Afacad } from 'next/font/google'

const afacad = Afacad({subsets: ['latin']})

export const metadata: Metadata = {
	metadataBase: new URL('https://euaell.github.io/'),
	title: 'Euael M. Eshete - Portfolio',
	description: 'Euael Mekonen Eshete—Computer Engineer, Python Developer, and AI enthusiast from Addis Ababa University. Explore my portfolio showcasing software and web development projects in Addis Ababa, Ethiopia.',
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
	applicationName: 'Euael M. Eshete - Portfolio',
	creator: 'Euael M. Eshete',
	publisher: 'GitHub',
	robots: 'index, follow',
	openGraph: {
		type: 'website',
		title: 'Euael M. Eshete - Portfolio',
		description: 'Euael Mekonen Eshete—Computer Engineer, Python Developer, and AI enthusiast from Addis Ababa University. Explore my portfolio showcasing software and web development projects in Addis Ababa, Ethiopia.',
		siteName: 'Euael M. Eshete - Portfolio',
		url: 'https://euaell.github.io/',
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
	keywords: ['Euael M. Eshete', 'Portfolio', 'Computer Engineer', 'Python Developer', 'AI', 'Addis Ababa', 'Ethiopia'],
	authors: { name: 'Euael Mekonen Eshete' },
	twitter: {
		card: 'summary_large_image',
		title: 'Euael M. Eshete - Portfolio',
		description: 'Euael Mekonen Eshete—Computer Engineer, Python Developer, and AI enthusiast from Addis Ababa University.',
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
	<html lang="en">
	  <body
		className={`${afacad.className} antialiased`}
	  >
		{children}
	  </body>
	  <GoogleAnalytics gaId="G-QZW3GEJSTM" />
	</html>
  );
}
