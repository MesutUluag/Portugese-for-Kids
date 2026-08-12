import { StoryPage, templatePages } from '../data/words';

export type AiState = 'pollinations' | 'template' | null;

export async function initAI(
  onStatusChange: (text: string, color: string) => void
): Promise<AiState> {
  onStatusChange('🌸 Pollinations AI (Free, No Key)', '#8b5cf6');
  return 'pollinations';
}

const POLLINATIONS_PROMPT = `Generate 1 short A1 level European Portuguese sentence for kids. The sentence must describe a realistic, everyday scene (e.g. animals in their natural habitat, people doing normal activities). Do NOT mix unrelated subjects and places (e.g. no fish in gardens, no cats in the ocean). Include its English translation and 3 emojis that logically match the scene. Respond ONLY with raw JSON, no extra text: {"pt": "O gato dorme no sofá.", "en": "The cat sleeps on the sofa.", "mainEmoji": "🐱", "bgLeft": "🛋️", "bgRight": "😴"}`;

function parseStoryJson(raw: string): StoryPage {
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON found');
  return JSON.parse(match[0]) as StoryPage;
}

async function fetchWithTimeout(url: string, options: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;
let pollinationsBlockedUntil = 0;

async function fetchPollinationsStory(): Promise<StoryPage> {
  if (Date.now() < pollinationsBlockedUntil) {
    throw new Error('Pollinations blocked (402) — retry after cooldown');
  }

  // POST with explicit Authorization: Bearer anonymous — overrides any stored
  // browser key so authenticated users are not charged and get 402.
  const res = await fetchWithTimeout('https://text.pollinations.ai/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer anonymous',
    },
    body: JSON.stringify({
      model: 'openai-fast',
      messages: [{ role: 'user', content: POLLINATIONS_PROMPT }],
    }),
  }, 25000);

  if (res.status === 402) {
    pollinationsBlockedUntil = Date.now() + FOUR_HOURS_MS;
    throw new Error('Pollinations returned 402 — blocked for 4 hours');
  }

  if (!res.ok) throw new Error(`Pollinations error: ${res.status}`);
  const data = await res.json() as { choices?: { message?: { content?: string } }[] };
  const content = data?.choices?.[0]?.message?.content ?? '';
  return parseStoryJson(content);
}

function generateTemplateStoryPage(): StoryPage {
  return templatePages[Math.floor(Math.random() * templatePages.length)];
}

export async function getNewStoryPage(
  aiState: AiState,
  onStatusChange: (text: string, color: string) => void
): Promise<StoryPage> {
  if (aiState === 'pollinations') {
    try {
      return await fetchPollinationsStory();
    } catch (e) {
      console.warn('Pollinations story failed, falling back to template:', e);
      const msg = e instanceof Error && e.message.includes('402')
        ? '🧩 Template Engine (Pollinations limit — retry in 4h)'
        : '🧩 Template Engine (Pollinations failed)';
      onStatusChange(msg, '#0284c7');
    }
  }

  return generateTemplateStoryPage();
}
