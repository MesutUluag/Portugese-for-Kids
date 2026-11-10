import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Word } from '../data/types';
import { cancelSpeech, speakText } from '../utils/speech';
import {
  generateCrossword,
  formatBoxClue,
  type CrosswordPuzzle,
  type PlacedWord,
} from '../utils/crosswordGenerator';
import { Volume2, Dices } from 'lucide-react';
import '../styles/Game8.scss';

interface Props {
  onScore: (pts: number) => void;
  language: 'en' | 'tr';
}

const CATEGORY_LIST = [
  'Mixed',
  'Verbs',
  'Numbers',
  'Colours',
  'Animals',
  'Food & Drink',
  'Family',
  'Clothes',
  'Home',
  'School',
  'Body',
  'Places',
  'Transport',
  'Adjectives',
  'Weather',
  'Time',
  'Nouns',
  'Pronouns',
  'Adverbs',
  'Prepositions',
  'ALL',
] as const;

const CATEGORY_EMOJI: Record<string, string> = {
  Mixed: '🔀',
  Verbs: '🏃',
  Family: '👨‍👩‍👧',
  Animals: '🐾',
  'Food & Drink': '🍎',
  Colours: '🎨',
  Numbers: '🔢',
  Body: '💪',
  Clothes: '👕',
  Home: '🏠',
  School: '🏫',
  Places: '🏙️',
  Transport: '🚗',
  Adjectives: '✨',
  Time: '⏰',
  Weather: '☁️',
  Phrases: '💬',
  Nouns: '🔤',
  Pronouns: '👉',
  Adverbs: '⚡',
  Prepositions: '🔗',
  ALL: '🌟',
};

const CATEGORY_TR: Record<string, string> = {
  Mixed: 'Karışık',
  Verbs: 'Fiiller',
  Family: 'Aile',
  Animals: 'Hayvanlar',
  'Food & Drink': 'Yiyecek & İçecek',
  Colours: 'Renkler',
  Numbers: 'Sayılar',
  Body: 'Vücut',
  Clothes: 'Kıyafetler',
  Home: 'Ev',
  School: 'Okul',
  Places: 'Yerler',
  Transport: 'Ulaşım',
  Adjectives: 'Sıfatlar',
  Time: 'Zaman',
  Weather: 'Hava Durumu',
  Phrases: 'İfadeler',
  Nouns: 'İsimler',
  Pronouns: 'Zamirler',
  Adverbs: 'Zarflar',
  Prepositions: 'Edatlar',
  ALL: 'Tümü',
};

// 9-9-9 Perfectly balanced keyboard layout for mobile screens (Ç placed directly after C, all 26 letters + Backspace)
const KEYBOARD_ROW1 = ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'H']; // 9 keys
const KEYBOARD_ROW2 = ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']; // 9 keys
const KEYBOARD_ROW3 = ['R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];      // 8 keys + 1 Backspace = 9 slots

// Accent normalizer to allow typing standard keys on physical keyboard
const ACCENT_MAP: Record<string, string[]> = {
  A: ['Á', 'À', 'Â', 'Ã', 'A'],
  E: ['É', 'Ê', 'E'],
  I: ['Í', 'I'],
  O: ['Ó', 'Ô', 'Õ', 'O'],
  U: ['Ú', 'U'],
  C: ['Ç', 'C'],
};

export default function Game8({ onScore, language }: Props): React.ReactElement {
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Mixed');
  const [puzzle, setPuzzle] = useState<CrosswordPuzzle | null>(null);
  const [activeWordId, setActiveWordId] = useState<string>('');
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [cellStatus, setCellStatus] = useState<Record<string, 'correct' | 'wrong' | null>>({});
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());

  // Load words from data module
  useEffect(() => {
    import('../data/words').then((m) => {
      setAllWords(m.kidsWords);
    });
  }, []);

  // Filter words by selected category
  const filteredWords = useMemo(() => {
    if (!allWords.length) return [];
    if (selectedCategory === 'ALL' || selectedCategory === 'Mixed') return allWords;
    return allWords.filter((w) => w.category === selectedCategory);
  }, [allWords, selectedCategory]);

  // Generate / Regenerate a puzzle
  const initPuzzle = useCallback(() => {
    if (!filteredWords.length) return;
    const newPuzzle = generateCrossword(filteredWords, 12);
    if (newPuzzle && newPuzzle.wordList.length > 0) {
      setPuzzle(newPuzzle);
      setUserInputs({});
      setCellStatus({});
      setCompletedWords(new Set());
      const firstWord = newPuzzle.wordList[0];
      setActiveWordId(firstWord.id);
      setSelectedCell(firstWord.cells[0]);
    }
  }, [filteredWords]);

  useEffect(() => {
    if (filteredWords.length > 0) {
      initPuzzle();
    }
  }, [filteredWords, initPuzzle]);

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, []);

  const activeWord: PlacedWord | undefined = puzzle?.words[activeWordId];

  // Handler for selecting a word
  const selectWord = useCallback(
    (wordId: string, preferredCell?: [number, number]) => {
      setActiveWordId(wordId);
      const w = puzzle?.words[wordId];
      if (!w) return;

      if (preferredCell) {
        setSelectedCell(preferredCell);
      } else {
        const emptyCell = w.cells.find(([r, c]) => !userInputs[`${r},${c}`]);
        setSelectedCell(emptyCell || w.cells[0]);
      }
    },
    [puzzle, userInputs]
  );

  // Handler for clicking a letter cell
  const handleLetterCellClick = (r: number, c: number, wordIds: string[]) => {
    const isCurrentCell = selectedCell && selectedCell[0] === r && selectedCell[1] === c;

    if (isCurrentCell && wordIds.length > 1) {
      const nextWordId = wordIds.find((id) => id !== activeWordId) || wordIds[0];
      selectWord(nextWordId, [r, c]);
    } else if (wordIds.includes(activeWordId)) {
      setSelectedCell([r, c]);
    } else {
      selectWord(wordIds[0], [r, c]);
    }
  };

  // Check if a word is complete and trigger audio + score
  const checkWordCompletion = useCallback(
    (wordId: string, currentInputs: Record<string, string>) => {
      const w = puzzle?.words[wordId];
      if (!w || completedWords.has(wordId)) return;

      const isCompleteAndCorrect = w.cells.every(([r, c], idx) => {
        const char = currentInputs[`${r},${c}`];
        return char === w.id[idx];
      });

      if (isCompleteAndCorrect) {
        setCompletedWords((prev) => new Set(prev).add(wordId));
        speakText(w.word.pt);
        onScore(10);
      }
    },
    [puzzle, completedWords, onScore]
  );

  // Type a letter into the currently selected cell
  const typeLetter = useCallback(
    (charInput: string) => {
      if (!selectedCell || !puzzle || !activeWord) return;
      const [r, c] = selectedCell;
      const cell = puzzle.grid[r][c];
      if (cell.type !== 'letter') return;

      let charToSet = charInput.toUpperCase();

      const sol = cell.solution;
      if (ACCENT_MAP[charToSet]?.includes(sol)) {
        charToSet = sol;
      }

      const key = `${r},${c}`;
      const newInputs = { ...userInputs, [key]: charToSet };
      setUserInputs(newInputs);
      setCellStatus((prev) => ({ ...prev, [key]: null }));

      const cellIdx = activeWord.cells.findIndex(([cr, cc]) => cr === r && cc === c);
      if (cellIdx !== -1 && cellIdx + 1 < activeWord.cells.length) {
        setSelectedCell(activeWord.cells[cellIdx + 1]);
      }

      cell.wordIds.forEach((wId) => checkWordCompletion(wId, newInputs));
    },
    [selectedCell, puzzle, activeWord, userInputs, checkWordCompletion]
  );

  // Backspace / Delete handler
  const deleteLetter = useCallback(() => {
    if (!selectedCell || !activeWord) return;
    const [r, c] = selectedCell;
    const key = `${r},${c}`;

    if (userInputs[key]) {
      setUserInputs((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setCellStatus((prev) => ({ ...prev, [key]: null }));
    } else {
      const cellIdx = activeWord.cells.findIndex(([cr, cc]) => cr === r && cc === c);
      if (cellIdx > 0) {
        const prevCell = activeWord.cells[cellIdx - 1];
        const prevKey = `${prevCell[0]},${prevCell[1]}`;
        setSelectedCell(prevCell);
        setUserInputs((prev) => {
          const next = { ...prev };
          delete next[prevKey];
          return next;
        });
        setCellStatus((prev) => ({ ...prev, [prevKey]: null }));
      }
    }
  }, [selectedCell, activeWord, userInputs]);

  // Give 1-letter hint
  const handleHint = () => {
    if (!selectedCell || !puzzle || !activeWord) return;
    const [r, c] = selectedCell;
    const cell = puzzle.grid[r][c];
    if (cell.type !== 'letter') return;

    const key = `${r},${c}`;
    const newInputs = { ...userInputs, [key]: cell.solution };
    setUserInputs(newInputs);
    setCellStatus((prev) => ({ ...prev, [key]: 'correct' }));

    const nextEmpty = activeWord.cells.find(([cr, cc]) => !newInputs[`${cr},${cc}`]);
    if (nextEmpty) {
      setSelectedCell(nextEmpty);
    }

    cell.wordIds.forEach((wId) => checkWordCompletion(wId, newInputs));
  };

  // Check all answers
  const handleCheck = () => {
    if (!puzzle) return;
    const newStatus: Record<string, 'correct' | 'wrong' | null> = {};

    puzzle.grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.type === 'letter') {
          const key = `${r},${c}`;
          const input = userInputs[key];
          if (!input) {
            newStatus[key] = null;
          } else if (input === cell.solution) {
            newStatus[key] = 'correct';
          } else {
            newStatus[key] = 'wrong';
          }
        }
      });
    });

    setCellStatus(newStatus);
  };

  // Reveal all answers
  const handleRevealAll = () => {
    if (!puzzle) return;
    const filled: Record<string, string> = {};
    const status: Record<string, 'correct' | 'wrong' | null> = {};

    puzzle.grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.type === 'letter') {
          const key = `${r},${c}`;
          filled[key] = cell.solution;
          status[key] = 'correct';
        }
      });
    });

    setUserInputs(filled);
    setCellStatus(status);
    setCompletedWords(new Set(puzzle.wordList.map((w) => w.id)));
  };

  // Physical keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLetter();
        return;
      }

      if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        if (!selectedCell || !puzzle) return;
        e.preventDefault();
        const [r, c] = selectedCell;
        const dr = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        const dc = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < puzzle.height && nc >= 0 && nc < puzzle.width) {
          const nextCell = puzzle.grid[nr][nc];
          if (nextCell.type === 'letter') {
            handleLetterCellClick(nr, nc, nextCell.wordIds);
          }
        }
        return;
      }

      if (/^[a-zA-ZçÇáÁéÉíÍóÓúÚãÃõÕâÂêÊôÔ]$/.test(e.key)) {
        typeLetter(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteLetter, typeLetter, selectedCell, puzzle]);

  // Compute active word letter progress string
  const activeWordProgress = useMemo(() => {
    if (!activeWord) return '';
    return activeWord.cells.map(([r, c]) => userInputs[`${r},${c}`] || '_').join(' ');
  }, [activeWord, userInputs]);

  // Calculate score
  const totalWords = puzzle?.wordList.length || 0;
  const solvedCount = completedWords.size;

  return (
    <div className="game8-container">
      {/* ── Top Header Row: Title + Category Switcher side-by-side ── */}
      <div className="game8-header-row">
        <div className="game8-header-main">
          <div className="game8-badge">
            {CATEGORY_EMOJI[selectedCategory] || '✏️'}
          </div>
          <h2 className="game8-title">
            {language === 'tr' ? 'ÇENGEL' : 'CROSSWORD'}
          </h2>
          <select
            className="game8-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label={language === 'tr' ? 'Kategori Seç' : 'Select Category'}
          >
            {CATEGORY_LIST.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_EMOJI[cat]} {language === 'tr' ? CATEGORY_TR[cat] : (cat === 'ALL' ? 'All' : cat)}
              </option>
            ))}
          </select>
        </div>

        <div className="game8-header-meta">
          <button
            className="game8-new-btn"
            onClick={initPuzzle}
            title={language === 'tr' ? 'Yeni rastgele bulmaca üret' : 'Generate new random puzzle'}
          >
            <Dices size={14} />
            <span className="game8-new-btn-text">{language === 'tr' ? 'Yeni' : 'New'}</span>
          </button>

          <div className="game8-score-pill">
            ⭐ {solvedCount}/{totalWords}
          </div>
        </div>
      </div>

      {/* ── Active Clue Focus Banner (2 Clean Rows on Mobile) ── */}
      {activeWord && (
        <div className="game8-active-banner">
          {/* Row 1: Clue Direction Badge + Text + Audio Button */}
          <div className="game8-banner-row1">
            <div className="game8-banner-clue-wrap">
              <span className="game8-dir-badge">
                {activeWord.dir === 'across'
                  ? (language === 'tr' ? 'SAĞA ▶' : 'ACROSS ▶')
                  : (language === 'tr' ? 'AŞAĞI ▼' : 'DOWN ▼')}
              </span>
              <span className="game8-active-clue-text" title={language === 'tr' ? activeWord.word.tr : activeWord.word.en}>
                {activeWord.word.emoji}{' '}
                {language === 'tr' ? activeWord.word.tr : activeWord.word.en}
              </span>
            </div>

            <button
              className="game8-btn-action game8-btn-action--sound"
              onClick={() => speakText(activeWord.word.pt)}
              title={language === 'tr' ? 'Telaffuzunu Dinle' : 'Listen pronunciation'}
              aria-label={language === 'tr' ? 'Telaffuzunu Dinle' : 'Listen pronunciation'}
            >
              <Volume2 size={15} />
            </button>
          </div>

          {/* Row 2: Letters Preview + Hint / Check / Solve Buttons */}
          <div className="game8-banner-row2">
            <div className="game8-active-word-preview">
              <span className={`game8-preview-letters${completedWords.has(activeWord.id) ? ' game8-preview-letters--completed' : ''}`}>
                {completedWords.has(activeWord.id) ? '✅ ' : ''}{activeWordProgress}
              </span>
              <span className="game8-letter-count">
                ({activeWord.id.length} {language === 'tr' ? 'harf' : 'letters'})
              </span>
            </div>

            <div className="game8-active-actions">
              <button
                className="game8-btn-action game8-btn-action--hint"
                onClick={handleHint}
                title={language === 'tr' ? 'Seçili kareye harf ver' : 'Reveal letter hint'}
              >
                💡 {language === 'tr' ? 'İpucu' : 'Hint'}
              </button>
              <button
                className="game8-btn-action game8-btn-action--check"
                onClick={handleCheck}
                title={language === 'tr' ? 'Cevapları kontrol et' : 'Check answers'}
              >
                ✅ {language === 'tr' ? 'Kontrol' : 'Check'}
              </button>
              <button
                className="game8-btn-action game8-btn-action--reveal"
                onClick={handleRevealAll}
                title={language === 'tr' ? 'Tüm cevapları göster' : 'Show all answers'}
              >
                👁️ {language === 'tr' ? 'Çözüm' : 'Solve'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Arrowword Board ── */}
      {puzzle && (
        <div className="game8-board-wrapper">
          <div
            className="game8-board"
            style={{
              gridTemplateColumns: `repeat(${puzzle.width}, minmax(0, 1fr))`,
              width: `${Math.min(460, Math.max(280, puzzle.width * 38))}px`,
            }}
          >
            {puzzle.grid.map((row, r) =>
              row.map((cell, c) => {
                const key = `${r},${c}`;

                if (cell.type === 'block') {
                  return <div key={key} className="game8-cell-block" />;
                }

                if (cell.type === 'clue') {
                  if (cell.clueType === 'single') {
                    const cl = cell.clue;
                    const isActive = activeWordId === cl.wordId;
                    const clueText = language === 'tr' ? cl.word.tr : cl.word.en;

                    return (
                      <div
                        key={key}
                        className={`game8-cell-clue${isActive ? ' game8-cell-clue--active' : ''}`}
                        title={clueText}
                        onClick={() => selectWord(cl.wordId)}
                      >
                        <span className="game8-clue-label">
                          {formatBoxClue(clueText)}
                        </span>
                        <span
                          className={
                            cl.arrow === 'right'
                              ? 'game8-arrow-right'
                              : 'game8-arrow-down'
                          }
                        />
                      </div>
                    );
                  }

                  // Split Clue Cell
                  const topCl = cell.topClue;
                  const botCl = cell.bottomClue;
                  const isTopActive = activeWordId === topCl.wordId;
                  const isBotActive = activeWordId === botCl.wordId;
                  const topText = language === 'tr' ? topCl.word.tr : topCl.word.en;
                  const botText = language === 'tr' ? botCl.word.tr : botCl.word.en;

                  return (
                    <div key={key} className="game8-cell-split">
                      <div
                        className={`game8-split-half${isTopActive ? ' game8-split-half--active' : ''}`}
                        title={topText}
                        onClick={() => selectWord(topCl.wordId)}
                      >
                        <span className="game8-clue-label">
                          {formatBoxClue(topText)}
                        </span>
                        <span className="game8-arrow-right" />
                      </div>
                      <div className="game8-split-divider" />
                      <div
                        className={`game8-split-half${isBotActive ? ' game8-split-half--active' : ''}`}
                        title={botText}
                        onClick={() => selectWord(botCl.wordId)}
                      >
                        <span className="game8-clue-label">
                          {formatBoxClue(botText)}
                        </span>
                        <span className="game8-arrow-down" />
                      </div>
                    </div>
                  );
                }

                // Letter Cell
                const isSelected = selectedCell && selectedCell[0] === r && selectedCell[1] === c;
                const isWordHighlighted = cell.wordIds.includes(activeWordId);
                const status = cellStatus[key];
                const charVal = userInputs[key] || '';

                let cellClass = 'game8-cell-letter';
                if (isSelected) {
                  cellClass += ' game8-cell-letter--selected';
                } else if (isWordHighlighted) {
                  cellClass += ' game8-cell-letter--highlight';
                }
                if (status === 'correct') {
                  cellClass += ' game8-cell-letter--correct';
                } else if (status === 'wrong') {
                  cellClass += ' game8-cell-letter--wrong';
                }

                return (
                  <div
                    key={key}
                    className={cellClass}
                    onClick={() => handleLetterCellClick(r, c, cell.wordIds)}
                  >
                    {cell.startArrows.map((dir, idx) => (
                      <span
                        key={idx}
                        className={
                          dir === 'right'
                            ? 'game8-start-arrow-right'
                            : 'game8-start-arrow-down'
                        }
                      />
                    ))}
                    <span>{charVal}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ── Virtual Portuguese Keyboard (9-9-9 Balanced, No Orphans) ── */}
      <div className="game8-keyboard">
        {/* Row 1: A-H including Ç (9 keys) */}
        <div className="game8-keyboard-row">
          {KEYBOARD_ROW1.map((ch) => (
            <button
              key={ch}
              className="game8-key-btn"
              onClick={() => typeLetter(ch)}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Row 2: J-R (9 keys) */}
        <div className="game8-keyboard-row">
          {KEYBOARD_ROW2.map((ch) => (
            <button
              key={ch}
              className="game8-key-btn"
              onClick={() => typeLetter(ch)}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Row 3: S-Z (8 keys) + Backspace (1 key) = 9 slots */}
        <div className="game8-keyboard-row">
          {KEYBOARD_ROW3.map((ch) => (
            <button
              key={ch}
              className="game8-key-btn"
              onClick={() => typeLetter(ch)}
            >
              {ch}
            </button>
          ))}
          <button
            className="game8-key-btn game8-key-btn--backspace"
            onClick={deleteLetter}
            title={language === 'tr' ? 'Harf sil' : 'Delete letter'}
          >
            ⌫ {language === 'tr' ? 'Sil' : 'Del'}
          </button>
        </div>
      </div>
    </div>
  );
}
