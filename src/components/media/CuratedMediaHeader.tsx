"use client";

import React, { useState } from "react";
import { FEATURED_HERO_ART, FeaturedArtPiece } from "@/data/heroArt";
import { GridFlipSlideshow } from "@/components/hero/GridFlipSlideshow";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import styles from "./CuratedMediaHeader.module.css";

interface CuratedMediaHeaderProps {
  artworks?: FeaturedArtPiece[];
}

export const CuratedMediaHeader: React.FC<CuratedMediaHeaderProps> = ({
  artworks = FEATURED_HERO_ART,
}) => {
  const [artIndex, setArtIndex] = useState<number>(0);
  const [clickOrigin, setClickOrigin] = useState<{ x: number; y: number }>({
    x: 0.5,
    y: 0.5,
  });

  const allImages = artworks.map((a) => a.imageUrl);
  const currentPiece = artworks[artIndex] || artworks[0];

  // Handle click directly on the canvas with ripple wave originating from click coordinates
  const handleCanvasClick = (coords: { x: number; y: number }) => {
    setClickOrigin(coords);
    setArtIndex((prev) => (prev + 1) % artworks.length);
  };

  const handleNext = () => {
    setClickOrigin({ x: 0.85, y: 0.5 });
    setArtIndex((prev) => (prev + 1) % artworks.length);
  };

  const handlePrev = () => {
    setClickOrigin({ x: 0.15, y: 0.5 });
    setArtIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const handleSelectPiece = (index: number) => {
    if (index === artIndex) return;
    setClickOrigin({ x: 0.5, y: 0.5 });
    setArtIndex(index);
  };

  return (
    <section className={styles.curatedSection} aria-label="Curated Media Showcase">
      <div className={styles.curatedContainer}>
        {/* Top Information & Control Bar */}
        <div className={styles.headerTopRow}>
          <div className={styles.titleBlock}>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowBadge}>Featured Archive</span>
              <span className={styles.eyebrowText}>Optical Anthology</span>
            </div>
            <h2 className={styles.heading}>Curated Media</h2>
            <p className={styles.subheading}>
              A selective anthology of analog prints, 35mm optical tests, brutalist
              typography, and cinematic soundscapes.
            </p>
          </div>

          {/* Top Controls: Minimal Counter & Flip Trigger */}
          <div className={styles.topControls}>
            <div className={styles.counterBlock}>
              <span className={styles.counterActive}>
                0{artIndex + 1}
              </span>
              <span className={styles.counterDivider}>/</span>
              <span>0{artworks.length}</span>
            </div>

            <button
              onClick={handleNext}
              className={styles.flipActionBtn}
              aria-label="Flip to next curated piece"
            >
              <RefreshCw size={13} />
              <span>Flip Canvas</span>
            </button>

            <div className={styles.navArrowsGroup}>
              <button
                onClick={handlePrev}
                className={styles.arrowIconBtn}
                aria-label="Previous Curated Work"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className={styles.arrowIconBtn}
                aria-label="Next Curated Work"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 21:9 Cinematic Widescreen Stage with 3D Grid-Box Flip */}
        <div
          className={styles.cinematicStage}
          aria-label="Interactive 3D Flipping Media Canvas"
        >
          {/* Top Anamorphic Scope Line */}
          <div className={styles.scopeLineTop} />

          {/* WebGL 3D Grid-Box Flip Slideshow */}
          <div className={styles.stageVisualWrapper}>
            <GridFlipSlideshow
              activeImageUrl={currentPiece.imageUrl}
              allImages={allImages}
              clickOrigin={clickOrigin}
              onCanvasClick={handleCanvasClick}
            />
          </div>

          {/* Atmospheric Cinematic Lighting Overlays */}
          <div className={styles.stageVignette} />
          <div className={styles.stageGradientBottom} />

          {/* Top Right Click-to-Flip Prompt Tag */}
          <div className={styles.flipPromptBadge}>
            <span>Click to Ripple Flip</span>
          </div>

          {/* Glassmorphic Metadata Plate Overlay */}
          <div className={styles.glassPlateOverlay}>
            <div className={styles.plateInfo}>
              <h3 className={styles.plateTitle}>{currentPiece.title}</h3>
              <div className={styles.plateMetadataRow}>
                {currentPiece.year && (
                  <span className={styles.plateYear}>{currentPiece.year}</span>
                )}
                {currentPiece.year && currentPiece.medium && (
                  <span className={styles.plateDivider}>/</span>
                )}
                {currentPiece.medium && (
                  <span className={styles.plateMedium}>{currentPiece.medium}</span>
                )}
              </div>
            </div>

            {/* Direct Piece Indicator Pills */}
            <div className={styles.pieceSelectorRow} role="tablist">
              {artworks.map((piece, idx) => {
                const isActive = idx === artIndex;
                return (
                  <button
                    key={piece.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPiece(idx);
                    }}
                    className={`${styles.piecePill} ${
                      isActive ? styles.piecePillActive : ""
                    }`}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Select ${piece.title}`}
                  >
                    <span>0{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
