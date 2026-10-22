import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Shared GenAI client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health & AI status endpoint
  app.get('/api/status', (_req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(apiKey),
      model: 'gemini-3.8-flash',
      freeTierNote: 'Gemini 3.8 Flash operates on Google AI Studio free tier limits.',
    });
  });

  // AI Generation endpoint for Email Writer and Coach
  app.post('/api/gemini/generate', async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      if (!prompt) {
        return res.status(400).json({ success: false, error: 'Prompt is required' });
      }

      if (!ai) {
        return res.status(200).json({
          success: false,
          fallback: true,
          error: 'No GEMINI_API_KEY detected. Built-in instant logistics templates will be used.',
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: systemInstruction
          ? {
              systemInstruction,
            }
          : undefined,
      });

      const text = response.text || '';
      return res.json({ success: true, text });
    } catch (error: any) {
      console.error('Gemini generation error:', error);
      return res.status(500).json({
        success: false,
        error: error?.message || 'Failed to generate response',
      });
    }
  });

  // Vite integration
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LogiMate AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
