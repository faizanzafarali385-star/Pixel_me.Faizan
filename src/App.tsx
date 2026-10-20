import { useState, useCallback } from 'react';
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
import { CaseStudyModal } from './components/CaseStudyModal';
import { InquiryDrawer } from './components/InquiryDrawer';
import PixelTrail from './components/PixelTrail';
import { Project } from './types';

export default function App() {
  const [introKey, setIntroKey] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState<boolean>(false);

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
      {/* Global Pixel Trail Cursor Effect */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
        <PixelTrail
          gridSize={150}
          trailSize={0.04}
          maxAge={200}
          interpolate={1.1}
          color="#06b6d4"
          gravity={-0.6}
          sparkle={1.85}
          trailColor="#c85404"
          gooeyFilter={undefined}
          dpr={undefined}
          imageSrc={undefined}
          style={undefined}
        />
      </div>

      {/* 1. Splash Grid Opening Curtain */}
      <SplashReveal keyTrigger={introKey} />

      {/* 2. Top Navigation Bar & Frosted Arctic Drawer Menu */}
      <Navigation
        onOpenInquiry={handleOpenInquiry}
        onReplayIntro={handleReplayIntro}
      />

      {/* 3. Hero Section: Architectural Monolith, Dynamic Crystal Spotlight Mask & Staggered Reveal */}
      <HeroSection
        onStartProject={handleOpenInquiry}
        onReplayIntro={handleReplayIntro}
        onExploreWork={handleExploreWork}
      />

      {/* 4. About Me, Education (SGSU BCA AI/ML, SGPA 8.55), Philosophy & Strengths */}
      <AboutSection />

      {/* 5. Technical Skills (Programming, Frontend, 3D Web, AI/ML, Backend, Tools) */}
      <SkillsSection />

      {/* 6. Featured Projects (SmartUni.Ai, GullyMart, SGSU AI Chatbot, Attendance System) */}
      <ProjectsSection
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* 7. Achievements & Hackathons (BGI Viksit Bharat 1st Prize ₹25,000, SGSU Innovate) */}
      <AchievementsSection />

      {/* 8. Internship Experience (Quick Heal Foundation Cyber Warrior) */}
      <ExperienceSection />

      {/* 9. Verified Certifications (NSDC HTML, CSS, JS) & Personal Interests */}
      <CertificationsAndInterestsSection />

      {/* 10. Contact, Real-Time Bhopal Clock & Colophon */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Modals & Slide-over Drawers */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenInquiry={handleOpenInquiry}
      />

      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </div>
  );
}
