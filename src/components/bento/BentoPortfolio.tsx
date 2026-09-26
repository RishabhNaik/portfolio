"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  ExternalLink,
  MapPin,
  Mail,
  Linkedin,
  Github,
  Monitor,
  Code2,
  Database,
  Zap,
  BarChart3,
  Send,
  Sparkles,
  PenTool,
  Laptop,
  Film,
  Music,
  Clock,
  CheckCircle2,
  X,
  Briefcase,
  GraduationCap,
  Server,
  Cloud,
  Cpu,
  Copy,
  Check,
  Calendar,
  Building,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import "@/app/bento-portfolio.css";

export function BentoPortfolio() {
  const [maximizedSection, setMaximizedSection] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeNav, setActiveNav] = useState("work");
  const [copiedLink, setCopiedLink] = useState(false);

  // Active project calculation when a project is maximized
  const currentProjectId = maximizedSection?.startsWith("project:")
    ? maximizedSection.replace("project:", "")
    : null;
  const activeProject = currentProjectId
    ? PROJECTS_DATA.find((p) => p.id === currentProjectId) || PROJECTS_DATA[0]
    : null;

  const currentProjectIndex = activeProject
    ? PROJECTS_DATA.findIndex((p) => p.id === activeProject.id)
    : -1;
  const nextProject =
    currentProjectIndex !== -1
      ? PROJECTS_DATA[(currentProjectIndex + 1) % PROJECTS_DATA.length]
      : null;
  const prevProject =
    currentProjectIndex !== -1
      ? PROJECTS_DATA[
          (currentProjectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length
        ]
      : null;

  const [returnScrollY, setReturnScrollY] = useState(0);

  const handleOpenSection = (section: string) => {
    cinematicAudioHaptics.playTactileClick();
    if (typeof window !== "undefined") {
      setReturnScrollY(window.scrollY);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    setIsClosing(false);
    setMaximizedSection(section);
    setActiveNav(section);
  };

  const handleOpenProject = (projectId: string) => {
    cinematicAudioHaptics.playTactileClick();
    if (typeof window !== "undefined") {
      setReturnScrollY(window.scrollY);
      window.scrollTo({ top: 0, behavior: "instant" });
      window.history.replaceState(null, "", `?project=${projectId}`);
    }
    setIsClosing(false);
    setMaximizedSection(`project:${projectId}`);
    setActiveNav("work");
  };

  const handleClose = () => {
    if (isClosing) return;
    cinematicAudioHaptics.playTactileClick();
    setIsClosing(true);
    setActiveNav("work");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setTimeout(() => {
      setMaximizedSection(null);
      setIsClosing(false);
      if (typeof window !== "undefined" && returnScrollY > 0) {
        window.scrollTo({ top: returnScrollY, behavior: "instant" });
      }
    }, 280);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && activeProject) {
      const url = `${window.location.origin}/projects/${activeProject.id}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleNavClick = (nav: string) => {
    cinematicAudioHaptics.playTactileClick();
    if (nav === "work") {
      handleClose();
    } else if (nav === "about") {
      handleOpenSection("about");
    } else if (nav === "contact") {
      handleOpenSection("contact");
    } else if (nav === "skills") {
      handleClose();
      setActiveNav("skills");
      setTimeout(() => {
        const skillsEl = document.getElementById("skills");
        if (skillsEl) {
          skillsEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const projParam = params.get("project");
      if (projParam) {
        const exists = PROJECTS_DATA.find((p) => p.id === projParam);
        if (exists) {
          setMaximizedSection(`project:${projParam}`);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && maximizedSection) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [maximizedSection]);

  return (
    <div className="bento-page-wrapper">
      <div className="bento-container">
        {/* ═══════════════════════════════════════════════════════════════
            TOP NAVIGATION BAR
        ═══════════════════════════════════════════════════════════════ */}
        <header className="bento-nav-card">
          {/* Brand Name with Emerald Dot */}
          <button
            type="button"
            className="bento-nav-brand"
            onClick={handleClose}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            title="Return to Bento Work Overview"
          >
            <span className="bento-brand-name">Rishabh Naik</span>
            <span className="bento-brand-dot" aria-hidden="true" />
          </button>

          {/* Center Pill Menu */}
          <nav className="bento-nav-pill-group" aria-label="Main Navigation">
            <button
              type="button"
              className={`bento-nav-pill-link ${activeNav === "work" ? "active" : ""}`}
              onClick={() => handleNavClick("work")}
            >
              Work
            </button>
            <button
              type="button"
              className={`bento-nav-pill-link ${activeNav === "about" ? "active" : ""}`}
              onClick={() => handleNavClick("about")}
            >
              About
            </button>
            <button
              type="button"
              className={`bento-nav-pill-link ${activeNav === "skills" ? "active" : ""}`}
              onClick={() => handleNavClick("skills")}
            >
              Skills
            </button>
          </nav>

          {/* Right Location & CTA */}
          <div className="bento-nav-right">
            <div className="bento-nav-location">
              <MapPin size={13} className="bento-loc-icon" />
              <span>Bangalore, India</span>
            </div>
            <button
              type="button"
              className={`bento-nav-cta-btn ${activeNav === "contact" ? "active" : ""}`}
              onClick={() => handleNavClick("contact")}
            >
              <span>Let&apos;s Work</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════
            MAXIMIZED CARD VIEW (ABOUT ME OR CONTACT)
        ═══════════════════════════════════════════════════════════════ */}
        {maximizedSection === "about" && (
          <div
            className={`bento-maximized-view ${isClosing ? "is-closing" : "is-opening"}`}
            role="dialog"
            aria-modal="true"
            aria-label="About Rishabh Naik"
          >
            <div className="bento-max-card" id="maximized-about">
              {/* Maximized Header with Close Button */}
              <div className="bento-max-header">
                <div className="bento-max-header-left">
                  <div className="bento-tag-with-dot">
                    <span className="bento-card-tag">06 ABOUT ME</span>
                    <span className="bento-green-dot" />
                  </div>
                  <h2 className="bento-max-title">Rishabh Naik</h2>
                  <p className="bento-max-subtitle">
                    Software Engineer &amp; Product Developer based in Bangalore, India
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="bento-max-close-btn"
                  aria-label="Close and return to grid"
                >
                  <X size={16} />
                  <span>Close</span>
                  <kbd className="bento-esc-pill">ESC</kbd>
                </button>
              </div>

              {/* Maximized Grid Content */}
              <div className="bento-max-grid">
                {/* Left Column: Bio & Core Experience */}
                <div className="bento-max-col-main">
                  <div className="bento-max-bio-block">
                    <h3 className="bento-max-section-title">Background &amp; Mindset</h3>
                    <p className="bento-max-lead">
                      I design and build production digital products from end to end — combining thoughtful user experiences with resilient full-stack systems.
                    </p>
                    <p className="bento-max-body-text">
                      Currently at <strong>Anantaloop</strong>, I engineer core production platforms like <strong>Impetus</strong> — a sports management SaaS handling athlete rosters, automated tournament scheduling, and standardized physical assessments.
                    </p>
                    <p className="bento-max-body-text">
                      Beyond traditional full-stack engineering, I actively build with <strong>Model Context Protocol (MCP)</strong> and autonomous AI agents, enabling language models to safely interface with live databases, run tools, and execute workflows with schema-guarded reliability.
                    </p>
                  </div>

                  {/* Role & Education Subcards */}
                  <div className="bento-max-cards-row">
                    <div className="bento-max-subcard">
                      <div className="bento-max-subcard-icon">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <span className="bento-subcard-eyebrow">CURRENT POSITION</span>
                        <h4 className="bento-subcard-heading">Software Engineer · Anantaloop</h4>
                        <p className="bento-subcard-desc">
                          Production full-stack engineering with NestJS, React, PostgreSQL, and AWS. April 2024 – Present.
                        </p>
                      </div>
                    </div>

                    <div className="bento-max-subcard">
                      <div className="bento-max-subcard-icon">
                        <GraduationCap size={18} />
                      </div>
                      <div>
                        <span className="bento-subcard-eyebrow">EDUCATION</span>
                        <h4 className="bento-subcard-heading">B.E. Computer Science · 7.75 CGPA</h4>
                        <p className="bento-subcard-desc">
                          Sambhram Institute of Technology (VTU), 2019 – 2023. Capstone in Decentralized Inventory Sharing.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bento-max-actions">
                    <a
                      href="/Rishabh_Naik_Resume.pdf"
                      download="Rishabh_Naik_Resume.pdf"
                      className="bento-btn-primary"
                      onClick={() => cinematicAudioHaptics.playTactileClick()}
                    >
                      <Download size={15} />
                      <span>Download Resume</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleOpenSection("contact")}
                      className="bento-btn-dark-pill"
                    >
                      <Mail size={15} />
                      <span>Get in Touch</span>
                      <ArrowRight size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="bento-btn-text-close"
                    >
                      <span>← Back to Work</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Quick Contacts & Tech Expertise */}
                <div className="bento-max-col-side">
                  <div className="bento-max-side-card">
                    <span className="bento-side-heading">DIRECT CONTACT</span>
                    <div className="bento-max-contact-list">
                      <a href="mailto:rishabhnaik37@gmail.com" className="bento-max-contact-item">
                        <Mail size={15} className="bento-side-ico" />
                        <span className="bento-side-text">rishabhnaik37@gmail.com</span>
                        <ArrowUpRight size={14} className="bento-side-arrow" />
                      </a>
                      <a href="https://www.linkedin.com/in/rishabhnaik/" target="_blank" rel="noopener noreferrer" className="bento-max-contact-item">
                        <Linkedin size={15} className="bento-side-ico" />
                        <span className="bento-side-text">linkedin.com/in/rishabhnaik</span>
                        <ArrowUpRight size={14} className="bento-side-arrow" />
                      </a>
                      <a href="https://github.com/RishabhNaik" target="_blank" rel="noopener noreferrer" className="bento-max-contact-item">
                        <Github size={15} className="bento-side-ico" />
                        <span className="bento-side-text">github.com/RishabhNaik</span>
                        <ArrowUpRight size={14} className="bento-side-arrow" />
                      </a>
                      <div className="bento-max-contact-item static">
                        <MapPin size={15} className="bento-side-ico" />
                        <span className="bento-side-text">Bangalore, Karnataka, India</span>
                      </div>
                    </div>
                  </div>

                  <div className="bento-max-side-card">
                    <span className="bento-side-heading">TECHNICAL EXPERTISE</span>
                    <div className="bento-max-skill-groups">
                      <div className="bento-skill-group">
                        <div className="bento-skill-group-head">
                          <Code2 size={14} />
                          <span>Frontend Architecture</span>
                        </div>
                        <div className="bento-skill-pill-wrap">
                          <span className="bento-skill-pill">React.js</span>
                          <span className="bento-skill-pill">Next.js</span>
                          <span className="bento-skill-pill">TypeScript</span>
                          <span className="bento-skill-pill">Tailwind CSS</span>
                        </div>
                      </div>

                      <div className="bento-skill-group">
                        <div className="bento-skill-group-head">
                          <Server size={14} />
                          <span>Backend &amp; APIs</span>
                        </div>
                        <div className="bento-skill-pill-wrap">
                          <span className="bento-skill-pill">NestJS</span>
                          <span className="bento-skill-pill">Node.js</span>
                          <span className="bento-skill-pill">Express</span>
                          <span className="bento-skill-pill">REST &amp; Microservices</span>
                        </div>
                      </div>

                      <div className="bento-skill-group">
                        <div className="bento-skill-group-head">
                          <Database size={14} />
                          <span>Databases &amp; Storage</span>
                        </div>
                        <div className="bento-skill-pill-wrap">
                          <span className="bento-skill-pill">PostgreSQL</span>
                          <span className="bento-skill-pill">MongoDB</span>
                          <span className="bento-skill-pill">Redis</span>
                          <span className="bento-skill-pill">Prisma ORM</span>
                        </div>
                      </div>

                      <div className="bento-skill-group">
                        <div className="bento-skill-group-head">
                          <Cpu size={14} />
                          <span>AI Agents &amp; Cloud</span>
                        </div>
                        <div className="bento-skill-pill-wrap">
                          <span className="bento-skill-pill">MCP Protocol</span>
                          <span className="bento-skill-pill">LLM Tool Calling</span>
                          <span className="bento-skill-pill">AWS</span>
                          <span className="bento-skill-pill">Docker</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {maximizedSection === "contact" && (
          <div
            className={`bento-maximized-view ${isClosing ? "is-closing" : "is-opening"}`}
            role="dialog"
            aria-modal="true"
            aria-label="Contact Rishabh Naik"
          >
            <div className="bento-max-card" id="maximized-contact">
              <div className="bento-max-header">
                <div className="bento-max-header-left">
                  <div className="bento-tag-with-dot">
                    <span className="bento-card-tag">GET IN TOUCH</span>
                    <span className="bento-status-dot-green" />
                  </div>
                  <h2 className="bento-max-title">Let&apos;s build something meaningful.</h2>
                  <p className="bento-max-subtitle">
                    Whether you have an idea for a project, need a full-stack engineer, or want to collaborate on AI agent workflows.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="bento-max-close-btn"
                  aria-label="Close and return to grid"
                >
                  <X size={16} />
                  <span>Close</span>
                  <kbd className="bento-esc-pill">ESC</kbd>
                </button>
              </div>

              <div className="bento-max-contact-grid">
                <div className="bento-contact-card-box">
                  <div className="bento-contact-icon-bubble">
                    <Mail size={22} />
                  </div>
                  <h3 className="bento-contact-box-title">Direct Email</h3>
                  <p className="bento-contact-box-desc">
                    Drop me a line anytime. I usually respond within 24 hours for project inquiries and opportunities.
                  </p>
                  <a
                    href="mailto:rishabhnaik37@gmail.com"
                    className="bento-btn-primary"
                    onClick={() => cinematicAudioHaptics.playTactileClick()}
                  >
                    <span>rishabhnaik37@gmail.com</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                <div className="bento-contact-card-box">
                  <div className="bento-contact-icon-bubble">
                    <Linkedin size={22} />
                  </div>
                  <h3 className="bento-contact-box-title">LinkedIn Message</h3>
                  <p className="bento-contact-box-desc">
                    Connect with me on LinkedIn for professional networking, engineering discussions, and opportunities.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/rishabhnaik/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-btn-secondary-dark"
                    onClick={() => cinematicAudioHaptics.playTactileClick()}
                  >
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                <div className="bento-contact-card-box">
                  <div className="bento-contact-icon-bubble">
                    <Send size={22} />
                  </div>
                  <h3 className="bento-contact-box-title">WhatsApp Quick Chat</h3>
                  <p className="bento-contact-box-desc">
                    Send a pre-formatted message directly to discuss projects or quick inquiries immediately.
                  </p>
                  <a
                    href="https://wa.me/919900827255?text=Hi%20Rishabh%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding%20a%20project!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-btn-secondary-dark"
                    onClick={() => cinematicAudioHaptics.playTactileClick()}
                  >
                    <span>Open WhatsApp</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            MAXIMIZED PROJECT CASE STUDY VIEW
        ═══════════════════════════════════════════════════════════════ */}
        {maximizedSection?.startsWith("project:") && activeProject && (
          <div
            className={`bento-maximized-view ${isClosing ? "is-closing" : "is-opening"}`}
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
          >
            <div className="bento-max-card bento-max-project-card" id={`maximized-${activeProject.id}`}>
              {/* Obsidian Window Chrome Titlebar */}
              <div className="obsidian-window-bar">
                <div className="obsidian-dots" aria-hidden="true">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="obsidian-dot dot-red"
                    title="Close (ESC)"
                    style={{ border: "none", cursor: "pointer", padding: 0 }}
                  />
                  <span className="obsidian-dot dot-yellow" />
                  <span className="obsidian-dot dot-green" />
                </div>
                <div className="obsidian-tabs">
                  <div className="obsidian-tab active">
                    <Code2 size={12} className="obsidian-tab-icon" />
                    <span>{activeProject.id}.md</span>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="obsidian-tab-close"
                      style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}
                    >
                      ×
                    </button>
                  </div>
                  {nextProject && (
                    <button
                      type="button"
                      onClick={() => handleOpenProject(nextProject.id)}
                      className="obsidian-tab"
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                      title={`Switch to ${nextProject.title}`}
                    >
                      <Sparkles size={12} className="obsidian-tab-icon" />
                      <span>{nextProject.id}.md</span>
                    </button>
                  )}
                </div>
                <div className="obsidian-window-vault">
                  <span className="obsidian-vault-name">vault: /projects/{activeProject.id}</span>
                </div>
              </div>

              <div className="bento-max-project-body">
                {/* Maximized Header with Actions */}
                <div className="bento-max-project-header">
                  <div className="bento-max-header-left">
                    <div className="bento-tag-with-dot">
                      <span className="bento-card-tag">{activeProject.category}</span>
                      <span className="bento-status-dot-green" />
                    </div>
                    <h2 className="bento-max-title">{activeProject.title}</h2>
                    <p className="bento-max-subtitle">{activeProject.description}</p>
                  </div>

                  <div className="bento-max-header-actions">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className={`bento-btn-icon-label ${copiedLink ? "copied" : ""}`}
                      title="Copy case study link"
                    >
                      {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedLink ? "Copied Link!" : "Share"}</span>
                    </button>

                    <Link
                      href={`/projects/${activeProject.id}`}
                      className="bento-btn-icon-label"
                      title="Open in dedicated standalone page"
                    >
                      <ExternalLink size={14} />
                      <span>Full Page</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="bento-max-close-btn"
                      aria-label="Close and return to grid"
                    >
                      <X size={16} />
                      <span>Close</span>
                      <kbd className="bento-esc-pill">ESC</kbd>
                    </button>
                  </div>
                </div>

                {/* 5-Column Project Meta Ribbon */}
                <div className="bento-project-meta-ribbon">
                  <div className="bento-meta-cell">
                    <span className="bento-meta-cell-label">Role</span>
                    <span className="bento-meta-cell-val">{activeProject.role}</span>
                  </div>
                  <div className="bento-meta-cell">
                    <span className="bento-meta-cell-label">Company / Org</span>
                    <span className="bento-meta-cell-val">
                      <Building size={13} className="bento-loc-icon" />
                      {activeProject.company}
                    </span>
                  </div>
                  <div className="bento-meta-cell">
                    <span className="bento-meta-cell-label">Timeline</span>
                    <span className="bento-meta-cell-val">
                      <Calendar size={13} className="bento-loc-icon" />
                      {activeProject.date}
                    </span>
                  </div>
                  <div className="bento-meta-cell">
                    <span className="bento-meta-cell-label">Location</span>
                    <span className="bento-meta-cell-val">
                      <MapPin size={13} className="bento-loc-icon" />
                      {activeProject.location}
                    </span>
                  </div>
                  <div className="bento-meta-cell">
                    <span className="bento-meta-cell-label">Production Status</span>
                    <span className="bento-meta-cell-val highlight">
                      <ShieldCheck size={13} />
                      {activeProject.status}
                    </span>
                  </div>
                </div>

                {/* Tech Badges Row */}
                <div className="bento-meta-tags-row">
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className="bento-meta-tag">
                      #{tag.toLowerCase().replace(/\s+/g, "-")}
                    </span>
                  ))}
                </div>

                {/* 16:9 Cinematic Hero Image Box */}
                <div className="bento-max-hero-preview">
                  <img
                    src={activeProject.heroImageUrl || activeProject.imageUrl}
                    alt={activeProject.title}
                    className="bento-max-hero-img"
                  />
                  <div className="bento-max-caption-bar">
                    <span>{activeProject.title} — Production Architecture &amp; Workflows</span>
                    <span>16:9 Widescreen View</span>
                  </div>
                </div>

                {/* Two Column: The Challenge vs The Solution */}
                <div className="bento-max-challenge-grid">
                  <div className="bento-max-panel-card">
                    <span className="bento-max-panel-badge">01 / THE CHALLENGE</span>
                    <h3 className="bento-max-panel-title">The Operational Problem</h3>
                    <p className="bento-max-panel-text">
                      {activeProject.problem ||
                        "Legacy operations relied on manual spreadsheets and disconnected messaging, creating severe coordination bottlenecks, reconciliation delays, and unverified data entries."}
                    </p>
                  </div>

                  <div className="bento-max-panel-card">
                    <span className="bento-max-panel-badge">02 / THE SOLUTION</span>
                    <h3 className="bento-max-panel-title">The Engineered Solution</h3>
                    <p className="bento-max-panel-text">
                      {activeProject.product || activeProject.synopsis}
                    </p>
                  </div>
                </div>

                {/* Personal Ownership / Contribution Card */}
                <div className="bento-max-ownership-card">
                  <span className="bento-max-panel-badge">03 / ENGINEERING OWNERSHIP</span>
                  <h3 className="bento-max-panel-title">What I Personally Built &amp; Shipped</h3>
                  <p className="bento-max-ownership-text">{activeProject.contribution}</p>
                </div>

                {/* 4-Tier Architecture Blueprint */}
                {activeProject.architecture && (
                  <div>
                    <span className="bento-max-panel-badge" style={{ display: "block", marginBottom: 12 }}>
                      04 / SYSTEM DESIGN BLUEPRINT
                    </span>
                    <div className="bento-max-arch-grid">
                      {activeProject.architecture.frontend && (
                        <div className="bento-max-arch-box">
                          <div className="bento-max-arch-header">
                            <div className="bento-max-arch-icon">
                              <Monitor size={16} />
                            </div>
                            <h4 className="bento-max-arch-title">Frontend Layer</h4>
                          </div>
                          <ul className="bento-max-arch-list">
                            {activeProject.architecture.frontend.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activeProject.architecture.backend && (
                        <div className="bento-max-arch-box">
                          <div className="bento-max-arch-header">
                            <div className="bento-max-arch-icon">
                              <Server size={16} />
                            </div>
                            <h4 className="bento-max-arch-title">Backend &amp; APIs</h4>
                          </div>
                          <ul className="bento-max-arch-list">
                            {activeProject.architecture.backend.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activeProject.architecture.database && (
                        <div className="bento-max-arch-box">
                          <div className="bento-max-arch-header">
                            <div className="bento-max-arch-icon">
                              <Database size={16} />
                            </div>
                            <h4 className="bento-max-arch-title">Database &amp; Data</h4>
                          </div>
                          <ul className="bento-max-arch-list">
                            {activeProject.architecture.database.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {(activeProject.architecture.cloud || activeProject.architecture.ai) && (
                        <div className="bento-max-arch-box">
                          <div className="bento-max-arch-header">
                            <div className="bento-max-arch-icon">
                              {activeProject.architecture.ai ? <Cpu size={16} /> : <Cloud size={16} />}
                            </div>
                            <h4 className="bento-max-arch-title">
                              {activeProject.architecture.ai ? "AI & Workflows" : "Cloud & DevOps"}
                            </h4>
                          </div>
                          <ul className="bento-max-arch-list">
                            {(activeProject.architecture.ai || activeProject.architecture.cloud || []).map((c) => (
                              <li key={c}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Key Technical Decisions (3 Columns) */}
                {activeProject.technicalDecisions && activeProject.technicalDecisions.length > 0 && (
                  <div>
                    <span className="bento-max-panel-badge" style={{ display: "block", marginBottom: 12 }}>
                      05 / ARCHITECTURAL TRADEOFFS &amp; DECISIONS
                    </span>
                    <div className="bento-max-decisions-grid">
                      {activeProject.technicalDecisions.map((dec, i) => (
                        <div key={dec.title} className="bento-max-decision-card">
                          <span className="bento-max-decision-num">DECISION 0{i + 1}</span>
                          <h4 className="bento-max-decision-title">{dec.title}</h4>
                          <p className="bento-max-decision-rationale">{dec.rationale}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Measurable Impact & Takeaways */}
                <div className="bento-max-results-grid">
                  {activeProject.results && (
                    <div className="bento-max-panel-card">
                      <span className="bento-max-panel-badge">06 / MEASURABLE RESULTS</span>
                      <h3 className="bento-max-panel-title">Production Impact</h3>
                      <ul className="bento-max-results-list">
                        {activeProject.results.map((res, i) => (
                          <li key={i} className="bento-max-result-item">
                            <CheckCircle2 size={16} className="bento-max-result-icon" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeProject.learnings && (
                    <div className="bento-max-panel-card">
                      <span className="bento-max-panel-badge">07 / REFLECTIONS &amp; LEARNINGS</span>
                      <h3 className="bento-max-panel-title">Engineering Takeaways</h3>
                      <p className="bento-max-panel-text">{activeProject.learnings}</p>
                    </div>
                  )}
                </div>

                {/* Screenshots Gallery */}
                {activeProject.screenshots && activeProject.screenshots.length > 0 && (
                  <div>
                    <span className="bento-max-panel-badge" style={{ display: "block", marginBottom: 12 }}>
                      08 / PRODUCT EVIDENCE &amp; WORKFLOWS
                    </span>
                    <div className="bento-max-gallery-grid">
                      {activeProject.screenshots.map((shot, idx) => (
                        <div key={idx} className="bento-max-gallery-item">
                          <div className="bento-max-gallery-imgwrap">
                            <img src={shot.url} alt={shot.caption} className="bento-max-gallery-img" />
                            {shot.tag && <span className="bento-max-gallery-tag">{shot.tag}</span>}
                          </div>
                          <p className="bento-max-gallery-caption">{shot.caption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Navigator Footer */}
                <div className="bento-max-nav-footer">
                  {prevProject && (
                    <button
                      type="button"
                      onClick={() => handleOpenProject(prevProject.id)}
                      className="bento-max-nav-btn"
                    >
                      <ChevronLeft size={16} />
                      <span>Prev: {prevProject.title.split(" ")[0]}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleClose}
                    className="bento-max-nav-btn primary"
                  >
                    <span>Return to Bento Portfolio</span>
                  </button>

                  {nextProject && (
                    <button
                      type="button"
                      onClick={() => handleOpenProject(nextProject.id)}
                      className="bento-max-nav-btn"
                    >
                      <span>Next: {nextProject.title.split(" ")[0]}</span>
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}


        {/* ═══════════════════════════════════════════════════════════════
            BENTO GRID (SHOWN WHEN NO SECTION IS MAXIMIZED)
        ═══════════════════════════════════════════════════════════════ */}
        {maximizedSection === null && (
          <div className="bento-grid-view">
            {/* ROW 1: HERO CARD + IMPACT STATS & SERVICES */}
            <section className="bento-row bento-row-hero">
          {/* Main Dark Hero Card with Obsidian Window Chrome */}
          <div className="bento-card bento-hero-card">
            {/* Obsidian Window Chrome Titlebar */}
            <div className="obsidian-window-bar">
              <div className="obsidian-dots" aria-hidden="true">
                <span className="obsidian-dot dot-red" />
                <span className="obsidian-dot dot-yellow" />
                <span className="obsidian-dot dot-green" />
              </div>
              <div className="obsidian-tabs">
                <div className="obsidian-tab active">
                  <Code2 size={12} className="obsidian-tab-icon" />
                  <span>rishabh_naik.md</span>
                  <span className="obsidian-tab-close" aria-hidden="true">×</span>
                </div>
                <div className="obsidian-tab">
                  <Sparkles size={12} className="obsidian-tab-icon" />
                  <span>fullstack.canvas</span>
                </div>
              </div>
              <div className="obsidian-window-vault">
                <span className="obsidian-vault-name">vault: /portfolio</span>
              </div>
            </div>

            {/* Background Developer Image with Soft Radial Feathering */}
            <div className="bento-hero-image-wrap" aria-hidden="true">
              <img
                src="/assets/landing/hero-developer.jpg"
                alt="Rishabh Naik working at laptop"
                className="bento-hero-bg-img"
              />
              <div className="bento-hero-vignette" />
            </div>

            {/* Hero Left Content */}
            <div className="bento-hero-content">
              <span className="bento-hero-eyebrow">DESIGNER &amp; FULL-STACK DEVELOPER</span>

              <h1 className="bento-hero-headline">
                I design and build <br className="bento-desktop-br" />
                <span className="bento-text-green">digital products</span> <br className="bento-desktop-br" />
                that solve real problems.
              </h1>

              <p className="bento-hero-desc">
                I help businesses, startups, and creators turn ideas into modern websites, web applications, and custom software — combining thoughtful design with solid full-stack development.
              </p>

              {/* CTAs */}
              <div className="bento-hero-actions">
                <a
                  href="#featured-projects"
                  className="bento-btn-primary"
                  onClick={() => cinematicAudioHaptics.playTactileClick()}
                >
                  <span>View My Work</span>
                  <ArrowRight size={15} />
                </a>

                <a
                  href="/Rishabh_Naik_Resume.pdf"
                  download="Rishabh_Naik_Resume.pdf"
                  className="bento-btn-glass"
                  onClick={() => cinematicAudioHaptics.playTactileClick()}
                >
                  <Download size={15} />
                  <span>Download Resume</span>
                </a>
              </div>

              {/* Available Status Pill & Obsidian Status Indicator */}
              <div className="bento-hero-status">
                <span className="bento-status-dot" />
                <span>Available for freelance &amp; full-time opportunities</span>
              </div>
            </div>
          </div>

          {/* Right Column: 01 Impact + 02 What I Do */}
          <div className="bento-stack-right">
            {/* 01 Impact Card */}
            <div className="bento-card bento-card-impact">
              <div className="bento-card-header">
                <span className="bento-card-tag">01 IMPACT</span>
                <BarChart3 size={18} className="bento-header-icon" />
              </div>

              <div className="bento-impact-stats">
                <div className="bento-stat-item">
                  <span className="bento-stat-num">3+</span>
                  <span className="bento-stat-label">Years Experience</span>
                </div>
                <div className="bento-stat-item">
                  <span className="bento-stat-num">20+</span>
                  <span className="bento-stat-label">Projects Completed</span>
                </div>
                <div className="bento-stat-item">
                  <span className="bento-stat-num">10+</span>
                  <span className="bento-stat-label">Happy Clients</span>
                </div>
              </div>

              {/* Vector Metric Velocity Sparkline Graph */}
              <div className="bento-impact-chart-wrap" aria-hidden="true">
                <svg viewBox="0 0 320 46" fill="none" className="bento-impact-chart-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="impact-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="impact-stroke-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#15803d" />
                      <stop offset="60%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                  </defs>
                  {/* Baseline subtle grid dashes */}
                  <line x1="0" y1="12" x2="320" y2="12" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                  <line x1="0" y1="30" x2="320" y2="30" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                  {/* Fill area */}
                  <path d="M0,40 C40,38 75,34 110,26 C155,16 195,28 240,14 C275,3 295,8 320,4 L320,46 L0,46 Z" fill="url(#impact-area-grad)" />
                  {/* Stroke path */}
                  <path d="M0,40 C40,38 75,34 110,26 C155,16 195,28 240,14 C275,3 295,8 320,4" stroke="url(#impact-stroke-grad)" strokeWidth="2" strokeLinecap="round" />
                  {/* Milestone Nodes */}
                  <circle cx="110" cy="26" r="2.5" fill="#16a34a" />
                  <circle cx="240" cy="14" r="3" fill="#22c55e" />
                  <circle cx="320" cy="4" r="3.5" fill="#4ade80" />
                </svg>
                <div className="bento-impact-chart-footer">
                  <span className="bento-impact-badge">
                    <span className="bento-impact-pulse-dot" /> High Delivery Velocity
                  </span>
                  <span>2022 → 2025</span>
                </div>
              </div>
            </div>

            {/* 02 What I Do Card */}
            <div className="bento-card bento-card-services">
              <div className="bento-card-header">
                <span className="bento-card-tag">02 WHAT I DO</span>
                <Link href="/about" className="bento-header-link">
                  <span>View all</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="bento-services-grid">
                {/* Service 1 */}
                <div className="bento-service-box">
                  <div className="bento-service-top">
                    <div className="bento-service-icon-bubble">
                      <Monitor size={16} />
                    </div>
                    <h3 className="bento-service-title">UI/UX Design</h3>
                  </div>
                  <p className="bento-service-desc">Clean, user-focused designs that work.</p>
                  <span className="bento-service-arrow">→</span>
                </div>

                {/* Service 2 */}
                <div className="bento-service-box">
                  <div className="bento-service-top">
                    <div className="bento-service-icon-bubble">
                      <Code2 size={16} />
                    </div>
                    <h3 className="bento-service-title">Web Development</h3>
                  </div>
                  <p className="bento-service-desc">Modern, scalable web applications.</p>
                  <span className="bento-service-arrow">→</span>
                </div>

                {/* Service 3 */}
                <div className="bento-service-box">
                  <div className="bento-service-top">
                    <div className="bento-service-icon-bubble">
                      <Database size={16} />
                    </div>
                    <h3 className="bento-service-title">Backend Systems</h3>
                  </div>
                  <p className="bento-service-desc">APIs, databases and integrations.</p>
                  <span className="bento-service-arrow">→</span>
                </div>

                {/* Service 4 */}
                <div className="bento-service-box">
                  <div className="bento-service-top">
                    <div className="bento-service-icon-bubble">
                      <Zap size={16} />
                    </div>
                    <h3 className="bento-service-title">Product Development</h3>
                  </div>
                  <p className="bento-service-desc">End-to-end support from idea to launch.</p>
                  <span className="bento-service-arrow">→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 2: FEATURED PROJECTS (03) + LET'S WORK TOGETHER (04)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bento-row bento-row-projects" id="featured-projects">
          {/* 03 Featured Projects Card */}
          <div className="bento-card bento-card-featured">
            <div className="bento-card-header">
              <span className="bento-card-tag">03 FEATURED PROJECTS</span>
              <Link href="/projects" className="bento-header-link">
                <span>View all projects</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bento-projects-grid">
              {/* Project 1: Harvest Flow */}
              <div
                className="bento-project-item"
                onClick={() => handleOpenProject("harvest-flow-growteq")}
                style={{ cursor: "pointer" }}
              >
                <div className="bento-project-img-box">
                  <img
                    src="/assets/bento/harvest-flow.jpg"
                    alt="Harvest Flow procurement dashboard"
                    className="bento-project-img"
                  />
                </div>
                <div className="bento-project-tags">
                  <span className="bento-tag app-tag">#nextjs</span>
                  <span className="bento-tag app-tag">#nestjs</span>
                  <span className="bento-tag app-tag">#postgresql</span>
                </div>
                <h3 className="bento-project-title">Harvest Flow</h3>
                <p className="bento-project-desc">
                  Farm dispatch &amp; procurement platform for efficient operations.
                </p>
                <div className="bento-project-links">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProject("harvest-flow-growteq");
                    }}
                    className="bento-link-action"
                    style={{ background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer" }}
                  >
                    <span>View case study</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProject("harvest-flow-growteq");
                    }}
                    className="bento-icon-btn"
                    aria-label="Open Project Case Study"
                  >
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>

              {/* Project 2: Impetus */}
              <div
                className="bento-project-item"
                onClick={() => handleOpenProject("impetus-sports-platform")}
                style={{ cursor: "pointer" }}
              >
                <div className="bento-project-img-box">
                  <img
                    src="/assets/bento/impetus-dark.jpg"
                    alt="Impetus club and tournament dashboard"
                    className="bento-project-img"
                  />
                </div>
                <div className="bento-project-tags">
                  <span className="bento-tag app-tag">#react</span>
                  <span className="bento-tag app-tag">#nestjs</span>
                  <span className="bento-tag app-tag">#razorpay</span>
                </div>
                <h3 className="bento-project-title">Impetus</h3>
                <p className="bento-project-desc">
                  Club &amp; tournament management platform with payments and APIs.
                </p>
                <div className="bento-project-links">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProject("impetus-sports-platform");
                    }}
                    className="bento-link-action"
                    style={{ background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer" }}
                  >
                    <span>View case study</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProject("impetus-sports-platform");
                    }}
                    className="bento-icon-btn"
                    aria-label="Open Project Case Study"
                  >
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>

              {/* Project 3: Haptics Display */}
              <div
                className="bento-project-item"
                onClick={() => handleOpenProject("ai-agent-mcp-workflows")}
                style={{ cursor: "pointer" }}
              >
                <div className="bento-project-img-box">
                  <img
                    src="/assets/bento/haptics-mobile.jpg"
                    alt="Haptics Display media player app"
                    className="bento-project-img"
                  />
                </div>
                <div className="bento-project-tags">
                  <span className="bento-tag app-tag">#autonomous-agents</span>
                  <span className="bento-tag app-tag">#mcp</span>
                  <span className="bento-tag app-tag">#llm</span>
                </div>
                <h3 className="bento-project-title">Autonomous AI &amp; MCP</h3>
                <p className="bento-project-desc">
                  Model Context Protocol tools and agentic execution workflows.
                </p>
                <div className="bento-project-links">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProject("ai-agent-mcp-workflows");
                    }}
                    className="bento-link-action"
                    style={{ background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer" }}
                  >
                    <span>View case study</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProject("ai-agent-mcp-workflows");
                    }}
                    className="bento-icon-btn"
                    aria-label="Open Project Case Study"
                  >
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 04 Let's Work Together Card */}
          <div className="bento-card bento-card-cta">
            {/* Background Vector Graphic: Geometric Wireframe Constellation */}
            <div className="bento-cta-vector-bg" aria-hidden="true">
              <svg viewBox="0 0 110 110" fill="none" className="bento-cta-vector-svg">
                <circle cx="55" cy="55" r="44" stroke="rgba(74, 222, 128, 0.12)" strokeDasharray="3 3" />
                <circle cx="55" cy="55" r="28" stroke="rgba(74, 222, 128, 0.18)" />
                <polygon points="55,16 88,36 88,74 55,94 22,74 22,36" stroke="rgba(74, 222, 128, 0.3)" strokeWidth="1.2" />
                <polygon points="55,30 76,42 76,68 55,80 34,68 34,42" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
                <line x1="55" y1="16" x2="55" y2="94" stroke="rgba(74, 222, 128, 0.16)" />
                <line x1="22" y1="36" x2="88" y2="74" stroke="rgba(74, 222, 128, 0.16)" />
                <line x1="22" y1="74" x2="88" y2="36" stroke="rgba(74, 222, 128, 0.16)" />
                <circle cx="55" cy="16" r="2.5" fill="#4ade80" />
                <circle cx="88" cy="36" r="2" fill="#22c55e" />
                <circle cx="88" cy="74" r="2" fill="#16a34a" />
                <circle cx="55" cy="94" r="2.5" fill="#4ade80" />
                <circle cx="22" cy="74" r="2" fill="#16a34a" />
                <circle cx="22" cy="36" r="2" fill="#22c55e" />
                <circle cx="55" cy="55" r="3" fill="#ffffff" />
              </svg>
            </div>

            <span className="bento-card-tag-light">04 LET&apos;S WORK TOGETHER</span>
            <div className="bento-cta-icon-box">
              <Send size={24} className="bento-paper-plane" />
            </div>
            <h2 className="bento-cta-heading">
              Have a project<br />in mind?
            </h2>
            <p className="bento-cta-desc">
              Whether it&apos;s a website, web app, or just an idea — I&apos;d love to hear about it. Let&apos;s build something great together.
            </p>
            <button
              type="button"
              className="bento-cta-btn-white"
              onClick={() => handleOpenSection("contact")}
            >
              <span>Get in touch</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 3: TECHNOLOGIES I WORK WITH (05)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bento-row" id="skills">
          <div className="bento-card bento-card-tech">
            <div className="bento-card-header">
              <span className="bento-card-tag">05 TECHNOLOGIES I WORK WITH</span>
            </div>

            <div className="bento-tech-grid">
              {/* React */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-react">
                  <svg viewBox="0 0 115.3 100" className="tech-svg" fill="#00d8ff">
                    <circle cx="57.6" cy="50" r="8.4" />
                    <path d="M57.6,18.8c-19.4,0-35.1,14-35.1,31.2s15.7,31.2,35.1,31.2s35.1-14,35.1-31.2S77,18.8,57.6,18.8z M57.6,76.5 c-16.8,0-30.4-11.9-30.4-26.5s13.6-26.5,30.4-26.5s30.4,11.9,30.4,26.5S74.4,76.5,57.6,76.5z" />
                    <path transform="matrix(0.5 -0.866 0.866 0.5 -14.5 68.3)" d="M57.6,18.8c-19.4,0-35.1,14-35.1,31.2s15.7,31.2,35.1,31.2s35.1-14,35.1-31.2S77,18.8,57.6,18.8z M57.6,76.5 c-16.8,0-30.4-11.9-30.4-26.5s13.6-26.5,30.4-26.5s30.4,11.9,30.4,26.5S74.4,76.5,57.6,76.5z" />
                    <path transform="matrix(0.5 0.866 -0.866 0.5 72.1 -21.9)" d="M57.6,18.8c-19.4,0-35.1,14-35.1,31.2s15.7,31.2,35.1,31.2s35.1-14,35.1-31.2S77,18.8,57.6,18.8z M57.6,76.5 c-16.8,0-30.4-11.9-30.4-26.5s13.6-26.5,30.4-26.5s30.4,11.9,30.4,26.5S74.4,76.5,57.6,76.5z" />
                  </svg>
                </div>
                <span className="bento-tech-name">React</span>
              </div>

              {/* Next.js */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-next">
                  <svg viewBox="0 0 180 180" className="tech-svg-official" fill="none">
                    <circle cx="90" cy="90" r="88" fill="#09090b" stroke="rgba(255,255,255,0.18)" strokeWidth="4" />
                    <path d="M149.5 157.4L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.4z" fill="#ffffff" />
                    <rect x="115" y="54" width="12" height="72" fill="#ffffff" />
                  </svg>
                </div>
                <span className="bento-tech-name">Next.js</span>
              </div>

              {/* NestJS */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-nest">
                  <svg viewBox="0 0 256 256" className="tech-svg-official" fill="#ea2845">
                    <path d="M128 0L24 48v72c0 66.2 44.4 128.2 104 144 59.6-15.8 104-77.8 104-144V48L128 0zm0 26.2l80 36.9v56.9c0 53-35.5 102.6-80 115.3-44.5-12.7-80-62.3-80-115.3V63.1l80-36.9z" />
                  </svg>
                </div>
                <span className="bento-tech-name">NestJS</span>
              </div>

              {/* Node.js */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-node">
                  <svg viewBox="0 0 256 289" className="tech-svg-official" fill="#5fa04e">
                    <path d="M128 0l128 73.9v141.2L128 289 0 215.1V73.9L128 0zm0 29.5L25.6 88.6v111.8L128 259.5l102.4-59.1V88.6L128 29.5z" />
                  </svg>
                </div>
                <span className="bento-tech-name">Node.js</span>
              </div>

              {/* TypeScript */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-ts">
                  <svg viewBox="0 0 128 128" className="tech-svg-official">
                    <rect width="128" height="128" rx="16" fill="#3178C6" />
                    <path d="M66.4 75.8c1.7 2.7 4 4.8 6.9 6.3 2.9 1.5 6.2 2.2 9.8 2.2 2.7 0 5.1-.4 7.2-1.3 2.1-.9 3.8-2.1 5.1-3.6 1.3-1.5 2.2-3.3 2.8-5.3.6-2 .8-4.2.8-6.6 0-3.2-.6-5.8-1.9-8-1.3-2.1-3-3.9-5.3-5.2-2.2-1.3-4.8-2.4-7.8-3.3-3-.9-6.1-1.8-9.3-2.7-3.6-1.1-6.8-2.3-9.7-3.7-2.9-1.4-5.3-3.1-7.2-5.1-1.9-2-3.3-4.4-4.2-7.1-.9-2.7-1.4-5.8-1.4-9.3 0-4.3.9-8.1 2.8-11.4 1.9-3.3 4.5-6.1 7.8-8.2 3.3-2.1 7.2-3.6 11.6-4.5 4.4-.9 9.1-1.4 14.1-1.4 5.2 0 10.1.7 14.6 2.1 4.5 1.4 8.4 3.6 11.6 6.5l-6.9 9.7c-2.4-2.1-5.3-3.7-8.6-4.8-3.3-1.1-6.9-1.6-10.7-1.6-2.5 0-4.8.3-6.8.9-2 .6-3.7 1.5-5 2.7-1.3 1.2-2.3 2.6-2.9 4.3-.6 1.7-.9 3.6-.9 5.8 0 2.8.6 5.1 1.7 7 1.1 1.9 2.7 3.4 4.7 4.7 2 1.2 4.3 2.2 7 3.1 2.7.9 5.6 1.7 8.6 2.6 3.7 1.1 7.1 2.4 10.2 3.9 3.1 1.5 5.7 3.3 7.8 5.5 2.1 2.2 3.7 4.7 4.7 7.7 1 3 1.5 6.4 1.5 10.3 0 4.6-1 8.7-3 12.3-2 3.6-4.8 6.6-8.3 8.9-3.5 2.3-7.7 4-12.5 5-4.8 1-10.1 1.5-15.8 1.5-6.1 0-11.9-.9-17.2-2.6-5.3-1.8-9.8-4.5-13.6-8.2l7.7-10.1zM28.4 34.6H8.5v-10h52.8v10H41.4v68.5H28.4V34.6z" fill="#FFF" />
                  </svg>
                </div>
                <span className="bento-tech-name">TypeScript</span>
              </div>

              {/* PostgreSQL */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-postgres">
                  <svg viewBox="0 0 128 128" className="tech-svg-official" fill="#336791">
                    <path d="M64 4C30.9 4 4 30.9 4 64s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4zm28.6 77.2c-1.5 4.3-5 7.7-9.4 9.1-4.4 1.4-9.3.9-13.4-1.3l-1.3-.7-2.6 4.6c-1.4 2.5-3.8 4.2-6.6 4.7-2.8.5-5.7-.3-7.9-2.1-4.4-3.7-6.2-9.7-4.4-15.2l.9-2.8-2.9-1.1c-6.8-2.6-11.1-9.1-10.8-16.3.3-7.2 5.1-13.3 12.1-15.3l3-.9V38c0-5 3.3-9.3 8.1-10.7 4.8-1.4 10 .5 12.8 4.6l1.2 1.8 2.2-.4c8-.1 15.6 3.6 20.3 9.9 4.7 6.3 6 14.5 3.4 22l-2.4 7.2 2.7 1.8c2.9 2 4.7 5.3 4.9 8.9.2 3.6-1.3 7-3.8 9.5-2.5 2.5-5.9 3.8-9.4 3.6z" />
                  </svg>
                </div>
                <span className="bento-tech-name">PostgreSQL</span>
              </div>

              {/* MongoDB */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-mongo">
                  <svg viewBox="0 0 100 100" className="tech-svg-official">
                    <path d="M50 5C48 5 44 23 44 42c0 24 14 36 22 47 1-1 3-3 4-5 13-17 19-33 19-48 0-19-17-31-39-31zm-2 90c-3 0-5-3-5-6 0-7 5-11 5-17 0-4-1-8-2-12-1-3-2-6-3-9-7-14-16-25-16-41 0-5 1-9 2-13 1 12 10 24 19 33 2 2 3 5 4 8 2 5 3 10 3 15 0 9-4 17-7 25 0 0 0 1 0 1 0 3 0 6 0 6z" fill="#00ED64" />
                  </svg>
                </div>
                <span className="bento-tech-name">MongoDB</span>
              </div>

              {/* AWS */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-aws">
                  <svg viewBox="0 0 100 100" className="tech-svg-official">
                    <path d="M30 40c-3 0-5 2-5 5 0 2 1 4 3 4 3 0 6-2 6-5 0-3-2-4-4-4zm40 0c-3 0-5 2-5 5 0 2 1 4 3 4 3 0 6-2 6-5 0-3-2-4-4-4zM20 62c15 11 35 15 52 7 2-1 3-3 2-5-1-1-3-1-4 0-15 7-33 3-47-6-1-1-3 0-4 1 0 1 0 2 1 3z" fill="#FF9900" />
                  </svg>
                </div>
                <span className="bento-tech-name">AWS</span>
              </div>

              {/* Tailwind CSS */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-tailwind">
                  <svg viewBox="0 0 100 100" className="tech-svg-official" fill="#38BDF8">
                    <path d="M26 38c3-12 11-18 24-18 16 0 22 11 28 17 5 5 9 8 16 8 8 0 15-5 18-15-3 12-11 18-24 18-16 0-22-11-28-17-5-5-9-8-16-8-8 0-15 5-18 15zm-18 27c3-12 11-18 24-18 16 0 22 11 28 17 5 5 9 8 16 8 8 0 15-5 18-15-3 12-11 18-24 18-16 0-22-11-28-17-5-5-9-8-16-8-8 0-15 5-18 15z" />
                  </svg>
                </div>
                <span className="bento-tech-name">Tailwind CSS</span>
              </div>

              {/* Figma */}
              <div className="bento-tech-item">
                <div className="bento-tech-icon-wrap icon-figma">
                  <svg viewBox="0 0 100 150" className="tech-svg-official">
                    <path d="M0 25a25 25 0 0 1 25-25h25v50H25A25 25 0 0 1 0 25z" fill="#F24E1E" />
                    <path d="M50 0h25a25 25 0 1 1 0 50H50V0z" fill="#FF7262" />
                    <path d="M0 75a25 25 0 0 1 25-25h25v50H25A25 25 0 0 1 0 75z" fill="#A259FF" />
                    <path d="M50 50h25a25 25 0 1 1 0 50H50V50z" fill="#1ABCFE" />
                    <path d="M0 125a25 25 0 0 1 25-25h25v25a25 25 0 1 1-50 0z" fill="#0ACF83" />
                  </svg>
                </div>
                <span className="bento-tech-name">Figma</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 4: ABOUT ME (06) + LATEST WORK (07) + CURRENTLY EXPLORING (08)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bento-row bento-row-bottom" id="about">
          {/* 06 About Me Card */}
          <div className="bento-card bento-card-about">
            {/* Background Vector Reticle: Geolocation & Coordinate Lattice */}
            <div className="bento-about-vector-reticle" aria-hidden="true">
              <svg viewBox="0 0 140 140" fill="none" className="bento-about-reticle-svg">
                <circle cx="70" cy="70" r="62" stroke="rgba(74, 222, 128, 0.22)" strokeDasharray="3 3" />
                <circle cx="70" cy="70" r="44" stroke="rgba(255, 255, 255, 0.08)" />
                <circle cx="70" cy="70" r="24" stroke="rgba(74, 222, 128, 0.28)" />
                <circle cx="70" cy="70" r="3" fill="#4ade80" />
                <line x1="70" y1="4" x2="70" y2="136" stroke="rgba(74, 222, 128, 0.18)" />
                <line x1="4" y1="70" x2="136" y2="70" stroke="rgba(74, 222, 128, 0.18)" />
                {/* Degree ticks */}
                <line x1="70" y1="8" x2="70" y2="14" stroke="#4ade80" strokeWidth="1.5" />
                <line x1="70" y1="126" x2="70" y2="132" stroke="#4ade80" strokeWidth="1.5" />
                <line x1="8" y1="70" x2="14" y2="70" stroke="#4ade80" strokeWidth="1.5" />
                <line x1="126" y1="70" x2="132" y2="70" stroke="#4ade80" strokeWidth="1.5" />
                <text x="76" y="20" fill="rgba(74, 222, 128, 0.7)" fontSize="7" fontFamily="var(--bento-font-mono)">12.9716°N</text>
                <text x="76" y="128" fill="rgba(74, 222, 128, 0.7)" fontSize="7" fontFamily="var(--bento-font-mono)">77.5946°E</text>
              </svg>
            </div>

            <div className="bento-card-header">
              <span className="bento-card-tag">06 ABOUT ME</span>
              <button
                type="button"
                onClick={() => handleOpenSection("about")}
                className="bento-icon-btn"
                aria-label="Maximize About Section"
                title="Maximize About Section"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>

            <p className="bento-about-bio">
              I&apos;m <strong>Rishabh Naik</strong>, a designer and full-stack developer based in Bangalore. I enjoy working across the entire product — understanding the problem, designing the experience, building the product, and deploying it.
            </p>

            <div className="bento-about-contacts">
              <div className="bento-contact-row">
                <MapPin size={15} className="bento-contact-ico" />
                <span>Bangalore, India</span>
              </div>
              <div className="bento-contact-row">
                <Mail size={15} className="bento-contact-ico" />
                <a href="mailto:rishabhnaik37@gmail.com">rishabhnaik37@gmail.com</a>
              </div>
              <div className="bento-contact-row">
                <Linkedin size={15} className="bento-contact-ico" />
                <a href="https://www.linkedin.com/in/rishabhnaik/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/rishabhnaik
                </a>
              </div>
              <div className="bento-contact-row">
                <Github size={15} className="bento-contact-ico" />
                <a href="https://github.com/RishabhNaik" target="_blank" rel="noopener noreferrer">
                  github.com/RishabhNaik
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenSection("about")}
              className="bento-about-btn"
            >
              <span>More about me</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 07 Latest Work Card */}
          <div className="bento-card bento-card-latest">
            <div className="bento-card-header">
              <span className="bento-card-tag">07 LATEST WORK</span>
              <Link href="/projects" className="bento-header-link">
                <span>View all</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bento-latest-list">
              {/* Item 1 */}
              <div
                className="bento-latest-row"
                role="button"
                tabIndex={0}
                onClick={() => handleOpenProject("harvest-flow-growteq")}
                style={{ cursor: "pointer" }}
              >
                <div className="bento-latest-thumb">
                  <img src="/assets/bento/harvest-flow.jpg" alt="Harvest Flow" />
                </div>
                <div className="bento-latest-info">
                  <h4 className="bento-latest-name">Harvest Flow</h4>
                  <span className="bento-latest-sub">AgTech Logistics · 2024</span>
                </div>
                <ArrowUpRight size={16} className="bento-latest-arrow" />
              </div>

              {/* Item 2 */}
              <div
                className="bento-latest-row"
                role="button"
                tabIndex={0}
                onClick={() => handleOpenProject("impetus-sports-platform")}
                style={{ cursor: "pointer" }}
              >
                <div className="bento-latest-thumb">
                  <img src="/assets/bento/impetus-dark.jpg" alt="Impetus Platform" />
                </div>
                <div className="bento-latest-info">
                  <h4 className="bento-latest-name">Impetus Platform</h4>
                  <span className="bento-latest-sub">Web App &amp; Tournament APIs · 2024</span>
                </div>
                <ArrowUpRight size={16} className="bento-latest-arrow" />
              </div>

              {/* Item 3 */}
              <div
                className="bento-latest-row"
                role="button"
                tabIndex={0}
                onClick={() => handleOpenProject("ai-agent-mcp-workflows")}
                style={{ cursor: "pointer" }}
              >
                <div className="bento-latest-thumb">
                  <img src="/assets/bento/haptics-mobile.jpg" alt="AI Agent MCP Workflows" />
                </div>
                <div className="bento-latest-info">
                  <h4 className="bento-latest-name">Autonomous AI &amp; MCP</h4>
                  <span className="bento-latest-sub">Tool Execution Runtime · 2024</span>
                </div>
                <ArrowUpRight size={16} className="bento-latest-arrow" />
              </div>

              {/* Item 4 */}
              <div
                className="bento-latest-row"
                role="button"
                tabIndex={0}
                onClick={() => handleOpenProject("konkani-dialect-map")}
                style={{ cursor: "pointer" }}
              >
                <div className="bento-latest-thumb">
                  <img src="/assets/bento/impetus-dark.jpg" alt="Konkani Dialect Geospatial" />
                </div>
                <div className="bento-latest-info">
                  <h4 className="bento-latest-name">Konkani Geospatial Map</h4>
                  <span className="bento-latest-sub">Geospatial Audio Archive · 2023</span>
                </div>
                <ArrowUpRight size={16} className="bento-latest-arrow" />
              </div>
            </div>
          </div>

          {/* 08 Currently Exploring & Available Capsule Stack */}
          <div className="bento-stack-exploring">
            {/* 08 Exploring Card */}
            <div className="bento-card bento-card-exploring">
              <div className="bento-card-header">
                <div className="bento-tag-with-dot">
                  <span className="bento-card-tag">08 CURRENTLY EXPLORING</span>
                  <span className="bento-green-dot" />
                </div>
                {/* Animated Vector Radar Scanner */}
                <div className="bento-radar-wrap" title="Scanning exploration frontier" aria-hidden="true">
                  <svg viewBox="0 0 28 28" fill="none" className="bento-radar-svg">
                    <circle cx="14" cy="14" r="12" stroke="rgba(74, 222, 128, 0.28)" strokeWidth="0.8" />
                    <circle cx="14" cy="14" r="7" stroke="rgba(74, 222, 128, 0.18)" strokeWidth="0.8" />
                    <circle cx="14" cy="14" r="2" fill="#4ade80" />
                    <line x1="14" y1="2" x2="14" y2="26" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="1 2" />
                    <line x1="2" y1="14" x2="26" y2="14" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="1 2" />
                    {/* Rotating Sweep Beam */}
                    <line x1="14" y1="14" x2="25" y2="8" stroke="url(#radar-sweep-grad)" strokeWidth="1.5" className="radar-sweep-line" />
                    {/* Active exploration beacon blips */}
                    <circle cx="19" cy="9" r="1.5" fill="#4ade80" className="radar-blip" />
                    <circle cx="8" cy="18" r="1.2" fill="#22c55e" className="radar-blip-2" />
                    <circle cx="18" cy="19" r="1.3" fill="#86efac" className="radar-blip-3" />
                    <defs>
                      <linearGradient id="radar-sweep-grad" x1="14" y1="14" x2="25" y2="8" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0" />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="bento-exploring-list">
                <div className="bento-exploring-item">
                  <PenTool size={15} className="bento-exploring-ico" />
                  <span>Building tools for creators</span>
                </div>
                <div className="bento-exploring-item">
                  <Laptop size={15} className="bento-exploring-ico" />
                  <span>Learning more about product design</span>
                </div>
                <div className="bento-exploring-item">
                  <Film size={15} className="bento-exploring-ico" />
                  <span>Exploring filmmaking &amp; content creation</span>
                </div>
                <div className="bento-exploring-item">
                  <Music size={15} className="bento-exploring-ico" />
                  <span>Improving my guitar skills</span>
                </div>
                <div className="bento-exploring-item">
                  <Clock size={15} className="bento-exploring-ico" />
                  <span>Open to exciting opportunities</span>
                </div>
              </div>
            </div>

            {/* Currently Available Capsule Card */}
            <div className="bento-card bento-card-available">
              <div className="bento-available-left">
                <div className="bento-available-status">
                  <div className="checkbox-container is-enabled" title="Status: Available for hire" aria-hidden="true">
                    <input type="checkbox" defaultChecked readOnly tabIndex={-1} />
                  </div>
                  <span>Available for projects</span>
                </div>
                <h3 className="bento-available-title">
                  Let&apos;s build something<br />meaningful.
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleOpenSection("contact")}
                className="bento-available-btn-circle"
                aria-label="Let's build something"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>
          </div>
        )}
      </div>
    </div>
  );
}
