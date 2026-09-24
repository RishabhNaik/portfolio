"use client";

import React from "react";
import Link from "next/link";

export const CleanFooter: React.FC = () => {
  return (
    <footer style={{ padding: "40px 24px", borderTop: "1px solid #edf2f7", background: "#f8fafd" }}>
      <div
        className="clean-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          fontSize: "14px",
          color: "#64748b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "16px" }}>rishabh.</span>
          <span>•</span>
          <span>© 2026 Rishabh Naik. All rights reserved.</span>
        </div>

        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link href="/terms-conditions" style={{ color: "inherit", textDecoration: "none" }}>
            Terms & Conditions
          </Link>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "none",
              border: "none",
              color: "#1979D1",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
