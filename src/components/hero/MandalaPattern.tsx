"use client";

import React from "react";

export const MandalaPattern: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="mandalaMaskGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <mask id="mandalaMask">
          <rect width="800" height="800" fill="url(#mandalaMaskGrad)" />
        </mask>
      </defs>

      <g stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1" mask="url(#mandalaMask)">
        {/* Concentric Base Geometry Rings */}
        <circle cx="400" cy="400" r="380" strokeDasharray="3 6" opacity="0.4" />
        <circle cx="400" cy="400" r="360" strokeWidth="1.2" opacity="0.6" />
        <circle cx="400" cy="400" r="330" opacity="0.5" />
        <circle cx="400" cy="400" r="290" strokeDasharray="4 8" opacity="0.6" />
        <circle cx="400" cy="400" r="250" strokeWidth="1.2" opacity="0.7" />
        <circle cx="400" cy="400" r="210" opacity="0.5" />
        <circle cx="400" cy="400" r="170" strokeWidth="1.2" opacity="0.75" />
        <circle cx="400" cy="400" r="130" opacity="0.6" />
        <circle cx="400" cy="400" r="90" strokeWidth="1.2" opacity="0.8" />
        <circle cx="400" cy="400" r="50" opacity="0.7" />
        <circle cx="400" cy="400" r="20" strokeWidth="1.5" opacity="0.9" />

        {/* 24 Radial Symmetry Rays */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          return (
            <line
              key={`ray-${i}`}
              x1="400"
              y1="400"
              x2="400"
              y2="40"
              transform={`rotate(${angle} 400 400)`}
              strokeDasharray="4 12"
              opacity="0.35"
            />
          );
        })}

        {/* 16 Overlapping Sacred Geometry Petal Arcs (Outer Tier) */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <path
              key={`outer-petal-${i}`}
              d="M 400 400 C 460 260, 480 140, 400 50 C 320 140, 340 260, 400 400"
              transform={`rotate(${angle} 400 400)`}
              opacity="0.65"
            />
          );
        })}

        {/* 16 Mid Tier Floral Petals */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16 + 11.25;
          return (
            <path
              key={`mid-petal-${i}`}
              d="M 400 400 C 440 310, 450 210, 400 150 C 350 210, 360 310, 400 400"
              transform={`rotate(${angle} 400 400)`}
              opacity="0.7"
            />
          );
        })}

        {/* 12 Intersecting Harmonic Rings (Flower of Life Formation) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          const rad = (angle * Math.PI) / 180;
          const cx = 400 + Math.cos(rad) * 110;
          const cy = 400 + Math.sin(rad) * 110;
          return (
            <circle
              key={`flower-ring-${i}`}
              cx={cx}
              cy={cy}
              r="110"
              opacity="0.5"
            />
          );
        })}

        {/* Outer 32 Point Scallop Crown */}
        {Array.from({ length: 32 }).map((_, i) => {
          const angle = (i * 360) / 32;
          return (
            <path
              key={`scallop-${i}`}
              d="M 385 45 Q 400 20 415 45"
              transform={`rotate(${angle} 400 400)`}
              strokeWidth="1.2"
              opacity="0.75"
            />
          );
        })}

        {/* Diamond Star Polygon Ring */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <polygon
              key={`diamond-${i}`}
              points="400,105 412,130 400,155 388,130"
              transform={`rotate(${angle} 400 400)`}
              opacity="0.75"
            />
          );
        })}

        {/* Core Lotus Center */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <path
              key={`core-lotus-${i}`}
              d="M 400 400 C 420 370, 425 330, 400 310 C 375 330, 380 370, 400 400"
              transform={`rotate(${angle} 400 400)`}
              strokeWidth="1.4"
              opacity="0.9"
            />
          );
        })}
      </g>
    </svg>
  );
};
