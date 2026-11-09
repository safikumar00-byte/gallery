# Immersive 3D Creative Portfolio Gallery

A dimensional, animated creative portfolio experience inspired by the visual behavior of [Baked Design](https://baked.design/). Built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **GSAP**, **Framer Motion**, and **CSS 3D Transforms**.

---

## Key Features

### 1. Main 3D Composition
- **6-Column Irregular Masonry**: Desktop gallery packed with dense, varied aspect ratio cards (`square`, `portrait`, `tall`, `landscape`, `wide`, and `cutout`).
- **CSS 3D Perspective Canvas**: Viewport container tilted with interactive mouse-lookaround parallax (`perspective(1200px)`).
- **Responsive Layouts**:
  - **Desktop (1440px+)**: 6 full columns
  - **Laptop (1024px–1440px)**: 5 columns
  - **Tablet (640px–1024px)**: 3 columns
  - **Mobile (< 640px)**: 2 columns with touch-optimized scroll

### 2. Multi-Plane Parallax & Continuous Motion
- **Parallax Column Speeds**: Different vertical movement rates across columns (`0.85x`, `1.25x`, `0.95x`, `1.35x`, `0.90x`, `1.15x`).
- **Continuous Ambient Drift**: Gentle vertical drifting motion that keeps the gallery alive.
- **Motion Pause Control**: Interactive floating pill button (`⏸ Pause motion` / `▶ Resume motion`) allowing users to pause drifting to inspect cards.
- **Natural Scroll Flow**: Mouse-wheel and trackpad inertia without aggressive hijacking.

### 3. Dimensional 3D Card Interactions
- **3D Hover Elevation**: Translates cards on the Z-axis (`translateZ(24px)`), scaling (`1.03x`), with dynamic spring tilt following cursor coordinates.
- **Specular Sheen / Glare**: Dynamic light reflections moving across the card surface on hover.
- **Metadata Badge Overlay**: Smooth gradient reveal showing category, project title, subtitle, and action pill.
- **Transparent Cutout Items**: Floats 3D mascots (e.g., Lil' Octo plush character, Cirrus cloud) directly on the canvas with soft dimensional drop-shadows.

### 4. Interactive Experience & Audio
- **Case Studies Grid Mode**: One-click toggle in the navigation (`3D Gallery` ⇄ `Case Studies`) mimicking `baked.design/work/` with category filters and search.
- **Surprise Me**: Randomizer button that selects a creative project and launches its modal showcase with sound effects.
- **Synthesized Web Audio**: Zero-dependency procedural audio engine generating subtle glass hover ticks, UI clicks, and modal chimes.
- **Studio Inquiry / Book a Call Modal**: Discovery booking modal with budget, scope selector, and response time metrics.
- **Dedicated Static Detail Pages**: Each project is statically generated (`/project/[id]`) with deep-dive case study documentation.

---

## Technical Stack
- **Framework**: Next.js 14 (App Router, SSG static pre-rendering)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **Animation**: GSAP, Framer Motion, CSS 3D Transforms
- **Audio**: Web Audio API (native procedural synthesis)
- **Icons**: Lucide React

---

## Project Structure
```
gallery/
├── public/
│   └── images/
│       ├── gallery/          # 26+ curated original artwork & 3D renders
│       └── projects/         # Client & project flagship imagery
├── src/
│   ├── app/
│   │   ├── about/page.tsx    # Studio credentials & toolkit
│   │   ├── project/[id]/     # Dynamic SSG project case study routes
│   │   ├── work/page.tsx     # Dedicated case studies gallery
│   │   ├── globals.css       # 3D transforms, custom scrollbars, vignette
│   │   ├── layout.tsx        # Root HTML layout with custom cursor
│   │   └── page.tsx          # Main gallery view controller
│   ├── components/
│   │   ├── BookCallModal.tsx # Studio booking & inquiry form
│   │   ├── CaseStudiesGrid.tsx # Filterable 4-column structured grid
│   │   ├── CustomCursor.tsx  # Smooth spring lerp cursor
│   │   ├── Gallery3D.tsx     # 6-column 3D perspective floating gallery
│   │   ├── GalleryCard.tsx   # 3D tilting card with sheen & elevation
│   │   ├── Navigation.tsx    # Top floating navigation pill bar
│   │   └── ProjectModal.tsx  # Modal case study deep dive
│   ├── data/
│   │   └── projectsData.ts   # 36 curated creative projects with full metadata
│   ├── types/
│   │   └── gallery.ts        # TypeScript data interfaces
│   └── utils/
│       └── sound.ts          # Web Audio API sound synthesis
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Running Locally

```bash
# Run production server on port 3030
npm run start -- -p 3030

# Or run development server
npm run dev
```
