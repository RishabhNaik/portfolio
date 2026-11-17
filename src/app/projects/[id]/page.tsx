"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/footer/Footer";
import { CosmicGalaxyBackground } from "@/components/ui/CosmicGalaxyBackground";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetailPage() {
  const params = useParams();
  const currentId = params?.id as string;

  // Find active project or fallback to first
  const activeIndex = PROJECTS_DATA.findIndex((p) => p.id === currentId);
  const project = activeIndex !== -1 ? PROJECTS_DATA[activeIndex] : PROJECTS_DATA[0];

  // Next project for seamless navigation
  const nextProject =
    activeIndex !== -1 && activeIndex < PROJECTS_DATA.length - 1
      ? PROJECTS_DATA[activeIndex + 1]
      : PROJECTS_DATA[0];

  const heroImage = project.heroImageUrl || project.imageUrl;

  return (
    <div className={styles.detailWrapper}>
      {/* 00 — Cosmic Galaxy Static Starfield Background */}
      <CosmicGalaxyBackground />

      {/* 01 — Shared Header */}
      <Header />

      {/* 02 — Hero Banner with Reduced Top Spacing */}
      <section className={styles.bannerSection} aria-label="Project Hero Banner">
        <div className={styles.bannerImageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={project.title}
            className={styles.bannerImage}
          />
          <div className={styles.bannerGradient} />
        </div>

        <div className={styles.bannerContent}>
          {/* Plain Word Link for "All Projects" (NOT a button) */}
          <div className={styles.bannerTopNav}>
            <Link
              href="/projects"
              className={styles.backWordLink}
              onClick={() => cinematicAudioHaptics.playSlateTick()}
            >
              <ArrowLeft size={15} className={styles.backArrow} />
              <span>All Projects</span>
            </Link>
            <span className={styles.categorySeparator}>/</span>
            <span className={styles.categoryWord}>{project.category}</span>
          </div>

          <h1 className={styles.projectTitle}>{project.title}</h1>
          <p className={styles.projectTagline}>{project.description}</p>

          {/* Minimal Inline Meta Words Row (No Heavy Side Box) */}
          <div className={styles.metaInlineRow}>
            <span>{project.category}</span>
            <span className={styles.metaDot}>·</span>
            <span>{project.date}</span>
            {project.client && (
              <>
                <span className={styles.metaDot}>·</span>
                <span>{project.client}</span>
              </>
            )}
            {project.technicalSpecs?.camera && (
              <>
                <span className={styles.metaDot}>·</span>
                <span>{project.technicalSpecs.camera}</span>
              </>
            )}
            {project.duration && (
              <>
                <span className={styles.metaDot}>·</span>
                <span>{project.duration}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 03 — Project Narrative (Pure Clean Single-Column Editorial) */}
      <main className={styles.mainContent}>
        {/* The Brief & Vision */}
        <section className={styles.textSection}>
          <h2 className={styles.sectionHeading}>The Brief & Vision</h2>
          <p className={styles.synopsisText}>
            {project.synopsis || project.description}
          </p>
          <div className={styles.ctaRow}>
            <button
              type="button"
              onClick={() => {
                cinematicAudioHaptics.playTactileClick();
                openContactModal();
              }}
              className={styles.inquireCardBtn}
            >
              <span>Start a Project</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* Visual Showcase / Stills Gallery */}
        {project.stills && project.stills.length > 0 && (
          <section className={styles.gallerySection}>
            <h2 className={styles.sectionHeading}>Visual Showcase</h2>
            <div className={styles.stillsList}>
              {project.stills.map((still, idx) => (
                <figure key={idx} className={styles.stillFigure}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={still.url}
                    alt={still.caption}
                    className={styles.stillImg}
                    loading="lazy"
                  />
                  <figcaption className={styles.stillCaption}>
                    {still.role && (
                      <span className={styles.stillRoleBadge}>
                        {still.role}
                      </span>
                    )}
                    <span className={styles.stillCaptionText}>
                      {still.caption}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* 04 — Next Project Navigation Banner */}
        <section className={styles.nextProjectBanner}>
          <div className={styles.nextProjectInfo}>
            <span className={styles.nextProjectSubtitle}>Next Case Study</span>
            <h3 className={styles.nextProjectTitle}>{nextProject.title}</h3>
            <span className={styles.nextProjectCategory}>{nextProject.category}</span>
          </div>

          <Link
            href={`/projects/${nextProject.id}`}
            className={styles.nextProjectButton}
            onClick={() => cinematicAudioHaptics.playSlateTick()}
          >
            <span>View Project</span>
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>

      {/* 05 — Shared Footer */}
      <Footer />
    </div>
  );
}
