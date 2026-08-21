import { useEffect, useState } from 'react';

// Module-level cache: term → URL string (or null when Wikipedia has no image)
// Using a sentinel value so we can distinguish "not yet fetched" from "fetched, no image"
const FETCHED_NO_IMAGE = '__NO_IMAGE__';
const cache: Record<string, string | typeof FETCHED_NO_IMAGE> = {};

export function useWikiImage(term: string): string | null {
  // Derive stable initial value from cache so we never call setUrl unnecessarily on mount
  const initialUrl = (() => {
    if (!term) return null;
    const cached = cache[term];
    if (cached === undefined) return null;
    return cached === FETCHED_NO_IMAGE ? null : cached;
  })();

  const [url, setUrl] = useState<string | null>(initialUrl);

  useEffect(() => {
    if (!term) return;

    // Already cached — update state only if value actually differs (avoids re-render loop)
    if (term in cache) {
      const resolved = cache[term] === FETCHED_NO_IMAGE ? null : (cache[term] as string);
      // Use functional form so this is a no-op when value hasn't changed
      setUrl(prev => (prev === resolved ? prev : resolved));
      return;
    }

    // Extract the first plain English word for a cleaner Wikipedia lookup
    const keyword = term.split(/[\s/]/)[0];

    let cancelled = false;

    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(keyword)}`,
      { headers: { Accept: 'application/json' } },
    )
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        const imgUrl: string | null = data?.thumbnail?.source ?? null;
        cache[term] = imgUrl ?? FETCHED_NO_IMAGE;
        setUrl(imgUrl);
      })
      .catch(() => {
        if (cancelled) return;
        cache[term] = FETCHED_NO_IMAGE;
        setUrl(null);
      });

    return () => { cancelled = true; };
  }, [term]);

  return url;
}
