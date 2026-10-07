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

export const marketItems: MarketItem[] = [
  // ── Fruits (kg) ───────────────────────────────────────────────────────────────
  { id: 'apple',      ptName: 'Maçã',      pluralName: 'maçãs',      gender: 'f', icon: '🍎', category: 'Frutas',     colorKey: 'red',     unit: 'kg' },
  { id: 'banana',     ptName: 'Banana',    pluralName: 'bananas',    gender: 'f', icon: '🍌', category: 'Frutas',     colorKey: 'amber',   unit: 'kg' },
  { id: 'strawberry', ptName: 'Morango',   pluralName: 'morangos',   gender: 'm', icon: '🍓', category: 'Frutas',     colorKey: 'rose',    unit: 'kg' },
  { id: 'orange',     ptName: 'Laranja',   pluralName: 'laranjas',   gender: 'f', icon: '🍊', category: 'Frutas',     colorKey: 'orange',  unit: 'kg' },
  { id: 'grapes',     ptName: 'Uva',       pluralName: 'uvas',       gender: 'f', icon: '🍇', category: 'Frutas',     colorKey: 'purple',  unit: 'kg' },
  { id: 'watermelon', ptName: 'Melancia',  pluralName: 'melancias',  gender: 'f', icon: '🍉', category: 'Frutas',     colorKey: 'emerald', unit: 'kg' },
  { id: 'pear',       ptName: 'Pêra',      pluralName: 'pêras',      gender: 'f', icon: '🍐', category: 'Frutas',     colorKey: 'lime',    unit: 'kg' },
  { id: 'lemon',      ptName: 'Limão',     pluralName: 'limões',     gender: 'm', icon: '🍋', category: 'Frutas',     colorKey: 'yellow',  unit: 'kg' },
  { id: 'mango',      ptName: 'Manga',     pluralName: 'mangas',     gender: 'f', icon: '🥭', category: 'Frutas',     colorKey: 'orange',  unit: 'kg' },
  { id: 'peach',      ptName: 'Pêssego',   pluralName: 'pêssegos',   gender: 'm', icon: '🍑', category: 'Frutas',     colorKey: 'orange',  unit: 'kg' },
  { id: 'cherry',     ptName: 'Cereja',    pluralName: 'cerejas',    gender: 'f', icon: '🍒', category: 'Frutas',     colorKey: 'red',     unit: 'kg' },
  { id: 'pineapple',  ptName: 'Ananás',    pluralName: 'ananases',   gender: 'm', icon: '🍍', category: 'Frutas',     colorKey: 'yellow',  unit: 'kg' },
  { id: 'coconut',    ptName: 'Coco',      pluralName: 'cocos',      gender: 'm', icon: '🥥', category: 'Frutas',     colorKey: 'amber',   unit: 'kg' },
  { id: 'kiwi',       ptName: 'Kiwi',      pluralName: 'kiwis',      gender: 'm', icon: '🥝', category: 'Frutas',     colorKey: 'lime',    unit: 'kg' },
  { id: 'blueberry',  ptName: 'Mirtilo',   pluralName: 'mirtilos',   gender: 'm', icon: '🫐', category: 'Frutas',     colorKey: 'purple',  unit: 'kg' },
  { id: 'melon',      ptName: 'Melão',     pluralName: 'melões',     gender: 'm', icon: '🍈', category: 'Frutas',     colorKey: 'lime',    unit: 'kg' },
  // ── Bakery (piece) ────────────────────────────────────────────────────────────
  { id: 'bread',      ptName: 'Pão',       pluralName: 'pães',       gender: 'm', icon: '🍞', category: 'Padaria',    colorKey: 'amber'   },
  { id: 'croissant',  ptName: 'Croissant', pluralName: 'croissants', gender: 'm', icon: '🥐', category: 'Padaria',    colorKey: 'yellow'  },
  { id: 'cookie',     ptName: 'Bolacha',   pluralName: 'bolachas',   gender: 'f', icon: '🍪', category: 'Padaria',    colorKey: 'amber'   },
  { id: 'cake',           ptName: 'Bolo',         pluralName: 'bolos',         gender: 'm', icon: '🍰', category: 'Padaria', colorKey: 'pink'   },
  { id: 'pastel_nata',    ptName: 'Pastel de Nata', pluralName: 'Pastéis de Nata', gender: 'm', icon: '🥧', iconSrc: `${import.meta.env.BASE_URL}items/pastel_nata.svg`, category: 'Padaria', colorKey: 'amber'  },
  // ── Dairy (piece) ─────────────────────────────────────────────────────────────
  { id: 'milk',       ptName: 'Leite',     pluralName: 'leites',     gender: 'm', icon: '🥛', category: 'Lacticínios',colorKey: 'sky'     },
  { id: 'cheese',     ptName: 'Queijo',    pluralName: 'queijos',    gender: 'm', icon: '🧀', category: 'Lacticínios',colorKey: 'yellow'  },
  { id: 'egg',        ptName: 'Ovo',       pluralName: 'ovos',       gender: 'm', icon: '🥚', category: 'Lacticínios',colorKey: 'orange'  },
  { id: 'yogurt',     ptName: 'Iogurte',   pluralName: 'iogurtes',   gender: 'm', icon: '🫙', category: 'Lacticínios',colorKey: 'sky',    iconBg: '#ffffff' },
  { id: 'butter',     ptName: 'Manteiga',  pluralName: 'manteigas',  gender: 'f', icon: '🧈', category: 'Lacticínios',colorKey: 'yellow'  },
  // ── Drinks (piece) ────────────────────────────────────────────────────────────
  { id: 'water',      ptName: 'Água',      pluralName: 'águas',      gender: 'f', icon: '🫙', category: 'Bebidas',    colorKey: 'sky',    iconBg: '#ffffff' },
  { id: 'juice',      ptName: 'Sumo',      pluralName: 'sumos',      gender: 'm', icon: '🧃', category: 'Bebidas',    colorKey: 'yellow'  },
  { id: 'wine',       ptName: 'Vinho',     pluralName: 'vinhos',     gender: 'm', icon: '🍷', category: 'Bebidas', colorKey: 'red'   },
  { id: 'beer',       ptName: 'Cerveja',   pluralName: 'cervejas',   gender: 'f', icon: '🍺', category: 'Bebidas', colorKey: 'amber' },
  { id: 'coffee',     ptName: 'Café',      pluralName: 'cafés',      gender: 'm', icon: '☕', category: 'Bebidas',    colorKey: 'amber'   },
  // ── Vegetables (kg) ───────────────────────────────────────────────────────────
  { id: 'broccoli',   ptName: 'Brócolis',  pluralName: 'brócolis',   gender: 'm', icon: '🥦', category: 'Legumes',    colorKey: 'green',   unit: 'kg' },
  { id: 'carrot',     ptName: 'Cenoura',   pluralName: 'cenouras',   gender: 'f', icon: '🥕', category: 'Legumes',    colorKey: 'orange',  unit: 'kg' },
  { id: 'tomato',     ptName: 'Tomate',    pluralName: 'tomates',    gender: 'm', icon: '🍅', category: 'Legumes',    colorKey: 'red',     unit: 'kg' },
  { id: 'corn',       ptName: 'Milho',     pluralName: 'milhos',     gender: 'm', icon: '🌽', category: 'Legumes',    colorKey: 'yellow',  unit: 'kg' },
  { id: 'potato',     ptName: 'Batata',    pluralName: 'batatas',    gender: 'f', icon: '🥔', category: 'Legumes',    colorKey: 'amber',   unit: 'kg' },
  { id: 'onion',      ptName: 'Cebola',    pluralName: 'cebolas',    gender: 'f', icon: '🧅', category: 'Legumes',    colorKey: 'yellow',  unit: 'kg' },
  { id: 'lettuce',    ptName: 'Alface',    pluralName: 'alfaces',    gender: 'f', icon: '🥬', category: 'Legumes',    colorKey: 'green',   unit: 'kg' },
  { id: 'pepper',     ptName: 'Pimento',   pluralName: 'pimentos',   gender: 'm', icon: '🫑', category: 'Legumes',    colorKey: 'green',   unit: 'kg' },
  { id: 'cucumber',   ptName: 'Pepino',    pluralName: 'pepinos',    gender: 'm', icon: '🥒', category: 'Legumes',    colorKey: 'green',   unit: 'kg' },
  { id: 'mushroom',   ptName: 'Cogumelo',  pluralName: 'cogumelos',  gender: 'm', icon: '🍄', category: 'Legumes',    colorKey: 'amber',   unit: 'kg' },
  { id: 'garlic',     ptName: 'Alho',      pluralName: 'alhos',      gender: 'm', icon: '🧄', category: 'Legumes',    colorKey: 'yellow',  unit: 'kg' },
  { id: 'eggplant',   ptName: 'Beringela', pluralName: 'beringelas', gender: 'f', icon: '🍆', category: 'Legumes',    colorKey: 'purple',  unit: 'kg' },
  { id: 'avocado',    ptName: 'Abacate',   pluralName: 'abacates',   gender: 'm', icon: '🥑', category: 'Legumes',    colorKey: 'green',   unit: 'kg' },
  // ── Meat & Fish (kg) ──────────────────────────────────────────────────────────
  { id: 'fish',       ptName: 'Peixe',     pluralName: 'peixes',     gender: 'm', icon: '🐟', category: 'Peixaria',   colorKey: 'cyan',    unit: 'kg' },
  { id: 'bacalhau',   ptName: 'Bacalhau',  pluralName: 'bacalhaus',  gender: 'm', icon: '🐠', iconSrc: `${import.meta.env.BASE_URL}items/bacalhau.svg`, category: 'Peixaria', colorKey: 'sky',    unit: 'kg' },
  { id: 'shrimp',     ptName: 'Camarão',   pluralName: 'camarões',   gender: 'm', icon: '🦐', category: 'Peixaria', colorKey: 'orange', unit: 'kg' },
  { id: 'chicken',    ptName: 'Frango',    pluralName: 'frangos',    gender: 'm', icon: '🍗', category: 'Talho',      colorKey: 'amber',   unit: 'kg' },
  { id: 'meat',       ptName: 'Carne',     pluralName: 'carnes',     gender: 'f', icon: '🥩', category: 'Talho',      colorKey: 'red',     unit: 'kg' },
  { id: 'chourico',   ptName: 'Chouriço',  pluralName: 'chouriços',  gender: 'm', icon: '🌭', iconSrc: `${import.meta.env.BASE_URL}items/chourico.svg`, category: 'Talho', colorKey: 'red',    unit: 'kg' },
  // ── Grocery staples (piece) ───────────────────────────────────────────────────
  { id: 'rice',       ptName: 'Arroz',     pluralName: 'arrozes',    gender: 'm', icon: '🍚', category: 'Mercearia',  colorKey: 'sky',    iconBg: '#ffffff' },
  { id: 'pasta',      ptName: 'Massa',     pluralName: 'massas',     gender: 'f', icon: '🍝', category: 'Mercearia',  colorKey: 'yellow'  },
  { id: 'beans',      ptName: 'Feijão',    pluralName: 'feijões',    gender: 'm', icon: '🫘', category: 'Mercearia', colorKey: 'red'   },
  { id: 'azeitona',   ptName: 'Azeitona',  pluralName: 'azeitonas',  gender: 'f', icon: '🫒', category: 'Mercearia',  colorKey: 'lime'    },
  { id: 'honey',      ptName: 'Mel',       pluralName: 'méis',       gender: 'm', icon: '🍯', category: 'Doces',      colorKey: 'amber'   },
  { id: 'jam',        ptName: 'Compota',   pluralName: 'compotas',   gender: 'f', icon: '🫙', iconSrc: `${import.meta.env.BASE_URL}items/compota2.svg`, category: 'Doces', colorKey: 'rose' },
  // ── Sweets & Snacks (piece) ───────────────────────────────────────────────────
  { id: 'icecream',   ptName: 'Gelado',    pluralName: 'gelados',    gender: 'm', icon: '🍦', category: 'Doces',      colorKey: 'pink'    },
  { id: 'chocolate',  ptName: 'Chocolate', pluralName: 'chocolates', gender: 'm', icon: '🍫', category: 'Doces',      colorKey: 'amber'   },
  { id: 'popcorn',    ptName: 'Pipoca',    pluralName: 'pipocas',    gender: 'f', icon: '🍿', category: 'Snacks',     colorKey: 'yellow'  },
  { id: 'candy',      ptName: 'Rebuçado',  pluralName: 'rebuçados',  gender: 'm', icon: '🍬', category: 'Doces',      colorKey: 'pink'    },
  { id: 'lollipop',   ptName: 'Chupa-Chupa',pluralName:'chupa-chupas',gender:'m', icon: '🍭', category: 'Doces',      colorKey: 'rose'    },
];

export const kidsWords: Word[] = [
  // ── Core verbs ───────────────────────────────────────────────────────────────
  { pt: "ser", en: "to be", tr: "olmak", emoji: "👤", category: "Verbs" },
  { pt: "estar", en: "to be (state)", tr: "olmak (durum)", emoji: "📍", category: "Verbs" },
  { pt: "ter", en: "to have", tr: "sahip olmak", emoji: "🤲", category: "Verbs" },
  { pt: "ir", en: "to go", tr: "gitmek", emoji: "🚶", category: "Verbs" },
  { pt: "vir", en: "to come", tr: "gelmek", emoji: "🏃", category: "Verbs" },
  { pt: "fazer", en: "to do / make", tr: "yapmak", emoji: "🛠️", category: "Verbs" },
  { pt: "falar", en: "to speak / talk", tr: "konuşmak", emoji: "🗣️", category: "Verbs" },
  { pt: "dizer", en: "to say / tell", tr: "söylemek", emoji: "💬", category: "Verbs" },
  { pt: "comer", en: "to eat", tr: "yemek yemek", emoji: "🍽️", category: "Verbs" },
  { pt: "beber", en: "to drink", tr: "içmek", emoji: "🥤", category: "Verbs" },
  { pt: "dormir", en: "to sleep", tr: "uyumak", emoji: "😴", category: "Verbs" },
  { pt: "acordar", en: "to wake up", tr: "uyanmak", emoji: "⏰", category: "Verbs" },
  { pt: "ver", en: "to see / watch", tr: "görmek / izlemek", emoji: "👀", category: "Verbs" },
  { pt: "ouvir", en: "to hear / listen", tr: "duymak / dinlemek", emoji: "🎧", category: "Verbs" },
  { pt: "ler", en: "to read", tr: "okumak", emoji: "📖", category: "Verbs" },
  { pt: "escrever", en: "to write", tr: "yazmak", emoji: "✍️", category: "Verbs" },
  { pt: "estudar", en: "to study", tr: "çalışmak", emoji: "📚", category: "Verbs" },
  { pt: "trabalhar", en: "to work", tr: "çalışmak", emoji: "💼", category: "Verbs" },
  { pt: "brincar", en: "to play", tr: "oynamak", emoji: "🧸", category: "Verbs" },
  { pt: "correr", en: "to run", tr: "koşmak", emoji: "🏃", category: "Verbs" },
  { pt: "andar", en: "to walk", tr: "yürümek", emoji: "🚶", category: "Verbs" },
  { pt: "nadar", en: "to swim", tr: "yüzmek", emoji: "🏊", category: "Verbs" },
  { pt: "cantar", en: "to sing", tr: "şarkı söylemek", emoji: "🎵", category: "Verbs" },
  { pt: "dançar", en: "to dance", tr: "dans etmek", emoji: "💃", category: "Verbs" },
  { pt: "desenhar", en: "to draw", tr: "çizmek", emoji: "🎨", category: "Verbs" },
  { pt: "comprar", en: "to buy", tr: "satın almak", emoji: "🛒", category: "Verbs" },
  { pt: "dar", en: "to give", tr: "vermek", emoji: "🎁", category: "Verbs" },
  { pt: "ajudar", en: "to help", tr: "yardım etmek", emoji: "🤝", category: "Verbs" },
  { pt: "gostar", en: "to like", tr: "sevmek / beğenmek", emoji: "❤️", category: "Verbs" },
  { pt: "querer", en: "to want", tr: "istemek", emoji: "🌟", category: "Verbs" },
  { pt: "poder", en: "can / to be able to", tr: "yapabilmek", emoji: "💪", category: "Verbs" },
  { pt: "saber", en: "to know", tr: "bilmek", emoji: "💡", category: "Verbs" },
  { pt: "abrir", en: "to open", tr: "açmak", emoji: "🔓", category: "Verbs" },
  { pt: "fechar", en: "to close", tr: "kapatmak", emoji: "🔒", category: "Verbs" },
  { pt: "começar", en: "to start", tr: "başlamak", emoji: "🚀", category: "Verbs" },
  { pt: "acabar", en: "to finish", tr: "bitirmek", emoji: "🏁", category: "Verbs" },
  { pt: "chegar", en: "to arrive", tr: "varmak / ulaşmak", emoji: "📍", category: "Verbs" },
  { pt: "sair", en: "to leave", tr: "ayrılmak / çıkmak", emoji: "🚪", category: "Verbs" },
  { pt: "entrar", en: "to enter", tr: "girmek", emoji: "🚪", category: "Verbs" },
  { pt: "sentar", en: "to sit", tr: "oturmak", emoji: "🪑", category: "Verbs" },
  { pt: "perguntar", en: "to ask", tr: "sormak", emoji: "❓", category: "Verbs" },
  { pt: "responder", en: "to answer", tr: "cevap vermek", emoji: "💬", category: "Verbs" },
  { pt: "pensar", en: "to think", tr: "düşünmek", emoji: "🤔", category: "Verbs" },
  { pt: "trazer", en: "to bring", tr: "getirmek", emoji: "🎒", category: "Verbs" },
  { pt: "ficar", en: "to stay", tr: "kalmak", emoji: "🏠", category: "Verbs" },
  { pt: "voltar", en: "to return", tr: "dönmek", emoji: "↩️", category: "Verbs" },
  { pt: "jantar", en: "to have dinner", tr: "akşam yemeği yemek", emoji: "🍽️", category: "Verbs" },
  { pt: "incomodar", en: "to bother", tr: "rahatsız etmek", emoji: "😤", category: "Verbs" },
  { pt: "medir", en: "to measure", tr: "ölçmek", emoji: "📏", category: "Verbs" },
  { pt: "odiar", en: "to hate", tr: "nefret etmek", emoji: "😡", category: "Verbs" },
  { pt: "pintar", en: "to paint", tr: "boyamak", emoji: "🖌️", category: "Verbs" },
  { pt: "jogar", en: "to play (sport/game)", tr: "oynamak (spor/oyun)", emoji: "⚽", category: "Verbs" },
  { pt: "tocar", en: "to play (instrument)", tr: "çalmak (enstrüman)", emoji: "🎹", category: "Verbs" },
  { pt: "encher", en: "to fill", tr: "doldurmak", emoji: "🪣", category: "Verbs" },
  { pt: "mentir", en: "to lie", tr: "yalan söylemek", emoji: "🤥", category: "Verbs" },
  { pt: "sabe", en: "knows / you know", tr: "biliyor / bilirsiniz", emoji: "💡", category: "Verbs" },
  { pt: "desistir", en: "to give up", tr: "vazgeçmek", emoji: "🏳️", category: "Verbs" },
  { pt: "pedir", en: "to ask / request", tr: "istemek / rica etmek", emoji: "🙏", category: "Verbs" },
  { pt: "lembrar", en: "to remember", tr: "hatırlamak", emoji: "🧠", category: "Verbs" },
  { pt: "cumpre", en: "fulfils / it is due", tr: "yerine getirir / gerekmektedir", emoji: "✅", category: "Verbs" },
  { pt: "subir", en: "to go up / climb", tr: "çıkmak / tırmanmak", emoji: "⛰️", category: "Verbs" },
  { pt: "caber", en: "to fit", tr: "sığmak", emoji: "📦", category: "Verbs" },
  { pt: "aterrar", en: "to land (plane)", tr: "inmek (uçak)", emoji: "✈️", category: "Verbs" },
  { pt: "parar", en: "to stop", tr: "durmak", emoji: "🛑", category: "Verbs" },
  { pt: "chorar", en: "to cry", tr: "ağlamak", emoji: "😭", category: "Verbs" },
  { pt: "esquecer", en: "to forget", tr: "unutmak", emoji: "💭", category: "Verbs" },
  { pt: "levantar-me", en: "to get up", tr: "kalkmak", emoji: "🛌", category: "Verbs" },
  { pt: "parecer", en: "to seem / look like", tr: "görünmek / sanmak", emoji: "🤔", category: "Verbs" },
  // ── Family ───────────────────────────────────────────────────────────────────
  { pt: "pai", en: "father", tr: "baba", emoji: "👨", category: "Family" },
  { pt: "mãe", en: "mother", tr: "anne", emoji: "👩", category: "Family" },
  { pt: "filho", en: "son", tr: "oğul", emoji: "👦", category: "Family" },
  { pt: "filha", en: "daughter", tr: "kız", emoji: "👧", category: "Family" },
  { pt: "irmão", en: "brother", tr: "erkek kardeş", emoji: "👦", category: "Family" },
  { pt: "irmã", en: "sister", tr: "kız kardeş", emoji: "👧", category: "Family" },
  { pt: "avô", en: "grandfather", tr: "büyükbaba", emoji: "👴", category: "Family" },
  { pt: "avó", en: "grandmother", tr: "büyükanne", emoji: "👵", category: "Family" },
  { pt: "tio", en: "uncle", tr: "amca / dayı", emoji: "👨", category: "Family" },
  { pt: "tia", en: "aunt", tr: "hala / teyze", emoji: "👩", category: "Family" },
  { pt: "primo", en: "cousin (m)", tr: "erkek kuzen", emoji: "👦", category: "Family" },
  { pt: "prima", en: "cousin (f)", tr: "kız kuzen", emoji: "👧", category: "Family" },
  { pt: "bebé", en: "baby", tr: "bebek", emoji: "👶", category: "Family" },
  { pt: "família", en: "family", tr: "aile", emoji: "👨‍👩‍👧", category: "Family" },
  { pt: "amigo", en: "friend (m)", tr: "erkek arkadaş", emoji: "🧑", category: "Family" },
  { pt: "amiga", en: "friend (f)", tr: "kız arkadaş", emoji: "👩", category: "Family" },
  { pt: "rapaz", en: "boy", tr: "erkek çocuk", emoji: "👦", category: "Family" },
  { pt: "rapariga", en: "girl", tr: "kız çocuk", emoji: "👧", category: "Family" },
  { pt: "criança", en: "child", tr: "çocuk", emoji: "🧒", category: "Family" },
  { pt: "pessoas", en: "people", tr: "insanlar", emoji: "👥", category: "Family" },
  { pt: "miúdos", en: "kids", tr: "çocuklar", emoji: "🧒", category: "Family" },
  // ── Animals ──────────────────────────────────────────────────────────────────
  { pt: "cão", en: "dog", tr: "köpek", emoji: "🐶", category: "Animals" },
  { pt: "gato", en: "cat", tr: "kedi", emoji: "🐱", category: "Animals" },
  { pt: "peixe", en: "fish", tr: "balık", emoji: "🐟", category: "Animals" },
  { pt: "pássaro", en: "bird", tr: "kuş", emoji: "🐦", category: "Animals" },
  { pt: "coelho", en: "rabbit", tr: "tavşan", emoji: "🐰", category: "Animals" },
  { pt: "cavalo", en: "horse", tr: "at", emoji: "🐴", category: "Animals" },
  { pt: "vaca", en: "cow", tr: "inek", emoji: "🐄", category: "Animals" },
  { pt: "porco", en: "pig", tr: "domuz", emoji: "🐷", category: "Animals" },
  { pt: "ovelha", en: "sheep", tr: "koyun", emoji: "🐑", category: "Animals" },
  { pt: "galinha", en: "chicken", tr: "tavuk", emoji: "🐔", category: "Animals" },
  { pt: "pato", en: "duck", tr: "ördek", emoji: "🦆", category: "Animals" },
  { pt: "leão", en: "lion", tr: "aslan", emoji: "🦁", category: "Animals" },
  { pt: "elefante", en: "elephant", tr: "fil", emoji: "🐘", category: "Animals" },
  { pt: "girafa", en: "giraffe", tr: "zürafa", emoji: "🦒", category: "Animals" },
  { pt: "macaco", en: "monkey", tr: "maymun", emoji: "🐒", category: "Animals" },
  { pt: "urso", en: "bear", tr: "ayı", emoji: "🐻", category: "Animals" },
  { pt: "sapo", en: "frog", tr: "kurbağa", emoji: "🐸", category: "Animals" },
  { pt: "tartaruga", en: "turtle", tr: "kaplumbağa", emoji: "🐢", category: "Animals" },
  { pt: "rato", en: "mouse", tr: "fare", emoji: "🐭", category: "Animals" },
  { pt: "abelha", en: "bee", tr: "arı", emoji: "🐝", category: "Animals" },
  { pt: "borboleta", en: "butterfly", tr: "kelebek", emoji: "🦋", category: "Animals" },
  // ── Food & drink ─────────────────────────────────────────────────────────────
  { pt: "água", en: "water", tr: "su", emoji: "💧", category: "Food & Drink" },
  { pt: "leite", en: "milk", tr: "süt", emoji: "🥛", category: "Food & Drink" },
  { pt: "sumo", en: "juice", tr: "meyve suyu", emoji: "🧃", category: "Food & Drink" },
  { pt: "chá", en: "tea", tr: "çay", emoji: "🫖", category: "Food & Drink" },
  { pt: "pão", en: "bread", tr: "ekmek", emoji: "🍞", category: "Food & Drink" },
  { pt: "arroz", en: "rice", tr: "pirinç", emoji: "🍚", category: "Food & Drink" },
  { pt: "massa", en: "pasta", tr: "makarna", emoji: "🍝", category: "Food & Drink" },
  { pt: "sopa", en: "soup", tr: "çorba", emoji: "🥣", category: "Food & Drink" },
  { pt: "carne", en: "meat", tr: "et", emoji: "🥩", category: "Food & Drink" },
  { pt: "peixe", en: "fish (food)", tr: "balık (yemek)", emoji: "🐟", category: "Food & Drink" },
  { pt: "frango", en: "chicken (food)", tr: "tavuk eti", emoji: "🍗", category: "Food & Drink" },
  { pt: "fruta", en: "fruit", tr: "meyve", emoji: "🍎", category: "Food & Drink" },
  { pt: "maçã", en: "apple", tr: "elma", emoji: "🍎", category: "Food & Drink" },
  { pt: "banana", en: "banana", tr: "muz", emoji: "🍌", category: "Food & Drink" },
  { pt: "laranja", en: "orange", tr: "portakal", emoji: "🍊", category: "Food & Drink" },
  { pt: "morango", en: "strawberry", tr: "çilek", emoji: "🍓", category: "Food & Drink" },
  { pt: "uva", en: "grape", tr: "üzüm", emoji: "🍇", category: "Food & Drink" },
  { pt: "melancia", en: "watermelon", tr: "karpuz", emoji: "🍉", category: "Food & Drink" },
  { pt: "pêra", en: "pear", tr: "armut", emoji: "🍐", category: "Food & Drink" },
  { pt: "limão", en: "lemon", tr: "limon", emoji: "🍋", category: "Food & Drink" },
  { pt: "cenoura", en: "carrot", tr: "havuç", emoji: "🥕", category: "Food & Drink" },
  { pt: "batata", en: "potato", tr: "patates", emoji: "🥔", category: "Food & Drink" },
  { pt: "tomate", en: "tomato", tr: "domates", emoji: "🍅", category: "Food & Drink" },
  { pt: "alface", en: "lettuce", tr: "marul", emoji: "🥬", category: "Food & Drink" },
  { pt: "ovo", en: "egg", tr: "yumurta", emoji: "🥚", category: "Food & Drink" },
  { pt: "queijo", en: "cheese", tr: "peynir", emoji: "🧀", category: "Food & Drink" },
  { pt: "manteiga", en: "butter", tr: "tereyağı", emoji: "🧈", category: "Food & Drink" },
  { pt: "iogurte", en: "yogurt", tr: "yoğurt", emoji: "🫙", category: "Food & Drink" },
  { pt: "bolacha", en: "biscuit / cookie", tr: "bisküvi / kurabiye", emoji: "🍪", category: "Food & Drink" },
  { pt: "gelado", en: "ice cream", tr: "dondurma", emoji: "🍦", category: "Food & Drink" },
  { pt: "chocolate", en: "chocolate", tr: "çikolata", emoji: "🍫", category: "Food & Drink" },
  { pt: "bolo", en: "cake", tr: "pasta / kek", emoji: "🎂", category: "Food & Drink" },
  { pt: "café", en: "coffee", tr: "kahve", emoji: "☕", category: "Food & Drink" },
  { pt: "almoço", en: "lunch", tr: "öğle yemeği", emoji: "🍱", category: "Food & Drink" },
  { pt: "jantar", en: "dinner", tr: "akşam yemeği", emoji: "🍽️", category: "Food & Drink" },
  { pt: "pequeno-almoço", en: "breakfast", tr: "kahvaltı", emoji: "🥐", category: "Food & Drink" },
  { pt: "lanche", en: "afternoon snack", tr: "ikindi atıştırmalığı", emoji: "🥪", category: "Food & Drink" },
  { pt: "padaria", en: "bakery", tr: "fırın / pastane", emoji: "🥖", category: "Food & Drink" },
  { pt: "faca", en: "knife", tr: "bıçak", emoji: "🔪", category: "Food & Drink" },
  { pt: "garfo", en: "fork", tr: "çatal", emoji: "🍴", category: "Food & Drink" },
  { pt: "vinho", en: "wine", tr: "şarap", emoji: "🍷", category: "Food & Drink" },
  { pt: "doce", en: "sweet / candy", tr: "tatlı / şeker", emoji: "🍬", category: "Food & Drink" },
  // ── Colours ──────────────────────────────────────────────────────────────────
  { pt: "vermelho", en: "red", tr: "kırmızı", emoji: "🔴", category: "Colours" },
  { pt: "azul", en: "blue", tr: "mavi", emoji: "🔵", category: "Colours" },
  { pt: "verde", en: "green", tr: "yeşil", emoji: "🟢", category: "Colours" },
  { pt: "amarelo", en: "yellow", tr: "sarı", emoji: "🟡", category: "Colours" },
  { pt: "branco", en: "white", tr: "beyaz", emoji: "⬜", category: "Colours" },
  { pt: "preto", en: "black", tr: "siyah", emoji: "⬛", category: "Colours" },
  { pt: "cor-de-rosa", en: "pink", tr: "pembe", emoji: "🩷", category: "Colours" },
  { pt: "laranja", en: "orange (colour)", tr: "turuncu", emoji: "🟠", category: "Colours" },
  { pt: "roxo", en: "purple", tr: "mor", emoji: "🟣", category: "Colours" },
  { pt: "castanho", en: "brown", tr: "kahverengi", emoji: "🟤", category: "Colours" },
  { pt: "cinzento", en: "grey", tr: "gri", emoji: "🩶", category: "Colours" },
  { pt: "cores", en: "colours", tr: "renkler", emoji: "🌈", category: "Colours" },
  // ── Numbers ── 0–10 ──────────────────────────────────────────────────────────
  { pt: "zero", en: "zero", tr: "sıfır", emoji: "0", category: "Numbers" },
  { pt: "um", en: "one", tr: "bir", emoji: "1", category: "Numbers" },
  { pt: "dois", en: "two", tr: "iki", emoji: "2", category: "Numbers" },
  { pt: "três", en: "three", tr: "üç", emoji: "3", category: "Numbers" },
  { pt: "quatro", en: "four", tr: "dört", emoji: "4", category: "Numbers" },
  { pt: "cinco", en: "five", tr: "beş", emoji: "5", category: "Numbers" },
  { pt: "seis", en: "six", tr: "altı", emoji: "6", category: "Numbers" },
  { pt: "sete", en: "seven", tr: "yedi", emoji: "7", category: "Numbers" },
  { pt: "oito", en: "eight", tr: "sekiz", emoji: "8", category: "Numbers" },
  { pt: "nove", en: "nine", tr: "dokuz", emoji: "9", category: "Numbers" },
  { pt: "dez", en: "ten", tr: "on", emoji: "10", category: "Numbers" },
  // ── Numbers ── 11–19 ─────────────────────────────────────────────────────────
  { pt: "onze", en: "eleven", tr: "on bir", emoji: "11", category: "Numbers" },
  { pt: "doze", en: "twelve", tr: "on iki", emoji: "12", category: "Numbers" },
  { pt: "treze", en: "thirteen", tr: "on üç", emoji: "13", category: "Numbers" },
  { pt: "catorze", en: "fourteen", tr: "on dört", emoji: "14", category: "Numbers" },
  { pt: "quinze", en: "fifteen", tr: "on beş", emoji: "15", category: "Numbers" },
  { pt: "dezasseis", en: "sixteen", tr: "on altı", emoji: "16", category: "Numbers" },
  { pt: "dezassete", en: "seventeen", tr: "on yedi", emoji: "17", category: "Numbers" },
  { pt: "dezoito", en: "eighteen", tr: "on sekiz", emoji: "18", category: "Numbers" },
  { pt: "dezanove", en: "nineteen", tr: "on dokuz", emoji: "19", category: "Numbers" },
  // ── Numbers ── tens ──────────────────────────────────────────────────────────
  { pt: "vinte", en: "twenty", tr: "yirmi", emoji: "20", category: "Numbers" },
  { pt: "trinta", en: "thirty", tr: "otuz", emoji: "30", category: "Numbers" },
  { pt: "quarenta", en: "forty", tr: "kırk", emoji: "40", category: "Numbers" },
  { pt: "cinquenta", en: "fifty", tr: "elli", emoji: "50", category: "Numbers" },
  { pt: "sessenta", en: "sixty", tr: "altmış", emoji: "60", category: "Numbers" },
  { pt: "setenta", en: "seventy", tr: "yetmiş", emoji: "70", category: "Numbers" },
  { pt: "oitenta", en: "eighty", tr: "seksen", emoji: "80", category: "Numbers" },
  { pt: "noventa", en: "ninety", tr: "doksan", emoji: "90", category: "Numbers" },
  // ── Numbers ── hundreds ──────────────────────────────────────────────────────
  { pt: "cem", en: "one hundred", tr: "yüz", emoji: "100", category: "Numbers" },
  { pt: "cento e um", en: "one hundred and one", tr: "yüz bir", emoji: "101", category: "Numbers" },
  { pt: "duzentos", en: "two hundred", tr: "iki yüz", emoji: "200", category: "Numbers" },
  { pt: "trezentos", en: "three hundred", tr: "üç yüz", emoji: "300", category: "Numbers" },
  { pt: "quatrocentos", en: "four hundred", tr: "dört yüz", emoji: "400", category: "Numbers" },
  { pt: "quinhentos", en: "five hundred", tr: "beş yüz", emoji: "500", category: "Numbers" },
  { pt: "novecentos e noventa e nove", en: "nine hundred and ninety-nine", tr: "dokuz yüz doksan dokuz", emoji: "999", category: "Numbers" },
  // ── Numbers ── thousands & large ─────────────────────────────────────────────
  { pt: "mil", en: "one thousand", tr: "bin", emoji: "1.000", category: "Numbers" },
  { pt: "dois mil e vinte e quatro", en: "two thousand and twenty-four", tr: "iki bin yirmi dört", emoji: "2.024", category: "Numbers" },
  { pt: "dez mil", en: "ten thousand", tr: "on bin", emoji: "10.000", category: "Numbers" },
  { pt: "cem mil", en: "one hundred thousand", tr: "yüz bin", emoji: "100.000", category: "Numbers" },
  { pt: "um milhão", en: "one million", tr: "bir milyon", emoji: "1.000.000", category: "Numbers" },
  // ── Numbers ── fractions & decimals (daily use) ───────────────────────────────
  { pt: "meio / meia", en: "half", tr: "yarım", emoji: "½", category: "Numbers" },
  { pt: "um e meio", en: "one and a half", tr: "bir buçuk", emoji: "1,5", category: "Numbers" },
  { pt: "um quarto", en: "a quarter", tr: "çeyrek", emoji: "¼", category: "Numbers" },
  { pt: "três quartos", en: "three quarters", tr: "dörtte üç", emoji: "¾", category: "Numbers" },
  { pt: "dois e meio", en: "two and a half", tr: "iki buçuk", emoji: "2,5", category: "Numbers" },
  { pt: "um euro e vinte e cinco", en: "one euro twenty-five", tr: "bir euro yirmi beş", emoji: "1,25€", category: "Numbers" },
  { pt: "dois euros e meio", en: "two euros fifty", tr: "iki euro elli", emoji: "2,50€", category: "Numbers" },
  // ── Numbers ── ordinals ───────────────────────────────────────────────────────
  { pt: "primeiro", en: "first", tr: "birinci", emoji: "1.º", category: "Numbers" },
  { pt: "segundo", en: "second", tr: "ikinci", emoji: "2.º", category: "Numbers" },
  { pt: "terceiro", en: "third", tr: "üçüncü", emoji: "3.º", category: "Numbers" },
  { pt: "décimo", en: "tenth", tr: "onuncu", emoji: "10.º", category: "Numbers" },
  // ── Numbers ── concepts ───────────────────────────────────────────────────────
  { pt: "par", en: "even number", tr: "çift sayı", emoji: "2 4 6…", category: "Numbers" },
  { pt: "ímpar", en: "odd number", tr: "tek sayı", emoji: "1 3 5…", category: "Numbers" },
  // ── Body ─────────────────────────────────────────────────────────────────────
  { pt: "cabeça", en: "head", tr: "baş / kafa", emoji: "🗣️", category: "Body" },
  { pt: "olho", en: "eye", tr: "göz", emoji: "👁️", category: "Body" },
  { pt: "nariz", en: "nose", tr: "burun", emoji: "👃", category: "Body" },
  { pt: "boca", en: "mouth", tr: "ağız", emoji: "👄", category: "Body" },
  { pt: "orelha", en: "ear", tr: "kulak", emoji: "👂", category: "Body" },
  { pt: "mão", en: "hand", tr: "el", emoji: "✋", category: "Body" },
  { pt: "pé", en: "foot", tr: "ayak", emoji: "🦶", category: "Body" },
  { pt: "braço", en: "arm", tr: "kol", emoji: "💪", category: "Body" },
  { pt: "perna", en: "leg", tr: "bacak", emoji: "🦵", category: "Body" },
  { pt: "cabelo", en: "hair", tr: "saç", emoji: "💇", category: "Body" },
  { pt: "dente", en: "tooth", tr: "diş", emoji: "🦷", category: "Body" },
  { pt: "barriga", en: "belly / tummy", tr: "karın / göbek", emoji: "🤰", category: "Body" },
  { pt: "dedo", en: "finger", tr: "parmak", emoji: "👉", category: "Body" },
  { pt: "dores de cabeça", en: "headache", tr: "baş ağrısı", emoji: "🤕", category: "Body" },
  // ── Clothes ──────────────────────────────────────────────────────────────────
  { pt: "camisola", en: "sweater / jumper", tr: "kazak", emoji: "👚", category: "Clothes" },
  { pt: "t-shirt", en: "t-shirt", tr: "tişört", emoji: "👕", category: "Clothes" },
  { pt: "camisa", en: "shirt", tr: "gömlek", emoji: "👔", category: "Clothes" },
  { pt: "calças", en: "trousers / pants", tr: "pantolon", emoji: "👖", category: "Clothes" },
  { pt: "calções", en: "shorts", tr: "şort", emoji: "🩳", category: "Clothes" },
  { pt: "saia", en: "skirt", tr: "etek", emoji: "👗", category: "Clothes" },
  { pt: "vestido", en: "dress", tr: "elbise", emoji: "👗", category: "Clothes" },
  { pt: "roupa interior", en: "underwear", tr: "iç çamaşırı", emoji: "🩲", category: "Clothes" },
  { pt: "pijama", en: "pyjamas", tr: "pijama", emoji: "🛌", category: "Clothes" },
  { pt: "sapatos", en: "shoes", tr: "ayakkabı", emoji: "👞", category: "Clothes" },
  { pt: "sapatilhas", en: "sneakers / trainers", tr: "spor ayakkabı", emoji: "👟", category: "Clothes" },
  { pt: "botas", en: "boots", tr: "çizme", emoji: "👢", category: "Clothes" },
  { pt: "sandálias", en: "sandals", tr: "sandalet", emoji: "👡", category: "Clothes" },
  { pt: "casaco", en: "coat / jacket", tr: "ceket / mont", emoji: "🧥", category: "Clothes" },
  { pt: "impermeável", en: "raincoat", tr: "yağmurluk", emoji: "🧥", category: "Clothes" },
  { pt: "chapéu", en: "hat", tr: "şapka", emoji: "🧢", category: "Clothes" },
  { pt: "cachecol", en: "scarf", tr: "atkı / eşarp", emoji: "🧣", category: "Clothes" },
  { pt: "luvas", en: "gloves", tr: "eldiven", emoji: "🧤", category: "Clothes" },
  { pt: "meias", en: "socks", tr: "çorap", emoji: "🧦", category: "Clothes" },
  { pt: "cinto", en: "belt", tr: "kemer", emoji: "🔗", category: "Clothes" },
  { pt: "fato de banho", en: "swimsuit / swimming costume", tr: "mayo", emoji: "🩱", category: "Clothes" },
  // ── Home ─────────────────────────────────────────────────────────────────────
  { pt: "casa", en: "house / home", tr: "ev", emoji: "🏠", category: "Home" },
  { pt: "porta", en: "door", tr: "kapı", emoji: "🚪", category: "Home" },
  { pt: "janela", en: "window", tr: "pencere", emoji: "🪟", category: "Home" },
  { pt: "parede", en: "wall", tr: "duvar", emoji: "🧱", category: "Home" },
  { pt: "tecto", en: "ceiling / roof", tr: "tavan / çatı", emoji: "🔝", category: "Home" },
  { pt: "chão", en: "floor", tr: "zemin / yer", emoji: "🪵", category: "Home" },
  { pt: "escadas", en: "stairs", tr: "merdiven", emoji: "🪜", category: "Home" },
  { pt: "sala de estar", en: "living room", tr: "oturma odası", emoji: "🛋️", category: "Home" },
  { pt: "sofá", en: "sofa / couch", tr: "kanepe", emoji: "🛋️", category: "Home" },
  { pt: "cama", en: "bed", tr: "yatak", emoji: "🛏️", category: "Home" },
  { pt: "mesa", en: "table", tr: "masa", emoji: "🪑", category: "Home" },
  { pt: "cadeira", en: "chair", tr: "sandalye", emoji: "🪑", category: "Home" },
  { pt: "cozinha", en: "kitchen", tr: "mutfak", emoji: "🍳", category: "Home" },
  { pt: "frigorífico", en: "fridge / refrigerator", tr: "buzdolabı", emoji: "🧊", category: "Home" },
  { pt: "máquina de lavar", en: "washing machine", tr: "çamaşır makinesi", emoji: "🫧", category: "Home" },
  { pt: "quarto", en: "bedroom", tr: "yatak odası", emoji: "🛏️", category: "Home" },
  { pt: "casa de banho", en: "bathroom", tr: "banyo", emoji: "🛁", category: "Home" },
  { pt: "sanita", en: "toilet", tr: "tuvalet", emoji: "🚽", category: "Home" },
  { pt: "garagem", en: "garage", tr: "garaj", emoji: "🚗", category: "Home" },
  { pt: "jardim", en: "garden", tr: "bahçe", emoji: "🌳", category: "Home" },
  { pt: "televisão", en: "television / TV", tr: "televizyon", emoji: "📺", category: "Home" },
  { pt: "candeeiro", en: "lamp / light", tr: "lamba", emoji: "💡", category: "Home" },
  { pt: "prateleira", en: "shelf", tr: "raf", emoji: "🗄️", category: "Home" },
  // ── School ───────────────────────────────────────────────────────────────────
  { pt: "escola", en: "school", tr: "okul", emoji: "🏫", category: "School" },
  { pt: "jardim de infância", en: "kindergarten / preschool", tr: "anaokulu", emoji: "🧸", category: "School" },
  { pt: "sala de aula", en: "classroom", tr: "sınıf", emoji: "👩‍🏫", category: "School" },
  { pt: "biblioteca", en: "library", tr: "kütüphane", emoji: "📚", category: "School" },
  { pt: "cantina", en: "canteen / cafeteria", tr: "kantin / yemekhane", emoji: "🍽️", category: "School" },
  { pt: "ginásio", en: "gymnasium / gym", tr: "spor salonu", emoji: "🏀", category: "School" },
  { pt: "professor", en: "teacher (m)", tr: "öğretmen (erkek)", emoji: "👨‍🏫", category: "School" },
  { pt: "professora", en: "teacher (f)", tr: "öğretmen (kadın)", emoji: "👩‍🏫", category: "School" },
  { pt: "aluno", en: "student (m)", tr: "öğrenci (erkek)", emoji: "👦", category: "School" },
  { pt: "aluna", en: "student (f)", tr: "öğrenci (kız)", emoji: "👧", category: "School" },
  { pt: "colega", en: "classmate", tr: "sınıf arkadaşı", emoji: "🧑‍🤝‍🧑", category: "School" },
  { pt: "aula", en: "lesson / class", tr: "ders", emoji: "🔔", category: "School" },
  { pt: "livro", en: "book", tr: "kitap", emoji: "📖", category: "School" },
  { pt: "caderno", en: "notebook", tr: "defter", emoji: "📓", category: "School" },
  { pt: "lápis", en: "pencil", tr: "kalem", emoji: "✏️", category: "School" },
  { pt: "caneta", en: "pen", tr: "tükenmez kalem", emoji: "🖊️", category: "School" },
  { pt: "mochila", en: "backpack", tr: "sırt çantası", emoji: "🎒", category: "School" },
  { pt: "estojo", en: "pencil case", tr: "kalem kutusu", emoji: "👝", category: "School" },
  { pt: "borracha", en: "rubber / eraser", tr: "silgi", emoji: "🧽", category: "School" },
  { pt: "afia-lápis", en: "pencil sharpener", tr: "kalemtıraş", emoji: "⚙️", category: "School" },
  { pt: "tesoura", en: "scissors", tr: "makas", emoji: "✂️", category: "School" },
  { pt: "cola", en: "glue", tr: "yapıştırıcı", emoji: "🧴", category: "School" },
  { pt: "régua", en: "ruler", tr: "cetvel", emoji: "📏", category: "School" },
  { pt: "lápis de cor", en: "coloured pencils", tr: "kuru boya kalemleri", emoji: "🎨", category: "School" },
  { pt: "marcador", en: "marker / highlighter", tr: "keçeli kalem / fosforlu kalem", emoji: "🖍️", category: "School" },
  { pt: "quadro", en: "blackboard / whiteboard", tr: "yazı tahtası", emoji: "📋", category: "School" },
  { pt: "giz", en: "chalk", tr: "tebeşir", emoji: "✍️", category: "School" },
  { pt: "papel", en: "paper", tr: "kağıt", emoji: "📄", category: "School" },
  { pt: "computador", en: "computer", tr: "bilgisayar", emoji: "💻", category: "School" },
  { pt: "secretária", en: "school desk", tr: "öğrenci sırası", emoji: "🪑", category: "School" },
  { pt: "recreio", en: "break / recess", tr: "teneffüs", emoji: "🛝", category: "School" },
  { pt: "teste", en: "test / quiz", tr: "sınav / test", emoji: "📑", category: "School" },
  { pt: "nota", en: "grade / mark", tr: "not / puan", emoji: "💯", category: "School" },
  { pt: "trabalho de casa", en: "homework", tr: "ev ödevi", emoji: "📚", category: "School" },
  { pt: "matemática", en: "mathematics / maths", tr: "matematik", emoji: "🔢", category: "School" },
  { pt: "ciências", en: "science", tr: "fen bilgisi / bilim", emoji: "🔬", category: "School" },
  { pt: "história", en: "history", tr: "tarih", emoji: "🏛️", category: "School" },
  { pt: "geografia", en: "geography", tr: "coğrafya", emoji: "🌍", category: "School" },
  { pt: "música", en: "music", tr: "müzik", emoji: "🎵", category: "School" },
  { pt: "educação física", en: "PE / physical education", tr: "beden eğitimi", emoji: "⚽", category: "School" },
  { pt: "matéria", en: "subject (school)", tr: "ders konusu", emoji: "📚", category: "School" },
  // ── Places ───────────────────────────────────────────────────────────────────
  { pt: "cidade", en: "city / town", tr: "şehir", emoji: "🏙️", category: "Places" },
  { pt: "aldeia", en: "village", tr: "köy", emoji: "🏡", category: "Places" },
  { pt: "rua", en: "street", tr: "sokak", emoji: "🛣️", category: "Places" },
  { pt: "parque", en: "park", tr: "park", emoji: "🌳", category: "Places" },
  { pt: "praia", en: "beach", tr: "plaj / sahil", emoji: "🏖️", category: "Places" },
  { pt: "piscina", en: "swimming pool", tr: "yüzme havuzu", emoji: "🏊", category: "Places" },
  { pt: "supermercado", en: "supermarket", tr: "süpermarket", emoji: "🛒", category: "Places" },
  { pt: "mercado", en: "market", tr: "pazar / çarşı", emoji: "🛍️", category: "Places" },
  { pt: "farmácia", en: "pharmacy / chemist", tr: "eczane", emoji: "💊", category: "Places" },
  { pt: "banco", en: "bank", tr: "banka", emoji: "🏦", category: "Places" },
  { pt: "correios", en: "post office", tr: "postane", emoji: "📮", category: "Places" },
  { pt: "hospital", en: "hospital", tr: "hastane", emoji: "🏥", category: "Places" },
  { pt: "restaurante", en: "restaurant", tr: "restoran", emoji: "🍽️", category: "Places" },
  { pt: "café", en: "café / coffee shop", tr: "kafe", emoji: "☕", category: "Places" },
  { pt: "cinema", en: "cinema", tr: "sinema", emoji: "🎬", category: "Places" },
  { pt: "museu", en: "museum", tr: "müze", emoji: "🏛️", category: "Places" },
  { pt: "aeroporto", en: "airport", tr: "havalimanı", emoji: "✈️", category: "Places" },
  { pt: "estação de comboios", en: "train station", tr: "tren istasyonu", emoji: "🚂", category: "Places" },
  { pt: "gasolineira", en: "petrol station", tr: "benzin istasyonu", emoji: "⛽", category: "Places" },
  { pt: "hotel", en: "hotel", tr: "otel", emoji: "🏨", category: "Places" },
  { pt: "loja", en: "shop / store", tr: "dükkan / mağaza", emoji: "🏪", category: "Places" },
  { pt: "igreja", en: "church", tr: "kilise", emoji: "⛪", category: "Places" },
  // ── Transport ────────────────────────────────────────────────────────────────
  { pt: "carro", en: "car", tr: "araba", emoji: "🚗", category: "Transport" },
  { pt: "autocarro", en: "bus", tr: "otobüs", emoji: "🚌", category: "Transport" },
  { pt: "comboio", en: "train", tr: "tren", emoji: "🚂", category: "Transport" },
  { pt: "metro", en: "metro / underground", tr: "metro", emoji: "🚇", category: "Transport" },
  { pt: "elétrico", en: "tram", tr: "tramvay", emoji: "🚋", category: "Transport" },
  { pt: "táxi", en: "taxi / cab", tr: "taksi", emoji: "🚕", category: "Transport" },
  { pt: "avião", en: "aeroplane", tr: "uçak", emoji: "✈️", category: "Transport" },
  { pt: "helicóptero", en: "helicopter", tr: "helikopter", emoji: "🚁", category: "Transport" },
  { pt: "bicicleta", en: "bicycle", tr: "bisiklet", emoji: "🚲", category: "Transport" },
  { pt: "mota", en: "motorbike / motorcycle", tr: "motosiklet", emoji: "🏍️", category: "Transport" },
  { pt: "barco", en: "boat", tr: "tekne", emoji: "⛵", category: "Transport" },
  { pt: "ferry", en: "ferry", tr: "feribot", emoji: "🛳️", category: "Transport" },
  { pt: "camião", en: "lorry / truck", tr: "kamyon", emoji: "🚚", category: "Transport" },
  { pt: "ambulância", en: "ambulance", tr: "ambulans", emoji: "🚑", category: "Transport" },
  // ── Adjectives ───────────────────────────────────────────────────────────────
  { pt: "grande", en: "big / large", tr: "büyük", emoji: "🐘", category: "Adjectives" },
  { pt: "aberto", en: "open", tr: "açık", emoji: "🔓", category: "Adjectives" },
  { pt: "pobre", en: "poor", tr: "fakir / yoksul", emoji: "😔", category: "Adjectives" },
  { pt: "caro", en: "expensive", tr: "pahalı", emoji: "💸", category: "Adjectives" },
  { pt: "barato", en: "cheap", tr: "ucuz", emoji: "🏷️", category: "Adjectives" },
  { pt: "lindo", en: "gorgeous / lovely", tr: "güzel / harika", emoji: "😍", category: "Adjectives" },
  { pt: "morto", en: "dead", tr: "ölü", emoji: "💀", category: "Adjectives" },
  { pt: "jovem", en: "young", tr: "genç", emoji: "🧒", category: "Adjectives" },
  { pt: "longo", en: "long", tr: "uzun", emoji: "📏", category: "Adjectives" },
  { pt: "curto", en: "short", tr: "kısa", emoji: "✂️", category: "Adjectives" },
  { pt: "certo", en: "right / correct", tr: "doğru", emoji: "✅", category: "Adjectives" },
  { pt: "errado", en: "wrong", tr: "yanlış", emoji: "❌", category: "Adjectives" },
  { pt: "magro", en: "thin / slim", tr: "zayıf / ince", emoji: "🦴", category: "Adjectives" },
  { pt: "gordo", en: "fat", tr: "şişman / kilolu", emoji: "🐷", category: "Adjectives" },
  { pt: "melhor", en: "better", tr: "daha iyi", emoji: "🥇", category: "Adjectives" },
  { pt: "seco", en: "dry", tr: "kuru", emoji: "🌵", category: "Adjectives" },
  { pt: "molhado", en: "wet", tr: "ıslak", emoji: "💦", category: "Adjectives" },
  { pt: "atual", en: "current / present", tr: "güncel / mevcut", emoji: "📌", category: "Adjectives" },
  { pt: "cru", en: "raw", tr: "çiğ", emoji: "🥗", category: "Adjectives" },
  { pt: "escuro", en: "dark", tr: "karanlık", emoji: "🌑", category: "Adjectives" },
  { pt: "pequeno", en: "small / little", tr: "küçük", emoji: "🐭", category: "Adjectives" },
  { pt: "bonito", en: "beautiful / pretty", tr: "güzel", emoji: "🌸", category: "Adjectives" },
  { pt: "feio", en: "ugly", tr: "çirkin", emoji: "👹", category: "Adjectives" },
  { pt: "bom", en: "good", tr: "iyi", emoji: "👍", category: "Adjectives" },
  { pt: "mau", en: "bad", tr: "kötü", emoji: "👎", category: "Adjectives" },
  { pt: "novo", en: "new", tr: "yeni", emoji: "🎁", category: "Adjectives" },
  { pt: "velho", en: "old", tr: "eski / yaşlı", emoji: "👴", category: "Adjectives" },
  { pt: "rápido", en: "fast / quick", tr: "hızlı", emoji: "⚡", category: "Adjectives" },
  { pt: "lento", en: "slow", tr: "yavaş", emoji: "🐌", category: "Adjectives" },
  { pt: "quente", en: "hot / warm", tr: "sıcak", emoji: "🔥", category: "Adjectives" },
  { pt: "frio", en: "cold", tr: "soğuk", emoji: "❄️", category: "Adjectives" },
  { pt: "feliz", en: "happy", tr: "mutlu", emoji: "😊", category: "Adjectives" },
  { pt: "triste", en: "sad", tr: "üzgün", emoji: "😢", category: "Adjectives" },
  { pt: "cansado", en: "tired", tr: "yorgun", emoji: "😴", category: "Adjectives" },
  { pt: "com fome", en: "hungry", tr: "aç", emoji: "🍔", category: "Adjectives" },
  { pt: "com sede", en: "thirsty", tr: "susuz", emoji: "💧", category: "Adjectives" },
  { pt: "doente", en: "sick", tr: "hasta", emoji: "🤒", category: "Adjectives" },
  { pt: "saudável", en: "healthy", tr: "sağlıklı", emoji: "🥗", category: "Adjectives" },
  { pt: "alto", en: "tall", tr: "uzun boylu", emoji: "🦒", category: "Adjectives" },
  { pt: "baixo", en: "short", tr: "kısa boylu", emoji: "🐛", category: "Adjectives" },
  { pt: "fácil", en: "easy", tr: "kolay", emoji: "🎈", category: "Adjectives" },
  { pt: "difícil", en: "difficult", tr: "zor", emoji: "🧩", category: "Adjectives" },
  // ── Time ─────────────────────────────────────────────────────────────────────
  { pt: "hoje", en: "today", tr: "bugün", emoji: "📅", category: "Time" },
  { pt: "amanhã", en: "tomorrow", tr: "yarın", emoji: "🌅", category: "Time" },
  { pt: "ontem", en: "yesterday", tr: "dün", emoji: "⏮️", category: "Time" },
  { pt: "manhã", en: "morning", tr: "sabah", emoji: "🌄", category: "Time" },
  { pt: "tarde", en: "afternoon", tr: "öğleden sonra", emoji: "🌇", category: "Time" },
  { pt: "noite", en: "night / evening", tr: "gece / akşam", emoji: "🌙", category: "Time" },
  { pt: "dia", en: "day", tr: "gün", emoji: "☀️", category: "Time" },
  { pt: "semana", en: "week", tr: "hafta", emoji: "📆", category: "Time" },
  { pt: "mês", en: "month", tr: "ay", emoji: "📅", category: "Time" },
  { pt: "ano", en: "year", tr: "yıl", emoji: "🎊", category: "Time" },
  { pt: "hora", en: "hour / time", tr: "saat", emoji: "⏰", category: "Time" },
  // ── Time ── clock examples ────────────────────────────────────────────────────
  { pt: "sete horas", en: "07:00 - wake up", tr: "07:00 - uyanma vakti", emoji: "07:00", category: "Time" },
  { pt: "sete e meia", en: "07:30 - breakfast", tr: "07:30 - kahvaltı", emoji: "07:30", category: "Time" },
  { pt: "oito horas", en: "08:00 - school / work starts", tr: "08:00 - okul / iş başlıyor", emoji: "08:00", category: "Time" },
  { pt: "nove e um quarto", en: "09:15 - morning meeting", tr: "09:15 - sabah toplantısı", emoji: "09:15", category: "Time" },
  { pt: "dez e meia", en: "10:30 - coffee break", tr: "10:30 - kahve molası", emoji: "10:30", category: "Time" },
  { pt: "meio-dia", en: "12:00 - lunch", tr: "12:00 - öğle yemeği", emoji: "12:00", category: "Time" },
  { pt: "treze e quinze", en: "13:15 - back to work", tr: "13:15 - işe dönüş", emoji: "13:15", category: "Time" },
  { pt: "quinze e vinte", en: "15:20 - school ends", tr: "15:20 - okul bitiyor", emoji: "15:20", category: "Time" },
  { pt: "dezassete e meia", en: "17:30 - dinner time", tr: "17:30 - akşam yemeği", emoji: "17:30", category: "Time" },
  { pt: "dezoito e quarenta e cinco", en: "18:45 - evening walk", tr: "18:45 - akşam yürüyüşü", emoji: "18:45", category: "Time" },
  { pt: "vinte horas", en: "20:00 - bedtime", tr: "20:00 - uyku vakti", emoji: "20:00", category: "Time" },
  { pt: "vinte e duas e meia", en: "22:30 - lights out", tr: "22:30 - ışıklar sönüyor", emoji: "22:30", category: "Time" },
  { pt: "doze e cinquenta e três", en: "12:53 - nearly one", tr: "12:53 - neredeyse bir", emoji: "12:53", category: "Time" },
  { pt: "oito e quarenta e sete", en: "08:47 - almost nine", tr: "08:47 - neredeyse dokuz", emoji: "08:47", category: "Time" },
  { pt: "dezasseis e trinta e dois", en: "16:32 - afternoon", tr: "16:32 - öğleden sonra", emoji: "16:32", category: "Time" },
  { pt: "vinte e um e onze", en: "21:11 - evening", tr: "21:11 - akşam", emoji: "21:11", category: "Time" },
  { pt: "meia-noite", en: "00:00 - midnight", tr: "00:00 - gece yarısı", emoji: "00:00", category: "Time" },
  // ── Weather ──────────────────────────────────────────────────────────────────
  { pt: "tempo", en: "weather", tr: "hava durumu", emoji: "🌤️", category: "Weather" },
  { pt: "sol", en: "sun", tr: "güneş", emoji: "☀️", category: "Weather" },
  { pt: "chuva", en: "rain", tr: "yağmur", emoji: "🌧️", category: "Weather" },
  { pt: "neve", en: "snow", tr: "kar", emoji: "❄️", category: "Weather" },
  { pt: "vento", en: "wind", tr: "rüzgar", emoji: "💨", category: "Weather" },
  { pt: "nuvem", en: "cloud", tr: "bulut", emoji: "☁️", category: "Weather" },
  { pt: "trovoada", en: "thunderstorm", tr: "gök gürültülü fırtına", emoji: "⛈️", category: "Weather" },
  { pt: "relâmpago", en: "lightning", tr: "şimşek", emoji: "⚡", category: "Weather" },
  { pt: "nevoeiro", en: "fog / mist", tr: "sis", emoji: "🌫️", category: "Weather" },
  { pt: "arco-íris", en: "rainbow", tr: "gökkuşağı", emoji: "🌈", category: "Weather" },
  { pt: "gelo", en: "ice / frost", tr: "buz / kırağı", emoji: "🧊", category: "Weather" },
  { pt: "granizo", en: "hail", tr: "dolu", emoji: "🌨️", category: "Weather" },
  { pt: "temperatura", en: "temperature", tr: "sıcaklık", emoji: "🌡️", category: "Weather" },
  { pt: "guarda-chuva", en: "umbrella", tr: "şemsiye", emoji: "☂️", category: "Weather" },
  { pt: "soalheiro", en: "sunny", tr: "güneşli", emoji: "🌞", category: "Weather" },
  { pt: "nublado", en: "cloudy / overcast", tr: "bulutlu / kapalı", emoji: "🌥️", category: "Weather" },
  { pt: "húmido", en: "humid", tr: "nemli", emoji: "💦", category: "Weather" },
  // ── General Nouns ────────────────────────────────────────────────────────────
  { pt: "jogo", en: "game / match", tr: "oyun / maç", emoji: "🎮", category: "Nouns" },
  { pt: "jóias", en: "jewellery", tr: "mücevher", emoji: "💎", category: "Nouns" },
  { pt: "malas", en: "bags / suitcases", tr: "çantalar / valizler", emoji: "🧳", category: "Nouns" },
  { pt: "mala", en: "bag / suitcase", tr: "çanta / valiz", emoji: "👜", category: "Nouns" },
  { pt: "saldo", en: "balance", tr: "bakiye", emoji: "💰", category: "Nouns" },
  { pt: "pagamento", en: "payment", tr: "ödeme", emoji: "💳", category: "Nouns" },
  { pt: "valor", en: "value / price", tr: "değer / fiyat", emoji: "🏷️", category: "Nouns" },
  { pt: "canção", en: "song", tr: "şarkı", emoji: "🎶", category: "Nouns" },
  { pt: "palavra", en: "word", tr: "kelime / sözcük", emoji: "🔤", category: "Nouns" },
  { pt: "calor", en: "heat", tr: "sıcaklık / ısı", emoji: "🔥", category: "Nouns" },
  { pt: "verdade", en: "truth", tr: "gerçek / doğru", emoji: "⚖️", category: "Nouns" },
  { pt: "pergunta", en: "question", tr: "soru", emoji: "❓", category: "Nouns" },
  { pt: "prazo", en: "deadline", tr: "son tarih", emoji: "📆", category: "Nouns" },
  { pt: "prédio", en: "building", tr: "bina / apartman", emoji: "🏢", category: "Nouns" },
  { pt: "andares", en: "floors / storeys", tr: "katlar", emoji: "🏬", category: "Nouns" },
  { pt: "sala", en: "room", tr: "oda / salon", emoji: "🛋️", category: "Nouns" },
  { pt: "vidas", en: "lives", tr: "hayatlar / canlar", emoji: "💗", category: "Nouns" },
  { pt: "voos", en: "flights", tr: "uçuşlar", emoji: "✈️", category: "Nouns" },
  { pt: "roupas", en: "clothes", tr: "kıyafetler / elbiseler", emoji: "👗", category: "Nouns" },
  { pt: "algo", en: "something", tr: "bir şey", emoji: "🤷", category: "Nouns" },
  { pt: "relógio", en: "clock / watch", tr: "saat", emoji: "⏰", category: "Nouns" },
  { pt: "outubro", en: "October", tr: "Ekim", emoji: "🍂", category: "Nouns" },
  { pt: "dobro", en: "double", tr: "iki katı / çift", emoji: "2️⃣", category: "Nouns" },
  { pt: "coisas", en: "things", tr: "şeyler", emoji: "📦", category: "Nouns" },
  { pt: "óculos", en: "glasses / spectacles", tr: "gözlük", emoji: "👓", category: "Nouns" },
  // ── Pronouns & Function Words ─────────────────────────────────────────────────
  { pt: "meu", en: "my", tr: "benim", emoji: "👤", category: "Pronouns" },
  { pt: "nosso", en: "our", tr: "bizim", emoji: "👥", category: "Pronouns" },
  { pt: "nossa", en: "our (f)", tr: "bizim", emoji: "👥", category: "Pronouns" },
  { pt: "dela", en: "her / hers", tr: "onun (kadın)", emoji: "👩", category: "Pronouns" },
  { pt: "isso", en: "that", tr: "o / bu / şu", emoji: "👉", category: "Pronouns" },
  { pt: "comigo", en: "with me", tr: "benimle", emoji: "🤝", category: "Pronouns" },
  { pt: "qual", en: "which", tr: "hangi", emoji: "🤷", category: "Pronouns" },
  { pt: "quanto", en: "how much", tr: "ne kadar", emoji: "💰", category: "Pronouns" },
  { pt: "porque", en: "why / because", tr: "neden / çünkü", emoji: "❓", category: "Pronouns" },
  { pt: "quando", en: "when", tr: "ne zaman", emoji: "📅", category: "Pronouns" },
  { pt: "ou", en: "or", tr: "ya da / veya", emoji: "🔀", category: "Pronouns" },
  { pt: "já", en: "already", tr: "zaten / artık", emoji: "✅", category: "Pronouns" },
  { pt: "entre", en: "between", tr: "arasında", emoji: "↔️", category: "Pronouns" },
  { pt: "nesta", en: "in this", tr: "bu (içinde)", emoji: "📍", category: "Pronouns" },
  { pt: "aqueles", en: "those (m, pl)", tr: "onlar, şunlar (eril ve çoğul)", emoji: "👥", category: "Pronouns" },
  // ── Adverbs & Prepositions ────────────────────────────────────────────────────
  { pt: "ainda", en: "still / yet", tr: "hâlâ / henüz", emoji: "⏳", category: "Adverbs" },
  { pt: "sempre", en: "always", tr: "her zaman", emoji: "♾️", category: "Adverbs" },
  { pt: "aqui", en: "here", tr: "burada", emoji: "📍", category: "Adverbs" },
  { pt: "fora", en: "outside", tr: "dışarı / dışarıda", emoji: "🌳", category: "Adverbs" },
  { pt: "embora", en: "away (ir embora = to leave)", tr: "gitmek için", emoji: "🚶", category: "Adverbs" },
  { pt: "apenas", en: "just / only", tr: "sadece / yalnızca", emoji: "1️⃣", category: "Adverbs" },
  { pt: "também", en: "also / too", tr: "de / da / ayrıca", emoji: "➕", category: "Adverbs" },
  { pt: "mais", en: "more", tr: "daha fazla", emoji: "➕", category: "Adverbs" },
  { pt: "menos", en: "less", tr: "daha az", emoji: "➖", category: "Adverbs" },
  { pt: "quase", en: "almost / about", tr: "neredeyse", emoji: "🔜", category: "Adverbs" },
  { pt: "agora", en: "now", tr: "şimdi", emoji: "⏱️", category: "Adverbs" },
  { pt: "sobre", en: "about / on", tr: "hakkında / üzerinde", emoji: "💬", category: "Adverbs" },
  { pt: "só", en: "only / just", tr: "sadece / yalnız", emoji: "🧍", category: "Adverbs" },
  { pt: "vezes", en: "times / sometimes", tr: "kez / bazen", emoji: "🔁", category: "Adverbs" },
  { pt: "pouco", en: "a little / few", tr: "az", emoji: "🤏", category: "Adverbs" },
  { pt: "algum", en: "some", tr: "biraz / bazı", emoji: "🫙", category: "Adverbs" },
  { pt: "tão", en: "so / such", tr: "o kadar / çok", emoji: "😲", category: "Adverbs" },
  { pt: "cedo", en: "early", tr: "erken", emoji: "🌅", category: "Adverbs" },
  { pt: "atrasado", en: "late / delayed", tr: "geç / gecikmiş", emoji: "⏱️", category: "Adverbs" },
  { pt: "para", en: "to / for / until", tr: "için / -a / -e", emoji: "➡️", category: "Adverbs" },
  { pt: "por", en: "for / by", tr: "tarafından / için", emoji: "🔄", category: "Adverbs" },
  { pt: "há", en: "there is / for (time)", tr: "var / -dır", emoji: "⌛", category: "Adverbs" },
  // ── Prepositions ─────────────────────────────────────────────────────────────
  // Simple prepositions
  { pt: "de", en: "of / by / from", tr: "ait / tarafından / -den", emoji: "🏷️", category: "Prepositions" },
  { pt: "em", en: "in / on / at", tr: "içinde / üzerinde / -de", emoji: "📌", category: "Prepositions" },
  { pt: "a", en: "to", tr: "-e / -a", emoji: "🎯", category: "Prepositions" },
  { pt: "por", en: "for / by / through", tr: "için / tarafından / boyunca", emoji: "🛤️", category: "Prepositions" },
  { pt: "com", en: "with", tr: "ile / birlikte", emoji: "🤝", category: "Prepositions" },
  // Contractions: preposition + definite article (o, a, os, as)
  { pt: "ao", en: "to the (m)", tr: "-e / -a (eril)", emoji: "🎯", category: "Prepositions" },
  { pt: "à", en: "to the (f)", tr: "-e / -a (dişil)", emoji: "🎯", category: "Prepositions" },
  { pt: "aos", en: "to the (m, pl)", tr: "-e / -a (eril çoğul)", emoji: "🎯", category: "Prepositions" },
  { pt: "às", en: "to the (f, pl)", tr: "-e / -a (dişil çoğul)", emoji: "🎯", category: "Prepositions" },
  { pt: "do", en: "of the (m)", tr: "erkek ismin -den eki", emoji: "🏷️", category: "Prepositions" },
  { pt: "da", en: "of the (f)", tr: "kadın ismin -den eki", emoji: "🏷️", category: "Prepositions" },
  { pt: "dos", en: "of the (m, pl)", tr: "eril çoğulun -den eki", emoji: "🏷️", category: "Prepositions" },
  { pt: "das", en: "of the (f, pl)", tr: "dişil çoğulun -den eki", emoji: "🏷️", category: "Prepositions" },
  { pt: "no", en: "in the (m)", tr: "-de / -da (eril)", emoji: "📌", category: "Prepositions" },
  { pt: "na", en: "in the (f)", tr: "-de / -da (dişil)", emoji: "📌", category: "Prepositions" },
  { pt: "nos", en: "in the (m, pl)", tr: "-de / -da (eril çoğul)", emoji: "📌", category: "Prepositions" },
  { pt: "nas", en: "in the (f, pl)", tr: "-de / -da (dişil çoğul)", emoji: "📌", category: "Prepositions" },
  { pt: "pelo", en: "for / by / through the (m)", tr: "tarafından / boyunca (eril)", emoji: "🛤️", category: "Prepositions" },
  { pt: "pela", en: "for / by / through the (f)", tr: "tarafından / boyunca (dişil)", emoji: "🛤️", category: "Prepositions" },
  { pt: "pelos", en: "for / by / through the (m, pl)", tr: "tarafından / boyunca (eril çoğul)", emoji: "🛤️", category: "Prepositions" },
  { pt: "pelas", en: "for / by / through the (f, pl)", tr: "tarafından / boyunca (dişil çoğul)", emoji: "🛤️", category: "Prepositions" },
  // Contractions: preposition + indefinite article (um, uma, uns, umas)
  { pt: "num", en: "in a / on a (m)", tr: "bir (eril) içinde / üzerinde", emoji: "🗂️", category: "Prepositions" },
  { pt: "numa", en: "in a / on a (f)", tr: "bir (dişil) içinde / üzerinde", emoji: "🗂️", category: "Prepositions" },
  { pt: "nuns", en: "in some (m, pl)", tr: "bazı (eril) içinde", emoji: "🗂️", category: "Prepositions" },
  { pt: "numas", en: "in some (f, pl)", tr: "bazı (dişil) içinde", emoji: "🗂️", category: "Prepositions" },
  { pt: "dum", en: "of a (m)", tr: "bir (eril) -den eki", emoji: "🏷️", category: "Prepositions" },
  { pt: "duma", en: "of a (f)", tr: "bir (dişil) -den eki", emoji: "🏷️", category: "Prepositions" },
  { pt: "duns", en: "of some (m, pl)", tr: "bazı (eril) -den eki", emoji: "🏷️", category: "Prepositions" },
  { pt: "dumas", en: "of some (f, pl)", tr: "bazı (dişil) -den eki", emoji: "🏷️", category: "Prepositions" },
  // ── Idioms & Expressions ──────────────────────────────────────────────────────
  // ── Common phrases ───────────────────────────────────────────────────────────
  { pt: "olá", en: "hello", tr: "merhaba", emoji: "👋", category: "Phrases" },
  { pt: "bom dia", en: "good morning", tr: "günaydın", emoji: "🌅", category: "Phrases" },
  { pt: "boa tarde", en: "good afternoon", tr: "tünaydın / iyi günler", emoji: "🌇", category: "Phrases" },
  { pt: "boa noite", en: "good night", tr: "iyi geceler", emoji: "🌙", category: "Phrases" },
  { pt: "adeus", en: "goodbye", tr: "hoşça kal", emoji: "👋", category: "Phrases" },
  { pt: "até logo", en: "see you later", tr: "görüşmek üzere", emoji: "👋", category: "Phrases" },
  { pt: "obrigado", en: "thank you (m)", tr: "teşekkür ederim", emoji: "🙏", category: "Phrases" },
  { pt: "obrigada", en: "thank you (f)", tr: "teşekkür ederim", emoji: "🙏", category: "Phrases" },
  { pt: "de nada", en: "you're welcome", tr: "bir şey değil / rica ederim", emoji: "😊", category: "Phrases" },
  { pt: "por favor", en: "please", tr: "lütfen", emoji: "🙏", category: "Phrases" },
  { pt: "desculpe", en: "sorry / excuse me", tr: "özür dilerim / affedersiniz", emoji: "😔", category: "Phrases" },
  { pt: "sim", en: "yes", tr: "evet", emoji: "✅", category: "Phrases" },
  { pt: "não", en: "no", tr: "hayır", emoji: "❌", category: "Phrases" },
  { pt: "está bem", en: "okay / alright", tr: "tamam", emoji: "👌", category: "Phrases" },
  { pt: "com licença", en: "excuse me", tr: "affedersiniz", emoji: "🚶", category: "Phrases" },
  { pt: "faz sentido", en: "makes sense", tr: "mantıklı / anlamlı", emoji: "💡", category: "Phrases" },
  { pt: "ter pressa", en: "to be in a hurry", tr: "acele etmek", emoji: "🏃", category: "Phrases" },
  { pt: "ter fome", en: "to be hungry", tr: "acıkmak", emoji: "🍔", category: "Phrases" },
  { pt: "ter medo", en: "to be afraid", tr: "korkmak", emoji: "😨", category: "Phrases" },
  { pt: "ter cuidado", en: "to be careful", tr: "dikkatli olmak", emoji: "⚠️", category: "Phrases" },
  { pt: "até lá", en: "see you then / until then", tr: "o zamana kadar / görüşürüz", emoji: "👋", category: "Phrases" },
  { pt: "juntos", en: "together", tr: "birlikte", emoji: "🤝", category: "Phrases" },
  { pt: "Que horas são?", en: "What time is it?", tr: "Saat kaç?", emoji: "🕐", category: "Phrases" },
  { pt: "Desculpe, quanto custa isto?", en: "Excuse me, how much does this cost?", tr: "Affedersiniz, bu ne kadar?", emoji: "💬", category: "Phrases" },
];

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

export const subjects: StorySubject[] = [
  // Animals
  { pt: "O cão feliz", en: "The happy dog", emoji: "🐶" },
  { pt: "O gato curioso", en: "The curious cat", emoji: "🐱" },
  { pt: "O coelho pequeno", en: "The little rabbit", emoji: "🐰" },
  { pt: "O urso grande", en: "The big bear", emoji: "🐻" },
  { pt: "A borboleta colorida", en: "The colorful butterfly", emoji: "🦋" },
  { pt: "O pássaro cantor", en: "The singing bird", emoji: "🐦" },
  { pt: "O cavalo veloz", en: "The fast horse", emoji: "🐴" },
  { pt: "A tartaruga lenta", en: "The slow turtle", emoji: "🐢" },
  { pt: "O elefante enorme", en: "The huge elephant", emoji: "🐘" },
  { pt: "A raposa esperta", en: "The clever fox", emoji: "🦊" },
  { pt: "O pato amarelo", en: "The yellow duck", emoji: "🦆" },
  { pt: "O leão corajoso", en: "The brave lion", emoji: "🦁" },
  { pt: "A vaca mansa", en: "The gentle cow", emoji: "🐄" },
  { pt: "O peixe dourado", en: "The golden fish", emoji: "🐟" },
  { pt: "O sapo verde", en: "The green frog", emoji: "🐸" },
  { pt: "O macaco engraçado", en: "The funny monkey", emoji: "🐒" },
  { pt: "A ovelha branca", en: "The white sheep", emoji: "🐑" },
  { pt: "O porco rosado", en: "The pink pig", emoji: "🐷" },
  { pt: "A girafa alta", en: "The tall giraffe", emoji: "🦒" },
  { pt: "O pinguim frio", en: "The cold penguin", emoji: "🐧" },
  // Family & people
  { pt: "A criança linda", en: "The pretty child", emoji: "🧒" },
  { pt: "O rapaz jovem", en: "The young boy", emoji: "👦" },
  { pt: "A rapariga alegre", en: "The cheerful girl", emoji: "👧" },
  { pt: "O menino corajoso", en: "The brave boy", emoji: "👦" },
  { pt: "A menina inteligente", en: "The smart girl", emoji: "👧" },
  { pt: "A mãe carinhosa", en: "The caring mother", emoji: "👩" },
  { pt: "O pai trabalhador", en: "The hardworking father", emoji: "👨" },
  { pt: "A avó gentil", en: "The kind grandmother", emoji: "👵" },
  { pt: "O avô simpático", en: "The friendly grandfather", emoji: "👴" },
  { pt: "O bebé pequenino", en: "The tiny baby", emoji: "👶" },
  { pt: "A professora dedicada", en: "The dedicated teacher", emoji: "👩‍🏫" },
  { pt: "O médico simpático", en: "The friendly doctor", emoji: "👨‍⚕️" },
  { pt: "A cozinheira talentosa", en: "The talented cook", emoji: "👩‍🍳" },
  { pt: "O estudante esforçado", en: "The hardworking student", emoji: "🎓" },
  { pt: "A família feliz", en: "The happy family", emoji: "👨‍👩‍👧" },
];

export const actions: StoryAction[] = [
  { pt: "vai para a praia", en: "goes to the beach", leftBg: "☀️", rightBg: "🏖️" },
  { pt: "come um almoço delicioso", en: "eats a delicious lunch", leftBg: "🍱", rightBg: "🥤" },
  { pt: "gosta de desenhar", en: "likes to draw", leftBg: "🎨", rightBg: "✏️" },
  { pt: "vai dormir na cama", en: "goes to sleep in bed", leftBg: "🌙", rightBg: "🛏️" },
  { pt: "brinca no jardim", en: "plays in the garden", leftBg: "⚽", rightBg: "🌳" },
  { pt: "lê um livro interessante", en: "reads an interesting book", leftBg: "📖", rightBg: "🌟" },
  { pt: "come uma maçã vermelha", en: "eats a red apple", leftBg: "🍎", rightBg: "🌿" },
  { pt: "nada no lago azul", en: "swims in the blue lake", leftBg: "💧", rightBg: "🌊" },
  { pt: "corre no parque verde", en: "runs in the green park", leftBg: "🌳", rightBg: "🌸" },
  { pt: "canta uma canção bonita", en: "sings a beautiful song", leftBg: "🎵", rightBg: "🎶" },
  { pt: "planta flores no jardim", en: "plants flowers in the garden", leftBg: "🌷", rightBg: "🌱" },
  { pt: "bebe leite fresco", en: "drinks fresh milk", leftBg: "🥛", rightBg: "🍼" },
  { pt: "joga futebol com amigos", en: "plays football with friends", leftBg: "⚽", rightBg: "🏟️" },
  { pt: "pinta um quadro lindo", en: "paints a beautiful picture", leftBg: "🎨", rightBg: "🖌️" },
  { pt: "come uma cenoura doce", en: "eats a sweet carrot", leftBg: "🥕", rightBg: "🌿" },
  { pt: "sobe a uma árvore alta", en: "climbs a tall tree", leftBg: "🌳", rightBg: "🍃" },
  { pt: "escreve no caderno", en: "writes in the notebook", leftBg: "📓", rightBg: "✏️" },
  { pt: "dança com alegria", en: "dances with joy", leftBg: "🎵", rightBg: "🌟" },
];

// Curated fallback sentences — every subject+action pair is realistic and contextually correct.
// Used when AI is unavailable so we never show nonsensical combinations.
export const templatePagesByContext: Record<string, StoryPage[]> = {
  school: [
  // Greeting the teacher — child speaks
  { pt: "Bom dia, professora!", en: "Good morning, teacher!", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "☀️" },
  { pt: "Boa tarde, professor!", en: "Good afternoon, teacher!", mainEmoji: "👨‍🏫", bgLeft: "🏫", bgRight: "🌤️" },
  // Greeting the teacher — teacher replies
  { pt: "Bom dia! Podem sentar.", en: "Good morning! You may sit down.", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "🪑", replyTo: "Bom dia, professora!" },
  { pt: "Boa tarde, meninos! Tudo bem?", en: "Good afternoon, children! All good?", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "😊", replyTo: "Boa tarde, professor!" },
  // Greeting classmates — child speaks
  { pt: "Olá! Como te chamas?", en: "Hi! What is your name?", mainEmoji: "🙋", bgLeft: "🏫", bgRight: "👋" },
  { pt: "Bom dia! Tudo bem?", en: "Good morning! All good?", mainEmoji: "😊", bgLeft: "☀️", bgRight: "🏫" },
  // Classmate replies
  { pt: "Chamo-me Pedro. E tu?", en: "My name is Pedro. And you?", mainEmoji: "👦", bgLeft: "🏫", bgRight: "😊", replyTo: "Olá! Como te chamas?" },
  { pt: "Estou bem, obrigado! E tu?", en: "I am fine, thank you! And you?", mainEmoji: "😊", bgLeft: "🏫", bgRight: "👍", replyTo: "Bom dia! Tudo bem?" },
  { pt: "Até amanhã! Bom fim de semana.", en: "See you tomorrow! Have a good weekend.", mainEmoji: "👋", bgLeft: "🏫", bgRight: "🌙" },
  // Introducing yourself
  { pt: "Chamo-me Ana e tenho sete anos.", en: "My name is Ana and I am seven years old.", mainEmoji: "👧", bgLeft: "🏫", bgRight: "✏️" },
  { pt: "Sou do Brasil e moro em Lisboa.", en: "I am from Brazil and I live in Lisbon.", mainEmoji: "🌍", bgLeft: "🏫", bgRight: "🗺️" },
  { pt: "Falo português e um pouco de inglês.", en: "I speak Portuguese and a little English.", mainEmoji: "💬", bgLeft: "🏫", bgRight: "😊" },
  // Classroom questions — child speaks
  { pt: "Não sei, professora.", en: "I don't know, teacher.", mainEmoji: "🤷", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Já acabei, professora!", en: "I am done, teacher!", mainEmoji: "✅", bgLeft: "📓", bgRight: "✏️" },
  { pt: "Estou pronto, professora.", en: "I am ready, teacher.", mainEmoji: "👍", bgLeft: "📚", bgRight: "✏️" },
  // Teacher replies to answers
  { pt: "Muito bem! Boa resposta.", en: "Very good! Great answer.", mainEmoji: "⭐", bgLeft: "👩‍🏫", bgRight: "😊", replyTo: "Não sei, professora." },
  { pt: "Quase! Tenta outra vez.", en: "Almost! Try again.", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "🔄", replyTo: "Não sei, professora." },
  { pt: "Sim, está correto!", en: "Yes, that is correct!", mainEmoji: "✅", bgLeft: "👩‍🏫", bgRight: "⭐", replyTo: "Já acabei, professora!" },
  // Asking what something means — child speaks
  { pt: "O que significa esta palavra, professora?", en: "What does this word mean, teacher?", mainEmoji: "📖", bgLeft: "✏️", bgRight: "❓" },
  { pt: "Como se escreve em português?", en: "How do you write it in Portuguese?", mainEmoji: "✏️", bgLeft: "🏫", bgRight: "❓" },
  // Teacher explains
  { pt: "Significa 'olá' em inglês — quer dizer hello.", en: "It means 'hello' in English — it is the word olá.", mainEmoji: "👩‍🏫", bgLeft: "💬", bgRight: "📖", replyTo: "O que significa esta palavra, professora?" },
  { pt: "Escreve-se assim, no quadro.", en: "It is written like this, on the board.", mainEmoji: "🖊️", bgLeft: "👩‍🏫", bgRight: "🏫", replyTo: "Como se escreve em português?" },
  // Asking to repeat — child speaks
  { pt: "Pode repetir, se faz favor?", en: "Can you repeat, please?", mainEmoji: "🙏", bgLeft: "🏫", bgRight: "👂" },
  { pt: "Mais devagar, por favor.", en: "Slower, please.", mainEmoji: "🐢", bgLeft: "🏫", bgRight: "👂" },
  { pt: "Não percebi, professora.", en: "I didn't understand, teacher.", mainEmoji: "😕", bgLeft: "🏫", bgRight: "❓" },
  // Teacher replies to confusion
  { pt: "Claro! Vou repetir mais devagar.", en: "Of course! I will repeat more slowly.", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "👂", replyTo: "Pode repetir, se faz favor?" },
  { pt: "Vamos fazer juntos, passo a passo.", en: "Let's do it together, step by step.", mainEmoji: "🤝", bgLeft: "👩‍🏫", bgRight: "📖", replyTo: "Não consigo fazer este exercício." },
  // Asking for help — child speaks
  { pt: "Pode ajudar-me, se faz favor?", en: "Can you help me, please?", mainEmoji: "🙋", bgLeft: "📚", bgRight: "🤝" },
  { pt: "Não consigo fazer este exercício.", en: "I can't do this exercise.", mainEmoji: "😟", bgLeft: "📓", bgRight: "✏️" },
  // Teacher helps
  { pt: "Claro, vem cá e eu ajudo-te.", en: "Of course, come here and I will help you.", mainEmoji: "👩‍🏫", bgLeft: "📚", bgRight: "🤝", replyTo: "Pode ajudar-me, se faz favor?" },
  // Borrowing — child to classmate
  { pt: "Tens uma borracha para me emprestar?", en: "Do you have a rubber to lend me?", mainEmoji: "🧒", bgLeft: "✏️", bgRight: "❓" },
  { pt: "Posso usar o teu lápis um momento?", en: "Can I use your pencil for a moment?", mainEmoji: "✏️", bgLeft: "👦", bgRight: "👧" },
  // Classmate replies to borrowing
  { pt: "Sim, toma!", en: "Yes, here you go!", mainEmoji: "😊", bgLeft: "✏️", bgRight: "👍", replyTo: "Tens uma borracha para me emprestar?" },
  { pt: "Claro, fica com ela.", en: "Sure, keep it.", mainEmoji: "😊", bgLeft: "✏️", bgRight: "🤝", replyTo: "Posso usar o teu lápis um momento?" },
  // Page and exercise — child speaks
  { pt: "Em que página estamos, professora?", en: "What page are we on, teacher?", mainEmoji: "📖", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Qual é o exercício seguinte?", en: "What is the next exercise?", mainEmoji: "📓", bgLeft: "✏️", bgRight: "❓" },
  // Teacher replies
  { pt: "Estamos na página vinte e três.", en: "We are on page twenty-three.", mainEmoji: "📖", bgLeft: "👩‍🏫", bgRight: "✏️", replyTo: "Em que página estamos, professora?" },
  { pt: "Abram o livro na página dez.", en: "Open your books to page ten.", mainEmoji: "📖", bgLeft: "🏫", bgRight: "👩‍🏫", replyTo: "Qual é o exercício seguinte?" },
  // Teacher commands
  { pt: "Façam silêncio, por favor!", en: "Be quiet, please!", mainEmoji: "🤫", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Levantem o braço quem sabe a resposta.", en: "Raise your hand if you know the answer.", mainEmoji: "✋", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Repitam depois de mim, com atenção.", en: "Repeat after me, carefully.", mainEmoji: "🔄", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Façam uma fila junto à porta.", en: "Line up by the door.", mainEmoji: "🚶", bgLeft: "🏫", bgRight: "👩‍🏫" },
  // Feelings — child speaks
  { pt: "Estou nervoso, professora.", en: "I am nervous, teacher.", mainEmoji: "😬", bgLeft: "🏫", bgRight: "💭" },
  { pt: "Estou triste porque me esqueci do lanche.", en: "I am sad because I forgot my snack.", mainEmoji: "😢", bgLeft: "🏫", bgRight: "🍱" },
  // Teacher responds to feelings
  { pt: "Não faz mal, acontece a todos.", en: "Never mind, it happens to everyone.", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "🤝", replyTo: "Estou triste porque me esqueci do lanche." },
  { pt: "Respira fundo, vai correr bem.", en: "Take a deep breath, it will go well.", mainEmoji: "💨", bgLeft: "👩‍🏫", bgRight: "😊", replyTo: "Estou nervoso, professora." },
  // Break and playground — child speaks
  { pt: "Posso jogar contigo no recreio?", en: "Can I play with you at break time?", mainEmoji: "⚽", bgLeft: "🏫", bgRight: "🌳" },
  { pt: "Vamos para o baloiço juntos!", en: "Let's go to the swing together!", mainEmoji: "🛝", bgLeft: "🌳", bgRight: "😄" },
  // Classmate replies in playground
  { pt: "Sim! Vamos apanhar-nos!", en: "Yes! Let's play catch!", mainEmoji: "🏃", bgLeft: "🌳", bgRight: "😄", replyTo: "Posso jogar contigo no recreio?" },
  { pt: "Claro! Tu começas.", en: "Sure! You go first.", mainEmoji: "😊", bgLeft: "⚽", bgRight: "🌳", replyTo: "Vamos para o baloiço juntos!" },
  // Apologies
  { pt: "Desculpe, professora, foi sem querer.", en: "Sorry, teacher, it was an accident.", mainEmoji: "😢", bgLeft: "🏫", bgRight: "🤝" },
  { pt: "Desculpa, não foi de propósito.", en: "Sorry, it wasn't on purpose.", mainEmoji: "😟", bgLeft: "🏫", bgRight: "🤝" },
  // Forgetting something
  { pt: "Esqueci-me do caderno em casa, professora.", en: "I forgot my notebook at home, teacher.", mainEmoji: "😬", bgLeft: "🏫", bgRight: "📓" },
  { pt: "Amanhã traz, não te esqueças.", en: "Bring it tomorrow, don't forget.", mainEmoji: "👩‍🏫", bgLeft: "📓", bgRight: "⚠️", replyTo: "Esqueci-me do caderno em casa, professora." },
  // Compliments between pupils
  { pt: "O teu desenho é muito bonito!", en: "Your drawing is really nice!", mainEmoji: "⭐", bgLeft: "🎨", bgRight: "😊" },
  { pt: "Obrigado! O teu também é ótimo.", en: "Thank you! Yours is great too.", mainEmoji: "😄", bgLeft: "🎨", bgRight: "⭐", replyTo: "O teu desenho é muito bonito!" },
  // Bathroom request
  { pt: "Professora, posso ir à casa de banho?", en: "Teacher, may I go to the bathroom?", mainEmoji: "🚻", bgLeft: "🏫", bgRight: "🙋" },
  { pt: "Sim, podes ir. Volta depressa.", en: "Yes, you may go. Come back quickly.", mainEmoji: "👩‍🏫", bgLeft: "🚻", bgRight: "⏱️", replyTo: "Professora, posso ir à casa de banho?" },
  ],

  restaurant: [
    // Arriving — customer speaks
    { pt: "Boa tarde! Uma mesa para dois, se faz favor.", en: "Good afternoon! A table for two, please.", mainEmoji: "🍽️", bgLeft: "👨‍🍳", bgRight: "🪑" },
    { pt: "Temos uma reserva em nome de Silva.", en: "We have a reservation under the name Silva.", mainEmoji: "😊", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    // Waiter greets and seats
    { pt: "Boa tarde! Têm reserva?", en: "Good afternoon! Do you have a reservation?", mainEmoji: "👨‍🍳", bgLeft: "🍽️", bgRight: "🪑" },
    { pt: "Sigam-me, por favor. A mesa está aqui.", en: "Follow me, please. The table is here.", mainEmoji: "👨‍🍳", bgLeft: "🪑", bgRight: "🍽️", replyTo: "Boa tarde! Uma mesa para dois, se faz favor." },
    // Menu — customer speaks
    { pt: "Se faz favor, a ementa!", en: "Excuse me, the menu please!", mainEmoji: "📋", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "O que me recomenda hoje?", en: "What do you recommend today?", mainEmoji: "🤔", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Este prato tem glúten?", en: "Does this dish contain gluten?", mainEmoji: "❓", bgLeft: "📋", bgRight: "👨‍🍳" },
    // Waiter replies about menu
    { pt: "O prato do dia é bacalhau com batatas.", en: "The dish of the day is cod with potatoes.", mainEmoji: "🐟", bgLeft: "👨‍🍳", bgRight: "🍽️", replyTo: "Se faz favor, a ementa!" },
    { pt: "Recomendo o frango assado, está ótimo hoje.", en: "I recommend the roast chicken, it's great today.", mainEmoji: "🍗", bgLeft: "👨‍🍳", bgRight: "⭐", replyTo: "O que me recomenda hoje?" },
    { pt: "Não tem glúten, pode comer à vontade.", en: "It has no gluten, you can eat it freely.", mainEmoji: "✅", bgLeft: "👨‍🍳", bgRight: "😊", replyTo: "Este prato tem glúten?" },
    // Ordering — customer speaks
    { pt: "Para mim, o frango grelhado, se faz favor.", en: "For me, the grilled chicken, please.", mainEmoji: "🍗", bgLeft: "🍽️", bgRight: "😋" },
    { pt: "Para começar, queria uma sopa, se faz favor.", en: "To start, I would like a soup, please.", mainEmoji: "🍲", bgLeft: "🥄", bgRight: "👨‍🍳" },
    { pt: "E para beber, uma jarra de água, se faz favor.", en: "And to drink, a jug of water, please.", mainEmoji: "💧", bgLeft: "🍽️", bgRight: "🥤" },
    { pt: "Um sumo de laranja para a menina, obrigado.", en: "An orange juice for the girl, thank you.", mainEmoji: "🍊", bgLeft: "🍽️", bgRight: "👧" },
    // Waiter takes order and serves
    { pt: "Muito bem! E de seguida?", en: "Very good! And next?", mainEmoji: "👨‍🍳", bgLeft: "📋", bgRight: "✏️", replyTo: "Para mim, o frango grelhado, se faz favor." },
    { pt: "Bom proveito!", en: "Enjoy your meal!", mainEmoji: "😊", bgLeft: "👨‍🍳", bgRight: "🍽️" },
    { pt: "Está bem o prato? Precisa de mais alguma coisa?", en: "Is the dish alright? Do you need anything else?", mainEmoji: "👨‍🍳", bgLeft: "🍽️", bgRight: "😊", replyTo: "Está muito bom, obrigado!" },
    // Reactions — customer speaks
    { pt: "Está muito bom, obrigado!", en: "It is very good, thank you!", mainEmoji: "😋", bgLeft: "🍽️", bgRight: "👍" },
    { pt: "A sopa está um pouco fria.", en: "The soup is a little cold.", mainEmoji: "🥶", bgLeft: "🍲", bgRight: "😬" },
    { pt: "Estava delicioso! Parabéns ao cozinheiro.", en: "It was delicious! Compliments to the chef.", mainEmoji: "😋", bgLeft: "🍴", bgRight: "⭐" },
    // Waiter responds to complaint
    { pt: "Peço desculpa! Trago outra já já.", en: "I'm sorry! I'll bring another right away.", mainEmoji: "👨‍🍳", bgLeft: "🍲", bgRight: "🔄", replyTo: "A sopa está um pouco fria." },
    // Extras — customer speaks
    { pt: "Pode trazer mais pão, se faz favor?", en: "Can you bring more bread, please?", mainEmoji: "🍞", bgLeft: "🧈", bgRight: "👨‍🍳" },
    { pt: "Quero mudar o meu pedido, se possível.", en: "I would like to change my order, if possible.", mainEmoji: "🔄", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    // Bill — customer speaks
    { pt: "A conta, se faz favor.", en: "The bill, please.", mainEmoji: "🧾", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Posso pagar com o multibanco?", en: "Can I pay by multibanco?", mainEmoji: "💳", bgLeft: "🍽️", bgRight: "❓" },
    // Waiter brings bill
    { pt: "Aqui está a conta. Pagam juntos ou separado?", en: "Here is the bill. Paying together or separately?", mainEmoji: "🧾", bgLeft: "👨‍🍳", bgRight: "💳", replyTo: "A conta, se faz favor." },
    { pt: "Pode pagar ali na caixa ou eu trago o terminal.", en: "You can pay at the till or I'll bring the machine.", mainEmoji: "💳", bgLeft: "👨‍🍳", bgRight: "🏧", replyTo: "Posso pagar com o multibanco?" },
    // Leaving
    { pt: "Obrigado! Foi muito bom. Até à próxima.", en: "Thank you! It was very good. See you next time.", mainEmoji: "😊", bgLeft: "🍽️", bgRight: "👋" },
    { pt: "Obrigado pela visita! Boa tarde.", en: "Thank you for coming! Good afternoon.", mainEmoji: "👨‍🍳", bgLeft: "🍽️", bgRight: "👋", replyTo: "Obrigado! Foi muito bom. Até à próxima." },
  ],

  bank: [
    // Greeting — customer speaks
    { pt: "Bom dia! Queria pedir ajuda, se faz favor.", en: "Good morning! I would like some help, please.", mainEmoji: "😊", bgLeft: "🏦", bgRight: "👋" },
    { pt: "Boa tarde! Tenho uma dúvida sobre a minha conta.", en: "Good afternoon! I have a question about my account.", mainEmoji: "🙋", bgLeft: "🏦", bgRight: "🤝" },
    // Teller greets
    { pt: "Bom dia, em que posso ajudar?", en: "Good morning, how can I help you?", mainEmoji: "👨‍💼", bgLeft: "🏦", bgRight: "😊", replyTo: "Bom dia! Queria pedir ajuda, se faz favor." },
    { pt: "Qual é o seu número de senha, se faz favor?", en: "What is your ticket number, please?", mainEmoji: "🎫", bgLeft: "👨‍💼", bgRight: "🏦" },
    // Waiting — customer speaks
    { pt: "Onde posso tirar uma senha?", en: "Where can I get a number ticket?", mainEmoji: "🎫", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Quanto tempo tenho de esperar, aproximadamente?", en: "How long do I have to wait, approximately?", mainEmoji: "⏳", bgLeft: "🏦", bgRight: "❓" },
    // Teller answers about wait
    { pt: "São cerca de vinte minutos de espera.", en: "It is about twenty minutes of waiting.", mainEmoji: "⏳", bgLeft: "👨‍💼", bgRight: "🕐", replyTo: "Quanto tempo tenho de esperar, aproximadamente?" },
    { pt: "A máquina de senhas fica ali à entrada.", en: "The ticket machine is there at the entrance.", mainEmoji: "🎫", bgLeft: "👨‍💼", bgRight: "🏦", replyTo: "Onde posso tirar uma senha?" },
    // ATM — customer speaks
    { pt: "Onde fica o multibanco, se faz favor?", en: "Where is the multibanco ATM, please?", mainEmoji: "🏧", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Como se usa o multibanco?", en: "How do you use the multibanco?", mainEmoji: "🏧", bgLeft: "🏦", bgRight: "❓" },
    // Teller explains ATM
    { pt: "O multibanco fica mesmo aqui à direita.", en: "The multibanco is right here on the right.", mainEmoji: "🏧", bgLeft: "👨‍💼", bgRight: "➡️", replyTo: "Onde fica o multibanco, se faz favor?" },
    // Transactions — customer speaks
    { pt: "Queria levantar dinheiro, se faz favor.", en: "I would like to withdraw money, please.", mainEmoji: "💵", bgLeft: "🏦", bgRight: "💳" },
    { pt: "Queria depositar este dinheiro na minha conta.", en: "I would like to deposit this money into my account.", mainEmoji: "🏦", bgLeft: "💵", bgRight: "👨‍💼" },
    { pt: "Queria abrir uma conta bancária.", en: "I would like to open a bank account.", mainEmoji: "🏦", bgLeft: "📋", bgRight: "👨‍💼" },
    { pt: "Qual é o saldo da minha conta, por favor?", en: "What is the balance of my account, please?", mainEmoji: "💰", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Preciso de um extracto bancário.", en: "I need a bank statement.", mainEmoji: "📄", bgLeft: "🏦", bgRight: "👨‍💼" },
    // Teller responds to transactions
    { pt: "Precisa de documento de identificação, se faz favor.", en: "I need an ID document, please.", mainEmoji: "👨‍💼", bgLeft: "🏦", bgRight: "📋", replyTo: "Queria abrir uma conta bancária." },
    { pt: "Quanto quer levantar?", en: "How much would you like to withdraw?", mainEmoji: "👨‍💼", bgLeft: "💵", bgRight: "❓", replyTo: "Queria levantar dinheiro, se faz favor." },
    { pt: "Aqui está o seu extrato. Precisa de mais alguma coisa?", en: "Here is your statement. Do you need anything else?", mainEmoji: "📄", bgLeft: "👨‍💼", bgRight: "😊", replyTo: "Preciso de um extracto bancário." },
    // Understanding forms — customer speaks
    { pt: "O que significa este campo no formulário?", en: "What does this field in the form mean?", mainEmoji: "📝", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Pode explicar mais devagar, por favor?", en: "Can you explain more slowly, please?", mainEmoji: "🐢", bgLeft: "🏦", bgRight: "👂" },
    { pt: "Não percebi. Pode repetir?", en: "I didn't understand. Can you repeat?", mainEmoji: "😕", bgLeft: "🏦", bgRight: "🔄" },
    { pt: "Onde assino, por favor?", en: "Where do I sign, please?", mainEmoji: "✍️", bgLeft: "🏦", bgRight: "📝" },
    // Teller explains form
    { pt: "Assine aqui em baixo, obrigado.", en: "Sign here at the bottom, thank you.", mainEmoji: "👨‍💼", bgLeft: "📝", bgRight: "✍️", replyTo: "Onde assino, por favor?" },
    // Goodbye
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "🏦", bgRight: "😊" },
    { pt: "Tenha um bom dia! Até à próxima.", en: "Have a good day! See you next time.", mainEmoji: "👨‍💼", bgLeft: "🏦", bgRight: "👋", replyTo: "Obrigado! Até logo." },
  ],

  hospital: [
    // Checking in — patient speaks
    { pt: "Bom dia! Tenho uma consulta marcada.", en: "Good morning! I have a booked appointment.", mainEmoji: "📋", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "O meu nome é Tomás Silva.", en: "My name is Tomás Silva.", mainEmoji: "🧒", bgLeft: "🏥", bgRight: "📋" },
    { pt: "A minha data de nascimento é dois de março.", en: "My date of birth is the second of March.", mainEmoji: "📅", bgLeft: "🏥", bgRight: "📋" },
    // Receptionist replies
    { pt: "Precisa do cartão de utente, se faz favor.", en: "Can I have your health card, please?", mainEmoji: "👩‍⚕️", bgLeft: "💳", bgRight: "📋", replyTo: "Bom dia! Tenho uma consulta marcada." },
    { pt: "Aqui está o meu cartão de utente.", en: "Here is my health card.", mainEmoji: "💳", bgLeft: "🏥", bgRight: "👩‍⚕️", replyTo: "Precisa do cartão de utente, se faz favor." },
    { pt: "Pode sentar-se na sala de espera, por favor.", en: "Please take a seat in the waiting room.", mainEmoji: "🪑", bgLeft: "👩‍⚕️", bgRight: "🏥", replyTo: "Aqui está o meu cartão de utente." },
    { pt: "O doutor chama-o em breve.", en: "The doctor will call you shortly.", mainEmoji: "⏳", bgLeft: "👩‍⚕️", bgRight: "🏥", replyTo: "Pode sentar-se na sala de espera, por favor." },
    // Describing symptoms — patient speaks
    { pt: "Dói-me a garganta, doutora.", en: "My throat hurts, doctor.", mainEmoji: "😣", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "A minha barriga dói muito.", en: "My tummy hurts a lot.", mainEmoji: "🤒", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "Tenho febre desde ontem.", en: "I have had a fever since yesterday.", mainEmoji: "🌡️", bgLeft: "🏥", bgRight: "💊" },
    { pt: "Tenho muita tosse e não consigo dormir.", en: "I have a bad cough and can't sleep.", mainEmoji: "😷", bgLeft: "🏥", bgRight: "💊" },
    { pt: "Sinto-me muito mal desde esta manhã.", en: "I have felt very sick since this morning.", mainEmoji: "🤢", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "Estou com medo da injeção, doutora.", en: "I am scared of the injection, doctor.", mainEmoji: "😨", bgLeft: "🏥", bgRight: "💉" },
    // Doctor instructions and replies
    { pt: "Vamos ver. Abra a boca, por favor.", en: "Let's see. Open your mouth, please.", mainEmoji: "👩‍⚕️", bgLeft: "🏥", bgRight: "💡", replyTo: "Dói-me a garganta, doutora." },
    { pt: "Respire fundo, devagar.", en: "Breathe deeply, slowly.", mainEmoji: "💨", bgLeft: "👩‍⚕️", bgRight: "🏥", replyTo: "Tenho muita tosse e não consigo dormir." },
    { pt: "Não te preocupes, não vai doer.", en: "Don't worry, it won't hurt.", mainEmoji: "👩‍⚕️", bgLeft: "🏥", bgRight: "😊", replyTo: "Estou com medo da injeção, doutora." },
    { pt: "Tens uma infeção na garganta.", en: "You have a throat infection.", mainEmoji: "👩‍⚕️", bgLeft: "🏥", bgRight: "💊", replyTo: "Dói-me a garganta, doutora." },
    // Questions — patient speaks
    { pt: "Preciso de tomar um medicamento, doutora?", en: "Do I need to take medicine, doctor?", mainEmoji: "💊", bgLeft: "🏥", bgRight: "❓" },
    { pt: "Quantos dias preciso de descansar?", en: "How many days do I need to rest?", mainEmoji: "🛏️", bgLeft: "🏥", bgRight: "❓" },
    { pt: "Posso voltar à escola amanhã?", en: "Can I go back to school tomorrow?", mainEmoji: "🏫", bgLeft: "🏥", bgRight: "❓" },
    // Doctor answers questions
    { pt: "Vais tomar um antibiótico durante cinco dias.", en: "You will take an antibiotic for five days.", mainEmoji: "💊", bgLeft: "👩‍⚕️", bgRight: "📋", replyTo: "Preciso de tomar um medicamento, doutora?" },
    { pt: "Descansa dois dias e depois podes ir à escola.", en: "Rest two days and then you can go to school.", mainEmoji: "🛏️", bgLeft: "👩‍⚕️", bgRight: "🏫", replyTo: "Posso voltar à escola amanhã?" },
    { pt: "A farmácia fica mesmo aqui ao lado.", en: "The pharmacy is right next door.", mainEmoji: "💊", bgLeft: "👩‍⚕️", bgRight: "🏥", replyTo: "Quantos dias preciso de descansar?" },
    // Goodbye
    { pt: "Obrigado, doutora! Até à próxima.", en: "Thank you, doctor! See you next time.", mainEmoji: "😊", bgLeft: "🏥", bgRight: "❤️" },
    { pt: "Melhoras! Cuida-te bem.", en: "Get well soon! Take good care.", mainEmoji: "👩‍⚕️", bgLeft: "🏥", bgRight: "❤️", replyTo: "Obrigado, doutora! Até à próxima." },
  ],

  cafe: [
    // Greeting — customer speaks
    { pt: "Bom dia! Tem mesa para dois?", en: "Good morning! Do you have a table for two?", mainEmoji: "😊", bgLeft: "☕", bgRight: "🪑" },
    { pt: "Preferimos ao balcão, se for possível.", en: "We prefer at the counter, if possible.", mainEmoji: "☕", bgLeft: "🪑", bgRight: "😊" },
    // Barista greets and asks
    { pt: "Bom dia! Diga, se faz favor.", en: "Good morning! Go ahead, please.", mainEmoji: "👩‍🍳", bgLeft: "☕", bgRight: "😊", replyTo: "Bom dia! Tem mesa para dois?" },
    { pt: "Preferem mesa dentro ou fora?", en: "Do you prefer a table inside or outside?", mainEmoji: "🌞", bgLeft: "☕", bgRight: "🪑", replyTo: "Preferimos ao balcão, se for possível." },
    // Ordering — customer speaks
    { pt: "Um galão e uma torrada, se faz favor.", en: "A galão and a toast, please.", mainEmoji: "☕", bgLeft: "🥐", bgRight: "👩‍🍳" },
    { pt: "Um meia de leite e um pastel de nata, obrigado.", en: "A meia de leite and a custard tart, thank you.", mainEmoji: "☕", bgLeft: "🥛", bgRight: "🥐" },
    { pt: "Um chocolate quente para a menina, se faz favor.", en: "A hot chocolate for the girl, please.", mainEmoji: "🍫", bgLeft: "☕", bgRight: "👧" },
    { pt: "Um sumo de laranja natural, se tiver.", en: "A fresh orange juice, if you have it.", mainEmoji: "🍊", bgLeft: "☕", bgRight: "😊" },
    { pt: "Uma tosta mista, se faz favor.", en: "A ham and cheese toastie, please.", mainEmoji: "🥪", bgLeft: "☕", bgRight: "😋" },
    // Barista takes order and confirms
    { pt: "Claro! Mais alguma coisa?", en: "Of course! Anything else?", mainEmoji: "👩‍🍳", bgLeft: "☕", bgRight: "😊", replyTo: "Um galão e uma torrada, se faz favor." },
    { pt: "O galão fica já, um momento.", en: "The galão is coming right up, one moment.", mainEmoji: "⏱️", bgLeft: "👩‍🍳", bgRight: "☕", replyTo: "Um meia de leite e um pastel de nata, obrigado." },
    { pt: "O pastel de nata está acabado de sair do forno.", en: "The custard tart just came out of the oven.", mainEmoji: "🥐", bgLeft: "👩‍🍳", bgRight: "⭐", replyTo: "Um meia de leite e um pastel de nata, obrigado." },
    // Asking questions — customer speaks
    { pt: "O café tem leite?", en: "Does the coffee have milk?", mainEmoji: "🥛", bgLeft: "☕", bgRight: "❓" },
    { pt: "Qual é a senha do Wi-Fi, se faz favor?", en: "What is the Wi-Fi password, please?", mainEmoji: "📶", bgLeft: "☕", bgRight: "❓" },
    { pt: "Quanto custa um galão?", en: "How much is a galão?", mainEmoji: "❓", bgLeft: "☕", bgRight: "🪙" },
    // Barista replies to questions
    { pt: "O galão tem leite, o abatanado não.", en: "The galão has milk, the abatanado does not.", mainEmoji: "👩‍🍳", bgLeft: "☕", bgRight: "🥛", replyTo: "O café tem leite?" },
    { pt: "A senha do Wi-Fi está ali no quadro.", en: "The Wi-Fi password is on the board over there.", mainEmoji: "📶", bgLeft: "👩‍🍳", bgRight: "🏪", replyTo: "Qual é a senha do Wi-Fi, se faz favor?" },
    { pt: "O galão custa um euro e vinte.", en: "The galão costs one euro twenty.", mainEmoji: "🪙", bgLeft: "👩‍🍳", bgRight: "☕", replyTo: "Quanto custa um galão?" },
    // Feedback — customer speaks
    { pt: "O café está muito bom, obrigado!", en: "The coffee is very good, thank you!", mainEmoji: "😋", bgLeft: "☕", bgRight: "⭐" },
    { pt: "O pastel de nata está delicioso!", en: "The custard tart is delicious!", mainEmoji: "🥐", bgLeft: "😋", bgRight: "⭐" },
    // Bill and paying — customer speaks
    { pt: "A conta, se faz favor.", en: "The bill, please.", mainEmoji: "🧾", bgLeft: "☕", bgRight: "👩‍🍳" },
    { pt: "Posso pagar com MB Way?", en: "Can I pay with MB Way?", mainEmoji: "📱", bgLeft: "☕", bgRight: "💳" },
    // Barista at checkout
    { pt: "Claro, pode pagar com MB Way ou multibanco.", en: "Of course, you can pay with MB Way or multibanco.", mainEmoji: "👩‍🍳", bgLeft: "💳", bgRight: "📱", replyTo: "Posso pagar com MB Way?" },
    { pt: "São dois euros e quarenta, obrigada.", en: "That is two euros forty, thank you.", mainEmoji: "🪙", bgLeft: "👩‍🍳", bgRight: "☕", replyTo: "A conta, se faz favor." },
    // Goodbye
    { pt: "Obrigado! Até amanhã.", en: "Thank you! See you tomorrow.", mainEmoji: "👋", bgLeft: "☕", bgRight: "😊" },
    { pt: "Boa tarde! Até logo.", en: "Good afternoon! Goodbye.", mainEmoji: "👩‍🍳", bgLeft: "☕", bgRight: "👋", replyTo: "Obrigado! Até amanhã." },
  ],
  airport: [
    // Check-in — traveller speaks
    { pt: "Bom dia! Onde é o check-in da TAP?", en: "Good morning! Where is the TAP check-in?", mainEmoji: "🧳", bgLeft: "✈️", bgRight: "❓" },
    { pt: "Temos duas malas para despachar.", en: "We have two bags to check in.", mainEmoji: "🧳", bgLeft: "✈️", bgRight: "👨‍✈️" },
    { pt: "A minha mala está muito pesada.", en: "My bag is very heavy.", mainEmoji: "😬", bgLeft: "🧳", bgRight: "⚖️" },
    // Check-in staff replies
    { pt: "O seu passaporte ou bilhete de identidade, se faz favor.", en: "Your passport or ID card, please.", mainEmoji: "👨‍✈️", bgLeft: "✈️", bgRight: "📋", replyTo: "Bom dia! Onde é o check-in da TAP?" },
    { pt: "A sua mala tem vinte e dois quilos, está dentro do limite.", en: "Your bag weighs twenty-two kilos, it is within the limit.", mainEmoji: "⚖️", bgLeft: "👨‍✈️", bgRight: "✅", replyTo: "A minha mala está muito pesada." },
    { pt: "Aqui está o seu cartão de embarque. Porta trinta e dois.", en: "Here is your boarding pass. Gate thirty-two.", mainEmoji: "🎫", bgLeft: "👨‍✈️", bgRight: "✈️", replyTo: "Temos duas malas para despachar." },
    // Security and gate — traveller speaks
    { pt: "Onde é o controlo de segurança?", en: "Where is the security check?", mainEmoji: "🔍", bgLeft: "✈️", bgRight: "❓" },
    { pt: "Onde é o nosso portão?", en: "Where is our gate?", mainEmoji: "✈️", bgLeft: "🛫", bgRight: "❓" },
    { pt: "A que horas começa o embarque?", en: "When does boarding start?", mainEmoji: "⏰", bgLeft: "✈️", bgRight: "❓" },
    // Staff replies at gate
    { pt: "O controlo de segurança fica ao fundo à esquerda.", en: "Security is at the back on the left.", mainEmoji: "👨‍✈️", bgLeft: "🔍", bgRight: "⬅️", replyTo: "Onde é o controlo de segurança?" },
    { pt: "O embarque começa daqui a vinte minutos.", en: "Boarding starts in twenty minutes.", mainEmoji: "⏰", bgLeft: "👨‍✈️", bgRight: "✈️", replyTo: "A que horas começa o embarque?" },
    { pt: "O voo está atrasado trinta minutos, pedimos desculpa.", en: "The flight is delayed thirty minutes, we apologise.", mainEmoji: "⏳", bgLeft: "👨‍✈️", bgRight: "😬", replyTo: "A que horas começa o embarque?" },
    // On the plane — traveller speaks
    { pt: "Com licença, posso sentar à janela?", en: "Excuse me, can I sit by the window?", mainEmoji: "🪟", bgLeft: "✈️", bgRight: "😄" },
    { pt: "Pode trazer-me água, se faz favor?", en: "Can you bring me water, please?", mainEmoji: "💧", bgLeft: "✈️", bgRight: "👨‍✈️" },
    { pt: "Sinto-me mal. Pode ajudar-me?", en: "I feel sick. Can you help me?", mainEmoji: "🤢", bgLeft: "✈️", bgRight: "👨‍✈️" },
    { pt: "Quanto tempo falta para aterrarmos?", en: "How long until we land?", mainEmoji: "⏱️", bgLeft: "✈️", bgRight: "❓" },
    // Flight attendant replies
    { pt: "Claro, trago já a água.", en: "Of course, I'll bring the water right away.", mainEmoji: "👨‍✈️", bgLeft: "💧", bgRight: "✈️", replyTo: "Pode trazer-me água, se faz favor?" },
    { pt: "Falta mais ou menos uma hora de voo.", en: "There is about one hour of flight left.", mainEmoji: "👨‍✈️", bgLeft: "⏱️", bgRight: "✈️", replyTo: "Quanto tempo falta para aterrarmos?" },
    // Arrival — traveller speaks
    { pt: "Onde se levanta a bagagem?", en: "Where do we collect the luggage?", mainEmoji: "🧳", bgLeft: "🛬", bgRight: "❓" },
    { pt: "Onde é a paragem de táxi?", en: "Where is the taxi stop?", mainEmoji: "🚕", bgLeft: "🛬", bgRight: "❓" },
    // Farewell
    { pt: "Obrigado! Boa viagem.", en: "Thank you! Have a good trip.", mainEmoji: "👋", bgLeft: "✈️", bgRight: "❤️" },
    { pt: "Boa viagem! Até à próxima.", en: "Have a good trip! See you next time.", mainEmoji: "👨‍✈️", bgLeft: "✈️", bgRight: "👋", replyTo: "Obrigado! Boa viagem." },
  ],

  market: [
    // Greeting — customer speaks
    { pt: "Bom dia! Pode ajudar-me a encontrar as maçãs?", en: "Good morning! Can you help me find the apples?", mainEmoji: "😊", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Onde fica a secção de frutas e legumes?", en: "Where is the fruit and vegetable section?", mainEmoji: "🍎", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Onde está o pão e os laticínios?", en: "Where is the bread and dairy?", mainEmoji: "🍞", bgLeft: "🛒", bgRight: "❓" },
    // Shopkeeper replies to navigation
    { pt: "As frutas ficam no fundo, à direita.", en: "The fruit is at the back, on the right.", mainEmoji: "🏪", bgLeft: "🍎", bgRight: "➡️", replyTo: "Onde fica a secção de frutas e legumes?" },
    { pt: "O pão está mesmo ali, na segunda prateleira.", en: "The bread is right there, on the second shelf.", mainEmoji: "🍞", bgLeft: "🏪", bgRight: "👆", replyTo: "Onde está o pão e os laticínios?" },
    // Asking about products — customer speaks
    { pt: "Quanto é o quilo de maçãs?", en: "How much is a kilo of apples?", mainEmoji: "🍎", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Tem laranjas frescas hoje?", en: "Do you have fresh oranges today?", mainEmoji: "🍊", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "É fresco ou congelado?", en: "Is it fresh or frozen?", mainEmoji: "❓", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Tem alguma promoção hoje?", en: "Do you have any promotions today?", mainEmoji: "🏷️", bgLeft: "🛒", bgRight: "🏪" },
    // Shopkeeper replies about products
    { pt: "O quilo de maçãs custa um euro e cinquenta.", en: "A kilo of apples costs one euro fifty.", mainEmoji: "🏪", bgLeft: "🍎", bgRight: "🪙", replyTo: "Quanto é o quilo de maçãs?" },
    { pt: "Sim, temos laranjas acabadas de chegar.", en: "Yes, we have oranges that just arrived.", mainEmoji: "🍊", bgLeft: "🏪", bgRight: "✅", replyTo: "Tem laranjas frescas hoje?" },
    { pt: "Hoje temos desconto nas bananas.", en: "Today we have a discount on bananas.", mainEmoji: "🏷️", bgLeft: "🏪", bgRight: "🍌", replyTo: "Tem alguma promoção hoje?" },
    // Ordering amounts — customer speaks
    { pt: "Queria dois quilos de tomates, se faz favor.", en: "I would like two kilos of tomatoes, please.", mainEmoji: "🍅", bgLeft: "🛒", bgRight: "👩‍🌾" },
    { pt: "Pode dar-me um litro de leite, por favor?", en: "Can you give me a litre of milk, please?", mainEmoji: "🥛", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Não quero este. Tem um mais pequeno?", en: "I don't want this one. Do you have a smaller one?", mainEmoji: "🙅", bgLeft: "🛒", bgRight: "❓" },
    // Paying — customer speaks
    { pt: "Está muito caro. Tem algo mais barato?", en: "It is very expensive. Do you have something cheaper?", mainEmoji: "💰", bgLeft: "🛒", bgRight: "😕" },
    { pt: "Aceitam MB Way?", en: "Do you accept MB Way?", mainEmoji: "📱", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Tem troco para dez euros?", en: "Do you have change for ten euros?", mainEmoji: "🪙", bgLeft: "🛒", bgRight: "❓" },
    // Cashier replies
    { pt: "Quer um saco? Custa cinco cêntimos.", en: "Would you like a bag? It costs five cents.", mainEmoji: "🛍️", bgLeft: "🏪", bgRight: "🪙" },
    { pt: "Tem o cartão de cliente do Pingo Doce?", en: "Do you have the Pingo Doce loyalty card?", mainEmoji: "💳", bgLeft: "🏪", bgRight: "❓" },
    { pt: "Sim, aceitamos MB Way e multibanco.", en: "Yes, we accept MB Way and multibanco.", mainEmoji: "📱", bgLeft: "🏪", bgRight: "💳", replyTo: "Aceitam MB Way?" },
    { pt: "São doze euros e oitenta, se faz favor.", en: "That is twelve euros eighty, please.", mainEmoji: "🪙", bgLeft: "🏪", bgRight: "🛒", replyTo: "Tem troco para dez euros?" },
    // Goodbye
    { pt: "Obrigado! Até à próxima.", en: "Thank you! See you next time.", mainEmoji: "👋", bgLeft: "🛒", bgRight: "😊" },
    { pt: "Até à próxima! Boa semana.", en: "See you next time! Have a good week.", mainEmoji: "🏪", bgLeft: "🛒", bgRight: "👋", replyTo: "Obrigado! Até à próxima." },
  ],

  aima: [
    // Greeting — applicant speaks
    { pt: "Bom dia! Tenho uma marcação para as dez horas.", en: "Good morning! I have an appointment at ten o'clock.", mainEmoji: "📋", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "Venho candidatar-me ao visto D7.", en: "I am here to apply for the D7 visa.", mainEmoji: "📄", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "Trabalho remotamente e quero o visto D9.", en: "I work remotely and I want the D9 visa.", mainEmoji: "💻", bgLeft: "🌍", bgRight: "📋" },
    // Officer greets and checks
    { pt: "Bom dia, qual é o motivo da sua visita?", en: "Good morning, what is the reason for your visit?", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "Tem marcação?", en: "Do you have an appointment?", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "📅", replyTo: "Bom dia! Tenho uma marcação para as dez horas." },
    { pt: "Pode mostrar o seu passaporte, se faz favor?", en: "Can you show your passport, please?", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "📋", replyTo: "O meu nome é Sofia Pereira e sou turca." },
    // Identity — applicant speaks
    { pt: "O meu nome é Sofia Pereira e sou turca.", en: "My name is Sofia Pereira and I am Turkish.", mainEmoji: "🌍", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "A minha data de nascimento é cinco de junho.", en: "My date of birth is the fifth of June.", mainEmoji: "📅", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "Tenho o NIF e o contrato de arrendamento registado.", en: "I have the NIF and the registered rental contract.", mainEmoji: "📄", bgLeft: "🏛️", bgRight: "✅" },
    { pt: "Trouxe o extrato bancário dos últimos três meses.", en: "I brought the bank statement from the last three months.", mainEmoji: "📋", bgLeft: "🏛️", bgRight: "👨‍💼" },
    // Officer replies about documents
    { pt: "Falta o registo criminal apostilado, tem de trazer o original.", en: "The apostilled criminal record is missing, you must bring the original.", mainEmoji: "👨‍💼", bgLeft: "📄", bgRight: "⚠️", replyTo: "Tenho o NIF e o contrato de arrendamento registado." },
    { pt: "Precisa de uma declaração da empresa a autorizar o trabalho remoto.", en: "You need a declaration from the company authorising remote work.", mainEmoji: "👨‍💼", bgLeft: "💻", bgRight: "📋", replyTo: "Trabalho remotamente e quero o visto D9." },
    { pt: "O seu seguro de saúde tem de cobrir Portugal.", en: "Your health insurance must cover Portugal.", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "💊", replyTo: "Trouxe o extrato bancário dos últimos três meses." },
    // Waiting and understanding — applicant speaks
    { pt: "Quanto tempo tenho de esperar?", en: "How long do I have to wait?", mainEmoji: "⏳", bgLeft: "🏛️", bgRight: "❓" },
    { pt: "Não percebi. Pode repetir mais devagar?", en: "I didn't understand. Can you repeat more slowly?", mainEmoji: "😕", bgLeft: "🏛️", bgRight: "🔄" },
    { pt: "Pode escrever o nome do documento, por favor?", en: "Can you write the name of the document, please?", mainEmoji: "✍️", bgLeft: "🏛️", bgRight: "📝" },
    { pt: "Preciso de um intérprete, se for possível.", en: "I need an interpreter, if possible.", mainEmoji: "🗣️", bgLeft: "🏛️", bgRight: "👨‍💼" },
    // Officer replies about process
    { pt: "A espera é de cerca de quarenta e cinco minutos.", en: "The wait is about forty-five minutes.", mainEmoji: "⏳", bgLeft: "👨‍💼", bgRight: "🕐", replyTo: "Quanto tempo tenho de esperar?" },
    { pt: "Quando tiver tudo completo, marque nova consulta no site.", en: "When you have everything complete, book a new appointment on the website.", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "💻", replyTo: "Qual é o próximo passo depois de entregar os documentos?" },
    // Next steps — applicant speaks
    { pt: "Qual é o próximo passo depois de entregar os documentos?", en: "What is the next step after submitting the documents?", mainEmoji: "❓", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "Quando fica pronto o cartão de residência?", en: "When will the residence card be ready?", mainEmoji: "📅", bgLeft: "🏛️", bgRight: "❓" },
    // Officer replies about timeline
    { pt: "O prazo habitual é de sessenta dias úteis.", en: "The usual deadline is sixty working days.", mainEmoji: "👨‍💼", bgLeft: "📅", bgRight: "🏛️", replyTo: "Quando fica pronto o cartão de residência?" },
    // Goodbye
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "🏛️", bgRight: "😊" },
    { pt: "Boa sorte com o seu processo.", en: "Good luck with your application.", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "⭐", replyTo: "Obrigado! Até logo." },
  ],

  bus: [
    // At the bus stop — passenger speaks
    { pt: "Bom dia, senhor motorista! Este autocarro vai para o centro?", en: "Good morning, driver! Does this bus go to the centre?", mainEmoji: "🚌", bgLeft: "🛑", bgRight: "❓" },
    { pt: "Desculpe, qual é o número do autocarro para o hospital?", en: "Excuse me, what is the bus number to the hospital?", mainEmoji: "🚌", bgLeft: "🛑", bgRight: "❓" },
    { pt: "A que horas chega o próximo autocarro?", en: "When does the next bus arrive?", mainEmoji: "⏰", bgLeft: "🚌", bgRight: "❓" },
    // Driver replies at stop
    { pt: "Sim, vai lá. Entre, se faz favor.", en: "Yes, it does. Come in, please.", mainEmoji: "🚌", bgLeft: "🚌", bgRight: "✅", replyTo: "Bom dia, senhor motorista! Este autocarro vai para o centro?" },
    { pt: "Não, este não vai ao hospital. Apanhe o setecentos e doze.", en: "No, this one doesn't go to the hospital. Take the seven twelve.", mainEmoji: "🚌", bgLeft: "🚌", bgRight: "🗺️", replyTo: "Desculpe, qual é o número do autocarro para o hospital?" },
    { pt: "O próximo passa daqui a dez minutos.", en: "The next one comes in ten minutes.", mainEmoji: "⏰", bgLeft: "🚌", bgRight: "🛑", replyTo: "A que horas chega o próximo autocarro?" },
    // Tickets — passenger speaks
    { pt: "Um bilhete simples, se faz favor.", en: "A single ticket, please.", mainEmoji: "🎫", bgLeft: "🚌", bgRight: "👨‍✈️" },
    { pt: "Quanto custa o bilhete para o centro?", en: "How much is the ticket to the centre?", mainEmoji: "💰", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Onde tenho de picar o bilhete?", en: "Where do I need to validate the ticket?", mainEmoji: "🎫", bgLeft: "🚌", bgRight: "❓" },
    // Driver replies about tickets
    { pt: "São um euro e cinquenta, se faz favor.", en: "That is one euro fifty, please.", mainEmoji: "🚌", bgLeft: "🎫", bgRight: "🪙", replyTo: "Quanto custa o bilhete para o centro?" },
    { pt: "Pique aqui na máquina à entrada.", en: "Validate here at the machine by the entrance.", mainEmoji: "🚌", bgLeft: "🎫", bgRight: "✅", replyTo: "Onde tenho de picar o bilhete?" },
    { pt: "Tem um Viva Viagem? É mais barato.", en: "Do you have a Viva Viagem card? It is cheaper.", mainEmoji: "🚌", bgLeft: "💳", bgRight: "🎫", replyTo: "Um bilhete simples, se faz favor." },
    // On the bus — passenger speaks
    { pt: "Com licença, este lugar está livre?", en: "Excuse me, is this seat free?", mainEmoji: "🪑", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Quantas paragens faltam para o centro?", en: "How many stops to the centre?", mainEmoji: "🗺️", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Quero sair na próxima paragem, obrigado.", en: "I want to get off at the next stop, thank you.", mainEmoji: "🚶", bgLeft: "🚌", bgRight: "🛑" },
    { pt: "Apanhei o autocarro errado. Onde devo sair?", en: "I took the wrong bus. Where should I get off?", mainEmoji: "😟", bgLeft: "🚌", bgRight: "🗺️" },
    // Driver and fellow passenger replies on board
    { pt: "Sim, está livre, pode sentar.", en: "Yes, it's free, you can sit.", mainEmoji: "🪑", bgLeft: "🚌", bgRight: "😊", replyTo: "Com licença, este lugar está livre?" },
    { pt: "Faltam mais três paragens.", en: "Three more stops to go.", mainEmoji: "🚌", bgLeft: "🗺️", bgRight: "🚌", replyTo: "Quantas paragens faltam para o centro?" },
    { pt: "Próxima paragem: Praça do Comércio.", en: "Next stop: Praça do Comércio.", mainEmoji: "📢", bgLeft: "🚌", bgRight: "🛑" },
    { pt: "Saia aqui e apanhe o quinze ali em frente.", en: "Get off here and take the fifteen over there.", mainEmoji: "🚌", bgLeft: "🚌", bgRight: "➡️", replyTo: "Apanhei o autocarro errado. Onde devo sair?" },
    // Goodbye
    { pt: "Obrigado, senhor motorista!", en: "Thank you, driver!", mainEmoji: "😊", bgLeft: "🚌", bgRight: "👋" },
    { pt: "De nada! Boa viagem.", en: "You're welcome! Safe travels.", mainEmoji: "🚌", bgLeft: "🚌", bgRight: "👋", replyTo: "Obrigado, senhor motorista!" },
  ],

  pharmacy: [
    // Greeting — customer speaks
    { pt: "Bom dia! Pode ajudar-me, se faz favor?", en: "Good morning! Can you help me, please?", mainEmoji: "💊", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    // Pharmacist greets
    { pt: "Bom dia, minha senhora! Em que posso ajudar?", en: "Good morning, ma'am! How can I help?", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "😊", replyTo: "Bom dia! Pode ajudar-me, se faz favor?" },
    // Prescriptions — customer speaks
    { pt: "Tenho receita médica para este medicamento.", en: "I have a prescription for this medicine.", mainEmoji: "📋", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Este medicamento precisa de receita?", en: "Does this medicine need a prescription?", mainEmoji: "❓", bgLeft: "💊", bgRight: "👩‍⚕️" },
    // Pharmacist replies about prescription
    { pt: "Sim, este precisa de receita. Tem alguma?", en: "Yes, this one needs a prescription. Do you have one?", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "📋", replyTo: "Este medicamento precisa de receita?" },
    { pt: "Quer o genérico? É mais barato e tem a mesma substância.", en: "Would you like the generic? It is cheaper and has the same substance.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "💰", replyTo: "Tenho receita médica para este medicamento." },
    // Symptoms — customer speaks
    { pt: "Tem alguma coisa para a febre, se faz favor?", en: "Do you have something for fever, please?", mainEmoji: "🌡️", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "O meu filho tem dor de garganta desde ontem.", en: "My son has had a sore throat since yesterday.", mainEmoji: "😣", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Tem alguma coisa para a tosse seca?", en: "Do you have something for a dry cough?", mainEmoji: "😷", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Tenho dores de cabeça há dois dias.", en: "I have had a headache for two days.", mainEmoji: "🤕", bgLeft: "💊", bgRight: "👩‍⚕️" },
    // Pharmacist recommends
    { pt: "Para a febre, o ben-u-ron funciona muito bem.", en: "For fever, ben-u-ron works very well.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "✅", replyTo: "Tem alguma coisa para a febre, se faz favor?" },
    { pt: "Para a dor de cabeça, recomendo o brufen.", en: "For headaches, I recommend brufen.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "✅", replyTo: "Tenho dores de cabeça há dois dias." },
    { pt: "Para a garganta, os Strepsils são muito bons.", en: "For the throat, Strepsils are very good.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "😊", replyTo: "O meu filho tem dor de garganta desde ontem." },
    // Dosage questions — customer speaks
    { pt: "Quantas vezes por dia dá-se à criança?", en: "How many times a day do you give it to a child?", mainEmoji: "🕐", bgLeft: "💊", bgRight: "❓" },
    { pt: "É seguro para uma criança de cinco anos?", en: "Is it safe for a five-year-old child?", mainEmoji: "🧒", bgLeft: "💊", bgRight: "❓" },
    { pt: "Tem efeitos secundários importantes?", en: "Are there any important side effects?", mainEmoji: "❓", bgLeft: "💊", bgRight: "👩‍⚕️" },
    // Pharmacist explains dosage
    { pt: "Dá três vezes por dia, às refeições.", en: "Give it three times a day, with meals.", mainEmoji: "👩‍⚕️", bgLeft: "🍽️", bgRight: "💊", replyTo: "Quantas vezes por dia dá-se à criança?" },
    { pt: "Sim, é seguro. Há dosagem pediátrica.", en: "Yes, it is safe. There is a paediatric dosage.", mainEmoji: "👩‍⚕️", bgLeft: "🧒", bgRight: "✅", replyTo: "É seguro para uma criança de cinco anos?" },
    // Price and insurance
    { pt: "Tem comparticipação do SNS?", en: "Is it covered by the SNS health insurance?", mainEmoji: "💰", bgLeft: "💊", bgRight: "❓" },
    { pt: "Sim, com o cartão de utente tem desconto.", en: "Yes, with the health card you get a discount.", mainEmoji: "👩‍⚕️", bgLeft: "💳", bgRight: "💊", replyTo: "Tem comparticipação do SNS?" },
    // Goodbye
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "💊", bgRight: "😊" },
    { pt: "De nada! Melhoras ao seu filho.", en: "You're welcome! Get well soon to your son.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "❤️", replyTo: "Obrigado! Até logo." },
  ],

  gas_station: [
    // Fuel — driver speaks
    { pt: "Bom dia! Queria trinta euros de gasóleo, se faz favor.", en: "Good morning! I would like thirty euros of diesel, please.", mainEmoji: "⛽", bgLeft: "🚗", bgRight: "👨‍🔧" },
    { pt: "Pode encher o depósito, se faz favor?", en: "Can you fill up the tank, please?", mainEmoji: "⛽", bgLeft: "🚗", bgRight: "👨‍🔧" },
    { pt: "Este carro usa gasóleo ou gasolina?", en: "Does this car use diesel or petrol?", mainEmoji: "❓", bgLeft: "⛽", bgRight: "🚗" },
    { pt: "Qual é o preço da gasolina por litro hoje?", en: "What is the price of petrol per litre today?", mainEmoji: "💰", bgLeft: "⛽", bgRight: "❓" },
    // Attendant replies about fuel
    { pt: "Que bomba usou, se faz favor?", en: "Which pump did you use, please?", mainEmoji: "👨‍🔧", bgLeft: "⛽", bgRight: "❓", replyTo: "Bomba número três. Posso pagar com MB Way?" },
    { pt: "O gasóleo está a um euro e cinquenta e nove.", en: "The diesel is at one euro fifty-nine.", mainEmoji: "💰", bgLeft: "👨‍🔧", bgRight: "⛽", replyTo: "Qual é o preço da gasolina por litro hoje?" },
    { pt: "O seu carro usa gasolina sem chumbo.", en: "Your car uses unleaded petrol.", mainEmoji: "👨‍🔧", bgLeft: "⛽", bgRight: "✅", replyTo: "Este carro usa gasóleo ou gasolina?" },
    // Paying — driver speaks
    { pt: "Bomba número três. Posso pagar com MB Way?", en: "Pump number three. Can I pay with MB Way?", mainEmoji: "📱", bgLeft: "⛽", bgRight: "💳" },
    { pt: "Só aceitam dinheiro ou também cartão?", en: "Do you only accept cash or also card?", mainEmoji: "💵", bgLeft: "⛽", bgRight: "❓" },
    { pt: "Pode dar-me um recibo, se faz favor?", en: "Can you give me a receipt, please?", mainEmoji: "🧾", bgLeft: "⛽", bgRight: "👨‍🔧" },
    // Attendant replies about payment
    { pt: "Aceitamos MB Way, multibanco e numerário.", en: "We accept MB Way, multibanco, and cash.", mainEmoji: "👨‍🔧", bgLeft: "💳", bgRight: "📱", replyTo: "Só aceitam dinheiro ou também cartão?" },
    { pt: "São trinta e dois euros e quarenta, obrigado.", en: "That is thirty-two euros forty, thank you.", mainEmoji: "🪙", bgLeft: "👨‍🔧", bgRight: "⛽", replyTo: "Bomba número três. Posso pagar com MB Way?" },
    // Shop and amenities — driver speaks
    { pt: "Tem loja cá dentro? Queria uma bica.", en: "Do you have a shop inside? I'd like a coffee.", mainEmoji: "☕", bgLeft: "⛽", bgRight: "🏪" },
    { pt: "Onde fica a bomba de ar para os pneus?", en: "Where is the air pump for the tyres?", mainEmoji: "🔧", bgLeft: "⛽", bgRight: "❓" },
    { pt: "Tem lavagem de carro aqui na Galp?", en: "Do you have a car wash here at the Galp?", mainEmoji: "🚗", bgLeft: "⛽", bgRight: "💧" },
    // Attendant replies about amenities
    { pt: "A loja está aberta. Tem sandes e café.", en: "The shop is open. We have sandwiches and coffee.", mainEmoji: "👨‍🔧", bgLeft: "🏪", bgRight: "☕", replyTo: "Tem loja cá dentro? Queria uma bica." },
    { pt: "A bomba de ar fica ali ao fundo, é grátis.", en: "The air pump is over there at the back, it's free.", mainEmoji: "👨‍🔧", bgLeft: "🔧", bgRight: "✅", replyTo: "Onde fica a bomba de ar para os pneus?" },
    // Directions and goodbye
    { pt: "Pode dizer-me como chegar à A1?", en: "Can you tell me how to get to the A1?", mainEmoji: "🛣️", bgLeft: "⛽", bgRight: "🗺️" },
    { pt: "Siga em frente e entre na autoestrada ali à direita.", en: "Go straight ahead and enter the motorway on the right.", mainEmoji: "👨‍🔧", bgLeft: "🛣️", bgRight: "➡️", replyTo: "Pode dizer-me como chegar à A1?" },
    { pt: "Obrigado! Boa viagem.", en: "Thank you! Safe travels.", mainEmoji: "👋", bgLeft: "⛽", bgRight: "🚗" },
    { pt: "De nada! Bom regresso.", en: "You're welcome! Safe journey back.", mainEmoji: "👨‍🔧", bgLeft: "⛽", bgRight: "👋", replyTo: "Obrigado! Boa viagem." },
  ],

  traffic: [
    // Journey questions — child speaks
    { pt: "Já chegámos? Falta muito?", en: "Are we there yet? Is it much longer?", mainEmoji: "🚗", bgLeft: "🛣️", bgRight: "❓" },
    { pt: "Quanto tempo falta para chegar?", en: "How long until we arrive?", mainEmoji: "⏱️", bgLeft: "🚗", bgRight: "❓" },
    { pt: "Quantos quilómetros faltam ainda?", en: "How many kilometres are left?", mainEmoji: "🗺️", bgLeft: "🚗", bgRight: "❓" },
    { pt: "Estou aborrecido. Posso pôr música?", en: "I am bored. Can I put on some music?", mainEmoji: "😑", bgLeft: "🚗", bgRight: "🎵" },
    // Driver replies to journey questions
    { pt: "Faltam mais ou menos vinte minutos.", en: "About twenty minutes left.", mainEmoji: "🚗", bgLeft: "⏱️", bgRight: "😊", replyTo: "Já chegámos? Falta muito?" },
    { pt: "Faltam cinquenta quilómetros ainda.", en: "Fifty kilometres still to go.", mainEmoji: "🗺️", bgLeft: "🚗", bgRight: "🛣️", replyTo: "Quantos quilómetros faltam ainda?" },
    { pt: "Claro, podes escolher uma música.", en: "Sure, you can choose a song.", mainEmoji: "🎵", bgLeft: "🚗", bgRight: "😄", replyTo: "Estou aborrecido. Posso pôr música?" },
    // Traffic — driver speaks
    { pt: "Que trânsito! Há um engarrafamento enorme na IC19.", en: "What traffic! There is a huge jam on the IC19.", mainEmoji: "🚦", bgLeft: "🚗", bgRight: "😩" },
    { pt: "A GPS diz para sair aqui e evitar o engarrafamento.", en: "The GPS says to exit here and avoid the jam.", mainEmoji: "📱", bgLeft: "🚗", bgRight: "🛣️" },
    { pt: "Temos de pagar a portagem. Temos Via Verde?", en: "We need to pay the toll. Do we have Via Verde?", mainEmoji: "🛣️", bgLeft: "🚗", bgRight: "💳" },
    // Passenger replies to traffic
    { pt: "Sim, a Via Verde está no para-brisas.", en: "Yes, the Via Verde is on the windscreen.", mainEmoji: "✅", bgLeft: "💳", bgRight: "🚗", replyTo: "Temos de pagar a portagem. Temos Via Verde?" },
    { pt: "A GPS está a recalcular, vai demorar mais dez minutos.", en: "The GPS is recalculating, it will take ten more minutes.", mainEmoji: "📱", bgLeft: "🗺️", bgRight: "⏱️", replyTo: "A GPS diz para sair aqui e evitar o engarrafamento." },
    // Stops and needs — child speaks
    { pt: "Preciso de parar. Tenho de ir à casa de banho.", en: "I need to stop. I need to go to the bathroom.", mainEmoji: "🚻", bgLeft: "🚗", bgRight: "❗" },
    { pt: "Estou enjoado. Pode abrir a janela?", en: "I feel sick. Can you open the window?", mainEmoji: "🤢", bgLeft: "🚗", bgRight: "💨" },
    { pt: "Posso beber um pouco de água?", en: "Can I have a little water?", mainEmoji: "💧", bgLeft: "🚗", bgRight: "🥤" },
    // Driver replies to needs
    { pt: "Vamos parar num posto aqui à frente.", en: "We'll stop at a petrol station just ahead.", mainEmoji: "⛽", bgLeft: "🚗", bgRight: "🛑", replyTo: "Preciso de parar. Tenho de ir à casa de banho." },
    { pt: "Abre a janela, fica melhor.", en: "Open the window, you'll feel better.", mainEmoji: "💨", bgLeft: "🚗", bgRight: "😊", replyTo: "Estou enjoado. Pode abrir a janela?" },
    // GPS directions — driver reads aloud
    { pt: "Na rotunda, toma a segunda saída.", en: "At the roundabout, take the second exit.", mainEmoji: "🔄", bgLeft: "📱", bgRight: "🗺️" },
    { pt: "Daqui a duzentos metros, vira à direita.", en: "In two hundred metres, turn right.", mainEmoji: "➡️", bgLeft: "📱", bgRight: "🗺️" },
    { pt: "Perdemos a saída! A GPS está a recalcular.", en: "We missed the exit! The GPS is recalculating.", mainEmoji: "😬", bgLeft: "🚗", bgRight: "📱" },
    // Safety — driver speaks
    { pt: "Põe o cinto, por favor. É obrigatório.", en: "Put on your seatbelt, please. It is required.", mainEmoji: "🔒", bgLeft: "🚗", bgRight: "👩‍👦" },
    { pt: "Há um radar ali, atenção à velocidade.", en: "There is a speed camera there, mind the speed.", mainEmoji: "📷", bgLeft: "🚗", bgRight: "⚠️" },
    { pt: "Ambulância! Temos de nos encostar.", en: "Ambulance! We need to pull over.", mainEmoji: "🚑", bgLeft: "🚗", bgRight: "🚨" },
    // Child comments on scenery
    { pt: "Que paisagem bonita! Vejo o rio!", en: "What a beautiful view! I can see the river!", mainEmoji: "🌄", bgLeft: "🚗", bgRight: "😄" },
    { pt: "Olha, vacas no campo!", en: "Look, cows in the field!", mainEmoji: "🐄", bgLeft: "🚗", bgRight: "🌾" },
  ],
};

/** Flat list of school template pages — kept for backwards compatibility with chromePhrases fallback. */
export const templatePages: StoryPage[] = templatePagesByContext.school;

export const chromePhrases: StoryPage[] = [
  { pt: "O gato bebe leite.", en: "The cat drinks milk.", mainEmoji: "🐱", bgLeft: "🥛", bgRight: "🍼" },
  { pt: "O cão corre no parque.", en: "The dog runs in the park.", mainEmoji: "🐶", bgLeft: "🌳", bgRight: "⚽" },
  { pt: "O pato nada no lago.", en: "The duck swims in the lake.", mainEmoji: "🦆", bgLeft: "💧", bgRight: "🌊" },
  { pt: "A borboleta voa no jardim.", en: "The butterfly flies in the garden.", mainEmoji: "🦋", bgLeft: "🌸", bgRight: "🌺" },
  { pt: "O coelho come uma cenoura.", en: "The rabbit eats a carrot.", mainEmoji: "🐰", bgLeft: "🥕", bgRight: "🌿" },
  { pt: "O urso dorme na floresta.", en: "The bear sleeps in the forest.", mainEmoji: "🐻", bgLeft: "🌲", bgRight: "🍂" },
  { pt: "O pássaro canta de manhã.", en: "The bird sings in the morning.", mainEmoji: "🐦", bgLeft: "☀️", bgRight: "🌿" },
  { pt: "O cavalo corre no campo.", en: "The horse runs in the field.", mainEmoji: "🐴", bgLeft: "🌾", bgRight: "🌻" },
  { pt: "A vaca come erva verde.", en: "The cow eats green grass.", mainEmoji: "🐄", bgLeft: "🌱", bgRight: "🌿" },
  { pt: "O elefante bebe água.", en: "The elephant drinks water.", mainEmoji: "🐘", bgLeft: "💧", bgRight: "🌴" },
  { pt: "O leão dorme ao sol.", en: "The lion sleeps in the sun.", mainEmoji: "🦁", bgLeft: "☀️", bgRight: "🌾" },
  { pt: "A girafa come folhas.", en: "The giraffe eats leaves.", mainEmoji: "🦒", bgLeft: "🌿", bgRight: "🌳" },
  { pt: "O peixe nada no mar.", en: "The fish swims in the sea.", mainEmoji: "🐟", bgLeft: "🌊", bgRight: "🐚" },
  { pt: "A tartaruga anda devagar.", en: "The turtle walks slowly.", mainEmoji: "🐢", bgLeft: "🌿", bgRight: "🌊" },
  { pt: "O menino come uma maçã.", en: "The boy eats an apple.", mainEmoji: "👦", bgLeft: "🍎", bgRight: "🌟" },
  { pt: "A menina lê um livro.", en: "The girl reads a book.", mainEmoji: "👧", bgLeft: "📚", bgRight: "✏️" },
  { pt: "A mãe faz um bolo.", en: "The mother makes a cake.", mainEmoji: "👩", bgLeft: "🎂", bgRight: "🍰" },
  { pt: "O pai lava o carro.", en: "The father washes the car.", mainEmoji: "👨", bgLeft: "🚗", bgRight: "🪣" },
  { pt: "O bebé dorme na cama.", en: "The baby sleeps in the bed.", mainEmoji: "👶", bgLeft: "🛏️", bgRight: "🌙" },
  { pt: "A avó conta uma história.", en: "The grandmother tells a story.", mainEmoji: "👵", bgLeft: "📖", bgRight: "🕯️" },
  { pt: "O avô planta flores.", en: "The grandfather plants flowers.", mainEmoji: "👴", bgLeft: "🌷", bgRight: "🌱" },
  { pt: "A criança brinca no jardim.", en: "The child plays in the garden.", mainEmoji: "🧒", bgLeft: "⚽", bgRight: "🌳" },
  { pt: "O menino bebe sumo de laranja.", en: "The boy drinks orange juice.", mainEmoji: "👦", bgLeft: "🍊", bgRight: "🥤" },
  { pt: "A menina come uma banana.", en: "The girl eats a banana.", mainEmoji: "👧", bgLeft: "🍌", bgRight: "😋" },
  { pt: "A família come ao jantar.", en: "The family eats dinner.", mainEmoji: "👨‍👩‍👧", bgLeft: "🍽️", bgRight: "🕯️" },
  { pt: "O gato come peixe.", en: "The cat eats fish.", mainEmoji: "🐱", bgLeft: "🐟", bgRight: "🍽️" },
  { pt: "A menina pinta um quadro.", en: "The girl paints a picture.", mainEmoji: "👧", bgLeft: "🎨", bgRight: "🖌️" },
  { pt: "O menino joga futebol.", en: "The boy plays football.", mainEmoji: "👦", bgLeft: "⚽", bgRight: "🏟️" },
  { pt: "A professora ensina na escola.", en: "The teacher teaches at school.", mainEmoji: "👩‍🏫", bgLeft: "📚", bgRight: "🏫" },
  { pt: "O menino escreve no caderno.", en: "The boy writes in his notebook.", mainEmoji: "👦", bgLeft: "📓", bgRight: "✏️" },
  { pt: "A menina dança com alegria.", en: "The girl dances with joy.", mainEmoji: "👧", bgLeft: "🎵", bgRight: "🌟" },
  { pt: "O menino toca guitarra.", en: "The boy plays the guitar.", mainEmoji: "👦", bgLeft: "🎸", bgRight: "🎵" },
  { pt: "O sol brilha no céu azul.", en: "The sun shines in the blue sky.", mainEmoji: "☀️", bgLeft: "🌤️", bgRight: "🌈" },
  { pt: "A chuva cai no jardim.", en: "The rain falls in the garden.", mainEmoji: "🌧️", bgLeft: "☔", bgRight: "💧" },
  { pt: "A lua brilha à noite.", en: "The moon shines at night.", mainEmoji: "🌙", bgLeft: "⭐", bgRight: "🌟" },
  { pt: "As flores crescem na primavera.", en: "The flowers grow in spring.", mainEmoji: "🌸", bgLeft: "🌷", bgRight: "🦋" },
  { pt: "A neve cobre as montanhas.", en: "The snow covers the mountains.", mainEmoji: "❄️", bgLeft: "⛄", bgRight: "🏔️" },
];

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
    baseEn: 'to / for / towards',
    baseTr: 'için / -a / -e doğru',
    examples: [
      { pt: 'Eu vou para Portugal.',         en: 'I go to Portugal.',               tr: 'Portekiz\'e gidiyorum.' },
      { pt: 'Isto é para ti.',               en: 'This is for you.',                tr: 'Bu senin için.' },
      { pt: 'Eu vou para casa.',             en: 'I go home.',                      tr: 'Eve gidiyorum.' },
    ],
    members: ['para'],
    definite: [],
  },
];

/** Map from every member word to its group — for O(1) lookup in CardsMode */
export const prepGroupByWord: Record<string, PrepGroup> = Object.fromEntries(
  prepGroups.flatMap((g) => g.members.map((m) => [m, g]))
);
