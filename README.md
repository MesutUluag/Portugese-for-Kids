# 🇵🇹 Portuguese for Kids — Frontend

An interactive language-learning app for children to practice Portuguese through games, flashcards, and AI-generated stories.

**Live app:** [mesutuluag.github.io/Portugese-for-Kids](https://mesutuluag.github.io/Portugese-for-Kids)

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.8 | UI framework |
| TypeScript | 5.8.3 | Type safety |
| Vite | 6.3.5 | Build tool & dev server |
| Firebase Auth | 13.2.0 | Google Sign-In, Email/Password auth & password reset |
| SASS/SCSS | 1.102.0 | Mobile-first responsive styling |
| framer-motion | 13.1.1 | Animations (Market game cart, flying items, confetti) |
| @dnd-kit/core | 6.3.1 | Drag-and-drop primitives (Puzzle game) |
| @dnd-kit/utilities | 3.2.2 | DnD helper utilities |
| lucide-react | 1.34.0 | Icon set |
| gh-pages | 6.3.0 | GitHub Pages deployment |

---

## Features

- **10 Learning Modes** — flashcards, 8 games (including Crossword & Market game), and AI-generated story sentences
- **Tiered Game Scoring & Live Score Badge** — difficulty-scaled points across Level 1 (Easy), Level 2 (Medium), and Level 3 (Master) games with an interactive top-right score badge (`⭐`) and animated `+N` point popups
- **Global Leaderboard & Game Scores Modal** — top-bar Rank pill (`🏆`) opens a bilingual modal featuring real-time global rankings backed by Cloud Firestore and a per-game score breakdown
- **Firebase Authentication & Cloud Stats** — Google Sign-In and Email/Password login gating AI Story Mode and interactive games (Cards mode open for guests), paired with a crash-safe `localStorage` outbox that syncs daily study streaks, per-game time, per-game scores (`scoreByMode`), story scenarios, and a 7-day activity chart to Cloud Firestore
- **Portuguese TTS** — Web Speech API with pt-PT voice detection, slow-mode playback, and Chrome gesture-block workaround
- **AI Story Generation** — backend LLM (Gemini via Cloud Run) with curated per-context template pages as a fallback; 12 real-life conversation contexts
- **Story Prefetch** — first page and its image are fetched at app load so Story mode opens instantly; page 2 is also prefetched while the user reads page 1
- **Conversation History** — up to 10 previous sentences sent to the LLM for coherent back-and-forth dialogue; per-context history persisted in `localStorage`
- **Multi-language UI** — English / Turkish toggle with MyMemory translation for story text
- **Dynamic Scene Themes** — emoji-to-colour mapping drives CSS variables (night, rain, snow, ocean, sunset moods)
- **Daily Study Tracker** — time spent today persisted in `localStorage`, pauses on tab-visibility change
- **Background Music** — 5 kids music tracks with random shuffle, autoplay + first-interaction fallback, mute toggle persisted in `localStorage`
- **Image Fetching** — multi-source chain: backend AI image API → Wikipedia → Wikimedia Commons → emoji fallback
- **Market Game** — Level 1 drag-to-cart shopping game with an animated bunny mascot, flying item animations, confetti burst, and Portuguese number/gender grammar
- **In-App Browser Guard** — detects WhatsApp / Instagram / Telegram WebViews and prompts users to open in Chrome or Safari (Turkish-language UI)

---

## Learning Modes & Scoring Tiers

| Mode | Component | Tier | Scoring Rules | Description |
|---|---|---|---|---|
| 🖼️ Cards | `CardsMode` | — | — | Flashcard vocabulary review with shuffle, search, category filter, and grammar modals (Verbs, Adverbs, Prepositions) |
| 📖 Story | `StoryMode` | — | — | AI-generated conversational story sentences with scene illustrations; 12 real-life contexts |
| 🎯 Picture Game | `Game1` | Level 1 (Easy) | `4–6 pts` (`-2` per wrong guess, min `1`) | Match a Portuguese word to the correct picture (4-choice MCQ) |
| 🎧 Listen & Find | `Game2` | Level 1 (Easy) | `5–7 pts` (`-2` per wrong guess, `-1` per extra replay, min `1`) | Hear a word spoken aloud, select the matching image |
| ✍️ Fill in the Blank | `Game4` | Level 1 (Easy) | `5–7 pts` (`-2` per wrong guess, min `1`) | Complete words with missing letters (supports accented chars: á é í ó ú ã õ ç) |
| 🛒 Market Game | `Game7` | Level 1 (Easy) | `5–7 pts` (`-2` per wrong item, min `1`) | Drag 2 requested grocery items into an animated cart; bunny mascot reacts to answers |
| 🃏 Memory Match | `Game3` | Level 2 (Medium) | `20–25 pts` (`-2` per mismatch after 2 grace tries, min `5`) | Flip cards to match 6 Portuguese–English pairs |
| 🧩 Scramble | `Game5` | Level 2 (Medium) | `13–17 pts` (`-3` per wrong tap, `-4` per hint, min `2`) | Unscramble letters to form the correct Portuguese word; navigation history |
| 🧩 Jigsaw Puzzle | `Game6` | Level 3 (Master) | `30 pts` (`-2` per misplaced piece drop, min `5`) | Canvas-based jigsaw — drag pieces from tray slots onto a 3×3 board |
| ✏️ Crossword | `Game8` | Level 3 (Master) | `10 pts/word` (`-2` check/hint/audio, min `1`) + `25 pts` board bonus | Dynamic Arrowword / Çengel Bulmaca puzzle with category filter & on-screen keyboard |

---

## Story Contexts

12 real-life conversation contexts are available in Story mode. Each maps to a dedicated backend system prompt and a set of template fallback pages.

| Context | Description |
|---|---|
| 🏫 School | Classroom interactions, commands, and greetings |
| 🍽️ Restaurant | Ordering food, asking about the menu, paying the bill |
| 🏦 Bank | Account queries, ATM, forms, and teller interactions |
| 🏥 Hospital | Check-in, describing symptoms, talking to a doctor |
| ☕ Café | Ordering coffee and snacks, asking for Wi-Fi |
| ✈️ Airport | Check-in, security, boarding, and landing |
| 🛒 Market | Finding products, asking prices, paying |
| 🏛️ AIMA | Immigration service — appointments, documents, residency |
| 🚌 Bus | Routes, tickets, stops, and directions |
| 💊 Pharmacy | Prescriptions, medicines, and dosage questions |
| ⛽ Gas Station | Fuelling, paying, and finding services |
| 🚗 Traffic & Cars | In-car conversations, navigation, parking |

---

## Project Structure

```
src/
├── App.tsx                     # Mode router, auth/rank/profile badges, language toggle, music player, study timer, story prefetch
├── index.scss                  # Mobile-first global styles
├── main.tsx                    # Entry point (InAppBrowserGuard + AuthProvider wrap App)
├── auth/
│   ├── AuthContext.tsx         # Firebase Auth provider, token refresh, password reset & profile/modal state
│   ├── AuthModal.tsx           # Bilingual (EN/TR) login, sign-up & password reset dialog
│   ├── LeaderboardModal.tsx    # Bilingual (EN/TR) Global Ranking & My Game Scores breakdown modal
│   ├── LeaderboardModal.scss   # Leaderboard & game score cards styling
│   ├── StatsModal.tsx          # Bilingual (EN/TR) user stats dashboard with 7-day activity chart
│   ├── firebase.ts             # Firebase Web SDK initialisation & getAuthToken helper
│   ├── types.ts                # UserProfile, UserStats, StatsSyncRequest & Leaderboard types
│   └── useStatsTracker.ts      # 1s active study timer, 3m AFK detection & crash-safe outbox sync
├── commons/
│   ├── GameScoreBadge.tsx      # Top-right live session score badge with animated +N popup
│   ├── GameScoreBadge.scss     # Score badge styles & pop animations
│   ├── LoadingSpinner.tsx      # Lazy-load suspense fallback spinner
│   └── WordImage.tsx           # Wikipedia image fetch with emoji fallback
├── components/
│   ├── AdverbsModal.tsx        # Adverbs reference modal (Place, Time, Degree, Frequency, Manner)
│   ├── CardsMode.tsx           # Flashcard grid with search, category filter & grammar modal triggers
│   ├── ConjugationModal.tsx    # Verb conjugation modal (A1/A2 levels, audio, EN/TR examples)
│   ├── Game1.tsx               # Picture Game — word-to-image MCQ (Level 1)
│   ├── Game2.tsx               # Listen & Find — TTS → image MCQ (Level 1)
│   ├── Game3.tsx               # Memory Match — flip-card pairs (Level 2)
│   ├── Game4.tsx               # Fill in the Blank — missing letter MCQ (Level 1)
│   ├── Game5.tsx               # Scramble — unscramble letters; prev/next history (Level 2)
│   ├── Game6.tsx               # Jigsaw Puzzle — canvas drag-and-snap (Level 3)
│   ├── Game7.tsx               # Market Game — drag items to cart; bunny mascot; animations (Level 1)
│   ├── Game8.tsx               # Crossword Puzzle — dynamic Arrowword / Çengel Bulmaca (Level 3)
│   ├── InAppBrowserGuard.tsx   # WhatsApp/Instagram WebView detection + redirect prompt
│   └── PrepositionsModal.tsx   # Prepositions & contractions reference modal
├── data/
│   ├── index.ts                # Barrel exports & Mode / Word / StoryPage / MarketItem types
│   ├── words.ts                # kidsWords vocabulary dataset
│   ├── marketItems.ts          # Market Game items dataset
│   ├── storyTemplates.ts       # templatePagesByContext fallback stories
│   ├── verbConjugations.ts     # A1 & A2 conjugation tables & examples
│   ├── adverbData.ts           # Categorised Portuguese adverbs with examples
│   └── prepGroups.ts           # Prepositions & contractions reference data
├── story/
│   ├── SceneProp.tsx           # Emoji → Wikimedia image mapper
│   ├── StoryIllustration.tsx   # Backend AI illustration + CSS scene fallback
│   ├── StoryMode.tsx           # Story UI, context switcher, prefetch consumer, history navigation
│   ├── StoryMode.scss          # Story-specific styles
│   ├── sceneTheme.ts           # Emoji-to-CSS-variable theme engine (night, rain, snow, ocean, sunset)
│   ├── useBackendImage.ts      # fetchImageBlobUrl — backend image API with retry handling
│   └── useStoryPrefetch.ts     # Image prefetch cache; buildStoryImagePrompt helper
└── utils/
    ├── ai.ts                   # AiState, StoryContext, CONTEXT_TOPICS; backend story fetch + template fallback
    ├── crosswordGenerator.ts   # Conflict-free Arrowword / Crossword grid generator
    ├── speech.ts               # Web Speech API wrapper (pt-PT, slow mode, Chrome GC fix)
    ├── translate.ts            # EN→TR translation (MyMemory)
    ├── usePollinationsImage.ts # React hook — Pollinations AI (rate-limit throttle)
    ├── useWikiImage.ts         # React hook — Wikipedia image (cached)
    └── useWikimediaSearch.ts   # React hook — Wikimedia Commons search (cached)
```

---

## Data Model

```ts
interface Word {
  pt: string;      // Portuguese
  en: string;      // English
  tr: string;      // Turkish
  emoji: string;   // Visual reference
  category: string;// e.g. "Animals", "Food & Drink", "School"
}

interface StoryPage {
  pt: string;           // Portuguese sentence
  en: string;           // English translation
  mainEmoji: string;    // Subject emoji (drives scene theme)
  bgLeft: string;       // Left background emoji
  bgRight: string;      // Right background emoji
  imagePrompt?: string; // Custom AI image prompt (LLM-generated, optional)
  replyTo?: string;     // pt text this template page replies to (templates only)
}

interface MarketItem {
  id: string;
  ptName: string;       // Singular Portuguese name
  pluralName: string;
  gender: 'm' | 'f';
  icon: string;         // Emoji fallback
  iconSrc?: string;     // Optional SVG/PNG path
  category: string;     // e.g. "Frutas", "Padaria", "Legumes"
  colorKey: string;     // Tailwind-style colour name for UI theming
  iconBg?: string;      // Optional background colour behind the icon
  unit?: 'kg' | 'piece';
}

type Mode =
  | 'cards'
  | 'story'
  | 'game1'
  | 'game2'
  | 'game3'
  | 'game4'
  | 'game5'
  | 'game6'
  | 'game7'
  | 'game8';
```

**Vocabulary categories:** Verbs, Family, Animals, Food & Drink, Colours, Numbers, Body, Clothes, Home, School, Places, Transport, Adjectives, Time, Weather, Phrases, Adverbs, Prepositions & Contractions

**Market items:** Frutas (16 items, kg), Padaria, Lacticínios, Bebidas, Legumes (13, kg), Peixaria, Talho, Mercearia, Doces, Snacks

---

## External APIs

| Service | Used For |
|---|---|
| Backend (Cloud Run / `localhost:8081`) | Story generation (`POST /api/story`), AI image generation (`GET /api/image`), user profile (`GET /api/user/me`), stats sync (`POST /api/user/stats/sync`), and global leaderboard (`GET /api/user/leaderboard`) |
| Web Speech API | Portuguese TTS (built-in browser) |
| MyMemory | EN→TR story translation |
| Wikipedia REST API | Word images in cards and games |
| Wikimedia Commons | Scene prop images in StoryMode |

---

## Getting Started

### Prerequisites

- Node.js 22.x (see `.nvmrc`)
- npm ≥ 9

### Install & Run

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

The story and image endpoints hit the Cloud Run backend by default in production. In dev, they call `http://127.0.0.1:8081`. Start the backend locally if you need live story generation (see [Portugese-for-Kids-Backend](https://github.com/MesutUluag/Portugese-for-Kids-Backend)).

### Build

```bash
npm run build
```

Output in `dist/`.

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and publish to GitHub Pages (`gh-pages -d dist`) |

---

## Backend

Story generation and AI image rendering are powered by the companion Spring Boot backend. See [Portugese-for-Kids-Backend](https://github.com/MesutUluag/Portugese-for-Kids-Backend) for setup instructions.

When the backend is unavailable, the app falls back to curated `templatePagesByContext` entries in `src/data/words.ts` — one conversational pair per context.
