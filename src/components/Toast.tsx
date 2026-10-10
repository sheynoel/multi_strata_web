import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC<{ message: string | null }> = ({ message }) => {
  if (!message) return null;

  return (
    <div role="status" className="fixed bottom-24 left-1/2 z-50 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2">
      <div className="animate-in flex items-center gap-2.5 rounded-md bg-dial-800 px-4 py-3 text-[0.875rem] font-medium text-ivory shadow-[0_1px_0_rgb(242_239_232/0.07)_inset,0_20px_50px_-20px_rgb(0_0_0/0.95)] ring-1 ring-gold/35">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-bright" aria-hidden="true" />
        <span>{message}</span>
      </div>
    </div>
  );
};
