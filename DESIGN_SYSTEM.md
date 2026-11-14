# Rishabh Naik — Design System & Visual Language Specification

> **Status**: APPROVED & LOCKED  
> **Aesthetic Profile**: Cinematic, Editorial, Darkroom Tactile, Optical Refraction

---

## 1. Core Visual Identity & Philosophy

The design language of Rishabh Naik's website merges high-end **cinematic minimalism** with **tangible analog artifacts**. It avoids generic web conventions in favor of a cohesive, physical portfolio feel:

- **Atmosphere**: Cosmic, pitch-black voids illuminated by spectral optical flares and prismatic refractions.
- **Physicality**: Polaroid and darkroom prints with white paper borders, masking tape strips, and an authentic iPod physical click wheel controller.
- **Contrast**: Alternates between deep optical black backgrounds (`#050507`, `#09090b`), deep underwater oceanic blues (`#0d1e30` to `#06090e`), and warm tactile editorial surfaces (`#e8e6e1`, `#f7f6f2`).

---

## 2. Color Palette & Tokens

| Token | Hex / Value | Application |
|---|---|---|
| `--color-bg` | `#09090b` | Primary dark body background |
| `--color-hero-bg` | `#050507` | Deepest pitch black for hero banners |
| `--color-surface` | `#121216` | Dark surface for cards and media player |
| `--color-surface-card` | `#18181f` | Elevated dark container background |
| `--color-light-surface` | `#e8e6e1` | Physical pinboard surface (Section 03) |
| `--color-about-surface` | `#f7f6f2` | Editorial light background for About & Project pages |
| `--color-contact-card` | `#d1d0cb` | Neutral gray contact card in About page |
| `--color-text-primary` | `#f5f5f7` | Crisp off-white heading & primary text |
| `--color-text-secondary` | `#9e9ea7` | Subdued secondary body text |
| `--color-text-tertiary` | `#6b6b75` | Captions, dates, and labels |
| `--color-accent-cyan` | `#00a6ff` | Active card border & glow on 5-card row |
| `--color-accent-red` | `#ff0000` / `#ff3b30` | Media play buttons and recording indicators |

---

## 3. Typography Hierarchy

### Font Families
- **Display / Headings**: `'Outfit'`, sans-serif (weights: `300`, `400`, `500`, `600`)
- **Body Text**: `'Inter'`, sans-serif (weights: `300`, `400`, `500`)
- **Technical & Metadata**: `monospace` (weights: `400`, `500`)

### Type Scale
- **Hero Main Title**: `clamp(2.5rem, 5vw, 4.25rem)`, weight `400`–`500`, letter-spacing `-0.035em`
- **Section Headings**: `clamp(1.75rem, 3.2vw, 2.5rem)`, weight `500`, letter-spacing `-0.03em`
- **About Headline**: `clamp(3rem, 7vw, 6rem)`, weight `500`, letter-spacing `-0.04em` (`"About Me!!!?"`)
- **Closing Phrase**: `clamp(2.25rem, 4.2vw, 3.75rem)`, weight `500`, letter-spacing `-0.035em` (stacked multiline)
- **Badges / Section Labels**: `0.8125rem`, letter-spacing `0.15em`, uppercase
- **Timecodes & Shot Counters**: `0.8125rem`, monospace, letter-spacing `0.08em`

---

## 4. Key Architectural & Layout Paradigms

### 4.1 Overlaid Header & 3D Grid-Box Flip Slideshow
- **Overlaid Header**: `position: absolute; top: 0; left: 0; right: 0; z-index: 50`. Overlays the hero visual directly with a top gradient fade (`rgba(9, 9, 11, 0.75)` to `transparent`). Brand on top-left, navigation on top-right.
- **3D Grid-Box Flip Slideshow (`GridFlipSlideshow`)**:
  - The hero background is divided into an ultra-fine 28x14 matrix of 3D micro-tiles (392 micro-facets).
  - Transitions use a fluid radial wave expanding outward from the middle with `cubic-bezier(0.22, 1, 0.36, 1)` easing for liquid-smooth 60fps 3D flips.
  - Sliced without seams or borders, maintaining the full unstretched image resolution.

### 4.2 The 5-Card Seam Bridge (`RecentWorksCards`)
- Position: `position: absolute; bottom: 0; transform: translateY(50%); z-index: 35`
- Straddles the boundary between the Hero and the section below.
- Exactly 5 wider cards in a horizontal row (`display: grid; grid-template-columns: repeat(5, 1fr)` on desktop, smooth horizontal snap on mobile).
- **Wider Proportions**: Aspect ratio `16 / 10`, max-width `1680px`.
- **Internal Card Details**:
  - Project Name (Title) displayed directly inside the card over an atmospheric dark gradient overlay.
  - Small detail metadata inside the card: Date (`29=07-12`) and Category (`Short Film`).
- **Dot Indicators**:
  - Subtle indicator dot in the top-left of **Card 1**.
  - Subtle indicator dot in the top-right of **Card 5**.
- **Active State**:
  - Bright cyan/blue border frame: `border: 2.5px solid #00a6ff`.
  - Box shadow glow: `0 20px 40px -4px rgba(0, 166, 255, 0.45)`.
  - Synchronized with the BTS media section and project detail routes.

### 4.3 Intro / Second Section
- Background: Deep underwater radial gradient (`#0d1e30` to `#06090e`) with ambient caustic light.
- Top padding: `clamp(6.5rem, 11vw, 9.5rem)` to provide clearance for the overlapping cards.
- Centered editorial text group with highlighted words:
  `"...wide range of experience across various creative fields... working with sound..."`
- Media preview card: `16:9` aspect ratio with rounded corners (`14px`) and a vivid red play button badge.

### 4.4 Section 03 — Free-Moving Printed Image Field (`Physical Archive`)
- Background: Warm darkroom board (`#e8e6e1`) with dot grid pattern.
- Layout: **Free-moving deterministic positioning** using percentage coordinates (`printX`, `printY`), unique rotations (`-4deg` to `+4deg`), and paper border styling.
- Individual print: Crisp white border, subtle paper shadow, masking tape strip at the top, title & date caption at the bottom.
- Hover lift: `translateY(-8px) scale(1.03)` with deepened drop shadow.

### 4.5 Section 04 — BTS Media Area with iPod Controller
- Desktop Grid: Two columns — dominant Media Player on left (`68%`), BTS Details on right (`32%`).
- **Media Player**: 16:9 cinematic aspect ratio with live timecode overlay (`00:14:28:09`), pulsing red recording dot, and bottom scrub bar.
- **iPod Controller**:
  - Anchored below/overlapping the lower edge of the media player.
  - Authentic circular wheel with brushed metallic gradient (`#f0f0f4` to `#c8c8cf`).
  - 4 quadrant buttons: `MENU` (top), `SkipBack` (left), `SkipForward` (right), `Play/Pause` (bottom).
  - Center tactile click disc with radial bevel and inner gleam.
  - Interactive: clicking Next/Prev steps through BTS shots in sync with the player, details, and printed cards.
- **BTS Details Column**: Project Name, Date, Category, Editorial Description, Tag badges, and pill switcher indicators.

### 4.6 Section 05 — Consistent Dark Footer
- Background: Pure dark `#050507`.
- **Left**: 3D iridescent optical glass cube with rainbow caustics (`cube.jpg`).
- **Center**: Multiline bold closing typography:
  ```
  want
  to
  take a
  bet?
  ```
- **Right**:
  - Direct Phone: `6360908381`
  - Inquiries Email: `rishabhnaik37@gmail.com`
  - Social Links: Instagram, Facebook with `ArrowUpRight` icon and hover lift.
- **Bottom**: `© 2026 Rishabh Naik. All rights reserved.` and "Back to top ↑" link.

---

## 5. Subpage Design Language

### 5.1 About Me (`/about`)
- Hero Banner: Full-width optical flare with the giant headline **"About Me!!!?"**.
- Light Body: Warm `#f7f6f2` editorial canvas.
- 3-column Disciplines Grid:
  - `01 / DIRECTION`: Cinematography & Directing
  - `02 / SONIC`: Sound Design & Foley
  - `03 / VISUAL`: Photography & Direction
- Centered Contact Card: Large neutral gray card (`#d1d0cb`) with headline `"Contact"`, inquiry copy, and `"Get In Touch"` CTA.
- Concludes with the standard 3D cube footer.

### 5.2 Project Detail (`/projects/[id]`)
- Hero Banner: Main project title on the left, right-hand metadata block (`29=07-12`, `Short Film`, synopsis).
- The 5-card row sits at the seam with the active project card glowing in cyan.
- Light Body: Full-width 16:9 cinematic showcase, production narrative, technical equipment card (Arri Alexa Mini LF, Cooke Anamorphic, Nagra Tape Master), and BTS production stills gallery.
- Concludes with the standard 3D cube footer.

---

## 6. Rules of Preservation

1. **Never convert the 5-card row into a slider or carousel** — it must remain a stationary, 5-card horizontal bridge across the seam.
2. **Never break the multiline formatting of the closing phrase** (`want / to / take a / bet?`).
3. **Never place the header above the hero** — it must always overlay the hero visual.
4. **Preserve the iPod controller** as an authentic circular click wheel directly operating the media player.
5. **Always preserve the 3D iridescent cube** in the footer across every page.
