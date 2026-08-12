import React, { useState } from 'react';
import { kidsWords } from '../data/words';
import { speakText } from '../utils/speech';

export default function CardsMode(): React.ReactElement {
  const [query, setQuery] = useState('');

  const filtered = query
    ? kidsWords.filter(
        (w) =>
          w.pt.toLowerCase().includes(query.toLowerCase()) ||
          w.en.toLowerCase().includes(query.toLowerCase())
      )
    : kidsWords;

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
            key={w.pt}
            className="kids-card"
            onClick={() => speakText(w.pt)}
          >
            <span className="sound-icon">🔊</span>
            <span className="kids-emoji">{w.emoji}</span>
            <div className="kids-pt">{w.pt}</div>
            <div className="kids-en">{w.en}</div>
          </div>
        ))}
      </div>
    </>
  );
}
