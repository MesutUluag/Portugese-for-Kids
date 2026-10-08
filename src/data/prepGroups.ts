import type { PrepGroup, PrepContraction, PrepExample } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Preposition Groups — used by PrepositionModal to show the full contraction
// table when the user taps any card in the Prepositions category.
// ─────────────────────────────────────────────────────────────────────────────

export interface PrepContraction {
  pt: string        // the contracted word
  enHint: string    // short English label
  trHint: string    // short Turkish label
}

export interface PrepExample {
  pt: string
  en: string
  tr: string
  /** Short use-case label, e.g. "Destination", "Recipient" */
  label?: string
  labelTr?: string
}

export interface PrepGroup {
  /** Key preposition (e.g. "de") */
  base: string
  /** English meaning of the base preposition */
  baseEn: string
  /** Turkish meaning of the base preposition */
  baseTr: string
  /** 2–3 example sentences */
  examples: PrepExample[]
  /** All members of this group (including the base word itself if it's a card) */
  members: string[]
  /** Contraction table rows: base + definite articles */
  definite: PrepContraction[]
  /** Contraction table rows: base + indefinite articles (optional) */
  indefinite?: PrepContraction[]
  /** Informal / spoken contraction table (e.g. pra/pro for para) */
  spoken?: PrepContraction[]
  /** Quick-tip comparing this preposition to a similar one */
  tip?: { en: string; tr: string }
}

export const prepGroups: PrepGroup[] = [
  // ── DE ─────────────────────────────────────────────────────────────────────
  {
    base: 'de',
    baseEn: 'of / by / from',
    baseTr: 'ait / tarafından / -den',
    examples: [
      { pt: 'Eu sou de Lisboa.',             en: 'I am from Lisbon.',              tr: 'Ben Lizbon\'dan geliyorum.' },
      { pt: 'Está em cima da televisão.',    en: 'It\'s on top of the TV.',        tr: 'Televizyonun üstünde.' },
      { pt: 'Gosto do chocolate.',           en: 'I like chocolate.',              tr: 'Çikolatayı severim.' },
    ],
    members: ['de', 'do', 'da', 'dos', 'das', 'dum', 'duma', 'duns', 'dumas'],
    definite: [
      { pt: 'do',  enHint: 'de + o  →  of the (m)',     trHint: 'de + o  →  eril -den' },
      { pt: 'da',  enHint: 'de + a  →  of the (f)',     trHint: 'de + a  →  dişil -den' },
      { pt: 'dos', enHint: 'de + os →  of the (m, pl)', trHint: 'de + os →  eril çoğul -den' },
      { pt: 'das', enHint: 'de + as →  of the (f, pl)', trHint: 'de + as →  dişil çoğul -den' },
    ],
    indefinite: [
      { pt: 'dum',  enHint: 'de + um   →  of a (m)',     trHint: 'de + um   →  bir (eril) -den' },
      { pt: 'duma', enHint: 'de + uma  →  of a (f)',     trHint: 'de + uma  →  bir (dişil) -den' },
      { pt: 'duns', enHint: 'de + uns  →  of some (m)',  trHint: 'de + uns  →  bazı (eril) -den' },
      { pt: 'dumas',enHint: 'de + umas →  of some (f)',  trHint: 'de + umas →  bazı (dişil) -den' },
    ],
  },
  // ── EM ─────────────────────────────────────────────────────────────────────
  {
    base: 'em',
    baseEn: 'in / on / at',
    baseTr: 'içinde / üzerinde / -de',
    examples: [
      { pt: 'Estou na escola.',              en: 'I am in the school.',             tr: 'Okulda(y)ım.' },
      { pt: 'Ela está no carro.',            en: 'She is in the car.',              tr: 'O arabada.' },
      { pt: 'Ele está num café.',            en: 'He is in a café.',               tr: 'O bir kafede.' },
    ],
    members: ['em', 'no', 'na', 'nos', 'nas', 'num', 'numa', 'nuns', 'numas'],
    definite: [
      { pt: 'no',  enHint: 'em + o  →  in the (m)',     trHint: 'em + o  →  eril -de' },
      { pt: 'na',  enHint: 'em + a  →  in the (f)',     trHint: 'em + a  →  dişil -de' },
      { pt: 'nos', enHint: 'em + os →  in the (m, pl)', trHint: 'em + os →  eril çoğul -de' },
      { pt: 'nas', enHint: 'em + as →  in the (f, pl)', trHint: 'em + as →  dişil çoğul -de' },
    ],
    indefinite: [
      { pt: 'num',  enHint: 'em + um   →  in a (m)',    trHint: 'em + um   →  bir (eril) -de' },
      { pt: 'numa', enHint: 'em + uma  →  in a (f)',    trHint: 'em + uma  →  bir (dişil) -de' },
      { pt: 'nuns', enHint: 'em + uns  →  in some (m)', trHint: 'em + uns  →  bazı (eril) -de' },
      { pt: 'numas',enHint: 'em + umas →  in some (f)', trHint: 'em + umas →  bazı (dişil) -de' },
    ],
  },
  // ── A ──────────────────────────────────────────────────────────────────────
  {
    base: 'a',
    baseEn: 'to',
    baseTr: '-e / -a',
    examples: [
      { pt: 'Eu vou ao mercado.',            en: 'I go to the market.',             tr: 'Pazara gidiyorum.' },
      { pt: 'A lua brilha à noite.',         en: 'The moon shines at night.',       tr: 'Ay geceleri parlar.' },
      { pt: 'Vou aos jogos aos sábados.',    en: 'I go to the games on Saturdays.', tr: 'Cumartesi günleri maçlara gidiyorum.' },
    ],
    members: ['a', 'ao', 'à', 'aos', 'às'],
    definite: [
      { pt: 'ao',  enHint: 'a + o  →  to the (m)',     trHint: 'a + o  →  eril -e' },
      { pt: 'à',   enHint: 'a + a  →  to the (f)',     trHint: 'a + a  →  dişil -e' },
      { pt: 'aos', enHint: 'a + os →  to the (m, pl)', trHint: 'a + os →  eril çoğul -e' },
      { pt: 'às',  enHint: 'a + as →  to the (f, pl)', trHint: 'a + as →  dişil çoğul -e' },
    ],
  },
  // ── POR ────────────────────────────────────────────────────────────────────
  {
    base: 'por',
    baseEn: 'for / by / through',
    baseTr: 'için / tarafından / boyunca',
    examples: [
      { pt: 'Eu espero por ti.',             en: 'I wait for you.',                 tr: 'Seni bekliyorum.' },
      { pt: 'Ele passou pelo parque.',       en: 'He walked through the park.',     tr: 'Parktan geçti.' },
      { pt: 'Ela passou pela escola.',       en: 'She passed by the school.',       tr: 'Okulun önünden geçti.' },
    ],
    members: ['por', 'pelo', 'pela', 'pelos', 'pelas'],
    definite: [
      { pt: 'pelo',  enHint: 'por + o  →  through/by the (m)',     trHint: 'por + o  →  eril boyunca/tarafından' },
      { pt: 'pela',  enHint: 'por + a  →  through/by the (f)',     trHint: 'por + a  →  dişil boyunca/tarafından' },
      { pt: 'pelos', enHint: 'por + os →  through/by the (m, pl)', trHint: 'por + os →  eril çoğul boyunca/tarafından' },
      { pt: 'pelas', enHint: 'por + as →  through/by the (f, pl)', trHint: 'por + as →  dişil çoğul boyunca/tarafından' },
    ],
  },
  // ── COM ────────────────────────────────────────────────────────────────────
  {
    base: 'com',
    baseEn: 'with',
    baseTr: 'ile / birlikte',
    examples: [
      { pt: 'Eu vou com a minha família.',   en: 'I go with my family.',            tr: 'Ailemle gidiyorum.' },
      { pt: 'Ela fala com o professor.',     en: 'She speaks with the teacher.',    tr: 'Öğretmenle konuşuyor.' },
      { pt: 'Queres vir comigo?',            en: 'Do you want to come with me?',    tr: 'Benimle gelmek ister misin?' },
    ],
    members: ['com'],
    definite: [],
  },
  // ── PARA ───────────────────────────────────────────────────────────────────
  {
    base: 'para',
    baseEn: 'to / for / until / towards',
    baseTr: 'için / -a / -e / -e doğru / -e kadar',
    examples: [
      { pt: 'Eu vou para Portugal.',         en: 'I go to Portugal.',               tr: 'Portekiz\'e gidiyorum.',         label: 'Destination',   labelTr: 'Varış Yeri' },
      { pt: 'Isto é para ti.',               en: 'This is for you.',                tr: 'Bu senin için.',                 label: 'Recipient',     labelTr: 'Alıcı' },
      { pt: 'Falta uma hora para o jantar.', en: 'There is one hour until dinner.', tr: 'Akşam yemeğine bir saat var.',   label: 'Time / Deadline', labelTr: 'Zaman / Son Tarih' },
      { pt: 'Ela estuda para aprender.',     en: 'She studies in order to learn.',  tr: 'O öğrenmek için çalışıyor.',     label: 'Purpose',       labelTr: 'Amaç' },
      { pt: 'Comprei flores para a mãe.',    en: 'I bought flowers for mum.',       tr: 'Annem için çiçek aldım.',        label: 'Beneficiary',   labelTr: 'Yararlanan' },
    ],
    members: ['para'],
    definite: [],
    spoken: [
      { pt: 'pro',  enHint: 'para + o  →  pro  (spoken, m)',     trHint: 'para + o  →  pro  (konuşma dili, eril)' },
      { pt: 'pra',  enHint: 'para + a  →  pra  (spoken, f)',     trHint: 'para + a  →  pra  (konuşma dili, dişil)' },
      { pt: 'pros', enHint: 'para + os →  pros (spoken, m, pl)', trHint: 'para + os →  pros (konuşma dili, eril çoğul)' },
      { pt: 'pras', enHint: 'para + as →  pras (spoken, f, pl)', trHint: 'para + as →  pras (konuşma dili, dişil çoğul)' },
    ],
    tip: {
      en: '💡 "Para" vs. "a": Use "a" for a short trip or quick visit (Vou a Lisboa → going and coming back). Use "para" for a longer stay or permanent move (Eu vou para Portugal → moving there).',
      tr: '💡 "Para" ve "a" farkı: Kısa bir gezi için "a" kullanın (Vou a Lisboa → gidip dönmek). Uzun süreli ya da kalıcı taşınma için "para" kullanın (Eu vou para Portugal → oraya taşınıyorum).',
    },
  },
];

/** Map from every member word to its group — for O(1) lookup in CardsMode */
export const prepGroupByWord: Record<string, PrepGroup> = Object.fromEntries(
  prepGroups.flatMap((g) => g.members.map((m) => [m, g]))
);
