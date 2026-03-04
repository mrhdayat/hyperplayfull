# Pixel Forge Codex / Ascendia

<p align="center">
  A cutting-edge web application exploring the intersection of **Hyperreality**, **Playful Brutalism**, and **Museumcore**.
</p>

## Overview

This project embodies a cinematic, spatial storytelling approach designed for visionary brands. Built on typographic tension, kinetic motion, and perfectly curated imperfections, it delivers a deeply interactive experience through advanced GSAP scroll animations and Next.js performance.

## Design Philosophy

- **Spatial UX**: Multi-dimensional depth that shatters the flat screen illusion.
- **Kinetic Flow**: Living typography that breathes, stretches, and commands attention.
- **Brutalist Joy**: Raw, unapologetic geometry colliding with fluid mechanics.
- **Hyper Lighting**: Volumetric illumination and refractions for a modern aesthetic.

---

## 📸 Screenshots

### Desktop Views
<div style="display:flex; gap: 10px;">
  <img src="./screenshot-home-desktop.png" alt="Home - Desktop" width="48%">
  <img src="./screenshot-about-desktop.png" alt="About - Desktop" width="48%">
</div>

<br />

<div style="display:flex; gap: 10px;">
  <img src="./screenshot-portfolio-desktop.png" alt="Portfolio - Desktop" width="48%">
  <img src="./screenshot-previews-desktop.png" alt="Previews - Desktop" width="48%">
</div>

### Mobile Views
<div style="display:flex; gap: 10px;">
  <img src="./screenshot-home-mobile.png" alt="Home - Mobile" width="24%">
  <img src="./screenshot-about-mobile.png" alt="About - Mobile" width="24%">
  <img src="./screenshot-portfolio-mobile.png" alt="Portfolio - Mobile" width="24%">
  <img src="./screenshot-previews-mobile.png" alt="Previews - Mobile" width="24%">
</div>

---

## Technical Architecture

### Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org) + React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Inline Themes)
- **Animation**: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) + `@gsap/react`
- **Testing**: [Playwright](https://playwright.dev)
- **Typography**: `Playfair Display` (Serif) & `Space Mono` (Monospace) 

## AI Agent Skills Integrated

During the development and refactoring process, we employed a sophisticated suite of specialized AI `.agent/skills` to achieve Awwwards-level quality:

- `ui-ux-pro-max` & `frontend-design`: Ensuring structural glassmorphism and robust UI aesthetics.
- `scroll-experience`: Authoring and debugging advanced timeline-based ScrollTrigger animations efficiently with `useGSAP`.
- `web-performance-optimization` & `react-best-practices`: Adhering to Next.js App Router performance tokens and avoiding global state mutation/memory leaks.
- `playwright-skill` & `e2e-testing`: Automating multi-viewport UI verification seamlessly.
- `copywriting` & `seo-fundamentals`: Developing an editorial, poetic, and engaging brand voice for maximum impact.

## Setup & Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **View Locally**
   Open [http://localhost:3000](http://localhost:3000)

## Running E2E QA Tests (Screenshots)

We have a built-in Playwright script to QA the animations and layouts across device viewports.

1. Keep the dev server running (`npm run dev`).
2. Run the screenshot generator:
   ```bash
   node playwright-screenshots.js
   ```
3. Check the root folder for fresh `screenshot-*-*.png` files.
