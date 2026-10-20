import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, Target, Layers, Users, Coins } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onOpenInquiry }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#101820] text-[#EAF2F6] rounded-3xl border border-white/10 shadow-2xl p-6 md:p-10 select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-[#647786]">
            <span className="font-semibold text-white">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#75C5DE]">{project.tagline}</span>
            {project.team && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#C6283D] flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {project.team}
                </span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75C5DE] cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title and Headline */}
        <div className="pt-6 pb-4">
          {project.badge && (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#C6283D] bg-[#C6283D]/10 px-3 py-1 rounded-full mb-3 border border-[#C6283D]/20">
              {project.badge}
            </span>
          )}
          <h2 id="case-study-title" className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-3">
            {project.title}
          </h2>
          <p className="text-base md:text-lg text-[#647786] max-w-3xl leading-relaxed">
            {project.headline}
          </p>
        </div>

        {/* Visual Hero Media */}
        <div className="relative w-full h-[240px] md:h-[380px] rounded-2xl overflow-hidden mb-8 bg-[#18232C] border border-white/10">
          <img
            src={project.baseImage}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.classList.add('bg-gradient-to-br', 'from-[#101820]', 'via-[#18232C]', 'to-[#0a0f14]');
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80">
            <span>Syed Faizan Ali · Project Architecture</span>
            <span className="font-mono text-[#75C5DE]">{project.title}</span>
          </div>
        </div>

        {/* Project Goal & Narrative */}
        <div className="space-y-6 pb-6 border-b border-white/10">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#75C5DE]">
              <Target className="w-4 h-4" />
              Project Goal
            </div>
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-normal">
              {project.goal}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#647786] mb-2">Overview</h3>
            <p className="text-sm md:text-base text-[#EAF2F6]/85 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="py-6 border-b border-white/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#75C5DE] mb-4">
            Key Architectural Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.keyFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-[#EAF2F6]/90 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#C6283D] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Loyalty System if present */}
          {project.loyaltySystem && (
            <div className="mt-4 p-4 rounded-xl bg-[#C6283D]/10 border border-[#C6283D]/20 flex items-center gap-3 text-xs md:text-sm text-white">
              <Coins className="w-5 h-5 text-[#C6283D] shrink-0" />
              <div>
                <strong>Loyalty System Architecture:</strong> {project.loyaltySystem}
              </div>
            </div>
          )}
        </div>

        {/* Technologies Used */}
        <div className="py-6 border-b border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#647786]">
            <Layers className="w-3.5 h-3.5 text-[#75C5DE]" />
            Technologies &amp; Libraries
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-[#647786]">
            Built with purpose &amp; practical problem-solving.
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenInquiry();
            }}
            className="menu-cta-btn group"
          >
            <span className="menu-cta-bg" />
            <span className="menu-cta-text">Discuss Project Details</span>
            <span className="menu-cta-circle">
              <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2.4} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
