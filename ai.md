# ai.md — AI Context & Design System Reference (Next.js)

> This file is the primary reference for any AI assistant working on this Next.js project.
> Read this before touching any code. It encodes the full structural, visual, and interaction contract.
> Full locked design specifications live in [`DESIGN_SYSTEM.md`](file:///Users/rishabhnaik/Documents/rawrish/website/DESIGN_SYSTEM.md).

---

## 1. Project Summary

**Owner**: Rishabh Naik  
**Type**: Personal portfolio website  
**Stack**: Next.js 15+ (App Router), TypeScript, Vanilla CSS Modules, React Hooks  
**Purpose**: Showcase creative work in photography, filmmaking, graphic design, audio, and visual storytelling.

---

## 2. Page Sections — Structural Contract

The main page (`src/app/page.tsx`) renders **exactly five** sections in this exact vertical sequence:

```
01 ── HERO            (#hero)
02 ── INTRO           (#intro)
03 ── PRINTED IMAGES  (#work)
04 ── BTS MEDIA       (#bts)
05 ── FOOTER          (#contact)
```

**Do not** add, remove, or reorder these sections.

---

## 3. Design Tokens (src/app/globals.css)

```css
:root {
  /* Colors */
  --color-bg:         #0a0a0a;
  --color-surface:    #121212;
  --color-surface-2:  #1a1a1a;
  --color-surface-3:  #242424;
  --color-text:       #f2eee9;
  --color-muted:      #8a8a8a;
  --color-border:     rgba(255, 255, 255, 0.08);
  --color-accent:     #d4af37;

  /* Typography */
  --font-heading:     var(--font-outfit), sans-serif;
  --font-body:        var(--font-inter), sans-serif;

  /* Transitions */
  --ease-spring:      cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast:  150ms ease;
  --transition-base:  250ms ease;
  --transition-slow:  400ms ease;
}
```

---

## 4. Interaction & State Management

All state flows from a parent container or state hook in `page.tsx` or `BTSSection.tsx`:

```tsx
interface BTSShot {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  videoUrl?: string;
  imageUrl: string;
  thumbnailUrl: string;
  printX: number;       // percentage from left (0 - 100)
  printY: number;       // percentage from top (0 - 100)
  printWidth: number;   // px
  rotation: number;     // degrees (-4 to +4)
  zIndex: number;
}
```

- **Selection sync**: Clicking a printed photo card dispatches `setActiveIndex(index)`.
- **iPod Controller**: Triggers `(activeIndex ± 1 + total) % total` on dial click.
- **Media Player & Details**: Smoothly transitions content without page reload.

---

## 5. Do-Not-Violate Constraints

| Rule | Reason |
|---|---|
| No Tailwind unless explicitly confirmed | Vanilla CSS / CSS Modules used for precise layout control |
| No random scatter on load | Placement must be deterministic |
| Header strictly inside Hero | Header overlays the hero visual |
| iPod control stays with BTS player | It directly operates the media player |
| Multiline closing phrase | "want / to / take a / bet?" stays multiline |
| 5 primary sections strictly | Preserves editorial visual continuity |
