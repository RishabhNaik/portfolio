"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PROJECTS_DATA } from "@/data/projects";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  Search,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
} from "lucide-react";
import styles from "./ProjectsPage.module.css";

import { EditorialNav } from "@/components/navigation/EditorialNav";
import "@/app/editorial-pages.css";

const CATEGORIES = [
  "All",
  "Full-Stack",
  "AI Systems",
  "Enterprise Workflow",
  "Geospatial",
  "Web3",
] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        project.tags.some((t) =>
          t.toLowerCase().includes(selectedCategory.toLowerCase())
        );

      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className={styles.projectsPage}>
      {/* ─── Top Shared Editorial Navigation ─── */}
      <EditorialNav activeItem="projects" />

      {/* ─── Header Section ─────────────────────────────────────────────────── */}
      <section className={styles.headerSection}>
        <div className={styles.container}>
          <div className={styles.eyebrow}>ENGINEERING ARCHIVE</div>
          <h1 className={styles.pageTitle}>Selected Software Projects.</h1>
          <p className={styles.pageDesc}>
            Production platforms, autonomous AI agent systems, enterprise supply chain workflows, and distributed capstones.
          </p>

          {/* Search & Filter Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by technology, module, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterPills}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.filterBtn} ${
                    selectedCategory === cat ? styles.filterBtnActive : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Project Grid ───────────────────────────────────────────────────── */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          {filteredProjects.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No projects match your current filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className={styles.resetBtn}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, index) => (
                <article key={project.id} className={styles.projectCard}>
                  <div className={styles.imageWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className={styles.cardImg}
                    />
                    <div className={styles.imgBadge}>0{index + 1}</div>
                    <div className={styles.categoryBadge}>{project.category}</div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardMetaRow}>
                      <span className={styles.cardCompany}>{project.company}</span>
                      <span className={styles.cardDate}>{project.date}</span>
                    </div>

                    <h2 className={styles.cardTitle}>
                      <Link href={`/projects/${project.id}`}>
                        {project.title}
                      </Link>
                    </h2>

                    <p className={styles.cardDesc}>{project.description}</p>

                    <div className={styles.tagsRow}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tagPill}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <Link
                        href={`/projects/${project.id}`}
                        className={styles.caseStudyLink}
                      >
                        <span>View Engineering Case Study</span>
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div>
              <p className={styles.footerName}>Rishabh Naik</p>
              <p className={styles.footerRole}>Full-Stack Software Developer · Bangalore, India</p>
            </div>
            <div className={styles.footerLinks}>
              <a href="mailto:rishabhnaik37@gmail.com" className={styles.footerLink}>
                rishabhnaik37@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/rishabhnaik/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/RishabhNaik"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
