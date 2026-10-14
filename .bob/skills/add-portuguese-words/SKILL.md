---
name: add-portuguese-words
description: Use when the user wants to add new Portuguese words or vocabulary to kidsWords in words.ts, or add verb conjugation modals in verbConjugations.ts. Activate for requests like "add these words", "add to kidsWords", "add modal details".
---

# Add Portuguese Words

Follow these steps every time the user provides a list of words to add to the Portuguese for Kids app.

## Files

| File | Purpose |
|---|---|
| `Practice Portugese for Kids/Portugese for Kids/src/data/words.ts` | `kidsWords` array — every flashcard |
| `Practice Portugese for Kids/Portugese for Kids/src/data/verbConjugations.ts` | `verbConjugations` record — verb modals (A1/A2) |
| `Practice Portugese for Kids/Portugese for Kids/src/data/adverbData.ts` | `adverbGroups` array — adverb modals |
| `Practice Portugese for Kids/Portugese for Kids/src/data/prepGroups.ts` | `prepGroups` array — preposition modals |

---

## Step 1 — Deduplicate

Before adding, grep `words.ts` for each Portuguese word (`pt` field) to confirm it does not already exist. Skip any that do, and note them to the user.

---

## Step 2 — Classify into Category

| Word type | Category |
|---|---|
| Infinitive verb | `"Verbs"` |
| Irregular past form (e.g. `trouxe`, `fui`) | `"Verbs"` — note it is a past form in the `en` field |
| Verb that overlaps semantically with an existing verb (e.g. `morar` vs `viver`) | `"Verbs"` — add a brief distinguishing note in the `en` field, e.g. `"to live (reside)"` vs `"to live (be alive)"` |
| Noun | `"Nouns"` |
| Adjective | `"Adjectives"` |
| Adverb of manner / frequency / degree / certainty / place / time | `"Adverbs"` |
| Question word / pronoun / determiner | `"Pronouns"` |
| Fixed expression / greeting / idiom | `"Phrases"` |
| Place noun | `"Places"` |
| Animal noun | `"Animals"` |
| Food/drink noun | `"Food & Drink"` |
| School item | `"School"` |
| Home / household item | `"Home"` |
| Clothing item | `"Clothes"` |
| Simple preposition | `"Prepositions"` |
| Contraction of preposition + article (do, da, no, ao, etc.) | `"Prepositions"` |

---

## Step 3 — Choose Emoji

**Rule: the emoji must directly represent the word's meaning.** If no single emoji fits well, use the nearest semantic neighbour from the lists below.

**Never reuse** an emoji already assigned to a different word in the same category if it would cause confusion. Currently reserved emojis:

| Emoji | Reserved for |
|---|---|
| 📍 | `aqui` (Adverbs) / `estar` / `chegar` (Verbs) |
| 💡 | `sugerir` / `candeeiro` / `razão` |
| ✅ | `sim` / `já` |
| 🚫 | `nunca` |
| ❓ | `porque` / `Porque é que` / `O que é que` / `perguntar` / `pergunta` |
| 🤝 | `emprestar` / `tratar` / `com` / `juntos` |
| ➕ | `também` / `mais` |
| ➖ | `menos` |
| 🔄 | `apesar` / `por` (Adverbs) |
| 🎯 | `certamente` / `até` / `a` / `ao` / `à` / `aos` / `às` (Prepositions) |
| 📌 | `nesta` / `em` / `no` / `na` / `nos` / `nas` (Prepositions) |
| 👉 | `isso` (Pronouns) / `aí` (Adverbs — listener's location) |
| 🌌 | `longe` / `lá` (Adverbs — far or out-of-sight place) |
| ⬆️ | `cima` / `acima` (Adverbs — up/above) |
| 🗺️ | `daqui` / `cá` (Adverbs — from here / general here) |
| ⬅️ | `antes` / `atrás` (Adverbs — before/behind) |
| 🌳 | `fora` (Adverbs) / `jardim` (Home) / `parque` (Places) |

**Emoji guidelines by type:**

- **Verbs** — prefer action-miming emojis: 📞 call, 🏆 win, 🔮 guess, 🖐️ show, 💫 happen, 🧠 understand, 🎒 bring, 🏃 run, 🎵 sing, ✍️ write, etc.
- **Adverbs of place/direction** — 🌌 far, 🏘️ near, ⏭️ ahead, ⬅️ before/back, ⏩ after, 🗺️ from here, ⬆️ above, 🌳 outside.
- **Adverbs of time** — ⏳ still/yet, ♾️ always, 🚫 never, ⛔ never (emphatic), ⏱️ now, 🌅 early, ⌛ late/ago.
- **Adverbs of degree** — 💪 very/much, ➕ more, ➖ less, 😲 so, 1️⃣ only/just, 🤏 a little, 🫙 some.
- **Adverbs of manner** — ⚡ quickly, 💯 really, 🎯 certainly, 🔄 despite.
- **Adverbs of probability** — 🤷 maybe, 🤔 probably.
- **Nouns** — use a representative object emoji: 🔑 keys, 💒 wedding, 🦚 peacock, ♟️ chess, 🌍 world, 💡 reason, etc.
- **Adjectives** — use a visual that illustrates the quality: 🥇 best, 🎲 probable, etc.
- **Pronouns** — 👉 this/that (m), 👈 that (f), 👥 those (pl), 🤷 which/how.
- **Neutral fallback** — 🔹 (adverbs), 📌 (nouns), 🔤 (function words).

---

## Step 4 — Write the `kidsWords` entry

Format exactly as:
```ts
{ pt: "palavra", en: "English meaning", tr: "Turkish meaning", emoji: "🔹", category: "Category" },
```

Insert positions:
- **Verbs** → end of Verbs block, before `// ── Family`
- **Family** → end of Family block, before `// ── Animals`
- **Animals** → end of Animals block, before `// ── Food & drink`
- **Food & Drink** → end of Food & drink block, before `// ── Home`
- **Home** → end of Home block, before `// ── School`
- **Clothes** → end of Clothes block, before `// ── Home`
- **School** → end of School block, before `// ── Places`
- **Places** → end of Places block, before `// ── Transport`
- **Nouns** → end of Nouns block, before `// ── Pronouns`
- **Pronouns** → end of Pronouns block, before `// ── Adverbs`
- **Adjectives** → end of Adjectives block, before `// ── Time`
- **Adverbs** → end of Adverbs block, before the `// ── Prepositions` line
- **Prepositions** → end of Prepositions block, before `// ── Idioms`
- **Phrases** → end of Phrases block, before `];`

---

## Step 5 — Verb modal (verbConjugations.ts)

Add a `verbConjugations` entry **only** if:
- The `pt` value is a regular infinitive (ends `-ar`, `-er`, `-ir`), OR
- The user explicitly requests modal details.

Do **not** add modals for: irregular past forms, nouns, adjectives, adverbs, pronouns, phrases, prepositions.

### Conjugation template

```ts
// ── <verb> ─────────────────────────────────────────────────────────────────
<verb>: {
  a1: {
    presente: rows('<eu>', '<tu>', '<ele/ela>', '<nós>', '<eles/elas>'),
    exPresente: '<European PT sentence — present tense>',
    exFuturo:   '<European PT sentence — ir + infinitive>',
    exContinua: '<European PT sentence — estar a + infinitive>',
    exPresenteEn: '<English translation>',
    exFuturoEn:   '<English translation>',
    exContinuaEn: '<English translation>',
    exPresenteTr: '<Turkish translation>',
    exFuturoTr:   '<Turkish translation>',
    exContinuaTr: '<Turkish translation>',
  },
  a2: {
    preteritoPerfeito:   rows('<eu>', '<tu>', '<ele>', '<nós>', '<eles>'),
    preteritoImperfeito: rows('<eu>', '<tu>', '<ele>', '<nós>', '<eles>'),
    participioPassado: '<past participle>',
    exParticipioEn: '<English present-perfect sentence>',
    exParticipioTr: '<Turkish translation>',
  },
},
```

Append at the end of the `verbConjugations` object, before the closing `};`.

### Example sentence quality rules

- **European Portuguese** register: continuous = `estar a + infinitive` (NOT `estar + gerúndio`).
- **Kid-appropriate**: school, family, food, games, playground, home.
- Each of the three tenses should use a **different subject or context** — do not repeat the same noun across all three.
- **Specific beats generic**: "Eu empresto o meu lápis ao colega." not "Eu empresto algo."
- `exFuturo` always: "Eu vou \<verb\>…"
- `exContinua` always: "Eu estou a \<verb\>…"
- For verbs rarely used in 1st person (e.g. `acontecer`), use the most natural subject (3rd person or impersonal).
- If the verb has a common special-use pattern (e.g. `tratar de`, `gostar de`), add a `specialUse` block.
- **Portugal cultural realism** — examples must reflect everyday Portuguese life, not generic or Brazilian contexts. See the cultural reference list below.
- **A1/A2 language level** — sentences must use only A1/A2 vocabulary and grammar. See the level guide below.

---

## Step 6 — Adverb modal (adverbData.ts)

Add an `AdverbEntry` for **every new adverb** added to `kidsWords`. Each new adverb must appear in the correct group inside `adverbGroups`. If no existing group fits, create a new one.

### Groups already present

| Group | `labelEn` | Representative words |
|---|---|---|
| Time | `'Time'` | agora, antes, depois, ainda, cedo, atrasado, adiante, há |
| Frequency | `'Frequency'` | sempre, nunca, jamais, quase, vezes |
| Place | `'Place'` | aqui, daqui, fora, embora, longe, perto, cima, dentro, atrás, acima, abaixo, debaixo, cá, aí, lá, acolá |
| Degree | `'Degree'` | muito, mais, menos, tão, apenas, pouco, algum, só, até |
| Manner | `'Manner'` | depressa, realmente, certamente, sobre, por |
| Probability | `'Probability'` | se calhar, provavelmente |
| Addition & Contrast | `'Addition & Contrast'` | também, apesar |

### AdverbEntry template

```ts
{
  word: '<pt word>',
  emoji: '<same emoji as in kidsWords>',
  useCaseEn: '<short badge label in English, e.g. "From here">',
  useCaseTr: '<short badge label in Turkish>',
  meaningEn: '<one-line meaning in English>',
  meaningTr: '<one-line meaning in Turkish>',
  examples: [
    { pt: '<sentence 1 in PT>', en: '<English>', tr: '<Turkish>' },
    { pt: '<sentence 2 in PT>', en: '<English>', tr: '<Turkish>' },
    { pt: '<sentence 3 in PT>', en: '<English>', tr: '<Turkish>' },
  ],
},
```

**Example quality rules (same as verbs):**
- 3 examples per word, each with a different context.
- Kid-appropriate, European Portuguese.
- Sentences must clearly illustrate the adverb's use in context.
- Keep sentences short and natural (1 clause is fine).
- **Portugal cultural realism** — use the cultural reference list below.
- **A1/A2 language level** — see the level guide below.

---

## Step 7 — Preposition modal (prepGroups.ts)

Add to `prepGroups` **only** if the new word is a **simple preposition** not yet covered, OR if the user asks to update preposition modals explicitly.

### PrepGroup template

```ts
{
  base: '<preposition>',
  baseEn: '<English meaning>',
  baseTr: '<Turkish meaning>',
  examples: [
    { pt: '<sentence>', en: '<English>', tr: '<Turkish>', label: '<Use-case label>', labelTr: '<Turkish label>' },
    { pt: '<sentence>', en: '<English>', tr: '<Turkish>' },
    { pt: '<sentence>', en: '<English>', tr: '<Turkish>' },
  ],
  members: ['<base>', '<contracted forms if any>'],
  definite: [
    { pt: '<contracted form>', enHint: '<prep> + <article> → <meaning>', trHint: '<Turkish>' },
  ],
  indefinite: [ /* optional */ ],
  spoken: [ /* optional informal contractions */ ],
  tip: { en: '<quick-tip comparing to similar preposition>', tr: '<Turkish>' }, // optional
},
```

After adding, update the `prepGroupByWord` export at the bottom (it is auto-derived from `prepGroups`, so no manual edit needed there).

---

## A1/A2 Language Level Guide

All example sentences must stay within A1/A2 CEFR vocabulary and grammar. This keeps them accessible for young learners and consistent with the app's level.

### A1/A2 vocabulary — USE these freely
- **People**: eu, tu, ele, ela, nós, eles, o meu pai, a minha mãe, a professora, o colega, os amigos, o João, a Maria
- **Places**: escola, casa, jardim, parque, praia, sala de aula, recreio, cozinha, quarto, supermercado, Lisboa, Porto
- **Food**: água, leite, pão, sopa, frango, arroz, fruta, bolacha, sumo, bolo, maçã
- **Objects**: livro, caderno, lápis, mochila, bola, mesa, cadeira, telemóvel, chaves
- **Time**: hoje, amanhã, ontem, agora, depois, antes, cedo, tarde, sempre, nunca, às vezes
- **Adjectives**: grande, pequeno, bom, mau, bonito, feliz, triste, cansado, rápido, fácil, difícil, quente, frio
- **Common verbs**: ser, estar, ter, ir, vir, fazer, comer, beber, estudar, jogar, falar, ver, ouvir, correr, brincar

### A1/A2 grammar — USE these structures
- Simple present: "Eu como sopa."
- Near future: "Eu vou comer sopa."
- Continuous (EP): "Eu estou a comer sopa."
- Simple past (perfeito): "Eu comi sopa ontem."
- Simple negation: "Não quero ir."
- Simple questions: "Queres vir?"
- Modal + infinitive: "Posso ir ao recreio?"
- Quantity phrases: "um pouco de", "muito", "mais", "só"

### DO NOT USE at A1/A2 level
- Subjunctive mood (*que eu fale*, *para que saibas*) — avoid entirely
- Conditional (*eu faria*, *seria melhor*) — avoid entirely
- Complex relative clauses (*o livro que a professora nos deu para ler em casa*)
- Passive voice (*foi escrito por*)
- Advanced vocabulary: *determinar*, *estabelecer*, *consequência*, *relativamente*, *nomeadamente*
- Long multi-clause sentences with more than one subordinate clause
- Abstract or philosophical ideas

### A1/A2 sentence length
- Target: **5–10 words** per sentence
- Maximum: **12 words** — if longer, split into two sentences
- Good: "O João vai à escola de autocarro." (7 words) ✓
- Bad: "O João, que mora perto da escola, vai sempre de autocarro porque a mãe trabalha." ✗

---

## Portugal Cultural Reference

All example sentences — verbs, adverbs, prepositions — must feel natural to a child living in Portugal. Use the following as your reference pool:

### People & names
Common Portuguese first names: **João, Maria, Ana, Tiago, Inês, Beatriz, Francisco, Margarida, Rui, Sofia, Miguel, Marta, Pedro, Leonor**.

### Food & meals
- Breakfast (*pequeno-almoço*): toast, *torrada*, *leite com cereais*, *sumo de laranja*
- Lunch (*almoço*): *sopa*, *carne com batatas*, *arroz de tomate*, *frango assado*, *bacalhau*
- Snack (*lanche*): *pão com manteiga*, *bolacha*, *sumo*, *fruta*
- Dinner (*jantar*): similar to lunch, family at the table
- Avoid pizza, tacos, sushi as primary examples — use them occasionally only as contrast

### Schools & daily routine
- Schools: *escola primária*, *escola secundária*; children say *professora* not *teacher*
- School day: starts ~9h, *recreio* at ~10:30h, lunch ~12:30h, ends ~17:30h
- Common activities: *trabalhos de casa*, *testes*, *educação física*, *visita de estudo*

### Places in Portugal
- Cities: **Lisboa, Porto, Coimbra, Faro, Braga, Setúbal, Sintra, Cascais, Évora**
- Landmarks: *Torre de Belém*, *Castelo de São Jorge*, *Ponte 25 de Abril*, *Parque das Nações*
- Beaches: *Praia de Cascais*, *Praia da Comporta*, *Praia do Guincho*, *Algarve*
- Transport: *autocarro*, *metro* (Lisboa/Porto), *comboio* (CP), *elétrico 28* in Lisboa

### Sports & leisure
- Football (*futebol*) is the dominant sport; clubs: *Benfica*, *Sporting*, *Porto*
- Also common: *natação*, *ginástica*, *basquete*
- Children play *à apanhada*, *escondidas*, *à bola* at *recreio*

### Culture & celebrations
- *Carnaval* (February), *Páscoa* (Easter), *Dia de Portugal* (10 June), *São João* (Porto, June), *Natal*
- Family gatherings are central — *almoço de domingo em família* is a key cultural moment
- *Pastel de nata*, *bifana*, *prego*, *caldo verde* are iconic Portuguese foods

### Language register
- Say *casa de banho* not *banheiro*; *autocarro* not *ônibus*; *telemóvel* not *celular*; *pequeno-almoço* not *café da manhã*
- *fixes* → *trata*; *vais buscar* → *vais apanhar/buscar*
- Avoid any Brazilian Portuguese phrasing or vocabulary

---

## Step 8 — Commit and push

After all edits are applied, run from `Practice Portugese for Kids/Portugese for Kids`:

```bash
git add src/data/words.ts src/data/verbConjugations.ts src/data/adverbData.ts src/data/prepGroups.ts
git commit -m "feat: add new vocabulary and modals"
git push
```
