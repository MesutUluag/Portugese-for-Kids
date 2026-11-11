import { auth, getAuthToken } from '../auth/firebase';

const IMAGE_BACKEND_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8081/api/image'
  : 'https://portugese-for-kids-backend-784137631227.us-central1.run.app/api/image';

const RETRY_DELAYS_MS = [2_000, 5_000]; // delays between attempt 1→2 and 2→3

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches an AI-generated image and returns a blob URL.
 * Retries up to 3 times total (2 retries) with backoff.
 * On a 429 or 401 response throws immediately without burning retries.
 * Automatically attempts 1 token refresh retry on 401 before giving up.
 */
export async function fetchImageBlobUrl(prompt: string, timeoutMs = 30000): Promise<string> {
  const url = `${IMAGE_BACKEND_URL}?imagePrompt=${encodeURIComponent(prompt)}&width=768&height=336`;

  const maxAttempts = RETRY_DELAYS_MS.length + 1; // 3

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      let token = await getAuthToken(false);
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      let res = await fetch(url, { signal: controller.signal, headers });
      clearTimeout(timer);

      // On 401, force-refresh token and retry once
      if (res.status === 401 && auth.currentUser) {
        token = await getAuthToken(true);
        if (token) {
          const retryController = new AbortController();
          const retryTimer = setTimeout(() => retryController.abort(), timeoutMs);
          try {
            res = await fetch(url, {
              signal: retryController.signal,
              headers: { Authorization: `Bearer ${token}` },
            });
          } finally {
            clearTimeout(retryTimer);
          }
        }
      }

      if (res.ok) {
        const blob = await res.blob();
        return URL.createObjectURL(blob);
      }

      if (res.status === 429) {
        throw new Error('rate-limited');
      }

      if (res.status === 401) {
        throw new Error('unauthorized');
      }

      const isLastAttempt = attempt === maxAttempts - 1;
      if (isLastAttempt) {
        throw new Error(`Image fetch failed: ${res.status}`);
      }

      // Wait before retrying
      const delay = RETRY_DELAYS_MS[attempt];
      await sleep(delay);
    } catch (err) {
      clearTimeout(timer);
      if (err instanceof Error && (err.message === 'rate-limited' || err.message === 'unauthorized')) {
        throw err;
      }
      if (attempt === maxAttempts - 1) throw err;
      await sleep(RETRY_DELAYS_MS[attempt]);
    }
  }

  throw new Error('Image fetch failed after all retries');
}
