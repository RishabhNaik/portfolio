"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X, Maximize2, ExternalLink } from "lucide-react";
import styles from "./Intro.module.css";

const YouTubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#ff0000">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const Intro: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Replace with your own reel before publishing this portfolio.
  const youtubeVideoId = "LXb3EKWsInQ";

  // Lock background scroll when theater modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsModalOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

  return (
    <section id="intro" className={styles.introSection} aria-label="Introduction">
      {/* Volumetric Underwater Background Visual */}
      <div className={styles.oceanBackground}>
        <Image
          src="/assets/images/ocean-rays.jpg"
          alt="Cinematic underwater ocean sun rays"
          fill
          priority
          className={styles.oceanBgImage}
          sizes="100vw"
        />
        <div className={styles.oceanVignette} />
      </div>

      <div className={styles.container}>
        {/* YouTube Reel Card directly embedded above text */}
        <div className={styles.ytCardWrapper}>
          <div
            className={styles.youtubeCard}
            onClick={() => setIsModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsModalOpen(true);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Open portfolio reel preview in theater modal"
          >
            <div className={styles.thumbnailContainer}>
              <Image
                src="/assets/images/reel-thumb.jpg"
                alt="Showreel preview thumbnail"
                fill
                priority
                className={styles.thumbnailImg}
                sizes="(max-width: 768px) 90vw, 420px"
              />

              {/* Subtle glass reflection gradient */}
              <div className={styles.thumbnailGlassReflect} />

              {/* Iconic YouTube Red Play Badge in center */}
              <div className={styles.ytPlayButton}>
                <div className={styles.ytRedBadge}>
                  <Play size={18} fill="#ffffff" color="#ffffff" className={styles.playIcon} />
                </div>
              </div>

              {/* Corner Expand Indicator */}
              <div className={styles.cardExpandTag} title="Expand to theater view">
                <Maximize2 size={13} />
                <span>Theater View</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Tone Typographic Headline with concise, elevated voice */}
        <h2 className={styles.statementHeadline}>
          <span className={styles.gray}>I’m a hungry, emerging creative interested in </span>
          <span className={styles.black}>video editing</span>,{" "}
          <span className={styles.black}>content creation</span>,{" "}
          <span className={styles.black}>short films</span>,{" "}
          <span className={styles.gray}>and </span>
          <span className={styles.black}>social media reels</span>.{" "}
          <span className={styles.gray}>I’m here to learn by making: turning </span>
          <span className={styles.black}>raw footage into stories</span>,{" "}
          <span className={styles.gray}>finding the perfect pacing through </span>
          <span className={styles.black}>sound & rhythm</span>,{" "}
          <span className={styles.gray}>and helping brands & creators take a project from a </span>
          <span className={styles.black}>first spark to a viral piece</span>.
        </h2>
      </div>

      {/* Expanded Theater Lightbox Modal */}
      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="YouTube Theater View"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.youtubeCardHeader}>
              <div className={styles.ytHeaderLeft}>
                <div className={styles.ytBadge}>
                  <YouTubeIcon size={16} />
                  <span>YouTube</span>
                </div>
                <h3 className={styles.ytTitle}>
                  Rishabh Naik — Portfolio Reel (to be added)
                </h3>
              </div>

              <div className={styles.ytHeaderRight}>
                <a
                  href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ytExternalBtn}
                  title="Open on YouTube in a new tab"
                >
                  <span>YouTube</span>
                  <ExternalLink size={13} />
                </a>

                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close showreel"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className={styles.modalVideoPlayer}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title="Portfolio reel preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.modalIframe}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
