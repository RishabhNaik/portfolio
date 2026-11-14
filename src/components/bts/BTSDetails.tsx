"use client";

import React from "react";
import Link from "next/link";
import { BTSShot } from "@/types/project";
import styles from "./BTS.module.css";

interface BTSDetailsProps {
  shot: BTSShot;
  currentIndex: number;
  totalCount: number;
  onSelectIndex: (index: number) => void;
}

export const BTSDetails: React.FC<BTSDetailsProps> = ({
  shot,
  currentIndex,
  totalCount,
  onSelectIndex,
}) => {
  const specs = shot.technicalSpecs;

  return (
    <div className={styles.detailsContainer}>
      {/* Top Section: Title, Date, Category matching user mockup hierarchy */}
      <div className={styles.mockupHeaderGroup}>
        <div className={styles.titleMetaBlock}>
          <h3 className={styles.projectTitle}>{shot.title}</h3>
          <div className={styles.dateLabel}>{shot.date}</div>
          <div className={styles.categoryBadge}>{shot.category}</div>
        </div>

        {/* Narrative / Description */}
        <p className={styles.backstoryText}>
          {shot.synopsis || shot.description}
        </p>

        {/* Optional Specs Chips */}
        {specs && (
          <div className={styles.miniSpecsRow}>
            {specs.camera && (
              <div className={styles.miniSpecItem}>
                <span className={styles.miniSpecLabel}>Camera</span>
                <span className={styles.miniSpecVal}>{specs.camera}</span>
              </div>
            )}
            {specs.lenses && (
              <div className={styles.miniSpecItem}>
                <span className={styles.miniSpecLabel}>Optics</span>
                <span className={styles.miniSpecVal}>{specs.lenses}</span>
              </div>
            )}
            {specs.aspectRatio && (
              <div className={styles.miniSpecItem}>
                <span className={styles.miniSpecLabel}>Scope</span>
                <span className={styles.miniSpecVal}>{specs.aspectRatio}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Row: Pill Button + Shot Switcher matching mockup */}
      <div className={styles.detailsFooter}>
        <Link href={`/projects/${shot.id}`} className={styles.mockupPillBtn}>
          <span>View Portfolio Space</span>
          <span aria-hidden="true">→</span>
        </Link>

        {/* Shot switcher pills */}
        <div className={styles.shotPills} role="tablist" aria-label="Shot switcher">
          {Array.from({ length: totalCount }).map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === currentIndex}
              className={`${styles.pillItem} ${idx === currentIndex ? styles.pillActive : ""}`}
              onClick={() => onSelectIndex(idx)}
              aria-label={`Go to shot ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
