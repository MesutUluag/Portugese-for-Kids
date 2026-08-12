import { useEffect, useState } from 'react';

const cache: Record<string, string | null> = {};

/**
 * Searches Wikimedia Commons for images matching `query` (any phrase).
 * Returns the URL of the best thumbnail found, or null.
 * No API key required.
 */
export function useWikimediaSearch(query: string): string | null {
  const [url, setUrl] = useState<string | null>(cache[query] ?? null);

  useEffect(() => {
    if (!query) return;
    if (query in cache) { setUrl(cache[query]); return; }

    // Wikimedia Commons search: find pages matching the query, then get their image info
    const params = new URLSearchParams({
      action:      'query',
      generator:   'search',
      gsrnamespace: '6',       // File: namespace only
      gsrsearch:   query,
      gsrlimit:    '5',
      prop:        'imageinfo',
      iiprop:      'url|size',
      iiurlwidth:  '400',
      format:      'json',
      origin:      '*',
    });

    fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const pages = data?.query?.pages as Record<string, { imageinfo?: { thumburl?: string; width?: number; height?: number }[] }> | undefined;
        if (!pages) { cache[query] = null; return; }

        // pick the first result that has a thumbnail and is roughly landscape/square (not tiny icon)
        const imgUrl = Object.values(pages)
          .map((p) => p.imageinfo?.[0])
          .filter((ii) => ii?.thumburl && (ii.width ?? 0) >= 100 && (ii.height ?? 0) >= 100)
          .map((ii) => ii!.thumburl!)[0] ?? null;

        cache[query] = imgUrl;
        setUrl(imgUrl);
      })
      .catch(() => { cache[query] = null; });
  }, [query]);

  return url;
}
