// Must be the first import so env vars are loaded before other modules read them.
import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateBrochurePdfBuffer } from './server/brochurePdf.ts';
import { buildBrochureEmail, BROCHURE_FILENAME } from './server/brochureEmail.ts';
import {
  ai,
  ALLOWED_MODELS,
  DEFAULT_MODEL,
  DEFAULT_SYSTEM_INSTRUCTION,
  buildFallbackReply,
} from './server/gemini.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// The brochure is static, so build it once instead of on every request.
const BROCHURE_PDF = generateBrochurePdfBuffer();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const errorMessage = (err: unknown, fallback: string) =>
  err instanceof Error && err.message ? err.message : fallback;

const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

app.use(express.json({ limit: '1mb' }));

// Health check (Cloud Run probe)
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', uptime: process.uptime(), timestamp: Date.now() });
});

app.get(['/api/brochure.pdf', '/multistrata-brochure.pdf'], (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${BROCHURE_FILENAME}"`);
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(BROCHURE_PDF);
});

// Email capture & brochure dispatch via Resend
app.post('/api/send-brochure', async (req: Request, res: Response) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';

  if (!email) {
    res.status(400).json({ success: false, error: 'Email address is required.' });
    return;
  }
  if (!EMAIL_REGEX.test(email)) {
    res.status(400).json({ success: false, error: 'Invalid email address format.' });
    return;
  }
  if (!resend) {
    console.error('RESEND_API_KEY is not defined in environment variables.');
    res.status(500).json({
      success: false,
      error: 'Email service is not configured (missing RESEND_API_KEY). Please configure it in your secrets and retry.',
    });
    return;
  }

  try {
    const appUrl = process.env.APP_URL || 'https://multistrata.dev';
    const downloadUrl = `${appUrl.replace(/\/$/, '')}/api/brochure.pdf`;
    const { subject, text, html } = buildBrochureEmail(appUrl, downloadUrl);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Multistrata AI <onboarding@resend.dev>',
      to: [email],
      subject,
      text,
      html,
      attachments: [{ filename: BROCHURE_FILENAME, content: BROCHURE_PDF }],
    });

    if (error) {
      console.error('Resend API error response:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to dispatch email via Resend API. Please try again.',
      });
      return;
    }

    res.json({ success: true, message: 'Brochure sent successfully.', emailId: data?.id });
  } catch (err) {
    console.error('Unexpected error in /api/send-brochure:', err);
    res.status(500).json({
      success: false,
      error: errorMessage(err, 'Internal server error while sending brochure. Please try again.'),
    });
  }
});

// Multi-turn chat
app.post('/api/chat', async (req: Request, res: Response) => {
  const {
    messages,
    model = DEFAULT_MODEL,
    systemInstruction = DEFAULT_SYSTEM_INSTRUCTION,
  } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'Messages array is required' });
    return;
  }

  const selectedModel = ALLOWED_MODELS.includes(model) ? model : DEFAULT_MODEL;

  if (!ai) {
    const lastUserMsg = messages[messages.length - 1]?.content || '';
    res.json({
      reply: buildFallbackReply(lastUserMsg, selectedModel),
      model: selectedModel,
      timestamp: timestamp(),
    });
    return;
  }

  try {
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: { systemInstruction, temperature: 0.7 },
    });

    res.json({ reply: response.text || '', model: selectedModel, timestamp: timestamp() });
  } catch (err) {
    console.error('Error generating Gemini response:', err);
    res.status(500).json({ error: errorMessage(err, 'Failed to generate response from Gemini API') });
  }
});

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    // Vite fingerprints everything under /assets, so it can be cached forever.
    app.use('/assets', express.static(path.join(distPath, 'assets'), { immutable: true, maxAge: '1y' }));
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Multistrata Server running at http://0.0.0.0:${PORT} in ${isProd ? 'production' : 'development'} mode`);
  });

  const handleShutdown = (signal: string) => {
    console.log(`Received ${signal}, closing server gracefully.`);
    server.close(() => {
      console.log('Server closed successfully.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

startServer();
