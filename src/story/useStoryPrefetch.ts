import { useEffect, useRef, useState } from 'react';
import { StoryPage } from '../data/index';
import { AiState, StoryContext } from '../utils/ai';
import { fetchImageBlobUrl } from './useBackendImage';

/** Human-readable location label used in fallback image prompts when the LLM omits imagePrompt. */
const CONTEXT_SCENE: Record<StoryContext, string> = {
  school:      'a Portuguese school classroom',
  restaurant:  'a sunny Portuguese restaurant',
  bank:        'a bright Portuguese bank',
  hospital:    'a Portuguese clinic',
  cafe:        'a sunny Portuguese café',
  airport:     'a Portuguese airport',
  market:      'a Portuguese market',
  aima:        'a Portuguese government service office',
  bus:         'a Lisbon bus stop',
  pharmacy:    'a Portuguese pharmacy',
  gas_station: 'a Portuguese petrol station',
  traffic:     'a Portuguese road with traffic',
};

/**
 * Derives the image-generation prompt for a story page.
 * Prefers the LLM-generated imagePrompt when present (always has specific scene detail).
 * Falls back to a context-specific description so the scene location is never hardcoded
 * to "classroom" regardless of which story context is active.
 */
export function buildStoryImagePrompt(page: StoryPage, context: StoryContext = 'school'): string {
  if (page.imagePrompt) return page.imagePrompt;
  const scene = page.en.replace(/[.,!?]/g, '').trim();
  const location = CONTEXT_SCENE[context];
  return `a child in ${location}, ${scene}, colorful cute kids illustration, storybook art, bright colors, simple background, no text`;
}

export interface PrefetchResult {
  /** Fetch and cache the image for a story page. Safe to call multiple times — deduplicates automatically. */
  prefetchImage: (page: StoryPage) => void;
  /** Directly seed the cache with an already-resolved blob URL (e.g. from an app-load prefetch). */
  seedImage: (page: StoryPage, blobUrl: string) => void;
  /** Blob URL cache keyed by image prompt. Populated once the fetch succeeds. */
  imageCache: Map<string, string>;
}

export function useStoryPrefetch(
  _aiState: AiState,
  _onAiChange: (label: string, color: string) => void,
  context: StoryContext = 'school',
): PrefetchResult {
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map());

  // Ref-based set of prompts that are either in-flight or already resolved.
  // Using a ref means reads/writes are always synchronous and never stale,
  // regardless of when (or how many times) prefetchImage is called from async code.
  const fetched = useRef<Set<string>>(new Set());
  // Track all blob URLs so we can revoke them on unmount.
  const blobUrls = useRef<string[]>([]);

  // Reset both caches when context changes; revoke blob URLs on unmount.
  useEffect(() => {
    fetched.current.clear();
    setImageCache(new Map());
    return () => {
      blobUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  function prefetchImage(page: StoryPage): void {
    const prompt = buildStoryImagePrompt(page, context);

    // fetched ref covers both in-flight and completed — skip if already handled.
    if (fetched.current.has(prompt)) return;
    fetched.current.add(prompt);

    void fetchImageBlobUrl(prompt).then((blobUrl) => {
      blobUrls.current.push(blobUrl);
      setImageCache((prev) => new Map(prev).set(prompt, blobUrl));
    }).catch(() => {
      // Remove from fetched so a future prefetchImage call can retry.
      fetched.current.delete(prompt);
    });
  }

  function seedImage(page: StoryPage, blobUrl: string): void {
    const prompt = buildStoryImagePrompt(page, context);
    fetched.current.add(prompt); // prevent prefetchImage from re-fetching
    blobUrls.current.push(blobUrl);
    setImageCache((prev) => new Map(prev).set(prompt, blobUrl));
  }

  return { prefetchImage, seedImage, imageCache };
}
