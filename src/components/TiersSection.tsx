import React, { useState } from 'react';
import { Check, Sparkles, Shield, Crown, ArrowRight } from 'lucide-react';
import { Band, SectionHeader, buttonClass } from './ui';

export interface PlanTier {
  id: string;
  code: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  features: string[];
  specs: { agents: string; invocations: string };
}

const PHP_FORMAT = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
});

export const formatPHP = (value: number) => PHP_FORMAT.format(value);

export const TIERS_DATA: PlanTier[] = [
  {
    id: 't1',
    code: 'T1',
    name: 'Starter',
    tagline: 'For boutique operations & high-velocity teams piloting autonomous intelligence.',
    priceMonthly: 1999,
    priceAnnual: 1599,
    features: [
      '5 Strata Autonomous Agents',
      '50,000 Process Invocations / mo',
      '24/7 Jarvis Core Assist',
      'Standard SLA (99.5% Uptime)',
      'Webhook & REST API Ingestion',
      'Encrypted Audit Logs (30-day retention)',
      'Community & Documentation Access',
    ],
    specs: { agents: '5 Agents', invocations: '50k / mo' },
  },
  {
    id: 't2',
    code: 'T2',
    name: 'Growth',
    tagline: 'Engineered for scaling enterprises requiring high-throughput multi-agent swarms.',
    priceMonthly: 4999,
    priceAnnual: 3999,
    popular: true,
    features: [
      '25 Strata Autonomous Agents',
      '500,000 Process Invocations / mo',
      'Priority Jarvis Autonomous Operator',
      'Custom Workflow Synthesizer & Visual Canvas',
      'Enhanced SLA (99.9% Uptime)',
      'Enterprise Role-Based Access Control (RBAC)',
      'Encrypted Audit Logs (1-year retention)',
      'Direct Discord & Slack Engineering Line',
    ],
    specs: { agents: '25 Agents', invocations: '500k / mo' },
  },
  {
    id: 't3',
    code: 'T3',
    name: 'Enterprise',
    tagline: 'Sovereign-grade multi-cluster architecture for mission-critical institutional operations.',
    priceMonthly: 12999,
    priceAnnual: 10399,
    features: [
      'Unlimited Strata Autonomous Agents',
      '5,000,000+ Process Invocations / mo',
      'Dedicated Jarvis Custom Agent Node',
      'Multi-region Sovereign Strata Clusters',
      'Air-gapped & On-premise Deployment Options',
      '99.99% Guaranteed SLA with Financial Backing',
      'White-Glove Architecture & Integration Team',
      'Custom LLM Fine-Tuning & Vector Sharding',
    ],
    specs: { agents: 'Unlimited', invocations: '5M+ / mo' },
  },
];

interface TiersSectionProps {
  onSelectTier: (tier: PlanTier, isAnnual: boolean) => void;
}

export const TiersSection: React.FC<TiersSectionProps> = ({ onSelectTier }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  // Bumped on each billing switch so the changed prices get stamped.
  const [stamp, setStamp] = useState(0);

  return (
    <Band id="tiers" aria-labelledby="tiers-title">
      <SectionHeader id="tiers-title" label="TRANSPARENT INSTITUTIONAL INVESTMENT" title="Sovereign Deployment Tiers">
        Predictable, sovereign pricing scaled to your cognitive throughput. All plans include continuous strata optimization.
      </SectionHeader>

      {/* Monthly vs annual */}
      <div className="mt-10 flex flex-wrap items-center gap-4 lg:ml-[calc(25%+0.625rem)]">
        <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-ivory' : 'text-stone'}`}>Monthly Billing</span>

        <button
          role="switch"
          aria-checked={isAnnual}
          aria-label="Annual billing"
          onClick={() => {
            setIsAnnual(!isAnnual);
            setStamp((n) => n + 1);
          }}
          className="recess relative h-7 w-[3.25rem] rounded-full p-[3px]"
        >
          <span
            className={`block h-[22px] w-[22px] rounded-full metal-plate transition-transform duration-300 ease-out-expo ${
              isAnnual ? 'translate-x-[24px]' : 'translate-x-0'
            }`}
          />
        </button>

        <span className={`flex items-center gap-2.5 text-sm font-medium transition-colors ${isAnnual ? 'text-ivory' : 'text-stone'}`}>
          Annual Billing
          <span className="rounded-sm px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gold-bright ring-1 ring-gold/40">
            Save 20%
          </span>
        </span>
      </div>

      {/* One spec sheet, three columns */}
      <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-panel bg-dial-900/70 ring-1 ring-line lg:grid-cols-3">
        {TIERS_DATA.map((tier, idx) => {
          const displayPrice = isAnnual ? tier.priceAnnual : tier.priceMonthly;

          return (
            <article
              key={tier.id}
              aria-labelledby={`tier-${tier.id}`}
              className={`relative flex flex-col p-7 sm:p-9 lg:row-span-6 lg:grid lg:grid-rows-subgrid lg:gap-y-0 ${
                idx > 0 ? 'border-t border-line lg:border-l lg:border-t-0' : ''
              } ${
                tier.popular ? 'bg-dial-800/80' : ''
              }`}
            >
              {tier.popular && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#8a6d2e,#efdfb0_45%,#c9a24c_70%,#8a6d2e)]"
                />
              )}

              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                <div className="flex items-center gap-3">
                  <span className="tabular rounded-sm px-1.5 py-0.5 text-[0.75rem] font-semibold text-gold ring-1 ring-gold/35">
                    {tier.code}
                  </span>
                  <h3 id={`tier-${tier.id}`} className="font-display text-[1.625rem] font-semibold tracking-[-0.015em] text-ivory">
                    {tier.name}
                  </h3>
                </div>
                {tier.code === 'T3' && <Crown className="h-5 w-5 text-gold" aria-hidden="true" />}
                {tier.popular && (
                  <span className="flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-gold-bright">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    MOST POPULAR TIER
                  </span>
                )}
              </div>

              <p className="mt-3 min-h-[3rem] text-[0.875rem] leading-relaxed text-ivory-dim">{tier.tagline}</p>

              <div className="mt-7">
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`tabular relative font-display text-[clamp(2.25rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.025em] ${
                      tier.popular ? 'text-gold-bright' : 'text-ivory'
                    }`}
                    style={{ fontStretch: '92%' }}
                  >
                    {formatPHP(displayPrice)}
                    {stamp > 0 && (
                      <span
                        key={stamp}
                        aria-hidden="true"
                        className="animate-value-stamp absolute -bottom-1.5 left-0 h-px w-full bg-gold-bright opacity-0"
                      />
                    )}
                  </span>
                  <span className="text-[0.8125rem] text-stone">/ month</span>
                </div>
                <p className={`tabular mt-3 text-[0.8125rem] ${isAnnual ? 'text-gold-bright' : 'text-stone'}`}>
                  {isAnnual ? `Billed annually (${formatPHP(displayPrice * 12)}/yr)` : 'Billed monthly with zero lock-in'}
                </p>
              </div>

              <dl className="mt-7 grid grid-cols-2 divide-x divide-line border-y border-line py-4">
                <div className="pr-4">
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-stone">AGENTS</dt>
                  <dd className="tabular mt-1 text-[0.9375rem] font-semibold text-ivory">{tier.specs.agents}</dd>
                </div>
                <div className="pl-4">
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-stone">THROUGHPUT</dt>
                  <dd className="tabular mt-1 text-[0.9375rem] font-semibold text-ivory">{tier.specs.invocations}</dd>
                </div>
              </dl>

              <div className="mt-7 flex-1">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">Capabilities Included:</p>
                <ul className="mt-4 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-ivory-dim">
                      <Check className="mt-px h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectTier(tier, isAnnual)}
                className={buttonClass(tier.popular ? 'primary' : 'secondary', 'md', 'group mt-9 w-full self-end')}
              >
                <span>Choose Plan ({tier.code})</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </article>
          );
        })}
      </div>

      {/* Enterprise custom note */}
      <div className="mt-6 flex flex-col gap-5 rounded-panel p-6 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-gold/35">
            <Shield className="h-4.5 w-4.5 text-gold" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-[1.0625rem] font-semibold text-ivory">
              Need air-gapped sovereign clusters or custom high-frequency endpoints?
            </p>
            <p className="mt-1 text-[0.875rem] text-stone">
              Our solutions architects configure multi-region isolated VPC deployments in under 48 hours.
            </p>
          </div>
        </div>

        <button onClick={() => onSelectTier(TIERS_DATA[2], isAnnual)} className={buttonClass('secondary', 'md', 'shrink-0')}>
          Talk to Strata Architect
        </button>
      </div>
    </Band>
  );
};
