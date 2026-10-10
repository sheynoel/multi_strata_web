import React, { useState } from 'react';
import { Mail, User, Building, Send, ShieldCheck } from 'lucide-react';
import { ModalShell, Field, Spinner, SuccessMessage, INPUT_CLASS, SUBMIT_BUTTON_CLASS } from './ModalShell';

const TIER_OPTIONS = [
  { value: 'T1 - Starter (₱1,999/mo)', label: 'T1 – Starter (₱1,999 / mo)' },
  { value: 'T2 - Growth (₱4,999/mo)', label: 'T2 – Growth (₱4,999 / mo)' },
  { value: 'T3 - Enterprise (₱12,999/mo)', label: 'T3 – Enterprise (₱12,999 / mo)' },
  { value: 'Custom Sovereign Cluster', label: 'Custom Sovereign Cluster' },
];

export const ContactModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [tier, setTier] = useState(TIER_OPTIONS[1].value);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(onClose, 2500);
    }, 800);
  };

  return (
    <ModalShell onClose={onClose} widthClass="max-w-lg">
      <div className="mb-7 space-y-2 pr-10 text-left">
        <h3 className="font-display text-2xl font-semibold text-ivory">Connect with Multistrata Architects</h3>

        <p className="text-[0.875rem] text-ivory-dim">
          Schedule an architectural deep dive or discuss custom sovereign clusters on multistrata.dev.
        </p>

        <p className="dial-print flex items-center gap-2 pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          <span>EXECUTIVE BRIEFING & DEMO</span>
        </p>
      </div>

      {submitted ? (
        <SuccessMessage title="Briefing Request Dispatched">
          Ticket <span className="tabular font-semibold text-gold-bright">#STRATA-{ticketId}</span> assigned. A senior
          solutions architect will contact you within 4 business hours.
        </SuccessMessage>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Your Full Name"
              icon={User}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Marcus Thorne"
            />
            <Field
              label="Corporate Email"
              icon={Mail}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m.thorne@enterprise.com"
            />
            <Field
              label="Company / Institution"
              icon={Building}
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Global Capital Group"
            />
            <label className="block">
              <span className="mb-2 block text-[0.8125rem] font-medium text-ivory-dim">Tier of Interest</span>
              <select value={tier} onChange={(e) => setTier(e.target.value)} className={`${INPUT_CLASS} px-3.5`}>
                {TIER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-[0.8125rem] font-medium text-ivory-dim">
              Target Workflow / Specific Requirements
            </span>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="We want to automate cross-border settlement auditing across 4 ERP instances with Jarvis..."
              className={`${INPUT_CLASS} h-auto px-3.5 py-2.5`}
            />
          </label>

          <button type="submit" disabled={isSubmitting} className={`${SUBMIT_BUTTON_CLASS} py-3.5`}>
            {isSubmitting ? (
              <>
                <Spinner />
                Routing to Executive Queue...
              </>
            ) : (
              <>
                <span>Dispatch Consultation Request</span>
                <Send className="w-4 h-4 text-dial-950" />
              </>
            )}
          </button>

          <div className="text-center text-[0.75rem] text-stone">
            Direct engineering desk: <span className="text-gold-bright">team@multistrata.dev</span>
          </div>
        </form>
      )}
    </ModalShell>
  );
};
