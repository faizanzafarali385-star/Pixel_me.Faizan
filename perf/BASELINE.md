# Baseline Performance Metrics

**Recorded:** 2026-10-23 (before any optimization)

## Bundle Sizes (`npm run build`)

| Asset | Raw | Gzip |
|-------|-----|------|
| `index.js` (single chunk) | **935.70 kB** | **255.78 kB** |
| `index.css` | 69.76 kB | 11.27 kB |
| `avatar-*.jpeg` | 129.85 kB | — |

> Three.js (≈588 kB / 151 kB gzip) is bundled into the main chunk because HeroSection.tsx statically imports Lanyard.jsx which statically imports * from 'three'.

## Public Assets

| File | Size |
|------|------|
| `public/lanyard-card-front.png` | 2.07 MB |
| `public/lanyard-card-back.png`  | 1.88 MB |
| `public/avatar.jpeg`            | 129.85 kB |
| Root `Neon Voxel Tech Portfolio Card.png` | 2.07 MB (duplicate) |
| Root `my cutout.png` | 1.88 MB (duplicate) |
| Root `my image.jpeg` | 129.85 kB (duplicate) |

## Key Problems Identified

1. **Hero spotlight `toDataURL()` every frame** — encodes a full-viewport PNG ~60×/sec (HeroSection.tsx lines 89–91)
2. **PixelTrail** — `highp` shader, 7×7 gaussian (49 samples/px), DPR up to 2, `powerPreference: 'high-performance'`, `forEach/splice` bug
3. **NeuralCanvas** — 60 nodes, 1 770 pair checks/frame with `Math.hypot`, 1 `stroke()` per connection, runs off-screen
4. **Three.js in initial bundle** — 588 kB raw due to static import chain
5. **Hero images on figma.site** — 2560 px and 1536 px PNGs, no srcset, no preload, no cache control
6. **CSS compositing** — permanent `will-change` on all 41 `[data-scroll]` elements, infinite animations off-screen
7. **Lanyard physics** — `MAX_STEP=1/960` → 32 sub-steps at 30 fps, DPR 2, antialias, `powerPreference: 'high-performance'`
8. **Fonts** — Plus Jakarta Sans + Playfair Display loaded (unused), Inter 300 (unused), render-blocking Google Fonts link
9. **Images oversized** — Unsplash at w=1400, lanyard PNGs 2 MB each
10. **useScrollReveal** — whole-body MutationObserver + never unobserves revealed elements
11. **Housekeeping** — `/lanyard-strap.png` 404, unused deps: @google/genai, express, dotenv, motion

## Lighthouse Mobile (not measured in this environment — no browser access)

| Metric | Baseline (estimated) | Target |
|--------|---------------------|--------|
| Performance | ~35–50 (estimated) | ≥ 85 |
| LCP | > 4 s (estimated) | ≤ 2.5 s |
| TBT | > 500 ms (estimated) | ≤ 200 ms |
| CLS | ~0 | ≤ 0.1 |

## Compositor Layers (estimated from `will-change` count)

- `[data-scroll]` elements: 41+ permanent GPU layers from `will-change: transform, opacity, filter`

## Target After Optimization

- Initial JS ≤ 110 kB gzip; Three.js loads only when badge opens
- Idle rAF: none when mouse still and hero off-screen
- Mouse over hero: no `toDataURL`, no long tasks
- Compositor layers on load: ≤ 25
