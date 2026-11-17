import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ContactModal } from "@/components/contact/ContactModal";
import { ResumeModal } from "@/components/resume/ResumeModal";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";

const sfPro = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro",
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
    <html lang="en" className={sfPro.variable}>
      <body className={sfPro.className}>
        <Script id="disable-context-menu" strategy="afterInteractive">
          {`
            document.addEventListener('contextmenu', function(e) {
              if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.tagName === 'AUDIO') {
                e.preventDefault();
              }
            }, false);
          `}
        </Script>
        <SmoothScrollProvider>
          <div className="film-grain" aria-hidden="true" />
          {children}
          <ContactModal />
          <ResumeModal />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
