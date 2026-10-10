import React from 'react';
import { Plus, Bot } from 'lucide-react';
import { Band, SectionHeader, buttonClass } from './ui';

/** Answers draw only on facts the site already states (pricing, trial, data handling, audit trail). */
const FAQS = [
  {
    q: 'What does Multistrata actually do for my business?',
    a: 'Jarvis takes over the repetitive work that happens between your apps: reading order emails, updating spreadsheets, sending invoices and payment reminders, and keeping your team posted. You decide how a task should be done once, and it runs the same way every time.',
  },
  {
    q: 'Do I need an IT team or technical skills?',
    a: 'No. You describe how your business runs today and we map it with you during your demo. Larger plans include a dedicated architecture and integration team that handles the setup for you.',
  },
  {
    q: 'Which apps does it work with?',
    a: 'Multistrata connects through webhooks and REST APIs, so it can reach most of the business tools you use. The Gmail, Google Sheets, Google Calendar, Google Forms and Messenger flows above are samples; book a demo and we will confirm the exact apps in your setup.',
  },
  {
    q: 'How much does it cost?',
    a: 'Plans start at ₱1,999 a month for Starter, ₱4,999 for Growth and ₱12,999 for Enterprise. Paying annually saves 20%, and setup and provisioning cost nothing.',
  },
  {
    q: 'Am I locked into a contract?',
    a: 'No. Monthly plans are billed month to month with zero lock-in, every plan starts with a 14-day trial, and you can cancel without a commitment.',
  },
  {
    q: 'Is my business data safe?',
    a: 'Your data is never used to train public AI models. Every action is written to an encrypted audit log, and Enterprise customers can run on air-gapped or on-premise servers.',
  },
  {
    q: 'What if Jarvis gets something wrong?',
    a: 'Every step Jarvis takes is recorded with a signed audit receipt, so you can see exactly what happened and when. Changes can be rolled back through built-in fail-safe buffers.',
  },
  {
    q: 'Will it replace my staff?',
    a: 'It replaces the copy-and-paste part of their day. Your team gets that time back for customers, sales and the decisions that need a person.',
  },
];

interface FaqSectionProps {
  onOpenDemo: () => void;
  onAskJarvis: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenDemo, onAskJarvis }) => (
  <Band id="faq" aria-labelledby="faq-title">
    <SectionHeader id="faq-title" label="FOR BUSINESS OWNERS" title="Questions owners ask us">
      Straight answers about cost, setup and what Jarvis does in a normal working day.
    </SectionHeader>

    <div className="mt-14 lg:ml-[calc(25%+0.625rem)]">
      <div className="border-t border-line">
        {FAQS.map((item, i) => (
          <details key={item.q} open={i === 0} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-ivory-dim transition-colors group-open:text-ivory group-hover:text-ivory">
                {item.q}
              </h3>
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 ring-line-strong transition-[transform,box-shadow] duration-300 ease-out-expo group-open:rotate-45 group-open:ring-gold/60">
                <Plus className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              </span>
            </summary>
            <p className="animate-in max-w-[62ch] pb-7 pr-12 text-[1.0625rem] leading-relaxed text-ivory-dim">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-[1.625rem] font-semibold tracking-[-0.015em] text-ivory">Still deciding?</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={onOpenDemo} className={buttonClass('primary', 'md')}>
            Book a Demo
          </button>
          <button onClick={onAskJarvis} className={buttonClass('secondary', 'md')}>
            <Bot className="h-4 w-4 text-gold" />
            Ask Jarvis
          </button>
        </div>
      </div>
    </div>
  </Band>
);
