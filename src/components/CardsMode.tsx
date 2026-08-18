import React, { useState } from 'react';
import { kidsWords, Word } from '../data/words';
import { speakText } from '../utils/speech';
import '../styles/CardsMode.scss';

interface Props {
  language: 'en' | 'tr';
}

export default function CardsMode({ language }: Props): React.ReactElement {
  const [query, setQuery] = useState('');
  
  // Shuffle the words list once on mount so the learning cards appear in a fresh, randomized order each visit
  const [shuffledWords] = useState<Word[]>(() => shuffleArray(kidsWords));

  const filtered = query
    ? shuffledWords.filter(
        (w) =>
          w.pt.toLowerCase().includes(query.toLowerCase()) ||
          w.en.toLowerCase().includes(query.toLowerCase()) ||
          w.tr.toLowerCase().includes(query.toLowerCase())
      )
    : shuffledWords;

  return (
    <>
      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search word (e.g. dormir, dog, falar)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="kids-grid">
        {filtered.map((w) => (
          <div
            key={`${w.pt}-${w.en}`}
            className="kids-card"
            onClick={() => speakText(w.pt)}
          >
            <span className="sound-icon">🔊</span>
            <span className="kids-emoji">{w.emoji}</span>
            <div className="kids-pt">{w.pt}</div>
            <div className="kids-en">{language === 'tr' ? w.tr : w.en}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// Fisher-Yates shuffle algorithm to generate an unbiased, randomized copy of the words array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
