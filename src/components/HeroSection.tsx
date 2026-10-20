import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUpRight, Sparkles, SlidersHorizontal, RotateCcw, Eye, Award, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onStartProject: () => void;
  onReplayIntro: () => void;
  onExploreWork: () => void;
}

type RevealMode = 'spotlight' | 'split' | 'vibrant' | 'base';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onReplayIntro,
  onExploreWork
}) => {
  const headlineWords = PERSONAL_INFO.primaryTagline.split(' ');

  const [revealMode, setRevealMode] = useState<RevealMode>('spotlight');
  const [spotlightRadius, setSpotlightRadius] = useState<number>(270);
  const [splitPosition, setSplitPosition] = useState<number>(50);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealImgRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && mouseRef.current.x === -999) {
        mouseRef.current = {
          x: window.innerWidth * 0.65,
          y: window.innerHeight * 0.45
        };
        smoothRef.current = { ...mouseRef.current };
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const updateMask = useCallback(() => {
    const canvas = canvasRef.current;
    const imgLayer = revealImgRef.current;
    if (!canvas || !imgLayer) return;

    if (revealMode === 'spotlight') {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.12;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.12;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const radius = spotlightRadius;
      const grad = ctx.createRadialGradient(
        smoothRef.current.x,
        smoothRef.current.y,
        0,
        smoothRef.current.x,
        smoothRef.current.y,
        radius
      );

      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.35, 'rgba(255,255,255,1)');
      grad.addColorStop(0.65, 'rgba(255,255,255,0.78)');
      grad.addColorStop(0.82, 'rgba(255,255,255,0.35)');
      grad.addColorStop(0.94, 'rgba(255,255,255,0.1)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      ctx.arc(smoothRef.current.x, smoothRef.current.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      const dataUrl = canvas.toDataURL();
      imgLayer.style.webkitMaskImage = `url(${dataUrl})`;
      imgLayer.style.maskImage = `url(${dataUrl})`;
      imgLayer.style.webkitMaskSize = '100% 100%';
      imgLayer.style.maskSize = '100% 100%';
      imgLayer.style.opacity = '1';
    } else if (revealMode === 'split') {
      imgLayer.style.webkitMaskImage = `linear-gradient(to right, transparent ${splitPosition}%, black ${splitPosition}%)`;
      imgLayer.style.maskImage = `linear-gradient(to right, transparent ${splitPosition}%, black ${splitPosition}%)`;
      imgLayer.style.webkitMaskSize = '100% 100%';
      imgLayer.style.maskSize = '100% 100%';
      imgLayer.style.opacity = '1';
    } else if (revealMode === 'vibrant') {
      imgLayer.style.webkitMaskImage = 'none';
      imgLayer.style.maskImage = 'none';
      imgLayer.style.opacity = '1';
    } else if (revealMode === 'base') {
      imgLayer.style.opacity = '0';
    }
  }, [revealMode, spotlightRadius, splitPosition]);

  useEffect(() => {
    let animId: number;

    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const renderLoop = () => {
      updateMask();
      animId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [updateMask]);

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

      {/* 3. REVEAL LAYER & SPOTLIGHT CANVAS (Vibrant 3D Tech / Neural Atmosphere) */}
      <canvas
        ref={canvasRef}
        className="hidden"
        aria-hidden="true"
      />

      <div
        ref={revealImgRef}
        className="absolute top-[28vh] md:top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat bg-[60%_center] md:bg-center z-7 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: imageError
            ? 'radial-gradient(circle at 60% 40%, #c6283d 0%, #0369a1 50%, #101820 90%)'
            : "url('https://soft-zoom-63098134.figma.site/_assets/v11/6be2165e31648955b4e071f4cf2a50bc572b9bfd.png?w=1536')"
        }}
      />

      {/* 4. FOREGROUND CONTENT */}
      <div className="relative z-10 flex flex-col justify-start md:justify-between w-full max-w-[1600px] mx-auto min-h-screen px-6 md:px-12 pt-28 md:pt-36 pb-12 pointer-events-none">
        <div className="flex flex-col items-start gap-6 max-w-xl pointer-events-auto">
          {/* Identity Tag */}
          <div className="flex items-center gap-2.5 text-xs text-[#75C5DE] font-semibold tracking-wider uppercase bg-[#101820]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-[#C6283D]" />
            <span>{PERSONAL_INFO.name}</span>
            <span className="text-[#647786]">·</span>
            <span className="text-[#EAF2F6]">SGSU Bhopal</span>
          </div>

          {/* Headline with word-by-word reveal */}
          <h1
            className="text-3xl md:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#EAF2F6]"
            style={{ textWrap: 'balance' }}
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
            <span>SGPA 8.55</span>
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
