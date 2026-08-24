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
  if ('speechSynthesis' in window && window.speechSynthesis) {
    startUtterance(text, options);
  }
}

function startUtterance(text: string, options: SpeechOptions): void {
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    utterance.rate = options.rate ?? 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const portugueseVoice =
      voices.find((v) => v.lang === 'pt-PT') ??
      voices.find((v) => v.lang.startsWith('pt')) ??
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

    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('[Speech] Web Speech API error:', error);
  }
}

