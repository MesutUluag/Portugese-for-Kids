let activeAudio: HTMLAudioElement | null = null;

function playFallbackAudio(text: string): void {
  const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-PT&client=tw-ob&q=${encodeURIComponent(text)}`;
  activeAudio = new Audio(audioUrl);
  activeAudio.play().catch(() => {});
}

export function speakText(text: string): void {
  if (activeAudio) activeAudio.pause();
  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-PT';
      utterance.rate = 0.85;
      utterance.onerror = () => playFallbackAudio(text);
      window.speechSynthesis.speak(utterance);
      return;
    } catch {
      playFallbackAudio(text);
      return;
    }
  }
  playFallbackAudio(text);
}
