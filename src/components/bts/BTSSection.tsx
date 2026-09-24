"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { BTSShot } from "@/types/project";
import { MediaPlayer } from "./MediaPlayer";
import { BTSDetails } from "./BTSDetails";
import { IPodControl } from "./IPodControl";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./BTS.module.css";

interface BTSSectionProps {
  projects: BTSShot[];
  activeShot: BTSShot;
  onSelectShot: (shot: BTSShot) => void;
}

export const BTSSection: React.FC<BTSSectionProps> = ({
  projects,
  activeShot,
  onSelectShot,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(14.3); // Initial second
  const [duration, setDuration] = useState<number>(88.0); // Total clip duration
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [scrubDirection, setScrubDirection] = useState<"forward" | "backward" | null>(null);

  // iPod Control Mode: "video" vs "volume"
  const [controlMode, setControlMode] = useState<"video" | "volume">("video");
  const [volume, setVolume] = useState<number>(75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hudFeedback, setHudFeedback] = useState<{
    type: "mode" | "volume";
    text: string;
    value?: number;
  } | null>(null);

  const scrubTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hudTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndex = projects.findIndex((p) => p.id === activeShot.id);

  // Sync mute state on mount
  useEffect(() => {
    setIsMuted(cinematicAudioHaptics.getIsMuted());
  }, []);

  const triggerHud = useCallback((type: "mode" | "volume", text: string, value?: number) => {
    setHudFeedback({ type, text, value });
    if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    hudTimeoutRef.current = setTimeout(() => {
      setHudFeedback(null);
    }, 1800);
  }, []);

  const handleModeChange = useCallback(
    (newMode: "video" | "volume") => {
      setControlMode(newMode);
      if (newMode === "volume") {
        triggerHud("volume", `VOLUME CONTROLS`, volume);
      } else {
        triggerHud("mode", "VIDEO // SCRUB CONTROLS");
      }
    },
    [volume, triggerHud]
  );

  const handleVolumeChange = useCallback(
    (newVol: number) => {
      setVolume(newVol);
      triggerHud("volume", `VOLUME: ${newVol}%`, newVol);
    },
    [triggerHud]
  );

  const handleToggleMute = useCallback(() => {
    const next = cinematicAudioHaptics.toggleMute();
    setIsMuted(next);
    triggerHud("volume", next ? "MUTED" : `UNMUTED // ${volume}%`, next ? 0 : volume);
  }, [volume, triggerHud]);

  // Parse duration from shot if available (e.g. "14 min 28 sec" -> 868s, or default to 88s)
  useEffect(() => {
    if (activeShot.duration) {
      const matchMin = activeShot.duration.match(/(\d+)\s*min/);
      const matchSec = activeShot.duration.match(/(\d+)\s*sec/);
      let totalSec = 0;
      if (matchMin) totalSec += parseInt(matchMin[1], 10) * 60;
      if (matchSec) totalSec += parseInt(matchSec[1], 10);
      if (totalSec > 0) setDuration(totalSec);
      else setDuration(88.0);
    } else {
      setDuration(88.0);
    }
  }, [activeShot]);

  // Video playback animation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + dt;
          if (next >= duration) return 0; // Loop back
          return next;
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, duration]);

  // Scrub handler triggered by scrolling or spinning the iPod wheel
  const handleScrub = useCallback(
    (deltaSeconds: number) => {
      setCurrentTime((prev) => {
        const next = Math.max(0, Math.min(duration, prev + deltaSeconds));
        return next;
      });

      setIsScrubbing(true);
      setScrubDirection(deltaSeconds > 0 ? "forward" : "backward");

      if (scrubTimeoutRef.current) clearTimeout(scrubTimeoutRef.current);
      scrubTimeoutRef.current = setTimeout(() => {
        setIsScrubbing(false);
        setScrubDirection(null);
      }, 700);
    },
    [duration]
  );

  const handleNext = () => {
    cinematicAudioHaptics.playTactileClick();
    const nextIndex = (currentIndex + 1) % projects.length;
    onSelectShot(projects[nextIndex]);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    cinematicAudioHaptics.playTactileClick();
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    onSelectShot(projects[prevIndex]);
    setCurrentTime(0);
  };

  const handleTogglePlay = () => {
    cinematicAudioHaptics.playTactileClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="bts" className={styles.btsSection} aria-label="Behind The Scenes Media">
      <div className={styles.sectionHeader}>
        <div className={styles.headerContainer}>
          <span className={styles.sectionBadge}>Process &amp; Practice</span>
          <h2 className={styles.sectionHeading}>How I’m Building the Work</h2>
        </div>
      </div>

      {/* Main Container stretches full-width across the section */}
      <div className={styles.btsMainContainer}>
        {/* Left dominant column: Cinematic Video Player */}
        <div className={styles.leftColumn}>
          <div className={styles.playerWrapper}>
            <MediaPlayer
              shot={activeShot}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onNext={handleNext}
              onPrev={handlePrev}
              currentTime={currentTime}
              duration={duration}
              isScrubbing={isScrubbing}
              scrubDirection={scrubDirection}
              volume={volume}
              isMuted={isMuted}
              hudFeedback={hudFeedback}
            />

            {/* Tactile iPod Click Wheel Controller */}
            <div className={styles.ipodAnchor}>
              <IPodControl
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                onNext={handleNext}
                onPrev={handlePrev}
                onScrub={handleScrub}
                currentIndex={currentIndex}
                totalCount={projects.length}
                controlMode={controlMode}
                onModeChange={handleModeChange}
                volume={volume}
                onVolumeChange={handleVolumeChange}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
              />
            </div>
          </div>
        </div>

        {/* Right column: Editorial BTS Details & Backstory */}
        <div className={styles.rightColumn}>
          <BTSDetails
            shot={activeShot}
            currentIndex={currentIndex}
            totalCount={projects.length}
            onSelectIndex={(idx) => {
              onSelectShot(projects[idx]);
              setCurrentTime(0);
            }}
          />
        </div>
      </div>
    </section>
  );
};
