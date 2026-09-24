"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  Volume2,
  VolumeX,
  Layers,
  Palette,
  Film,
  Code2,
  FileText,
  MapPin,
  CheckCircle2,
  Radio,
  Sliders,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { IPodControl } from "@/components/bts/IPodControl";
import { BTSShot } from "@/types/project";
import { PROJECTS_DATA } from "@/data/projects";

export const BentoHero: React.FC = () => {
  const [activeShot, setActiveShot] = useState<BTSShot>(PROJECTS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [timecode, setTimecode] = useState<string>("00:14:28:09");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Timecode runner simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const frames = Math.floor(Math.random() * 24);
      const secs = Math.floor(Math.random() * 60);
      const pad = (n: number) => n.toString().padStart(2, "0");
      setTimecode(`00:14:${pad(secs)}:${pad(frames)}`);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === activeShot.id);

  const handleSelectShot = (shot: BTSShot) => {
    cinematicAudioHaptics.playTactileClick();
    setActiveShot(shot);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleNext = () => {
    cinematicAudioHaptics.playTactileClick();
    const nextIdx = (currentIndex + 1) % PROJECTS_DATA.length;
    handleSelectShot(PROJECTS_DATA[nextIdx]);
  };

  const handlePrev = () => {
    cinematicAudioHaptics.playTactileClick();
    const prevIdx = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    handleSelectShot(PROJECTS_DATA[prevIdx]);
  };

  const handleScrub = (delta: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + delta);
    }
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

  return (
    <section className="bento-section" style={{ paddingTop: "120px" }}>
      <div className="bento-container">
        {/* Section Pill Label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div className="bento-tag bento-tag-blue crystal-pulse">
            <Sparkles size={14} color="#51ABDB" />
            <span>Digital Art & Creative Portfolio</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "#8AA4B2",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2ed8b6", boxShadow: "0 0 8px #2ed8b6" }} />
            <span>Available for New Projects</span>
          </div>
        </div>

        {/* 12-Column Hero Bento Grid */}
        <div className="bento-grid">
          {/* =========================================================
              CARD 1: CINEMATIC SHOWCASE SPOTLIGHT (Span 8 cols)
              ========================================================= */}
          <div className="bento-card bento-card-highlight col-span-8" style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
            <div className="crystal-facet" />

            {/* Top Toolbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
                zIndex: 2,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "rgba(255, 59, 48, 0.15)",
                    border: "1px solid rgba(255, 59, 48, 0.3)",
                    color: "#ff3b30",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff3b30" }} />
                  REC STREAM
                </span>

                <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#B4C9D4" }}>
                  {timecode}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="bento-tag bento-tag-ice" style={{ fontSize: "11px" }}>
                  {activeShot.category || "Short Film & Visual"}
                </span>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "rgba(81, 171, 219, 0.1)",
                    border: "1px solid rgba(81, 171, 219, 0.2)",
                    color: "#51ABDB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  title={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>
            </div>

            {/* Video / Artwork Display Stage */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "360px",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#030a17",
                border: "1px solid rgba(81, 171, 219, 0.2)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <video
                ref={videoRef}
                src={activeShot.previewUrl}
                poster={activeShot.imageUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Atmospheric Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(3, 10, 23, 0.1) 0%, rgba(3, 10, 23, 0.8) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Center Play/Pause Trigger */}
              <button
                type="button"
                onClick={handleTogglePlay}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "rgba(5, 24, 49, 0.75)",
                  backdropFilter: "blur(12px)",
                  border: "2px solid rgba(81, 171, 219, 0.4)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 24px rgba(81, 171, 219, 0.35)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={22} fill="#ffffff" /> : <Play size={22} fill="#ffffff" style={{ marginLeft: "3px" }} />}
              </button>

              {/* Bottom Details Tag Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "18px",
                  right: "18px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#51ABDB", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Active Showcase
                  </span>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginTop: "2px" }}>
                    {activeShot.title}
                  </h3>
                </div>

                <Link
                  href={`/projects/${activeShot.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    background: "rgba(81, 171, 219, 0.2)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(81, 171, 219, 0.35)",
                    color: "#DFF0FA",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  <span>Project Specs</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* Bottom 5-Thumbnail Switcher Strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "10px",
                marginTop: "16px",
              }}
            >
              {PROJECTS_DATA.slice(0, 5).map((shot) => {
                const isActive = activeShot.id === shot.id;
                return (
                  <button
                    key={shot.id}
                    type="button"
                    onClick={() => handleSelectShot(shot)}
                    style={{
                      position: "relative",
                      height: "64px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: isActive ? "2px solid #51ABDB" : "1px solid rgba(81, 171, 219, 0.15)",
                      boxShadow: isActive ? "0 0 16px rgba(81, 171, 219, 0.45)" : "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background: "#051831",
                    }}
                  >
                    <Image
                      src={shot.imageUrl}
                      alt={shot.title}
                      fill
                      sizes="150px"
                      style={{ objectFit: "cover", opacity: isActive ? 1 : 0.65 }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(1, 20, 43, 0.85) 0%, transparent 80%)",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "4px 6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          color: isActive ? "#ffffff" : "#B4C9D4",
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

          {/* =========================================================
              CARD 2: PROFILE & IDENTITY BENTO (Span 4 cols)
              ========================================================= */}
          <div className="bento-card col-span-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className="crystal-facet" />

            {/* Top Identity Block */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                {/* Avatar with Sapphire Crystal Glow */}
                <div
                  style={{
                    position: "relative",
                    width: "76px",
                    height: "76px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "2px solid #51ABDB",
                    boxShadow: "0 0 20px rgba(81, 171, 219, 0.4)",
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
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
                    Rishabh Naik
                  </h2>
                  <p style={{ fontSize: "13px", color: "#51ABDB", fontWeight: 600, marginTop: "2px" }}>
                    Digital Artist & Video Editor
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#8AA4B2", marginTop: "4px" }}>
                    <MapPin size={12} color="#8AA4B2" />
                    <span>Bangalore, India</span>
                  </div>
                </div>
              </div>

              {/* Bio Excerpt */}
              <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#B4C9D4", marginBottom: "20px" }}>
                Engineering student at Sambhram Institute of Technology. VKSSF scholar & mentee at Sushiksha. Crafting digital artworks, mechanical illustrations, and high-impact video edits.
              </p>

              {/* Tag Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                <span className="bento-tag bento-tag-blue">Krita Master</span>
                <span className="bento-tag bento-tag-ice">Video Editing</span>
                <span className="bento-tag">Concept Art</span>
                <span className="bento-tag bento-tag-blue">VKSSF Scholar</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => {
                  cinematicAudioHaptics.playSlateTick();
                  openContactModal();
                }}
                className="bento-btn-primary"
                style={{ flex: 1, padding: "11px 16px", fontSize: "13px" }}
              >
                <span>Get In Touch</span>
                <ArrowUpRight size={14} />
              </button>

              <Link
                href="/gallery"
                className="bento-btn-secondary"
                style={{ padding: "11px 16px", fontSize: "13px" }}
              >
                <span>Gallery</span>
              </Link>
            </div>
          </div>

          {/* =========================================================
              CARD 3: INTERACTIVE IPOD CLICK WHEEL (Span 4 cols)
              ========================================================= */}
          <div className="bento-card col-span-4" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", width: "100%", justifyContent: "flex-start" }}>
              <Radio size={16} color="#51ABDB" />
              <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#51ABDB" }}>
                Tactile Audio / BTS Wheel
              </span>
            </div>

            {/* The Authentic iPod Click Wheel */}
            <div style={{ transform: "scale(0.92)", margin: "4px 0" }}>
              <IPodControl
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                onNext={handleNext}
                onPrev={handlePrev}
                onScrub={handleScrub}
                currentIndex={currentIndex}
                totalCount={PROJECTS_DATA.length}
              />
            </div>

            <p style={{ fontSize: "12px", color: "#8AA4B2", marginTop: "12px" }}>
              Use wheel controls to cycle shots, scrub streams & trigger haptics
            </p>
          </div>

          {/* =========================================================
              CARD 4: CREATIVE DISCIPLINES & TOOLS (Span 4 cols)
              ========================================================= */}
          <div className="bento-card col-span-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className="crystal-facet" />

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Layers size={16} color="#51ABDB" />
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#51ABDB" }}>
                  Core Capabilities
                </span>
              </div>

              {/* 3 Discipline Strips */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: "rgba(25, 121, 209, 0.12)",
                    border: "1px solid rgba(81, 171, 219, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(81, 171, 219, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#51ABDB" }}>
                    <Palette size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>Digital Illustration</h4>
                    <p style={{ fontSize: "12px", color: "#8AA4B2", margin: 0 }}>Mechanical art, paintings & Krita brushes</p>
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: "rgba(25, 121, 209, 0.12)",
                    border: "1px solid rgba(81, 171, 219, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(25, 121, 209, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#67A1EB" }}>
                    <Film size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>Video Editing & Pacing</h4>
                    <p style={{ fontSize: "12px", color: "#8AA4B2", margin: 0 }}>High-retention reels & cinematic pacing</p>
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: "rgba(25, 121, 209, 0.12)",
                    border: "1px solid rgba(81, 171, 219, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(46, 216, 182, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2ed8b6" }}>
                    <Code2 size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>Creative Code & UI</h4>
                    <p style={{ fontSize: "12px", color: "#8AA4B2", margin: 0 }}>Interactive web development & design</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {["Krita", "Premiere Pro", "Python", "C++", "Figma", "Next.js", "GIMP"].map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(81, 171, 219, 0.08)",
                    border: "1px solid rgba(81, 171, 219, 0.18)",
                    color: "#DFF0FA",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* =========================================================
              CARD 5: STATS, RESUME & SOCIALS BENTO (Span 4 cols)
              ========================================================= */}
          <div className="bento-card col-span-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Sliders size={16} color="#51ABDB" />
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#51ABDB" }}>
                  Highlights & Resume
                </span>
              </div>

              {/* Big Stat Counters */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(19, 56, 101, 0.4), rgba(5, 24, 49, 0.8))",
                    border: "1px solid rgba(81, 171, 219, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#51ABDB" }}>4+</span>
                  <p style={{ fontSize: "12px", color: "#8AA4B2", margin: 0, marginTop: "2px" }}>Years Creative Work</p>
                </div>

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(19, 56, 101, 0.4), rgba(5, 24, 49, 0.8))",
                    border: "1px solid rgba(81, 171, 219, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#67A1EB" }}>20+</span>
                  <p style={{ fontSize: "12px", color: "#8AA4B2", margin: 0, marginTop: "2px" }}>Visual Projects</p>
                </div>
              </div>
            </div>

            {/* Resume Button */}
            <div>
              <a
                href="/assets/Rishabh_Naik_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bento-btn-primary"
                style={{ width: "100%", textAlign: "center", marginBottom: "12px" }}
              >
                <FileText size={16} />
                <span>View Full Resume</span>
                <ArrowUpRight size={14} />
              </a>

              {/* Direct Quick Links */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "6px" }}>
                <a
                  href="https://www.linkedin.com/in/rishabhnaik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-btn-secondary"
                  style={{ flex: 1, padding: "8px 0", fontSize: "12px" }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/RishabhNaik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-btn-secondary"
                  style={{ flex: 1, padding: "8px 0", fontSize: "12px" }}
                >
                  GitHub
                </a>
                <a
                  href="https://www.instagram.com/rishabh._.naik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-btn-secondary"
                  style={{ flex: 1, padding: "8px 0", fontSize: "12px" }}
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
