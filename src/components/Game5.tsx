import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Word } from '../data/index';
import { cancelSpeech, speakText } from '../utils/speech';
import WordImage from '../commons/WordImage.tsx';
import GameScoreBadge from '../commons/GameScoreBadge.tsx';
import '../styles/Game5.scss';

interface Props {
  onScore: (pts: number) => void;
  language: 'en' | 'tr';
  gameScore?: number;
  recentGain?: number | null;
  gainKey?: number;
}

export default function Game5({
  onScore,
  language,
  gameScore = 0,
  recentGain = null,
  gainKey,
}: Props): React.ReactElement {
  const [words, setWords] = useState<Word[]>([]);
  const [target, setTarget] = useState<Word | null>(null);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [input, setInput] = useState<string[]>([]);
  const [hidden, setHidden] = useState<boolean[]>([]);
  const [animClass, setAnimClass] = useState('');
  const [history, setHistory] = useState<Word[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const hadResetRef = useRef<boolean>(false);

  const loadWord = useCallback((word: Word) => {
    setTarget(word);
    hadResetRef.current = false;
    speakText(word.pt);
    const sc = word.pt.split('').sort(() => Math.random() - 0.5);
    setScrambled(sc);
    setInput([]);
    setHidden(new Array(sc.length).fill(false));
    setAnimClass('');
  }, []);

  useEffect(() => {
    import('../data/words').then((m) => setWords(m.kidsWords));
  }, []);

  const loadNew = useCallback(() => {
    if (!words.length) return;
    const valid = words.filter((w) => w.pt.length >= 3 && w.pt.length <= 8 && !w.pt.includes(' '));
    const t = valid[Math.floor(Math.random() * valid.length)];
    setHistory((prev) => {
      const next = [...prev, t];
      setHistoryIdx(next.length - 1);
      return next;
    });
    loadWord(t);
  }, [words, loadWord]);

  useEffect(() => { loadNew(); }, [loadNew]);
  useEffect(() => () => { cancelSpeech(); }, []);

  function handlePrev() {
    setHistoryIdx((idx) => {
      const newIdx = idx - 1;
      loadWord(history[newIdx]);
      return newIdx;
    });
  }

  function handleNext() {
    const nextIdx = historyIdx + 1;
    if (nextIdx < history.length) {
      setHistoryIdx(nextIdx);
      loadWord(history[nextIdx]);
    } else {
      loadNew();
    }
  }

  function handleLetter(idx: number, char: string) {
    if (!target || hidden[idx]) return;
    const newInput = [...input, char];
    const newHidden = [...hidden];
    newHidden[idx] = true;
    setInput(newInput);
    setHidden(newHidden);

    if (newInput.length === target.pt.length) {
      if (newInput.join('') === target.pt) {
        setAnimClass('correct-anim');
        const base = target.pt.length <= 4 ? 10 : 14;
        const bonus = hadResetRef.current ? 0 : 3;
        onScore(base + bonus);
        speakText(target.pt);
        setTimeout(() => { setAnimClass(''); loadNew(); }, 1200);
      } else {
        hadResetRef.current = true;
        setAnimClass('wrong-anim');
        speakText(target.pt);
        setTimeout(() => { setAnimClass(''); handleReset(); }, 600);
      }
    }
  }

  function handleReset() {
    hadResetRef.current = true;
    setInput([]);
    if (scrambled.length > 0) setHidden(new Array(scrambled.length).fill(false));
  }

  const remaining = target ? target.pt.length - input.length : 0;
  const slots = input.join(' ') + (input.length > 0 ? ' ' : '') + '_ '.repeat(remaining);

  return (
    <div className={`game-container ${animClass}`} style={{ display: 'block', borderColor: '#f97316' }}>
      <GameScoreBadge score={gameScore} recentGain={recentGain} gainKey={gainKey} />
      <h2 style={{ color: '#f97316', margin: 0 }}>🧩 {language === 'tr' ? 'Kelimeyi Bul' : 'Unscramble Word'}</h2>
      <WordImage
        en={target?.en ?? ''}
        emoji={target?.emoji ?? '🍎'}
        size={120}
        className="game-target"
        onClick={() => target && speakText(target.pt)}
      />
      <div className="scramble-slots">{slots}</div>
      <div className="hint-text">{language === 'tr' ? `Anlamı: ${target?.tr ?? ''}` : `Meaning: ${target?.en ?? ''}`}</div>
      <div className="scramble-letters">
        {scrambled.map((char, idx) => (
          <button
            key={idx}
            className="scramble-btn"
            style={{ visibility: hidden[idx] ? 'hidden' : 'visible' }}
            onClick={() => handleLetter(idx, char)}
          >
            {char}
          </button>
        ))}
      </div>
      <div className="scramble-controls">
        <button className="btn-nav" onClick={handlePrev} disabled={historyIdx <= 0}>◀</button>
        <button className="btn-reset" onClick={handleReset}>🔄 {language === 'tr' ? 'Sıfırla' : 'Reset'}</button>
        <button className="btn-nav" onClick={handleNext}>▶</button>
      </div>
    </div>
  );
}
