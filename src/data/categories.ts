export interface WorkCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  disciplines: string[];
  imageUrl: string;
  projectCount: number;
  featuredProjectTitle: string;
  projectId: string;
}

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    id: "cat-directing",
    number: "01",
    title: "Narrative & Short Film",
    subtitle: "Pacing, Rhythm & Visual Storytelling",
    description:
      "Directing and cutting short narrative pieces—focusing on sub-dialogue tension, quiet atmospheric pauses, and emotional momentum.",
    disciplines: ["Short Films", "Narrative Cuts", "Color Grading"],
    imageUrl: "/assets/projects/chroma-hero.jpg",
    projectCount: 2,
    featuredProjectTitle: "After Hours (02:14 AM)",
    projectId: "after-hours",
  },
  {
    id: "cat-reels",
    number: "02",
    title: "Reels & Short-Form",
    subtitle: "High-Retention Instagram Reels & Specs",
    description:
      "Crafting high-impact 9:16 vertical content designed for instant algorithmic retention, seamless match-cuts, and rhythmic pacing.",
    disciplines: ["Instagram Reels", "Speed Ramps", "Kinetic Typography"],
    imageUrl: "/assets/projects/cathedral-hero.jpg",
    projectCount: 3,
    featuredProjectTitle: "Pulse // Urban Streetwear Spec",
    projectId: "pulse-streetwear",
  },
  {
    id: "cat-sound-design",
    number: "03",
    title: "Sound Design & Sync",
    subtitle: "Foley, Multi-Cam & Acoustic Architecture",
    description:
      "Layering custom foley, tactile whooshes, and sub-bass textures to give every cut physical weight and emotional impact.",
    disciplines: ["Live Sessions", "Foley Design", "Audio Mixing"],
    imageUrl: "/assets/projects/reach-hero.jpg",
    projectCount: 2,
    featuredProjectTitle: "Echoes in Reverse // Studio Session",
    projectId: "echoes-reverse",
  },
  {
    id: "cat-analog-photo",
    number: "04",
    title: "Visual Journals & Doc",
    subtitle: "Coastal Essays & Ambient Texture",
    description:
      "Run-and-gun documentary storytelling celebrating human moments, authentic location audio, and filmic color palettes.",
    disciplines: ["Travel Montages", "Micro-Docs", "Film Emulation"],
    imageUrl: "/assets/projects/refraction-hero.jpg",
    projectCount: 2,
    featuredProjectTitle: "Monsoon Drift // Coastal Journal",
    projectId: "monsoon-drift",
  },
  {
    id: "cat-art-direction",
    number: "05",
    title: "Brand & Micro-Doc",
    subtitle: "Tactile Artisan Stories & Commercial Specs",
    description:
      "Translating brand identities into authentic micro-stories that combine macro visual textures with intimate interview pacing.",
    disciplines: ["Artisan Profiles", "Brand Edits", "Macro B-Roll"],
    imageUrl: "/assets/projects/spectral-hero.jpg",
    projectCount: 2,
    featuredProjectTitle: "Behind the Craft // The Clay Studio",
    projectId: "behind-the-craft",
  },
];
