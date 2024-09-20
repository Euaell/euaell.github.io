import type { Metadata } from "next";
import "@/app/globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Afacad } from 'next/font/google'
import Head from "next/head";

const afacad = Afacad({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Euael M. Eshete - Portfolio',
  description: 'Portfolio website of Euael M. Eshete',
  icons: {
    icon: '/icons/favicon_io/favicon.ico',
    apple: '/icons/favicon_io/apple-touch-icon.png',
  },
  keywords: 'Euael Mekonen Eshete, Euael, Euael Eshete, Euael Mekonen, Computer Engineer, Python Developer, Software Developer, Web Developer, Addis Ababa University, AI, Machine Learning',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Open Graph and Twitter Cards */}
        <meta property="og:title" content="Euael M. Eshete - Computer Engineer & Developer" />
        <meta property="og:description" content="Computer Engineer, Python Developer..." />
        <meta property="og:image" content="/icons/favicon_io/apple-touch-icon.png" />
        <meta name="twitter:card" content="/icons/favicon_io/apple-touch-icon.png" />
        <meta name="twitter:site" content="@euaelesh" />

        <link rel="canonical" href="https://euaell.github.io/" />
      </Head>
      <body
        className={`${afacad.className} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-QZW3GEJSTM" />
    </html>
  );
}
