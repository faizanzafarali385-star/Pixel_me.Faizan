import React, { useState, useEffect, useRef } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  accentColor?: string;
  loading?: 'lazy' | 'eager';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  children?: React.ReactNode;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  accentColor = '#75C5DE',
  loading = 'lazy',
  referrerPolicy = 'no-referrer',
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#131c24] select-none ${className}`}
      aria-busy={!isLoaded && !hasError}
    >
      {/* Loading Skeleton & Cyber Animation */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden bg-[#101820]">
          {/* Cyber Blueprint Grid Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(117, 197, 222, 0.4) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Shimmer Wave Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-cyber-shimmer" />
          </div>

          {/* Cyber Scanline */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#75C5DE]/60 to-transparent shadow-[0_0_12px_#75C5DE] animate-cyber-scan pointer-events-none" />

          {/* Cyber HUD Corner Accents */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#75C5DE]/40 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#75C5DE]/40 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#75C5DE]/40 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#75C5DE]/40 pointer-events-none" />

          {/* Central Loader Hub */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            {/* Dual Ring Animated Spinner */}
            <div className="relative flex items-center justify-center">
              <div
                className="w-12 h-12 rounded-full border border-dashed border-white/15 animate-cyber-pulse-ring"
                style={{ borderColor: `${accentColor}44` }}
              />
              <div
                className="absolute w-8 h-8 rounded-full border-2 border-transparent animate-spin"
                style={{
                  borderTopColor: accentColor || '#75C5DE',
                  borderBottomColor: '#C6283D',
                }}
              />
              <div
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: accentColor || '#75C5DE' }}
              />
            </div>

            {/* Micro Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#18232C]/80 border border-white/10 backdrop-blur-md shadow-lg">
              <Loader2 className="w-3 h-3 animate-spin text-[#75C5DE]" />
              <span className="font-mono text-[10px] tracking-widest text-[#75C5DE] uppercase font-semibold">
                Loading Visual...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Fallback Error State */}
      {hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#101820] via-[#18232C] to-[#0a0f14] p-4 text-center">
          <div className="p-3 rounded-full bg-white/5 border border-white/10 mb-3 text-[#647786]">
            <ImageOff className="w-6 h-6 text-[#C6283D]" />
          </div>
          <p className="text-xs font-semibold text-white/90 mb-1">{alt}</p>
          <span className="font-mono text-[10px] tracking-wider text-[#647786] uppercase">
            Preview Unavailable
          </span>
        </div>
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy={referrerPolicy}
        onLoad={() => {
          setIsLoaded(true);
          setHasError(false);
        }}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded && !hasError ? 'opacity-100 filter-none' : 'opacity-0 scale-[1.02] filter blur-[4px]'
        } ${imageClassName}`}
      />

      {/* Overlays / Children (e.g. Gradients, Tags, Badges) */}
      {children}
    </div>
  );
};

export default ProjectImage;
