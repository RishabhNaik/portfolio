"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  naturalAudioEngine,
  SOUNDSCAPE_TRACKS,
  SoundscapeTrack,
} from "./audioEngine";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  SkipBack,
  SkipForward,
  Waves,
  CloudRain,
  Wind,
  Radio,
  Disc3,
} from "lucide-react";
import styles from "./DynamicIslandAudioPlayer.module.css";

export const DynamicIslandAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>([12, 18, 26, 16, 10]);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const prevVolumeRef = useRef<number>(0.65);

  const currentTrack: SoundscapeTrack =
    SOUNDSCAPE_TRACKS[currentTrackIndex] || SOUNDSCAPE_TRACKS[0];

  // Real-time audio visualizer animation loop
  const updateVisualizer = useCallback(() => {
    if (isPlaying) {
      const data = naturalAudioEngine.getVisualizerData();
      setVisualizerHeights(data);
      animFrameRef.current = requestAnimationFrame(updateVisualizer);
    } else {
      setVisualizerHeights([10, 14, 18, 12, 8]);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateVisualizer);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setVisualizerHeights([10, 14, 18, 12, 8]);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, updateVisualizer]);

  // Click outside to collapse expanded Dynamic Island
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  // Keyboard shortcut: Escape collapses island
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isPlaying) {
      naturalAudioEngine.play(currentTrack.id);
      setIsPlaying(true);
    } else {
      naturalAudioEngine.pause();
      setIsPlaying(false);
    }
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    naturalAudioEngine.setTrack(SOUNDSCAPE_TRACKS[index].id);
    if (!isPlaying) {
      naturalAudioEngine.play(SOUNDSCAPE_TRACKS[index].id);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentTrackIndex + 1) % SOUNDSCAPE_TRACKS.length;
    handleSelectTrack(nextIdx);
  };

  const handlePrevTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentTrackIndex - 1 + SOUNDSCAPE_TRACKS.length) % SOUNDSCAPE_TRACKS.length;
    handleSelectTrack(prevIdx);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0) setIsMuted(false);
    naturalAudioEngine.setVolume(newVol);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      setIsMuted(false);
      const restored = prevVolumeRef.current || 0.65;
      setVolume(restored);
      naturalAudioEngine.setVolume(restored);
    } else {
      prevVolumeRef.current = volume;
      setIsMuted(true);
      setVolume(0);
      naturalAudioEngine.setVolume(0);
    }
  };

  const getTrackIcon = (id: string, size = 18) => {
    switch (id) {
      case "ocean":
        return <Waves size={size} />;
      case "rain":
        return <CloudRain size={size} />;
      case "wind":
        return <Wind size={size} />;
      case "tape":
      default:
        return <Radio size={size} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.islandWrapper}
      aria-label="Soothing Nature Soundscape Player"
    >
      {/* 01 — COLLAPSED MINI FAB PILL */}
      {!isExpanded ? (
        <div
          className={`${styles.miniIsland} ${isPlaying ? styles.miniIslandPlaying : ""}`}
          onClick={() => setIsExpanded(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsExpanded(true);
            }
          }}
          aria-label="Expand nature soundscape dynamic island"
          title="Click to expand dynamic island"
        >
          {/* Animated Equalizer Wave Bars */}
          <div className={styles.miniBars} aria-hidden="true">
            {visualizerHeights.map((h, i) => (
              <span
                key={i}
                className={`${styles.bar} ${!isPlaying ? styles.barStatic : ""}`}
                style={{ height: `${isPlaying ? h * 0.18 : 5}px` }}
              />
            ))}
          </div>

          {/* Track Summary */}
          <div className={styles.miniContent}>
            <div className={styles.miniLabel}>
              <span>{isPlaying ? "Nature Sound" : "Ambient"}</span>
            </div>
            <span className={styles.miniTrackTitle}>{currentTrack.name}</span>
          </div>

          {/* Mini Play/Pause Toggle */}
          <button
            type="button"
            className={`${styles.miniPlayBtn} ${isPlaying ? styles.miniPlayBtnActive : ""}`}
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Pause soothing sound" : "Play soothing sound"}
            title={isPlaying ? "Pause" : "Play nature sound"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 2 }} />}
          </button>
        </div>
      ) : (
        /* 02 — EXPANDED DYNAMIC ISLAND */
        <div
          className={styles.expandedIsland}
          role="region"
          aria-label="Expanded Soundscape Dynamic Island"
        >
          {/* Top Status & Collapse Row */}
          <div className={styles.islandTopRow}>
            <div className={styles.notchBadge}>
              <span>{isPlaying ? "Live Soundscape" : "Paused"}</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: "#00a6ff" }}>{currentTrack.frequencies}</span>
            </div>

            <button
              type="button"
              className={styles.collapseBtn}
              onClick={() => setIsExpanded(false)}
              aria-label="Collapse dynamic island"
              title="Minimize"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Soundscape Track Card */}
          <div className={styles.trackHeroRow}>
            <div
              className={`${styles.soundDiscWrap} ${isPlaying ? styles.soundDiscSpinning : ""}`}
            >
              {getTrackIcon(currentTrack.id, 22)}
            </div>

            <div className={styles.trackMeta}>
              <span className={styles.trackCategory}>{currentTrack.category}</span>
              <h4 className={styles.trackTitle}>{currentTrack.name}</h4>
              <p className={styles.trackSubtitle}>{currentTrack.subtitle}</p>
            </div>
          </div>

          {/* Live Frequency Spectrum Visualizer */}
          <div className={styles.spectrumWave} aria-hidden="true">
            {visualizerHeights.map((h, i) => (
              <span
                key={i}
                className={styles.spectrumBar}
                style={{ height: `${isPlaying ? Math.max(4, h * 0.22) : 4}px` }}
              />
            ))}
          </div>

          {/* Soundscape Mode Selector Pills */}
          <div className={styles.presetPills} role="tablist" aria-label="Select natural soundscape">
            {SOUNDSCAPE_TRACKS.map((track, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <button
                  key={track.id}
                  type="button"
                  className={`${styles.presetBtn} ${isSelected ? styles.presetBtnActive : ""}`}
                  onClick={() => handleSelectTrack(idx)}
                  role="tab"
                  aria-selected={isSelected}
                  title={track.description}
                >
                  {track.id === "ocean" && "Ocean"}
                  {track.id === "rain" && "Rain"}
                  {track.id === "wind" && "Wind"}
                  {track.id === "tape" && "Tape"}
                </button>
              );
            })}
          </div>

          {/* Playback Controls & Volume Slider */}
          <div className={styles.controlsRow}>
            <div className={styles.playbackCluster}>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={handlePrevTrack}
                aria-label="Previous soundscape"
                title="Previous Soundscape"
              >
                <SkipBack size={15} />
              </button>

              <button
                type="button"
                className={styles.mainPlayBtn}
                onClick={handleTogglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                title={isPlaying ? "Pause Soundscape" : "Play Soundscape"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
              </button>

              <button
                type="button"
                className={styles.actionBtn}
                onClick={handleNextTrack}
                aria-label="Next soundscape"
                title="Next Soundscape"
              >
                <SkipForward size={15} />
              </button>
            </div>

            {/* Volume Controls */}
            <div className={styles.volumeCluster}>
              <button
                type="button"
                className={styles.volumeBtn}
                onClick={handleToggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
                aria-label="Soundscape volume"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
