import React, { useState } from 'react';
import { Code2, Layout, Box, Brain, Database, Wrench, Search } from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ElementType> = {
    'Programming Languages': Code2,
    'Frontend Development': Layout,
    '3D Web Development & Animation': Box,
    'AI, Machine Learning & Data Science': Brain,
    'Backend & Database Technologies': Database,
    'Tools & Services': Wrench,
  };

  const categories = ['All', ...SKILL_GROUPS.map(g => g.category)];

  const filteredGroups = SKILL_GROUPS.map(group => {
    if (selectedCategory !== 'All' && group.category !== selectedCategory) {
      return null;
    }
    const matchingSkills = group.skills.filter(s =>
      s.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (searchQuery && matchingSkills.length === 0) return null;
    return {
      ...group,
      skills: searchQuery ? matchingSkills : group.skills
    };
  }).filter(Boolean) as typeof SKILL_GROUPS;

  return (
    <section id="skills" className="w-full bg-[#101820] py-24 px-6 md:px-12 text-[#EAF2F6] border-t border-white/10">
      <div className="max-w-[1600px] mx-auto space-y-16">

        {/* Section Header */}
        <div
          data-scroll="line-draw"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 border-b border-white/10"
        >
          <div>
            <span
              data-scroll="slide-reveal"
              className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block mb-2"
            >
              02 · Technical Capabilities
            </span>
            <h2
              data-scroll="fade-up"
              data-delay="100"
              className="text-3xl md:text-5xl font-semibold tracking-tight text-white"
            >
              Technical Skills &amp; Stack
            </h2>
          </div>

          {/* Search */}
          <div
            data-scroll="fade-left"
            data-delay="200"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <div className="relative">
              <Search className="w-4 h-4 text-[#647786] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skill (e.g. Three.js, React)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 text-xs rounded-full bg-white/5 border border-white/10 text-white placeholder:text-[#647786] focus:outline-none focus:border-[#75C5DE] w-full sm:w-64 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div
          data-scroll="fade-up"
          data-delay="150"
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C6283D] text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-[#647786] hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, idx) => {
            const Icon = categoryIcons[group.category] || Code2;
            const delays = [0, 100, 200, 100, 200, 300];
            return (
              <div
                key={group.category}
                data-scroll="fade-up"
                data-delay={String(delays[idx % delays.length] + 100)}
                className="relative shimmer-on-hover overflow-hidden p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#75C5DE]/30 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:bg-white/[0.05]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#75C5DE]/10 text-[#75C5DE] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#75C5DE]/20 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">
                      {group.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-[#EAF2F6]/90 font-medium group-hover:border-white/15 transition-colors"
                        style={{ transitionDelay: `${si * 20}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 text-[11px] text-[#647786] flex items-center justify-between">
                  <span>{group.skills.length} competencies listed</span>
                  <span className="text-[#75C5DE]">Practical Experience</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div
          data-scroll="blur-in"
          data-delay="200"
          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-[#647786] text-center max-w-2xl mx-auto"
        >
          <strong>Note:</strong> Experience varies across technologies. I continuously improve my skills through practical projects, open hackathons, and experimentation.
        </div>
      </div>
    </section>
  );
};
