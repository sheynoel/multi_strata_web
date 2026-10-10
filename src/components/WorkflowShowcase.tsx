import React, { useEffect, useRef, useState } from 'react';
import { siGmail, siGooglesheets, siGooglecalendar, siGoogleforms, siMessenger } from 'simple-icons';
import { ArrowRight, Check, Pause, Play } from 'lucide-react';
import { SectionHeader } from './ui';
import { playCardActivationSound } from '../utils/speechEngine';

// Every app here has a free, official API a small business can connect today.
type AppId = 'gmail' | 'sheets' | 'calendar' | 'forms' | 'messenger';

const APPS: Record<AppId, { name: string; path: string }> = {
  gmail: { name: 'Gmail', path: siGmail.path },
  sheets: { name: 'Google Sheets', path: siGooglesheets.path },
  calendar: { name: 'Google Calendar', path: siGooglecalendar.path },
  forms: { name: 'Google Forms', path: siGoogleforms.path },
  messenger: { name: 'Messenger', path: siMessenger.path },
};

interface Flow {
  tab: string;
  trigger: { app: AppId; note: string };
  actions: { app: AppId; note: string }[];
  /** Narration, one line per beat: trigger, Jarvis, three actions, outcome. */
  steps: string[];
}

/** Illustrative flows for a small business; not a list of confirmed integrations. */
const FLOWS: Flow[] = [
  {
    tab: 'New inquiries',
    trigger: { app: 'forms', note: 'Website form' },
    actions: [
      { app: 'sheets', note: 'Lead logged' },
      { app: 'gmail', note: 'Reply sent' },
      { app: 'calendar', note: 'Invite sent' },
    ],
    steps: [
      'A potential customer fills in the inquiry form on your website.',
      'Jarvis reads what they need and checks it against your price list.',
      'Adds them to your Leads sheet with the date and where they came from.',
      'Replies from your Gmail within minutes, with the right prices.',
      'Books the call, and Google Calendar sends them the invitation.',
      'A new lead, answered and booked while you were busy.',
    ],
  },
  {
    tab: 'Messenger orders',
    trigger: { app: 'messenger', note: 'Page message' },
    actions: [
      { app: 'sheets', note: 'Order logged' },
      { app: 'messenger', note: 'Order confirmed' },
      { app: 'gmail', note: 'Packing list sent' },
    ],
    steps: [
      'A customer messages your Facebook Page to order three bags of coffee.',
      'Jarvis reads the order and checks stock in your Inventory sheet.',
      'Logs the order and lowers the stock count in Google Sheets.',
      'Replies on Messenger with the total and your GCash payment details.',
      'Emails the day’s packing list to your staff.',
      'Order confirmed in minutes, even at 11 pm.',
    ],
  },
  {
    tab: 'Unpaid invoices',
    trigger: { app: 'sheets', note: 'Invoice overdue' },
    actions: [
      { app: 'gmail', note: 'Reminder sent' },
      { app: 'calendar', note: 'Follow-up set' },
      { app: 'sheets', note: 'Status updated' },
    ],
    steps: [
      'Your Invoices sheet shows one that is seven days past due.',
      'Jarvis checks the customer’s payment history and terms.',
      'Sends a polite reminder from your Gmail, in your tone.',
      'Puts a follow-up on your calendar in case it’s still unpaid by Friday.',
      'Marks the invoice “Reminder sent” in your sheet.',
      'You get paid without chasing anyone.',
    ],
  },
  {
    tab: 'Ask your numbers',
    trigger: { app: 'gmail', note: 'Your question' },
    actions: [
      { app: 'sheets', note: 'Sales read' },
      { app: 'calendar', note: 'Week checked' },
      { app: 'gmail', note: 'Answer sent' },
    ],
    steps: [
      'You email Jarvis: “How did we do this week?”',
      'Jarvis works out which records answer that question.',
      'Reads this week’s sales and expenses from your Google Sheets.',
      'Checks your calendar for next week’s deliveries and calls.',
      'Replies with your revenue, best-selling item, and who still owes you.',
      'Your week in one email, without opening a spreadsheet.',
    ],
  },
];

// How long each beat holds before the next one; the last beat is the pause before the loop.
const BEAT_MS = [1400, 1900, 1500, 1500, 1500, 3000];
const LAST_STEP = BEAT_MS.length - 1;

interface Point {
  x: number;
  y: number;
}

interface Layout {
  viewBox: string;
  trigger: Point;
  jarvis: Point;
  actions: Point[];
  /** Edge paths: trigger to Jarvis, then Jarvis to each action. */
  edges: string[];
  labelBelow: boolean;
}

const WIDE: Layout = {
  viewBox: '0 0 760 330',
  trigger: { x: 92, y: 150 },
  jarvis: { x: 340, y: 150 },
  actions: [
    { x: 592, y: 50 },
    { x: 592, y: 150 },
    { x: 592, y: 250 },
  ],
  edges: [
    'M 126 150 L 290 150',
    'M 390 150 C 470 150 480 50 558 50',
    'M 390 150 L 558 150',
    'M 390 150 C 470 150 480 250 558 250',
  ],
  labelBelow: false,
};

const NARROW: Layout = {
  viewBox: '0 0 340 500',
  trigger: { x: 170, y: 40 },
  jarvis: { x: 170, y: 196 },
  actions: [
    { x: 58, y: 390 },
    { x: 170, y: 390 },
    { x: 282, y: 390 },
  ],
  // Wires start below each label so no text sits on a line.
  edges: [
    'M 170 124 L 170 142',
    'M 170 282 C 170 322 58 318 58 354',
    'M 170 282 L 170 354',
    'M 170 282 C 170 322 282 318 282 354',
  ],
  labelBelow: true,
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

const AppNode: React.FC<{ at: Point; app: AppId; note: string; lit: boolean; labelBelow: boolean }> = ({
  at,
  app,
  note,
  lit,
  labelBelow,
}) => {
  const { name, path } = APPS[app];
  const labelX = labelBelow ? at.x : at.x + 46;
  const labelY = labelBelow ? at.y + 52 : at.y - 3;
  const anchor = labelBelow ? 'middle' : 'start';
  return (
    <g>
      <circle
        cx={at.x}
        cy={at.y}
        r="32"
        className="transition-[fill,stroke] duration-500"
        fill={lit ? '#1b1a19' : '#111112'}
        stroke={lit ? '#c9a24c' : 'rgb(242 239 232 / 0.17)'}
        strokeWidth={lit ? 1.5 : 1}
      />
      <g transform={`translate(${at.x - 11} ${at.y - 11}) scale(${22 / 24})`}>
        <path d={path} className="transition-[fill] duration-500" fill={lit ? '#efdfb0' : '#9c968a'} />
      </g>
      <text x={labelX} y={labelY} textAnchor={anchor} fontSize="12.5" fontWeight="600" fill={lit ? '#f2efe8' : '#c9c4b9'} className="transition-[fill] duration-500" style={{ fontFamily: 'var(--font-sans)' }}>
        {name}
      </text>
      <text x={labelX} y={labelY + 16} textAnchor={anchor} fontSize="11" fill={lit ? '#e3c278' : '#9c968a'} className="transition-[fill] duration-500" style={{ fontFamily: 'var(--font-sans)' }}>
        {note}
      </text>
    </g>
  );
};

/** Jarvis as a small instrument: printed ticks, four applied indices, and a hand that sweeps while it works. */
const JarvisNode: React.FC<{ at: Point; lit: boolean; thinking: boolean; labelBelow: boolean }> = ({ at, lit, thinking, labelBelow }) => (
  <g>
    <circle cx={at.x} cy={at.y} r="50" fill="#111112" stroke={lit ? '#c9a24c' : 'rgb(242 239 232 / 0.17)'} strokeWidth="1.2" className="transition-[stroke] duration-500" />
    {Array.from({ length: 24 }, (_, i) => {
      const a = (i * 15 * Math.PI) / 180;
      const major = i % 6 === 0;
      return (
        <line
          key={i}
          x1={at.x + (major ? 38 : 42) * Math.sin(a)}
          y1={at.y - (major ? 38 : 42) * Math.cos(a)}
          x2={at.x + 46 * Math.sin(a)}
          y2={at.y - 46 * Math.cos(a)}
          stroke={major ? '#c9a24c' : 'rgb(242 239 232 / 0.25)'}
          strokeWidth={major ? 2 : 0.8}
        />
      );
    })}
    <circle cx={at.x} cy={at.y} r="15" fill="url(#wfCore)" />
    <g
      className={thinking ? 'animate-spin' : ''}
      style={{ transformOrigin: `${at.x}px ${at.y}px`, animationDuration: '1.1s' }}
    >
      <line x1={at.x} y1={at.y} x2={at.x} y2={at.y - 34} stroke="#e3c278" strokeWidth="1.4" strokeLinecap="round" opacity={lit ? 1 : 0.5} />
    </g>
    <circle cx={at.x} cy={at.y} r="2.4" fill="#fbf3dc" />
    <text
      x={at.x}
      y={labelBelow ? at.y + 70 : at.y + 72}
      textAnchor="middle"
      fontSize="12.5"
      fontWeight="600"
      fill={lit ? '#f2efe8' : '#c9c4b9'}
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      Jarvis
    </text>
  </g>
);

interface WorkflowShowcaseProps {
  onOpenJarvis: () => void;
}

export const WorkflowShowcase: React.FC<WorkflowShowcaseProps> = ({ onOpenJarvis }) => {
  const wide = useMediaQuery('(min-width: 768px)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const layout = wide ? WIDE : NARROW;

  const [flowIndex, setFlowIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const flow = FLOWS[flowIndex];

  // Reduced motion: show the finished flow and wait for the visitor to press play.
  useEffect(() => {
    if (reducedMotion) {
      setPlaying(false);
      setStep(LAST_STEP);
    }
  }, [reducedMotion]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const timer = setTimeout(() => setStep((s) => (s >= LAST_STEP ? 0 : s + 1)), BEAT_MS[step]);
    return () => clearTimeout(timer);
  }, [step, playing, inView]);

  const selectFlow = (index: number) => {
    playCardActivationSound();
    setFlowIndex(index);
    setStep(0);
    if (!reducedMotion) setPlaying(true);
  };

  // Which nodes and edges are live at this beat.
  const triggerLit = step >= 0;
  const jarvisLit = step >= 1;
  const actionLit = (i: number) => step >= i + 2;
  const edgeDone = (e: number) => step >= e + 1;
  const edgeActive = (e: number) => step === e + 1;

  return (
    <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8">
      <SectionHeader id="workflow-title" label="SAMPLE WORKFLOWS" title="Watch the busywork run itself">
        A sample of what Jarvis does between the apps your business already uses. Nobody copies, pastes or chases.
      </SectionHeader>

      <div
        ref={stageRef}
        role="region"
        aria-labelledby="workflow-title"
        className="mt-12 overflow-hidden rounded-panel bg-dial-900 shadow-[0_1px_0_rgb(242_239_232/0.06)_inset,0_40px_80px_-40px_rgb(0_0_0/0.95)] ring-1 ring-line"
      >
        <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-3 sm:gap-3 sm:px-6">
          <div role="tablist" aria-label="Sample workflow" className="recess grid flex-1 grid-cols-2 gap-0.5 rounded-md p-0.5 text-[0.8125rem] sm:flex sm:flex-none">
            {FLOWS.map((f, i) => {
              const selected = i === flowIndex;
              return (
                <button
                  key={f.tab}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectFlow(i)}
                  className={`rounded-[5px] px-1.5 py-1.5 font-medium leading-tight transition-colors duration-200 sm:px-3 ${
                    selected
                      ? 'bg-dial-700 text-gold-pale shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_1px_2px_rgb(0_0_0/0.6)]'
                      : 'text-stone hover:text-ivory'
                  }`}
                >
                  {f.tab}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              if (!playing && step >= LAST_STEP) setStep(0);
              setPlaying(!playing);
            }}
            aria-label={playing ? 'Pause the animation' : 'Play the animation'}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-[0.8125rem] font-medium text-stone ring-1 ring-line transition-colors hover:text-ivory hover:ring-line-strong"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{playing ? 'Pause' : 'Play'}</span>
          </button>
        </div>

        <div className="grid gap-y-2 lg:grid-cols-[1.45fr_1fr]">
          {/* The flow, drawn as wires between instruments */}
          <div className="px-3 pt-6 sm:px-6 lg:py-8">
            <svg
              viewBox={layout.viewBox}
              className="mx-auto h-auto w-full max-w-[22rem] md:max-w-none"
              role="img"
              aria-label={`${APPS[flow.trigger.app].name} to Jarvis, then ${flow.actions.map((a) => APPS[a.app].name).join(', ')}`}
            >
              <defs>
                <radialGradient id="wfCore" cx="50%" cy="45%" r="50%">
                  <stop offset="0%" stopColor="#efdfb0" />
                  <stop offset="55%" stopColor="#c9a24c" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#111112" />
                </radialGradient>
              </defs>

              {layout.edges.map((d, e) => (
                <g key={`${flowIndex}-${e}`}>
                  <path d={d} fill="none" stroke="rgb(242 239 232 / 0.16)" strokeWidth="1.2" strokeDasharray="3 5" />
                  <path
                    d={d}
                    fill="none"
                    stroke="#c9a24c"
                    strokeWidth="1.6"
                    pathLength={1}
                    strokeDasharray="1"
                    className="wf-progress"
                    style={{ strokeDashoffset: edgeDone(e) ? 0 : 1 }}
                  />
                  {edgeActive(e) && (
                    <path
                      key={`comet-${step}`}
                      d={d}
                      fill="none"
                      stroke="#fbf3dc"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="0.06 1.2"
                      className="wf-comet"
                    />
                  )}
                </g>
              ))}

              <AppNode at={layout.trigger} app={flow.trigger.app} note={flow.trigger.note} lit={triggerLit} labelBelow />
              <JarvisNode at={layout.jarvis} lit={jarvisLit} thinking={step === 1 && playing} labelBelow={layout.labelBelow} />
              {flow.actions.map((a, i) => (
                <AppNode key={`${flowIndex}-${a.app}`} at={layout.actions[i]} app={a.app} note={a.note} lit={actionLit(i)} labelBelow={layout.labelBelow} />
              ))}
            </svg>
          </div>

          {/* Narration */}
          <ol className="border-t border-line px-5 py-6 sm:px-7 lg:border-l lg:border-t-0 lg:py-8" aria-live="polite">
            {flow.steps.map((text, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={`${flowIndex}-${i}`} className="grid grid-cols-[1.25rem_1fr] gap-x-3 py-2">
                  <span className="flex h-5 items-center justify-center" aria-hidden="true">
                    {done ? (
                      <Check className="h-3.5 w-3.5 text-gold" />
                    ) : current ? (
                      <span className="index-bar" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-dial-700 ring-1 ring-line-strong" />
                    )}
                  </span>
                  <span
                    className={`text-[1.0625rem] leading-snug transition-colors duration-500 ${
                      current
                        ? i === LAST_STEP
                          ? 'font-semibold text-gold-bright'
                          : 'text-ivory'
                        : done
                        ? 'text-ivory-dim'
                        : 'text-stone/70'
                    }`}
                  >
                    {text}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-[0.8125rem] sm:px-6">
          <span className="text-stone">Sample workflow. Yours is set up around the apps you already use.</span>
          <button onClick={onOpenJarvis} className="group flex items-center gap-1.5 font-semibold text-gold-bright transition-colors hover:text-gold-pale">
            <span>Launch Jarvis Live Panel</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
