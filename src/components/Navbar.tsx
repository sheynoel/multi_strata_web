import React, { useState, useEffect, useRef } from 'react';
import { MultistrataBrand } from './MultistrataLogo';
import { Menu, X, ArrowUpRight, LayoutDashboard, LogOut } from 'lucide-react';
import { buttonClass } from './ui';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'tiers', label: 'Tiers' },
  { id: 'brochure', label: 'Brochure' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  onOpenContact: () => void;
  onOpenBookDemo: () => void;
  currentUser?: string | null;
  onOpenAdmin?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenBookDemo,
  currentUser,
  onOpenAdmin,
  onLogout,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isNavigating = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigating.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScrollEnd = () => {
      isNavigating.current = false;
    };
    window.addEventListener('scrollend', handleScrollEnd);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    isNavigating.current = true;
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (id === 'contact') {
      onOpenContact();
      isNavigating.current = false;
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    // Fallback in case scrollend doesn't fire
    setTimeout(() => {
      isNavigating.current = false;
    }, 800);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-300 ease-out-expo border-b ${
        scrolled || mobileMenuOpen
          ? 'border-line bg-dial-950/90 py-3 backdrop-blur-md'
          : 'border-transparent bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
        <a
          href="#home"
          aria-label="MultiStrata AI, back to top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="rounded-md"
        >
          <MultistrataBrand />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-md px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-200 ${
                  isActive ? 'text-ivory' : 'text-stone hover:text-ivory'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`index-bar absolute bottom-0 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {currentUser ? (
            <>
              <button onClick={onOpenAdmin} className={buttonClass('secondary', 'sm')}>
                <LayoutDashboard className="h-3.5 w-3.5 text-gold" />
                <span>Admin Dashboard</span>
              </button>
              <button
                onClick={onLogout}
                className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-[0.8125rem] font-semibold text-alert transition-colors hover:bg-alert/10"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </>
          ) : null}

          <button onClick={onOpenBookDemo} className={buttonClass('primary', 'sm', 'group')}>
            Book a Demo
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2.5 text-ivory ring-1 ring-line-strong transition-colors hover:text-gold-pale lg:hidden"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-nav" className="animate-in border-t border-line px-5 pb-6 pt-3 lg:hidden">
          <nav aria-label="Primary" className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex items-center justify-between border-b border-line py-4 text-left text-base font-medium text-ivory transition-colors hover:text-gold-pale"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-gold" />
              </button>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-2.5">
            {currentUser && (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin?.();
                  }}
                  className={buttonClass('secondary', 'md', 'w-full')}
                >
                  Admin Dashboard
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout?.();
                  }}
                  className="h-11 w-full rounded-md text-sm font-semibold text-alert ring-1 ring-alert/40"
                >
                  Logout
                </button>
              </>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookDemo();
              }}
              className={buttonClass('primary', 'md', 'w-full')}
            >
              Book a Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
