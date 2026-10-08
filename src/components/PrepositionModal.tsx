import React from 'react';
import type { PrepGroup } from '../data/words';
import { speakText } from '../utils/speech';
import '../styles/PrepositionModal.scss';

interface Props {
  group: PrepGroup;
  language: 'en' | 'tr';
  onClose: () => void;
}

// ── Article header definitions ────────────────────────────────────────────────
const DEF_ARTICLES  = [
  { pt: 'o',    en: 'the',   tr: 'the' },
  { pt: 'a',    en: 'the',   tr: 'the' },
  { pt: 'os',   en: 'the',   tr: 'the' },
  { pt: 'as',   en: 'the',   tr: 'the' },
];
const INDEF_ARTICLES = [
  { pt: 'um',   en: 'a, an', tr: 'bir' },
  { pt: 'uma',  en: 'a, an', tr: 'bir' },
  { pt: 'uns',  en: 'some',  tr: 'bazı' },
  { pt: 'umas', en: 'some',  tr: 'bazı' },
];

function AudioBtn({ form }: { form: string }) {
  return (
    <button
      className="prep-audio-btn"
      aria-label={`Speak ${form}`}
      onClick={(e) => { e.stopPropagation(); speakText(form, { rate: 0.65 }); }}
    >
      🔊
    </button>
  );
}

interface GridTableProps {
  rows: PrepGroup[];
  articles: typeof DEF_ARTICLES;
  kind: 'definite' | 'indefinite';
  language: 'en' | 'tr';
}

function GridTable({ rows, articles, kind, language }: GridTableProps) {
  const isTr = language === 'tr';

  return (
    <div className="prep-grid-wrapper">
      <table className="prep-grid-table">
        <thead>
          <tr>
            {/* top-left corner cell */}
            <th className="prep-grid-corner" />
            {articles.map((art) => (
              <th key={art.pt} className="prep-grid-art-header">
                <span className="prep-grid-art-word">{art.pt}</span>
                <span className="prep-grid-art-hint">{isTr ? art.tr : art.en}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((g) => {
            const contractions = kind === 'definite' ? g.definite : (g.indefinite ?? []);
            return (
              <tr key={g.base}>
                <td className="prep-grid-base-cell">
                  <div className="prep-grid-base-pill">
                    <span className="prep-grid-base-word">{g.base}</span>
                    <AudioBtn form={g.base} />
                    <span className="prep-grid-base-hint">
                      {isTr ? g.baseTr : g.baseEn}
                    </span>
                  </div>
                </td>
                {contractions.map((c) => (
                  <td key={c.pt} className="prep-grid-contr-cell">
                    <div className="prep-grid-contr-pill">
                      <span className="prep-grid-contr-word">{c.pt}</span>
                      <AudioBtn form={c.pt} />
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function PrepositionModal({ group, language, onClose }: Props): React.ReactElement {
  const isTr = language === 'tr';

  const hasDefiniteSection   = group.definite.length > 0;
  const hasIndefiniteSection = (group.indefinite?.length ?? 0) > 0;
  const hasSpokenSection     = (group.spoken?.length ?? 0) > 0;
  const hasTip               = !!group.tip;

  const titleLabel   = isTr
    ? `${group.base.toUpperCase()} — Edatı ve Birleşimleri`
    : `${group.base.toUpperCase()} — Preposition & Contractions`;

  const defLabel     = isTr
    ? 'Belirli Artikel + Edat Birleşimleri'
    : 'Preposition + Definite Article Contractions';
  const indefLabel   = isTr
    ? 'Belirsiz Artikel + Edat Birleşimleri'
    : 'Preposition + Indefinite Article Contractions';
  const spokenLabel  = isTr
    ? 'Konuşma Dili Birleşimleri (Gayri Resmi)'
    : 'Spoken / Informal Contractions';
  const formalNote   = isTr
    ? '📝 Resmi yazımda "para" herhangi bir artikel ile birleşmez (para o, para a … olarak ayrı yazılır).'
    : '📝 In formal written Portuguese, "para" does not contract with articles (written separately: para o, para a …).';
  const exLabel      = isTr ? 'Örnek Cümleler' : 'Example Sentences';
  const tipLabel     = isTr ? 'İpucu' : 'Quick Tip';

  return (
    <div className="prep-backdrop" onClick={onClose}>
      <div className="prep-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="prep-header-row">
          <span className="prep-title-pill">{titleLabel}</span>
          <button className="prep-close" onClick={onClose} aria-label="Close"><span>×</span></button>
        </div>

        {/* ── Definite contractions grid ── */}
        {hasDefiniteSection && (
          <>
            <div className="prep-section-label">{defLabel}</div>
            <GridTable
              rows={[group]}
              articles={DEF_ARTICLES}
              kind="definite"
              language={language}
            />
          </>
        )}

        {/* ── Indefinite contractions grid ── */}
        {hasIndefiniteSection && (
          <>
            <div className="prep-section-label">{indefLabel}</div>
            <GridTable
              rows={[group]}
              articles={INDEF_ARTICLES}
              kind="indefinite"
              language={language}
            />
          </>
        )}

        {/* ── Spoken / informal contractions ── */}
        {hasSpokenSection && (
          <>
            <div className="prep-section-label">{spokenLabel}</div>
            <p className="prep-formal-note">{formalNote}</p>
            <div className="prep-spoken-table">
              <div className="prep-spoken-header-row">
                <span className="prep-spoken-col-head">Formal</span>
                <span className="prep-spoken-col-head">Spoken</span>
                <span className="prep-spoken-col-head">Example</span>
              </div>
              {group.spoken!.map((c) => {
                const examples: Record<string, { pt: string; en: string; tr: string }> = {
                  pro:  { pt: 'Eu vou pro mercado.',          en: 'I go to the market.',          tr: 'Pazara gidiyorum.' },
                  pra:  { pt: 'Comprei flores pra mãe.',      en: 'I bought flowers for mum.',    tr: 'Annem için çiçek aldım.' },
                  pros: { pt: 'Vou falar pros meninos.',      en: "I'll talk to the boys.",       tr: 'Çocuklarla konuşacağım.' },
                  pras: { pt: 'Isto é pras meninas.',         en: 'This is for the girls.',       tr: 'Bu kızlar için.' },
                };
                const ex = examples[c.pt];
                return (
                  <div key={c.pt} className="prep-spoken-row">
                    <span className="prep-spoken-formal">{isTr ? c.trHint.split('→')[0].trim() : c.enHint.split('→')[0].trim()}</span>
                    <span className="prep-spoken-form">
                      <strong>{c.pt}</strong>
                      <AudioBtn form={c.pt} />
                    </span>
                    <span className="prep-spoken-example">
                      {ex && (
                        <>
                          <em>{ex.pt}</em>
                          <AudioBtn form={ex.pt} />
                          <span className="prep-spoken-trans">{isTr ? ex.tr : ex.en}</span>
                        </>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Example sentences ── */}
        <div className="prep-section-label">{exLabel}</div>
        <div className="prep-examples-list">
          {group.examples.map((ex) => {
            const label = isTr ? ex.labelTr : ex.label;
            return (
              <div key={ex.pt} className="prep-example-box">
                {label && <span className="prep-example-label">{label}</span>}
                <span className="prep-example-pt">
                  💬 {ex.pt} <AudioBtn form={ex.pt} />
                </span>
                <span className="prep-example-tr">
                  {isTr ? ex.tr : ex.en}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Quick tip ── */}
        {hasTip && (
          <>
            <div className="prep-section-label">{tipLabel}</div>
            <div className="prep-tip-box">
              {isTr ? group.tip!.tr : group.tip!.en}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
