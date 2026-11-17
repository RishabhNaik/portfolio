"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";
import {
  OPEN_SIDEBAR_EVENT,
  CLOSE_SIDEBAR_EVENT,
  TOGGLE_SIDEBAR_EVENT,
  closeSidebar,
} from "./sidebarState";
import { openContactModal } from "@/components/contact/contactModalState";
import { openResumeModal } from "@/components/resume/resumeModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./SidebarDrawer.module.css";

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

export const SidebarDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleToggle = () => setIsOpen((prev) => !prev);

    window.addEventListener(OPEN_SIDEBAR_EVENT, handleOpen);
    window.addEventListener(CLOSE_SIDEBAR_EVENT, handleClose);
    window.addEventListener(TOGGLE_SIDEBAR_EVENT, handleToggle);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(OPEN_SIDEBAR_EVENT, handleOpen);
      window.removeEventListener(CLOSE_SIDEBAR_EVENT, handleClose);
      window.removeEventListener(TOGGLE_SIDEBAR_EVENT, handleToggle);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    cinematicAudioHaptics.playSlateTick();
    closeSidebar();
  };

  const handleLinkClick = () => {
    cinematicAudioHaptics.playSlateTick();
    closeSidebar();
  };

  const handleContactClick = () => {
    cinematicAudioHaptics.playSlateTick();
    closeSidebar();
    openContactModal();
  };

  const handleResumeClick = () => {
    cinematicAudioHaptics.playTactileClick();
    closeSidebar();
    openResumeModal();
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        onClick={handleClose}
        aria-hidden={!isOpen}
      />

      {/* Slide-out Minimal Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        aria-label="Navigation Menu"
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className={styles.header}>
          <span className={styles.brandTitle}>Menu</span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Minimal Navigation Links */}
        <div className={styles.content}>
          <nav className={styles.navMenu}>
            <Link href="/" className={styles.navLinkItem} onClick={handleLinkClick}>
              Home
            </Link>
            <Link href="/projects" className={styles.navLinkItem} onClick={handleLinkClick}>
              Projects
            </Link>
            <Link href="/about" className={styles.navLinkItem} onClick={handleLinkClick}>
              About
            </Link>
            <Link href="/gallery" className={styles.navLinkItem} onClick={handleLinkClick}>
              Gallery
            </Link>
            <button
              type="button"
              className={styles.navLinkItem}
              onClick={handleResumeClick}
            >
              Resume
            </button>
            <button
              type="button"
              className={styles.navLinkItem}
              onClick={handleContactClick}
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Minimal Footer */}
        <div className={styles.footer}>
          <div className={styles.directContact}>
            <a href="mailto:rishabhnaik37@gmail.com" className={styles.emailLink}>
              rishabhnaik37@gmail.com
            </a>
            <a href="tel:6360908381" className={styles.phoneLink}>
              6360908381
            </a>
          </div>

          <div className={styles.socialIcons}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Facebook"
            >
              <FacebookIcon size={20} />
            </a>
          </div>
        </div>
      </aside>
    </>,
    document.body
  );
};
