import React, { useState } from 'react';
import { HolographicReactorCore } from './HolographicReactorCore';
import { PersonalizationState } from '../utils/personalization';
import { playJarvisIntroGreeting, playHolographicChime } from '../utils/speechEngine';
import { ArrowRight, Layers, Volume2 } from 'lucide-react';
import { buttonClass } from './ui';
import { WorkflowShowcase } from './WorkflowShowcase';

const GREETING_LINES = [
  'Welcome to MultiStrata AI, where your operations can be automated.',
  "Ready to put your operations on autopilot? Click the Book a Demo button, and let's start automating your operation together!",
  'Have a question, or just want to explore? Click the Jarvis AI Copilot button, so we can start a conversation right away.',
];

/** The headline is printed on the dial: first half at 9 o'clock, second half at 3 o'clock. */
const HEADLINE = [
  [
    { text: 'Your ', delay: 300, gold: false },
    { text: 'Operations,', delay: 390, gold: false },
  ],
  [
    { text: 'on ', delay: 480, gold: true },
    { text: 'Autopilot.', delay: 570, gold: true },
  ],
];

/** Each KPI is a sub-register: a printed scale, and one applied hand set to the reading. */
const KPIS = [
  { value: '99.98%', label: 'Autonomous Reliability', fraction: 0.9998, scale: ['0', '50', '100'], unit: '%' },
  { value: '₱420M+', label: 'Operational Waste Saved', fraction: 0.84, scale: ['0', '250', '500'], unit: 'MILLIONS' },
  { value: '38ms', label: 'Strata Reasoning Latency', fraction: 0.38, scale: ['0', '50', '100'], unit: 'ms' },
  { value: '100%', label: 'Sovereign Data Privacy', fraction: 1, scale: ['0', '50', '100'], unit: '%' },
];

// Sub-register scale sweeps 300 degrees, from 7 o'clock round to 5 o'clock.
const REGISTER_START = -150;
const REGISTER_SWEEP = 300;
const REGISTER_TICKS = Array.from({ length: 31 }, (_, i) => i);
const regPoint = (r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [50 + r * Math.sin(rad), 50 - r * Math.cos(rad)];
};

const SubRegister: React.FC<{ fraction: number; scale: string[]; unit: string }> = ({ fraction, scale, unit }) => {
  const handAngle = REGISTER_START + REGISTER_SWEEP * fraction;
  const [hx, hy] = regPoint(35, handAngle);
  const [tx, ty] = regPoint(-7, handAngle);
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {REGISTER_TICKS.map((i) => {
        const a = REGISTER_START + (REGISTER_SWEEP / 30) * i;
        const major = i % 15 === 0;
        const mid = i % 5 === 0;
        const [x1, y1] = regPoint(major ? 39 : mid ? 41 : 43, a);
        const [x2, y2] = regPoint(46, a);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={major ? '#c9a24c' : `rgb(242 239 232 / ${mid ? 0.42 : 0.22})`}
            strokeWidth={major ? 1.3 : mid ? 0.9 : 0.6}
          />
        );
      })}
      {scale.map((n, i) => {
        // End numerals sit just inside the end ticks so a hand at 0 or full scale never covers them.
        const [x, y] = regPoint(30, [-128, 0, 128][i]);
        return (
          <text key={n} x={x} y={y + 2.4} textAnchor="middle" fontSize="6.6" fontWeight="600" fill="#c9c4b9" style={{ fontFamily: 'var(--font-sans)' }}>
            {n}
          </text>
        );
      })}
      <text x="50" y="80" textAnchor="middle" fontSize="6" fontWeight="600" letterSpacing="0.6" fill="#9c968a" style={{ fontFamily: 'var(--font-sans)' }}>
        {unit}
      </text>
      <line x1={tx} y1={ty} x2={hx} y2={hy} stroke="url(#registerHand)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3" fill="#c9a24c" />
      <circle cx="50" cy="50" r="1.1" fill="#0b0b0c" />
      <defs>
        <linearGradient id="registerHand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#efdfb0" />
          <stop offset="100%" stopColor="#c9a24c" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Dial geometry in a 520-unit viewBox. The orb covers the inner 58%.
const C = 260;
const HOUR_INDICES = Array.from({ length: 12 }, (_, i) => i).filter((i) => i !== 6); // 6 o'clock carries the speak control
const MINUTE_TICKS = Array.from({ length: 60 }, (_, i) => i).filter((i) => i % 5 !== 0);

const polar = (r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)];
};

/** Printed minute track, applied gold indices, and the chronograph seconds hand. */
const DialFace: React.FC<{ running: boolean }> = ({ running }) => (
  <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="dialIndexGold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8a6d2e" />
        <stop offset="35%" stopColor="#efdfb0" />
        <stop offset="60%" stopColor="#c9a24c" />
        <stop offset="100%" stopColor="#7a5f27" />
      </linearGradient>
    </defs>

    {/* Rehaut and track rings */}
    <circle cx={C} cy={C} r="255" fill="none" stroke="rgb(242 239 232 / 0.16)" strokeWidth="1" />
    <circle cx={C} cy={C} r="244" fill="none" stroke="rgb(242 239 232 / 0.08)" strokeWidth="1" />
    <circle cx={C} cy={C} r="196" fill="none" stroke="rgb(242 239 232 / 0.05)" strokeWidth="1" />

    {/* Minute track */}
    {MINUTE_TICKS.map((m) => {
      const [x1, y1] = polar(232, m * 6);
      const [x2, y2] = polar(244, m * 6);
      return <line key={m} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgb(242 239 232 / 0.32)" strokeWidth="1.1" />;
    })}

    {/* Applied hour indices, with a doubled marker at 12 */}
    {HOUR_INDICES.map((h) => (
      <g key={h} transform={`rotate(${h * 30} ${C} ${C})`}>
        {h === 0 ? (
          <>
            <rect x={C - 8} y={16} width="5" height="30" rx="1" fill="url(#dialIndexGold)" />
            <rect x={C + 3} y={16} width="5" height="30" rx="1" fill="url(#dialIndexGold)" />
          </>
        ) : (
          <rect x={C - 2.5} y={16} width="5" height="30" rx="1" fill="url(#dialIndexGold)" />
        )}
      </g>
    ))}

    {/* Chronograph run: indices light in turn while Jarvis is speaking */}
    {running &&
      HOUR_INDICES.map((h, i) => (
        <g key={`run-${h}`} transform={`rotate(${h * 30} ${C} ${C})`}>
          <rect
            x={h === 0 ? C - 8 : C - 2.5}
            y={16}
            width={h === 0 ? 16 : 5}
            height="30"
            rx="1"
            fill="#fbf3dc"
            className="animate-index-run"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
          />
        </g>
      ))}

    {/* Seconds hand, outside the orb */}
    <g className="animate-seconds">
      <line x1={C} y1={C - 158} x2={C} y2={C - 242} stroke="#e3c278" strokeWidth="1.4" strokeLinecap="round" />
      <rect x={C - 1.75} y={C - 236} width="3.5" height="12" rx="1" fill="#efdfb0" />
    </g>
  </svg>
);

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreTiers: () => void;
  onOpenJarvis: () => void;
  onOpenDemo: () => void;
  personalizedState: PersonalizationState;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onExploreTiers,
  onOpenJarvis,
  onOpenDemo,
  personalizedState,
}) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  // Index of the line currently being spoken; null when Jarvis is silent.
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const voicePlaying = playingIndex !== null;

  const handleTriggerVoice = () => {
    playHolographicChime();

    const index = greetingIndex;
    setPlayingIndex(index);
    setGreetingIndex((index + 1) % GREETING_LINES.length);

    const stop = () => setPlayingIndex(null);
    // onStart re-asserts the index, since cancelling a previous line fires its onEnd/onError late.
    const started = playJarvisIntroGreeting(GREETING_LINES[index], {
      onStart: () => setPlayingIndex(index),
      onEnd: stop,
      onError: stop,
    });
    if (!started) stop();
  };

  const handlePrimaryClick = personalizedState.primaryCtaAction === 'demo' ? onOpenDemo : onGetStarted;

  const headlineHalf = (line: (typeof HEADLINE)[number], align: string) => (
    <p
      aria-hidden="true"
      className={`font-display font-semibold leading-[1.02] tracking-[-0.035em] whitespace-nowrap text-[clamp(2.375rem,3.3vw,3.25rem)] ${align}`}
      style={{ fontStretch: '88%' }}
    >
      {line.map((word, i) => (
        <React.Fragment key={word.text}>
          {i > 0 && ' '}
          <span className="hero-word-mask">
            <span
              className={`hero-word-inner animate-hero-reveal ${word.gold ? 'text-gold-bright' : 'text-ivory'}`}
              style={{ animationDelay: `${word.delay}ms` }}
            >
              {word.text.trim()}
            </span>
          </span>
        </React.Fragment>
      ))}
    </p>
  );

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden">
      <h1 id="hero-title" className="sr-only">
        Your Operations, on Autopilot.
      </h1>

      {/* First viewport: the dial */}
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1560px] flex-col items-center justify-center px-5 pb-14 pt-24 sm:px-10 xl:pt-28">
        <div className="flex w-full flex-col items-center xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center xl:gap-x-10">
          <div className="order-2 mt-8 text-center xl:order-1 xl:mt-0 xl:text-right">{headlineHalf(HEADLINE[0], '')}</div>

          {/* Dial plate with the orb at its centre */}
          <div className="dial-size relative order-1 aspect-square xl:order-2">
            <div className="sunray absolute inset-0 rounded-full shadow-[0_0_0_1px_rgb(242_239_232/0.06),0_30px_80px_-30px_rgb(0_0_0/0.9),inset_0_2px_6px_rgb(0_0_0/0.6)]" />
            <DialFace running={voicePlaying} />

            <div className="absolute inset-[21%]">
              <HolographicReactorCore
                isIgniting={voicePlaying}
                onInteraction={handleTriggerVoice}
                className="h-full w-full"
              />
            </div>

            {/* Speak control, printed at 6 o'clock */}
            <div className="absolute inset-x-0 bottom-[7.5%] flex justify-center">
              <button
                onClick={handleTriggerVoice}
                title={`Click to make Jarvis speak (playing line ${greetingIndex + 1} of 3 next)`}
                aria-live="polite"
                className={`group inline-flex h-8 max-w-[78%] items-center gap-2 rounded-full px-3.5 text-[0.75rem] font-medium tracking-[0.01em] transition-colors duration-300 ${
                  voicePlaying
                    ? 'bg-dial-800 text-gold-pale ring-1 ring-gold/70'
                    : 'bg-dial-950/85 text-ivory-dim ring-1 ring-line-strong hover:text-gold-pale hover:ring-gold/60'
                }`}
              >
                <Volume2 className={`h-3.5 w-3.5 shrink-0 ${voicePlaying ? 'text-gold-bright' : 'text-gold'}`} />
                <span className="truncate">
                  {voicePlaying ? `Jarvis speaking (Line ${playingIndex + 1}/3)` : 'Click to make Jarvis speak'}
                </span>
                <span className="ml-0.5 flex shrink-0 items-center gap-1" aria-hidden="true">
                  {GREETING_LINES.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                        playingIndex === idx
                          ? 'bg-gold-pale'
                          : greetingIndex === idx && !voicePlaying
                          ? 'bg-gold'
                          : 'bg-ivory/20'
                      }`}
                    />
                  ))}
                </span>
              </button>
            </div>
          </div>

          <div className="order-3 text-center xl:text-left">{headlineHalf(HEADLINE[1], '')}</div>
        </div>

        <p className="mt-7 max-w-[36rem] text-center text-[1.0625rem] leading-relaxed text-ivory-dim sm:text-lg xl:mt-9">
          {personalizedState.subheadline}
        </p>

        <div id="hero-actions" className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <button onClick={handlePrimaryClick} className={buttonClass('primary', 'lg', 'group w-full sm:w-auto')}>
            <span>{personalizedState.primaryCtaText}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <button onClick={onExploreTiers} className={buttonClass('secondary', 'lg', 'w-full sm:w-auto')}>
            <Layers className="h-4 w-4 text-gold" />
            <span>{personalizedState.secondaryCtaText}</span>
          </button>
        </div>
      </div>

      {/* Sample workflows: the mechanism, shown between everyday business apps */}
      <div className="pb-4 pt-6 sm:pt-10">
        <WorkflowShowcase onOpenJarvis={onOpenJarvis} />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        {/* KPI sub-registers */}
        <dl className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="flex flex-col items-center text-center">
              <div className="recess relative aspect-square w-[min(9rem,36vw)] rounded-full" aria-hidden="true">
                <SubRegister fraction={kpi.fraction} scale={kpi.scale} unit={kpi.unit} />
              </div>
              <dt className="dial-print order-3 mt-2.5 max-w-[12rem] leading-snug">{kpi.label}</dt>
              <dd
                className="tabular order-2 mt-5 font-display text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold leading-none tracking-[-0.02em] text-ivory"
                style={{ fontStretch: '90%' }}
              >
                {kpi.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="dial-print pb-24 pt-10 text-center sm:pb-32">Illustrative figures, pending launch data</p>
      </div>
    </section>
  );
};
