# AMIX Three.js Design & Architecture Analysis
> Source: [https://amix-design.com/tl/web-g-threejs/](https://amix-design.com/tl/web-g-threejs/)
> Archived locally in: `docs/inspiration/amix-threejs/`

---

## Executive Summary

The AMIX Three.js Gallery represents a masterclass in **"Executive Neo-Digital / Arcade Neon"** design. It blends high-performance WebGL 3D rendering with semantic, responsive HTML/CSS. This architecture directly inspired the Keith Hopkins visual theme (`#030712` base, amber/gold glow, glassmorphism panels, and 3D hero animation).

---

## 1. Visual Language & Aesthetic Formula

### 1.1 Color Palette & Contrast Strategy
* **Base Background:** `#05060e` (Deepest indigo-black) with subtle radial vignettes.
* **Surface Panels:** Translucent dark panel `rgba(15, 22, 41, 0.85)` with selective edge lighting.
* **Dual Accent Gradients (`--c1`, `--c2`):**
  Each content section defines dual CSS custom properties on its `<article>` container:
  - Game 01 (Shiba Dash): `--c1: #ff6b35; --c2: #f7c59f;` (Neon orange to peach)
  - Game 02 (Hatoland): `--c1: #4cc9f0; --c2: #4361ee;` (Electric cyan to royal blue)
  - Game 03 (Ebi Tank): `--c1: #f72585; --c2: #7209b7;` (Vibrant magenta to deep purple)
  - Game 04 (Sampo): `--c1: #48bfe3; --c2: #64dfdf;` (Ethereal turquoise to seafoam)
  - Game 05 (Mizukiri): `--c1: #52b788; --c2: #74c69d;` (Emerald neon to mint)
  - Game 06 (Drop Riot): `--c1: #fee440; --c2: #00f5d4;` (Arcade yellow to aquamarine)

### 1.2 Typography Hierarchy
* **Display / Numerals:** `Orbitron` (Wide, geometric, high-tech sans-serif).
* **Body / Japanese:** `Noto Sans JP` (Clean, legible readability).
* **Labels / Pill Tags:** `DotGothic16` (16px bitmap retro arcade pixel font).
* **Technical Metadata & Code Readouts:** `Space Mono` (Precision tabular numbers and telemetry).
* **Brand / Accent Headings:** `Outfit` (Modern, rounded grotesque for crisp titles).

### 1.3 Depth & Atmospheric Layers
* **Scanline Texture & CRT Bloom:** Layered radial gradients mimic an arcade monitor glow without heavy raster images.
* **Glassmorphism Panels:**
  ```css
  background: var(--bg-panel);
  border: 1px solid color-mix(in srgb, var(--c1) 32%, transparent);
  border-radius: 22px;
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.02) inset,
    0 0 44px color-mix(in srgb, var(--c1) 9%, transparent);
  ```

---

## 2. Three.js WebGL Presentation Engine (`main.js`)

### 2.1 DOM-Driven 3D Scene Generation
Rather than hardcoding 3D coordinates in JavaScript, `main.js` queries all `<article class="game">` elements in the DOM:
1. Calculates each card's scroll offset and screen position.
2. Procedurally generates a 3D arcade cabinet mesh at that position.
3. Maps the preview image onto the cabinet's virtual CRT screen.
4. Reads `--c1` and `--c2` directly from the element's computed style to tint the cabinet's glowing neon wireframe edges.

### 2.2 Post-Processing Pipeline
```javascript
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// Setup bloom for glowing neon
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.4,   // Bloom strength
  0.4,   // Radius
  0.85   // Threshold (only brightly emissive pixels bloom)
);
```

### 2.3 Scroll-Synchronized Camera Choreography
* As the user scrolls the page, camera coordinates smoothly interpolate (`lerp`) along a spline curve facing each corresponding 3D cabinet.
* On devices where WebGL is unsupported or `prefers-reduced-motion` is active:
  - The canvas gracefully hides (`class="no-gl"`).
  - Standard responsive 2D DOM images (`.game-thumb`) display smoothly with zero layout shift.

---

## 3. Application to Keith Hopkins Modernization

| AMIX Feature | Keith Hopkins Target Implementation |
|---|---|
| **WebGL Arcade Cabinets** | Adapted into **`components/three/HeroCanvas.tsx`** with neon grid and floating geometric particles. |
| **Dual Color Custom Properties** | Applied to **Services Cards** (`/service/[slug]`) and **Portfolio Cards** (`/project/[slug]`) to give each pillar its own signature glow (Gold, Amber, Warm Orange). |
| **Tabular Monospace Specs** | Used for **Performance Metrics**, **Pricing Features**, and **Lead Generation ROI stats**. |
| **Progressive Enhancement Fallback** | All Next.js App Router routes render accessible SSR markup first; Three.js is mounted client-side only via `next/dynamic({ ssr: false })`. |
