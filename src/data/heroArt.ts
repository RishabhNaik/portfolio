export interface HeroArtAccent {
  primary: string;
  secondary: string;
  tertiary?: string;
  gradient: string;
  glowHex: string;
  shadow: string;
}

export interface FeaturedArtPiece {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  year?: string;
  medium?: string;
  accent: HeroArtAccent;
}

// Dedicated collection of 5 unique 16:9 cinematic widescreen artworks exclusively for the Hero Showcase
export const FEATURED_HERO_ART: FeaturedArtPiece[] = [
  {
    id: "hero-art-01",
    title: "Anamorphic Twilight Horizon",
    subtitle: "Optics & Solitude",
    imageUrl: "/assets/hero/hero-1.jpg",
    year: "2024",
    medium: "35mm Anamorphic Flare & Volumetric Salt Flats",
    accent: {
      primary: "#00d4ff",
      secondary: "#38bdf8",
      tertiary: "#0284c7",
      glowHex: "#00d4ff",
      gradient:
        "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0, 212, 255, 0.35) 0%, rgba(56, 189, 248, 0.22) 40%, rgba(2, 132, 199, 0.12) 68%, transparent 88%)",
      shadow: "rgba(0, 212, 255, 0.45)",
    },
  },
  {
    id: "hero-art-02",
    title: "Cathedral Solar Infiltration",
    subtitle: "Gothic Light Sculpture",
    imageUrl: "/assets/hero/hero-2.jpg",
    year: "2024",
    medium: "Monochrome Chiaroscuro & Volumetric Haze",
    accent: {
      primary: "#cbd5e1",
      secondary: "#38bdf8",
      tertiary: "#64748b",
      glowHex: "#e2e8f0",
      gradient:
        "radial-gradient(ellipse 85% 85% at 50% 30%, rgba(226, 232, 240, 0.38) 0%, rgba(56, 189, 248, 0.2) 42%, rgba(100, 116, 139, 0.12) 70%, transparent 88%)",
      shadow: "rgba(226, 232, 240, 0.35)",
    },
  },
  {
    id: "hero-art-03",
    title: "Abyssal Light Dispersion",
    subtitle: "Oceanic Hydrophone Reel",
    imageUrl: "/assets/hero/hero-3.jpg",
    year: "2024",
    medium: "Underwater Cavitation & Sapphire Refraction",
    accent: {
      primary: "#00a6ff",
      secondary: "#06b6d4",
      tertiary: "#0c4a6e",
      glowHex: "#00a6ff",
      gradient:
        "radial-gradient(ellipse 95% 85% at 50% 25%, rgba(0, 166, 255, 0.4) 0%, rgba(6, 182, 212, 0.24) 42%, rgba(12, 74, 110, 0.15) 72%, transparent 90%)",
      shadow: "rgba(0, 166, 255, 0.5)",
    },
  },
  {
    id: "hero-art-04",
    title: "Quartz Prismatic Split",
    subtitle: "Optical Physics",
    imageUrl: "/assets/hero/hero-4.jpg",
    year: "2024",
    medium: "Macro Optical Dispersion & Caustic Spectrum",
    accent: {
      primary: "#8b5cf6",
      secondary: "#06b6d4",
      tertiary: "#c084fc",
      glowHex: "#a855f7",
      gradient:
        "radial-gradient(ellipse 90% 75% at 45% 60%, rgba(139, 92, 246, 0.38) 0%, rgba(6, 182, 212, 0.24) 38%, rgba(192, 132, 252, 0.18) 65%, transparent 88%)",
      shadow: "rgba(168, 85, 247, 0.45)",
    },
  },
  {
    id: "hero-art-05",
    title: "Kinetic Soundstage Silhouette",
    subtitle: "Choreography in Mist",
    imageUrl: "/assets/hero/hero-5.jpg",
    year: "2024",
    medium: "High-Speed Motion Picture & Geometric Beams",
    accent: {
      primary: "#2563eb",
      secondary: "#38bdf8",
      tertiary: "#94a3b8",
      glowHex: "#3b82f6",
      gradient:
        "radial-gradient(ellipse 90% 80% at 50% 40%, rgba(37, 99, 235, 0.38) 0%, rgba(56, 189, 248, 0.24) 40%, rgba(148, 163, 184, 0.15) 70%, transparent 88%)",
      shadow: "rgba(37, 99, 235, 0.45)",
    },
  },
];
