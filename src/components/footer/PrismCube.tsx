"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./PrismCube.module.css";

// Precision Double-Terminated Hexagonal Sapphire Crystal Geometry (42 Facets, 26 Vertices)
const R_CAP = 0.78;
const R_GIRDLE = 1.25;
const Y_APEX = 1.75;
const Y_CAP = 1.05;
const Y_GIRDLE = 0.38;

// Generate 26 vertices of a natural bipyramidal hexagonal sapphire crystal
const VERTICES_3D: [number, number, number][] = [
  // 0: Top Apex Point
  [0, -Y_APEX, 0],

  // 1-6: Top Cap Ring (6 vertices at -Y_CAP)
  ...Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3;
    return [R_CAP * Math.cos(angle), -Y_CAP, R_CAP * Math.sin(angle)] as [number, number, number];
  }),

  // 7-12: Upper Girdle Ring (6 vertices at -Y_GIRDLE, rotated 30 deg for faceted crystal prism)
  ...Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 + Math.PI / 6;
    return [R_GIRDLE * Math.cos(angle), -Y_GIRDLE, R_GIRDLE * Math.sin(angle)] as [number, number, number];
  }),

  // 13-18: Lower Girdle Ring (6 vertices at +Y_GIRDLE, aligned with upper girdle)
  ...Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 + Math.PI / 6;
    return [R_GIRDLE * Math.cos(angle), Y_GIRDLE, R_GIRDLE * Math.sin(angle)] as [number, number, number];
  }),

  // 19-24: Bottom Cap Ring (6 vertices at +Y_CAP)
  ...Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3;
    return [R_CAP * Math.cos(angle), Y_CAP, R_CAP * Math.sin(angle)] as [number, number, number];
  }),

  // 25: Bottom Apex Point
  [0, Y_APEX, 0],
];

// 42 Facets of the Sapphire Crystal
const FACES: number[][] = [
  // 1. Top Pyramidal Cap: 6 triangles from Top Apex (0) to Top Cap (1..6)
  ...Array.from({ length: 6 }, (_, i) => [0, 1 + i, 1 + ((i + 1) % 6)]),

  // 2. Upper Transition Kite/Triangles: 12 triangles between Top Cap (1..6) and Upper Girdle (7..12)
  ...Array.from({ length: 6 }, (_, i) => {
    const c1 = 1 + i;
    const c2 = 1 + ((i + 1) % 6);
    const g1 = 7 + i;
    const g2 = 7 + ((i + 1) % 6);
    return [
      [c1, g1, c2],
      [c2, g1, g2],
    ];
  }).flat(),

  // 3. Middle Prismatic Column: 6 quad facets between Upper Girdle (7..12) and Lower Girdle (13..18)
  ...Array.from({ length: 6 }, (_, i) => {
    const u1 = 7 + i;
    const u2 = 7 + ((i + 1) % 6);
    const l1 = 13 + i;
    const l2 = 13 + ((i + 1) % 6);
    return [u1, u2, l2, l1];
  }),

  // 4. Lower Transition Triangles: 12 triangles between Lower Girdle (13..18) and Bottom Cap (19..24)
  ...Array.from({ length: 6 }, (_, i) => {
    const l1 = 13 + i;
    const l2 = 13 + ((i + 1) % 6);
    const b1 = 19 + i;
    const b2 = 19 + ((i + 1) % 6);
    return [
      [l1, b1, l2],
      [l2, b1, b2],
    ];
  }).flat(),

  // 5. Bottom Pyramidal Termination: 6 triangles from Bottom Cap (19..24) to Bottom Apex (25)
  ...Array.from({ length: 6 }, (_, i) => [19 + i, 25, 19 + ((i + 1) % 6)]),
];

// Unique crystal edges
const EDGES: [number, number][] = [];
const edgeSet = new Set<string>();
const addEdge = (i1: number, i2: number) => {
  const key = i1 < i2 ? `${i1}-${i2}` : `${i2}-${i1}`;
  if (!edgeSet.has(key)) {
    edgeSet.add(key);
    EDGES.push([i1, i2]);
  }
};

FACES.forEach((face) => {
  for (let k = 0; k < face.length; k++) {
    addEdge(face[k], face[(k + 1) % face.length]);
  }
});

export const PrismCube: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Spatial Rotation Angles (degrees)
  const rotX = useRef<number>(-18);
  const rotY = useRef<number>(25);
  const rotZ = useRef<number>(12);
  const velX = useRef<number>(0);
  const velY = useRef<number>(0.4);

  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  // Sapphire Refraction Animation Loop
  useEffect(() => {
    let animId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High-DPI crisp canvas
    const size = 240;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // Static key light source from top-right-front
    const lightDir = [0.45, -0.75, 0.5];
    const lightLen = Math.hypot(lightDir[0], lightDir[1], lightDir[2]);
    const lX = lightDir[0] / lightLen;
    const lY = lightDir[1] / lightLen;
    const lZ = lightDir[2] / lightLen;

    const animate = () => {
      // Natural ambient crystal rotation
      if (!isDragging.current) {
        velX.current *= 0.95;
        velY.current = velY.current * 0.96 + 0.35 * 0.04;

        rotX.current += velX.current;
        rotY.current += velY.current;
        rotZ.current += 0.08;

        if (rotX.current > 75) rotX.current = 75;
        if (rotX.current < -75) rotX.current = -75;
      }

      const radX = (rotX.current * Math.PI) / 180;
      const radY = (rotY.current * Math.PI) / 180;
      const radZ = (rotZ.current * Math.PI) / 180;

      // Clear Canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const centerX = size / 2;
      const centerY = size / 2;

      // Precalculate rotation matrices
      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);
      const cosZ = Math.cos(radZ);
      const sinZ = Math.sin(radZ);

      // Transform Vertices in 3D Space
      const projectedPoints: { x: number; y: number; z: number; rx: number; ry: number; rz: number }[] = [];

      for (let i = 0; i < VERTICES_3D.length; i++) {
        const [vx, vy, vz] = VERTICES_3D[i];

        // Rotate around Y
        let x1 = vx * cosY + vz * sinY;
        let y1 = vy;
        let z1 = -vx * sinY + vz * cosY;

        // Rotate around X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rotate around Z
        let rx = x2 * cosZ - y2 * sinZ;
        let ry = x2 * sinZ + y2 * cosZ;
        let rz = z2;

        // Perspective Projection
        const cameraDist = 4.6;
        const focalLength = 230;
        const scale = focalLength / (cameraDist - rz);

        const scrX = centerX + rx * scale;
        const scrY = centerY + ry * scale;

        projectedPoints.push({
          x: scrX,
          y: scrY,
          z: rz,
          rx,
          ry,
          rz,
        });
      }

      // Calculate Face Depths and Normals for Sapphire Refraction
      const renderedFaces = FACES.map((faceIndices, idx) => {
        let sumX = 0;
        let sumY = 0;
        let sumZ = 0;
        for (const vIdx of faceIndices) {
          sumX += projectedPoints[vIdx].rx;
          sumY += projectedPoints[vIdx].ry;
          sumZ += projectedPoints[vIdx].rz;
        }
        const avgZ = sumZ / faceIndices.length;

        // Surface normal calculation
        const p0 = projectedPoints[faceIndices[0]];
        const p1 = projectedPoints[faceIndices[1]];
        const p2 = projectedPoints[faceIndices[2]];

        const ax = p1.rx - p0.rx;
        const ay = p1.ry - p0.ry;
        const az = p1.rz - p0.rz;

        const bx = p2.rx - p0.rx;
        const by = p2.ry - p0.ry;
        const bz = p2.rz - p0.rz;

        let nx = ay * bz - az * by;
        let ny = az * bx - ax * bz;
        let nz = ax * by - ay * bx;

        const len = Math.hypot(nx, ny, nz) || 1;
        nx /= len;
        ny /= len;
        nz /= len;

        // Diffuse reflection
        const dotLight = Math.max(0, nx * lX + ny * lY + nz * lZ);

        // Specular highlight reflection
        const hX = (lX + 0) / 2;
        const hY = (lY + 0) / 2;
        const hZ = (lZ + 1) / 2;
        const hLen = Math.hypot(hX, hY, hZ) || 1;
        const dotSpec = Math.max(0, nx * (hX / hLen) + ny * (hY / hLen) + nz * (hZ / hLen));
        const specular = Math.pow(dotSpec, 24);

        return {
          idx,
          faceIndices,
          avgZ,
          normalZ: nz,
          diffuse: dotLight,
          specular,
        };
      });

      // Sort faces back-to-front for realistic optical crystal translucency
      renderedFaces.sort((a, b) => a.avgZ - b.avgZ);

      // Render Sapphire Facets with Glassy Internal Refraction
      for (const face of renderedFaces) {
        const { faceIndices, normalZ, diffuse, specular } = face;

        ctx.beginPath();
        const startPt = projectedPoints[faceIndices[0]];
        ctx.moveTo(startPt.x, startPt.y);
        for (let k = 1; k < faceIndices.length; k++) {
          const pt = projectedPoints[faceIndices[k]];
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();

        const isFrontFacing = normalZ > 0;

        if (isFrontFacing) {
          // Front-facing facet: Vivid royal sapphire to electric cerulean with specular glint
          const r = Math.round(10 + diffuse * 30 + specular * 215);
          const g = Math.round(75 + diffuse * 135 + specular * 170);
          const b = Math.round(210 + diffuse * 45);
          const alpha = 0.22 + diffuse * 0.28 + specular * 0.45 + (hovered ? 0.08 : 0);

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(0.92, alpha)})`;
          ctx.fill();
        } else {
          // Back-facing facet: Deep internal midnight sapphire refraction
          const alpha = 0.08 + (hovered ? 0.05 : 0);
          ctx.fillStyle = `rgba(5, 25, 95, ${alpha})`;
          ctx.fill();
        }
      }

      // Render Glowing Sapphire Facet Edges
      for (const [i1, i2] of EDGES) {
        const p1 = projectedPoints[i1];
        const p2 = projectedPoints[i2];

        const edgeDepth = (p1.z + p2.z) / 2;
        const isFrontEdge = edgeDepth > 0;

        // Front edges glow brighter in electric cyan / sapphire blue
        const alpha = isFrontEdge
          ? Math.min(0.95, 0.65 + edgeDepth * 0.25)
          : Math.max(0.18, 0.35 + edgeDepth * 0.15);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        if (isFrontEdge) {
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.lineWidth = 1.35 + (hovered ? 0.4 : 0);
          ctx.shadowColor = "#00b4ff";
          ctx.shadowBlur = hovered ? 12 : 7;
        } else {
          ctx.strokeStyle = `rgba(30, 90, 225, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      // Render Sparkling Optical Nodes on Vertices
      for (const p of projectedPoints) {
        if (p.z < -0.4) continue; // Only glint on front vertices

        const nodeAlpha = Math.min(1, 0.5 + p.z * 0.45);
        const radius = Math.max(1.8, Math.min(4.0, 2.4 + p.z * 0.8));

        // Sapphire glint gradient
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.2);
        grad.addColorStop(0, `rgba(255, 255, 255, ${nodeAlpha})`);
        grad.addColorStop(0.4, `rgba(0, 229, 255, ${nodeAlpha * 0.8})`);
        grad.addColorStop(1, "rgba(0, 85, 255, 0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Brilliant diamond white core
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [hovered]);

  // Pointer drag interactions
  const handlePointerDown = useCallback((clientX: number, clientY: number) => {
    isDragging.current = true;
    setIsGrabbing(true);
    lastMousePos.current = { x: clientX, y: clientY };
  }, []);

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging.current) return;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;
    lastMousePos.current = { x: clientX, y: clientY };

    const sensitivity = 0.55;
    velX.current = -deltaY * sensitivity;
    velY.current = deltaX * sensitivity;

    rotX.current += velX.current;
    rotY.current += velY.current;

    if (rotX.current > 75) rotX.current = 75;
    if (rotX.current < -75) rotX.current = -75;
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    setIsGrabbing(false);
  }, []);

  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handlePointerMove(e.clientX, e.clientY);
      }
    };

    const onWindowMouseUp = () => {
      if (isDragging.current) {
        handlePointerUp();
      }
    };

    const onWindowTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onWindowTouchEnd = () => {
      if (isDragging.current) {
        handlePointerUp();
      }
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
    window.addEventListener("touchmove", onWindowTouchMove, { passive: true });
    window.addEventListener("touchend", onWindowTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
      window.removeEventListener("touchmove", onWindowTouchMove);
      window.removeEventListener("touchend", onWindowTouchEnd);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={containerRef}
      className={`${styles.prismContainer} ${isGrabbing ? styles.grabbing : ""}`}
      onMouseDown={(e) => {
        e.preventDefault();
        handlePointerDown(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Sapphire Crystal — Drag to rotate in 3D"
      role="img"
      aria-label="Interactive 3D Sapphire Crystal Sculpture"
    >
      {/* Deep Sapphire radial ambient aura */}
      <div className={`${styles.ambientAura} ${hovered ? styles.auraActive : ""}`} />

      {/* Dynamic floor sapphire caustic reflection */}
      <div className={styles.floorCaustic} />

      {/* High-DPI Sapphire Crystal Canvas */}
      <canvas ref={canvasRef} className={styles.tesseractCanvas} />
    </div>
  );
};
