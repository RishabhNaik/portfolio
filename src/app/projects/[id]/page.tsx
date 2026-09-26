"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PROJECTS_DATA } from "@/data/projects";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Download,
  CheckCircle2,
  Monitor,
  Server,
  Database,
  Cloud,
  Cpu,
  Check,
  Copy,
  ExternalLink,
  Github,
  Calendar,
  Building,
  MapPin,
  ShieldCheck,
  Code2,
  Sparkles,
} from "lucide-react";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const currentId = params?.id as string;

  const projectIndex = PROJECTS_DATA.findIndex((p) => p.id === currentId);
  const activeProject =
    projectIndex !== -1 ? PROJECTS_DATA[projectIndex] : PROJECTS_DATA[0];

  const nextProject =
    PROJECTS_DATA[(projectIndex + 1) % PROJECTS_DATA.length];
  const prevProject =
    PROJECTS_DATA[(projectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];

  const [copiedLink, setCopiedLink] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleNavigateBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      router.push(`/?project=${activeProject.id}`);
    }, 280);
  };

  return (
    <div className={styles.caseStudyPage}>
      {/* ─── Top Shared Header ─────────────────────────────────────────────── */}
      <header className={styles.topNav}>
        <div className={styles.topNavInner}>
          <a
            href={`/?project=${activeProject.id}`}
            onClick={handleNavigateBack}
            className={styles.backLink}
          >
            <ArrowLeft size={15} />
            <span>Back to Bento Portfolio</span>
          </a>

          <div className={styles.topNavRight}>
            <button
              type="button"
              onClick={handleShare}
              className={`${styles.shareBtn} ${copiedLink ? styles.copied : ""}`}
              title="Copy Case Study URL"
            >
              {copiedLink ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
            </button>
            <a
              href="/Rishabh_Naik_Resume.pdf"
              download="Rishabh_Naik_Resume.pdf"
              className={styles.resumeBtn}
            >
              <Download size={14} />
              <span>Resume PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── Main Transition Card Container ─────────────────────────────────── */}
      <div className={styles.container}>
        <main className={`${styles.mainCardWrapper} ${isExiting ? styles.isExiting : ""}`}>
          {/* Obsidian Window Chrome Titlebar */}
          <div className={styles.obsidianWindowBar}>
            <div className={styles.obsidianDots} aria-hidden="true">
              <button
                type="button"
                onClick={handleNavigateBack}
                className={`${styles.obsidianDot} ${styles.dotRed}`}
                title="Close (Return to Bento)"
                style={{ border: "none", cursor: "pointer", padding: 0 }}
              />
              <span className={`${styles.obsidianDot} ${styles.dotYellow}`} />
              <span className={`${styles.obsidianDot} ${styles.dotGreen}`} />
            </div>

            <div className={styles.obsidianTabs}>
              <div className={`${styles.obsidianTab} ${styles.active}`}>
                <Code2 size={12} className={styles.obsidianTabIcon} />
                <span>{activeProject.id}.md</span>
              </div>
              <Link
                href={`/projects/${nextProject.id}`}
                className={styles.obsidianTab}
                title={`Next: ${nextProject.title}`}
                style={{ textDecoration: "none" }}
              >
                <Sparkles size={12} className={styles.obsidianTabIcon} />
                <span>{nextProject.id}.md</span>
              </Link>
            </div>

            <div className={styles.obsidianWindowVault}>
              <span>vault: /projects/{activeProject.id}</span>
            </div>
          </div>

          {/* 1. Project Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.eyebrowPill}>
              <span>{activeProject.category}</span>
            </div>

            <h1 className={styles.projectTitle}>{activeProject.title}</h1>
            <p className={styles.projectSubtitle}>{activeProject.description}</p>

            {/* 5-Column Meta Grid */}
            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>{activeProject.role}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Company / Org</span>
                <span className={styles.metaValue}>
                  <Building size={14} className={styles.metaIcon} />
                  {activeProject.company}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Timeline</span>
                <span className={styles.metaValue}>
                  <Calendar size={14} className={styles.metaIcon} />
                  {activeProject.date}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>
                  <MapPin size={14} className={styles.metaIcon} />
                  {activeProject.location}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Production Status</span>
                <span className={styles.metaValueHighlight}>
                  <ShieldCheck size={14} className={styles.metaIcon} />
                  {activeProject.status}
                </span>
              </div>
            </div>

            {/* Tech Badges Row */}
            <div className={styles.techTagsRow}>
              {activeProject.tags.map((tag) => (
                <span key={tag} className={styles.techTag}>
                  #{tag.toLowerCase().replace(/\s+/g, "-")}
                </span>
              ))}
            </div>
          </section>

          {/* 2. Main 16:9 Featured Screenshot */}
          <section className={styles.mainVisualSection}>
            <div className={styles.mainVisualCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProject.heroImageUrl || activeProject.imageUrl}
                alt={activeProject.title}
                className={styles.mainVisualImg}
              />
              <div className={styles.visualCaptionBar}>
                <span>Production Architecture &amp; System Flow — {activeProject.title}</span>
                <span>16:9 Widescreen View</span>
              </div>
            </div>
          </section>

          {/* 3. The Problem & The Solution */}
          <section className={styles.contentSection}>
            <div className={styles.twoColumnGrid}>
              {/* Problem */}
              <div className={styles.columnCard}>
                <div className={styles.sectionBadge}>01 / THE OPERATIONAL PROBLEM</div>
                <h2 className={styles.columnTitle}>The Challenge</h2>
                <p className={styles.columnText}>
                  {activeProject.problem ||
                    "Legacy operational workflows relied on disjointed spreadsheets and manual messaging, causing coordination bottlenecks, data entry errors, and lost operational history."}
                </p>
              </div>

              {/* Solution */}
              <div className={styles.columnCard}>
                <div className={styles.sectionBadge}>02 / THE ARCHITECTED SOLUTION</div>
                <h2 className={styles.columnTitle}>The Engineered Product</h2>
                <p className={styles.columnText}>
                  {activeProject.product || activeProject.synopsis}
                </p>
              </div>
            </div>
          </section>

          {/* 4. Personal Engineering Contribution */}
          <section className={styles.contributionSection}>
            <div className={styles.contributionCard}>
              <div className={styles.sectionBadge}>03 / ENGINEERING OWNERSHIP</div>
              <h2 className={styles.sectionHeading}>What I Personally Built &amp; Shipped</h2>
              <p className={styles.leadText}>
                Specific modules, database schemas, and API contracts personally engineered:
              </p>
              <div className={styles.contributionBox}>
                <p className={styles.contributionText}>{activeProject.contribution}</p>
              </div>
            </div>
          </section>

          {/* 5. System Architecture Blueprint */}
          {activeProject.architecture && (
            <section className={styles.contentSection}>
              <div className={styles.sectionBadge}>04 / SYSTEM DESIGN BLUEPRINT</div>
              <h2 className={styles.sectionHeading}>System Architecture</h2>
              <p className={styles.sectionDesc}>
                Engineered for strict data integrity, modularity, low query latency, and safe execution.
              </p>

              <div className={styles.archGrid}>
                {activeProject.architecture.frontend && (
                  <div className={styles.archCard}>
                    <div className={styles.archIcon}>
                      <Monitor size={18} />
                    </div>
                    <h3 className={styles.archTitle}>Frontend &amp; UI Layer</h3>
                    <ul className={styles.archList}>
                      {activeProject.architecture.frontend.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeProject.architecture.backend && (
                  <div className={styles.archCard}>
                    <div className={styles.archIcon}>
                      <Server size={18} />
                    </div>
                    <h3 className={styles.archTitle}>Backend &amp; API Layer</h3>
                    <ul className={styles.archList}>
                      {activeProject.architecture.backend.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeProject.architecture.database && (
                  <div className={styles.archCard}>
                    <div className={styles.archIcon}>
                      <Database size={18} />
                    </div>
                    <h3 className={styles.archTitle}>Database &amp; Storage</h3>
                    <ul className={styles.archList}>
                      {activeProject.architecture.database.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(activeProject.architecture.cloud || activeProject.architecture.ai) && (
                  <div className={styles.archCard}>
                    <div className={styles.archIcon}>
                      {activeProject.architecture.ai ? <Cpu size={18} /> : <Cloud size={18} />}
                    </div>
                    <h3 className={styles.archTitle}>
                      {activeProject.architecture.ai ? "AI & Agentic Systems" : "Cloud & Infrastructure"}
                    </h3>
                    <ul className={styles.archList}>
                      {(activeProject.architecture.ai || activeProject.architecture.cloud || []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 6. Product Evidence & Interfaces */}
          {activeProject.screenshots && activeProject.screenshots.length > 0 && (
            <section className={styles.contentSection}>
              <div className={styles.sectionBadge}>05 / PRODUCT EVIDENCE &amp; WORKFLOWS</div>
              <h2 className={styles.sectionHeading}>Product Interfaces &amp; Workflows</h2>

              <div className={styles.screenshotsGrid}>
                {activeProject.screenshots.map((shot, idx) => (
                  <div key={idx} className={styles.screenshotCard}>
                    <div className={styles.screenshotImgWrap}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shot.url}
                        alt={shot.caption}
                        className={styles.screenshotImg}
                      />
                      {shot.tag && <span className={styles.shotTag}>{shot.tag}</span>}
                    </div>
                    <p className={styles.shotCaption}>{shot.caption}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7. Key Technical Decisions */}
          {activeProject.technicalDecisions && (
            <section className={styles.contentSection}>
              <div className={styles.sectionBadge}>06 / ARCHITECTURAL TRADEOFFS</div>
              <h2 className={styles.sectionHeading}>Key Technical Decisions</h2>

              <div className={styles.decisionsGrid}>
                {activeProject.technicalDecisions.map((dec, i) => (
                  <div key={i} className={styles.decisionCard}>
                    <div className={styles.decisionNum}>DECISION 0{i + 1}</div>
                    <h3 className={styles.decisionTitle}>{dec.title}</h3>
                    <p className={styles.decisionRationale}>{dec.rationale}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 8. Measurable Results & Learnings */}
          <section className={styles.contentSection}>
            <div className={styles.twoColumnGrid}>
              {/* Results */}
              {activeProject.results && (
                <div className={styles.columnCard}>
                  <div className={styles.sectionBadge}>07 / MEASURABLE IMPACT</div>
                  <h2 className={styles.columnTitle}>Results &amp; Outcomes</h2>
                  <ul className={styles.resultsList}>
                    {activeProject.results.map((res, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className={styles.checkIcon} />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learnings */}
              {activeProject.learnings && (
                <div className={styles.columnCard}>
                  <div className={styles.sectionBadge}>08 / REFLECTIONS &amp; LEARNINGS</div>
                  <h2 className={styles.columnTitle}>Engineering Takeaways</h2>
                  <p className={styles.columnText}>{activeProject.learnings}</p>
                </div>
              )}
            </div>
          </section>

          {/* 9. Next Project Card */}
          <section className={styles.nextProjectSection}>
            <div className={styles.nextCard}>
              <div className={styles.nextLeft}>
                <span className={styles.nextEyebrow}>NEXT CASE STUDY</span>
                <h3 className={styles.nextTitle}>{nextProject.title}</h3>
                <p className={styles.nextCat}>{nextProject.category}</p>
              </div>
              <Link
                href={`/projects/${nextProject.id}`}
                className={styles.nextBtn}
              >
                <span>View Next Project</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </main>

        {/* ─── Footer ───────────────────────────────────────────────────────── */}
        <footer className={styles.footer}>
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
        </footer>
      </div>
    </div>
  );
}
