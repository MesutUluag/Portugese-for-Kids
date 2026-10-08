export interface Word {
  pt: string;
  en: string;
  tr: string;
  emoji: string;
  category: string;
}

export interface StoryPage {
  pt: string;
  en: string;
  mainEmoji: string;
  bgLeft: string;
  bgRight: string;
  imagePrompt?: string;
  /** pt text of the sentence this entry directly replies to (templates only) */
  replyTo?: string;
}

export type Mode = 'cards' | 'story' | 'game1' | 'game2' | 'game3' | 'game4' | 'game5' | 'game6' | 'game7';

export interface MarketItem {
  id: string;
  ptName: string;
  pluralName: string;
  gender: 'm' | 'f';
  icon: string;       // emoji fallback (always set)
  iconSrc?: string;   // optional SVG/PNG path — used instead of emoji when set
  category: string;
  colorKey: string;
  iconBg?: string;    // optional background colour behind the icon
  unit?: 'kg' | 'piece'; // defaults to 'piece'; 'kg' items are ordered by weight
}

export interface StorySubject {
  pt: string;
  en: string;
  emoji: string;
}

export interface StoryAction {
  pt: string;
  en: string;
  leftBg: string;
  rightBg: string;
}

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
