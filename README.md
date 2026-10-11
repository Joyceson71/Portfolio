# 🕷️ Joyceson Danielraj — Web-Verse 3D Portfolio

> **Full-Stack Developer & 3D Designer**  
> *"I build the web, and the worlds inside it."*  
> Live Production: [portfolio-jodan.vercel.app](https://portfolio-jodan.vercel.app/)

A fully immersive, 3D-first, cursor-interactive portfolio redesign engineered with **Next.js 16 (App Router)**, **React 19**, **Three.js / React Three Fiber**, **Tailwind CSS v4**, and custom **GLSL Shaders**. Rather than a static scrolling document, the experience is rendered as one continuous living 3D world with spline-scrubbed camera paths, verlet-rope web physics, reactive post-processing, and a multi-suit theme engine.

---

## 🏛️ Architecture & Scene Graph

```
Root Layout (Next.js 16 App Router)
├── SkinProvider (Binds Zustand skin state → data-skin attribute on <html>)
├── CursorProvider (Global mouse kinematics, velocity, and hit testing)
│   ├── WebCursor (HUD reticle with spring smoothing and Spider-Sense pulse)
│   ├── WebRope (Canvas2D Verlet integration physics strand)
│   ├── ClickSplatLayer (SVG dynamic web decals with SFX)
│   └── ParticleTrail (Dynamic nanotech particle system)
├── SpiderSenseHUD (Live FPS, NYC GPS coords, nanite integrity, active section)
├── Loader (Weaving progress bar with drei useProgress)
└── Fixed Persistent Canvas (pointer-events: none, z-index: 0)
    └── Suspense
        ├── CameraRig (CatmullRomCurve3 spline driven by scroll progress)
        ├── CityScape (Procedural NYC skyline with instanced emissive windows)
        ├── WebField (Hero reactive spider-web geometry)
        ├── CoreNanotech (Original Stark-core torus rings & wireframe icosahedron)
        ├── StackGraph (Force-directed 3D skill constellation)
        ├── TimelineStrand (Glowing tube spline with milestone spheres)
        ├── BeaconScene (Spider-Signal volumetric beacon with 80 instanced beams)
        └── EffectComposer
            ├── Bloom (Luminance threshold 0.15, intensity 2.2)
            ├── ChromaticAberration (Skin-dependent dynamic chromatic offset)
            ├── Noise (Cinematic film grain)
            └── Vignette (Focus darkening)
```

---

## 🎮 Multi-Suit Skin System

Switching suits updates the entire visual hierarchy across CSS variables, HTML styling, and 3D shader uniforms simultaneously:

| Suit Mode | Tag | Primary Color | Accent Color | Bloom Tint | Chromatic Offset |
|---|---|---|---|---|---|
| **Classic Peter** | Crimson & Web | `#CC0000` | `#0047FF` | `#CC0000` | `0.0007` |
| **Miles Morales** | Stealth Bio-Shock | `#9900ff` | `#CC0000` | `#6600ff` | `0.0012` |
| **Venom** | Symbiote Override | `#ffffff` | `#222222` | `#333333` | `0.0018` |
| **Iron Spider** | Stark Nanotech | `#CC0000` | `#eab308` | `#ff6600` | `0.0006` |

---

## 🕸️ Cursor Interactivity Engine

1. **Web-Shooter Reticle**: Dual-layer cursor featuring an instant primary tracking point paired with a spring-damped HUD target crosshair.
2. **Verlet Rope Physics**: Real-time numerical integration simulating a dynamic web rope anchored to mouse drag points with tensile spring constraints and gravity sag.
3. **Click Web Splat**: On mouse click, generates temporary multi-ring web decal splats accompanied by synthesized Web Audio sound effects.
4. **Velocity Spider-Sense**: Detects fast cursor velocity (>35px/frame) to trigger Spider-Sense HUD ripple animations and audio chirps.

---

## 🧪 3D Lab Mini-Demos

The portfolio includes interactive 3D Lab experiments showcasing creative WebGL techniques:
- **GLSL Hologram Playground**: Custom vertex displacement & scanline fragment shader with fresnel rim emission.
- **Verlet Web Physics Sim**: Interactive kinematic rope simulation solver in real-time.
- **Nanotech Suit Turntable**: 3D armor model inspection turntable with PBR metallic reflections.
- **Spider-Signal Raytracer**: Volumetric spotlight cone with trigonometric particle beam tracking.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router, Server Actions)
- **UI Engine**: React 19, TypeScript strict mode
- **Styling**: Tailwind CSS v4, tw-animate-css, shadcn/ui
- **3D & Creative Code**: Three.js 0.175, React Three Fiber v9, React Three Drei v10, PostProcessing
- **Physics & Motion**: Framer Motion 12, GSAP 3, Verlet numerical integration
- **State & Audio**: Zustand 5, Web Audio API Synthesizer
- **Backend & Contact**: Next.js API Routes, Nodemailer with spam honeypot & IP rate limiting

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
git clone https://github.com/Joyceson71/Portfolio.git
cd Portfolio
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Web-Verse experience.

### Production Build & Linting
```bash
npm run lint
npm run build
```

---

## 🎛️ Performance Tuning Knobs

The 3D engine is configured for a stable 60 FPS across desktop hardware with automatic graceful degradation:

1. **Adaptive DPR (`PerformanceMonitor`)**:
   Located in `src/components/canvas/SceneRoot.tsx`. Dynamically scales Device Pixel Ratio between `[1, 2]` for high-end displays down to `[0.75, 1]` if frame drops are detected.
2. **Instanced Mesh Rendering**:
   City windows (`BuildingWindows`) and signal particles (`BeaconParticles`) utilize Three.js `InstancedMesh`, updating hundreds of objects in a single draw call with zero heap garbage collection.
3. **Deterministic Pseudo-Random Generation**:
   All procedural city buildings and particles utilize deterministic seed equations (`pseudoRandom()`) ensuring React 19 purity compliance and zero re-render layout shifts.
4. **Reduced Motion Fallback**:
   Respects `prefers-reduced-motion` at the system level by safely disabling heavy post-processing passes and 3D camera shifts.

---

## 🧩 Developer Guide

### Adding a New Section
1. Add section ID to `SectionId` in `src/lib/constants.ts`:
   ```ts
   export type SectionId = ... | "new-section";
   ```
2. Add a navigation link to `NAV_LINKS` in `src/lib/constants.ts`.
3. Add a waypoint to the camera spline path in `src/components/canvas/CameraRig.tsx`:
   ```ts
   // Add position & lookAt target along CatmullRomCurve3
   ```
4. Render your section markup in `src/app/page.tsx`.

### Adding a New Suit Skin
1. Add the skin key to `SkinMode` in `src/lib/constants.ts`:
   ```ts
   export type SkinMode = "classic" | "miles" | "venom" | "iron" | "stealth";
   ```
2. Define the palette tokens in `SKINS` object (`primary`, `accent`, `glow`, `bloomTint`, `chromaticOffset`).
3. Add CSS variable overrides in `src/app/globals.css`:
   ```css
   html[data-skin="stealth"] {
     --skin-primary: #00ff88;
     --skin-accent: #0088ff;
   }
   ```

---

## 📬 Contact & Inquiries

- **Engineer**: Joyceson Danielraj
- **Email**: [joycesondanielraj71@gmail.com](mailto:joycesondanielraj71@gmail.com)
- **GitHub**: [@Joyceson71](https://github.com/Joyceson71)
- **Live Portfolio**: [portfolio-jodan.vercel.app](https://portfolio-jodan.vercel.app/)
