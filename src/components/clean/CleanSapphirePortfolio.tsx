"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { PROJECTS_DATA } from "@/data/projects";
import { contactData, galleryItems } from "@/data/siteData";

export const CleanSapphirePortfolio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const featuredProject = PROJECTS_DATA[0];

  const handleCopy = (text: string, field: string) => {
    cinematicAudioHaptics.playTactileClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleTogglePlay = () => {
    cinematicAudioHaptics.playSlateTick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cinematicAudioHaptics.playSlateTick();
    setFormStatus("submitting");
    try {
      await fetch(contactData.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("success");
    }
  };

  return (
    <div className="clean-sapphire-page">
      {/* =========================================================
          EDGE-TO-EDGE STICKY HEADER (Obligo Style Navbar)
          ========================================================= */}
      <header className="clean-header">
        <div className="clean-header-inner">
          {/* Left Navigation */}
          <div className="clean-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="#disciplines" className="clean-nav-link" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span>Disciplines</span>
              <ChevronDown size={14} color="#64748b" />
            </Link>
            <Link href="#projects" className="clean-nav-link" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span>Projects</span>
              <ChevronDown size={14} color="#64748b" />
            </Link>
          </div>

          {/* Center Brand Logo */}
          <Link href="/" className="clean-logo">
            rishabh<span className="clean-logo-dot">.</span>
          </Link>

          {/* Right Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="clean-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="#gallery" className="clean-nav-link">
                Gallery
              </Link>
              <Link href="#about" className="clean-nav-link">
                About
              </Link>
            </div>
            <a
              href="/assets/Rishabh_Naik_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="clean-btn-dark"
              style={{ padding: "8px 18px", fontSize: "13px" }}
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO SECTION (Headline + Subtext + CTA + Clean Illustration)
          ========================================================= */}
      <section className="clean-section" style={{ paddingTop: "70px", paddingBottom: "50px", textAlign: "center" }}>
        <div className="clean-container">
          <h1 className="clean-headline-serif" style={{ fontSize: "clamp(36px, 5.5vw, 60px)", maxWidth: "860px", margin: "0 auto 22px" }}>
            Powering the Visual & Art Experience of the Future
          </h1>

          <p className="clean-subtext" style={{ marginBottom: "32px" }}>
            Rishabh Naik&apos;s creative mission is to bridge technical precision and evocative storytelling through digital illustration, concept art, and high-retention video pacing.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
            <a
              href="#projects"
              className="clean-btn-dark"
              style={{ padding: "13px 30px", fontSize: "15px" }}
              onClick={() => cinematicAudioHaptics.playSlateTick()}
            >
              <span>Explore Works</span>
              <ArrowRight size={16} />
            </a>
            <button
              type="button"
              className="clean-btn-sapphire"
              style={{ padding: "13px 26px", fontSize: "15px" }}
              onClick={() => {
                cinematicAudioHaptics.playSlateTick();
                openContactModal();
              }}
            >
              <span>Contact Me</span>
            </button>
          </div>

          {/* Clean Line-Art & Showcase Stage Hero with Sapphire Accents */}
          <div className="clean-hero-illustration">
            {/* SVG Minimal Cityscape & Hot Air Balloon Vector */}
            <div style={{ padding: "40px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <svg viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", maxHeight: "200px" }}>
                {/* Hot Air Balloon */}
                <g transform="translate(60, 20)">
                  <ellipse cx="40" cy="45" rx="32" ry="40" fill="#E1ECFB" stroke="#1979D1" strokeWidth="2.5" />
                  <path d="M22,70 L28,95 L52,95 L58,70 Z" fill="#ffffff" stroke="#1979D1" strokeWidth="2" />
                  <rect x="32" y="96" width="16" height="14" rx="3" fill="#DFF0FA" stroke="#1979D1" strokeWidth="2" />
                  <path d="M24,35 Q40,15 56,35" stroke="#1979D1" strokeWidth="1.5" fill="none" />
                  <path d="M24,55 Q40,75 56,55" stroke="#1979D1" strokeWidth="1.5" fill="none" />
                </g>

                {/* Minimal Clouds */}
                <path d="M360,35 Q375,20 395,28 Q415,20 430,35 Q445,45 425,55 L370,55 Q350,45 360,35 Z" fill="#F0F7FE" stroke="#8AA4B2" strokeWidth="1.5" />
                <path d="M680,45 Q695,30 715,38 Q735,30 750,45 Q765,55 745,65 L690,65 Q670,55 680,45 Z" fill="#F0F7FE" stroke="#8AA4B2" strokeWidth="1.5" />

                {/* Minimal Architectural Cityscape */}
                <rect x="320" y="100" width="80" height="110" rx="4" fill="#ffffff" stroke="#334155" strokeWidth="2" />
                <path d="M320,100 L360,65 L400,100 Z" fill="#E1ECFB" stroke="#334155" strokeWidth="2" />
                <line x1="335" y1="120" x2="335" y2="190" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="350" y1="120" x2="350" y2="190" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="365" y1="120" x2="365" y2="190" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="380" y1="120" x2="380" y2="190" stroke="#CBD5E1" strokeWidth="2" />

                <rect x="420" y="80" width="70" height="130" rx="3" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
                <rect x="495" y="110" width="90" height="100" rx="3" fill="#EAF3FC" stroke="#334155" strokeWidth="2" />
                <circle cx="540" cy="140" r="14" fill="#ffffff" stroke="#1979D1" strokeWidth="2" />

                <rect x="590" y="60" width="60" height="150" rx="3" fill="#ffffff" stroke="#334155" strokeWidth="2" />
                <line x1="620" y1="60" x2="620" y2="20" stroke="#334155" strokeWidth="2" />

                {/* Minimal Trees */}
                <circle cx="280" cy="180" r="18" fill="#DFF0FA" stroke="#1979D1" strokeWidth="2" />
                <line x1="280" y1="198" x2="280" y2="215" stroke="#334155" strokeWidth="2" />

                {/* Ground Waterline & Boat */}
                <line x1="40" y1="215" x2="760" y2="215" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="120" y1="225" x2="260" y2="225" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="340" y1="225" x2="520" y2="225" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="580" y1="225" x2="720" y2="225" stroke="#CBD5E1" strokeWidth="1.5" />

                {/* Little Boat */}
                <g transform="translate(180, 185)">
                  <path d="M10,25 L45,25 L38,35 L17,35 Z" fill="#ffffff" stroke="#334155" strokeWidth="2" />
                  <rect x="20" y="15" width="15" height="10" rx="2" fill="#E1ECFB" stroke="#1979D1" strokeWidth="1.5" />
                </g>
              </svg>

              {/* Embedded Video Showcase Player */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "740px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 20px 45px rgba(15, 23, 42, 0.14)",
                  border: "1px solid #e2e8f0",
                  position: "relative",
                  marginTop: "16px",
                  background: "#020712",
                }}
              >
                <video
                  ref={videoRef}
                  src={featuredProject.previewUrl}
                  poster={featuredProject.imageUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  style={{ width: "100%", height: "320px", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 50%, rgba(2, 7, 18, 0.82) 100%)",
                  }}
                />

                {/* Video Bottom Overlay */}
                <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Featured Reel
                    </span>
                    <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                      {featuredProject.title}
                    </h4>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      style={{
                        padding: "7px 16px",
                        borderRadius: "9999px",
                        background: "#ffffff",
                        color: "#0f172a",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                    >
                      {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      <span>{isPlaying ? "Pause" : "Play"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      style={{
                        padding: "7px 12px",
                        borderRadius: "9999px",
                        background: "rgba(255,255,255,0.2)",
                        color: "#ffffff",
                        border: "none",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: STATEMENT & DUAL CAPABILITY CARDS
          ========================================================= */}
      <section className="clean-section clean-section-alt" id="disciplines">
        <div className="clean-container">
          {/* Headline */}
          <h2 className="clean-headline-serif" style={{ fontSize: "clamp(30px, 4.5vw, 46px)", maxWidth: "800px", margin: "0 auto 18px" }}>
            The Impact of High-Retention Visuals Is Bigger Than Just Aesthetics
          </h2>

          <p className="clean-subtext">
            Crafting tailored color grading, mechanical concept brushwork in Krita, and rhythmic video cutting to build memorable visual identities that captivate viewers.
          </p>

          {/* DUAL SPLIT CARDS (Like Obligo For Renters / For Owners) */}
          <div className="clean-split-grid">
            {/* CARD 1: For Creators & Visual Art (Ice Sapphire) */}
            <div className="clean-card-ice">
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
                      Digital Illustration
                    </h3>
                    <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
                      Concept art, paintings & mechanical designs
                    </p>
                  </div>

                  <Link href="#gallery" className="clean-btn-dark" style={{ padding: "8px 18px", fontSize: "13px" }}>
                    View Gallery
                  </Link>
                </div>

                <div className="clean-bullet-list">
                  <div className="clean-bullet-item">
                    <ArrowRight size={15} color="#1979D1" />
                    <span>Concept art & mechanical object illustrations</span>
                  </div>
                  <div className="clean-bullet-item">
                    <ArrowRight size={15} color="#1979D1" />
                    <span>Custom Krita brushwork & multi-layer lighting</span>
                  </div>
                  <div className="clean-bullet-item">
                    <ArrowRight size={15} color="#1979D1" />
                    <span>Character anatomy & digital portraits</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: For Video & Storytellers (Cerulean Ice) */}
            <div className="clean-card-cerulean">
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
                      Video Editing & Pacing
                    </h3>
                    <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
                      High-retention reels & cinematic short films
                    </p>
                  </div>

                  <Link href="#projects" className="clean-btn-dark" style={{ padding: "8px 18px", fontSize: "13px" }}>
                    View Projects
                  </Link>
                </div>

                <div className="clean-bullet-list">
                  <div className="clean-bullet-item">
                    <ArrowRight size={15} color="#0891b2" />
                    <span>High-retention cutting & rhythm pacing</span>
                  </div>
                  <div className="clean-bullet-item">
                    <ArrowRight size={15} color="#0891b2" />
                    <span>Immersive sound design, foley & audio scoring</span>
                  </div>
                  <div className="clean-bullet-item">
                    <ArrowRight size={15} color="#0891b2" />
                    <span>Color grading & cinematic visual polish</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: SELECTED PROJECTS (Clean Editorial Grid)
          ========================================================= */}
      <section className="clean-section" id="projects">
        <div className="clean-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="clean-headline-serif" style={{ fontSize: "38px", marginBottom: "12px" }}>
              Selected Projects
            </h2>
            <p className="clean-subtext">
              A curated catalog of short films, visual concepts, and direct video productions.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {PROJECTS_DATA.slice(0, 4).map((proj) => (
              <Link
                key={proj.id}
                href={`/projects/${proj.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.05)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 14px 30px rgba(25, 121, 209, 0.15)";
                  e.currentTarget.style.borderColor = "#93c5fd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.05)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "190px", background: "#f1f5f9" }}>
                  <Image src={proj.imageUrl} alt={proj.title} fill sizes="300px" style={{ objectFit: "cover" }} />
                </div>

                <div style={{ padding: "22px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#1979D1", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {proj.category}
                    </span>
                    <h4 style={{ fontSize: "19px", fontWeight: 700, color: "#0f172a", marginTop: "4px" }}>
                      {proj.title}
                    </h4>
                    <p style={{ fontSize: "13px", color: "#64748b", marginTop: "6px", lineHeight: 1.5 }}>
                      {proj.description?.slice(0, 80)}...
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "18px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{proj.date}</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#1979D1", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>View</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: GALLERY (Clean Sushiksha & Artwork Showcase)
          ========================================================= */}
      <section className="clean-section clean-section-alt" id="gallery">
        <div className="clean-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="clean-headline-serif" style={{ fontSize: "38px", marginBottom: "12px" }}>
              Visual Artwork Archive
            </h2>
            <p className="clean-subtext">
              Digital illustrations, character anatomy, and Sushiksha cohort portraits.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "18px" }}>
            {galleryItems.slice(0, 8).map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryIdx(idx)}
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  background: "#ffffff",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://drive.google.com/uc?export=view&id=${item.images}`}
                  alt={item.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/gallery" className="clean-btn-sapphire">
              <span>Explore Complete Gallery ({galleryItems.length}+ Artworks)</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: CONTACT & INQUIRIES
          ========================================================= */}
      <section className="clean-section" id="about">
        <div className="clean-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="clean-headline-serif" style={{ fontSize: "38px", marginBottom: "12px" }}>
              Get in Touch
            </h2>
            <p className="clean-subtext">
              Available for digital art commissions, video editing projects, and creative collaborations.
            </p>
          </div>

          <div className="clean-contact-grid">
            {/* Direct Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "24px", borderRadius: "18px", background: "#F0F7FE", border: "1px solid rgba(191, 219, 254, 0.8)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#1979D1", textTransform: "uppercase" }}>Phone</span>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: "2px 0 0" }}>+91 {contactData.office.mobile}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(contactData.office.mobile, "phone")}
                  style={{ padding: "8px", borderRadius: "8px", background: "#ffffff", border: "1px solid #e2e8f0", color: "#1979D1", cursor: "pointer" }}
                >
                  {copiedField === "phone" ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
                </button>
              </div>

              <div style={{ padding: "24px", borderRadius: "18px", background: "#F0F7FE", border: "1px solid rgba(191, 219, 254, 0.8)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#1979D1", textTransform: "uppercase" }}>Email</span>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "2px 0 0", wordBreak: "break-all" }}>{contactData.office.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(contactData.office.email, "email")}
                  style={{ padding: "8px", borderRadius: "8px", background: "#ffffff", border: "1px solid #e2e8f0", color: "#1979D1", cursor: "pointer", flexShrink: 0 }}
                >
                  {copiedField === "email" ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
                </button>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <a href="https://www.linkedin.com/in/rishabhnaik/" target="_blank" rel="noopener noreferrer" className="clean-btn-dark" style={{ flex: 1, padding: "12px", fontSize: "13px" }}>
                  LinkedIn
                </a>
                <a href="https://github.com/RishabhNaik" target="_blank" rel="noopener noreferrer" className="clean-btn-dark" style={{ flex: 1, padding: "12px", fontSize: "13px" }}>
                  GitHub
                </a>
                <a href="https://www.instagram.com/rishabh._.naik/" target="_blank" rel="noopener noreferrer" className="clean-btn-dark" style={{ flex: 1, padding: "12px", fontSize: "13px" }}>
                  Instagram
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div style={{ padding: "32px", borderRadius: "24px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)" }}>
              {formStatus === "success" ? (
                <div style={{ textAlign: "center", padding: "28px", color: "#16a34a" }}>
                  <CheckCircle2 size={44} color="#16a34a" style={{ margin: "0 auto 12px" }} />
                  <h4 style={{ fontSize: "20px", fontWeight: 700 }}>Message Received!</h4>
                  <p style={{ fontSize: "14px", color: "#64748b" }}>Thank you. I will reply soon.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }}
                  />
                  <textarea
                    rows={4}
                    required
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", resize: "none" }}
                  />
                  <button type="submit" className="clean-btn-sapphire" style={{ width: "100%", padding: "12px" }}>
                    <span>Send Inquiry</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FULL-WIDTH CLEAN FOOTER
          ========================================================= */}
      <footer style={{ padding: "40px 24px", borderTop: "1px solid #edf2f7", background: "#f8fafd" }}>
        <div className="clean-container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", fontSize: "14px", color: "#64748b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "16px" }}>rishabh.</span>
            <span>•</span>
            <span>© 2026 Rishabh Naik. All rights reserved.</span>
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms-conditions" style={{ color: "inherit", textDecoration: "none" }}>Terms & Conditions</Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ background: "none", border: "none", color: "#1979D1", fontWeight: 600, cursor: "pointer" }}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Lightbox for Gallery Artwork */}
      {selectedGalleryIdx !== null && (
        <div
          className="clean-lightbox-backdrop"
          onClick={() => setSelectedGalleryIdx(null)}
        >
          <div
            className="clean-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="clean-lightbox-view">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://drive.google.com/uc?export=view&id=${galleryItems[selectedGalleryIdx].images}`}
                alt={galleryItems[selectedGalleryIdx].alt}
              />
              <button
                type="button"
                onClick={() => setSelectedGalleryIdx(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(15, 23, 42, 0.75)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="clean-lightbox-bar">
              <div>
                <span style={{ fontSize: "12px", color: "#1979D1", fontWeight: 700, textTransform: "uppercase" }}>
                  Artwork {selectedGalleryIdx + 1} of {Math.min(8, galleryItems.length)}
                </span>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "2px 0 0" }}>
                  {galleryItems[selectedGalleryIdx].alt}
                </h4>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedGalleryIdx((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : Math.min(7, galleryItems.length - 1)
                    )
                  }
                  style={{
                    padding: "8px 14px",
                    borderRadius: "9999px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedGalleryIdx((prev) =>
                      prev !== null && prev < Math.min(7, galleryItems.length - 1) ? prev + 1 : 0
                    )
                  }
                  style={{
                    padding: "8px 14px",
                    borderRadius: "9999px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
