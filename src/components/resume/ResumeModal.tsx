"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import {
  OPEN_RESUME_MODAL_EVENT,
  CLOSE_RESUME_MODAL_EVENT,
  closeResumeModal,
} from "./resumeModalState";
import styles from "./ResumeModal.module.css";

const RESUME_PDF_PATH = "/assets/Rishabh_Naik_Resume.pdf";

export const ResumeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    cinematicAudioHaptics.playSlateTick();
    setIsOpen(false);
    closeResumeModal();
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      cinematicAudioHaptics.playTactileClick();
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    window.addEventListener(OPEN_RESUME_MODAL_EVENT, handleOpen);
    window.addEventListener(CLOSE_RESUME_MODAL_EVENT, handleClose);

    return () => {
      window.removeEventListener(OPEN_RESUME_MODAL_EVENT, handleOpen);
      window.removeEventListener(CLOSE_RESUME_MODAL_EVENT, handleClose);
    };
  }, []);

  // Listen for hash #resume-modal or #resume
  useEffect(() => {
    const checkHash = () => {
      if (
        window.location.hash === "#resume-modal" ||
        window.location.hash === "#resume"
      ) {
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
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className={styles.modalWindow}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className={styles.modalHeader}>
          {/* Document Info */}
          <div className={styles.docInfo}>
            <div className={styles.pdfIconBadge} aria-hidden="true">
              <FileText size={18} />
            </div>
            <div className={styles.docTextGroup}>
              <h2 id="resume-modal-title" className={styles.docTitle}>
                Rishabh Naik — Resume
              </h2>
              <p className={styles.docSubtitle}>
                Curriculum Vitae · Directorial, Creative & Engineering
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionGroup}>
            <a
              href={RESUME_PDF_PATH}
              download="Rishabh_Naik_Resume.pdf"
              className={styles.downloadBtn}
              onClick={() => cinematicAudioHaptics.playTactileClick()}
              aria-label="Download Rishabh Naik's Resume PDF"
            >
              <Download size={15} />
              <span className={styles.downloadBtnText}>Download PDF</span>
            </a>

            <a
              href={RESUME_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
              onClick={() => cinematicAudioHaptics.playSlateTick()}
              aria-label="Open Resume in new browser tab"
              title="Open full PDF in new tab"
            >
              <ExternalLink size={15} />
              <span className={styles.secondaryBtnText}>Open in Tab</span>
            </a>

            <button
              type="button"
              onClick={close}
              className={styles.closeBtn}
              aria-label="Close Resume Viewer"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* PDF Viewer Body */}
        <div className={styles.viewerContainer}>
          <object
            data={`${RESUME_PDF_PATH}#toolbar=1&navpanes=0&view=FitH`}
            type="application/pdf"
            className={styles.pdfFrame}
          >
            <iframe
              src={`${RESUME_PDF_PATH}#toolbar=1&navpanes=0&view=FitH`}
              className={styles.pdfFrame}
              title="Rishabh Naik Resume PDF Preview"
            >
              <div className={styles.fallbackNotice}>
                <h3 className={styles.fallbackTitle}>Resume Preview</h3>
                <p className={styles.fallbackDesc}>
                  Your browser does not support inline PDF previews. You can view or download the resume directly below.
                </p>
                <a
                  href={RESUME_PDF_PATH}
                  download="Rishabh_Naik_Resume.pdf"
                  className={styles.downloadBtn}
                >
                  <Download size={15} />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </iframe>
          </object>
        </div>

        {/* Mobile Bottom Quick Actions */}
        <div className={styles.mobileBar}>
          <a
            href={RESUME_PDF_PATH}
            download="Rishabh_Naik_Resume.pdf"
            className={`${styles.mobileActionBtn} ${styles.mobileDownloadBtn}`}
            onClick={() => cinematicAudioHaptics.playTactileClick()}
          >
            <Download size={15} />
            <span>Download PDF</span>
          </a>

          <a
            href={RESUME_PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.mobileActionBtn} ${styles.mobileOpenBtn}`}
            onClick={() => cinematicAudioHaptics.playSlateTick()}
          >
            <ExternalLink size={15} />
            <span>Open in Tab</span>
          </a>
        </div>
      </div>
    </div>
  );
};
