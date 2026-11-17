"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { BTSShot } from "@/types/project";
import { PrintedImage } from "./PrintedImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./PrintedField.module.css";

interface PrintedFieldProps {
  projects: BTSShot[];
  activeShot: BTSShot;
  onSelectShot: (shot: BTSShot) => void;
}

export const PrintedField: React.FC<PrintedFieldProps> = ({
  projects,
  activeShot,
  onSelectShot,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Drag to scroll tracking
  const isPointerDown = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);
  const hasDragged = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;

    setCanScrollLeft(currentScroll > 10);
    setCanScrollRight(currentScroll < maxScroll - 10);

    const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));

    // Detect centered card
    const containerCenter = currentScroll + el.clientWidth / 2;
    const cards = el.querySelectorAll(`.${styles.galleryCard}`);
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardEl = card as HTMLElement;
      const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex && projects[closestIndex]) {
      setActiveIndex(closestIndex);
      onSelectShot(projects[closestIndex]);
    }
  }, [activeIndex, projects, onSelectShot]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Sync with activeShot from other components
  useEffect(() => {
    const foundIdx = projects.findIndex((p) => p.id === activeShot.id);
    if (foundIdx !== -1 && foundIdx !== activeIndex) {
      setActiveIndex(foundIdx);
    }
  }, [activeShot, projects, activeIndex]);

  const scrollToCard = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(`.${styles.galleryCard}`);
    const targetCard = cards[index] as HTMLElement | undefined;
    if (targetCard) {
      const targetScroll =
        targetCard.offsetLeft - el.clientWidth / 2 + targetCard.offsetWidth / 2;
      el.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  };

  const scrollByDelta = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  // Mouse Wheel translation
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (Math.abs(e.deltaY) > 0) {
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd =
        el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 && e.deltaY > 0;
      if (!atStart && !atEnd) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.1;
      }
    }
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isPointerDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isPointerDown.current = false;
  };

  const currentProject = projects[activeIndex] || projects[0];

  return (
    <section
      id="work"
      className={styles.gallerySection}
      aria-label="Physical Archive Gallery Reel"
    >
      {/* Clean Exhibition Header */}
      <div className={styles.galleryHeader}>
        <div className={styles.headerInfo}>
          <span className={styles.galleryEyebrow}>PHYSICAL ARCHIVE</span>
          <h2 className={styles.galleryHeading}>Production Archive</h2>
          <p className={styles.gallerySub}>
            A tactile exhibition of cinema stills, directional plates, and physical celluloid prints.
          </p>
        </div>

        {/* Gallery Navigation & Index Counter */}
        <div className={styles.headerControls}>
          <div className={styles.minimalCounter}>
            <span className={styles.activeNumber}>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className={styles.divider}>—</span>
            <span className={styles.totalNumber}>
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className={styles.arrowGroup}>
            <button
              type="button"
              className={`${styles.arrowBtn} ${!canScrollLeft ? styles.arrowDisabled : ""}`}
              onClick={() => scrollByDelta("left")}
              disabled={!canScrollLeft}
              aria-label="Previous work"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className={`${styles.arrowBtn} ${!canScrollRight ? styles.arrowDisabled : ""}`}
              onClick={() => scrollByDelta("right")}
              disabled={!canScrollRight}
              aria-label="Next work"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Progress Line */}
      <div className={styles.progressTrackWrapper} aria-hidden="true">
        <div
          className={styles.progressBar}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Clean Exhibition Scroll Reel */}
      <div
        ref={scrollContainerRef}
        className={styles.scrollContainer}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="region"
        aria-label="Selected works exhibition reel"
        tabIndex={0}
      >
        <div className={styles.cardsTrack}>
          {projects.map((shot, index) => (
            <PrintedImage
              key={shot.id}
              shot={shot}
              isActive={activeShot.id === shot.id}
              onSelect={(selectedShot) => {
                if (!hasDragged.current) {
                  cinematicAudioHaptics.playTactileClick();
                  onSelectShot(selectedShot);
                  scrollToCard(index);
                }
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
