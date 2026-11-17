"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/footer/Footer";
import { CosmicGalaxyBackground } from "@/components/ui/CosmicGalaxyBackground";
import { PROJECTS_DATA } from "@/data/projects";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./ProjectsPage.module.css";

const CATEGORIES = [
  "All",
  "Graphic Design",
  "Video Editing",
  "Case Study • UI/UX",
  "Digital Art",
  "Software Development",
  "Cinematography",
] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  const toggleDropdown = () => {
    cinematicAudioHaptics.playSlateTick();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectCategory = (category: string) => {
    cinematicAudioHaptics.playTactileClick();
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <div className={styles.pageWrapper}>
      {/* 00 — Ambient Textured Noisy Background with Smooth Animating Blobs */}
      <CosmicGalaxyBackground />

      {/* 01 — Shared Global Header */}
      <Header />

      <main className={styles.mainContainer}>
        {/* 03 — Minimalist Editorial Header Lockup */}
        <section className={styles.pageHeader} aria-label="Projects Archive Header">
          <div className={styles.headerTopRow}>
            <div className={styles.titleGroup}>
              <h1 className={styles.pageTitle}>Projects</h1>
              <p className={styles.pageSubtitle}>
                A curated archive of directorial works, design systems, and digital engineering.
              </p>
            </div>

            {/* Filtering Dropdown aligned seamlessly with Header */}
            <div className={styles.filterBar}>
              <div className={styles.dropdownContainer} ref={dropdownRef}>
                <button
                  type="button"
                  id="discipline-filter-btn"
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                  className={`${styles.dropdownTrigger} ${isDropdownOpen ? styles.dropdownTriggerOpen : ""}`}
                >
                  <span className={styles.dropdownLabel}>Filter by:</span>
                  <span className={styles.dropdownSelectedValue}>
                    {selectedCategory === "All" ? "All Disciplines" : selectedCategory}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`${styles.chevronIcon} ${isDropdownOpen ? styles.chevronRotated : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <ul
                    className={styles.dropdownMenu}
                    role="listbox"
                    aria-labelledby="discipline-filter-btn"
                  >
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat;
                      const displayName = cat === "All" ? "All Disciplines" : cat;
                      return (
                        <li
                          key={cat}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectCategory(cat)}
                          className={`${styles.dropdownItem} ${isSelected ? styles.dropdownItemSelected : ""}`}
                        >
                          <span>{displayName}</span>
                          {isSelected && <Check size={14} className={styles.checkIcon} />}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {selectedCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => handleSelectCategory("All")}
                  className={styles.clearFilterBtn}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 04 — Cinematic Full-Bleed Cards Grid (Exact Home Page Visual Language) */}
        <section className={styles.gridSection} aria-label="Projects Showcase Grid">
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={styles.projectCard}
                onClick={() => cinematicAudioHaptics.playSlateTick()}
              >
                {/* Full-bleed cinematic image matching home carousel cards */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.heroImageUrl || project.imageUrl}
                  alt={project.title}
                  className={styles.cardBgImage}
                  loading="lazy"
                />

                {/* Bottom 45% legibility vignette gradient matching home */}
                <div className={styles.cardGradient} />

                {/* Bottom Card Content: Title, Category & Sleek Arrow */}
                <div className={styles.cardBottomContent}>
                  <div className={styles.cardTextGroup}>
                    <h2 className={styles.cardTitle}>{project.title}</h2>
                    <span className={styles.cardCategory}>{project.category}</span>
                  </div>
                  <ArrowRight size={18} className={styles.arrowIcon} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 05 — Shared Global Footer */}
      <Footer />
    </div>
  );
}
