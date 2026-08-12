import React, { useCallback, useEffect, useState } from 'react';
import { kidsWords, Word } from '../data/words';
import { speakText } from '../utils/speech';
import WordImage from './WordImage';
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
  const [showSuccess, setShowSuccess] = useState(false);

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
    if (showSuccess) return;
    if (c === correctChar) {
      setAnimClass('correct-anim');
      setShowSuccess(true);
      setBlank(target.pt.split('').join(' '));
      onScore(10);
      speakText(target.pt);
      setTimeout(() => { setAnimClass(''); setShowSuccess(false); load(); }, 2000);
    } else {
      setAnimClass('wrong-anim');
      speakText(target.pt);
      setTimeout(() => setAnimClass(''), 600);
    }
  }

  return (
    <div className={`game-container ${animClass}`} style={{ display: 'block', borderColor: '#3b82f6' }}>
      <h2 style={{ color: '#3b82f6', margin: 0 }}>✍️ Fill Missing Letter</h2>
      <WordImage en={target?.en ?? ''} emoji={target?.emoji ?? '😴'} size={120} className="game-target" />
      <div className="blank-display">{blank}</div>
      <div className="letter-options">
        {options.map((c) => (
          <button key={c} className={`letter-btn${showSuccess ? ' letter-btn--disabled' : ''}`} onClick={() => handleAnswer(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
