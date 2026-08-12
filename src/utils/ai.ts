import { StoryPage, subjects, actions, chromePhrases } from '../data/words';

// Priority: 1) Chrome Built-in AI  2) Pollinations AI (free, no key)  3) Template fallback
export type AiState = 'chrome' | 'pollinations' | 'template' | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAILanguageModel(): any | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof w.LanguageModel !== 'undefined') return w.LanguageModel;
  if (w.ai?.languageModel) return w.ai.languageModel;
  return null;
}

export async function initAI(
  onStatusChange: (text: string, color: string) => void
): Promise<AiState> {
  onStatusChange('🔍 Checking AI...', '#0284c7');

  // 1. Chrome Built-in AI
  const LM = getAILanguageModel();
  if (LM) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let available: any = 'no';
      if (typeof LM.availability === 'function') available = await LM.availability();
      else if (typeof LM.capabilities === 'function') {
        const c = await LM.capabilities();
        available = c.available;
      }

      if (available === 'downloading') {
        onStatusChange('⏳ Gemini Nano downloading... (using fallback)', '#f59e0b');
        pollChromeAIReady(LM, onStatusChange);
        // fall through to try Pollinations
      } else if (available !== 'no' && available !== 'unavailable' && available !== 'downloadable') {
        onStatusChange('✨ Chrome Built-in AI (Gemini Nano On-Device)', '#10b981');
        return 'chrome';
      }
    } catch (e) {
      console.warn('Chrome AI probe failed:', e);
    }
  }

  // 2. Pollinations AI — simple HEAD check with manual timeout for broad browser compat
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const testUrl = `https://text.pollinations.ai/${encodeURIComponent('reply with the single word: ok')}`;
    const res = await fetch(testUrl, { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      onStatusChange('🌸 Pollinations AI (Free, No Key)', '#8b5cf6');
      return 'pollinations';
    }
  } catch (e) {
    console.warn('Pollinations probe failed:', e);
  }

  // 3. Template fallback
  onStatusChange('🧩 Template Engine (AI unavailable)', '#0284c7');
  return 'template';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pollChromeAIReady(LM: any, onStatusChange: (text: string, color: string) => void): void {
  const interval = setInterval(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let available: any = 'no';
      if (typeof LM.availability === 'function') available = await LM.availability();
      else if (typeof LM.capabilities === 'function') {
        const c = await LM.capabilities();
        available = c.available;
      }
      if (
        available !== 'no' &&
        available !== 'unavailable' &&
        available !== 'downloadable' &&
        available !== 'downloading'
      ) {
        clearInterval(interval);
        onStatusChange('✨ Chrome Built-in AI (Gemini Nano On-Device)', '#10b981');
      }
    } catch {
      clearInterval(interval);
    }
  }, 10000);
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
  // Try GET endpoint first
  try {
    const url = `https://text.pollinations.ai/${encodeURIComponent(POLLINATIONS_PROMPT)}?json=true`;
    const res = await fetchWithTimeout(url, {}, 25000);
    if (res.ok) return parseStoryJson(await res.text());
  } catch { /* fall through to POST */ }

  // Try OpenAI-compatible POST endpoint (different domain path, may bypass blocks)
  const res = await fetchWithTimeout('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'openai',
      messages: [{ role: 'user', content: POLLINATIONS_PROMPT }],
    }),
  }, 25000);
  if (!res.ok) throw new Error(`Pollinations POST error: ${res.status}`);
  const data = await res.json() as { choices?: { message?: { content?: string } }[] };
  const content = data?.choices?.[0]?.message?.content ?? '';
  return parseStoryJson(content);
}

async function fetchChromeBuiltInAIStory(): Promise<StoryPage> {
  const base = chromePhrases[Math.floor(Math.random() * chromePhrases.length)];
  const promptText = `Complete this JSON with 2 different emojis that fit the scene. Reply ONLY with JSON, nothing else: {"pt":"${base.pt}","en":"${base.en}","mainEmoji":"${base.mainEmoji}","bgLeft":"?","bgRight":"?"}`;
  const LM = getAILanguageModel();
  const session = await LM.create({ expectedInputLanguages: ['en'], expectedOutputLanguages: ['en'] });

  const result = await Promise.race<string>([
    session.prompt(promptText),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Chrome AI timed out after 15s')), 15000)
    ),
  ]);

  session.destroy();
  const match = result.match(/\{[\s\S]*?\}/);
  if (!match) throw new Error('No JSON found: ' + result);
  const parsed = JSON.parse(match[0]) as Partial<StoryPage>;
  return {
    pt: base.pt,
    en: base.en,
    mainEmoji: parsed.mainEmoji ?? base.mainEmoji,
    bgLeft: parsed.bgLeft ?? base.bgLeft,
    bgRight: parsed.bgRight ?? base.bgRight,
  };
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
  if (aiState === 'chrome') {
    try {
      return await fetchChromeBuiltInAIStory();
    } catch (e) {
      console.warn('Chrome AI story failed, falling back to template:', e);
      onStatusChange('🧩 Template Engine (Chrome AI timed out)', '#0284c7');
    }
  }

  if (aiState === 'pollinations') {
    try {
      return await fetchPollinationsStory();
    } catch (e) {
      console.warn('Pollinations story failed:', e);
    }
  }

  return generateTemplateStoryPage();
}
