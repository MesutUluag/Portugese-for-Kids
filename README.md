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
| SASS/SCSS | 1.102.0 | Mobile-first responsive styling |
| @dnd-kit/core | 6.3.1 | Drag-and-drop primitives (Puzzle game) |
| @dnd-kit/utilities | 3.2.2 | DnD helper utilities |
| gh-pages | 6.3.0 | GitHub Pages deployment |

---

## Features

- **8 Learning Modes** — flashcards, 6 games, and AI-generated story sentences
- **Portuguese TTS** — Web Speech API with pt-PT voice detection and slow-mode playback
- **AI Story Generation** — backend LLM (Gemini) + Chrome's built-in AI fallback, with curated template pages as a final fallback
- **Multi-language UI** — English / Turkish toggle (🇬🇧 / 🇹🇷) with Chrome AI + MyMemory translation
- **Dynamic Scene Themes** — emoji-to-color mapping drives CSS variables (night, rain, snow, ocean, sunset moods)
- **Daily Study Tracker** — time spent today persisted in `localStorage`, pauses on tab-visibility change
- **Image Fetching** — multi-source fallback chain: backend AI → Wikipedia → Wikimedia Commons → emoji
- **Gamification** — score counter with bounce animation

---

## Learning Modes

| Mode | Component | Description |
|---|---|---|
| 🖼️ Cards | `CardsMode` | Flashcard vocabulary review with shuffle |
| 📖 Story | `StoryMode` | AI-generated story sentences with scene illustrations |
| 🎯 Picture Game | `Game1` | Match a Portuguese word to the correct picture (3-choice MCQ) |
| 🎧 Listen & Find | `Game2` | Hear a word spoken aloud, select the matching image |
| 🃏 Memory Match | `Game3` | Flip cards to match Portuguese–English pairs |
| ✍️ Fill in the Blank | `Game4` | Complete words with missing letters (supports accented chars: á é í ó ú ã õ ç) |
| 🧩 Scramble | `Game5` | Unscramble letters to form the correct Portuguese word |
| 🧩 Jigsaw Puzzle | `Game6` | Drag jigsaw pieces onto a 3×3 canvas board to complete the word image |

---

## Project Structure

```
src/
├── App.tsx                     # Router, score, language toggle, time tracking
├── index.scss                  # Mobile-first global styles
├── main.tsx                    # Entry point
├── components/
│   ├── CardsMode.tsx
│   ├── StoryMode.tsx
│   ├── Game1.tsx – Game6.tsx
│   ├── WordImage.tsx           # Wikipedia image fetch with emoji fallback
│   ├── StoryIllustration.tsx   # Backend AI illustration + CSS scene fallback
│   └── SceneProp.tsx           # Emoji → Wikipedia image mapper
├── data/
│   └── words.ts                # Vocabulary DB, story subjects, actions, templates
└── utils/
    ├── ai.ts                   # Backend/Chrome AI story generation
    ├── speech.ts               # Web Speech API wrapper (pt-PT)
    ├── translate.ts            # EN→TR translation (Chrome AI → MyMemory)
    ├── sceneTheme.ts           # Emoji-to-theme colour engine
    ├── useWikiImage.ts         # React hook — Wikipedia image (cached)
    ├── useWikimediaSearch.ts   # React hook — Wikimedia Commons search (cached)
    ├── useBackendImage.ts      # React hook — backend AI image (429 handling)
    └── usePollinationsImage.ts # React hook — Pollinations AI (rate-limit throttle)
```

---

## Data Model

```ts
interface Word {
  pt: string;    // Portuguese
  en: string;    // English
  tr: string;    // Turkish
  emoji: string; // Visual reference
}

interface StoryPage {
  pt: string;          // Portuguese sentence
  en: string;          // English translation
  mainEmoji: string;   // Subject emoji
  bgLeft: string;      // Left background emoji
  bgRight: string;     // Right background emoji
  imagePrompt?: string;// Custom AI image prompt (optional)
}
```

**Exported datasets:** `kidsWords` (~200 words), `subjects`, `actions`, `templatePages`, `chromePhrases`

**Vocabulary categories:** verbs, family, animals, food & drink, colours, numbers, body parts, and more.

---

## External APIs

| Service | Used For |
|---|---|
| Backend (Cloud Run / `localhost:8081`) | Story & image generation |
| Web Speech API | Portuguese TTS (built-in browser) |
| Chrome AI API | Story generation + EN→TR translation (Chrome 131+) |
| MyMemory | EN→TR translation fallback |
| Wikipedia REST API | Word images |
| Wikimedia Commons | Scene prop images |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

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
| `npm run deploy` | Build and publish to GitHub Pages |

---

## Backend

Story generation and AI image rendering are powered by the companion Spring Boot backend. See [Portugese-for-Kids-Backend](../../Portugese-for-Kids-Backend/README.md) for setup instructions.

When the backend is unavailable, the app falls back to curated `templatePages` from `src/data/words.ts`.
