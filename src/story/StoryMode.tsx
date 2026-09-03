import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Gauge } from 'lucide-react';
import { StoryPage } from '../data/words';
import { AiState, StoryContext, getNewStoryPage } from '../utils/ai';
import { cancelSpeech, speakText } from '../utils/speech';
import { translateToTurkish } from '../utils/translate';
import { getSceneTheme } from './sceneTheme';
import { buildStoryImagePrompt, useStoryPrefetch } from './useStoryPrefetch';
import StoryIllustration from './StoryIllustration';
import './StoryMode.scss';

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
}

export default function StoryMode({ aiState, onAiChange, language, prefetchPromise }: Props): React.ReactElement {
  const [context, setContext] = useState<StoryContext>('school');
  const [history, setHistory] = useState<StoryPage[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | ''>('');
  const [pageKey, setPageKey] = useState(0);
  const [trText, setTrText] = useState('');
  const initialized = useRef(false);
  const pendingSpeakRef = useRef<string | null>(null);
  const prefetchedReplyRef = useRef<StoryPage | null>(null);
  const prefetchingReply = useRef(false);
  const { prefetchImage, imageCache } = useStoryPrefetch(aiState, onAiChange, context);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    void loadFirst();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When context changes (after first mount), clear history and load fresh.
  // A gesture has already occurred (user clicked the dropdown), so we speak directly.
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setHistory([]);
    setIndex(0);
    setTrText('');
    cancelSpeech();
    prefetchedReplyRef.current = null;
    prefetchingReply.current = false;
    void loadFirst(/* speakImmediately */ true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);
  useEffect(() => () => { cancelSpeech(); }, []);

  // Speak pending text on the first user interaction after mount.
  // Chrome blocks speechSynthesis.speak() until a gesture has occurred;
  // loadFirst() is async so the original gesture context is lost by the time
  // the story text arrives. This listener fires on the very next tap/click.
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

  // Translate the current page's English text to Turkish when language or page changes
  useEffect(() => {
    const en = history[index]?.en;
    if (language === 'tr' && en) {
      setTrText('');
      void translateToTurkish(en).then(setTrText);
    } else {
      setTrText('');
    }
  }, [language, index, history]);

  async function loadFirst(speakImmediately = false): Promise<void> {
    // Use the app-load prefetch only on the very first load (school context).
    // On context switches always fetch fresh so we get the correct context.
    let page: StoryPage | undefined;
    if (!speakImmediately && prefetchPromise) {
      setLoading(true);
      try { page = await prefetchPromise; } catch { /* fall through */ }
      setLoading(false);
    }
    if (!page) {
      setLoading(true);
      page = await getNewStoryPage(aiState, onAiChange, context);
      setLoading(false);
    }
    setHistory((prev) => prev.length === 0 ? [page!] : [page!]);
    setIndex(0);
    setPageKey((k) => k + 1);
    prefetchImage(page!);
    if (speakImmediately) {
      // Gesture already occurred (e.g. user clicked the context dropdown),
      // so speak() is allowed immediately.
      speakText(page.pt);
    } else {
      // On first mount Chrome blocks speak() after an async gap (gesture context
      // is lost). Queue it; the interaction listener fires it on the next tap.
      pendingSpeakRef.current = page.pt;
    }
    // Start prefetching the reply to this first page in the background
    void prefetchReply(page.pt);
  }

  /** Fetch the reply to `sentence` in the background and cache it in prefetchedReplyRef. */
  async function prefetchReply(sentence: string): Promise<void> {
    if (prefetchingReply.current) return;
    prefetchingReply.current = true;
    prefetchedReplyRef.current = null;
    try {
      const reply = await getNewStoryPage(aiState, onAiChange, context, sentence);
      prefetchedReplyRef.current = reply;
    } catch {
      // non-fatal — handleNext will fall back to a live fetch
    } finally {
      prefetchingReply.current = false;
    }
  }

  async function handleNext(): Promise<void> {
    setSlideDir('left');
    const nextIndex = index + 1;
    if (nextIndex < history.length) {
      // Navigating back through already-seen history — no fetch needed
      setIndex(nextIndex);
      setPageKey((k) => k + 1);
      speakText(history[nextIndex].pt);
    } else {
      const capturedIndex = index;
      const currentSentence = history[capturedIndex]?.pt;
      // 1. Use the prefetched contextual reply if ready (fetched while user was reading)
      if (prefetchedReplyRef.current) {
        const reply = prefetchedReplyRef.current;
        prefetchedReplyRef.current = null;
        setHistory((h) => [...h, reply]);
        setIndex(capturedIndex + 1);
        setPageKey((k) => k + 1);
        prefetchImage(reply);
        speakText(reply.pt);
        void prefetchReply(reply.pt);
      // 2. Fall back to a live fetch
      } else {
        setLoading(true);
        const page = await getNewStoryPage(aiState, onAiChange, context, currentSentence);
        setHistory((h) => [...h, page]);
        setIndex(capturedIndex + 1);
        setPageKey((k) => k + 1);
        setLoading(false);
        prefetchImage(page);
        speakText(page.pt);
        void prefetchReply(page.pt);
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
    <div className="game-container" style={{ display: 'block', borderColor: '#0284c7' }}>
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
              prefetchedImageUrl={imageCache.get(buildStoryImagePrompt(page))}
            />
          : <div className="story-illustration" style={sceneVars} />
        }
        <div className="story-audio-buttons">
          <button className="btn-story-audio" onClick={() => page && speakText(page.pt)} title="Listen to Sentence">
            <Volume2 size={20} strokeWidth={2} />
          </button>
          <button className="btn-story-audio btn-story-audio--slow" onClick={() => page && speakText(page.pt, { rate: 0.3 })} title="Listen to Sentence Slowly">
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
    </div>
  );
}
