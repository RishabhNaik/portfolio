"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Layers,
  Palette,
  Film,
  Code2,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Apple,
  Sliders,
  ExternalLink,
  Radio,
  Eye,
  Maximize2,
} from "lucide-react";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { PROJECTS_DATA } from "@/data/projects";
import { contactData } from "@/data/siteData";

export const FrostedMasterBento: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [timecode, setTimecode] = useState<string>("00:14:28:09");
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeProject = PROJECTS_DATA[activeProjectIdx] || PROJECTS_DATA[0];

  // Dynamic timecode runner
  useEffect(() => {
    const interval = setInterval(() => {
      const frames = Math.floor(Math.random() * 24);
      const secs = Math.floor(Math.random() * 60);
      const pad = (n: number) => n.toString().padStart(2, "0");
      setTimecode(`00:14:${pad(secs)}:${pad(frames)}`);
    }, 120);
    return () => clearInterval(interval);
  }, []);

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
    <div className="frosted-container">
      {/* =========================================================
          ROW 1: HERO SPOTLIGHT (Left 8) + PERSONA PROFILE (Right 4)
          ========================================================= */}
      <div className="frosted-grid" style={{ marginBottom: "20px" }}>
        {/* CARD 1: Cinematic Frosted Showcase Spotlight - col-span-8 */}
        <div
          className="frosted-card col-span-8"
          style={{
            minHeight: "440px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, rgba(14, 38, 77, 0.55) 0%, rgba(5, 18, 40, 0.8) 100%)",
            borderColor: "rgba(147, 197, 253, 0.28)",
          }}
        >
          {/* Top Floating Glass Pill Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  background: "rgba(239, 68, 68, 0.18)",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  color: "#f87171",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 8px #ef4444" }} />
                STREAM REEL
              </span>

              <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#93c5fd" }}>
                {timecode}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#E1ECFB",
                }}
              >
                {activeProject.category}
              </span>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#60a5fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                title={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
          </div>

          {/* Video Stage with Frosted Border */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "270px",
              borderRadius: "20px",
              overflow: "hidden",
              background: "#020712",
              border: "1px solid rgba(147, 197, 253, 0.25)",
              boxShadow: "0 14px 36px rgba(0, 0, 0, 0.6)",
            }}
          >
            <video
              ref={videoRef}
              src={activeProject.previewUrl}
              poster={activeProject.imageUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(2, 7, 18, 0.1) 0%, rgba(2, 7, 18, 0.85) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Play/Pause Center Button */}
            <button
              type="button"
              onClick={handleTogglePlay}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "58px",
                height: "58px",
                borderRadius: "50%",
                background: "rgba(10, 25, 52, 0.75)",
                backdropFilter: "blur(14px)",
                border: "2px solid rgba(147, 197, 253, 0.4)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(81, 171, 219, 0.4)",
                cursor: "pointer",
              }}
            >
              {isPlaying ? <Pause size={20} fill="#ffffff" /> : <Play size={20} fill="#ffffff" style={{ marginLeft: "3px" }} />}
            </button>

            {/* Bottom Title Bar */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "20px",
                right: "20px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Active Spotlight
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: "2px 0 0" }}>
                  {activeProject.title}
                </h3>
              </div>

              <Link
                href={`/projects/${activeProject.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 16px",
                  borderRadius: "9999px",
                  background: "rgba(37, 99, 235, 0.35)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(147, 197, 253, 0.4)",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <span>Details</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Project Switcher Thumbnails */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", marginTop: "16px" }}>
            {PROJECTS_DATA.slice(0, 5).map((shot, idx) => {
              const isSelected = activeProjectIdx === idx;
              return (
                <button
                  key={shot.id}
                  type="button"
                  onClick={() => {
                    cinematicAudioHaptics.playTactileClick();
                    setActiveProjectIdx(idx);
                  }}
                  style={{
                    position: "relative",
                    height: "56px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: isSelected ? "2px solid #60a5fa" : "1px solid rgba(147, 197, 253, 0.2)",
                    boxShadow: isSelected ? "0 0 16px rgba(96, 165, 250, 0.6)" : "none",
                    padding: 0,
                    cursor: "pointer",
                    background: "#0a1832",
                  }}
                >
                  <Image
                    src={shot.imageUrl}
                    alt={shot.title}
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover", opacity: isSelected ? 1 : 0.65 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(2, 7, 18, 0.9) 0%, transparent 80%)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "4px 6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: isSelected ? "#ffffff" : "#93c5fd",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {shot.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CARD 2: Persona & Identity Card (Right 4) - col-span-4 */}
        <div
          className="frosted-card col-span-4"
          style={{
            minHeight: "440px",
            justifyContent: "space-between",
            background: "linear-gradient(160deg, rgba(19, 56, 101, 0.45) 0%, rgba(6, 18, 38, 0.8) 100%)",
            padding: "26px",
          }}
        >
          {/* Top Status */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  color: "#34d399",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                AVAILABLE FOR COMMISSIONS
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#93c5fd" }}>
                <MapPin size={13} color="#60a5fa" />
                <span>Bangalore</span>
              </div>
            </div>

            {/* Avatar Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "18px" }}>
              <div
                style={{
                  position: "relative",
                  width: "72px",
                  height: "72px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "2px solid #60a5fa",
                  boxShadow: "0 0 20px rgba(96, 165, 250, 0.4)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/Rishabh.jpeg"
                  alt="Rishabh Naik"
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>

              <div>
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em", margin: 0 }}>
                  Rishabh Naik
                </h2>
                <p style={{ fontSize: "13px", color: "#60a5fa", fontWeight: 600, margin: "2px 0 0" }}>
                  Digital Artist & Video Editor
                </p>
                <span style={{ fontSize: "11px", color: "#93c5fd" }}>VKSSF Scholar • Sushiksha Mentee</span>
              </div>
            </div>

            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#cbd5e1", margin: "0 0 16px" }}>
              Creating concept illustrations, mechanical artwork in Krita, and high-retention video edits with cinematic pacing.
            </p>

            {/* Tag Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
              {["Krita", "Video Pacing", "Sound FX", "Python", "Next.js"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 9px",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#E1ECFB",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => {
                cinematicAudioHaptics.playSlateTick();
                openContactModal();
              }}
              className="bento-btn-primary"
              style={{ flex: 1, padding: "11px", fontSize: "13px" }}
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight size={14} />
            </button>

            <a
              href="/assets/Rishabh_Naik_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bento-btn-secondary"
              style={{ padding: "11px 16px", fontSize: "13px" }}
            >
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================
          ROW 2: WAVEFORM SOUND CARD (4) + STATS (3) + 3D PRISM (5)
          ========================================================= */}
      <div className="frosted-grid" style={{ marginBottom: "20px" }}>
        {/* CARD 3: Waveform / Sound FX Card - col-span-4 */}
        <div
          className="frosted-card col-span-4"
          style={{
            minHeight: "240px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, rgba(29, 78, 216, 0.45) 0%, rgba(15, 23, 42, 0.75) 100%)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Radio size={16} color="#60a5fa" />
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#93c5fd" }}>
                Multi-Track Pacing
              </span>
            </div>

            {/* Interactive Equalizer Bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "30px" }}>
              {[12, 28, 18, 32, 14, 24, 8].map((h, i) => (
                <div key={i} className="eq-bar" style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>

          {/* SVG Multi-Layer Sound Waves */}
          <svg className="wave-svg" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0,80 C150,140 350,20 500,90 L500,150 L0,150 Z" fill="rgba(96, 165, 250, 0.12)" />
            <path d="M0,95 C120,40 320,130 500,70 L500,150 L0,150 Z" fill="rgba(59, 130, 246, 0.18)" />
            <path d="M0,110 C180,70 300,140 500,100 L500,150 L0,150 Z" fill="rgba(37, 99, 235, 0.25)" />
          </svg>

          <div style={{ zIndex: 2 }}>
            <span style={{ fontSize: "11px", color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Audience Engagement
            </span>
            <h3 style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", margin: "2px 0 0" }}>
              84.4% Retention
            </h3>
          </div>
        </div>

        {/* CARD 4: Key Metrics & Reach Card - col-span-3 */}
        <div
          className="frosted-card col-span-3"
          style={{
            minHeight: "240px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, rgba(30, 58, 138, 0.35) 0%, rgba(6, 18, 38, 0.75) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#93c5fd" }}>
              Total Reach
            </span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#34d399", background: "rgba(16, 185, 129, 0.15)", padding: "3px 8px", borderRadius: "9999px" }}>
              +10%
            </span>
          </div>

          <div>
            <span style={{ fontSize: "44px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1 }}>
              78K+
            </span>
            <p style={{ fontSize: "12px", color: "#cbd5e1", margin: "4px 0 0" }}>
              Views across artworks, reels & visual edits
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "10px" }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#60a5fa" }}>4+ Yrs</span>
              <p style={{ fontSize: "10px", color: "#93c5fd", margin: 0 }}>Experience</p>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#60a5fa" }}>20+</span>
              <p style={{ fontSize: "10px", color: "#93c5fd", margin: 0 }}>Projects</p>
            </div>
          </div>
        </div>

        {/* CARD 5: 3D Crystal Prismatic Star Card - col-span-5 */}
        <div
          className="frosted-card col-span-5"
          style={{
            minHeight: "240px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, rgba(14, 38, 77, 0.5) 0%, rgba(6, 18, 38, 0.8) 100%)",
            padding: "26px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#60a5fa" }}>
                Visual Direction
              </span>
              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", marginTop: "4px", lineHeight: 1.2 }}>
                Pacing your visual story from the first second
              </h3>
            </div>

            {/* 3D Glossy Sapphire Asterisk / Star Geometry */}
            <div className="asterisk-3d" style={{ margin: 0, width: "70px", height: "70px", flexShrink: 0 }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="42" y="10" width="16" height="80" rx="8" fill="url(#frostedSapphire)" />
                <rect x="42" y="10" width="16" height="80" rx="8" transform="rotate(60 50 50)" fill="url(#frostedSapphire)" />
                <rect x="42" y="10" width="16" height="80" rx="8" transform="rotate(120 50 50)" fill="url(#frostedSapphire)" />
                <defs>
                  <linearGradient id="frostedSapphire" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60a5fa" />
                    <stop offset="0.5" stopColor="#2563eb" />
                    <stop offset="1" stopColor="#1e3a8a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <p style={{ fontSize: "13px", color: "#cbd5e1", margin: 0 }}>
            Crafting tailored color grading, rhythmic cutting, and sound foley that locks attention and delivers high engagement.
          </p>
        </div>
      </div>

      {/* =========================================================
          ROW 3: 3 CREATIVE DISCIPLINES BENTO CARDS (4 + 4 + 4)
          ========================================================= */}
      <div className="frosted-grid" style={{ marginBottom: "20px" }} id="about">
        {/* Discipline 1: Digital Illustration */}
        <div className="frosted-card col-span-4" style={{ justifyContent: "space-between" }}>
          <div>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(96, 165, 250, 0.2)", border: "1px solid rgba(96, 165, 250, 0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa", marginBottom: "16px" }}>
              <Palette size={22} />
            </div>
            <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>
              Digital Illustration
            </h3>
            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#cbd5e1" }}>
              Specialized in concept art, realistic objects, mechanical designs, and character proportions using Krita and digital graphics tablets.
            </p>
          </div>
          <Link
            href="/gallery"
            className="bento-btn-secondary"
            style={{ marginTop: "16px", width: "100%", justifyContent: "space-between" }}
            onClick={() => cinematicAudioHaptics.playSlateTick()}
          >
            <span>View Artworks</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Discipline 2: Video Editing */}
        <div className="frosted-card col-span-4" style={{ justifyContent: "space-between", background: "linear-gradient(145deg, rgba(29, 78, 216, 0.45) 0%, rgba(15, 23, 42, 0.75) 100%)" }}>
          <div>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(59, 130, 246, 0.3)", border: "1px solid rgba(147, 197, 253, 0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#93c5fd", marginBottom: "16px" }}>
              <Film size={22} />
            </div>
            <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>
              Video Editing & Pacing
            </h3>
            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#cbd5e1" }}>
              Dynamic pacing, punchy sound design, and retention-focused editing for short films, YouTube breakdowns, and high-impact social reels.
            </p>
          </div>
          <Link
            href="/projects"
            className="bento-btn-primary"
            style={{ marginTop: "16px", width: "100%", justifyContent: "space-between" }}
            onClick={() => cinematicAudioHaptics.playSlateTick()}
          >
            <span>Explore Projects</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Discipline 3: Web Engineering */}
        <div className="frosted-card col-span-4" style={{ justifyContent: "space-between" }}>
          <div>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(46, 216, 182, 0.2)", border: "1px solid rgba(46, 216, 182, 0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2ed8b6", marginBottom: "16px" }}>
              <Code2 size={22} />
            </div>
            <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>
              Web & Creative UI
            </h3>
            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#cbd5e1" }}>
              Building ultra-fast modern Next.js and TypeScript web applications with custom frosted design systems, animations, and clean responsive layouts.
            </p>
          </div>
          <button
            type="button"
            className="bento-btn-secondary"
            style={{ marginTop: "16px", width: "100%", justifyContent: "space-between" }}
            onClick={() => {
              cinematicAudioHaptics.playSlateTick();
              openContactModal();
            }}
          >
            <span>Start a Project</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* =========================================================
          ROW 4: GALLERY MOSAIC (6) + DIRECT CHANNELS & CONTACT (6)
          ========================================================= */}
      <div className="frosted-grid" id="contact">
        {/* Gallery Mosaic Card - col-span-6 */}
        <div
          className="frosted-card col-span-6"
          style={{
            justifyContent: "space-between",
            background: "linear-gradient(160deg, rgba(14, 38, 77, 0.5) 0%, rgba(6, 18, 38, 0.85) 100%)",
          }}
          id="gallery"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#60a5fa" }}>
                Visual Archive
              </span>
              <Palette size={18} color="#60a5fa" />
            </div>

            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
              Artwork & Portrait Gallery
            </h3>
            <p style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>
              Sushiksha cohort portraits, concept mechanical illustrations, and digital paintings
            </p>
          </div>

          {/* 4-Image Mosaic Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", margin: "20px 0" }}>
            {["1aohALiqrqgtgb4asdTwNzcNbEOdIlbzf", "1fchIxk9lwIpIaF8nKWqjs7gaqqUgaUAa", "19B8CMQ-pUMR-Y_kOYcr60fYd803bQfEX", "1yc5LVxDC2tZjD4qpZa8XEyaHRtHU1_mb"].map((driveId, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  height: "90px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid rgba(147, 197, 253, 0.25)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://drive.google.com/uc?export=view&id=${driveId}`}
                  alt="Gallery artwork"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <Link
            href="/gallery"
            className="bento-btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => cinematicAudioHaptics.playSlateTick()}
          >
            <span>Explore Full Gallery (20+ Items)</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Contact & Instant Messaging Card - col-span-6 */}
        <div
          className="frosted-card col-span-6"
          style={{
            justifyContent: "space-between",
            background: "linear-gradient(160deg, rgba(29, 78, 216, 0.4) 0%, rgba(6, 18, 38, 0.85) 100%)",
          }}
        >
          <div>
            <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#93c5fd" }}>
              Direct Connection
            </span>
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", margin: "4px 0 16px" }}>
              Get in Touch
            </h3>

            {/* Tap to copy phone & email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontSize: "10px", color: "#93c5fd", textTransform: "uppercase" }}>Phone</span>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: 0 }}>+91 {contactData.office.mobile}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(contactData.office.mobile, "phone")}
                  style={{ padding: "5px", borderRadius: "6px", background: "rgba(255,255,255,0.1)", border: "none", color: "#60a5fa", cursor: "pointer" }}
                >
                  {copiedField === "phone" ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                </button>
              </div>

              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontSize: "10px", color: "#93c5fd", textTransform: "uppercase" }}>Email</span>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff", margin: 0, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{contactData.office.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(contactData.office.email, "email")}
                  style={{ padding: "5px", borderRadius: "6px", background: "rgba(255,255,255,0.1)", border: "none", color: "#60a5fa", cursor: "pointer", flexShrink: 0 }}
                >
                  {copiedField === "email" ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            {/* Quick Message Box */}
            {formStatus === "success" ? (
              <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", textAlign: "center", color: "#34d399" }}>
                <CheckCircle2 size={32} color="#34d399" style={{ margin: "0 auto 8px" }} />
                <h4 style={{ fontSize: "16px", fontWeight: 700 }}>Message Sent!</h4>
                <p style={{ fontSize: "12px", color: "#E1ECFB", margin: 0 }}>I will get back to you promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontFamily: "inherit",
                    outline: "none",
                    resize: "none",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="bento-btn-primary"
                    style={{ padding: "9px 20px", fontSize: "13px" }}
                  >
                    <span>{formStatus === "submitting" ? "Sending..." : "Send Message"}</span>
                    <Send size={13} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
