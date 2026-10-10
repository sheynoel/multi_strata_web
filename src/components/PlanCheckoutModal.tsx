import React, { useState } from 'react';
import { PlanTier, formatPHP } from './TiersSection';
import { MultistrataLogo } from './MultistrataLogo';
import { Shield, ArrowRight } from 'lucide-react';
import { ModalShell, Field, Spinner, SuccessMessage, SUBMIT_BUTTON_CLASS } from './ModalShell';

interface PlanCheckoutModalProps {
  tier: PlanTier;
  isAnnual: boolean;
  onClose: () => void;
  onSuccess: (tierName: string) => void;
}

export const PlanCheckoutModal: React.FC<PlanCheckoutModalProps> = ({ tier, isAnnual, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');

  const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setComplete(true);
      setTimeout(() => {
        onSuccess(`${tier.code} ${tier.name}`);
        onClose();
      }, 1800);
    }, 1100);
  };

  if (complete) {
    return (
      <ModalShell onClose={onClose} widthClass="max-w-lg">
        <SuccessMessage title="Plan Configured Successfully">
          Provisioning your sovereign cluster for{' '}
          <span className="font-bold text-gold-bright">
            {tier.code} – {tier.name}
          </span>
          . Check your inbox for node access tokens.
        </SuccessMessage>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose} widthClass="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex rounded-full bg-dial-950 p-2.5 ring-1 ring-gold/30">
          <MultistrataLogo size={36} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-sm px-1.5 py-0.5 text-[0.75rem] font-semibold text-gold ring-1 ring-gold/35">
              {tier.code}
            </span>
            <h3 className="font-display text-xl font-semibold text-ivory">Deploy {tier.name} Tier</h3>
          </div>
          <p className="text-[0.875rem] leading-relaxed text-ivory-dim">
            {isAnnual ? 'Annual Institutional Billing (Save 20%)' : 'Monthly Flexible Subscription'}
          </p>
        </div>
      </div>

      <div className="recess mb-6 space-y-2.5 rounded-md p-4">
        <div className="flex items-center justify-between text-[0.8125rem] text-ivory-dim">
          <span>Plan rate:</span>
          <span className="tabular font-semibold text-ivory">{formatPHP(price)} / month</span>
        </div>
        {isAnnual && (
          <div className="flex items-center justify-between text-[0.8125rem] text-gold-bright">
            <span>Annual billing total:</span>
            <span className="tabular font-semibold text-gold-bright">{formatPHP(price * 12)} / year</span>
          </div>
        )}
        <div className="border-t border-line pt-2.5 flex items-center justify-between text-[0.8125rem] text-stone">
          <span>Setup & Provisioning:</span>
          <span className="tabular font-semibold text-gold-bright">Instant (₱0)</span>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">Strata Package Specifications:</div>
        <div className="grid grid-cols-2 gap-2 text-[0.875rem]">
          <div className="rounded-md p-3 ring-1 ring-line">
            <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-stone">AGENTS</span>
            <span className="text-ivory font-semibold">{tier.specs.agents}</span>
          </div>
          <div className="rounded-md p-3 ring-1 ring-line">
            <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-stone">THROUGHPUT</span>
            <span className="text-ivory font-semibold">{tier.specs.invocations}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="space-y-4">
        <Field
          label="Work Email (Account Owner)"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="executive@institution.com"
        />
        <Field
          label="Institution Name"
          required
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          placeholder="Aurelius Capital LLC"
        />

        <button type="submit" disabled={loading} className={`${SUBMIT_BUTTON_CLASS} py-3.5`}>
          {loading ? (
            <>
              <Spinner />
              Allocating Strata Cluster...
            </>
          ) : (
            <>
              <span>Confirm & Activate {tier.code}</span>
              <ArrowRight className="w-4 h-4 text-dial-950" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[0.75rem] text-stone">
          <Shield className="w-3.5 h-3.5 text-gold" />
          <span>Zero-commitment cancellation • 14-day sovereign trial</span>
        </div>
      </form>
    </ModalShell>
  );
};
