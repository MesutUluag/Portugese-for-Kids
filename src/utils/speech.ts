/**
 * Speak Portuguese text using Web Speech API
 * Supports all modern browsers (Chrome, Firefox, Safari, Edge)
 * Falls back to ResponsiveVoice if Web Speech API fails
 */
export function speakText(text: string): void {
  if (!text || !text.trim()) return;

  // Cancel any currently speaking utterance
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  // Strategy 1: Try Web Speech API (works natively in most browsers)
  if ('speechSynthesis' in window) {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-PT';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Event handlers for debugging
      utterance.onstart = () => {
        console.log('[Audio] Speaking:', text);
      };

      utterance.onend = () => {
        console.log('[Audio] Finished speaking');
      };

      utterance.onerror = (event) => {
        console.warn('[Audio] Speech error:', event.error);
        // Try ResponsiveVoice as fallback
        tryResponsiveVoice(text);
      };

      window.speechSynthesis.speak(utterance);
      return;
    } catch (error) {
      console.error('[Audio] Web Speech API error:', error);
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
      console.log('[Audio] Using ResponsiveVoice for:', text);
      
      (window as any).responsiveVoice.speak(text, 'Portuguese Female', {
        pitch: 1.0,
        rate: 0.85,
        volume: 1.0,
        onfinish: () => {
          console.log('[Audio] ResponsiveVoice finished');
        },
        onerror: (error: any) => {
          console.error('[Audio] ResponsiveVoice error:', error);
        }
      });
      return;
    } catch (error) {
      console.error('[Audio] ResponsiveVoice error:', error);
    }
  }

  console.warn('[Audio] No text-to-speech available. Web Speech API or ResponsiveVoice required.');
}
