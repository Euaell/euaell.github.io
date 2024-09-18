import type { Metadata } from "next";
import "@/app/globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: 'Euael M. Eshete - Portfolio',
  description: 'Portfolio website of Euael M. Eshete',
  icons: {
    icon: '/icons/favicon_io/favicon.ico',
    apple: '/icons/favicon_io/apple-touch-icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-QZW3GEJSTM" />
    </html>
  );
}
