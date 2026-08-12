import { StoryPage } from '../data/words';

// Maps emoji characters to English Wikipedia search terms
export const emojiToSearchTerm: Record<string, string> = {
  // Animals
  '🐱': 'cat', '🐶': 'dog', '🐰': 'rabbit', '🐻': 'bear', '🦋': 'butterfly',
  '🐦': 'bird', '🐴': 'horse', '🐄': 'cow', '🐘': 'elephant', '🦁': 'lion',
  '🦒': 'giraffe', '🐟': 'fish', '🐠': 'tropical fish', '🐢': 'turtle',
  '🦆': 'duck', '🐸': 'frog', '🐧': 'penguin', '🦊': 'fox', '🐺': 'wolf',
  '🦅': 'eagle', '🦜': 'parrot', '🐬': 'dolphin', '🐳': 'whale', '🦓': 'zebra',
  // People
  '👦': 'boy', '👧': 'girl', '👩': 'woman', '👨': 'man', '👵': 'grandmother',
  '👴': 'grandfather', '👶': 'baby', '🧒': 'child', '👩‍🏫': 'teacher',
  '👨‍👩‍👧': 'family',
  // Food & drink
  '🥕': 'carrot', '🍎': 'apple', '🍌': 'banana', '🍊': 'orange', '🍰': 'cake',
  '🎂': 'birthday cake', '🥛': 'milk', '🥤': 'juice', '🍼': 'baby bottle',
  '🍱': 'bento box', '🍽️': 'dinner plate', '🥗': 'salad',
  // Nature
  '🌳': 'tree', '🌲': 'pine tree', '🌿': 'leaf', '🌱': 'seedling',
  '🌸': 'cherry blossom', '🌺': 'flower', '🌻': 'sunflower', '🌷': 'tulip',
  '🌾': 'wheat', '🍂': 'autumn leaf', '🍃': 'leaves', '🌵': 'cactus',
  '🌴': 'palm tree',
  // Objects
  '📚': 'books', '📖': 'open book', '🎸': 'guitar', '🎵': 'music',
  '⚽': 'football', '🎨': 'palette', '🖌️': 'paintbrush', '📓': 'notebook',
  '🚗': 'car', '🏫': 'school', '🛏️': 'bed', '🕯️': 'candle',
  // Weather / sky
  '☀️': 'sun', '🌙': 'moon', '❄️': 'snowflake', '⛄': 'snowman',
  '🌊': 'ocean wave', '💧': 'water drop', '🌈': 'rainbow',
  // Places
  '🏖️': 'beach', '🏔️': 'mountain', '🏟️': 'stadium',
};

export interface SceneTheme {
  skyTop: string;
  skyBottom: string;
  hillColor: string;
  hillDark: string;
  groundColor: string;
  groundDark: string;
  sunDisplay: 'sun' | 'moon' | 'rain' | 'snow' | 'none';
  cloudOpacity: number;
}

const DEFAULT: SceneTheme = {
  skyTop:      '#0ea5e9',
  skyBottom:   '#bae6fd',
  hillColor:   '#4ade80',
  hillDark:    '#16a34a',
  groundColor: '#15803d',
  groundDark:  '#14532d',
  sunDisplay:  'sun',
  cloudOpacity: 1,
};

function hasAny(emojis: string[], checks: string[]): boolean {
  return checks.some((c) => emojis.some((e) => e.includes(c)));
}

export function getSceneTheme(page: StoryPage): SceneTheme {
  const all = [page.mainEmoji, page.bgLeft, page.bgRight];

  // ── Night ──────────────────────────────────────────────────────────────────
  if (hasAny(all, ['🌙', '🌃', '🌠', '⭐', '🌟', '🛏', '🕯'])) {
    return {
      skyTop:      '#0f172a',
      skyBottom:   '#1e3a5f',
      hillColor:   '#166534',
      hillDark:    '#14532d',
      groundColor: '#052e16',
      groundDark:  '#022c17',
      sunDisplay:  'moon',
      cloudOpacity: 0.25,
    };
  }

  // ── Rain / Storm ───────────────────────────────────────────────────────────
  if (hasAny(all, ['🌧', '☔', '💧', '⛈', '🌩'])) {
    return {
      skyTop:      '#475569',
      skyBottom:   '#94a3b8',
      hillColor:   '#4ade80',
      hillDark:    '#16a34a',
      groundColor: '#166534',
      groundDark:  '#14532d',
      sunDisplay:  'rain',
      cloudOpacity: 1,
    };
  }

  // ── Snow / Winter ──────────────────────────────────────────────────────────
  if (hasAny(all, ['❄', '⛄', '🏔', '🌨'])) {
    return {
      skyTop:      '#bfdbfe',
      skyBottom:   '#e0f2fe',
      hillColor:   '#e2e8f0',
      hillDark:    '#cbd5e1',
      groundColor: '#f1f5f9',
      groundDark:  '#e2e8f0',
      sunDisplay:  'none',
      cloudOpacity: 0.9,
    };
  }

  // ── Ocean / Water ──────────────────────────────────────────────────────────
  if (hasAny(all, ['🌊', '🐟', '🐠', '🐳', '🦈', '🐙', '🦀', '🐚'])) {
    return {
      skyTop:      '#0369a1',
      skyBottom:   '#38bdf8',
      hillColor:   '#0ea5e9',
      hillDark:    '#0284c7',
      groundColor: '#075985',
      groundDark:  '#0c4a6e',
      sunDisplay:  'sun',
      cloudOpacity: 0.7,
    };
  }

  // ── Sunset / Warm ──────────────────────────────────────────────────────────
  if (hasAny(all, ['🌅', '🌄', '🌇', '🌆', '🔥', '🌻', '🌾', '🌵'])) {
    return {
      skyTop:      '#ea580c',
      skyBottom:   '#fde68a',
      hillColor:   '#a3e635',
      hillDark:    '#65a30d',
      groundColor: '#713f12',
      groundDark:  '#451a03',
      sunDisplay:  'sun',
      cloudOpacity: 0.6,
    };
  }

  // ── Default day ────────────────────────────────────────────────────────────
  return DEFAULT;
}
