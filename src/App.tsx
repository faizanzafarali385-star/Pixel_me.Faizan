import { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { SplashReveal } from './components/SplashReveal';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificationsAndInterestsSection } from './components/CertificationsAndInterestsSection';
import { Footer } from './components/Footer';
import { Project } from './types';

// ─── Phase 5: Lazy-load modals (only mount when open) ────────────────────────
const CaseStudyModal = lazy(() =>
  import('./components/CaseStudyModal').then(m => ({ default: m.CaseStudyModal }))
);
const InquiryDrawer = lazy(() =>
  import('./components/InquiryDrawer').then(m => ({ default: m.InquiryDrawer }))
);

// ─── Phase 3: Defer PixelTrail mount until after splash ─────────────────────
// We import it lazily and only mount it after ~1.8 s so shader compilation
// does not compete with first paint.
const PixelTrail = lazy(() => import('./components/PixelTrail'));

// ─── Phase 1: import perf tier system (auto-initialises on import) ───────────
import { getTier, subscribeTier, ENABLE_LOW_TIER_FALLBACKS } from './lib/perf';

export default function App() {
  useScrollReveal();
  const [introKey, setIntroKey] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState<boolean>(false);
  const [isLanyardOpen, setIsLanyardOpen] = useState<boolean>(false);

  // ─── Phase 3: Deferred PixelTrail mounting ─────────────────────────────────
  const [trailReady, setTrailReady] = useState(false);
  useEffect(() => {
    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(() => setTrailReady(true), { timeout: 1800 })
      : setTimeout(() => setTrailReady(true), 1800) as unknown as number;
    return () => {
      if (typeof requestIdleCallback !== 'undefined') cancelIdleCallback(id as number);
      else clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
    };
  }, []);

  // ─── Phase 1: Track tier for PixelTrail config ──────────────────────────────
  const [tier, setTier] = useState(getTier);
  useEffect(() => subscribeTier(setTier), []);

  // ─── Low-tier: skip trail entirely on coarse-pointer devices ───────────────
  const isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const showTrail = ENABLE_LOW_TIER_FALLBACKS
    ? !(tier === 'low' && isCoarse)
    : true;

  // ─── Phase 3: DPR per tier ──────────────────────────────────────────────────
  const trailDpr = tier === 'high' ? undefined : 1;

  // ─── Phase 3: gooey per tier ────────────────────────────────────────────────
  // undefined → default {strength:2}; null → disabled
  const trailGooey = (ENABLE_LOW_TIER_FALLBACKS && tier === 'low')
    ? null
    : undefined;

  const handleToggleLanyard = useCallback(() => {
    setIsLanyardOpen((prev) => !prev);
  }, []);

  const handleCloseLanyard = useCallback(() => {
    setIsLanyardOpen(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setIntroKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenInquiry = useCallback(() => {
    setInquiryOpen(true);
  }, []);

  const handleExploreWork = useCallback(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#101820] text-[#EAF2F6] overflow-x-hidden selection:bg-[#C6283D] selection:text-white">
      {/* Global Pixel Trail Cursor Effect — deferred mount + tier-aware config */}
      {trailReady && showTrail && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
          <Suspense fallback={null}>
            <PixelTrail
              gridSize={150}
              trailSize={0.04}
              maxAge={200}
              interpolate={1.1}
              color="#06b6d4"
              gravity={-0.6}
              sparkle={1.85}
              trailColor="#c85404"
              gooeyFilter={trailGooey as { strength: number } | null | undefined}
              dpr={trailDpr}
              imageSrc={undefined}
              style={undefined}
            />
          </Suspense>
        </div>
      )}

      {/* 1. Splash Grid Opening Curtain */}
      <SplashReveal keyTrigger={introKey} />

      {/* 2. Top Navigation Bar & Frosted Arctic Drawer Menu */}
      <Navigation
        onOpenInquiry={handleOpenInquiry}
        onReplayIntro={handleReplayIntro}
        onToggleLanyard={handleToggleLanyard}
        isLanyardOpen={isLanyardOpen}
      />

      {/* 3. Hero Section */}
      <HeroSection
        onStartProject={handleOpenInquiry}
        onReplayIntro={handleReplayIntro}
        onExploreWork={handleExploreWork}
        isLanyardOpen={isLanyardOpen}
        onToggleLanyard={handleToggleLanyard}
        onCloseLanyard={handleCloseLanyard}
      />

      {/* Phase 5: content-visibility on below-fold sections */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 900px' } as React.CSSProperties}>
        <AboutSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 900px' } as React.CSSProperties}>
        <SkillsSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 900px' } as React.CSSProperties}>
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 900px' } as React.CSSProperties}>
        <AchievementsSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 900px' } as React.CSSProperties}>
        <ExperienceSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 900px' } as React.CSSProperties}>
        <CertificationsAndInterestsSection />
      </div>

      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Modals — mounted only when open (Phase 5) */}
      {selectedProject && (
        <Suspense fallback={null}>
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenInquiry={handleOpenInquiry}
          />
        </Suspense>
      )}

      {inquiryOpen && (
        <Suspense fallback={null}>
          <InquiryDrawer
            isOpen={inquiryOpen}
            onClose={() => setInquiryOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
