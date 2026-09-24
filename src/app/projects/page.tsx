"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/footer/Footer";
import { PROJECTS_DATA } from "@/data/projects";
import { BTSShot } from "@/types/project";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import {
  Play,
  Pause,
  Info,
  Share2,
  Check,
  Volume2,
  VolumeX,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  Maximize2,
  Camera,
  Film,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  RotateCcw,
  RotateCw,
  Eye,
} from "lucide-react";
import styles from "./ProjectsPage.module.css";

const CATEGORIES = [
  "All",
  "Video Editing",
  "Photography",
  "Marketing",
  "Graphic Design",
  "Sound Design",
  "Cinematography",
] as const;

export default function ProjectsPage() {
  const router = useRouter();

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"rows" | "grid">("grid");
  const [heroIndex, setHeroIndex] = useState<number>(0);

  // Modals
  const [isCinemaPlayerOpen, setIsCinemaPlayerOpen] = useState<boolean>(false);
  const [activePlayerItem, setActivePlayerItem] = useState<{
    url: string;
    title: string;
    description: string;
    duration?: string;
  } | null>(null);

  // Player state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playerTime, setPlayerTime] = useState<number>(14.2);
  const [totalDuration, setTotalDuration] = useState<number>(88.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Active Hero Featured Title
  const activeHero = useMemo(() => {
    return PROJECTS_DATA[heroIndex % PROJECTS_DATA.length] || PROJECTS_DATA[0];
  }, [heroIndex]);

  const heroImage = activeHero.heroImageUrl || activeHero.imageUrl;

  // Sync mute state
  useEffect(() => {
    setIsMuted(cinematicAudioHaptics.getIsMuted());
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCinemaPlayerOpen(false);
      }
      if (isCinemaPlayerOpen && (e.key === " " || e.key === "k")) {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCinemaPlayerOpen]);

  // Video playback loop simulation
  useEffect(() => {
    if (!isCinemaPlayerOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setPlayerTime((prev) => {
        if (prev >= totalDuration) return 0;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isCinemaPlayerOpen, isPlaying, totalDuration]);

  // Filtered projects by category and search
  const filteredProjects = useMemo(() => {
    let items = PROJECTS_DATA;

    if (selectedCategory !== "All") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.synopsis && item.synopsis.toLowerCase().includes(q)) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          (item.technicalSpecs?.camera &&
            item.technicalSpecs.camera.toLowerCase().includes(q))
      );
    }

    return items;
  }, [selectedCategory, searchQuery]);

  // Curated Row Collections
  const masterReelsRow = useMemo(() => PROJECTS_DATA.slice(0, 5), []);
  const narrativeRow = useMemo(
    () =>
      PROJECTS_DATA.filter(
        (p) => p.category === "Filmmaking" || p.category === "Creative Direction"
      ),
    []
  );
  const opticsRow = useMemo(
    () =>
      PROJECTS_DATA.filter(
        (p) => p.category === "Photography" || p.category === "Art & Experiments"
      ),
    []
  );
  const soundRow = useMemo(
    () => PROJECTS_DATA.filter((p) => p.category === "Music & Sound"),
    []
  );

  // Row Scroll Handlers
  const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollRow = (key: string, direction: "left" | "right") => {
    cinematicAudioHaptics.playSlateTick();
    const el = rowRefs.current[key];
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  // Actions
  const handlePlayTitle = (item: BTSShot) => {
    cinematicAudioHaptics.playTactileClick();
    setActivePlayerItem({
      url: item.heroImageUrl || item.imageUrl,
      title: `${item.title} — Official Preview Reel`,
      description: item.synopsis || item.description,
      duration: item.duration || "14m",
    });
    setPlayerTime(0);
    setIsPlaying(true);
    setIsCinemaPlayerOpen(true);
  };

  const toggleMute = () => {
    const nextMuted = cinematicAudioHaptics.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleShare = async () => {
    try {
      cinematicAudioHaptics.playConfirmChime();
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2400);
      }
    } catch {}
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className={styles.auteurBrowsePage}>
      <Header />

      {/* =========================================================================
          AUTEUR MASTER HERO BILLBOARD (RISHABH'S SIGNATURE CINEMA SHOWCASE)
          ========================================================================= */}
      <section className={styles.billboardSection} aria-label={`${activeHero.title} Billboard`}>
        <div className={styles.billboardBackdrop}>
          <Image
            src={heroImage}
            alt={activeHero.title}
            fill
            priority
            className={styles.billboardImg}
            sizes="100vw"
          />
          <div className={styles.vignetteLeft} />
          <div className={styles.vignetteBottom} />
          <div className={styles.vignetteTop} />
          <div className={styles.filmGrainOverlay} />
        </div>
        <div className={styles.billboardContent}>
          <div className={styles.auteurBrandLockup}>
            <span className={styles.directorName}>RISHABH NAIK</span>
            <span className={styles.lockupDivider}>/</span>
            <span className={styles.directorArchiveLabel}>PORTFOLIO</span>
          </div>

          <h1 className={styles.billboardTitle}>Projects</h1>

          <p className={styles.billboardSynopsis} style={{ marginTop: '1rem', maxWidth: '600px' }}>
            A curated collection of my recent video editing, short films, high-retention Instagram reels, and creative experiments.
          </p>
        </div>

        {/* Tactile Billboard Reel Pager & Switcher (Replaces Netflix age rating bar) */}
        <div className={styles.billboardReelPager}>
          <div className={styles.reelPagerInfo}>
            <span className={styles.reelPagerLabel}>ARCHIVE REEL</span>
            <span className={styles.reelPagerCounter}>
              {String((heroIndex % masterReelsRow.length) + 1).padStart(2, "0")} / {String(masterReelsRow.length).padStart(2, "0")}
            </span>
          </div>
          <div className={styles.reelPagerNav}>
            <button
              type="button"
              onClick={() => {
                cinematicAudioHaptics.playSlateTick();
                setHeroIndex((prev) => (prev - 1 + masterReelsRow.length) % masterReelsRow.length);
              }}
              className={styles.pagerArrowBtn}
              aria-label="Previous Featured Reel"
              title="Previous Reel"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                cinematicAudioHaptics.playSlateTick();
                setHeroIndex((prev) => (prev + 1) % masterReelsRow.length);
              }}
              className={styles.pagerArrowBtn}
              aria-label="Next Featured Reel"
              title="Next Reel"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STICKY DISCIPLINE BROWSE & SEARCH BAR
          ========================================================================= */}
      <section className={styles.browseControlBar} aria-label="Discipline Filters and Search">
        <div className={styles.browseContainer}>
          <div className={styles.categoryPillsRow}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    cinematicAudioHaptics.playTactileClick();
                    setSelectedCategory(cat);
                  }}
                  className={`${styles.categoryPill} ${
                    isActive ? styles.categoryPillActive : ""
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.rightControlsGroup}>
            <div className={styles.searchBoxWrapper}>
              <Search size={15} className={styles.searchIcon} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reel, lens, camera, title..."
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={styles.searchClearBtn}
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CATALOG GRID AREA
          ========================================================================= */}
      <main className={styles.mainRowsArea}>
          {/* =========================================================
             CATALOG GRID VIEW (FILTERED OR USER GRID MODE)
             ========================================================= */}
          <section className={styles.gridSection} aria-label="All Titles Grid">
            <div className={styles.gridHeaderRow}>
              <div>
                <h2 className={styles.gridTitle}>
                  {searchQuery ? `Search Results for “${searchQuery}”` : `${selectedCategory} Titles`}
                </h2>
                <p className={styles.gridSubtitle}>
                  {filteredProjects.length} titles in the studio archive
                </p>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className={styles.noResultsBox}>
                <p className={styles.noResultsText}>No titles match your search criteria.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className={styles.resetFiltersBtn}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={styles.catalogGrid}>
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className={styles.catalogCard}
                    onClick={() => cinematicAudioHaptics.playTactileClick()}
                  >
                    <div className={styles.catalogBody}>
                      <h3 className={styles.catalogCardTitle}>
                        {project.title} <ArrowUpRight size={16} className={styles.titleArrow} />
                      </h3>
                      <p className={styles.catalogExcerpt}>{project.description}</p>
                      
                      <button className={styles.checkProjectBtn}>
                        check project <ArrowRight size={14} className={styles.btnArrow} />
                      </button>
                    </div>

                    <div className={styles.catalogThumbWrapper}>
                      <Image
                        src={project.coverImageUrl || project.heroImageUrl || project.imageUrl}
                        alt={project.title}
                        fill
                        className={styles.catalogImg}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
      </main>


      {/* =========================================================================
          FULLSCREEN THEATER CINEMA PLAYER LIGHTBOX
          ========================================================================= */}
      {isCinemaPlayerOpen && activePlayerItem && (
        <div
          className={styles.cinemaBackdrop}
          onClick={() => setIsCinemaPlayerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Cinema Player Lightbox"
        >
          <div
            className={styles.cinemaPlayerCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.cinemaHeader}>
              <div className={styles.playerMeta}>
                <span className={styles.playerLogo}>RN CINEMA</span>
                <span className={styles.playerTitle}>{activePlayerItem.title}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsCinemaPlayerOpen(false)}
                className={styles.cinemaCloseBtn}
                aria-label="Close cinema player"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.playerStage}>
              <Image
                src={activePlayerItem.url}
                alt={activePlayerItem.title}
                fill
                className={styles.playerImg}
                sizes="100vw"
              />
              <div className={styles.playerVignette} />

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={styles.centerPlayPrompt}
                aria-label={isPlaying ? "Pause playback" : "Resume playback"}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
            </div>

            <div className={styles.transportBar}>
              <div
                className={styles.progressTrack}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  setPlayerTime(pct * totalDuration);
                }}
              >
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${(playerTime / totalDuration) * 100}%` }}
                />
              </div>

              <div className={styles.transportControlsRow}>
                <div className={styles.controlsLeft}>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={styles.transportIconBtn}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlayerTime((p) => Math.max(0, p - 10))}
                    className={styles.transportIconBtn}
                    aria-label="Rewind 10 seconds"
                  >
                    <RotateCcw size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlayerTime((p) => Math.min(totalDuration, p + 10))}
                    className={styles.transportIconBtn}
                    aria-label="Forward 10 seconds"
                  >
                    <RotateCw size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className={styles.transportIconBtn}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                  </button>

                  <span className={styles.timecodeDisplay}>
                    {formatTime(playerTime)} / {formatTime(totalDuration)}
                  </span>
                </div>

                <div className={styles.controlsRight}>
                  <span className={styles.cinemaBadgeHD}>1080P // 24FPS</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen().catch(() => {});
                      } else {
                        document.exitFullscreen().catch(() => {});
                      }
                    }}
                    className={styles.transportIconBtn}
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
