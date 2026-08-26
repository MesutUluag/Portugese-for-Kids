# Story Prefetch Plan

## Overview

Users wait 5–10 seconds per story because text and image are fetched on-demand when the user taps "Próxima". This plan introduces a prefetch mechanism:

- **On mount:** fetch 3 stories + 3 images in parallel, display the first immediately.
- **On "Próxima":** consume from the prefetch queue (instant display), then replenish the queue to always keep 2 stories ahead.
- The prefetch state lives in a custom hook `useStoryPrefetch` co-located with `StoryMode`.

### Scope
- Frontend only (`ai.ts`, `StoryMode.tsx`, new `useStoryPrefetch.ts`, updated `useBackendImage.ts`).
- No backend changes required.

### Non-Goals
- No server-side push / WebSockets.
- No persistence between sessions.
- No change to the 50 req/day rate limit — prefetch counts against it as requested.

---

## Sub-Tasks

---

### Sub-Task 1 — Extract image fetch logic into a standalone async function

**Status:** `[ ] pending`

**Intent:**
`useBackendImage` is a React hook — it ties image fetching to component rendering. To prefetch images before their component mounts, we need a plain async function that fetches an image and returns a blob URL. The hook will be updated to use this function.

**Expected Outcomes:**
- A new exported function `fetchImageBlobUrl(prompt: string): Promise<string>` exists in `useBackendImage.ts`.
- The existing `useBackendImage` hook delegates to this function (behaviour unchanged for existing callers).
- `StoryIllustration` continues to work without modification.

**Todo List:**
1. In `useBackendImage.ts`, extract the fetch-and-blob logic into an exported async function `fetchImageBlobUrl(prompt: string): Promise<string>` that throws on HTTP 429 or non-ok responses.
2. Rewrite the `useBackendImage` hook body to call `fetchImageBlobUrl` and map the result / errors to the same `'loading' | 'blocked' | string` state shape.

**Relevant Context:**
- `Practice Portugese for Kids/Portugese for Kids/src/utils/useBackendImage.ts` — current hook, lines 16–28.

---

### Sub-Task 2 — Create `useStoryPrefetch` hook

**Status:** `[ ] pending`

**Intent:**
Encapsulate all prefetch logic in a single hook that manages a story queue and an image blob-URL cache. `StoryMode` will consume this hook instead of calling `getNewStoryPage` directly.

**Expected Outcomes:**
- A new file `Practice Portugese for Kids/Portugese for Kids/src/utils/useStoryPrefetch.ts` exists.
- The hook returns `{ queue, popQueue, imageCache }`.
- On mount it fires 3 parallel story fetches, then fires 3 parallel image prefetches once story text is available.
- After `popQueue()` is called (user moved to next story), the hook checks if the queue has fewer than 2 entries and triggers a background refill (1 story + 1 image) to restore depth to 2.
- Image blob URLs are stored in a `Map<string, string>` keyed by `imagePrompt`, so `StoryIllustration` can be given a pre-fetched URL instead of fetching again.

**Todo List:**
1. Create `useStoryPrefetch.ts`.
2. Define internal state: `queue: StoryPage[]` and `imageCache: Map<string, string>`.
3. On mount (`useEffect` with empty deps), call `getNewStoryPage` three times in parallel (`Promise.allSettled`) and populate `queue` with fulfilled results; for each fulfilled story, call `fetchImageBlobUrl` and store in `imageCache`.
4. Implement `popQueue(): StoryPage | undefined` — removes and returns the first item in the queue, then schedules a background refill if `queue.length - 1 < 2`.
5. Background refill: fetch 1 new story + 1 image (using `fetchImageBlobUrl`) and append to queue / cache.
6. Use `useRef` to guard against concurrent refill calls (don't double-fetch if a refill is already in flight).
7. Export the hook with type `{ queue: StoryPage[]; popQueue: () => StoryPage | undefined; imageCache: Map<string, string>; }`.

**Relevant Context:**
- `Practice Portugese for Kids/Portugese for Kids/src/utils/ai.ts` — `getNewStoryPage`, `AiState`.
- `Practice Portugese for Kids/Portugese for Kids/src/utils/useBackendImage.ts` — `fetchImageBlobUrl` (from Sub-Task 1).
- `Practice Portugese for Kids/Portugese for Kids/src/data/words.ts` — `StoryPage` type.

---

### Sub-Task 3 — Integrate `useStoryPrefetch` into `StoryMode`

**Status:** `[ ] pending`

**Intent:**
Replace the on-demand `getNewStoryPage` calls in `StoryMode` with queue consumption from `useStoryPrefetch`. The first story is taken from the queue (already prefetched), so the loading spinner on mount should disappear or be very brief. Navigation to the next story should be instant when the queue is populated.

**Expected Outcomes:**
- `loadFirst()` no longer calls `getNewStoryPage`; it waits for `queue[0]` to be available (or falls back to on-demand if the queue is still empty) then consumes it via `popQueue()`.
- `handleNext()` calls `popQueue()` to get the next page instantly when available; falls back to `getNewStoryPage` if the queue is empty (edge case: user navigates faster than prefetch).
- `setLoading(true)` is only shown when the queue is empty (i.e. the fallback path is taken).
- `history` array continues to work for back-navigation (no change to `handlePrev`).

**Todo List:**
1. Call `useStoryPrefetch(aiState, onAiChange)` at the top of `StoryMode`.
2. Rewrite `loadFirst()`: if `queue.length > 0`, call `popQueue()` synchronously and set history — no loading state needed. If queue is still empty (prefetch in flight), poll with a short interval or fall back to `getNewStoryPage`.
3. Rewrite `handleNext()`: if `nextIndex < history.length` (back-navigation), unchanged. Otherwise call `popQueue()` — if a page is returned, use it immediately without `setLoading`. If `undefined` (queue empty), fall back to `getNewStoryPage` with `setLoading`.
4. Remove the now-unused direct import of `getNewStoryPage` if no longer referenced.

**Relevant Context:**
- `Practice Portugese for Kids/Portugese for Kids/src/components/StoryMode.tsx` — full file.
- `Practice Portugese for Kids/Portugese for Kids/src/utils/useStoryPrefetch.ts` — new hook from Sub-Task 2.

---

### Sub-Task 4 — Pass pre-fetched image URL into `StoryIllustration`

**Status:** `[ ] pending`

**Intent:**
`StoryIllustration` currently triggers its own `useBackendImage` fetch when it mounts. Now that the image is already cached in `imageCache`, we should pass it in as a prop so the image appears instantly without an additional network request or loading state.

**Expected Outcomes:**
- `StoryIllustration` accepts an optional `prefetchedImageUrl?: string` prop.
- When `prefetchedImageUrl` is provided and non-empty, it is used instead of calling `useBackendImage`.
- When not provided (or empty), `useBackendImage` is called as before — backward compatible.
- No visible change in appearance; image simply loads faster (or instantly).

**Todo List:**
1. Add `prefetchedImageUrl?: string` to the `Props` interface in `StoryIllustration.tsx`.
2. In the component body, derive `imgResult` from `prefetchedImageUrl` if provided, otherwise call `useBackendImage(prompt)` (conditionally call the hook only when needed — use a flag/helper to avoid conditional hook rules: keep the hook call unconditional but override its value).
3. In `StoryMode.tsx`, look up `imageCache.get(buildPrompt(page))` and pass it as `prefetchedImageUrl` to `StoryIllustration`.

**Relevant Context:**
- `Practice Portugese for Kids/Portugese for Kids/src/components/StoryIllustration.tsx` — full file.
- `Practice Portugese for Kids/Portugese for Kids/src/components/StoryMode.tsx` — where `StoryIllustration` is rendered (line 101).
- React rules of hooks — hooks cannot be called conditionally; call `useBackendImage` unconditionally but only use its value when `prefetchedImageUrl` is absent.

---

## Implementation Notes

- `Promise.allSettled` must be used (not `Promise.all`) for prefetch calls so a single failed story/image fetch does not abort the others.
- The `aiState` and `onAiChange` props must be passed into the hook to preserve the existing fallback-to-template behaviour.
- Blob URLs created via `URL.createObjectURL` should be revoked when the component unmounts to avoid memory leaks (`URL.revokeObjectURL`). Add a cleanup effect in the hook.
- The refill guard (`useRef`) prevents a race condition where the user navigates quickly and triggers multiple concurrent refill fetches.
