import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Selected Works — Commercials, Directing & UI/UX",
  description:
    "Explore selected creative projects by Rishabh Naik spanning video editing, short films, Swiss-inspired graphic design, UI/UX systems, and software engineering.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Selected Works — Rishabh Naik",
    description:
      "Selected works across video editing, creative direction, UI/UX design systems, and digital art by Rishabh Naik.",
    url: "https://rishabhsnaik.netlify.app/projects",
    images: ["/assets/projects/refraction-hero.jpg"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
