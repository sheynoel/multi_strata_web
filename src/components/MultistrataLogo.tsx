import React, { useState } from 'react';

interface MultistrataLogoProps {
  size?: number;
  animated?: boolean;
  interactive?: boolean;
  glow?: boolean;
  className?: string;
}

const scrollToHome = () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });

/** Isometric 4-layer diamond mark. Clicking it scrolls back to the hero. */
export const MultistrataLogo: React.FC<MultistrataLogoProps> = ({
  size = 40,
  animated = true,
  interactive = true,
  glow = true,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isHoverFanning = interactive && isHovered;

  return (
    <div
      onPointerDown={(e) => {
        if (interactive && e.button === 0) scrollToHome();
      }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {glow && (
        <div
          className={`absolute inset-0 rounded-full blur-xl pointer-events-none transition-all duration-500 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-70 scale-100'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(201, 162, 76, 0.16) 0%, transparent 65%)',
          }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 overflow-visible transition-transform duration-300 ${
          animated ? 'ms-logo-float' : ''
        } ${isHoverFanning ? 'scale-[1.08]' : 'scale-100'}`}
        style={{
          filter: glow
            ? isHovered
              ? 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 6px rgba(201, 162, 76, 0.3))'
              : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))'
            : 'none',
        }}
      >
        <defs>
          <linearGradient id="msL1Center" x1="65" y1="42" x2="135" y2="78" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f5d76e" />
            <stop offset="75%" stopColor="#e6b93a" />
            <stop offset="100%" stopColor="#d4a72c" />
          </linearGradient>

          <linearGradient id="msL1Right" x1="100" y1="42" x2="170" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d4a72c" />
            <stop offset="60%" stopColor="#e6b93a" />
            <stop offset="100%" stopColor="#b8901f" />
          </linearGradient>

          <linearGradient id="msL1Left" x1="30" y1="25" x2="100" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f5d76e" />
            <stop offset="50%" stopColor="#e6b93a" />
            <stop offset="100%" stopColor="#b8901f" />
          </linearGradient>

          <linearGradient id="msL1BevelL" x1="30" y1="60" x2="100" y2="107" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8c6d19" />
            <stop offset="100%" stopColor="#b8901f" />
          </linearGradient>

          <linearGradient id="msL1BevelR" x1="100" y1="60" x2="170" y2="107" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d4a72c" />
            <stop offset="100%" stopColor="#e6b93a" />
          </linearGradient>

          <linearGradient id="msL2Grad" x1="30" y1="59" x2="170" y2="129" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e6b93a" stopOpacity="0.88" />
            <stop offset="50%" stopColor="#d4a72c" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#b8901f" stopOpacity="0.82" />
          </linearGradient>

          <linearGradient id="msL2Bevel" x1="30" y1="94" x2="170" y2="141" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8c6d19" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#b8901f" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d4a72c" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="msL3Grad" x1="30" y1="93" x2="170" y2="163" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d4a72c" stopOpacity="0.82" />
            <stop offset="50%" stopColor="#b8901f" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#8c6d19" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="msL3Bevel" x1="30" y1="128" x2="170" y2="175" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6e5412" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#8c6d19" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#b8901f" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="msL4Grad" x1="30" y1="127" x2="170" y2="197" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#b8901f" stopOpacity="0.78" />
            <stop offset="50%" stopColor="#8c6d19" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4a72c" stopOpacity="0.72" />
          </linearGradient>

          <linearGradient id="msL4Bevel" x1="30" y1="162" x2="170" y2="222" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4a370b" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#6e5412" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8c6d19" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="msSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e6b93a" stopOpacity="0" />
            <stop offset="40%" stopColor="#e6b93a" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#f5d76e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f5d76e" stopOpacity="0" />
          </linearGradient>

          <clipPath id="msLogoGlassClip">
            <path d="M 100,25 L 170,60 L 170,174 L 100,222 L 30,174 L 30,60 Z" />
          </clipPath>
        </defs>

        {animated && (
          <g clipPath="url(#msLogoGlassClip)" pointerEvents="none">
            <rect x="-60" y="-60" width="320" height="80" fill="url(#msSweepGrad)" transform="rotate(35 100 120)" />
          </g>
        )}

        <g
          className="transition-transform duration-500 ease-out"
          style={{ transform: isHoverFanning ? 'translateY(8px)' : undefined }}
        >
          <polygon points="30,174 100,209 100,222" fill="#4a370b" opacity="0.9" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
          <polygon points="100,209 170,174 100,222" fill="#6e5412" opacity="0.9" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
          <polygon points="30,162 100,197 100,209 30,174" fill="url(#msL4Bevel)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          <polygon points="100,197 170,162 170,174 100,209" fill="url(#msL4Bevel)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <polygon points="100,127 170,162 100,197 30,162" fill="url(#msL4Grad)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <polygon points="100,144 135,162 100,180 65,162" fill="#e6b93a" fillOpacity="0.2" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
          <line x1="65" y1="162" x2="30" y2="162" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
          <line x1="135" y1="162" x2="170" y2="162" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
          <line x1="100" y1="144" x2="100" y2="127" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
          <line x1="100" y1="180" x2="100" y2="197" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
        </g>
        <g
          className="transition-transform duration-500 ease-out"
          style={{ transform: isHoverFanning ? 'translateY(3px)' : undefined }}
        >
          <polygon points="30,128 100,163 100,175 30,140" fill="url(#msL3Bevel)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          <polygon points="100,163 170,128 170,140 100,175" fill="url(#msL3Bevel)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <polygon points="100,93 170,128 100,163 30,128" fill="url(#msL3Grad)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <polygon points="100,110 135,128 100,146 65,128" fill="#d4a72c" fillOpacity="0.22" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
          <line x1="65" y1="128" x2="30" y2="128" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
          <line x1="135" y1="128" x2="170" y2="128" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
          <line x1="100" y1="110" x2="100" y2="93" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
          <line x1="100" y1="146" x2="100" y2="163" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
        </g>
        <g
          className="transition-transform duration-500 ease-out"
          style={{ transform: isHoverFanning ? 'translateY(-3px)' : undefined }}
        >
          <polygon points="30,94 100,129 100,141 30,106" fill="url(#msL2Bevel)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          <polygon points="100,129 170,94 170,106 100,141" fill="url(#msL2Bevel)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <polygon points="100,59 170,94 100,129 30,94" fill="url(#msL2Grad)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          <polygon points="100,76 135,94 100,112 65,94" fill="#e6b93a" fillOpacity="0.25" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
          <line x1="65" y1="94" x2="30" y2="94" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
          <line x1="135" y1="94" x2="170" y2="94" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
          <line x1="100" y1="76" x2="100" y2="59" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
          <line x1="100" y1="112" x2="100" y2="129" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
        </g>
        <g
          className="transition-transform duration-500 ease-out"
          style={{ transform: isHoverFanning ? 'translateY(-8px)' : undefined }}
        >
          <polygon points="30,60 100,95 100,107 30,72" fill="url(#msL1BevelL)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.9" />
          <polygon points="100,95 170,60 170,72 100,107" fill="url(#msL1BevelR)" stroke="rgba(255,255,255,0.45)" strokeWidth="0.9" />

          <polygon points="100,25 65,60 100,42" fill="url(#msL1Left)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <polygon points="100,25 100,42 135,60" fill="url(#msL1Right)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <polygon points="100,25 135,60 170,60" fill="#fef08a" fillOpacity="0.85" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
          <polygon points="135,60 170,60 100,78" fill="url(#msL1Right)" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
          <polygon points="100,78 170,60 100,95" fill="#e6b93a" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" />
          <polygon points="100,78 100,95 65,60" fill="url(#msL1Left)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" />
          <polygon points="30,60 65,60 100,78" fill="#d4a72c" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
          <polygon points="30,60 100,25 65,60" fill="#f5d76e" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />

          <polygon
            points="100,42 135,60 100,78 65,60"
            fill="url(#msL1Center)"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.2"
            style={{
              filter: isHovered
                ? 'drop-shadow(0 0 4px rgba(227, 194, 120, 0.6))'
                : 'none',
            }}
          />

          <polygon points="100,42 122,60 100,68 88,60" fill="#ffffff" fillOpacity="0.45" />

          <line x1="30" y1="60" x2="100" y2="95" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" />
          <line x1="100" y1="95" x2="170" y2="60" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" />
          <line x1="100" y1="95" x2="100" y2="107" stroke="rgba(255,255,255,0.95)" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
};

const BRAND_SIZES = {
  md: { logo: 36, text: 'text-[1.1875rem]' },
  lg: { logo: 48, text: 'text-2xl' },
};

/** Logo mark plus "MultiStrata AI" wordmark and domain. */
export const MultistrataBrand: React.FC<{ size?: keyof typeof BRAND_SIZES }> = ({ size = 'md' }) => {
  const { logo, text } = BRAND_SIZES[size];

  return (
    <div className="inline-flex items-center gap-3 select-none cursor-pointer group">
      <div className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-px">
        <MultistrataLogo size={logo} glow={false} />
      </div>

      <div className="flex flex-col text-left leading-none">
        <div className={`flex items-baseline gap-1.5 font-display font-semibold tracking-[-0.01em] ${text}`} style={{ fontStretch: '108%' }}>
          <span className="text-ivory">MultiStrata</span>
          <span className="text-gold-bright">AI</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span aria-hidden="true" className="h-[2px] w-2.5 rounded-[1px] bg-gold" />
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-stone">multistrata.dev</span>
        </div>
      </div>
    </div>
  );
};
