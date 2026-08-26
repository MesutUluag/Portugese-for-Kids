const IMAGE_BACKEND_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8081/api/image'
  : 'https://portugese-for-kids-backend-784137631227.us-central1.run.app/api/image';

/**
 * Fetches an AI-generated image and returns a blob URL.
 * Throws if the request fails or is rate-limited (429).
 */
export async function fetchImageBlobUrl(prompt: string, timeoutMs = 5000): Promise<string> {
  const url = `${IMAGE_BACKEND_URL}?imagePrompt=${encodeURIComponent(prompt)}&width=768&height=336`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (res.status === 429) throw new Error('rate-limited');
    if (!res.ok) throw new Error(`Image fetch failed: ${res.status}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } finally {
    clearTimeout(timer);
  }
}
