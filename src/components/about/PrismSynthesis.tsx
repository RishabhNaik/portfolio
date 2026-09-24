"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Sparkles, Eye, CheckCircle2 } from "lucide-react";
import styles from "./PrismSynthesis.module.css";

export interface DisciplineBeam {
  id: string;
  name: string;
  category: string;
  color: string;
  secondaryColor: string;
  wavelength: string;
  description: string;
  tools: string[];
  impact: string;
}

export const DISCIPLINES: DisciplineBeam[] = [
  {
    id: "filmmaking",
    name: "Filmmaking & Directing",
    category: "Narrative & Vision",
    color: "#ff3b30",
    secondaryColor: "#ff6961",
    wavelength: "680 nm (Crimson)",
    description:
      "Orchestrating narrative rhythm, performance, and cinematic composition from initial concept to final master print.",
    tools: ["Arri Alexa", "Cooke Anamorphics", "Narrative Blocking", "Script Supervision"],
    impact: "Provides the emotional heartbeat and human resonance of the story.",
  },
  {
    id: "photography",
    name: "Photography & Composition",
    category: "Optics & Framing",
    color: "#ff9500",
    secondaryColor: "#ffb340",
    wavelength: "605 nm (Amber)",
    description:
      "Capturing decisive moments, organic textures, and high-contrast atmospheric framing on 35mm analog & medium format.",
    tools: ["Leica M", "Hasselblad", "Darkroom Silver Printing", "Natural Light Rigs"],
    impact: "Anchors every frame in timeless photographic composition and analog grain.",
  },
  {
    id: "art-direction",
    name: "Art Direction & Lighting",
    category: "Volumetric Space",
    color: "#ffd60a",
    secondaryColor: "#ffe666",
    wavelength: "575 nm (Gold)",
    description:
      "Sculpting tactile physical spaces, volumetric haze diffusion, and custom optical prism rigs for tangible authenticity.",
    tools: ["Tungsten Fresnels", "Volumetric Haze", "Tactile Prop Fabrication", "Physical Glass"],
    impact: "Constructs a tactile physical universe you can feel through the screen.",
  },
  {
    id: "sound",
    name: "Sound Design & Foley",
    category: "Sonic Architecture",
    color: "#30d158",
    secondaryColor: "#6be288",
    wavelength: "525 nm (Emerald)",
    description:
      "Engineering immersive spatial Foley, custom analog modular synth textures, and visceral tape-saturated soundscapes.",
    tools: ["Sennheiser MKH 416", "Modular Synthesizers", "Reel-to-Reel Tape", "Spatial Mixing"],
    impact: "Infuses unseen physical weight, spatial scale, and visceral tension.",
  },
  {
    id: "editing",
    name: "Editing & Temporal Pacing",
    category: "Temporal Flow",
    color: "#00e5ff",
    secondaryColor: "#66f0ff",
    wavelength: "480 nm (Electric Cyan)",
    description:
      "Sculpting the cadence of time, micro-tension between cuts, and seamless rhythm bridging sound with picture.",
    tools: ["DaVinci Resolve", "ACEScg Color Timing", "Subconscious Pacing", "Match Cuts"],
    impact: "Transforms individual stills into an irresistible, kinetic journey.",
  },
  {
    id: "graphic-design",
    name: "Graphic Design & Identity",
    category: "Visual Architecture",
    color: "#bf5af2",
    secondaryColor: "#d68cf7",
    wavelength: "410 nm (Violet)",
    description:
      "Designing bespoke typography, title cards, editorial books, and tactile print packaging that accompany the film.",
    tools: ["Bespoke Typography", "Grid Systems", "Print Production", "Key Visual Systems"],
    impact: "Crystallizes the project's external identity into a memorable artifact.",
  },
];

interface Photon {
  x: number;
  y: number;
  progress: number;
  speed: number;
  colorIndex: number;
  isWhite: boolean;
  size: number;
  opacity: number;
}

export const PrismSynthesis: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeDiscipline, setActiveDiscipline] = useState<string | null>(null);
  const [isFullSynthesis, setIsFullSynthesis] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeIndex = DISCIPLINES.findIndex((d) => d.id === activeDiscipline);

  // Mouse move handler for interactive optical parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: nx, y: ny });
  }, []);

  // Main Canvas Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      width = rect.width;
      height = Math.max(380, Math.min(520, rect.width * 0.44));

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Photon particle system
    const photons: Photon[] = [];
    for (let i = 0; i < 48; i++) {
      photons.push({
        x: 0,
        y: 0,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        colorIndex: Math.floor(Math.random() * DISCIPLINES.length),
        isWhite: Math.random() > 0.45,
        size: 1.5 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.6,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Prism geometry (Centered in canvas, slightly left to allow white beam room to shine)
      const prismCenterX = width * 0.46 + mousePos.x * 24;
      const prismCenterY = height * 0.5 + mousePos.y * 18;
      const prismSize = Math.min(130, width * 0.16);

      // Triangular Prism Vertices (Apex pointing up)
      const pTop = { x: prismCenterX, y: prismCenterY - prismSize * 0.95 };
      const pLeft = { x: prismCenterX - prismSize * 0.85, y: prismCenterY + prismSize * 0.75 };
      const pRight = { x: prismCenterX + prismSize * 0.85, y: prismCenterY + prismSize * 0.75 };

      // Convergence focal point on the right face where all refracted rays merge
      const focalX = prismCenterX + prismSize * 0.42;
      const focalY = prismCenterY + 4;

      // 1. Draw Incoming Colored Rays (from left to prism left face)
      const leftMargin = Math.max(20, width * 0.04);
      const beamCount = DISCIPLINES.length;

      const beamHitPoints: { inX: number; inY: number; hitX: number; hitY: number }[] = [];

      for (let i = 0; i < beamCount; i++) {
        const d = DISCIPLINES[i];
        const isSelected = activeDiscipline === d.id;
        const isDimmed = activeDiscipline !== null && !isSelected;

        // Spread incoming rays along left edge
        const inX = leftMargin;
        const inY = height * 0.22 + (i / (beamCount - 1)) * (height * 0.56);

        // Calculate entry point along the prism's left facet (pTop to pLeft)
        const t = 0.22 + (i / (beamCount - 1)) * 0.62;
        const hitX = pTop.x + (pLeft.x - pTop.x) * t;
        const hitY = pTop.y + (pLeft.y - pTop.y) * t;

        beamHitPoints.push({ inX, inY, hitX, hitY });

        // Ray Opacity & Glow
        const rayAlpha = isSelected ? 1 : isDimmed ? 0.2 : 0.85;
        const glowWidth = isSelected ? 8 : 4;

        // Outer chromatic glow
        ctx.beginPath();
        ctx.moveTo(inX, inY);
        ctx.lineTo(hitX, hitY);
        ctx.strokeStyle = d.color;
        ctx.lineWidth = glowWidth;
        ctx.globalAlpha = rayAlpha * 0.35;
        ctx.shadowColor = d.color;
        ctx.shadowBlur = isSelected ? 20 : 10;
        ctx.stroke();

        // Core bright ray
        ctx.beginPath();
        ctx.moveTo(inX, inY);
        ctx.lineTo(hitX, hitY);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.globalAlpha = rayAlpha;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Ray entry node
        ctx.beginPath();
        ctx.arc(hitX, hitY, isSelected ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = rayAlpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // 2. Draw Internal Refracted Rays (from left facet to focal convergence point)
      for (let i = 0; i < beamCount; i++) {
        const d = DISCIPLINES[i];
        const isSelected = activeDiscipline === d.id;
        const isDimmed = activeDiscipline !== null && !isSelected;
        const pt = beamHitPoints[i];

        ctx.beginPath();
        ctx.moveTo(pt.hitX, pt.hitY);
        ctx.lineTo(focalX, focalY);
        ctx.strokeStyle = d.color;
        ctx.lineWidth = isSelected ? 2.8 : 1.6;
        ctx.globalAlpha = isSelected ? 0.95 : isDimmed ? 0.15 : 0.65;
        ctx.shadowColor = d.color;
        ctx.shadowBlur = 12;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // 3. Draw The Glass Prism Body with Volumetric Refraction & Caustics
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pTop.x, pTop.y);
      ctx.lineTo(pLeft.x, pLeft.y);
      ctx.lineTo(pRight.x, pRight.y);
      ctx.closePath();

      // Translucent Glass Body Gradient
      const prismGrad = ctx.createLinearGradient(pTop.x, pTop.y, prismCenterX, prismCenterY + prismSize);
      prismGrad.addColorStop(0, "rgba(255, 255, 255, 0.16)");
      prismGrad.addColorStop(0.35, "rgba(0, 229, 255, 0.08)");
      prismGrad.addColorStop(0.7, "rgba(191, 90, 242, 0.08)");
      prismGrad.addColorStop(1, "rgba(255, 59, 48, 0.12)");
      ctx.fillStyle = prismGrad;
      ctx.fill();

      // Glass Bevel Borders
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      ctx.shadowColor = "rgba(0, 229, 255, 0.4)";
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Internal Caustic Core Glow at Focal Point
      const corePulse = 1 + Math.sin(time * 3) * 0.12;
      const coreGrad = ctx.createRadialGradient(
        focalX, focalY, 0,
        focalX, focalY, 28 * corePulse
      );
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
      coreGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      coreGrad.addColorStop(0.6, "rgba(0, 229, 255, 0.5)");
      coreGrad.addColorStop(0.85, "rgba(255, 59, 48, 0.25)");
      coreGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.arc(focalX, focalY, 28 * corePulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      ctx.restore();

      // 4. Draw Emergent Pure White Beam of Light (Synthesized Output!)
      // From focal convergence point radiating outward to the right edge
      const exitRightX = width + 20;
      const exitSpread = height * 0.38;
      const exitTopY = focalY - exitSpread * 0.48;
      const exitBottomY = focalY + exitSpread * 0.52;

      // Volumetric White Cone
      const whiteConeGrad = ctx.createLinearGradient(focalX, focalY, exitRightX, focalY);
      whiteConeGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      whiteConeGrad.addColorStop(0.18, "rgba(255, 255, 255, 0.7)");
      whiteConeGrad.addColorStop(0.6, "rgba(255, 255, 255, 0.28)");
      whiteConeGrad.addColorStop(1, "rgba(255, 255, 255, 0.04)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(focalX, focalY);
      ctx.lineTo(exitRightX, exitTopY);
      ctx.lineTo(exitRightX, exitBottomY);
      ctx.closePath();
      ctx.fillStyle = whiteConeGrad;
      ctx.fill();

      // Core Brilliant White Laser Ray
      ctx.beginPath();
      ctx.moveTo(focalX, focalY);
      ctx.lineTo(exitRightX, focalY);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3.5;
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 24;
      ctx.stroke();

      // Secondary Chromatic Fringe along the borders of the white cone
      // Top fringe (violet/cyan tint)
      ctx.beginPath();
      ctx.moveTo(focalX, focalY);
      ctx.lineTo(exitRightX, exitTopY);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.55)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(0, 229, 255, 0.8)";
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Bottom fringe (amber/red tint)
      ctx.beginPath();
      ctx.moveTo(focalX, focalY);
      ctx.lineTo(exitRightX, exitBottomY);
      ctx.strokeStyle = "rgba(255, 90, 60, 0.55)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(255, 90, 60, 0.8)";
      ctx.shadowBlur = 12;
      ctx.stroke();

      ctx.restore();

      // 5. Render Flying Photons along the Beams
      for (const p of photons) {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        if (!p.isWhite) {
          // Colored photon flying along one of the incoming rays
          const ray = beamHitPoints[p.colorIndex % beamCount];
          if (ray) {
            const px = ray.inX + (ray.hitX - ray.inX) * p.progress;
            const py = ray.inY + (ray.hitY - ray.inY) * p.progress;
            const d = DISCIPLINES[p.colorIndex % beamCount];

            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fillStyle = d.color;
            ctx.globalAlpha = p.opacity;
            ctx.shadowColor = d.color;
            ctx.shadowBlur = 8;
            ctx.fill();
          }
        } else {
          // White photon flying outward along the synthesized white beam
          const px = focalX + (exitRightX - focalX) * p.progress;
          const spreadFactor = p.progress;
          const py = focalY + (Math.sin(p.progress * 8 + p.size) * exitSpread * 0.42 * spreadFactor);

          ctx.beginPath();
          ctx.arc(px, py, p.size * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = p.opacity * 0.9;
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 10;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [activeDiscipline, mousePos]);

  return (
    <div
      ref={containerRef}
      className={styles.synthesisWrapper}
      onMouseMove={handleMouseMove}
      aria-label="Interactive Optical Prism Synthesis Experience"
    >
      {/* Top Narrative Anchor */}
      <div className={styles.stageHeader}>
        <h2 className={styles.stageTitle}>
          Individual Colors Converge into <span className={styles.whiteHighlight}>Pure White Light</span>
        </h2>
        <p className={styles.stageSubtitle}>
          In isolation, cinematography, sound, photography, and graphic design are separate wavelengths.
          Passing through the prism of craft, every discipline synthesizes into a single, cohesive cinematic vision.
        </p>
      </div>

      {/* Main Interactive Optical Prism Stage */}
      <div className={styles.stageCanvasContainer}>
        <canvas ref={canvasRef} className={styles.synthesisCanvas} />

        {/* Floating Interactive Discipline Tags on the Left Input Beams */}
        <div className={styles.inputBeamsOverlay}>
          {DISCIPLINES.map((discipline, idx) => {
            const isSelected = activeDiscipline === discipline.id;
            return (
              <button
                key={discipline.id}
                type="button"
                className={`${styles.beamPill} ${isSelected ? styles.beamPillActive : ""}`}
                style={{
                  "--discipline-color": discipline.color,
                } as React.CSSProperties}
                onMouseEnter={() => setActiveDiscipline(discipline.id)}
                onMouseLeave={() => setActiveDiscipline(null)}
                onClick={() =>
                  setActiveDiscipline((prev) => (prev === discipline.id ? null : discipline.id))
                }
              >
                <span className={styles.beamName}>{discipline.name}</span>
                <span className={styles.beamWave}>{discipline.wavelength}</span>
              </button>
            );
          })}
        </div>

        {/* Luminous Output Callout on the Right White Beam */}
        <div className={styles.outputBeamOverlay}>
          <div className={styles.whiteBeamCard}>
            <h3 className={styles.whiteBeamTitle}>Pure White Light</h3>
            <p className={styles.whiteBeamDesc}>
              Complete ownership across the entire pipeline — from script to sound design, grading, and final artifact.
            </p>
            <div className={styles.whiteBeamAuthor}>Rishabh Naik</div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Discipline Cards Grid */}
      <div className={styles.disciplinesExplorer}>
        <div className={styles.explorerHeader}>
          <h3 className={styles.explorerTitle}>The Six Spectral Wavelengths</h3>
          <p className={styles.explorerSub}>
            Hover or click any wavelength to trace its refraction into the prism.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {DISCIPLINES.map((d, index) => {
            const isSelected = activeDiscipline === d.id;
            return (
              <div
                key={d.id}
                className={`${styles.disciplineCard} ${isSelected ? styles.cardActive : ""}`}
                style={{
                  "--card-color": d.color,
                } as React.CSSProperties}
                onMouseEnter={() => setActiveDiscipline(d.id)}
                onMouseLeave={() => setActiveDiscipline(null)}
                onClick={() =>
                  setActiveDiscipline((prev) => (prev === d.id ? null : d.id))
                }
                role="button"
                tabIndex={0}
              >
                <div className={styles.cardTopRow}>
                  <div className={styles.cardWavelengthBadge}>
                    <span
                      className={styles.colorIndicator}
                      style={{ background: d.color }}
                    />
                    <span>{d.wavelength}</span>
                  </div>
                  <span className={styles.cardNumber}>0{index + 1}</span>
                </div>

                <div className={styles.cardCategory}>{d.category}</div>
                <h4 className={styles.cardName}>{d.name}</h4>
                <p className={styles.cardDescription}>{d.description}</p>

                {/* Craft Tools */}
                <div className={styles.toolsRow}>
                  {d.tools.map((tool) => (
                    <span key={tool} className={styles.toolChip}>
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Synthesis Contribution */}
                <div className={styles.impactFooter}>
                  <span className={styles.impactLabel}>Synthesis Contribution:</span>
                  <p className={styles.impactText}>{d.impact}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
