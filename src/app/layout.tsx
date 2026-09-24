import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ContactModal } from "@/components/contact/ContactModal";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishabh Naik — Full-Stack Developer & Software Engineer",
  description:
    "Portfolio of Rishabh Naik — Full-Stack Software Developer based in Bangalore, building scalable production platforms at Anantaloop with Next.js, React, Node.js, Python, and AWS.",
  keywords: [
    "Rishabh Naik",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "NestJS",
    "Bangalore",
    "AI Systems",
  ],
  authors: [{ name: "Rishabh Naik" }],
  openGraph: {
    title: "Rishabh Naik — Full-Stack Developer Portfolio",
    description: "Full-Stack Software Developer based in Bangalore. Building scalable web platforms, APIs, and AI systems.",
    url: "https://rishabhnaik.com",
    siteName: "Rishabh Naik Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={figtree.className}>
        <Script id="disable-context-menu" strategy="afterInteractive">
          {`
            document.addEventListener('contextmenu', function(e) {
              if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.tagName === 'AUDIO') {
                e.preventDefault();
              }
            }, false);
          `}
        </Script>
        <div className="film-grain" aria-hidden="true" />
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
