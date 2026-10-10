import React, { useEffect, useRef, useState } from 'react';
import { MultistrataBrand } from './MultistrataLogo';
import { Check, Send, ExternalLink } from 'lucide-react';
import { buttonClass } from './ui';

interface FooterProps {
  onOpenContact: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenLegal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const subscriptionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (subscriptionTimer.current) clearTimeout(subscriptionTimer.current);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      if (subscriptionTimer.current) clearTimeout(subscriptionTimer.current);
      subscriptionTimer.current = setTimeout(() => {
        setSubscribed(false);
        subscriptionTimer.current = null;
      }, 5000);
      setEmail('');
    }
  };

  return (
    <footer className="relative z-10 pb-12 pt-20 text-ivory">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-line pb-14 md:grid-cols-12 md:gap-10">
          <div className="space-y-5 md:col-span-5">
            <MultistrataBrand size="lg" />
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-ivory-dim">
              Your Operations, on Autopilot. Autonomous multi-layered cognitive strata delivering high-velocity enterprise workflow orchestration without latency or compromise.
            </p>

            <p className="flex items-center gap-2.5 pt-1 text-[0.75rem] text-gold-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" aria-hidden="true" />
              Global Sovereign Network • 100% Operational
            </p>
          </div>

          <div className="space-y-4 md:col-span-3">
            <h2 className="dial-print">Platform & Architecture</h2>
            <ul className="space-y-2.5 text-[0.9375rem] text-ivory-dim">
              <li>
                <a href="#how-it-works" className="transition-colors hover:text-ivory">
                  Tri-Strata Cognitive Engine
                </a>
              </li>
              <li>
                <a href="#tiers" className="transition-colors hover:text-ivory">
                  Tiers & Enterprise Pricing
                </a>
              </li>
              <li>
                <a href="#brochure" className="transition-colors hover:text-ivory">
                  Executive Product Brochure
                </a>
              </li>
              <li>
                <a
                  href="/api/brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gold-bright transition-colors hover:text-gold-pale hover:underline"
                >
                  <span>Download PDF Brochure</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-ivory">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button onClick={onOpenContact} className="text-left transition-colors hover:text-ivory">
                  Contact Engineering
                </button>
              </li>
              <li>
                <span className="text-[0.75rem] text-stone">Domain: multistrata.dev</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 md:col-span-4">
            <h2 className="dial-print">The Strata Intelligence Brief</h2>
            <p className="text-[0.875rem] leading-relaxed text-ivory-dim">
              Join 12,000+ enterprise architects receiving bi-weekly deep dives into autonomous multi-agent orchestration.
            </p>

            {subscribed ? (
              <p role="status" className="animate-in flex items-center gap-2 rounded-md px-3.5 py-3 text-[0.875rem] text-gold-bright ring-1 ring-gold/40">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Subscribed to The Strata Brief. Welcome aboard.</span>
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <label htmlFor="footer-email" className="sr-only">
                  Email for The Strata Intelligence Brief
                </label>
                <input
                  id="footer-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@institution.com"
                  required
                  className="h-11 w-full rounded-md bg-dial-900 pl-3.5 pr-24 text-[0.875rem] text-ivory outline-none ring-1 ring-line-strong transition-[box-shadow] focus:ring-2 focus:ring-gold"
                />
                <button type="submit" className={buttonClass('primary', 'sm', 'absolute right-1 h-9 px-3.5')}>
                  <span>Join</span>
                  <Send className="h-3 w-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Facebook"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="TikTok"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="YouTube"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-stone">
            <button onClick={() => onOpenLegal('privacy')} className="transition-colors hover:text-ivory">
              Privacy Policy
            </button>
            <span aria-hidden="true">•</span>
            <button onClick={() => onOpenLegal('terms')} className="transition-colors hover:text-ivory">
              Terms of Service
            </button>
            <span aria-hidden="true">•</span>
            <button onClick={onOpenContact} className="transition-colors hover:text-ivory">
              Contact
            </button>
          </div>

          <div className="text-[0.75rem] text-stone">© 2026 Multistrata AI. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
