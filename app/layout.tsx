import type { Metadata } from "next";
import "@/app/globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Afacad } from 'next/font/google'

const afacad = Afacad({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Euael M. Eshete - Portfolio',
  description: 'Euael Mekonen Eshete—Computer Engineer, Python Developer, and AI enthusiast from Addis Ababa University. Explore my portfolio showcasing software and web development projects in Addis Ababa, Ethiopia.',
  icons: {
    icon: '/icons/favicon_io/favicon.ico',
    apple: '/icons/favicon_io/apple-touch-icon.png',
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
        url: '/icons/favicon_io/apple-touch-icon.png',
        width: 512,
        height: 512,
        alt: 'Euael M. Eshete - Portfolio',
      },
    ],
    countryName: 'Ethiopia',
  },
  alternates: {
      canonical: 'https://euaell.github.io/',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'wrlJdVvMi6HIsFSGq8Gy99eYLql-rKl2ONU4Gp_KzPM'
  }
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
