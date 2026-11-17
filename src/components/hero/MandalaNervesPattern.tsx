"use client";

import React from "react";
import styles from "./MandalaNervesPattern.module.css";

export const MandalaNervesPattern: React.FC = () => {
  return (
    <div className={styles.galaxyContainer} aria-hidden="true">
      <svg
        className={styles.svgCanvas}
        viewBox="0 0 1600 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients for Cosmic Neural Filaments */}
          <linearGradient id="cosmicNerve1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="cosmicNerve2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
          </linearGradient>

          {/* Radial Galaxy Glow Mask */}
          <radialGradient id="galaxyVignette" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <mask id="galaxyMask">
            <rect width="1600" height="1000" fill="url(#galaxyVignette)" />
          </mask>

          {/* Glow filter for stars and galactic nodes */}
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g mask="url(#galaxyMask)">
          {/* ========================================================
              01 — GALAXY SPIRAL NUCLEUS & SWIRLING ARMS
              Center placed organically at x: 800, y: 500
              ======================================================== */}
          <g className={styles.galaxyCore} transform="translate(800, 500)">
            {/* Center Supermassive Core Glow */}
            <circle cx="0" cy="0" r="18" className={styles.galacticNucleus} />
            <circle cx="0" cy="0" r="45" className={styles.coreAura} />
            <circle cx="0" cy="0" r="95" className={styles.coreOuterAura} />

            {/* Logarithmic Spiral Galaxy Arms */}
            <path
              d="M 0 0 C 40 -30, 80 -80, 110 -150 C 140 -220, 180 -280, 260 -320 C 340 -360, 450 -380, 580 -350"
              className={`${styles.spiralArm} ${styles.pulseSpiral1}`}
            />
            <path
              d="M 0 0 C -40 30, -80 80, -110 150 C -140 220, -180 280, -260 320 C -340 360, -450 380, -580 350"
              className={`${styles.spiralArm} ${styles.pulseSpiral2}`}
            />
            <path
              d="M 0 0 C 30 40, 80 80, 150 110 C 220 140, 280 180, 320 260 C 360 340, 380 450, 350 580"
              className={`${styles.spiralArm} ${styles.pulseSpiral3}`}
            />
            <path
              d="M 0 0 C -30 -40, -80 -80, -150 -110 C -220 -140, -280 -180, -320 -260 C -360 -340, -380 -450, -350 -580"
              className={`${styles.spiralArm} ${styles.pulseSpiral4}`}
            />
          </g>

          {/* ========================================================
              02 — ORGANIC NEURAL FILAMENTS & DENDRITE BRANCHES
              Branching outward across the cosmos like neural tissue
              ======================================================== */}
          <g className={styles.neuralFilamentGrid}>
            {/* Main Trunk Alpha: Center to Top-Right */}
            <path
              d="M 800 500 C 920 420, 1050 380, 1160 310 C 1240 260, 1320 190, 1420 130 C 1490 80, 1560 60, 1620 20"
              className={`${styles.mainNerve} ${styles.pulseStream1}`}
            />
            {/* Alpha Sub-branches */}
            <path
              d="M 1050 380 C 1140 430, 1260 460, 1380 440 C 1480 420, 1560 450, 1640 430"
              className={`${styles.subNerve} ${styles.pulseStream2}`}
            />
            <path
              d="M 1160 310 C 1240 340, 1340 330, 1450 300 C 1530 280, 1580 250, 1650 240"
              className={`${styles.subNerve} ${styles.pulseStream3}`}
            />
            <path
              d="M 1320 190 C 1370 240, 1450 260, 1540 250"
              className={`${styles.subNerve} ${styles.pulseStream4}`}
            />
            <path
              d="M 1420 130 C 1460 170, 1510 190, 1580 180"
              className={`${styles.fineDendrite} ${styles.pulseStream1}`}
            />

            {/* Main Trunk Beta: Center to Bottom-Right */}
            <path
              d="M 800 500 C 930 580, 1060 630, 1180 710 C 1270 770, 1370 820, 1480 870 C 1540 900, 1600 930, 1650 960"
              className={`${styles.mainNerve} ${styles.pulseStream2}`}
            />
            {/* Beta Sub-branches */}
            <path
              d="M 1060 630 C 1150 590, 1250 580, 1370 610 C 1460 630, 1540 600, 1620 580"
              className={`${styles.subNerve} ${styles.pulseStream3}`}
            />
            <path
              d="M 1180 710 C 1240 660, 1330 650, 1440 670 C 1520 690, 1580 720, 1650 710"
              className={`${styles.subNerve} ${styles.pulseStream4}`}
            />
            <path
              d="M 1370 820 C 1420 760, 1500 740, 1590 750"
              className={`${styles.fineDendrite} ${styles.pulseStream1}`}
            />

            {/* Main Trunk Gamma: Center to Bottom-Left */}
            <path
              d="M 800 500 C 670 580, 540 630, 420 710 C 330 770, 230 820, 120 870 C 60 900, 0 930, -50 960"
              className={`${styles.mainNerve} ${styles.pulseStream3}`}
            />
            {/* Gamma Sub-branches */}
            <path
              d="M 540 630 C 450 590, 350 580, 230 610 C 140 630, 60 600, -20 580"
              className={`${styles.subNerve} ${styles.pulseStream4}`}
            />
            <path
              d="M 420 710 C 360 660, 270 650, 160 670 C 80 690, 20 720, -50 710"
              className={`${styles.subNerve} ${styles.pulseStream1}`}
            />
            <path
              d="M 230 820 C 180 760, 100 740, 10 750"
              className={`${styles.fineDendrite} ${styles.pulseStream2}`}
            />

            {/* Main Trunk Delta: Center to Top-Left */}
            <path
              d="M 800 500 C 680 420, 550 380, 440 310 C 360 260, 280 190, 180 130 C 110 80, 40 60, -20 20"
              className={`${styles.mainNerve} ${styles.pulseStream4}`}
            />
            {/* Delta Sub-branches */}
            <path
              d="M 550 380 C 460 430, 340 460, 220 440 C 120 420, 40 450, -40 430"
              className={`${styles.subNerve} ${styles.pulseStream1}`}
            />
            <path
              d="M 440 310 C 360 340, 260 330, 150 300 C 70 280, 20 250, -50 240"
              className={`${styles.subNerve} ${styles.pulseStream2}`}
            />
            <path
              d="M 280 190 C 230 240, 150 260, 60 250"
              className={`${styles.subNerve} ${styles.pulseStream3}`}
            />
            <path
              d="M 180 130 C 140 170, 90 190, 20 180"
              className={`${styles.fineDendrite} ${styles.pulseStream4}`}
            />

            {/* Inter-neural Bridge Synaptic Filaments (Neural Mesh) */}
            <path
              d="M 1050 380 C 1080 470, 1070 540, 1060 630"
              className={`${styles.synapticBridge} ${styles.pulseStream1}`}
            />
            <path
              d="M 550 380 C 520 470, 530 540, 540 630"
              className={`${styles.synapticBridge} ${styles.pulseStream2}`}
            />
            <path
              d="M 680 340 C 740 300, 860 300, 920 340"
              className={`${styles.synapticBridge} ${styles.pulseStream3}`}
            />
            <path
              d="M 680 660 C 740 700, 860 700, 920 660"
              className={`${styles.synapticBridge} ${styles.pulseStream4}`}
            />
          </g>

          {/* ========================================================
              03 — CONSTELLATION NODES & SYNAPTIC STARS
              Pulsating stellar junction points located at branch bifurcations
              ======================================================== */}
          <g className={styles.starCluster}>
            {/* Major Junction Stars */}
            <circle cx="1050" cy="380" r="5" className={styles.majorStar1} filter="url(#starGlow)" />
            <circle cx="1160" cy="310" r="4.5" className={styles.majorStar2} filter="url(#starGlow)" />
            <circle cx="1320" cy="190" r="4" className={styles.majorStar3} filter="url(#starGlow)" />
            <circle cx="1420" cy="130" r="3.5" className={styles.majorStar1} />
            <circle cx="1380" cy="440" r="4" className={styles.majorStar2} />

            <circle cx="1060" cy="630" r="5" className={styles.majorStar3} filter="url(#starGlow)" />
            <circle cx="1180" cy="710" r="4.5" className={styles.majorStar1} filter="url(#starGlow)" />
            <circle cx="1370" cy="820" r="4" className={styles.majorStar2} filter="url(#starGlow)" />
            <circle cx="1370" cy="610" r="4" className={styles.majorStar3} />

            <circle cx="540" cy="630" r="5" className={styles.majorStar1} filter="url(#starGlow)" />
            <circle cx="420" cy="710" r="4.5" className={styles.majorStar2} filter="url(#starGlow)" />
            <circle cx="230" cy="820" r="4" className={styles.majorStar3} filter="url(#starGlow)" />
            <circle cx="230" cy="610" r="4" className={styles.majorStar1} />

            <circle cx="550" cy="380" r="5" className={styles.majorStar2} filter="url(#starGlow)" />
            <circle cx="440" cy="310" r="4.5" className={styles.majorStar3} filter="url(#starGlow)" />
            <circle cx="280" cy="190" r="4" className={styles.majorStar1} filter="url(#starGlow)" />
            <circle cx="180" cy="130" r="3.5" className={styles.majorStar2} />
            <circle cx="220" cy="440" r="4" className={styles.majorStar3} />

            {/* Ambient Cosmic Stardust (Micro-nodes scattered in deep space) */}
            {[
              [720, 240, 2], [880, 260, 2.5], [640, 180, 1.8], [960, 200, 2.2],
              [1120, 180, 2], [1280, 260, 2.5], [1460, 360, 2], [1520, 480, 2.2],
              [740, 760, 2], [860, 740, 2.5], [620, 820, 1.8], [980, 800, 2.2],
              [480, 820, 2], [320, 740, 2.5], [140, 640, 2], [80, 520, 2.2],
              [900, 420, 2.5], [700, 420, 2.5], [900, 580, 2.5], [700, 580, 2.5]
            ].map(([x, y, r], idx) => (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r={r}
                className={idx % 2 === 0 ? styles.ambientStar1 : styles.ambientStar2}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};
