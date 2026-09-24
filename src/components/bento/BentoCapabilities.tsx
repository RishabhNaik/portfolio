"use client";

import React from "react";
import Link from "next/link";
import {
  Palette,
  Film,
  Code2,
  Sparkles,
  ArrowUpRight,
  Zap,
  Sliders,
  Cpu,
  Layers,
} from "lucide-react";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";

export const BentoCapabilities: React.FC = () => {
  return (
    <section id="about" className="bento-section">
      <div className="bento-container">
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
          <div className="bento-tag bento-tag-blue" style={{ marginBottom: "12px" }}>
            <Sparkles size={14} />
            <span>Creative Disciplines</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "12px" }}>
            What Can I Do For You?
          </h2>
          <p style={{ fontSize: "16px", color: "#B4C9D4" }}>
            Bringing ideas to life through creative digital artistry, high-retention video editing, and modern web interfaces.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="bento-grid">
          {/* Card 1: Digital Illustration */}
          <div className="bento-card col-span-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className="crystal-facet" />
            <div>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(81, 171, 219, 0.2), rgba(25, 121, 209, 0.4))",
                  border: "1px solid rgba(81, 171, 219, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#51ABDB",
                  marginBottom: "20px",
                  boxShadow: "0 0 16px rgba(81, 171, 219, 0.3)",
                }}
              >
                <Palette size={26} />
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                Digital Illustration
              </h3>

              <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#B4C9D4", marginBottom: "20px" }}>
                Creating paintings inspired by concept art, mechanical objects, and character anatomy. Focused on precise brushwork, lighting layers, and proportions using Krita & graphic tablets.
              </p>
            </div>

            <div>
              <Link
                href="/gallery"
                className="bento-btn-secondary"
                style={{ width: "100%", justifyContent: "space-between" }}
                onClick={() => cinematicAudioHaptics.playSlateTick()}
              >
                <span>View Artworks</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: Video Editing & Directing */}
          <div className="bento-card col-span-4 bento-card-highlight" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className="crystal-facet" />
            <div>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(25, 121, 209, 0.3), rgba(19, 56, 101, 0.6))",
                  border: "1px solid rgba(81, 171, 219, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#67A1EB",
                  marginBottom: "20px",
                  boxShadow: "0 0 20px rgba(25, 121, 209, 0.4)",
                }}
              >
                <Film size={26} />
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                Video Editing & Pacing
              </h3>

              <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#B4C9D4", marginBottom: "20px" }}>
                Combining dynamic pacing, engaging sound design, and retention-focused storytelling to craft high-impact short films and viral reels that capture attention from the first second.
              </p>
            </div>

            <div>
              <Link
                href="/projects"
                className="bento-btn-primary"
                style={{ width: "100%", justifyContent: "space-between" }}
                onClick={() => cinematicAudioHaptics.playSlateTick()}
              >
                <span>Explore Reel & Films</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Card 3: Web Engineering & UI */}
          <div className="bento-card col-span-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className="crystal-facet" />
            <div>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(46, 216, 182, 0.2), rgba(19, 56, 101, 0.4))",
                  border: "1px solid rgba(46, 216, 182, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2ed8b6",
                  marginBottom: "20px",
                  boxShadow: "0 0 16px rgba(46, 216, 182, 0.3)",
                }}
              >
                <Code2 size={26} />
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                Web & Creative Tech
              </h3>

              <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#B4C9D4", marginBottom: "20px" }}>
                Developing fast, interactive static and full-stack web applications. Custom layouts, modern typography, responsive design, and smooth micro-interactions that engage your audience.
              </p>
            </div>

            <div>
              <button
                type="button"
                className="bento-btn-secondary"
                style={{ width: "100%", justifyContent: "space-between" }}
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
        </div>

        {/* Tech Stack Horizontal Bento Banner */}
        <div
          className="bento-card"
          style={{
            marginTop: "24px",
            padding: "24px 32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Cpu size={20} color="#51ABDB" />
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff" }}>
              Tech & Creative Arsenal:
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { name: "Krita", category: "Digital Painting" },
              { name: "Premiere Pro", category: "Video Editing" },
              { name: "Python", category: "Engineering" },
              { name: "C++", category: "Programming" },
              { name: "Next.js", category: "Web Framework" },
              { name: "TypeScript", category: "Language" },
              { name: "Figma", category: "UI Design" },
              { name: "GIMP", category: "Visual Assets" },
            ].map((tech) => (
              <div
                key={tech.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  background: "rgba(19, 56, 101, 0.4)",
                  border: "1px solid rgba(81, 171, 219, 0.25)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#E1ECFB",
                }}
              >
                <span>{tech.name}</span>
                <span style={{ fontSize: "10px", color: "#8AA4B2" }}>• {tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
