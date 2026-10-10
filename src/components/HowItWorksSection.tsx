import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Check, Activity, Sparkles } from 'lucide-react';
import { Band, SectionHeader } from './ui';

const STRATA = [
  {
    icon: Activity,
    numeral: 'I',
    stratum: 'STRATUM I',
    title: 'Sensory Ingestion & Synthesis',
    description:
      'Consumes continuous multi-modal data streams across databases, ERPs, APIs, and emails. Normalizes signals into unified real-time tensors with zero latency.',
    bullets: [
      'Zero-latency webhook & socket streaming',
      'Automated schema drift neutralization',
      'Encrypted on-premise sensory agents',
    ],
  },
  {
    icon: Cpu,
    numeral: 'II',
    stratum: 'STRATUM II',
    title: 'Multi-Agent Swarm Deliberation',
    description:
      'Specialized sub-agents powered by Jarvis debate operational outcomes, evaluate strict compliance constraints, and reach mathematical consensus.',
    bullets: [
      'Formal verification & game-theoretic quorum',
      'Zero hallucination guarantee',
      'Multi-model orchestration redundancy',
    ],
    featured: true,
  },
  {
    icon: Zap,
    numeral: 'III',
    stratum: 'STRATUM III',
    title: 'Atomic Execution & Learning Loops',
    description:
      'Dispatches non-repudiable atomic commands into core systems. Records decision telemetry back to persistent memory to continuously self-optimize.',
    bullets: [
      'Cryptographically signed audit receipts',
      'Instant fail-safe rollback buffers',
      'Recursive reinforcement loop',
    ],
  },
];

const STEP_LABELS = ['STEP 1 • SENSORY', 'STEP 2 • REASONING', 'STEP 3 • EXECUTION'];

const SCENARIOS = [
  {
    title: 'Real-time Treasury Rebalancing',
    input: 'Detected ₱24.5M currency exposure across APAC accounts amidst FX volatility spike.',
    steps: [
      'Sensory Synthesis ingests 14 banking APIs and SWIFT feeds in 12ms. Zero schema drift.',
      'Jarvis Swarm (Liquidity Agent + Risk Guardian) deliberates optimal hedging vector with 99.98% certainty.',
      'Atomic dispatch of multi-leg forward contracts. Capital exposure neutralized in 48ms.',
    ],
    result: 'Net variance 0.00%. Reclaimed ₱1.4M in slippage.',
  },
  {
    title: 'Automated Supply Chain Reroute',
    input: 'Typhoon disruption flagged at Port of Manila impacting 120 critical hardware shipments.',
    steps: [
      'Ingests AIS vessel tracking, customs declarations, and carrier telemetry streams.',
      'Multi-agent consensus evaluates 38 alternative air-freight and overland freight paths.',
      'Auto-generates and digitally seals carrier purchase orders with automated ERP updates.',
    ],
    result: 'Delivery downtime reduced from 6 days to 9 hours.',
  },
  {
    title: 'Autonomous Compliance Audit',
    input: 'Quarterly regulatory tax filing across 4 jurisdictions due with 3,400 transaction records.',
    steps: [
      'Extracts and cryptographically hashes receipts, invoices, and ledger states.',
      'Jarvis Compliance Agent cross-references local tax statutes with zero-hallucination guarantees.',
      'Submits finalized electronic filings with audit-proof zero-knowledge proof receipt.',
    ],
    result: '100% audit pass rate without manual human intervention.',
  },
];

const CHAR_DELAY_MS = 9;
const STEP_PAUSE_MS = 125;
const START_DELAY_MS = 90;

/** Typewriter progress: which step (0-2) is typing, how many chars are shown, and whether all are done. */
interface Progress {
  step: number;
  chars: number;
  done: boolean;
}

export const HowItWorksSection: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const [progress, setProgress] = useState<Progress>({ step: 0, chars: 0, done: false });

  const scenario = SCENARIOS[selectedScenario];

  // Types out step 1, then step 2, then step 3, one character at a time.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let step = 0;
    let chars = 0;
    setProgress({ step, chars, done: false });

    const typeNextChar = () => {
      if (chars < scenario.steps[step].length) {
        chars++;
        setProgress({ step, chars, done: false });
        timer = setTimeout(typeNextChar, CHAR_DELAY_MS);
      } else if (step < scenario.steps.length - 1) {
        step++;
        chars = 0;
        setProgress({ step, chars, done: false });
        timer = setTimeout(typeNextChar, STEP_PAUSE_MS);
      } else {
        setProgress({ step, chars, done: true });
      }
    };

    timer = setTimeout(typeNextChar, START_DELAY_MS);
    return () => clearTimeout(timer);
  }, [scenario, runKey]);

  const handleRunSimulation = (index: number) => {
    if (selectedScenario === index) setRunKey((k) => k + 1);
    else setSelectedScenario(index);
  };

  // Chronograph track: fills across the three steps as they type out.
  const stepLength = scenario.steps[progress.step].length || 1;
  const runFraction = progress.done ? 1 : (progress.step + progress.chars / stepLength) / scenario.steps.length;

  return (
    <Band id="how-it-works" aria-labelledby="how-title">
      <SectionHeader id="how-title" label="TRI-STRATA ARCHITECTURE" title="How Multistrata Operates">
        Three ascending strata seamlessly transform fragmented enterprise chaos into decisive, autonomous execution.
      </SectionHeader>

      {/* The three strata, read as one movement from intake to action */}
      <ol className="mt-16 border-b border-line sm:mt-20">
        {STRATA.map(({ icon: Icon, numeral, stratum, title, description, bullets, featured }) => (
          <li
            key={stratum}
            className={`grid gap-x-10 gap-y-6 border-t py-10 lg:grid-cols-12 lg:py-12 ${
              featured ? 'border-gold/50' : 'border-line'
            }`}
          >
            <div className="order-2 flex items-center gap-4 lg:order-none lg:col-span-3 lg:flex-col lg:items-start lg:gap-4">
              <span
                className={`font-display text-[2rem] font-light leading-none tracking-[-0.02em] lg:text-[clamp(3rem,5vw,4.5rem)] ${
                  featured ? 'text-gold-bright' : 'text-gold'
                }`}
                aria-hidden="true"
              >
                {numeral}
              </span>
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] lg:flex-col lg:items-start lg:gap-y-2">
                <span className="flex items-center gap-2 text-ivory-dim">
                  <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  {stratum}
                </span>
                {featured && (
                  <>
                    <span aria-hidden="true" className="h-3 w-px bg-line-strong lg:hidden" />
                    <span className="text-gold-bright">JARVIS CORE ENGINE</span>
                  </>
                )}
              </span>
            </div>

            <div className="order-1 lg:order-none lg:col-span-5">
              <h3 className="font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.015em] text-ivory">{title}</h3>
              <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ivory-dim">{description}</p>
            </div>

            <ul className="order-3 space-y-2.5 text-[0.875rem] text-ivory-dim lg:order-none lg:col-span-4 lg:pt-1.5">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {/* Interactive simulation console */}
      <div className="mt-20 overflow-hidden rounded-panel bg-dial-900 shadow-[0_1px_0_rgb(242_239_232/0.06)_inset,0_40px_80px_-40px_rgb(0_0_0/0.95)] ring-1 ring-line">
        <div className="flex flex-col gap-6 border-b border-line p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="font-display text-[1.625rem] font-semibold leading-tight tracking-[-0.015em] text-ivory">
              Select an Enterprise Incident to Simulate
            </h3>
            <p className="mt-2 flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-stone">
              <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              Interactive Simulation Environment
            </p>
          </div>

          <div role="group" aria-label="Incident scenarios" className="recess grid w-full grid-cols-1 gap-0.5 rounded-md p-0.5 sm:flex sm:w-fit sm:flex-wrap">
            {SCENARIOS.map((sc, idx) => {
              const selected = selectedScenario === idx;
              return (
                <button
                  key={sc.title}
                  onClick={() => handleRunSimulation(idx)}
                  aria-pressed={selected}
                  className={`rounded-[5px] px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200 ${
                    selected
                      ? 'bg-dial-700 text-gold-pale shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_1px_2px_rgb(0_0_0/0.6)]'
                      : 'text-stone hover:text-ivory'
                  }`}
                >
                  {sc.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
            <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">INCIDENT SIGNAL</span>
            <p className="tabular text-[0.9375rem] leading-relaxed text-ivory">{scenario.input}</p>
          </div>

          {/* Chronograph track across the three steps */}
          <div className="relative mt-10 hidden h-px bg-line md:block" aria-hidden="true">
            <div
              className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-150 ease-linear"
              style={{ width: `${runFraction * 100}%` }}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 md:mt-0 md:grid-cols-3 md:gap-8">
            {scenario.steps.map((text, i) => {
              const typing = !progress.done && progress.step === i;
              const complete = progress.step > i || (progress.done && progress.step === i);
              const shown = progress.step > i ? text : progress.step === i ? text.slice(0, progress.chars) : '';

              return (
                <div key={i} className="relative md:pt-6">
                  <span
                    aria-hidden="true"
                    className={`absolute -top-[5px] left-0 hidden h-[11px] w-[11px] rounded-full ring-2 ring-dial-900 transition-colors duration-300 md:block ${
                      complete ? 'bg-gold' : typing ? 'bg-gold-pale' : 'bg-dial-700'
                    }`}
                  />
                  <div className="mb-2.5 flex items-center justify-between">
                    <span
                      className={`text-[0.6875rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                        typing || complete ? 'text-gold-bright' : 'text-stone'
                      }`}
                    >
                      {STEP_LABELS[i]}
                    </span>
                    {complete && <Check className="h-4 w-4 text-gold" aria-label="Complete" />}
                  </div>
                  <p className="tabular min-h-[4.5rem] text-[0.875rem] leading-relaxed text-ivory-dim">
                    {shown}
                    {typing && (
                      <span aria-hidden="true" className="ml-1 inline-block h-3.5 w-1.5 animate-gold-cursor rounded-[1px] bg-gold-bright align-middle" />
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-stone">
              <span className={`h-2 w-2 rounded-full ${progress.done ? 'bg-gold-bright' : 'bg-dial-700'}`} aria-hidden="true" />
              RESOLVED VERIFIED OUTCOME
            </span>
            <span className="relative font-display text-[1.0625rem] font-semibold text-gold-bright">
              {scenario.result}
              {progress.done && (
                <span
                  key={`${selectedScenario}-${runKey}`}
                  aria-hidden="true"
                  className="animate-value-stamp absolute -bottom-1 left-0 h-px w-full bg-gold-bright"
                />
              )}
            </span>
          </div>
        </div>
      </div>

    </Band>
  );
};
