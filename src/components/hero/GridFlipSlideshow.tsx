"use client";

import React, { useEffect, useRef, useCallback } from "react";
import styles from "./GridFlipSlideshow.module.css";

interface GridFlipSlideshowProps {
  activeImageUrl: string;
  allImages?: string[];
  autoPlayInterval?: number;
  clickOrigin?: { x: number; y: number };
  onCanvasClick?: (coords: { x: number; y: number }) => void;
}

const DEFAULT_SLIDES = [
  "/assets/hero/hero-1.jpg",
  "/assets/hero/hero-2.jpg",
  "/assets/hero/hero-3.jpg",
  "/assets/hero/hero-4.jpg",
  "/assets/hero/hero-5.jpg",
];

// Target tile size in CSS pixels to ensure tiles are crisp 1:1 squares across any resolution
const TARGET_TILE_SIZE = 38;

const VERTEX_SHADER_SRC = `
  precision highp float;

  attribute vec2 a_quadPos;     // (-1..1, -1..1)
  attribute vec2 a_tileCenter;  // (0..1, 0..1)
  attribute vec2 a_tileSize;    // (halfW, halfH)
  attribute float a_rand;       // 0.0 to 1.0 deterministic natural variation

  uniform float u_progress;     // 0.0 to 1.0
  uniform vec2 u_resolution;    // canvas size in pixels
  uniform vec2 u_clickOrigin;   // click origin in [0..1] UV space

  varying vec2 v_uv;
  varying float v_angle;
  varying float v_rand;

  void main() {
    // Dynamic distance from the exact point of user click
    vec2 tilePixelPos = a_tileCenter * u_resolution;
    vec2 clickPixelPos = u_clickOrigin * u_resolution;
    float dist = length(tilePixelPos - clickPixelPos);

    // Maximum possible distance from click point to any of the 4 screen corners
    float d1 = length(vec2(0.0, 0.0) - clickPixelPos);
    float d2 = length(vec2(u_resolution.x, 0.0) - clickPixelPos);
    float d3 = length(vec2(0.0, u_resolution.y) - clickPixelPos);
    float d4 = length(u_resolution - clickPixelPos);
    float maxDist = max(max(d1, d2), max(d3, d4));
    maxDist = max(maxDist, 1.0);

    float normDist = clamp(dist / maxDist, 0.0, 1.0);

    // Natural harmonic wave timing starting at the point of click (normDist = 0)
    float organicJitter = (a_rand - 0.5) * 0.025;
    float delay = clamp(normDist * 0.44 + organicJitter, 0.0, 0.48);

    // Smooth harmonious tile rotation duration
    float duration = 0.52 + (a_rand - 0.5) * 0.03;
    float t = clamp((u_progress - delay) / duration, 0.0, 1.0);

    // Ultra-fluid cubic bezier easing curve
    float eased = t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
    float angle = eased * 3.14159265359;

    float halfW = a_tileSize.x;
    float halfH = a_tileSize.y;

    // Subtle physical gap only during the mid-flip rotation
    float midFlip = sin(angle);
    float gap = 1.0 - midFlip * 0.06;

    float lx = a_quadPos.x * halfW * gap;
    float ly = a_quadPos.y * halfH * gap;

    // 3D rotation around local vertical Y-axis
    float cosA = cos(angle);
    float sinA = sin(angle);

    float rx = lx * cosA;
    float rz = lx * sinA;

    // Arching 3D depth pop towards camera with natural organic height variance
    float depthPop = 0.85 + (a_rand - 0.5) * 0.25;
    float z = rz + midFlip * (halfW * depthPop);

    // Perspective projection
    float fov = 1100.0;
    float pScale = fov / (fov + z * u_resolution.x * 0.65);

    vec2 finalUV = a_tileCenter + vec2(rx, ly) * pScale;

    // Map [0, 1] screen UV to WebGL clip space [-1, 1]
    gl_Position = vec4(finalUV.x * 2.0 - 1.0, 1.0 - finalUV.y * 2.0, -z * 0.001, 1.0);

    // Front vs Back face texture UV mapping
    // Invert local X on the back face so incoming image is properly oriented
    float u_localX = (angle < 1.57079632679) ? a_quadPos.x : -a_quadPos.x;
    v_uv = a_tileCenter + vec2(u_localX * halfW, a_quadPos.y * halfH);
    v_angle = angle;
    v_rand = a_rand;
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision highp float;

  uniform sampler2D u_texFront;
  uniform sampler2D u_texBack;
  uniform vec2 u_resolution;
  uniform vec2 u_frontRes;
  uniform vec2 u_backRes;

  varying vec2 v_uv;
  varying float v_angle;
  varying float v_rand;

  // Pixel-perfect object-fit: cover ensuring image spans the full hero section
  vec2 getCoverUV(vec2 uv, vec2 imgRes, vec2 canvasRes) {
    float cAspect = canvasRes.x / canvasRes.y;
    float iAspect = imgRes.x / imgRes.y;
    vec2 st = uv;
    if (cAspect > iAspect) {
      // Canvas is wider than image: crop top and bottom
      float scale = iAspect / cAspect;
      st.y = (st.y - 0.5) * scale + 0.5;
    } else {
      // Canvas is taller than image: crop left and right
      float scale = cAspect / iAspect;
      st.x = (st.x - 0.5) * scale + 0.5;
    }
    return st;
  }

  void main() {
    vec4 color;

    if (v_angle < 1.57079632679) {
      // Front Face
      vec2 st = getCoverUV(v_uv, u_frontRes, u_resolution);
      color = texture2D(u_texFront, st);
    } else {
      // Back Face
      vec2 st = getCoverUV(v_uv, u_backRes, u_resolution);
      color = texture2D(u_texBack, st);
    }

    // Physical flip shading: subtle realistic darkening when tiles turn edge-on
    float cosA = abs(cos(v_angle));
    float shade = mix(0.55, 1.0, cosA);

    // Tactile metallic sheen wave catching light across flipping tiles with natural flutter
    float sheen = sin(v_angle) * (0.07 + v_rand * 0.035);

    gl_FragColor = vec4(color.rgb * shade + vec3(sheen), 1.0);
  }
`;

interface LoadedTexture {
  texture: WebGLTexture;
  width: number;
  height: number;
}

export const GridFlipSlideshow: React.FC<GridFlipSlideshowProps> = ({
  activeImageUrl,
  clickOrigin = { x: 0.5, y: 0.5 },
  onCanvasClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WebGL context and resource references
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const bufferRef = useRef<WebGLBuffer | null>(null);
  const texturesCacheRef = useRef<Map<string, LoadedTexture>>(new Map());

  // Uniform locations
  const uniformsRef = useRef<{
    progress: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    clickOrigin: WebGLUniformLocation | null;
    frontRes: WebGLUniformLocation | null;
    backRes: WebGLUniformLocation | null;
    texFront: WebGLUniformLocation | null;
    texBack: WebGLUniformLocation | null;
  }>({
    progress: null,
    resolution: null,
    clickOrigin: null,
    frontRes: null,
    backRes: null,
    texFront: null,
    texBack: null,
  });

  const frontUrlRef = useRef<string>(activeImageUrl || DEFAULT_SLIDES[0]);
  const backUrlRef = useRef<string>(DEFAULT_SLIDES[1] || DEFAULT_SLIDES[0]);
  const isTransitioningRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);
  const vertexCountRef = useRef<number>(0);
  const currentGridRef = useRef<{ cols: number; rows: number }>({ cols: 0, rows: 0 });
  const clickOriginRef = useRef<{ x: number; y: number }>(clickOrigin);

  // Sync clickOrigin prop with ref
  useEffect(() => {
    clickOriginRef.current = clickOrigin;
  }, [clickOrigin]);

  // Helper to compile a WebGL shader
  const createShader = (gl: WebGLRenderingContext, type: number, src: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  // Helper to load and cache a texture
  const loadTexture = useCallback(
    (url: string): Promise<LoadedTexture> => {
      const gl = glRef.current;
      if (!gl) return Promise.reject(new Error("No GL context"));

      const cached = texturesCacheRef.current.get(url);
      if (cached) return Promise.resolve(cached);

      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (!glRef.current) return;
          const gl = glRef.current;
          const tex = gl.createTexture();
          if (!tex) return;

          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

          const item: LoadedTexture = {
            texture: tex,
            width: img.naturalWidth || 1920,
            height: img.naturalHeight || 1080,
          };
          texturesCacheRef.current.set(url, item);
          resolve(item);
        };

        img.onerror = () => {
          if (!glRef.current) return;
          const gl = glRef.current;
          const tex = gl.createTexture()!;
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            new Uint8Array([12, 12, 16, 255])
          );
          const fallbackItem: LoadedTexture = { texture: tex, width: 1920, height: 1080 };
          texturesCacheRef.current.set(url, fallbackItem);
          resolve(fallbackItem);
        };

        img.src = url;
      });
    },
    []
  );

  // Render a single frame at a given progress (0.0 to 1.0)
  const drawScene = useCallback((progress: number) => {
    const gl = glRef.current;
    const uniforms = uniformsRef.current;
    if (!gl || !uniforms.progress) return;

    const frontTex = texturesCacheRef.current.get(frontUrlRef.current);
    const backTex = texturesCacheRef.current.get(backUrlRef.current);
    if (!frontTex) return;

    gl.useProgram(programRef.current);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, frontTex.texture);
    gl.uniform1i(uniforms.texFront, 0);
    gl.uniform2f(uniforms.frontRes, frontTex.width, frontTex.height);

    if (backTex) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, backTex.texture);
      gl.uniform1i(uniforms.texBack, 1);
      gl.uniform2f(uniforms.backRes, backTex.width, backTex.height);
    }

    gl.uniform1f(uniforms.progress, progress);
    gl.uniform2f(uniforms.resolution, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(uniforms.clickOrigin, clickOriginRef.current.x, clickOriginRef.current.y);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, vertexCountRef.current);
  }, []);

  // Build or update the square grid geometry buffer
  const buildSquareGrid = useCallback(
    (width: number, height: number) => {
      const gl = glRef.current;
      const program = programRef.current;
      if (!gl || !program) return;

      // Calculate columns and rows so tiles are visually 1:1 squares in physical pixels
      const cols = Math.max(8, Math.round(width / TARGET_TILE_SIZE));
      const rows = Math.max(6, Math.round(height / TARGET_TILE_SIZE));

      if (currentGridRef.current.cols === cols && currentGridRef.current.rows === rows) {
        return; // Already configured
      }

      currentGridRef.current = { cols, rows };

      const halfW = 0.5 / cols;
      const halfH = 0.5 / rows;

      const vertexData: number[] = [];
      const quadVertices = [
        -1, -1,
         1, -1,
        -1,  1,
         1, -1,
         1,  1,
        -1,  1,
      ];

      for (let r = 0; r < rows; r++) {
        const cy = (r + 0.5) / rows;
        for (let c = 0; c < cols; c++) {
          const cx = (c + 0.5) / cols;

          // Deterministic organic pseudo-random seed per tile (stable across frames)
          const sinVal = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
          const rand = sinVal - Math.floor(sinVal);

          for (let i = 0; i < 6; i++) {
            const qx = quadVertices[i * 2];
            const qy = quadVertices[i * 2 + 1];
            // Layout: qx, qy, cx, cy, halfW, halfH, rand (7 floats)
            vertexData.push(qx, qy, cx, cy, halfW, halfH, rand);
          }
        }
      }

      vertexCountRef.current = vertexData.length / 7;

      let buffer = bufferRef.current;
      if (!buffer) {
        buffer = gl.createBuffer();
        bufferRef.current = buffer;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

      const FSIZE = Float32Array.BYTES_PER_ELEMENT;
      const STRIDE = 7 * FSIZE;

      const aQuadPos = gl.getAttribLocation(program, "a_quadPos");
      const aTileCenter = gl.getAttribLocation(program, "a_tileCenter");
      const aTileSize = gl.getAttribLocation(program, "a_tileSize");
      const aRand = gl.getAttribLocation(program, "a_rand");

      gl.enableVertexAttribArray(aQuadPos);
      gl.vertexAttribPointer(aQuadPos, 2, gl.FLOAT, false, STRIDE, 0);

      gl.enableVertexAttribArray(aTileCenter);
      gl.vertexAttribPointer(aTileCenter, 2, gl.FLOAT, false, STRIDE, 2 * FSIZE);

      gl.enableVertexAttribArray(aTileSize);
      gl.vertexAttribPointer(aTileSize, 2, gl.FLOAT, false, STRIDE, 4 * FSIZE);

      gl.enableVertexAttribArray(aRand);
      gl.vertexAttribPointer(aRand, 1, gl.FLOAT, false, STRIDE, 6 * FSIZE);
    },
    []
  );

  // Trigger the fluid wave flip radiating outward from the point of click
  const triggerFlip = useCallback(
    async (nextImageUrl: string, origin?: { x: number; y: number }) => {
      if (isTransitioningRef.current || nextImageUrl === frontUrlRef.current) return;
      isTransitioningRef.current = true;

      if (origin) {
        clickOriginRef.current = origin;
      }

      backUrlRef.current = nextImageUrl;
      await loadTexture(nextImageUrl);

      const FLIP_DURATION = 1350; // Total wave sweep time (ms)
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1.0, elapsed / FLIP_DURATION);

        drawScene(progress);

        if (progress < 1.0) {
          animFrameIdRef.current = requestAnimationFrame(animate);
        } else {
          // Transition complete: swap front texture to the newly flipped image
          frontUrlRef.current = nextImageUrl;
          drawScene(0.0);
          isTransitioningRef.current = false;
          animFrameIdRef.current = null;
        }
      };

      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = requestAnimationFrame(animate);
    },
    [drawScene, loadTexture]
  );

  // Initialize WebGL and geometry buffer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    glRef.current = gl;

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;
    gl.useProgram(program);

    // Uniform locations
    uniformsRef.current = {
      progress: gl.getUniformLocation(program, "u_progress"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      clickOrigin: gl.getUniformLocation(program, "u_clickOrigin"),
      frontRes: gl.getUniformLocation(program, "u_frontRes"),
      backRes: gl.getUniformLocation(program, "u_backRes"),
      texFront: gl.getUniformLocation(program, "u_texFront"),
      texBack: gl.getUniformLocation(program, "u_texBack"),
    };

    // Initial load of first image
    loadTexture(frontUrlRef.current).then(() => {
      drawScene(0.0);
    });

    // Resize observer to maintain square grid geometry and crisp resolution
    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      if (w > 0 && h > 0) {
        if (Math.abs(canvas.width - w) > 2 || Math.abs(canvas.height - h) > 2) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
          buildSquareGrid(rect.width, rect.height);
          drawScene(0.0);
        }
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [buildSquareGrid, drawScene, loadTexture]);

  // Sync with active image selection when user changes shot (starts ripple from clickOrigin)
  useEffect(() => {
    if (activeImageUrl && activeImageUrl !== frontUrlRef.current) {
      triggerFlip(activeImageUrl, clickOriginRef.current);
    }
  }, [activeImageUrl, triggerFlip]);

  // Handle direct click on the hero visual
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    if (onCanvasClick) {
      onCanvasClick({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.slideshowContainer}
      onClick={handleContainerClick}
      aria-label="Click to flip through works"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={activeImageUrl || DEFAULT_SLIDES[0]}
        alt="Hero background"
        className={styles.backgroundImage}
      />
      <canvas ref={canvasRef} className={styles.glCanvas} />
    </div>
  );
};
