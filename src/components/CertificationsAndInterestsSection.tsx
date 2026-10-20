import React from 'react';
import { Award, Palette, Gamepad2, TrendingUp, Cpu, CheckCircle } from 'lucide-react';
import { CERTIFICATIONS, PERSONAL_INTERESTS } from '../data/portfolioData';

export const CertificationsAndInterestsSection: React.FC = () => {
  const interestIcons = [Palette, Gamepad2, TrendingUp, Cpu];

  return (
    <section id="certifications" className="w-full bg-[#101820] py-24 px-6 md:px-12 text-[#EAF2F6] border-t border-white/10">
      <div className="max-w-[1600px] mx-auto space-y-20">
        {/* CERTIFICATIONS */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block mb-2">
                06 · Verified Credentials
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                Certifications
              </h2>
            </div>
            <p className="text-xs text-[#647786]">
              National Skill Development Corporation &amp; Technical Programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#75C5DE]/10 text-[#75C5DE] flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#647786]">{cert.year}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white tracking-tight pt-2">
                    {cert.name}
                  </h3>

                  <p className="text-xs text-[#75C5DE] font-medium">
                    {cert.issuer}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-xs text-[#647786] gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C6283D]" />
                  <span>Verified Competency</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PERSONAL INTERESTS */}
        <div id="interests" className="space-y-12 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block mb-2">
                07 · Mindset &amp; Curiosity
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                Personal Interests
              </h2>
            </div>
            <p className="text-xs text-[#647786] max-w-sm">
              Cross-disciplinary curiosity fueling creative code, visual intuition, and systems thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERSONAL_INTERESTS.map((interest, idx) => {
              const Icon = interestIcons[idx] || Palette;
              return (
                <div
                  key={interest.title}
                  className="p-7 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 text-[#EAF2F6] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[#C6283D]" />
                    </div>

                    <h3 className="text-lg font-semibold text-white tracking-tight">
                      {interest.title}
                    </h3>

                    <p className="text-xs text-[#647786] leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
