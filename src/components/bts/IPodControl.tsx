"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Sliders,
  Film,
} from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./BTS.module.css";

export type IPodControlMode = "video" | "volume";

interface IPodControlProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onScrub: (deltaSeconds: number) => void;
  currentIndex: number;
  totalCount: number;
  // Volume & Mode shifting props
  controlMode?: IPodControlMode;
  onModeChange?: (mode: IPodControlMode) => void;
  volume?: number;
  onVolumeChange?: (volume: number) => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const IPodControl: React.FC<IPodControlProps> = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onScrub,
  currentIndex,
  totalCount,
  controlMode,
  onModeChange,
  volume: externalVolume,
  onVolumeChange,
  isMuted: externalIsMuted,
  onToggleMute,
}) => {
  // Mode state: "video" (scrub & chapters) vs "volume" (audio level & mute)
  const [internalMode, setInternalMode] = useState<IPodControlMode>("video");
  const activeMode = controlMode !== undefined ? controlMode : internalMode;

  // Volume state fallback
  const [internalVolume, setInternalVolume] = useState<number>(75);
  const currentVolume = externalVolume !== undefined ? externalVolume : internalVolume;

  // Mute state fallback
  const [internalMuted, setInternalMuted] = useState<boolean>(false);
  const isMuted = externalIsMuted !== undefined ? externalIsMuted : internalMuted;

  const [wheelAngle, setWheelAngle] = useState<number>(0);
  const isDraggingWheel = useRef<boolean>(false);
  const lastAngle = useRef<number>(0);
  const accumulatedAngle = useRef<number>(0);
  const wheelCenter = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const wheelContainerRef = useRef<HTMLDivElement>(null);

  // Sync mute state on mount
  useEffect(() => {
    setInternalMuted(cinematicAudioHaptics.getIsMuted());
  }, []);

  const handleSetVolume = useCallback(
    (newVal: number) => {
      const clamped = Math.max(0, Math.min(100, Math.round(newVal)));
      if (onVolumeChange) onVolumeChange(clamped);
      else setInternalVolume(clamped);
    },
    [onVolumeChange]
  );

  const handleToggleMute = useCallback(() => {
    cinematicAudioHaptics.playTactileClick();
    if (onToggleMute) {
      onToggleMute();
    } else {
      const next = cinematicAudioHaptics.toggleMute();
      setInternalMuted(next);
    }
  }, [onToggleMute]);

  // Toggle mode on MENU click
  const handleToggleMode = () => {
    cinematicAudioHaptics.playTactileClick();
    const nextMode: IPodControlMode = activeMode === "video" ? "volume" : "video";
    if (onModeChange) onModeChange(nextMode);
    else setInternalMode(nextMode);
  };

  // Wheel event listener: scrubs video in "video" mode, adjusts volume in "volume" mode
  useEffect(() => {
    const el = wheelContainerRef.current;
    if (!el) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      cinematicAudioHaptics.playSlateTick();
      const delta = e.deltaY !== 0 ? (e.deltaY > 0 ? 1 : -1) : (e.deltaX > 0 ? 1 : -1);

      if (activeMode === "video") {
        const scrubSeconds = delta * 1.5;
        onScrub(scrubSeconds);
      } else {
        // Volume mode: adjust volume in steps of 3%
        const volChange = delta > 0 ? -3 : 3;
        handleSetVolume(currentVolume + volChange);
      }

      setWheelAngle((prev) => prev + (delta > 0 ? 18 : -18));
    };

    el.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheelNative);
    };
  }, [onScrub, activeMode, currentVolume, handleSetVolume]);

  // Circular rotary drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === "BUTTON") return;

    const rect = e.currentTarget.getBoundingClientRect();
    wheelCenter.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    lastAngle.current = Math.atan2(
      e.clientY - wheelCenter.current.y,
      e.clientX - wheelCenter.current.x
    );

    isDraggingWheel.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingWheel.current) return;

    const currentAngle = Math.atan2(
      e.clientY - wheelCenter.current.y,
      e.clientX - wheelCenter.current.x
    );

    let diff = currentAngle - lastAngle.current;
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;

    lastAngle.current = currentAngle;
    accumulatedAngle.current += Math.abs(diff);
    if (accumulatedAngle.current > 0.2) {
      cinematicAudioHaptics.playSlateTick();
      accumulatedAngle.current = 0;
    }

    if (activeMode === "video") {
      const scrubSeconds = diff * 3.8;
      onScrub(scrubSeconds);
    } else {
      const volDelta = Math.round(diff * 28);
      if (volDelta !== 0) {
        handleSetVolume(currentVolume + volDelta);
      }
    }

    setWheelAngle((prev) => prev + diff * (180 / Math.PI));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingWheel.current) {
      isDraggingWheel.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div
      className={styles.ipodWrapper}
      role="region"
      aria-label="Physical iPod Jog Wheel Media & Volume Controller"
      title="Click MENU to shift between Video & Volume controls. Rotate wheel to adjust."
    >
      <div
        ref={wheelContainerRef}
        className={`${styles.ipodWheelContainer} ${
          activeMode === "volume" ? styles.ipodWheelVolumeMode : ""
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Outer Wheel Ring with tactile rotation feedback */}
        <div className={styles.clickWheel}>
          {/* Subtle rotating tick mark following your scroll/drag motion */}
          <div
            className={styles.wheelTickRing}
            style={{ transform: `rotate(${wheelAngle.toFixed(1)}deg)` }}
          >
            <span
              className={`${styles.wheelTickMark} ${
                activeMode === "volume" ? styles.wheelTickMarkVolume : ""
              }`}
            />
          </div>

          {/* Top Button: MENU (Shifts between Video and Volume modes!) */}
          <button
            className={`${styles.wheelButton} ${styles.btnMenu} ${
              activeMode === "volume" ? styles.btnMenuActive : ""
            }`}
            aria-label="Toggle between Video and Volume Controls"
            title="Shift Controls: Video / Volume"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMode();
            }}
          >
            MENU
          </button>

          {/* Left Button: PREV SHOT (Video) / VOLUME DOWN (Volume) */}
          <button
            className={`${styles.wheelButton} ${styles.btnLeft}`}
            aria-label={activeMode === "video" ? "Previous Shot" : "Volume Down"}
            title={activeMode === "video" ? "Previous Shot" : "Volume Down (-5%)"}
            onClick={(e) => {
              e.stopPropagation();
              cinematicAudioHaptics.playTactileClick();
              if (activeMode === "video") {
                onPrev();
              } else {
                handleSetVolume(currentVolume - 5);
              }
            }}
          >
            {activeMode === "video" ? <SkipBack size={13} /> : <Volume1 size={13} />}
          </button>

          {/* Right Button: NEXT SHOT (Video) / VOLUME UP (Volume) */}
          <button
            className={`${styles.wheelButton} ${styles.btnRight}`}
            aria-label={activeMode === "video" ? "Next Shot" : "Volume Up"}
            title={activeMode === "video" ? "Next Shot" : "Volume Up (+5%)"}
            onClick={(e) => {
              e.stopPropagation();
              cinematicAudioHaptics.playTactileClick();
              if (activeMode === "video") {
                onNext();
              } else {
                handleSetVolume(currentVolume + 5);
              }
            }}
          >
            {activeMode === "video" ? <SkipForward size={13} /> : <Volume2 size={13} />}
          </button>

          {/* Bottom Button: PLAY/PAUSE (Video) / MUTE (Volume) */}
          <button
            className={`${styles.wheelButton} ${styles.btnPlayPause}`}
            aria-label={
              activeMode === "video"
                ? isPlaying
                  ? "Pause"
                  : "Play"
                : isMuted
                ? "Unmute"
                : "Mute"
            }
            title={
              activeMode === "video"
                ? isPlaying
                  ? "Pause"
                  : "Play"
                : isMuted
                ? "Unmute"
                : "Mute"
            }
            onClick={(e) => {
              e.stopPropagation();
              cinematicAudioHaptics.playTactileClick();
              if (activeMode === "video") {
                onTogglePlay();
              } else {
                handleToggleMute();
              }
            }}
          >
            {activeMode === "video" ? (
              isPlaying ? (
                <Pause size={13} />
              ) : (
                <Play size={13} fill="currentColor" />
              )
            ) : isMuted ? (
              <VolumeX size={13} color="#ff453a" />
            ) : (
              <Volume2 size={13} />
            )}
          </button>

          {/* Center Circular Select Button */}
          <button
            className={`${styles.centerButton} ${
              activeMode === "volume" ? styles.centerButtonVolume : ""
            }`}
            aria-label={activeMode === "video" ? "Toggle Play" : "Toggle Mute"}
            title={activeMode === "video" ? "Toggle Play" : "Toggle Mute"}
            onClick={(e) => {
              e.stopPropagation();
              cinematicAudioHaptics.playTactileClick();
              if (activeMode === "video") {
                onTogglePlay();
              } else {
                handleToggleMute();
              }
            }}
          >
            <span className={styles.centerGleam} />
          </button>
        </div>
      </div>

      {/* Mode Status Pill beneath the wheel */}
      <div
        className={styles.ipodStatus}
        onClick={handleToggleMode}
        role="button"
        tabIndex={0}
        title="Click to shift between Video and Volume modes"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleToggleMode();
        }}
      >
        {activeMode === "video" ? (
          <span className={styles.ipodTrackNumber}>
            <Film size={10} className={styles.statusModeIcon} />
            <span>VIDEO {String(currentIndex + 1).padStart(2, "0")}/{String(totalCount).padStart(2, "0")}</span>
          </span>
        ) : (
          <span className={`${styles.ipodTrackNumber} ${styles.ipodStatusVolumeActive}`}>
            {isMuted ? (
              <>
                <VolumeX size={10} color="#ff453a" className={styles.statusModeIcon} />
                <span>MUTED</span>
              </>
            ) : (
              <>
                <Volume2 size={10} className={styles.statusModeIcon} />
                <span>VOL {currentVolume}%</span>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

