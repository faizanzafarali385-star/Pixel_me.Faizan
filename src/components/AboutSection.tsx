import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  GraduationCap, BookOpen, Quote, Sparkles, MapPin, CheckCircle,
  Brain, Code2, Zap, Globe, Trophy, ChevronRight, Cpu, Star
} from 'lucide-react';
import {
  PERSONAL_INFO, EDUCATION, PERSONAL_STRENGTHS, LANGUAGES, CURRENTLY_EXPLORING
} from '../data/portfolioData';

/* ─── tiny hook: fires when element enters viewport ─────────────────────── */
const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

/* ─── animated counter ──────────────────────────────────────────────────── */
const Counter: React.FC<{ to: number; suffix?: string; duration?: number }> = ({
  to, suffix = '', duration = 1600
}) => {
  const [val, setVal] = useState(0);
  const { ref, visible } = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, to, duration]);
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {val}{suffix}
    </span>
  );
};

/* ─── neural / dot-grid canvas background ───────────────────────────────── */
const NeuralCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let alive = true;

    const NODES = 60;
    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      nodes = Array.from({ length: NODES }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      }));
    };

    const draw = () => {
      if (!alive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // move nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(117,197,222,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // draw nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(117,197,222,0.45)';
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    init();
    draw();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    />
  );
};

/* ─── stat card ─────────────────────────────────────────────────────────── */
interface StatProps { icon: React.ReactNode; value: number; suffix: string; label: string; color: string }
const StatCard: React.FC<StatProps> = ({ icon, value, suffix, label, color }) => (
  <div className={`
    group relative flex flex-col items-center justify-center text-center p-6 rounded-2xl
    bg-white/[0.035] border border-white/10 shadow-lg
    hover:border-[${color}]/40 hover:bg-white/[0.055]
    transition-all duration-500 hover:-translate-y-1 overflow-hidden
  `}>
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
      bg-gradient-to-br from-[${color}]/8 to-transparent pointer-events-none`} />
    <div className={`w-10 h-10 rounded-xl bg-[${color}]/15 flex items-center justify-center mb-3 text-[${color}]
      group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <div className="text-2xl md:text-3xl font-bold font-mono text-white tabular-nums tracking-tight">
      <Counter to={value} suffix={suffix} />
    </div>
    <div className="text-[11px] text-[#647786] uppercase tracking-wider mt-1">{label}</div>
  </div>
);

/* ─── strength pill ──────────────────────────────────────────────────────── */
const StrengthPill: React.FC<{ label: string; idx: number; visible: boolean }> = ({ label, idx, visible }) => (
  <div
    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl
      bg-white/[0.04] border border-white/10
      hover:border-[#75C5DE]/40 hover:bg-[#75C5DE]/[0.08]
      transition-all duration-300 cursor-default group"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(14px)',
      transition: `opacity 0.4s ${idx * 60}ms, transform 0.4s ${idx * 60}ms`,
    }}
  >
    <CheckCircle className="w-3.5 h-3.5 text-[#C6283D] shrink-0 group-hover:text-[#75C5DE] transition-colors" />
    <span className="text-xs md:text-sm text-[#EAF2F6]/85 group-hover:text-white transition-colors">{label}</span>
  </div>
);

/* ─── exploring item ─────────────────────────────────────────────────────── */
const ExploreItem: React.FC<{ text: string; idx: number; visible: boolean }> = ({ text, idx, visible }) => (
  <div
    className="flex items-start gap-3 p-3 rounded-xl
      hover:bg-white/[0.04] transition-all duration-300 group cursor-default"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-16px)',
      transition: `opacity 0.4s ${idx * 80}ms, transform 0.4s ${idx * 80}ms`,
    }}
  >
    <div className="w-6 h-6 rounded-lg bg-[#75C5DE]/10 flex items-center justify-center shrink-0 mt-0.5
      group-hover:bg-[#75C5DE]/20 group-hover:scale-110 transition-all duration-300">
      <Sparkles className="w-3 h-3 text-[#75C5DE]" />
    </div>
    <span className="text-sm text-[#EAF2F6]/80 group-hover:text-white transition-colors leading-relaxed">{text}</span>
  </div>
);

/* ─── main section ───────────────────────────────────────────────────────── */
export const AboutSection: React.FC = () => {
  const { ref: sectionRef, visible: sectionVisible } = useInView(0.05);
  const { ref: statsRef, visible: statsVisible } = useInView(0.2);
  const { ref: bottomRef, visible: bottomVisible } = useInView(0.15);
  const [activeTab, setActiveTab] = useState<'strengths' | 'exploring'>('strengths');

  const stats: StatProps[] = [
    { icon: <Trophy className="w-5 h-5" />, value: 1,   suffix: 'st', label: 'Hackathon Prize',   color: '#C6283D' },
    { icon: <Star    className="w-5 h-5" />, value: 870, suffix: '',   label: 'SGPA × 100',        color: '#75C5DE' },
    { icon: <Code2   className="w-5 h-5" />, value: 4,   suffix: '+',  label: 'Live Projects',     color: '#C6283D' },
    { icon: <Cpu     className="w-5 h-5" />, value: 7,   suffix: '+',  label: 'Certifications',    color: '#75C5DE' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full bg-[#101820] py-28 px-6 md:px-12 text-[#EAF2F6] border-t border-white/10 overflow-hidden"
    >
      {/* ── ambient glows ── */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
        bg-[#75C5DE]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full
        bg-[#C6283D]/[0.04] blur-[100px] pointer-events-none" />

      {/* ── neural canvas ── */}
      <NeuralCanvas />

      <div className="relative max-w-[1600px] mx-auto space-y-20">

        {/* ══ SECTION HEADER ══════════════════════════════════════════════ */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s, transform 0.7s',
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase
                text-[#75C5DE] bg-[#75C5DE]/10 px-3 py-1 rounded-full border border-[#75C5DE]/20">
                <Brain className="w-3 h-3" />
                01 · Identity &amp; Trajectory
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none">
              About{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#75C5DE] to-[#C6283D]">
                  Me
                </span>
                {/* animated underline */}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#75C5DE] to-[#C6283D] rounded-full"
                  style={{
                    width: sectionVisible ? '100%' : '0%',
                    transition: 'width 0.9s 0.3s',
                  }}
                />
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04]
            border border-white/10 text-xs text-[#647786] shadow">
            <MapPin className="w-3.5 h-3.5 text-[#C6283D]" />
            <span>Scope Global Skill University · Bhopal, India</span>
          </div>
        </div>

        {/* ══ STATS ROW ════════════════════════════════════════════════════ */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s 0.1s, transform 0.7s 0.1s',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <StatCard {...s} />
            </div>
          ))}
        </div>

        {/* ══ BIO + EDUCATION ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Bio */}
          <div
            className="lg:col-span-7 space-y-6"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.8s 0.25s, transform 0.8s 0.25s',
            }}
          >
            <div className="space-y-5 text-[#EAF2F6]/80 text-base md:text-lg leading-relaxed">
              {PERSONAL_INFO.aboutParagraphs.map((para, i) => (
                <p key={i} className="relative pl-4 border-l-2 border-transparent
                  hover:border-[#75C5DE]/50 hover:text-[#EAF2F6] transition-all duration-300 cursor-default">
                  {para}
                </p>
              ))}
            </div>

            {/* Philosophy card */}
            <div className="relative mt-8 p-7 md:p-9 rounded-3xl overflow-hidden
              bg-gradient-to-br from-white/[0.06] to-white/[0.02]
              border border-white/10 shadow-2xl group hover:border-[#75C5DE]/30 transition-all duration-500">
              {/* shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent
                pointer-events-none skew-x-12" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C6283D]/10 rounded-full
                blur-3xl pointer-events-none" />
              <Quote className="w-9 h-9 text-[#C6283D] mb-4 opacity-80" />
              <blockquote className="text-xl md:text-2xl font-semibold tracking-tight text-white
                italic mb-3 leading-snug">
                &ldquo;{PERSONAL_INFO.philosophy}&rdquo;
              </blockquote>
              <p className="text-sm text-[#647786] leading-relaxed">
                {PERSONAL_INFO.philosophySubtext}
              </p>
            </div>

            {/* Languages row */}
            <div className="flex flex-wrap gap-3 pt-2">
              {LANGUAGES.map((lang) => (
                <div key={lang.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl
                    bg-white/[0.04] border border-white/10
                    hover:border-[#75C5DE]/30 hover:bg-[#75C5DE]/[0.06]
                    transition-all duration-300 cursor-default">
                  <Globe className="w-3.5 h-3.5 text-[#75C5DE]" />
                  <span className="text-sm font-medium text-white">{lang.name}</span>
                  <span className="text-[10px] text-[#647786]">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education card */}
          <div
            id="education"
            className="lg:col-span-5"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.8s 0.35s, transform 0.8s 0.35s',
            }}
          >
            {/* Glowing education card */}
            <div className="relative p-8 rounded-3xl overflow-hidden
              bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent
              border border-white/10 shadow-2xl
              hover:border-[#75C5DE]/30 transition-all duration-500 group">

              {/* top-right glow */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#75C5DE]/15
                rounded-full blur-2xl pointer-events-none
                group-hover:w-52 group-hover:h-52 transition-all duration-700" />
              {/* bottom-left glow */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#C6283D]/10
                rounded-full blur-2xl pointer-events-none" />

              {/* header */}
              <div className="relative flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#C6283D]/30 to-[#C6283D]/10
                    flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-5 h-5 text-[#C6283D]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#75C5DE] uppercase tracking-widest block">
                      Education
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {EDUCATION.degree}
                    </h3>
                  </div>
                </div>
                {/* SGPA badge */}
                <div className="flex flex-col items-end">
                  <div className="text-2xl font-black font-mono text-white tabular-nums leading-none">
                    {EDUCATION.sgpa}
                  </div>
                  <div className="text-[9px] font-bold text-[#75C5DE] uppercase tracking-widest">SGPA</div>
                  {/* mini animated bar */}
                  <div className="mt-1.5 h-1 w-16 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#75C5DE] to-[#C6283D] rounded-full"
                      style={{
                        width: sectionVisible ? `${(parseFloat(EDUCATION.sgpa) / 10) * 100}%` : '0%',
                        transition: 'width 1.2s 0.8s ease-out',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* details */}
              <div className="relative py-6 space-y-4 text-sm">
                {[
                  { label: 'Specialization', value: EDUCATION.specialization },
                  { label: 'Institution',    value: EDUCATION.university },
                  { label: 'Location',       value: EDUCATION.location },
                ].map(({ label, value }) => (
                  <div key={label} className="group/row flex flex-col">
                    <span className="text-[10px] text-[#647786] uppercase tracking-wider mb-0.5">{label}</span>
                    <span className="font-medium text-white/90 group-hover/row:text-white transition-colors">
                      {value}
                    </span>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-[10px] text-[#647786] uppercase tracking-wider block mb-0.5">Duration</span>
                    <span className="font-mono text-xs text-white/90">{EDUCATION.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#647786] uppercase tracking-wider block mb-0.5">Status</span>
                    <span className="text-xs text-[#75C5DE] font-medium">{EDUCATION.status}</span>
                  </div>
                </div>
              </div>

              {/* coursework chips */}
              <div className="relative pt-5 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#647786]
                  uppercase tracking-widest mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-[#75C5DE]" />
                  Areas of Learning
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION.areas.map((area, i) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 rounded-lg text-[11px]
                        bg-white/[0.04] border border-white/10
                        hover:bg-[#75C5DE]/10 hover:border-[#75C5DE]/30 hover:text-white
                        text-[#EAF2F6]/80 transition-all duration-200 cursor-default"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ STRENGTHS + EXPLORING (tabbed) ══════════════════════════════ */}
        <div
          ref={bottomRef as React.RefObject<HTMLDivElement>}
          className="pt-6 border-t border-white/10 space-y-6"
          style={{
            opacity: bottomVisible ? 1 : 0,
            transform: bottomVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s, transform 0.7s',
          }}
        >
          {/* tab pills */}
          <div className="flex items-center gap-2">
            {(['strengths', 'exploring'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium
                  transition-all duration-300 border cursor-pointer
                  ${activeTab === tab
                    ? 'bg-[#75C5DE] text-[#101820] border-[#75C5DE] shadow-lg shadow-[#75C5DE]/20'
                    : 'bg-white/[0.04] text-[#647786] border-white/10 hover:text-white hover:border-white/20'
                  }`}
              >
                {tab === 'strengths'
                  ? <><Zap className="w-3.5 h-3.5" />Personal Strengths</>
                  : <><Sparkles className="w-3.5 h-3.5" />Currently Exploring</>
                }
              </button>
            ))}
          </div>

          {/* panel */}
          <div className="relative p-8 rounded-3xl bg-white/[0.025] border border-white/10
            shadow-xl overflow-hidden min-h-[220px]">
            {/* decorative corner */}
            <div className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none
              transition-colors duration-700
              ${activeTab === 'strengths' ? 'bg-[#C6283D]/[0.07]' : 'bg-[#75C5DE]/[0.07]'}`} />

            {activeTab === 'strengths' ? (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Zap className="w-4 h-4 text-[#C6283D]" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Core Aptitudes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {PERSONAL_STRENGTHS.map((strength, idx) => (
                    <StrengthPill key={strength} label={strength} idx={idx} visible={bottomVisible} />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4 text-[#75C5DE]" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">What I&apos;m Exploring</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {CURRENTLY_EXPLORING.map((item, idx) => (
                    <ExploreItem key={idx} text={item} idx={idx} visible={bottomVisible} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
