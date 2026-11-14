"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PrismCube } from "./PrismCube";
import { openContactModal } from "@/components/contact/contactModalState";
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

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className={styles.footer} role="contentinfo">
      <div className={styles.footerContainer}>
        {/* Main Content Row */}
        <div className={styles.mainRow}>
          {/* Left Zone: Visual Element (Interactive 3D Rotating Prism Cube) */}
          <div className={styles.visualZone}>
            <PrismCube />
          </div>

          {/* Center-Left Zone: Closing Multiline Phrase */}
          <div className={styles.phraseZone}>
            <h2
              className={styles.closingPhrase}
              onClick={openContactModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openContactModal();
              }}
              style={{ cursor: "pointer" }}
              aria-label="Open Contact Modal"
            >
              <span>let’s</span>
              <span>make</span>
              <span>something</span>
              <span>real.</span>
            </h2>
          </div>

          {/* Right Zone: Contact Details & Social */}
          <div className={styles.contactZone}>
            <div className={styles.contactCard}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Direct</span>
                <a href="tel:6360908381" className={styles.contactValue}>
                  6360908381
                </a>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Inquiries</span>
                <a href="mailto:rishabhnaik37@gmail.com" className={styles.contactValue}>
                  rishabhnaik37@gmail.com
                </a>
              </div>

              {/* Social Channels */}
              <div className={styles.socialGroup}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram profile"
                >
                  <InstagramIcon size={18} />
                  <span>Instagram</span>
                  <ArrowUpRight size={14} className={styles.arrowIcon} />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook profile"
                >
                  <FacebookIcon size={18} />
                  <span>Facebook</span>
                  <ArrowUpRight size={14} className={styles.arrowIcon} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className={styles.copyrightRow}>
          <p className={styles.copyrightText}>
            © 2026 Rishabh Naik. All rights reserved.
          </p>
          <a href="#hero" className={styles.backToTop}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
