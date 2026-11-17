"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./Footer.module.css";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const DISCIPLINES = [
  "Graphic Design",
  "Video Editing",
  "UI/UX Design",
  "AI Agents",
  "Digital Art",
  "Software Development",
];

export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const doodleRef = useRef<HTMLDivElement>(null);

  const handlePhraseClick = () => {
    cinematicAudioHaptics.playTactileClick();
    openContactModal();
  };

  useEffect(() => {
    const currentFooter = footerRef.current;
    if (!currentFooter) return;

    // 01 — Viewport Intersection Observer for scroll-triggered entrance reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(currentFooter);

    // 02 — Smooth Kinetic Parallax Tracking on scroll for the doodle background
    let rafId: number;
    const handleScroll = () => {
      if (!footerRef.current || !doodleRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        // Subtle, refined 50px vertical parallax shift
        const parallaxY = (progress - 0.5) * 55;
        doodleRef.current.style.transform = `translate3d(0, ${parallaxY.toFixed(1)}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className={`${styles.footer} ${isVisible ? styles.footerVisible : ""}`}
      role="contentinfo"
    >
      {/* Light Aesthetic Interest Doodles Pattern with Kinetic Scroll Parallax */}
      <div
        ref={doodleRef}
        className={styles.doodleBackground}
        aria-hidden="true"
      />
      <div className={styles.doodleVignette} aria-hidden="true" />

      <div className={styles.footerContainer}>
        {/* Main Content Row: Left (Monumental Word + Disciplines) | Right (Contact & Social) */}
        <div className={styles.mainRow}>
          {/* Left Column: Monumental CREATE + Disciplines */}
          <div className={styles.leftColumn}>
            <div
              className={styles.wordWrapper}
              onClick={handlePhraseClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handlePhraseClick();
                }
              }}
              aria-label="Open contact form: CREATE"
            >
              <h2 className={styles.monumentalWord}>CREATE</h2>
            </div>

            {/* Disciplines as Pure Minimalist Words */}
            <div className={styles.disciplinesWordsRow}>
              {DISCIPLINES.map((word, idx) => (
                <React.Fragment key={word}>
                  <Link
                    href="/projects"
                    className={styles.disciplineWord}
                    onClick={() => cinematicAudioHaptics.playSlateTick()}
                  >
                    {word}
                  </Link>
                  {idx < DISCIPLINES.length - 1 && (
                    <span className={styles.wordSeparator}>·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Details & Social */}
          <div className={styles.rightColumn}>
            <div className={styles.contactCard}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Direct</span>
                <a href="tel:6360908381" className={styles.contactValue}>
                  6360908381
                </a>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Inquiries</span>
                <a
                  href="mailto:rishabhnaik37@gmail.com"
                  className={styles.contactValue}
                >
                  rishabhnaik37@gmail.com
                </a>
              </div>

              {/* Social Channels */}
              <div className={styles.socialGroup}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconLink}
                  aria-label="Instagram profile"
                >
                  <InstagramIcon size={20} />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconLink}
                  aria-label="Facebook profile"
                >
                  <FacebookIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className={styles.bottomRow}>
          <p className={styles.copyrightText}>
            © 2026 Rishabh Naik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
