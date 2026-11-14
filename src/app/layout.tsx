import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ContactModal } from "@/components/contact/ContactModal";
import { GlobalMobileIPod } from "@/components/ui/GlobalMobileIPod";

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
  title: "Rishabh Naik — Video Editor & Content Creator",
  description:
    "Portfolio of Rishabh Naik — specializing in video editing, short films, Instagram reels, and short-form content creation.",
  keywords: [
    "Rishabh Naik",
    "Video Editor",
    "Content Creator",
    "Short Films",
    "Instagram Reels",
    "Videographer",
  ],
  authors: [{ name: "Rishabh Naik" }],
  openGraph: {
    title: "Rishabh Naik — Video Editing Portfolio",
    description: "Creative video editor and content creator with a passion for pacing, storytelling, and high-retention short-form video.",
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
        <GlobalMobileIPod />
      </body>
    </html>
  );
}
