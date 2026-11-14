"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { BTSShot } from "@/types/project";
import { Play, Volume2, VolumeX, Sliders } from "lucide-react";
import styles from "./BTS.module.css";

interface MediaPlayerProps {
  shot: BTSShot;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentTime: number;
  duration: number;
  isScrubbing: boolean;
  scrubDirection: "forward" | "backward" | null;
  volume?: number;
  isMuted?: boolean;
  hudFeedback?: {
    type: "mode" | "volume";
    text: string;
    value?: number;
  } | null;
}

// Format seconds into SMPTE-style timecode: HH:MM:SS:FF
const formatTimecode = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.floor((seconds % 1) * 30); // 30 FPS

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
};

export const MediaPlayer: React.FC<MediaPlayerProps> = ({
  shot,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  currentTime,
  duration,
  isScrubbing,
  scrubDirection,
  volume = 75,
  isMuted = false,
  hudFeedback,
}) => {
  // Collect all visual frames for this shot to scrub through
  const frames = useMemo(() => {
    const list = [shot.imageUrl];
    if (shot.stills && shot.stills.length > 0) {
      for (const st of shot.stills) {
        if (!list.includes(st.url)) list.push(st.url);
      }
    }
    return list;
  }, [shot]);

  // Map current playback position (0.0 to 1.0) to frame index
  const progress = duration > 0 ? Math.max(0, Math.min(1, currentTime / duration)) : 0;
  const frameIndex = Math.min(
    frames.length - 1,
    Math.floor(progress * frames.length)
  );
  const activeFrameUrl = frames[frameIndex] || shot.imageUrl;

  return (
    <div className={styles.playerContainer}>
      <div
        className={styles.playerScreen}
        onClick={onTogglePlay}
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <Image
          key={`${shot.id}-${frameIndex}`}
          src={activeFrameUrl}
          alt={shot.title}
          fill
          priority
          className={`${styles.playerMedia} ${isPlaying ? styles.mediaPlaying : ""}`}
          sizes="(max-width: 1024px) 100vw, 65vw"
        />

        <div className={styles.screenVignette} />

        {/* Dynamic Live REC Timecode Overlay */}
        <div className={styles.timecodeOverlay}>
          <span className={styles.recBadge}>REC</span>
          <span className={styles.timecodeText}>{formatTimecode(currentTime)}</span>
        </div>

        {/* Big play indicator when paused and not scrubbing */}
        {!isPlaying && !isScrubbing && !hudFeedback && (
          <div className={styles.pausedIndicator}>
            <div className={styles.pauseCircle}>
              <Play size={24} fill="#ffffff" />
            </div>
          </div>
        )}

        {/* Live Scrub HUD Feedback */}
        {isScrubbing && (
          <div className={styles.scrubIndicator}>
            <span className={styles.scrubIcon}>
              {scrubDirection === "forward" ? "▶▶ SCRUB FORWARD" : "◀◀ REWIND"}
            </span>
            <span className={styles.scrubTime}>{formatTimecode(currentTime)}</span>
          </div>
        )}

        {/* On-screen Mode Shift / Volume HUD Overlay */}
        {hudFeedback && (
          <div className={styles.volumeHudOverlay}>
            <div className={styles.volumeHudContent}>
              <div className={styles.volumeHudHeader}>
                {hudFeedback.type === "volume" ? (
                  isMuted || volume === 0 ? (
                    <VolumeX size={18} color="#ff453a" />
                  ) : (
                    <Volume2 size={18} color="#30d158" />
                  )
                ) : (
                  <Sliders size={18} color="#ffffff" />
                )}
                <span className={styles.volumeHudTitle}>{hudFeedback.text}</span>
              </div>

              {hudFeedback.type === "volume" && (
                <div className={styles.volumeHudTrack}>
                  <div
                    className={styles.volumeHudFill}
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress track at bottom of screen */}
        <div className={styles.screenProgress}>
          <div
            className={styles.screenProgressBar}
            style={{ width: `${(progress * 100).toFixed(2)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
