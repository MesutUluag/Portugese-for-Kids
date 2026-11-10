import type { Word } from '../data/types';

export interface PlacedWord {
  id: string;
  word: Word;
  dir: 'across' | 'down';
  cells: [number, number][]; // [row, col] in normalized grid
  clueR: number;
  clueC: number;
}

export interface ClueInfo {
  wordId: string;
  dir: 'across' | 'down';
  arrow: 'right' | 'down';
  word: Word;
}

export type GridCell =
  | { type: 'block' }
  | {
      type: 'clue';
      clueType: 'single';
      clue: ClueInfo;
    }
  | {
      type: 'clue';
      clueType: 'split';
      topClue: ClueInfo;
      bottomClue: ClueInfo;
    }
  | {
      type: 'letter';
      solution: string;
      wordIds: string[];
      startArrows: ('right' | 'down')[];
    };

export interface CrosswordPuzzle {
  width: number;
  height: number;
  grid: GridCell[][];
  words: Record<string, PlacedWord>;
  wordList: PlacedWord[];
}

/**
 * Formats a clue string for small square clue cells (1-2 short lines, no overflow).
 */
export function formatBoxClue(text: string): string {
  let clean = text;
  const parenIdx = clean.indexOf(' (');
  if (parenIdx !== -1 && clean.length > 7) {
    clean = clean.slice(0, parenIdx);
  }
  const slashIdx = clean.indexOf(' / ');
  if (slashIdx !== -1 && clean.length > 7) {
    clean = clean.slice(0, slashIdx);
  }
  clean = clean.trim();

  // If starts with "to ", split cleanly: "to" on line 1, rest on line 2
  if (clean.toLowerCase().startsWith('to ') && clean.length > 3) {
    const rest = clean.slice(3).trim();
    return `to\n${rest}`;
  }

  const words = clean.split(' ');
  if (words.length === 2) {
    return `${words[0]}\n${words[1]}`;
  }
  if (words.length >= 3) {
    const mid = Math.ceil(words.length / 2);
    return `${words.slice(0, mid).join(' ')}\n${words.slice(mid).join(' ')}`;
  }
  return clean;
}

interface GeneratedCandidate {
  placedWords: {
    word: Word;
    dir: 'across' | 'down';
    startR: number;
    startC: number;
    clueR: number;
    clueC: number;
    cells: [number, number][];
  }[];
  grid: (
    | null
    | { type: 'letter'; char: string; wordIds: string[] }
    | { type: 'clue'; clues: { wordId: string; dir: 'across' | 'down'; word: Word }[] }
  )[][];
  minR: number;
  maxR: number;
  minC: number;
  maxC: number;
  width: number;
  height: number;
  qualityScore: number;
}

/**
 * Dynamic Arrowword / Crossword generator.
 * Optimized for high density, filled top area (no giant empty gaps), and mobile-friendly bounds (width <= 10).
 */
export function generateCrossword(candidateWords: Word[], targetWordCount = 12): CrosswordPuzzle | null {
  // Filter eligible words: single word, letters only, 2 to 8 characters, deduplicated by uppercase pt
  const seenPt = new Set<string>();
  const validWords = candidateWords.filter((w) => {
    const key = w.pt.toUpperCase();
    if (seenPt.has(key)) return false;
    if (!/^[a-záàâãéêíóôõúç]+$/i.test(w.pt) || w.pt.length < 2 || w.pt.length > 8) return false;
    seenPt.add(key);
    return true;
  });

  if (validWords.length < 3) return null;

  let bestCandidate: GeneratedCandidate | null = null;
  let fallbackCandidate: GeneratedCandidate | null = null;

  const MAX_ATTEMPTS = 60;
  const GRID_SIZE = 30;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const words = [...validWords].sort(() => Math.random() - 0.5);
    const grid: (
      | null
      | { type: 'letter'; char: string; wordIds: string[] }
      | { type: 'clue'; clues: { wordId: string; dir: 'across' | 'down'; word: Word }[] }
    )[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));

    const placedWords: {
      word: Word;
      dir: 'across' | 'down';
      startR: number;
      startC: number;
      clueR: number;
      clueC: number;
      cells: [number, number][];
    }[] = [];

    function canPlace(word: Word, startR: number, startC: number, dir: 'across' | 'down') {
      const upperPt = word.pt.toUpperCase();
      const len = upperPt.length;
      const clueR = dir === 'across' ? startR : startR - 1;
      const clueC = dir === 'across' ? startC - 1 : startC;

      // Bounds check
      if (clueR < 0 || clueR >= GRID_SIZE || clueC < 0 || clueC >= GRID_SIZE) return null;
      const endR = dir === 'across' ? startR : startR + len - 1;
      const endC = dir === 'across' ? startC + len - 1 : startC;
      if (endR >= GRID_SIZE || endC >= GRID_SIZE) return null;

      // Clue cell check
      const clueCell = grid[clueR][clueC];
      if (clueCell) {
        if (clueCell.type !== 'clue') return null;
        if (clueCell.clues.some((c) => c.dir === dir)) return null;
        if (clueCell.clues.length >= 2) return null;
      }

      // In arrow crossword (çengel bulmaca), a clue box must NEVER have a letter cell to its left or above it
      if (clueC > 0 && grid[clueR][clueC - 1]?.type === 'letter') return null;
      if (clueR > 0 && grid[clueR - 1][clueC]?.type === 'letter') return null;

      // Cell after word must not be a letter
      const afterR = dir === 'across' ? startR : endR + 1;
      const afterC = dir === 'across' ? endC + 1 : startC;
      if (afterR < GRID_SIZE && afterC < GRID_SIZE) {
        const afterCell = grid[afterR][afterC];
        if (afterCell && afterCell.type === 'letter') return null;
      }

      let intersections = 0;

      for (let i = 0; i < len; i++) {
        const r = dir === 'across' ? startR : startR + i;
        const c = dir === 'across' ? startC + i : startC;
        const cell = grid[r][c];

        // Never place a letter cell directly to the left or above an existing clue cell
        if (c < GRID_SIZE - 1 && grid[r][c + 1]?.type === 'clue') return null;
        if (r < GRID_SIZE - 1 && grid[r + 1][c]?.type === 'clue') return null;

        if (cell) {
          if (cell.type === 'clue') return null;
          if (cell.type === 'letter') {
            if (cell.char !== upperPt[i]) return null;
            intersections++;
          }
        } else {
          // Avoid accidental parallel touching letters
          if (dir === 'across') {
            if (r > 0 && grid[r - 1][c]?.type === 'letter') return null;
            if (r < GRID_SIZE - 1 && grid[r + 1][c]?.type === 'letter') return null;
          } else {
            if (c > 0 && grid[r][c - 1]?.type === 'letter') return null;
            if (c < GRID_SIZE - 1 && grid[r][c + 1]?.type === 'letter') return null;
          }
        }
      }

      return { clueR, clueC, intersections };
    }

    function placeWord(
      word: Word,
      startR: number,
      startC: number,
      dir: 'across' | 'down',
      clueR: number,
      clueC: number
    ) {
      const upperPt = word.pt.toUpperCase();
      let clueCell = grid[clueR][clueC];
      if (!clueCell || clueCell.type !== 'clue') {
        clueCell = { type: 'clue', clues: [] };
        grid[clueR][clueC] = clueCell;
      }
      clueCell.clues.push({ wordId: upperPt, dir, word });

      const cells: [number, number][] = [];
      for (let i = 0; i < upperPt.length; i++) {
        const r = dir === 'across' ? startR : startR + i;
        const c = dir === 'across' ? startC + i : startC;
        let cell = grid[r][c];
        if (!cell || cell.type !== 'letter') {
          cell = { type: 'letter', char: upperPt[i], wordIds: [] };
          grid[r][c] = cell;
        }
        cell.wordIds.push(upperPt);
        cells.push([r, c]);
      }

      placedWords.push({ word, dir, startR, startC, clueR, clueC, cells });
    }

    // Always start with an ACROSS word near the top-center so words flow downwards and across
    const firstWord = words.find((w) => w.pt.length >= 5 && w.pt.length <= 7) || words[0];
    const centerR = 10;
    const centerC = 10;
    const check1 = canPlace(firstWord, centerR, centerC, 'across');
    if (!check1) continue;
    placeWord(firstWord, centerR, centerC, 'across', check1.clueR, check1.clueC);

    const remainingWords = words.filter((w) => w.pt !== firstWord.pt);

    // Iteratively place intersecting words
    for (const cand of remainingWords) {
      if (placedWords.length >= targetWordCount) break;

      const candUpper = cand.pt.toUpperCase();
      const possiblePlacements: {
        word: Word;
        dir: 'across' | 'down';
        startR: number;
        startC: number;
        clueR: number;
        clueC: number;
        intersections: number;
        score: number;
      }[] = [];

      // Current bounding box
      const curMinR = Math.min(...placedWords.map((x) => Math.min(x.clueR, x.cells[0][0])));
      const curMaxR = Math.max(...placedWords.map((x) => Math.max(x.clueR, x.cells[x.cells.length - 1][0])));
      const curMinC = Math.min(...placedWords.map((x) => Math.min(x.clueC, x.cells[0][1])));
      const curMaxC = Math.max(...placedWords.map((x) => Math.max(x.clueC, x.cells[x.cells.length - 1][1])));
      const curArea = (curMaxR - curMinR + 1) * (curMaxC - curMinC + 1);

      for (const placed of placedWords) {
        const targetDir: 'across' | 'down' = placed.dir === 'across' ? 'down' : 'across';
        const placedUpper = placed.word.pt.toUpperCase();

        for (let pIdx = 0; pIdx < placedUpper.length; pIdx++) {
          const char = placedUpper[pIdx];

          for (let cIdx = 0; cIdx < candUpper.length; cIdx++) {
            if (candUpper[cIdx] === char) {
              const [pRow, pCol] = placed.cells[pIdx];
              const candStartR = targetDir === 'across' ? pRow : pRow - cIdx;
              const candStartC = targetDir === 'across' ? pCol - cIdx : pCol;

              const res = canPlace(cand, candStartR, candStartC, targetDir);
              if (res && res.intersections >= 1) {
                const newMinR = Math.min(curMinR, res.clueR, candStartR);
                const newMaxR = Math.max(
                  curMaxR,
                  res.clueR,
                  targetDir === 'down' ? candStartR + candUpper.length - 1 : candStartR
                );
                const newMinC = Math.min(curMinC, res.clueC, candStartC);
                const newMaxC = Math.max(
                  curMaxC,
                  res.clueC,
                  targetDir === 'across' ? candStartC + candUpper.length - 1 : candStartC
                );

                const newWidth = newMaxC - newMinC + 1;
                const newHeight = newMaxR - newMinR + 1;

                // Restrict maximum width so mobile displays don't get tiny/squished cells
                if (newWidth <= 10 && newHeight <= 13) {
                  const newArea = newWidth * newHeight;
                  const boxGrowth = newArea - curArea;

                  // After 9 base words, only add 2-3 bonus words if they fit into available space with minimal box expansion
                  if (placedWords.length >= 9 && boxGrowth > 10) continue;

                  // Penalty if protruding upwards without horizontal companion
                  const upwardStretch = curMinR - newMinR;
                  const upwardPenalty = upwardStretch > 0 ? upwardStretch * 18 : 0;

                  // Bonus for filling upper rows so top area stays dense and balanced
                  const upperRowBonus = candStartR <= curMinR + 2 ? 20 : 0;

                  // Bonus for intersection and compact placement
                  const score = res.intersections * 30 + upperRowBonus - boxGrowth * 2 - upwardPenalty;

                  possiblePlacements.push({
                    word: cand,
                    dir: targetDir,
                    startR: candStartR,
                    startC: candStartC,
                    clueR: res.clueR,
                    clueC: res.clueC,
                    intersections: res.intersections,
                    score,
                  });
                }
              }
            }
          }
        }
      }

      if (possiblePlacements.length > 0) {
        possiblePlacements.sort((a, b) => b.score - a.score);
        const chosen = possiblePlacements[0];
        placeWord(chosen.word, chosen.startR, chosen.startC, chosen.dir, chosen.clueR, chosen.clueC);
      }
    }

    if (placedWords.length >= Math.min(5, validWords.length)) {
      let minR = GRID_SIZE,
        maxR = 0,
        minC = GRID_SIZE,
        maxC = 0;
      let activeCellCount = 0;

      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (grid[r][c]) {
            activeCellCount++;
            if (r < minR) minR = r;
            if (r > maxR) maxR = r;
            if (c < minC) minC = c;
            if (c > maxC) maxC = c;
          }
        }
      }

      const width = maxC - minC + 1;
      const height = maxR - minR + 1;
      const area = width * height;
      const density = activeCellCount / area;

      // Count filled cells in the top row and top 3 rows
      let row0Filled = 0;
      for (let c = minC; c <= maxC; c++) {
        if (grid[minR][c]) row0Filled++;
      }

      let topRowCells = 0;
      const topRowsLimit = Math.min(maxR + 1, minR + 3);
      for (let r = minR; r < topRowsLimit; r++) {
        for (let c = minC; c <= maxC; c++) {
          if (grid[r][c]) topRowCells++;
        }
      }
      const topFill = topRowCells / (width * (topRowsLimit - minR));

      // Quality evaluation
      if (width <= 10 && height <= 13) {
        const qualityScore =
          placedWords.length * 35 +
          density * 220 +
          topFill * 120 +
          (row0Filled >= 2 ? 40 : 0) -
          (width + height) * 2;

        const candidate: GeneratedCandidate = {
          placedWords,
          grid,
          minR,
          maxR,
          minC,
          maxC,
          width,
          height,
          qualityScore,
        };

        if (!fallbackCandidate || qualityScore > fallbackCandidate.qualityScore) {
          fallbackCandidate = candidate;
        }

        // Require decent top-row fill so upper side never looks empty
        if (topFill >= 0.28 && row0Filled >= 2) {
          if (!bestCandidate || qualityScore > bestCandidate.qualityScore) {
            bestCandidate = candidate;
          }
        }
      }
    }
  }

  const selected = bestCandidate || fallbackCandidate;
  if (!selected) return null;

  const { placedWords, grid, minR, maxR, minC, maxC, width, height } = selected;

  // Build the normalized cropped grid (0..height-1, 0..width-1)
  const croppedGrid: GridCell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ type: 'block' }))
  );

  const wordMap: Record<string, PlacedWord> = {};
  const wordList: PlacedWord[] = [];

  for (const pw of placedWords) {
    const wordKey = pw.word.pt.toUpperCase();
    const croppedCells: [number, number][] = pw.cells.map(([r, c]) => [r - minR, c - minC]);
    const croppedWord: PlacedWord = {
      id: wordKey,
      word: pw.word,
      dir: pw.dir,
      cells: croppedCells,
      clueR: pw.clueR - minR,
      clueC: pw.clueC - minC,
    };
    wordMap[wordKey] = croppedWord;
    wordList.push(croppedWord);
  }

  for (let r = minR; r <= maxR; r++) {
    for (let c = minC; c <= maxC; c++) {
      const orig = grid[r][c];
      const cr = r - minR;
      const cc = c - minC;

      if (!orig) {
        croppedGrid[cr][cc] = { type: 'block' };
      } else if (orig.type === 'clue') {
        if (orig.clues.length === 1) {
          const cl = orig.clues[0];
          croppedGrid[cr][cc] = {
            type: 'clue',
            clueType: 'single',
            clue: {
              wordId: cl.wordId,
              dir: cl.dir,
              arrow: cl.dir === 'across' ? 'right' : 'down',
              word: cl.word,
            },
          };
        } else {
          // Split clue
          const acrossClue = orig.clues.find((c) => c.dir === 'across') || orig.clues[0];
          const downClue = orig.clues.find((c) => c.dir === 'down') || orig.clues[1];
          croppedGrid[cr][cc] = {
            type: 'clue',
            clueType: 'split',
            topClue: {
              wordId: acrossClue.wordId,
              dir: acrossClue.dir,
              arrow: 'right',
              word: acrossClue.word,
            },
            bottomClue: {
              wordId: downClue.wordId,
              dir: downClue.dir,
              arrow: 'down',
              word: downClue.word,
            },
          };
        }
      } else if (orig.type === 'letter') {
        const startArrows: ('right' | 'down')[] = [];
        for (const wId of orig.wordIds) {
          const pw = wordMap[wId];
          if (pw && pw.cells[0][0] === cr && pw.cells[0][1] === cc) {
            startArrows.push(pw.dir === 'across' ? 'right' : 'down');
          }
        }

        croppedGrid[cr][cc] = {
          type: 'letter',
          solution: orig.char,
          wordIds: orig.wordIds,
          startArrows,
        };
      }
    }
  }

  return {
    width,
    height,
    grid: croppedGrid,
    words: wordMap,
    wordList,
  };
}
