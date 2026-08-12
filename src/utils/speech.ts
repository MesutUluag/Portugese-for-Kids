/**
 * Speak Portuguese text using Web Speech API with intelligent fallbacks
 * 1. Try pt-PT (European Portuguese) voice
 * 2. Fall back to any available Portuguese voice
 * 3. Fall back to ResponsiveVoice
 */
export function speakText(text: string): void {
  if (!text || !text.trim()) return;

  // Cancel any currently speaking utterance
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  // Strategy 1: Try Web Speech API with Portuguese voice
  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set Portuguese language
      utterance.lang = 'pt-PT';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Find available Portuguese voice
      const voices = window.speechSynthesis.getVoices();
      const portugueseVoice = voices.find(
        (v) => v.lang.startsWith('pt') || v.name.toLowerCase().includes('portuguese')
      );
      
      if (portugueseVoice) {
        utterance.voice = portugueseVoice;
        console.log('[Audio] Using voice:', portugueseVoice.name);
      } else if (voices.length > 0) {
        // Use first available voice as fallback
        utterance.voice = voices[0];
        console.log('[Audio] Portuguese voice not found, using:', voices[0].name);
      }

      // Event handlers
      utterance.onstart = () => {
        console.log('[Audio] ✓ Speaking:', text);
      };

      utterance.onend = () => {
        console.log('[Audio] ✓ Finished speaking');
      };

      utterance.onerror = (event) => {
        console.warn('[Audio] ✗ Speech error:', event.error);
        tryResponsiveVoice(text);
      };

      window.speechSynthesis.speak(utterance);
      return;
    } catch (error) {
      console.error('[Audio] ✗ Web Speech API error:', error);
      tryResponsiveVoice(text);
      return;
    }
  }

  // If Web Speech API not available, try ResponsiveVoice
  tryResponsiveVoice(text);
}

function tryResponsiveVoice(text: string): void {
  // Strategy 2: Try ResponsiveVoice (loaded from CDN in index.html)
  if (typeof (window as any).responsiveVoice !== 'undefined') {
    try {
      console.log('[Audio] Attempting ResponsiveVoice for:', text);
      
      (window as any).responsiveVoice.speak(text, 'Portuguese Female', {
        pitch: 1.0,
        rate: 0.85,
        volume: 1.0,
        onfinish: () => {
          console.log('[Audio] ✓ ResponsiveVoice finished');
        },
        onerror: (error: any) => {
          console.error('[Audio] ✗ ResponsiveVoice error:', error);
        }
      });
      return;
    } catch (error) {
      console.error('[Audio] ✗ ResponsiveVoice exception:', error);
    }
  }

  console.warn('[Audio] ✗ No TTS available. Check: 1) Web Speech API voices loaded 2) ResponsiveVoice loaded');
}

// Load voices when they become available (some browsers load async)
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    console.log('[Audio] Voices available:', voices.length, 'Portuguese voices:', voices.filter(v => v.lang.startsWith('pt')).length);
  };
}
