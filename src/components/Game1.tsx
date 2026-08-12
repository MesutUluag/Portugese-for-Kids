import React, { useCallback, useEffect, useRef, useState } from 'react';
import { kidsWords, Word } from '../data/words';
import { speakText } from '../utils/speech';
import WordImage from './WordImage';
import '../styles/Game1.scss';

interface Props {
  onScore: (pts: number) => void;
}

export default function Game1({ onScore }: Props): React.ReactElement {
  const [target, setTarget] = useState<Word | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [animClass, setAnimClass] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerAnim = (correct: boolean) => {
    const cls = correct ? 'correct-anim' : 'wrong-anim';
    setAnimClass(cls);
    setTimeout(() => setAnimClass(''), 600);
  };

  const load = useCallback(() => {
    const t = kidsWords[Math.floor(Math.random() * kidsWords.length)];
    setTarget(t);
    speakText(t.pt);
    const opts = [t.pt];
    while (opts.length < 4) {
      const rand = kidsWords[Math.floor(Math.random() * kidsWords.length)].pt;
      if (!opts.includes(rand)) opts.push(rand);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => { load(); }, [load]);

  function handleAnswer(opt: string) {
    if (!target) return;
    if (opt === target.pt) {
      triggerAnim(true);
      onScore(10);
      speakText(target.pt);
      setTimeout(load, 1000);
    } else {
      triggerAnim(false);
      speakText(target.pt);
    }
  }

  return (
    <div ref={containerRef} className={`game-container ${animClass}`} style={{ display: 'block', borderColor: '#10b981' }}>
      <h2 style={{ color: '#10b981', margin: 0 }}>Which word is this? 🔊</h2>
      <WordImage
        en={target?.en ?? ''}
        emoji={target?.emoji ?? '🐶'}
        size={120}
        className="game-target"
        onClick={() => target && speakText(target.pt)}
      />
      {target && <div className="game-target-label">{target.en}</div>}
      <div className="game-options">
        {options.map((opt) => (
          <button key={opt} className="game-opt" onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
