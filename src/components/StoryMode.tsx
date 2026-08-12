import React, { useEffect, useRef, useState } from 'react';
import { StoryPage } from '../data/words';
import { AiState, getNewStoryPage } from '../utils/ai';
import { speakText } from '../utils/speech';
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
    const nextIndex = index + 1;
    if (nextIndex < history.length) {
      setIndex(nextIndex);
      speakText(history[nextIndex].pt);
    } else {
      setLoading(true);
      const page = await getNewStoryPage(aiState, onAiChange);
      setHistory((h) => [...h, page]);
      setIndex(nextIndex);
      setLoading(false);
      speakText(page.pt);
    }
  }

  function handlePrev(): void {
    if (index > 0) {
      const prevIndex = index - 1;
      setIndex(prevIndex);
      speakText(history[prevIndex].pt);
    }
  }

  const page = history[index];

  return (
    <div className="game-container" style={{ display: 'block', borderColor: '#0284c7' }}>
      <span className="badge-ai" style={{ background: aiColor }}>{aiLabel}</span>
      <div className="story-card">
        <div className="story-illustration">
          <div className="story-sky" />
          <div className="story-ground" />
          <span className="story-sun">☀️</span>
          <span className="story-cloud" style={{ top: '12px', left: '-40px' }}>☁️</span>
          <span className="story-cloud c2" style={{ left: '-30px' }}>🌤️</span>
          <span className="story-grass">🌿🌱🌿🌱🌿🌱🌿</span>
          {page && <span className="story-bg-left">{page.bgLeft}</span>}
          {page && <span className="story-bg-right">{page.bgRight}</span>}
          {page && <span className="story-main-emoji">{page.mainEmoji}</span>}
        </div>
        <button className="btn-story-audio" onClick={() => page && speakText(page.pt)} title="Listen to Sentence">
          🔊
        </button>
        <div className="story-text-pt">
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
