export interface HeroTileItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  imageUrl: string;
  projectUrl: string;
  specs?: string;
  metric?: string;
  year?: string;
}

export const HERO_CARDS: HeroTileItem[] = [
  {
    id: "kroma-brand-system",
    title: "Kroma Editorial",
    category: "Graphic Design",
    tag: "Branding",
    specs: "Print & Type • Swiss Grid",
    metric: "Identity",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600&auto=format&fit=crop",
    projectUrl: "/projects/kroma-brand-system",
  },
  {
    id: "velocity-kinetic-cut",
    title: "Velocity",
    category: "Video Editing",
    tag: "Commercial",
    specs: "16mm Cine • 120fps",
    metric: "00:45",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop",
    projectUrl: "/projects/velocity-kinetic-cut",
  },
  {
    id: "aura-os-wearable",
    title: "Aura OS",
    category: "UI/UX Design",
    tag: "Case Study",
    specs: "Spatial UX • Wearable",
    metric: "Case Study",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    projectUrl: "/projects/aura-os-wearable",
  },
  {
    id: "prismatica-spectral-art",
    title: "Prismatica",
    category: "Digital Art",
    tag: "Generative",
    specs: "Raymarching • GLSL",
    metric: "Generative",
    year: "2024",
    imageUrl: "/assets/projects/refraction-hero.jpg",
    projectUrl: "/projects/prismatica-spectral-art",
  },
  {
    id: "nexus-studio-engine",
    title: "Nexus Studio",
    category: "Software Dev",
    tag: "WebGPU",
    specs: "Rust • Next.js • Wasm",
    metric: "Web Engine",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    projectUrl: "/projects/nexus-studio-engine",
  },
  {
    id: "after-hours-cinematography",
    title: "After Hours",
    category: "Cinematography",
    tag: "Film",
    specs: "4K Low-Light • Scope",
    metric: "03:12",
    year: "2024",
    imageUrl: "/assets/projects/cathedral-hero.jpg",
    projectUrl: "/projects/after-hours-cinematography",
  },
];

export const HERO_SQUARE_TILES = HERO_CARDS;
