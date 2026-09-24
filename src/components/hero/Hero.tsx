"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { BTSShot } from "@/types/project";
import { FEATURED_HERO_ART } from "@/data/heroArt";
import { Header } from "../ui/Header";
import { GridFlipSlideshow } from "./GridFlipSlideshow";
import { WorkCategoriesDock } from "./WorkCategoriesDock";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./Hero.module.css";

interface HeroProps {
  projects: BTSShot[];
  activeShot: BTSShot;
  onSelectShot: (shot: BTSShot) => void;
}

export const Hero: React.FC<HeroProps> = ({
  projects,
  activeShot,
  onSelectShot,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const [clickOrigin, setClickOrigin] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [artIndex, setArtIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const featuredArtImages = FEATURED_HERO_ART.map((art) => art.imageUrl);
  const currentFeaturedArt = FEATURED_HERO_ART[artIndex] || FEATURED_HERO_ART[0];

  // Advance to next slide
  const nextSlide = useCallback((coords?: { x: number; y: number }) => {
    setClickOrigin(coords || { x: 0.5, y: 0.5 });
    setArtIndex((prev) => (prev + 1) % FEATURED_HERO_ART.length);
  }, []);

  // When clicking anywhere on the hero visual canvas:
  // Trigger click-origin ripple flip to the next featured art piece with camera shutter sound & haptic vibration
  const handleCanvasClick = (coords: { x: number; y: number }) => {
    cinematicAudioHaptics.playCameraShutter();
    nextSlide(coords);
  };

  // Auto-advance slideshow every 6 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused || FEATURED_HERO_ART.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide({ x: 0.5, y: 0.5 });
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Synchronize CSS custom properties across document root and hero container
  useEffect(() => {
    if (!currentFeaturedArt?.accent) return;
    const root = document.documentElement;
    root.style.setProperty("--hero-accent-primary", currentFeaturedArt.accent.primary);
    root.style.setProperty("--hero-accent-secondary", currentFeaturedArt.accent.secondary);
    root.style.setProperty("--hero-accent-gradient", currentFeaturedArt.accent.gradient);
    root.style.setProperty("--hero-accent-glow", currentFeaturedArt.accent.glowHex);
    root.style.setProperty("--hero-accent-shadow", currentFeaturedArt.accent.shadow);
  }, [currentFeaturedArt]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={styles.hero}
      aria-label="Hero Section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Massive ambient background blur layer in the current hero image accent */}
      <div
        className={styles.heroAccentBlurBg}
        style={{
          background: currentFeaturedArt.accent?.gradient,
        }}
        aria-hidden="true"
      />

      {/* Header at top */}
      <Header />

      {/* Full-bleed Hero Visual filling the entire hero section */}
      <div className={styles.slideshowWrapper}>
        <GridFlipSlideshow
          activeImageUrl={currentFeaturedArt.imageUrl}
          allImages={featuredArtImages}
          clickOrigin={clickOrigin}
          onCanvasClick={handleCanvasClick}
        />
        <div className={styles.gradientOverlay} />
        <div className={styles.vignette} />

        {/* Luminous atmospheric bloom overlay in the active hero accent */}
        <div
          className={styles.heroAccentAtmosphere}
          style={{
            background: currentFeaturedArt.accent?.gradient,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Categories I Work In docked on the hero section below */}
      <WorkCategoriesDock
        projects={projects}
        onSelectShot={onSelectShot}
      />
    </section>
  );
};
