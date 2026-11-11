import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Gauge } from 'lucide-react';
import { StoryPage } from '../data/index';
import { AiState, StoryContext, getNewStoryPage } from '../utils/ai';
import { cancelSpeech, speakText } from '../utils/speech';
import { translateToTurkish } from '../utils/translate';
import { getSceneTheme } from './sceneTheme';
import { buildStoryImagePrompt, useStoryPrefetch } from './useStoryPrefetch';
import StoryIllustration from './StoryIllustration';
import './StoryMode.scss';

const HISTORY_STORAGE_KEY = (context: StoryContext) => `story_history_${context}`;
const MAX_STORED_HISTORY = 30; // sentences per context kept in localStorage

function loadStoredHistory(context: StoryContext): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY(context));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(context: StoryContext, history: StoryPage[]): void {
  try {
    const sentences = history.map((p) => p.pt).slice(-MAX_STORED_HISTORY);
    localStorage.setItem(HISTORY_STORAGE_KEY(context), JSON.stringify(sentences));
  } catch {
    // localStorage unavailable — non-fatal
  }
}

function clearStoredHistory(context: StoryContext): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY(context));
  } catch {
    // localStorage unavailable — non-fatal
  }
}

const CONTEXTS: { value: StoryContext; label: string; labelTr: string; emoji: string }[] = [
  { value: 'school',       label: 'School',       labelTr: 'Okul',          emoji: '🏫' },
  { value: 'restaurant',   label: 'Restaurant',   labelTr: 'Restoran',      emoji: '🍽️' },
  { value: 'bank',         label: 'Bank',         labelTr: 'Banka',         emoji: '🏦' },
  { value: 'hospital',     label: 'Hospital',     labelTr: 'Hastane',       emoji: '🏥' },
  { value: 'cafe',         label: 'Café',         labelTr: 'Kafe',          emoji: '☕' },
  { value: 'airport',      label: 'Airport',      labelTr: 'Havalimanı',    emoji: '✈️' },
  { value: 'market',       label: 'Market',       labelTr: 'Market',        emoji: '🛒' },
  { value: 'aima',         label: 'AIMA',         labelTr: 'AIMA',          emoji: '🏛️' },
  { value: 'bus',          label: 'Bus',          labelTr: 'Otobüs',        emoji: '🚌' },
  { value: 'pharmacy',     label: 'Pharmacy',     labelTr: 'Eczane',        emoji: '💊' },
  { value: 'gas_station',  label: 'Gas Station',  labelTr: 'Benzin İstasyonu', emoji: '⛽' },
  { value: 'traffic',      label: 'Traffic & Cars', labelTr: 'Trafik ve Arabalar', emoji: '🚗' },
];

interface Props {
  aiState: AiState;
  onAiChange: (label: string, color: string) => void;
  language: 'en' | 'tr';
  prefetchPromise?: Promise<StoryPage>;
  /** Pre-started blob URL promise for the first page's image, begun at app load. */
  imagePrefetchPromise?: Promise<string>;
  /** Pre-started reply (page 2) text promise, begun at app load. */
  replyPrefetchPromise?: Promise<StoryPage>;
  /** Pre-started blob URL promise for page 2's image, begun at app load. */
  replyImagePrefetchPromise?: Promise<string>;
  onStoryPracticed?: (context: StoryContext, sentencePt: string) => void;
  onSpeechListen?: () => void;
}

export default function StoryMode({
  aiState,
  onAiChange,
  language,
  prefetchPromise,
  imagePrefetchPromise,
  replyPrefetchPromise,
  replyImagePrefetchPromise,
  onStoryPracticed,
  onSpeechListen,
}: Props): React.ReactElement {
  const [context, setContext] = useState<StoryContext>('school');
  const [history, setHistory] = useState<StoryPage[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | ''>('');
  const [pageKey, setPageKey] = useState(0);
  const [trText, setTrText] = useState('');
  const loadIdRef = useRef(0);
  const pendingSpeakRef = useRef<string | null>(null);
  const prefetchedReplyRef = useRef<StoryPage | null>(null);
  const prefetchingReply = useRef(false);
  const { prefetchImage, seedImage, imageCache } = useStoryPrefetch(aiState, onAiChange, context);
  const seenPagesRef = useRef<Set<string>>(new Set());

  // Record story view only when actually viewed/rendered to the user
  useEffect(() => {
    const page = history[index];
    if (page && !loading) {
      const key = `${context}:${page.pt}`;
      if (!seenPagesRef.current.has(key)) {
        seenPagesRef.current.add(key);
        onStoryPracticed?.(context, page.pt);
      }
    }
  }, [context, history, index, loading, onStoryPracticed]);

  const contextRef = useRef<StoryContext | null>(null);
  useEffect(() => {
    if (contextRef.current === context) return;
    contextRef.current = context;

    const id = ++loadIdRef.current;
    const isContextSwitch = id > 1;

    if (isContextSwitch) {
      clearStoredHistory(context);
    }

    prefetchedReplyRef.current = null;
    void loadFirst(isContextSwitch, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  useEffect(() => {
    function onFirstInteraction() {
      const text = pendingSpeakRef.current;
      if (text) {
        pendingSpeakRef.current = null;
        speakText(text);
      }
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('keydown', onFirstInteraction);
    }
    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('keydown', onFirstInteraction);
    return () => {
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('keydown', onFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (history.length > 0) saveHistory(context, history);
  }, [context, history]);

  useEffect(() => {
    const en = history[index]?.en;
    if (language === 'tr' && en) {
      setTrText('');
      void translateToTurkish(en).then(setTrText);
    } else {
      setTrText('');
    }
  }, [language, index, history]);

  async function loadFirst(speakImmediately = false, id = loadIdRef.current): Promise<void> {
    let page: StoryPage | undefined;
    if (!speakImmediately && prefetchPromise) {
      setLoading(true);
      try { page = await prefetchPromise; } catch { /* fall through */ }
    }
    if (!page) {
      setLoading(true);
      const storedHistory = loadStoredHistory(context);
      page = await getNewStoryPage(aiState, onAiChange, context, undefined, storedHistory);
    }

    if (id !== loadIdRef.current) return;

    setLoading(false);
    setHistory([page!]);
    setIndex(0);
    setPageKey((k) => k + 1);

    if (!speakImmediately && imagePrefetchPromise) {
      imagePrefetchPromise.then((blobUrl) => {
        if (blobUrl) {
          seedImage(page!, blobUrl);
        } else {
          prefetchImage(page!);
        }
      }).catch(() => prefetchImage(page!));
    } else {
      prefetchImage(page!);
    }
    if (speakImmediately) {
      cancelSpeech();
      speakText(page!.pt);
    } else {
      pendingSpeakRef.current = page!.pt;
    }

    if (!speakImmediately && replyPrefetchPromise) {
      replyPrefetchPromise.then((reply) => {
        if (reply && id === loadIdRef.current) {
          prefetchedReplyRef.current = reply;
          if (replyImagePrefetchPromise) {
            replyImagePrefetchPromise.then((blobUrl) => {
              if (blobUrl) seedImage(reply, blobUrl);
              else prefetchImage(reply);
            }).catch(() => prefetchImage(reply));
          } else {
            prefetchImage(reply);
          }
        }
      }).catch(() => {
        void prefetchReply(page!.pt, [page!.pt], id);
      });
    } else {
      void prefetchReply(page!.pt, [page!.pt], id);
    }
  }

  async function prefetchReply(
    previousSentence: string,
    currentHistory: string[],
    id = loadIdRef.current,
  ): Promise<void> {
    if (prefetchingReply.current) return;
    prefetchingReply.current = true;
    try {
      const reply = await getNewStoryPage(aiState, onAiChange, context, previousSentence, currentHistory);
      if (id !== loadIdRef.current) return;
      prefetchedReplyRef.current = reply;
      prefetchImage(reply);
    } catch {
      // non-fatal
    } finally {
      prefetchingReply.current = false;
    }
  }

  async function handleNext(): Promise<void> {
    setSlideDir('left');
    const nextIndex = index + 1;
    if (nextIndex < history.length) {
      setIndex(nextIndex);
      setPageKey((k) => k + 1);
      speakText(history[nextIndex].pt);
    } else {
      const capturedIndex = index;
      const currentSentence = history[capturedIndex]?.pt;
      const currentHistory = history.map((p) => p.pt);
      if (prefetchedReplyRef.current) {
        const reply = prefetchedReplyRef.current;
        prefetchedReplyRef.current = null;
        const newHistory = [...history, reply];
        setHistory(newHistory);
        setIndex(capturedIndex + 1);
        setPageKey((k) => k + 1);
        prefetchImage(reply);
        speakText(reply.pt);
        void prefetchReply(reply.pt, newHistory.map((p) => p.pt));
      } else {
        setLoading(true);
        const page = await getNewStoryPage(aiState, onAiChange, context, currentSentence, currentHistory);
        const newHistory = [...history, page];
        setHistory(newHistory);
        setIndex(capturedIndex + 1);
        setPageKey((k) => k + 1);
        setLoading(false);
        prefetchImage(page);
        speakText(page.pt);
        void prefetchReply(page.pt, newHistory.map((p) => p.pt));
      }
    }
  }

  function handlePrev(): void {
    if (index > 0) {
      setSlideDir('right');
      const prevIndex = index - 1;
      setIndex(prevIndex);
      setPageKey((k) => k + 1);
      speakText(history[prevIndex].pt);
    }
  }

  const page = history[index];
  const theme = page ? getSceneTheme(page) : null;

  const slideClass = slideDir ? `slide-in-${slideDir}` : '';

  const sceneVars = theme ? {
    '--sky-top':       theme.skyTop,
    '--sky-bottom':    theme.skyBottom,
    '--hill-color':    theme.hillColor,
    '--hill-dark':     theme.hillDark,
    '--ground-color':  theme.groundColor,
    '--ground-dark':   theme.groundDark,
    '--cloud-opacity': String(theme.cloudOpacity),
  } as React.CSSProperties : {};

  return (
    <div className="story-card">
      <div className="story-context-row">
        <select
          className="story-context-select"
          value={context}
          onChange={(e) => setContext(e.target.value as StoryContext)}
          aria-label={language === 'tr' ? 'Senaryo seç' : 'Choose scenario'}
        >
          {CONTEXTS.map(({ value, label, labelTr, emoji }) => (
            <option key={value} value={value}>
              {emoji} {language === 'tr' ? labelTr : label}
            </option>
          ))}
        </select>
      </div>
      {page && theme
        ? <StoryIllustration
            key={pageKey}
            page={page}
            pageKey={pageKey}
            sceneVars={sceneVars}
            prefetchedImageUrl={imageCache.get(buildStoryImagePrompt(page, context))}
          />
        : <div className="story-illustration" style={sceneVars} />
      }
      <div className="story-audio-buttons">
        <button
          className="btn-story-audio"
          onClick={() => {
            if (page) {
              onSpeechListen?.();
              speakText(page.pt);
            }
          }}
          title="Listen to Sentence"
        >
          <Volume2 size={20} strokeWidth={2} />
        </button>
        <button
          className="btn-story-audio btn-story-audio--slow"
          onClick={() => {
            if (page) {
              onSpeechListen?.();
              speakText(page.pt, { rate: 0.3 });
            }
          }}
          title="Listen to Sentence Slowly"
        >
          <Gauge size={20} strokeWidth={2} />
        </button>
      </div>
      <div key={`text-${pageKey}`} className={`story-text-pt story-text--enter ${slideClass}`}>
        {loading ? (language === 'tr' ? '🤖 Hikaye oluşturuluyor...' : '🤖 Generating story...') : page?.pt ?? '...'}
      </div>
      <div className="story-text-en">
        {loading ? '' : language === 'tr' ? (trText || (page ? '🔄' : '')) : (page?.en ?? '')}
      </div>
      <div className="story-nav">
        <button className="btn-story-action" onClick={handlePrev} disabled={index === 0}>
          <ChevronLeft size={16} strokeWidth={2.5} style={{ marginRight: 4 }} />
          Anterior
        </button>
        <span style={{ fontWeight: 'bold', color: '#0284c7' }}>{`Página ${index + 1}`}</span>
        <button className="btn-story-action" onClick={() => void handleNext()} disabled={loading}>
          Próxima
          <ChevronRight size={16} strokeWidth={2.5} style={{ marginLeft: 4 }} />
        </button>
      </div>
    </div>
  );
}
