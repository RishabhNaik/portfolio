"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, SkipBack, SkipForward, Compass } from "lucide-react";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./GlobalMobileIPod.module.css";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export const GlobalMobileIPod: React.FC = () => {
  const [wheelAngle, setWheelAngle] = useState<number>(0);
  const [statusLabel, setStatusLabel] = useState<string>("IPOD NAV");
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [totalElements, setTotalElements] = useState<number>(0);

  const isDraggingWheel = useRef<boolean>(false);
  const lastAngle = useRef<number>(0);
  const accumulatedWheelDelta = useRef<number>(0);
  const wheelCenter = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const currentFocusedEl = useRef<HTMLElement | null>(null);

  // Helper to query all interactable elements excluding the controller itself
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (typeof document === "undefined") return [];

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    return nodes.filter((el) => {
      if (el.closest('[data-ipod-controller="true"]')) return false;

      // Check if element is visible and rendered
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);

      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        style.opacity === "0" ||
        (rect.width === 0 && rect.height === 0)
      ) {
        return false;
      }
      return true;
    });
  }, []);

  // Update focus to a specific element with visual ring and sound feedback
  const applyFocusToElement = useCallback(
    (el: HTMLElement, index: number, total: number) => {
      // Clear previous focus attribute
      if (currentFocusedEl.current && currentFocusedEl.current !== el) {
        currentFocusedEl.current.removeAttribute("data-ipod-focused");
      }

      currentFocusedEl.current = el;
      el.setAttribute("data-ipod-focused", "true");
      el.focus({ preventScroll: true });

      // Smooth scroll into viewport center
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

      // Audio & tactile haptic tick
      cinematicAudioHaptics.playSlateTick();
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(10);
      }

      // Generate concise label for the OLED status pill
      const rawText = (
        el.innerText ||
        el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        el.tagName
      ).trim();
      const cleanLabel = rawText.replace(/\s+/g, " ").slice(0, 12);

      setStatusLabel(`${cleanLabel || "ITEM"} ${index + 1}/${total}`);
      setCurrentIndex(index);
      setTotalElements(total);
    },
    []
  );

  // Step forward (clockwise / Next)
  const handleStepNext = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;

    let nextIdx = 0;
    if (currentFocusedEl.current) {
      const idx = elements.indexOf(currentFocusedEl.current);
      if (idx !== -1) {
        nextIdx = (idx + 1) % elements.length;
      }
    } else {
      // If none focused yet, pick the first visible element at or below top of viewport
      const inViewIdx = elements.findIndex((el) => el.getBoundingClientRect().top >= 80);
      nextIdx = inViewIdx !== -1 ? inViewIdx : 0;
    }

    applyFocusToElement(elements[nextIdx], nextIdx, elements.length);
  }, [getFocusableElements, applyFocusToElement]);

  // Step backward (counter-clockwise / Prev)
  const handleStepPrev = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;

    let prevIdx = elements.length - 1;
    if (currentFocusedEl.current) {
      const idx = elements.indexOf(currentFocusedEl.current);
      if (idx !== -1) {
        prevIdx = (idx - 1 + elements.length) % elements.length;
      }
    } else {
      const inViewIdx = elements.findIndex((el) => el.getBoundingClientRect().top >= 80);
      prevIdx = inViewIdx !== -1 ? inViewIdx : 0;
    }

    applyFocusToElement(elements[prevIdx], prevIdx, elements.length);
  }, [getFocusableElements, applyFocusToElement]);

  // Center button: simulate click on the highlighted element
  const handleSelectClick = useCallback(() => {
    cinematicAudioHaptics.playTactileClick();
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(25);
    }

    if (currentFocusedEl.current) {
      currentFocusedEl.current.click();
    } else {
      // If nothing selected, pick the first element
      handleStepNext();
    }
  }, [handleStepNext]);

  // Top MENU button: scroll to top of page
  const handleMenuClick = useCallback(() => {
    cinematicAudioHaptics.playTactileClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStatusLabel("TOP OF PAGE");
  }, []);

  // Bottom button: scroll down a section
  const handleBottomClick = useCallback(() => {
    cinematicAudioHaptics.playTactileClick();
    window.scrollBy({ top: window.innerHeight * 0.65, behavior: "smooth" });
  }, []);

  // Pointer drag rotary gestures on the click wheel
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
    accumulatedWheelDelta.current = 0;
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
    accumulatedWheelDelta.current += diff;

    // Threshold ~22 degrees (0.38 rad) per tab step
    const STEP_THRESHOLD = 0.38;
    if (accumulatedWheelDelta.current >= STEP_THRESHOLD) {
      handleStepNext();
      accumulatedWheelDelta.current -= STEP_THRESHOLD;
    } else if (accumulatedWheelDelta.current <= -STEP_THRESHOLD) {
      handleStepPrev();
      accumulatedWheelDelta.current += STEP_THRESHOLD;
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

  // Clean up focus indicator when component unmounts
  useEffect(() => {
    return () => {
      if (currentFocusedEl.current) {
        currentFocusedEl.current.removeAttribute("data-ipod-focused");
      }
    };
  }, []);

  return (
    <div
      className={styles.globalIpodWrapper}
      data-ipod-controller="true"
      role="region"
      aria-label="Global iPod Mobile Website Tab Navigator"
      title="Global iPod Controller: Rotate or use buttons to navigate and select elements"
    >
      <div
        ref={wheelContainerRef}
        className={styles.ipodWheelContainer}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className={styles.clickWheel}>
          {/* Rotating tick ring */}
          <div
            className={styles.wheelTickRing}
            style={{ transform: `rotate(${wheelAngle.toFixed(1)}deg)` }}
          >
            <span className={styles.wheelTickMark} />
          </div>

          {/* Top Button: MENU (Scroll to Top) */}
          <button
            className={`${styles.wheelButton} ${styles.btnMenu}`}
            aria-label="Scroll to top of website"
            title="Menu: Scroll to Top"
            onClick={(e) => {
              e.stopPropagation();
              handleMenuClick();
            }}
          >
            MENU
          </button>

          {/* Left Button: PREVIOUS ELEMENT */}
          <button
            className={`${styles.wheelButton} ${styles.btnLeft}`}
            aria-label="Previous interactive element"
            title="Previous item"
            onClick={(e) => {
              e.stopPropagation();
              handleStepPrev();
            }}
          >
            <SkipBack size={13} />
          </button>

          {/* Right Button: NEXT ELEMENT */}
          <button
            className={`${styles.wheelButton} ${styles.btnRight}`}
            aria-label="Next interactive element"
            title="Next item"
            onClick={(e) => {
              e.stopPropagation();
              handleStepNext();
            }}
          >
            <SkipForward size={13} />
          </button>

          {/* Bottom Button: SCROLL DOWN */}
          <button
            className={`${styles.wheelButton} ${styles.btnBottom}`}
            aria-label="Scroll down page"
            title="Scroll Down"
            onClick={(e) => {
              e.stopPropagation();
              handleBottomClick();
            }}
          >
            <ChevronDown size={13} />
          </button>

          {/* Center Button: SELECT / CLICK */}
          <button
            className={styles.centerButton}
            aria-label="Select / Click focused element"
            title="Select highlighted item"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectClick();
            }}
          >
            <span className={styles.centerGleam} />
          </button>
        </div>
      </div>

      {/* OLED Status Pill beneath wheel */}
      <div
        className={styles.ipodStatus}
        onClick={handleSelectClick}
        role="button"
        tabIndex={0}
        title="Current focused element - Tap center button or this pill to activate"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleSelectClick();
        }}
      >
        <span className={styles.ipodTrackNumber}>
          <Compass size={10} className={styles.statusModeIcon} />
          <span>{statusLabel}</span>
        </span>
      </div>
    </div>
  );
};
