import React from 'react';
import { MultistrataLogo } from './MultistrataLogo';
import { ModalShell } from './ModalShell';

interface LegalModalProps {
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => (
  <ModalShell onClose={onClose} widthClass="max-w-2xl" className="max-h-[85vh] flex flex-col justify-between">
    <div className="flex items-center gap-3 pb-4 border-b border-line">
      <div className="flex rounded-full bg-dial-950 p-2 ring-1 ring-gold/30">
        <MultistrataLogo size={32} animated={false} />
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-ivory">
          {type === 'privacy' ? 'Multistrata Sovereign Privacy Policy' : 'Terms of Institutional Service'}
        </h3>
        <p className="text-[0.8125rem] text-gold">
          multistrata.dev • Effective September 2026
        </p>
      </div>
    </div>

    <div className="flex-1 space-y-4 overflow-y-auto py-5 text-[0.875rem] leading-relaxed text-ivory-dim">
      {type === 'privacy' ? (
        <>
          <p>
            At <strong>Multistrata AI</strong> (operated at <em>multistrata.dev</em>), sovereign data stewardship is our core architectural axiom. We believe institutional data belonging to our customers must remain strictly sovereign and inaccessible to unauthorized models or external third parties.
          </p>
          <h4 className="pt-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-bright">
            1. Zero Model Training on Enterprise Inputs
          </h4>
          <p>
            Customer telemetry, ERP streams, API payloads, and internal communications ingested across Stratum I, Stratum II, and Stratum III are processed in volatile memory and never used to train public foundation models or shared foundational weights.
          </p>
          <h4 className="pt-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-bright">
            2. Sovereign Encryption & Air-Gapping
          </h4>
          <p>
            All data in transit is encrypted with TLS 1.3 with forward secrecy. At rest, data is protected using AES-256 with customer-managed cryptographic keys (CMEK). Air-gapped on-premise deployments guarantee that zero bits leave your perimeter without explicit cryptographic sign-off.
          </p>
          <h4 className="pt-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-bright">
            3. Compliance & Audits
          </h4>
          <p>
            Multistrata maintains continuous compliance with SOC-2 Type II, ISO/IEC 27001, GDPR, and sovereign jurisdictional requirements.
          </p>
        </>
      ) : (
        <>
          <p>
            These Terms of Service govern access to and use of Multistrata AI software, the Jarvis cognitive engine, APIs, and associated cloud clusters hosted under <em>multistrata.dev</em>.
          </p>
          <h4 className="pt-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-bright">
            1. Tier Provisioning & Invocations
          </h4>
          <p>
            Access is granted based on the chosen tier (T1 Starter, T2 Growth, T3 Enterprise). Invocations exceeding the monthly allotted quota are throttled gracefully or scaled on-demand per institutional SLA agreements.
          </p>
          <h4 className="pt-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-bright">
            2. Autonomous Agent Safety & Invariants
          </h4>
          <p>
            Jarvis executes actions strictly within user-configured formal policy boundaries. Multistrata guarantees mathematical validation before state alteration on external endpoints.
          </p>
          <h4 className="pt-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-bright">
            3. Service Level Agreement (SLA)
          </h4>
          <p>
            We provide 99.5% uptime for T1 Starter, 99.9% for T2 Growth, and 99.99% financially-backed uptime for T3 Enterprise deployments.
          </p>
        </>
      )}
    </div>

    <div className="pt-4 border-t border-line flex justify-end">
      <button
        onClick={onClose}
        className="inline-flex h-9 items-center rounded-md px-4 text-[0.8125rem] font-semibold text-ivory ring-1 ring-line-strong transition-colors hover:text-gold-pale hover:ring-gold/60"
      >
        Acknowledge & Close
      </button>
    </div>
  </ModalShell>
);
