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
 * On a 429 response throws immediately without retrying.
 * Throws if all attempts fail.
 */
export async function fetchImageBlobUrl(prompt: string, timeoutMs = 30000): Promise<string> {
  const url = `${IMAGE_BACKEND_URL}?imagePrompt=${encodeURIComponent(prompt)}&width=768&height=336`;

  const maxAttempts = RETRY_DELAYS_MS.length + 1; // 3

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);

      if (res.ok) {
        const blob = await res.blob();
        return URL.createObjectURL(blob);
      }

      const isRateLimited = res.status === 429;
      if (isRateLimited) {
        // Daily rate limit exceeded — retrying will not succeed today
        throw new Error('rate-limited');
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
      if (err instanceof Error && err.message === 'rate-limited') throw err;
      // Re-throw on last attempt or if it was an abort/network error on last attempt
      if (attempt === maxAttempts - 1) throw err;
      await sleep(RETRY_DELAYS_MS[attempt]);
    }
  }

  // Unreachable, but satisfies TypeScript
  throw new Error('Image fetch failed after all retries');
}
