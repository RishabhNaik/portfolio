"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA } from "@/data/projects";
import { BTSShot } from "@/types/project";
import { ArrowUpRight, Play, Film, Sparkles, Eye, Camera, ExternalLink } from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";

export const BentoProjects: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="projects" className="bento-section">
      <div className="bento-container">
        {/* Section Header */}
        <div style={{ marginBottom: "36px", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <div className="bento-tag bento-tag-blue" style={{ marginBottom: "12px" }}>
              <Film size={14} />
              <span>Selected Works</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
              Featured Projects & Artworks
            </h2>
          </div>

          <Link
            href="/projects"
            className="bento-btn-secondary"
            onClick={() => cinematicAudioHaptics.playSlateTick()}
          >
            <span>View All Projects</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Funky Bento Grid for Projects */}
        <div className="bento-grid">
          {PROJECTS_DATA.slice(0, 4).map((project, idx) => {
            const isWide = idx === 0 || idx === 3;
            const spanClass = isWide ? "col-span-7" : "col-span-5";

            return (
              <div
                key={project.id}
                className={`bento-card ${spanClass}`}
                style={{
                  padding: 0,
                  height: "380px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  cursor: "pointer",
                }}
                onMouseEnter={() => {
                  setHoveredId(project.id);
                  cinematicAudioHaptics.playTactileClick();
                }}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background Image / Video Preview */}
                <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                  {hoveredId === project.id && project.previewUrl ? (
                    <video
                      src={project.previewUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "scale(1.04)",
                        transition: "transform 0.4s ease",
                      }}
                    />
                  ) : (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        transform: hoveredId === project.id ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  )}

                  {/* Dark Sapphire Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(1, 20, 43, 0.2) 0%, rgba(1, 20, 43, 0.92) 85%)",
                    }}
                  />

                  {/* Top Category Tag */}
                  <div style={{ position: "absolute", top: "18px", left: "18px", right: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="bento-tag bento-tag-ice" style={{ fontSize: "11px" }}>
                      {project.category}
                    </span>

                    <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#8AA4B2" }}>
                      {project.date}
                    </span>
                  </div>

                  {/* Bottom Content Info */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      right: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
                      {project.title}
                    </h3>

                    <p style={{ fontSize: "13px", color: "#B4C9D4", margin: 0, lineClamp: 2, lineHeight: 1.5 }}>
                      {project.description?.slice(0, 110)}...
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {project.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "10px",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              background: "rgba(81, 171, 219, 0.15)",
                              color: "#DFF0FA",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#51ABDB",
                          textDecoration: "none",
                        }}
                        onClick={() => cinematicAudioHaptics.playSlateTick()}
                      >
                        <span>Explore</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
