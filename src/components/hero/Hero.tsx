"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BTSShot } from "@/types/project";
import { Header } from "../ui/Header";
import { HERO_CARDS } from "@/data/heroTiles";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./Hero.module.css";

interface HeroProps {
  projects?: BTSShot[];
  activeShot?: BTSShot;
  onSelectShot?: (shot: BTSShot) => void;
}

const DYNAMIC_STATEMENTS = [
  {
    part1: "Building Products,",
    part2: "Designing Experiences",
    line1: "Building Products, Designing Experiences",
    prefix: "and Telling",
    highlight: "Stories.",
  },
  {
    part1: "Engineering Visual Systems,",
    part2: "Directing Films",
    line1: "Engineering Visual Systems, Directing Films",
    prefix: "and Crafting",
    highlight: "Motion.",
  },
  {
    part1: "Architecting Interfaces,",
    part2: "Coding AI Agents",
    line1: "Architecting Interfaces, Coding AI Agents",
    prefix: "and Shaping",
    highlight: "Culture.",
  },
  {
    part1: "Bridging Technology",
    part2: "with Human Emotion",
    line1: "Bridging Technology with Human Emotion",
    prefix: "and Cinematic",
    highlight: "Vision.",
  },
  {
    part1: "Sculpting Light,",
    part2: "Capturing Moments",
    line1: "Sculpting Light, Capturing Moments",
    prefix: "and Building",
    highlight: "Worlds.",
  },
  {
    part1: "Designing with Precision,",
    part2: "Editing with Rhythm",
    line1: "Designing with Precision, Editing with Rhythm",
    prefix: "and Innovating",
    highlight: "Fearlessly.",
  },
];

export const Hero: React.FC<HeroProps> = ({
  projects,
  activeShot,
  onSelectShot,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const dragCleanupRef = useRef<(() => void) | null>(null);

  // Drag state for CSS scroll-snap disabling during active drag
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic rotating statements state
  const [statementIndex, setStatementIndex] = useState(0);
  const [isFadingStatement, setIsFadingStatement] = useState(false);

  // Seamless infinite cards set
  const SEAMLESS_CARDS = [...HERO_CARDS, ...HERO_CARDS, ...HERO_CARDS];

  const [isStatementHovered, setIsStatementHovered] = useState(false);

  // Dynamic statement auto-rotation (relaxed 18s interval for comfortable reading)
  useEffect(() => {
    if (isStatementHovered) return;
    const timer = setInterval(() => {
      setIsFadingStatement(true);
      setTimeout(() => {
        setStatementIndex((prev) => (prev + 1) % DYNAMIC_STATEMENTS.length);
        setIsFadingStatement(false);
      }, 550);
    }, 18000);

    return () => clearInterval(timer);
  }, [isStatementHovered]);

  const handleNextStatement = () => {
    setIsFadingStatement(true);
    setTimeout(() => {
      setStatementIndex((prev) => (prev + 1) % DYNAMIC_STATEMENTS.length);
      setIsFadingStatement(false);
    }, 350);
  };

  // Dynamic curved axis line calculation (cards stay straight and untwisted, only the path line curves)
  const update3DTransforms = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackWidth = track.clientWidth;
    const trackCenter = trackWidth / 2;
    const halfWidth = trackCenter;
    const scrollLeft = track.scrollLeft;
    const isMobile = window.innerWidth <= 768;

    const cards = track.querySelectorAll<HTMLElement>(`.${styles.projectCard}`);
    const len = cards.length;
    for (let i = 0; i < len; i++) {
      const card = cards[i];
      const cardCenter = card.offsetLeft + card.offsetWidth / 2 - scrollLeft;
      const offset = (cardCenter - trackCenter) / (halfWidth * 0.72 || 1);

      // Clamp offset for smooth falloff
      const clampedOffset = Math.max(-2.2, Math.min(2.2, offset));
      const absOffset = Math.abs(clampedOffset);

      // Curved Axis: parabolic arc trajectory dipping down outwards
      const arcYMultiplier = isMobile ? 20 : 46;
      const arcY = Math.pow(absOffset, 1.6) * arcYMultiplier;

      // Cards stay strictly straight - ZERO rotation or twisting!
      const depthMultiplier = isMobile ? 30 : 65;
      const depthZ = -absOffset * depthMultiplier;

      const scale = isMobile
        ? Math.max(0.86, 1 - absOffset * 0.14)
        : Math.max(0.88, 1 - absOffset * 0.08);
      const opacity = isMobile
        ? Math.max(0.35, 1 - absOffset * 0.5)
        : Math.max(0.75, 1 - absOffset * 0.16);

      // On mobile, gracefully fade out text/arrows on neighbor cards to eliminate edge clipping
      const contentOpacity = isMobile ? Math.max(0, 1 - absOffset * 2.4) : 1;

      card.style.setProperty("--card-arc-y", `${arcY.toFixed(1)}px`);
      card.style.setProperty("--card-depth", `${depthZ.toFixed(1)}px`);
      card.style.setProperty("--card-scale", `${scale.toFixed(3)}`);
      card.style.setProperty("--card-opacity", `${opacity.toFixed(2)}`);
      card.style.setProperty("--card-content-opacity", `${contentOpacity.toFixed(2)}`);
    }
  }, []);

  const requestUpdateTransforms = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(update3DTransforms);
  }, [update3DTransforms]);

  // Initialize scroll position and listeners
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Align precisely to the first card of the middle set
    const cards = track.querySelectorAll<HTMLElement>(`.${styles.projectCard}`);
    const middleIndex = HERO_CARDS.length;
    if (cards[middleIndex] && track.scrollLeft === 0) {
      const isMobile = window.innerWidth <= 768;
      const targetCard = cards[middleIndex];
      const offset = isMobile
        ? targetCard.offsetLeft - (track.clientWidth - targetCard.offsetWidth) / 2
        : targetCard.offsetLeft - 80;
      track.scrollLeft = offset;
    }

    requestUpdateTransforms();

    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      requestUpdateTransforms();

      // Debounce the infinite seamless loop adjustment so it NEVER interrupts active swiping or snapping
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!trackRef.current || isDraggingRef.current) return;
        const currentTrack = trackRef.current;
        const setWidth = currentTrack.scrollWidth / 3;
        if (setWidth <= 0) return;

        if (currentTrack.scrollLeft >= setWidth * 2 - 20) {
          currentTrack.style.scrollBehavior = "auto";
          currentTrack.style.scrollSnapType = "none";
          currentTrack.scrollLeft -= setWidth;
          requestAnimationFrame(() => {
            if (trackRef.current) {
              trackRef.current.style.scrollBehavior = "";
              trackRef.current.style.scrollSnapType = "";
              requestUpdateTransforms();
            }
          });
        } else if (currentTrack.scrollLeft <= setWidth * 0.35) {
          currentTrack.style.scrollBehavior = "auto";
          currentTrack.style.scrollSnapType = "none";
          currentTrack.scrollLeft += setWidth;
          requestAnimationFrame(() => {
            if (trackRef.current) {
              trackRef.current.style.scrollBehavior = "";
              trackRef.current.style.scrollSnapType = "";
              requestUpdateTransforms();
            }
          });
        }
      }, 150);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", requestUpdateTransforms);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", requestUpdateTransforms);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (dragCleanupRef.current) dragCleanupRef.current();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [requestUpdateTransforms]);

  // Zero-glitch mouse drag-to-scroll with window-level tracking (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    if (e.button !== 0) return; // Only primary mouse button

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.clientX;
    scrollLeftRef.current = track.scrollLeft;
    setIsDragging(true);

    const onWindowMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current || !trackRef.current) return;
      const currentTrack = trackRef.current;
      const walk = moveEvent.clientX - startXRef.current;
      if (Math.abs(walk) > 4) {
        hasMovedRef.current = true;
      }
      currentTrack.scrollLeft = scrollLeftRef.current - walk;
      update3DTransforms();
    };

    const onWindowMouseUp = () => {
      if (dragCleanupRef.current) {
        dragCleanupRef.current();
        dragCleanupRef.current = null;
      }
      setIsDragging(false);
      isDraggingRef.current = false;

      if (hasMovedRef.current && trackRef.current) {
        const currentTrack = trackRef.current;
        const card = currentTrack.querySelector<HTMLElement>(`.${styles.projectCard}`);
        if (card) {
          const cardStep = card.offsetWidth + (window.innerWidth <= 768 ? 14 : 24);
          const targetScroll = Math.round(currentTrack.scrollLeft / cardStep) * cardStep;
          currentTrack.scrollTo({ left: targetScroll, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("mousemove", onWindowMouseMove, { passive: true });
    window.addEventListener("mouseup", onWindowMouseUp);

    dragCleanupRef.current = () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };
  };

  // Wheel scroll with resistive card-by-card jump
  const isWheelingRef = useRef(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) < 24) return;

    if (isWheelingRef.current) return;
    isWheelingRef.current = true;

    if (delta > 0) {
      scrollNext();
    } else {
      scrollPrev();
    }

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      isWheelingRef.current = false;
    }, 450);
  };

  // Carousel navigation arrows
  const scrollPrev = () => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector<HTMLElement>(`.${styles.projectCard}`);
      const scrollAmount = card ? card.offsetWidth + 24 : 360;
      trackRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(requestUpdateTransforms, 120);
    }
  };

  const scrollNext = () => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector<HTMLElement>(`.${styles.projectCard}`);
      const scrollAmount = card ? card.offsetWidth + 24 : 360;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(requestUpdateTransforms, 120);
    }
  };

  const handleCardClick = (e: React.MouseEvent, cardId: string) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      return;
    }
    cinematicAudioHaptics.playSlateTick();
    if (projects && onSelectShot) {
      const match = projects.find((p) => p.id === cardId);
      if (match) {
        onSelectShot(match);
      }
    }
  };

  const currentStatement = DYNAMIC_STATEMENTS[statementIndex];

  return (
    <section id="hero" className={styles.hero} aria-label="Hero Section">
      {/* 01 — Top Navbar */}
      <Header />


      {/* 02 — Featured Cards Carousel (Zero-glitch drag with 3D curved arc line) */}
      <div className={styles.cardsSection}>
        <div
          ref={trackRef}
          className={`${styles.cardsTrack} ${isDragging ? styles.cardsTrackDragging : ""}`}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
        >
          {SEAMLESS_CARDS.map((card, idx) => (
            <Link
              key={`${card.id}-${idx}`}
              href={card.projectUrl}
              className={styles.projectCard}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onClick={(e) => handleCardClick(e, card.id)}
            >
              {/* Full-opacity cinematic image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.imageUrl}
                alt={card.title}
                className={styles.cardBgImage}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
              <div className={styles.cardGradient} />

              {/* Bottom Card Content: Title, Category & Arrow */}
              <div className={styles.cardBottomContent}>
                <div className={styles.cardTextGroup}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <span className={styles.cardCategory}>{card.category}</span>
                </div>
                <ArrowRight size={18} className={styles.arrowIcon} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 03 — Dominating Statement (After the cards) */}
      <div id="about" className={styles.statementSection}>
        <div className={styles.statementWrapper}>
          <div
            className={`${styles.statementTransitionGroup} ${
              isFadingStatement ? styles.statementFadingOut : ""
            }`}
            onMouseEnter={() => setIsStatementHovered(true)}
            onMouseLeave={() => setIsStatementHovered(false)}
          >
            <h1 className={styles.statementHeading}>
              <span className="sr-only">
                Rishabh Naik — Video Editor, Content Creator &amp; Creative Technologist.{" "}
              </span>
              {/* Line 1 Row (unified on desktop, rhythmically split on mobile) */}
              <span className={styles.headlineLine1Row}>
                <span className={styles.headlinePart1}>{currentStatement.part1}</span>{" "}
                <span className={styles.headlinePart2}>{currentStatement.part2}</span>
              </span>

              {/* Line 2 with highlight */}
              <span className={styles.headlineLine2}>
                {currentStatement.prefix}{" "}
                <span className={styles.storiesHighlight}>
                  {currentStatement.highlight}
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
