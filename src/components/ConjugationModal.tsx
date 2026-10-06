import React, { useState, useEffect } from 'react';
import { verbConjugations } from '../data/verbConjugations';
import type { ConjugationRow, SpecialUse } from '../data/verbConjugations';
import { speakText } from '../utils/speech';
import '../styles/ConjugationModal.scss';

interface Props {
  verb: string;
  initialLevel: 'a1' | 'a2';
  language: 'en' | 'tr';
  onClose: () => void;
}

// Fixed futuro próximo prefixes per pronoun (same order as ConjugationRow)
const FP_PREFIXES = ['vou', 'vais', 'vai', 'vamos', 'vão'];
// Fixed ação contínua prefixes
const AC_PREFIXES = ['estou a', 'estás a', 'está a', 'estamos a', 'estão a'];

function AudioBtn({ form }: { form: string }) {
  return (
    <button
      className="conj-audio-btn"
      aria-label={`Speak ${form}`}
      onClick={(e) => {
        e.stopPropagation();
        speakText(form);
      }}
    >
      🔊
    </button>
  );
}

interface A1TableProps {
  rows: ConjugationRow[];
  infinitive: string;
  exPresente: string;
  exFuturo: string;
  exContinua: string;
  exPresenteEn: string;
  exFuturoEn: string;
  exContinuaEn: string;
  exPresenteTr: string;
  exFuturoTr: string;
  exContinuaTr: string;
  specialUse?: SpecialUse;
  language: 'en' | 'tr';
}

function A1Table({ rows, infinitive, exPresente, exFuturo, exContinua, exPresenteEn, exFuturoEn, exContinuaEn, exPresenteTr, exFuturoTr, exContinuaTr, specialUse, language }: A1TableProps) {
  const isTr = language === 'tr';

  const presenteHint  = isTr ? '🟢 Şu an / Her zaman'  : '🟢 Right now / Always';
  const futuroHint    = isTr ? '🔜 Yakın gelecek'       : '🔜 Near future';
  const continuaHint  = isTr ? '🔁 Devam eden eylem'    : '🔁 Ongoing action';

  return (
    <>
    <div className="conj-table-wrapper">
      <table className="conj-table">
        <thead>
          <tr>
            <th>PRONOME</th>
            <th>
              PRESENTE
              <span className="conj-th-hint">{presenteHint}</span>
            </th>
            <th>
              FUTURO PRÓXIMO
              <span className="conj-th-hint">{futuroHint}</span>
            </th>
            <th>
              AÇÃO CONTÍNUA
              <span className="conj-th-hint">{continuaHint}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const fp = `${FP_PREFIXES[i]} ${infinitive}`;
            const ac = `${AC_PREFIXES[i]} ${infinitive}`;
            return (
              <tr key={row.pronoun}>
                <td className="conj-pronoun">{row.pronoun}</td>
                <td className="conj-form">
                  {row.form} <AudioBtn form={row.form} />
                </td>
                <td className="conj-form">
                  {fp} <AudioBtn form={fp} />
                </td>
                <td className="conj-form">
                  {ac} <AudioBtn form={ac} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="conj-examples-row">
      <span className="conj-example">
        {`💬 ${exPresente}`}
        <span className="conj-example-translation">{isTr ? exPresenteTr : exPresenteEn}</span>
      </span>
      <span className="conj-example">
        {`💬 ${exFuturo}`}
        <span className="conj-example-translation">{isTr ? exFuturoTr : exFuturoEn}</span>
      </span>
      <span className="conj-example">
        {`💬 ${exContinua}`}
        <span className="conj-example-translation">{isTr ? exContinuaTr : exContinuaEn}</span>
      </span>
    </div>

    {specialUse && (
      <div className="conj-special-use">
        <div className="conj-special-use-header">
          <span className="conj-special-use-formula">{specialUse.formula}</span>
          <span className="conj-special-use-desc">
            {language === 'tr' ? specialUse.descTr : specialUse.descEn}
          </span>
        </div>
        <div className="conj-special-use-examples">
          {specialUse.examples.map((ex) => (
            <span key={ex.pt} className="conj-example">
              {`💬 ${ex.pt}`}
              <span className="conj-example-translation">
                {language === 'tr' ? ex.tr : ex.en}
              </span>
            </span>
          ))}
        </div>
      </div>
    )}
    </>
  );
}

interface A2TableProps {
  perfeito: ConjugationRow[];
  imperfeito: ConjugationRow[];
  language: 'en' | 'tr';
}

function A2Table({ perfeito, imperfeito, language }: A2TableProps) {
  const isTr = language === 'tr';

  const perfeitoHint   = isTr ? '🎯 Bitmiş / Dün'         : '🎯 Completed / Yesterday';
  const imperfeitoHint = isTr ? '🔄 Alışkanlık / Geçmiş'  : '🔄 Habit / Past';

  const perfeitoExample   = `💬 Ontem ${perfeito[0].form} muito.`;
  const imperfeitoExample = `💬 Antigamente ${imperfeito[0].form} muito.`;

  return (
    <>
      <div className="conj-table-wrapper">
        <table className="conj-table">
          <thead>
            <tr>
              <th>PRONOME</th>
              <th>
                PRETÉRITO PERFEITO
                <span className="conj-th-hint">{perfeitoHint}</span>
              </th>
              <th>
                PRETÉRITO IMPERFEITO
                <span className="conj-th-hint">{imperfeitoHint}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {perfeito.map((row, i) => (
              <tr key={row.pronoun}>
                <td className="conj-pronoun">{row.pronoun}</td>
                <td className="conj-form">
                  {row.form} <AudioBtn form={row.form} />
                </td>
                <td className="conj-form">
                  {imperfeito[i].form} <AudioBtn form={imperfeito[i].form} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="conj-examples-row">
        <span className="conj-example">{perfeitoExample}</span>
        <span className="conj-example">{imperfeitoExample}</span>
      </div>
    </>
  );
}

export default function ConjugationModal({ verb, initialLevel, language, onClose }: Props): React.ReactElement | null {
  const [activeLevel, setActiveLevel] = useState<'a1' | 'a2'>(initialLevel);

  // Sync level when a different verb/level is opened without unmounting
  useEffect(() => {
    setActiveLevel(initialLevel);
  }, [verb, initialLevel]);

  const data = verbConjugations[verb];
  if (!data) return null;

  const isTr = language === 'tr';
  const verbDisplay = verb.toUpperCase();

  return (
    <div className="conjugation-backdrop" onClick={onClose}>
      <div
        className="conjugation-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header row ─────────────────────────────────────────────── */}
        <div className="conjugation-header-row">
          <span className="conjugation-verb-pill">
            {verbDisplay}: Conjugações ({activeLevel.toUpperCase()} {isTr ? 'Seviyesi' : 'Level'})
          </span>

          <div className="conj-header-levels">
            <button
              className={`verb-level-btn${activeLevel === 'a1' ? ' verb-level-btn--active' : ''}`}
              onClick={() => setActiveLevel('a1')}
            >
              A1
            </button>
            <button
              className={`verb-level-btn${activeLevel === 'a2' ? ' verb-level-btn--active' : ''}`}
              onClick={() => setActiveLevel('a2')}
            >
              A2
            </button>
          </div>

          <button className="conjugation-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* ── A1 content ─────────────────────────────────────────────── */}
        {activeLevel === 'a1' && (
          <div className="conj-content">
            <A1Table
              rows={data.a1.presente}
              infinitive={verb}
              exPresente={data.a1.exPresente}
              exFuturo={data.a1.exFuturo}
              exContinua={data.a1.exContinua}
              exPresenteEn={data.a1.exPresenteEn}
              exFuturoEn={data.a1.exFuturoEn}
              exContinuaEn={data.a1.exContinuaEn}
              exPresenteTr={data.a1.exPresenteTr}
              exFuturoTr={data.a1.exFuturoTr}
              exContinuaTr={data.a1.exContinuaTr}
              specialUse={data.a1.specialUse}
              language={language}
            />
          </div>
        )}

        {/* ── A2 content ─────────────────────────────────────────────── */}
        {activeLevel === 'a2' && (
          <div className="conj-content">
            <A2Table
              perfeito={data.a2.preteritoPerfeito}
              imperfeito={data.a2.preteritoImperfeito}
              language={language}
            />

            <div className="conj-table-wrapper" style={{ marginTop: '10px' }}>
              <table className="conj-table">
                <thead>
                  <tr>
                    <th>FÓRMULA DE USO</th>
                    <th>PARTICÍPIO PASSADO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="conj-pronoun conj-pronoun--wrap">
                      Ter / Estar + <strong>{data.a2.participioPassado}</strong>
                      <span className="conj-th-hint">📌 Tenho {data.a2.participioPassado} muito.</span>
                    </td>
                    <td className="conj-form">
                      {data.a2.participioPassado} <AudioBtn form={data.a2.participioPassado} />
                      <span className="conj-pp-hint">
                        {isTr ? '(geçmiş ortaç)' : '(past participle)'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
