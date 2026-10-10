/**
 * Client-side hero & Jarvis copy tailored to the visitor's source
 * (UTM parameters or document.referrer). Nothing is stored or sent anywhere.
 */

type ReferrerSource = 'linkedin' | 'github' | 'google' | 'twitter' | 'producthunt' | 'direct';

export interface PersonalizationState {
  subheadline: string;
  primaryCtaText: string;
  primaryCtaAction: 'signup' | 'demo';
  secondaryCtaText: string;
  jarvisSuggestedPrompt: string;
}

const COPY: Record<ReferrerSource, PersonalizationState> = {
  direct: {
    subheadline:
      'Autonomous multi-layered cognitive strata engineered to synthesize enterprise workflows with mathematical certainty and zero latency.',
    primaryCtaText: 'Get Started',
    primaryCtaAction: 'signup',
    secondaryCtaText: 'Explore Tiers',
    jarvisSuggestedPrompt: 'How does Multistrata’s Tri-Strata architecture eliminate operational latency?',
  },
  linkedin: {
    subheadline:
      'Eliminate operational friction across business units with sovereign autonomous strata engineered for enterprise leaders and mission-critical workflows.',
    primaryCtaText: 'Schedule Executive Demo',
    primaryCtaAction: 'demo',
    secondaryCtaText: 'Review Enterprise Tiers',
    jarvisSuggestedPrompt: 'Give me an executive briefing on how Multistrata automates cross-department workflows.',
  },
  github: {
    subheadline:
      'High-throughput cognitive strata featuring deterministic multi-agent consensus, real-time webhook ingestion, and zero-hallucination verification loops.',
    primaryCtaText: 'Inspect Strata Kernel',
    primaryCtaAction: 'signup',
    secondaryCtaText: 'Explore Architecture',
    jarvisSuggestedPrompt: 'Explain the Stratum I sensory ingest pipeline and consensus latency benchmarks.',
  },
  google: {
    subheadline:
      'Replace manual enterprise processes with intelligent multi-agent orchestration, instant automated dispatch, and mathematical certainty.',
    primaryCtaText: 'Start Autonomous Trial',
    primaryCtaAction: 'signup',
    secondaryCtaText: 'Compare Pricing (₱)',
    jarvisSuggestedPrompt: 'Which pricing tier is recommended for mid-market workflow automation?',
  },
  twitter: {
    subheadline:
      'Experience the next evolution of autonomous AI operations: self-correcting agents, zero-overhead consensus, and sovereign deployment.',
    primaryCtaText: 'Explore Platform',
    primaryCtaAction: 'signup',
    secondaryCtaText: 'View Live Telemetry',
    jarvisSuggestedPrompt: 'What makes Multistrata different from traditional LLM agents?',
  },
  producthunt: {
    subheadline:
      'Transform your company’s back-office and operations into an autonomous self-healing machine with 3 cognitive strata.',
    primaryCtaText: 'Try Multistrata AI',
    primaryCtaAction: 'signup',
    secondaryCtaText: 'Explore Tiers',
    jarvisSuggestedPrompt: 'Walk me through a 3-minute quickstart of Multistrata autonomous operations.',
  },
};

function detectReferrerSource(): ReferrerSource {
  const params = new URLSearchParams(window.location.search);
  const utm = (params.get('utm_source') || params.get('ref') || params.get('source') || '').toLowerCase();

  if (utm.includes('linkedin') || utm.includes('li')) return 'linkedin';
  if (utm.includes('github') || utm.includes('gh')) return 'github';
  if (utm.includes('google') || utm.includes('gads') || utm.includes('search')) return 'google';
  if (utm.includes('twitter') || utm.includes('x.com') || utm.includes('t.co')) return 'twitter';
  if (utm.includes('producthunt') || utm.includes('ph')) return 'producthunt';

  const ref = document.referrer.toLowerCase();
  if (ref.includes('linkedin.com')) return 'linkedin';
  if (ref.includes('github.com')) return 'github';
  if (ref.includes('google.')) return 'google';
  if (ref.includes('t.co') || ref.includes('twitter.com') || ref.includes('x.com')) return 'twitter';
  if (ref.includes('producthunt.com')) return 'producthunt';

  return 'direct';
}

export function getPersonalizedState(): PersonalizationState {
  return COPY[detectReferrerSource()];
}
