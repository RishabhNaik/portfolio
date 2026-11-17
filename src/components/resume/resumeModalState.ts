"use client";

export const OPEN_RESUME_MODAL_EVENT = "open-resume-modal";
export const CLOSE_RESUME_MODAL_EVENT = "close-resume-modal";

export function openResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_RESUME_MODAL_EVENT));
  }
}

export function closeResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CLOSE_RESUME_MODAL_EVENT));
  }
}
