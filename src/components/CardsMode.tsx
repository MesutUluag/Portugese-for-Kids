import React, { useMemo, useState } from 'react';
import { kidsWords, Word } from '../data/words';
import { speakText } from '../utils/speech';
import '../styles/CardsMode.scss';

interface Props {
  language: 'en' | 'tr';
}

// Derive the ordered list of unique categories from the words array (preserves declaration order)
const ALL_CATEGORIES = Array.from(new Set(kidsWords.map((w) => w.category)));

const CATEGORY_EMOJI: Record<string, string> = {
  Verbs:        '🏃',
  Family:       '👨‍👩‍👧',
  Animals:      '🐾',
  'Food & Drink': '🍎',
  Colours:      '🎨',
  Numbers:      '🔢',
  Body:         '💪',
  Clothes:      '👕',
  Home:         '🏠',
  School:       '🏫',
  Places:       '🏙️',
  Transport:    '🚗',
  Adjectives:   '✨',
  Time:         '⏰',
  Weather:      '☁️',
  Phrases:      '💬',
};

const CATEGORY_TR: Record<string, string> = {
  Verbs:          'Fiiller',
  Family:         'Aile',
  Animals:        'Hayvanlar',
  'Food & Drink': 'Yiyecek & İçecek',
  Colours:        'Renkler',
  Numbers:        'Sayılar',
  Body:           'Vücut',
  Clothes:        'Kıyafetler',
  Home:           'Ev',
  School:         'Okul',
  Places:         'Yerler',
  Transport:      'Ulaşım',
  Adjectives:     'Sıfatlar',
  Time:           'Zaman',
  Weather:        'Hava Durumu',
  Phrases:        'İfadeler',
};

export default function CardsMode({ language }: Props): React.ReactElement {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Shuffle the words list once on mount so the learning cards appear in a fresh, randomized order each visit
  const [shuffledWords] = useState<Word[]>(() => shuffleArray(kidsWords));

  const filtered = useMemo(() => {
    let words = shuffledWords;
    if (activeCategory) {
      words = words.filter((w) => w.category === activeCategory);
    }
    if (query) {
      const q = query.toLowerCase();
      words = words.filter(
        (w) =>
          w.pt.toLowerCase().includes(q) ||
          w.en.toLowerCase().includes(q) ||
          w.tr.toLowerCase().includes(q)
      );
    }
    return words;
  }, [shuffledWords, activeCategory, query]);

  return (
    <>
      {/* ── Search + Category row ─────────────────────────────────────────── */}
      <div className="search-row">
        <input
          type="text"
          className="search-box"
          placeholder={language === 'tr' ? '🔍 Kelime ara...' : '🔍 Search word...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="category-select"
          value={activeCategory ?? ''}
          onChange={(e) => setActiveCategory(e.target.value || null)}
        >
          <option value="">{language === 'tr' ? '🌟 Tümü' : '🌟 All'}</option>
          {ALL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_EMOJI[cat] ?? '📂'} {language === 'tr' ? (CATEGORY_TR[cat] ?? cat) : cat}
            </option>
          ))}
        </select>
      </div>

      {/* ── Cards grid ────────────────────────────────────────────────────── */}
      <div className="kids-grid">
        {filtered.map((w) => (
          <div
            key={`${w.pt}-${w.en}`}
            className="kids-card"
            onClick={() => speakText(w.pt)}
          >
            <span className="sound-icon">🔊</span>
            <span className={`kids-emoji${w.category === 'Numbers' || w.category === 'Time' ? ' kids-emoji--number' : ''}`}>{w.emoji}</span>
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
