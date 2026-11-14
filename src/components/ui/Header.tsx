"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./Header.module.css";

interface HeaderProps {
  showAboutLink?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(cinematicAudioHaptics.getIsMuted());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = cinematicAudioHaptics.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleNavClick = () => {
    cinematicAudioHaptics.playSlateTick();
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`} role="banner">
      <div className={styles.brand}>
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Rishabh Naik home"
          onClick={handleNavClick}
        >
          Rishabh Naik
        </Link>
      </div>

      <nav className={styles.nav} aria-label="Main Navigation">
        <ul className={styles.navList}>
          <li>
            <Link
              href="/#about"
              className={styles.navLink}
              onClick={handleNavClick}
            >
              ABOUT
            </Link>
          </li>
          <li className={styles.separator}>▪</li>
          <li>
            <Link
              href="/projects"
              className={styles.navLink}
              onClick={handleNavClick}
            >
              PROJECTS
            </Link>
          </li>
          <li className={styles.separator}>▪</li>
          <li>
            <button
              type="button"
              onClick={() => {
                handleNavClick();
                openContactModal();
              }}
              className={styles.navLink}
              aria-label="Open Contact Modal"
            >
              CONTACT
            </button>
          </li>
        </ul>
      </nav>

      <div className={styles.soundContainer}>
        <button
          type="button"
          onClick={handleToggleSound}
          className={styles.soundToggleBtn}
          aria-label={isMuted ? "Unmute sound effects and haptics" : "Mute sound effects and haptics"}
          title={isMuted ? "Sound FX: Muted (Click to enable)" : "Sound FX: Active (Click to mute)"}
        >
          {isMuted ? (
            <>
              <VolumeX size={14} className={styles.soundIcon} />
              <span className={styles.soundLabel}>Muted</span>
            </>
          ) : (
            <>
              <Volume2 size={14} className={styles.soundIcon} />
              <span className={styles.soundLabel}>SFX</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
