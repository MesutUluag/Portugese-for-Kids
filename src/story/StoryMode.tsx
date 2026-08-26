import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Gauge } from 'lucide-react';
import { StoryPage } from '../data/words';
import { AiState, getNewStoryPage } from '../utils/ai';
import { cancelSpeech, speakText } from '../utils/speech';
import { translateToTurkish } from '../utils/translate';
import { getSceneTheme } from './sceneTheme';
import { PrefetchResult, buildStoryImagePrompt } from './useStoryPrefetch';
import StoryIllustration from './StoryIllustration';
import './StoryMode.scss';

interface Props {
  aiState: AiState;
  onAiChange: (label: string, color: string) => void;
  language: 'en' | 'tr';
  prefetch: PrefetchResult;
}

export default function StoryMode({ aiState, onAiChange, language, prefetch }: Props): React.ReactElement {
  const [history, setHistory] = useState<StoryPage[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | ''>('');
  const [pageKey, setPageKey] = useState(0);
  const [trText, setTrText] = useState('');
  const initialized = useRef(false);
  const { popQueue, triggerRefill, imageCache } = prefetch;

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    void loadFirst();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => () => { cancelSpeech(); }, []);

  // Translate the current page's English text to Turkish when language or page changes
  useEffect(() => {
    const en = history[index]?.en;
    if (language === 'tr' && en) {
      setTrText('');
      void translateToTurkish(en).then(setTrText);
    } else {
      setTrText('');
    }
  }, [language, index, history]);

  async function loadFirst(): Promise<void> {
    // Try to use a prefetched story; if the queue is still empty (prefetch in flight),
    // wait up to 6 s in 200 ms steps before falling back to on-demand fetch.
    let page = popQueue();
    if (!page) {
      setLoading(true);
      for (let i = 0; i < 30 && !page; i++) {
        await new Promise<void>((r) => setTimeout(r, 200));
        page = popQueue();
      }
      if (!page) {
        page = await getNewStoryPage(aiState, onAiChange);
      }
      setLoading(false);
    }
    setHistory([page]);
    setIndex(0);
    speakText(page.pt);
    // Queue just emptied — immediately start prefetching the next story + image
    triggerRefill();
  }

  async function handleNext(): Promise<void> {
    setSlideDir('left');
    const nextIndex = index + 1;
    if (nextIndex < history.length) {
      // Navigating back through already-seen history — no queue consumed, no refill needed
      setIndex(nextIndex);
      setPageKey((k) => k + 1);
      speakText(history[nextIndex].pt);
    } else {
      // Consume from prefetch queue for instant display; fall back if queue is empty
      const prefetched = popQueue();
      if (prefetched) {
        setHistory((h) => [...h, prefetched]);
        setIndex(nextIndex);
        setPageKey((k) => k + 1);
        speakText(prefetched.pt);
      } else {
        setLoading(true);
        const page = await getNewStoryPage(aiState, onAiChange);
        setHistory((h) => [...h, page]);
        setIndex(nextIndex);
        setPageKey((k) => k + 1);
        setLoading(false);
        speakText(page.pt);
      }
      // Queue was consumed — immediately start prefetching the next story + image
      triggerRefill();
    }
  }

  function handlePrev(): void {
    if (index > 0) {
      setSlideDir('right');
      const prevIndex = index - 1;
      setIndex(prevIndex);
      setPageKey((k) => k + 1);
      speakText(history[prevIndex].pt);
    }
  }

  const page = history[index];
  const theme = page ? getSceneTheme(page) : null;

  const slideClass = slideDir ? `slide-in-${slideDir}` : '';

  const sceneVars = theme ? {
    '--sky-top':       theme.skyTop,
    '--sky-bottom':    theme.skyBottom,
    '--hill-color':    theme.hillColor,
    '--hill-dark':     theme.hillDark,
    '--ground-color':  theme.groundColor,
    '--ground-dark':   theme.groundDark,
    '--cloud-opacity': String(theme.cloudOpacity),
  } as React.CSSProperties : {};

  return (
    <div className="game-container" style={{ display: 'block', borderColor: '#0284c7' }}>
      <div className="story-card">
        {page && theme
          ? <StoryIllustration
              key={pageKey}
              page={page}
              pageKey={pageKey}
              sceneVars={sceneVars}
              prefetchedImageUrl={imageCache.get(buildStoryImagePrompt(page))}
            />
          : <div className="story-illustration" style={sceneVars} />
        }
        <div className="story-audio-buttons">
          <button className="btn-story-audio" onClick={() => page && speakText(page.pt)} title="Listen to Sentence">
            <Volume2 size={20} strokeWidth={2} />
          </button>
          <button className="btn-story-audio btn-story-audio--slow" onClick={() => page && speakText(page.pt, { rate: 0.3 })} title="Listen to Sentence Slowly">
            <Gauge size={20} strokeWidth={2} />
          </button>
        </div>
        <div key={`text-${pageKey}`} className={`story-text-pt story-text--enter ${slideClass}`}>
          {loading ? (language === 'tr' ? '🤖 Hikaye oluşturuluyor...' : '🤖 Generating story...') : page?.pt ?? '...'}
        </div>
        <div className="story-text-en">
          {loading ? '' : language === 'tr' ? (trText || (page ? '🔄' : '')) : (page?.en ?? '')}
        </div>
        <div className="story-nav">
          <button className="btn-story-action" onClick={handlePrev} disabled={index === 0}>
            <ChevronLeft size={16} strokeWidth={2.5} style={{ marginRight: 4 }} />
            Anterior
          </button>
          <span style={{ fontWeight: 'bold', color: '#0284c7' }}>{`Página ${index + 1}`}</span>
          <button className="btn-story-action" onClick={() => void handleNext()} disabled={loading}>
            Próxima
            <ChevronRight size={16} strokeWidth={2.5} style={{ marginLeft: 4 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
