# AGENT.md — AI Agent Guide for Portuguese for Kids Frontend

This file describes the architecture, conventions, and rules an AI coding agent must follow when working on this repository.

---

## Project Purpose

React + TypeScript SPA that teaches children European Portuguese through flashcards, games, and AI-generated conversational stories. Deployed to GitHub Pages; backend story and image generation is handled by a companion Spring Boot service on Cloud Run.

---

## Repository Layout

```
src/
├── App.tsx                     # Top-level: mode router, top stats/rank/profile bar, music player, study timer, story prefetch
├── main.tsx                    # Entry point — wraps App in InAppBrowserGuard + AuthProvider
├── index.scss                  # Mobile-first global styles and CSS variables
├── auth/
│   ├── AuthContext.tsx         # Firebase Auth provider, token refresh, password reset & modal state
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
│   └── WordImage.tsx           # Wikipedia image → emoji fallback shared across games
├── components/
│   ├── AdverbsModal.tsx        # Adverbs reference modal (Place, Time, Degree, Frequency, Manner)
│   ├── CardsMode.tsx           # Flashcard grid — search + category filter + grammar modal triggers
│   ├── ConjugationModal.tsx    # Verb conjugation modal (A1/A2 levels, audio, EN/TR translations & examples)
│   ├── Game1.tsx               # Picture Game (word → image, 4-choice MCQ, Level 1)
│   ├── Game2.tsx               # Listen & Find (TTS → image, 4-choice MCQ, Level 1)
│   ├── Game3.tsx               # Memory Match (flip-card pairs, Level 2)
│   ├── Game4.tsx               # Fill in the Blank (missing letter MCQ, Level 1)
│   ├── Game5.tsx               # Scramble (unscramble letters; prev/next history, Level 2)
│   ├── Game6.tsx               # Jigsaw Puzzle (canvas drag-and-snap, 3×3 grid, Level 3)
│   ├── Game7.tsx               # Market Game (drag 2 items → animated cart, bunny mascot, Level 1)
│   ├── Game8.tsx               # Arrowword / Crossword Puzzle (dynamic grid, category filter, Level 3)
│   ├── InAppBrowserGuard.tsx   # WebView detection + redirect prompt (Turkish UI)
│   └── PrepositionsModal.tsx   # Prepositions & contractions reference modal
├── data/
│   ├── index.ts                # Barrel exports & Mode / Word / StoryPage / MarketItem types
│   ├── words.ts                # kidsWords vocabulary dataset
│   ├── marketItems.ts          # Market Game items dataset
│   ├── storyTemplates.ts       # templatePagesByContext fallback stories
│   ├── verbConjugations.ts     # A1 & A2 conjugation tables and example sentences for verbs
│   ├── adverbData.ts           # Categorised Portuguese adverbs with examples
│   └── prepGroups.ts           # Prepositions & contractions reference data
├── story/
│   ├── SceneProp.tsx           # Emoji → Wikimedia Commons image
│   ├── StoryIllustration.tsx   # Backend AI image + CSS scene fallback
│   ├── StoryMode.tsx           # Story UI, context switcher, prefetch consumer
│   ├── StoryMode.scss          # Story-specific styles
│   ├── sceneTheme.ts           # Emoji → CSS variable theme (night/rain/snow/ocean/sunset/day)
│   ├── useBackendImage.ts      # fetchImageBlobUrl — backend /api/image with retry handling
│   └── useStoryPrefetch.ts     # Image prefetch cache hook + buildStoryImagePrompt
└── utils/
    ├── ai.ts                   # AiState, StoryContext, CONTEXT_TOPICS, backend story fetch + template fallback
    ├── crosswordGenerator.ts   # Dynamic Arrowword / Crossword conflict-free grid generator
    ├── speech.ts               # Web Speech API (pt-PT, slow mode, Chrome utterance GC fix)
    ├── translate.ts            # EN→TR via MyMemory
    ├── usePollinationsImage.ts # Pollinations AI image hook
    ├── useWikiImage.ts         # Wikipedia image hook (cached)
    └── useWikimediaSearch.ts   # Wikimedia Commons search hook (cached)
```

---

## Key Design Decisions

### Mode routing in `App.tsx`
`App` holds the `mode` state and renders the active component via conditional JSX (`{mode === 'game7' && <Game7 … />}`). There is no React Router. Adding a new mode requires: (1) adding the key to the `Mode` union in `data/words.ts`, (2) adding a nav button entry to `navButtons`, and (3) rendering the new component below.

### Story prefetch pipeline
`App.tsx` fires four promise chains in a `useRef` initialiser (runs exactly once, even under React StrictMode):
1. `storyPrefetchRef` — fetches page 1 text at app load.
2. `imagePrefetchRef` — starts the page 1 image fetch as soon as text resolves.
3. `replyPrefetchRef` — starts fetching page 2 text as soon as page 1 text resolves.
4. `replyImagePrefetchRef` — starts the page 2 image as soon as page 2 text resolves.

These promises are passed to `StoryMode` as props and consumed by `loadFirst`. On context switch the promises are ignored and fresh fetches are made.

### Story contexts
`CONTEXT_TOPICS` in `utils/ai.ts` maps each `StoryContext` key to a list of topic strings. The first-turn prompt is `"Generate one sentence about <random topic>."` Reply turns always send `"Continue the conversation."` plus `previousSentence`. The backend has a matching `.md` system prompt per context. Both sides must be kept in sync. **Do not add inline prompt strings — add a backend `.md` file instead.**

### Conversation history
Up to 10 previous sentences are sent to the backend on each request (`MAX_CONVERSATION_HISTORY = 10` in `ai.ts`). Per-context history is stored in `localStorage` under the key `story_history_<context>` (max 30 entries). History is cleared when the user switches to a new context.

### Template fallback (`templatePagesByContext`)
Each context has a set of conversational `StoryPage` objects in `data/words.ts`. Reply pages carry a `replyTo` field that matches the `pt` text of the opener. `generateTemplateStoryPage` searches for a matching reply first; if none found it picks a random opener. Always add pairs (opener + reply with `replyTo`) — never add orphaned reply pages.

### Image fetch chain (`useBackendImage.ts` / `useStoryPrefetch.ts`)
`fetchImageBlobUrl` calls the backend `/api/image` endpoint and returns a blob URL. It retries up to 3 times total (`RETRY_DELAYS_MS = [2_000, 5_000]`) for transient failures; `429` responses (daily rate limit exceeded) throw `'rate-limited'` immediately without retrying. `useStoryPrefetch` deduplicates in-flight requests using a `ref`-based `Set` and revokes blob URLs on unmount (via `useEffect` cleanup).

### Authentication, Telemetry & Leaderboard (`src/auth/`)
- **Firebase Auth & Google Identity Services (`AuthContext.tsx`, `AuthModal.tsx`, `firebase.ts`)**: Supports Google One Tap / GIS in-page button and same-tab redirect (`signInWithRedirect` / `signInWithCredential`) — eliminating disruptive popup windows. Also supports Email/Password sign-up/sign-in and password reset. Flashcards (`cards`) is open to guests, while all 8 games and AI Story Mode require authentication to save progress to the global leaderboard.
- **Crash-Safe Telemetry Outbox (`useStatsTracker.ts`)**: Persists active study time (1s tick with 3m AFK detection), per-mode time (`timeByModeSeconds`), games completed (`gamesCompletedByMode`), per-game scores (`scoreByMode`), and story contexts (`storiesByContext`) in `localStorage` (`kids_telemetry_outbox_v1` and `kids_local_profile_v2`) and flushes deltas to `POST /api/user/stats/sync` every 60s or on `visibilitychange` / `pagehide`.
- **Stats Dashboard (`StatsModal.tsx`)**: Displays total study time, current/longest day streaks, per-mode time breakdowns, and a 7-day activity bar chart (`dailyTimeSeconds`).
- **Global Leaderboard & Game Scores Modal (`LeaderboardModal.tsx`)**: Opened from the top-bar Rank pill (`🏆 <score> | Ranks / Sıralama`). Features two tabs:
  1. **Global Ranking**: Queries `GET /api/user/leaderboard` (real Firestore user standings, with an empty-state placeholder when no scores exist yet).
  2. **My Game Scores**: Per-game score and completed rounds breakdown grouped by difficulty tier (Level 1–3).

### Tiered Game Scoring & Live Score Badge (`GameScoreBadge.tsx`)
All 8 games use difficulty-scaled scoring, display a top-right `GameScoreBadge` (`⭐ <sessionScore>` with animated `+N` popup triggered by a stable `gainKey`), and report `(pts, mode)` via `onScore`:
- **Level 1 (Easy)**:
  - `Game1` (Picture Match): `6 pts` first try (`-2` per wrong guess, min `1`). Uses an `answered` lock to prevent duplicate clicks during round transitions.
  - `Game2` (Listen & Find): `7 pts` first try (`-2` per wrong guess, `-1` per extra audio replay after initial auto-play, min `1`).
  - `Game4` (Fill in the Blank): `7 pts` first try (`-2` per wrong guess, min `1`).
  - `Game7` (Market Game): Fixed Level 1 (2 items per order), `7 pts` clean round (`-2` per wrong item dragged, min `1`).
- **Level 2 (Medium)**:
  - `Game3` (Memory Match): `25 pts` clean board (`-2` per mismatch above 2 grace mistakes, min `5`).
  - `Game5` (Word Scramble): `15 pts` (`+2` for 6+ letter words, `-3` per wrong letter tap, `-4` per hint, min `2`).
- **Level 3 (Master)**:
  - `Game6` (Jigsaw Puzzle): `30 pts` (`-2` per misplaced piece drop, min `5`).
  - `Game8` (Crossword Puzzle): `10 pts` per word (`-2` per wrong check, `-2` per hint, `-2` per audio listen click, min `1`; `0` if revealed with Solve) + `25 pts` board completion bonus.

### Music player
5 MP3 tracks in `public/music/`. Stored in `MUSIC_TRACKS`. Played via a detached `<audio>` element (not in the React tree). On `ended` it shuffles to a different track. Autoplay is attempted immediately; if blocked by the browser, a one-time `click`/`keydown` listener restarts it. The mute preference is stored in `localStorage` under `kids_music_enabled`. Music is disabled in dev mode by default (`!import.meta.env.DEV`).

### Study timer
A 1-second `setInterval` increments `timeSpent` only when `document.visibilityState === 'visible'`. Persisted daily in `localStorage` under `kids_study_time_date` and `kids_study_time_seconds`; resets at midnight (different date).

### In-App Browser Guard (`InAppBrowserGuard.tsx`)
Wraps `App` in `main.tsx`. Detects WhatsApp / Instagram / Telegram / TikTok / Facebook WebViews via user-agent string matching. On iOS it offers a `googlechromes://` deep-link and a "Share → Open in Safari" instruction. On Android it uses an `intent://` URL with Chrome fallback. All UI text is in Turkish.

### Market Game (`Game7.tsx`)
Self-contained Level 1 module (2 requested items per order). Key sub-components:
- `BunnyMascot` — SVG bunny reacting to `idle | happy | sad | talking` states.
- `RealisticCart` — framer-motion cart with `idle | dragOver | bounce | exit | enter` states.
- `FlyingItem` / `FlyingItemWrapper` — CSS keyframe animation flying from item grid to cart centre.
- `ConfettiBurst` — 20 confetti particles on round completion.

Audio feedback uses the Web Audio API (`playSynth`). `getNumberWord` handles Portuguese number/gender agreement (um/uma, dois/duas) for ordering dialogue.

### Scene themes (`sceneTheme.ts`)
`getSceneTheme` inspects `mainEmoji`, `bgLeft`, `bgRight` of a `StoryPage` and returns a `SceneTheme` record of CSS colour values. The returned values are applied as CSS custom properties (`--sky-top`, `--hill-color`, etc.) on the illustration container. There are 5 named themes plus the default day theme.

### Crossword / Çengel Bulmaca Game (`Game8.tsx` & `crosswordGenerator.ts`)
Dynamic Arrowword / Crossword puzzle generated at runtime from category vocabulary (`Verbs`, `Numbers`, `Colours`, `Animals`, etc.).
- **Generator Rules**:
  - Word count: 9–12 words per puzzle (9 base words + up to 3 pocket-filling bonus words when space permits).
  - Bounding box: constrained to `width <= 10` and `height <= 13` for mobile fit.
  - Clue placement: Clue boxes occupy the cell directly before the word (`(startR, startC - 1)` for Across, `(startR - 1, startC)` for Down). Can merge into split clues (1 across + 1 down in one box).
  - **Neighbor Constraints (Çengel Bulmaca standard)**: A clue cell must **never** have a letter cell to its left or above it (ensuring no blank fill-in cells appear to the left of across clues or above down clues).
- **Mobile UI**:
  - Single-row header on mobile with category select, `New` button, and top-right `GameScoreBadge`.
  - 2-row active clue banner (row 1: direction badge, clue text, audio; row 2: letter dashes, hint, check, solve buttons).
  - Balanced 9-9-9 on-screen keyboard (`A-H` including `Ç`, `I-Q`, `R-Z + Del`) with `flex-wrap: nowrap` preventing orphan keys.

### Grammar Reference Modals (`ConjugationModal.tsx`, `AdverbsModal.tsx`, `PrepositionsModal.tsx`)
- **Verb Conjugation Modal (`ConjugationModal.tsx` & `verbConjugations.ts`)**:
  - Triggered from `CardsMode.tsx` via a book icon button (`BookOpen`) on verb cards when `verbConjugations[word.pt]` exists.
  - **A1 Level**: 4-column layout (Pronoun, Presente, Futuro Próximo, Ação Contínua) + example sentences with EN/TR explanations.
  - **A2 Level**: 3-column tense table (Pretérito Perfeito, Pretérito Imperfeito) + Particípio Passado box.
- **Adverbs & Prepositions Modals (`AdverbsModal.tsx`, `PrepositionsModal.tsx`)**:
  - Triggered from category banners in `CardsMode.tsx` when viewing `Adverbs` or `Prepositions & Contractions`, with tap-to-speak audio (`speakText()`) on every example.

---

## Conventions to Follow

| Area | Rule |
|---|---|
| **Mode type** | Keep the `Mode` union in `data/index.ts` as the single source of truth. Never hardcode mode strings elsewhere. |
| **Language prop** | Every game component receives `language: 'en' \| 'tr'` and must use it for all visible strings. |
| **Game scoring** | Every game must render `<GameScoreBadge score={sessionScore} lastGain={lastGain} gainKey={gainKey} />` in the top-right corner (`position: relative` on the game card) and report points via `onScore(pts)`. |
| **Speech** | Always call `cancelSpeech()` in the `useEffect` cleanup of every game component. Never call `speechSynthesis.speak()` directly — use `speakText`. |
| **Image hooks** | Use `WordImage` (commons) for vocabulary images in cards and games. Use `StoryIllustration` for story scene images. Do not inline image-fetch logic in game components. |
| **Styling** | One `.scss` file per component in `src/styles/` (or co-located in `src/auth/` / `src/commons/`). Global tokens live in `_variables.scss`. Do not use inline `style` for layout — only for dynamic values (colours, transforms). |
| **State** | Game state (target word, session score, animation class) stays inside the game component. Cross-game state (mode, language, global score & telemetry) lives in `App` and `AuthContext`. |
| **Data** | All vocabulary is in `data/words.ts` (`kidsWords`). All market items are in `data/marketItems.ts`. All story templates are in `data/storyTemplates.ts`. Do not hardcode vocabulary in components. |
| **Environment** | Backend URLs are guarded by `import.meta.env.DEV`. Dev → `localhost:8081`, prod → Cloud Run URL. |
| **No mock/fake users** | Never inject fake competitors or dummy users into the leaderboard (`LeaderboardModal.tsx`). Display real backend/Firestore entries or the clean empty state. |
| **framer-motion** | Used only in `Game7`. Do not add framer-motion to other games without a clear reason — prefer CSS animations. |
| **@dnd-kit** | Used only in `Game6`. Do not add drag libraries to other games. |

---

## Adding a New Game

1. Create `src/components/GameN.tsx` with `interface Props { onScore: (pts: number) => void; language: 'en' | 'tr'; }`.
2. Render `<GameScoreBadge score={sessionScore} lastGain={lastGain} gainKey={gainKey} />` inside the top-right of the game container.
3. Create `src/styles/GameN.scss` for styles (ensure `.gameN-container` has `position: relative`).
4. Add the mode key to the `Mode` union in `data/index.ts`.
5. Add the game metadata to `ALL_GAMES` in `src/auth/LeaderboardModal.tsx`.
6. Add a `NavButton` entry in the `navButtons` array in `App.tsx` with the appropriate icon and EN/TR labels.
7. Add the conditional render `{mode === 'gameN' && <GameN onScore={(pts) => addScore(pts, 'gameN')} language={language} />}` in `App.tsx`.
8. Call `cancelSpeech()` in the component's unmount `useEffect` if the game uses speech.

---

## Adding a New Story Context

1. Add the key to the `StoryContext` union type in `utils/ai.ts`.
2. Add the key to `CONTEXT_TOPICS` in `utils/ai.ts` with at least 10 topic strings.
3. Add the key to `CONTEXT_SCENE` in `story/useStoryPrefetch.ts` with a scene description.
4. Add the key to `CONTEXTS` array in `story/StoryMode.tsx` with `value`, `label`, `labelTr`, and `emoji`.
5. Add at least one opener + one `replyTo` pair in `templatePagesByContext` in `data/words.ts`.
6. Create the matching backend system prompt file (`story-system-prompt-<key>.md`) — see the backend `AGENT.md`.

---

## Adding a New Market Item

1. Add a `MarketItem` entry to `marketItems` in `data/words.ts`.
2. If the item needs a custom SVG, place it in `public/items/<id>.svg` and set `iconSrc: \`${import.meta.env.BASE_URL}items/<id>.svg\``.
3. Set `unit: 'kg'` for items ordered by weight; omit or set `unit: 'piece'` for countable items.
4. Choose an existing `category` string (e.g. `'Frutas'`, `'Padaria'`) or introduce a new one — the UI groups items by category.

---

## Adding New Vocabulary Words

All vocabulary is maintained in `src/data/words.ts` (`kidsWords`), with companion modal data in `verbConjugations.ts`, `adverbData.ts`, and `prepGroups.ts`.

A detailed step-by-step guide for adding words — including deduplication, category classification, emoji selection, insert positions, modal templates, A1/A2 sentence rules, and Portugal cultural references — is maintained as a Bob skill:

👉 [`.bob/skills/add-portuguese-words/SKILL.md`](.bob/skills/add-portuguese-words/SKILL.md)

**Follow that file for all vocabulary additions.** Key rules at a glance:

- Grep `words.ts` for the `pt` field before adding — skip duplicates.
- Every new adverb also needs an entry in `adverbData.ts` (Place, Time, Degree, etc.).
- Every new regular `-ar / -er / -ir` verb also needs an entry in `verbConjugations.ts`.
- Examples must be European Portuguese, A1/A2 level, kid-appropriate, and culturally grounded in Portugal.

---

## Running & Validating Changes

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type-check + production build
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

There are no automated tests in this repository. Validate visually in the browser after every non-trivial change, covering: flashcards, at least one game, and Story mode with a context switch.

---

## What NOT to Do

- **Do not** add React Router — navigation is a simple `mode` state.
- **Do not** add vocabulary or story prompts as hardcoded strings inside components — put them in `data/words.ts` or `utils/ai.ts`.
- **Do not** call `speechSynthesis.speak()` directly — always go through `speakText` in `utils/speech.ts`.
- **Do not** make backend URL changes in more than two files (`ai.ts` and `useBackendImage.ts`).
- **Do not** import `framer-motion` outside of `Game7.tsx` without a compelling reason.
- **Do not** add new `localStorage` keys without documenting them here and in `README.md`.
- **Do not** remove the `InAppBrowserGuard` wrapper from `main.tsx` — it is required for WhatsApp sharing to work correctly on mobile.
- **Do not** change the `StoryPage` interface fields without updating `templatePagesByContext`, `sceneTheme.ts`, `StoryIllustration.tsx`, and the backend system prompts simultaneously.
- **Do not** add `console.log` statements to production code — use `console.warn` for non-fatal issues and `console.error` for failures.
