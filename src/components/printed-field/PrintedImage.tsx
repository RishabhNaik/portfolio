"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BTSShot } from "@/types/project";
import { ArrowUpRight } from "lucide-react";
import styles from "./PrintedField.module.css";

interface PrintedImageProps {
  shot: BTSShot;
  isActive: boolean;
  onSelect: (shot: BTSShot) => void;
  index: number;
}

export const PrintedImage: React.FC<PrintedImageProps> = ({
  shot,
  isActive,
  onSelect,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const editionNumber = String(index + 1).padStart(2, "0");
  const displayImage = shot.heroImageUrl || shot.coverImageUrl || shot.imageUrl;

  return (
    <div
      ref={cardRef}
      className={`${styles.galleryCard} ${isActive ? styles.activeGalleryCard : ""}`}
      onClick={() => onSelect(shot)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View ${shot.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(shot);
        }
      }}
    >
      {/* Gallery Frame & Photographic Plate */}
      <div className={styles.frameWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={displayImage}
            alt={shot.title}
            fill
            className={styles.plateImage}
            sizes="(max-width: 768px) 85vw, 420px"
          />
          <div className={styles.imageSoftVignette} />

          {/* Minimalist Floating Work Link on Hover */}
          <Link
            href={`/projects/${shot.id}`}
            className={styles.hoverViewBtn}
            onClick={(e) => e.stopPropagation()}
            title={`Open ${shot.title} details`}
          >
            <span>View Work</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Exhibition Fine-Art Caption Strip */}
        <div className={styles.captionBlock}>
          <div className={styles.captionLeft}>
            <span className={styles.editionIndex}>{editionNumber}</span>
            <div className={styles.titleGroup}>
              <h3 className={styles.cardTitle}>{shot.title}</h3>
              <p className={styles.cardCategory}>{shot.category}</p>
            </div>
          </div>

          <Link
            href={`/projects/${shot.id}`}
            className={styles.directLinkArrow}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${shot.title}`}
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
