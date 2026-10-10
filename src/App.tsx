/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { GlowingDotsBackground } from './components/GlowingDotsBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
// TrustedBySection is unmounted until real testimonials exist; restore it below the brochure when ready.
import { FaqSection } from './components/FaqSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TiersSection, PlanTier, TIERS_DATA } from './components/TiersSection';
import { JarvisAISection } from './components/JarvisAISection';
import { BrochureCaptureSection } from './components/BrochureCaptureSection';
import { JarvisChatDrawer } from './components/JarvisChatDrawer';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { BookDemoModal } from './components/BookDemoModal';
import { ContactModal } from './components/ContactModal';
import { PlanCheckoutModal } from './components/PlanCheckoutModal';
import { LegalModal } from './components/LegalModal';
import { AdminConsole } from './components/AdminConsole';
import { Toast } from './components/Toast';
import { SectionDivider } from './components/SectionDivider';
import { getPersonalizedState } from './utils/personalization';

type Modal =
  | { kind: 'auth' }
  | { kind: 'demo' }
  | { kind: 'contact' }
  | { kind: 'admin' }
  | { kind: 'legal'; type: 'privacy' | 'terms' }
  | { kind: 'checkout'; tier: PlanTier; isAnnual: boolean };

const scrollToTiers = () => document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [modal, setModal] = useState<Modal | null>(null);
  const [personalizedState] = useState(getPersonalizedState);

  const [jarvisOpen, setJarvisOpen] = useState(false);
  const [jarvisInitialPrompt, setJarvisInitialPrompt] = useState<string>();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const triggerToast = (msg: string) => {
    clearTimeout(toastTimer.current);
    setToastMessage(msg);
    toastTimer.current = setTimeout(() => setToastMessage(null), 4500);
  };

  const closeModal = () => setModal(null);
  const openContact = () => setModal({ kind: 'contact' });
  const openDemo = () => setModal({ kind: 'demo' });

  const handleLogout = () => {
    setCurrentUser(null);
    closeModal();
    triggerToast('Session terminated. Sovereign cluster signed out.');
  };

  const handleSelectTier = (tier: PlanTier, isAnnual: boolean) => setModal({ kind: 'checkout', tier, isAnnual });

  const openJarvis = (prompt?: string) => {
    setJarvisInitialPrompt(prompt);
    setJarvisOpen(true);
  };

  const closeJarvis = () => {
    setJarvisOpen(false);
    // Clear so the same prompt can be sent again next time.
    setJarvisInitialPrompt(undefined);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip text-ivory">
      <GlowingDotsBackground />

      <Navbar
        onOpenContact={openContact}
        onOpenBookDemo={openDemo}
        currentUser={currentUser}
        onOpenAdmin={() => setModal({ kind: 'admin' })}
        onLogout={handleLogout}
      />

      <main className="relative z-10 flex flex-col">
        <HeroSection
          onGetStarted={() => setModal({ kind: 'auth' })}
          onExploreTiers={scrollToTiers}
          onOpenJarvis={() => openJarvis()}
          onOpenDemo={openDemo}
          personalizedState={personalizedState}
        />
        <SectionDivider />
        <JarvisAISection onOpenJarvisWithPrompt={openJarvis} />
        <SectionDivider />
        <HowItWorksSection />
        <SectionDivider />
        <TiersSection onSelectTier={handleSelectTier} />
        <SectionDivider />
        <BrochureCaptureSection
          onBrochureSent={(email) => triggerToast(`Executive brochure dispatched to ${email}. Check your inbox!`)}
        />
        <SectionDivider />
        <FaqSection onOpenDemo={openDemo} onAskJarvis={() => openJarvis()} />
        <SectionDivider />
      </main>

      <Footer onOpenContact={openContact} onOpenLegal={(type) => setModal({ kind: 'legal', type })} />

      <JarvisChatDrawer
        isOpen={jarvisOpen}
        onClose={closeJarvis}
        onOpen={() => openJarvis()}
        initialPrompt={jarvisInitialPrompt}
        onSelectTierFromChat={(tierId) =>
          handleSelectTier(TIERS_DATA.find((t) => t.id === tierId) ?? TIERS_DATA[1], false)
        }
        suggestedPrompt={personalizedState.jarvisSuggestedPrompt}
      />

      {modal?.kind === 'auth' && (
        <AuthModal
          onClose={closeModal}
          onSuccess={(email) => {
            setCurrentUser(email);
            triggerToast(`Authenticated successfully as ${email}. Sovereign cluster ready.`);
          }}
        />
      )}
      {modal?.kind === 'demo' && <BookDemoModal onClose={closeModal} />}
      {modal?.kind === 'contact' && <ContactModal onClose={closeModal} />}
      {modal?.kind === 'checkout' && (
        <PlanCheckoutModal
          tier={modal.tier}
          isAnnual={modal.isAnnual}
          onClose={closeModal}
          onSuccess={(tierName) =>
            triggerToast(`Plan ${tierName} provisioned. Your credentials were sent via secure dispatch.`)
          }
        />
      )}
      {modal?.kind === 'legal' && <LegalModal type={modal.type} onClose={closeModal} />}
      {modal?.kind === 'admin' && currentUser && (
        <AdminConsole currentUser={currentUser} onClose={closeModal} onLogout={handleLogout} />
      )}

      <Toast message={toastMessage} />
    </div>
  );
}
