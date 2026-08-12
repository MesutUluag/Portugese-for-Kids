import React, { useCallback, useEffect, useState } from 'react';
import { kidsWords, Word } from '../data/words';
import { speakText } from '../utils/speech';
import '../styles/Game3.scss';

interface FlippedEntry {
  idx: number;
  item: Word;
}

interface Props {
  onScore: (pts: number) => void;
}

export default function Game3({ onScore }: Props): React.ReactElement {
  const [deck, setDeck] = useState<Word[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [blocked, setBlocked] = useState(false);

  const load = useCallback(() => {
    const selected: Word[] = [];
    while (selected.length < 3) {
      const rand = kidsWords[Math.floor(Math.random() * kidsWords.length)];
      if (!selected.some((s) => s.pt === rand.pt)) selected.push(rand);
    }
    setDeck([...selected, ...selected].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setBlocked(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function handleFlip(idx: number, item: Word) {
    if (blocked || flipped.includes(idx) || matched.includes(idx)) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    speakText(item.pt);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped as [number, number];
      const entry1: FlippedEntry = { idx: a, item: deck[a] };
      const entry2: FlippedEntry = { idx: b, item: deck[b] };

      if (entry1.item.pt === entry2.item.pt) {
        const newMatched = [...matched, a, b];
        setMatched(newMatched);
        setFlipped([]);
        onScore(15);
        if (newMatched.length === 6) {
          setTimeout(() => { load(); }, 1000);
        }
      } else {
        setBlocked(true);
        setTimeout(() => {
          setFlipped([]);
          setBlocked(false);
        }, 1000);
      }
    }
  }

  return (
    <div className="game-container" style={{ display: 'block', borderColor: '#8b5cf6' }}>
      <h2 style={{ color: '#8b5cf6', margin: 0 }}>🃏 Memory Match</h2>
      <p style={{ color: '#64748b', margin: '5px 0' }}>Find matching emoji pairs!</p>
      <div className="memory-grid">
        {deck.map((item, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <div
              key={idx}
              className={`memory-card${isFlipped ? ' flipped' : ''}`}
              onClick={() => handleFlip(idx, item)}
            >
              {isFlipped ? item.emoji : '❓'}
            </div>
          );
        })}
      </div>
    </div>
  );
}
