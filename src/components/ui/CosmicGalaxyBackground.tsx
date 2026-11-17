"use client";

import React from "react";
import styles from "./CosmicGalaxyBackground.module.css";

export const CosmicGalaxyBackground: React.FC = () => {
  return (
    <div className={styles.texturedBgWrapper} aria-hidden="true">
      {/* 01 — Smoothly Animating Organic Luminous Blobs */}
      <div className={styles.blobsContainer}>
        {/* Blob 1: Vibrant Cyan / Sky Blue, orbiting smoothly */}
        <div className={`${styles.blob} ${styles.blobCyan}`} />
        {/* Blob 2: Deep Sapphire / Royal Blue, drifting diagonally */}
        <div className={`${styles.blob} ${styles.blobSapphire}`} />
        {/* Blob 3: Rich Indigo / Violet accent, pulsing gently */}
        <div className={`${styles.blob} ${styles.blobIndigo}`} />
        {/* Blob 4: Bright Electric Sky highlight, floating softly */}
        <div className={`${styles.blob} ${styles.blobElectric}`} />
        {/* Blob 5: Deep Midnight Oceanic base glow */}
        <div className={`${styles.blob} ${styles.blobOceanic}`} />
      </div>

      {/* 02 — Radial Atmospheric Vignette & Contrast Depth */}
      <div className={styles.vignetteOverlay} />

      {/* 03 — Tactile Textured Noise Overlay */}
      <div className={styles.noiseTexture} />
      <div className={styles.microGrainTexture} />
    </div>
  );
};

export const TexturedBlobBackground = CosmicGalaxyBackground;
