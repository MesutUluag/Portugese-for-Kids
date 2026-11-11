import { useEffect, useRef, useCallback } from 'react';
import { Mode } from '../data/index';
import { StoryContext } from '../utils/ai';
import {
  useAuth,
  applySyncToProfile,
  createDefaultProfile,
  saveDevProfile,
} from './AuthContext';
import { getAuthToken, isDevMockAuthEnabled } from './firebase';
import { TelemetryOutbox, StatsSyncRequest, UserProfile } from './types';

const STORAGE_OUTBOX_KEY = 'kids_unsynced_stats_v1';
const IDLE_TIMEOUT_MS = 180_000; // 3 minutes without interaction

const API_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8081/api'
  : 'https://portugese-for-kids-backend-784137631227.us-central1.run.app/api';

function getLocalDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadOutbox(currentUid: string): TelemetryOutbox {
  try {
    const raw = localStorage.getItem(STORAGE_OUTBOX_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TelemetryOutbox;
      if (parsed && typeof parsed.activeSecondsDelta === 'number') {
        if (!parsed.scoreByModeDelta) {
          parsed.scoreByModeDelta = {};
        }
        // If guest outbox exists and user just logged in, re-tag owner
        if (parsed.ownerUid === 'guest' && currentUid !== 'guest') {
          parsed.ownerUid = currentUid;
          return parsed;
        }
        // Only reuse outbox if it belongs to the same user (prevents cross-child bleed on shared devices)
        if (parsed.ownerUid === currentUid) {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn('[telemetry] Failed to load outbox from localStorage:', e);
  }

  return {
    ownerUid: currentUid,
    activeSecondsDelta: 0,
    timeByModeDelta: {},
    gamesCompletedDelta: {},
    storiesByContextDelta: {},
    scoreDelta: 0,
    scoreByModeDelta: {},
    speechListenDelta: 0,
  };
}

function saveOutbox(outbox: TelemetryOutbox): void {
  try {
    localStorage.setItem(STORAGE_OUTBOX_KEY, JSON.stringify(outbox));
  } catch (e) {
    console.warn('[telemetry] Failed to save outbox to localStorage:', e);
  }
}

export function useStatsTracker(currentMode: Mode) {
  const { user, profile, authReady, setProfile, registerBeforeSignOut, registerFlushHandler } = useAuth();
  const currentUid = user ? user.uid : 'guest';

  const outboxRef = useRef<TelemetryOutbox>(loadOutbox(currentUid));
  const lastInteractionRef = useRef<number>(Date.now());
  const isSyncingRef = useRef<boolean>(false);
  const modeRef = useRef<Mode>(currentMode);
  modeRef.current = currentMode;

  // Track user interactions to detect idle/AFK
  useEffect(() => {
    const handleInteraction = () => {
      lastInteractionRef.current = Date.now();
    };

    window.addEventListener('pointerdown', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const deductSentDeltas = (outbox: TelemetryOutbox, payload: StatsSyncRequest) => {
    outbox.activeSecondsDelta = Math.max(0, outbox.activeSecondsDelta - payload.activeSecondsDelta);
    outbox.scoreDelta = Math.max(0, outbox.scoreDelta - payload.scoreDelta);
    outbox.speechListenDelta = Math.max(0, outbox.speechListenDelta - payload.speechListenDelta);

    if (payload.scoreByModeDelta) {
      for (const m of Object.keys(payload.scoreByModeDelta) as Mode[]) {
        const current = outbox.scoreByModeDelta[m] ?? 0;
        const sent = payload.scoreByModeDelta[m] ?? 0;
        if (current <= sent) delete outbox.scoreByModeDelta[m];
        else outbox.scoreByModeDelta[m] = current - sent;
      }
    }

    for (const m of Object.keys(payload.timeByModeDelta) as Mode[]) {
      const current = outbox.timeByModeDelta[m] ?? 0;
      const sent = payload.timeByModeDelta[m] ?? 0;
      if (current <= sent) delete outbox.timeByModeDelta[m];
      else outbox.timeByModeDelta[m] = current - sent;
    }

    for (const m of Object.keys(payload.gamesCompletedDelta) as Mode[]) {
      const current = outbox.gamesCompletedDelta[m] ?? 0;
      const sent = payload.gamesCompletedDelta[m] ?? 0;
      if (current <= sent) delete outbox.gamesCompletedDelta[m];
      else outbox.gamesCompletedDelta[m] = current - sent;
    }

    for (const c of Object.keys(payload.storiesByContextDelta) as StoryContext[]) {
      const current = outbox.storiesByContextDelta[c] ?? 0;
      const sent = payload.storiesByContextDelta[c] ?? 0;
      if (current <= sent) delete outbox.storiesByContextDelta[c];
      else outbox.storiesByContextDelta[c] = current - sent;
    }

    saveOutbox(outbox);
  };

  // Flush function to post unsynced deltas to backend
  const flush = useCallback(
    async (keepalive = false): Promise<void> => {
      if (!user) return;
      const outbox = outboxRef.current;
      const hasDeltas =
        outbox.activeSecondsDelta > 0 ||
        outbox.scoreDelta > 0 ||
        outbox.speechListenDelta > 0 ||
        Object.keys(outbox.scoreByModeDelta || {}).length > 0 ||
        Object.keys(outbox.timeByModeDelta).length > 0 ||
        Object.keys(outbox.gamesCompletedDelta).length > 0 ||
        Object.keys(outbox.storiesByContextDelta).length > 0;

      if (!hasDeltas || isSyncingRef.current) return;

      isSyncingRef.current = true;

      // Snapshot current deltas to send
      const payload: StatsSyncRequest = {
        activeSecondsDelta: outbox.activeSecondsDelta,
        timeByModeDelta: { ...outbox.timeByModeDelta },
        gamesCompletedDelta: { ...outbox.gamesCompletedDelta },
        storiesByContextDelta: { ...outbox.storiesByContextDelta },
        scoreDelta: outbox.scoreDelta,
        scoreByModeDelta: { ...outbox.scoreByModeDelta },
        speechListenDelta: outbox.speechListenDelta,
        clientDate: getLocalDateString(),
      };

      const applyLocalFallbackIfDev = () => {
        if (isDevMockAuthEnabled) {
          setProfile((prev) => {
            const base =
              prev ??
              createDefaultProfile(
                user.uid,
                user.email || 'explorer@kids.com',
                user.displayName || 'Kid Explorer'
              );
            const updated = applySyncToProfile(base, payload);
            saveDevProfile(updated);
            return updated;
          });
          deductSentDeltas(outbox, payload);
        }
      };

      try {
        const token = await getAuthToken(false);
        if (!token) {
          applyLocalFallbackIfDev();
          return;
        }

        const res = await fetch(`${API_BASE_URL}/user/stats/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
          keepalive,
        });

        if (res.ok) {
          const updatedProfile = (await res.json()) as UserProfile;
          setProfile(updatedProfile);
          if (isDevMockAuthEnabled) {
            saveDevProfile(updatedProfile);
          }
          deductSentDeltas(outbox, payload);
        } else {
          applyLocalFallbackIfDev();
        }
      } catch (err) {
        console.warn('[telemetry] Sync error:', err);
        applyLocalFallbackIfDev();
      } finally {
        isSyncingRef.current = false;
      }
    },
    [user, setProfile]
  );

  // Register signout and modal-open flush hooks
  useEffect(() => {
    registerBeforeSignOut(async () => {
      await flush(false);
    });
    registerFlushHandler(async () => {
      await flush(false);
    });
  }, [registerBeforeSignOut, registerFlushHandler, flush]);

  // Flush immediately on login or initial session restore, and isolate outbox on user switch/logout
  useEffect(() => {
    if (!authReady) return;
    if (user) {
      if (outboxRef.current.ownerUid === 'guest') {
        outboxRef.current.ownerUid = user.uid;
        saveOutbox(outboxRef.current);
      } else if (outboxRef.current.ownerUid !== user.uid) {
        outboxRef.current = {
          ownerUid: user.uid,
          activeSecondsDelta: 0,
          timeByModeDelta: {},
          gamesCompletedDelta: {},
          storiesByContextDelta: {},
          scoreDelta: 0,
          scoreByModeDelta: {},
          speechListenDelta: 0,
        };
        saveOutbox(outboxRef.current);
      }
      void flush(false);
    } else if (outboxRef.current.ownerUid !== 'guest') {
      // User signed out — reset outbox to a clean guest state
      outboxRef.current = {
        ownerUid: 'guest',
        activeSecondsDelta: 0,
        timeByModeDelta: {},
        gamesCompletedDelta: {},
        storiesByContextDelta: {},
        scoreDelta: 0,
        scoreByModeDelta: {},
        speechListenDelta: 0,
      };
      saveOutbox(outboxRef.current);
    }
  }, [authReady, user, flush]);

  // 1-second active timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - lastInteractionRef.current > IDLE_TIMEOUT_MS) return;

      const outbox = outboxRef.current;
      outbox.activeSecondsDelta += 1;
      const m = modeRef.current;
      outbox.timeByModeDelta[m] = (outbox.timeByModeDelta[m] ?? 0) + 1;

      saveOutbox(outbox);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Periodic flush every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      void flush(false);
    }, 60_000);

    return () => clearInterval(interval);
  }, [flush]);

  // Flush on mode switch if deltas >= 5s
  const prevModeRef = useRef<Mode>(currentMode);
  useEffect(() => {
    if (prevModeRef.current !== currentMode) {
      prevModeRef.current = currentMode;
      if (outboxRef.current.activeSecondsDelta >= 5) {
        void flush(false);
      }
    }
  }, [currentMode, flush]);

  // Flush on tab close or backgrounding
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        void flush(true);
      }
    };

    const handlePageHide = () => {
      void flush(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [flush]);

  const recordStoryView = useCallback(
    (context: StoryContext) => {
      const outbox = outboxRef.current;
      outbox.storiesByContextDelta[context] = (outbox.storiesByContextDelta[context] ?? 0) + 1;
      saveOutbox(outbox);
      void flush(false);
    },
    [flush]
  );

  const recordGameScore = useCallback(
    (mode: Mode, points: number) => {
      const pts = Math.max(0, points);
      const outbox = outboxRef.current;
      outbox.scoreDelta += pts;
      outbox.scoreByModeDelta[mode] = (outbox.scoreByModeDelta[mode] ?? 0) + pts;
      outbox.gamesCompletedDelta[mode] = (outbox.gamesCompletedDelta[mode] ?? 0) + 1;
      saveOutbox(outbox);
      void flush(false);
    },
    [flush]
  );

  const getScoreForMode = useCallback(
    (m: Mode): number => {
      const stored = profile?.stats?.scoreByMode?.[m] ?? 0;
      const unsynced = outboxRef.current.scoreByModeDelta?.[m] ?? 0;
      return stored + unsynced;
    },
    [profile]
  );

  const recordSpeechListen = useCallback(() => {
    const outbox = outboxRef.current;
    outbox.speechListenDelta += 1;
    saveOutbox(outbox);
  }, []);

  return {
    recordStoryView,
    recordGameScore,
    recordSpeechListen,
    getScoreForMode,
    flushNow: () => flush(false),
  };
}
