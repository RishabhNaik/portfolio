"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WORK_CATEGORIES, WorkCategory } from "@/data/categories";
import { BTSShot } from "@/types/project";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./WorkCategoriesDock.module.css";

interface WorkCategoriesDockProps {
  onSelectCategory?: (category: WorkCategory) => void;
  onSelectShot?: (shot: BTSShot) => void;
  projects?: BTSShot[];
}

export const WorkCategoriesDock: React.FC<WorkCategoriesDockProps> = ({
  onSelectCategory,
  onSelectShot,
  projects = [],
}) => {
  const [activeCatId, setActiveCatId] = useState<string>(WORK_CATEGORIES[0].id);

  const handleCardClick = (category: WorkCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    cinematicAudioHaptics.playTactileClick();
    setActiveCatId(category.id);

    if (onSelectCategory) {
      onSelectCategory(category);
    }

    // Optionally select corresponding project in BTS section without touching hero
    if (onSelectShot && projects.length > 0) {
      const match = projects.find((p) => p.id === category.projectId);
      if (match) {
        onSelectShot(match);
      }
    }
  };

  return (
    <div className={styles.dockContainer} aria-label="Creative practice categories">
      {/* Header above categories on the hero section with no numbering */}
      <div className={styles.dockHeader}>
        <div className={styles.labelGroup}>
          <span className={styles.sectionTitle}>Areas I’m Exploring</span>
        </div>
        <div className={styles.actionHint}>
          <span>Learning through making</span>
        </div>
      </div>

      {/* 5 Categories Cards Grid */}
      <div className={styles.categoriesGrid}>
        {WORK_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCatId;

          return (
            <div
              key={cat.id}
              className={`${styles.categoryCard} ${isActive ? styles.cardActive : ""}`}
              onClick={(e) => handleCardClick(cat, e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  handleCardClick(cat, e as unknown as React.MouseEvent);
                }
              }}
              aria-label={`Explore category ${cat.title}`}
            >
              {/* Card Image Thumbnail */}
              <div className={styles.imageContainer}>
                <Image
                  src={cat.imageUrl}
                  alt={cat.title}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 45vw, 20vw"
                />
                <div className={styles.cardOverlay} />
              </div>

              {/* Category Info */}
              <div className={styles.cardContent}>
                <div className={styles.cardTopRow}>
                  <span className={styles.projectCount}>{cat.projectCount} space to fill</span>
                </div>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <span className={styles.cardSubtitle}>{cat.subtitle}</span>
              </div>

              {/* Direct Link to Projects filtered or listing */}
              <Link
                href="/projects"
                className={styles.exploreBtn}
                onClick={(e) => e.stopPropagation()}
                title={`View ${cat.title} portfolio space`}
              >
                View ↗
              </Link>

              {/* Active Dynamic Border Highlight */}
              {isActive && <div className={styles.activeGlowFrame} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
