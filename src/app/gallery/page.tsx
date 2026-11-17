"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Header } from "@/components/ui/Header";
import { CosmicGalaxyBackground } from "@/components/ui/CosmicGalaxyBackground";
import { Footer } from "@/components/footer/Footer";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./GalleryPage.module.css";

export default function GalleryPage() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const activeIndex = useMemo(() => {
    if (!activeItem) return -1;
    return GALLERY_ITEMS.findIndex((item) => item.id === activeItem.id);
  }, [activeItem]);

  const handleOpenLightbox = (item: GalleryItem) => {
    cinematicAudioHaptics.playTactileClick();
    setActiveItem(item);
  };

  const handleCloseLightbox = useCallback(() => {
    cinematicAudioHaptics.playSlateTick();
    setActiveItem(null);
  }, []);

  const handlePrevImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (activeIndex <= 0) {
        setActiveItem(GALLERY_ITEMS[GALLERY_ITEMS.length - 1]);
      } else {
        setActiveItem(GALLERY_ITEMS[activeIndex - 1]);
      }
      cinematicAudioHaptics.playTactileClick();
    },
    [activeIndex]
  );

  const handleNextImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (activeIndex >= GALLERY_ITEMS.length - 1) {
        setActiveItem(GALLERY_ITEMS[0]);
      } else {
        setActiveItem(GALLERY_ITEMS[activeIndex + 1]);
      }
      cinematicAudioHaptics.playTactileClick();
    },
    [activeIndex]
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        if (activeIndex <= 0) {
          setActiveItem(GALLERY_ITEMS[GALLERY_ITEMS.length - 1]);
        } else {
          setActiveItem(GALLERY_ITEMS[activeIndex - 1]);
        }
      } else if (e.key === "ArrowRight") {
        if (activeIndex >= GALLERY_ITEMS.length - 1) {
          setActiveItem(GALLERY_ITEMS[0]);
        } else {
          setActiveItem(GALLERY_ITEMS[activeIndex + 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, activeIndex, handleCloseLightbox]);

  return (
    <div className={styles.galleryPageWrapper}>
      {/* 00 — Cosmic Galaxy Starfield Background */}
      <CosmicGalaxyBackground />

      <div className={styles.contentLayer}>
        {/* Global Navigation Header with Gallery link */}
        <Header />

        {/* 01 — Minimalist Header Row (Clean, zero tags or counters) */}
        <div className={styles.galleryTopRow}>
          <h1 className={styles.galleryTitle}>Gallery</h1>
        </div>

        {/* 02 — Pure Bento Grid Layout */}
        <main className={styles.bentoGrid} aria-label="Visual Bento Gallery">
          {GALLERY_ITEMS.map((item) => {
            const spanClass =
              item.bentoSpan === "2x2"
                ? styles.span2x2
                : item.bentoSpan === "2x1"
                ? styles.span2x1
                : item.bentoSpan === "1x2"
                ? styles.span1x2
                : styles.span1x1;

            return (
              <article
                key={item.id}
                className={`${styles.bentoCard} ${spanClass}`}
                onClick={() => handleOpenLightbox(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenLightbox(item);
                  }
                }}
                aria-label={`View frame: ${item.title}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={styles.bentoImage}
                  loading="lazy"
                  draggable={false}
                />
                <div className={styles.bentoGradient} />

                <div className={styles.bentoOverlay}>
                  <h2 className={styles.bentoTitle}>{item.title}</h2>
                </div>
              </article>
            );
          })}
        </main>

        {/* 03 — Fullscreen Interactive Lightbox Modal */}
        {activeItem && (
          <div
            className={styles.lightboxBackdrop}
            onClick={handleCloseLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            <div
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.lightboxCloseBtn}
                onClick={handleCloseLightbox}
                aria-label="Close fullscreen preview"
              >
                <X size={22} />
              </button>

              {GALLERY_ITEMS.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.lightboxNavBtn} ${styles.lightboxPrev}`}
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`}
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className={styles.lightboxImageArea}>
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className={styles.lightboxImage}
                />
              </div>

              <div className={styles.lightboxDetails}>
                <div className={styles.lightboxInfo}>
                  <h2 className={styles.lightboxTitle}>{activeItem.title}</h2>
                  <p className={styles.lightboxMeta}>{activeItem.meta}</p>
                </div>
                <div className={styles.lightboxTags}>
                  <span>{activeItem.location || "Production Shoot"}</span>
                  <span>·</span>
                  <span>{activeItem.year}</span>
                  <span>·</span>
                  <span>{activeItem.categoryLabel}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Footer */}
        <Footer />
      </div>
    </div>
  );
}
