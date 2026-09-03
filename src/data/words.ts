export interface Word {
  pt: string;
  en: string;
  tr: string;
  emoji: string;
}

export interface StoryPage {
  pt: string;
  en: string;
  mainEmoji: string;
  bgLeft: string;
  bgRight: string;
  imagePrompt?: string;
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
  { pt: "ser", en: "to be", tr: "olmak", emoji: "👤" },
  { pt: "estar", en: "to be (state)", tr: "olmak (durum)", emoji: "📍" },
  { pt: "ter", en: "to have", tr: "sahip olmak", emoji: "🤲" },
  { pt: "ir", en: "to go", tr: "gitmek", emoji: "🚶" },
  { pt: "vir", en: "to come", tr: "gelmek", emoji: "🏃" },
  { pt: "fazer", en: "to do / make", tr: "yapmak", emoji: "🛠️" },
  { pt: "falar", en: "to speak / talk", tr: "konuşmak", emoji: "🗣️" },
  { pt: "dizer", en: "to say / tell", tr: "söylemek", emoji: "💬" },
  { pt: "comer", en: "to eat", tr: "yemek yemek", emoji: "🍽️" },
  { pt: "beber", en: "to drink", tr: "içmek", emoji: "🥤" },
  { pt: "dormir", en: "to sleep", tr: "uyumak", emoji: "😴" },
  { pt: "acordar", en: "to wake up", tr: "uyanmak", emoji: "⏰" },
  { pt: "ver", en: "to see / watch", tr: "görmek / izlemek", emoji: "👀" },
  { pt: "ouvir", en: "to hear / listen", tr: "duymak / dinlemek", emoji: "🎧" },
  { pt: "ler", en: "to read", tr: "okumak", emoji: "📖" },
  { pt: "escrever", en: "to write", tr: "yazmak", emoji: "✍️" },
  { pt: "estudar", en: "to study", tr: "çalışmak", emoji: "📚" },
  { pt: "trabalhar", en: "to work", tr: "çalışmak", emoji: "💼" },
  { pt: "brincar", en: "to play", tr: "oynamak", emoji: "🧸" },
  { pt: "correr", en: "to run", tr: "koşmak", emoji: "🏃" },
  { pt: "andar", en: "to walk", tr: "yürümek", emoji: "🚶" },
  { pt: "nadar", en: "to swim", tr: "yüzmek", emoji: "🏊" },
  { pt: "cantar", en: "to sing", tr: "şarkı söylemek", emoji: "🎵" },
  { pt: "dançar", en: "to dance", tr: "dans etmek", emoji: "💃" },
  { pt: "desenhar", en: "to draw", tr: "çizmek", emoji: "🎨" },
  { pt: "comprar", en: "to buy", tr: "satın almak", emoji: "🛒" },
  { pt: "dar", en: "to give", tr: "vermek", emoji: "🎁" },
  { pt: "ajudar", en: "to help", tr: "yardım etmek", emoji: "🤝" },
  { pt: "gostar", en: "to like", tr: "sevmek / beğenmek", emoji: "❤️" },
  { pt: "querer", en: "to want", tr: "istemek", emoji: "🌟" },
  { pt: "poder", en: "can / to be able to", tr: "yapabilmek", emoji: "💪" },
  { pt: "saber", en: "to know", tr: "bilmek", emoji: "💡" },
  { pt: "abrir", en: "to open", tr: "açmak", emoji: "🔓" },
  { pt: "fechar", en: "to close", tr: "kapatmak", emoji: "🔒" },
  { pt: "começar", en: "to start", tr: "başlamak", emoji: "🚀" },
  { pt: "acabar", en: "to finish", tr: "bitirmek", emoji: "🏁" },
  { pt: "chegar", en: "to arrive", tr: "varmak / ulaşmak", emoji: "📍" },
  { pt: "sair", en: "to leave", tr: "ayrılmak / çıkmak", emoji: "🚪" },
  { pt: "entrar", en: "to enter", tr: "girmek", emoji: "🚪" },
  { pt: "sentar", en: "to sit", tr: "oturmak", emoji: "🪑" },
  { pt: "perguntar", en: "to ask", tr: "sormak", emoji: "❓" },
  { pt: "responder", en: "to answer", tr: "cevap vermek", emoji: "💬" },
  { pt: "pensar", en: "to think", tr: "düşünmek", emoji: "🤔" },
  { pt: "trazer", en: "to bring", tr: "getirmek", emoji: "🎒" },
  { pt: "ficar", en: "to stay", tr: "kalmak", emoji: "🏠" },
  { pt: "voltar", en: "to return", tr: "dönmek", emoji: "↩️" },
  // ── Family ───────────────────────────────────────────────────────────────────
  { pt: "pai", en: "father", tr: "baba", emoji: "👨" },
  { pt: "mãe", en: "mother", tr: "anne", emoji: "👩" },
  { pt: "filho", en: "son", tr: "oğul", emoji: "👦" },
  { pt: "filha", en: "daughter", tr: "kız", emoji: "👧" },
  { pt: "irmão", en: "brother", tr: "erkek kardeş", emoji: "👦" },
  { pt: "irmã", en: "sister", tr: "kız kardeş", emoji: "👧" },
  { pt: "avô", en: "grandfather", tr: "büyükbaba", emoji: "👴" },
  { pt: "avó", en: "grandmother", tr: "büyükanne", emoji: "👵" },
  { pt: "tio", en: "uncle", tr: "amca / dayı", emoji: "👨" },
  { pt: "tia", en: "aunt", tr: "hala / teyze", emoji: "👩" },
  { pt: "primo", en: "cousin (m)", tr: "erkek kuzen", emoji: "👦" },
  { pt: "prima", en: "cousin (f)", tr: "kız kuzen", emoji: "👧" },
  { pt: "bebé", en: "baby", tr: "bebek", emoji: "👶" },
  { pt: "família", en: "family", tr: "aile", emoji: "👨‍👩‍👧" },
  { pt: "amigo", en: "friend (m)", tr: "erkek arkadaş", emoji: "🧑" },
  { pt: "amiga", en: "friend (f)", tr: "kız arkadaş", emoji: "👩" },
  // ── Animals ──────────────────────────────────────────────────────────────────
  { pt: "cão", en: "dog", tr: "köpek", emoji: "🐶" },
  { pt: "gato", en: "cat", tr: "kedi", emoji: "🐱" },
  { pt: "peixe", en: "fish", tr: "balık", emoji: "🐟" },
  { pt: "pássaro", en: "bird", tr: "kuş", emoji: "🐦" },
  { pt: "coelho", en: "rabbit", tr: "tavşan", emoji: "🐰" },
  { pt: "cavalo", en: "horse", tr: "at", emoji: "🐴" },
  { pt: "vaca", en: "cow", tr: "inek", emoji: "🐄" },
  { pt: "porco", en: "pig", tr: "domuz", emoji: "🐷" },
  { pt: "ovelha", en: "sheep", tr: "koyun", emoji: "🐑" },
  { pt: "galinha", en: "chicken", tr: "tavuk", emoji: "🐔" },
  { pt: "pato", en: "duck", tr: "ördek", emoji: "🦆" },
  { pt: "leão", en: "lion", tr: "aslan", emoji: "🦁" },
  { pt: "elefante", en: "elephant", tr: "fil", emoji: "🐘" },
  { pt: "girafa", en: "giraffe", tr: "zürafa", emoji: "🦒" },
  { pt: "macaco", en: "monkey", tr: "maymun", emoji: "🐒" },
  { pt: "urso", en: "bear", tr: "ayı", emoji: "🐻" },
  { pt: "sapo", en: "frog", tr: "kurbağa", emoji: "🐸" },
  { pt: "tartaruga", en: "turtle", tr: "kaplumbağa", emoji: "🐢" },
  // ── Food & drink ─────────────────────────────────────────────────────────────
  { pt: "água", en: "water", tr: "su", emoji: "💧" },
  { pt: "leite", en: "milk", tr: "süt", emoji: "🥛" },
  { pt: "sumo", en: "juice", tr: "meyve suyu", emoji: "🧃" },
  { pt: "pão", en: "bread", tr: "ekmek", emoji: "🍞" },
  { pt: "arroz", en: "rice", tr: "pirinç", emoji: "🍚" },
  { pt: "sopa", en: "soup", tr: "çorba", emoji: "🥣" },
  { pt: "carne", en: "meat", tr: "et", emoji: "🥩" },
  { pt: "fruta", en: "fruit", tr: "meyve", emoji: "🍎" },
  { pt: "maçã", en: "apple", tr: "elma", emoji: "🍎" },
  { pt: "banana", en: "banana", tr: "muz", emoji: "🍌" },
  { pt: "laranja", en: "orange", tr: "portakal", emoji: "🍊" },
  { pt: "cenoura", en: "carrot", tr: "havuç", emoji: "🥕" },
  { pt: "batata", en: "potato", tr: "patates", emoji: "🥔" },
  { pt: "ovo", en: "egg", tr: "yumurta", emoji: "🥚" },
  { pt: "queijo", en: "cheese", tr: "peynir", emoji: "🧀" },
  { pt: "bolo", en: "cake", tr: "pasta / kek", emoji: "🎂" },
  { pt: "café", en: "coffee", tr: "kahve", emoji: "☕" },
  { pt: "almoço", en: "lunch", tr: "öğle yemeği", emoji: "🍱" },
  { pt: "jantar", en: "dinner", tr: "akşam yemeği", emoji: "🍽️" },
  { pt: "pequeno-almoço", en: "breakfast", tr: "kahvaltı", emoji: "🥐" },
  // ── Colours ──────────────────────────────────────────────────────────────────
  { pt: "vermelho", en: "red", tr: "kırmızı", emoji: "🔴" },
  { pt: "azul", en: "blue", tr: "mavi", emoji: "🔵" },
  { pt: "verde", en: "green", tr: "yeşil", emoji: "🟢" },
  { pt: "amarelo", en: "yellow", tr: "sarı", emoji: "🟡" },
  { pt: "branco", en: "white", tr: "beyaz", emoji: "⬜" },
  { pt: "preto", en: "black", tr: "siyah", emoji: "⬛" },
  { pt: "cor-de-rosa", en: "pink", tr: "pembe", emoji: "🩷" },
  { pt: "laranja", en: "orange (colour)", tr: "turuncu", emoji: "🟠" },
  { pt: "roxo", en: "purple", tr: "mor", emoji: "🟣" },
  // ── Numbers ──────────────────────────────────────────────────────────────────
  { pt: "um", en: "one", tr: "bir", emoji: "1️⃣" },
  { pt: "dois", en: "two", tr: "iki", emoji: "2️⃣" },
  { pt: "três", en: "three", tr: "üç", emoji: "3️⃣" },
  { pt: "quatro", en: "four", tr: "dört", emoji: "4️⃣" },
  { pt: "cinco", en: "five", tr: "beş", emoji: "5️⃣" },
  { pt: "seis", en: "six", tr: "altı", emoji: "6️⃣" },
  { pt: "sete", en: "seven", tr: "yedi", emoji: "7️⃣" },
  { pt: "oito", en: "eight", tr: "sekiz", emoji: "8️⃣" },
  { pt: "nove", en: "nine", tr: "dokuz", emoji: "9️⃣" },
  { pt: "dez", en: "ten", tr: "on", emoji: "🔟" },
  // ── Body ─────────────────────────────────────────────────────────────────────
  { pt: "cabeça", en: "head", tr: "baş / kafa", emoji: "🗣️" },
  { pt: "olho", en: "eye", tr: "göz", emoji: "👁️" },
  { pt: "nariz", en: "nose", tr: "burun", emoji: "👃" },
  { pt: "boca", en: "mouth", tr: "ağız", emoji: "👄" },
  { pt: "orelha", en: "ear", tr: "kulak", emoji: "👂" },
  { pt: "mão", en: "hand", tr: "el", emoji: "✋" },
  { pt: "pé", en: "foot", tr: "ayak", emoji: "🦶" },
  { pt: "braço", en: "arm", tr: "kol", emoji: "💪" },
  { pt: "perna", en: "leg", tr: "bacak", emoji: "🦵" },
  { pt: "cabelo", en: "hair", tr: "saç", emoji: "💇" },
  // ── Home ─────────────────────────────────────────────────────────────────────
  { pt: "casa", en: "house / home", tr: "ev", emoji: "🏠" },
  { pt: "porta", en: "door", tr: "kapı", emoji: "🚪" },
  { pt: "janela", en: "window", tr: "pencere", emoji: "🪟" },
  { pt: "cama", en: "bed", tr: "yatak", emoji: "🛏️" },
  { pt: "mesa", en: "table", tr: "masa", emoji: "🪑" },
  { pt: "cadeira", en: "chair", tr: "sandalye", emoji: "🪑" },
  { pt: "cozinha", en: "kitchen", tr: "mutfak", emoji: "🍳" },
  { pt: "quarto", en: "bedroom", tr: "yatak odası", emoji: "🛏️" },
  { pt: "casa de banho", en: "bathroom", tr: "banyo", emoji: "🛁" },
  { pt: "jardim", en: "garden", tr: "bahçe", emoji: "🌳" },
  // ── School ───────────────────────────────────────────────────────────────────
  { pt: "escola", en: "school", tr: "okul", emoji: "🏫" },
  { pt: "professor", en: "teacher (m)", tr: "öğretmen (erkek)", emoji: "👨‍🏫" },
  { pt: "professora", en: "teacher (f)", tr: "öğretmen (kadın)", emoji: "👩‍🏫" },
  { pt: "aluno", en: "student (m)", tr: "öğrenci (erkek)", emoji: "🎓" },
  { pt: "aluna", en: "student (f)", tr: "öğrenci (kız)", emoji: "🎓" },
  { pt: "livro", en: "book", tr: "kitap", emoji: "📖" },
  { pt: "caderno", en: "notebook", tr: "defter", emoji: "📓" },
  { pt: "lápis", en: "pencil", tr: "kalem", emoji: "✏️" },
  { pt: "caneta", en: "pen", tr: "tükenmez kalem", emoji: "🖊️" },
  { pt: "mochila", en: "backpack", tr: "sırt çantası", emoji: "🎒" },
  // ── Places ───────────────────────────────────────────────────────────────────
  { pt: "cidade", en: "city / town", tr: "şehir", emoji: "🏙️" },
  { pt: "rua", en: "street", tr: "sokak", emoji: "🛣️" },
  { pt: "parque", en: "park", tr: "park", emoji: "🌳" },
  { pt: "praia", en: "beach", tr: "plaj / sahil", emoji: "🏖️" },
  { pt: "supermercado", en: "supermarket", tr: "süpermarket", emoji: "🛒" },
  { pt: "hospital", en: "hospital", tr: "hastane", emoji: "🏥" },
  { pt: "restaurante", en: "restaurant", tr: "restoran", emoji: "🍽️" },
  { pt: "loja", en: "shop / store", tr: "dükkan / mağaza", emoji: "🏪" },
  // ── Transport ────────────────────────────────────────────────────────────────
  { pt: "carro", en: "car", tr: "araba", emoji: "🚗" },
  { pt: "autocarro", en: "bus", tr: "otobüs", emoji: "🚌" },
  { pt: "comboio", en: "train", tr: "tren", emoji: "🚂" },
  { pt: "avião", en: "aeroplane", tr: "uçak", emoji: "✈️" },
  { pt: "bicicleta", en: "bicycle", tr: "bisiklet", emoji: "🚲" },
  { pt: "barco", en: "boat", tr: "tekne", emoji: "⛵" },
  // ── Adjectives ───────────────────────────────────────────────────────────────
  { pt: "grande", en: "big / large", tr: "büyük", emoji: "🐘" },
  { pt: "pequeno", en: "small / little", tr: "küçük", emoji: "🐭" },
  { pt: "bonito", en: "beautiful / pretty", tr: "güzel", emoji: "🌸" },
  { pt: "feio", en: "ugly", tr: "çirkin", emoji: "👹" },
  { pt: "bom", en: "good", tr: "iyi", emoji: "👍" },
  { pt: "mau", en: "bad", tr: "kötü", emoji: "👎" },
  { pt: "novo", en: "new", tr: "yeni", emoji: "🎁" },
  { pt: "velho", en: "old", tr: "eski / yaşlı", emoji: "👴" },
  { pt: "rápido", en: "fast / quick", tr: "hızlı", emoji: "⚡" },
  { pt: "lento", en: "slow", tr: "yavaş", emoji: "🐌" },
  { pt: "quente", en: "hot / warm", tr: "sıcak", emoji: "🔥" },
  { pt: "frio", en: "cold", tr: "soğuk", emoji: "❄️" },
  { pt: "feliz", en: "happy", tr: "mutlu", emoji: "😊" },
  { pt: "triste", en: "sad", tr: "üzgün", emoji: "😢" },
  { pt: "cansado", en: "tired", tr: "yorgun", emoji: "😴" },
  { pt: "com fome", en: "hungry", tr: "aç", emoji: "🍔" },
  { pt: "com sede", en: "thirsty", tr: "susuz", emoji: "💧" },
  { pt: "doente", en: "sick", tr: "hasta", emoji: "🤒" },
  { pt: "saudável", en: "healthy", tr: "sağlıklı", emoji: "🥗" },
  { pt: "alto", en: "tall", tr: "uzun boylu", emoji: "🦒" },
  { pt: "baixo", en: "short", tr: "kısa boylu", emoji: "🐛" },
  { pt: "fácil", en: "easy", tr: "kolay", emoji: "🎈" },
  { pt: "difícil", en: "difficult", tr: "zor", emoji: "🧩" },
  // ── Time ─────────────────────────────────────────────────────────────────────
  { pt: "hoje", en: "today", tr: "bugün", emoji: "📅" },
  { pt: "amanhã", en: "tomorrow", tr: "yarın", emoji: "🌅" },
  { pt: "ontem", en: "yesterday", tr: "dün", emoji: "⏮️" },
  { pt: "manhã", en: "morning", tr: "sabah", emoji: "🌄" },
  { pt: "tarde", en: "afternoon", tr: "öğleden sonra", emoji: "🌇" },
  { pt: "noite", en: "night / evening", tr: "gece / akşam", emoji: "🌙" },
  { pt: "dia", en: "day", tr: "gün", emoji: "☀️" },
  { pt: "semana", en: "week", tr: "hafta", emoji: "📆" },
  { pt: "mês", en: "month", tr: "ay", emoji: "📅" },
  { pt: "ano", en: "year", tr: "yıl", emoji: "🎊" },
  { pt: "hora", en: "hour / time", tr: "saat", emoji: "⏰" },
  // ── Weather ──────────────────────────────────────────────────────────────────
  { pt: "sol", en: "sun", tr: "güneş", emoji: "☀️" },
  { pt: "chuva", en: "rain", tr: "yağmur", emoji: "🌧️" },
  { pt: "neve", en: "snow", tr: "kar", emoji: "❄️" },
  { pt: "vento", en: "wind", tr: "rüzgar", emoji: "💨" },
  { pt: "nuvem", en: "cloud", tr: "bulut", emoji: "☁️" },
  { pt: "tempo", en: "weather", tr: "hava durumu", emoji: "🌤️" },
  // ── Common phrases ───────────────────────────────────────────────────────────
  { pt: "olá", en: "hello", tr: "merhaba", emoji: "👋" },
  { pt: "adeus", en: "goodbye", tr: "hoşça kal", emoji: "👋" },
  { pt: "obrigado", en: "thank you (m)", tr: "teşekkür ederim", emoji: "🙏" },
  { pt: "obrigada", en: "thank you (f)", tr: "teşekkür ederim", emoji: "🙏" },
  { pt: "por favor", en: "please", tr: "lütfen", emoji: "🙏" },
  { pt: "desculpe", en: "sorry / excuse me", tr: "özür dilerim / affedersiniz", emoji: "😔" },
  { pt: "sim", en: "yes", tr: "evet", emoji: "✅" },
  { pt: "não", en: "no", tr: "hayır", emoji: "❌" },
  { pt: "está bem", en: "okay / alright", tr: "tamam", emoji: "👌" },
  { pt: "com licença", en: "excuse me", tr: "affedersiniz", emoji: "🚶" },
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
  // Greeting the teacher
  { pt: "Bom dia, professora!", en: "Good morning, teacher!", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "☀️" },
  { pt: "Boa tarde, professor!", en: "Good afternoon, teacher!", mainEmoji: "👨‍🏫", bgLeft: "🏫", bgRight: "🌤️" },
  { pt: "Olá, professora!", en: "Hello, teacher!", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "👋" },
  { pt: "Até logo, professora!", en: "Goodbye, teacher!", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "👋" },
  // Greeting classmates
  { pt: "Olá! Como te chamas?", en: "Hi! What is your name?", mainEmoji: "🙋", bgLeft: "🏫", bgRight: "👋" },
  { pt: "Olá! Eu chamo-me Ana.", en: "Hi! My name is Ana.", mainEmoji: "👧", bgLeft: "🏫", bgRight: "😊" },
  { pt: "Bom dia! Tudo bem?", en: "Good morning! All good?", mainEmoji: "😊", bgLeft: "☀️", bgRight: "🏫" },
  { pt: "Estou bem, obrigado!", en: "I am fine, thank you!", mainEmoji: "😊", bgLeft: "🏫", bgRight: "👍" },
  { pt: "Até amanhã!", en: "See you tomorrow!", mainEmoji: "👋", bgLeft: "🏫", bgRight: "🌙" },
  // Introducing yourself
  { pt: "Eu tenho seis anos.", en: "I am six years old.", mainEmoji: "🧒", bgLeft: "🏫", bgRight: "🎂" },
  { pt: "Eu sou o João.", en: "I am João.", mainEmoji: "👦", bgLeft: "🏫", bgRight: "✏️" },
  { pt: "Eu moro em Lisboa.", en: "I live in Lisbon.", mainEmoji: "🏠", bgLeft: "🏫", bgRight: "🗺️" },
  { pt: "Eu gosto de ler.", en: "I like reading.", mainEmoji: "📖", bgLeft: "🏫", bgRight: "😊" },
  // Answering simple classroom questions
  { pt: "Sim, professora.", en: "Yes, teacher.", mainEmoji: "✋", bgLeft: "🏫", bgRight: "📚" },
  { pt: "Não sei.", en: "I don't know.", mainEmoji: "🤷", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Estou pronto.", en: "I am ready.", mainEmoji: "👍", bgLeft: "📚", bgRight: "✏️" },
  { pt: "Já acabei.", en: "I am done.", mainEmoji: "✅", bgLeft: "📓", bgRight: "✏️" },
  { pt: "Não, professora.", en: "No, teacher.", mainEmoji: "🙅", bgLeft: "🏫", bgRight: "📚" },
  // Asking what something means
  { pt: "O que é isso?", en: "What is that?", mainEmoji: "🤔", bgLeft: "🏫", bgRight: "❓" },
  { pt: "O que significa esta palavra?", en: "What does this word mean?", mainEmoji: "📖", bgLeft: "✏️", bgRight: "❓" },
  { pt: "Como se diz em português?", en: "How do you say it in Portuguese?", mainEmoji: "💬", bgLeft: "🏫", bgRight: "❓" },
  // Asking to repeat
  { pt: "Pode repetir, por favor?", en: "Can you repeat, please?", mainEmoji: "🙏", bgLeft: "🏫", bgRight: "👂" },
  { pt: "Pode dizer outra vez?", en: "Can you say it again?", mainEmoji: "😕", bgLeft: "🏫", bgRight: "🔄" },
  { pt: "Mais devagar, por favor.", en: "Slower, please.", mainEmoji: "🐢", bgLeft: "🏫", bgRight: "👂" },
  // Saying you don't understand
  { pt: "Não percebi.", en: "I didn't understand.", mainEmoji: "😕", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Não entendo.", en: "I don't understand.", mainEmoji: "😕", bgLeft: "🏫", bgRight: "💭" },
  // Asking for help
  { pt: "Pode ajudar-me, por favor?", en: "Can you help me, please?", mainEmoji: "🙋", bgLeft: "📚", bgRight: "🤝" },
  { pt: "Preciso de ajuda.", en: "I need help.", mainEmoji: "🙋", bgLeft: "🏫", bgRight: "🤝" },
  // Asking where something is
  { pt: "Onde está o meu livro?", en: "Where is my book?", mainEmoji: "📖", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Onde está o meu caderno?", en: "Where is my notebook?", mainEmoji: "📓", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Onde está o meu lápis?", en: "Where is my pencil?", mainEmoji: "✏️", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Onde é a casa de banho?", en: "Where is the bathroom?", mainEmoji: "🚻", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Posso ir à casa de banho?", en: "May I go to the bathroom?", mainEmoji: "🚻", bgLeft: "🏫", bgRight: "👩‍🏫" },
  // Talking to a friend
  { pt: "Posso sentar aqui?", en: "Can I sit here?", mainEmoji: "🧒", bgLeft: "🏫", bgRight: "🪑" },
  { pt: "És meu amigo?", en: "Are you my friend?", mainEmoji: "🤝", bgLeft: "😊", bgRight: "🏫" },
  { pt: "Posso ver o teu livro?", en: "Can I see your book?", mainEmoji: "📖", bgLeft: "👦", bgRight: "👧" },
  { pt: "Gosto de ti!", en: "I like you!", mainEmoji: "😄", bgLeft: "🏫", bgRight: "❤️" },
  // Talking at lunch
  { pt: "Eu gosto do almoço.", en: "I like lunch.", mainEmoji: "🍱", bgLeft: "🥗", bgRight: "😋" },
  { pt: "Posso comer aqui?", en: "Can I eat here?", mainEmoji: "🍽️", bgLeft: "🏫", bgRight: "😊" },
  { pt: "Isto é bom!", en: "This is good!", mainEmoji: "😋", bgLeft: "🍱", bgRight: "👍" },
  { pt: "Tenho fome.", en: "I am hungry.", mainEmoji: "🍽️", bgLeft: "🥗", bgRight: "😄" },
  // Talking at break time
  { pt: "Vamos brincar juntos?", en: "Shall we play together?", mainEmoji: "⚽", bgLeft: "🏫", bgRight: "😄" },
  { pt: "Eu gosto do recreio.", en: "I like break time.", mainEmoji: "🏃", bgLeft: "⚽", bgRight: "🌳" },
  { pt: "É a minha vez!", en: "It is my turn!", mainEmoji: "🙋", bgLeft: "⚽", bgRight: "😄" },
  { pt: "Queres jogar comigo?", en: "Do you want to play with me?", mainEmoji: "😊", bgLeft: "⚽", bgRight: "🌳" },
  // Talking in the playground
  { pt: "Posso jogar contigo?", en: "Can I play with you?", mainEmoji: "🙂", bgLeft: "🏫", bgRight: "⚽" },
  { pt: "Vamos correr!", en: "Let's run!", mainEmoji: "🏃", bgLeft: "🌳", bgRight: "⚽" },
  { pt: "Apanha-me!", en: "Catch me!", mainEmoji: "🏃", bgLeft: "🌳", bgRight: "😄" },
  { pt: "Vamos para o baloiço!", en: "Let's go to the swing!", mainEmoji: "🛝", bgLeft: "🌳", bgRight: "😄" },
  // Talking about feelings at school
  { pt: "Estou feliz.", en: "I am happy.", mainEmoji: "😄", bgLeft: "🏫", bgRight: "⭐" },
  { pt: "Estou nervoso.", en: "I am nervous.", mainEmoji: "😬", bgLeft: "🏫", bgRight: "💭" },
  { pt: "Estou triste.", en: "I am sad.", mainEmoji: "😢", bgLeft: "🏫", bgRight: "💭" },
  { pt: "Estou com sono.", en: "I am sleepy.", mainEmoji: "😴", bgLeft: "🏫", bgRight: "💭" },
  { pt: "Gosto desta escola.", en: "I like this school.", mainEmoji: "🏫", bgLeft: "⭐", bgRight: "😊" },
  // Teacher commands
  { pt: "Sentem-se, por favor.", en: "Sit down, please.", mainEmoji: "🪑", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Levantem-se!", en: "Stand up!", mainEmoji: "🧍", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Abram o livro.", en: "Open your book.", mainEmoji: "📖", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Fechem o caderno.", en: "Close your notebook.", mainEmoji: "📓", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Olhem para o quadro.", en: "Look at the board.", mainEmoji: "🖊️", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Escrevam o vosso nome.", en: "Write your name.", mainEmoji: "✏️", bgLeft: "📓", bgRight: "👩‍🏫" },
  { pt: "Levantem o braço.", en: "Raise your hand.", mainEmoji: "✋", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Façam silêncio, por favor.", en: "Be quiet, please.", mainEmoji: "🤫", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Ouçam com atenção.", en: "Listen carefully.", mainEmoji: "👂", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Repitam depois de mim.", en: "Repeat after me.", mainEmoji: "🔄", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Venham cá, por favor.", en: "Come here, please.", mainEmoji: "👋", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Façam uma fila.", en: "Line up.", mainEmoji: "🚶", bgLeft: "🏫", bgRight: "👩‍🏫" },
  // Borrowing and classroom items
  { pt: "Posso pedir um lápis emprestado?", en: "Can I borrow a pencil?", mainEmoji: "✏️", bgLeft: "🏫", bgRight: "🙏" },
  { pt: "Tens uma borracha?", en: "Do you have a rubber?", mainEmoji: "🧒", bgLeft: "✏️", bgRight: "❓" },
  { pt: "Em que página estamos?", en: "What page are we on?", mainEmoji: "📖", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Qual é o exercício?", en: "Which exercise is it?", mainEmoji: "📓", bgLeft: "✏️", bgRight: "❓" },
  // Emotions and apologies
  { pt: "Desculpa, foi sem querer.", en: "Sorry, it was an accident.", mainEmoji: "😢", bgLeft: "🏫", bgRight: "🤝" },
  { pt: "O teu trabalho é muito bonito!", en: "Your work is very nice!", mainEmoji: "⭐", bgLeft: "🏫", bgRight: "😊" },
  { pt: "Esqueci-me do caderno em casa.", en: "I forgot my notebook at home.", mainEmoji: "😬", bgLeft: "🏫", bgRight: "📓" },
  // Sou de
  { pt: "Sou do Brasil.", en: "I am from Brazil.", mainEmoji: "🌍", bgLeft: "🏫", bgRight: "😊" },
  { pt: "Falo português e inglês.", en: "I speak Portuguese and English.", mainEmoji: "💬", bgLeft: "🏫", bgRight: "😊" },
  ],

  restaurant: [
    // Arriving
    { pt: "Boa tarde! Uma mesa para dois, por favor.", en: "Good afternoon! A table for two, please.", mainEmoji: "🍽️", bgLeft: "👨‍🍳", bgRight: "🪑" },
    { pt: "Uma mesa para quatro pessoas, por favor.", en: "A table for four people, please.", mainEmoji: "🪑", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Olá! Temos uma reserva.", en: "Hello! We have a reservation.", mainEmoji: "😊", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    // Menu
    { pt: "Pode trazer a ementa, por favor?", en: "Can you bring the menu, please?", mainEmoji: "📋", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "O que é o prato do dia?", en: "What is the dish of the day?", mainEmoji: "🤔", bgLeft: "🍽️", bgRight: "❓" },
    { pt: "O que me recomenda?", en: "What do you recommend?", mainEmoji: "🤔", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Este prato tem glúten?", en: "Does this dish contain gluten?", mainEmoji: "❓", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "O que é isto?", en: "What is this?", mainEmoji: "❓", bgLeft: "📋", bgRight: "🍽️" },
    // Ordering starters
    { pt: "Para começar, quero uma sopa.", en: "To start, I would like a soup.", mainEmoji: "🍲", bgLeft: "🥄", bgRight: "😋" },
    { pt: "Quero uma salada, por favor.", en: "I would like a salad, please.", mainEmoji: "🥗", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    // Ordering mains
    { pt: "Para mim, o frango grelhado.", en: "For me, the grilled chicken.", mainEmoji: "🍗", bgLeft: "🍽️", bgRight: "😋" },
    { pt: "Quero o peixe do dia, por favor.", en: "I would like the fish of the day, please.", mainEmoji: "🐟", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Uma massa com queijo, por favor.", en: "A pasta with cheese, please.", mainEmoji: "🍝", bgLeft: "🧀", bgRight: "😋" },
    // Ordering drinks
    { pt: "Quero um sumo de laranja, por favor.", en: "I would like an orange juice, please.", mainEmoji: "🍊", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Pode trazer mais água, por favor?", en: "Can you bring more water, please?", mainEmoji: "💧", bgLeft: "🍽️", bgRight: "🥤" },
    { pt: "Um leite com chocolate, por favor.", en: "A chocolate milk, please.", mainEmoji: "🥛", bgLeft: "🍫", bgRight: "😋" },
    // Ordering dessert
    { pt: "Quero um gelado de baunilha.", en: "I would like a vanilla ice cream.", mainEmoji: "🍦", bgLeft: "🍽️", bgRight: "😋" },
    { pt: "Tem bolo de chocolate?", en: "Do you have chocolate cake?", mainEmoji: "🎂", bgLeft: "🍽️", bgRight: "❓" },
    // Extras and changes
    { pt: "Pode trazer mais pão, por favor?", en: "Can you bring more bread, please?", mainEmoji: "🍞", bgLeft: "🧈", bgRight: "👨‍🍳" },
    { pt: "Quero mudar o meu pedido.", en: "I would like to change my order.", mainEmoji: "🔄", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Quanto tempo demora?", en: "How long will it take?", mainEmoji: "⏱️", bgLeft: "🍽️", bgRight: "❓" },
    // Reactions
    { pt: "Está muito bom!", en: "This is very good!", mainEmoji: "😋", bgLeft: "🍽️", bgRight: "👍" },
    { pt: "Não gosto disto.", en: "I don't like this.", mainEmoji: "😕", bgLeft: "🍽️", bgRight: "👎" },
    { pt: "Está muito quente.", en: "It is very hot.", mainEmoji: "🔥", bgLeft: "🍽️", bgRight: "😬" },
    { pt: "Estava delicioso!", en: "It was delicious!", mainEmoji: "😋", bgLeft: "🍴", bgRight: "⭐" },
    // Bill and leaving
    { pt: "A conta, por favor.", en: "The bill, please.", mainEmoji: "💳", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Posso pagar com cartão?", en: "Can I pay by card?", mainEmoji: "💳", bgLeft: "🍽️", bgRight: "❓" },
    { pt: "Já acabei, obrigado.", en: "I have finished, thank you.", mainEmoji: "✅", bgLeft: "🍽️", bgRight: "😊" },
    { pt: "Onde é a casa de banho?", en: "Where is the bathroom?", mainEmoji: "🚻", bgLeft: "🍽️", bgRight: "❓" },
    { pt: "Obrigado! Foi muito bom.", en: "Thank you! It was very good.", mainEmoji: "😊", bgLeft: "🍽️", bgRight: "👋" },
  ],

  bank: [
    // Greeting
    { pt: "Bom dia! Pode ajudar-me?", en: "Good morning! Can you help me?", mainEmoji: "😊", bgLeft: "🏦", bgRight: "👋" },
    { pt: "Boa tarde! Preciso de ajuda.", en: "Good afternoon! I need help.", mainEmoji: "🙋", bgLeft: "🏦", bgRight: "🤝" },
    // ATM and hours
    { pt: "Onde fica a caixa multibanco?", en: "Where is the ATM?", mainEmoji: "🏧", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Como funciona a caixa multibanco?", en: "How does the ATM work?", mainEmoji: "🏧", bgLeft: "🏦", bgRight: "❓" },
    { pt: "A que horas abre o banco?", en: "What time does the bank open?", mainEmoji: "🕘", bgLeft: "🏦", bgRight: "❓" },
    { pt: "A que horas fecha o banco?", en: "What time does the bank close?", mainEmoji: "🕔", bgLeft: "🏦", bgRight: "❓" },
    // Waiting in line
    { pt: "Posso tirar uma senha, por favor?", en: "Can I take a number ticket, please?", mainEmoji: "🎫", bgLeft: "🏦", bgRight: "👨‍💼" },
    { pt: "Quanto tempo tenho de esperar?", en: "How long do I have to wait?", mainEmoji: "⏳", bgLeft: "🏦", bgRight: "❓" },
    // Transactions
    { pt: "Quero levantar dinheiro.", en: "I want to withdraw money.", mainEmoji: "💵", bgLeft: "🏦", bgRight: "💳" },
    { pt: "Quero depositar dinheiro.", en: "I want to deposit money.", mainEmoji: "🏦", bgLeft: "💵", bgRight: "👨‍💼" },
    { pt: "Quero abrir uma conta bancária.", en: "I want to open a bank account.", mainEmoji: "🏦", bgLeft: "📋", bgRight: "👨‍💼" },
    { pt: "Qual é o saldo da minha conta?", en: "What is the balance of my account?", mainEmoji: "💰", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Pode dar-me um recibo, por favor?", en: "Can you give me a receipt, please?", mainEmoji: "🧾", bgLeft: "🏦", bgRight: "👨‍💼" },
    { pt: "Preciso de um extrato bancário.", en: "I need a bank statement.", mainEmoji: "📄", bgLeft: "🏦", bgRight: "👨‍💼" },
    // Understanding forms
    { pt: "O que significa esta palavra?", en: "What does this word mean?", mainEmoji: "📝", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Pode explicar mais devagar?", en: "Can you explain more slowly?", mainEmoji: "🐢", bgLeft: "🏦", bgRight: "👂" },
    { pt: "Não percebi. Pode repetir?", en: "I didn't understand. Can you repeat?", mainEmoji: "😕", bgLeft: "🏦", bgRight: "🔄" },
    { pt: "Onde assino?", en: "Where do I sign?", mainEmoji: "✍️", bgLeft: "🏦", bgRight: "📝" },
    { pt: "Onde é a casa de banho?", en: "Where is the bathroom?", mainEmoji: "🚻", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "🏦", bgRight: "😊" },
  ],

  hospital: [
    // Checking in
    { pt: "Bom dia! Tenho uma consulta.", en: "Good morning! I have an appointment.", mainEmoji: "📋", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "O meu nome é Tomás.", en: "My name is Tomás.", mainEmoji: "🧒", bgLeft: "🏥", bgRight: "📋" },
    { pt: "Tenho sete anos.", en: "I am seven years old.", mainEmoji: "🎂", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "Onde é a sala de espera?", en: "Where is the waiting room?", mainEmoji: "❓", bgLeft: "🏥", bgRight: "🪑" },
    { pt: "Quanto tempo tenho de esperar?", en: "How long do I have to wait?", mainEmoji: "⏳", bgLeft: "🏥", bgRight: "❓" },
    { pt: "A minha data de nascimento é dois de março.", en: "My date of birth is the second of March.", mainEmoji: "📅", bgLeft: "🏥", bgRight: "📋" },
    // Saying where it hurts
    { pt: "A minha barriga dói.", en: "My tummy hurts.", mainEmoji: "🤒", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "A minha cabeça dói muito.", en: "My head hurts a lot.", mainEmoji: "🤕", bgLeft: "🏥", bgRight: "💊" },
    { pt: "A minha garganta dói.", en: "My throat hurts.", mainEmoji: "😣", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "O meu ouvido dói.", en: "My ear hurts.", mainEmoji: "👂", bgLeft: "🏥", bgRight: "💊" },
    { pt: "A minha perna dói.", en: "My leg hurts.", mainEmoji: "🦵", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "Tenho febre.", en: "I have a fever.", mainEmoji: "🌡️", bgLeft: "🏥", bgRight: "💊" },
    { pt: "Tenho tosse.", en: "I have a cough.", mainEmoji: "😷", bgLeft: "🏥", bgRight: "💊" },
    { pt: "Não consigo dormir.", en: "I cannot sleep.", mainEmoji: "😴", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "Sinto-me muito mal.", en: "I feel very sick.", mainEmoji: "🤢", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    // Doctor instructions
    { pt: "Abra a boca, por favor.", en: "Open your mouth, please.", mainEmoji: "👩‍⚕️", bgLeft: "🏥", bgRight: "💡" },
    { pt: "Respire fundo.", en: "Take a deep breath.", mainEmoji: "💨", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    // Questions and feelings
    { pt: "Preciso de tomar um medicamento?", en: "Do I need to take a medicine?", mainEmoji: "💊", bgLeft: "🏥", bgRight: "❓" },
    { pt: "Quantos dias preciso de descansar?", en: "How many days do I need to rest?", mainEmoji: "🛏️", bgLeft: "🏥", bgRight: "❓" },
    { pt: "Posso voltar à escola?", en: "Can I go back to school?", mainEmoji: "🏫", bgLeft: "🏥", bgRight: "❓" },
    { pt: "Onde fica a farmácia?", en: "Where is the pharmacy?", mainEmoji: "💊", bgLeft: "🏥", bgRight: "❓" },
    { pt: "Estou com medo.", en: "I am scared.", mainEmoji: "😨", bgLeft: "🏥", bgRight: "🤝" },
    { pt: "Obrigado, doutora!", en: "Thank you, doctor!", mainEmoji: "😊", bgLeft: "🏥", bgRight: "❤️" },
  ],

  cafe: [
    // Greeting
    { pt: "Bom dia! Uma mesa para dois, por favor.", en: "Good morning! A table for two, please.", mainEmoji: "😊", bgLeft: "☕", bgRight: "🪑" },
    { pt: "Preferem dentro ou fora?", en: "Do you prefer inside or outside?", mainEmoji: "🌞", bgLeft: "☕", bgRight: "🪑" },
    // Ordering coffee
    { pt: "Um café, por favor.", en: "A coffee, please.", mainEmoji: "☕", bgLeft: "🥐", bgRight: "👩‍🍳" },
    { pt: "Um galão e uma torrada, por favor.", en: "A galão and a toast, please.", mainEmoji: "☕", bgLeft: "🥐", bgRight: "👩‍🍳" },
    { pt: "Um meia de leite, por favor.", en: "A meia de leite, please.", mainEmoji: "☕", bgLeft: "🥛", bgRight: "👩‍🍳" },
    // Other drinks
    { pt: "Um chá de limão, por favor.", en: "A lemon tea, please.", mainEmoji: "🍵", bgLeft: "☕", bgRight: "😊" },
    { pt: "Um chocolate quente, por favor.", en: "A hot chocolate, please.", mainEmoji: "🍫", bgLeft: "☕", bgRight: "😋" },
    { pt: "Um sumo de laranja, por favor.", en: "An orange juice, please.", mainEmoji: "🍊", bgLeft: "☕", bgRight: "😊" },
    // Snacks
    { pt: "Uma tosta mista, por favor.", en: "A ham and cheese toastie, please.", mainEmoji: "🥪", bgLeft: "☕", bgRight: "😋" },
    { pt: "Um pastel de nata, por favor.", en: "A custard tart, please.", mainEmoji: "🥐", bgLeft: "☕", bgRight: "😋" },
    { pt: "O que têm para comer?", en: "What do you have to eat?", mainEmoji: "❓", bgLeft: "☕", bgRight: "👩‍🍳" },
    // Asking questions
    { pt: "Tem leite no café?", en: "Does the coffee have milk?", mainEmoji: "🥛", bgLeft: "☕", bgRight: "❓" },
    { pt: "Qual é a senha do Wi-Fi?", en: "What is the Wi-Fi password?", mainEmoji: "📶", bgLeft: "☕", bgRight: "❓" },
    { pt: "Onde é a casa de banho?", en: "Where is the bathroom?", mainEmoji: "🚻", bgLeft: "☕", bgRight: "❓" },
    { pt: "Quanto custa um galão?", en: "How much does a galão cost?", mainEmoji: "❓", bgLeft: "☕", bgRight: "🪙" },
    // Feedback and paying
    { pt: "O café está muito quente.", en: "The coffee is very hot.", mainEmoji: "🔥", bgLeft: "☕", bgRight: "😬" },
    { pt: "Está muito bom!", en: "It is very good!", mainEmoji: "😋", bgLeft: "☕", bgRight: "⭐" },
    { pt: "A conta, por favor.", en: "The bill, please.", mainEmoji: "🧾", bgLeft: "☕", bgRight: "👩‍🍳" },
    { pt: "Posso pagar com cartão?", en: "Can I pay by card?", mainEmoji: "💳", bgLeft: "☕", bgRight: "👩‍🍳" },
    { pt: "Pode dar-me um recibo?", en: "Can you give me a receipt?", mainEmoji: "🧾", bgLeft: "☕", bgRight: "👩‍🍳" },
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "☕", bgRight: "😊" },
  ],
  airport: [
    // Check-in
    { pt: "Onde é o check-in, por favor?", en: "Where is the check-in, please?", mainEmoji: "🧳", bgLeft: "✈️", bgRight: "❓" },
    { pt: "Aqui está o meu bilhete.", en: "Here is my ticket.", mainEmoji: "🎫", bgLeft: "✈️", bgRight: "👨‍✈️" },
    { pt: "Temos duas malas para despachar.", en: "We have two bags to check in.", mainEmoji: "🧳", bgLeft: "✈️", bgRight: "👨‍✈️" },
    { pt: "A minha mala está muito pesada.", en: "My bag is very heavy.", mainEmoji: "😬", bgLeft: "🧳", bgRight: "⚖️" },
    { pt: "Onde deixamos a bagagem?", en: "Where do we drop off the luggage?", mainEmoji: "🧳", bgLeft: "✈️", bgRight: "❓" },
    { pt: "Onde é o controlo de segurança?", en: "Where is the security check?", mainEmoji: "🔍", bgLeft: "✈️", bgRight: "❓" },
    // Gate and boarding
    { pt: "Onde é o nosso portão?", en: "Where is our gate?", mainEmoji: "✈️", bgLeft: "🛫", bgRight: "❓" },
    { pt: "A que horas começa o embarque?", en: "When does boarding start?", mainEmoji: "⏰", bgLeft: "✈️", bgRight: "❓" },
    { pt: "O nosso avião parte em breve.", en: "Our plane leaves soon.", mainEmoji: "🛫", bgLeft: "⏰", bgRight: "✈️" },
    { pt: "Podemos embarcar já?", en: "Can we board now?", mainEmoji: "🎫", bgLeft: "✈️", bgRight: "👨‍✈️" },
    // Airport amenities
    { pt: "Onde é a casa de banho?", en: "Where is the bathroom?", mainEmoji: "🚻", bgLeft: "✈️", bgRight: "❓" },
    { pt: "Estou com fome. Onde há um café?", en: "I am hungry. Where is a café?", mainEmoji: "😋", bgLeft: "✈️", bgRight: "☕" },
    // On the plane
    { pt: "Posso sentar à janela?", en: "Can I sit by the window?", mainEmoji: "🪟", bgLeft: "✈️", bgRight: "😄" },
    { pt: "Quanto tempo dura o voo?", en: "How long is the flight?", mainEmoji: "⏱️", bgLeft: "✈️", bgRight: "❓" },
    { pt: "Pode trazer-me água, por favor?", en: "Can you bring me water, please?", mainEmoji: "💧", bgLeft: "✈️", bgRight: "👨‍✈️" },
    { pt: "Sinto-me mal no avião.", en: "I feel sick on the plane.", mainEmoji: "🤢", bgLeft: "✈️", bgRight: "👨‍✈️" },
    // Arrival
    { pt: "Onde se levanta a bagagem?", en: "Where do we collect the luggage?", mainEmoji: "🧳", bgLeft: "🛬", bgRight: "❓" },
    { pt: "Onde é a paragem de táxi?", en: "Where is the taxi stop?", mainEmoji: "🚕", bgLeft: "🛬", bgRight: "❓" },
    { pt: "Estou muito contente por voar!", en: "I am very happy to fly!", mainEmoji: "😄", bgLeft: "✈️", bgRight: "⭐" },
    { pt: "Adeus! Boa viagem.", en: "Goodbye! Have a good trip.", mainEmoji: "👋", bgLeft: "✈️", bgRight: "❤️" },
  ],

  market: [
    // Greeting and navigation
    { pt: "Bom dia! Pode ajudar-me?", en: "Good morning! Can you help me?", mainEmoji: "😊", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Onde está o pão?", en: "Where is the bread?", mainEmoji: "🍞", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Onde fica a secção de frutas?", en: "Where is the fruit section?", mainEmoji: "🍎", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Onde está o leite?", en: "Where is the milk?", mainEmoji: "🥛", bgLeft: "🛒", bgRight: "❓" },
    // Asking about products
    { pt: "Quanto custa um quilo de maçãs?", en: "How much does a kilo of apples cost?", mainEmoji: "🍎", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Tem laranjas frescas?", en: "Do you have fresh oranges?", mainEmoji: "🍊", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "É fresco ou congelado?", en: "Is it fresh or frozen?", mainEmoji: "❓", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Quando expira?", en: "When does it expire?", mainEmoji: "📅", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Tem alguma oferta hoje?", en: "Do you have any offers today?", mainEmoji: "🏷️", bgLeft: "🛒", bgRight: "🏪" },
    // Ordering amounts
    { pt: "Quero dois quilos de tomates.", en: "I would like two kilos of tomatoes.", mainEmoji: "🍅", bgLeft: "🛒", bgRight: "👩‍🌾" },
    { pt: "Pode dar-me um litro de leite?", en: "Can you give me a litre of milk?", mainEmoji: "🥛", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Só quero um, obrigado.", en: "I only want one, thank you.", mainEmoji: "☝️", bgLeft: "🛒", bgRight: "😊" },
    { pt: "Não quero este, obrigado.", en: "I don't want this one, thank you.", mainEmoji: "🙅", bgLeft: "🛒", bgRight: "😊" },
    // Price and paying
    { pt: "Está muito caro.", en: "It is very expensive.", mainEmoji: "💰", bgLeft: "🛒", bgRight: "😕" },
    { pt: "Aceitam cartão?", en: "Do you accept card?", mainEmoji: "💳", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Pode dar-me um saco, por favor?", en: "Can you give me a bag, please?", mainEmoji: "🛍️", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Pode dar-me um recibo?", en: "Can you give me a receipt?", mainEmoji: "🧾", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Esqueci-me de qualquer coisa.", en: "I forgot something.", mainEmoji: "😬", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Aqui está o dinheiro.", en: "Here is the money.", mainEmoji: "💵", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Tem troco?", en: "Do you have change?", mainEmoji: "🪙", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "🛒", bgRight: "😊" },
  ],

  aima: [
    // Greeting and arrival
    { pt: "Bom dia! Tenho uma marcação.", en: "Good morning! I have an appointment.", mainEmoji: "📋", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "A minha marcação é para as dez horas.", en: "My appointment is at ten o'clock.", mainEmoji: "🕙", bgLeft: "🏛️", bgRight: "📋" },
    // Identity
    { pt: "O meu nome é Sofia.", en: "My name is Sofia.", mainEmoji: "🧒", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "A minha data de nascimento é cinco de junho.", en: "My date of birth is the fifth of June.", mainEmoji: "📅", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "Sou do Brasil.", en: "I am from Brazil.", mainEmoji: "🌍", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "A minha nacionalidade é brasileira.", en: "My nationality is Brazilian.", mainEmoji: "🌍", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "Venho pedir a autorização de residência.", en: "I am here to apply for a residence permit.", mainEmoji: "📄", bgLeft: "🏛️", bgRight: "👨‍💼" },
    // Waiting
    { pt: "Onde devo esperar?", en: "Where should I wait?", mainEmoji: "🪑", bgLeft: "🏛️", bgRight: "❓" },
    { pt: "Quanto tempo tenho de esperar?", en: "How long do I have to wait?", mainEmoji: "⏳", bgLeft: "🏛️", bgRight: "❓" },
    // Understanding
    { pt: "Não percebi. Pode repetir?", en: "I didn't understand. Can you repeat?", mainEmoji: "😕", bgLeft: "🏛️", bgRight: "🔄" },
    { pt: "Pode falar mais devagar?", en: "Can you speak more slowly?", mainEmoji: "🐢", bgLeft: "🏛️", bgRight: "👂" },
    { pt: "Pode escrever, por favor?", en: "Can you write it down, please?", mainEmoji: "✍️", bgLeft: "🏛️", bgRight: "📝" },
    { pt: "Preciso de um intérprete.", en: "I need an interpreter.", mainEmoji: "🗣️", bgLeft: "🏛️", bgRight: "👨‍💼" },
    // Documents
    { pt: "Onde entrego os documentos?", en: "Where do I hand in the documents?", mainEmoji: "📄", bgLeft: "🏛️", bgRight: "❓" },
    { pt: "Quais documentos são necessários?", en: "Which documents are needed?", mainEmoji: "📋", bgLeft: "🏛️", bgRight: "❓" },
    { pt: "Tenho todos os documentos.", en: "I have all the documents.", mainEmoji: "✅", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "Falta-me um documento.", en: "I am missing one document.", mainEmoji: "😟", bgLeft: "🏛️", bgRight: "📄" },
    { pt: "Preciso de um formulário.", en: "I need a form.", mainEmoji: "📝", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "Qual é o próximo passo?", en: "What is the next step?", mainEmoji: "❓", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "Quando devo voltar?", en: "When should I come back?", mainEmoji: "📅", bgLeft: "🏛️", bgRight: "❓" },
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "🏛️", bgRight: "😊" },
  ],

  bus: [
    // At the bus stop
    { pt: "Bom dia, senhor motorista!", en: "Good morning, driver!", mainEmoji: "👋", bgLeft: "🚌", bgRight: "☀️" },
    { pt: "Este autocarro vai para o centro?", en: "Does this bus go to the centre?", mainEmoji: "🚌", bgLeft: "🛑", bgRight: "❓" },
    { pt: "Qual é o número do autocarro para o hospital?", en: "What is the bus number to the hospital?", mainEmoji: "🚌", bgLeft: "🛑", bgRight: "❓" },
    { pt: "Onde é a paragem de autocarro?", en: "Where is the bus stop?", mainEmoji: "🛑", bgLeft: "🚌", bgRight: "❓" },
    { pt: "A que horas chega o próximo autocarro?", en: "When does the next bus arrive?", mainEmoji: "⏰", bgLeft: "🚌", bgRight: "❓" },
    { pt: "De quanto em quanto tempo passa o autocarro?", en: "How often does the bus run?", mainEmoji: "🕐", bgLeft: "🚌", bgRight: "❓" },
    // Tickets
    { pt: "Um bilhete, por favor.", en: "One ticket, please.", mainEmoji: "🎫", bgLeft: "🚌", bgRight: "👨‍✈️" },
    { pt: "Quanto custa o bilhete?", en: "How much does the ticket cost?", mainEmoji: "💰", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Onde valido o bilhete?", en: "Where do I validate the ticket?", mainEmoji: "🎫", bgLeft: "🚌", bgRight: "❓" },
    // On the bus
    { pt: "Este lugar está livre?", en: "Is this seat free?", mainEmoji: "🪑", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Quantas paragens faltam?", en: "How many stops are left?", mainEmoji: "🗺️", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Pode parar aqui, por favor?", en: "Can you stop here, please?", mainEmoji: "✋", bgLeft: "🚌", bgRight: "👨‍✈️" },
    { pt: "Quero sair na próxima paragem.", en: "I want to get off at the next stop.", mainEmoji: "🚶", bgLeft: "🚌", bgRight: "🛑" },
    { pt: "Apanhei o autocarro errado.", en: "I took the wrong bus.", mainEmoji: "😟", bgLeft: "🚌", bgRight: "🗺️" },
    { pt: "Onde posso apanhar o metro?", en: "Where can I take the metro?", mainEmoji: "🚇", bgLeft: "🚌", bgRight: "❓" },
    { pt: "O autocarro circula ao domingo?", en: "Does the bus run on Sunday?", mainEmoji: "📅", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Obrigado! Boa viagem.", en: "Thank you! Safe travels.", mainEmoji: "😊", bgLeft: "🚌", bgRight: "👋" },
  ],

  pharmacy: [
    // Greeting
    { pt: "Bom dia! Pode ajudar-me?", en: "Good morning! Can you help me?", mainEmoji: "💊", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    // Prescriptions
    { pt: "Tenho receita médica.", en: "I have a prescription.", mainEmoji: "📋", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Quero este medicamento, por favor.", en: "I would like this medicine, please.", mainEmoji: "💊", bgLeft: "📋", bgRight: "👩‍⚕️" },
    { pt: "Este medicamento precisa de receita?", en: "Does this medicine need a prescription?", mainEmoji: "❓", bgLeft: "💊", bgRight: "👩‍⚕️" },
    // Symptoms
    { pt: "Tem alguma coisa para a febre?", en: "Do you have something for fever?", mainEmoji: "🌡️", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Tem alguma coisa para a tosse?", en: "Do you have something for a cough?", mainEmoji: "😷", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Tem alguma coisa para a dor de cabeça?", en: "Do you have something for a headache?", mainEmoji: "🤕", bgLeft: "💊", bgRight: "❓" },
    { pt: "Tenho dor de garganta.", en: "I have a sore throat.", mainEmoji: "😣", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "O meu ouvido dói.", en: "My ear hurts.", mainEmoji: "👂", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Tenho dores no estômago.", en: "I have stomach pain.", mainEmoji: "🤢", bgLeft: "💊", bgRight: "👩‍⚕️" },
    // First aid
    { pt: "Preciso de um penso rápido.", en: "I need a plaster.", mainEmoji: "🩹", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Tem creme antisséptico?", en: "Do you have antiseptic cream?", mainEmoji: "🧴", bgLeft: "💊", bgRight: "❓" },
    { pt: "Preciso de protetor solar.", en: "I need sunscreen.", mainEmoji: "☀️", bgLeft: "💊", bgRight: "👩‍⚕️" },
    // Safety and dosage
    { pt: "É seguro para crianças?", en: "Is it safe for children?", mainEmoji: "🧒", bgLeft: "💊", bgRight: "❓" },
    { pt: "Tem efeitos secundários?", en: "Are there side effects?", mainEmoji: "❓", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Quantas vezes por dia?", en: "How many times a day?", mainEmoji: "🕐", bgLeft: "💊", bgRight: "❓" },
    { pt: "Posso tomar com comida?", en: "Can I take it with food?", mainEmoji: "🍽️", bgLeft: "💊", bgRight: "❓" },
    // Price and recommendation
    { pt: "Quanto custa?", en: "How much does it cost?", mainEmoji: "💰", bgLeft: "💊", bgRight: "❓" },
    { pt: "Tem um genérico mais barato?", en: "Do you have a cheaper generic?", mainEmoji: "💰", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "O que me recomenda?", en: "What do you recommend?", mainEmoji: "🤔", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "💊", bgRight: "😊" },
  ],

  gas_station: [
    // Fuel
    { pt: "Bom dia! Pode encher o depósito?", en: "Good morning! Can you fill up the tank?", mainEmoji: "⛽", bgLeft: "🚗", bgRight: "👨‍🔧" },
    { pt: "Vinte euros de gasolina, por favor.", en: "Twenty euros of petrol, please.", mainEmoji: "⛽", bgLeft: "💵", bgRight: "🚗" },
    { pt: "Este carro usa gasóleo ou gasolina?", en: "Does this car use diesel or petrol?", mainEmoji: "❓", bgLeft: "⛽", bgRight: "🚗" },
    { pt: "Qual é o preço por litro?", en: "What is the price per litre?", mainEmoji: "💰", bgLeft: "⛽", bgRight: "❓" },
    // Paying
    { pt: "Bomba número três, por favor.", en: "Pump number three, please.", mainEmoji: "⛽", bgLeft: "🚗", bgRight: "👨‍🔧" },
    { pt: "Onde se paga?", en: "Where do you pay?", mainEmoji: "💳", bgLeft: "⛽", bgRight: "❓" },
    { pt: "Posso pagar com cartão?", en: "Can I pay by card?", mainEmoji: "💳", bgLeft: "⛽", bgRight: "👨‍🔧" },
    { pt: "Só aceitam dinheiro?", en: "Do you only accept cash?", mainEmoji: "💵", bgLeft: "⛽", bgRight: "❓" },
    { pt: "Pode dar-me um recibo?", en: "Can you give me a receipt?", mainEmoji: "🧾", bgLeft: "⛽", bgRight: "👨‍🔧" },
    // Amenities
    { pt: "Onde é a casa de banho, por favor?", en: "Where is the bathroom, please?", mainEmoji: "🚻", bgLeft: "⛽", bgRight: "❓" },
    { pt: "Tem loja aqui?", en: "Do you have a shop here?", mainEmoji: "🏪", bgLeft: "⛽", bgRight: "❓" },
    { pt: "Quero um café e uma sandes.", en: "I would like a coffee and a sandwich.", mainEmoji: "☕", bgLeft: "⛽", bgRight: "🏪" },
    { pt: "Onde fica a bomba de ar?", en: "Where is the air pump?", mainEmoji: "🔧", bgLeft: "⛽", bgRight: "❓" },
    { pt: "Tem lavagem de carro?", en: "Do you have a car wash?", mainEmoji: "🚗", bgLeft: "⛽", bgRight: "💧" },
    // Directions and goodbye
    { pt: "Pode dizer-me como chegar à autoestrada?", en: "Can you tell me how to get to the motorway?", mainEmoji: "🛣️", bgLeft: "⛽", bgRight: "🗺️" },
    { pt: "Há algum mecânico perto?", en: "Is there a mechanic nearby?", mainEmoji: "🔧", bgLeft: "🚗", bgRight: "❓" },
    { pt: "Obrigado! Boa viagem.", en: "Thank you! Safe travels.", mainEmoji: "👋", bgLeft: "⛽", bgRight: "🚗" },
  ],

  traffic: [
    // Journey questions
    { pt: "Já estamos quase lá?", en: "Are we nearly there yet?", mainEmoji: "🚗", bgLeft: "🛣️", bgRight: "❓" },
    { pt: "Quanto tempo falta?", en: "How long is left?", mainEmoji: "⏱️", bgLeft: "🚗", bgRight: "❓" },
    { pt: "Quantos quilómetros faltam?", en: "How many kilometres are left?", mainEmoji: "🗺️", bgLeft: "🚗", bgRight: "❓" },
    { pt: "Há muito trânsito hoje.", en: "There is a lot of traffic today.", mainEmoji: "🚦", bgLeft: "🚗", bgRight: "😕" },
    { pt: "Há um engarrafamento.", en: "There is a traffic jam.", mainEmoji: "🚗", bgLeft: "🚦", bgRight: "😕" },
    { pt: "Estou aborrecido. Podemos ouvir música?", en: "I am bored. Can we listen to music?", mainEmoji: "😑", bgLeft: "🚗", bgRight: "🎵" },
    // Stops and needs
    { pt: "Preciso de parar urgentemente.", en: "I need to stop urgently.", mainEmoji: "✋", bgLeft: "🚗", bgRight: "🛑" },
    { pt: "Preciso de ir à casa de banho.", en: "I need to go to the bathroom.", mainEmoji: "🚻", bgLeft: "🚗", bgRight: "❗" },
    { pt: "Estou enjoado.", en: "I feel sick.", mainEmoji: "🤢", bgLeft: "🚗", bgRight: "💨" },
    { pt: "Posso beber água?", en: "Can I have some water?", mainEmoji: "💧", bgLeft: "🚗", bgRight: "🥤" },
    // Parking
    { pt: "Onde podemos estacionar?", en: "Where can we park?", mainEmoji: "🅿️", bgLeft: "🚗", bgRight: "❓" },
    { pt: "O estacionamento é pago?", en: "Is parking paid?", mainEmoji: "💰", bgLeft: "🅿️", bgRight: "❓" },
    // Fuel
    { pt: "O carro precisa de gasolina.", en: "The car needs petrol.", mainEmoji: "⛽", bgLeft: "🚗", bgRight: "😬" },
    // Directions
    { pt: "O que significa este sinal?", en: "What does this sign mean?", mainEmoji: "🛑", bgLeft: "🚗", bgRight: "❓" },
    { pt: "Siga em frente.", en: "Go straight ahead.", mainEmoji: "⬆️", bgLeft: "🚗", bgRight: "🛣️" },
    { pt: "Vire à direita aqui.", en: "Turn right here.", mainEmoji: "➡️", bgLeft: "🚗", bgRight: "🗺️" },
    { pt: "Vire à esquerda.", en: "Turn left.", mainEmoji: "⬅️", bgLeft: "🚗", bgRight: "🗺️" },
    { pt: "Perdemos a saída.", en: "We missed the exit.", mainEmoji: "😬", bgLeft: "🚗", bgRight: "🗺️" },
    { pt: "Estamos perdidos.", en: "We are lost.", mainEmoji: "😟", bgLeft: "🚗", bgRight: "🗺️" },
    // Safety
    { pt: "O cinto de segurança está posto.", en: "The seatbelt is on.", mainEmoji: "🔒", bgLeft: "🚗", bgRight: "✅" },
    { pt: "Põe o cinto, por favor.", en: "Put on your seatbelt, please.", mainEmoji: "🔒", bgLeft: "🚗", bgRight: "👩‍👦" },
    { pt: "Há um radar ali.", en: "There is a speed camera there.", mainEmoji: "📷", bgLeft: "🚗", bgRight: "⚠️" },
    { pt: "Vejo uma ambulância!", en: "I see an ambulance!", mainEmoji: "🚑", bgLeft: "🚗", bgRight: "🚨" },
    { pt: "O sinal está vermelho.", en: "The light is red.", mainEmoji: "🔴", bgLeft: "🚦", bgRight: "🚗" },
    { pt: "Que paisagem bonita!", en: "What a beautiful landscape!", mainEmoji: "🌄", bgLeft: "🚗", bgRight: "😄" },
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
