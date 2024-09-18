import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: 'Euael M. Eshete - Portfolio',
  description: 'Portfolio website of Euael M. Eshete',
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
    </html>
  );
}
