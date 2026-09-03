import { useEffect, useRef, useState } from 'react';
import { StoryPage } from '../data/words';
import { AiState, StoryContext } from '../utils/ai';
import { fetchImageBlobUrl } from './useBackendImage';

/** Derives the image-generation prompt for a story page (shared with StoryIllustration). */
export function buildStoryImagePrompt(page: StoryPage): string {
  if (page.imagePrompt) return page.imagePrompt;
  const scene = page.en.replace(/[.,!?]/g, '').trim();
  const character = page.mainEmoji ? `a child character ${page.mainEmoji}` : 'a child';
  return `${character} in a classroom scene, ${scene}, colorful cute kids illustration, storybook art, bright colors, simple background, no text`;
}

export interface PrefetchResult {
  /** Prefetch and cache the image for a story page. Safe to call multiple times for the same page. */
  prefetchImage: (page: StoryPage) => void;
  /** Blob URL cache keyed by image prompt. */
  imageCache: Map<string, string>;
}

export function useStoryPrefetch(
  _aiState: AiState,
  _onAiChange: (label: string, color: string) => void,
  context: StoryContext = 'school',
): PrefetchResult {
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map());
  // Track all blob URLs created so we can revoke them on unmount
  const blobUrls = useRef<string[]>([]);

  // Reset image cache when context changes; revoke blob URLs on unmount.
  useEffect(() => {
    setImageCache(new Map());
    return () => {
      blobUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  function prefetchImage(page: StoryPage): void {
    const prompt = buildStoryImagePrompt(page);
    // Skip if already cached
    if (imageCache.has(prompt)) return;
    void fetchImageBlobUrl(prompt).then((blobUrl) => {
      blobUrls.current.push(blobUrl);
      setImageCache((prev) => new Map(prev).set(prompt, blobUrl));
    }).catch(() => {
      // Image prefetch failure is non-fatal — StoryIllustration will show emoji placeholder
    });
  }

  return { prefetchImage, imageCache };
}
