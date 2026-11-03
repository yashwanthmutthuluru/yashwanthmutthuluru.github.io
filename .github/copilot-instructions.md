# Copilot Instructions

Personal portfolio site for **Yashwanth Sai Mutthuluru**, a **Data Engineer**. Vanilla HTML/CSS/JS, no build step, hosted on GitHub Pages.

> Full project guidelines live in [`AGENTS.md`](../AGENTS.md). Read it before making changes; the rules below are the condensed working set.

## Code Quality
- Review changes across six axes: correctness, readability, architecture, security, performance, design taste.
- Keep changes surgical; do not mix formatting-only edits with behavior changes.
- No secrets, analytics, or trackers in code (unless explicitly requested).

## Design System & Boundaries
- **Always:** vanilla HTML/CSS/JS with CSS custom properties; preserve light/dark themes; CSS Grid/Flexbox (no floats); respect `prefers-reduced-motion`.
- **Ask first:** adding any dependency, build step, or toolchain — the site is intentionally dependency-free.
- **Never:** add server-side code (GitHub Pages is static-only); reintroduce Bootstrap/jQuery/Gulp; add private client or employer details.

## Design Taste (anti-slop)
Every visual change must avoid the templated "AI look." The full checklist auto-applies via [`.github/instructions/taste.instructions.md`](instructions/taste.instructions.md); the essentials:
- **One locked accent** (Forest green `--color-accent`). Never add a second accent color.
- **Keep the shipped identity:** Bricolage Grotesque display, Inter body, JetBrains Mono meta, cool ink hero. Do not revert to Fraunces serif, warm-paper background, or a Microsoft-blue accent — those were the AI-tells the redesign removed.
- **Editorial layouts over stock grids;** group with dividers/whitespace, not three equal cards.
- Pull color, spacing, and radii from the token scale; audit contrast on every button; avoid em/en dashes in visible copy.

## Accessibility (non-negotiable)
- Semantic landmarks (`nav`, `main`, `section`, `footer`); exactly one `h1`.
- All interactive controls keyboard-accessible with visible focus states.
- Meaningful `alt` text; external `target="_blank"` links use `rel="noopener noreferrer"`.

## Verify Before Done
- No test suite. Serve locally with `python -m http.server 3000` and check the affected sections in both light and dark mode.
- Keep visible copy, metadata, structured data, and `site.webmanifest` aligned when positioning changes.

## Specialized Agents
Use the personas in `.github/agents/` for targeted review:
- `@code-reviewer` — pre-merge review across the five axes.
- `@web-performance-auditor` — Core Web Vitals, loading/rendering audits.
