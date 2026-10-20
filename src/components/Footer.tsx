import React, { useState, useEffect } from 'react';
import { ArrowUp, Copy, Check, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const [copied, setCopied] = useState(false);
  const [bhopalTime, setBhopalTime] = useState<string>('');
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setBhopalTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
      setUtcTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-[#101820] text-[#EAF2F6] pt-24 pb-12 px-6 md:px-12 border-t border-white/10 select-none">
      <div className="max-w-[1600px] mx-auto space-y-20">
        {/* Main Connect Callout */}
        <div
          data-scroll="line-draw"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-16 border-b border-white/10"
        >
          <div className="space-y-4 max-w-2xl">
            <span
              data-scroll="slide-reveal"
              className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block"
            >
              Contact &amp; Collaboration
            </span>
            <h2
              data-scroll="fade-up"
              data-delay="100"
              className="text-4xl md:text-7xl font-semibold tracking-tight text-white leading-tight"
            >
              Let&apos;s Build Something Meaningful.
            </h2>
            <p
              data-scroll="fade-up"
              data-delay="200"
              className="text-sm md:text-base text-[#647786] leading-relaxed max-w-xl font-normal"
            >
              Have an interesting idea, a project to collaborate on, or an opportunity to create something impactful? I&apos;m always interested in connecting with people who enjoy technology, creativity, and solving real-world problems.
            </p>
          </div>

          <div
            data-scroll="fade-left"
            data-delay="250"
            className="space-y-4 shrink-0"
          >
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-lg md:text-2xl font-mono text-white hover:text-[#75C5DE] transition-colors underline underline-offset-8"
              >
                {PERSONAL_INFO.email}
              </a>
              <button
                onClick={copyEmail}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-[#75C5DE]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-xs text-[#75C5DE] block animate-in fade-in">
                Email address copied to clipboard
              </span>
            )}

            <div className="pt-2">
              <button
                onClick={onOpenInquiry}
                className="px-6 py-3 rounded-full bg-[#C6283D] hover:bg-[#b02235] text-white font-medium text-xs md:text-sm transition-colors shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(198,40,61,0.5)] transition-shadow"
              >
                Open Project Inquiry &amp; Connect
              </button>
            </div>
          </div>
        </div>

        {/* Local Time, Location & Social Presence */}
        <div
          data-scroll="fade-up"
          data-delay="100"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4 text-xs md:text-sm text-[#647786]"
        >
          <div className="space-y-2">
            <div className="text-white font-medium flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C6283D]" />
              Base Location
            </div>
            <div className="text-[#EAF2F6]">{PERSONAL_INFO.location}</div>
            <div className="font-mono text-xs text-[#647786]">{PERSONAL_INFO.coordinates}</div>
          </div>

          <div className="space-y-2">
            <div className="text-white font-medium flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#75C5DE]" />
              Real-Time Clock
            </div>
            <div className="font-mono tabular-nums text-white">
              Bhopal: <span className="text-[#75C5DE] font-semibold">{bhopalTime || '16:00:00'} IST</span>
            </div>
            <div className="font-mono tabular-nums text-xs text-[#647786]">
              UTC: {utcTime || '10:30:00'}
            </div>
          </div>

          <div className="space-y-2 md:text-right">
            <div className="text-white font-medium">Professional Networks</div>
            <div className="flex items-center md:justify-end gap-5 text-xs pt-1">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#EAF2F6] hover:text-[#75C5DE] flex items-center gap-1 underline underline-offset-4 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-[#EAF2F6] hover:text-[#75C5DE] flex items-center gap-1 underline underline-offset-4 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          data-scroll="fade-up"
          data-delay="200"
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#647786]"
        >
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, TypeScript &amp; Three.js.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
            aria-label="Back to top"
          >
            <span className="group-hover:text-[#75C5DE] transition-colors">Back to top</span>
            <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#75C5DE]/20 group-hover:text-[#75C5DE] flex items-center justify-center transition-all">
              <ArrowUp className="w-4 h-4 text-white group-hover:text-[#75C5DE] transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
