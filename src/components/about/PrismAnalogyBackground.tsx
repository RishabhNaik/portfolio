"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./PrismAnalogyBackground.module.css";

export const PrismAnalogyBackground: React.FC = () => {
  const [mouseNorm, setMouseNorm] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let animFrame: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.035;
      currentY += (targetY - currentY) * 0.035;
      setMouseNorm({ x: currentX, y: currentY });
      animFrame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const flareX = mouseNorm.x * 25;
  const flareY = mouseNorm.y * 18;

  return (
    <div className={styles.cinemaBackdrop} aria-hidden="true">
      {/* 01 — Deep Sapphire Studio Environment */}
      <div className={styles.darkEnvironment} />

      {/* 02 — Off-Camera Key Illumination Source (Volumetric Haze Beam) */}
      <div
        className={styles.volumetricBeam}
        style={{
          transform: `translate(${flareX * 0.5}px, ${flareY * 0.5}px) rotate(${
            -18 + mouseNorm.y * 2
          }deg)`,
        }}
      />

      {/* 03 — Anamorphic Horizontal Lens Flare Streaks */}
      <div
        className={styles.anamorphicStreakPrimary}
        style={{
          transform: `translateY(${flareY * 1.5}px) scaleX(${1 + Math.abs(mouseNorm.x) * 0.08})`,
        }}
      />
      <div
        className={styles.anamorphicStreakSecondary}
        style={{
          transform: `translateY(${-flareY * 0.8}px)`,
        }}
      />

      {/* 04 — Organic Prism Refraction Caustic Fan (Soft Atmospheric Chromatic Bloom) */}
      <div
        className={styles.causticCluster}
        style={{
          transform: `translate(${flareX}px, ${flareY}px)`,
        }}
      >
        {/* Warm Golden / Amber Caustic Wash */}
        <div className={styles.causticAmber} />

        {/* Coral / Crimson Fringe */}
        <div className={styles.causticCrimson} />

        {/* Emerald Glow */}
        <div className={styles.causticEmerald} />

        {/* Deep Electric Cyan Bloom */}
        <div className={styles.causticCyan} />

        {/* Soft Violet Spectral Edge */}
        <div className={styles.causticViolet} />
      </div>

      {/* 05 — Physical Glass Dispersion Specular Core */}
      <div
        className={styles.glassSpecularCore}
        style={{
          transform: `translate(${flareX * 0.8}px, ${flareY * 0.8}px)`,
        }}
      />

      {/* 06 — Cinematic Film Gate & Anamorphic Letterbox Vignette */}
      <div className={styles.cinematicVignette} />

      {/* 07 — Atmospheric Light Haze Layer */}
      <div className={styles.theatricalHaze} />
    </div>
  );
};
