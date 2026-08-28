import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { marketItems, MarketItem } from '../data/words';
import { cancelSpeech, speakText } from '../utils/speech';
import '../styles/Game7.scss';

// ─── Sound Effects ────────────────────────────────────────────────────────────
// Reuse a single AudioContext for the lifetime of the page — creating a new one
// on every sound causes Chrome to hit the 6-context limit and logs warnings.
let _audioCtx: AudioContext | null = null;
function getAudioContext(): AudioContext | null {
  try {
    if (!_audioCtx || _audioCtx.state === 'closed') {
      _audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
    return _audioCtx;
  } catch (_) { return null; }
}

function playSynth(type: 'drop' | 'success' | 'error' | 'giggle'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const t = ctx.currentTime;
    if (type === 'drop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.12);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.12);
      osc.start(t); osc.stop(t + 0.12);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440,    t);
      osc.frequency.setValueAtTime(554.37, t + 0.1);
      osc.frequency.setValueAtTime(659.25, t + 0.2);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.linearRampToValueAtTime(0.01, t + 0.4);
      osc.start(t); osc.stop(t + 0.4);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.setValueAtTime(130, t + 0.15);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.linearRampToValueAtTime(0.01, t + 0.25);
      osc.start(t); osc.stop(t + 0.25);
    } else {
      // giggle
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, t);
      osc.frequency.linearRampToValueAtTime(750, t + 0.1);
      osc.frequency.linearRampToValueAtTime(600, t + 0.2);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.linearRampToValueAtTime(0.01, t + 0.25);
      osc.start(t); osc.stop(t + 0.25);
    }
    // Release node references after the sound finishes
    osc.onended = () => { osc.disconnect(); gain.disconnect(); };
  } catch (_) { /* ignore */ }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getNumberWord(count: number, gender: 'm' | 'f'): string {
  if (count === 1) return gender === 'm' ? 'um' : 'uma';
  if (count === 2) return gender === 'm' ? 'dois' : 'duas';
  if (count === 3) return 'três';
  if (count === 4) return 'quatro';
  return count.toString();
}

// Returns "um quilo de X" / "dois quilos de X" for kg items,
// or "um X" / "dois Xs" for piece items.
function buildOrderText(count: number, item: MarketItem): string {
  if (item.unit === 'kg') {
    const kilo = count === 1 ? 'um quilo' : `${getNumberWord(count, 'm')} quilos`;
    return `${kilo} de ${item.ptName}!`;
  }
  const nw = getNumberWord(count, item.gender);
  const nm = count === 1 ? item.ptName : item.pluralName;
  return `${nw} ${nm}!`;
}

interface CartItemEntry { id: number; icon: string; iconSrc?: string; idx: number; }
interface FlyingItemEntry {
  id: number;
  itemId: string;  // MarketItem.id — used to resolve the item on land
  icon: string;
  iconSrc?: string;
  fromX: number; fromY: number;   // page coords of source item centre
  toX: number;   toY: number;     // page coords of cart centre
}
type MascotState = 'idle' | 'happy' | 'sad' | 'talking';
interface Props { onScore: (pts: number) => void; language: 'en' | 'tr'; }

// ─── Flying Item Overlay ──────────────────────────────────────────────────────
// Single animation: departs from source, arcs above the cart, then slowly
// descends into its final slot.  No phase state — one keyframe sequence.
//
// React.memo + frozen ref values: the parent re-renders every time cartCount
// changes (a previous item landed), but we must NOT let those re-renders reach
// this component — Framer Motion will detect changed animate props and
// prematurely fire onAnimationComplete, snapping the item to its end position.
const FlyingItem = React.memo(function FlyingItem(
  { entry, onLand }: { entry: FlyingItemEntry; onLand: (id: number) => void },
) {
  // Freeze all coords into refs on first render so they never change mid-flight
  const frozenEntry = React.useRef(entry);
  const onLandRef   = React.useRef(onLand);
  // landed: true = arc done, now fading out at the slot position
  const [landed, setLanded] = React.useState(false);
  // Keep onLand ref current so the callback always resolves the latest item map,
  // but the animation props stay frozen
  React.useEffect(() => { onLandRef.current = onLand; }, [onLand]);

  const { fromX, fromY, toX, toY } = frozenEntry.current;
  // Arc height: small, natural lob — just enough to clear the source item.
  // Horizontal distance contributes a little so items flying sideways still arc.
  const verticalDistance   = Math.abs(fromY - toY);
  const horizontalDistance = Math.abs(fromX - toX);
  const peakOffset = Math.min(60, verticalDistance * 0.3 + horizontalDistance * 0.12);
  const peakY = Math.max(window.scrollY + 20, Math.min(fromY, toY) - peakOffset);

  return ReactDOM.createPortal(
    <motion.span
      className="flying-item"
      style={{ left: 0, top: 0 }}
      initial={{ x: fromX, y: fromY, scale: 1.15, rotate: 0, opacity: 1 }}
      animate={landed
        // Phase 2: already at toX/toY — just fade out so the static cart emoji
        // appears underneath with no visible snap.
        ? { x: toX, y: toY, scale: 0.85, rotate: 5, opacity: 0 }
        : {
          // Phase 1: arc flight
          x:       toX,
          y:       [fromY, peakY, toY],
          scale:   [1.15,  1.35,  0.85],
          rotate:  [0,     -15,   5   ],
          opacity: [1,     0.92,  1   ],
        }
      }
      transition={landed
        ? { duration: 0.12, ease: 'easeIn' }
        : {
          x: { duration: 0.72, ease: 'easeInOut' },
          y: {
            duration: 0.72,
            times: [0, 0.32, 1],
            ease: ['easeOut', [0.12, 0.0, 0.22, 1.0]],
          },
          scale:   { duration: 0.72, times: [0, 0.32, 1], ease: 'easeOut' },
          rotate:  { duration: 0.72, times: [0, 0.32, 1], ease: 'easeOut' },
          opacity: { duration: 0.72, times: [0, 0.32, 1], ease: 'easeOut' },
        }
      }
      onAnimationComplete={() => {
        if (!landed) {
          // Arc finished — start the fade-out phase
          setLanded(true);
        } else {
          // Fade finished — notify parent to add static emoji & remove this span
          onLandRef.current(frozenEntry.current.id);
        }
      }}
    >
      {frozenEntry.current.iconSrc
        ? <img src={frozenEntry.current.iconSrc} alt={frozenEntry.current.icon} width={30} height={30} style={{ display: 'block' }} />
        : frozenEntry.current.icon}
    </motion.span>,
    document.body,
  );
});


// ─── FlyingItem Wrapper ───────────────────────────────────────────────────────
// Stable wrapper so the onLand callback passed into the memoised FlyingItem
// does NOT change identity on every parent render (no inline closure at the
// call-site in the JSX map).
const FlyingItemWrapper = React.memo(function FlyingItemWrapper({
  entry,
  availableItems,
  onFlyLand,
}: {
  entry: FlyingItemEntry;
  availableItems: MarketItem[];
  onFlyLand: (flyId: number, item: MarketItem) => void;
}) {
  const handleLand = useCallback(
    (id: number) => {
      const item = availableItems.find(i => i.id === entry.itemId) ?? availableItems[0];
      onFlyLand(id, item);
    },
    // entry.itemId is frozen in a ref inside FlyingItem; availableItems and onFlyLand
    // are the only things that could legitimately vary between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [availableItems, onFlyLand, entry.itemId],
  );
  return <FlyingItem entry={entry} onLand={handleLand} />;
});


// ─── Bunny Mascot Component ───────────────────────────────────────────────────
// Memoised: the mascot's expensive SVG tree only re-renders when state/onClick change.
const BunnyMascot = React.memo(function BunnyMascot(
  { state, onClick }: { state: MascotState; onClick: () => void },
) {
  const isHappy   = state === 'happy';
  const isSad     = state === 'sad';
  const isTalking = state === 'talking' || state === 'idle';

  // Mouth path driven by state
  const mouthD = isHappy
    ? 'M40 66 Q50 76 60 66'
    : isSad
    ? 'M42 70 Q50 63 58 70'
    : 'M42 65 Q50 71 58 65';

  return (
    <div className="bunny-mascot" onClick={onClick} role="button" tabIndex={0}
      aria-label="Coelho mascote" onKeyDown={(e) => e.key === 'Enter' && onClick()}>

      {/* Floating hearts/stars on happy */}
      <AnimatePresence>
        {isHappy && (
          <motion.div className="bunny-stars"
            initial={{ opacity: 0, y: 8, scale: 0.4 }}
            animate={{ opacity: 1, y: -26, scale: 1 }}
            exit={{ opacity: 0, y: -36 }}
            transition={{ duration: 0.5 }}
          >💖 ✨ 💖</motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        width="88" height="100" viewBox="0 0 100 116"
        className="bunny-svg"
        animate={
          isHappy ? { y: [0, -10, 0, -6, 0], rotate: [0, -4, 4, -2, 0] }
          : isSad  ? { x: [-3, 3, -3, 3, 0], rotate: [0, 1, -1, 0] }
          : { y: [0, -2.5, 0] }
        }
        transition={
          isHappy ? { duration: 0.55, repeat: 2, ease: 'easeInOut' }
          : isSad  ? { duration: 0.35 }
          : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <defs>
          {/* Fur gradient — warm peach-orange */}
          <radialGradient id="bm-fur" cx="48%" cy="38%" r="58%">
            <stop offset="0%"   stopColor="#fde3c0" />
            <stop offset="45%"  stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>
          {/* Inner ear gradient */}
          <radialGradient id="bm-innerEar" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fecaca" />
            <stop offset="100%" stopColor="#f87171" />
          </radialGradient>
          {/* Belly / tummy patch */}
          <radialGradient id="bm-belly" cx="50%" cy="40%" r="60%">
            <stop offset="0%"   stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#fed7aa" />
          </radialGradient>
          {/* Overall blue */}
          <linearGradient id="bm-overall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          {/* Eye iris */}
          <radialGradient id="bm-iris" cx="38%" cy="32%" r="60%">
            <stop offset="0%"   stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>
          {/* Nose */}
          <radialGradient id="bm-nose" cx="50%" cy="30%" r="60%">
            <stop offset="0%"   stopColor="#fb7185" />
            <stop offset="100%" stopColor="#9f1239" />
          </radialGradient>
          {/* Drop shadow filter */}
          <filter id="bm-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#7c2d12" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* ── LEFT EAR ── */}
        <motion.g
          style={{ transformOrigin: '30px 52px' }}
          animate={
            isSad   ? { rotate: 28, x: -3 }
            : isHappy ? { rotate: [-10, 10, -10] }
            : { rotate: [0, 4, 0, -4, 0] }
          }
          transition={{ duration: isHappy ? 0.28 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Outer ear shape */}
          <ellipse cx="30" cy="26" rx="10" ry="24" fill="url(#bm-fur)" />
          {/* Ear cartilage shadow */}
          <ellipse cx="30" cy="26" rx="10" ry="24" fill="none"
            stroke="#c2410c" strokeWidth="1.5" opacity="0.35" />
          {/* Inner pink canal */}
          <ellipse cx="30" cy="26" rx="5.5" ry="17" fill="url(#bm-innerEar)" />
          {/* Ear tip highlight */}
          <ellipse cx="28" cy="11" rx="2.5" ry="4" fill="#fff" opacity="0.25" />
        </motion.g>

        {/* ── RIGHT EAR ── */}
        <motion.g
          style={{ transformOrigin: '70px 52px' }}
          animate={
            isSad   ? { rotate: -28, x: 3 }
            : isHappy ? { rotate: [10, -10, 10] }
            : { rotate: [0, -4, 0, 4, 0] }
          }
          transition={{ duration: isHappy ? 0.28 : 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.12 }}
        >
          <ellipse cx="70" cy="26" rx="10" ry="24" fill="url(#bm-fur)" />
          <ellipse cx="70" cy="26" rx="10" ry="24" fill="none"
            stroke="#c2410c" strokeWidth="1.5" opacity="0.35" />
          <ellipse cx="70" cy="26" rx="5.5" ry="17" fill="url(#bm-innerEar)" />
          <ellipse cx="68" cy="11" rx="2.5" ry="4" fill="#fff" opacity="0.25" />
        </motion.g>

        {/* ── BODY (overalls) ── */}
        <ellipse cx="50" cy="96" rx="26" ry="18" fill="url(#bm-overall)" filter="url(#bm-shadow)" />
        {/* Overall bib */}
        <rect x="38" y="76" width="24" height="22" rx="5" fill="url(#bm-overall)" />
        {/* Bib pocket */}
        <rect x="44" y="83" width="12" height="8" rx="2.5"
          fill="none" stroke="#93c5fd" strokeWidth="1.2" />
        <line x1="50" y1="83" x2="50" y2="91" stroke="#93c5fd" strokeWidth="1" />
        {/* Overall straps */}
        <path d="M38 76 Q33 68 36 62" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <path d="M62 76 Q67 68 64 62" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

        {/* ── HEAD ── */}
        <ellipse cx="50" cy="58" rx="28" ry="27" fill="url(#bm-fur)" filter="url(#bm-shadow)" />
        {/* Head rim shadow */}
        <ellipse cx="50" cy="58" rx="28" ry="27" fill="none"
          stroke="#c2410c" strokeWidth="1" opacity="0.2" />

        {/* Forehead highlight */}
        <ellipse cx="44" cy="44" rx="10" ry="6" fill="#fff" opacity="0.18" transform="rotate(-15 44 44)" />

        {/* Muzzle / snout area */}
        <ellipse cx="50" cy="65" rx="14" ry="11" fill="url(#bm-belly)" />

        {/* Cheeks blush */}
        <ellipse cx="28" cy="63" rx="7" ry="5" fill="#f43f5e" opacity={isHappy ? 0.45 : 0.22} />
        <ellipse cx="72" cy="63" rx="7" ry="5" fill="#f43f5e" opacity={isHappy ? 0.45 : 0.22} />

        {/* ── EYES ── */}
        {isSad ? (
          // Droopy sad arcs
          <g stroke="#1e1b4b" strokeWidth="2.8" fill="none" strokeLinecap="round">
            <path d="M36 54 Q40 50 44 54" />
            <path d="M56 54 Q60 50 64 54" />
            {/* Tear */}
            <motion.path d="M37 57 Q35 62 37 65 Q39 62 37 57" fill="#7dd3fc" stroke="none"
              animate={{ y: [0, 9], opacity: [1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeIn' }} />
          </g>
        ) : (
          <g>
            {/* Left eye — sclera */}
            <circle cx="40" cy="54" r="5.5" fill="#fff" />
            {/* Left iris */}
            <circle cx="40" cy="54" r="3.8" fill="url(#bm-iris)" />
            {/* Left pupil */}
            <circle cx="40" cy="54" r="2.2" fill="#0f0a2a" />
            {/* Left catchlights */}
            <circle cx="41.8" cy="52.2" r="1.1" fill="#fff" />
            <circle cx="38.5" cy="55.5" r="0.5" fill="#fff" opacity="0.7" />

            {/* Right eye — sclera */}
            <circle cx="60" cy="54" r="5.5" fill="#fff" />
            {/* Right iris */}
            <circle cx="60" cy="54" r="3.8" fill="url(#bm-iris)" />
            {/* Right pupil */}
            <circle cx="60" cy="54" r="2.2" fill="#0f0a2a" />
            {/* Right catchlights */}
            <circle cx="61.8" cy="52.2" r="1.1" fill="#fff" />
            <circle cx="58.5" cy="55.5" r="0.5" fill="#fff" opacity="0.7" />

            {/* Upper eyelid crease */}
            <path d="M35 51 Q40 48.5 45 51" fill="none" stroke="#c2410c" strokeWidth="1" opacity="0.5" />
            <path d="M55 51 Q60 48.5 65 51" fill="none" stroke="#c2410c" strokeWidth="1" opacity="0.5" />
          </g>
        )}

        {/* ── NOSE ── */}
        <ellipse cx="50" cy="62" rx="4.5" ry="3.2" fill="url(#bm-nose)" />
        {/* Nose highlight */}
        <ellipse cx="48.5" cy="60.8" rx="1.4" ry="0.9" fill="#fff" opacity="0.55" />
        {/* Nose-to-lip philtrum line */}
        <line x1="50" y1="65" x2="50" y2="68" stroke="#9f1239" strokeWidth="1.2" strokeLinecap="round" />

        {/* ── MOUTH ── */}
        <motion.path
          d={mouthD}
          fill={isHappy ? '#fb7185' : 'none'}
          stroke="#7f1d1d" strokeWidth="1.8" strokeLinecap="round"
          animate={
            isTalking && !isHappy && !isSad
              ? { d: [mouthD, 'M42 65 Q50 74 58 65', mouthD] }
              : {}
          }
          transition={{ duration: 0.22, repeat: Infinity }}
        />
        {/* Teeth when happy */}
        {isHappy && (
          <rect x="45" y="67" width="10" height="5" rx="1.5" fill="#fff" />
        )}

        {/* ── ARMS ── */}
        {/* Left arm */}
        <motion.g
          style={{ transformOrigin: '28px 80px' }}
          animate={isHappy ? { rotate: [-30, 30, -30] } : { rotate: 0 }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <path d="M28 78 Q17 90 20 102" stroke="url(#bm-fur)" strokeWidth="9"
            strokeLinecap="round" fill="none" />
          {/* Left paw */}
          <circle cx="20" cy="103" r="6" fill="url(#bm-fur)" />
          <path d="M15 101 Q17 97 20 99" stroke="#c2410c" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M20 97 Q22 94 24 97" stroke="#c2410c" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M24 100 Q26 97 28 100" stroke="#c2410c" strokeWidth="1" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Right arm */}
        <motion.g
          style={{ transformOrigin: '72px 80px' }}
          animate={isHappy ? { rotate: [30, -30, 30] } : { rotate: 0 }}
          transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
        >
          <path d="M72 78 Q83 90 80 102" stroke="url(#bm-fur)" strokeWidth="9"
            strokeLinecap="round" fill="none" />
          {/* Right paw */}
          <circle cx="80" cy="103" r="6" fill="url(#bm-fur)" />
          <path d="M75 101 Q77 97 80 99" stroke="#c2410c" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M80 97 Q82 94 84 97" stroke="#c2410c" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M84 100 Q86 97 88 100" stroke="#c2410c" strokeWidth="1" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* ── BELLY PATCH ── */}
        <ellipse cx="50" cy="90" rx="14" ry="9" fill="url(#bm-belly)" opacity="0.7" />

      </motion.svg>
    </div>
  );
});

type CartState = 'idle' | 'dragOver' | 'bounce' | 'exit' | 'enter';

// ─── Cart variants ────────────────────────────────────────────────────────────
// One clearly-named variant per cart state.  The wrapper animates between them;
// Framer Motion handles the transition per-variant via `transition` inside each.
const SWAP_DURATION = 1.1;
const SWAP_EASE     = [0.4, 0, 0.2, 1] as const;  // enter: decelerate-into-place
const EXIT_EASE     = [0.2, 0, 0.8, 1] as const;  // exit: slow start → heavy cart rolling away

// cartVariants must NOT use `as const` — Framer Motion requires mutable arrays
// for keyframe sequences (readonly tuples cause a TS type error).
const cartVariants = {
  idle:     { x: 0,       y: [0, -2, 0] as number[],            scale: 1,    filter: 'brightness(1)'    },
  dragOver: { x: 0,       y: 0,                                  scale: 1.04, filter: 'brightness(1.12)' },
  bounce:   { x: 0,       y: [0, -8, 4, -3, 1, 0] as number[],  scale: [1, 1.04, 0.97, 1] as number[], filter: 'brightness(1)' },
  exit:     { x: '150vw', y: 0,                                  scale: 1,    filter: 'brightness(1)'    },
  enter:    { x: 0,       y: 0,                                  scale: 1,    filter: 'brightness(1)'    },
};

const cartTransitions: Record<CartState, object> = {
  // Per-property transitions for idle — each property gets its own curve so
  // scale eases back smoothly after dragOver (instead of snapping), filter
  // cross-fades back to normal brightness, and x stays locked at 0 instantly.
  idle: {
    y:      { duration: 3,   repeat: Infinity, ease: 'easeInOut' },
    scale:  { duration: 0.25, ease: 'easeOut' },
    x:      { duration: 0 },
    filter: { duration: 0.3,  ease: 'easeOut' },
  },
  dragOver: { duration: 0.18, ease: 'easeOut' },
  // Bounce: explicit times so each keyframe step has its own pacing.
  // [0→-8] fast pop up, [-8→4] heavy landing overshoot, [4→-3,1,0] decay.
  bounce: {
    y:     { duration: 0.52, times: [0, 0.22, 0.44, 0.66, 0.82, 1], ease: 'easeOut' },
    scale: { duration: 0.52, times: [0, 0.22, 0.55, 1],              ease: 'easeOut' },
    filter:{ duration: 0 },
  },
  exit:  { duration: SWAP_DURATION, ease: EXIT_EASE  },
  enter: { duration: SWAP_DURATION, ease: SWAP_EASE  },
};

// ─── Realistic Shopping Cart ──────────────────────────────────────────────────
function RealisticCart({
  cartItems, cartState, onEnterDone, cartRef, cartLayerRef, exitRect,
}: {
  cartItems: CartItemEntry[];
  cartState: CartState;
  onEnterDone: () => void;
  cartRef: React.RefObject<HTMLDivElement | null>;
  cartLayerRef: React.RefObject<HTMLDivElement | null>;
  // When set, render as a fixed-position overlay starting at these coordinates
  // so the exit animation is never clipped by any ancestor overflow.
  exitRect?: { top: number; left: number; width: number; height: number };
}) {
  const fixedStyle: React.CSSProperties | undefined = exitRect
    ? { position: 'fixed', top: exitRect.top, left: exitRect.left,
        width: exitRect.width, height: exitRect.height }
    : undefined;

  return (
    <motion.div
      className="cart-wrapper"
      style={fixedStyle}
      initial={cartState === 'enter' ? { x: '-150vw' } : cartState === 'exit' ? { x: 0 } : false}
      animate={cartVariants[cartState]}
      transition={cartTransitions[cartState]}
      onAnimationComplete={() => {
        if (cartState === 'enter' || cartState === 'exit') onEnterDone();
      }}
    >
      {/* Ground shadow */}
      <div className="cart-ground-shadow" aria-hidden="true" />

      <div ref={cartRef} className="cart-frame">

        {/* ── Back SVG layer (basket fill + handle + undercarriage) ── */}
        <svg viewBox="0 0 260 150" className="cart-svg cart-svg--back" aria-hidden="true">
          <defs>
            <linearGradient id="g7-metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#f8fafc" />
              <stop offset="40%"  stopColor="#cbd5e1" />
              <stop offset="80%"  stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="g7-handleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#f87171" />
              <stop offset="50%"  stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <pattern id="g7-wireGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeOpacity="0.4" />
            </pattern>
          </defs>

          {/* Undercarriage frame tube */}
          <path d="M35 115 L215 115 L205 130 L45 130 Z"
            fill="none" stroke="url(#g7-metalGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 85 L40 115"  stroke="url(#g7-metalGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M200 85 L210 115" stroke="url(#g7-metalGrad)" strokeWidth="6" strokeLinecap="round" />

          {/* Handle bar mount + ergonomic grip */}
          <path d="M30 32 L12 18 C8 15 5 22 8 26 L28 55"
            stroke="url(#g7-metalGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <rect x="1" y="8" width="22" height="14" rx="6"
            fill="url(#g7-handleGrad)" transform="rotate(-28 12 18)" />

          {/* Basket back panel — wire mesh fill */}
          <path d="M30 30 L225 30 L210 95 L45 95 Z" fill="url(#g7-wireGrid)" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M30 30 L225 30 L210 95 L45 95 Z" fill="#f8fafc" fillOpacity="0.35" />
        </svg>

        {/* ── Item pile — sits between the two SVG layers ── */}
        <div className="cart-items-layer" ref={cartLayerRef} aria-hidden="true">
          {cartItems.map((ci, visualIdx) => {
            // 4 columns across the layer (layer width = 57% of cart frame)
            // Positions as % of layer width so items stay inside the basket
            const COLS   = 4;
            const COL_X  = [4, 28, 54, 78];  // left% for each column (0–100)
            const col    = visualIdx % COLS;
            const row    = Math.floor(visualIdx / COLS);
            const oxPct  = COL_X[col];
            // Each new row rises 20px; layer height ≈ 41% of 160px ≈ 65px
            // so 3 rows fit (0, 20, 40px rise)
            const oyPx   = row * -20;
            // Natural tilt per column
            const ROTS   = [-9, 5, -5, 8];
            const rot    = ROTS[col];
            return (
              <span
                key={`${ci.id}-${visualIdx}`}
                className="cart-item-emoji"
                style={{ left: `${oxPct}%`, transform: `translateY(${oyPx}px) rotate(${rot}deg)` }}
              >
                {ci.iconSrc
                  ? <img src={ci.iconSrc} alt={ci.icon} width={30} height={30} style={{ display: 'block' }} />
                  : ci.icon}
              </span>
            );
          })}
        </div>

        {/* ── Front SVG layer (wire lines, rim, wheels, seat) ── */}
        <svg viewBox="0 0 260 150" className="cart-svg cart-svg--front" aria-hidden="true">
          {/* Outer basket border */}
          <path d="M30 30 L225 30 L210 95 L45 95 Z"
            fill="none" stroke="#64748b" strokeWidth="3.5" strokeLinejoin="round" />

          {/* Horizontal grill wires */}
          <line x1="33" y1="46" x2="221" y2="46" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="37" y1="62" x2="217" y2="62" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="41" y1="78" x2="213" y2="78" stroke="#94a3b8" strokeWidth="2.5" />

          {/* Vertical grill wires */}
          <line x1="60"  y1="30" x2="68"  y2="95" stroke="#94a3b8" strokeWidth="2" />
          <line x1="90"  y1="30" x2="95"  y2="95" stroke="#94a3b8" strokeWidth="2" />
          <line x1="120" y1="30" x2="122" y2="95" stroke="#94a3b8" strokeWidth="2" />
          <line x1="150" y1="30" x2="149" y2="95" stroke="#94a3b8" strokeWidth="2" />
          <line x1="180" y1="30" x2="176" y2="95" stroke="#94a3b8" strokeWidth="2" />
          <line x1="205" y1="30" x2="198" y2="95" stroke="#94a3b8" strokeWidth="2" />

          {/* Red corner safety bumpers */}
          <rect x="23" y="26" width="12" height="10" rx="3" fill="url(#g7-handleGrad)" />
          <rect x="220" y="26" width="12" height="10" rx="3" fill="url(#g7-handleGrad)" />

          {/* Red child seat flap */}
          <path d="M32 32 L55 32 L50 65 L35 65 Z"
            fill="#ef4444" fillOpacity="0.85" stroke="#b91c1c" strokeWidth="1.5" />

          {/* Rear swivel wheel */}
          <g transform="translate(42,128)">
            <circle cx="0" cy="0" r="13" fill="#1e293b" />
            <circle cx="0" cy="0" r="8"  fill="#94a3b8" />
            <circle cx="0" cy="0" r="4"  fill="#f8fafc" />
            <path d="M-3 -12 L3 -12 L2 -18 L-2 -18 Z" fill="#64748b" />
          </g>

          {/* Front swivel wheel */}
          <g transform="translate(208,128)">
            <circle cx="0" cy="0" r="13" fill="#1e293b" />
            <circle cx="0" cy="0" r="8"  fill="#94a3b8" />
            <circle cx="0" cy="0" r="4"  fill="#f8fafc" />
            <path d="M-3 -12 L3 -12 L2 -18 L-2 -18 Z" fill="#64748b" />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

// ─── Confetti Burst ───────────────────────────────────────────────────────────
const CONFETTI_COLORS = ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#ec4899', '#14b8a6'];
const ConfettiBurst = React.memo(function ConfettiBurst() {
  // Generate all particles once on mount — useMemo so they never re-randomise
  const particles = React.useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    id:       i,
    color:    CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    x:        (Math.random() - 0.5) * 260,
    y:        -(Math.random() * 130 + 30),
    rotate:   Math.random() * 720 - 360,
    duration: 0.8 + Math.random() * 0.5,
    delay:    Math.random() * 0.12,
    size:     7 + Math.random() * 6,
  })), []);

  return (
    <div className="confetti-container">
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="confetti-particle"
          style={{
            top: '50%', left: '50%',
            width: p.size, height: p.size * 0.55,
            background: p.color,
            borderRadius: 2,
          }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, scale: 0.2, opacity: 0, rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function Game7({ onScore, language }: Props): React.ReactElement {
  const [_level, setLevel]              = useState(1);
  const [_coins, setCoins]              = useState(10);
  const [_stars, setStars]              = useState(0);
  const [availableItems, setAvailableItems] = useState<MarketItem[]>([]);
  const [order, setOrder]               = useState<{ item: MarketItem; count: number } | null>(null);
  const [cartCount, setCartCount]       = useState(0);
  const [cartItems, setCartItems]       = useState<CartItemEntry[]>([]);
  const [cartState, setCartState]       = useState<CartState>('idle');
  const [cartKey, setCartKey]           = useState(0);
  const [exitingCart, setExitingCart]   = useState<CartItemEntry[] | null>(null);
  const [exitingRect, setExitingRect]   = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [isSuccess, setIsSuccess]       = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shelfKey, setShelfKey]         = useState(0);
  const [mascotState, setMascotState]   = useState<MascotState>('idle');
  const [speechText, setSpeechText]     = useState('');
  const [flyingItems, setFlyingItems]   = useState<FlyingItemEntry[]>([]);

  const cartItemsRef     = useRef<CartItemEntry[]>([]);   // mirror of cartItems for sync reads
  const cartRef          = useRef<HTMLDivElement | null>(null);
  const cartLayerRef     = useRef<HTMLDivElement | null>(null);
  // Tracks the last few target item IDs to avoid repeating them
  const recentItemsRef   = useRef<string[]>([]);
  const speechTextRef    = useRef<string>('');
  const itemElemsRef     = useRef<Map<string, HTMLElement>>(new Map());
  const wasDraggingRef   = useRef(false);
  // Number of flying items currently in-flight (launched but not yet landed).
  // Used to compute the correct target slot index for the next tap without
  // waiting for React state to flush — round-agnostic so it never needs reset.
  const inFlightCountRef = useRef(0);
  // Tracks how many correct items have been tapped this round (for spoken count).
  const pendingCountRef  = useRef(0);

  // ── New round ───────────────────────────────────────────────────────────────
  const CART_CAPACITY = 15;

  // keepCartState: pass true when a cart-swap animation is already in progress
  // so startNewRound doesn't clobber the 'enter' / 'exit' cart state.
  const startNewRound = useCallback((clearCart = false, keepCartState = false) => {
    // Fisher-Yates shuffle — unbiased unlike .sort(() => Math.random() - 0.5)
    const arr = [...marketItems];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const shelf = arr.slice(0, 8);

    // Exclude items seen in the last 4 rounds so the same item can't repeat soon.
    // Fall back to full shelf if all shelf items happen to be in recent history.
    const recent     = recentItemsRef.current;
    const candidates = shelf.filter(i => !recent.includes(i.id));
    const pool       = candidates.length > 0 ? candidates : shelf;
    const target     = pool[Math.floor(Math.random() * pool.length)];
    // Keep a rolling window of the last 4 targets
    recentItemsRef.current = [target.id, ...recent].slice(0, 4);

    const count = Math.floor(Math.random() * 3) + 1;

    setAvailableItems(shelf);
    setOrder({ item: target, count });
    setCartCount(0);
    setIsSuccess(false);
    if (!keepCartState) setCartState('idle');
    setMascotState('idle');
    pendingCountRef.current  = 0;  // reset spoken-count whenever a new round starts
    // inFlightCountRef is NOT reset here — in-flight items from the previous round
    // may still be landing; they will decrement it on their own.
    setShelfKey(k => k + 1);
    if (clearCart) setCartItems([]);

    const text = buildOrderText(count, target);
    speechTextRef.current = text;
    setSpeechText(text);
  }, []);

  // Announce the current order phrase — reads ref so never stale or double-fired
  const announceOrder = useCallback((delayMs = 0) => {
    const text = speechTextRef.current;
    if (!text) return;
    if (delayMs > 0) {
      setTimeout(() => speakText(text.replace('!', '')), delayMs);
    } else {
      speakText(text.replace('!', ''));
    }
  }, []);

  useEffect(() => {
    startNewRound();
    // Announce first order after voices load
    setTimeout(() => announceOrder(), 600);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => () => { cancelSpeech(); }, []);

  // Keep ref in sync so the swap logic can read cartItems synchronously
  useEffect(() => { cartItemsRef.current = cartItems; }, [cartItems]);

  // ── Mascot click — giggle + replay ──────────────────────────────────────────
  const handleMascotClick = useCallback(() => {
    playSynth('giggle');
    setMascotState('talking');
    announceOrder();
    setTimeout(() => setMascotState('idle'), 2200);
  }, [announceOrder]);

  // ── Drop item ───────────────────────────────────────────────────────────────
  const handleItemDrop = useCallback((dropped: MarketItem) => {
    if (isSuccess || !order) return;
    // Sub-Task 8: lock drops while the new cart is sliding in — prevents bounce
    // interrupting the enter animation on rapid taps
    if (cartState === 'enter') return;
    if (cartCount >= order.count) return;

    if (dropped.id === order.item.id) {
      const newCount = cartCount + 1;

      playSynth('drop');
      setCartCount(newCount);
      setCartItems(prev => {
        const next = [...prev, { id: Date.now() + Math.random(), icon: dropped.icon, iconSrc: dropped.iconSrc, idx: prev.length }];
        // Keep ref in sync immediately (also updated by useEffect after render,
        // but we need it current before the next handleFlyClick in the same frame).
        cartItemsRef.current = next;
        return next;
      });

      // Bounce starts one rAF after landing so the emoji appears at rest first
      // Sub-Task 9: 620ms gives reliable buffer after the 500ms bounce duration
      requestAnimationFrame(() => {
        setCartState('bounce');
        setTimeout(() => setCartState('idle'), 620);
      });

      if (newCount >= order.count) {
        setIsSuccess(true);
        setStars(s => s + 1);
        setCoins(c => c + 5);
        onScore(20);

        // itemsAfterDrop = total items in the cart pile after this drop.
        // cartItemsRef.current is a mirror of cartItems state; the setCartItems updater
        // above has NOT yet been flushed by React at this point (batched), so we add 1
        // to the current ref length to account for the item just queued.
        const itemsAfterDrop = cartItemsRef.current.length + 1;
        // Sub-Task 6: 700ms settle delay lets happy mascot + success sound land
        // before the cart starts moving
        setTimeout(() => {
          const cartFull = itemsAfterDrop >= CART_CAPACITY;

          if (cartFull) {
            setMascotState('happy');
            playSynth('success');
            // Sub-Task 10: fire confetti burst; clear after particles have animated out
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 1400);
            // Read current items synchronously from the ref (always up-to-date).
            const snapshot = [...cartItemsRef.current];
            // Capture wrapper geometry before any state change triggers a re-render.
            const wrapperEl = cartRef.current?.closest('.cart-wrapper') as HTMLElement | null;
            const rect = wrapperEl?.getBoundingClientRect();
            // Set exiting state in one batch: rect + items → clone appears at exact
            // position and immediately starts sliding right.
            if (rect) setExitingRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
            setExitingCart(snapshot);
            // New cart enters from the left simultaneously.
            setCartKey(k => k + 1);
            setCartState('enter');
            startNewRound(true, true);
            setTimeout(() => setLevel(l => l + 1), SWAP_DURATION * 1000);
          } else {
            setMascotState('talking');
            playSynth('drop');
            setTimeout(() => setMascotState('idle'), 600);
            setLevel(l => l + 1);
            startNewRound(false);
          }
        }, 700);

        // Sub-Task 6: announce delay updated to match increased settle + swap time
        setTimeout(() => announceOrder(), itemsAfterDrop >= CART_CAPACITY ? 2600 : 1200);
      }
    } else {
      // Wrong item: the flying emoji was already launched and inFlightCountRef
      // already incremented. Decrement it so the next correct tap targets the
      // right slot (the wrong item still lands but handleItemDrop ignores it).
      inFlightCountRef.current = Math.max(0, inFlightCountRef.current - 1);
      playSynth('error');
      setMascotState('sad');
      speakText(`Não! Isso é ${dropped.ptName}.`);
      setTimeout(() => setMascotState('idle'), 1800);
    }
  }, [isSuccess, order, cartState, cartCount, onScore, startNewRound, announceOrder]);

  // ── Tap-to-fly: launch flying emoji from item → exact slot in cart ───────────
  const handleFlyClick = useCallback((item: MarketItem, _e: React.MouseEvent | React.TouchEvent) => {
    if (isSuccess) return;
    // Sub-Task 8: lock taps while the new cart is sliding in
    if (cartState === 'enter') return;
    // Do not allow tapping more items than the order requires (cartCount is round-scoped)
    if (order && item.id === order.item.id && cartCount + inFlightCountRef.current >= order.count) return;
    if (!cartRef.current) { handleItemDrop(item); return; }

    const srcEl = itemElemsRef.current.get(item.id);
    if (!srcEl) { handleItemDrop(item); return; }

    // Read the element's layout rect WITHOUT any active Framer Motion transforms
    // (whileHover, whileDrag, dragSnapToOrigin snapback, entrance animation, etc.)
    // by temporarily clearing the transform, sampling, then restoring it.
    const prevTransform = srcEl.style.transform;
    srcEl.style.transform = 'none';
    const srcRect = srcEl.getBoundingClientRect();
    srcEl.style.transform = prevTransform;

    const fromX = srcRect.left + srcRect.width  / 2;
    const fromY = srcRect.top  + srcRect.height / 2;

    // Slot index = items already settled in cart + currently in-flight items.
    // Both refs are updated synchronously so rapid taps always get the right slot
    // without waiting for React state to flush.
    const COLS  = 4;
    const COL_X = [4, 28, 54, 78];
    const slotIdx  = cartItemsRef.current.length + inFlightCountRef.current;
    const col      = slotIdx % COLS;
    const row      = Math.floor(slotIdx / COLS);
    const oyPx     = row * -20;
    inFlightCountRef.current += 1;
    pendingCountRef.current  += 1;  // spoken-count only

    let toX: number;
    let toY: number;
    if (cartLayerRef.current) {
      // Read the cart layer's layout rect WITHOUT any active Framer Motion
      // transforms (bounce, idle float, enter slide, scale) by temporarily
      // zeroing the transform on the animated cart-wrapper, sampling, then
      // restoring it — same technique used above for the source item.
      const cartWrapperEl = cartRef.current?.closest('.cart-wrapper') as HTMLElement | null;
      const prevCartTransform = cartWrapperEl ? cartWrapperEl.style.transform : '';
      if (cartWrapperEl) cartWrapperEl.style.transform = 'none';
      const lr = cartLayerRef.current.getBoundingClientRect();
      if (cartWrapperEl) cartWrapperEl.style.transform = prevCartTransform;

      // The flying span is `position:fixed; left:0; top:0` and Framer Motion
      // drives it with `transform: translate(x, y)`, so x/y are the top-left
      // corner of the span in viewport coordinates.
      //
      // The static cart-item-emoji slot is positioned as:
      //   left: COL_X[col]%   (left-edge of emoji within the layer)
      //   bottom: 2px + translateY(oyPx)  → top-edge = lr.bottom - 2 + oyPx - emojiSize
      //
      // The flying item has font-size 36px so emojiSize ≈ 36px.
      const EMOJI_SIZE = 36;
      toX = lr.left + lr.width * (COL_X[col] / 100);
      toY = lr.bottom - 2 + oyPx - EMOJI_SIZE;
    } else {
      const cr = cartRef.current.getBoundingClientRect();
      toX = cr.left + cr.width  / 2;
      toY = cr.top  + cr.height * 0.55;
    }

    // For kg items speak "um quilo", "dois quilos" etc.; for piece items speak the numeral
    const spokenCount = pendingCountRef.current;
    const spokenText = item.unit === 'kg'
      ? (spokenCount === 1 ? 'um quilo' : `${getNumberWord(spokenCount, 'm')} quilos`)
      : getNumberWord(spokenCount, item.gender);
    speakText(spokenText);
    setFlyingItems(prev => [...prev, { id: Date.now(), itemId: item.id, icon: item.icon, iconSrc: item.iconSrc, fromX, fromY, toX, toY }]);
  }, [isSuccess, cartState, cartCount, order, handleItemDrop]);

  const handleFlyLand = useCallback((flyId: number, item: MarketItem) => {
    inFlightCountRef.current = Math.max(0, inFlightCountRef.current - 1);
    setFlyingItems(prev => prev.filter(f => f.id !== flyId));
    handleItemDrop(item);
  }, [handleItemDrop]);

  // ── Drag ─────────────────────────────────────────────────────────────────────
  const handleDragStart = useCallback(() => {
    if (isSuccess) return;
    wasDraggingRef.current = true;
    setCartState(cs => (cs === 'idle' ? 'dragOver' : cs));
  }, [isSuccess]);

  const handleDragEnd = useCallback(
    (
      _e: unknown,
      info: { point: { x: number; y: number } },
      item: MarketItem,
      snapBack: () => void,
    ) => {
      // Pointer-up with no movement → treat as tap, let onClick fire
      if (!wasDraggingRef.current) {
        setCartState(cs => (cs === 'dragOver' ? 'idle' : cs));
        return;
      }
      wasDraggingRef.current = false;
      setCartState(cs => (cs === 'dragOver' ? 'idle' : cs));

      if (isSuccess || !cartRef.current) { snapBack(); return; }

      const b = cartRef.current.getBoundingClientRect();
      const { x, y } = info.point;
      const overCart  = x >= b.left - 40 && x <= b.right + 40
                     && y >= b.top  - 50 && y <= b.bottom + 50;

      if (overCart) {
        handleItemDrop(item);
        // Accepted — item released over cart, ghost disappears naturally
      } else {
        snapBack();
      }
    },
    [isSuccess, handleItemDrop],
  );

  if (!order) return <></>;

  const isFlying   = flyingItems.length > 0;
  const ouvir      = language === 'tr' ? '🔊 Dinle' : '🔊 Ouvir';
  // While a fly animation is in progress lock cart to idle (no float)
  const effectiveCartState: CartState =
    isFlying && cartState === 'idle' ? 'dragOver' : cartState;

  return (
    <div className="game-container game7">

      {/* ── Mascot + speech bubble ── */}
      <div className="mascot-row">
        <BunnyMascot state={mascotState} onClick={handleMascotClick} />

        {/* AnimatePresence lets the old card exit before the new one enters.
            This prevents the abrupt snap when speechText changes. */}
        <AnimatePresence mode="wait">
          <motion.div className="speech-card"
              key={speechText}
              initial={{ scale: 0.88, opacity: 0, x: -8 }}
              animate={{ scale: 1,    opacity: 1, x: 0  }}
              exit={{    scale: 0.88, opacity: 0, x:  8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
            {/* CSS arrow pointer */}
            <div className="speech-card__arrow-border" aria-hidden="true" />
            <div className="speech-card__arrow-fill"  aria-hidden="true" />

            <div className="speech-card__row">
              <p className="speech-card__text">{speechText}</p>
              <button className="btn-ouvir" onClick={handleMascotClick} title={ouvir} aria-label={ouvir}>
                🔊
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress badge ── */}
      <div className="cart-progress-badge">
        <span className="cart-progress-badge__icon">
          {order.item.iconSrc
            ? <img src={order.item.iconSrc} alt={order.item.icon} width={24} height={24} style={{ display: 'block' }} />
            : order.item.icon}
        </span>
        <span className="cart-progress-badge__fraction">{cartCount} / {order.count}</span>
        <AnimatePresence>
          {cartCount >= order.count && (
            <motion.span className="cart-progress-badge__check"
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}>
              {/* Vector SVG tick — never pixelates */}
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                <polyline points="2,9 6,13 14,4" stroke="#fff" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Exiting cart — fixed at exact screen position so it slides off
           the right edge without being clipped by any ancestor overflow.
           Wrapped in AnimatePresence so it always completes its slide-off before
           unmounting, even if onEnterDone clears exitingCart early. ── */}
      <AnimatePresence>
        {exitingCart !== null && exitingRect !== null && (
          <RealisticCart
            key="exiting-cart"
            cartItems={exitingCart}
            cartState="exit"
            onEnterDone={() => {
              setExitingCart(null);
              setExitingRect(null);
            }}
            exitRect={exitingRect}
            cartRef={{ current: null } as React.RefObject<HTMLDivElement | null>}
            cartLayerRef={{ current: null } as React.RefObject<HTMLDivElement | null>}
          />
        )}
      </AnimatePresence>

      {/* ── Cart ── */}
      {/* overflow:hidden was removed — it clipped the entering cart's slide-in
          and the confetti burst. The exiting cart uses fixed positioning so it
          is already unclipped; the entering cart animates from -150vw which is
          off-screen regardless of overflow. */}
      <div className="market-cart-zone">
        {/* Active / incoming cart */}
        <RealisticCart
          key={cartKey}
          cartItems={cartItems}
          cartState={effectiveCartState}
          onEnterDone={() => { setCartState('idle'); }}
          cartRef={cartRef}
          cartLayerRef={cartLayerRef}
        />
      </div>

      {/* Confetti burst — rendered outside the cart zone so it is never clipped.
          Particles fly outward from the cart position using absolute coords. */}
      <AnimatePresence>
        {showConfetti && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30, overflow: 'hidden', borderRadius: 'inherit' }}>
            <ConfettiBurst key="confetti" />
          </div>
        )}
      </AnimatePresence>

      {/* ── Shelf ── */}
      <div className="market-shelf">
        <div className="market-shelf__label">🏪 {language === 'tr' ? 'PAZAR TEZGAHI' : 'BANCADA DO MERCADO'}</div>
        <div className="shelf-plank">
          <div className="shelf-grid">
            {/* mode="popLayout" lets new items enter immediately alongside
                exiting ones — no full-exit-before-enter stall. */}
            <AnimatePresence mode="popLayout">
              {availableItems.map((item, idx) => (
                <motion.div
                  key={`${shelfKey}-${item.id}`}
                  className="market-item"
                  ref={(el) => {
                    if (el) itemElemsRef.current.set(item.id, el);
                    else itemElemsRef.current.delete(item.id);
                  }}
                  drag
                  // dragSnapToOrigin springs the item back to shelf on every drag release.
                  // For accepted drops the round transitions anyway; for rejected ones this
                  // gives clear visual feedback that the item belongs on the shelf.
                  dragSnapToOrigin
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileDrag={{ scale: 1.35, zIndex: 50, rotate: 8 }}
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 10 }}
                  transition={{ delay: idx * 0.04, type: 'spring', stiffness: 320, damping: 22 }}
                  onDragStart={() => handleDragStart()}
                  onDragEnd={(e, info) => handleDragEnd(e, info, item, () => { /* dragSnapToOrigin handles it */ })}
                  onClick={(e) => {
                    if (wasDraggingRef.current) { wasDraggingRef.current = false; return; }
                    handleFlyClick(item, e);
                  }}
                >
                  {/* Blurred ground shadow beneath item */}
                  <div className="market-item__shadow" aria-hidden="true" />
                  <span
                    className="market-item__icon"
                    style={item.iconBg ? { background: item.iconBg, borderRadius: '50%', padding: '3px' } : undefined}
                  >{item.iconSrc
                    ? <img src={item.iconSrc} alt={item.icon} width={item.id === 'pastel_nata' ? 48 : 36} height={item.id === 'pastel_nata' ? 48 : 36} style={{ display: 'block' }} />
                    : item.icon}</span>
                  {/* Parchment label tag */}
                  <div className="market-item__tag">{item.ptName}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Flying items portal overlay ── */}
      {flyingItems.map(entry => (
        <FlyingItemWrapper
          key={entry.id}
          entry={entry}
          availableItems={availableItems}
          onFlyLand={handleFlyLand}
        />
      ))}

    </div>
  );
}
