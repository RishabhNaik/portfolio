export interface SoftwareArchitecture {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  cloud?: string[];
  api?: string[];
  ai?: string[];
}

export interface TechnicalDecision {
  title: string;
  rationale: string;
}

export interface ProjectScreenshot {
  url: string;
  caption: string;
  tag?: string;
  role?: string;
}

export interface TechnicalSpecs {
  frontend?: string;
  backend?: string;
  database?: string;
  infrastructure?: string;
  architecture?: string;
  testing?: string;
  auth?: string;
  location?: string;
  [key: string]: string | undefined;
}

export interface SoftwareProject {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  synopsis?: string;
  role: string;
  company: string;
  location: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  
  // Case Study Sections
  problem?: string;
  product?: string;
  contribution: string;
  architecture?: SoftwareArchitecture;
  technicalDecisions?: TechnicalDecision[];
  results?: string[];
  learnings?: string;

  // Media
  imageUrl: string;
  heroImageUrl?: string;
  coverImageUrl?: string;
  previewUrl?: string;
  tags: string[];
  screenshots?: ProjectScreenshot[];

  // Backwards compatibility
  technicalSpecs?: TechnicalSpecs;
  stills?: ProjectScreenshot[];
  mediaType?: "video" | "image";
  client?: string;
  director?: string;
  cinematographer?: string;
  duration?: string;
  aspectRatio?: string;
  printX?: number;
  printY?: number;
  printWidth?: number;
  rotation?: number;
  zIndex?: number;
  label?: string;
}

// Alias for backwards compatibility
export type BTSShot = SoftwareProject;
