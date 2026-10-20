import React from 'react';
import { Trophy, Award, Zap, Sparkles } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="w-full bg-[#101820] py-24 px-6 md:px-12 text-[#EAF2F6] border-t border-white/10">
      <div className="max-w-[1600px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block mb-2">
              04 · Competitive Excellence
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Achievements &amp; Hackathons
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#647786] max-w-md">
            Validated in high-intensity competitive hackathons and rapid technical prototyping sprints.
          </p>
        </div>

        {/* Highlight Card: First Prize BGI Viksit Bharat 2047 */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#101820] via-white/[0.04] to-white/[0.01] border border-[#C6283D]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6283D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6283D]/20 border border-[#C6283D]/30 text-xs font-semibold text-white">
                <Trophy className="w-3.5 h-3.5 text-[#C6283D]" />
                Champion · First Prize Winner
              </div>

              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                BGI Viksit Bharat 2047 Hackathon
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#647786]">
                <span>Theme: <strong className="text-white">Smart Mobility, EVs and Logistics</strong></span>
                <span aria-hidden="true">·</span>
                <span>Competitive Innovation</span>
              </div>

              <p className="text-sm md:text-base text-[#EAF2F6]/85 leading-relaxed font-normal">
                Participated in a high-caliber competitive hackathon focused on solving critical real-world infrastructure, EV transition, and logistics hurdles through rapid technical prototyping, teamwork, and problem-solving.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-[#101820]/90 border border-white/10 text-center shrink-0 min-w-[240px]">
              <span className="text-[11px] uppercase tracking-wider text-[#75C5DE] font-semibold block mb-1">
                Prize Money
              </span>
              <div className="text-4xl md:text-5xl font-black font-mono tracking-tight text-white tabular-nums">
                ₹25,000
              </div>
              <span className="text-xs text-[#647786] mt-2 block">Awarded for 1st Place</span>
            </div>
          </div>
        </div>

        {/* Secondary Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.filter(a => !a.highlight).map((ach) => (
            <div
              key={ach.id}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-[#75C5DE] flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[#647786]">{ach.date}</span>
                </div>

                <h4 className="text-xl font-semibold text-white tracking-tight">
                  {ach.event}
                </h4>

                <div className="text-xs text-[#75C5DE] font-medium">
                  {ach.theme} · {ach.award}
                </div>

                <p className="text-sm text-[#647786] leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-xs text-[#647786] gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#C6283D]" />
                <span>Collaborative Engineering</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
