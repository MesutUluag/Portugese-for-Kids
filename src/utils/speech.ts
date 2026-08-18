/**
 * Speak Portuguese text using Web Speech API.
 * Keeps a strong reference to the active utterance to prevent garbage collection in Chrome.
 */

// Keep a reference to the active utterance to prevent garbage collection in Chrome/Chromium
let activeUtterance: SpeechSynthesisUtterance | null = null;

type SpeechOptions = {
  rate?: number;
};

export function speakText(text: string, options: SpeechOptions = {}): void {
  console.log('[Audio] speakText called with:', text, options);
  if (!text || !text.trim()) return;

  if ('speechSynthesis' in window && window.speechSynthesis) {
    console.log('[Audio] speechSynthesis available in window');
    startUtterance(text, options);
    return;
  }

  console.warn('[Audio] speechSynthesis not available in this browser');
}

function startUtterance(text: string, options: SpeechOptions): void {
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    utterance.rate = options.rate ?? 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Find a Portuguese voice
    const voices = window.speechSynthesis.getVoices();
    console.log(`[Audio] Current getVoices() length: ${voices.length}`);
    const portugueseVoice =
      voices.find((v) => v.lang === 'pt-PT') ??
      voices.find((v) => v.lang.startsWith('pt')) ??
      voices.find((v) => v.name.toLowerCase().includes('portuguese'));

    if (portugueseVoice) {
      console.log('[Audio] Found Portuguese voice:', portugueseVoice.name, portugueseVoice.lang);
      utterance.voice = portugueseVoice;
    } else {
      console.warn('[Audio] No Portuguese voice found, using default voice');
    }

    utterance.onstart = () => {
      console.log('[Audio] ✓ Speaking started:', text);
    };

    utterance.onend = () => {
      console.log('[Audio] ✓ Finished speaking:', text);
      if (activeUtterance === utterance) {
        activeUtterance = null;
      }
    };

    utterance.onerror = (event) => {
      if (activeUtterance === utterance) {
        activeUtterance = null;
      }

      console.warn('[Audio] ✗ Speech onerror event triggered:', event.error, 'for text:', text);

      // Ignore expected errors from cancel() or autoplay blocks
      if (event.error === 'interrupted' || event.error === 'canceled') {
        console.log('[Audio] Speech canceled/interrupted:', text);
        return;
      }

      if (event.error === 'not-allowed') {
        console.warn('[Audio] Speech blocked (interaction required):', text);
        return;
      }
    };

    // Store reference to prevent garbage collection in Chrome
    activeUtterance = utterance;

    // Unpause the speech synthesis engine if it is paused
    if (window.speechSynthesis.paused) {
      console.log('[Audio] speechSynthesis is paused, calling resume()');
      window.speechSynthesis.resume();
    }

    window.speechSynthesis.cancel();
    console.log('[Audio] Calling window.speechSynthesis.speak() for:', text);
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('[Audio] ✗ Web Speech API error:', error);
  }
}

