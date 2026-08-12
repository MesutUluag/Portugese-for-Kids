import { StoryPage, subjects, actions } from '../data/words';

export type AiState = 'pollinations' | 'template' | null;

export async function initAI(
  onStatusChange: (text: string, color: string) => void
): Promise<AiState> {
  onStatusChange('🌸 Pollinations AI (Free, No Key)', '#8b5cf6');
  return 'pollinations';
}

const POLLINATIONS_PROMPT = `Generate 1 short A1 level European Portuguese sentence for kids with its English translation and 3 fitting emojis. Respond ONLY with raw JSON, no extra text: {"pt": "O gato dorme no sofá.", "en": "The cat sleeps on the sofa.", "mainEmoji": "🐱", "bgLeft": "🛋️", "bgRight": "😴"}`;

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

async function fetchPollinationsStory(): Promise<StoryPage> {
  // Simple GET — same pattern as image.pollinations.ai, works on all devices including phones
  const url = `https://text.pollinations.ai/${encodeURIComponent(POLLINATIONS_PROMPT)}?model=openai&json=true`;
  const res = await fetchWithTimeout(url, {}, 25000);
  if (!res.ok) throw new Error(`Pollinations error: ${res.status}`);
  return parseStoryJson(await res.text());
}

function generateTemplateStoryPage(): StoryPage {
  const subj = subjects[Math.floor(Math.random() * subjects.length)];
  const act = actions[Math.floor(Math.random() * actions.length)];
  return {
    mainEmoji: subj.emoji,
    bgLeft: act.leftBg,
    bgRight: act.rightBg,
    pt: `${subj.pt} ${act.pt}!`,
    en: `${subj.en} ${act.en}!`,
  };
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
      onStatusChange('🧩 Template Engine (Pollinations failed)', '#0284c7');
    }
  }

  return generateTemplateStoryPage();
}
