export interface HeroSlide {
  id: string;
  number: string;
  tagline: string;
  header: string;
  description: string;
}

export const HERO_DYNAMIC_SLIDES: HeroSlide[] = [
  {
    id: "slide-01",
    number: "01",
    tagline: "Video Editing & Content",
    header: "Dynamic Cuts & Visual Hooks",
    description:
      "Crafting high-retention short-form content, Instagram reels, and YouTube shorts designed to grab attention and hold it through pacing and rhythm.",
  },
  {
    id: "slide-02",
    number: "02",
    tagline: "Short Films & Narrative",
    header: "Storytelling & Emotion",
    description:
      "Cutting narrative micro-shorts and documentaries with a focus on emotional pacing, subtle sound design, and bringing the director's vision to life.",
  },
  {
    id: "slide-03",
    number: "03",
    tagline: "Sound & Post-Production",
    header: "Audio Mixing & Foley Sync",
    description:
      "Elevating edits with layered sound design, punchy foley, and beat-synced cuts that give every video a polished, professional feel.",
  },
  {
    id: "slide-04",
    number: "04",
    tagline: "Continuous Learning",
    header: "Hungry to Create",
    description:
      "Always experimenting with new tools—from Premiere Pro and DaVinci Resolve to After Effects—to deliver the best possible result for every brief.",
  },
];
