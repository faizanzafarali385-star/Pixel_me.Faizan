import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUpRight, Sparkles, SlidersHorizontal, RotateCcw, Eye, Award, Terminal, X, BadgeCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

// ─── Phase 5: Lazy-load Lanyard + Suspense ───────────────────────────────────
const Lanyard = React.lazy(() => import('./Lanyard'));

interface HeroSectionProps {
  onStartProject: () => void;
  onReplayIntro: () => void;
  onExploreWork: () => void;
  isLanyardOpen?: boolean;
  onToggleLanyard?: () => void;
  onCloseLanyard?: () => void;
}

type RevealMode = 'spotlight' | 'split' | 'vibrant' | 'base';

// ─── Phase 2: CSS gradient stops matching the original radial gradient ────────
const SPOT_STOPS =
  'rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,.78) 65%, rgba(0,0,0,.35) 82%, rgba(0,0,0,.1) 94%, rgba(0,0,0,0) 100%';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onReplayIntro,
  onExploreWork,
  isLanyardOpen = false,
  onToggleLanyard,
  onCloseLanyard
}) => {
  const headlineWords = PERSONAL_INFO.primaryTagline.split(' ');

  const [revealMode, setRevealMode] = useState<RevealMode>('spotlight');
  const [spotlightRadius, setSpotlightRadius] = useState<number>(270);
  const [splitPosition, setSplitPosition] = useState<number>(50);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const revealImgRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Refs for the CSS-mask spotlight (Phase 2) — no canvas, no toDataURL
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });

  // ─── Phase 2: default-position timer ─────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && mouseRef.current.x === -999) {
        mouseRef.current = {
          x: window.innerWidth * 0.65,
          y: window.innerHeight * 0.45
        };
        // smoothRef starts at the same position so there's no animated jump
        smoothRef.current = { ...mouseRef.current };
        kickSpotlight();
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Phase 2: CSS-mask spotlight — replaces canvas.toDataURL loop ─────────
  useEffect(() => {
    if (revealMode !== 'spotlight') return;

    const layer = revealImgRef.current;
    if (!layer) return;

    // Apply the CSS radial-gradient mask once; --sx/--sy/--r update via custom props
    const mask = `radial-gradient(circle var(--r,${spotlightRadius}px) at var(--sx,-999px) var(--sy,-999px), ${SPOT_STOPS})`;
    layer.style.maskImage = mask;
    layer.style.webkitMaskImage = mask;
    layer.style.maskSize = '100% 100%';
    layer.style.webkitMaskSize = '100% 100%';
    layer.style.opacity = '1';
    layer.style.setProperty('--r', `${spotlightRadius}px`);

    const m = mouseRef.current;
    const s = smoothRef.current;
    let raf = 0;
    let inView = true;

    // rAF tick — runs only while the pointer is moving; goes idle when converged
    const tick = () => {
      raf = 0;
      const dx = m.x - s.x;
      const dy = m.y - s.y;
      s.x += dx * 0.12;
      s.y += dy * 0.12;
      layer.style.setProperty('--sx', `${s.x.toFixed(1)}px`);
      layer.style.setProperty('--sy', `${s.y.toFixed(1)}px`);
      // Keep running only while not yet converged
      if (Math.abs(dx) > 0.25 || Math.abs(dy) > 0.25) {
        raf = requestAnimationFrame(tick);
      }
    };

    // Kick a single rAF chain when the pointer moves (or on first position)
    const kick = () => {
      if (!raf && inView && !document.hidden) raf = requestAnimationFrame(tick);
    };
    // Expose kick so the default-position timer and event handlers can call it
    kickSpotlightRef.current = kick;

    const handleMouseMove = (e: MouseEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      kick();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        m.x = e.touches[0].clientX;
        m.y = e.touches[0].clientY;
        kick();
      }
    };

    // Visibility: cancel rAF when tab hidden, restart on return
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        kick();
      }
    };

    // IntersectionObserver: pause when hero scrolled off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else {
          kick();
        }
      },
      { threshold: 0 }
    );
    if (containerRef.current) io.observe(containerRef.current);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    // If default position was already set before this effect ran, kick immediately
    if (m.x !== -999) kick();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      kickSpotlightRef.current = null;
      io.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      // Clear the mask when leaving spotlight mode
      layer.style.maskImage = '';
      layer.style.webkitMaskImage = '';
    };
  }, [revealMode, spotlightRadius]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update --r custom property when spotlightRadius slider changes (no remount needed)
  useEffect(() => {
    if (revealMode === 'spotlight') {
      revealImgRef.current?.style.setProperty('--r', `${spotlightRadius}px`);
    }
  }, [spotlightRadius, revealMode]);

  // ─── Non-spotlight modes (split, vibrant, base) ───────────────────────────
  const updateNonSpotlightMask = useCallback(() => {
    const imgLayer = revealImgRef.current;
    if (!imgLayer) return;
    if (revealMode === 'split') {
      imgLayer.style.maskImage = `linear-gradient(to right, transparent ${splitPosition}%, black ${splitPosition}%)`;
      imgLayer.style.webkitMaskImage = `linear-gradient(to right, transparent ${splitPosition}%, black ${splitPosition}%)`;
      imgLayer.style.maskSize = '100% 100%';
      imgLayer.style.webkitMaskSize = '100% 100%';
      imgLayer.style.opacity = '1';
    } else if (revealMode === 'vibrant') {
      imgLayer.style.maskImage = 'none';
      imgLayer.style.webkitMaskImage = 'none';
      imgLayer.style.opacity = '1';
    } else if (revealMode === 'base') {
      imgLayer.style.opacity = '0';
    }
  }, [revealMode, splitPosition]);

  useEffect(() => {
    if (revealMode !== 'spotlight') updateNonSpotlightMask();
  }, [revealMode, splitPosition, updateNonSpotlightMask]);

  // ─── Stable ref for kick (used by default-position timer) ─────────────────
  const kickSpotlightRef = useRef<(() => void) | null>(null);
  const kickSpotlight = useCallback(() => {
    kickSpotlightRef.current?.();
  }, []);

  // ─── Phase 5: Lanyard preload on hover/focus ───────────────────────────────
  const preloadLanyard = useCallback(() => {
    // Dynamic import triggers the module load; the Suspense boundary handles rendering
    import('./Lanyard').catch(() => {/* ignore */});
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#101820] min-h-screen md:h-screen md:min-h-[860px] select-none text-[#EAF2F6]"
      id="hero"
    >
      {/* 1. ARCHITECTURAL MONUMENTAL TYPOGRAPHY BEHIND IMAGE */}
      <div className="absolute bottom-[-15px] md:bottom-[-35px] left-0 right-0 z-2 pointer-events-none w-full text-center creator-text-animate">
        <h2 className="font-bold text-[#EAF2F6]/10 leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-[clamp(140px,24vw,520px)] select-none">
          INTELLIGENCE
        </h2>
      </div>

      {/* 2. BASE IMAGE LAYER (Crystalline Arctic Sculpture) */}
      <div
        className="absolute top-[28vh] md:top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat bg-[60%_center] md:bg-center z-5 hero-image-animate transition-opacity duration-700 opacity-90"
        style={{
          backgroundImage: imageError
            ? 'radial-gradient(circle at 60% 40%, #1e293b 0%, #101820 80%)'
            : "url('https://soft-zoom-63098134.figma.site/_assets/v11/5c9f982199fde1d9b85a20e5396f0fa7bacaf9a3.png?w=2560')"
        }}
      >
        <img
          src="https://soft-zoom-63098134.figma.site/_assets/v11/5c9f982199fde1d9b85a20e5396f0fa7bacaf9a3.png?w=2560"
          alt="Arctic Crystal Base"
          className="hidden"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          decoding="async"
        />

        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto rounded-full border border-[#75C5DE]/30 flex items-center justify-center mb-4 bg-[#75C5DE]/10 backdrop-blur-md">
                <Sparkles className="w-10 h-10 text-[#75C5DE]" />
              </div>
              <p className="text-[#647786] text-xs tracking-widest uppercase">Cinematic Arctic Spatial Engine</p>
            </div>
          </div>
        )}
      </div>

      {/* 3. REVEAL LAYER — now uses CSS mask, no canvas/toDataURL */}
      <div
        ref={revealImgRef}
        className="absolute top-[28vh] md:top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat bg-[60%_center] md:bg-center z-7 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: imageError
            ? 'radial-gradient(circle at 60% 40%, #c6283d 0%, #0369a1 50%, #101820 90%)'
            : "url('https://soft-zoom-63098134.figma.site/_assets/v11/6be2165e31648955b4e071f4cf2a50bc572b9bfd.png?w=1536')"
        }}
      />

      {/* 3.5. INTERACTIVE 3D LANYARD BADGE (Activated by clicking Profile Logo) */}
      {isLanyardOpen && (
        <div className="absolute inset-0 z-20 pointer-events-auto overflow-hidden animate-in fade-in duration-500">
          {/* Close backdrop — click anywhere outside the card */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={onCloseLanyard}
            title="Click to close badge"
          />

          {/* Status pill + close button — always on top */}
          <div className="absolute top-24 md:top-28 left-0 right-0 flex items-center justify-between px-4 md:px-10 z-30 pointer-events-auto">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#101820]/90 border border-[#75C5DE]/30 backdrop-blur-xl shadow-2xl text-xs text-[#EAF2F6]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#75C5DE] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#75C5DE]"></span>
              </span>
              <span className="font-semibold text-white tracking-wide">3D Interactive ID Badge</span>
              <span className="text-[#647786]">·</span>
              <span className="text-[#75C5DE] hidden sm:inline text-[11px]">Drag &amp; Toss · Click to Flip</span>
            </div>

            <button
              onClick={onCloseLanyard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#101820]/90 hover:bg-[#C6283D] text-[#EAF2F6] text-xs font-medium border border-white/10 hover:border-[#C6283D] transition-all shadow-xl backdrop-blur-xl cursor-pointer group"
              aria-label="Close 3D Badge"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Full-page Lanyard canvas — lazily loaded */}
          <div style={{ width: '100%', height: '100%' }} className="pointer-events-auto">
            <React.Suspense fallback={null}>
              <Lanyard
                frontImage="/lanyard-card-front.png"
                backImage="/lanyard-card-back.png"
                imageFit="contain"
                cardColor="#000000"
                finish="metallic"
                anchor="right"
                strapColor="#116194"
                metal="gold"
                size={0.61}
                strapLength={0.48}
                strapWidth={0.7}
                gravity={0.9}
                damping={0.45}
                elasticity={0.6}
                breeze={0.35}
                interactive={true}
                intro={true}
              />
            </React.Suspense>
          </div>

          {/* Bottom hint */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center z-30 pointer-events-none">
            <p className="text-[11px] text-[#75C5DE]/90 bg-[#101820]/80 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm shadow-md">
              Tip: Grab, swing, or fling the card • Click the card to flip between front &amp; back
            </p>
          </div>
        </div>
      )}

      {/* 4. FOREGROUND CONTENT */}
      <div className="relative z-10 flex flex-col justify-start md:justify-between w-full max-w-[1600px] mx-auto min-h-screen px-6 md:px-12 pt-28 md:pt-36 pb-12 pointer-events-none">
        <div className="flex flex-col items-start gap-6 max-w-xl pointer-events-auto">
          {/* Identity Tag & 3D Badge Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2.5 text-xs text-[#75C5DE] font-semibold tracking-wider uppercase bg-[#101820]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-[#C6283D]" />
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-[#647786]">·</span>
              <span className="text-[#EAF2F6]">SGSU Bhopal</span>
            </div>

            {/* Phase 5: preload Lanyard on hover/focus */}
            <button
              onClick={onToggleLanyard}
              onPointerEnter={preloadLanyard}
              onFocus={preloadLanyard}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer shadow-sm border ${
                isLanyardOpen
                  ? 'bg-[#75C5DE] text-[#101820] border-[#75C5DE] font-semibold'
                  : 'bg-[#75C5DE]/10 hover:bg-[#75C5DE]/20 text-[#75C5DE] border-[#75C5DE]/30'
              }`}
              title="Toggle 3D ID Badge"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isLanyardOpen ? 'Hide 3D Badge' : 'View 3D ID Badge'}</span>
            </button>
          </div>

          {/* Headline with word-by-word reveal */}
          <h1
            className="text-3xl md:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#EAF2F6]"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {headlineWords.map((word, idx) => (
              <span
                key={`${word}-${idx}`}
                className="word-reveal-token"
                style={{ animationDelay: `${1 + idx * 0.05}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle / Focus Areas */}
          <p className="text-sm md:text-base text-[#647786] leading-relaxed max-w-lg font-normal">
            BCA student specializing in <strong className="text-[#EAF2F6]">AI &amp; Machine Learning</strong> at Scope Global Skill University. Passionate about full-stack engineering, interactive 3D web experiences, and hackathon prototypes.
          </p>

          {/* Interactive Badges - Unboxed quiet metadata */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#647786] pt-1">
            <span className="flex items-center gap-1.5 text-[#EAF2F6] font-medium">
              <Award className="w-3.5 h-3.5 text-[#C6283D]" />
              First Prize BGI Viksit Bharat 2047
            </span>
            <span aria-hidden="true">·</span>
            <span>SGPA 8.7</span>
            <span aria-hidden="true">·</span>
            <span>Quick Heal Cyber Warrior</span>
          </div>

          {/* Primary CTA Buttons */}
          <div className="cta-animate flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartProject}
              className="cta-btn group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75C5DE]"
              aria-label="Connect with Syed Faizan Ali"
            >
              <span className="cta-btn-bg" />
              <span className="cta-btn-text">Connect &amp; Collaborate</span>
              <span className="cta-btn-circle">
                <ArrowUpRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
              </span>
            </button>

            <button
              onClick={onExploreWork}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-[#EAF2F6] text-sm font-medium transition-colors border border-white/10 backdrop-blur-sm cursor-pointer"
            >
              Explore Projects
            </button>
          </div>
        </div>

        {/* 5. ARCTIC SPOTLIGHT INTERACTIVE CONTROLS BAR */}
        <div className="pointer-events-auto mt-auto pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#647786] font-medium hidden sm:inline-block">
              Crystal Lens:
            </span>
            <div className="flex items-center bg-[#101820]/80 backdrop-blur-md rounded-full p-1 shadow-sm border border-white/10">
              <button
                onClick={() => setRevealMode('spotlight')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  revealMode === 'spotlight'
                    ? 'bg-[#C6283D] text-white shadow-xs'
                    : 'text-[#EAF2F6]/70 hover:text-white'
                }`}
              >
                Spotlight
              </button>
              <button
                onClick={() => setRevealMode('split')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  revealMode === 'split'
                    ? 'bg-[#C6283D] text-white shadow-xs'
                    : 'text-[#EAF2F6]/70 hover:text-white'
                }`}
              >
                Split
              </button>
              <button
                onClick={() => setRevealMode('vibrant')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  revealMode === 'vibrant'
                    ? 'bg-[#C6283D] text-white shadow-xs'
                    : 'text-[#EAF2F6]/70 hover:text-white'
                }`}
              >
                3D Art
              </button>
              <button
                onClick={() => setRevealMode('base')}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  revealMode === 'base'
                    ? 'bg-[#C6283D] text-white shadow-xs'
                    : 'text-[#EAF2F6]/70 hover:text-white'
                }`}
              >
                Crystal Base
              </button>
            </div>

            <button
              onClick={() => setShowControls(!showControls)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#EAF2F6] transition-colors border border-white/10 cursor-pointer"
              title="Tune lens parameters"
              aria-label="Toggle lens parameters"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#647786] hidden md:inline-flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#75C5DE]" />
              Move cursor or drag to reveal neural layers
            </span>
            <button
              onClick={onReplayIntro}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-white/10 hover:bg-white/20 text-[#EAF2F6] rounded-full transition-colors border border-white/10 cursor-pointer"
              title="Replay 10-box grid curtain entrance"
            >
              <RotateCcw className="w-3 h-3 text-[#75C5DE]" />
              Replay Curtain
            </button>
          </div>
        </div>

        {/* Expandable Parameter Slider */}
        {showControls && (
          <div className="pointer-events-auto mt-2 p-3.5 bg-[#101820]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl max-w-md flex flex-col gap-2">
            {revealMode === 'spotlight' ? (
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="text-[#647786] font-medium whitespace-nowrap">Radius ({spotlightRadius}px)</span>
                <input
                  type="range"
                  min="140"
                  max="440"
                  value={spotlightRadius}
                  onChange={(e) => setSpotlightRadius(Number(e.target.value))}
                  className="w-full accent-[#C6283D] cursor-pointer"
                  aria-label="Spotlight radius slider"
                />
              </div>
            ) : revealMode === 'split' ? (
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="text-[#647786] font-medium whitespace-nowrap">Split Position ({splitPosition}%)</span>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={splitPosition}
                  onChange={(e) => setSplitPosition(Number(e.target.value))}
                  className="w-full accent-[#C6283D] cursor-pointer"
                  aria-label="Split position slider"
                />
              </div>
            ) : (
              <div className="text-xs text-[#647786]">
                Switch to <strong>Spotlight</strong> or <strong>Split</strong> to adjust crystal reveal parameters.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
