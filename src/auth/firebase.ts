import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from 'firebase/auth';

export const DEV_SESSION_KEY = 'kids_dev_user_session';
export const DEV_PROFILE_KEY = 'kids_dev_user_profile';

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  !import.meta.env.VITE_FIREBASE_API_KEY.includes('Placeholder')
);

/**
 * Simulated local dev login is strictly restricted to development builds (import.meta.env.DEV)
 * when Firebase environment variables are not configured. Never active in production builds.
 */
export const isDevMockAuthEnabled = Boolean(import.meta.env.DEV && !isFirebaseConfigured);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoPlaceholderKeyForLocalDev123',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'placeholder-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'placeholder-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'placeholder-project.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:placeholder',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Enforce browser local persistence (indexedDB / localStorage)
if (isFirebaseConfigured) {
  void setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('[firebase] Persistence error:', err);
  });
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Returns a valid Firebase ID Token for API calls.
 * Waits for initial auth state hydration (indexedDB) before inspecting auth.currentUser.
 */
export async function getAuthToken(forceRefresh = false): Promise<string | null> {
  try {
    if (isDevMockAuthEnabled) {
      // In local dev mode without Firebase credentials, return mock token when a dev user is signed in
      try {
        return localStorage.getItem(DEV_SESSION_KEY) ? 'mock-dev-token' : null;
      } catch {
        return null;
      }
    }
    if (!isFirebaseConfigured) {
      return null;
    }
    if (typeof auth.authStateReady === 'function') {
      await auth.authStateReady();
    }
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken(forceRefresh);
  } catch (err) {
    console.warn('[firebase] Failed to retrieve auth token:', err);
    return null;
  }
}
