import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  signOut,
} from 'firebase/auth';
import {
  auth,
  googleProvider,
  getAuthToken,
  isFirebaseConfigured,
  isDevMockAuthEnabled,
  DEV_SESSION_KEY,
  DEV_PROFILE_KEY,
} from './firebase';
import { StatsSyncRequest, UserProfile } from './types';

const API_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8081/api'
  : 'https://portugese-for-kids-backend-784137631227.us-central1.run.app/api';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  authReady: boolean;
  isFirebaseConfigured: boolean;
  isAuthModalOpen: boolean;
  authReason?: string;
  resetOobCode: string | null;
  clearResetOobCode: () => void;
  isStatsModalOpen: boolean;
  openAuthModal: (reason?: string) => void;
  closeAuthModal: () => void;
  openStatsModal: () => void;
  closeStatsModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyResetCode: (oobCode: string) => Promise<string>;
  confirmNewPassword: (oobCode: string, newPassword: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  registerBeforeSignOut: (callback: () => Promise<void>) => void;
  registerFlushHandler: (callback: () => Promise<void>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function createMockDevUser(email: string, name: string): User {
  return {
    uid: 'local-dev-user',
    email,
    displayName: name,
    getIdToken: async () => 'mock-dev-token',
  } as unknown as User;
}

export function createDefaultProfile(uid: string, email: string, displayName: string): UserProfile {
  return {
    uid,
    email,
    displayName,
    tier: 'FREE',
    stats: {
      totalTimeSeconds: 0,
      currentStreakDays: 1,
      longestStreakDays: 1,
      lastActiveDate: null,
      totalStoriesPracticed: 0,
      totalScore: 0,
      speechListenCount: 0,
      timeByModeSeconds: {},
      gamesCompletedByMode: {},
      storiesByContext: {},
      dailyTimeSeconds: {},
    },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function loadOrCreateDevProfile(email: string, displayName: string): UserProfile {
  try {
    const raw = localStorage.getItem(DEV_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UserProfile;
      if (parsed && parsed.stats) {
        return { ...parsed, email, displayName, updatedAt: Date.now() };
      }
    }
  } catch {
    // ignore
  }
  const fresh = createDefaultProfile('local-dev-user', email, displayName);
  saveDevProfile(fresh);
  return fresh;
}

export function saveDevProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(DEV_PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export function applySyncToProfile(base: UserProfile, payload: StatsSyncRequest): UserProfile {
  const s = base.stats;
  const storiesDelta = Object.values(payload.storiesByContextDelta || {}).reduce<number>(
    (acc, v) => acc + (v ?? 0),
    0
  );
  const gamesDelta = Object.values(payload.gamesCompletedDelta || {}).reduce<number>(
    (acc, v) => acc + (v ?? 0),
    0
  );
  const modeTimeDelta = Object.values(payload.timeByModeDelta || {}).reduce<number>(
    (acc, v) => acc + (v ?? 0),
    0
  );

  const hasActivity =
    payload.activeSecondsDelta > 0 ||
    storiesDelta > 0 ||
    gamesDelta > 0 ||
    modeTimeDelta > 0 ||
    payload.scoreDelta > 0 ||
    payload.speechListenDelta > 0;

  let currentStreak = s.currentStreakDays;
  let longestStreak = s.longestStreakDays;
  let lastActiveDate = s.lastActiveDate;

  if (hasActivity && payload.clientDate) {
    if (!lastActiveDate) {
      currentStreak = Math.max(1, currentStreak);
      longestStreak = Math.max(longestStreak, currentStreak);
    } else if (lastActiveDate !== payload.clientDate) {
      const prev = new Date(`${lastActiveDate}T00:00:00Z`);
      const cur = new Date(`${payload.clientDate}T00:00:00Z`);
      const diffDays = Math.round((cur.getTime() - prev.getTime()) / 86_400_000);
      if (diffDays === 1) {
        currentStreak += 1;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
    }
    lastActiveDate = payload.clientDate;
  }

  const timeByModeSeconds = { ...s.timeByModeSeconds };
  for (const [k, v] of Object.entries(payload.timeByModeDelta || {})) {
    if (v && v > 0) timeByModeSeconds[k] = (timeByModeSeconds[k] ?? 0) + v;
  }

  const gamesCompletedByMode = { ...s.gamesCompletedByMode };
  for (const [k, v] of Object.entries(payload.gamesCompletedDelta || {})) {
    if (v && v > 0) gamesCompletedByMode[k] = (gamesCompletedByMode[k] ?? 0) + v;
  }

  const storiesByContext = { ...s.storiesByContext };
  for (const [k, v] of Object.entries(payload.storiesByContextDelta || {})) {
    if (v && v > 0) storiesByContext[k] = (storiesByContext[k] ?? 0) + v;
  }

  const dailyTimeSeconds = { ...s.dailyTimeSeconds };
  if (payload.activeSecondsDelta > 0 && payload.clientDate) {
    dailyTimeSeconds[payload.clientDate] =
      (dailyTimeSeconds[payload.clientDate] ?? 0) + payload.activeSecondsDelta;
  }

  return {
    ...base,
    updatedAt: Date.now(),
    stats: {
      totalTimeSeconds: s.totalTimeSeconds + payload.activeSecondsDelta,
      currentStreakDays: currentStreak,
      longestStreakDays: longestStreak,
      lastActiveDate,
      totalStoriesPracticed: s.totalStoriesPracticed + storiesDelta,
      totalScore: s.totalScore + payload.scoreDelta,
      speechListenCount: s.speechListenCount + payload.speechListenDelta,
      timeByModeSeconds,
      gamesCompletedByMode,
      storiesByContext,
      dailyTimeSeconds,
    },
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authReason, setAuthReason] = useState<string | undefined>(undefined);
  const [resetOobCode, setResetOobCode] = useState<string | null>(null);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const beforeSignOutRef = useRef<(() => Promise<void>) | null>(null);
  const flushHandlerRef = useRef<(() => Promise<void>) | null>(null);

  // Detect Firebase password reset action link (?mode=resetPassword&oobCode=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const oobCode = params.get('oobCode');
      if (mode === 'resetPassword' && oobCode) {
        setResetOobCode(oobCode);
        setIsAuthModalOpen(true);
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch {
      // ignore URL parsing errors
    }
  }, []);

  const fetchProfile = async (): Promise<void> => {
    try {
      const token = await getAuthToken(false);
      if (!token) {
        if (isDevMockAuthEnabled && user) {
          return;
        }
        setProfile(null);
        return;
      }
      const res = await fetch(`${API_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = (await res.json()) as UserProfile;
        setProfile(data);
        if (isDevMockAuthEnabled) {
          saveDevProfile(data);
        }
      }
    } catch (e) {
      console.warn('[auth] Failed to fetch user profile:', e);
    }
  };

  useEffect(() => {
    if (isDevMockAuthEnabled) {
      // In dev mode without Firebase credentials, check if user was previously signed in locally
      try {
        const saved = localStorage.getItem(DEV_SESSION_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as { email: string; name: string };
          const mockUser = createMockDevUser(parsed.email, parsed.name);
          setUser(mockUser);
          setProfile(loadOrCreateDevProfile(parsed.email, parsed.name));
          void fetchProfile();
        }
      } catch {
        // ignore
      }
      setAuthReady(true);
      return;
    }

    if (!isFirebaseConfigured) {
      setAuthReady(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
      if (firebaseUser) {
        await fetchProfile();
      } else {
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (reason?: string) => {
    setAuthReason(reason);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthReason(undefined);
    setResetOobCode(null);
  };

  const clearResetOobCode = () => {
    setResetOobCode(null);
  };

  const openStatsModal = () => {
    setIsStatsModalOpen(true);
    void (async () => {
      if (flushHandlerRef.current) {
        await flushHandlerRef.current();
      }
      await fetchProfile();
    })();
  };

  const closeStatsModal = () => {
    setIsStatsModalOpen(false);
  };

  const signInWithGoogle = async (): Promise<void> => {
    if (isDevMockAuthEnabled) {
      const mockUser = createMockDevUser('explorer@kids.com', 'Kid Explorer');
      try {
        localStorage.setItem(DEV_SESSION_KEY, JSON.stringify({ email: 'explorer@kids.com', name: 'Kid Explorer' }));
      } catch { /* ignore */ }
      setUser(mockUser);
      setProfile(loadOrCreateDevProfile('explorer@kids.com', 'Kid Explorer'));
      void fetchProfile();
      closeAuthModal();
      return;
    }

    await signInWithPopup(auth, googleProvider);
    closeAuthModal();
  };

  const signInWithEmail = async (email: string, pass: string): Promise<void> => {
    if (isDevMockAuthEnabled) {
      const name = email.split('@')[0] || 'Kid Explorer';
      const mockUser = createMockDevUser(email.trim(), name);
      try {
        localStorage.setItem(DEV_SESSION_KEY, JSON.stringify({ email: email.trim(), name }));
      } catch { /* ignore */ }
      setUser(mockUser);
      setProfile(loadOrCreateDevProfile(email.trim(), name));
      void fetchProfile();
      closeAuthModal();
      return;
    }

    await signInWithEmailAndPassword(auth, email.trim(), pass);
    closeAuthModal();
  };

  const signUpWithEmail = async (email: string, pass: string, displayName?: string): Promise<void> => {
    if (isDevMockAuthEnabled) {
      const name = displayName?.trim() || email.split('@')[0] || 'Kid Explorer';
      const mockUser = createMockDevUser(email.trim(), name);
      try {
        localStorage.setItem(DEV_SESSION_KEY, JSON.stringify({ email: email.trim(), name }));
      } catch { /* ignore */ }
      setUser(mockUser);
      setProfile(loadOrCreateDevProfile(email.trim(), name));
      void fetchProfile();
      closeAuthModal();
      return;
    }

    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (displayName && displayName.trim()) {
      await updateProfile(cred.user, { displayName: displayName.trim() });
    }
    await cred.user.getIdToken(true);
    await fetchProfile();
    closeAuthModal();
  };

  const resetPassword = async (email: string): Promise<void> => {
    if (isDevMockAuthEnabled) {
      return;
    }
    const basePath = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    const continueUrl = `${window.location.origin}${basePath}`;
    await sendPasswordResetEmail(auth, email.trim(), { url: continueUrl });
  };

  const verifyResetCode = async (oobCode: string): Promise<string> => {
    if (isDevMockAuthEnabled) {
      return 'explorer@kids.com';
    }
    return await verifyPasswordResetCode(auth, oobCode);
  };

  const confirmNewPassword = async (oobCode: string, newPassword: string): Promise<void> => {
    if (isDevMockAuthEnabled) {
      return;
    }
    await confirmPasswordReset(auth, oobCode, newPassword);
  };

  const registerBeforeSignOut = (callback: () => Promise<void>) => {
    beforeSignOutRef.current = callback;
  };

  const registerFlushHandler = (callback: () => Promise<void>) => {
    flushHandlerRef.current = callback;
  };

  const signOutUser = async (): Promise<void> => {
    if (beforeSignOutRef.current) {
      try {
        await beforeSignOutRef.current();
      } catch (err) {
        console.warn('[auth] Error in beforeSignOut hook:', err);
      }
    }
    try {
      localStorage.removeItem(DEV_SESSION_KEY);
    } catch { /* ignore */ }

    if (isFirebaseConfigured) {
      await signOut(auth);
    }
    setUser(null);
    setProfile(null);
    closeStatsModal();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        authReady,
        isFirebaseConfigured: isFirebaseConfigured || !import.meta.env.DEV,
        isAuthModalOpen,
        authReason,
        resetOobCode,
        clearResetOobCode,
        isStatsModalOpen,
        openAuthModal,
        closeAuthModal,
        openStatsModal,
        closeStatsModal,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        verifyResetCode,
        confirmNewPassword,
        signOutUser,
        refreshProfile: fetchProfile,
        setProfile,
        registerBeforeSignOut,
        registerFlushHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
