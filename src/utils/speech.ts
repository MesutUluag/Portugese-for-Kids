/**
 * Speak Portuguese text using Web Speech API.
 * Uses a flag to suppress the onerror callback when we intentionally cancel
 * a previous utterance, preventing cascading fallback calls.
 */

let isCanceling = false;

export function speakText(text: string): void {
  if (!text || !text.trim()) return;

  if ('speechSynthesis' in window && window.speechSynthesis) {
    // Set the flag so the onerror on the previous utterance is ignored
    isCanceling = true;
    window.speechSynthesis.cancel();

    // Defer speaking slightly to let cancel() settle
    setTimeout(() => {
      isCanceling = false;
      startUtterance(text);
    }, 50);
    return;
  }

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
    const portugueseVoice =
      voices.find((v) => v.lang === 'pt-PT') ??
      voices.find((v) => v.lang.startsWith('pt')) ??
      voices.find((v) => v.name.toLowerCase().includes('portuguese'));

    if (portugueseVoice) {
      utterance.voice = portugueseVoice;
    }

    utterance.onstart = () => console.log('[Audio] ✓ Speaking:', text);
    utterance.onend   = () => console.log('[Audio] ✓ Finished speaking');
    utterance.onerror = (event) => {
      if (isCanceling) return; // intentional cancel — ignore
      console.warn('[Audio] ✗ Speech error:', event.error);
      tryResponsiveVoice(text);
    };

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
