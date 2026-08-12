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

export default function App(): React.ReactElement {
  const [mode, setMode] = useState<Mode>('cards');
  const [score, setScore] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [aiState, setAiState] = useState<AiState>(null);
  const [aiLabel, setAiLabel] = useState('Checking Chrome Built-in AI...');
  const [aiColor, setAiColor] = useState('#0284c7');

  useEffect(() => {
    void initAI((label, color) => {
      setAiLabel(label);
      setAiColor(color);
    }).then((state) => setAiState(state));
  }, []);

  function addScore(pts: number) {
    setScore((s) => s + pts);
    setBounce(true);
    setTimeout(() => setBounce(false), 300);
  }

  const navButtons: { key: Mode; label: string; cls: string }[] = [
    { key: 'cards',  label: '🖼️ Cards',        cls: 'btn-kids'  },
    { key: 'story',  label: '📖 Story',         cls: 'btn-story' },
    { key: 'game1',  label: '🎯 Picture Game',  cls: 'btn-game1' },
    { key: 'game2',  label: '🎧 Listen & Find', cls: 'btn-game2' },
    { key: 'game3',  label: '🃏 Memory Match',  cls: 'btn-game3' },
    { key: 'game4',  label: '✍️ Fill Blank',    cls: 'btn-game4' },
    { key: 'game5',  label: '🧩 Scramble',      cls: 'btn-game5' },
  ];

  return (
    <div className="app">
      <h1>🎈 Portuguese Kids Playground 🎨</h1>
      <div className={`score-badge${bounce ? ' bounce' : ''}`}>⭐ Stars: {score}</div>

      <div className="nav-buttons">
        {navButtons.map(({ key, label, cls }) => (
          <button key={key} className={`btn ${cls}`} onClick={() => setMode(key)}>
            {label}
          </button>
        ))}
      </div>

      {mode === 'cards' && <CardsMode />}
      {mode === 'story' && (
        <StoryMode
          aiState={aiState}
          aiLabel={aiLabel}
          aiColor={aiColor}
          onAiChange={(label, color) => { setAiLabel(label); setAiColor(color); }}
        />
      )}
      {mode === 'game1' && <Game1 onScore={addScore} />}
      {mode === 'game2' && <Game2 onScore={addScore} />}
      {mode === 'game3' && <Game3 onScore={addScore} />}
      {mode === 'game4' && <Game4 onScore={addScore} />}
      {mode === 'game5' && <Game5 onScore={addScore} />}
    </div>
  );
}
