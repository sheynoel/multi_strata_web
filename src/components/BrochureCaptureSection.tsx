import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, FileText, Loader2, Download, ShieldCheck } from 'lucide-react';
import { Band, buttonClass } from './ui';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

interface BrochureCaptureSectionProps {
  onBrochureSent: (email: string) => void;
}

export const BrochureCaptureSection: React.FC<BrochureCaptureSectionProps> = ({ onBrochureSent }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage('Please enter your work or institutional email address.');
      setStatus('error');
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. alex@enterprise.com).');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/send-brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch brochure email');
      }

      setSubmittedEmail(trimmedEmail);
      setStatus('success');
      setEmail('');
      onBrochureSent(trimmedEmail);
    } catch (err) {
      console.error('Error submitting brochure request:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof TypeError
          ? 'Network error. Please check your connection and try again.'
          : 'Unable to dispatch brochure right now. Please try again in a moment.'
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage(null);
  };

  return (
    <Band id="brochure" aria-labelledby="brochure-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2
            id="brochure-title"
            className="font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.04] text-ivory"
            style={{ fontStretch: '92%' }}
          >
            Secure Executive Briefing Dispatch
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ivory-dim">
            Get our comprehensive enterprise briefing covering cross-border compliance audits, multi-agent strata
            architecture, and institutional ROI benchmarks.
          </p>
          <p className="dial-print mt-8 flex items-center gap-2.5">
            <FileText className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            EXECUTIVE PRODUCT BROCHURE • PDF EDITION
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-panel bg-dial-900 p-6 shadow-[0_1px_0_rgb(242_239_232/0.06)_inset,0_40px_80px_-40px_rgb(0_0_0/0.95)] ring-1 ring-line sm:p-8">
            {status === 'success' ? (
              <div className="animate-in" role="status">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-gold/50">
                    <CheckCircle2 className="h-5 w-5 text-gold-bright" aria-hidden="true" />
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-semibold text-ivory">Check your inbox — your brochure is on its way.</h3>
                    <p className="text-[0.875rem] leading-relaxed text-ivory-dim">
                      We’ve dispatched the executive PDF to <strong className="font-semibold text-gold-bright">{submittedEmail}</strong> via
                      secure transmission.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <a href="/api/brochure.pdf" target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'sm')}>
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Brochure (PDF)</span>
                  </a>
                  <button onClick={handleReset} className="text-[0.875rem] text-stone underline transition-colors hover:text-ivory">
                    Send to another address
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="brochure-email" className="block text-[0.8125rem] font-medium text-ivory-dim">
                  Work email address
                </label>
                <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-stone" aria-hidden="true" />
                    <input
                      id="brochure-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      disabled={status === 'loading'}
                      aria-invalid={Boolean(errorMessage)}
                      aria-describedby={errorMessage ? 'brochure-error' : 'brochure-note'}
                      placeholder="Enter your work email address..."
                      className={`h-[3.25rem] w-full rounded-md bg-dial-950 pl-11 pr-4 text-[0.9375rem] text-ivory outline-none ring-1 transition-[box-shadow] focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                        errorMessage ? 'ring-alert/70 focus:ring-alert' : 'ring-line-strong focus:ring-gold'
                      }`}
                    />
                  </div>

                  <button type="submit" disabled={status === 'loading'} className={buttonClass('primary', 'lg', 'group shrink-0')}>
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Brochure</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>

                {errorMessage && (
                  <div
                    id="brochure-error"
                    role="alert"
                    className="animate-in mt-3 flex items-center justify-between gap-3 rounded-md bg-alert/10 px-3.5 py-3 text-[0.875rem] text-alert ring-1 ring-alert/35"
                  >
                    <span className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </span>
                    <button type="submit" className="shrink-0 font-medium underline hover:text-ivory">
                      Retry
                    </button>
                  </div>
                )}

                <p id="brochure-note" className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.75rem] text-stone">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    <span>Instant PDF Delivery • Zero spam</span>
                  </span>
                  <span className="text-gold-deep" aria-hidden="true">•</span>
                  <span>No password or signup required</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </Band>
  );
};
