import React, { useState } from 'react';
import { Star, Quote, TrendingUp } from 'lucide-react';
import { SectionHeader } from './ui';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  metric: string;
  metricLabel: string;
  rating: number;
  industry: 'Fintech' | 'Enterprise' | 'Logistics' | 'Sovereign';
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Eleanor Vance-Castillo',
    role: 'Chief Technology Officer',
    company: 'Aurelius Quantum Asset Management',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote:
      'Multistrata’s tri-strata cognitive architecture eliminated our 4-day settlement audit backlog down to 12 minutes. Jarvis handles cross-border compliance with zero hallucinations.',
    metric: '₱38.4M',
    metricLabel: 'Quarterly compliance overhead reclaimed',
    rating: 5,
    industry: 'Fintech',
  },
  {
    id: '2',
    name: 'Marcus Sterling',
    role: 'VP of Global Operations',
    company: 'Novus Dynamics Robotics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote:
      'The transition to Multistrata AI was astonishingly seamless. We orchestrated 45 autonomous sub-agents across our supply lines in under three weeks. The luxury HUD interface alone is a masterclass in executive software.',
    metric: '+340%',
    metricLabel: 'Supply pipeline dispatch velocity',
    rating: 5,
    industry: 'Logistics',
  },
  {
    id: '3',
    name: 'Dr. Vivienne Chen',
    role: 'Head of Enterprise Intelligence',
    company: 'Lumina Sovereign Systems',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote:
      'In sovereign infrastructure, you cannot compromise on data boundaries. Multistrata delivered completely air-gapped strata clusters that outsmarted our legacy orchestration tools from day one.',
    metric: '99.99%',
    metricLabel: 'Zero-variance decision integrity',
    rating: 5,
    industry: 'Sovereign',
  },
  {
    id: '4',
    name: 'Julian Thorne',
    role: 'Founder & Managing Director',
    company: 'Veloce Capital Partners',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote:
      'We started on the T2 Growth tier at ₱4,999/mo and upgraded to Enterprise within 60 days. Jarvis acts like a team of twenty senior process architects who never sleep.',
    metric: '18x',
    metricLabel: 'Multi-agent throughput multiplier',
    rating: 5,
    industry: 'Enterprise',
  },
];

const MARQUEE_ITEMS = [
  'Autonomous Workflows',
  'Real-time Orchestration',
  'Multi-Agent Intelligence',
  'Zero Manual Handoffs',
  'Self-Optimizing Systems',
  'Enterprise-Grade Security',
];

const INDUSTRY_FILTERS = ['All', 'Fintech', 'Enterprise', 'Logistics', 'Sovereign'] as const;
type IndustryFilter = (typeof INDUSTRY_FILTERS)[number];

export const TrustedBySection: React.FC = () => {
  const [filter, setFilter] = useState<IndustryFilter>('All');

  const filteredTestimonials =
    filter === 'All' ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.industry === filter);

  return (
    <section id="about" aria-labelledby="trusted-title" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <SectionHeader id="trusted-title" label="PROVEN INSTITUTIONAL EXCELLENCE" title="Trusted by Forward-Thinking Teams">
          Global technology leaders rely on Multistrata to elevate fragile manual workflows into resilient autonomous intelligence.
        </SectionHeader>
      </div>

      {/* Capability marquee, full bleed */}
      <div className="mt-16 sm:mt-20">
        <p className="dial-print px-5 text-center">“ORCHESTRATING WORKFLOWS FOR PIONEERS WORLDWIDE”</p>
        <div className="group relative mt-6 overflow-hidden border-y border-line py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-dial-950 to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-dial-950 to-transparent sm:w-40" />
          <div className="flex w-full select-none overflow-hidden">
            <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
              {/* Rendered twice so the -50% translate loops seamlessly */}
              {[0, 1].flatMap((copy) =>
                MARQUEE_ITEMS.map((title) => (
                  <span key={`${copy}-${title}`} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-8 sm:gap-12">
                    <span
                      className="whitespace-nowrap font-display text-[clamp(1.125rem,1.8vw,1.5rem)] font-medium tracking-[-0.01em] text-ivory-dim"
                      style={{ fontStretch: '96%' }}
                    >
                      {title}
                    </span>
                    <span aria-hidden="true" className="index-bar" />
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        {/* Industry filter */}
        <div role="group" aria-label="Filter testimonials by industry" className="recess mx-auto mt-16 flex w-fit max-w-full flex-wrap justify-center gap-0.5 rounded-md p-0.5">
          {INDUSTRY_FILTERS.map((cat) => {
            const selected = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={selected}
                className={`rounded-[5px] px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200 ${
                  selected
                    ? 'bg-dial-700 text-gold-pale shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_1px_2px_rgb(0_0_0/0.6)]'
                    : 'text-stone hover:text-ivory'
                }`}
              >
                {cat === 'All' ? 'All Deployments' : cat}
              </button>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {filteredTestimonials.map((t) => (
            <figure key={t.id} className="flex flex-col justify-between border-t border-line py-10">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5" aria-label={`Rated ${t.rating} out of 5`}>
                    {Array.from({ length: t.rating }, (_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-stone">{t.industry}</span>
                </div>

                <blockquote className="mt-6">
                  <Quote className="mb-3 h-5 w-5 text-gold/45" aria-hidden="true" />
                  <p className="text-[1.0625rem] leading-relaxed text-ivory sm:text-[1.125rem]">“{t.quote}”</p>
                </blockquote>
              </div>

              <div className="mt-8">
                <div className="recess flex items-center justify-between gap-4 rounded-md px-4 py-3">
                  <span className="flex items-center gap-2 text-[0.8125rem] text-stone">
                    <TrendingUp className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {t.metricLabel}
                  </span>
                  <span className="tabular font-display text-[1.0625rem] font-semibold text-gold-bright">{t.metric}</span>
                </div>

                <figcaption className="mt-6 flex items-center gap-3.5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-gold/35"
                  />
                  <div>
                    <div className="text-[0.9375rem] font-semibold text-ivory">{t.name}</div>
                    <div className="text-[0.8125rem] text-stone">{t.role}</div>
                    <div className="text-[0.8125rem] text-gold">{t.company}</div>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
        <p className="dial-print mt-6 text-center">Illustrative figures, pending launch data</p>
      </div>
    </section>
  );
};
