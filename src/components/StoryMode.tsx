import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Gauge } from 'lucide-react';
import { StoryPage } from '../data/words';
import { AiState, getNewStoryPage } from '../utils/ai';
import { cancelSpeech, speakText } from '../utils/speech';
import { translateToTurkish } from '../utils/translate';
import { getSceneTheme } from '../utils/sceneTheme';
import StoryIllustration from './StoryIllustration';
import '../styles/StoryMode.scss';

interface Props {
  aiState: AiState;
  onAiChange: (label: string, color: string) => void;
  language: 'en' | 'tr';
}

export default function StoryMode({ aiState, onAiChange, language }: Props): React.ReactElement {
  const [history, setHistory] = useState<StoryPage[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | ''>('');
  const [pageKey, setPageKey] = useState(0);
  const [trText, setTrText] = useState('');
  const initialized = useRef(false);

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
    setLoading(true);
    const page = await getNewStoryPage(aiState, onAiChange);
    setHistory([page]);
    setIndex(0);
    setLoading(false);
    speakText(page.pt);
  }

  async function handleNext(): Promise<void> {
    setSlideDir('left');
    const nextIndex = index + 1;
    if (nextIndex < history.length) {
      setIndex(nextIndex);
      setPageKey((k) => k + 1);
      speakText(history[nextIndex].pt);
    } else {
      setLoading(true);
      const page = await getNewStoryPage(aiState, onAiChange);
      setHistory((h) => [...h, page]);
      setIndex(nextIndex);
      setPageKey((k) => k + 1);
      setLoading(false);
      speakText(page.pt);
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
              theme={theme}
              pageKey={pageKey}
              sceneVars={sceneVars}
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
