import React, { useEffect, useRef, useState } from 'react';
import { LayoutGrid, BookOpen, Image, Headphones, Layers, PencilLine, Puzzle, Globe, Timer, Volume2, VolumeX, ShoppingCart } from 'lucide-react';
import { Mode, StoryPage } from './data/words';
import { AiState, initAI, getNewStoryPage } from './utils/ai';
import CardsMode from './components/CardsMode';
import StoryMode from './story/StoryMode';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Game3 from './components/Game3';
import Game4 from './components/Game4';
import Game5 from './components/Game5';
import Game6 from './components/Game6';
import Game7 from './components/Game7';

const MUSIC_TRACKS = [
  'alex-morgan-kids-background-music-579469.mp3',
  'alex-morgan-kids-playground-giggles-parade-578468.mp3',
  'nastelbom-kids-happy-488308.mp3',
  'playstarz_music-kids-happy-background-music-442778.mp3',
  'sigmamusicart-kids-happy-background-music-401734.mp3',
] as const;
const BACKGROUND_MUSIC_VOLUME = 0.03;

export default function App(): React.ReactElement {
  const [mode, setMode] = useState<Mode>('cards');
  const [_score, setScore] = useState(0);
  const [_bounce, setBounce] = useState(false);
  const [aiState, setAiState] = useState<AiState>(null);
  // Initialised once (not on StrictMode double-invoke) by passing a factory to useRef.
  // getNewStoryPage is called immediately so the fetch is in-flight before StoryMode mounts.
  const storyPrefetchRef = useRef<Promise<StoryPage>>(
    getNewStoryPage('backend', () => {}, 'school')
  );
  const [language, setLanguage] = useState<'en' | 'tr'>('en');
  const [musicEnabled, setMusicEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTrackRef = useRef<string | null>(
    MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)]
  );
  const musicEnabledRef = useRef(true);

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

  useEffect(() => {
    void initAI((_label, _color) => {}).then((state) => setAiState(state));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      // Pause the timer if the user is on a different tab or the window is minimized
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

  // Stable function — safe to call from any child via startMusicRef
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

    // Try immediately — works if browser allows autoplay
    playTrack();

    // If autoplay was blocked, start on first user interaction
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
    setBounce(true);
    setTimeout(() => setBounce(false), 300);
  }

  type NavButton = { key: Mode; label: string; labelTr: string; cls: string; icon: React.ReactNode };
  const navButtons: NavButton[] = [
    { key: 'cards',  label: 'Cards',        labelTr: 'Kartlar',        cls: 'btn-kids',   icon: <LayoutGrid  size={15} strokeWidth={2} /> },
    { key: 'story',  label: 'Story',        labelTr: 'Hikaye',         cls: 'btn-story',  icon: <BookOpen    size={15} strokeWidth={2} /> },
    { key: 'game1',  label: 'Picture Game', labelTr: 'Resim Oyunu',    cls: 'btn-game1',  icon: <Image       size={15} strokeWidth={2} /> },
    { key: 'game2',  label: 'Listen & Find',labelTr: 'Dinle & Bul',    cls: 'btn-game2',  icon: <Headphones  size={15} strokeWidth={2} /> },
    { key: 'game3',  label: 'Memory Match', labelTr: 'Hafıza Oyunu',   cls: 'btn-game3',  icon: <Layers      size={15} strokeWidth={2} /> },
    { key: 'game4',  label: 'Fill Blank',   labelTr: 'Boşluk Doldurma',cls: 'btn-game4',  icon: <PencilLine  size={15} strokeWidth={2} /> },
    { key: 'game5',  label: 'Scramble',     labelTr: 'Kelime Bul',     cls: 'btn-game5',  icon: <Puzzle      size={15} strokeWidth={2} /> },
    { key: 'game6',  label: 'Puzzle',       labelTr: 'Yapboz',         cls: 'btn-game6',  icon: <Puzzle      size={15} strokeWidth={2} /> },
    { key: 'game7',  label: 'Market',       labelTr: 'Market Oyunu',   cls: 'btn-game7',  icon: <ShoppingCart size={15} strokeWidth={2} /> },
  ];

  return (
    <main className="app">
      <div className="app-header-row">
        <h1>Portuguese Kids Playground</h1>
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
      <div className="time-badge">
        <Timer size={14} strokeWidth={2} style={{ marginRight: 4 }} />
        {language === 'tr' ? 'Bugün' : 'Time Today'}: {formatTime(timeSpent)}
      </div>

      <div className="nav-buttons">
        {navButtons.map(({ key, label, labelTr, cls, icon }) => (
          <button
            key={key}
            className={`btn ${cls}${mode === key ? ' btn--active' : ''}`}
            onClick={() => setMode(key)}
          >
            {icon}
            <span style={{ marginLeft: 5 }}>{language === 'tr' ? labelTr : label}</span>
          </button>
        ))}
      </div>

      {mode === 'cards' && <CardsMode language={language} />}
      {mode === 'story' && (
        <StoryMode
          aiState={aiState}
          onAiChange={(_label, _color) => {}}
          language={language}
          prefetchPromise={storyPrefetchRef.current}
        />
      )}
      {mode === 'game1' && <Game1 onScore={addScore} language={language} />}
      {mode === 'game2' && <Game2 onScore={addScore} language={language} />}
      {mode === 'game3' && <Game3 onScore={addScore} language={language} />}
      {mode === 'game4' && <Game4 onScore={addScore} language={language} />}
      {mode === 'game5' && <Game5 onScore={addScore} language={language} />}
      {mode === 'game6' && <Game6 onScore={addScore} language={language} />}
      {mode === 'game7' && <Game7 onScore={addScore} language={language} />}
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
