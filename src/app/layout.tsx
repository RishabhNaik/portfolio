import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/data/siteData';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.title} | Portfolio & Digital Art`,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [
    'Rishabh Naik',
    'Digital Artist',
    'Concept Art',
    'Illustrations',
    'Krita',
    'Frontend Developer',
    'Portfolio',
    'Sushiksha',
    'VKSSF Scholar',
  ],
  authors: [{ name: 'Rishabh Naik' }],
  creator: 'Rishabh Naik',
  metadataBase: new URL(siteConfig.baseUrl),
  openGraph: {
    title: `${siteConfig.title} | Portfolio & Digital Art`,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    siteName: siteConfig.title,
    images: [
      {
        url: '/images/Rishabh.jpeg',
        width: 800,
        height: 600,
        alt: siteConfig.title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.ico',
    apple: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ flex: '1 0 auto' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
