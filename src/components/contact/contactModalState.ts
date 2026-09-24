"use client";

export const OPEN_CONTACT_MODAL_EVENT = "open-contact-modal";
export const CLOSE_CONTACT_MODAL_EVENT = "close-contact-modal";

export function openContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_CONTACT_MODAL_EVENT));
  }
}

export function closeContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CLOSE_CONTACT_MODAL_EVENT));
  }
}
