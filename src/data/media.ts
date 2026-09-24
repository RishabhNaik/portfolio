export type MediaCategory =
  | "Cinematography"
  | "Photography"
  | "Visual Experiments"
  | "Audio & Sound"
  | "Filmmaking"
  | "Graphic Design";

export interface MediaBreakdown {
  concept: string;
  howAchieved: string;
  gear: {
    camera?: string;
    lensOrOptics?: string;
    lightingOrAcoustics?: string;
    postOrColor?: string;
  };
  takeaway: string;
}

export interface MediaItem {
  id: string;
  title: string;
  fileName: string;
  fileExtension: "MOV" | "RAW" | "WAV" | "TIFF" | "R3D" | "3FR";
  fileSize: string;
  fileKind: string;
  folderId: string;
  folderName: string;
  resolution: string;
  durationOrDimensions: string;
  date: string; // YYYY-MM-DD
  dateFormatted: string;
  category: MediaCategory;
  aspectRatio: string;
  imageUrl: string;
  featured: boolean;
  tags: string[];
  formatBadge: string;
  breakdown: MediaBreakdown;
}

export interface MediaFolder {
  id: string;
  name: string;
  label: string;
  category: MediaCategory;
  itemCount: number;
  totalSize: string;
  description: string;
  accentColor: string;
}

export const FOLDERS: MediaFolder[] = [
  {
    id: "cjp",
    name: "CJP Cinema",
    label: "CJP Cinema",
    category: "Cinematography",
    itemCount: 2,
    totalSize: "2.96 GB",
    description: "Anamorphic optics, custom quartz prism beam-splitters, and Arri Alexa LF cinema reels.",
    accentColor: "#53b8f5",
  },
  {
    id: "shreekar_bhavageethe",
    name: "Shreekar Bhavageethe",
    label: "Shreekar Bhavageethe",
    category: "Audio & Sound",
    itemCount: 2,
    totalSize: "1.04 GB",
    description: "Analog tape decay loops, vocal master tracks, and acoustic spatial recordings.",
    accentColor: "#53b8f5",
  },
  {
    id: "covers",
    name: "Artistic Covers",
    label: "Artistic Covers",
    category: "Graphic Design",
    itemCount: 5,
    totalSize: "780 MB",
    description: "High-contrast Swiss modernist typography posters, gallery exhibition creatives, and gatefold duotone print masters.",
    accentColor: "#53b8f5",
  },
  {
    id: "experiments",
    name: "Visual Experiments",
    label: "Visual Experiments",
    category: "Visual Experiments",
    itemCount: 2,
    totalSize: "4.36 GB",
    description: "Laser dispersion physics, borosilicate prism caustics, and macro optical tests.",
    accentColor: "#53b8f5",
  },
  {
    id: "basagodu_agro_centre",
    name: "Basagodu Agro Centre",
    label: "Basagodu Agro Centre",
    category: "Photography",
    itemCount: 1,
    totalSize: "148.2 MB",
    description: "Architectural documentation, single-source volumetric sunbeams, and medium format negatives.",
    accentColor: "#53b8f5",
  },
  {
    id: "fonts",
    name: "Typography & Fonts",
    label: "Typography & Fonts",
    category: "Graphic Design",
    itemCount: 1,
    totalSize: "84 MB",
    description: "Custom typographical specimens, optical kerning studies, and variable weight systems.",
    accentColor: "#53b8f5",
  },
  {
    id: "rawrish",
    name: "Rawrish Studio",
    label: "Rawrish Studio",
    category: "Cinematography",
    itemCount: 1,
    totalSize: "3.2 GB",
    description: "Core brand archive, director reels, and tactile visual storytelling master files.",
    accentColor: "#53b8f5",
  },
  {
    id: "tss",
    name: "TSS Filmmaking",
    label: "TSS Filmmaking",
    category: "Filmmaking",
    itemCount: 1,
    totalSize: "2.65 GB",
    description: "Monochrome 8K large format narratives, hand silhouette gestures, and theatrical haze.",
    accentColor: "#53b8f5",
  },
];

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: "media-01",
    title: "Chroma Horizon: Optical Flare Rig",
    fileName: "chroma_horizon_ff40mm_anamorphic.mov",
    fileExtension: "MOV",
    fileSize: "1.84 GB",
    fileKind: "QuickTime Cinema Reel (ProRes 4444 XQ)",
    folderId: "cjp",
    folderName: "CJP Cinema",
    resolution: "4448 × 3096 (4.5K Open Gate)",
    durationOrDimensions: "01:24 @ 24.000 fps",
    date: "2024-07-12",
    dateFormatted: "July 12, 2024",
    category: "Cinematography",
    aspectRatio: "16 / 10",
    imageUrl: "/assets/projects/bts-camera.jpg",
    featured: true,
    formatBadge: "Anamorphic 35mm",
    tags: ["Anamorphic", "Arri Alexa", "Optics", "Prism Flare"],
    breakdown: {
      concept:
        "To capture natural optical dispersion and chromatic aberration live in-camera without artificial post-production CGI overlays.",
      howAchieved:
        "I engineered a custom mechanical lens ring mounted directly onto Cooke Anamorphic /i Full Frame Plus primes. Using a hand-cut optical quartz prism suspended on a miniature articulated ball head 2mm in front of the front element, I bounced a 200W Dedolight beam through the prism edge at a 37-degree rake angle. By slowly rotating the polarizing element during the dolly move, the light split into violet, cyan, and amber streaks across the sensor.",
      gear: {
        camera: "Arri Alexa Mini LF (Open Gate 4.5K)",
        lensOrOptics: "Cooke Anamorphic /i Full Frame Plus 40mm SF T2.3",
        lightingOrAcoustics: "Dedolight DLH4 with optical projection lens + 5K Tungsten bounce",
        postOrColor: "DaVinci Resolve / Custom 35mm Kodak 5219 Print LUT",
      },
      takeaway:
        "Physical glass imperfections create an emotional resonance that digital plugins simply cannot replicate. Keeping the prism slightly out of the primary focal plane keeps the actor sharp while turning edge reflections into liquid color.",
    },
  },
  {
    id: "media-02",
    title: "Volumetric Cathedral Sunbeam",
    fileName: "volumetric_cathedral_planar80.3fr",
    fileExtension: "3FR",
    fileSize: "148.2 MB",
    fileKind: "Hasselblad 3FR Medium Format Raw",
    folderId: "basagodu_agro_centre",
    folderName: "Basagodu Agro Centre",
    resolution: "8272 × 6200 (50 MP)",
    durationOrDimensions: "8272 × 6200 px / 16-bit Raw",
    date: "2024-03-24",
    dateFormatted: "March 24, 2024",
    category: "Photography",
    aspectRatio: "4 / 3",
    imageUrl: "/assets/projects/bts-light.jpg",
    featured: true,
    formatBadge: "Medium Format Analog",
    tags: ["Volumetric Light", "Atmospheric Haze", "Black & White", "Architecture"],
    breakdown: {
      concept:
        "Sculpting heavy, three-dimensional architectural light voids inside a decaying industrial hall using single-source lighting and suspension haze.",
      howAchieved:
        "The ambient daylight in the building was flat and lifeless. I sealed 14 out of 16 clerestory window bays with black duvetyne fabric. Outside the single open bay, on an 18-meter cherry picker, we rigged an 18K HMI Fresnel aimed sharply at a 48-degree downward angle. We flooded the space with oil-based micro-haze from two Look Solutions machines, letting it settle for 25 minutes so the beam became a tactile, sculpted pillar of photons.",
      gear: {
        camera: "Hasselblad 503CW / Carl Zeiss Planar 80mm f/2.8",
        lensOrOptics: "Carl Zeiss T* Coating with custom diffusion ring",
        lightingOrAcoustics: "Arri Daylight 18/12 HMI Fresnel + Look Solutions Unique 2.1 Haze",
        postOrColor: "Ilford HP5 Plus pushed 1 stop in Kodak D-76 (1:1)",
      },
      takeaway:
        "Volumetric light is 80% atmospheric consistency. If the haze is patchy, the beam breaks apart; allowing it to settle into uniform suspension makes light feel like solid architecture.",
    },
  },
  {
    id: "media-03",
    title: "Spectral Dispersion: Macro Prism Core",
    fileName: "spectral_laser_dispersion_1000fps.mov",
    fileExtension: "MOV",
    fileSize: "3.42 GB",
    fileKind: "Phantom High-Speed Cine Raw (.cine / ProRes)",
    folderId: "experiments",
    folderName: "Visual Experiments",
    resolution: "4096 × 2304 (4K High-Speed)",
    durationOrDimensions: "00:48 @ 1000 fps",
    date: "2024-08-11",
    dateFormatted: "August 11, 2024",
    category: "Visual Experiments",
    aspectRatio: "1 / 1",
    imageUrl: "/assets/images/hero-spectral.jpg",
    featured: true,
    formatBadge: "Macro Optical Laser",
    tags: ["Prism Macro", "Optical Physics", "Laser Caustics", "Refraction"],
    breakdown: {
      concept:
        "Documenting raw photons separating into pure spectral wavelengths at high frame rate through optical glass under laser stimulation.",
      howAchieved:
        "Inside an optically isolated darkroom chamber, I aligned a 405nm ultraviolet diode laser and a 638nm red diode laser through a custom dichroic beam-splitter cube onto optical breadboards. By micro-focusing the beam onto the beveled corner of an optical quartz prism mounted on a micrometer translation stage, the light underwent total internal reflection and dispersed into ultra-saturated cyan and magenta caustic fringes.",
      gear: {
        camera: "Phantom Flex4K High-Speed (1000 FPS at 4K)",
        lensOrOptics: "Laowa 24mm T14 2x PeriProbe with macro extension tubes",
        lightingOrAcoustics: "Custom Coherent 405nm & 638nm Solid-State Diode Lasers",
        postOrColor: "ACEScg wide gamut color timing with zero digital sharpening",
      },
      takeaway:
        "Working at high macro magnifications requires isolation from physical vibrations. Mounting everything to a magnetic optical breadboard eliminated micro-jitter and let the laser caustics form organic interference patterns.",
    },
  },
  {
    id: "media-04",
    title: "The Reach: Silhouette & Atmospheric Dust",
    fileName: "the_reach_silhouette_summilux35.r3d",
    fileExtension: "R3D",
    fileSize: "2.65 GB",
    fileKind: "REDCODE RAW 8K VV Monochrome",
    folderId: "tss",
    folderName: "TSS Filmmaking",
    resolution: "8192 × 4320 (8K DCI)",
    durationOrDimensions: "02:10 @ 23.976 fps",
    date: "2024-05-18",
    dateFormatted: "May 18, 2024",
    category: "Filmmaking",
    aspectRatio: "16 / 9",
    imageUrl: "/assets/projects/bts-hand.jpg",
    featured: true,
    formatBadge: "RED 8K Monochrome",
    tags: ["Human Gesture", "Silhouette", "Atmospheric", "Low Key"],
    breakdown: {
      concept:
        "An intimate, tactile study of human reaching gesture in an architectural void, exploring yearning and touch through negative space.",
      howAchieved:
        "To achieve rich tonal separation between the actor's skin and the particulate haze without blowing out the highlights, I used an Arri SkyPanel S60-C diffused through 12x12 silent grid cloth as a steep backlight. A black solid floppy flag was placed directly overhead to eliminate all top ambient spill. Actor was instructed to pause and interact with dust particles shaken gently from an overhead theatrical shaker box.",
      gear: {
        camera: "RED V-Raptor 8K VV Monochrome Sensor",
        lensOrOptics: "Leica Summilux-C 35mm T1.4 Cinema Prime",
        lightingOrAcoustics: "Arri SkyPanel S60-C (steep 60° back edge) + Theatrical dust shaker",
        postOrColor: "Native Monochrome Sensor readout / Custom S-Curve contrast grade",
      },
      takeaway:
        "True black-and-white cinematography is about edge separation. By keeping the key light strictly behind the subject and using negative fill on camera-right, the silhouette gains sculptured depth.",
    },
  },
  {
    id: "media-05",
    title: "Prism Cube Caustic Refraction",
    fileName: "prism_cube_caustics_voigtlander65.mov",
    fileExtension: "MOV",
    fileSize: "940 MB",
    fileKind: "ProRes RAW Cinema Master",
    folderId: "experiments",
    folderName: "Visual Experiments",
    resolution: "3840 × 2160 (4K UHD)",
    durationOrDimensions: "01:05 @ 60 fps",
    date: "2024-02-14",
    dateFormatted: "February 14, 2024",
    category: "Visual Experiments",
    aspectRatio: "1 / 1",
    imageUrl: "/assets/images/cube.jpg",
    featured: false,
    formatBadge: "Optical Glass Sculpture",
    tags: ["Caustics", "Refraction", "Glass Cube", "Dispersion"],
    breakdown: {
      concept:
        "Exploring how multi-faceted glass geometries cast complex caustic shadow networks onto matte dark surfaces.",
      howAchieved:
        "A 140mm optical glass cube was suspended above a matte non-reflective black velvet stage. Using a high-CRI halogen spotlight fitted with an iris snood, I projected a focused pencil beam of light into the top apex corner. As light refracted through the interior facets, it projected prismatic caustic spectrum pools onto the floor.",
      gear: {
        camera: "Sony FX6 / Raw 12-bit output",
        lensOrOptics: "Voigtländer 65mm f/2 Macro APO-Lanthar",
        lightingOrAcoustics: "Dedolight Tungsten Spotlight with Iris diaphragm",
        postOrColor: "FilmConvert Nitrate Kodak Vision3 250D emulation",
      },
      takeaway:
        "The angle of incidence changes caustics drastically. A change of just 2 degrees in the light source transforms the caustics from a simple diffuse pool into intricate, sharp caustic web patterns.",
    },
  },
  {
    id: "media-06",
    title: "Abyssal Light: Underwater Hydrophone Reel",
    fileName: "abyssal_hydrophone_slate_quarry.wav",
    fileExtension: "WAV",
    fileSize: "624 MB",
    fileKind: "Broadcast Wave (96kHz / 32-bit Float)",
    folderId: "shreekar_bhavageethe",
    folderName: "Shreekar Bhavageethe",
    resolution: "96.000 kHz / 32-bit Float",
    durationOrDimensions: "05:32 / Dual Channel Ambisonic",
    date: "2024-09-02",
    dateFormatted: "September 2, 2024",
    category: "Audio & Sound",
    aspectRatio: "16 / 9",
    imageUrl: "/assets/images/intro-preview.jpg",
    featured: true,
    formatBadge: "Ambisonic Hydrophone",
    tags: ["Hydrophone", "Foley", "Sound Design", "Oceanic"],
    breakdown: {
      concept:
        "Capturing sub-aquatic resonance, cavitation soundscapes, and metallic pressure groans for deep oceanic film sequences.",
      howAchieved:
        "I deployed a pair of Aquarian Audio H2a hydrophones weighted with brass ballasts at 12-meter and 24-meter depths in a flooded slate quarry. To generate tactile low-frequency cavitation, we agitated the water column with heavy cast-iron chains and hydraulic piston actuators. The signals were captured into a Sound Devices 833 with ultra-low noise preamps and processed through an analog Moog modular ladder filter.",
      gear: {
        camera: "Sound Devices 833 8-channel Field Recorder",
        lensOrOptics: "Dual Aquarian H2a-XLR Hydrophones + LOM Geofon contact mic",
        lightingOrAcoustics: "Underwater acoustic reflection in 40-meter deep slate void",
        postOrColor: "Pro Tools Ultimate / Custom 32-bit floating point modular saturation",
      },
      takeaway:
        "Water conducts low frequencies 4.3 times faster than air. Sub-bass vibrations recorded underwater have an immediate visceral punch that feels like physical weight against the chest.",
    },
  },
  {
    id: "media-07",
    title: "Analog Tape Saturation & Modular Drone",
    fileName: "tape_decay_otari5050_loop.wav",
    fileExtension: "WAV",
    fileSize: "418 MB",
    fileKind: "Analog Tape Master / 15 IPS Reel",
    folderId: "shreekar_bhavageethe",
    folderName: "Shreekar Bhavageethe",
    resolution: "192.000 kHz / 24-bit PCM",
    durationOrDimensions: "04:12 / Stereo 1/4-inch Master",
    date: "2023-11-20",
    dateFormatted: "November 20, 2023",
    category: "Audio & Sound",
    aspectRatio: "16 / 10",
    imageUrl: "/assets/projects/bts-camera.jpg",
    featured: false,
    formatBadge: "1/4-inch Tape Master",
    tags: ["Tape Loop", "Modular Synth", "Soundtrack", "Analog Foley"],
    breakdown: {
      concept:
        "Generating evolving, organic tape loop decay drones for a psychological short film score.",
      howAchieved:
        "Using a vintage Otari MX5050 1/4-inch reel-to-reel tape recorder, I spliced a 12-foot magnetic tape loop across microphone stands around the studio. I recorded dual Eurorack analog oscillator tones through a guitar spring reverb tank into the tape. By letting the loop circulate for 4 hours while physically brushing the magnetic oxide with fine steel wool, the tape created warm, nostalgic dropouts and pitch flutter.",
      gear: {
        camera: "Otari MX5050 2-Track Tape Machine / Nagra IV-S",
        lensOrOptics: "Eurorack Modular (Make Noise DPO + Mutable Clouds)",
        lightingOrAcoustics: "Studio Rig 4 analog patch bay",
        postOrColor: "No digital tape emulation; master captured raw off the playback head",
      },
      takeaway:
        "Physical wear on analog media has an emotional melancholy that algorithmic plugins try to simulate. The random mechanical drag of real tape flutter is impossible to artificially synthesize.",
    },
  },
  {
    id: "media-08",
    title: "Chroma Horizon: Swiss Typographic Poster",
    fileName: "chroma_horizon_swiss_poster_master.tiff",
    fileExtension: "TIFF",
    fileSize: "312 MB",
    fileKind: "16-Bit CMYK Uncompressed Print Master",
    folderId: "covers",
    folderName: "Artistic Covers",
    resolution: "9600 × 12800 px (300 DPI)",
    durationOrDimensions: "Print Ready / Gallery Poster Diptych",
    date: "2024-07-12",
    dateFormatted: "July 12, 2024",
    category: "Graphic Design",
    aspectRatio: "16 / 9",
    imageUrl: "/assets/covers/cover-chroma.jpg",
    featured: true,
    formatBadge: "Modernist Poster Diptych",
    tags: ["Typography", "Poster Design", "Swiss Modernism", "Anamorphic"],
    breakdown: {
      concept:
        "Translating 35mm cinema anamorphic flares and optical dispersion into high-contrast brutalist gallery exhibition poster diptychs.",
      howAchieved:
        "Using bold geometric display typography with circular cutouts and stencil negative spaces, the dual white and black panels establish optical tension. A razor-sharp cyan optical stripe cuts horizontally across the type, mirroring practical anamorphic streak flares.",
      gear: {
        camera: "Epson Perfection V850 Pro Film Scanner (4800 DPI)",
        lensOrOptics: "Rigid baseline modular type grid",
        lightingOrAcoustics: "High-contrast dual tone ink balance",
        postOrColor: "Vector bezier path kerning & custom cyan spot color separation",
      },
      takeaway:
        "High-contrast modernist typography gives cinema key art a museum-grade visual presence that digital marketing layouts rarely achieve.",
    },
  },
  {
    id: "media-09",
    title: "rawrish: Studio Master Reel",
    fileName: "rawrish_master_archive_4k.mov",
    fileExtension: "MOV",
    fileSize: "3.2 GB",
    fileKind: "Apple ProRes 4444 Master",
    folderId: "rawrish",
    folderName: "Rawrish Studio",
    resolution: "3840 × 2160 (4K UHD)",
    durationOrDimensions: "02:45 @ 24.000 fps",
    date: "2024-09-01",
    dateFormatted: "September 1, 2024",
    category: "Cinematography",
    aspectRatio: "16 / 9",
    imageUrl: "/assets/images/reel-thumb.jpg",
    featured: true,
    formatBadge: "Cinema Master 4K",
    tags: ["Portfolio", "Showreel", "Direction", "Optics"],
    breakdown: {
      concept: "Master collection of director's cuts and analog experiments across visual disciplines.",
      howAchieved: "Assembled and graded natively in DaVinci Resolve from camera raw sources across 35mm, 8K RED, and Phantom high-speed captures.",
      gear: {
        camera: "Arri Alexa Mini LF & RED V-Raptor",
        lensOrOptics: "Cooke Anamorphic /i SF & Leica Summilux-C",
        lightingOrAcoustics: "Volumetric Tungsten & HMI Daylight",
        postOrColor: "ACEScg wide gamut workflow",
      },
      takeaway: "Maintaining consistent optical philosophy unites vastly different mediums under one cohesive visual signature.",
    },
  },
  {
    id: "media-10",
    title: "Figtree Typography Specimen & Glyphs",
    fileName: "figtree_variable_specimen_system.tiff",
    fileExtension: "TIFF",
    fileSize: "84 MB",
    fileKind: "Vector Typographic Specimen Sheet",
    folderId: "fonts",
    folderName: "Typography & Fonts",
    resolution: "6000 × 8000 px",
    durationOrDimensions: "Vector Scalable / 300 DPI",
    date: "2024-06-15",
    dateFormatted: "June 15, 2024",
    category: "Graphic Design",
    aspectRatio: "4 / 3",
    imageUrl: "/assets/images/cube.jpg",
    featured: false,
    formatBadge: "Typography & Type",
    tags: ["Type Design", "Font Specimen", "Figtree", "Kerning"],
    breakdown: {
      concept: "Calibrating geometric sans-serif weights for high-legibility cinematic editorial layouts.",
      howAchieved: "Constructed on a 12-column baseline grid with custom optical spacing between headline counters and monospaced metadata numeral sets.",
      gear: {
        camera: "Digital Typography Engine",
        lensOrOptics: "Sub-pixel Font Rendering",
        lightingOrAcoustics: "High-contrast dark-mode luminescence calibration",
        postOrColor: "Precision vector bezier paths",
      },
      takeaway: "Typography establishes the voice of an entire digital architecture before any image is even seen.",
    },
  },
  {
    id: "media-11",
    title: "Cjp: Anamorphic Cylinder Flare Take 04",
    fileName: "cjp_flare_pass_take04_raw.mov",
    fileExtension: "MOV",
    fileSize: "1.12 GB",
    fileKind: "QuickTime ProRes 4444 XQ",
    folderId: "cjp",
    folderName: "CJP Cinema",
    resolution: "4448 × 3096 (4.5K Open Gate)",
    durationOrDimensions: "00:54 @ 24 fps",
    date: "2024-07-14",
    dateFormatted: "July 14, 2024",
    category: "Cinematography",
    aspectRatio: "16 / 10",
    imageUrl: "/assets/projects/chroma-hero.jpg",
    featured: false,
    formatBadge: "Anamorphic RAW",
    tags: ["Anamorphic", "Flare", "Cjp", "Cooke"],
    breakdown: {
      concept: "Testing horizontal streak flare response against high-intensity single-point halogen bounce.",
      howAchieved: "Aiming a raw tungsten filament source at off-axis angles into cylindrical Cooke anamorphic elements to map flare saturation curves.",
      gear: {
        camera: "Arri Alexa Mini LF",
        lensOrOptics: "Cooke Anamorphic /i 40mm SF",
        lightingOrAcoustics: "Mole-Richardson 2K open face",
        postOrColor: "Kodak 2383 film print emulation",
      },
      takeaway: "Special Flare primes retain contrast even under direct off-axis glare when exposed properly.",
    },
  },
  {
    id: "media-12",
    title: "Cathedral Shadows: Monochrome Void Poster",
    fileName: "cathedral_shadows_brutalist_print.tiff",
    fileExtension: "TIFF",
    fileSize: "148 MB",
    fileKind: "CMYK Exhibition Print File",
    folderId: "covers",
    folderName: "Artistic Covers",
    resolution: "7200 × 7200 px",
    durationOrDimensions: "Gallery Diptych / Architectural Print",
    date: "2024-03-24",
    dateFormatted: "March 24, 2024",
    category: "Graphic Design",
    aspectRatio: "16 / 9",
    imageUrl: "/assets/covers/cover-cathedral.jpg",
    featured: true,
    formatBadge: "Architectural Poster",
    tags: ["Monochrome", "Brutalist", "Architecture", "Poster Art"],
    breakdown: {
      concept: "Designing a stark brutalist architectural typography poster diptych exploring gothic voids and single-source daylight.",
      howAchieved: "Stark monolithic typography with architectural arches, circular counter cuts, and pure black and white polarity.",
      gear: {
        camera: "Hasselblad 503CW scan / Digital Vector Typography",
        lensOrOptics: "Architectural proportions",
        lightingOrAcoustics: "High-contrast monochrome polarity",
        postOrColor: "Pure deep carbon black & crisp titanium white",
      },
      takeaway: "Geometric stencil typography turns architectural void photography into iconic visual language.",
    },
  },
  {
    id: "media-13",
    title: "Abyssal Frequency: Acoustic Wave Poster",
    fileName: "abyssal_frequency_acoustic_poster.tiff",
    fileExtension: "TIFF",
    fileSize: "164 MB",
    fileKind: "CMYK Exhibition Poster Master",
    folderId: "covers",
    folderName: "Artistic Covers",
    resolution: "7200 × 7200 px",
    durationOrDimensions: "Sonic Study / Gallery Print",
    date: "2024-09-02",
    dateFormatted: "September 2, 2024",
    category: "Graphic Design",
    aspectRatio: "16 / 9",
    imageUrl: "/assets/covers/cover-abyssal.jpg",
    featured: true,
    formatBadge: "Sonic Typographic Print",
    tags: ["Sound Design", "Hydrophone", "Swiss Poster", "Acoustics"],
    breakdown: {
      concept: "Visualizing underwater acoustic resonance, cavitation frequencies, and pressure waves into avant-garde modernist poster art.",
      howAchieved: "Constructed with concentric circular soundwave cuts integrated directly into the display letterforms.",
      gear: {
        camera: "Digital Typography Engine & Acoustic Waveform Generator",
        lensOrOptics: "Concentric sonic rings",
        lightingOrAcoustics: "Deep oceanic black and crisp white",
        postOrColor: "Precision vector bezier paths",
      },
      takeaway: "Sound and graphic design merge when acoustic waveforms are treated as structural typographic glyphs.",
    },
  },
  {
    id: "media-14",
    title: "Prismatic Echo: Optical Dispersion Cover",
    fileName: "prismatic_echo_dispersion_cover.tiff",
    fileExtension: "TIFF",
    fileSize: "182 MB",
    fileKind: "Prismatic Exhibition Print Master",
    folderId: "covers",
    folderName: "Artistic Covers",
    resolution: "7200 × 7200 px",
    durationOrDimensions: "Optical Dispersion / Gallery Diptych",
    date: "2024-08-11",
    dateFormatted: "August 11, 2024",
    category: "Graphic Design",
    aspectRatio: "16 / 9",
    imageUrl: "/assets/covers/cover-prismatic.jpg",
    featured: true,
    formatBadge: "Prismatic Typographic Art",
    tags: ["Prism", "Chromatic", "Optical Physics", "Poster Design"],
    breakdown: {
      concept: "Capturing the tactile transition where pure photons split across optical quartz glass into a rainbow caustic beam cutting across Swiss typography.",
      howAchieved: "A diagonal spectral chromatic refraction ray is superimposed precisely across stark monochromatic geometric letterforms with circular lens rings.",
      gear: {
        camera: "Phantom High-Speed Stills & Vector Typography",
        lensOrOptics: "Optical lens ring glyphs",
        lightingOrAcoustics: "Continuous spectral refraction gradient",
        postOrColor: "Dichroic beam-splitter color calibration",
      },
      takeaway: "A solitary chromatic accent against stark black and white creates immense visual impact.",
    },
  },
  {
    id: "media-15",
    title: "Temporal Reach: Kinetic Typographic Poster",
    fileName: "temporal_reach_kinetic_poster.tiff",
    fileExtension: "TIFF",
    fileSize: "176 MB",
    fileKind: "Kinetic Study Gallery Poster",
    folderId: "covers",
    folderName: "Artistic Covers",
    resolution: "7200 × 7200 px",
    durationOrDimensions: "Kinetic Study / Museum Exhibition",
    date: "2024-05-18",
    dateFormatted: "May 18, 2024",
    category: "Graphic Design",
    aspectRatio: "16 / 9",
    imageUrl: "/assets/covers/cover-temporal.jpg",
    featured: true,
    formatBadge: "Kinetic Motion Poster",
    tags: ["Choreography", "Gesture", "Modernism", "Poster"],
    breakdown: {
      concept: "Exploring the tension of human gesture, silhouette, and negative space through dynamic architectural typography and kinetic stamp seals.",
      howAchieved: "Bold geometric letterforms with horizontal stencil divides and fine wireframe motion lines sweeping through the lower composition.",
      gear: {
        camera: "RED 8K Monochrome Still & Vector Typographic Engine",
        lensOrOptics: "Kinetic trajectory lines",
        lightingOrAcoustics: "Pure contrast silhouette balance",
        postOrColor: "High-density carbon ink separation",
      },
      takeaway: "Typography can suggest physical human motion through subtle balance of mass and directional negative space.",
    },
  },
];
