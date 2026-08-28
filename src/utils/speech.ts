/**
 * Speak Portuguese text using Web Speech API.
 * Keeps a strong reference to the active utterance to prevent garbage collection in Chrome.
 */

// Keep a reference to the active utterance to prevent garbage collection in Chrome/Chromium
let activeUtterance: SpeechSynthesisUtterance | null = null;

type SpeechOptions = {
  rate?: number;
};

export function cancelSpeech(): void {
  if ('speechSynthesis' in window && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  activeUtterance = null;
}

export function speakText(text: string, options: SpeechOptions = {}): void {
  if (!text || !text.trim()) return;
  if (!('speechSynthesis' in window) || !window.speechSynthesis) return;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    // Voices already loaded — speak immediately
    startUtterance(text, voices, options);
  } else {
    // Chrome loads voices asynchronously; wait for the voiceschanged event
    const onVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      startUtterance(text, window.speechSynthesis.getVoices(), options);
    };
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
  }
}

function startUtterance(text: string, voices: SpeechSynthesisVoice[], options: SpeechOptions): void {
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    utterance.rate = options.rate ?? 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const portugueseVoice =
      voices.find((v) => v.lang.toLowerCase() === 'pt-pt') ??
      voices.find((v) => v.lang.toLowerCase().startsWith('pt') && !v.lang.toLowerCase().includes('br')) ??
      voices.find((v) => v.name.toLowerCase().includes('portugal')) ??
      voices.find((v) => v.lang.toLowerCase().startsWith('pt')) ??
      voices.find((v) => v.name.toLowerCase().includes('portuguese'));

    if (portugueseVoice) utterance.voice = portugueseVoice;

    utterance.onend = () => {
      if (activeUtterance === utterance) activeUtterance = null;
    };

    utterance.onerror = (event) => {
      if (activeUtterance === utterance) activeUtterance = null;
      if (event.error === 'interrupted' || event.error === 'canceled' || event.error === 'not-allowed') return;
      console.warn('[Speech] error:', event.error, text);
    };

    activeUtterance = utterance;

    // Chrome bug: cancel() + speak() in the same call stack silently drops the utterance.
    // Deferring speak() by one tick after cancel() ensures Chrome actually fires it.
    window.speechSynthesis.cancel();
    setTimeout(() => {
      if (activeUtterance === utterance) {
        window.speechSynthesis.speak(utterance);
      }
    }, 50);
  } catch (error) {
    console.error('[Speech] Web Speech API error:', error);
  }
}
