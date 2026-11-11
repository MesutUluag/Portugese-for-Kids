import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Word } from '../data/index';
import { cancelSpeech, speakText } from '../utils/speech';
import WordImage from '../commons/WordImage.tsx';
import GameScoreBadge from '../commons/GameScoreBadge.tsx';
import '../styles/Game1.scss';

interface Props {
  onScore: (pts: number) => void;
  language: 'en' | 'tr';
  gameScore?: number;
  recentGain?: number | null;
  gainKey?: number;
}

export default function Game1({
  onScore,
  language,
  gameScore = 0,
  recentGain = null,
  gainKey,
}: Props): React.ReactElement {
  const [words, setWords] = useState<Word[]>([]);
  const [target, setTarget] = useState<Word | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [animClass, setAnimClass] = useState('');
  const [answered, setAnswered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mistakesRef = useRef<number>(0);

  const triggerAnim = (correct: boolean) => {
    const cls = correct ? 'correct-anim' : 'wrong-anim';
    setAnimClass(cls);
    setTimeout(() => setAnimClass(''), 600);
  };

  useEffect(() => {
    import('../data/words').then((m) => setWords(m.kidsWords));
  }, []);

  const load = useCallback(() => {
    if (!words.length) return;
    const t = words[Math.floor(Math.random() * words.length)];
    setTarget(t);
    mistakesRef.current = 0;
    setAnswered(false);
    speakText(t.pt);
    const opts = [t.pt];
    while (opts.length < 4) {
      const rand = words[Math.floor(Math.random() * words.length)].pt;
      if (!opts.includes(rand)) opts.push(rand);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  }, [words]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => () => { cancelSpeech(); }, []);

  function handleAnswer(opt: string) {
    if (!target || answered) return;
    if (opt === target.pt) {
      setAnswered(true);
      triggerAnim(true);
      const points = mistakesRef.current === 0 ? 6 : 4;
      onScore(points);
      speakText(target.pt);
      setTimeout(load, 1000);
    } else {
      mistakesRef.current += 1;
      triggerAnim(false);
      speakText(target.pt);
    }
  }

  return (
    <div ref={containerRef} className={`game-container ${animClass}`} style={{ display: 'block', borderColor: '#10b981' }}>
      <GameScoreBadge score={gameScore} recentGain={recentGain} gainKey={gainKey} />
      <h2 style={{ color: '#10b981', margin: 0 }}>{language === 'tr' ? 'Bu hangi kelime? 🔊' : 'Which word is this? 🔊'}</h2>
      <WordImage
        en={target?.en ?? ''}
        emoji={target?.emoji ?? '🐶'}
        size={120}
        className="game-target"
        onClick={() => target && speakText(target.pt)}
      />
      {target && <div className="game-target-label">{language === 'tr' ? target.tr : target.en}</div>}
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
