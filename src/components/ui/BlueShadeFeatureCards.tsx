"use client";

import React from "react";
import {
  MousePointer,
  Zap,
  Filter,
  Layers,
  Film,
  Radio,
  Sliders,
  Sparkles,
  Bookmark,
  Share2,
  Tag,
  CheckCircle2,
} from "lucide-react";
import styles from "./BlueShadeFeatureCards.module.css";

interface BlueShadeFeatureCardsProps {
  headline?: string;
  subline?: string;
}

export const BlueShadeFeatureCards: React.FC<BlueShadeFeatureCardsProps> = ({
  headline = "Crafted Workflows, High-Impact Edits.",
  subline = "Combining dynamic pacing, engaging sound design, and retention-focused storytelling to craft videos that capture attention from the first second.",
}) => {
  return (
    <section className={styles.section} aria-label="Core Capabilities">
      <div className={styles.container}>
        {/* Centered Section Header */}
        <div className={styles.headerBlock}>
          <h2 className={styles.sectionHeadline}>{headline}</h2>
          <p className={styles.sectionSubline}>{subline}</p>
        </div>

        {/* 3-Column Luxury Cards in Blue Shades */}
        <div className={styles.cardsGrid}>
          {/* =========================================================
              CARD 1: 35mm Analog & Anamorphic Direction
              Volumetric Cobalt Beam (#1979D1) + Template Mockup
              ========================================================= */}
          <div className={styles.card}>
            <div className={styles.stage}>
              {/* Volumetric Cobalt Light Ray from Top-Left */}
              <div className={styles.lightRayCobalt} aria-hidden="true" />

              {/* Wireframe background element */}
              <div className={styles.bgWireframe} aria-hidden="true">
                <div className={styles.wireframeBar} style={{ width: "80%" }} />
                <div className={styles.wireframeBar} style={{ width: "55%" }} />
              </div>

              {/* Floating Glassmorphic Optical Selection Window */}
              <div className={styles.mockupWindow}>
                <div className={styles.windowHeader}>
                  <span className={styles.windowTitle}>Select Camera & Lens Rig</span>
                  <span className={styles.windowSub}>Choose optical glass configuration</span>
                </div>

                <div className={styles.windowList}>
                  <div className={styles.windowItem}>
                    <div className={styles.itemIconBox}>
                      <Film size={11} />
                    </div>
                    <span>Adobe Premiere Pro (Primary NLE)</span>
                  </div>

                  {/* Active glowing row matching user mockup */}
                  <div className={`${styles.windowItem} ${styles.windowItemActive}`}>
                    <div className={styles.itemIconBox}>
                      <Sliders size={11} />
                    </div>
                    <span>DaVinci Resolve Color Grade</span>
                    <MousePointer size={14} className={styles.cursorPointer} />
                  </div>

                  <div className={styles.windowItem}>
                    <div className={styles.itemIconBox}>
                      <Film size={11} />
                    </div>
                    <span>After Effects (Motion Graphics)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Dynamic Editing & Pacing</h3>
              <p className={styles.cardDescription}>
                Crafting videos with seamless match-cuts, speed ramps, and engaging hooks designed to stop the scroll.
              </p>
            </div>
          </div>

          {/* =========================================================
              CARD 2: Modular Sound & Audio Architecture
              Volumetric Cerulean Spotlight (#51ABDB) + Node Tree Mockup
              ========================================================= */}
          <div className={styles.card}>
            <div className={styles.stage}>
              {/* Volumetric Cerulean Spotlight from Top-Center */}
              <div className={styles.lightRayCerulean} aria-hidden="true" />

              {/* Connected Condition Node Stack */}
              <div className={styles.nodeStack}>
                <div className={styles.nodeCard}>
                  <div className={styles.nodeIconBox}>
                    <Zap size={12} />
                  </div>
                  <span>Foley & Sound Effects</span>
                </div>

                {/* Active Glowing Condition Node */}
                <div className={`${styles.nodeCard} ${styles.nodeCardActive}`}>
                  <div className={styles.nodeIconBox}>
                    <Filter size={12} />
                  </div>
                  <span>Beat-Synced Edits</span>
                </div>

                <div className={styles.nodeCard}>
                  <div className={styles.nodeIconBox}>
                    <Radio size={12} />
                  </div>
                  <span>Audio Mixing & Leveling</span>
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Impactful Sound Design</h3>
              <p className={styles.cardDescription}>
                Elevating visuals with layered audio—from sub-bass hits and transitions to clear voiceovers and environmental ambiance.
              </p>
            </div>
          </div>

          {/* =========================================================
              CARD 3: Creative Direction & Vault Actions
              Volumetric Sapphire/Mist Beam (#133865 / #B4C9D4) + Menu Mockup
              ========================================================= */}
          <div className={styles.card}>
            <div className={styles.stage}>
              {/* Volumetric Sapphire & Mist Light Ray from Top-Right */}
              <div className={styles.lightRaySapphire} aria-hidden="true" />

              {/* Floating Studio Actions Menu */}
              <div className={styles.actionMenuCard}>
                <div className={styles.menuHeaderBar}>
                  <span className={styles.menuHeaderTitle}>Studio Protocol</span>
                  <div className={styles.menuIcons}>
                    <Bookmark size={11} />
                    <Share2 size={11} />
                  </div>
                </div>

                <div className={styles.menuItem}>
                  <Film size={11} />
                  <span>9:16 Vertical Optimization</span>
                </div>

                <div className={styles.menuItem}>
                  <Layers size={11} />
                  <span>Multi-Platform Export</span>
                </div>

                {/* Active Highlighted Action */}
                <div className={`${styles.menuItem} ${styles.menuItemActive}`}>
                  <Tag size={11} />
                  <span>2026 Commission Schedule</span>
                </div>

                {/* Floating Avatar / Director Pill */}
                <div className={styles.avatarPillBadge}>
                  <CheckCircle2 size={11} />
                  <span>Rishabh Naik / Studio</span>
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Platform-Native Content</h3>
              <p className={styles.cardDescription}>
                Understanding what works on Instagram, TikTok, and YouTube, ensuring every video feels tailored for the algorithm and the audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
