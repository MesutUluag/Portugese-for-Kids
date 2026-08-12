# 🎈 Portuguese Kids Playground

An interactive, single-file Portuguese learning app for kids — no backend, no dependencies, just open `index.html` in a browser.

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

## Running Locally

### Simplest (no AI story)
Just open `index.html` directly in your browser. All games work. Story mode uses the template engine.

### With AI Story (Pollinations)
Serve the file over HTTP so `fetch()` calls are not blocked:

```bash
# Python 3
python3 -m http.server 8080
```
Then open `http://localhost:8080` in Chrome.

## Tech Stack

- **Pure HTML/CSS/JS** — zero dependencies, zero build step
- **Web Speech API** — text-to-speech for Portuguese pronunciation (`pt-PT`)
- **Chrome Built-in AI API** — `window.LanguageModel` (Chrome 132+)
- **Pollinations AI** — `https://text.pollinations.ai` (free LLM API)

## Vocabulary

The app includes 100+ kid-friendly words across categories:
- Animals 🐶🐱🐭
- Food 🍎🍌🍕
- Actions (verbs) 🏃💤🎨
- Family 👨‍👩‍👧
- Colours, numbers, and more

## Games & Scoring

Every correct answer earns ⭐ stars displayed in the score badge at the top. Animations provide instant feedback — green pulse for correct, red shake for wrong.

## License

MIT — free to use, modify, and share.
