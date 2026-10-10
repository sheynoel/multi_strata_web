/**
 * Jarvis voice (Web Speech API) and short HUD sound effects (Web Audio API).
 * The voice prefers natural British male voices and falls back gracefully.
 */

interface VoiceOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

const PREFERRED_VOICES = [
  'microsoft ryan',
  'daniel',
  'microsoft oliver',
  'microsoft george',
  'microsoft arthur',
  'google uk english male',
  'google uk english',
  'malcolm',
  'oliver',
  'george',
  'arthur',
];
const EXCLUDED_VOICE = /female|woman|girl|hazel|sonia|libby|abbi|samantha|victoria|zira|susan|stephanie|mia|sarah|karen|fiona|espeak/;
const NON_BRITISH_LANG = /^en-(us|au|in|ca|za)/;

// Chrome loads voices lazily; asking once up front means they are ready by the first click.
if ('speechSynthesis' in window) window.speechSynthesis.getVoices();

function getJarvisVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis
    .getVoices()
    .map((v) => ({ v, name: v.name.toLowerCase(), lang: v.lang.toLowerCase().replace('_', '-') }))
    .filter(({ name, lang }) => !EXCLUDED_VOICE.test(name) && !NON_BRITISH_LANG.test(lang));

  for (const preferred of PREFERRED_VOICES) {
    const match = voices.find(({ name }) => name.includes(preferred));
    if (match) return match.v;
  }

  const british = voices.filter(({ lang }) => lang.startsWith('en-gb'));
  const match =
    british.find(({ name }) => /male|natural|neural/.test(name)) ??
    british[0] ??
    voices.find(({ name }) => /ryan|daniel|oliver|george|arthur|guy|male/.test(name));
  return match?.v ?? window.speechSynthesis.getVoices()[0] ?? null;
}

/** Rewrites markdown, currency and acronyms so they are spoken naturally. */
function prepareSpeechText(rawText: string): string {
  return rawText
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/₱\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*[Mm]\b/g, '$1 million pesos')
    .replace(/₱\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*[Kk]\b/g, '$1 thousand pesos')
    .replace(/₱\s*(\d+(?:,\d+)*(?:\.\d+)?)/g, '$1 pesos')
    .replace(/\bMoM\b/g, 'month over month')
    .replace(/\bYoY\b/g, 'year over year')
    .replace(/\bSOC-2\b/gi, 'SOC 2')
    .replace(/\bAPIs\b/g, 'A P Is')
    .replace(/\b(API|ERP|AWS|HUD|CTO|VP)\b/g, (acronym) => acronym.split('').join(' '))
    .replace(/\bMultiStrata AI where\b/gi, 'Multi-Strata A.I., where')
    .replace(/\bMultiStrata\b/gi, 'Multi-Strata')
    .replace(/\bAI\b/g, 'A.I.')
    .replace(/;\s*/g, ', ')
    .replace(/[—–]/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Speaks text in the Jarvis voice. Returns false when speech synthesis is unavailable. */
export function playJarvisIntroGreeting(text: string, options: VoiceOptions = {}): boolean {
  if (!('speechSynthesis' in window)) return false;

  try {
    const synth = window.speechSynthesis;
    if (synth.paused) synth.resume();
    if (synth.speaking || synth.pending) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(prepareSpeechText(text));
    utterance.pitch = 0.84;
    utterance.rate = 0.84;

    const voice = getJarvisVoice();
    utterance.voice = voice;
    utterance.lang = voice?.lang || 'en-GB';

    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;

    synth.speak(utterance);
    return true;
  } catch (err) {
    console.warn('AI voice synthesis could not play:', err);
    return false;
  }
}

interface Tone {
  type: OscillatorType;
  /** Start frequency, and optional end frequency for an exponential sweep. */
  freq: [number, number?];
  gain: number;
  /** Offset from "now" when the tone starts. */
  start: number;
  /** Time (from start) for the frequency sweep to finish. */
  sweep?: number;
  /** Time (from start) for the gain to decay to silence. */
  decay: number;
}

// One shared context: browsers cap how many AudioContexts a page may create.
let audioCtx: AudioContext | null = null;

function playTones(tones: Tone[]) {
  try {
    audioCtx ??= new AudioContext();
    if (audioCtx.state === 'suspended') void audioCtx.resume();
    const now = audioCtx.currentTime;

    for (const { type, freq, gain, start, sweep, decay } of tones) {
      const t = now + start;
      const osc = audioCtx.createOscillator();
      const amp = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq[0], t);
      if (freq[1] && sweep) osc.frequency.exponentialRampToValueAtTime(freq[1], t + sweep);
      amp.gain.setValueAtTime(gain, t);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + decay);
      osc.connect(amp).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + decay + 0.02);
    }
  } catch {
    // Audio is decorative; ignore failures.
  }
}

/** Rising D5 → A5 → D6 HUD chime with a soft sub-bass pulse. */
export function playHolographicChime() {
  playTones([
    { type: 'sine', freq: [587.33], gain: 0.045, start: 0, decay: 0.055 },
    { type: 'sine', freq: [880], gain: 0.05, start: 0.065, decay: 0.06 },
    { type: 'sine', freq: [1174.66], gain: 0.06, start: 0.135, decay: 0.245 },
    { type: 'sine', freq: [65], gain: 0.08, start: 0, decay: 0.35 },
  ]);
}

/** Crisp golden digital click. */
export function playSoftGoldenDigitalClick() {
  playTones([
    { type: 'triangle', freq: [1850, 3200], gain: 0.065, start: 0, sweep: 0.016, decay: 0.038 },
    { type: 'sine', freq: [3700, 4800], gain: 0.02, start: 0.002, sweep: 0.012, decay: 0.028 },
  ]);
}

/** Click, rising blip, shimmer and low pulse for card/tab activation. */
export function playCardActivationSound() {
  playTones([
    { type: 'triangle', freq: [1850, 3200], gain: 0.04, start: 0, sweep: 0.015, decay: 0.025 },
    { type: 'sine', freq: [540, 1080], gain: 0.05, start: 0.02, sweep: 0.1, decay: 0.2 },
    { type: 'sine', freq: [1620, 2160], gain: 0.018, start: 0.03, sweep: 0.07, decay: 0.15 },
    { type: 'sine', freq: [72, 50], gain: 0.065, start: 0, sweep: 0.45, decay: 0.48 },
  ]);
}
