import { useEffect, useState } from 'react';

const THIRTY_SECONDS_MS = 30 * 1000;
let imageBlockedUntil = 0;

export function usePollinationsImage(url: string): 'loading' | 'blocked' | string {
  const [result, setResult] = useState<'loading' | 'blocked' | string>('loading');

  useEffect(() => {
    let cancelled = false;

    if (Date.now() < imageBlockedUntil) {
      setResult('blocked');
      return;
    }

    setResult('loading');

    fetch(url)
      .then((res) => {
        if (cancelled) return;
        if (res.status === 429) {
          imageBlockedUntil = Date.now() + THIRTY_SECONDS_MS;
          setResult('blocked');
          return;
        }
        if (!res.ok) { setResult('blocked'); return; }
        return res.blob().then((blob) => {
          if (cancelled) return;
          setResult(URL.createObjectURL(blob));
        });
      })
      .catch(() => { if (!cancelled) setResult('blocked'); });

    return () => { cancelled = true; };
  }, [url]);

  return result;
}
