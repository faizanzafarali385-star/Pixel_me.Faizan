/**
 * perf.ts — Phase 1: Device Tier System
 *
 * Detects hardware capability and sets document.documentElement.dataset.perf
 * to 'low' | 'mid' | 'high'. Also runs an FPS watchdog that can downgrade
 * the tier at runtime if the device proves slower than expected.
 *
 * Non-negotiable: HIGH tier behaves exactly like the original app.
 */

export type Tier = 'low' | 'mid' | 'high';

// ─── Feature flag ────────────────────────────────────────────────────────────
// Set to false to disable all low-tier visual fallbacks (keeping only the
// performance-neutral fixes that work on all tiers).
export const ENABLE_LOW_TIER_FALLBACKS = true;

// ─── Subscriber list ─────────────────────────────────────────────────────────
type TierListener = (tier: Tier) => void;
const listeners: TierListener[] = [];

let currentTier: Tier = 'high';

function setTier(tier: Tier) {
  if (tier === currentTier) return;
  currentTier = tier;
  document.documentElement.dataset.perf = tier;
  listeners.forEach(fn => fn(tier));
}

export function getTier(): Tier {
  return currentTier;
}

export function subscribeTier(fn: TierListener): () => void {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i !== -1) listeners.splice(i, 1);
  };
}

// ─── Static detection ────────────────────────────────────────────────────────
function detectStaticTier(): Tier {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  if (nav.connection?.saveData) return 'low';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'low';

  const memory = nav.deviceMemory ?? 4; // Safari/Firefox don't expose this; assume 4 GB
  const cores = navigator.hardwareConcurrency ?? 4;

  if (memory <= 2 || cores <= 2) return 'low';

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const shortSide = Math.min(window.innerWidth, window.innerHeight);

  if (memory <= 4 || cores <= 4 || (coarse && shortSide < 820)) return 'mid';

  return 'high';
}

// ─── FPS watchdog ────────────────────────────────────────────────────────────
// Samples ~90 rAF frames between 0.5 s and 3.5 s after page load.
// If >35 % of frames exceed 28 ms, downgrades one tier.
function startFpsWatchdog(initialTier: Tier) {
  if (initialTier === 'low') return; // already at minimum

  const TARGET_SLOW_FRACTION = 0.35;
  const FRAME_BUDGET_MS = 28;
  const SAMPLE_COUNT = 90;
  const START_DELAY = 500;
  const END_WINDOW = 3500;

  let samples = 0;
  let slowFrames = 0;
  let last = 0;
  let raf = 0;
  let watchdogTier = initialTier;

  const tick = (now: number) => {
    if (now > END_WINDOW) {
      if (samples > 10 && slowFrames / samples > TARGET_SLOW_FRACTION) {
        const downgraded: Tier = watchdogTier === 'high' ? 'mid' : 'low';
        setTier(downgraded);
      }
      return;
    }

    if (last && samples < SAMPLE_COUNT) {
      const delta = now - last;
      samples++;
      if (delta > FRAME_BUDGET_MS) slowFrames++;
    }
    last = now;
    raf = requestAnimationFrame(tick);
  };

  setTimeout(() => {
    raf = requestAnimationFrame(tick);
  }, START_DELAY);

  setTimeout(() => cancelAnimationFrame(raf), END_WINDOW + 500);
}

// ─── Init (called once on module load) ───────────────────────────────────────
export function detectTier(): Tier {
  const tier = detectStaticTier();
  currentTier = tier;
  document.documentElement.dataset.perf = tier;
  startFpsWatchdog(tier);
  return tier;
}

// Auto-initialise when this module is imported
if (typeof window !== 'undefined') {
  detectTier();
}
