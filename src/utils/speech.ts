/**
 * Speak Portuguese text using Web Speech API.
 * Keeps a strong reference to the active utterance to prevent garbage collection in Chrome.
 */

// Keep a reference to the active utterance to prevent garbage collection in Chrome/Chromium
let activeUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(text: string): void {
  console.log('[Audio] speakText called with:', text);
  if (!text || !text.trim()) return;

  if ('speechSynthesis' in window && window.speechSynthesis) {
    console.log('[Audio] speechSynthesis available in window');
    startUtterance(text);
    return;
  }

  console.log('[Audio] speechSynthesis not available, trying ResponsiveVoice');
  tryResponsiveVoice(text);
}

function startUtterance(text: string): void {
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    utterance.rate = 0.85;
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

      tryResponsiveVoice(text);
    };

    // Store reference to prevent garbage collection in Chrome
    activeUtterance = utterance;

    // Unpause the speech synthesis engine if it is paused
    if (window.speechSynthesis.paused) {
      console.log('[Audio] speechSynthesis is paused, calling resume()');
      window.speechSynthesis.resume();
    }

    console.log('[Audio] Calling window.speechSynthesis.speak() for:', text);
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('[Audio] ✗ Web Speech API error:', error);
    tryResponsiveVoice(text);
  }
}

function tryResponsiveVoice(text: string): void {
  if (typeof (window as any).responsiveVoice !== 'undefined') {
    try {
      console.log('[Audio] Using ResponsiveVoice for:', text);
      (window as any).responsiveVoice.speak(text, 'Portuguese Female', {
        pitch: 1.0,
        rate: 0.85,
        volume: 1.0,
        onfinish: () => console.log('[Audio] ✓ ResponsiveVoice finished'),
        onerror: (err: any) => console.error('[Audio] ✗ ResponsiveVoice error:', err),
      });
    } catch (error) {
      console.error('[Audio] ✗ ResponsiveVoice exception:', error);
    }
  }
}

// Log available voices once they load (async in some browsers)
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    const all = window.speechSynthesis.getVoices();
    const pt  = all.filter((v) => v.lang.startsWith('pt'));
    console.log(`[Audio] Voices loaded: ${all.length} total, ${pt.length} Portuguese`);
  };
}
