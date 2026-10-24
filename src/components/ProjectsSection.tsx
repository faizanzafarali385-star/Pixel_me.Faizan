import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { PixelTransition } from './PixelTransition';
import { ProjectImage } from './ProjectImage';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'Full-Stack & AI', '3D & Social Commerce', 'Conversational AI', 'Core Systems'];

  const filtered = activeTab === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="w-full bg-[#101820] py-24 px-6 md:px-12 text-[#EAF2F6] border-t border-white/10">
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
              03 · Practical Implementations
            </span>
            <h2
              data-scroll="fade-up"
              data-delay="100"
              className="text-3xl md:text-5xl font-semibold tracking-tight text-white"
            >
              Featured Projects
            </h2>
          </div>

          {/* Category Filter */}
          <div
            data-scroll="fade-left"
            data-delay="200"
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#C6283D] text-white shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-[#647786] hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, idx) => (
            <article
              key={project.id}
              data-scroll={idx % 2 === 0 ? 'fade-left' : 'fade-right'}
              data-delay={String(idx * 100)}
              onClick={() => onSelectProject(project)}
              className="relative shimmer-on-hover group cursor-pointer p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#75C5DE]/30 transition-all duration-400 flex flex-col justify-between hover:shadow-2xl hover:bg-white/[0.05] overflow-hidden"
            >
              {/* Visual Media Header */}
              <div className="relative w-full h-[240px] md:h-[280px] rounded-2xl overflow-hidden mb-6 bg-[#18232C]">
                <PixelTransition
                  firstContent={
                    <ProjectImage
                      src={project.baseImage}
                      alt={project.title}
                      accentColor={project.accentColor}
                      className="w-full h-full"
                      imageClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/90 via-transparent to-transparent opacity-80 pointer-events-none" />
                    </ProjectImage>
                  }
                  secondContent={
                    <ProjectImage
                      src={project.secondaryImage || project.baseImage}
                      alt={`${project.title} - Preview`}
                      accentColor={project.accentColor}
                      className="w-full h-full"
                      imageClassName="w-full h-full object-cover"
                      loading="lazy"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/95 via-transparent to-transparent opacity-90 pointer-events-none" />
                      {project.secondaryTag && (
                        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#75C5DE]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#75C5DE] animate-pulse" />
                          {project.secondaryTag}
                        </div>
                      )}
                    </ProjectImage>
                  }
                  gridSize={12}
                  pixelColor={project.accentColor || '#ffffff'}
                  mosaic={0.3}
                  gap={0}
                  pattern="random"
                  pixelAnimation="pop"
                  randomness={0.3}
                  animationStepDuration={0.4}
                  trigger="hover"
                  aspectRatio=""
                  style={{ width: '100%', height: '100%' }}
                  className="w-full h-full"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="text-[11px] font-semibold text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {project.category}
                  </span>
                </div>
                {project.badge && (
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <span className="text-[10px] font-semibold text-[#EAF2F6] bg-[#C6283D]/90 backdrop-blur-md px-2.5 py-1 rounded-full">
                      {project.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-2 text-xs text-[#647786] mb-2 font-medium">
                <span className="text-[#75C5DE]">{project.tagline}</span>
                {project.team && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#EAF2F6]">{project.team}</span>
                  </>
                )}
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white group-hover:text-[#75C5DE] transition-colors mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-[#647786] line-clamp-3 leading-relaxed mb-4">
                {project.headline}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-[#EAF2F6]/80 font-mono"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="text-[11px] px-2 py-1 text-[#647786]">
                    +{project.technologies.length - 5} more
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#647786] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6283D]" />
                  Interactive Architecture
                </span>
                <span className="font-semibold text-white flex items-center gap-1 group-hover:text-[#75C5DE] transition-colors">
                  View Full Case Study
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
