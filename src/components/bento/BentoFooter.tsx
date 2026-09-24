"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Instagram, Twitter, Linkedin, Heart } from "lucide-react";
import { PrismCube } from "@/components/footer/PrismCube";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import { siteConfig } from "@/data/siteData";

export const BentoFooter: React.FC = () => {
  const scrollToTop = () => {
    cinematicAudioHaptics.playSlateTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "#020712",
        borderTop: "1px solid rgba(81, 171, 219, 0.15)",
        padding: "80px 0 40px",
        position: "relative",
      }}
    >
      <div className="bento-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          {/* Left: 3D Iridescent Crystal Cube */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
            <div style={{ width: "160px", height: "160px", position: "relative" }}>
              <PrismCube />
            </div>
            <span style={{ fontSize: "12px", color: "#8AA4B2", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Prismatic Specular Matrix
            </span>
          </div>

          {/* Center: Signature Bold Multiline Closing Statement */}
          <div>
            <h2
              style={{
                fontSize: "clamp(36px, 6vw, 56px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#f5f8fc",
                textTransform: "lowercase",
              }}
            >
              want<br />
              to<br />
              take a<br />
              <span style={{ color: "#51ABDB" }}>bet?</span>
            </h2>
          </div>

          {/* Right: Direct Inquiries & Social Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#8AA4B2", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Direct Mobile
              </span>
              <p style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", margin: "4px 0 0" }}>
                +91 6360908381
              </p>
            </div>

            <div>
              <span style={{ fontSize: "11px", color: "#8AA4B2", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Inquiries & Booking
              </span>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#51ABDB", margin: "4px 0 0" }}>
                rishabhnaik37@gmail.com
              </p>
            </div>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href="https://www.instagram.com/rishabh._.naik/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgba(81, 171, 219, 0.12)",
                  border: "1px solid rgba(81, 171, 219, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#51ABDB",
                  textDecoration: "none",
                }}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://twitter.com/rishabhnaik37"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgba(81, 171, 219, 0.12)",
                  border: "1px solid rgba(81, 171, 219, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#51ABDB",
                  textDecoration: "none",
                }}
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/rishabhnaik/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgba(81, 171, 219, 0.12)",
                  border: "1px solid rgba(81, 171, 219, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#51ABDB",
                  textDecoration: "none",
                }}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(81, 171, 219, 0.12)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            fontSize: "13px",
            color: "#8AA4B2",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>© 2026 Rishabh Naik. Crafted with</span>
            <Heart size={13} color="#51ABDB" fill="#51ABDB" />
            <span>in Bangalore.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#51ABDB",
              fontSize: "13px",
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
