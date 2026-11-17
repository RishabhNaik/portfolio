"use client";

import React, { useState } from "react";
import { PROJECTS_DATA } from "@/data/projects";
import { BTSShot } from "@/types/project";
import { Hero } from "@/components/hero/Hero";
import { PhotographySlideshow } from "@/components/home/PhotographySlideshow";
import { IdeasShowcase } from "@/components/home/IdeasShowcase";
import { CosmicGalaxyBackground } from "@/components/ui/CosmicGalaxyBackground";
import { Footer } from "@/components/footer/Footer";
import styles from "./page.module.css";

export default function Home() {
  const [activeShot, setActiveShot] = useState<BTSShot>(PROJECTS_DATA[0]);

  const handleSelectShot = (shot: BTSShot) => {
    setActiveShot(shot);
  };

  return (
    <main className={styles.landingWrapper}>
      {/* 00 — Procedural Cosmic Galaxy Nebula & Starfield (Static, Zero Animation) */}
      <CosmicGalaxyBackground />

      {/* Foreground Content: Hero, Photography Slideshow, Tools & Tech, and Footer */}
      <div className={styles.contentLayer}>
        {/* 01 — HERO with Carousel and Two-line Statement */}
        <Hero
          projects={PROJECTS_DATA}
          activeShot={activeShot}
          onSelectShot={handleSelectShot}
        />

        {/* 02 — DIRECTORIAL / PHOTOGRAPHY 3-COLUMN SHOWCASE */}
        <PhotographySlideshow />

        {/* 03 — IDEAS I WANT TO WORK ON SHOWCASE (COMMENTED OUT) */}
        {/* <IdeasShowcase /> */}

        {/* 04 — FOOTER */}
        <Footer />
      </div>
    </main>
  );
}
