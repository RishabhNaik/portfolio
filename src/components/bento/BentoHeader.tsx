"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";

export const BentoHeader: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(cinematicAudioHaptics.getIsMuted());
  }, []);

  const handleToggleSound = () => {
    const nextMuted = cinematicAudioHaptics.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleNavClick = () => {
    cinematicAudioHaptics.playSlateTick();
  };

  return (
    <header className="bento-header" role="banner">
      <div className="bento-header-inner">
        {/* Brand */}
        <Link
          href="/"
          onClick={handleNavClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #51ABDB, #1979D1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 12px rgba(81, 171, 219, 0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Rishabh Naik Logo"
              width={24}
              height={24}
              style={{ objectFit: "contain" }}
            />
          </div>
          <span style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "-0.01em" }}>
            Rishabh Naik
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          className="bento-desktop-nav"
        >
          <Link href="/#projects" className="bento-nav-link" onClick={handleNavClick}>
            Projects
          </Link>
          <Link href="/gallery" className="bento-nav-link" onClick={handleNavClick}>
            Gallery
          </Link>
          <Link href="/#about" className="bento-nav-link" onClick={handleNavClick}>
            About
          </Link>
          <button
            type="button"
            onClick={() => {
              handleNavClick();
              openContactModal();
            }}
            className="bento-nav-link"
            style={{ cursor: "pointer", background: "none", border: "none" }}
          >
            Contact
          </button>
        </nav>

        {/* Actions (Sound toggle + Resume CTA) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={handleToggleSound}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "9999px",
              backgroundColor: isMuted ? "rgba(255, 255, 255, 0.06)" : "rgba(81, 171, 219, 0.15)",
              border: `1px solid ${isMuted ? "rgba(255, 255, 255, 0.1)" : "rgba(81, 171, 219, 0.3)"}`,
              color: isMuted ? "#8AA4B2" : "#51ABDB",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
            title={isMuted ? "Sound Effects Muted" : "Sound Effects Active"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isMuted ? "Mute" : "SFX"}</span>
          </button>

          <a
            href="/assets/Rishabh_Naik_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-btn-primary"
            style={{ padding: "8px 18px", fontSize: "13px" }}
          >
            <span>Resume</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(81, 171, 219, 0.1)",
              border: "1px solid rgba(81, 171, 219, 0.25)",
              color: "#ffffff",
              cursor: "pointer",
            }}
            className="bento-mobile-toggle"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            left: "20px",
            right: "20px",
            background: "rgba(5, 24, 49, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(81, 171, 219, 0.3)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            pointerEvents: "auto",
          }}
        >
          <Link
            href="/#projects"
            onClick={() => {
              handleNavClick();
              setMobileMenuOpen(false);
            }}
            style={{ color: "#E1ECFB", padding: "10px", fontSize: "15px", fontWeight: 600 }}
          >
            Projects
          </Link>
          <Link
            href="/gallery"
            onClick={() => {
              handleNavClick();
              setMobileMenuOpen(false);
            }}
            style={{ color: "#E1ECFB", padding: "10px", fontSize: "15px", fontWeight: 600 }}
          >
            Gallery
          </Link>
          <Link
            href="/#about"
            onClick={() => {
              handleNavClick();
              setMobileMenuOpen(false);
            }}
            style={{ color: "#E1ECFB", padding: "10px", fontSize: "15px", fontWeight: 600 }}
          >
            About
          </Link>
          <button
            type="button"
            onClick={() => {
              handleNavClick();
              setMobileMenuOpen(false);
              openContactModal();
            }}
            style={{
              color: "#51ABDB",
              padding: "10px",
              fontSize: "15px",
              fontWeight: 600,
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Contact
          </button>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .bento-desktop-nav {
            display: none !important;
          }
          .bento-mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
