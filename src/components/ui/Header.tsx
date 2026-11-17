"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { openContactModal } from "@/components/contact/contactModalState";
import { openResumeModal } from "@/components/resume/resumeModalState";
import { openSidebar } from "./sidebarState";
import { SidebarDrawer } from "./SidebarDrawer";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./Header.module.css";

interface HeaderProps {
  showAboutLink?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    cinematicAudioHaptics.playSlateTick();
  };

  const handleOpenMore = () => {
    cinematicAudioHaptics.playSlateTick();
    openSidebar();
  };

  const handleContactClick = () => {
    cinematicAudioHaptics.playSlateTick();
    openContactModal();
  };

  const handleResumeClick = () => {
    cinematicAudioHaptics.playTactileClick();
    openResumeModal();
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
        role="banner"
      >
        <div className={styles.headerInner}>
          <div className={styles.mainNavRow}>
            {/* Left Side: Projects and About (desktop) */}
            <nav className={styles.navLeft} aria-label="Primary Navigation Left">
              <Link
                href="/projects"
                className={styles.navLink}
                onClick={handleNavClick}
                aria-label="Navigate to Projects"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className={styles.navLink}
                onClick={handleNavClick}
                aria-label="Navigate to About section"
              >
                About
              </Link>
            </nav>

            {/* Middle / Mobile: Rishabh Naik */}
            <div className={styles.brandCenter}>
              <Link
                href="/"
                className={styles.logoLink}
                aria-label="Rishabh Naik Home"
                onClick={handleNavClick}
              >
                Rishabh Naik
              </Link>
            </div>

            {/* Right Side: Gallery, Resume, Contact and Hamburger Menu */}
            <div className={styles.navRight}>
              <Link
                href="/gallery"
                className={`${styles.navLink} ${styles.desktopOnly}`}
                onClick={handleNavClick}
                aria-label="Navigate to Gallery page"
              >
                Gallery
              </Link>
              <button
                type="button"
                onClick={handleResumeClick}
                className={`${styles.navLink} ${styles.desktopOnly}`}
                aria-label="View and Download Resume"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={handleContactClick}
                className={styles.desktopContactBtn}
                aria-label="Open contact form"
              >
                Contact
              </button>

              {/* Hamburger Menu Icon */}
              <button
                type="button"
                onClick={handleOpenMore}
                className={styles.hamburgerButton}
                aria-label="Open navigation menu"
              >
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Drawer */}
      <SidebarDrawer />
    </>
  );
};
