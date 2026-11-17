"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  OPEN_CONTACT_MODAL_EVENT,
  CLOSE_CONTACT_MODAL_EVENT,
} from "@/components/contact/contactModalState";
import {
  OPEN_RESUME_MODAL_EVENT,
  CLOSE_RESUME_MODAL_EVENT,
} from "@/components/resume/resumeModalState";
import {
  OPEN_SIDEBAR_EVENT,
  CLOSE_SIDEBAR_EVENT,
} from "@/components/ui/sidebarState";

export const SmoothScrollProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate buttery smooth Lenis kinetic scroll engine
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.25,
      infinite: false,
    });

    lenisRef.current = lenis;

    // RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Pause/Resume Lenis when modal opens or closes
    const handleModalOpen = () => lenis.stop();
    const handleModalClose = () => lenis.start();

    window.addEventListener(OPEN_CONTACT_MODAL_EVENT, handleModalOpen);
    window.addEventListener(CLOSE_CONTACT_MODAL_EVENT, handleModalClose);
    window.addEventListener(OPEN_RESUME_MODAL_EVENT, handleModalOpen);
    window.addEventListener(CLOSE_RESUME_MODAL_EVENT, handleModalClose);
    window.addEventListener(OPEN_SIDEBAR_EVENT, handleModalOpen);
    window.addEventListener(CLOSE_SIDEBAR_EVENT, handleModalClose);

    return () => {
      window.removeEventListener(OPEN_CONTACT_MODAL_EVENT, handleModalOpen);
      window.removeEventListener(CLOSE_CONTACT_MODAL_EVENT, handleModalClose);
      window.removeEventListener(OPEN_RESUME_MODAL_EVENT, handleModalOpen);
      window.removeEventListener(CLOSE_RESUME_MODAL_EVENT, handleModalClose);
      window.removeEventListener(OPEN_SIDEBAR_EVENT, handleModalOpen);
      window.removeEventListener(CLOSE_SIDEBAR_EVENT, handleModalClose);
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
};
