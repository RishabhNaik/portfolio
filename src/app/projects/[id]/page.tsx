import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "@/data/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

const SITE_URL = "https://rishabhsnaik.netlify.app";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const heroImage = project.heroImageUrl || project.imageUrl;

  return {
    title: `${project.title} — ${project.category}`,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      "Rishabh Naik",
      ...(project.tags || []),
    ],
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | Rishabh Naik Portfolio`,
      description: project.description,
      url: `${SITE_URL}/projects/${project.id}`,
      type: "article",
      images: [
        {
          url: heroImage,
          width: 1600,
          height: 900,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Rishabh Naik`,
      description: project.description,
      images: [heroImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const activeIndex = PROJECTS_DATA.findIndex((p) => p.id === id);

  if (activeIndex === -1) {
    notFound();
  }

  const project = PROJECTS_DATA[activeIndex];
  const nextProject =
    activeIndex < PROJECTS_DATA.length - 1
      ? PROJECTS_DATA[activeIndex + 1]
      : PROJECTS_DATA[0];

  const heroImage = project.heroImageUrl || project.imageUrl;

  // Schema.org CreativeWork / VideoObject structured data for AI and Search indexing
  const isVideo = project.category.toLowerCase().includes("video") || project.category.toLowerCase().includes("cinema");
  const schemaType = isVideo ? "VideoObject" : "CreativeWork";

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${SITE_URL}/projects/${project.id}/#work`,
    name: project.title,
    headline: project.title,
    description: project.synopsis || project.description,
    genre: project.category,
    dateCreated: project.date,
    image: heroImage,
    url: `${SITE_URL}/projects/${project.id}`,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Rishabh Naik",
      url: SITE_URL,
    },
    creator: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Rishabh Naik",
      url: SITE_URL,
    },
    keywords: project.tags?.join(", "),
    ...(isVideo && {
      thumbnailUrl: [heroImage],
      uploadDate: `${project.date}-01-01T00:00:00Z`,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailClient project={project} nextProject={nextProject} />
    </>
  );
}
