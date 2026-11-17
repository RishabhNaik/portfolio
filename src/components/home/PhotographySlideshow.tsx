"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./PhotographySlideshow.module.css";

interface PhotoSlide {
  id: string;
  projectId: string;
  url: string;
  alt: string;
  title: string;
  lead: string;
  note: string;
}

const PHOTOGRAPHY_SLIDES: PhotoSlide[] = [
  {
    id: "photo-camera",
    projectId: "after-hours-cinematography",
    url: "/assets/about/director-camera.jpg",
    alt: "Rishabh Naik operating cinema camera on location",
    title: "Cinematography & Rigging",
    lead: "Every frame is constructed with physical intention — balancing 35mm optical weight, natural light falloff, and fluid camera movement.",
    note: "Anamorphic flare calibration, handheld kinetic balance, and real-time operator cadence.",
  },
  {
    id: "photo-monitor",
    projectId: "velocity-kinetic-cut",
    url: "/assets/about/director-monitor.jpg",
    alt: "Rishabh Naik directing at wireless production monitor",
    title: "Directing & Performance Rhythm",
    lead: "Directing is rooted in discovering human friction and narrative momentum — shaping tone in the quiet moments between takes.",
    note: "Wireless production review, spatial actor blocking, and collaborative tone calibration.",
  },
  {
    id: "photo-viewfinder",
    projectId: "after-hours-cinematography",
    url: "/assets/about/director-viewfinder.jpg",
    alt: "Framing composition through optical viewfinder",
    title: "Optical Geometry & Stillness",
    lead: "Moving beyond digital perfection to capture tactile atmosphere, geometric perspective, and intentional shadow falloff.",
    note: "Optical framing, direct lens inspection, and architectural symmetry through glass.",
  },
  {
    id: "photo-bts-rig",
    projectId: "nexus-studio-engine",
    url: "/assets/projects/bts-camera.jpg",
    alt: "Cinema rig and anamorphic prime lens calibration",
    title: "Hardware Architecture & Calibration",
    lead: "Balancing high-speed mechanical packages engineered for fluid kinetic tracking without sacrificing optical fidelity.",
    note: "Custom camera cages, high-load balance plates, and low-latency wireless transmission.",
  },
  {
    id: "photo-bts-lighting",
    projectId: "after-hours-cinematography",
    url: "/assets/projects/bts-light.jpg",
    alt: "Nocturnal cinema lighting on set",
    title: "Nocturnal Lighting & Atmosphere",
    lead: "Sculpting darkness with volumetric haze and tungsten key illumination — treating shadow as an active compositional medium.",
    note: "High-contrast rim lighting, cinematic diffusion, and low-light sensor calibration.",
  },
  {
    id: "photo-bts-focus",
    projectId: "velocity-kinetic-cut",
    url: "/assets/projects/bts-hand.jpg",
    alt: "Tactile lens focus adjustment during live take",
    title: "Tactile Focus & Lens Craft",
    lead: "Manual focus micro-adjustments driven by actor breath, spatial shifts, and kinetic momentum rather than mechanical marks.",
    note: "Handheld follow-focus hard stops, 35mm optical plane tracking, and tactile response.",
  },
  {
    id: "photo-ocean",
    projectId: "prismatica-spectral-art",
    url: "/assets/images/ocean-rays.jpg",
    alt: "Atmospheric natural light photography",
    title: "Atmospheric Natural Light",
    lead: "Explorations of natural light caustics, coastal dispersion, and the silent vastness of oceanic horizons.",
    note: "Sub-surface light refraction, high-dynamic-range coastal tone, and organic color decay.",
  },
];

export const PhotographySlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const total = PHOTOGRAPHY_SLIDES.length;

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentSection);
    return () => observer.disconnect();
  }, []);

  // Auto-advance timer (relaxed 16s interval for calm, deliberate reading)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 16000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.slideshowSection} ${isVisible ? styles.sectionVisible : ""}`}
      aria-label="Directorial & Visual Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slidesContainer}>
        {PHOTOGRAPHY_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          const isReversed = index % 2 === 1; // Alternating sides: Even = Text Left, Odd = Image Left
          const projectUrl = `/projects/${slide.projectId}`;

          return (
            <div
              key={slide.id}
              className={`${styles.slideRow} ${
                isReversed ? styles.reversed : styles.normal
              } ${isActive ? styles.slideActive : ""}`}
              aria-hidden={!isActive}
            >
              {/* Text Column */}
              <div className={styles.textColumn}>
                <span className={styles.studyIndex}>
                  Study 0{index + 1}
                </span>

                <h2 className={styles.slideTitle}>
                  <Link href={projectUrl} className={styles.titleLink}>
                    {slide.title}
                  </Link>
                </h2>

                <p className={styles.leadText}>{slide.lead}</p>

                <div className={styles.detailDivider} />

                <p className={styles.noteText}>{slide.note}</p>

                <div className={styles.projectActionRow}>
                  <Link href={projectUrl} className={styles.viewProjectLink}>
                    View Project <span className={styles.arrowIcon}>&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Horizontal Image Column (Clicking takes user to project) */}
              <div className={styles.imageColumn}>
                <Link
                  href={projectUrl}
                  className={styles.imageLink}
                  aria-label={`View ${slide.title} project`}
                >
                  <div className={styles.horizontalImageFrame}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.url}
                      alt={slide.alt}
                      className={styles.horizontalImage}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className={styles.frameGradient} />
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls Row (Carousel Above Footer) */}
      <div className={styles.controlsRow}>
        <div className={styles.counterArea}>
          <span className={styles.counterText}>
            Frame 0{currentIndex + 1} &middot; 0{total}
          </span>
        </div>

        <div className={styles.navigationControls} aria-label="Slideshow navigation">
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrev}
            aria-label="Previous Slide"
          >
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNext}
            aria-label="Next Slide"
          >
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
};
