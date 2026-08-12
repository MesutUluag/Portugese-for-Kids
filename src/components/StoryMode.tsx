import React, { useEffect, useRef, useState } from 'react';
import { StoryPage } from '../data/words';
import { AiState, getNewStoryPage } from '../utils/ai';
import { speakText } from '../utils/speech';
import { getSceneTheme } from '../utils/sceneTheme';
import '../styles/StoryMode.scss';

interface Props {
  aiState: AiState;
  aiLabel: string;
  aiColor: string;
  onAiChange: (label: string, color: string) => void;
}

export default function StoryMode({ aiState, aiLabel, aiColor, onAiChange }: Props): React.ReactElement {
  const [history, setHistory] = useState<StoryPage[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | ''>('');
  const [pageKey, setPageKey] = useState(0);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    void loadFirst();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const sunDisplay  = theme?.sunDisplay ?? 'sun';

  return (
    <div className="game-container" style={{ display: 'block', borderColor: '#0284c7' }}>
      <span className="badge-ai" style={{ background: aiColor }}>{aiLabel}</span>
      <div className="story-card">
        <div key={`scene-${pageKey}`} className="story-illustration story-illustration--transition" style={sceneVars}>
          <span className="story-cloud" style={{ top: '12px', left: '-40px' }} />
          <span className="story-cloud c2" style={{ left: '-30px' }} />
          {sunDisplay === 'sun'  && <span className="story-sun" />}
          {sunDisplay === 'moon' && <span className="story-moon" />}
          {sunDisplay === 'rain' && <span className="story-rain"><span/><span/><span/><span/><span/><span/></span>}
          {sunDisplay === 'snow' && <span className="story-snow"><span/><span/><span/><span/><span/></span>}
          <span className="story-grass">🌿🌱🌿🌱🌿🌱🌿</span>
          {page && <span className="story-bg-left">{page.bgLeft}</span>}
          {page && <span className="story-bg-right">{page.bgRight}</span>}
          {page && <span key={`emoji-${pageKey}`} className="story-main-emoji story-main-emoji--enter">{page.mainEmoji}</span>}
        </div>
        <button className="btn-story-audio" onClick={() => page && speakText(page.pt)} title="Listen to Sentence">
          🔊
        </button>
        <div key={`text-${pageKey}`} className={`story-text-pt story-text--enter ${slideClass}`}>
          {loading ? '🤖 Generating story...' : page?.pt ?? '...'}
        </div>
        <div className="story-text-en">{loading ? '' : page?.en ?? ''}</div>
        <div className="story-nav">
          <button className="btn-story-action" onClick={handlePrev} disabled={index === 0}>
            ⬅️ Anterior
          </button>
          <span style={{ fontWeight: 'bold', color: '#0284c7' }}>Página {index + 1}</span>
          <button className="btn-story-action" onClick={() => void handleNext()} disabled={loading}>
            Próximo ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
