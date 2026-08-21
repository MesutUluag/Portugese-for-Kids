import React, { useEffect, useState } from 'react';
import { Mode } from './data/words';
import { AiState, initAI } from './utils/ai';
import CardsMode from './components/CardsMode';
import StoryMode from './components/StoryMode';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Game3 from './components/Game3';
import Game4 from './components/Game4';
import Game5 from './components/Game5';
import Game6 from './components/Game6';

export default function App(): React.ReactElement {
  const [mode, setMode] = useState<Mode>('cards');
  const [_score, setScore] = useState(0);
  const [_bounce, setBounce] = useState(false);
  const [aiState, setAiState] = useState<AiState>(null);
  const [aiLabel, setAiLabel] = useState('Checking Chrome Built-in AI...');
  const [aiColor, setAiColor] = useState('#0284c7');
  const [language, setLanguage] = useState<'en' | 'tr'>('en');

  const [timeSpent, setTimeSpent] = useState<number>(() => {
    try {
      const today = getTodayDateString();
      const savedDate = localStorage.getItem('kids_study_time_date');
      const savedSeconds = localStorage.getItem('kids_study_time_seconds');
      if (savedDate === today && savedSeconds) {
        return parseInt(savedSeconds, 10) || 0;
      }
    } catch (e) {
      console.error('Failed to load study time:', e);
    }
    return 0;
  });

  useEffect(() => {
    void initAI((label, color) => {
      setAiLabel(label);
      setAiColor(color);
    }).then((state) => setAiState(state));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      // Pause the timer if the user is on a different tab or the window is minimized
      if (document.visibilityState !== 'visible') {
        return;
      }

      setTimeSpent((prev) => {
        const next = prev + 1;
        try {
          const today = getTodayDateString();
          localStorage.setItem('kids_study_time_date', today);
          localStorage.setItem('kids_study_time_seconds', String(next));
        } catch (e) {
          console.error('Failed to save study time:', e);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function addScore(pts: number) {
    setScore((s) => s + pts);
    setBounce(true);
    setTimeout(() => setBounce(false), 300);
  }

  const navButtons: { key: Mode; label: string; labelTr: string; cls: string }[] = [
    { key: 'cards',  label: '🖼️ Cards',        labelTr: '🖼️ Kartlar',       cls: 'btn-kids'  },
    { key: 'story',  label: '📖 Story',         labelTr: '📖 Hikaye',         cls: 'btn-story' },
    { key: 'game1',  label: '🎯 Picture Game',  labelTr: '🎯 Resim Oyunu',    cls: 'btn-game1' },
    { key: 'game2',  label: '🎧 Listen & Find', labelTr: '🎧 Dinle & Bul',    cls: 'btn-game2' },
    { key: 'game3',  label: '🃏 Memory Match',  labelTr: '🃏 Hafıza Oyunu',   cls: 'btn-game3' },
    { key: 'game4',  label: '✍️ Fill Blank',    labelTr: '✍️ Boşluk Doldurma', cls: 'btn-game4' },
    { key: 'game5',  label: '🧩 Scramble',      labelTr: '🧩 Kelime Bul',     cls: 'btn-game5' },
    { key: 'game6',  label: '🧩 Puzzle',         labelTr: '🧩 Yapboz',         cls: 'btn-game6' },
  ];

  return (
    <main className="app">
      <div className="app-header-row">
        <h1>🎈 Portuguese Kids Playground 🎨</h1>
        <button
          className="btn-lang-toggle"
          onClick={() => setLanguage((l) => (l === 'en' ? 'tr' : 'en'))}
          title={language === 'en' ? 'Switch to Turkish' : 'İngilizceye geç'}
        >
          {language === 'en' ? '🇹🇷 TR' : '🇬🇧 EN'}
        </button>
      </div>
      <div className="time-badge">⏱️ {language === 'tr' ? 'Bugün' : 'Time Today'}: {formatTime(timeSpent)}</div>

      <div className="nav-buttons">
        {navButtons.map(({ key, label, labelTr, cls }) => (
          <button key={key} className={`btn ${cls}${mode === key ? ' btn--active' : ''}`} onClick={() => setMode(key)}>
            {language === 'tr' ? labelTr : label}
          </button>
        ))}
      </div>

      {mode === 'cards' && <CardsMode language={language} />}
      {mode === 'story' && (
        <StoryMode
          aiState={aiState}
          aiLabel={aiLabel}
          aiColor={aiColor}
          onAiChange={(label, color) => { setAiLabel(label); setAiColor(color); }}
          language={language}
        />
      )}
      {mode === 'game1' && <Game1 onScore={addScore} language={language} />}
      {mode === 'game2' && <Game2 onScore={addScore} language={language} />}
      {mode === 'game3' && <Game3 onScore={addScore} language={language} />}
      {mode === 'game4' && <Game4 onScore={addScore} language={language} />}
      {mode === 'game5' && <Game5 onScore={addScore} language={language} />}
      {mode === 'game6' && <Game6 onScore={addScore} language={language} />}
    </main>
  );
}

function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let result = '';
  if (hrs > 0) {
    result += `${hrs}h `;
  }
  if (mins > 0 || hrs > 0) {
    result += `${mins}m `;
  }
  result += `${secs}s`;
  return result;
}
