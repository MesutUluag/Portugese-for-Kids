import React, { useCallback, useEffect, useState } from 'react';
import { kidsWords, Word } from '../data/words';
import { speakText } from '../utils/speech';
import '../styles/Game4.scss';

interface Props {
  onScore: (pts: number) => void;
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzáéíóúãõç';

export default function Game4({ onScore }: Props): React.ReactElement {
  const [target, setTarget] = useState<Word | null>(null);
  const [blank, setBlank] = useState('');
  const [correctChar, setCorrectChar] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [animClass, setAnimClass] = useState('');

  const load = useCallback(() => {
    const valid = kidsWords.filter((w) => w.pt.length >= 3 && !w.pt.includes(' '));
    const t = valid[Math.floor(Math.random() * valid.length)];
    setTarget(t);
    speakText(t.pt);

    const missingIndex = Math.floor(Math.random() * t.pt.length);
    const chars = t.pt.split('');
    const correct = chars[missingIndex];
    chars[missingIndex] = '_';
    setBlank(chars.join(' '));
    setCorrectChar(correct);

    const opts = [correct];
    while (opts.length < 4) {
      const rand = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      if (!opts.includes(rand)) opts.push(rand);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => { load(); }, [load]);

  function handleAnswer(c: string) {
    if (!target) return;
    if (c === correctChar) {
      setAnimClass('correct-anim');
      onScore(10);
      speakText('Muito bem! ' + target.pt);
      setTimeout(() => { setAnimClass(''); load(); }, 1000);
    } else {
      setAnimClass('wrong-anim');
      speakText('Tenta outra vez');
      setTimeout(() => setAnimClass(''), 600);
    }
  }

  return (
    <div className={`game-container ${animClass}`} style={{ display: 'block', borderColor: '#3b82f6' }}>
      <h2 style={{ color: '#3b82f6', margin: 0 }}>✍️ Fill Missing Letter</h2>
      <div className="game-target" style={{ fontSize: '60px' }}>{target?.emoji ?? '😴'}</div>
      <div className="blank-display">{blank}</div>
      <div className="letter-options">
        {options.map((c) => (
          <button key={c} className="letter-btn" onClick={() => handleAnswer(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
