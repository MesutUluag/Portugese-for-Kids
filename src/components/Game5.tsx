import React, { useCallback, useEffect, useState } from 'react';
import { kidsWords, Word } from '../data/words';
import { speakText } from '../utils/speech';

interface Props {
  onScore: (pts: number) => void;
}

export default function Game5({ onScore }: Props): React.ReactElement {
  const [target, setTarget] = useState<Word | null>(null);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [input, setInput] = useState<string[]>([]);
  const [hidden, setHidden] = useState<boolean[]>([]);
  const [animClass, setAnimClass] = useState('');

  const load = useCallback(() => {
    const valid = kidsWords.filter((w) => w.pt.length >= 3 && w.pt.length <= 8 && !w.pt.includes(' '));
    const t = valid[Math.floor(Math.random() * valid.length)];
    setTarget(t);
    speakText(t.pt);
    const sc = t.pt.split('').sort(() => Math.random() - 0.5);
    setScrambled(sc);
    setInput([]);
    setHidden(new Array(sc.length).fill(false));
    setAnimClass('');
  }, []);

  useEffect(() => { load(); }, [load]);

  function handleLetter(idx: number, char: string) {
    if (!target || hidden[idx]) return;
    const newInput = [...input, char];
    const newHidden = [...hidden];
    newHidden[idx] = true;
    setInput(newInput);
    setHidden(newHidden);

    if (newInput.length === target.pt.length) {
      if (newInput.join('') === target.pt) {
        setAnimClass('correct-anim');
        onScore(15);
        speakText('Excelente! ' + target.pt);
        setTimeout(() => { setAnimClass(''); load(); }, 1200);
      } else {
        setAnimClass('wrong-anim');
        speakText('A resposta certa é ' + target.pt);
        setTimeout(() => { setAnimClass(''); load(); }, 2000);
      }
    }
  }

  function handleReset() {
    setInput([]);
    if (scrambled.length > 0) setHidden(new Array(scrambled.length).fill(false));
  }

  const remaining = target ? target.pt.length - input.length : 0;
  const slots = input.join(' ') + (input.length > 0 ? ' ' : '') + '_ '.repeat(remaining);

  return (
    <div className={`game-container ${animClass}`} style={{ display: 'block', borderColor: '#f97316' }}>
      <h2 style={{ color: '#f97316', margin: 0 }}>🧩 Unscramble Word</h2>
      <div
        className="game-target"
        style={{ fontSize: '60px' }}
        onClick={() => target && speakText(target.pt)}
      >
        {target?.emoji ?? '🍎'}
      </div>
      <div className="scramble-slots">{slots}</div>
      <div className="hint-text">Meaning: {target?.en ?? ''}</div>
      <div className="scramble-letters">
        {scrambled.map((char, idx) => (
          <button
            key={idx}
            className="scramble-btn"
            style={{ visibility: hidden[idx] ? 'hidden' : 'visible' }}
            onClick={() => handleLetter(idx, char)}
          >
            {char}
          </button>
        ))}
      </div>
      <div className="scramble-controls">
        <button className="btn-reset" onClick={handleReset}>🔄 Clear / Undo</button>
      </div>
    </div>
  );
}
