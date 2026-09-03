import { useEffect, useRef, useState } from 'react';
import { StoryPage } from '../data/words';
import { AiState, StoryContext, getNewStoryPage } from '../utils/ai';
import { fetchImageBlobUrl } from './useBackendImage';

/** Derives the image-generation prompt for a story page (shared with StoryIllustration). */
export function buildStoryImagePrompt(page: StoryPage): string {
  if (page.imagePrompt) return page.imagePrompt;
  const scene = page.en.replace(/[.,!?]/g, '').trim();
  const character = page.mainEmoji ? `a child character ${page.mainEmoji}` : 'a child';
  return `${character} in a classroom scene, ${scene}, colorful cute kids illustration, storybook art, bright colors, simple background, no text`;
}

const QUEUE_TARGET = 1; // keep at least 1 story ahead in queue

export interface PrefetchResult {
  /** Remove and return the first story in the queue. */
  popQueue: () => StoryPage | undefined;
  /**
   * Call after the user consumes a story. Fetches the next story + image in the
   * background if the queue is below QUEUE_TARGET. Safe to call multiple times.
   */
  triggerRefill: () => void;
  /** Blob URL cache keyed by image prompt. */
  imageCache: Map<string, string>;
}

export function useStoryPrefetch(
  aiState: AiState,
  onAiChange: (label: string, color: string) => void,
  context: StoryContext = 'school',
): PrefetchResult {
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map());

  // Queue lives entirely in a ref — mutations never need to trigger a re-render
  const queueRef = useRef<StoryPage[]>([]);
  // Guard against concurrent refill fetches
  const refilling = useRef(false);
  // Track all blob URLs created so we can revoke them on unmount
  const blobUrls = useRef<string[]>([]);

  /** Fetch an image for a page and store it in the cache. */
  async function prefetchImage(page: StoryPage): Promise<void> {
    const prompt = buildStoryImagePrompt(page);
    try {
      const blobUrl = await fetchImageBlobUrl(prompt);
      blobUrls.current.push(blobUrl);
      setImageCache((prev) => new Map(prev).set(prompt, blobUrl));
    } catch {
      // Image prefetch failure is non-fatal — StoryIllustration will show emoji placeholder
    }
  }

  /** Fetch one story + its image and append both to queue / cache. */
  async function refillOne(): Promise<void> {
    const page = await getNewStoryPage(aiState, onAiChange, context);
    queueRef.current = [...queueRef.current, page];
    await prefetchImage(page);
  }

  // Reset queue and image cache when context changes; revoke blob URLs on unmount.
  useEffect(() => {
    if (!aiState) return;
    queueRef.current = [];
    setImageCache(new Map());
    return () => {
      blobUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiState, context]);

  function popQueue(): StoryPage | undefined {
    const [first, ...rest] = queueRef.current;
    if (!first) return undefined;
    queueRef.current = rest;
    return first;
  }

  function triggerRefill(): void {
    if (queueRef.current.length < QUEUE_TARGET && !refilling.current) {
      refilling.current = true;
      void refillOne().finally(() => { refilling.current = false; });
    }
  }

  return { popQueue, triggerRefill, imageCache };
}
