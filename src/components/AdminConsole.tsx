import React from 'react';
import { ModalShell } from './ModalShell';
import { MultistrataLogo } from './MultistrataLogo';

interface AdminConsoleProps {
  currentUser: string;
  onClose: () => void;
  onLogout: () => void;
}

const STATUS_TILES = [
  {
    label: 'CLUSTER HEALTH',
    content: (
      <div className="flex items-center gap-1.5 text-sm font-semibold text-gold-bright">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" />
        ACTIVE (100%)
      </div>
    ),
  },
  {
    label: 'DELIBERATION QUORUM',
    content: <div className="text-sm font-semibold text-gold-bright">9/9 Verified</div>,
  },
  {
    label: 'SECURITY POSTURE',
    content: <div className="text-sm font-semibold text-ivory">SOC-2 Isolated</div>,
  },
];

export const AdminConsole: React.FC<AdminConsoleProps> = ({ currentUser, onClose, onLogout }) => (
  <ModalShell onClose={onClose} widthClass="max-w-2xl">
    <div className="flex items-center gap-3.5 pb-4 mb-6 border-b border-line">
      <div className="flex items-center justify-center rounded-full bg-dial-950 p-2 ring-1 ring-gold/30">
        <MultistrataLogo size={40} />
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-ivory">
          Strata Executive Admin Console
        </h3>
        <p className="text-[0.8125rem] text-gold">
          Logged in as: {currentUser} • Sovereign Cluster Alpha
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {STATUS_TILES.map((tile) => (
        <div
          key={tile.label}
          className="recess space-y-1.5 rounded-md p-4"
        >
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-stone">{tile.label}</span>
          {tile.content}
        </div>
      ))}
    </div>

    <div className="flex justify-between items-center pt-4 border-t border-line">
      <button
        onClick={onLogout}
        className="inline-flex h-9 items-center rounded-md px-4 text-[0.8125rem] font-semibold text-alert ring-1 ring-alert/40 transition-colors hover:bg-alert/10"
      >
        Terminate Session
      </button>
      <button
        onClick={onClose}
        className="inline-flex h-9 items-center rounded-md px-4 text-[0.8125rem] font-semibold text-dial-950 metal-plate transition-colors hover:bg-gold-bright"
      >
        Close Console
      </button>
    </div>
  </ModalShell>
);
