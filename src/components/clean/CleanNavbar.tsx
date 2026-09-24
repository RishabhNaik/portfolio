"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const CleanNavbar: React.FC = () => {
  return (
    <header className="clean-header">
      <div className="clean-header-inner">
        {/* Left Navigation */}
        <div className="clean-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/#disciplines" className="clean-nav-link" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>Disciplines</span>
            <ChevronDown size={14} color="#64748b" />
          </Link>
          <Link href="/#projects" className="clean-nav-link" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>Projects</span>
            <ChevronDown size={14} color="#64748b" />
          </Link>
        </div>

        {/* Center Brand Logo */}
        <Link href="/" className="clean-logo">
          rishabh<span className="clean-logo-dot">.</span>
        </Link>

        {/* Right Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="clean-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/gallery" className="clean-nav-link">
              Gallery
            </Link>
            <Link href="/#about" className="clean-nav-link">
              About
            </Link>
          </div>
          <a
            href="/assets/Rishabh_Naik_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="clean-btn-dark"
            style={{ padding: "8px 18px", fontSize: "13px" }}
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
};
