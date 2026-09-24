import { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryItems } from "@/data/siteData";
import { CleanNavbar } from "@/components/clean/CleanNavbar";
import { CleanFooter } from "@/components/clean/CleanFooter";
import "../clean-sapphire.css";

export const metadata: Metadata = {
  title: "Gallery — Rishabh Naik",
  description: "Creative artworks, portraits, and Sushiksha scholarship cohort gallery by Rishabh Naik.",
};

export default function GalleryPage() {
  return (
    <div className="clean-sapphire-page">
      <CleanNavbar />
      <main style={{ minHeight: "100vh", padding: "60px 0 80px" }}>
        <div className="clean-container">
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 50px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#1979D1",
                padding: "6px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(25, 121, 209, 0.08)",
                display: "inline-block",
                marginBottom: "16px",
              }}
            >
              Visual Archive & Artwork
            </span>
            <h1
              className="clean-headline-serif"
              style={{
                fontSize: "clamp(36px, 5vw, 54px)",
                marginBottom: "16px",
              }}
            >
              Artwork Archive
            </h1>
            <p className="clean-subtext">
              A curated visual collection of digital illustrations, mechanical concept sketches, character designs, and Sushiksha cohort portraits.
            </p>
          </div>

          {/* Gallery Grid */}
          <GalleryGrid items={galleryItems} />
        </div>
      </main>
      <CleanFooter />
    </div>
  );
}
