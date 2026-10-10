import React, { useEffect, useRef } from 'react';
import { CheckCircle2, X, type LucideIcon } from 'lucide-react';
import { buttonClass } from './ui';

interface ModalShellProps {
  onClose: () => void;
  /** Tailwind max-width utility for the panel, e.g. `max-w-md`. */
  widthClass?: string;
  /** Extra utilities appended to the panel. */
  className?: string;
  children: React.ReactNode;
}

/** Shared backdrop, panel chrome and close button for all centred modals. */
export const ModalShell: React.FC<ModalShellProps> = ({ onClose, widthClass = 'max-w-lg', className = '', children }) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  // Callers pass inline handlers; keep the latest without re-running the focus effect.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Move focus into the dialog once on open, let Escape close it, and restore focus after.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div onClick={onClose} className="fixed inset-0 bg-dial-950/80 backdrop-blur-sm" aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`animate-in relative z-10 w-full ${widthClass} rounded-panel bg-dial-900 p-6 shadow-[0_1px_0_rgb(242_239_232/0.07)_inset,0_40px_100px_-30px_rgb(0_0_0/0.95)] ring-1 ring-line-strong outline-none sm:p-8 ${className}`.trim()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-2 text-stone transition-colors hover:bg-ivory/5 hover:text-ivory"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export const INPUT_CLASS =
  'w-full h-11 rounded-md bg-dial-950 text-[0.875rem] text-ivory ring-1 ring-line-strong outline-none transition-[box-shadow] focus:ring-2 focus:ring-gold';

export const SUBMIT_BUTTON_CLASS = buttonClass('primary', 'md', 'w-full');

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  /** Rendered at the right end of the label row. */
  aside?: React.ReactNode;
}

/** Labelled text input with an optional leading icon. */
export const Field: React.FC<FieldProps> = ({ label, icon: Icon, aside, className = '', ...inputProps }) => (
  <label className="block">
    <span className="mb-2 flex items-center justify-between text-[0.8125rem] font-medium text-ivory-dim">
      {label}
      {aside}
    </span>
    <span className="relative flex items-center">
      {Icon && <Icon className="pointer-events-none absolute left-3.5 h-4 w-4 text-stone" aria-hidden="true" />}
      <input {...inputProps} className={`${INPUT_CLASS} ${Icon ? 'pl-10 pr-3.5' : 'px-3.5'} ${className}`} />
    </span>
  </label>
);

export const Spinner: React.FC = () => (
  <span className="h-4 w-4 animate-spin rounded-full border-2 border-dial-950 border-t-transparent" aria-hidden="true" />
);

/** Gold check-mark confirmation shown after a modal form is submitted. */
export const SuccessMessage: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="animate-in space-y-4 p-6 text-center sm:p-8" role="status">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full ring-1 ring-gold/50">
      <CheckCircle2 className="h-7 w-7 text-gold-bright" aria-hidden="true" />
    </div>
    <div className="font-display text-xl font-semibold text-ivory">{title}</div>
    <p className="mx-auto max-w-sm text-[0.875rem] leading-relaxed text-ivory-dim">{children}</p>
  </div>
);
