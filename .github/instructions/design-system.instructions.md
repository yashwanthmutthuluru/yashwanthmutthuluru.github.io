---
applyTo: "**/*.{html,css,scss,js,ts,astro,jsx,tsx}"
description: "Design system and styling conventions for the modernized portfolio site"
---

# Design System

## Color Palette
Use CSS custom properties for all colors. Support both light and dark themes via `prefers-color-scheme` and a manual toggle. Keep exactly ONE accent color across the whole page (single-accent lock).

```css
:root {
  --color-bg: #f8f9f6;        /* cool near-white paper */
  --color-surface: #ffffff;
  --color-surface-2: #eef1ec;
  --color-text: #141814;
  --color-text-muted: #59635a;
  --color-border: #e2e6df;
  --color-accent: #1f7a4d;     /* Forest green — the single locked accent */
  --color-accent-hover: #175f3c;
}
/* dark theme flips these; accent becomes #5fce93 */
```

Do not introduce a second accent (no stray blue link, no amber badge), and do not revert to the pre-redesign warm-paper `#f7f4ee` / clay `#c8753a` / Microsoft-blue palette.

## Typography
- Display headings use Bricolage Grotesque (`--font-display`); body uses Inter (`--font-sans`); labels and meta use JetBrains Mono (`--font-mono`).
- Fluid typography with `clamp()`.
- Keep an intentional weight ladder; do not fall back to a serif display face (Fraunces / Instrument Serif) outside an explicit redesign.
- Emphasize words with weight/color of the same family, never a mixed-family serif italic.

## Spacing & Layout
- Use CSS Grid and Flexbox — no float layouts
- 8px base spacing unit
- Max content width: ~1200px with generous padding

## Animations
- Prefer CSS transitions and animations over JS
- Use `prefers-reduced-motion` media query to disable animations for accessibility
- Keep transitions under 300ms for UI interactions

## Images
- Use `<picture>` with WebP/AVIF sources and fallbacks
- Always include meaningful `alt` text
- Use `loading="lazy"` for below-fold images

## Accessibility
- Minimum contrast ratio: 4.5:1 for normal text
- All interactive elements must be keyboard-focusable
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`)
