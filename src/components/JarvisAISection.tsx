import React, { useState } from 'react';
import { HolographicReactorCore } from './HolographicReactorCore';
import { Bot, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Band, buttonClass } from './ui';

const CAPABILITIES = [
  {
    title: 'Autonomous Process Remediation',
    desc: 'When an edge anomaly or transactional deadlock occurs, Jarvis isolates faulty pipeline branches, computes mathematically sound workarounds, and executes remediation without waiting for human intervention.',
    tag: '0ms Human Latency',
    prompt: 'How does Jarvis autonomously remediate transaction deadlocks in real-time?',
  },
  {
    title: 'Cross-Departmental Telemetry Fusion',
    desc: 'Synthesizes real-time signals across ERP, Salesforce, GitHub, SWIFT, and AWS CloudWatch into unified situational awareness with predictive cascade prevention.',
    tag: 'Multi-Modal Strata',
    prompt: 'Explain how Jarvis fuses ERP, SWIFT, and cloud infrastructure telemetry.',
  },
  {
    title: 'Self-Optimizing Recursive Loops',
    desc: 'Every successful workflow execution refines Jarvis’s internal heuristic weights, driving compound efficiency improvements and slashing token and computational overhead over time.',
    tag: 'Compound +34% MoM',
    prompt: 'How do self-optimizing recursive loops reduce enterprise operational costs?',
  },
  {
    title: 'Cryptographic Audit & Zero Hallucination',
    desc: 'Strict formal verification guarantees that every step Jarvis proposes is cryptographically signed, compliant with internal policy boundaries, and 100% reproducible.',
    tag: 'SOC-2 Type II Certified',
    prompt: 'What formal verification guarantees does Jarvis provide against LLM hallucinations?',
  },
];

interface JarvisAISectionProps {
  onOpenJarvisWithPrompt: (prompt: string) => void;
}

const BEZEL_TICKS = Array.from({ length: 60 }, (_, i) => i);

/** The second orb, mounted as an instrument with its label printed along the bezel. */
const JarvisInstrument: React.FC = () => (
  <div className="mx-auto w-full max-w-[25rem]">
    <div className="relative aspect-square w-full">
      <div className="sunray absolute inset-0 rounded-full shadow-[0_0_0_1px_rgb(242_239_232/0.06),0_30px_70px_-30px_rgb(0_0_0/0.95),inset_0_2px_6px_rgb(0_0_0/0.6)]" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="jarvisBezelArc" d="M 46,200 A 154,154 0 0,1 354,200" />
        </defs>
        <circle cx="200" cy="200" r="196" fill="none" stroke="rgb(242 239 232 / 0.14)" />
        {BEZEL_TICKS.map((i) => {
          const a = ((i * 6 - 90) * Math.PI) / 180;
          const major = i % 5 === 0;
          const r1 = major ? 176 : 182;
          return (
            <line
              key={i}
              x1={200 + r1 * Math.cos(a)}
              y1={200 + r1 * Math.sin(a)}
              x2={200 + 190 * Math.cos(a)}
              y2={200 + 190 * Math.sin(a)}
              stroke={major ? '#c9a24c' : 'rgb(242 239 232 / 0.28)'}
              strokeWidth={major ? 2 : 1}
            />
          );
        })}
        <text fill="#9c968a" fontSize="10.5" fontWeight="600" letterSpacing="3.2" style={{ fontFamily: 'var(--font-sans)' }}>
          <textPath href="#jarvisBezelArc" startOffset="50%" textAnchor="middle">
            EXECUTIVE COGNITIVE COPILOT
          </textPath>
        </text>
      </svg>
      <div className="pointer-events-none absolute inset-[16%] rounded-full border border-dashed border-gold/25 animate-slow-spin" />
      <div className="pointer-events-none absolute inset-[20%] rounded-full border border-gold-deep/40 animate-reverse-spin" />
      <div className="absolute inset-[25%]">
        <HolographicReactorCore className="h-full w-full" />
      </div>
    </div>

    <div className="mt-7 space-y-1.5 text-center">
      <p className="flex items-center justify-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" aria-hidden="true" />
        JARVIS COGNITIVE CORE • ACTIVE
      </p>
      <p className="text-[0.75rem] text-stone">Multi-Strata Engine • v3.4.1 Sovereign</p>
    </div>

    <div className="mx-auto mt-5 flex w-fit items-stretch divide-x divide-line rounded-md ring-1 ring-line">
      <span className="tabular px-4 py-2 text-[0.75rem] text-ivory-dim">Consensus: 100%</span>
      <span className="tabular px-4 py-2 text-[0.75rem] text-ivory-dim">Latency: 18ms</span>
    </div>
  </div>
);

export const JarvisAISection: React.FC<JarvisAISectionProps> = ({ onOpenJarvisWithPrompt }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <Band aria-labelledby="jarvis-title">
      <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <h2
            id="jarvis-title"
            className="font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.04] text-ivory"
            style={{ fontStretch: '92%' }}
          >
            Jarvis AI: Autonomous Orchestration
          </h2>
          <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ivory-dim">
            Jarvis AI is Multistrata's executive autonomous copilot. From synthesizing cross-departmental telemetry to
            triggering multi-step remediation workflows, Jarvis operates without latency or human fatigue.
          </p>

          <ul className="mt-10 border-t border-line" aria-label="Jarvis capabilities">
            {CAPABILITIES.map((cap, idx) => {
              const isSelected = activeFeature === idx;
              return (
                <li key={cap.title} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActiveFeature(idx)}
                    aria-pressed={isSelected}
                    className="group grid w-full grid-cols-[1.25rem_1fr] gap-x-3 py-5 text-left"
                  >
                    <CheckCircle2
                      className={`mt-0.5 h-5 w-5 transition-colors duration-300 ${
                        isSelected ? 'text-gold-bright' : 'text-stone/60 group-hover:text-gold'
                      }`}
                    />
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
                      <span
                        className={`font-display text-[1.0625rem] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                          isSelected ? 'text-ivory' : 'text-ivory-dim group-hover:text-ivory'
                        }`}
                      >
                        {cap.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        {isSelected && (
                          <span className="flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" aria-hidden="true" />
                            ACTIVE
                          </span>
                        )}
                        <span
                          className={`text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                            isSelected ? 'text-gold' : 'text-stone'
                          }`}
                        >
                          {cap.tag}
                        </span>
                      </span>
                    </span>
                    <span
                      className={`col-start-2 mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed transition-colors duration-300 ${
                        isSelected ? 'text-ivory-dim' : 'text-stone'
                      }`}
                    >
                      {cap.desc}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button
              onClick={() => onOpenJarvisWithPrompt(CAPABILITIES[activeFeature].prompt)}
              className={buttonClass('primary', 'md', 'group')}
            >
              <Bot className="h-4 w-4" />
              <span>Test this with Jarvis Live</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <span className="flex items-center gap-1.5 text-[0.8125rem] text-stone">
              <Zap className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              Instant interactive simulated response
            </span>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <JarvisInstrument />
        </div>
      </div>
    </Band>
  );
};
