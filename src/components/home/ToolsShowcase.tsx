"use client";

import React, { useState } from "react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./ToolsShowcase.module.css";

interface ToolItem {
  id: string;
  name: string;
  category: "design" | "video" | "dev" | "ai";
  categoryLabel: string;
  description: string;
  icon: React.ReactNode;
}

const TOOLS_DATA: ToolItem[] = [
  // --- Video & Motion ---
  {
    id: "davinci",
    name: "DaVinci Resolve",
    category: "video",
    categoryLabel: "Color & Editing",
    description: "Industry-standard color grading, Fairlight audio & editorial",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#121824" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* DaVinci 4-petal aperture */}
        <path d="M 24 10 C 24 18, 30 24, 38 24 C 30 24, 24 30, 24 38 C 24 30, 18 24, 10 24 C 18 24, 24 18, 24 10 Z" fill="#ff4d4d" />
        <path d="M 24 10 C 27 16, 32 20, 38 24 C 32 24, 28 29, 27 35" fill="#facc15" opacity="0.9" />
        <path d="M 10 24 C 16 25, 21 30, 24 38 C 22 31, 16 27, 10 24 Z" fill="#38bdf8" />
        <circle cx="24" cy="24" r="4.5" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: "premiere",
    name: "Premiere Pro",
    category: "video",
    categoryLabel: "NLE Video Editing",
    description: "High-retention pacing, narrative cutting & multi-cam pipelines",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <rect width="44" height="44" x="2" y="2" rx="10" fill="#00005b" />
        <text x="24" y="30" fill="#ea77ff" fontFamily="var(--font-heading)" fontSize="20" fontWeight="700" textAnchor="middle">Pr</text>
      </svg>
    ),
  },
  {
    id: "after-effects",
    name: "After Effects",
    category: "video",
    categoryLabel: "Motion & VFX",
    description: "Dynamic kinetic typography, compositing & visual effects",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <rect width="44" height="44" x="2" y="2" rx="10" fill="#00005b" />
        <text x="24" y="30" fill="#9999ff" fontFamily="var(--font-heading)" fontSize="20" fontWeight="700" textAnchor="middle">Ae</text>
      </svg>
    ),
  },
  // --- Graphic Design & Digital Art ---
  {
    id: "photoshop",
    name: "Photoshop",
    category: "design",
    categoryLabel: "Digital Imaging",
    description: "Key art, retouching, poster design & creative manipulation",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <rect width="44" height="44" x="2" y="2" rx="10" fill="#001e36" />
        <text x="24" y="30" fill="#31a8ff" fontFamily="var(--font-heading)" fontSize="20" fontWeight="700" textAnchor="middle">Ps</text>
      </svg>
    ),
  },
  {
    id: "illustrator",
    name: "Illustrator",
    category: "design",
    categoryLabel: "Vector Graphics",
    description: "Brand identities, scalable vector art, iconography & typography",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <rect width="44" height="44" x="2" y="2" rx="10" fill="#330000" />
        <text x="24" y="30" fill="#ff9a00" fontFamily="var(--font-heading)" fontSize="20" fontWeight="700" textAnchor="middle">Ai</text>
      </svg>
    ),
  },
  {
    id: "affinity",
    name: "Affinity Suite",
    category: "design",
    categoryLabel: "Design & Photo",
    description: "Precision vector illustration, layout publishing & raw raster editing",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#0c1222" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <path d="M 24 8 L 38 36 L 31 36 L 24 20 L 17 36 L 10 36 Z" fill="url(#affGrad)" />
        <defs>
          <linearGradient id="affGrad" x1="10" y1="8" x2="38" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22c55e" />
            <stop offset="0.5" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "procreate",
    name: "Procreate",
    category: "design",
    categoryLabel: "Digital Painting",
    description: "Hand-crafted digital illustrations, concept art & storyboard sketches",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <rect width="44" height="44" x="2" y="2" rx="10" fill="#18181b" />
        <path d="M 12 36 C 16 30, 22 24, 30 16 C 33 12, 36 10, 36 12 C 36 15, 34 20, 28 26 C 22 32, 16 36, 12 36 Z" fill="url(#procGrad)" />
        <circle cx="14" cy="34" r="3" fill="#38bdf8" />
        <defs>
          <linearGradient id="procGrad" x1="12" y1="36" x2="36" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f43f5e" />
            <stop offset="0.35" stopColor="#fb923c" />
            <stop offset="0.7" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "gimp",
    name: "GIMP",
    category: "design",
    categoryLabel: "Open Source Imaging",
    description: "Open-source raster manipulation, mask extraction & batch pipelines",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#1e293b" />
        <ellipse cx="22" cy="24" rx="13" ry="9" fill="#94a3b8" />
        <circle cx="28" cy="22" r="3.5" fill="#0f172a" />
        <circle cx="29" cy="21" r="1.2" fill="#ffffff" />
        <ellipse cx="14" cy="28" rx="6" ry="3.5" fill="#ca8a04" transform="rotate(-20 14 28)" />
      </svg>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    category: "design",
    categoryLabel: "UI/UX & Systems",
    description: "Interactive prototypes, design systems & cross-platform UX architecture",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <rect width="44" height="44" x="2" y="2" rx="10" fill="#111827" />
        <path d="M 17 12 C 14.8 12, 13 13.8, 13 16 C 13 18.2, 14.8 20, 17 20 L 24 20 L 24 12 Z" fill="#f24e1e" />
        <path d="M 24 12 L 31 12 C 33.2 12, 35 13.8, 35 16 C 35 18.2, 33.2 20, 31 20 L 24 20 Z" fill="#ff7262" />
        <path d="M 13 24 C 13 21.8, 14.8 20, 17 20 L 24 20 L 24 28 L 17 28 C 14.8 28, 13 26.2, 13 24 Z" fill="#a259ff" />
        <circle cx="31" cy="24" r="4" fill="#1abcfe" />
        <path d="M 13 32 C 13 29.8, 14.8 28, 17 28 L 24 28 L 24 32 C 24 34.2, 22.2 36, 20 36 C 17.8 36, 13 34.2, 13 32 Z" fill="#0acf83" />
      </svg>
    ),
  },
  // --- Software Development ---
  {
    id: "python",
    name: "Python",
    category: "dev",
    categoryLabel: "Scripting & Backend",
    description: "Automation scripts, data pipelines, media processing & agent workflows",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <rect width="44" height="44" x="2" y="2" rx="10" fill="#0f172a" />
        <path d="M 23.5 10 C 17 10 17.5 13 17.5 13 L 17.5 16 L 24 16 L 24 17 L 15 17 C 11.5 17 10 19.5 10 23.5 C 10 27.5 13 27 13 27 L 15 27 L 15 24 C 15 20.5 18 20.5 18 20.5 L 24.5 20.5 C 27.5 20.5 27.5 17.5 27.5 17.5 L 27.5 13 C 27.5 13 27.5 10 23.5 10 Z" fill="#38bdf8" />
        <circle cx="20" cy="12.5" r="1.2" fill="#ffffff" />
        <path d="M 24.5 38 C 31 38 30.5 35 30.5 35 L 30.5 32 L 24 32 L 24 31 L 33 31 C 36.5 31 38 28.5 38 24.5 C 38 20.5 35 21 35 21 L 33 21 L 33 24 C 33 27.5 30 27.5 30 27.5 L 23.5 27.5 C 20.5 27.5 20.5 30.5 20.5 30.5 L 20.5 35 C 20.5 35 20.5 38 24.5 38 Z" fill="#facc15" />
        <circle cx="28" cy="35.5" r="1.2" fill="#0f172a" />
      </svg>
    ),
  },
  {
    id: "android-studio",
    name: "Android Studio",
    category: "dev",
    categoryLabel: "Mobile Engineering",
    description: "Native Android application architecture, Jetpack Compose & Kotlin",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#1e293b" />
        {/* Android Bugdroid */}
        <path d="M 16 23 C 16 18.5, 19.5 15, 24 15 C 28.5 15, 32 18.5, 32 23 Z" fill="#3ddc84" />
        <line x1="19" y1="13" x2="17" y2="10" stroke="#3ddc84" strokeWidth="2" strokeLinecap="round" />
        <line x1="29" y1="13" x2="31" y2="10" stroke="#3ddc84" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="19.5" r="1.5" fill="#ffffff" />
        <circle cx="28" cy="19.5" r="1.5" fill="#ffffff" />
        {/* Calipers Compass */}
        <path d="M 24 25 L 17 38 L 20 38 L 24 30 L 28 38 L 31 38 Z" fill="#60a5fa" />
        <circle cx="24" cy="27" r="2.5" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: "react-next",
    name: "Next.js & React",
    category: "dev",
    categoryLabel: "Modern Web Apps",
    description: "High-performance React Server Components, SSR & responsive layouts",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#000000" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* React cyan atom */}
        <ellipse cx="24" cy="24" rx="15" ry="6" fill="none" stroke="#61dafb" strokeWidth="1.4" />
        <ellipse cx="24" cy="24" rx="15" ry="6" fill="none" stroke="#61dafb" strokeWidth="1.4" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="15" ry="6" fill="none" stroke="#61dafb" strokeWidth="1.4" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="2.8" fill="#61dafb" />
      </svg>
    ),
  },
  // --- AI & Automation ---
  {
    id: "ai-agents",
    name: "AI Agents & LLMs",
    category: "ai",
    categoryLabel: "Agentic Engineering",
    description: "Autonomous reasoning agents, prompt architecture & multi-modal automation",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <rect width="44" height="44" x="2" y="2" rx="10" fill="#0f172a" />
        <circle cx="24" cy="16" r="4" fill="#38bdf8" />
        <circle cx="15" cy="30" r="3.5" fill="#818cf8" />
        <circle cx="33" cy="30" r="3.5" fill="#a855f7" />
        <circle cx="24" cy="35" r="3" fill="#22c55e" />
        <line x1="24" y1="16" x2="15" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <line x1="24" y1="16" x2="33" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <line x1="15" y1="30" x2="24" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <line x1="33" y1="30" x2="24" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <line x1="15" y1="30" x2="33" y2="30" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    id: "blender",
    name: "Blender 3D",
    category: "design",
    categoryLabel: "3D Modeling & CGI",
    description: "Hard-surface modeling, spatial lighting, texturing & procedural shaders",
    icon: (
      <svg viewBox="0 0 48 48" className={styles.toolSvg} aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#1e293b" />
        <path d="M 24 10 L 24 24 M 14 18 L 24 24 M 34 18 L 24 24" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="27" r="7" fill="#f97316" />
        <circle cx="24" cy="27" r="3.5" fill="#3b82f6" />
        <circle cx="24" cy="27" r="1.5" fill="#ffffff" />
      </svg>
    ),
  },
];

export const ToolsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "design" | "video" | "dev" | "ai">("all");

  const filteredTools =
    activeTab === "all"
      ? TOOLS_DATA
      : TOOLS_DATA.filter((tool) => tool.category === activeTab);

  const handleTabChange = (tab: "all" | "design" | "video" | "dev" | "ai") => {
    cinematicAudioHaptics.playSlateTick();
    setActiveTab(tab);
  };

  return (
    <section className={styles.toolsSection} aria-label="Tools and Technologies">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.headerArea}>
          <span className={styles.categorySuper}>Production Stack & Capabilities</span>
          <h2 className={styles.heading}>Tools & Technologies</h2>
          <p className={styles.subheading}>
            End-to-end creative and technical stack spanning cinematic post-production, digital art, vector identity, and full-stack software development.
          </p>

          {/* Filter Tabs */}
          <div className={styles.tabsRow} role="tablist" aria-label="Filter tools by discipline">
            {[
              { id: "all", label: "All Disciplines" },
              { id: "video", label: "Video & Grading" },
              { id: "design", label: "Design & Digital Art" },
              { id: "dev", label: "Software & Mobile" },
              { id: "ai", label: "AI & Agents" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ""}`}
                onClick={() => handleTabChange(tab.id as typeof activeTab)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid of Tools */}
        <div className={styles.toolsGrid}>
          {filteredTools.map((tool) => (
            <div key={tool.id} className={styles.toolCard}>
              <div className={styles.toolIconWrapper}>{tool.icon}</div>
              <div className={styles.toolText}>
                <div className={styles.toolTitleRow}>
                  <h3 className={styles.toolName}>{tool.name}</h3>
                  <span className={styles.toolBadge}>{tool.categoryLabel}</span>
                </div>
                <p className={styles.toolDesc}>{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
