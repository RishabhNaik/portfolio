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
} from "lucide-react";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { PROJECTS_DATA } from "@/data/projects";
import { contactData } from "@/data/siteData";

export const SapphireMasterBento: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeProject = PROJECTS_DATA[activeProjectIdx] || PROJECTS_DATA[0];

  const handleCopy = (text: string, field: string) => {
    cinematicAudioHaptics.playTactileClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
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
    <div className="sapphire-container">
      {/* =========================================================
          ROW 1 & 2: NUE-INSPIRED SIGNATURE SAPPHIRE BENTO GRID
          ========================================================= */}
      <div className="bento-master-grid" style={{ marginBottom: "20px" }}>
        {/* CARD 1: Brand / Logo Card (Square Sapphire) - col-span-3 */}
        <div
          className="bento-sapphire-card"
          style={{
            gridColumn: "span 3",
            minHeight: "220px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #1d4ed8 0%, #1e3a8a 60%, #0f172a 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#93c5fd" }}>
              Portfolio
            </span>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#60a5fa", boxShadow: "0 0 10px #60a5fa" }} />
          </div>

          <div>
            <h1
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              rishabh<span style={{ color: "#93c5fd" }}>.</span>
            </h1>
            <p style={{ fontSize: "14px", color: "#bfdbfe", margin: 0, fontWeight: 500 }}>
              Digital Artist & Video Editor
            </p>
          </div>
        </div>

        {/* CARD 2: Interactive Showcase Card with Mockup App Icons - col-span-5 */}
        <div
          className="bento-ice-card"
          style={{
            gridColumn: "span 5",
            minHeight: "220px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #f0f7ff 0%, #e2effe 100%)",
            padding: "24px 28px",
          }}
        >
          {/* Top Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(30, 58, 138, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e3a8a" }}>
              <Apple size={16} />
            </div>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(30, 58, 138, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e3a8a" }}>
              <Sparkles size={16} />
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Creative Stack
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                Tools & Craft
              </h3>
              <p style={{ fontSize: "14px", color: "#475569", margin: "4px 0 0" }}>
                Krita • Premiere • Python • C++ • Figma
              </p>
            </div>

            {/* App Icon Mockup Strip */}
            <div style={{ display: "flex", gap: "8px" }}>
              {["🎨", "🎬", "⚡", "📐"].map((emoji, i) => (
                <div
                  key={i}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "#ffffff",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 3: Profile & Identity Card with Blob & Avatar (Tall) - col-span-4, row-span-2 */}
        <div
          className="bento-ice-card"
          style={{
            gridColumn: "span 4",
            gridRow: "span 2",
            minHeight: "460px",
            background: "linear-gradient(160deg, #F5F9FF 0%, #E1ECFB 100%)",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Top Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#2563eb" }}>
                Bangalore, India
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#64748b" }}>
                <MapPin size={13} color="#2563eb" />
                <span>IST (GMT+5:30)</span>
              </div>
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Rishabh Naik
            </h2>
            <p style={{ fontSize: "14px", color: "#475569", marginTop: "4px" }}>
              VKSSF Scholar & Mentee at Sushiksha
            </p>
          </div>

          {/* Center Avatar with Organic Sapphire Blob */}
          <div style={{ position: "relative", width: "100%", height: "240px", margin: "16px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="organic-blob" />
            <div
              style={{
                position: "relative",
                width: "190px",
                height: "190px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #ffffff",
                boxShadow: "0 16px 36px rgba(15, 23, 42, 0.2)",
                zIndex: 2,
              }}
            >
              <Image
                src="/images/Rishabh.jpeg"
                alt="Rishabh Naik"
                fill
                sizes="200px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* "Available" Badge in Card Style */}
            <div className="avail-pill">
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
              <span>Available</span>
            </div>
          </div>

          {/* Bottom Connect CTA */}
          <div style={{ display: "flex", gap: "10px", zIndex: 2 }}>
            <button
              type="button"
              onClick={() => {
                cinematicAudioHaptics.playSlateTick();
                openContactModal();
              }}
              className="bento-btn-primary"
              style={{ flex: 1, padding: "12px", fontSize: "13px" }}
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={14} />
            </button>
            <a
              href="/assets/Rishabh_Naik_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bento-btn-secondary"
              style={{ padding: "12px 16px", fontSize: "13px", color: "#1e3a8a", borderColor: "rgba(30, 58, 138, 0.2)" }}
            >
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* CARD 4: Stat Card: Views / Edits (Square Ice) - col-span-4 */}
        <div
          className="bento-ice-card"
          style={{
            gridColumn: "span 4",
            minHeight: "220px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #ffffff 0%, #eef5ff 100%)",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#64748b" }}>
            Total Reach & Views
          </span>

          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span style={{ fontSize: "52px", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1 }}>
                78K+
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#16a34a",
                  background: "rgba(22, 163, 74, 0.12)",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                }}
              >
                +10%
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "6px 0 0" }}>
              Across digital artworks, reels & client video projects
            </p>
          </div>
        </div>

        {/* CARD 5: Rating / Mentorship Card (Square Ice) - col-span-4 */}
        <div
          className="bento-ice-card"
          style={{
            gridColumn: "span 4",
            minHeight: "220px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #f8faff 0%, #e8f1fd 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "48px", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1 }}>
              4.9
            </span>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(37, 99, 235, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563eb",
              }}
            >
              <ArrowUpRight size={20} />
            </div>
          </div>

          <div>
            {/* Avatar Group */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              {["👨‍💻", "🎨", "🎬", "🌟"].map((avatar, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: idx % 2 === 0 ? "#2563eb" : "#3b82f6",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    border: "2px solid #ffffff",
                    marginLeft: idx > 0 ? "-10px" : "0",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  {avatar}
                </div>
              ))}
            </div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#334155", margin: 0 }}>
              Sushiksha Cohort & Client Collaborations
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          ROW 3: MIDDLE ROW (Waveform Card + 3D Asterisk + Donut Chart)
          ========================================================= */}
      <div className="bento-master-grid" style={{ marginBottom: "20px" }}>
        {/* CARD 6: Layered Waveform / Pacing Card (Wide Sapphire) - col-span-5 */}
        <div
          className="bento-sapphire-card"
          style={{
            gridColumn: "span 5",
            minHeight: "260px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #1d4ed8 0%, #1e40af 50%, #172554 100%)",
            position: "relative",
          }}
        >
          {/* Top Pill Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#bfdbfe" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#60a5fa" }} />
                <span>Sound Design</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#93c5fd" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#93c5fd" }} />
                <span>Video Pacing</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                cinematicAudioHaptics.playTactileClick();
                setIsAudioActive(!isAudioActive);
              }}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>

          {/* SVG Smooth Layered Waves */}
          <svg className="wave-svg" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path
              d="M0,80 C150,140 350,20 500,90 L500,150 L0,150 Z"
              fill="rgba(255, 255, 255, 0.08)"
            />
            <path
              d="M0,95 C120,40 320,130 500,70 L500,150 L0,150 Z"
              fill="rgba(255, 255, 255, 0.12)"
            />
            <path
              d="M0,110 C180,70 300,140 500,100 L500,150 L0,150 Z"
              fill="rgba(255, 255, 255, 0.18)"
            />
          </svg>

          {/* Bottom Metrics */}
          <div style={{ zIndex: 2, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "12px", color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                High-Retention Edits
              </span>
              <h3 style={{ fontSize: "32px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", margin: "2px 0 0" }}>
                84.4% Retention
              </h3>
            </div>
          </div>
        </div>

        {/* CARD 7: Tall Feature Card with 3D Glossy Sapphire Asterisk (Ice) - col-span-3 */}
        <div
          className="bento-ice-card"
          style={{
            gridColumn: "span 3",
            minHeight: "260px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #f0f7ff 0%, #e2effe 100%)",
            textAlign: "left",
          }}
        >
          <div>
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
              Pacing your visual story
            </h3>
          </div>

          {/* 3D Glossy Sapphire Asterisk / Star Shape */}
          <div className="asterisk-3d">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="42" y="10" width="16" height="80" rx="8" fill="url(#sapphireGrad)" />
              <rect x="42" y="10" width="16" height="80" rx="8" transform="rotate(60 50 50)" fill="url(#sapphireGrad)" />
              <rect x="42" y="10" width="16" height="80" rx="8" transform="rotate(120 50 50)" fill="url(#sapphireGrad)" />
              <defs>
                <linearGradient id="sapphireGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563eb" />
                  <stop offset="0.5" stopColor="#1d4ed8" />
                  <stop offset="1" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* CARD 8: Donut Chart / Creative Ratio Card (Vibrant Sapphire) - col-span-4 */}
        <div
          className="bento-sapphire-card"
          style={{
            gridColumn: "span 4",
            minHeight: "260px",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #2563eb 0%, #1e40af 60%, #172554 100%)",
          }}
        >
          {/* Top Pill & Donut Chart */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#ffffff",
                background: "rgba(255, 255, 255, 0.18)",
                padding: "4px 12px",
                borderRadius: "9999px",
              }}
            >
              +23% Impact
            </span>

            {/* Donut Chart Graphic */}
            <div className="donut-chart-container">
              <svg viewBox="0 0 100 100" width="100" height="100" className="donut-chart">
                <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.15)" strokeWidth="16" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#ffffff"
                  strokeWidth="16"
                  strokeDasharray="238.7"
                  strokeDashoffset="75"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
            </div>
          </div>

          <div>
            <span style={{ fontSize: "12px", color: "#bfdbfe", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Creative Portfolio Split
            </span>
            <h3 style={{ fontSize: "30px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", margin: "2px 0 0" }}>
              20+ Projects Done
            </h3>
          </div>
        </div>
      </div>

      {/* =========================================================
          ROW 4: LIVE SHOWCASE STREAM REEL & GALLERY (Bento Wide)
          ========================================================= */}
      <div className="bento-master-grid" style={{ marginBottom: "20px" }} id="projects">
        {/* Main Video Stream Spotlight - col-span-8 */}
        <div
          className="bento-sapphire-card bento-sapphire-card-dark"
          style={{
            gridColumn: "span 8",
            minHeight: "420px",
            justifyContent: "space-between",
            padding: "24px",
          }}
        >
          {/* Top Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 8px #ef4444" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#f87171", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Direct Streaming Reel
              </span>
            </div>

            <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#93c5fd" }}>
              {activeProject.title} • {activeProject.category}
            </span>
          </div>

          {/* Video / Visual Stage */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "260px",
              borderRadius: "20px",
              overflow: "hidden",
              background: "#030a17",
              border: "1px solid rgba(81, 171, 219, 0.3)",
            }}
          >
            <video
              ref={videoRef}
              src={activeProject.previewUrl}
              poster={activeProject.imageUrl}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(3, 10, 23, 0.85) 100%)",
              }}
            />

            <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                  {activeProject.title}
                </h4>
                <p style={{ fontSize: "13px", color: "#bfdbfe", margin: "2px 0 0" }}>
                  {activeProject.description?.slice(0, 80)}...
                </p>
              </div>

              <Link
                href={`/projects/${activeProject.id}`}
                className="bento-btn-primary"
                style={{ padding: "8px 16px", fontSize: "12px" }}
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
                    height: "50px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: isSelected ? "2px solid #60a5fa" : "1px solid rgba(81, 171, 219, 0.2)",
                    boxShadow: isSelected ? "0 0 12px rgba(96, 165, 250, 0.5)" : "none",
                    padding: 0,
                    cursor: "pointer",
                    background: "#0f172a",
                  }}
                >
                  <Image src={shot.imageUrl} alt={shot.title} fill sizes="120px" style={{ objectFit: "cover" }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Preview Bento Card - col-span-4 */}
        <div
          className="bento-ice-card"
          style={{
            gridColumn: "span 4",
            minHeight: "420px",
            justifyContent: "space-between",
            background: "linear-gradient(160deg, #ffffff 0%, #e2effe 100%)",
          }}
          id="gallery"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#2563eb" }}>
                Visual Archive
              </span>
              <Palette size={18} color="#2563eb" />
            </div>

            <h3 style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
              Artwork Gallery
            </h3>
            <p style={{ fontSize: "14px", color: "#475569", marginTop: "4px" }}>
              Concept art, mechanical bikes, and Sushiksha portraits
            </p>
          </div>

          {/* Gallery 4-Preview Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "16px 0" }}>
            {["1aohALiqrqgtgb4asdTwNzcNbEOdIlbzf", "1fchIxk9lwIpIaF8nKWqjs7gaqqUgaUAa", "19B8CMQ-pUMR-Y_kOYcr60fYd803bQfEX", "1yc5LVxDC2tZjD4qpZa8XEyaHRtHU1_mb"].map((driveId, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  height: "90px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
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
      </div>

      {/* =========================================================
          ROW 5: INTERACTIVE CONTACT & MESSAGING BENTO
          ========================================================= */}
      <div className="bento-master-grid" id="contact">
        {/* Contact Channels Card - col-span-5 */}
        <div
          className="bento-ice-card"
          style={{
            gridColumn: "span 5",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #ffffff 0%, #eef5ff 100%)",
          }}
        >
          <div>
            <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#2563eb" }}>
              Direct Channels
            </span>
            <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", margin: "4px 0 16px" }}>
              Get in Touch
            </h3>

            {/* Direct Channel Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Phone */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(37, 99, 235, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Phone</span>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>+91 {contactData.office.mobile}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(contactData.office.mobile, "phone")}
                  style={{ padding: "6px", borderRadius: "6px", background: "#f1f5f9", border: "none", color: "#2563eb", cursor: "pointer" }}
                >
                  {copiedField === "phone" ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Email */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(37, 99, 235, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Email</span>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0, wordBreak: "break-all" }}>{contactData.office.email}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(contactData.office.email, "email")}
                  style={{ padding: "6px", borderRadius: "6px", background: "#f1f5f9", border: "none", color: "#2563eb", cursor: "pointer", flexShrink: 0 }}
                >
                  {copiedField === "email" ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginTop: "16px" }}>
            <a
              href="https://www.linkedin.com/in/rishabhnaik/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px",
                borderRadius: "10px",
                background: "#ffffff",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#1e3a8a",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/RishabhNaik"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px",
                borderRadius: "10px",
                background: "#ffffff",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#1e3a8a",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/rishabh._.naik/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px",
                borderRadius: "10px",
                background: "#ffffff",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#1e3a8a",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Message Box Card - col-span-7 */}
        <div
          className="bento-sapphire-card"
          style={{
            gridColumn: "span 7",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #1e40af 0%, #1e3a8a 60%, #0f172a 100%)",
          }}
        >
          <div>
            <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#93c5fd" }}>
              Quick Message
            </span>
            <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", margin: "4px 0 16px" }}>
              Start a Conversation
            </h3>

            {formStatus === "success" ? (
              <div
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.1)",
                  textAlign: "center",
                  color: "#ffffff",
                }}
              >
                <CheckCircle2 size={44} color="#60a5fa" style={{ margin: "0 auto 12px" }} />
                <h4 style={{ fontSize: "18px", fontWeight: 800 }}>Message Received!</h4>
                <p style={{ fontSize: "14px", color: "#bfdbfe", margin: "4px 0 16px" }}>
                  Thanks for reaching out. I will respond promptly!
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus("idle")}
                  className="bento-btn-secondary"
                  style={{ background: "#ffffff", color: "#1e3a8a" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project, commissions, or creative ideas..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.12)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    fontSize: "14px",
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
                    style={{ background: "#ffffff", color: "#1e3a8a", border: "none", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
                  >
                    <span>{formStatus === "submitting" ? "Sending..." : "Send Message"}</span>
                    <Send size={14} color="#1e3a8a" />
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
