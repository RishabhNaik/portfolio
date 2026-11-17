import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Creative Direction, Video Editing & UI/UX Systems",
  description:
    "Learn about Rishabh Naik — multidisciplinary creative based in Bengaluru specializing in rhythmic video editing, DaVinci Resolve color grading, human-centered UI/UX systems, and creative technology.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Rishabh Naik — Video Editor & Creative Technologist",
    description:
      "Background, creative disciplines, and full engineering toolkit of Rishabh Naik.",
    url: "https://rishabhsnaik.netlify.app/about",
    images: ["/assets/about/director-camera.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
