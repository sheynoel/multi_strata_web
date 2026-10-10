import React, { useState, useRef, useEffect } from 'react';
import { MultistrataLogo } from './MultistrataLogo';
import { playJarvisIntroGreeting } from '../utils/speechEngine';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Volume2,
  Copy,
  Check,
  Cpu,
  Settings2,
} from 'lucide-react';

const MODELS = [
  { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash', desc: 'General tasks (Recommended)' },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite', desc: 'Ultra-fast & instant latency' },
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', desc: 'Deep reasoning & complex tasks' },
] as const;

type GeminiModel = (typeof MODELS)[number]['id'];

interface RolePreset {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  systemInstruction: string;
}

const ROLE_PRESETS: RolePreset[] = [
  {
    id: 'jarvis-executive',
    name: 'Jarvis Executive Copilot',
    tagline: 'General autonomous orchestration & institutional intelligence',
    badge: 'Executive',
    systemInstruction:
      'You are Jarvis, the executive process intelligence copilot for Multistrata AI (multistrata.dev). You communicate in a composed, British, highly articulate, and institutional tone (reserved, precise, dry-witted, not robotic). Answer questions about Multistrata’s Tri-Strata cognitive architecture, autonomous sub-agents, and Philippine Peso (₱) pricing tiers (T1 ₱1,999/mo, T2 ₱4,999/mo, T3 ₱12,999/mo). Always maintain mathematical certainty.',
  },
  {
    id: 'formal-auditor',
    name: 'Formal Verification Auditor',
    tagline: 'Zero-hallucination compliance & invariant boundary checks',
    badge: 'Auditor',
    systemInstruction:
      'You are the Multistrata Formal Verification Auditor. You specialize in zero-hallucination guarantees, cryptographic audit trails, SOC-2 Type II verification, and mathematical invariant state enforcement. You analyze technical risks, compliance boundaries, and deterministic sandboxing.',
  },
  {
    id: 'treasury-quant',
    name: 'Treasury & Quant Architect',
    tagline: 'Financial process automation, FX routing & liquidity sweeps',
    badge: 'Quant',
    systemInstruction:
      'You are the Multistrata Treasury & Quant Architect. You specialize in autonomous multi-currency cash sweeps, real-time liquidity rebalancing, SWIFT/ERP reconciliation, and risk neutralization in Philippine Pesos (₱) and APAC currencies with zero execution slippage.',
  },
  {
    id: 'strata-engineer',
    name: 'DevOps & Pipeline Architect',
    tagline: 'Webhook streaming, REST APIs & sub-50ms execution loops',
    badge: 'Architect',
    systemInstruction:
      'You are the Multistrata DevOps & Pipeline Architect. You assist developers with API integration, webhook ingestion into Stratum I, event-driven agent deliberation, Docker/Kubernetes sovereign cluster setups, and sub-50ms execution loops.',
  },
];

interface ChatAction {
  label: string;
  /** Personalised suggestion, marked with an icon. */
  suggested?: boolean;
  /** Tier id to open checkout for; otherwise the label is sent as a prompt. */
  tierId?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
  modelUsed?: string;
  actions?: ChatAction[];
}

interface JarvisChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialPrompt?: string;
  onSelectTierFromChat: (tierId: string) => void;
  suggestedPrompt: string;
}

const WELCOME_GREETING = 'Welcome to MultiStrata AI where your operations can be Automated.';

const TIER_ACTIONS: ChatAction[] = [
  { label: 'View T2 Growth Plan (₱4,999)', tierId: 't2' },
  { label: 'View T1 Starter Plan (₱1,999)', tierId: 't1' },
];

const OFFLINE_REPLY =
  'I apologize, but I am experiencing a brief telemetry interruption across the cognitive cluster. In summary: Multistrata provides sovereign tri-strata orchestration from ₱1,999/mo (T1 Starter) to ₱12,999/mo (T3 Enterprise), ensuring zero latency and deterministic audit compliance.';

const currentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const ICON_BUTTON = 'rounded-md p-2 text-stone transition-colors hover:bg-ivory/5';
const optionCardClass = (selected: boolean) =>
  `rounded-md p-3 text-left transition-[box-shadow,background-color] ${
    selected ? 'bg-dial-800 text-ivory ring-1 ring-gold/60' : 'bg-dial-950 text-ivory-dim ring-1 ring-line hover:ring-line-strong'
  }`;

export const JarvisChatDrawer: React.FC<JarvisChatDrawerProps> = ({
  isOpen,
  onClose,
  onOpen,
  initialPrompt,
  onSelectTierFromChat,
  suggestedPrompt,
}) => {
  const [selectedModel, setSelectedModel] = useState<GeminiModel>('gemini-3.5-flash');
  const [selectedRole, setSelectedRole] = useState<RolePreset>(ROLE_PRESETS[0]);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content: WELCOME_GREETING,
      time: 'Just now',
      modelUsed: 'gemini-3.5-flash',
      actions: [
        { label: suggestedPrompt, suggested: true },
        { label: 'Explain Tri-Strata Architecture' },
        { label: 'Compare Pricing Tiers (PHP)' },
        { label: 'How does autonomous remediation work?' },
        { label: 'Zero-hallucination verification proof' },
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialPrompt && isOpen) handleSendMessage(initialPrompt);
  }, [initialPrompt]);

  // On phones the launcher would sit on top of the hero buttons; keep it tucked away until they scroll off.
  const [heroActionsVisible, setHeroActionsVisible] = useState(false);
  useEffect(() => {
    const target = document.getElementById('hero-actions');
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setHeroActionsVisible(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (customText?: string) => {
    const text = (customText || inputVal).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: 'user', content: text, time: currentTime() };
    const history = [...messages, userMessage];

    setMessages(history);
    if (!customText) setInputVal('');
    setIsLoading(true);

    let reply = OFFLINE_REPLY;
    let actions: ChatAction[] | undefined;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Gemini expects the conversation to open with a user turn, so skip the canned greeting.
          messages: history
            .slice(history.findIndex((m) => m.role === 'user'))
            .map(({ role, content }) => ({ role, content })),
          model: selectedModel,
          systemInstruction: selectedRole.systemInstruction,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to communicate with Jarvis');

      reply = data.reply;
      if (/tier|pricing/i.test(text)) actions = TIER_ACTIONS;
    } catch (err) {
      console.error('Chat error:', err);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
        time: currentTime(),
        modelUsed: selectedModel,
        actions,
      },
    ]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Reset complete. Operating under the persona: ${selectedRole.name}. Ready for next telemetry directive.`,
        time: 'Just now',
        modelUsed: selectedModel,
        actions: [{ label: 'Explain Tri-Strata Architecture' }, { label: 'Compare Pricing Tiers (PHP)' }],
      },
    ]);
  };

  return (
    <>
      {/* Floating Brand Gradient Launch Button */}
      {!isOpen && (
        <div
          className={`fixed bottom-5 right-5 z-40 transition-[opacity,transform] duration-300 ease-out-expo sm:bottom-6 sm:right-6 ${
            heroActionsVisible ? 'max-sm:pointer-events-none max-sm:translate-y-3 max-sm:opacity-0' : ''
          }`}
        >
          <button
            onClick={onOpen}
            className="group relative flex items-center gap-3 rounded-panel bg-dial-850/95 p-2.5 pr-3 shadow-[0_1px_0_rgb(242_239_232/0.08)_inset,0_18px_40px_-14px_rgb(0_0_0/0.95)] ring-1 ring-gold/45 backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:-translate-y-px hover:ring-gold/80 sm:pl-3 sm:pr-4"
            aria-label="Open Jarvis Gemini AI Chatbot"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-dial-950 ring-1 ring-line">
              <MultistrataLogo size={24} glow={false} interactive={false} />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-gold-bright ring-2 ring-dial-850" aria-hidden="true" />
            </span>

            <span className="hidden flex-col text-left sm:flex">
              <span className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ivory">Jarvis AI</span>
              <span className="text-[0.6875rem] text-stone">Multi-Turn Copilot Online</span>
            </span>

            <ChevronRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      )}

      {/* Slide-in Chat Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            onClick={onClose}
            className="absolute inset-0 bg-dial-950/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Jarvis AI Copilot"
            className={`animate-in relative z-10 flex h-full flex-col justify-between bg-dial-900 shadow-[-30px_0_80px_-20px_rgb(0_0_0/0.95)] ring-1 ring-line transition-[max-width] duration-300 ${
              isFullscreen ? 'w-full max-w-4xl' : 'w-full max-w-xl'
            }`}
          >
            {/* Top Navigation */}
            <div className="border-b border-line bg-dial-950 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex rounded-full bg-dial-900 p-1.5 ring-1 ring-gold/30">
                    <MultistrataLogo size={30} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-[0.9375rem] font-semibold text-ivory">
                        Jarvis AI Copilot
                      </h3>
                      <span className="rounded-sm px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gold-bright ring-1 ring-gold/40">
                        {selectedRole.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[0.75rem] text-stone">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" aria-hidden="true" />
                      <span>{selectedModel} • Active</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsConfigOpen(!isConfigOpen)}
                    title="Configure Model & Role"
                    aria-label="Configure Model & Role"
                    aria-expanded={isConfigOpen}
                    className={
                      isConfigOpen
                        ? 'rounded-md bg-dial-800 p-2 text-gold-bright ring-1 ring-gold/50 transition-colors'
                        : `${ICON_BUTTON} hover:text-gold-pale`
                    }
                  >
                    <Settings2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    title={isFullscreen ? 'Collapse panel' : 'Expand panel'}
                    aria-label={isFullscreen ? 'Collapse panel' : 'Expand panel'}
                    className={`${ICON_BUTTON} hidden hover:text-ivory sm:block`}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={resetChat}
                    title="Reset conversation thread"
                    aria-label="Reset conversation thread"
                    className={`${ICON_BUTTON} hover:text-gold-pale`}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button onClick={onClose} aria-label="Close chat" className={`${ICON_BUTTON} hover:text-ivory`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {isConfigOpen && (
                <div className="animate-in mt-4 space-y-5 border-t border-line pt-4">
                  <div>
                    <label className="mb-2.5 block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">
                      Select Gemini Model:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {MODELS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedModel(m.id)}
                          className={optionCardClass(selectedModel === m.id)}
                        >
                          <div className="text-[0.8125rem] font-semibold text-gold-bright">{m.name}</div>
                          <div className="mt-0.5 text-[0.6875rem] text-stone">{m.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2.5 block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">
                      System Role & Persona:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ROLE_PRESETS.map((role) => (
                        <button
                          key={role.id}
                          onClick={() => setSelectedRole(role)}
                          className={optionCardClass(selectedRole.id === role.id)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[0.8125rem] font-semibold text-ivory">{role.name}</span>
                            <span className="rounded-sm px-1.5 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-gold-bright ring-1 ring-gold/35">
                              {role.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-[0.6875rem] leading-snug text-stone">
                            {role.tagline}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-dial-950 text-gold-bright ring-1 ring-gold/40">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-[10px] p-4 text-[0.875rem] leading-relaxed sm:p-5 ${
                      msg.role === 'user'
                        ? 'rounded-tr-sm bg-dial-700 text-ivory ring-1 ring-gold/30'
                        : 'rounded-tl-sm bg-dial-850 text-ivory ring-1 ring-line'
                    }`}
                  >
                    {msg.role === 'assistant' && msg.modelUsed && (
                      <div className="mb-2.5 flex items-center justify-between border-b border-line pb-2 font-mono text-[0.6875rem] text-stone">
                        <span className="flex items-center gap-1">
                          <Cpu className="w-3 h-3" />
                          <span>{msg.modelUsed}</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => playJarvisIntroGreeting(msg.content)}
                            title="Read aloud via AI Assistant voice"
                            aria-label="Read aloud via AI Assistant voice"
                            className="rounded p-1 text-stone transition-colors hover:bg-ivory/5 hover:text-gold-pale"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopyText(msg.id, msg.content)}
                            title="Copy message"
                            aria-label="Copy message"
                            className="rounded p-1 text-stone transition-colors hover:bg-ivory/5 hover:text-gold-pale"
                          >
                            {copiedId === msg.id ? (
                              <Check className="h-3.5 w-3.5 text-gold-bright" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="whitespace-pre-line space-y-2">{msg.content}</div>

                    {msg.actions && (
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3.5">
                        {msg.actions.map((act, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (act.tierId) {
                                onSelectTierFromChat(act.tierId);
                                onClose();
                              } else {
                                handleSendMessage(act.label);
                              }
                            }}
                            className="flex items-center gap-1.5 rounded-md bg-dial-950 px-2.5 py-1.5 text-left text-[0.75rem] font-medium text-ivory-dim ring-1 ring-line transition-[box-shadow,color] hover:text-gold-pale hover:ring-gold/50"
                          >
                            {act.suggested ? (
                              <Zap className="h-3 w-3 shrink-0 text-gold-bright" aria-hidden="true" />
                            ) : (
                              <Sparkles className="h-3 w-3 shrink-0 text-gold" aria-hidden="true" />
                            )}
                            <span>{act.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 text-right text-[0.6875rem] text-stone">
                      {msg.time}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-dial-800 text-ivory-dim ring-1 ring-line-strong">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3 text-[0.75rem] text-stone" role="status">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dial-950 ring-1 ring-gold/40">
                    <MultistrataLogo size={24} animated={false} interactive={false} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-dial-850 p-3 ring-1 ring-line">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-deep [animation-delay:0.4s]" />
                    <span className="ml-2 text-[0.75rem] text-stone">
                      Gemini ({selectedModel}) synthesizing multi-strata reasoning...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="border-t border-line bg-dial-950 p-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask ${selectedRole.name} on ${selectedModel}...`}
                  disabled={isLoading}
                  aria-label="Message Jarvis"
                  className="h-12 w-full rounded-md bg-dial-900 pl-4 pr-12 text-[0.875rem] text-ivory outline-none ring-1 ring-line-strong transition-[box-shadow] focus:ring-2 focus:ring-gold"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputVal.trim() || isLoading}
                  className={`absolute right-1.5 rounded-md p-2 transition-colors ${
                    inputVal.trim() && !isLoading ? 'metal-plate text-dial-950 hover:bg-gold-bright' : 'cursor-not-allowed bg-ivory/5 text-stone'
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-2.5 flex items-center justify-between px-1 text-[0.6875rem] text-stone">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  <span>Zero-hallucination verified</span>
                </span>
                <span className="flex items-center gap-2">
                  <span>Press Enter ↵</span>
                  <span className="text-gold-deep" aria-hidden="true">•</span>
                  <span className="font-mono text-gold">{selectedModel}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
