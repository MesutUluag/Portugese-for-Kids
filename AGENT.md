# AGENT.md — AI Agent Guide for Portuguese for Kids Frontend

This file describes the architecture, conventions, and rules an AI coding agent must follow when working on this repository.

---

## Project Purpose

React + TypeScript SPA that teaches children European Portuguese through flashcards, games, and AI-generated conversational stories. Deployed to GitHub Pages; backend story and image generation is handled by a companion Spring Boot service on Cloud Run.

---

## Repository Layout

```
src/
├── App.tsx                     # Top-level: mode router, music player, study timer, story prefetch
├── main.tsx                    # Entry point — wraps App in InAppBrowserGuard
├── index.scss                  # Mobile-first global styles and CSS variables
├── commons/
│   └── WordImage.tsx           # Wikipedia image → emoji fallback shared across games
├── components/
│   ├── CardsMode.tsx           # Flashcard grid — search + category filter
│   ├── Game1.tsx               # Picture Game (word → image, 4-choice MCQ)
│   ├── Game2.tsx               # Listen & Find (TTS → image, 4-choice MCQ)
│   ├── Game3.tsx               # Memory Match (flip-card pairs)
│   ├── Game4.tsx               # Fill in the Blank (missing letter MCQ)
│   ├── Game5.tsx               # Scramble (unscramble letters; prev/next history)
│   ├── Game6.tsx               # Jigsaw Puzzle (canvas drag-and-snap, 3×3 grid)
│   ├── Game7.tsx               # Market Game (drag items → animated cart, bunny mascot)
│   └── InAppBrowserGuard.tsx   # WebView detection + redirect prompt (Turkish UI)
├── data/
│   └── words.ts                # kidsWords, marketItems, templatePagesByContext, Mode type
├── story/
│   ├── SceneProp.tsx           # Emoji → Wikimedia Commons image
│   ├── StoryIllustration.tsx   # Backend AI image + CSS scene fallback
│   ├── StoryMode.tsx           # Story UI, context switcher, prefetch consumer
│   ├── StoryMode.scss          # Story-specific styles
│   ├── sceneTheme.ts           # Emoji → CSS variable theme (night/rain/snow/ocean/sunset/day)
│   ├── useBackendImage.ts      # fetchImageBlobUrl — backend /api/image with retry + 429 handling
│   └── useStoryPrefetch.ts     # Image prefetch cache hook + buildStoryImagePrompt
└── utils/
    ├── ai.ts                   # AiState, StoryContext, CONTEXT_TOPICS, backend story fetch + template fallback
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
`fetchImageBlobUrl` calls the backend `/api/image` endpoint and returns a blob URL. It retries up to 3 times with exponential back-off; 429 responses trigger a 10-second wait before the next attempt. `useStoryPrefetch` deduplicates in-flight requests using a `ref`-based `Set` and revokes blob URLs on unmount (via `useEffect` cleanup).

### Music player
5 MP3 tracks in `public/music/`. Stored in `MUSIC_TRACKS`. Played via a detached `<audio>` element (not in the React tree). On `ended` it shuffles to a different track. Autoplay is attempted immediately; if blocked by the browser, a one-time `click`/`keydown` listener restarts it. The mute preference is stored in `localStorage` under `kids_music_enabled`. Music is disabled in dev mode by default (`!import.meta.env.DEV`).

### Study timer
A 1-second `setInterval` increments `timeSpent` only when `document.visibilityState === 'visible'`. Persisted daily in `localStorage` under `kids_study_time_date` and `kids_study_time_seconds`; resets at midnight (different date).

### In-App Browser Guard (`InAppBrowserGuard.tsx`)
Wraps `App` in `main.tsx`. Detects WhatsApp / Instagram / Telegram / TikTok / Facebook WebViews via user-agent string matching. On iOS it offers a `googlechromes://` deep-link and a "Share → Open in Safari" instruction. On Android it uses an `intent://` URL with Chrome fallback. All UI text is in Turkish.

### Market Game (`Game7.tsx`)
Self-contained module. Key sub-components:
- `BunnyMascot` — SVG bunny reacting to `idle | happy | sad | talking` states.
- `RealisticCart` — framer-motion cart with `idle | dragOver | bounce | exit | enter` states.
- `FlyingItem` / `FlyingItemWrapper` — CSS keyframe animation flying from item grid to cart centre.
- `ConfettiBurst` — 20 confetti particles on round completion.

Audio feedback uses the Web Audio API (`playSynth`). `getNumberWord` handles Portuguese number/gender agreement (um/uma, dois/duas) for ordering dialogue.

### Scene themes (`sceneTheme.ts`)
`getSceneTheme` inspects `mainEmoji`, `bgLeft`, `bgRight` of a `StoryPage` and returns a `SceneTheme` record of CSS colour values. The returned values are applied as CSS custom properties (`--sky-top`, `--hill-color`, etc.) on the illustration container. There are 5 named themes plus the default day theme.

---

## Conventions to Follow

| Area | Rule |
|---|---|
| **Mode type** | Keep the `Mode` union in `data/words.ts` as the single source of truth. Never hardcode mode strings elsewhere. |
| **Language prop** | Every game component receives `language: 'en' \| 'tr'` and must use it for all visible strings. |
| **Speech** | Always call `cancelSpeech()` in the `useEffect` cleanup of every game component. Never call `speechSynthesis.speak()` directly — use `speakText`. |
| **Image hooks** | Use `WordImage` (commons) for vocabulary images in cards and games. Use `StoryIllustration` for story scene images. Do not inline image-fetch logic in game components. |
| **Styling** | One `.scss` file per component in `src/styles/`. Global tokens live in `_variables.scss`. Do not use inline `style` for layout — only for dynamic values (colours, transforms). |
| **State** | Game state (target word, score, animation class) stays inside the game component. Cross-game state (mode, language, score total) lives in `App`. |
| **Data** | All vocabulary is in `kidsWords`. All market items are in `marketItems`. All story templates are in `templatePagesByContext`. Do not hardcode vocabulary in components. |
| **Environment** | Backend URLs are guarded by `import.meta.env.DEV`. Dev → `localhost:8081`, prod → Cloud Run URL. Never hardcode production URLs outside `ai.ts` and `useBackendImage.ts`. |
| **No secrets** | API keys must never appear in the source tree. All external calls are unauthenticated (public) endpoints. |
| **framer-motion** | Used only in `Game7`. Do not add framer-motion to other games without a clear reason — prefer CSS animations. |
| **@dnd-kit** | Used only in `Game6`. Do not add drag libraries to other games. |

---

## Adding a New Game

1. Create `src/components/GameN.tsx` with `interface Props { onScore: (pts: number) => void; language: 'en' | 'tr'; }`.
2. Create `src/styles/GameN.scss` for styles.
3. Add the mode key to the `Mode` union in `data/words.ts`.
4. Add a `NavButton` entry in the `navButtons` array in `App.tsx` with the appropriate icon and EN/TR labels.
5. Add the conditional render `{mode === 'gameN' && <GameN onScore={addScore} language={language} />}` in `App.tsx`.
6. Call `cancelSpeech()` in the component's unmount `useEffect` if the game uses speech.

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
