import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Gallery — Photography & Digital Stills",
  description:
    "Curated visual stills, 35mm film shots, street photography, and architectural compositions by Rishabh Naik.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Visual Gallery — Rishabh Naik",
    description:
      "Curated visual stills and photography across street, natural lighting, and architectural symmetry.",
    url: "https://rishabhsnaik.netlify.app/gallery",
    images: ["/assets/about/director-viewfinder.jpg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
