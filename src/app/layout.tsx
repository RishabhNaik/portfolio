import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ContactModal } from "@/components/contact/ContactModal";
import { ResumeModal } from "@/components/resume/ResumeModal";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";

const SITE_URL = "https://rishabhsnaik.netlify.app";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rishabh Naik — Video Editor, Content Creator & Creative Technologist",
    template: "%s | Rishabh Naik",
  },
  description:
    "Portfolio of Rishabh Naik — specializing in rhythmic video editing, cinematic post-production, high-retention short-form content, human-centered UI/UX design systems, and creative technology.",
  applicationName: "Rishabh Naik Portfolio",
  authors: [{ name: "Rishabh Naik", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "Rishabh Naik",
    "Rishabh S Naik",
    "rawrish",
    "Video Editor",
    "Content Creator",
    "Creative Director",
    "DaVinci Resolve Colorist",
    "Cinematic Post-Production",
    "Short Films",
    "Instagram Reels Editor",
    "Videographer Bengaluru",
    "UI/UX Designer",
    "Design Systems Engineer",
    "Creative Technologist",
    "Next.js Developer",
    "TypeScript Full Stack",
  ],
  creator: "Rishabh Naik",
  publisher: "Rishabh Naik",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rishabh Naik — Video Editor, Content Creator & Creative Technologist",
    description:
      "Creative video editor and creative technologist based in Bengaluru with a passion for pacing, storytelling, tactile UI/UX systems, and high-retention cinematic video.",
    url: SITE_URL,
    siteName: "Rishabh Naik Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/about/director-camera.jpg",
        width: 1200,
        height: 630,
        alt: "Rishabh Naik — Video Editor & Creative Technologist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Naik — Video Editor & Content Creator",
    description:
      "Portfolio of Rishabh Naik: rhythmic video editing, DaVinci Resolve color grading, human-centered UI/UX systems, and creative technology.",
    creator: "@rawrish",
    images: ["/assets/about/director-camera.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Portfolio",
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Rishabh Naik",
      alternateName: ["Rishabh S Naik", "rawrish"],
      url: SITE_URL,
      image: `${SITE_URL}/assets/about/director-camera.jpg`,
      jobTitle: "Video Editor & Creative Technologist",
      telephone: "+91-6360908381",
      email: "rishabhnaik37@gmail.com",
      sameAs: [
        "https://github.com/RishabhNaik",
        "https://instagram.com/rawrish",
        "https://rishabhnaik.com",
      ],
      description:
        "Multidisciplinary creative and full-stack software engineer based in Bengaluru, specializing in rhythmic video editing, cinematic post-production, human-centered UI/UX systems, and creative technology.",
      knowsAbout: [
        "Video Editing",
        "Cinematic Post-Production",
        "DaVinci Resolve Studio",
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "Color Grading",
        "Sound Design & Foley",
        "Short-Form Video & Instagram Reels",
        "Cinematography",
        "UI/UX Design Systems",
        "Next.js",
        "TypeScript",
        "React",
        "Creative Technology",
        "GLSL Shaders",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "India",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Rishabh Naik Portfolio",
      alternateName: "rawrish",
      description:
        "Official portfolio of Rishabh Naik — Video Editor, Content Creator & Creative Technologist.",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Rishabh Naik Profile",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sfPro.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <link rel="author" href={`${SITE_URL}/about`} />
        <link rel="help" href={`${SITE_URL}/llms.txt`} />
      </head>
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
