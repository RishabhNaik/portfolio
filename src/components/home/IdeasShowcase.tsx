"use client";

import React, { useState, useMemo } from "react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { openContactModal } from "@/components/contact/contactModalState";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./IdeasShowcase.module.css";

interface IdeaItem {
  id: string;
  title: string;
  discipline: string;
  category: "all" | "ai" | "spatial" | "film" | "engineering";
  status: string;
  statusType: "active" | "proto" | "concept" | "collab";
  description: string;
  tags: string[];
}

const IDEAS_DATA: IdeaItem[] = [
  {
    id: "autonomous-director",
    title: "Autonomous Directorial AI Agent",
    discipline: "AI & Autonomous Systems",
    category: "ai",
    status: "Active R&D",
    statusType: "active",
    description:
      "An intelligent AI co-director that generates storyboard animatics, analyzes script pacing, and choreographs multi-angle cinematic camera coverage in real time.",
    tags: ["Multi-Agent Systems", "Storyboarding", "Temporal Synthesis", "LangChain"],
  },
  {
    id: "spatial-canvas",
    title: "Spatial Canvas for VisionOS",
    discipline: "Spatial & UI/UX Design",
    category: "spatial",
    status: "Concept Design",
    statusType: "concept",
    description:
      "A zero-gravity infinite timeline editor for spatial computing where video layers float as holographic film strips steered by eye tracking and hand micro-gestures.",
    tags: ["visionOS", "Spatial Audio", "Gestural Physics", "Holographic Canvas"],
  },
  {
    id: "gaussian-sets",
    title: "Neural Gaussian Splats for Virtual Sets",
    discipline: "Cinematography & Film Tech",
    category: "film",
    status: "Prototyping",
    statusType: "proto",
    description:
      "Real-time photorealistic volumetric environment capture allowing indie filmmakers to scout and shoot virtual locations with zero render lag and dynamic optical parallax.",
    tags: ["3DGS", "Virtual Production", "Unreal Engine 5", "Real-Time Lighting"],
  },
  {
    id: "procedural-type",
    title: "Procedural Variable Typography Engine",
    discipline: "Creative Engineering",
    category: "engineering",
    status: "Active R&D",
    statusType: "active",
    description:
      "Algorithmic type systems that morph dynamically based on ambient acoustics, cursor velocity, and user interaction states while preserving Swiss typographic balance.",
    tags: ["Variable Fonts", "GLSL Shaders", "Dynamic Grids", "WebGPU"],
  },
  {
    id: "local-first-nle",
    title: "Local-First WebAssembly Video NLE",
    discipline: "Creative Engineering",
    category: "engineering",
    status: "Architecture",
    statusType: "concept",
    description:
      "A lightweight, web-first non-linear video editor powered by WebAssembly, CRDTs, and local GPU acceleration for instantaneous peer-to-peer cut reviews.",
    tags: ["WebAssembly", "WebCodecs", "CRDTs", "GPU Compute"],
  },
  {
    id: "sensory-cinema",
    title: "Interactive Sensory Cinema on Light & Shadow",
    discipline: "Cinematography & Film Tech",
    category: "film",
    status: "Open for Collab",
    statusType: "collab",
    description:
      "A web-native sensory documentary exploring how master cinematographers shape shadow, featuring interactive camera simulators and reactive soundscapes.",
    tags: ["Web Audio API", "Cinematic Narrative", "Interactive Cinema", "Color Theory"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Ideas" },
  { id: "ai", label: "AI & Autonomous Systems" },
  { id: "spatial", label: "Spatial & UI/UX" },
  { id: "film", label: "Cinematography & Film Tech" },
  { id: "engineering", label: "Creative Engineering" },
] as const;

export const IdeasShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredIdeas = useMemo(() => {
    if (selectedCategory === "all") return IDEAS_DATA;
    return IDEAS_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (catId: string) => {
    cinematicAudioHaptics.playTactileClick();
    setSelectedCategory(catId);
  };

  const handleCollaborateClick = (idea: IdeaItem) => {
    cinematicAudioHaptics.playSlateTick();
    openContactModal();
  };

  return (
    <section id="ideas" className={styles.ideasSection} aria-label="Ideas I Want to Work On">
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerArea}>
          <span className={styles.categorySuper}>
            <span className={styles.superDot} />
            Future Concepts // In The Lab
          </span>
          <h2 className={styles.heading}>Ideas I Want to Work On</h2>
          <p className={styles.subheading}>
            A curated notebook of upcoming experiments, autonomous creative agents,
            spatial computing interfaces, and cinematic systems I&apos;m eager to build.
          </p>

          {/* Filter Tabs */}
          <div className={styles.filterTabsRow} role="tablist" aria-label="Filter ideas by domain">
            {CATEGORIES.map((tab) => {
              const isActive = selectedCategory === tab.id;
              const count =
                tab.id === "all"
                  ? IDEAS_DATA.length
                  : IDEAS_DATA.filter((item) => item.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryClick(tab.id)}
                  className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ""}`}
                >
                  {tab.label}
                  <span className={styles.filterCount}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ideas Grid */}
        <div className={styles.ideasGrid}>
          {filteredIdeas.map((idea) => {
            const dotClass =
              idea.statusType === "active"
                ? styles.statusDotActive
                : idea.statusType === "proto"
                ? styles.statusDotProto
                : idea.statusType === "concept"
                ? styles.statusDotConcept
                : styles.statusDotCollab;

            return (
              <article key={idea.id} className={styles.ideaCard}>
                <div className={styles.cardGlow} />

                {/* Top Row: Discipline & Status */}
                <div className={styles.cardTopRow}>
                  <span className={styles.disciplineLabel}>{idea.discipline}</span>
                  <span className={styles.statusBadge}>
                    <span className={`${styles.statusDot} ${dotClass}`} />
                    {idea.status}
                  </span>
                </div>

                {/* Main Content */}
                <div className={styles.cardMain}>
                  <h3 className={styles.ideaTitle}>{idea.title}</h3>
                  <p className={styles.ideaDescription}>{idea.description}</p>
                </div>

                {/* Tags */}
                <div className={styles.tagsRow}>
                  {idea.tags.map((tag) => (
                    <span key={tag} className={styles.tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  className={styles.cardActionBtn}
                  onClick={() => handleCollaborateClick(idea)}
                  aria-label={`Collaborate on ${idea.title}`}
                >
                  <span>Collaborate on this idea</span>
                  <ArrowRight size={16} className={styles.actionArrow} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
