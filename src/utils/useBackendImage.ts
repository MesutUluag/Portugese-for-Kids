import { useEffect, useState } from 'react';

const IMAGE_BACKEND_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8081/api/image'
  : 'https://portugese-for-kids-backend-784137631227.us-central1.run.app/api/image';

export function useBackendImage(prompt: string): 'loading' | 'blocked' | string {
  const [result, setResult] = useState<'loading' | 'blocked' | string>('loading');

  useEffect(() => {
    let cancelled = false;
    setResult('loading');

    const url = `${IMAGE_BACKEND_URL}?imagePrompt=${encodeURIComponent(prompt)}&width=768&height=336`;

    fetch(url)
      .then((res) => {
        if (cancelled) return;
        if (res.status === 429) { setResult('blocked'); return; }
        if (!res.ok) { setResult('blocked'); return; }
        return res.blob().then((blob) => {
          if (cancelled) return;
          setResult(URL.createObjectURL(blob));
        });
      })
      .catch(() => { if (!cancelled) setResult('blocked'); });

    return () => { cancelled = true; };
  }, [prompt]);

  return result;
}
