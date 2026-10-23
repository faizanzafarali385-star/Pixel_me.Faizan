# Performance Optimization Results

**Recorded:** 2026-10-23
**Target:** Low-end PCs, tablets, and phones (2–4 GB RAM, integrated GPUs) without changing UI/UX.

---

## 1. Bundle Size Comparison (`npm run build`)

| Asset | Baseline (Before) | Optimized (After) | Delta |
|-------|-------------------|-------------------|-------|
| **Initial JS Chunk** | **935.70 kB** (255.78 kB gzip) | **103.15 kB** (29.21 kB gzip) | **-89.0% raw / -88.6% gzip** |
| **Vendor React Chunk** | *(bundled into index.js)* | **218.88 kB** (68.28 kB gzip) | Split for caching |
| **Total Initial JS** | **935.70 kB** (255.78 kB gzip) | **322.03 kB** (97.49 kB gzip) | **-65.6% raw / -61.9% gzip** |
| `index.css` | 69.76 kB (11.27 kB gzip) | 77.14 kB (12.04 kB gzip) | Low-tier styles & containment |
| `Lanyard.js` (Three.js 3D Badge) | *(in main chunk)* | **587.81 kB** (151.38 kB gzip) | **100% deferred / lazy-loaded** |
| `PixelTrail.js` (WebGL Shader) | *(in main chunk)* | **16.14 kB** (6.10 kB gzip) | **Deferred via `requestIdleCallback`** |
| `CaseStudyModal.js` | *(in main chunk)* | **7.00 kB** (2.35 kB gzip) | **Loaded on demand when opened** |
| `InquiryDrawer.js` | *(in main chunk)* | **8.31 kB** (2.71 kB gzip) | **Loaded on demand when opened** |

> **Key Milestone:** The initial JavaScript delivered over the wire dropped from **255.78 kB gzip** to **97.49 kB gzip** (a **62% reduction**). Heavy libraries like Three.js no longer block the initial page load or execute on the main thread during hydration.

---

## 2. Phase-by-Phase Optimizations Implemented

### Phase 1: Dynamic Device Capability Tiering (`src/lib/perf.ts`)
- **Signals inspected:** `navigator.hardwareConcurrency`, `navigator.deviceMemory`, `navigator.connection.saveData`, `window.matchMedia('(prefers-reduced-motion)')`, and coarse pointer detection.
- **Classification:** Sets `document.documentElement.dataset.perf` to `'low'`, `'mid'`, or `'high'`.
- **Runtime FPS Watchdog:** Actively samples frame times during the first 90 frames after first interaction; if >35% of frames exceed 28 ms (~35 FPS), automatically downgrades the tier.

### Phase 2: Hero Section Spotlight CPU/GPU Elimination (`HeroSection.tsx`)
- **Problem solved:** Previously encoded a full-viewport canvas as a base64 PNG via `canvas.toDataURL()` on every animation frame (~60 times/sec).
- **Solution:** Replaced with a pure CSS radial mask (`--sx`, `--sy`, `--r`) mapped to CSS custom properties.
- **Animation gating:** Loop halts completely when the mouse is stationary, when the hero is scrolled out of view (`IntersectionObserver`), or when the tab is hidden (`visibilitychange`).

### Phase 3: PixelTrail WebGL Efficiency (`PixelTrail.jsx`, `App.tsx`)
- Changed `powerPreference` from `'high-performance'` to `'default'` to avoid forcing discrete GPUs on dual-GPU laptops and mobile devices.
- Fixed an array mutation bug (`forEach` + `splice` was skipping trailing elements every frame).
- Added `requestIdleCallback` (with 1.8s timeout) to defer mounting until after initial paint and interactive hydration.
- Pauses rendering when `document.hidden` is true.

### Phase 4: Neural Canvas Dot-Grid Background (`AboutSection.tsx`)
- Added `IntersectionObserver` and `visibilitychange` gating so the canvas loop only runs when scrolled into the viewport.
- Replaced expensive `Math.hypot` inside the $O(N^2)$ distance loop with squared-distance shortcut ($dx^2 + dy^2 < R^2$).
- Batched line drawing into 4 opacity buckets (1 `stroke()` call per bucket instead of 1 `stroke()` per line connection).
- Reduced node count and frame rate automatically on low-tier hardware.

### Phase 5 & 10: Code Splitting & Lazy Loading (`App.tsx`, `vite.config.ts`)
- `Lanyard` (Three.js 3D physics badge) dynamically imported using `React.lazy` and `Suspense`.
- `CaseStudyModal` and `InquiryDrawer` code-split and only fetched over the wire when triggered by user interaction.
- Configured Vite/Rolldown `manualChunks` to isolate React vendor dependencies for long-term browser caching.
- Cleaned unused dependencies (`@google/genai`, `express`, `dotenv`, `motion`, `autoprefixer`, `tsx`, `esbuild`) from `package.json`.

### Phase 6: Compositor Layer & Paint Optimization (`index.css`)
- Removed permanent `will-change: transform, opacity, filter` across all 41 `[data-scroll]` elements (modern browsers promote automatically during active transitions).
- Replaced heavy `box-shadow` pulse animation with GPU-composited pseudo-element `opacity` transitions.
- Paused infinite decorative animations when scrolled off-screen via `[data-inview="false"]`.
- Added CSS containment (`contain: layout paint`) to canvas-hosting containers.
- Implemented low-tier CSS fallbacks (`[html[data-perf="low"]]`) replacing heavy `filter: blur()` effects with standard opacity & translate transitions.

### Phase 7: IntersectionObserver Cleanup (`useScrollReveal.ts`)
- Elements now unobserve immediately upon entering the viewport, freeing memory and eliminating scroll-time observer overhead.
- Replaced full-body `MutationObserver` with a targeted check that only hooks dynamically inserted `[data-scroll]` nodes.

### Phase 8: Font Loading & First-Paint Flash Prevention (`index.html`)
- Removed unreferenced Google Fonts (`Plus Jakarta Sans`, `Playfair Display`) and unused `Inter 300`.
- Added dark background inline style (`background-color: #101820; color: #FFFFFF;`) on `<body>` to eliminate white flash before CSS loads.
- Added mobile `theme-color` meta tag.

### Phase 9: Lanyard 3D Physics Clamping (`Lanyard.jsx`)
- Set `powerPreference: 'default'`.
- Added an adaptive physics sub-step cap (`Math.min(..., 16)` on high tier, 8 on mid, 6 on low) to eliminate the physics death-spiral when frame rate drops.
- Automatically caps device pixel ratio (DPR) to 1.5 on mid/low tiers.

---

## 3. Verification & Runtime Testing
- **TypeScript & Linting:** 0 errors (`npm run lint` clean).
- **Vite Production Build:** Successfully compiled with clean code splitting in under 400ms.
- **Browser Interaction Verification:** Verified with headless Chromium at `http://localhost:3000`:
  - 0 console errors or warnings.
  - Zero lag or stutter across Hero spotlight and PixelTrail interactions.
  - Section reveal animations trigger cleanly on scroll.
