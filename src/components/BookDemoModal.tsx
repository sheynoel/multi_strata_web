import React, { useState } from 'react';
import { MultistrataLogo } from './MultistrataLogo';
import { User, Mail, Building, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { ModalShell, Field, SuccessMessage, INPUT_CLASS, SUBMIT_BUTTON_CLASS } from './ModalShell';

export const BookDemoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <ModalShell onClose={onClose} widthClass="max-w-md">
      <div className="text-center space-y-3 mb-6">
        <div className="inline-flex rounded-full bg-dial-950 p-2.5 ring-1 ring-gold/30">
          <MultistrataLogo size={42} />
        </div>

        <h3 className="font-display text-2xl font-semibold text-ivory">Book a Demo</h3>

        <p className="text-[0.875rem] leading-relaxed text-ivory-dim">
          Schedule an executive walkthrough of Multistrata autonomous AI workflows.
        </p>
      </div>

      {isSubmitted ? (
        <>
          <SuccessMessage title="Thanks, we'll be in touch shortly.">
            Our solutions engineering team will review your details and confirm your demo appointment for{' '}
            <span className="text-gold-bright font-medium">{preferredDate || 'your preferred date'}</span>.
          </SuccessMessage>
          <button type="button" onClick={onClose} className={SUBMIT_BUTTON_CLASS}>
            Close
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Field
            label="Full Name"
            icon={User}
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Alexander Cross"
          />
          <Field
            label="Work Email"
            icon={Mail}
            type="email"
            required
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            placeholder="architect@institution.com"
          />
          <Field
            label="Company"
            icon={Building}
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Apex Horizons Capital"
          />
          <Field
            label="Preferred Date"
            icon={Calendar}
            type="date"
            required
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="[color-scheme:dark]"
          />

          <label className="block">
            <span className="mb-2 block text-[0.8125rem] font-medium text-ivory-dim">Message</span>
            <span className="relative flex items-start">
              <MessageSquare className="w-4 h-4 text-gold absolute left-3.5 top-3 pointer-events-none" />
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe your team's workflow automation goals..."
                className={`${INPUT_CLASS} h-auto resize-none py-2.5 pl-10 pr-3.5`}
              />
            </span>
          </label>

          <button type="submit" disabled={isSubmitting} className={`${SUBMIT_BUTTON_CLASS} mt-2`}>
            {isSubmitting ? (
              <span>Requesting Demo...</span>
            ) : (
              <>
                <span>Request Demo</span>
                <ArrowRight className="w-4 h-4 text-dial-950" />
              </>
            )}
          </button>
        </form>
      )}
    </ModalShell>
  );
};
