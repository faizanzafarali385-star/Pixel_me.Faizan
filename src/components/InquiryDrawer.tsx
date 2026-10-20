import React, { useState, useEffect } from 'react';
import { X, Check, Send, CheckCircle2, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Hackathon & Project Collaboration',
    interests: ['AI & Machine Learning', 'Web Development'],
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const interestOptions = [
    'AI & Machine Learning',
    '3D Web & Three.js',
    'Full-Stack Web Development',
    'Hackathon Teaming',
    'Smart Campus Innovation',
    'Social Commerce & Civic Tech'
  ];

  const topicOptions = [
    'Hackathon & Project Collaboration',
    'Full-Stack / Web Development Opportunity',
    'AI / Research Discussion',
    'General Inquiry & Networking'
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-drawer-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl h-full overflow-y-auto bg-[#101820] text-[#EAF2F6] shadow-2xl p-6 md:p-10 flex flex-col justify-between border-l border-white/10 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#75C5DE] block mb-1">
                Direct Connection
              </span>
              <h2 id="inquiry-drawer-title" className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Let&apos;s Build Something Meaningful
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75C5DE] cursor-pointer"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="py-16 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#75C5DE]/20 text-[#75C5DE] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-white">Message Transmitted</h3>
                <p className="text-sm text-[#647786] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name || 'Friend'}</strong>! Syed Faizan Ali will review your message and reply to <strong className="text-white">{formData.email || 'your email'}</strong> promptly.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="text-[#647786] uppercase tracking-wider font-semibold">Transmission Summary</div>
                <div className="text-white"><strong>Subject:</strong> {formData.topic}</div>
                <div className="text-white"><strong>Focus Areas:</strong> {formData.interests.join(', ') || 'General Collaboration'}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-full bg-white text-[#101820] font-medium text-xs md:text-sm hover:bg-[#EAF2F6] transition-colors cursor-pointer"
                >
                  Return to Portfolio
                </button>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-[#C6283D] text-white font-medium text-xs md:text-sm hover:bg-[#b02235] transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="py-6 space-y-6">
              {/* Collaboration Intent */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#647786] uppercase tracking-wider block">
                  Collaboration Intent
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topicOptions.map((topic) => (
                    <button
                      type="button"
                      key={topic}
                      onClick={() => setFormData({ ...formData, topic })}
                      className={`px-3 py-2 text-xs rounded-xl font-medium text-left transition-all cursor-pointer ${
                        formData.topic === topic
                          ? 'bg-[#C6283D] text-white font-semibold'
                          : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technologies of Interest */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#647786] uppercase tracking-wider block">
                  Relevant Topics / Tech
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => {
                    const selected = formData.interests.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          selected
                            ? 'bg-[#75C5DE] text-[#101820] font-semibold'
                            : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                        }`}
                      >
                        {selected && <Check className="w-3 h-3 text-[#101820]" />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="faizan-name" className="text-xs text-[#647786]">Your Name / Org *</label>
                  <input
                    id="faizan-name"
                    required
                    type="text"
                    placeholder="e.g. Alex / Tech Innovators"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#75C5DE] focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="faizan-email" className="text-xs text-[#647786]">Your Direct Email *</label>
                  <input
                    id="faizan-email"
                    required
                    type="email"
                    placeholder="alex@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#75C5DE] focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="faizan-message" className="text-xs text-[#647786]">Project Idea or Message *</label>
                <textarea
                  id="faizan-message"
                  required
                  rows={4}
                  placeholder="Share your concept, hackathon pitch, or collaboration thoughts..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#75C5DE] focus:outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#C6283D] hover:bg-[#b02235] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer contact info */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#647786]">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#75C5DE]" />
            {PERSONAL_INFO.email}
          </span>
          <span>Bhopal, MP, India</span>
        </div>
      </div>
    </div>
  );
};
