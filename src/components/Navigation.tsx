import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps {
  onOpenInquiry: () => void;
  onReplayIntro?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenInquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About Me', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Interests', href: '#interests' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Logo - Left side */}
      <header className="fixed top-6 md:top-8 left-0 w-1/2 z-40 flex items-center pointer-events-none">
        <div className="pl-5 md:pl-10 pointer-events-auto mix-blend-difference">
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75C5DE] rounded-xl p-1.5"
            aria-label="Syed Faizan Ali Home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {/* Arctic Monogram */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#EAF2F6] via-[#75C5DE] to-[#C6283D] p-[1px] shadow-lg">
              <div className="w-full h-full bg-[#101820] rounded-[11px] flex items-center justify-center font-bold text-xs tracking-tighter text-[#EAF2F6]">
                SFA
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[#EAF2F6] font-semibold text-sm tracking-tight leading-none">
                {PERSONAL_INFO.shortName}
              </span>
              <span className="text-[10px] text-[#647786] tracking-wider uppercase font-medium mt-1">
                AI &amp; 3D Dev
              </span>
            </div>
          </a>
        </div>
      </header>

      {/* Floating Burger Button - Right side */}
      <div className="fixed top-5 md:top-8 right-0 w-1/2 z-40 flex justify-end items-center pointer-events-none">
        <div className="pr-5 md:pr-10 pointer-events-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-[52px] h-[52px] md:w-[58px] md:h-[58px] rounded-full cursor-pointer flex flex-col gap-1.5 items-center justify-center shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75C5DE] border ${
              isOpen
                ? 'bg-[#101820] border-[#C6283D] text-[#EAF2F6]'
                : scrolled
                ? 'bg-[#101820]/90 border-white/10 text-[#EAF2F6] backdrop-blur-md'
                : 'bg-[#EAF2F6] border-white/20 text-[#101820] hover:bg-[#101820] hover:text-[#EAF2F6]'
            }`}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                isOpen
                  ? 'bg-[#C6283D] translate-y-[4px] rotate-45'
                  : scrolled
                  ? 'bg-[#EAF2F6]'
                  : 'bg-[#101820] group-hover:bg-[#EAF2F6]'
              }`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                isOpen
                  ? 'bg-[#C6283D] -translate-y-[4px] -rotate-45'
                  : scrolled
                  ? 'bg-[#EAF2F6]'
                  : 'bg-[#101820] group-hover:bg-[#EAF2F6]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Floating Drawer Menu Panel (Arctic Frosted Glass) */}
      <div
        className={`fixed z-30 inset-x-3 md:inset-x-auto md:right-4 md:w-[440px] max-h-[92vh] overflow-y-auto rounded-3xl bg-[#101820]/95 text-[#EAF2F6] backdrop-blur-2xl p-6 md:p-8 shadow-2xl border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isOpen
            ? 'top-2 md:top-3 opacity-100 pointer-events-auto translate-y-0'
            : '-top-[740px] opacity-0 pointer-events-none -translate-y-4'
        }`}
        role="dialog"
        aria-label="Portfolio Navigation"
      >
        <div className="flex flex-col justify-between min-h-[520px]">
          {/* Header in panel */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 pt-2">
            <span className="text-xs uppercase tracking-widest text-[#75C5DE] font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Arctic Navigation
            </span>
            <span className="text-xs text-[#647786]">Bhopal, MP</span>
          </div>

          {/* Nav links */}
          <nav className="grid grid-cols-2 gap-x-4 gap-y-2 py-4">
            {navLinks.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.href)}
                className="text-left text-lg md:text-xl font-medium tracking-tight text-[#EAF2F6]/90 hover:text-[#75C5DE] transition-colors py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#75C5DE] rounded flex items-center justify-between group"
                style={{ transitionDelay: `${idx * 25}ms` }}
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#647786] group-hover:text-[#C6283D] opacity-0 group-hover:opacity-100 transition-opacity">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </nav>

          {/* Contact Details & Direct Connect */}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10 mt-2">
            <div className="space-y-1">
              <div className="text-xs text-[#647786] uppercase tracking-wider">Direct Inbox</div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-[#EAF2F6] hover:text-[#75C5DE] text-sm md:text-base font-mono transition-colors block truncate"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#647786]">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#75C5DE] underline underline-offset-4 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#75C5DE] underline underline-offset-4 transition-colors"
              >
                GitHub
              </a>
              <span className="text-[#647786]/60">·</span>
              <span className="text-white/80">SGSU Bhopal</span>
            </div>

            {/* Menu CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenInquiry();
                }}
                className="menu-cta-btn group w-full justify-between"
                aria-label="Let's build something meaningful"
              >
                <span className="menu-cta-bg" />
                <span className="menu-cta-text">Let&apos;s build something</span>
                <span className="menu-cta-circle">
                  <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2.4} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
