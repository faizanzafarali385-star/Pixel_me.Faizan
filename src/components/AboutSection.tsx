import React from 'react';
import { GraduationCap, BookOpen, Quote, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, PERSONAL_STRENGTHS, LANGUAGES, CURRENTLY_EXPLORING } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full bg-[#101820] py-24 px-6 md:px-12 text-[#EAF2F6] border-t border-white/10">
      <div className="max-w-[1600px] mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block mb-2">
              01 · Identity &amp; Trajectory
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              About Me
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#647786]">
            <MapPin className="w-3.5 h-3.5 text-[#C6283D]" />
            <span>Scope Global Skill University · Bhopal, India</span>
          </div>
        </div>

        {/* Main Bio & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio Story */}
          <div className="lg:col-span-7 space-y-6 text-[#EAF2F6]/85 text-base md:text-lg leading-relaxed font-normal">
            {PERSONAL_INFO.aboutParagraphs.map((para, i) => (
              <p key={i}>
                {para}
              </p>
            ))}

            {/* Philosophy Callout Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 shadow-lg relative mt-8">
              <Quote className="w-8 h-8 text-[#C6283D] mb-3 opacity-80" />
              <blockquote className="text-xl md:text-2xl font-medium tracking-tight text-white italic mb-2">
                &ldquo;{PERSONAL_INFO.philosophy}&rdquo;
              </blockquote>
              <p className="text-xs md:text-sm text-[#647786] leading-relaxed">
                {PERSONAL_INFO.philosophySubtext}
              </p>
            </div>
          </div>

          {/* Right Column: Education & Academic Standing */}
          <div id="education" className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#75C5DE]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C6283D]/20 text-[#C6283D] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#75C5DE] uppercase tracking-wider block">Education</span>
                    <h3 className="text-lg font-semibold text-white leading-tight">{EDUCATION.degree}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold font-mono text-white tabular-nums">{EDUCATION.sgpa}</div>
                  <div className="text-[10px] text-[#647786] uppercase tracking-wider">SGPA</div>
                </div>
              </div>

              <div className="py-6 space-y-3 text-sm">
                <div>
                  <div className="text-xs text-[#647786]">Specialization</div>
                  <div className="font-medium text-white">{EDUCATION.specialization}</div>
                </div>
                <div>
                  <div className="text-xs text-[#647786]">Institution</div>
                  <div className="font-medium text-white">{EDUCATION.university}</div>
                  <div className="text-xs text-[#647786]">{EDUCATION.location}</div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-xs text-[#647786]">Duration</div>
                    <div className="font-mono text-xs text-white/90">{EDUCATION.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#647786]">Academic Status</div>
                    <div className="text-xs text-[#75C5DE] font-medium">{EDUCATION.status}</div>
                  </div>
                </div>
              </div>

              {/* Relevant Coursework */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs font-semibold text-[#647786] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#75C5DE]" />
                  Relevant Areas of Learning
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {EDUCATION.areas.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#EAF2F6]/90 text-[11px]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#647786] block mb-3">
                Languages
              </span>
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => (
                  <div key={lang.name} className="flex flex-col">
                    <span className="text-sm font-medium text-white">{lang.name}</span>
                    <span className="text-xs text-[#647786]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Strengths & What I'm Exploring */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
          {/* Strengths */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block mb-3">
              Core Aptitudes
            </span>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">Personal Strengths</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PERSONAL_STRENGTHS.map((strength) => (
                <div key={strength} className="flex items-center gap-2.5 text-xs md:text-sm text-[#EAF2F6]/90">
                  <CheckCircle className="w-4 h-4 text-[#C6283D] shrink-0" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What I'm Exploring */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block mb-3">
              Current Focus
            </span>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">What I&apos;m Exploring</h3>
            <div className="space-y-3">
              {CURRENTLY_EXPLORING.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#EAF2F6]/85">
                  <Sparkles className="w-3.5 h-3.5 text-[#75C5DE] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
