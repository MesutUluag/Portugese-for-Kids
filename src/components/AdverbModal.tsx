import React from 'react';
import { adverbByWord } from '../data/adverbData';
import type { AdverbEntry } from '../data/adverbData';
import { speakText } from '../utils/speech';
import '../styles/AdverbModal.scss';

interface Props {
  word: string;
  language: 'en' | 'tr';
  onClose: () => void;
}

function AudioBtn({ form }: { form: string }) {
  return (
    <button
      className="adv-audio-btn"
      aria-label={`Speak ${form}`}
      onClick={(e) => {
        e.stopPropagation();
        speakText(form, { rate: 0.65 });
      }}
    >
      🔊
    </button>
  );
}

function ExampleCard({ entry, language }: { entry: AdverbEntry; language: 'en' | 'tr' }) {
  const isTr = language === 'tr';
  return (
    <div className="adv-entry">
      {/* Word header */}
      <div className="adv-entry-header">
        <span className="adv-entry-emoji">{entry.emoji}</span>
        <span className="adv-entry-word">{entry.word}</span>
        <AudioBtn form={entry.word} />
        <span className="adv-entry-meaning">
          {isTr ? entry.meaningTr : entry.meaningEn}
        </span>
        <span className="adv-use-badge">
          {isTr ? entry.useCaseTr : entry.useCaseEn}
        </span>
      </div>
      {/* Example sentences */}
      <div className="adv-examples">
        {entry.examples.map((ex) => (
          <div key={ex.pt} className="adv-example-row">
            <span className="adv-example-pt">
              💬 {ex.pt}
              <AudioBtn form={ex.pt} />
            </span>
            <span className="adv-example-trans">
              {isTr ? ex.tr : ex.en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdverbModal({ word, language, onClose }: Props): React.ReactElement | null {
  const isTr = language === 'tr';
  const entry = adverbByWord[word];

  if (!entry) return null;

  const titleLabel = isTr
    ? `${word.toUpperCase()} — Kullanım Örnekleri`
    : `${word.toUpperCase()} — Use Cases`;

  return (
    <div className="adv-backdrop" onClick={onClose}>
      <div className="adv-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="adv-header-row">
          <span className="adv-title-pill">⚡ {titleLabel}</span>
          <button className="adv-close" onClick={onClose} aria-label="Close">
            <span>×</span>
          </button>
        </div>

        {/* ── Single adverb examples ── */}
        <div className="adv-entries-list">
          <ExampleCard entry={entry} language={language} />
        </div>

      </div>
    </div>
  );
}
