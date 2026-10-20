import React from 'react';
import { ShieldCheck, Video, CheckCircle2, Award } from 'lucide-react';
import { INTERNSHIP } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="w-full bg-[#101820] py-24 px-6 md:px-12 text-[#EAF2F6] border-t border-white/10">
      <div className="max-w-[1600px] mx-auto space-y-16">
        {/* Section Header */}
        <div
          data-scroll="line-draw"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10"
        >
          <div>
            <span
              data-scroll="slide-reveal"
              className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block mb-2"
            >
              05 · Practical Industry Exposure
            </span>
            <h2
              data-scroll="fade-up"
              data-delay="100"
              className="text-3xl md:text-5xl font-semibold tracking-tight text-white"
            >
              Internship Experience
            </h2>
          </div>
          <div
            data-scroll="fade-right"
            data-delay="200"
            className="flex items-center gap-2 text-xs text-[#647786]"
          >
            <ShieldCheck className="w-4 h-4 text-[#75C5DE]" />
            <span>Cyber Safety Awareness &amp; Media Innovation</span>
          </div>
        </div>

        {/* Experience Showcase Card */}
        <div
          data-scroll="fade-left"
          data-delay="100"
          className="shimmer-on-hover relative overflow-hidden p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl hover:border-[#75C5DE]/25 transition-all duration-500"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 border-b border-white/10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#75C5DE]/10 border border-[#75C5DE]/20 text-xs font-semibold text-[#75C5DE]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Cyber Safety Initiative
              </div>

              <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
                {INTERNSHIP.role}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-sm text-[#647786]">
                <span className="font-semibold text-white">{INTERNSHIP.company}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#EAF2F6]">{INTERNSHIP.department}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#75C5DE]">{INTERNSHIP.focus}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-[#647786] space-y-1 shrink-0">
              <div className="text-white font-medium flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#C6283D]" />
                Media &amp; Public Education
              </div>
              <div>Campaign &amp; Antifraud.AI Content</div>
            </div>
          </div>

          {/* Responsibilities Grid */}
          <div className="py-8 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#75C5DE]">
              Key Responsibilities &amp; Activities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTERNSHIP.responsibilities.map((resp, i) => (
                <div
                  key={i}
                  data-scroll="fade-up"
                  data-delay={String(i * 80 + 100)}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs md:text-sm text-[#EAF2F6]/90 hover:border-white/15 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C6283D] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Developed */}
          <div className="pt-6 border-t border-white/10">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#647786] mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#75C5DE]" />
              Competencies &amp; Skills Cultivated
            </h4>
            <div className="flex flex-wrap gap-2">
              {INTERNSHIP.skillsDeveloped.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
