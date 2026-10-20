import React, { useEffect, useState } from 'react';

interface SplashRevealProps {
  keyTrigger?: number;
  onComplete?: () => void;
}

export const SplashReveal: React.FC<SplashRevealProps> = ({ keyTrigger = 0, onComplete }) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => {
      setActive(false);
      if (onComplete) onComplete();
    }, 1450);
    return () => clearTimeout(timer);
  }, [keyTrigger, onComplete]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-50 pointer-events-none overflow-hidden splash-container-hide"
      aria-hidden="true"
    >
      {/* Top row: 5 boxes sliding up */}
      <div className="flex w-full h-1/2">
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-top-0" />
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-top-1" />
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-top-2" />
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-top-3" />
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-top-4" />
      </div>

      {/* Bottom row: 5 boxes sliding down */}
      <div className="flex w-full h-1/2">
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-bot-0" />
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-bot-1" />
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-bot-2" />
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-bot-3" />
        <div className="w-1/5 h-full bg-[#75C5DE] splash-box-bot-4" />
      </div>
    </div>
  );
};
