"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PROJECTS_DATA } from "@/data/projects";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/footer/Footer";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import {
  Play,
  Pause,
  Info,
  Share2,
  Check,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowUpRight,
  Maximize2,
  Camera,
  Film,
  Sparkles,
  RotateCcw,
  RotateCw,
  X,
} from "lucide-react";
import styles from "./ProjectDetail.module.css";

type TabKey = "episodes" | "specs" | "similar" | "details";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const currentId = params?.id as string;

  // Active project lookup or fallback
  const activeShot =
    PROJECTS_DATA.find((p) => p.id === currentId) || PROJECTS_DATA[0];

  const heroImage = activeShot.heroImageUrl || activeShot.imageUrl;

  // State
  const [activeTab, setActiveTab] = useState<TabKey>("episodes");
  const [isCinemaPlayerOpen, setIsCinemaPlayerOpen] = useState<boolean>(false);
  const [activePlayerItem, setActivePlayerItem] = useState<{
    url: string;
    title: string;
    description: string;
    duration?: string;
  } | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playerTime, setPlayerTime] = useState<number>(14.2);
  const [totalDuration, setTotalDuration] = useState<number>(88.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Sync mute state with global engine
  useEffect(() => {
    setIsMuted(cinematicAudioHaptics.getIsMuted());
  }, []);

  // Keyboard accessibility for cinema modal
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

  // Assemble distinct project scenes / chapters (Netflix Episode List)
  const episodeScenes = useMemo(() => {
    const hero = activeShot.heroImageUrl || activeShot.imageUrl;
    const pool = activeShot.stills && activeShot.stills.length > 0 ? activeShot.stills : [];

    // Fallback images if project has fewer stills
    const fallbacks = [
      { url: "/assets/projects/bts-camera.jpg", role: "Optical Rigging & A-Camera", caption: "35mm camera balancing and anamorphic flare calibration on set." },
      { url: "/assets/projects/bts-light.jpg", role: "High-Contrast Lighting Design", caption: "Deep volumetric haze and tungsten key illumination test." },
      { url: "/assets/projects/bts-hand.jpg", role: "Physical Human Friction", caption: "Tactile gesture and intimate human stillness under natural daylight." },
      { url: "/assets/images/cube.jpg", role: "Specular Refraction Study", caption: "Optical caustics and glass dispersion tests." },
    ];

    const results: Array<{
      id: string;
      episodeNum: number;
      title: string;
      description: string;
      imageUrl: string;
      duration: string;
    }> = [];

    // Scene 1: Concept & Opening Sequence
    const img1 = pool[0]?.url || fallbacks[0].url;
    results.push({
      id: "scene-1",
      episodeNum: 1,
      title: "Opening Sequence: Optical Calibration & Premise",
      description:
        activeShot.synopsis ||
        "Conceived as an exploration of light, texture, and temporal rhythm, anchored in physical consequence rather than synthetic post-production formulas.",
      imageUrl: img1 !== hero ? img1 : fallbacks[0].url,
      duration: "04:18",
    });

    // Scene 2: Cinematography & Optics
    const img2 = pool[1]?.url || fallbacks[1].url;
    results.push({
      id: "scene-2",
      episodeNum: 2,
      title: "The Dialogue: Anamorphic Field & Tonal Polarity",
      description:
        "The visual language balances weight, negative space, and tonal polarity. Primes were calibrated to ensure direct specular highlights bloom organically.",
      imageUrl: img2 !== hero ? img2 : fallbacks[1].url,
      duration: "05:42",
    });

    // Scene 3: Climax & Editorial Resolution
    const img3 = pool[2]?.url || fallbacks[2].url;
    results.push({
      id: "scene-3",
      episodeNum: 3,
      title: "Climax: Environmental Friction & Master Resolution",
      description:
        "Cinematography working with unpredictable location daylight and acoustic resonance. Sound was captured concurrently to preserve the organic spatial room footprint.",
      imageUrl: img3 !== hero ? img3 : fallbacks[2].url,
      duration: "06:14",
    });

    return results;
  }, [activeShot]);

  // Recommended works (excluding current project)
  const similarProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => p.id !== activeShot.id).slice(0, 6);
  }, [activeShot]);

  const specs = activeShot.technicalSpecs || {
    camera: "Arri Alexa Mini LF / 35mm Analog",
    lenses: "Cooke Anamorphic /i Special Flare",
    audio: "Sennheiser MKH 416 / Nagra Tape Master",
    aspectRatio: activeShot.aspectRatio || "2.39 : 1 Scope",
    filmStock: "Kodak Vision3 500T",
    colorGrade: "ACEScg Custom Print LUT",
    lighting: "Arri SkyPanel S60-C & Vintage Tungsten",
    location: activeShot.location || "Studio Soundstage",
  };

  const handlePlayTrailer = () => {
    cinematicAudioHaptics.playTactileClick();
    setActivePlayerItem({
      url: heroImage,
      title: `${activeShot.title} — Official Preview Reel`,
      description: activeShot.synopsis || activeShot.description,
      duration: activeShot.duration || "14m",
    });
    setPlayerTime(0);
    setIsPlaying(true);
    setIsCinemaPlayerOpen(true);
  };

  const handlePlayScene = (scene: (typeof episodeScenes)[0]) => {
    cinematicAudioHaptics.playTactileClick();
    setActivePlayerItem({
      url: scene.imageUrl,
      title: `${activeShot.title} — ${scene.title}`,
      description: scene.description,
      duration: scene.duration,
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
    } catch {
      // Fallback
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className={styles.projectDetailPage}>
      <Header />

      <section className={styles.billboardSection} aria-label={`${activeShot.title} Billboard`}>
        <div className={styles.billboardBackdrop}>
          <Image
            src={heroImage}
            alt={activeShot.title}
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
          <Link
            href="/projects"
            className={styles.backBrowseBtn}
            onClick={() => cinematicAudioHaptics.playSlateTick()}
          >
            <ArrowLeft size={14} />
            <span>Back to Projects</span>
          </Link>

          <div className={styles.auteurBrandLockup}>
            <span className={styles.directorName}>RISHABH NAIK</span>
            <span className={styles.lockupDivider}>/</span>
            <span className={styles.directorArchiveLabel}>DIRECTORIAL ARCHIVE</span>
            <span className={styles.lockupBadge}>{activeShot.category.toUpperCase()}</span>
          </div>

          <h1 className={styles.billboardTitle}>{activeShot.title}</h1>

          <div className={styles.billboardMetaBar}>
            <span className={styles.cutBadge}>DIRECTOR’S CUT</span>
            <span className={styles.metaYear}>{activeShot.date || "2024"}</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.metaDuration}>{activeShot.duration || "14m"}</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.formatBadge}>35MM ARRIRAW</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.formatBadge}>{activeShot.aspectRatio || "2.39:1 SCOPE"}</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.formatBadge}>SPATIAL AUDIO</span>
          </div>

          <p className={styles.billboardSynopsis}>
            {activeShot.synopsis || activeShot.description}
          </p>

          <div className={styles.billboardActions}>
            <button
              type="button"
              onClick={handlePlayTrailer}
              className={styles.playPrimaryBtn}
              aria-label="Play project preview"
            >
              <Play size={16} fill="#000000" color="#000000" />
              <span>Watch Reel Preview</span>
            </button>

            <button
              type="button"
              onClick={() => {
                cinematicAudioHaptics.playTactileClick();
                setActiveTab("specs");
                const el = document.getElementById("hub-navigation");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className={styles.specsSecondaryBtn}
              aria-label="View technical specifications"
            >
              <Info size={16} />
              <span>Technical Specs</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className={styles.circleActionBtn}
              aria-label="Share project"
              title={copiedShare ? "Link copied!" : "Share project"}
            >
              {copiedShare ? <Check size={16} color="#30d158" /> : <Share2 size={16} />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className={styles.circleActionBtn}
              aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>

        <div className={styles.billboardRightEdge}>
          <span className={styles.scopeBadge}>{activeShot.aspectRatio || "2.39:1 Scope"}</span>
          <span className={styles.archivalMasterTag}>MASTER PRINT</span>
        </div>
      </section>

      <nav id="hub-navigation" className={styles.tabsNav} aria-label="Project Navigation Tabs">
        <div className={styles.tabsWrapper}>
          <button
            type="button"
            onClick={() => {
              cinematicAudioHaptics.playTactileClick();
              setActiveTab("episodes");
            }}
            className={`${styles.tabItem} ${activeTab === "episodes" ? styles.tabActive : ""}`}
          >
            <span>Scenes &amp; Stills</span>
          </button>

          <button
            type="button"
            onClick={() => {
              cinematicAudioHaptics.playTactileClick();
              setActiveTab("specs");
            }}
            className={`${styles.tabItem} ${activeTab === "specs" ? styles.tabActive : ""}`}
          >
            <span>Technical Specs &amp; Gear</span>
          </button>

          <button
            type="button"
            onClick={() => {
              cinematicAudioHaptics.playTactileClick();
              setActiveTab("similar");
            }}
            className={`${styles.tabItem} ${activeTab === "similar" ? styles.tabActive : ""}`}
          >
            <span>More Like This</span>
          </button>

          <button
            type="button"
            onClick={() => {
              cinematicAudioHaptics.playTactileClick();
              setActiveTab("details");
            }}
            className={`${styles.tabItem} ${activeTab === "details" ? styles.tabActive : ""}`}
          >
            <span>About {activeShot.title}</span>
          </button>
        </div>
      </nav>

      <main className={styles.hubContainer}>
        {activeTab === "episodes" && (
          <section className={styles.tabSection} aria-label="Scenes & Stills">
            <div className={styles.sectionHeadingRow}>
              <div>
                <h2 className={styles.tabTitle}>Scenes &amp; Production Chapters</h2>
                <p className={styles.tabSubtitle}>
                  Key sequences captured on 35mm optical glass. Click any scene to inspect in full cinema frame.
                </p>
              </div>
              <span className={styles.episodesTotalBadge}>{episodeScenes.length} Sequences</span>
            </div>

            <div className={styles.episodesList}>
              {episodeScenes.map((scene) => (
                <article
                  key={scene.id}
                  className={styles.episodeCard}
                  onClick={() => handlePlayScene(scene)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handlePlayScene(scene);
                  }}
                  aria-label={`Open sequence ${scene.episodeNum}: ${scene.title}`}
                >
                  <div className={styles.episodeIndexBox}>
                    <span className={styles.episodeNumber}>{scene.episodeNum}</span>
                  </div>

                  <div className={styles.episodeThumbWrapper}>
                    <Image
                      src={scene.imageUrl}
                      alt={scene.title}
                      fill
                      className={styles.episodeImg}
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                    <div className={styles.thumbHoverOverlay}>
                      <div className={styles.playIconCircle}>
                        <Play size={18} fill="#ffffff" color="#ffffff" />
                      </div>
                    </div>
                    <span className={styles.durationPill}>{scene.duration}</span>
                  </div>

                  <div className={styles.episodeInfo}>
                    <div className={styles.episodeTitleRow}>
                      <h3 className={styles.episodeTitle}>{scene.title}</h3>
                      <span className={styles.episodeDurationRight}>{scene.duration}</span>
                    </div>
                    <p className={styles.episodeDescription}>{scene.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "specs" && (
          <section className={styles.tabSection} aria-label="Technical Specifications">
            <div className={styles.sectionHeadingRow}>
              <div>
                <h2 className={styles.tabTitle}>Camera Rig &amp; Technical Discipline</h2>
                <p className={styles.tabSubtitle}>
                  Hardware specifications, optical glass characteristics, acoustic capture, and color science pipeline.
                </p>
              </div>
            </div>

            <div className={styles.specsCardsGrid}>
              {specs.camera && (
                <div className={styles.specCard}>
                  <div className={styles.specIconBox}>
                    <Camera size={18} />
                  </div>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Camera Body</span>
                    <h3 className={styles.specValue}>{specs.camera}</h3>
                    <p className={styles.specNote}>
                      Large-format 4.5K sensor capturing uncompressed ARRIRAW with exceptional highlight latitude.
                    </p>
                  </div>
                </div>
              )}

              {specs.lenses && (
                <div className={styles.specCard}>
                  <div className={styles.specIconBox}>
                    <Film size={18} />
                  </div>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Optics &amp; Primes</span>
                    <h3 className={styles.specValue}>{specs.lenses}</h3>
                    <p className={styles.specNote}>
                      True 2x anamorphic squeeze with organic horizontal flare rendering and distinctive field curvature.
                    </p>
                  </div>
                </div>
              )}

              {specs.audio && (
                <div className={styles.specCard}>
                  <div className={styles.specIconBox}>
                    <Volume2 size={18} />
                  </div>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Audio Architecture</span>
                    <h3 className={styles.specValue}>{specs.audio}</h3>
                    <p className={styles.specNote}>
                      Concurrent spatial room capture with hydrophones and modular tape processing for physical acoustic presence.
                    </p>
                  </div>
                </div>
              )}

              {specs.aspectRatio && (
                <div className={styles.specCard}>
                  <div className={styles.specIconBox}>
                    <Maximize2 size={18} />
                  </div>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Aspect Ratio</span>
                    <h3 className={styles.specValue}>{specs.aspectRatio}</h3>
                    <p className={styles.specNote}>
                      Widescreen scope framing engineered for theatrical immersion and deliberate horizontal pacing.
                    </p>
                  </div>
                </div>
              )}

              {specs.filmStock && (
                <div className={styles.specCard}>
                  <div className={styles.specIconBox}>
                    <Sparkles size={18} />
                  </div>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Emulsion &amp; Stock</span>
                    <h3 className={styles.specValue}>{specs.filmStock}</h3>
                    <p className={styles.specNote}>
                      Photochemical color saturation with velvety dark tones and physical celluloid grain structure.
                    </p>
                  </div>
                </div>
              )}

              {specs.colorGrade && (
                <div className={styles.specCard}>
                  <div className={styles.specIconBox}>
                    <Film size={18} />
                  </div>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Color Pipeline</span>
                    <h3 className={styles.specValue}>{specs.colorGrade}</h3>
                    <p className={styles.specNote}>
                      Custom ACEScg display-referred workflow ensuring deep noir shadow retention and specular rolloff.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "similar" && (
          <section className={styles.tabSection} aria-label="More Like This">
            <div className={styles.sectionHeadingRow}>
              <div>
                <h2 className={styles.tabTitle}>More Like This</h2>
                <p className={styles.tabSubtitle}>
                  Selected narrative films, optical commercials, and sound design works from the studio archive.
                </p>
              </div>
            </div>

            <div className={styles.similarGrid}>
              {similarProjects.map((proj, idx) => (
                <article
                  key={proj.id}
                  className={styles.similarCard}
                  onClick={() => {
                    cinematicAudioHaptics.playTactileClick();
                    router.push(`/projects/${proj.id}`);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      router.push(`/projects/${proj.id}`);
                    }
                  }}
                  aria-label={`Explore ${proj.title}`}
                >
                  <div className={styles.similarThumbWrap}>
                    <Image
                      src={proj.coverImageUrl || proj.heroImageUrl || proj.imageUrl}
                      alt={proj.title}
                      fill
                      className={styles.similarImg}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={styles.similarOverlay} />
                    <span className={styles.matchScoreSmall}>DIRECTOR’S SELECTION</span>
                    <span className={styles.similarDurationBadge}>{proj.duration || "12m"}</span>
                  </div>

                  <div className={styles.similarBody}>
                    <div className={styles.similarMetaRow}>
                      <span className={styles.similarCategory}>{proj.category}</span>
                      <span className={styles.similarMaturity}>35MM</span>
                      <span className={styles.similarYear}>{proj.date || "2024"}</span>
                    </div>

                    <h3 className={styles.similarTitle}>{proj.title}</h3>
                    <p className={styles.similarDesc}>{proj.description}</p>

                    <div className={styles.similarBottomRow}>
                      <span className={styles.viewStudyAction}>
                        <span>Explore Case Study</span>
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "details" && (
          <section className={styles.tabSection} aria-label={`About ${activeShot.title}`}>
            <div className={styles.sectionHeadingRow}>
              <div>
                <h2 className={styles.tabTitle}>About {activeShot.title}</h2>
                <p className={styles.tabSubtitle}>
                  Production details, creative direction, creative team, and collaboration booking.
                </p>
              </div>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailsMetaCard}>
                <div className={styles.detailsRow}>
                  <span className={styles.detailLabel}>Director:</span>
                  <span className={styles.detailVal}>{activeShot.director || "Rishabh Naik"}</span>
                </div>

                <div className={styles.detailsRow}>
                  <span className={styles.detailLabel}>Cinematography:</span>
                  <span className={styles.detailVal}>{activeShot.cinematographer || "Rishabh Naik"}</span>
                </div>

                <div className={styles.detailsRow}>
                  <span className={styles.detailLabel}>Sound Design &amp; Score:</span>
                  <span className={styles.detailVal}>Rishabh Naik</span>
                </div>

                <div className={styles.detailsRow}>
                  <span className={styles.detailLabel}>Production Category:</span>
                  <span className={styles.detailVal}>{activeShot.category}</span>
                </div>

                <div className={styles.detailsRow}>
                  <span className={styles.detailLabel}>Release Date:</span>
                  <span className={styles.detailVal}>{activeShot.date}</span>
                </div>

                <div className={styles.detailsRow}>
                  <span className={styles.detailLabel}>Filming Location:</span>
                  <span className={styles.detailVal}>{activeShot.location || "Studio Soundstage"}</span>
                </div>

                <div className={styles.detailsRow}>
                  <span className={styles.detailLabel}>Maturity Rating:</span>
                  <span className={styles.detailVal}>
                    <span className={styles.maturityBox}>16+</span> Recommended for mature audiences. Atmospheric tension and sensory light design.
                  </span>
                </div>

                <div className={styles.detailsRow}>
                  <span className={styles.detailLabel}>This Film Is:</span>
                  <span className={styles.detailVal}>Atmospheric, Tactile, High-Contrast, Psychological, Cinematic Noir</span>
                </div>
              </div>

              <div className={styles.detailsBookCard}>
                <div className={styles.bookCardInner}>
                  <span className={styles.bookBadge}>Studio Direct</span>
                  <h3 className={styles.bookTitle}>Interested in commissioning similar cinematography or directing?</h3>
                  <p className={styles.bookText}>
                    Available worldwide for narrative films, commercial direction, analog 35mm optical experiments, and modular sound design.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      cinematicAudioHaptics.playTactileClick();
                      openContactModal();
                    }}
                    className={styles.inquireBookBtn}
                  >
                    <Sparkles size={16} />
                    <span>Inquire / Book Collaboration</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

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
