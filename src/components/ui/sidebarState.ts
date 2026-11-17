"use client";

export const OPEN_SIDEBAR_EVENT = "open-sidebar";
export const CLOSE_SIDEBAR_EVENT = "close-sidebar";
export const TOGGLE_SIDEBAR_EVENT = "toggle-sidebar";

export function openSidebar() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_SIDEBAR_EVENT));
  }
}

export function closeSidebar() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CLOSE_SIDEBAR_EVENT));
  }
}

export function toggleSidebar() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(TOGGLE_SIDEBAR_EVENT));
  }
}
