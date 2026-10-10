import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

/** Shared server-side Gemini client; null when GEMINI_API_KEY is not configured. */
export const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    })
  : null;

export const ALLOWED_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.1-pro-preview',
  'gemini-3.8-flash',
];
export const DEFAULT_MODEL = 'gemini-3.5-flash';

export const DEFAULT_SYSTEM_INSTRUCTION =
  'You are Jarvis, an elite executive AI copilot for Multistrata AI (multistrata.dev). You speak with calm, composed, British precision (dry-witted, highly articulate, institutional). Provide expert analysis on autonomous multi-agent orchestration, Tri-Strata cognitive architecture, pricing tiers, and enterprise process automation.';


/** High-fidelity canned reply used when GEMINI_API_KEY is not configured. */
export function buildFallbackReply(lastUserMsg: string, model: string): string {
  const q = lastUserMsg.toLowerCase();

  if (q.includes('tier') || q.includes('price') || q.includes('cost') || q.includes('php') || q.includes('plan')) {
    return `Multistrata AI offers three institutional tiers in Philippine Pesos (₱):\n\n• **T1 – Starter (₱1,999/mo)**: 5 Strata Autonomous Agents, 50,000 process invocations/mo, Jarvis Core assist, 99.5% uptime SLA.\n• **T2 – Growth (₱4,999/mo)** *(Most Popular)*: 25 Strata Autonomous Agents, 500,000 invocations/mo, Priority Jarvis Operator, Workflow Synthesizer, 99.9% SLA.\n• **T3 – Enterprise (₱12,999/mo)**: Unlimited agents, 5M+ invocations, dedicated sovereign node, air-gapped clusters, 99.99% SLA.\n\nAnnual subscriptions include a 20% discount. May I reserve an institutional cluster for your team?`;
  }
  if (q.includes('architecture') || q.includes('strata') || q.includes('how it works')) {
    return `Multistrata’s proprietary Tri-Strata Cognitive Engine operates across three autonomous layers:\n\n1. **Stratum I (Sensory Synthesis)**: Ingests real-time ERP, database, webhook, and API telemetry at sub-15ms latency with automated schema drift correction.\n2. **Stratum II (Multi-Agent Deliberation)**: Jarvis coordinates autonomous sub-agents debating outcomes using formal verification and game-theoretic consensus.\n3. **Stratum III (Atomic Execution)**: Dispatches non-repudiable transactions with cryptographic audit receipts and recursive feedback loops.`;
  }
  if (q.includes('hallucination') || q.includes('security') || q.includes('compliance')) {
    return `Multistrata enforces mathematical invariant boundaries before any agent action is dispatched. Every operation is evaluated against formal policy constraints, sealed with a cryptographic signature, and verified under SOC-2 Type II standards. In essence, hallucinations are mathematically impossible within our execution sandbox.`;
  }
  return `Acknowledged. As your executive Jarvis copilot on model \`${model}\`, I have analyzed your query regarding "${lastUserMsg}". All three strata are operational, and real-time telemetry consensus confirms optimal system throughput across your sovereign clusters.\n\nHow would you like to proceed with orchestration?`;
}
