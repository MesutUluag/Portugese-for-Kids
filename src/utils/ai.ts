import { StoryPage, templatePages } from '../data/words';

export type AiState = 'backend' | 'template' | null;

const BACKEND_URL = 'https://portugese-for-kids-backend-784137631227.us-central1.run.app/api/story';
const SCHOOL_TOPICS = [
  'greeting the teacher',
  'greeting classmates',
  'introducing yourself',
  'answering a classroom question',
  'asking what something means',
  'asking to repeat',
  'saying you are ready',
  'saying you do not understand',
  'asking for help',
  'asking where a book or notebook is',
  'talking to a friend',
  'talking at lunch',
  'talking at break time',
  'talking in the playground',
  'talking about feelings at school',
  'hearing a teacher command such as sit down, stand up, open your book, close your notebook, look at the board, write your name, raise your hand, or be quiet',
] as const;

export async function initAI(
  onStatusChange: (text: string, color: string) => void
): Promise<AiState> {
  onStatusChange('🤖 Backend AI', '#8b5cf6');
  return 'backend';
}

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

async function fetchBackendStory(): Promise<StoryPage> {
  const topic = SCHOOL_TOPICS[Math.floor(Math.random() * SCHOOL_TOPICS.length)];
  const res = await fetchWithTimeout(BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `Generate one useful school sentence for kids about ${topic}.`,
    }),
  }, 25000);

  if (!res.ok) throw new Error(`Backend AI error: ${res.status}`);
  const data = await res.json() as { content?: string };
  return parseStoryJson(data.content ?? '');
}

function generateTemplateStoryPage(): StoryPage {
  return templatePages[Math.floor(Math.random() * templatePages.length)];
}

export async function getNewStoryPage(
  aiState: AiState,
  onStatusChange: (text: string, color: string) => void
): Promise<StoryPage> {
  if (aiState === 'backend') {
    try {
      return await fetchBackendStory();
    } catch (e) {
      console.warn('Backend story failed, falling back to template:', e);
      onStatusChange('🧩 Template Engine (Backend AI failed)', '#0284c7');
    }
  }

  return generateTemplateStoryPage();
}
