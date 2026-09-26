"use client";

import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";

interface EditorialNavProps {
  activeItem?: "work" | "projects" | "about" | "contact";
}

export function EditorialNav({ activeItem = "work" }: EditorialNavProps) {
  return (
    <header className="ed-nav-header">
      {/* Brand Logo & Cyan Bar */}
      <div className="ed-brand-wrap">
        <Link href="/" className="ed-brand" onClick={() => cinematicAudioHaptics.playTactileClick()}>
          <span className="ed-brand-text">Rishabh Naik</span>
          <span className="ed-brand-dash" aria-hidden="true" />
        </Link>
      </div>

      {/* Center Floating Pill Menu */}
      <nav className="ed-nav-pill" aria-label="Main Navigation">
        <Link
          href="/"
          className={`ed-nav-pill-item ${activeItem === "work" ? "active" : ""}`}
          onClick={() => cinematicAudioHaptics.playTactileClick()}
        >
          {activeItem === "work" && <span className="ed-nav-pill-dot" />}
          <span>Home</span>
        </Link>
        <Link
          href="/projects"
          className={`ed-nav-pill-item ${activeItem === "projects" ? "active" : ""}`}
          onClick={() => cinematicAudioHaptics.playTactileClick()}
        >
          {activeItem === "projects" && <span className="ed-nav-pill-dot" />}
          <span>Projects</span>
        </Link>
        <Link
          href="/about"
          className={`ed-nav-pill-item ${activeItem === "about" ? "active" : ""}`}
          onClick={() => cinematicAudioHaptics.playTactileClick()}
        >
          {activeItem === "about" && <span className="ed-nav-pill-dot" />}
          <span>About</span>
        </Link>
        <Link
          href="/contact"
          className={`ed-nav-pill-item ${activeItem === "contact" ? "active" : ""}`}
          onClick={() => cinematicAudioHaptics.playTactileClick()}
        >
          {activeItem === "contact" && <span className="ed-nav-pill-dot" />}
          <span>Contact</span>
        </Link>
      </nav>

      {/* Right Editorial Text & Resume */}
      <div className="ed-nav-right">
        <div className="ed-editorial-stack">
          <span>// CODE</span>
          <span>DESIGN</span>
          <span>IMPACT</span>
        </div>
        <a
          href="/Rishabh_Naik_Resume.pdf"
          download="Rishabh_Naik_Resume.pdf"
          className="ed-nav-resume-btn"
          onClick={() => cinematicAudioHaptics.playTactileClick()}
        >
          <Download size={14} />
          <span>Resume</span>
        </a>
      </div>
    </header>
  );
}
