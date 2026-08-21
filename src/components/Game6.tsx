import React, { useCallback, useEffect, useRef, useState } from 'react';
import { kidsWords, Word } from '../data/words';
import { speakText } from '../utils/speech';
import { useWikiImage } from '../utils/useWikiImage';
import '../styles/Game6.scss';

// ─── Layout constants ─────────────────────────────────────────────────────────
const COLS      = 3;
const ROWS      = 3;

// Board tile size (pieces snap to this size)
const PIECE_W   = 82;
const PIECE_H   = 82;
const BOARD_W   = COLS * PIECE_W;   // 246
const BOARD_H   = ROWS * PIECE_H;   // 246

// Tray piece size — noticeably smaller than board slots
const TRAY_W    = 68;
const TRAY_H    = 68;
const SNAP_DIST = 34;   // snap radius (centre-to-centre)

// Canvas layout:
//   [PAD] [left tray col] [GAP] [board] [GAP] [right tray col] [PAD]
//   bottom row sits below board
const PAD  = 14;
const GAP  = 14;   // gap between tray column and board edge

const BOARD_X = PAD + TRAY_W + GAP;   // 8+50+10 = 68
const BOARD_Y = 10;

const CANVAS_W = BOARD_X + BOARD_W + GAP + TRAY_W + PAD;
const CANVAS_H = BOARD_Y + BOARD_H + GAP + TRAY_H + PAD + 16;  // +16 so bottom tray pieces are fully visible

// ─── Jigsaw edge table  [top, right, bottom, left]  1=tab  -1=blank  0=flat ──
// Mathematically verified: every shared edge pair sums to 0.
const EDGE_TABLE: [number, number, number, number][] = [
  [ 0,  1,  1,  0], [ 0,  1,  1, -1], [ 0,  0,  1, -1],
  [-1,  1, -1,  0], [-1,  1, -1, -1], [-1,  0, -1, -1],
  [ 1,  1,  0,  0], [ 1,  1,  0, -1], [ 1,  0,  0, -1],
];

// ─── Tray positions: 3 left + 3 right + 3 bottom, all outside the board ──────
// Left column: x=PAD, vertically centred within board height (3 slots, evenly spaced)
const LX       = PAD;
const RX       = BOARD_X + BOARD_W + GAP;         // 68+228+10 = 306
const BY       = BOARD_Y + BOARD_H + GAP;          // 10+228+10 = 248
const L_STEP   = (BOARD_H - TRAY_H) / 2;           // vertical gap between left/right slots
const B_STEP   = (BOARD_W - TRAY_W) / 2;           // horizontal gap between bottom slots

const TRAY_POSITIONS = [
  // left column (top → bottom)
  { x: LX, y: BOARD_Y + 12,         rot: -0.18 },
  { x: LX, y: BOARD_Y + L_STEP,     rot:  0.15 },
  { x: LX, y: BOARD_Y + L_STEP * 2, rot: -0.20 },
  // right column (top → bottom)
  { x: RX, y: BOARD_Y + 12,         rot:  0.17 },
  { x: RX, y: BOARD_Y + L_STEP,     rot: -0.12 },
  { x: RX, y: BOARD_Y + L_STEP * 2, rot:  0.21 },
  // bottom row (left → right)
  { x: BOARD_X,              y: BY, rot: -0.14 },
  { x: BOARD_X + B_STEP,     y: BY, rot:  0.11 },
  { x: BOARD_X + B_STEP * 2, y: BY, rot: -0.13 },
];

// ─── Word filter ──────────────────────────────────────────────────────────────
const EXCLUDE_PATTERNS = [
  /^to /,
  /^(red|blue|green|yellow|white|black|pink|orange|purple|brown)$/i,
  /^(one|two|three|four|five|six|seven|eight|nine|ten)$/i,
  /^(big|small|beautiful|ugly|good|bad|new|old|fast|slow|hot|cold|happy|sad|tired|hungry|thirsty|sick|healthy|tall|short|easy|difficult)$/i,
  /^(today|tomorrow|yesterday|morning|afternoon|night|evening|day|week|month|year|hour|time|sun|rain|snow|wind|cloud|weather)$/i,
  /^(hello|goodbye|thank|please|sorry|excuse|yes|no|okay|alright)/i,
  /\(m\)|\(f\)/, /\s/,
];
const puzzleWords: Word[] = kidsWords.filter(
  ({ en }) => !EXCLUDE_PATTERNS.some(r => r.test(en)),
);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props { onScore: (pts: number) => void; language: 'en' | 'tr'; }

interface Piece {
  col: number; row: number;  // grid position (0-indexed)
  x: number;   y: number;   // current canvas position (top-left of bounding box)
  pw: number;  ph: number;   // current drawn size (TRAY_W/H in tray, PIECE_W/H when solved)
  rot: number;               // current rotation in radians
  solvedX: number; solvedY: number; // target position on the board
  traySlot: number;          // index into TRAY_POSITIONS
  solved: boolean;
}

interface Tween {
  piece: Piece;
  fromX: number; fromY: number; fromRot: number; fromPw: number; fromPh: number;
  toX: number;   toY: number;   toRot: number;   toPw: number;  toPh: number;
  /** Starts negative for stagger delay; animation runs only when t >= 0 */
  t: number;
}

// ─── drawJigsawPath ──────────────────────────────────────────────────────────
// Traces the jigsaw outline for one piece onto ctx (no fill/stroke/clip yet).
// Follows path direction: topLeft → topRight → bottomRight → bottomLeft → close
//
// Arc sweep rules (path goes clockwise by default, y-axis down):
//   top    (left→right):   tab=out(up)    ccw=false  blank=in(down)  ccw=true
//   right  (top→bottom):  tab=out(right) ccw=false  blank=in(left)  ccw=true
//   bottom (right→left):  tab=out(down)  ccw=true   blank=in(up)    ccw=false
//   left   (bottom→top):  tab=out(left)  ccw=true   blank=in(right) ccw=false
function drawJigsawPath(
  ctx: CanvasRenderingContext2D,
  edges: [number, number, number, number],
  x: number, y: number,
  pw: number, ph: number,
  r: number,
): void {
  const [eTop, eRight, eBottom, eLeft] = edges;
  ctx.beginPath();
  ctx.moveTo(x, y);

  // ── Top edge: left → right ────────────────────────────────────────────────
  // tab=out(up): ccw=true   blank=in(down): ccw=false
  if (eTop === 0) {
    ctx.lineTo(x + pw, y);
  } else {
    ctx.lineTo(x + pw / 2 - r, y);
    ctx.arc(x + pw / 2, y, r, Math.PI, 0, eTop === 1 /* tab=ccw */);
    ctx.lineTo(x + pw, y);
  }

  // ── Right edge: top → bottom ──────────────────────────────────────────────
  if (eRight === 0) {
    ctx.lineTo(x + pw, y + ph);
  } else {
    ctx.lineTo(x + pw, y + ph / 2 - r);
    ctx.arc(x + pw, y + ph / 2, r, Math.PI * 1.5, Math.PI * 0.5, eRight === -1);
    ctx.lineTo(x + pw, y + ph);
  }

  // ── Bottom edge: right → left ─────────────────────────────────────────────
  if (eBottom === 0) {
    ctx.lineTo(x, y + ph);
  } else {
    ctx.lineTo(x + pw / 2 + r, y + ph);
    ctx.arc(x + pw / 2, y + ph, r, 0, Math.PI, eBottom === 1 /* tab=ccw */);
    ctx.lineTo(x, y + ph);
  }

  // ── Left edge: bottom → top ───────────────────────────────────────────────
  // tab=out(left): ccw=false   blank=in(right): ccw=true
  if (eLeft === 0) {
    ctx.lineTo(x, y);
  } else {
    ctx.lineTo(x, y + ph / 2 + r);
    ctx.arc(x, y + ph / 2, r, Math.PI * 0.5, Math.PI * 1.5, eLeft === -1 /* blank=ccw */);
    ctx.lineTo(x, y);
  }

  ctx.closePath();
}

// ─── Game6 ────────────────────────────────────────────────────────────────────
export default function Game6({ onScore, language }: Props): React.ReactElement {
  const [target,       setTarget]       = useState<Word | null>(null);
  const [animClass,    setAnimClass]    = useState('');
  const [showFallback, setShowFallback] = useState(false);

  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const imgRef         = useRef<HTMLImageElement | null>(null);
  const piecesRef      = useRef<Piece[]>([]);
  const dragRef        = useRef<{ piece: Piece; offsetX: number; offsetY: number } | null>(null);
  const tweensRef      = useRef<Tween[]>([]);
  const rafRef         = useRef<number>(0);
  const solvedRef      = useRef(false);
  const targetRef      = useRef<Word | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 'preview': show full image on board; 'playing': pieces scattered in tray
  const phaseRef        = useRef<'preview' | 'playing'>('preview');
  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 'scatter': animating pieces from board to tray (between preview and playing)
  const scatterRef      = useRef(false);
  // spinner angle (driven by render loop — no re-render needed)
  const spinnerAngleRef = useRef(0);
  const imgLoadingRef   = useRef(false);

  const wikiUrl = useWikiImage(target?.en ?? '');

  // ── Load image into imgRef when wikiUrl changes ───────────────────────────
  useEffect(() => {
    if (!wikiUrl) {
      // URL still resolving — keep spinner on, nothing else to do yet
      imgRef.current = null;
      return;
    }
    if (fallbackTimerRef.current !== null) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    imgLoadingRef.current = true;
    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      imgLoadingRef.current = false;
      imgRef.current = img;
      // Show preview for 1.5s then animate pieces out to tray
      phaseRef.current = 'preview';
      scatterRef.current = false;
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
      previewTimerRef.current = setTimeout(() => {
        previewTimerRef.current = null;
        // Switch to playing and launch scatter animation
        phaseRef.current = 'playing';
        scatterRef.current = true;
        tweensRef.current = [];
        piecesRef.current.forEach((piece, i) => {
          const tp = TRAY_POSITIONS[piece.traySlot];
          // Start piece at full board size on its solved grid cell
          piece.x = piece.solvedX;
          piece.y = piece.solvedY;
          piece.pw = PIECE_W;
          piece.ph = PIECE_H;
          piece.rot = 0;
          tweensRef.current.push({
            piece,
            fromX: piece.x,  fromY: piece.y,  fromRot: 0,     fromPw: PIECE_W, fromPh: PIECE_H,
            toX:   tp.x,     toY:   tp.y,     toRot:   tp.rot, toPw:  TRAY_W,  toPh:  TRAY_H,
            t: -i * 0.14,   // stagger: each piece waits a bit longer
          });
        });
      }, 1500);
    };
    img.onerror = () => { if (!cancelled) { imgLoadingRef.current = false; imgRef.current = null; } };
    img.src = wikiUrl;
    return () => {
      cancelled = true;
      if (previewTimerRef.current) { clearTimeout(previewTimerRef.current); previewTimerRef.current = null; }
    };
  }, [wikiUrl]);

  // ── Fallback timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!target) return;
    setShowFallback(false);
    const id = setTimeout(() => setShowFallback(true), 4000);
    fallbackTimerRef.current = id;
    return () => { clearTimeout(id); fallbackTimerRef.current = null; };
  }, [target]);

  // ── Load a new word ────────────────────────────────────────────────────────
  const load = useCallback(() => {
    let next: Word;
    do {
      next = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
    } while (next === targetRef.current && puzzleWords.length > 1);
    targetRef.current = next;
    solvedRef.current = false;
    imgRef.current = null;
    imgLoadingRef.current = true;   // show spinner immediately — URL + image both pending
    tweensRef.current = [];
    dragRef.current = null;
    phaseRef.current = 'preview';
    if (previewTimerRef.current) { clearTimeout(previewTimerRef.current); previewTimerRef.current = null; }

    const shuffled = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
    piecesRef.current = Array.from({ length: COLS * ROWS }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / ROWS);
      const slot = shuffled[i];
      const solvedX = BOARD_X + col * PIECE_W;
      const solvedY = BOARD_Y + row * PIECE_H;
      return {
        col, row,
        // Start on the board so nothing shows in the tray while the image loads
        x: solvedX, y: solvedY,
        pw: PIECE_W, ph: PIECE_H,
        rot: 0,
        solvedX,
        solvedY,
        traySlot: slot,
        solved: false,
      };
    });

    setTarget(next);
    setAnimClass('');
    setShowFallback(false);
    speakText(next.pt);
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Render loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // ── Canvas background: warm gradient-like solid ──────────────────────
      ctx.fillStyle = '#ede0c4';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // ── Board shadow ─────────────────────────────────────────────────────
      ctx.shadowColor = 'rgba(0,0,0,0.18)';
      ctx.shadowBlur  = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 3;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(BOARD_X - 8, BOARD_Y - 8, BOARD_W + 16, BOARD_H + 16);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur  = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Board face
      ctx.fillStyle = '#e8d4b0';
      ctx.fillRect(BOARD_X, BOARD_Y, BOARD_W, BOARD_H);

      // Board inner inset border
      ctx.strokeStyle = 'rgba(160,110,55,0.40)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(BOARD_X + 0.75, BOARD_Y + 0.75, BOARD_W - 1.5, BOARD_H - 1.5);

      // ── Preview phase: draw full image on board, no pieces ───────────────
      if (phaseRef.current === 'preview' && imgRef.current) {
        ctx.drawImage(imgRef.current, BOARD_X, BOARD_Y, BOARD_W, BOARD_H);
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      // ── Jigsaw slot hints on board (ghost shapes for unsolved cells) ─────
      for (const piece of piecesRef.current) {
        if (piece.solved) continue;
        const sx = piece.solvedX;
        const sy = piece.solvedY;
        const r  = PIECE_W * 0.20;
        const tileIdx = piece.row * COLS + piece.col;
        const edges   = EDGE_TABLE[tileIdx];
        // Soft inner fill
        drawJigsawPath(ctx, edges, sx, sy, PIECE_W, PIECE_H, r);
        ctx.fillStyle = 'rgba(140,95,40,0.10)';
        ctx.fill();
        // Dashed border
        drawJigsawPath(ctx, edges, sx, sy, PIECE_W, PIECE_H, r);
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = 'rgba(140,95,40,0.45)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Advance tweens (smoothstep, ~60fps independent)
      // t < 0: stagger delay — keep piece at fromX/fromY, just tick the clock
      const alive: Tween[] = [];
      for (const tw of tweensRef.current) {
        tw.t = Math.min(1, tw.t + 0.024);
        if (tw.t < 0) {
          // Still in stagger delay: park piece at start position + size
          tw.piece.x   = tw.fromX;
          tw.piece.y   = tw.fromY;
          tw.piece.rot = tw.fromRot;
          tw.piece.pw  = tw.fromPw;
          tw.piece.ph  = tw.fromPh;
          alive.push(tw);
          continue;
        }
        const e = tw.t * tw.t * (3 - 2 * tw.t);
        tw.piece.x   = tw.fromX   + (tw.toX   - tw.fromX)   * e;
        tw.piece.y   = tw.fromY   + (tw.toY   - tw.fromY)   * e;
        tw.piece.rot = tw.fromRot + (tw.toRot - tw.fromRot) * e;
        tw.piece.pw  = tw.fromPw  + (tw.toPw  - tw.fromPw)  * e;
        tw.piece.ph  = tw.fromPh  + (tw.toPh  - tw.fromPh)  * e;
        if (tw.t < 1) {
          alive.push(tw);
        } else {
          // Snap to exact final values
          tw.piece.x   = tw.toX;
          tw.piece.y   = tw.toY;
          tw.piece.rot = tw.toRot;
          tw.piece.pw  = tw.toPw;
          tw.piece.ph  = tw.toPh;
          scatterRef.current = false;
        }
      }
      tweensRef.current = alive;

      const img = imgRef.current;
      const pieces = piecesRef.current;

      // Draw solved pieces first (bottom layer), then unsolved
      for (const pass of [true, false]) {
        for (const piece of pieces) {
          if (piece.solved !== pass) continue;
          const { x, y, pw, ph, col, row, rot } = piece;
          const r = pw * 0.20;  // arc radius scales with current piece size
          const cx = x + pw / 2;
          const cy = y + ph / 2;
          const tileIdx = row * COLS + col;
          const edges = EDGE_TABLE[tileIdx];

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);
          ctx.translate(-cx, -cy);

          // Drop shadow for unsolved (tray) pieces
          if (!piece.solved) {
            ctx.save();
            ctx.shadowColor    = 'rgba(0,0,0,0.30)';
            ctx.shadowBlur     = 6;
            ctx.shadowOffsetX  = 2;
            ctx.shadowOffsetY  = 3;
            drawJigsawPath(ctx, edges, x, y, pw, ph, r);
            ctx.fillStyle = 'rgba(0,0,0,0.01)'; // trigger shadow without visible fill
            ctx.fill();
            ctx.restore();
          }

          // Clip to jigsaw shape and draw image region
          drawJigsawPath(ctx, edges, x, y, pw, ph, r);
          ctx.clip();

          if (img) {
            // Scale image so that piece [col,row] fills exactly pw×ph at (x,y)
            ctx.drawImage(
              img,
              x - col * pw,
              y - row * ph,
              pw * COLS,
              ph * ROWS,
            );
          } else {
            ctx.fillStyle = '#e8d5b0';
            ctx.fill();
          }

          ctx.restore();

          // Piece border
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);
          ctx.translate(-cx, -cy);
          drawJigsawPath(ctx, edges, x, y, pw, ph, r);
          if (piece.solved) {
            ctx.strokeStyle = 'rgba(120,80,30,0.20)';
            ctx.lineWidth   = 0.8;
          } else {
            // White highlight on top (inner glow feel)
            ctx.strokeStyle = 'rgba(255,255,255,0.55)';
            ctx.lineWidth   = 2.5;
            ctx.stroke();
            drawJigsawPath(ctx, edges, x, y, pw, ph, r);
            ctx.strokeStyle = 'rgba(60,40,10,0.55)';
            ctx.lineWidth   = 1.2;
          }
          ctx.stroke();
          ctx.restore();
        }
      }

      // ── Loading spinner: drawn on top of board after all pieces ─────────
      if (imgLoadingRef.current) {
        const cx = BOARD_X + BOARD_W / 2;
        const cy = BOARD_Y + BOARD_H / 2;

        // Soft frosted overlay over the board only
        ctx.fillStyle = 'rgba(232, 212, 176, 0.55)';
        ctx.fillRect(BOARD_X, BOARD_Y, BOARD_W, BOARD_H);

        // Three concentric rings, each rotating at a different speed + direction
        spinnerAngleRef.current += 0.045;
        const a = spinnerAngleRef.current;

        const rings: { r: number; w: number; color: string; speed: number; arc: number }[] = [
          { r: 46, w: 7, color: '#c2844a', speed:  1.0,  arc: 1.5 * Math.PI }, // warm brown — outer
          { r: 32, w: 7, color: '#a8692e', speed: -1.4,  arc: 1.2 * Math.PI }, // deep amber — mid (counter)
          { r: 18, w: 7, color: '#d4a96a', speed:  1.9,  arc: 0.9 * Math.PI }, // sandy gold — inner
        ];

        ctx.lineCap = 'round';
        for (const ring of rings) {
          const start = a * ring.speed;
          const end   = start + ring.arc;

          // Glow pass (wide, faint)
          ctx.save();
          ctx.shadowColor  = ring.color;
          ctx.shadowBlur   = 14;
          ctx.lineWidth    = ring.w + 4;
          ctx.strokeStyle  = ring.color + '55';
          ctx.beginPath();
          ctx.arc(cx, cy, ring.r, start, end);
          ctx.stroke();
          ctx.restore();

          // Solid arc on top
          ctx.save();
          ctx.shadowColor  = ring.color;
          ctx.shadowBlur   = 8;
          ctx.lineWidth    = ring.w;
          ctx.strokeStyle  = ring.color;
          ctx.beginPath();
          ctx.arc(cx, cy, ring.r, start, end);
          ctx.stroke();
          ctx.restore();
        }
        ctx.lineCap = 'butt';
      }

      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Pointer events ────────────────────────────────────────────────────────
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (solvedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top)  * scaleY;

    const pieces = piecesRef.current;
    // Hit-test from top (last in array = topmost visually)
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      if (p.solved) continue;
      if (mx >= p.x && mx <= p.x + p.pw && my >= p.y && my <= p.y + p.ph) {
        // Cancel any active tween for this piece
        tweensRef.current = tweensRef.current.filter(tw => tw.piece !== p);
        dragRef.current = { piece: p, offsetX: mx - p.x, offsetY: my - p.y };
        // Bring to front
        pieces.splice(i, 1);
        pieces.push(p);
        canvas.setPointerCapture(e.pointerId);
        break;
      }
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top)  * scaleY;
    d.piece.x   = mx - d.offsetX;
    d.piece.y   = my - d.offsetY;
    d.piece.rot = 0; // straighten while dragging
  }, []);

  const handlePointerUp = useCallback(() => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    if (solvedRef.current) return;

    const { piece } = d;
    // Compare piece centre to solved slot centre for reliable snap detection
    const pieceCX  = piece.x + piece.pw / 2;
    const pieceCY  = piece.y + piece.ph / 2;
    const solvedCX = piece.solvedX + PIECE_W / 2;
    const solvedCY = piece.solvedY + PIECE_H / 2;
    const dist = Math.hypot(pieceCX - solvedCX, pieceCY - solvedCY);

    if (dist <= SNAP_DIST) {
      piece.x   = piece.solvedX;
      piece.y   = piece.solvedY;
      piece.pw  = PIECE_W;
      piece.ph  = PIECE_H;
      piece.rot = 0;
      piece.solved = true;

      if (piecesRef.current.every(p => p.solved)) {
        solvedRef.current = true;
        setAnimClass('correct-anim');
        onScore(15);
        speakText(targetRef.current!.pt);
        setTimeout(() => { setAnimClass(''); load(); }, 1400);
      }
    } else {
      // Tween back to tray position
      const tp = TRAY_POSITIONS[piece.traySlot];
      tweensRef.current.push({
        piece,
        fromX: piece.x,   fromY: piece.y,   fromRot: piece.rot, fromPw: piece.pw, fromPh: piece.ph,
        toX:   tp.x,      toY:   tp.y,      toRot:   tp.rot,    toPw:  TRAY_W,   toPh:  TRAY_H,
        t: 0,
      });
    }
  }, [load, onScore]);

  return (
    <div className={`game-container ${animClass}`} style={{ display: 'block', borderColor: '#f43f5e' }}>
      <h2 style={{ color: '#f43f5e', margin: 0 }}>
        {language === 'tr' ? '🧩 Yapboz' : '🧩 Puzzle'}
      </h2>
      <p style={{ margin: '4px 0 10px', color: '#64748b', fontSize: '0.85rem' }}>
        {language === 'tr' ? 'Parçaları doğru yere sürükle!' : 'Drag the pieces to the right place!'}
      </p>

      <div className="puzzle-stage-wrapper">
        {showFallback ? (
          <div className="puzzle-fallback">
            <div style={{ fontSize: 72 }}>{target?.emoji}</div>
            <div className="puzzle-word-label">{target?.pt}</div>
            <div className="puzzle-subtitle">
              {target ? (language === 'tr' ? target.tr : target.en) : ''}
            </div>
            <button className="game-opt" onClick={() => { onScore(10); load(); }}>
              {language === 'tr' ? '✓ Anladım!' : '✓ Got it!'}
            </button>
          </div>
        ) : (
          <>
            <div className="puzzle-canvas-wrapper">
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                style={{ touchAction: 'none', cursor: dragRef.current ? 'grabbing' : 'grab' }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
            </div>
            <div className="puzzle-word-label">{target?.pt}</div>
            <div className="puzzle-subtitle">
              {target ? (language === 'tr' ? target.tr : target.en) : ''}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
