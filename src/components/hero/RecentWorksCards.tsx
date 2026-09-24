import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BTSShot } from "@/types/project";
import styles from "./RecentWorksCards.module.css";

interface RecentWorksCardsProps {
  projects: BTSShot[];
  activeShot: BTSShot;
  onSelectShot: (shot: BTSShot, e?: React.MouseEvent) => void;
}

export const RecentWorksCards: React.FC<RecentWorksCardsProps> = ({
  projects,
  activeShot,
  onSelectShot,
}) => {
  // 5 cards row
  const displayCards = projects.slice(0, 5);

  return (
    <div className={styles.bridgeContainer} aria-label="Selected works preview cards">
      {/* Sleek dock header above cards on the hero section */}
      <div className={styles.dockHeader}>
        <div className={styles.labelGroup}>
          <span className={styles.sectionNumber}>01</span>
          <span className={styles.sectionDivider}>/</span>
          <span className={styles.sectionTitle}>Selected Works</span>
        </div>
        <div className={styles.actionHint}>
          <span>Explore Selected Works</span>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {displayCards.map((shot, index) => {
          const isActive = shot.id === activeShot.id;
          const isFirst = index === 0;
          const isLast = index === displayCards.length - 1;

          return (
            <div
              key={shot.id}
              className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectShot(shot, e);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  onSelectShot(shot);
                }
              }}
              aria-label={`Select ${shot.title}`}
            >
              {/* Card Image Thumbnail: Artistic Cover Creative */}
              <div className={styles.imageContainer}>
                <Image
                  src={shot.coverImageUrl || shot.imageUrl}
                  alt={shot.title}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 45vw, 22vw"
                />
                <div className={styles.cardOverlay} />
              </div>

              {/* Name & Small Detail (like date & category) inside the card */}
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{shot.title}</h3>
                <div className={styles.cardMeta}>
                  <span className={styles.cardDate}>{shot.date}</span>
                  <span className={styles.cardDivider}>/</span>
                  <span className={styles.cardCategory}>{shot.category}</span>
                </div>
              </div>

              {/* Quick direct link to open project detail page */}
              {isActive && (
                <Link
                  href={`/projects/${shot.id}`}
                  className={styles.openDetailBtn}
                  onClick={(e) => e.stopPropagation()}
                  title={`Open ${shot.title} detail page`}
                >
                  Detail ↗
                </Link>
              )}

              {/* Active Blue/Cyan Border Highlight */}
              {isActive && <div className={styles.activeGlowFrame} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
