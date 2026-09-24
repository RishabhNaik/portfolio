"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  MessageSquare,
  Clock,
  MapPin,
} from "lucide-react";
import {
  OPEN_CONTACT_MODAL_EVENT,
  CLOSE_CONTACT_MODAL_EVENT,
} from "./contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./ContactModal.module.css";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
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

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const open = useCallback(() => {
    cinematicAudioHaptics.playCinematicWhoosh();
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    cinematicAudioHaptics.playSlateTick();
    setIsOpen(false);
  }, []);

  // Listen for global modal open/close events & #contact hash
  useEffect(() => {
    const handleOpen = () => open();
    const handleClose = () => close();

    window.addEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
    window.addEventListener(CLOSE_CONTACT_MODAL_EVENT, handleClose);

    const checkHash = () => {
      if (window.location.hash === "#contact-modal") {
        open();
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
      window.removeEventListener(CLOSE_CONTACT_MODAL_EVENT, handleClose);
      window.removeEventListener("hashchange", checkHash);
    };
  }, [close, open]);

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

  // Copy helpers
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
      <div className={styles.modalCard}>
        <div className={styles.ambientGlow} aria-hidden="true" />

        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowBadge}>Direct Channel</span>
              <span className={styles.eyebrowText}>No Forms · Direct Access</span>
            </div>
            <h2 className={styles.title}>Let’s make something real.</h2>
            <p className={styles.subtitle}>
              Direct communication lines for film directing, cinematography, analog 35mm optical work, and studio collaborations.
            </p>
          </div>

          <button
            onClick={close}
            className={styles.closeButton}
            aria-label="Close Contact Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Direct Contact Cards Grid */}
        <div className={styles.contactGrid}>
          {/* Email Card */}
          <div className={styles.contactCard}>
            <div className={styles.cardTop}>
              <div className={styles.cardLabelGroup}>
                <div className={styles.cardIconBox}>
                  <Mail size={16} />
                </div>
                <span className={styles.cardLabel}>Direct Inbox</span>
              </div>
            </div>

            <div className={styles.cardValue}>rishabhnaik37@gmail.com</div>

            <div className={styles.cardActions}>
              <a
                href="mailto:rishabhnaik37@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Rishabh%20Naik"
                className={styles.actionBtnPrimary}
                onClick={() => cinematicAudioHaptics.playTactileClick()}
              >
                <Send size={13} />
                <span>Send Email</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={styles.actionBtnSecondary}
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check size={13} color="#30d158" /> : <Copy size={13} />}
                <span>{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Phone / WhatsApp Card */}
          <div className={styles.contactCard}>
            <div className={styles.cardTop}>
              <div className={styles.cardLabelGroup}>
                <div className={styles.cardIconBox}>
                  <Phone size={16} />
                </div>
                <span className={styles.cardLabel}>Phone &amp; WhatsApp</span>
              </div>
            </div>

            <div className={styles.cardValue}>+91 6360908381</div>

            <div className={styles.cardActions}>
              <a
                href="https://wa.me/916360908381"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtnWhatsApp}
                onClick={() => cinematicAudioHaptics.playTactileClick()}
              >
                <MessageSquare size={13} />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+916360908381"
                className={styles.actionBtnSecondary}
                onClick={() => cinematicAudioHaptics.playTactileClick()}
              >
                <span>Call</span>
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className={styles.actionBtnSecondary}
                aria-label="Copy phone number"
              >
                {copiedPhone ? <Check size={13} color="#30d158" /> : <Copy size={13} />}
                <span>{copiedPhone ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Studio Location & Response Time Meta Strip */}
        <div className={styles.infoStrip}>
          <div className={styles.infoItem}>
            <MapPin size={15} className={styles.infoIcon} />
            <span>Bangalore, India — Available Worldwide</span>
          </div>
          <div className={styles.infoItem}>
            <Clock size={15} className={styles.infoIcon} />
            <span>Direct inbox monitored daily — Reply within 24 hours</span>
          </div>
        </div>

        {/* Social Channels & Status Row */}
        <div className={styles.socialRow}>
          <div className={styles.socialGroup}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              onClick={() => cinematicAudioHaptics.playSlateTick()}
            >
              <InstagramIcon size={16} />
              <span>Instagram</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              onClick={() => cinematicAudioHaptics.playSlateTick()}
            >
              <FacebookIcon size={16} />
              <span>Facebook</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className={styles.availBadge}>
            <span>Accepting 2025/2026 Productions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

