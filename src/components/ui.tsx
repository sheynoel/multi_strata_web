import React from 'react';

/**
 * Shared dial-language primitives. Circles are instruments (orb, registers, toggles);
 * every other control and panel uses the 6px / 10px corner scale.
 */

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out-expo active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:active:translate-y-0';

const BUTTON_VARIANTS = {
  /** The one bright-gold action per view. */
  primary: 'metal-plate text-dial-950 hover:bg-gold-bright',
  /** Outlined companion action. */
  secondary: 'border border-line-strong bg-dial-950/40 text-ivory hover:border-gold/70 hover:text-gold-pale',
  /** Quiet text-weight action. */
  quiet: 'text-gold-bright hover:text-gold-pale',
} as const;

const BUTTON_SIZES = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[3.25rem] px-7 text-[0.9375rem]',
} as const;

export const buttonClass = (
  variant: keyof typeof BUTTON_VARIANTS = 'primary',
  size: keyof typeof BUTTON_SIZES = 'md',
  extra = ''
) => `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${extra}`.trim();

/** Small-caps dial printing with an applied index in front. */
export const DialLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`dial-print flex items-start gap-3 self-start ${className}`}>
    <span aria-hidden="true" className="index-bar mt-[0.3rem]" />
    <span>{children}</span>
  </p>
);

interface SectionHeaderProps {
  /** The section's former badge text, printed in the margin like dial text. */
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

/**
 * Margin-label header: the label sits in the left column on desktop and after the copy on
 * small screens, so it never stacks above the heading as an eyebrow.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ label, title, children, id, className = '' }) => (
  <header className={`grid gap-y-6 lg:grid-cols-12 lg:gap-x-10 ${className}`}>
    <DialLabel className="order-last lg:order-first lg:col-span-3 lg:pt-3.5">{label}</DialLabel>
    <div className="lg:col-span-9">
      <h2
        id={id}
        className="font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.04] text-ivory max-w-[18ch] sm:max-w-none"
        style={{ fontStretch: '92%' }}
      >
        {title}
      </h2>
      {children && <div className="mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ivory-dim">{children}</div>}
    </div>
  </header>
);

/** Section wrapper: one container width and vertical rhythm for every band of the page. */
export const Band: React.FC<React.HTMLAttributes<HTMLElement> & { as?: 'section' | 'div' }> = ({
  as: Tag = 'section',
  className = '',
  children,
  ...rest
}) => (
  <Tag className={`relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-24 sm:py-32 ${className}`} {...rest}>
    {children}
  </Tag>
);
