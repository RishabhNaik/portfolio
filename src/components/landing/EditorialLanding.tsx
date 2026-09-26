"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import "@/app/editorial-landing.css";

export function EditorialLanding() {
  const [activeNav, setActiveNav] = useState("work");

  return (
    <div className="landing-viewport">
      {/* ─── TOP SECTION (HERO 3-COLUMN SPLIT) ─── */}
      <section className="landing-top-section">
        {/* Top Header Navigation Overlay */}
        <header className="landing-header">
          {/* Brand Logo & Cyan Bar */}
          <div className="landing-brand-wrap">
            <Link href="/" className="landing-brand">
              <span className="landing-brand-text">Rishabh Naik</span>
              <span className="landing-brand-dash" aria-hidden="true" />
            </Link>
          </div>

          {/* Center Floating Pill Menu */}
          <nav className="landing-nav-pill" aria-label="Main Navigation">
            <Link
              href="/"
              className={`landing-nav-pill-item ${activeNav === "work" ? "active" : ""}`}
              onClick={() => {
                setActiveNav("work");
                cinematicAudioHaptics.playTactileClick();
              }}
            >
              <span className="landing-nav-pill-dot" />
              <span>Work</span>
            </Link>
            <Link
              href="/about"
              className={`landing-nav-pill-item ${activeNav === "about" ? "active" : ""}`}
              onClick={() => {
                setActiveNav("about");
                cinematicAudioHaptics.playTactileClick();
              }}
            >
              <span>About</span>
            </Link>
            <Link
              href="/contact"
              className={`landing-nav-pill-item ${activeNav === "contact" ? "active" : ""}`}
              onClick={() => {
                setActiveNav("contact");
                cinematicAudioHaptics.playTactileClick();
              }}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* Right Editorial Text Block */}
          <div className="landing-editorial-col">
            <div className="landing-editorial-stack">
              <span>// CODE</span>
              <span>DESIGN</span>
              <span>CREATE</span>
              <span>IMPACT</span>
            </div>
            <div className="landing-editorial-line" />
          </div>
        </header>

        {/* 3-Column Split Content */}
        <div className="landing-top-grid">
          {/* Left Column: Hero Text Content */}
          <div className="landing-col-left">
            <div className="landing-hero-content">
              {/* Eyebrow */}
              <div className="landing-eyebrow">
                <span>// DESIGNER &amp; DEVELOPER</span>
              </div>

              {/* Main Headline */}
              <h1 className="landing-headline">
                Designing<br />
                <span className="landing-highlight">and building</span><br />
                digital products<span className="landing-highlight">.</span>
              </h1>

              {/* Subtitle */}
              <p className="landing-subtext">
                I turn ideas into real digital products — combining code, design and creativity to solve meaningful problems.
              </p>

              {/* Action: Only Download Resume (View My Work removed as requested) */}
              <div className="landing-actions">
                <a
                  href="/Rishabh_Naik_Resume.pdf"
                  download="Rishabh_Naik_Resume.pdf"
                  className="landing-btn-resume"
                  onClick={() => cinematicAudioHaptics.playTactileClick()}
                >
                  <Download size={18} strokeWidth={2.2} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column: Developer In Cafe Visual */}
          <div className="landing-col-middle">
            <div className="landing-img-container">
              <img
                src="/assets/landing/hero-developer.jpg"
                alt="Rishabh Naik working on software in modern studio workspace"
                className="landing-img-cover"
                loading="eager"
              />
              <div className="landing-middle-overlay" />
            </div>
          </div>

          {/* Right Column: Architectural Skyscraper Visual */}
          <div className="landing-col-right">
            <div className="landing-img-container">
              <img
                src="/assets/landing/hero-building.jpg"
                alt="Modern glass skyscraper architecture against blue sky"
                className="landing-img-cover"
                loading="eager"
              />
              <div className="landing-right-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM SECTION (3 BENTO NAV CARDS) ─── */}
      <nav className="landing-bottom-section" aria-label="Explore Portfolio">
        {/* Card 01: Projects */}
        <Link
          href="/projects"
          className="landing-bento-card landing-card-projects"
          onClick={() => cinematicAudioHaptics.playTactileClick()}
        >
          <div className="landing-card-bg">
            <img
              src="/assets/landing/card-projects.jpg"
              alt="Projects architecture background"
              className="landing-card-img"
            />
            <div className="landing-card-overlay landing-card-overlay-dark" />
          </div>
          <div className="landing-card-content">
            <span className="landing-card-num">01</span>
            <div className="landing-card-title-wrap">
              <h2 className="landing-card-title">Projects</h2>
              <ArrowRight className="landing-card-arrow" size={26} strokeWidth={1.8} />
            </div>
          </div>
        </Link>

        {/* Card 02: About */}
        <Link
          href="/about"
          className="landing-bento-card landing-card-about"
          onClick={() => cinematicAudioHaptics.playTactileClick()}
        >
          <div className="landing-card-bg">
            <img
              src="/assets/landing/hero-building.jpg"
              alt="About architecture background"
              className="landing-card-img landing-card-img-sky"
            />
            <div className="landing-card-overlay landing-card-overlay-sky" />
          </div>
          <div className="landing-card-content">
            <span className="landing-card-num">02</span>
            <div className="landing-card-title-wrap">
              <h2 className="landing-card-title">About</h2>
              <ArrowRight className="landing-card-arrow" size={26} strokeWidth={1.8} />
            </div>
          </div>
        </Link>

        {/* Card 03: Contact */}
        <Link
          href="/contact"
          className="landing-bento-card landing-card-contact"
          onClick={() => cinematicAudioHaptics.playTactileClick()}
        >
          <div className="landing-card-bg">
            <img
              src="/assets/landing/card-contact.jpg"
              alt="Contact emerald texture background"
              className="landing-card-img"
            />
            <div className="landing-card-overlay landing-card-overlay-emerald" />
          </div>
          <div className="landing-card-content">
            <span className="landing-card-num">03</span>
            <div className="landing-card-title-wrap">
              <h2 className="landing-card-title">Contact</h2>
              <ArrowRight className="landing-card-arrow" size={26} strokeWidth={1.8} />
            </div>
          </div>
        </Link>
      </nav>
    </div>
  );
}
