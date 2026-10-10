import React, { useState } from 'react';
import { MultistrataLogo } from './MultistrataLogo';
import { Lock, Mail, User, Building, ArrowRight, Zap } from 'lucide-react';
import { buttonClass } from './ui';
import { ModalShell, Field, Spinner, SuccessMessage, SUBMIT_BUTTON_CLASS } from './ModalShell';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (userEmail: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Simulated authentication: brief "verifying" state, then a confirmation before closing.
  const authenticate = (userEmail: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsDone(true);
      setTimeout(() => {
        onSuccess(userEmail);
        onClose();
      }, 1000);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authenticate(email || 'executive@multistrata.dev');
  };

  return (
    <ModalShell onClose={onClose} widthClass="max-w-md">
      <div className="text-center space-y-3 mb-6">
        <div className="inline-flex rounded-full bg-dial-950 p-2.5 ring-1 ring-gold/30">
          <MultistrataLogo size={42} />
        </div>

        <h3 className="font-display text-2xl font-semibold text-ivory">
          {mode === 'login' ? 'Access Strata Console' : 'Initialize Strata Account'}
        </h3>

        <p className="text-[0.875rem] leading-relaxed text-ivory-dim">
          {mode === 'login'
            ? 'Enter your institutional credentials to orchestrate autonomous clusters.'
            : 'Join multistrata.dev to deploy custom multi-agent process workflows.'}
        </p>
      </div>

      {isDone ? (
        <SuccessMessage title="Authentication Verified">
          Connecting to secure sovereign stratum node...
        </SuccessMessage>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <Field
                label="Full Name"
                icon={User}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alexander Cross"
              />
              <Field
                label="Organization / Company"
                icon={Building}
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Apex Horizons Capital"
              />
            </>
          )}

          <Field
            label="Work Email"
            icon={Mail}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="architect@institution.com"
          />

          <Field
            label="Password"
            icon={Lock}
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            aside={
              mode === 'login' && (
                <button type="button" className="text-[0.75rem] text-gold-bright hover:underline">
                  Forgot password?
                </button>
              )
            }
          />

          <button type="submit" disabled={isLoading} className={`${SUBMIT_BUTTON_CLASS} mt-2`}>
            {isLoading ? (
              <>
                <Spinner />
                Verifying Cryptographic Handshake...
              </>
            ) : (
              <>
                <span>{mode === 'login' ? 'Authenticate' : 'Create Sovereign Account'}</span>
                <ArrowRight className="w-4 h-4 text-dial-950" />
              </>
            )}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => authenticate('demo.architect@multistrata.dev')}
            className={buttonClass('secondary', 'md', 'w-full')}
          >
            <Zap className="h-4 w-4 text-gold" aria-hidden="true" />
            Instant 1-Click Demo Console Access
          </button>

          <div className="pt-2 text-center text-[0.8125rem] text-ivory-dim">
            {mode === 'login' ? "Don't have an account? " : 'Already configured? '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="font-medium text-gold-bright hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </form>
      )}
    </ModalShell>
  );
};
