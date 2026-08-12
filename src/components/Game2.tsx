import React, { useCallback, useEffect, useState } from 'react';
import { kidsWords, Word } from '../data/words';
import { speakText } from '../utils/speech';
import '../styles/Game2.scss';

interface Props {
  onScore: (pts: number) => void;
}

export default function Game2({ onScore }: Props): React.ReactElement {
  const [target, setTarget] = useState<Word | null>(null);
  const [options, setOptions] = useState<Word[]>([]);
  const [animClass, setAnimClass] = useState('');

  const triggerAnim = (correct: boolean) => {
    setAnimClass(correct ? 'correct-anim' : 'wrong-anim');
    setTimeout(() => setAnimClass(''), 600);
  };

  const load = useCallback(() => {
    const t = kidsWords[Math.floor(Math.random() * kidsWords.length)];
    setTarget(t);
    speakText(t.pt);
    const opts: Word[] = [t];
    while (opts.length < 4) {
      const rand = kidsWords[Math.floor(Math.random() * kidsWords.length)];
      if (!opts.some((o) => o.pt === rand.pt)) opts.push(rand);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => { load(); }, [load]);

  function handleAnswer(opt: Word) {
    if (!target) return;
    if (opt.pt === target.pt) {
      triggerAnim(true);
      onScore(10);
      speakText('Muito bem! ' + target.pt);
      setTimeout(load, 1000);
    } else {
      triggerAnim(false);
      speakText('Tenta outra vez');
    }
  }

  return (
    <div className={`game-container ${animClass}`} style={{ display: 'block', borderColor: '#ec4899' }}>
      <h2 style={{ color: '#ec4899', margin: 0 }}>Tap to Listen! 🔊</h2>
      <div className="audio-speaker-btn" onClick={() => target && speakText(target.pt)}>🔊</div>
      <p style={{ color: '#64748b', fontWeight: 'bold', margin: 0 }}>Which picture did you hear?</p>
      <div className="emoji-options">
        {options.map((opt) => (
          <div key={opt.pt} className="emoji-opt" onClick={() => handleAnswer(opt)}>
            {opt.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
