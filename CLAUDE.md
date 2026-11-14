# CLAUDE.md — Rishabh Naik Portfolio Website (Next.js)

## Project Identity

This is the personal portfolio website of **Rishabh Naik** — a multidisciplinary creative working across photography, filmmaking, audio, graphic design, and visual storytelling.

The site's character: **dark, editorial, cinematic, tactile**. It should feel like a physical object — a zine or a printed portfolio — translated into an interactive screen experience.

> **CRITICAL**: The complete visual language and layout system is formally locked in [`DESIGN_SYSTEM.md`](file:///Users/rishabhnaik/Documents/rawrish/website/DESIGN_SYSTEM.md). All modifications MUST preserve these aesthetics and paradigms.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS & CSS Modules (custom design tokens) |
| State | React Client State (`useState`, `useRef`, `useEffect`) |
| Fonts | `next/font/google` (Outfit & Inter) |
| Icons | Lucide React / Inline SVG |

---

## File Structure

```
website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout & font configuration
│   │   ├── page.tsx                # Page containing all 5 primary sections
│   │   └── globals.css             # Base reset & design tokens
│   ├── components/
│   │   ├── hero/
│   │   │   ├── Hero.tsx            # Hero section with embedded header overlay
│   │   │   └── Hero.module.css
│   │   ├── intro/
│   │   │   ├── Intro.tsx           # Intro section with centered content
│   │   │   └── Intro.module.css
│   │   ├── printed-field/
│   │   │   ├── PrintedField.tsx    # Deterministic scatter of printed images
│   │   │   ├── PrintedImage.tsx    # Single printed photo card
│   │   │   └── PrintedField.module.css
│   │   ├── bts/
│   │   │   ├── BTSSection.tsx      # BTS container syncing player + details + iPod
│   │   │   ├── MediaPlayer.tsx     # 16:9 media player
│   │   │   ├── IPodControl.tsx     # Physical iPod-style wheel controller
│   │   │   ├── BTSDetails.tsx      # Contextual shot info & metadata
│   │   │   └── BTS.module.css
│   │   ├── footer/
│   │   │   ├── Footer.tsx          # 3D cube visual, multiline phrase, contact info
│   │   │   └── Footer.module.css
│   │   └── ui/
│   │       ├── Header.tsx          # Top bar inside hero
│   │       └── CubeVisual.tsx      # Iridescent refraction cube
│   ├── data/
│   │   └── projects.ts             # Projects data with positions, rotations, media
│   └── types/
│       └── project.ts              # TypeScript interfaces
├── public/
│   └── assets/                     # Hero art, cube, project imagery
├── CLAUDE.md                       # This file
├── ai.md                           # AI assistant reference
└── context.md                      # Original specification document
```

---

## Five-Section Layout — Hard Rules

The page has **exactly five** primary sections in this order. Do NOT add, remove, or reorder them.

| # | Section | ID | Role |
|---|---|---|---|
| 01 | Hero | `#hero` | Visual identity opening, header overlaid inside |
| 02 | Intro | `#intro` | Introductory text + media preview, centered |
| 03 | Printed Image Field | `#work` | Free-form scattered printed images |
| 04 | BTS Media | `#bts` | Video player + iPod control + details |
| 05 | Footer | `#contact` | Closing phrase, contact, social, copyright |

---

## Interaction Model

```
Printed Image (click)
    ↓
sets activeIndex = index
    ↓
BTS Player loads project[activeIndex].media
BTS Details renders project[activeIndex].metadata
iPod Dial highlights state

iPod Control (prev / next)
    ↓
increments / decrements activeIndex
    ↓
BTS Player + Details + Printed Card highlight update in sync
```

---

## Design Constraints (DO NOT violate)

- ❌ Do NOT convert the printed image field into a grid or carousel
- ❌ Do NOT place the header above the hero (it must be overlaid inside)
- ❌ Do NOT place BTS details above the player on desktop
- ❌ Do NOT put the iPod control in the footer
- ❌ Do NOT create a persistent sidebar
- ❌ Do NOT make every section the same height
- ❌ Do NOT make the player and details equal width
- ❌ Do NOT fill open space with cards, stats, or decorative graphics
- ❌ Do NOT remove the link between printed images and BTS media
- ❌ Do NOT use `Math.random()` for image placement (positions must be deterministic)

---

## Contact Info

- Phone: `6360908381`
- Email: `rishabhnaik37@gmail.com`
- Social: Facebook, Instagram
