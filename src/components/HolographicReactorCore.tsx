import React, { useEffect, useRef, useState } from 'react';

interface HolographicReactorCoreProps {
  className?: string;
  interactive?: boolean;
  isIgniting?: boolean;
  onInteraction?: () => void;
}

const SPECTRUM_BARS = Array.from({ length: 72 }, (_, i) => {
  const angle = (i / 72) * 360;
  const rad = (angle * Math.PI) / 180;

  return {
    angle,
    cos: Math.cos(rad),
    sin: Math.sin(rad),
    baseHeight: Math.max(3, 10 + Math.sin(rad * 3) * 6 + Math.cos(rad * 1.5 + 0.5) * 7 + Math.sin(rad * 7) * 4),
    speed: 1.2 + Math.sin(i * 0.4) * 0.8,
    phase: i * 0.25,
  };
});

/** Animated gold "reactor" with a live audio-spectrum ring; the dial's centrepiece. */
export const HolographicReactorCore: React.FC<HolographicReactorCoreProps> = ({
  className = '',
  interactive = true,
  isIgniting = false,
  onInteraction,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const spectrumRef = useRef<SVGGElement | null>(null);

  // Animate the spectrum bars imperatively; only while on screen, tab visible and motion allowed.
  useEffect(() => {
    const group = spectrumRef.current;
    if (!group) return;
    const lines = group.querySelectorAll('line');

    let frame = 0;
    let inView = false;
    const startTime = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const amplitude = isIgniting ? 7 : 3.5;
    const speedFactor = isIgniting ? 2.4 : 1;
    const heightScale = isIgniting ? 1.3 : 1;

    const draw = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      SPECTRUM_BARS.forEach((bar, i) => {
        const oscillation = Math.sin(elapsed * bar.speed * speedFactor + bar.phase) * amplitude;
        const radius = 44 + Math.max(3, bar.baseHeight * heightScale + oscillation);
        lines[i].setAttribute('x2', String(120 + radius * bar.cos));
        lines[i].setAttribute('y2', String(120 + radius * bar.sin));
      });
    };

    const tick = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      const shouldRun = inView && document.visibilityState === 'visible' && !reducedMotion.matches;
      if (shouldRun && !frame) frame = requestAnimationFrame(tick);
      if (!shouldRun && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });

    draw(startTime);
    observer.observe(group);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
    };
  }, [isIgniting]);

  return (
    <div
      onPointerDown={(e) => {
        if (e.button === 0) onInteraction?.();
      }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      className={`relative aspect-square flex items-center justify-center select-none group cursor-pointer transition-transform duration-500 ease-out-expo ${
        isIgniting ? 'scale-[1.06]' : isHovered ? 'scale-[1.03]' : 'scale-100'
      } ${className}`}
    >
      {/* Single soft halo: the orb is the only object on the page allowed to emit light */}
      <div
        className="absolute inset-[6%] rounded-full pointer-events-none transition-[filter] duration-700 animate-core-tight-glow"
        style={{
          background: isIgniting
            ? 'radial-gradient(circle, rgba(239,223,176,0.42) 0%, rgba(201,162,76,0.2) 45%, transparent 72%)'
            : isHovered
            ? 'radial-gradient(circle, rgba(227,194,120,0.26) 0%, rgba(201,162,76,0.1) 48%, transparent 72%)'
            : 'radial-gradient(circle, rgba(227,194,120,0.18) 0%, rgba(201,162,76,0.07) 48%, transparent 72%)',
          filter: isIgniting ? 'blur(18px)' : 'blur(14px)',
        }}
      />

      {/* Centre jewel */}
      <div
        className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full pointer-events-none z-20 animate-center-dot-pulse bg-[#fbf3dc]"
        style={{
          boxShadow: isIgniting
            ? '0 0 6px 2px rgba(251,243,220,0.9), 0 0 18px 6px rgba(227,194,120,0.55)'
            : '0 0 4px 1px rgba(251,243,220,0.8), 0 0 12px 4px rgba(201,162,76,0.35)',
        }}
      />

      {/* Reactor linework in applied-gold tones */}
      <svg
        viewBox="0 0 240 240"
        shapeRendering="geometricPrecision"
        aria-hidden="true"
        className={`w-full h-full relative z-10 overflow-visible ${isIgniting ? 'animate-ignition' : ''}`}
        style={{
          filter: 'drop-shadow(0 0 1.5px rgba(227,194,120,0.35))',
          transform: isIgniting ? 'scale(1.04)' : isHovered ? 'scale(1.015)' : 'scale(1)',
          transformOrigin: '120px 120px',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <defs>
          <linearGradient id="goldCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbf3dc" stopOpacity="1" />
            <stop offset="45%" stopColor="#e3c278" stopOpacity="1" />
            <stop offset="100%" stopColor="#c9a24c" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="goldSecondaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#efdfb0" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#c9a24c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8a6d2e" stopOpacity="0.45" />
          </linearGradient>

          <radialGradient id="goldCenterCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e3c278" stopOpacity="0.85" />
            <stop offset="32%" stopColor="#c9a24c" stopOpacity="0.4" />
            <stop offset="68%" stopColor="#151515" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#0b0b0c" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* 1. EXTENDED VERTICAL NEEDLE TICKS */}
        <g stroke="#c9a24c" strokeWidth="2" strokeLinecap="round">
          <line x1="120" y1="6" x2="120" y2="28" />
          <line x1="117" y1="12" x2="123" y2="12" strokeWidth="1.2" opacity="0.9" stroke="#f2efe8" />
          <line x1="120" y1="212" x2="120" y2="234" />
          <line x1="117" y1="228" x2="123" y2="228" strokeWidth="1.2" opacity="0.9" stroke="#f2efe8" />
          <line x1="14" y1="120" x2="24" y2="120" strokeWidth="1.5" stroke="#b08d42" opacity="0.9" />
          <line x1="216" y1="120" x2="226" y2="120" strokeWidth="1.5" stroke="#b08d42" opacity="0.9" />
        </g>

        {/* 2. OUTER CONCENTRIC RING & TICK RIM */}
        <g
          className="animate-spin"
          style={{
            transformOrigin: '120px 120px',
            animationDuration: isIgniting ? '6s' : isHovered ? '16s' : '32s',
          }}
        >
          <circle cx="120" cy="120" r="98" fill="none" stroke="#c9a24c" strokeWidth="1.6" strokeDasharray="45 10 30 8 18 12 60 15" />
          <circle cx="120" cy="120" r="94" fill="none" stroke="#8a6d2e" strokeWidth="1" strokeDasharray="4 6" />

          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const major = i % 3 === 0;
            const rIn = major ? 91 : 94;
            return (
              <line
                key={`outer-tick-${i}`}
                x1={120 + rIn * Math.cos(angle)}
                y1={120 + rIn * Math.sin(angle)}
                x2={120 + 97 * Math.cos(angle)}
                y2={120 + 97 * Math.sin(angle)}
                stroke={major ? '#e3c278' : '#b08d42'}
                strokeWidth={major ? 1.4 : 0.8}
                opacity={major ? 1 : 0.6}
              />
            );
          })}

          <polygon points="54,54 50,62 58,62" fill="#e3c278" transform="rotate(45, 54, 58)" />
          <polygon points="186,186 182,194 190,194" fill="#b08d42" transform="rotate(225, 186, 190)" />
        </g>

        {/* 3. MIDDLE SEGMENTED GAUGE ARCS */}
        <g
          className="animate-reverse-spin"
          style={{
            transformOrigin: '120px 120px',
            animationDuration: isIgniting ? '4s' : isHovered ? '12s' : '22s',
          }}
        >
          <path d="M 120,40 A 80,80 0 0,1 195,95" fill="none" stroke="#b08d42" strokeWidth="5" strokeDasharray="16 6 24 8 10 6" />

          {Array.from({ length: 12 }).map((_, i) => {
            const rad = ((5 + i * 7) * Math.PI) / 180;
            return (
              <line
                key={`ladder-${i}`}
                x1={120 + 74 * Math.cos(rad)}
                y1={120 + 74 * Math.sin(rad)}
                x2={120 + 86 * Math.cos(rad)}
                y2={120 + 86 * Math.sin(rad)}
                stroke="#c9a24c"
                strokeWidth="1.6"
                opacity="0.9"
              />
            );
          })}

          <path d="M 190,135 A 76,76 0 0,1 145,193" fill="none" stroke="url(#goldSecondaryGrad)" strokeWidth="8" strokeLinecap="round" />
          <path d="M 186,138 A 72,72 0 0,1 148,189" fill="none" stroke="#f2efe8" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.85" />
          <path d="M 52,95 A 78,78 0 0,1 100,44" fill="none" stroke="#c9a24c" strokeWidth="2.2" strokeDasharray="12 8 30 10" opacity="0.9" />
          <polygon points="70,68 64,76 76,76" fill="#b08d42" transform="rotate(-40, 70, 72)" />
        </g>

        {/* 4. RADIAL AUDIO FREQUENCY SPECTRUM RING */}
        <g
          ref={spectrumRef}
          style={{
            transformOrigin: '120px 120px',
            animation: isIgniting ? 'spin 18s linear infinite' : 'spin 45s linear infinite',
          }}
        >
          {SPECTRUM_BARS.map((bar, i) => {
            // Initial geometry; x2/y2 are then animated by the effect above.
            const rOuter = 44 + bar.baseHeight * (isIgniting ? 1.3 : 1);
            const isLeftHemisphere = bar.angle > 90 && bar.angle < 270;
            return (
              <line
                key={`eq-bar-${i}`}
                x1={120 + 44 * bar.cos}
                y1={120 + 44 * bar.sin}
                x2={120 + rOuter * bar.cos}
                y2={120 + rOuter * bar.sin}
                stroke={isIgniting ? '#fbf3dc' : isLeftHemisphere ? '#e3c278' : '#c9a24c'}
                strokeWidth={isIgniting ? 1.5 : isLeftHemisphere ? 1.25 : 1}
                strokeLinecap="round"
                opacity={isIgniting ? 1 : isLeftHemisphere ? 0.95 : 0.7}
              />
            );
          })}
        </g>

        {/* 5. INNER ROTATING RETICLE */}
        <g
          className="animate-spin"
          style={{
            transformOrigin: '120px 120px',
            animationDuration: isIgniting ? '3s' : isHovered ? '8s' : '15s',
          }}
        >
          <circle cx="120" cy="120" r="44" fill="none" stroke="#c9a24c" strokeWidth="1.6" />
          <path d="M 120,76 A 44,44 0 0,1 164,120 L 158,120 A 38,38 0 0,0 120,82 Z" fill="#b08d42" opacity="0.7" />
          {Array.from({ length: 8 }).map((_, i) => {
            const rad = (i * 45 * Math.PI) / 180;
            return <circle key={`inner-dot-${i}`} cx={120 + 44 * Math.cos(rad)} cy={120 + 44 * Math.sin(rad)} r="1.2" fill="#e3c278" />;
          })}
        </g>

        {/* 6. INNER APERTURE */}
        <circle cx="120" cy="120" r="38" fill="url(#goldCenterCoreGrad)" stroke="#c9a24c" strokeWidth="2" />
        <circle cx="120" cy="120" r="34" fill="none" stroke="#8a6d2e" strokeWidth="1" strokeDasharray="18 10 32 8" />

        <g stroke="#c9a24c" strokeWidth="0.8" opacity="0.8">
          <line x1="120" y1="108" x2="120" y2="114" />
          <line x1="120" y1="126" x2="120" y2="132" />
          <line x1="108" y1="120" x2="114" y2="120" />
          <line x1="126" y1="120" x2="132" y2="120" />
        </g>

        {/* 7. RADAR SWEEP BEAM */}
        <g
          className="animate-spin"
          style={{
            transformOrigin: '120px 120px',
            animationDuration: isIgniting ? '1.5s' : isHovered ? '4s' : '7s',
          }}
        >
          <line x1="120" y1="120" x2="120" y2="22" stroke="url(#goldCoreGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
        </g>
      </svg>

      {interactive && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
          <span className="block whitespace-nowrap rounded-sm bg-dial-950/90 px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-gold-bright ring-1 ring-gold/30">
            STRATA CORE ACTIVE • 60 FPS
          </span>
        </div>
      )}
    </div>
  );
};
