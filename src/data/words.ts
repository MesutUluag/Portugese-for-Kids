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
  // Greeting the teacher — child speaks
  { pt: "Bom dia, professora!", en: "Good morning, teacher!", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "☀️" },
  { pt: "Boa tarde, professor!", en: "Good afternoon, teacher!", mainEmoji: "👨‍🏫", bgLeft: "🏫", bgRight: "🌤️" },
  // Greeting the teacher — teacher replies
  { pt: "Bom dia! Podem sentar.", en: "Good morning! You may sit down.", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "🪑" },
  { pt: "Boa tarde, meninos! Tudo bem?", en: "Good afternoon, children! All good?", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "😊" },
  // Greeting classmates — child speaks
  { pt: "Olá! Como te chamas?", en: "Hi! What is your name?", mainEmoji: "🙋", bgLeft: "🏫", bgRight: "👋" },
  { pt: "Bom dia! Tudo bem?", en: "Good morning! All good?", mainEmoji: "😊", bgLeft: "☀️", bgRight: "🏫" },
  // Classmate replies
  { pt: "Chamo-me Pedro. E tu?", en: "My name is Pedro. And you?", mainEmoji: "👦", bgLeft: "🏫", bgRight: "😊" },
  { pt: "Estou bem, obrigado! E tu?", en: "I am fine, thank you! And you?", mainEmoji: "😊", bgLeft: "🏫", bgRight: "👍" },
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
  { pt: "Muito bem! Boa resposta.", en: "Very good! Great answer.", mainEmoji: "⭐", bgLeft: "👩‍🏫", bgRight: "😊" },
  { pt: "Quase! Tenta outra vez.", en: "Almost! Try again.", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "🔄" },
  { pt: "Sim, está correto!", en: "Yes, that is correct!", mainEmoji: "✅", bgLeft: "👩‍🏫", bgRight: "⭐" },
  // Asking what something means — child speaks
  { pt: "O que significa esta palavra, professora?", en: "What does this word mean, teacher?", mainEmoji: "📖", bgLeft: "✏️", bgRight: "❓" },
  { pt: "Como se escreve em português?", en: "How do you write it in Portuguese?", mainEmoji: "✏️", bgLeft: "🏫", bgRight: "❓" },
  // Teacher explains
  { pt: "Significa 'olá' em inglês — quer dizer hello.", en: "It means 'hello' in English — it is the word olá.", mainEmoji: "👩‍🏫", bgLeft: "💬", bgRight: "📖" },
  { pt: "Escreve-se assim, no quadro.", en: "It is written like this, on the board.", mainEmoji: "🖊️", bgLeft: "👩‍🏫", bgRight: "🏫" },
  // Asking to repeat — child speaks
  { pt: "Pode repetir, se faz favor?", en: "Can you repeat, please?", mainEmoji: "🙏", bgLeft: "🏫", bgRight: "👂" },
  { pt: "Mais devagar, por favor.", en: "Slower, please.", mainEmoji: "🐢", bgLeft: "🏫", bgRight: "👂" },
  { pt: "Não percebi, professora.", en: "I didn't understand, teacher.", mainEmoji: "😕", bgLeft: "🏫", bgRight: "❓" },
  // Teacher replies to confusion
  { pt: "Claro! Vou repetir mais devagar.", en: "Of course! I will repeat more slowly.", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "👂" },
  { pt: "Vamos fazer juntos, passo a passo.", en: "Let's do it together, step by step.", mainEmoji: "🤝", bgLeft: "👩‍🏫", bgRight: "📖" },
  // Asking for help — child speaks
  { pt: "Pode ajudar-me, se faz favor?", en: "Can you help me, please?", mainEmoji: "🙋", bgLeft: "📚", bgRight: "🤝" },
  { pt: "Não consigo fazer este exercício.", en: "I can't do this exercise.", mainEmoji: "😟", bgLeft: "📓", bgRight: "✏️" },
  // Teacher helps
  { pt: "Claro, vem cá e eu ajudo-te.", en: "Of course, come here and I will help you.", mainEmoji: "👩‍🏫", bgLeft: "📚", bgRight: "🤝" },
  // Borrowing — child to classmate
  { pt: "Tens uma borracha para me emprestar?", en: "Do you have a rubber to lend me?", mainEmoji: "🧒", bgLeft: "✏️", bgRight: "❓" },
  { pt: "Posso usar o teu lápis um momento?", en: "Can I use your pencil for a moment?", mainEmoji: "✏️", bgLeft: "👦", bgRight: "👧" },
  // Classmate replies to borrowing
  { pt: "Sim, toma!", en: "Yes, here you go!", mainEmoji: "😊", bgLeft: "✏️", bgRight: "👍" },
  { pt: "Claro, fica com ela.", en: "Sure, keep it.", mainEmoji: "😊", bgLeft: "✏️", bgRight: "🤝" },
  // Page and exercise — child speaks
  { pt: "Em que página estamos, professora?", en: "What page are we on, teacher?", mainEmoji: "📖", bgLeft: "🏫", bgRight: "❓" },
  { pt: "Qual é o exercício seguinte?", en: "What is the next exercise?", mainEmoji: "📓", bgLeft: "✏️", bgRight: "❓" },
  // Teacher replies
  { pt: "Estamos na página vinte e três.", en: "We are on page twenty-three.", mainEmoji: "📖", bgLeft: "👩‍🏫", bgRight: "✏️" },
  { pt: "Abram o livro na página dez.", en: "Open your books to page ten.", mainEmoji: "📖", bgLeft: "🏫", bgRight: "👩‍🏫" },
  // Teacher commands
  { pt: "Façam silêncio, por favor!", en: "Be quiet, please!", mainEmoji: "🤫", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Levantem o braço quem sabe a resposta.", en: "Raise your hand if you know the answer.", mainEmoji: "✋", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Repitam depois de mim, com atenção.", en: "Repeat after me, carefully.", mainEmoji: "🔄", bgLeft: "🏫", bgRight: "👩‍🏫" },
  { pt: "Façam uma fila junto à porta.", en: "Line up by the door.", mainEmoji: "🚶", bgLeft: "🏫", bgRight: "👩‍🏫" },
  // Feelings — child speaks
  { pt: "Estou nervoso, professora.", en: "I am nervous, teacher.", mainEmoji: "😬", bgLeft: "🏫", bgRight: "💭" },
  { pt: "Estou triste porque me esqueci do lanche.", en: "I am sad because I forgot my snack.", mainEmoji: "😢", bgLeft: "🏫", bgRight: "🍱" },
  // Teacher responds to feelings
  { pt: "Não faz mal, acontece a todos.", en: "Never mind, it happens to everyone.", mainEmoji: "👩‍🏫", bgLeft: "🏫", bgRight: "🤝" },
  { pt: "Respira fundo, vai correr bem.", en: "Take a deep breath, it will go well.", mainEmoji: "💨", bgLeft: "👩‍🏫", bgRight: "😊" },
  // Break and playground — child speaks
  { pt: "Posso jogar contigo no recreio?", en: "Can I play with you at break time?", mainEmoji: "⚽", bgLeft: "🏫", bgRight: "🌳" },
  { pt: "Vamos para o baloiço juntos!", en: "Let's go to the swing together!", mainEmoji: "🛝", bgLeft: "🌳", bgRight: "😄" },
  // Classmate replies in playground
  { pt: "Sim! Vamos apanhar-nos!", en: "Yes! Let's play catch!", mainEmoji: "🏃", bgLeft: "🌳", bgRight: "😄" },
  { pt: "Claro! Tu começas.", en: "Sure! You go first.", mainEmoji: "😊", bgLeft: "⚽", bgRight: "🌳" },
  // Apologies
  { pt: "Desculpe, professora, foi sem querer.", en: "Sorry, teacher, it was an accident.", mainEmoji: "😢", bgLeft: "🏫", bgRight: "🤝" },
  { pt: "Desculpa, não foi de propósito.", en: "Sorry, it wasn't on purpose.", mainEmoji: "😟", bgLeft: "🏫", bgRight: "🤝" },
  // Forgetting something
  { pt: "Esqueci-me do caderno em casa, professora.", en: "I forgot my notebook at home, teacher.", mainEmoji: "😬", bgLeft: "🏫", bgRight: "📓" },
  { pt: "Amanhã traz, não te esqueças.", en: "Bring it tomorrow, don't forget.", mainEmoji: "👩‍🏫", bgLeft: "📓", bgRight: "⚠️" },
  // Compliments between pupils
  { pt: "O teu desenho é muito bonito!", en: "Your drawing is really nice!", mainEmoji: "⭐", bgLeft: "🎨", bgRight: "😊" },
  { pt: "Obrigado! O teu também é ótimo.", en: "Thank you! Yours is great too.", mainEmoji: "😄", bgLeft: "🎨", bgRight: "⭐" },
  // Bathroom request
  { pt: "Professora, posso ir à casa de banho?", en: "Teacher, may I go to the bathroom?", mainEmoji: "🚻", bgLeft: "🏫", bgRight: "🙋" },
  { pt: "Sim, podes ir. Volta depressa.", en: "Yes, you may go. Come back quickly.", mainEmoji: "👩‍🏫", bgLeft: "🚻", bgRight: "⏱️" },
  ],

  restaurant: [
    // Arriving — customer speaks
    { pt: "Boa tarde! Uma mesa para dois, se faz favor.", en: "Good afternoon! A table for two, please.", mainEmoji: "🍽️", bgLeft: "👨‍🍳", bgRight: "🪑" },
    { pt: "Temos uma reserva em nome de Silva.", en: "We have a reservation under the name Silva.", mainEmoji: "😊", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    // Waiter greets and seats
    { pt: "Boa tarde! Têm reserva?", en: "Good afternoon! Do you have a reservation?", mainEmoji: "👨‍🍳", bgLeft: "🍽️", bgRight: "🪑" },
    { pt: "Sigam-me, por favor. A mesa está aqui.", en: "Follow me, please. The table is here.", mainEmoji: "👨‍🍳", bgLeft: "🪑", bgRight: "🍽️" },
    // Menu — customer speaks
    { pt: "Se faz favor, a ementa!", en: "Excuse me, the menu please!", mainEmoji: "📋", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "O que me recomenda hoje?", en: "What do you recommend today?", mainEmoji: "🤔", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Este prato tem glúten?", en: "Does this dish contain gluten?", mainEmoji: "❓", bgLeft: "📋", bgRight: "👨‍🍳" },
    // Waiter replies about menu
    { pt: "O prato do dia é bacalhau com batatas.", en: "The dish of the day is cod with potatoes.", mainEmoji: "🐟", bgLeft: "👨‍🍳", bgRight: "🍽️" },
    { pt: "Recomendo o frango assado, está ótimo hoje.", en: "I recommend the roast chicken, it's great today.", mainEmoji: "🍗", bgLeft: "👨‍🍳", bgRight: "⭐" },
    { pt: "Não tem glúten, pode comer à vontade.", en: "It has no gluten, you can eat it freely.", mainEmoji: "✅", bgLeft: "👨‍🍳", bgRight: "😊" },
    // Ordering — customer speaks
    { pt: "Para mim, o frango grelhado, se faz favor.", en: "For me, the grilled chicken, please.", mainEmoji: "🍗", bgLeft: "🍽️", bgRight: "😋" },
    { pt: "Para começar, queria uma sopa, se faz favor.", en: "To start, I would like a soup, please.", mainEmoji: "🍲", bgLeft: "🥄", bgRight: "👨‍🍳" },
    { pt: "E para beber, uma jarra de água, se faz favor.", en: "And to drink, a jug of water, please.", mainEmoji: "💧", bgLeft: "🍽️", bgRight: "🥤" },
    { pt: "Um sumo de laranja para a menina, obrigado.", en: "An orange juice for the girl, thank you.", mainEmoji: "🍊", bgLeft: "🍽️", bgRight: "👧" },
    // Waiter takes order and serves
    { pt: "Muito bem! E de seguida?", en: "Very good! And next?", mainEmoji: "👨‍🍳", bgLeft: "📋", bgRight: "✏️" },
    { pt: "Bom proveito!", en: "Enjoy your meal!", mainEmoji: "😊", bgLeft: "👨‍🍳", bgRight: "🍽️" },
    { pt: "Está bem o prato? Precisa de mais alguma coisa?", en: "Is the dish alright? Do you need anything else?", mainEmoji: "👨‍🍳", bgLeft: "🍽️", bgRight: "😊" },
    // Reactions — customer speaks
    { pt: "Está muito bom, obrigado!", en: "It is very good, thank you!", mainEmoji: "😋", bgLeft: "🍽️", bgRight: "👍" },
    { pt: "A sopa está um pouco fria.", en: "The soup is a little cold.", mainEmoji: "🥶", bgLeft: "🍲", bgRight: "😬" },
    { pt: "Estava delicioso! Parabéns ao cozinheiro.", en: "It was delicious! Compliments to the chef.", mainEmoji: "😋", bgLeft: "🍴", bgRight: "⭐" },
    // Waiter responds to complaint
    { pt: "Peço desculpa! Trago outra já já.", en: "I'm sorry! I'll bring another right away.", mainEmoji: "👨‍🍳", bgLeft: "🍲", bgRight: "🔄" },
    // Extras — customer speaks
    { pt: "Pode trazer mais pão, se faz favor?", en: "Can you bring more bread, please?", mainEmoji: "🍞", bgLeft: "🧈", bgRight: "👨‍🍳" },
    { pt: "Quero mudar o meu pedido, se possível.", en: "I would like to change my order, if possible.", mainEmoji: "🔄", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    // Bill — customer speaks
    { pt: "A conta, se faz favor.", en: "The bill, please.", mainEmoji: "🧾", bgLeft: "🍽️", bgRight: "👨‍🍳" },
    { pt: "Posso pagar com o multibanco?", en: "Can I pay by multibanco?", mainEmoji: "💳", bgLeft: "🍽️", bgRight: "❓" },
    // Waiter brings bill
    { pt: "Aqui está a conta. Pagam juntos ou separado?", en: "Here is the bill. Paying together or separately?", mainEmoji: "🧾", bgLeft: "👨‍🍳", bgRight: "💳" },
    { pt: "Pode pagar ali na caixa ou eu trago o terminal.", en: "You can pay at the till or I'll bring the machine.", mainEmoji: "💳", bgLeft: "👨‍🍳", bgRight: "🏧" },
    // Leaving
    { pt: "Obrigado! Foi muito bom. Até à próxima.", en: "Thank you! It was very good. See you next time.", mainEmoji: "😊", bgLeft: "🍽️", bgRight: "👋" },
    { pt: "Obrigado pela visita! Boa tarde.", en: "Thank you for coming! Good afternoon.", mainEmoji: "👨‍🍳", bgLeft: "🍽️", bgRight: "👋" },
  ],

  bank: [
    // Greeting — customer speaks
    { pt: "Bom dia! Queria pedir ajuda, se faz favor.", en: "Good morning! I would like some help, please.", mainEmoji: "😊", bgLeft: "🏦", bgRight: "👋" },
    { pt: "Boa tarde! Tenho uma dúvida sobre a minha conta.", en: "Good afternoon! I have a question about my account.", mainEmoji: "🙋", bgLeft: "🏦", bgRight: "🤝" },
    // Teller greets
    { pt: "Bom dia, em que posso ajudar?", en: "Good morning, how can I help you?", mainEmoji: "👨‍💼", bgLeft: "🏦", bgRight: "😊" },
    { pt: "Qual é o seu número de senha, se faz favor?", en: "What is your ticket number, please?", mainEmoji: "🎫", bgLeft: "👨‍💼", bgRight: "🏦" },
    // Waiting — customer speaks
    { pt: "Onde posso tirar uma senha?", en: "Where can I get a number ticket?", mainEmoji: "🎫", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Quanto tempo tenho de esperar, aproximadamente?", en: "How long do I have to wait, approximately?", mainEmoji: "⏳", bgLeft: "🏦", bgRight: "❓" },
    // Teller answers about wait
    { pt: "São cerca de vinte minutos de espera.", en: "It is about twenty minutes of waiting.", mainEmoji: "⏳", bgLeft: "👨‍💼", bgRight: "🕐" },
    { pt: "A máquina de senhas fica ali à entrada.", en: "The ticket machine is there at the entrance.", mainEmoji: "🎫", bgLeft: "👨‍💼", bgRight: "🏦" },
    // ATM — customer speaks
    { pt: "Onde fica o multibanco, se faz favor?", en: "Where is the multibanco ATM, please?", mainEmoji: "🏧", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Como se usa o multibanco?", en: "How do you use the multibanco?", mainEmoji: "🏧", bgLeft: "🏦", bgRight: "❓" },
    // Teller explains ATM
    { pt: "O multibanco fica mesmo aqui à direita.", en: "The multibanco is right here on the right.", mainEmoji: "🏧", bgLeft: "👨‍💼", bgRight: "➡️" },
    // Transactions — customer speaks
    { pt: "Queria levantar dinheiro, se faz favor.", en: "I would like to withdraw money, please.", mainEmoji: "💵", bgLeft: "🏦", bgRight: "💳" },
    { pt: "Queria depositar este dinheiro na minha conta.", en: "I would like to deposit this money into my account.", mainEmoji: "🏦", bgLeft: "💵", bgRight: "👨‍💼" },
    { pt: "Queria abrir uma conta bancária.", en: "I would like to open a bank account.", mainEmoji: "🏦", bgLeft: "📋", bgRight: "👨‍💼" },
    { pt: "Qual é o saldo da minha conta, por favor?", en: "What is the balance of my account, please?", mainEmoji: "💰", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Preciso de um extracto bancário.", en: "I need a bank statement.", mainEmoji: "📄", bgLeft: "🏦", bgRight: "👨‍💼" },
    // Teller responds to transactions
    { pt: "Precisa de documento de identificação, se faz favor.", en: "I need an ID document, please.", mainEmoji: "👨‍💼", bgLeft: "🏦", bgRight: "📋" },
    { pt: "Quanto quer levantar?", en: "How much would you like to withdraw?", mainEmoji: "👨‍💼", bgLeft: "💵", bgRight: "❓" },
    { pt: "Aqui está o seu extrato. Precisa de mais alguma coisa?", en: "Here is your statement. Do you need anything else?", mainEmoji: "📄", bgLeft: "👨‍💼", bgRight: "😊" },
    // Understanding forms — customer speaks
    { pt: "O que significa este campo no formulário?", en: "What does this field in the form mean?", mainEmoji: "📝", bgLeft: "🏦", bgRight: "❓" },
    { pt: "Pode explicar mais devagar, por favor?", en: "Can you explain more slowly, please?", mainEmoji: "🐢", bgLeft: "🏦", bgRight: "👂" },
    { pt: "Não percebi. Pode repetir?", en: "I didn't understand. Can you repeat?", mainEmoji: "😕", bgLeft: "🏦", bgRight: "🔄" },
    { pt: "Onde assino, por favor?", en: "Where do I sign, please?", mainEmoji: "✍️", bgLeft: "🏦", bgRight: "📝" },
    // Teller explains form
    { pt: "Assine aqui em baixo, obrigado.", en: "Sign here at the bottom, thank you.", mainEmoji: "👨‍💼", bgLeft: "📝", bgRight: "✍️" },
    // Goodbye
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "🏦", bgRight: "😊" },
    { pt: "Tenha um bom dia! Até à próxima.", en: "Have a good day! See you next time.", mainEmoji: "👨‍💼", bgLeft: "🏦", bgRight: "👋" },
  ],

  hospital: [
    // Checking in — patient speaks
    { pt: "Bom dia! Tenho uma consulta marcada.", en: "Good morning! I have a booked appointment.", mainEmoji: "📋", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "O meu nome é Tomás Silva.", en: "My name is Tomás Silva.", mainEmoji: "🧒", bgLeft: "🏥", bgRight: "📋" },
    { pt: "A minha data de nascimento é dois de março.", en: "My date of birth is the second of March.", mainEmoji: "📅", bgLeft: "🏥", bgRight: "📋" },
    // Receptionist replies
    { pt: "Precisa do cartão de utente, se faz favor.", en: "Can I have your health card, please?", mainEmoji: "👩‍⚕️", bgLeft: "💳", bgRight: "📋" },
    { pt: "Aqui está o meu cartão de utente.", en: "Here is my health card.", mainEmoji: "💳", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "Pode sentar-se na sala de espera, por favor.", en: "Please take a seat in the waiting room.", mainEmoji: "🪑", bgLeft: "👩‍⚕️", bgRight: "🏥" },
    { pt: "O doutor chama-o em breve.", en: "The doctor will call you shortly.", mainEmoji: "⏳", bgLeft: "👩‍⚕️", bgRight: "🏥" },
    // Describing symptoms — patient speaks
    { pt: "Dói-me a garganta, doutora.", en: "My throat hurts, doctor.", mainEmoji: "😣", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "A minha barriga dói muito.", en: "My tummy hurts a lot.", mainEmoji: "🤒", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "Tenho febre desde ontem.", en: "I have had a fever since yesterday.", mainEmoji: "🌡️", bgLeft: "🏥", bgRight: "💊" },
    { pt: "Tenho muita tosse e não consigo dormir.", en: "I have a bad cough and can't sleep.", mainEmoji: "😷", bgLeft: "🏥", bgRight: "💊" },
    { pt: "Sinto-me muito mal desde esta manhã.", en: "I have felt very sick since this morning.", mainEmoji: "🤢", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    { pt: "Estou com medo da injeção, doutora.", en: "I am scared of the injection, doctor.", mainEmoji: "😨", bgLeft: "🏥", bgRight: "💉" },
    // Doctor instructions and replies
    { pt: "Vamos ver. Abra a boca, por favor.", en: "Let's see. Open your mouth, please.", mainEmoji: "👩‍⚕️", bgLeft: "🏥", bgRight: "💡" },
    { pt: "Respire fundo, devagar.", en: "Breathe deeply, slowly.", mainEmoji: "💨", bgLeft: "👩‍⚕️", bgRight: "🏥" },
    { pt: "Não te preocupes, não vai doer.", en: "Don't worry, it won't hurt.", mainEmoji: "👩‍⚕️", bgLeft: "🏥", bgRight: "😊" },
    { pt: "Tens uma infeção na garganta.", en: "You have a throat infection.", mainEmoji: "👩‍⚕️", bgLeft: "🏥", bgRight: "💊" },
    // Questions — patient speaks
    { pt: "Preciso de tomar um medicamento, doutora?", en: "Do I need to take medicine, doctor?", mainEmoji: "💊", bgLeft: "🏥", bgRight: "❓" },
    { pt: "Quantos dias preciso de descansar?", en: "How many days do I need to rest?", mainEmoji: "🛏️", bgLeft: "🏥", bgRight: "❓" },
    { pt: "Posso voltar à escola amanhã?", en: "Can I go back to school tomorrow?", mainEmoji: "🏫", bgLeft: "🏥", bgRight: "❓" },
    // Doctor answers questions
    { pt: "Vais tomar um antibiótico durante cinco dias.", en: "You will take an antibiotic for five days.", mainEmoji: "💊", bgLeft: "👩‍⚕️", bgRight: "📋" },
    { pt: "Descansa dois dias e depois podes ir à escola.", en: "Rest two days and then you can go to school.", mainEmoji: "🛏️", bgLeft: "👩‍⚕️", bgRight: "🏫" },
    { pt: "A farmácia fica mesmo aqui ao lado.", en: "The pharmacy is right next door.", mainEmoji: "💊", bgLeft: "👩‍⚕️", bgRight: "🏥" },
    // Goodbye
    { pt: "Obrigado, doutora! Até à próxima.", en: "Thank you, doctor! See you next time.", mainEmoji: "😊", bgLeft: "🏥", bgRight: "❤️" },
    { pt: "Melhoras! Cuida-te bem.", en: "Get well soon! Take good care.", mainEmoji: "👩‍⚕️", bgLeft: "🏥", bgRight: "❤️" },
  ],

  cafe: [
    // Greeting — customer speaks
    { pt: "Bom dia! Tem mesa para dois?", en: "Good morning! Do you have a table for two?", mainEmoji: "😊", bgLeft: "☕", bgRight: "🪑" },
    { pt: "Preferimos ao balcão, se for possível.", en: "We prefer at the counter, if possible.", mainEmoji: "☕", bgLeft: "🪑", bgRight: "😊" },
    // Barista greets and asks
    { pt: "Bom dia! Diga, se faz favor.", en: "Good morning! Go ahead, please.", mainEmoji: "👩‍🍳", bgLeft: "☕", bgRight: "😊" },
    { pt: "Preferem mesa dentro ou fora?", en: "Do you prefer a table inside or outside?", mainEmoji: "🌞", bgLeft: "☕", bgRight: "🪑" },
    // Ordering — customer speaks
    { pt: "Um galão e uma torrada, se faz favor.", en: "A galão and a toast, please.", mainEmoji: "☕", bgLeft: "🥐", bgRight: "👩‍🍳" },
    { pt: "Um meia de leite e um pastel de nata, obrigado.", en: "A meia de leite and a custard tart, thank you.", mainEmoji: "☕", bgLeft: "🥛", bgRight: "🥐" },
    { pt: "Um chocolate quente para a menina, se faz favor.", en: "A hot chocolate for the girl, please.", mainEmoji: "🍫", bgLeft: "☕", bgRight: "👧" },
    { pt: "Um sumo de laranja natural, se tiver.", en: "A fresh orange juice, if you have it.", mainEmoji: "🍊", bgLeft: "☕", bgRight: "😊" },
    { pt: "Uma tosta mista, se faz favor.", en: "A ham and cheese toastie, please.", mainEmoji: "🥪", bgLeft: "☕", bgRight: "😋" },
    // Barista takes order and confirms
    { pt: "Claro! Mais alguma coisa?", en: "Of course! Anything else?", mainEmoji: "👩‍🍳", bgLeft: "☕", bgRight: "😊" },
    { pt: "O galão fica já, um momento.", en: "The galão is coming right up, one moment.", mainEmoji: "⏱️", bgLeft: "👩‍🍳", bgRight: "☕" },
    { pt: "O pastel de nata está acabado de sair do forno.", en: "The custard tart just came out of the oven.", mainEmoji: "🥐", bgLeft: "👩‍🍳", bgRight: "⭐" },
    // Asking questions — customer speaks
    { pt: "O café tem leite?", en: "Does the coffee have milk?", mainEmoji: "🥛", bgLeft: "☕", bgRight: "❓" },
    { pt: "Qual é a senha do Wi-Fi, se faz favor?", en: "What is the Wi-Fi password, please?", mainEmoji: "📶", bgLeft: "☕", bgRight: "❓" },
    { pt: "Quanto custa um galão?", en: "How much is a galão?", mainEmoji: "❓", bgLeft: "☕", bgRight: "🪙" },
    // Barista replies to questions
    { pt: "O galão tem leite, o abatanado não.", en: "The galão has milk, the abatanado does not.", mainEmoji: "👩‍🍳", bgLeft: "☕", bgRight: "🥛" },
    { pt: "A senha do Wi-Fi está ali no quadro.", en: "The Wi-Fi password is on the board over there.", mainEmoji: "📶", bgLeft: "👩‍🍳", bgRight: "🏪" },
    { pt: "O galão custa um euro e vinte.", en: "The galão costs one euro twenty.", mainEmoji: "🪙", bgLeft: "👩‍🍳", bgRight: "☕" },
    // Feedback — customer speaks
    { pt: "O café está muito bom, obrigado!", en: "The coffee is very good, thank you!", mainEmoji: "😋", bgLeft: "☕", bgRight: "⭐" },
    { pt: "O pastel de nata está delicioso!", en: "The custard tart is delicious!", mainEmoji: "🥐", bgLeft: "😋", bgRight: "⭐" },
    // Bill and paying — customer speaks
    { pt: "A conta, se faz favor.", en: "The bill, please.", mainEmoji: "🧾", bgLeft: "☕", bgRight: "👩‍🍳" },
    { pt: "Posso pagar com MB Way?", en: "Can I pay with MB Way?", mainEmoji: "📱", bgLeft: "☕", bgRight: "💳" },
    // Barista at checkout
    { pt: "Claro, pode pagar com MB Way ou multibanco.", en: "Of course, you can pay with MB Way or multibanco.", mainEmoji: "👩‍🍳", bgLeft: "💳", bgRight: "📱" },
    { pt: "São dois euros e quarenta, obrigada.", en: "That is two euros forty, thank you.", mainEmoji: "🪙", bgLeft: "👩‍🍳", bgRight: "☕" },
    // Goodbye
    { pt: "Obrigado! Até amanhã.", en: "Thank you! See you tomorrow.", mainEmoji: "👋", bgLeft: "☕", bgRight: "😊" },
    { pt: "Boa tarde! Até logo.", en: "Good afternoon! Goodbye.", mainEmoji: "👩‍🍳", bgLeft: "☕", bgRight: "👋" },
  ],
  airport: [
    // Check-in — traveller speaks
    { pt: "Bom dia! Onde é o check-in da TAP?", en: "Good morning! Where is the TAP check-in?", mainEmoji: "🧳", bgLeft: "✈️", bgRight: "❓" },
    { pt: "Temos duas malas para despachar.", en: "We have two bags to check in.", mainEmoji: "🧳", bgLeft: "✈️", bgRight: "👨‍✈️" },
    { pt: "A minha mala está muito pesada.", en: "My bag is very heavy.", mainEmoji: "😬", bgLeft: "🧳", bgRight: "⚖️" },
    // Check-in staff replies
    { pt: "O seu passaporte ou bilhete de identidade, se faz favor.", en: "Your passport or ID card, please.", mainEmoji: "👨‍✈️", bgLeft: "✈️", bgRight: "📋" },
    { pt: "A sua mala tem vinte e dois quilos, está dentro do limite.", en: "Your bag weighs twenty-two kilos, it is within the limit.", mainEmoji: "⚖️", bgLeft: "👨‍✈️", bgRight: "✅" },
    { pt: "Aqui está o seu cartão de embarque. Porta trinta e dois.", en: "Here is your boarding pass. Gate thirty-two.", mainEmoji: "🎫", bgLeft: "👨‍✈️", bgRight: "✈️" },
    // Security and gate — traveller speaks
    { pt: "Onde é o controlo de segurança?", en: "Where is the security check?", mainEmoji: "🔍", bgLeft: "✈️", bgRight: "❓" },
    { pt: "Onde é o nosso portão?", en: "Where is our gate?", mainEmoji: "✈️", bgLeft: "🛫", bgRight: "❓" },
    { pt: "A que horas começa o embarque?", en: "When does boarding start?", mainEmoji: "⏰", bgLeft: "✈️", bgRight: "❓" },
    // Staff replies at gate
    { pt: "O controlo de segurança fica ao fundo à esquerda.", en: "Security is at the back on the left.", mainEmoji: "👨‍✈️", bgLeft: "🔍", bgRight: "⬅️" },
    { pt: "O embarque começa daqui a vinte minutos.", en: "Boarding starts in twenty minutes.", mainEmoji: "⏰", bgLeft: "👨‍✈️", bgRight: "✈️" },
    { pt: "O voo está atrasado trinta minutos, pedimos desculpa.", en: "The flight is delayed thirty minutes, we apologise.", mainEmoji: "⏳", bgLeft: "👨‍✈️", bgRight: "😬" },
    // On the plane — traveller speaks
    { pt: "Com licença, posso sentar à janela?", en: "Excuse me, can I sit by the window?", mainEmoji: "🪟", bgLeft: "✈️", bgRight: "😄" },
    { pt: "Pode trazer-me água, se faz favor?", en: "Can you bring me water, please?", mainEmoji: "💧", bgLeft: "✈️", bgRight: "👨‍✈️" },
    { pt: "Sinto-me mal. Pode ajudar-me?", en: "I feel sick. Can you help me?", mainEmoji: "🤢", bgLeft: "✈️", bgRight: "👨‍✈️" },
    { pt: "Quanto tempo falta para aterrarmos?", en: "How long until we land?", mainEmoji: "⏱️", bgLeft: "✈️", bgRight: "❓" },
    // Flight attendant replies
    { pt: "Claro, trago já a água.", en: "Of course, I'll bring the water right away.", mainEmoji: "👨‍✈️", bgLeft: "💧", bgRight: "✈️" },
    { pt: "Falta mais ou menos uma hora de voo.", en: "There is about one hour of flight left.", mainEmoji: "👨‍✈️", bgLeft: "⏱️", bgRight: "✈️" },
    // Arrival — traveller speaks
    { pt: "Onde se levanta a bagagem?", en: "Where do we collect the luggage?", mainEmoji: "🧳", bgLeft: "🛬", bgRight: "❓" },
    { pt: "Onde é a paragem de táxi?", en: "Where is the taxi stop?", mainEmoji: "🚕", bgLeft: "🛬", bgRight: "❓" },
    // Farewell
    { pt: "Obrigado! Boa viagem.", en: "Thank you! Have a good trip.", mainEmoji: "👋", bgLeft: "✈️", bgRight: "❤️" },
    { pt: "Boa viagem! Até à próxima.", en: "Have a good trip! See you next time.", mainEmoji: "👨‍✈️", bgLeft: "✈️", bgRight: "👋" },
  ],

  market: [
    // Greeting — customer speaks
    { pt: "Bom dia! Pode ajudar-me a encontrar as maçãs?", en: "Good morning! Can you help me find the apples?", mainEmoji: "😊", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Onde fica a secção de frutas e legumes?", en: "Where is the fruit and vegetable section?", mainEmoji: "🍎", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Onde está o pão e os laticínios?", en: "Where is the bread and dairy?", mainEmoji: "🍞", bgLeft: "🛒", bgRight: "❓" },
    // Shopkeeper replies to navigation
    { pt: "As frutas ficam no fundo, à direita.", en: "The fruit is at the back, on the right.", mainEmoji: "🏪", bgLeft: "🍎", bgRight: "➡️" },
    { pt: "O pão está mesmo ali, na segunda prateleira.", en: "The bread is right there, on the second shelf.", mainEmoji: "🍞", bgLeft: "🏪", bgRight: "👆" },
    // Asking about products — customer speaks
    { pt: "Quanto é o quilo de maçãs?", en: "How much is a kilo of apples?", mainEmoji: "🍎", bgLeft: "🛒", bgRight: "❓" },
    { pt: "Tem laranjas frescas hoje?", en: "Do you have fresh oranges today?", mainEmoji: "🍊", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "É fresco ou congelado?", en: "Is it fresh or frozen?", mainEmoji: "❓", bgLeft: "🛒", bgRight: "🏪" },
    { pt: "Tem alguma promoção hoje?", en: "Do you have any promotions today?", mainEmoji: "🏷️", bgLeft: "🛒", bgRight: "🏪" },
    // Shopkeeper replies about products
    { pt: "O quilo de maçãs custa um euro e cinquenta.", en: "A kilo of apples costs one euro fifty.", mainEmoji: "🏪", bgLeft: "🍎", bgRight: "🪙" },
    { pt: "Sim, temos laranjas acabadas de chegar.", en: "Yes, we have oranges that just arrived.", mainEmoji: "🍊", bgLeft: "🏪", bgRight: "✅" },
    { pt: "Hoje temos desconto nas bananas.", en: "Today we have a discount on bananas.", mainEmoji: "🏷️", bgLeft: "🏪", bgRight: "🍌" },
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
    { pt: "Sim, aceitamos MB Way e multibanco.", en: "Yes, we accept MB Way and multibanco.", mainEmoji: "📱", bgLeft: "🏪", bgRight: "💳" },
    { pt: "São doze euros e oitenta, se faz favor.", en: "That is twelve euros eighty, please.", mainEmoji: "🪙", bgLeft: "🏪", bgRight: "🛒" },
    // Goodbye
    { pt: "Obrigado! Até à próxima.", en: "Thank you! See you next time.", mainEmoji: "👋", bgLeft: "🛒", bgRight: "😊" },
    { pt: "Até à próxima! Boa semana.", en: "See you next time! Have a good week.", mainEmoji: "🏪", bgLeft: "🛒", bgRight: "👋" },
  ],

  aima: [
    // Greeting — applicant speaks
    { pt: "Bom dia! Tenho uma marcação para as dez horas.", en: "Good morning! I have an appointment at ten o'clock.", mainEmoji: "📋", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "Venho candidatar-me ao visto D7.", en: "I am here to apply for the D7 visa.", mainEmoji: "📄", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "Trabalho remotamente e quero o visto D9.", en: "I work remotely and I want the D9 visa.", mainEmoji: "💻", bgLeft: "🌍", bgRight: "📋" },
    // Officer greets and checks
    { pt: "Bom dia, qual é o motivo da sua visita?", en: "Good morning, what is the reason for your visit?", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "Tem marcação?", en: "Do you have an appointment?", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "📅" },
    { pt: "Pode mostrar o seu passaporte, se faz favor?", en: "Can you show your passport, please?", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "📋" },
    // Identity — applicant speaks
    { pt: "O meu nome é Sofia Pereira e sou turca.", en: "My name is Sofia Pereira and I am Turkish.", mainEmoji: "🌍", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "A minha data de nascimento é cinco de junho.", en: "My date of birth is the fifth of June.", mainEmoji: "📅", bgLeft: "🏛️", bgRight: "📋" },
    { pt: "Tenho o NIF e o contrato de arrendamento registado.", en: "I have the NIF and the registered rental contract.", mainEmoji: "📄", bgLeft: "🏛️", bgRight: "✅" },
    { pt: "Trouxe o extrato bancário dos últimos três meses.", en: "I brought the bank statement from the last three months.", mainEmoji: "📋", bgLeft: "🏛️", bgRight: "👨‍💼" },
    // Officer replies about documents
    { pt: "Falta o registo criminal apostilado, tem de trazer o original.", en: "The apostilled criminal record is missing, you must bring the original.", mainEmoji: "👨‍💼", bgLeft: "📄", bgRight: "⚠️" },
    { pt: "Precisa de uma declaração da empresa a autorizar o trabalho remoto.", en: "You need a declaration from the company authorising remote work.", mainEmoji: "👨‍💼", bgLeft: "💻", bgRight: "📋" },
    { pt: "O seu seguro de saúde tem de cobrir Portugal.", en: "Your health insurance must cover Portugal.", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "💊" },
    // Waiting and understanding — applicant speaks
    { pt: "Quanto tempo tenho de esperar?", en: "How long do I have to wait?", mainEmoji: "⏳", bgLeft: "🏛️", bgRight: "❓" },
    { pt: "Não percebi. Pode repetir mais devagar?", en: "I didn't understand. Can you repeat more slowly?", mainEmoji: "😕", bgLeft: "🏛️", bgRight: "🔄" },
    { pt: "Pode escrever o nome do documento, por favor?", en: "Can you write the name of the document, please?", mainEmoji: "✍️", bgLeft: "🏛️", bgRight: "📝" },
    { pt: "Preciso de um intérprete, se for possível.", en: "I need an interpreter, if possible.", mainEmoji: "🗣️", bgLeft: "🏛️", bgRight: "👨‍💼" },
    // Officer replies about process
    { pt: "A espera é de cerca de quarenta e cinco minutos.", en: "The wait is about forty-five minutes.", mainEmoji: "⏳", bgLeft: "👨‍💼", bgRight: "🕐" },
    { pt: "Quando tiver tudo completo, marque nova consulta no site.", en: "When you have everything complete, book a new appointment on the website.", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "💻" },
    // Next steps — applicant speaks
    { pt: "Qual é o próximo passo depois de entregar os documentos?", en: "What is the next step after submitting the documents?", mainEmoji: "❓", bgLeft: "🏛️", bgRight: "👨‍💼" },
    { pt: "Quando fica pronto o cartão de residência?", en: "When will the residence card be ready?", mainEmoji: "📅", bgLeft: "🏛️", bgRight: "❓" },
    // Officer replies about timeline
    { pt: "O prazo habitual é de sessenta dias úteis.", en: "The usual deadline is sixty working days.", mainEmoji: "👨‍💼", bgLeft: "📅", bgRight: "🏛️" },
    // Goodbye
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "🏛️", bgRight: "😊" },
    { pt: "Boa sorte com o seu processo.", en: "Good luck with your application.", mainEmoji: "👨‍💼", bgLeft: "🏛️", bgRight: "⭐" },
  ],

  bus: [
    // At the bus stop — passenger speaks
    { pt: "Bom dia, senhor motorista! Este autocarro vai para o centro?", en: "Good morning, driver! Does this bus go to the centre?", mainEmoji: "🚌", bgLeft: "🛑", bgRight: "❓" },
    { pt: "Desculpe, qual é o número do autocarro para o hospital?", en: "Excuse me, what is the bus number to the hospital?", mainEmoji: "🚌", bgLeft: "🛑", bgRight: "❓" },
    { pt: "A que horas chega o próximo autocarro?", en: "When does the next bus arrive?", mainEmoji: "⏰", bgLeft: "🚌", bgRight: "❓" },
    // Driver replies at stop
    { pt: "Sim, vai lá. Entre, se faz favor.", en: "Yes, it does. Come in, please.", mainEmoji: "👨‍✈️", bgLeft: "🚌", bgRight: "✅" },
    { pt: "Não, este não vai ao hospital. Apanhe o setecentos e doze.", en: "No, this one doesn't go to the hospital. Take the seven twelve.", mainEmoji: "👨‍✈️", bgLeft: "🚌", bgRight: "🗺️" },
    { pt: "O próximo passa daqui a dez minutos.", en: "The next one comes in ten minutes.", mainEmoji: "⏰", bgLeft: "👨‍✈️", bgRight: "🚌" },
    // Tickets — passenger speaks
    { pt: "Um bilhete simples, se faz favor.", en: "A single ticket, please.", mainEmoji: "🎫", bgLeft: "🚌", bgRight: "👨‍✈️" },
    { pt: "Quanto custa o bilhete para o centro?", en: "How much is the ticket to the centre?", mainEmoji: "💰", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Onde tenho de picar o bilhete?", en: "Where do I need to validate the ticket?", mainEmoji: "🎫", bgLeft: "🚌", bgRight: "❓" },
    // Driver replies about tickets
    { pt: "São um euro e cinquenta, se faz favor.", en: "That is one euro fifty, please.", mainEmoji: "👨‍✈️", bgLeft: "🎫", bgRight: "🪙" },
    { pt: "Pique aqui na máquina à entrada.", en: "Validate here at the machine by the entrance.", mainEmoji: "👨‍✈️", bgLeft: "🎫", bgRight: "✅" },
    { pt: "Tem um Viva Viagem? É mais barato.", en: "Do you have a Viva Viagem card? It is cheaper.", mainEmoji: "👨‍✈️", bgLeft: "💳", bgRight: "🎫" },
    // On the bus — passenger speaks
    { pt: "Com licença, este lugar está livre?", en: "Excuse me, is this seat free?", mainEmoji: "🪑", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Quantas paragens faltam para o centro?", en: "How many stops to the centre?", mainEmoji: "🗺️", bgLeft: "🚌", bgRight: "❓" },
    { pt: "Quero sair na próxima paragem, obrigado.", en: "I want to get off at the next stop, thank you.", mainEmoji: "🚶", bgLeft: "🚌", bgRight: "🛑" },
    { pt: "Apanhei o autocarro errado. Onde devo sair?", en: "I took the wrong bus. Where should I get off?", mainEmoji: "😟", bgLeft: "🚌", bgRight: "🗺️" },
    // Driver and fellow passenger replies on board
    { pt: "Sim, está livre, pode sentar.", en: "Yes, it's free, you can sit.", mainEmoji: "🪑", bgLeft: "🚌", bgRight: "😊" },
    { pt: "Faltam mais três paragens.", en: "Three more stops to go.", mainEmoji: "👨‍✈️", bgLeft: "🗺️", bgRight: "🚌" },
    { pt: "Próxima paragem: Praça do Comércio.", en: "Next stop: Praça do Comércio.", mainEmoji: "📢", bgLeft: "🚌", bgRight: "🛑" },
    { pt: "Saia aqui e apanhe o quinze ali em frente.", en: "Get off here and take the fifteen over there.", mainEmoji: "👨‍✈️", bgLeft: "🚌", bgRight: "➡️" },
    // Goodbye
    { pt: "Obrigado, senhor motorista!", en: "Thank you, driver!", mainEmoji: "😊", bgLeft: "🚌", bgRight: "👋" },
    { pt: "De nada! Boa viagem.", en: "You're welcome! Safe travels.", mainEmoji: "👨‍✈️", bgLeft: "🚌", bgRight: "👋" },
  ],

  pharmacy: [
    // Greeting — customer speaks
    { pt: "Bom dia! Pode ajudar-me, se faz favor?", en: "Good morning! Can you help me, please?", mainEmoji: "💊", bgLeft: "🏥", bgRight: "👩‍⚕️" },
    // Pharmacist greets
    { pt: "Bom dia, minha senhora! Em que posso ajudar?", en: "Good morning, ma'am! How can I help?", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "😊" },
    // Prescriptions — customer speaks
    { pt: "Tenho receita médica para este medicamento.", en: "I have a prescription for this medicine.", mainEmoji: "📋", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Este medicamento precisa de receita?", en: "Does this medicine need a prescription?", mainEmoji: "❓", bgLeft: "💊", bgRight: "👩‍⚕️" },
    // Pharmacist replies about prescription
    { pt: "Sim, este precisa de receita. Tem alguma?", en: "Yes, this one needs a prescription. Do you have one?", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "📋" },
    { pt: "Quer o genérico? É mais barato e tem a mesma substância.", en: "Would you like the generic? It is cheaper and has the same substance.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "💰" },
    // Symptoms — customer speaks
    { pt: "Tem alguma coisa para a febre, se faz favor?", en: "Do you have something for fever, please?", mainEmoji: "🌡️", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "O meu filho tem dor de garganta desde ontem.", en: "My son has had a sore throat since yesterday.", mainEmoji: "😣", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Tem alguma coisa para a tosse seca?", en: "Do you have something for a dry cough?", mainEmoji: "😷", bgLeft: "💊", bgRight: "👩‍⚕️" },
    { pt: "Tenho dores de cabeça há dois dias.", en: "I have had a headache for two days.", mainEmoji: "🤕", bgLeft: "💊", bgRight: "👩‍⚕️" },
    // Pharmacist recommends
    { pt: "Para a febre, o ben-u-ron funciona muito bem.", en: "For fever, ben-u-ron works very well.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "✅" },
    { pt: "Para a dor de cabeça, recomendo o brufen.", en: "For headaches, I recommend brufen.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "✅" },
    { pt: "Para a garganta, os Strepsils são muito bons.", en: "For the throat, Strepsils are very good.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "😊" },
    // Dosage questions — customer speaks
    { pt: "Quantas vezes por dia dá-se à criança?", en: "How many times a day do you give it to a child?", mainEmoji: "🕐", bgLeft: "💊", bgRight: "❓" },
    { pt: "É seguro para uma criança de cinco anos?", en: "Is it safe for a five-year-old child?", mainEmoji: "🧒", bgLeft: "💊", bgRight: "❓" },
    { pt: "Tem efeitos secundários importantes?", en: "Are there any important side effects?", mainEmoji: "❓", bgLeft: "💊", bgRight: "👩‍⚕️" },
    // Pharmacist explains dosage
    { pt: "Dá três vezes por dia, às refeições.", en: "Give it three times a day, with meals.", mainEmoji: "👩‍⚕️", bgLeft: "🍽️", bgRight: "💊" },
    { pt: "Sim, é seguro. Há dosagem pediátrica.", en: "Yes, it is safe. There is a paediatric dosage.", mainEmoji: "👩‍⚕️", bgLeft: "🧒", bgRight: "✅" },
    // Price and insurance
    { pt: "Tem comparticipação do SNS?", en: "Is it covered by the SNS health insurance?", mainEmoji: "💰", bgLeft: "💊", bgRight: "❓" },
    { pt: "Sim, com o cartão de utente tem desconto.", en: "Yes, with the health card you get a discount.", mainEmoji: "👩‍⚕️", bgLeft: "💳", bgRight: "💊" },
    // Goodbye
    { pt: "Obrigado! Até logo.", en: "Thank you! Goodbye.", mainEmoji: "👋", bgLeft: "💊", bgRight: "😊" },
    { pt: "De nada! Melhoras ao seu filho.", en: "You're welcome! Get well soon to your son.", mainEmoji: "👩‍⚕️", bgLeft: "💊", bgRight: "❤️" },
  ],

  gas_station: [
    // Fuel — driver speaks
    { pt: "Bom dia! Queria trinta euros de gasóleo, se faz favor.", en: "Good morning! I would like thirty euros of diesel, please.", mainEmoji: "⛽", bgLeft: "🚗", bgRight: "👨‍🔧" },
    { pt: "Pode encher o depósito, se faz favor?", en: "Can you fill up the tank, please?", mainEmoji: "⛽", bgLeft: "🚗", bgRight: "👨‍🔧" },
    { pt: "Este carro usa gasóleo ou gasolina?", en: "Does this car use diesel or petrol?", mainEmoji: "❓", bgLeft: "⛽", bgRight: "🚗" },
    { pt: "Qual é o preço da gasolina por litro hoje?", en: "What is the price of petrol per litre today?", mainEmoji: "💰", bgLeft: "⛽", bgRight: "❓" },
    // Attendant replies about fuel
    { pt: "Que bomba usou, se faz favor?", en: "Which pump did you use, please?", mainEmoji: "👨‍🔧", bgLeft: "⛽", bgRight: "❓" },
    { pt: "O gasóleo está a um euro e cinquenta e nove.", en: "The diesel is at one euro fifty-nine.", mainEmoji: "💰", bgLeft: "👨‍🔧", bgRight: "⛽" },
    { pt: "O seu carro usa gasolina sem chumbo.", en: "Your car uses unleaded petrol.", mainEmoji: "👨‍🔧", bgLeft: "⛽", bgRight: "✅" },
    // Paying — driver speaks
    { pt: "Bomba número três. Posso pagar com MB Way?", en: "Pump number three. Can I pay with MB Way?", mainEmoji: "📱", bgLeft: "⛽", bgRight: "💳" },
    { pt: "Só aceitam dinheiro ou também cartão?", en: "Do you only accept cash or also card?", mainEmoji: "💵", bgLeft: "⛽", bgRight: "❓" },
    { pt: "Pode dar-me um recibo, se faz favor?", en: "Can you give me a receipt, please?", mainEmoji: "🧾", bgLeft: "⛽", bgRight: "👨‍🔧" },
    // Attendant replies about payment
    { pt: "Aceitamos MB Way, multibanco e numerário.", en: "We accept MB Way, multibanco, and cash.", mainEmoji: "👨‍🔧", bgLeft: "💳", bgRight: "📱" },
    { pt: "São trinta e dois euros e quarenta, obrigado.", en: "That is thirty-two euros forty, thank you.", mainEmoji: "🪙", bgLeft: "👨‍🔧", bgRight: "⛽" },
    // Shop and amenities — driver speaks
    { pt: "Tem loja cá dentro? Queria uma bica.", en: "Do you have a shop inside? I'd like a coffee.", mainEmoji: "☕", bgLeft: "⛽", bgRight: "🏪" },
    { pt: "Onde fica a bomba de ar para os pneus?", en: "Where is the air pump for the tyres?", mainEmoji: "🔧", bgLeft: "⛽", bgRight: "❓" },
    { pt: "Tem lavagem de carro aqui na Galp?", en: "Do you have a car wash here at the Galp?", mainEmoji: "🚗", bgLeft: "⛽", bgRight: "💧" },
    // Attendant replies about amenities
    { pt: "A loja está aberta. Tem sandes e café.", en: "The shop is open. We have sandwiches and coffee.", mainEmoji: "👨‍🔧", bgLeft: "🏪", bgRight: "☕" },
    { pt: "A bomba de ar fica ali ao fundo, é grátis.", en: "The air pump is over there at the back, it's free.", mainEmoji: "👨‍🔧", bgLeft: "🔧", bgRight: "✅" },
    // Directions and goodbye
    { pt: "Pode dizer-me como chegar à A1?", en: "Can you tell me how to get to the A1?", mainEmoji: "🛣️", bgLeft: "⛽", bgRight: "🗺️" },
    { pt: "Siga em frente e entre na autoestrada ali à direita.", en: "Go straight ahead and enter the motorway on the right.", mainEmoji: "👨‍🔧", bgLeft: "🛣️", bgRight: "➡️" },
    { pt: "Obrigado! Boa viagem.", en: "Thank you! Safe travels.", mainEmoji: "👋", bgLeft: "⛽", bgRight: "🚗" },
    { pt: "De nada! Bom regresso.", en: "You're welcome! Safe journey back.", mainEmoji: "👨‍🔧", bgLeft: "⛽", bgRight: "👋" },
  ],

  traffic: [
    // Journey questions — child speaks
    { pt: "Já chegámos? Falta muito?", en: "Are we there yet? Is it much longer?", mainEmoji: "🚗", bgLeft: "🛣️", bgRight: "❓" },
    { pt: "Quanto tempo falta para chegar?", en: "How long until we arrive?", mainEmoji: "⏱️", bgLeft: "🚗", bgRight: "❓" },
    { pt: "Quantos quilómetros faltam ainda?", en: "How many kilometres are left?", mainEmoji: "🗺️", bgLeft: "🚗", bgRight: "❓" },
    { pt: "Estou aborrecido. Posso pôr música?", en: "I am bored. Can I put on some music?", mainEmoji: "😑", bgLeft: "🚗", bgRight: "🎵" },
    // Driver replies to journey questions
    { pt: "Faltam mais ou menos vinte minutos.", en: "About twenty minutes left.", mainEmoji: "🚗", bgLeft: "⏱️", bgRight: "😊" },
    { pt: "Faltam cinquenta quilómetros ainda.", en: "Fifty kilometres still to go.", mainEmoji: "🗺️", bgLeft: "🚗", bgRight: "🛣️" },
    { pt: "Claro, podes escolher uma música.", en: "Sure, you can choose a song.", mainEmoji: "🎵", bgLeft: "🚗", bgRight: "😄" },
    // Traffic — driver speaks
    { pt: "Que trânsito! Há um engarrafamento enorme na IC19.", en: "What traffic! There is a huge jam on the IC19.", mainEmoji: "🚦", bgLeft: "🚗", bgRight: "😩" },
    { pt: "A GPS diz para sair aqui e evitar o engarrafamento.", en: "The GPS says to exit here and avoid the jam.", mainEmoji: "📱", bgLeft: "🚗", bgRight: "🛣️" },
    { pt: "Temos de pagar a portagem. Temos Via Verde?", en: "We need to pay the toll. Do we have Via Verde?", mainEmoji: "🛣️", bgLeft: "🚗", bgRight: "💳" },
    // Passenger replies to traffic
    { pt: "Sim, a Via Verde está no para-brisas.", en: "Yes, the Via Verde is on the windscreen.", mainEmoji: "✅", bgLeft: "💳", bgRight: "🚗" },
    { pt: "A GPS está a recalcular, vai demorar mais dez minutos.", en: "The GPS is recalculating, it will take ten more minutes.", mainEmoji: "📱", bgLeft: "🗺️", bgRight: "⏱️" },
    // Stops and needs — child speaks
    { pt: "Preciso de parar. Tenho de ir à casa de banho.", en: "I need to stop. I need to go to the bathroom.", mainEmoji: "🚻", bgLeft: "🚗", bgRight: "❗" },
    { pt: "Estou enjoado. Pode abrir a janela?", en: "I feel sick. Can you open the window?", mainEmoji: "🤢", bgLeft: "🚗", bgRight: "💨" },
    { pt: "Posso beber um pouco de água?", en: "Can I have a little water?", mainEmoji: "💧", bgLeft: "🚗", bgRight: "🥤" },
    // Driver replies to needs
    { pt: "Vamos parar num posto aqui à frente.", en: "We'll stop at a petrol station just ahead.", mainEmoji: "⛽", bgLeft: "🚗", bgRight: "🛑" },
    { pt: "Abre a janela, fica melhor.", en: "Open the window, you'll feel better.", mainEmoji: "💨", bgLeft: "🚗", bgRight: "😊" },
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
