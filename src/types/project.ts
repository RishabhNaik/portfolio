export interface TechnicalSpecs {
  camera?: string;
  lenses?: string;
  audio?: string;
  aspectRatio?: string;
  filmStock?: string;
  colorGrade?: string;
  lighting?: string;
  location?: string;
}

export interface ProductionStill {
  url: string;
  caption: string;
  role?: string;
}

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface BTSShot {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  synopsis?: string;
  director?: string;
  cinematographer?: string;
  client?: string;
  location?: string;
  duration?: string;
  aspectRatio?: string;
  imageUrl: string;
  heroImageUrl?: string;
  coverImageUrl?: string;
  previewUrl?: string;
  mediaType: "video" | "image";
  tags: string[];
  
  // Rich details for the Project Detail Page
  technicalSpecs?: TechnicalSpecs;
  stills?: ProductionStill[];
  credits?: ProjectCredit[];

  // Placement coordinates for the Printed Image Field (Section 03)
  // Deterministic percentage-based values
  printX: number;       // 0 - 100%
  printY: number;       // 0 - 100%
  printWidth: number;   // base width in px for desktop
  rotation: number;     // -4.0 to +4.0 degrees
  zIndex: number;
  label?: string;
}
