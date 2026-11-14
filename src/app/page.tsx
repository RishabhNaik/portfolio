"use client";

import React, { useState } from "react";
import { PROJECTS_DATA } from "@/data/projects";
import { BTSShot } from "@/types/project";
import { Hero } from "@/components/hero/Hero";
import { Intro } from "@/components/intro/Intro";
import { PrintedField } from "@/components/printed-field/PrintedField";
import { AboutSection } from "@/components/about/AboutSection";
import { BTSSection } from "@/components/bts/BTSSection";
import { Footer } from "@/components/footer/Footer";
import styles from "./page.module.css";

export default function Home() {
  const [activeShot, setActiveShot] = useState<BTSShot>(PROJECTS_DATA[0]);

  const handleSelectShot = (shot: BTSShot) => {
    setActiveShot(shot);
  };

  return (
    <main className={styles.landingWrapper}>
      {/* Cinematic Ambient Gradient Layer with Custom Palette Swatches */}
      <div className={styles.ambientGradientLayer} aria-hidden="true">
        <div className={styles.glowCobaltTop} />
        <div className={styles.glowNavyMid} />
        <div className={styles.glowCeruleanWorks} />
        <div className={styles.glowOceanBTS} />
        <div className={styles.glowMistBottom} />
      </div>

      {/* Foreground Sections Layer */}
      <div className={styles.contentLayer}>
        {/* 01 — HERO with Featured Visual */}
        <Hero
          projects={PROJECTS_DATA}
          activeShot={activeShot}
          onSelectShot={handleSelectShot}
        />

        {/* 02 — INTRO with deep ocean lighting & media preview */}
        <Intro />

        {/* 03 — FREE-MOVING PRINTED IMAGE FIELD */}
        <PrintedField
          projects={PROJECTS_DATA}
          activeShot={activeShot}
          onSelectShot={handleSelectShot}
        />

        {/* 04 — ABOUT SECTION (Profile, Philosophy & Core Capabilities) */}
        <AboutSection />

        {/* 05 — BTS MEDIA + DETAILS + IPOD CONTROLLER */}
        <BTSSection
          projects={PROJECTS_DATA}
          activeShot={activeShot}
          onSelectShot={handleSelectShot}
        />

        {/* 05 — FOOTER */}
        <Footer />
      </div>
    </main>
  );
}
