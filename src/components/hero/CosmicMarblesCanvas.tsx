"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { BTSShot } from "@/types/project";
import styles from "./CosmicMarblesCanvas.module.css";

interface CosmicMarblesCanvasProps {
  projects: BTSShot[];
  activeShot: BTSShot;
  onSelectShot: (shot: BTSShot) => void;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
}

interface CosmicNebula {
  xRatio: number;
  yRatio: number;
  radiusRatio: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
}

type Vec3 = [number, number, number];

interface CrystalGeometry {
  vertices: Vec3[];
  faces: number[][]; // Indices into vertices
}

interface Crystal {
  id: string;
  projectIndex: number | null;
  title: string;
  category: string;
  // Position & Velocity
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number; // Different weight & inertia for each crystal
  baseRadius: number;
  radius: number;
  currentScale: number;
  targetScale: number;
  // 3D Geometry
  geometry: CrystalGeometry;
  // 3D Tumbling Rotation & Speeds
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  // Sparkle / Glint phase
  sparklePhase: number;
  sparkleSpeed: number;
  // Palette Colors
  colors: {
    baseHex: string;
    core: string;
    shadow: string;
    highlight: string;
    edge: string;
    glow: string;
    sparkle: string;
  };
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  progress: number;
  color: string;
}

// =========================================================
// 3D CRYSTAL GEOMETRIES (Faceted Gemstones & Quartz Shards)
// =========================================================

// Geometry A: Hexagonal Bipyramidal Quartz (Classic 12-facet double prism)
function createHexagonalQuartzGeometry(): CrystalGeometry {
  const vertices: Vec3[] = [
    [0, -1.45, 0], // Top Apex (0)
  ];
  // 6 equatorial vertices (1..6)
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    vertices.push([Math.cos(a) * 0.95, 0, Math.sin(a) * 0.95]);
  }
  vertices.push([0, 1.45, 0]); // Bottom Apex (7)

  const faces: number[][] = [];
  // Top 6 pyramids
  for (let i = 1; i <= 6; i++) {
    const next = i === 6 ? 1 : i + 1;
    faces.push([0, i, next]);
  }
  // Bottom 6 pyramids
  for (let i = 1; i <= 6; i++) {
    const next = i === 6 ? 1 : i + 1;
    faces.push([7, next, i]);
  }

  return { vertices, faces };
}

// Geometry B: Octahedral Gemstone (Sharp 8-facet double pyramid)
function createOctahedralGeometry(): CrystalGeometry {
  const vertices: Vec3[] = [
    [0, -1.25, 0], // Top (0)
    [1.0, 0, 0], // Right (1)
    [0, 0, 1.0], // Front (2)
    [-1.0, 0, 0], // Left (3)
    [0, 0, -1.0], // Back (4)
    [0, 1.25, 0], // Bottom (5)
  ];

  const faces: number[][] = [
    // Top 4 faces
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 1],
    // Bottom 4 faces
    [5, 2, 1],
    [5, 3, 2],
    [5, 4, 3],
    [5, 1, 4],
  ];

  return { vertices, faces };
}

// Geometry C: Brilliant Diamond Cut (Multi-faceted table, crown and pavilion)
function createBrilliantCutGeometry(): CrystalGeometry {
  const vertices: Vec3[] = [];

  // Top Table Facet (0..3)
  const tableRadius = 0.55;
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2 + Math.PI / 4;
    vertices.push([Math.cos(a) * tableRadius, -0.9, Math.sin(a) * tableRadius]);
  }

  // Girdle (4..11 - 8 vertices)
  const girdleRadius = 1.05;
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    vertices.push([Math.cos(a) * girdleRadius, -0.15, Math.sin(a) * girdleRadius]);
  }

  // Bottom Culet Tip (12)
  vertices.push([0, 1.35, 0]);

  const faces: number[][] = [
    // Table (0..3)
    [0, 1, 2, 3],
    // Crown triangles & trapezoids
    [0, 4, 5],
    [0, 5, 1],
    [1, 6, 7],
    [1, 7, 2],
    [2, 8, 9],
    [2, 9, 3],
    [3, 10, 11],
    [3, 11, 0],
    // Pavilion facets to culet
    [12, 5, 4],
    [12, 6, 5],
    [12, 7, 6],
    [12, 8, 7],
    [12, 9, 8],
    [12, 10, 9],
    [12, 11, 10],
    [12, 4, 11],
  ];

  return { vertices, faces };
}

// Geometry D: Asymmetric Elongated Needle Shard
function createNeedleShardGeometry(): CrystalGeometry {
  const vertices: Vec3[] = [
    [0, -1.8, 0], // Top sharp point (0)
    [0.45, -0.4, 0.35], // 1
    [-0.35, -0.2, 0.45], // 2
    [-0.45, -0.3, -0.35], // 3
    [0.35, -0.2, -0.45], // 4
    [0.55, 0.6, 0.25], // 5
    [-0.25, 0.8, 0.35], // 6
    [-0.35, 0.7, -0.25], // 7
    [0.25, 0.8, -0.35], // 8
    [0, 1.9, 0], // Bottom point (9)
  ];

  const faces: number[][] = [
    // Top pyramid facets
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 1],
    // Mid body quads
    [1, 5, 6, 2],
    [2, 6, 7, 3],
    [3, 7, 8, 4],
    [4, 8, 5, 1],
    // Bottom pyramid facets
    [9, 6, 5],
    [9, 7, 6],
    [9, 8, 7],
    [9, 5, 8],
  ];

  return { vertices, faces };
}

export const CosmicMarblesCanvas: React.FC<CosmicMarblesCanvasProps> = ({
  projects,
  activeShot,
  onSelectShot,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starCanvasRef = useRef<HTMLCanvasElement>(null);
  const marblesCanvasRef = useRef<HTMLCanvasElement>(null);

  const [hoveredCrystal, setHoveredCrystal] = useState<Crystal | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const mousePosRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -9999,
    y: -9999,
    isInside: false,
  });

  const starsRef = useRef<Star[]>([]);
  const nebulasRef = useRef<CosmicNebula[]>([]);
  const crystalsRef = useRef<Crystal[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);

  // Initialize background starfield & cosmic nebulae (soft blurred)
  const initCosmos = useCallback((width: number, height: number) => {
    const starPalette = ["#FFFFFF", "#E1ECFB", "#D4E7FD", "#B4C9D4", "#95CFF1", "#67A1EB"];
    const stars: Star[] = [];
    const count = Math.min(220, Math.floor((width * height) / 4800));

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.65 + 0.25,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: starPalette[Math.floor(Math.random() * starPalette.length)],
      });
    }
    starsRef.current = stars;

    nebulasRef.current = [
      {
        xRatio: 0.2,
        yRatio: 0.3,
        radiusRatio: 0.45,
        color: "rgba(19, 56, 101, 0.35)", // #133865 deep navy
        pulsePhase: 0,
        pulseSpeed: 0.008,
      },
      {
        xRatio: 0.8,
        yRatio: 0.25,
        radiusRatio: 0.5,
        color: "rgba(25, 121, 209, 0.22)", // #1979D1 electric cobalt
        pulsePhase: 1.8,
        pulseSpeed: 0.01,
      },
      {
        xRatio: 0.55,
        yRatio: 0.7,
        radiusRatio: 0.55,
        color: "rgba(81, 171, 219, 0.18)", // #51ABDB cerulean
        pulsePhase: 3.2,
        pulseSpeed: 0.009,
      },
      {
        xRatio: 0.15,
        yRatio: 0.85,
        radiusRatio: 0.4,
        color: "rgba(8, 28, 39, 0.4)", // #081C27 abyssal
        pulsePhase: 4.5,
        pulseSpeed: 0.007,
      },
    ];
  }, []);

  // Initialize Shining Crystals with Distinct Weights & Physics
  const initCrystals = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const scale = isMobile ? 0.78 : 1.0;

    const list: Omit<Crystal, "x" | "y" | "vx" | "vy" | "radius" | "currentScale" | "targetScale" | "rotX" | "rotY" | "rotZ" | "sparklePhase">[] = [
      // 1. Heavy Electric Cobalt Octahedron (Major work)
      {
        id: "crystal-cobalt-hero",
        projectIndex: 0,
        title: projects[0]?.title || "Chroma Horizon",
        category: projects[0]?.category || "35mm Cinematography",
        mass: 3.4, // Heavy weight -> slower inertia, powerful presence
        baseRadius: 46 * scale,
        geometry: createOctahedralGeometry(),
        rotSpeedX: 0.009,
        rotSpeedY: 0.014,
        rotSpeedZ: 0.007,
        sparkleSpeed: 0.024,
        colors: {
          baseHex: "#1979D1",
          core: "rgba(25, 121, 209, 0.75)",
          shadow: "rgba(6, 52, 94, 0.85)",
          highlight: "rgba(144, 194, 251, 0.95)",
          edge: "rgba(212, 231, 253, 0.85)",
          glow: "rgba(25, 121, 209, 0.45)",
          sparkle: "#FFFFFF",
        },
      },
      // 2. Dense Deep Sapphire Hexagonal Quartz (Heavy pillar)
      {
        id: "crystal-sapphire-quartz",
        projectIndex: 1,
        title: projects[1]?.title || "Cathedral of Silence",
        category: projects[1]?.category || "Architectural Soundscape",
        mass: 4.0, // Very heavy
        baseRadius: 42 * scale,
        geometry: createHexagonalQuartzGeometry(),
        rotSpeedX: 0.006,
        rotSpeedY: 0.009,
        rotSpeedZ: 0.004,
        sparkleSpeed: 0.018,
        colors: {
          baseHex: "#133865",
          core: "rgba(19, 56, 101, 0.8)",
          shadow: "rgba(1, 20, 43, 0.9)",
          highlight: "rgba(103, 161, 235, 0.92)",
          edge: "rgba(225, 236, 251, 0.8)",
          glow: "rgba(19, 56, 101, 0.5)",
          sparkle: "#E1ECFB",
        },
      },
      // 3. Medium Luminous Cerulean Brilliant Gem (Balanced agility)
      {
        id: "crystal-cerulean-brilliant",
        projectIndex: 2,
        title: projects[2]?.title || "Abyssal Transmission",
        category: projects[2]?.category || "Underwater Macro Lens",
        mass: 2.2, // Medium weight
        baseRadius: 36 * scale,
        geometry: createBrilliantCutGeometry(),
        rotSpeedX: 0.016,
        rotSpeedY: 0.022,
        rotSpeedZ: 0.011,
        sparkleSpeed: 0.032,
        colors: {
          baseHex: "#51ABDB",
          core: "rgba(81, 171, 219, 0.72)",
          shadow: "rgba(44, 99, 128, 0.85)",
          highlight: "rgba(223, 240, 250, 0.95)",
          edge: "rgba(255, 255, 255, 0.9)",
          glow: "rgba(81, 171, 219, 0.45)",
          sparkle: "#FFFFFF",
        },
      },
      // 4. Nimble Mist Pearl Diamond Prism (Light weight, fast glints)
      {
        id: "crystal-mist-prism",
        projectIndex: 3,
        title: projects[3]?.title || "Prismatic Form",
        category: projects[3]?.category || "Light Installation",
        mass: 1.4, // Light weight -> energetic, reactive
        baseRadius: 32 * scale,
        geometry: createOctahedralGeometry(),
        rotSpeedX: 0.02,
        rotSpeedY: 0.028,
        rotSpeedZ: 0.015,
        sparkleSpeed: 0.04,
        colors: {
          baseHex: "#B4C9D4",
          core: "rgba(180, 201, 212, 0.7)",
          shadow: "rgba(79, 95, 103, 0.8)",
          highlight: "rgba(255, 255, 255, 0.98)",
          edge: "rgba(255, 255, 255, 0.95)",
          glow: "rgba(180, 201, 212, 0.38)",
          sparkle: "#FFFFFF",
        },
      },
      // 5. Solid Abyssal Needle Shard (Elongated dense mineral)
      {
        id: "crystal-abyssal-needle",
        projectIndex: 4,
        title: projects[4]?.title || "Temporal Distortion",
        category: projects[4]?.category || "Analog Synthesizer",
        mass: 2.8, // Dense shard
        baseRadius: 38 * scale,
        geometry: createNeedleShardGeometry(),
        rotSpeedX: 0.011,
        rotSpeedY: 0.015,
        rotSpeedZ: 0.008,
        sparkleSpeed: 0.022,
        colors: {
          baseHex: "#2C6380",
          core: "rgba(44, 99, 128, 0.78)",
          shadow: "rgba(8, 28, 39, 0.92)",
          highlight: "rgba(149, 207, 241, 0.92)",
          edge: "rgba(180, 201, 212, 0.85)",
          glow: "rgba(44, 99, 128, 0.4)",
          sparkle: "#DFF0FA",
        },
      },
      // Ambient Free-Moving Crystal Shards & Beads
      {
        id: "crystal-shard-light-1",
        projectIndex: null,
        title: "Sky Shard",
        category: "Ambient Crystal",
        mass: 0.8, // Very light -> brisk movement
        baseRadius: 20 * scale,
        geometry: createNeedleShardGeometry(),
        rotSpeedX: 0.025,
        rotSpeedY: 0.035,
        rotSpeedZ: 0.018,
        sparkleSpeed: 0.05,
        colors: {
          baseHex: "#409BF8",
          core: "rgba(64, 155, 248, 0.75)",
          shadow: "rgba(15, 86, 152, 0.85)",
          highlight: "rgba(225, 236, 251, 0.95)",
          edge: "rgba(255, 255, 255, 0.9)",
          glow: "rgba(64, 155, 248, 0.35)",
          sparkle: "#FFFFFF",
        },
      },
      {
        id: "crystal-shard-light-2",
        projectIndex: null,
        title: "Cerulean Fleck",
        category: "Ambient Crystal",
        mass: 0.6, // Featherweight -> fast darts
        baseRadius: 16 * scale,
        geometry: createOctahedralGeometry(),
        rotSpeedX: 0.03,
        rotSpeedY: 0.042,
        rotSpeedZ: 0.024,
        sparkleSpeed: 0.06,
        colors: {
          baseHex: "#51ABDB",
          core: "rgba(81, 171, 219, 0.8)",
          shadow: "rgba(44, 99, 128, 0.85)",
          highlight: "rgba(255, 255, 255, 1.0)",
          edge: "rgba(255, 255, 255, 0.95)",
          glow: "rgba(81, 171, 219, 0.4)",
          sparkle: "#FFFFFF",
        },
      },
      {
        id: "crystal-shard-medium-3",
        projectIndex: null,
        title: "Midnight Shard",
        category: "Ambient Crystal",
        mass: 1.8,
        baseRadius: 24 * scale,
        geometry: createBrilliantCutGeometry(),
        rotSpeedX: 0.014,
        rotSpeedY: 0.02,
        rotSpeedZ: 0.01,
        sparkleSpeed: 0.03,
        colors: {
          baseHex: "#051831",
          core: "rgba(5, 24, 49, 0.82)",
          shadow: "rgba(1, 20, 43, 0.95)",
          highlight: "rgba(81, 171, 219, 0.9)",
          edge: "rgba(180, 201, 212, 0.8)",
          glow: "rgba(19, 56, 101, 0.35)",
          sparkle: "#E1ECFB",
        },
      },
      {
        id: "crystal-shard-light-4",
        projectIndex: null,
        title: "Mist Needle",
        category: "Ambient Crystal",
        mass: 0.7,
        baseRadius: 18 * scale,
        geometry: createNeedleShardGeometry(),
        rotSpeedX: 0.028,
        rotSpeedY: 0.038,
        rotSpeedZ: 0.02,
        sparkleSpeed: 0.055,
        colors: {
          baseHex: "#B4C9D4",
          core: "rgba(180, 201, 212, 0.75)",
          shadow: "rgba(79, 95, 103, 0.85)",
          highlight: "rgba(255, 255, 255, 1.0)",
          edge: "rgba(255, 255, 255, 0.95)",
          glow: "rgba(180, 201, 212, 0.35)",
          sparkle: "#FFFFFF",
        },
      },
    ];

    // Distribute with varied initial positions and physics velocities inversely proportional to mass
    crystalsRef.current = list.map((item, idx) => {
      // Speeds inversely proportional to weight (lighter = faster, heavier = steady momentum)
      const baseSpeed = 1.3 / Math.sqrt(item.mass);
      const angle = Math.random() * Math.PI * 2;
      const speed = baseSpeed * (0.7 + Math.random() * 0.6);

      // Start inside safe margin
      const margin = 80;
      const startX = margin + Math.random() * Math.max(100, width - margin * 2);
      const startY = margin + Math.random() * Math.max(100, height - margin * 2);

      return {
        ...item,
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: item.baseRadius,
        currentScale: 1.0,
        targetScale: 1.0,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        sparklePhase: idx * 1.5,
      };
    });
  }, [projects]);

  // Handle Canvas Resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !starCanvasRef.current || !marblesCanvasRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const w = rect.width;
      const h = rect.height;

      const starC = starCanvasRef.current;
      starC.width = Math.floor(w * dpr);
      starC.height = Math.floor(h * dpr);
      starC.style.width = `${w}px`;
      starC.style.height = `${h}px`;

      const marbleC = marblesCanvasRef.current;
      marbleC.width = Math.floor(w * dpr);
      marbleC.height = Math.floor(h * dpr);
      marbleC.style.width = `${w}px`;
      marbleC.style.height = `${h}px`;

      initCosmos(w, h);
      initCrystals(w, h);
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [initCosmos, initCrystals]);

  // Mouse Interaction Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!marblesCanvasRef.current) return;
    const rect = marblesCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current = { x, y, isInside: true };

    // Check hover against crystals
    let foundHover: Crystal | null = null;
    for (const c of crystalsRef.current) {
      const dx = x - c.x;
      const dy = y - c.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= c.radius + 12) {
        foundHover = c;
        break;
      }
    }

    if (foundHover) {
      setHoveredCrystal(foundHover);
      setTooltipPos({ x: foundHover.x, y: foundHover.y });
    } else {
      setHoveredCrystal(null);
    }
  };

  const handleMouseLeave = () => {
    mousePosRef.current.isInside = false;
    setHoveredCrystal(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!marblesCanvasRef.current) return;
    const rect = marblesCanvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let clicked: Crystal | null = null;
    for (const c of crystalsRef.current) {
      const dx = clickX - c.x;
      const dy = clickY - c.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= c.radius + 14) {
        clicked = c;
        break;
      }
    }

    if (clicked) {
      clicked.targetScale = 1.25;
      // Impart random spin impulse on click
      clicked.rotSpeedX += (Math.random() - 0.5) * 0.05;
      clicked.rotSpeedY += (Math.random() - 0.5) * 0.05;

      shockwavesRef.current.push({
        x: clicked.x,
        y: clicked.y,
        radius: clicked.radius,
        maxRadius: 280,
        progress: 0,
        color: clicked.colors.highlight,
      });

      if (clicked.projectIndex !== null && projects[clicked.projectIndex]) {
        onSelectShot(projects[clicked.projectIndex]);
      }
    } else {
      shockwavesRef.current.push({
        x: clickX,
        y: clickY,
        radius: 10,
        maxRadius: 230,
        progress: 0,
        color: "rgba(81, 171, 219, 0.7)",
      });
    }
  };

  // Main Render Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const time = now * 0.001;

      const starC = starCanvasRef.current;
      const marbleC = marblesCanvasRef.current;
      if (!starC || !marbleC) {
        animId = requestAnimationFrame(render);
        return;
      }

      const sCtx = starC.getContext("2d");
      const mCtx = marbleC.getContext("2d");
      if (!sCtx || !mCtx) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = starC.width / dpr;
      const h = starC.height / dpr;

      // =========================================================
      // 1. RENDER BACKGROUND STARS & SPACE (Softly Blurred)
      // =========================================================
      sCtx.save();
      sCtx.scale(dpr, dpr);
      sCtx.clearRect(0, 0, w, h);

      sCtx.fillStyle = "#01142B";
      sCtx.fillRect(0, 0, w, h);

      // Cosmic nebulae
      for (const neb of nebulasRef.current) {
        const nx = neb.xRatio * w;
        const ny = neb.yRatio * h;
        const nr = neb.radiusRatio * Math.max(w, h);
        const pulse = 1.0 + 0.08 * Math.sin(time * 0.5 + neb.pulsePhase);

        const nebGrad = sCtx.createRadialGradient(nx, ny, 0, nx, ny, nr * pulse);
        nebGrad.addColorStop(0, neb.color);
        nebGrad.addColorStop(0.5, neb.color.replace(/[\d.]+\)$/, "0.08)"));
        nebGrad.addColorStop(1, "rgba(1, 20, 43, 0)");

        sCtx.fillStyle = nebGrad;
        sCtx.beginPath();
        sCtx.arc(nx, ny, nr * pulse, 0, Math.PI * 2);
        sCtx.fill();
      }

      // Blurred celestial star points
      for (const star of starsRef.current) {
        const tw = Math.sin(star.twinklePhase + time * (star.twinkleSpeed * 60));
        const alpha = Math.max(0.1, Math.min(1.0, star.baseAlpha * (0.65 + 0.35 * tw)));

        sCtx.beginPath();
        sCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        sCtx.fillStyle = star.color;
        sCtx.globalAlpha = alpha;
        sCtx.fill();
      }
      sCtx.globalAlpha = 1.0;
      sCtx.restore();

      // =========================================================
      // 2. RENDER SHINING CRYSTALS (Distinct Weights & Physics)
      // =========================================================
      mCtx.save();
      mCtx.scale(dpr, dpr);
      mCtx.clearRect(0, 0, w, h);

      const mouse = mousePosRef.current;

      // Update & Draw Shockwaves
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.progress += dt * 1.8;
        if (sw.progress >= 1.0) {
          shockwavesRef.current.splice(i, 1);
          continue;
        }

        const currentR = sw.radius + (sw.maxRadius - sw.radius) * sw.progress;
        const alpha = (1.0 - sw.progress) * 0.5;

        mCtx.save();
        mCtx.beginPath();
        mCtx.arc(sw.x, sw.y, currentR, 0, Math.PI * 2);
        mCtx.lineWidth = Math.max(1, 3.5 * (1 - sw.progress));
        mCtx.strokeStyle = sw.color;
        mCtx.globalAlpha = alpha;
        mCtx.shadowColor = sw.color;
        mCtx.shadowBlur = 10;
        mCtx.stroke();
        mCtx.restore();
      }

      // Light source vector in 3D for facet specular reflection
      const lightDir: Vec3 = [-0.55, -0.65, 0.52];
      const lightLen = Math.sqrt(
        lightDir[0] * lightDir[0] + lightDir[1] * lightDir[1] + lightDir[2] * lightDir[2]
      );
      const lx = lightDir[0] / lightLen;
      const ly = lightDir[1] / lightLen;
      const lz = lightDir[2] / lightLen;

      // Update and Draw Each Shining Crystal
      for (const c of crystalsRef.current) {
        // --- 1. Movement Physics ---
        c.x += c.vx;
        c.y += c.vy;

        // --- 2. Keep moving strictly within container with physical mass rebound ---
        const pad = c.radius * 1.2;
        if (c.x < pad) {
          c.x = pad;
          c.vx = Math.abs(c.vx);
        } else if (c.x > w - pad) {
          c.x = w - pad;
          c.vx = -Math.abs(c.vx);
        }

        if (c.y < pad) {
          c.y = pad;
          c.vy = Math.abs(c.vy);
        } else if (c.y > h - pad) {
          c.y = h - pad;
          c.vy = -Math.abs(c.vy);
        }

        // --- 3. Brownian drift & subtle natural acceleration based on weight ---
        // Lighter crystals accelerate with more jitter, heavy ones drift with steady inertia
        c.vx += ((Math.random() - 0.5) * 0.06) / c.mass;
        c.vy += ((Math.random() - 0.5) * 0.06) / c.mass;

        // Speed clamping proportional to weight
        const curSpeed = Math.sqrt(c.vx * c.vx + c.vy * c.vy);
        const maxSpd = 2.4 / Math.sqrt(c.mass);
        const minSpd = 0.45 / Math.sqrt(c.mass);
        if (curSpeed > maxSpd) {
          c.vx = (c.vx / curSpeed) * maxSpd;
          c.vy = (c.vy / curSpeed) * maxSpd;
        } else if (curSpeed < minSpd && curSpeed > 0.001) {
          c.vx = (c.vx / curSpeed) * minSpd;
          c.vy = (c.vy / curSpeed) * minSpd;
        }

        // --- 4. Interactive Mouse Glide & Repulsion based on weight ---
        if (mouse.isInside) {
          const dx = c.x - mouse.x;
          const dy = c.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = c.radius + 95;
          if (dist < maxDist && dist > 0.001) {
            // Light crystals flee faster; heavy crystals are harder to budge
            const force = (1.0 - dist / maxDist) * (18 / c.mass);
            c.vx += (dx / dist) * force * 0.25;
            c.vy += (dy / dist) * force * 0.25;
          }
        }

        // --- 5. 3D Tumbling Rotation ---
        c.rotX += c.rotSpeedX;
        c.rotY += c.rotSpeedY;
        c.rotZ += c.rotSpeedZ;

        // --- 6. Scale Easing ---
        const isHovered = hoveredCrystal?.id === c.id;
        const isSelected = c.projectIndex !== null && projects[c.projectIndex]?.id === activeShot.id;
        c.targetScale = isHovered ? 1.15 : isSelected ? 1.08 : 1.0;
        c.currentScale += (c.targetScale - c.currentScale) * 0.12;
        c.radius = c.baseRadius * c.currentScale;

        // --- 7. Render 3D Shining Crystal ---
        drawShiningCrystal(mCtx, c, time, isHovered, isSelected, lx, ly, lz);
      }

      mCtx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeShot, hoveredCrystal, projects]);

  // Optical Rendering Function: 3D Faceted Geometry with Specular Shining Glints
  const drawShiningCrystal = (
    ctx: CanvasRenderingContext2D,
    c: Crystal,
    time: number,
    isHovered: boolean,
    isSelected: boolean,
    lx: number,
    ly: number,
    lz: number
  ) => {
    ctx.save();

    // 1. Ambient Caustic Aura / Glow cast around crystal
    const haloRadius = c.radius * (isHovered ? 2.4 : 1.8);
    const glowGrad = ctx.createRadialGradient(c.x, c.y, c.radius * 0.5, c.x, c.y, haloRadius);
    glowGrad.addColorStop(0, c.colors.glow);
    glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(c.x, c.y, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // 2. Selection Ring
    if (isSelected) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius + 6, 0, Math.PI * 2);
      ctx.strokeStyle = c.colors.highlight;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = c.colors.highlight;
      ctx.shadowBlur = 8;
      ctx.stroke();
    }

    // 3. 3D Rotation Matrix Calculation
    const cosX = Math.cos(c.rotX);
    const sinX = Math.sin(c.rotX);
    const cosY = Math.cos(c.rotY);
    const sinY = Math.sin(c.rotY);
    const cosZ = Math.cos(c.rotZ);
    const sinZ = Math.sin(c.rotZ);

    // Transform 3D vertices to 2D screen projection
    const projectedVertices: { px: number; py: number; z: number }[] = [];
    const r = c.radius;

    for (const v of c.geometry.vertices) {
      // Rotate Y
      const x1 = v[0] * cosY + v[2] * sinY;
      const y1 = v[1];
      const z1 = -v[0] * sinY + v[2] * cosY;

      // Rotate X
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      // Rotate Z
      const x3 = x2 * cosZ - y2 * sinZ;
      const y3 = x2 * sinZ + y2 * cosZ;
      const z3 = z2;

      // Simple perspective projection
      const fov = 400;
      const pScale = fov / (fov + z3 * 50);

      projectedVertices.push({
        px: c.x + x3 * r * pScale,
        py: c.y + y3 * r * pScale,
        z: z3,
      });
    }

    // 4. Sort and Draw 3D Facets
    // Compute face centroids, normal, and lighting intensity
    const sortedFaces: {
      face: number[];
      avgZ: number;
      normalZ: number;
      lightIntensity: number;
      centroid: { x: number; y: number };
    }[] = [];

    for (const f of c.geometry.faces) {
      const p0 = projectedVertices[f[0]];
      const p1 = projectedVertices[f[1]];
      const p2 = projectedVertices[f[2]];

      // Compute 2D cross product for normal Z (winding order)
      const ax = p1.px - p0.px;
      const ay = p1.py - p0.py;
      const bx = p2.px - p0.px;
      const by = p2.py - p0.py;
      const normalZ = ax * by - ay * bx;

      // Compute 3D centroid
      let sumZ = 0;
      let sumX = 0;
      let sumY = 0;
      for (const idx of f) {
        sumZ += projectedVertices[idx].z;
        sumX += projectedVertices[idx].px;
        sumY += projectedVertices[idx].py;
      }
      const avgZ = sumZ / f.length;
      const centroid = { x: sumX / f.length, y: sumY / f.length };

      // Approximate 3D lighting normal dot product
      const nx = (p1.py - p0.py) * (p2.z - p0.z) - (p1.z - p0.z) * (p2.py - p0.py);
      const ny = (p1.z - p0.z) * (p2.px - p0.px) - (p1.px - p0.px) * (p2.z - p0.z);
      const nz = (p1.px - p0.px) * (p2.py - p0.py) - (p1.py - p0.py) * (p2.px - p0.px);
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;

      const dot = (nx / len) * lx + (ny / len) * ly + (nz / len) * lz;
      const lightIntensity = Math.max(0.12, Math.min(1.0, dot * 0.5 + 0.5));

      sortedFaces.push({
        face: f,
        avgZ,
        normalZ,
        lightIntensity,
        centroid,
      });
    }

    // Sort by depth (painter's algorithm)
    sortedFaces.sort((a, b) => a.avgZ - b.avgZ);

    let brightestFacet: { x: number; y: number; intensity: number } | null = null;

    // Draw Facets
    for (const item of sortedFaces) {
      // Draw front-facing facets (and translucent back facets)
      const isFront = item.normalZ < 0; // standard canvas clockwise winding
      const alpha = isFront ? 0.82 : 0.28;

      ctx.beginPath();
      const first = projectedVertices[item.face[0]];
      ctx.moveTo(first.px, first.py);
      for (let i = 1; i < item.face.length; i++) {
        const p = projectedVertices[item.face[i]];
        ctx.lineTo(p.px, p.py);
      }
      ctx.closePath();

      // Facet Fill Color based on lighting and custom palette
      if (item.lightIntensity > 0.75 && isFront) {
        // High specular shine
        ctx.fillStyle = c.colors.highlight;
        ctx.globalAlpha = Math.min(0.96, alpha * (item.lightIntensity * 1.2));
        if (!brightestFacet || item.lightIntensity > brightestFacet.intensity) {
          brightestFacet = {
            x: item.centroid.x,
            y: item.centroid.y,
            intensity: item.lightIntensity,
          };
        }
      } else if (item.lightIntensity > 0.42 && isFront) {
        ctx.fillStyle = c.colors.core;
        ctx.globalAlpha = alpha;
      } else {
        ctx.fillStyle = c.colors.shadow;
        ctx.globalAlpha = alpha * 0.9;
      }

      ctx.fill();

      // Crisp Crystal Edge Lines (creates sharp faceted gemstone refraction)
      ctx.strokeStyle = isFront ? c.colors.edge : "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = isFront ? 1.0 : 0.5;
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;

    // 5. Shining Star Sparkle Glint (When facet rotates into light)
    const sparkleTwinkle = Math.sin(time * (c.sparkleSpeed * 70) + c.sparklePhase);
    if (brightestFacet && brightestFacet.intensity > 0.72 && sparkleTwinkle > 0.2) {
      const sparkleSize = c.radius * (0.35 + 0.25 * sparkleTwinkle);
      const sparkleAlpha = Math.min(1.0, (brightestFacet.intensity - 0.7) * 3.3 * sparkleTwinkle);
      drawStarSparkle(ctx, brightestFacet.x, brightestFacet.y, sparkleSize, sparkleAlpha);
    }

    ctx.restore();
  };

  // 4-Point Anamorphic Shining Crystal Sparkle
  const drawStarSparkle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    alpha: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "#FFFFFF";
    ctx.shadowBlur = 8;

    // Horizontal ray
    ctx.beginPath();
    ctx.moveTo(-size * 1.4, 0);
    ctx.bezierCurveTo(-size * 0.25, -size * 0.12, size * 0.25, -size * 0.12, size * 1.4, 0);
    ctx.bezierCurveTo(size * 0.25, size * 0.12, -size * 0.25, size * 0.12, -size * 1.4, 0);
    ctx.fill();

    // Vertical ray
    ctx.beginPath();
    ctx.moveTo(0, -size * 1.4);
    ctx.bezierCurveTo(-size * 0.12, -size * 0.25, -size * 0.12, size * 0.25, 0, size * 1.4);
    ctx.bezierCurveTo(size * 0.12, size * 0.25, size * 0.12, -size * 0.25, 0, -size * 1.4);
    ctx.fill();

    // Center core point
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  return (
    <div
      ref={containerRef}
      className={styles.canvasWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCanvasClick}
      aria-label="Shining Cosmic Crystals Interactive Visual"
    >
      {/* Layer 1: Soft Blurred Starry Cosmic Space Backdrop */}
      <canvas ref={starCanvasRef} className={styles.starSpaceCanvas} />

      {/* Layer 2: Sharp 3D Shining Faceted Crystals */}
      <canvas ref={marblesCanvasRef} className={styles.marblesCanvas} />

      {/* Interactive Tooltip on Hover */}
      {hoveredCrystal && hoveredCrystal.projectIndex !== null && (
        <div
          className={styles.marbleTooltip}
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <span className={styles.tooltipTitle}>{hoveredCrystal.title}</span>
          <span className={styles.tooltipMeta}>
            0{hoveredCrystal.projectIndex + 1} / {hoveredCrystal.category}
          </span>
        </div>
      )}
    </div>
  );
};
