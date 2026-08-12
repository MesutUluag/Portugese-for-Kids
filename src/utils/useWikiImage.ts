import { useEffect, useState } from 'react';

const cache: Record<string, string | null> = {};

export function useWikiImage(term: string): string | null {
  const [url, setUrl] = useState<string | null>(cache[term] ?? null);

  useEffect(() => {
    if (!term) return;
    if (term in cache) { setUrl(cache[term]); return; }

    // extract the first plain English word for a cleaner Wikipedia lookup
    const keyword = term.split(/[\s/]/)[0];

    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(keyword)}`,
      { headers: { Accept: 'application/json' } }
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const imgUrl: string | null = data?.thumbnail?.source ?? null;
        cache[term] = imgUrl;
        setUrl(imgUrl);
      })
      .catch(() => {
        cache[term] = null;
      });
  }, [term]);

  return url;
}
