"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
  Mail,
  Phone,
} from "lucide-react";
import {
  OPEN_CONTACT_MODAL_EVENT,
  CLOSE_CONTACT_MODAL_EVENT,
} from "./contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./ContactModal.module.css";

const DISCIPLINES = [
  "Graphic Design",
  "Video Editing",
  "UI/UX Design",
  "AI Agents",
  "Digital Art",
  "Software Development",
];

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
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

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
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

export const ContactModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const close = useCallback(() => {
    cinematicAudioHaptics.playSlateTick();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      cinematicAudioHaptics.playTactileClick();
      setIsOpen(true);
    };
    const handleClose = () => {
      setIsOpen(false);
    };

    window.addEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
    window.addEventListener(CLOSE_CONTACT_MODAL_EVENT, handleClose);

    return () => {
      window.removeEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
      window.removeEventListener(CLOSE_CONTACT_MODAL_EVENT, handleClose);
    };
  }, []);

  // Listen for hash #contact-modal
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#contact-modal") {
        setIsOpen(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("rishabhnaik37@gmail.com");
      cinematicAudioHaptics.playConfirmChime();
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText("+91 6360908381");
      cinematicAudioHaptics.playConfirmChime();
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2400);
    } catch {
      // Fallback
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Contact Rishabh Naik"
    >
      <div className={styles.modalWindow}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.brandGroup}>
            <span className={styles.brandTitle}>Rishabh Naik</span>
            <span className={styles.brandDot}>·</span>
            <span className={styles.brandSubtitle}>Direct Contact</span>
          </div>

          <button
            onClick={close}
            className={styles.closeBtn}
            aria-label="Close Contact Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Editorial Headline */}
        <div className={styles.headlineBlock}>
          <h2 className={styles.mainHeadline}>
            Let’s create <br />
            <span className={styles.highlightWord}>something memorable.</span>
          </h2>
          <p className={styles.subheadline}>
            Open for commissioned work, directing, creative direction, and technical systems.
          </p>
        </div>

        {/* Clean Typographic Channels */}
        <div className={styles.channelsList}>
          {/* Email Channel */}
          <div className={styles.channelRow}>
            <div className={styles.channelMeta}>
              <span className={styles.channelLabel}>Inquiries</span>
            </div>

            <div className={styles.channelMain}>
              <a
                href="mailto:rishabhnaik37@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Rishabh%20Naik"
                className={styles.primaryLink}
                onClick={() => cinematicAudioHaptics.playTactileClick()}
              >
                <span className={styles.linkText}>rishabhnaik37@gmail.com</span>
                <ArrowUpRight className={styles.arrowIcon} size={22} />
              </a>

              <div className={styles.actionItems}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={styles.inlineAction}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check size={13} className={styles.successColor} />
                  ) : (
                    <Copy size={13} />
                  )}
                  <span>{copiedEmail ? "Copied" : "Copy email"}</span>
                </button>

                <span className={styles.actionSeparator}>/</span>

                <a
                  href="mailto:rishabhnaik37@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Rishabh%20Naik"
                  className={styles.inlineAction}
                >
                  <Mail size={13} />
                  <span>Open client</span>
                </a>
              </div>
            </div>
          </div>

          {/* Direct Phone & WhatsApp Channel */}
          <div className={styles.channelRow}>
            <div className={styles.channelMeta}>
              <span className={styles.channelLabel}>Direct</span>
            </div>

            <div className={styles.channelMain}>
              <a
                href="tel:+916360908381"
                className={styles.primaryLink}
                onClick={() => cinematicAudioHaptics.playTactileClick()}
              >
                <span className={styles.linkText}>+91 6360908381</span>
                <ArrowUpRight className={styles.arrowIcon} size={22} />
              </a>

              <div className={styles.actionItems}>
                <a
                  href="https://wa.me/916360908381"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.inlineAction} ${styles.whatsAppHighlight}`}
                  onClick={() => cinematicAudioHaptics.playTactileClick()}
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp ↗</span>
                </a>

                <span className={styles.actionSeparator}>/</span>

                <a
                  href="tel:+916360908381"
                  className={styles.inlineAction}
                  onClick={() => cinematicAudioHaptics.playTactileClick()}
                >
                  <Phone size={13} />
                  <span>Call</span>
                </a>

                <span className={styles.actionSeparator}>/</span>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className={styles.inlineAction}
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check size={13} className={styles.successColor} />
                  ) : (
                    <Copy size={13} />
                  )}
                  <span>{copiedPhone ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Disciplines Strip (Homepage Mirror) */}
        <div className={styles.disciplinesStrip}>
          {DISCIPLINES.map((d, i) => (
            <React.Fragment key={d}>
              <span className={styles.disciplineName}>{d}</span>
              {i < DISCIPLINES.length - 1 && (
                <span className={styles.disciplineDot}>·</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Minimal Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.socialGroup}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              onClick={() => cinematicAudioHaptics.playSlateTick()}
            >
              <InstagramIcon size={15} />
              <span>Instagram</span>
              <ArrowUpRight size={12} className={styles.tinyArrow} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              onClick={() => cinematicAudioHaptics.playSlateTick()}
            >
              <FacebookIcon size={15} />
              <span>Facebook</span>
              <ArrowUpRight size={12} className={styles.tinyArrow} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
