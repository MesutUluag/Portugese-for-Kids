import React, { Suspense, useEffect, useRef, useState } from 'react';
import LoadingSpinner from './commons/LoadingSpinner';
import {
  LayoutGrid,
  BookOpen,
  Image,
  Headphones,
  Layers,
  PencilLine,
  Puzzle,
  Globe,
  Timer,
  Volume2,
  VolumeX,
  ShoppingCart,
  Grid3X3,
  Flame,
  LogIn,
  Trophy,
  Lock,
} from 'lucide-react';
import { Mode, StoryPage } from './data/index';
import { AiState, initAI, getNewStoryPage } from './utils/ai';
import { buildStoryImagePrompt } from './story/useStoryPrefetch';
import { fetchImageBlobUrl } from './story/useBackendImage';
import { useAuth } from './auth/AuthContext';
import { useStatsTracker } from './auth/useStatsTracker';
import AuthModal from './auth/AuthModal';
import StatsModal from './auth/StatsModal';
import LeaderboardModal from './auth/LeaderboardModal';

const CardsMode = React.lazy(() => import('./components/CardsMode'));
const StoryMode = React.lazy(() => import('./story/StoryMode'));
const Game1 = React.lazy(() => import('./components/Game1'));
const Game2 = React.lazy(() => import('./components/Game2'));
const Game3 = React.lazy(() => import('./components/Game3'));
const Game4 = React.lazy(() => import('./components/Game4'));
const Game5 = React.lazy(() => import('./components/Game5'));
const Game6 = React.lazy(() => import('./components/Game6'));
const Game7 = React.lazy(() => import('./components/Game7'));
const Game8 = React.lazy(() => import('./components/Game8'));

const MUSIC_TRACKS = [
  'alex-morgan-kids-background-music-579469.mp3',
  'alex-morgan-kids-playground-giggles-parade-578468.mp3',
  'nastelbom-kids-happy-488308.mp3',
  'playstarz_music-kids-happy-background-music-442778.mp3',
  'sigmamusicart-kids-happy-background-music-401734.mp3',
] as const;
const BACKGROUND_MUSIC_VOLUME = 0.03;

export default function App(): React.ReactElement {
  const { user, profile, openAuthModal, openStatsModal, openLeaderboardModal } = useAuth();
  const [mode, setMode] = useState<Mode>('cards');
  const [pendingModeAfterAuth, setPendingModeAfterAuthState] = useState<Mode | null>(() => {
    try {
      return (sessionStorage.getItem('kids_pending_mode_after_auth') as Mode) || null;
    } catch {
      return null;
    }
  });

  const setPendingModeAfterAuth = (m: Mode | null) => {
    setPendingModeAfterAuthState(m);
    try {
      if (m) {
        sessionStorage.setItem('kids_pending_mode_after_auth', m);
      } else {
        sessionStorage.removeItem('kids_pending_mode_after_auth');
      }
    } catch {
      // ignore
    }
  };
  const [_score, setScore] = useState(0);
  const [_bounce, setBounce] = useState(false);
  const [recentGain, setRecentGain] = useState<number | null>(null);
  const [gainKey, setGainKey] = useState<number>(0);
  const recentGainTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [aiState, setAiState] = useState<AiState>(null);
  const [language, setLanguage] = useState<'en' | 'tr'>('en');

  // Stats Tracker hook
  const { recordStoryView, recordGameScore, recordSpeechListen, getScoreForMode } = useStatsTracker(mode);

  // Authenticated prefetch refs
  const storyPrefetchRef = useRef<Promise<StoryPage> | null>(null);
  const imagePrefetchRef = useRef<Promise<string> | null>(null);
  const replyPrefetchRef = useRef<Promise<StoryPage> | null>(null);
  const replyImagePrefetchRef = useRef<Promise<string> | null>(null);
  const createdBlobUrlsRef = useRef<string[]>([]);

  // Authenticated background prefetch pipeline:
  // Starts only when user is logged in (session restored or fresh login).
  // Cleans up & revokes blob URLs on logout or guest state.
  useEffect(() => {
    if (!user) {
      if (mode !== 'cards') {
        setMode('cards');
      }
      storyPrefetchRef.current = null;
      imagePrefetchRef.current = null;
      replyPrefetchRef.current = null;
      replyImagePrefetchRef.current = null;
      createdBlobUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      });
      createdBlobUrlsRef.current = [];
      return;
    }

    if (pendingModeAfterAuth) {
      const nextMode = pendingModeAfterAuth;
      setPendingModeAfterAuth(null);
      setMode(nextMode);
    }

    if (storyPrefetchRef.current !== null) return;

    const p1 = getNewStoryPage('backend', () => {}, 'school');
    storyPrefetchRef.current = p1;

    imagePrefetchRef.current = p1
      .then(async (page) => {
        const url = await fetchImageBlobUrl(buildStoryImagePrompt(page));
        if (url) createdBlobUrlsRef.current.push(url);
        return url;
      })
      .catch(() => '');

    const p2 = p1
      .then((page) => getNewStoryPage('backend', () => {}, 'school', page.pt, [page.pt]))
      .catch(() => undefined as unknown as StoryPage);
    replyPrefetchRef.current = p2;

    replyImagePrefetchRef.current = p2
      .then(async (reply) => {
        if (!reply) return '';
        const url = await fetchImageBlobUrl(buildStoryImagePrompt(reply));
        if (url) createdBlobUrlsRef.current.push(url);
        return url;
      })
      .catch(() => '');
  }, [user]);

  const [musicEnabled, setMusicEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('kids_music_enabled');
      if (saved !== null) return saved === 'true';
    } catch (e) {
      console.error('Failed to load music preference:', e);
    }
    return !import.meta.env.DEV;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTrackRef = useRef<string | null>(
    MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)]
  );
  const musicEnabledRef = useRef(musicEnabled);

  function buildTrackUrl(track: string): string {
    const basePath = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    return `${window.location.origin}${basePath}music/${track}`;
  }

  const [timeSpent, setTimeSpent] = useState<number>(() => {
    try {
      const today = getTodayDateString();
      const savedDate = localStorage.getItem('kids_study_time_date');
      const savedSeconds = localStorage.getItem('kids_study_time_seconds');
      if (savedDate === today && savedSeconds) {
        return parseInt(savedSeconds, 10) || 0;
      }
    } catch (e) {
      console.error('Failed to load study time:', e);
    }
    return 0;
  });

  const syncedProfileUidRef = useRef<string | null>(null);

  // Sync local timeSpent with server dailyTimeSeconds when profile loads or user changes
  useEffect(() => {
    const today = getTodayDateString();
    if (!user) {
      if (syncedProfileUidRef.current !== null) {
        syncedProfileUidRef.current = null;
        setTimeSpent(0);
        try {
          localStorage.setItem('kids_study_time_date', today);
          localStorage.setItem('kids_study_time_seconds', '0');
        } catch {
          // ignore
        }
      }
      return;
    }

    if (!profile) return;

    const serverTodaySeconds = profile.stats?.dailyTimeSeconds?.[today] ?? 0;
    const isInitialSyncForUser = syncedProfileUidRef.current !== profile.uid;

    if (isInitialSyncForUser || serverTodaySeconds > timeSpent) {
      syncedProfileUidRef.current = profile.uid;
      setTimeSpent(serverTodaySeconds);
      try {
        localStorage.setItem('kids_study_time_date', today);
        localStorage.setItem('kids_study_time_seconds', String(serverTodaySeconds));
      } catch {
        // ignore
      }
    }
  }, [user, profile, timeSpent]);

  useEffect(() => {
    void initAI((_label, _color) => {}).then((state) => setAiState(state));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState !== 'visible') {
        return;
      }

      setTimeSpent((prev) => {
        const next = prev + 1;
        try {
          const today = getTodayDateString();
          localStorage.setItem('kids_study_time_date', today);
          localStorage.setItem('kids_study_time_seconds', String(next));
        } catch (e) {
          console.error('Failed to save study time:', e);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function playTrack() {
    const audio = audioRef.current;
    if (!audio || !musicEnabledRef.current) return;
    const choices = MUSIC_TRACKS.filter((t) => t !== lastTrackRef.current);
    const next = choices[Math.floor(Math.random() * choices.length)] ?? MUSIC_TRACKS[0];
    lastTrackRef.current = next;
    audio.src = buildTrackUrl(next);
    audio.volume = BACKGROUND_MUSIC_VOLUME;
    audio.load();
    void audio.play().catch((err) => console.warn('[Music] play failed', err));
  }

  useEffect(() => {
    const audio = document.createElement('audio');
    audio.preload = 'auto';
    audio.volume = BACKGROUND_MUSIC_VOLUME;
    audioRef.current = audio;
    audio.addEventListener('ended', playTrack);

    playTrack();

    function onFirstInteraction() {
      if (!musicEnabledRef.current || !audio.paused) return;
      playTrack();
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('keydown', onFirstInteraction);
    }
    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('keydown', onFirstInteraction);

    return () => {
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('keydown', onFirstInteraction);
      audio.removeEventListener('ended', playTrack);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    musicEnabledRef.current = musicEnabled;
    try {
      localStorage.setItem('kids_music_enabled', String(musicEnabled));
    } catch (e) {
      console.error('Failed to save music preference:', e);
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (!musicEnabled) {
      audio.pause();
    } else if (audio.paused && audio.src) {
      void audio.play().catch((err) => console.warn('[Music] resume failed', err));
    }
  }, [musicEnabled]);

  function addScore(pts: number) {
    setScore((s) => s + pts);
    recordGameScore(mode, pts);
    setBounce(true);
    setTimeout(() => setBounce(false), 300);

    setGainKey((k) => k + 1);
    setRecentGain(pts);
    if (recentGainTimerRef.current) {
      clearTimeout(recentGainTimerRef.current);
    }
    recentGainTimerRef.current = setTimeout(() => {
      setRecentGain(null);
    }, 1000);
  }

  type NavButton = { key: Mode; label: string; labelTr: string; cls: string; icon: React.ReactNode };
  const navButtons: NavButton[] = [
    { key: 'cards',  label: 'Cards',        labelTr: 'Kartlar',        cls: 'btn-kids',   icon: <LayoutGrid  size={15} strokeWidth={2} /> },
    { key: 'story',  label: 'Story',        labelTr: 'Hikaye',         cls: 'btn-story',  icon: <BookOpen    size={15} strokeWidth={2} /> },
    { key: 'game8',  label: 'Crossword',    labelTr: 'Çengel Bulmaca', cls: 'btn-game8',  icon: <Grid3X3     size={15} strokeWidth={2} /> },
    { key: 'game1',  label: 'Picture Game', labelTr: 'Resim Oyunu',    cls: 'btn-game1',  icon: <Image       size={15} strokeWidth={2} /> },
    { key: 'game2',  label: 'Listen & Find',labelTr: 'Dinle & Bul',    cls: 'btn-game2',  icon: <Headphones  size={15} strokeWidth={2} /> },
    { key: 'game3',  label: 'Memory Match', labelTr: 'Hafıza Oyunu',   cls: 'btn-game3',  icon: <Layers      size={15} strokeWidth={2} /> },
    { key: 'game4',  label: 'Fill Blank',   labelTr: 'Boşluk Doldurma',cls: 'btn-game4',  icon: <PencilLine  size={15} strokeWidth={2} /> },
    { key: 'game5',  label: 'Scramble',     labelTr: 'Kelime Bul',     cls: 'btn-game5',  icon: <Puzzle      size={15} strokeWidth={2} /> },
    { key: 'game6',  label: 'Puzzle',       labelTr: 'Yapboz',         cls: 'btn-game6',  icon: <Puzzle      size={15} strokeWidth={2} /> },
    { key: 'game7',  label: 'Market',       labelTr: 'Market Oyunu',   cls: 'btn-game7',  icon: <ShoppingCart size={15} strokeWidth={2} /> },
  ];

  const handleModeSelect = (key: Mode) => {
    if (key !== 'cards' && !user) {
      setPendingModeAfterAuth(key);
      const button = navButtons.find((b) => b.key === key);
      const gameNameEn = button ? button.label : 'this activity';
      const gameNameTr = button ? button.labelTr : 'bu etkinliği';

      if (key === 'story') {
        openAuthModal(
          language === 'tr'
            ? 'Yapay zeka hikaye modunu açmak ve ilerlemenizi kaydetmek için lütfen giriş yapın!'
            : 'Please sign in to access AI Story Mode and save your reading progress!'
        );
      } else {
        openAuthModal(
          language === 'tr'
            ? `${gameNameTr} oynamak ve puanınızı liderlik tablosuna kaydetmek için lütfen giriş yapın!`
            : `Please sign in to play ${gameNameEn} and save your score to the leaderboard!`
        );
      }
      return;
    }
    setPendingModeAfterAuth(null);
    setMode(key);
  };

  const currentGameScore = getScoreForMode(mode);

  return (
    <main className="app">
      <div className="app-header-row">
        <h1>{language === 'tr' ? 'Portekizce Çocuk Oyun Alanı' : 'Portuguese Kids Playground'}</h1>
        <div className="header-controls">
          <button
            className="btn-lang-toggle"
            onClick={() => setLanguage((l) => (l === 'en' ? 'tr' : 'en'))}
            title={language === 'en' ? 'Switch to Turkish' : 'İngilizceye geç'}
          >
            <Globe size={14} strokeWidth={2} style={{ marginRight: 4, flexShrink: 0 }} />
            {language === 'en' ? 'TR' : 'EN'}
          </button>
          <button
            className="btn-lang-toggle"
            onClick={() => setMusicEnabled((e) => !e)}
            title={musicEnabled ? (language === 'tr' ? 'Müziği kapat' : 'Stop music') : (language === 'tr' ? 'Müziği aç' : 'Play music')}
            aria-label={musicEnabled ? (language === 'tr' ? 'Müziği kapat' : 'Stop music') : (language === 'tr' ? 'Müziği aç' : 'Play music')}
          >
            {musicEnabled ? <Volume2 size={14} strokeWidth={2} /> : <VolumeX size={14} strokeWidth={2} />}
          </button>
        </div>
      </div>

      <div className="top-stats-bar">
        <div className="time-badge">
          <Timer size={14} strokeWidth={2} style={{ marginRight: 4 }} />
          {language === 'tr' ? 'Bugün' : 'Time Today'}: {formatTime(timeSpent)}
        </div>

        <button
          className="btn-leaderboard-badge"
          onClick={openLeaderboardModal}
          title={language === 'tr' ? 'Liderlik Tablosu & Puanlar' : 'Leaderboard & Scores'}
          aria-label={language === 'tr' ? 'Liderlik Tablosu & Puanlar' : 'Leaderboard & Scores'}
        >
          <Trophy size={14} color="#d97706" strokeWidth={2.5} style={{ marginRight: 4 }} />
          <span className="total-score-count">{profile?.stats?.totalScore ?? 0}</span>
          <span className="leaderboard-chip">
            {language === 'tr' ? 'Sıralama' : 'Ranks'}
          </span>
        </button>

        {user ? (
          <button
            className="btn-profile-badge"
            onClick={openStatsModal}
            title={language === 'tr' ? 'Profil ve İstatistikler' : 'Profile & Stats'}
          >
            <Flame size={14} color="#ea580c" strokeWidth={2.5} style={{ marginRight: 3 }} />
            <span className="streak-count">{profile?.stats?.currentStreakDays ?? 0}</span>
            <span className="user-name-chip">
              {profile?.displayName ? profile.displayName.split(' ')[0] : 'Profile'}
            </span>
          </button>
        ) : (
          <button
            className="btn-auth-prompt-badge"
            onClick={() => {
              setPendingModeAfterAuth(null);
              openAuthModal();
            }}
            title={language === 'tr' ? 'Giriş Yap' : 'Sign In'}
          >
            <LogIn size={13} style={{ marginRight: 4 }} />
            <span>{language === 'tr' ? 'Giriş Yap' : 'Sign In'}</span>
          </button>
        )}
      </div>

      <div className="nav-buttons">
        {navButtons.map(({ key, label, labelTr, cls, icon }) => {
          const isLocked = !user && key !== 'cards';
          return (
            <button
              key={key}
              className={`btn ${cls}${mode === key ? ' btn--active' : ''}${isLocked ? ' btn--locked' : ''}`}
              onClick={() => handleModeSelect(key)}
              title={
                isLocked
                  ? language === 'tr'
                    ? `${labelTr} oynamak için giriş yapın`
                    : `Sign in to play ${label}`
                  : undefined
              }
            >
              {icon}
              <span style={{ marginLeft: 5 }}>{language === 'tr' ? labelTr : label}</span>
              {isLocked && (
                <Lock
                  size={12}
                  strokeWidth={2.4}
                  style={{ marginLeft: 4, opacity: 0.8, flexShrink: 0 }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        {mode === 'cards' && <CardsMode language={language} />}
        {mode === 'story' && (
          <StoryMode
            aiState={aiState}
            onAiChange={(_label, _color) => {}}
            language={language}
            prefetchPromise={storyPrefetchRef.current ?? undefined}
            imagePrefetchPromise={imagePrefetchRef.current ?? undefined}
            replyPrefetchPromise={replyPrefetchRef.current ?? undefined}
            replyImagePrefetchPromise={replyImagePrefetchRef.current ?? undefined}
            onStoryPracticed={recordStoryView}
            onSpeechListen={recordSpeechListen}
          />
        )}
        {mode === 'game8' && <Game8 onScore={addScore} language={language} gameScore={currentGameScore} recentGain={recentGain} gainKey={gainKey} />}
        {mode === 'game1' && <Game1 onScore={addScore} language={language} gameScore={currentGameScore} recentGain={recentGain} gainKey={gainKey} />}
        {mode === 'game2' && <Game2 onScore={addScore} language={language} gameScore={currentGameScore} recentGain={recentGain} gainKey={gainKey} />}
        {mode === 'game3' && <Game3 onScore={addScore} language={language} gameScore={currentGameScore} recentGain={recentGain} gainKey={gainKey} />}
        {mode === 'game4' && <Game4 onScore={addScore} language={language} gameScore={currentGameScore} recentGain={recentGain} gainKey={gainKey} />}
        {mode === 'game5' && <Game5 onScore={addScore} language={language} gameScore={currentGameScore} recentGain={recentGain} gainKey={gainKey} />}
        {mode === 'game6' && <Game6 onScore={addScore} language={language} gameScore={currentGameScore} recentGain={recentGain} gainKey={gainKey} />}
        {mode === 'game7' && <Game7 onScore={addScore} language={language} gameScore={currentGameScore} recentGain={recentGain} gainKey={gainKey} />}
      </Suspense>

      <AuthModal language={language} />
      <StatsModal language={language} />
      <LeaderboardModal language={language} />
    </main>
  );
}

function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let result = '';
  if (hrs > 0) {
    result += `${hrs}h `;
  }
  if (mins > 0 || hrs > 0) {
    result += `${mins}m `;
  }
  result += `${secs}s`;
  return result;
}
