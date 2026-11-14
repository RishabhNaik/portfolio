"use client";

import React, { useRef, useState, useEffect } from "react";
import { BTSShot } from "@/types/project";
import { FEATURED_HERO_ART } from "@/data/heroArt";
import { Header } from "../ui/Header";
import { GridFlipSlideshow } from "./GridFlipSlideshow";
import styles from "./Hero.module.css";

interface HeroProps {
  projects: BTSShot[];
  activeShot: BTSShot;
  onSelectShot: (shot: BTSShot) => void;
}

export const HeroGridFlipArchived: React.FC<HeroProps> = ({
  projects,
  activeShot,
  onSelectShot,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const [clickOrigin, setClickOrigin] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [artIndex, setArtIndex] = useState<number>(0);

  const activeProjectIndex = projects.slice(0, 5).findIndex((p) => p.id === activeShot.id);
  useEffect(() => {
    if (activeProjectIndex >= 0 && activeProjectIndex < FEATURED_HERO_ART.length) {
      setArtIndex(activeProjectIndex);
    }
  }, [activeProjectIndex]);

  const featuredArtImages = FEATURED_HERO_ART.map((art) => art.imageUrl);
  const currentFeaturedArt = FEATURED_HERO_ART[artIndex] || FEATURED_HERO_ART[0];

  const handleCanvasClick = (coords: { x: number; y: number }) => {
    setClickOrigin(coords);
    if (FEATURED_HERO_ART.length > 1) {
      const nextIndex = (artIndex + 1) % FEATURED_HERO_ART.length;
      setArtIndex(nextIndex);
      if (projects[nextIndex]) {
        onSelectShot(projects[nextIndex]);
      }
    }
  };

  return (
    <section ref={heroRef} id="hero" className={styles.hero} aria-label="Hero Section">
      <Header />
      <div className={styles.visualContainer}>
        <GridFlipSlideshow
          activeImageUrl={currentFeaturedArt.imageUrl}
          allImages={featuredArtImages}
          clickOrigin={clickOrigin}
          onCanvasClick={handleCanvasClick}
        />
        <div className={styles.gradientOverlay} />
        <div className={styles.vignette} />
      </div>
    </section>
  );
};
