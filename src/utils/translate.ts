/**
 * English → Turkish translation utility.
 *
 * Primary:  Chrome Built-in Translation API (window.ai.translator) — Chrome 131+ with flag
 * Fallback: MyMemory free public translation API (no key required, 1000 req/day)
 * Last resort: returns original English text unchanged
 */

// TypeScript types for the Chrome AI Translation API (not yet in lib.dom.d.ts)
declare global {
  interface Window {
    ai?: {
      translator?: AITranslatorFactory;
    };
  }
}

interface CanTranslateOptions {
  sourceLanguage: string;
  targetLanguage: string;
}

interface CanTranslateResult {
  available: 'readily' | 'after-download' | 'no';
}

interface AITranslator {
  translate(input: string): Promise<string>;
}

interface AITranslatorFactory {
  canTranslate(options: CanTranslateOptions): Promise<CanTranslateResult>;
  createTranslator(options: CanTranslateOptions): Promise<AITranslator>;
}

function canUseChromeTranslationAPI(): boolean {
  return typeof window !== 'undefined' &&
    window.ai?.translator != null &&
    typeof window.ai.translator.createTranslator === 'function';
}

async function translateViaChromeAI(text: string): Promise<string> {
  const availability = await window.ai!.translator!.canTranslate({
    sourceLanguage: 'en',
    targetLanguage: 'tr',
  });
  if (availability.available === 'no') throw new Error('en→tr not supported');
  const translator = await window.ai!.translator!.createTranslator({
    sourceLanguage: 'en',
    targetLanguage: 'tr',
  });
  return translator.translate(text);
}

async function translateViaMyMemory(text: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|tr`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
    const data = await res.json() as { responseData?: { translatedText?: string }; responseStatus?: number };
    if (data.responseStatus !== 200 || !data.responseData?.translatedText) {
      throw new Error('MyMemory returned no translation');
    }
    return data.responseData.translatedText;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Translates an English string to Turkish.
 * Tries Chrome AI first, falls back to MyMemory, then returns original text.
 */
export async function translateToTurkish(text: string): Promise<string> {
  if (!text) return text;

  if (canUseChromeTranslationAPI()) {
    try {
      return await translateViaChromeAI(text);
    } catch (e) {
      console.warn('[Translation] Chrome AI failed, falling back to MyMemory:', e);
    }
  }

  try {
    return await translateViaMyMemory(text);
  } catch (e) {
    console.warn('[Translation] MyMemory failed, showing original text:', e);
  }

  return text;
}
