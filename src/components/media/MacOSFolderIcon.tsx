"use client";

import React from "react";

interface MacOSFolderIconProps {
  size?: number;
  className?: string;
  isOpen?: boolean;
}

export const MacOSFolderIcon: React.FC<MacOSFolderIconProps> = ({
  size = 88,
  className,
  isOpen = false,
}) => {
  const width = size;
  const height = Math.round(size * 0.78);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        {/* Soft Drop Shadow for the entire folder */}
        <filter id="macFolderShadow" x="-15%" y="-10%" width="130%" height="135%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.42" />
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.25" />
        </filter>

        {/* Back Plate / Tab Gradient (Apple Cerulean Blue) */}
        <linearGradient id="macFolderBackGrad" x1="50" y1="4" x2="50" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#43aef8" />
          <stop offset="25%" stopColor="#329fe8" />
          <stop offset="100%" stopColor="#1984d6" />
        </linearGradient>

        {/* Front Pocket Gradient (Vibrant Apple Sky Blue) */}
        <linearGradient id="macFolderFrontGrad" x1="50" y1="18" x2="50" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#62c4fc" />
          <stop offset="28%" stopColor="#47b2f8" />
          <stop offset="70%" stopColor="#2c9de8" />
          <stop offset="100%" stopColor="#1f8ada" />
        </linearGradient>

        {/* Front Flap Specular Highlight Line */}
        <linearGradient id="macFolderTopLip" x1="6" y1="18.5" x2="94" y2="18.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
          <stop offset="15%" stopColor="rgba(255, 255, 255, 0.85)" />
          <stop offset="85%" stopColor="rgba(255, 255, 255, 0.85)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
        </linearGradient>

        {/* Subtle Bottom Ambient Gradient */}
        <linearGradient id="macFolderBottomGlow" x1="50" y1="65" x2="50" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
          <stop offset="100%" stopColor="rgba(0, 30, 80, 0.22)" />
        </linearGradient>
      </defs>

      <g filter="url(#macFolderShadow)">
        {/* --- 1. BACK FOLDER BASE WITH TOP TAB --- */}
        {/* Tab curve: Starts at x=5, y=10. Rounded tab up to y=5, extends to x=36, gentle slope to x=45, y=12, shoulder to x=95, rounded right side down to y=71 */}
        <path
          d="
            M 10 5
            C 7 5, 5 7, 5 10
            L 5 69
            C 5 72, 7 74, 10 74
            L 90 74
            C 93 74, 95 72, 95 69
            L 95 18
            C 95 15, 93 13, 90 13
            L 47 13
            C 44 13, 41 11, 39 8
            L 38 7
            C 36 5, 34 5, 31 5
            Z
          "
          fill="url(#macFolderBackGrad)"
        />

        {/* Tab subtle top edge highlight */}
        <path
          d="
            M 11 5.75
            C 8.5 5.75, 6.75 7.5, 6.75 10
            L 6.75 16
            M 12 5.75
            L 31 5.75
            C 33.5 5.75, 35.5 7.5, 37.5 9.5
            L 38.5 10.5
            C 40.5 12.75, 43 13.75, 46 13.75
            L 90 13.75
          "
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="0.85"
          strokeLinecap="round"
          fill="none"
        />

        {/* --- 2. FRONT FOLDER POCKET --- */}
        {/* Covers front from y=18.5 to y=74 with rounded corners */}
        <rect
          x="5"
          y="18.5"
          width="90"
          height="55.5"
          rx="6.5"
          fill="url(#macFolderFrontGrad)"
        />

        {/* Front Pocket Top Highlight Line */}
        <line
          x1="11"
          y1="19.25"
          x2="89"
          y2="19.25"
          stroke="url(#macFolderTopLip)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Front Pocket Bottom Vignette / Curvature Shadow */}
        <rect
          x="5"
          y="18.5"
          width="90"
          height="55.5"
          rx="6.5"
          fill="url(#macFolderBottomGlow)"
        />

        {/* Subtle Side Emboss Bevel */}
        <rect
          x="5.5"
          y="19"
          width="89"
          height="54.5"
          rx="6"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="0.8"
          fill="none"
        />
      </g>
    </svg>
  );
};
