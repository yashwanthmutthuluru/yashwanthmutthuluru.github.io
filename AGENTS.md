# Project Guidelines

## Overview

Personal portfolio site for **Yashwanth Sai Mutthuluru**, a **Data Engineer**.
Hosted on GitHub Pages at `yashwanthmutthuluru.github.io`.

## Current State

This is a modern static site built with:

- Vanilla HTML, CSS, and JavaScript
- No runtime dependencies
- GitHub Pages static hosting
- Custom CSS properties for theming
- Manual dark/light mode with system preference detection
- IntersectionObserver-based reveal animations
- Optimized image sources with WebP fallback support

The repository no longer uses Bootstrap, jQuery, Gulp, vendored assets, Firebase Functions, or a PHP contact form.

## Positioning

Keep content centered on:

- Data engineering and cloud-native platforms
- Enterprise data products, integration, and automation
- Azure, Databricks, Python, PySpark, and open-source data technologies
- Business process mining and operational intelligence
- Reliable production delivery across life sciences, EdTech, and FinTech

Keep Data Engineer positioning consistent across visible site content and metadata.

## File Structure

- `index.html` — single-page portfolio with all primary sections inline
- `css/style.css` — custom design system, layout, responsive styles, and themes
- `js/main.js` — theme toggle, mobile navigation, scroll reveal, active nav state, dynamic year
- `404.html` — static not-found page
- `img/` — profile, social preview, and icon assets
- `site.webmanifest`, `robots.txt`, `sitemap.xml` — metadata and crawl support
- `.github/instructions/` and `.github/prompts/` — repo-specific authoring guidance

## Design System

- Use CSS custom properties for colors, spacing, radii, gradients, and typography.
- Preserve light and dark theme support.
- Use CSS Grid and Flexbox; do not add float-based layout.
- Keep animations subtle and respect `prefers-reduced-motion`.

### Current visual identity (preserve unless explicitly redesigning)

- **Type:** Bricolage Grotesque display (`--font-display`), Inter body (`--font-sans`), JetBrains Mono for labels/meta (`--font-mono`).
- **Accent:** a single locked Forest-green accent (`--color-accent`: `#1f7a4d` light, `#5fce93` dark). Exactly one accent color across the whole page.
- **Surfaces:** cool near-white paper (light) / cool ink (dark); a dark ink-green hero with a single accent glow and subtle noise texture.
- Do not revert to the pre-redesign look (Fraunces serif, warm-paper `#f7f4ee`, clay `#c8753a`, or a second Microsoft-blue accent). Those were the AI-tells removed in the taste-skill redesign.

### Design taste (anti-slop)

Every visual change must avoid the generic "AI look." Follow the full checklist in `.github/instructions/taste.instructions.md`. Core rules: one locked accent, editorial layouts over three-equal-card grids, token-driven color/spacing/radii, WCAG AA contrast on all buttons, and no em/en dashes in visible copy.

## Accessibility and Quality

- Prefer semantic landmarks (`nav`, `main`, `section`, `footer`).
- Keep one clear `h1`.
- All interactive controls must be keyboard accessible.
- Maintain visible focus states.
- External links opened in new tabs must use `rel="noopener noreferrer"`.
- Images need meaningful `alt` text unless decorative.
- Avoid adding analytics or trackers unless explicitly requested.

## Build and Dev

This site is static and has no build step.

```bash
python -m http.server 3000
```

Open <http://localhost:3000>.

If validation scripts are added, they should remain lightweight and dependency-free unless a future task explicitly asks for a larger toolchain.

## Key Pitfalls

- Do not follow stale Bootstrap/jQuery/Gulp modernization advice; the site has already been modernized.
- Do not add server-side code; GitHub Pages serves static files only.
- Keep public content professional and avoid adding private client or employer details.
- Keep metadata, structured data, visible copy, and manifest text aligned when changing positioning.
