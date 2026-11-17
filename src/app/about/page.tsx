"use client";

import React from "react";
import { Download, ArrowRight } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/footer/Footer";
import { CosmicGalaxyBackground } from "@/components/ui/CosmicGalaxyBackground";
import { openContactModal } from "@/components/contact/contactModalState";
import { openResumeModal } from "@/components/resume/resumeModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./AboutPage.module.css";

const DISCIPLINES = [
  {
    number: "01",
    title: "Cinematic Post-Production",
    description:
      "Rhythm-driven video editing, dynamic cuts, high-retention social reels, and meticulous DaVinci color grading tailored to narrative storytelling.",
  },
  {
    number: "02",
    title: "UI/UX & Design Systems",
    description:
      "Constructing intentional typographic hierarchies, modular grid systems, and tactile digital interfaces designed for minimal cognitive friction.",
  },
  {
    number: "03",
    title: "Creative Technology",
    description:
      "Building performant web applications, experimenting with GLSL shaders, procedural visuals, and exploring autonomous AI agent workflows.",
  },
  {
    number: "04",
    title: "Photography & Visual Arts",
    description:
      "Exploring natural lighting, tactile textures, architectural symmetry, and street photography across 35mm film and digital mediums.",
  },
];

const TOOLKIT_LIST = [
  "DaVinci Resolve Studio",
  "Adobe Premiere Pro",
  "After Effects",
  "Figma",
  "Next.js & TypeScript",
  "Sound Design & Foley",
  "Color Grading & LUTs",
  "Creative Direction",
];

export default function AboutPage() {
  const handleContactClick = () => {
    cinematicAudioHaptics.playTactileClick();
    openContactModal();
  };

  const handleResumeClick = () => {
    cinematicAudioHaptics.playTactileClick();
    openResumeModal();
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 00 — Cosmic Galaxy Starfield Background */}
      <CosmicGalaxyBackground />

      {/* 01 — Global Navigation Header */}
      <Header />

      <main className={styles.mainContainer}>
        {/* 02 — Hero Profile Section: Left Story & Bio | Right Portrait Card */}
        <section className={styles.profileHeroSection} aria-label="About Rishabh Naik">
          <div className={styles.profileGrid}>
            {/* Left Column: Story, Bio & Actions */}
            <div className={styles.bioColumn}>
              <h1 className={styles.profileTitle}>Rishabh Naik</h1>

              <p className={styles.profileTagline}>
                Multidisciplinary creative specializing in rhythmic video editing, human-centered UI/UX systems, and visual storytelling.
              </p>

              <div className={styles.narrativeStack}>
                <p className={styles.narrativeText}>
                  My craft is rooted in pacing and rhythm: taking raw material—whether film footage,
                  typographic compositions, or software interfaces—and discovering the heartbeat
                  within it. I step away from generic templates to focus on intentional sound design,
                  dynamic cuts, and experiences that feel native and tactile.
                </p>

                <p className={styles.narrativeText}>
                  Over the past few years, I’ve worked across commercial cuts, high-retention short-form
                  reels, design systems, and software engineering. I care about the micro-details:
                  the cadence of a cut, the specular highlight on a card, and the exact weight of a font.
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className={styles.actionRow}>
                <button
                  type="button"
                  onClick={handleContactClick}
                  className={styles.contactBtn}
                  aria-label="Contact Rishabh Naik"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleResumeClick}
                  className={styles.resumeBtn}
                  aria-label="View and Download Rishabh Naik's Resume PDF"
                >
                  <Download size={15} />
                  <span>Resume</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Photo Card & Studio Stills */}
            <div className={styles.photoColumn}>
              <div className={styles.mainPhotoCard}>
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/about/director-camera.jpg"
                    alt="Rishabh Naik behind the camera and editing workstation"
                    className={styles.portraitImg}
                  />
                  <div className={styles.photoGradient} />
                </div>
              </div>

              {/* Secondary Duo Photos */}
              <div className={styles.photoDuoRow}>
                <div className={styles.subPhotoCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/about/director-monitor.jpg"
                    alt="Reviewing the cut on director monitor"
                    className={styles.subImg}
                    loading="lazy"
                  />
                </div>

                <div className={styles.subPhotoCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/about/director-viewfinder.jpg"
                    alt="Optical viewfinder framing"
                    className={styles.subImg}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Editorial Disciplines & Approach (Pure Typography, No SaaS Cards) */}
        <section className={styles.disciplinesSection} aria-label="Disciplines & Creative Focus">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeading}>Disciplines &amp; Focus</h2>
            <p className={styles.sectionSubtitle}>
              Where visual storytelling, tactile systems, and creative engineering intersect.
            </p>
          </div>

          <div className={styles.disciplinesGrid}>
            {DISCIPLINES.map((item, idx) => (
              <div key={idx} className={styles.disciplineItem}>
                <span className={styles.disciplineNumber}>{item.number}</span>
                <div className={styles.disciplineContent}>
                  <h3 className={styles.disciplineTitle}>{item.title}</h3>
                  <p className={styles.disciplineDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04 — Toolkit Words Row (Clean Typography, No Dot Pills) */}
        <section className={styles.toolkitSection} aria-label="Toolkit & Software">
          <h2 className={styles.toolkitHeading}>Selected Toolkit</h2>
          <div className={styles.toolkitWordsRow}>
            {TOOLKIT_LIST.map((tool, idx) => (
              <React.Fragment key={idx}>
                <span className={styles.toolkitWord}>{tool}</span>
                {idx < TOOLKIT_LIST.length - 1 && (
                  <span className={styles.toolkitDivider}>·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>

      {/* 05 — Shared Global Footer */}
      <Footer />
    </div>
  );
}
