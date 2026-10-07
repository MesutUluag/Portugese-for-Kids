import React, { useMemo, useState } from 'react';
import { kidsWords, Word, prepGroupByWord } from '../data/words';
import type { PrepGroup } from '../data/words';
import { speakText } from '../utils/speech';
import { verbConjugations } from '../data/verbConjugations';
import ConjugationModal from './ConjugationModal';
import PrepositionModal from './PrepositionModal';
import { BookOpen, Link2 } from 'lucide-react';
import '../styles/CardsMode.scss';

interface Props {
  language: 'en' | 'tr';
}

// Ordered categories following a beginner-to-advanced pedagogical flow:
// 1. Core visual/thematic topics -> 2. Phrases -> 3. Grammar parts of speech
const CATEGORY_ORDER: string[] = [
  'Numbers',
  'Colours',
  'Family',
  'Animals',
  'Food & Drink',
  'Clothes',
  'Body',
  'Home',
  'School',
  'Places',
  'Transport',
  'Weather',
  'Time',
  'Phrases',
  'Verbs',
  'Adjectives',
  'Pronouns',
  'Prepositions',
  'Adverbs',
  'Nouns',
];

const foundCategories = new Set(kidsWords.map((w) => w.category));
const ALL_CATEGORIES = [
  ...CATEGORY_ORDER.filter((cat) => foundCategories.has(cat)),
  ...Array.from(foundCategories).filter((cat) => !CATEGORY_ORDER.includes(cat)),
];

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
  Nouns:        '🔤',
  Pronouns:     '👉',
  Adverbs:      '⚡',
  Prepositions: '🔗',
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
  Nouns:          'İsimler',
  Pronouns:       'Zamirler',
  Adverbs:        'Zarflar',
  Prepositions:   'Edatlar',
};

export default function CardsMode({ language }: Props): React.ReactElement {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [selectedPrepGroup, setSelectedPrepGroup] = useState<PrepGroup | null>(null);

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
              <span className={`kids-emoji${w.category === 'Numbers' || /^\d{2}:\d{2}$/.test(w.emoji) ? ' kids-emoji--number' : ''}`}>{w.emoji}</span>
              <div className="kids-pt">{w.pt}</div>
              <div className={`kids-en${w.category === 'Verbs' && verbConjugations[w.pt] ? ' kids-en--verb' : ''}`}>
                {w.category === 'Verbs' && verbConjugations[w.pt]
                  ? (() => {
                      const text = language === 'tr' ? w.tr : w.en;
                      const parenIdx = text.indexOf(' (');
                      if (parenIdx === -1) return text;
                      return <>{text.slice(0, parenIdx)}<br /><span className="kids-en-paren">{text.slice(parenIdx + 1)}</span></>;
                    })()
                  : (language === 'tr' ? w.tr : w.en)
                }
              </div>
              {w.category === 'Verbs' && verbConjugations[w.pt] && (
                <button
                  className="verb-conj-btn"
                  aria-label={`Show conjugations for ${w.pt}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVerb(w.pt);
                  }}
                >
                  <BookOpen size={16} color="white" strokeWidth={2} />
                </button>
              )}
              {w.category === 'Prepositions' && prepGroupByWord[w.pt]?.definite.length > 0 && (
                <button
                  className="prep-group-btn"
                  aria-label={`Show contractions for ${w.pt}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPrepGroup(prepGroupByWord[w.pt]);
                  }}
                >
                  <Link2 size={14} color="white" strokeWidth={2.5} />
                </button>
              )}
            </div>
        ))}
      </div>

      {selectedVerb && (
        <ConjugationModal
          verb={selectedVerb}
          initialLevel="a1"
          language={language}
          onClose={() => setSelectedVerb(null)}
        />
      )}
      {selectedPrepGroup && (
        <PrepositionModal
          group={selectedPrepGroup}
          language={language}
          onClose={() => setSelectedPrepGroup(null)}
        />
      )}
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
