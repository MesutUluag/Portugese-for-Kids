# 🎈 Portuguese Kids Playground

🌐 **Live at: [mesutuluag.github.io/Portugese-for-Kids](https://mesutuluag.github.io/Portugese-for-Kids/)**

An interactive Portuguese learning app for kids — no backend, fully static deployment on GitHub Pages.

## Branches

| Branch | Stack | Deploy |
|---|---|---|
| `main` | Pure HTML/CSS/JS — single file, zero build step | GitHub Pages (push to deploy) |
| `react-vite` | **Vite + React 18 + TypeScript 5** | `npm run deploy` → GitHub Pages |

---

## Features

| Mode | Description |
|---|---|
| 🖼️ **Cards** | Flashcard grid with emoji, Portuguese word, and English translation. Searchable. |
| 📖 **Story** | AI-generated A1-level Portuguese sentences with an animated scene illustration. |
| 🎯 **Picture Game** | See an emoji, pick the correct Portuguese word from 4 options. |
| 🎧 **Listen & Find** | Hear a word spoken aloud, tap the matching emoji. |
| 🃏 **Memory Match** | Flip cards to find matching emoji pairs. |
| ✍️ **Fill Blank** | Fill in the missing letter of a Portuguese word. |
| 🧩 **Scramble** | Unscramble the letters to spell the correct word. |

---

## AI Story Mode

The Story mode uses a 3-tier AI fallback chain, probed **once at startup**:

1. **Chrome Built-in AI (Gemini Nano)** — on-device, no internet needed *(requires flag)*
2. **Pollinations AI** — free, no API key, no signup required
3. **Template Engine** — offline fallback using built-in sentence templates

### Enabling Chrome Built-in AI
1. Open `chrome://flags/#prompt-api` → set **Prompt API** to **Enabled** → Relaunch
2. Open `chrome://on-device-internals` → click **Load Default**
3. Verify in DevTools: `await LanguageModel.availability()` → should return `"readily"`

> **Note:** Chrome Built-in AI is blocked by enterprise MDM policies on managed devices. Pollinations AI will be used automatically as fallback when served over HTTP/HTTPS.

---

## Running Locally

### `main` branch — no build needed
```bash
# Python 3
python3 -m http.server 8080
```
Open `http://localhost:8080` in Chrome.

Or just open `index.html` directly in your browser (Story mode will use the template engine since `fetch()` is blocked on `file://`).

### `react-vite` branch — Vite dev server

> **Requires Node ≥ 18.** Use [nvm](https://github.com/nvm-sh/nvm) to manage versions.

```bash
git checkout react-vite
nvm use 22          # or any Node ≥18
npm install
npm run dev         # http://localhost:5173
```

---

## Deployment

### `main` branch
The app is deployed via **GitHub Pages** directly from the `main` branch.
Every `git push` to `main` automatically redeploys via the Pages branch setting.

**Live URL:** https://mesutuluag.github.io/Portugese-for-Kids/

### `react-vite` branch

```bash
# Build and deploy to GitHub Pages in one command
npm run deploy
```

This runs `npm run build` (outputs to `dist/`) then `gh-pages -d dist` to push to the `gh-pages` branch.

**Before first deploy**, confirm the `base` in [`vite.config.ts`](vite.config.ts) matches your repo name:
```ts
base: '/Portugese-for-Kids/',
```

Also enable GitHub Pages in repo **Settings → Pages → Source → Deploy from branch → `gh-pages`**.

---

## Tech Stack

### `main` branch
- **Pure HTML/CSS/JS** — zero dependencies, zero build step
- **Web Speech API** — text-to-speech for Portuguese pronunciation (`pt-PT`)
- **Chrome Built-in AI API** — `window.LanguageModel` (Chrome 132+)
- **Pollinations AI** — `https://text.pollinations.ai` (free LLM API)

### `react-vite` branch
- **React 18** + **TypeScript 5** + **Vite 6**
- **gh-pages** — one-command GitHub Pages deployment
- All original APIs preserved (Web Speech, Chrome AI, Pollinations)
- Fully typed data models (`Word`, `StoryPage`, `Mode`)

### Source layout (`react-vite`)
```
src/
├── main.tsx
├── App.tsx               # Mode routing + score state
├── index.css             # Global styles
├── data/
│   └── words.ts          # All vocabulary + story data (typed)
├── utils/
│   ├── speech.ts         # Web Speech API + Google TTS fallback
│   └── ai.ts             # Chrome AI / Pollinations / template chain
└── components/
    ├── CardsMode.tsx
    ├── StoryMode.tsx
    ├── Game1.tsx          # Picture Game
    ├── Game2.tsx          # Listen & Find
    ├── Game3.tsx          # Memory Match
    ├── Game4.tsx          # Fill Blank
    └── Game5.tsx          # Scramble
```

---

## Vocabulary

The app includes 130+ words and phrases across categories:
- Verbs (to sleep, to play, to draw…)
- Adjectives (happy, sad, tall, cheap…)
- Family members 👨‍👩‍👧
- Food & drink 🍎🥛🍷
- Common phrases (está bem, faz sentido…)

## Games & Scoring

Every correct answer earns ⭐ stars displayed in the score badge at the top. Animations provide instant feedback — green pulse for correct, red shake for wrong.

## License

MIT — free to use, modify, and share.
