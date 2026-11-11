import React, { useEffect, useRef, useState } from 'react';
import '../styles/GameScoreBadge.scss';

interface Props {
  score?: number;
  recentGain?: number | null;
  gainKey?: number;
}

export default function GameScoreBadge({
  score = 0,
  recentGain = null,
  gainKey,
}: Props): React.ReactElement {
  const [internalGain, setInternalGain] = useState<{ id: number; pts: number } | null>(null);
  const internalIdRef = useRef<number>(0);
  const prevKeyRef = useRef<number | undefined>(undefined);
  const prevGainRef = useRef<number | null>(null);

  useEffect(() => {
    // If gainKey is explicitly provided, only trigger on key increment
    if (gainKey !== undefined) {
      if (recentGain !== null && recentGain > 0 && gainKey !== prevKeyRef.current) {
        prevKeyRef.current = gainKey;
        setInternalGain({ id: gainKey, pts: recentGain });
      } else if (recentGain === null) {
        setInternalGain(null);
        prevKeyRef.current = undefined;
      }
    } else {
      // Fallback when gainKey is omitted: only trigger on transition from null/new score
      if (recentGain !== null && recentGain > 0 && recentGain !== prevGainRef.current) {
        internalIdRef.current += 1;
        prevGainRef.current = recentGain;
        setInternalGain({ id: internalIdRef.current, pts: recentGain });
      } else if (recentGain === null) {
        setInternalGain(null);
        prevGainRef.current = null;
      }
    }
  }, [recentGain, gainKey]);

  return (
    <div className="game-top-score-badge" aria-label={`Game Score: ${score}`}>
      <span className="game-score-star" aria-hidden="true">⭐</span>
      <span className="game-score-val">{score}</span>
      {internalGain !== null && (
        <span
          key={internalGain.id}
          className="game-score-float-gain"
          aria-hidden="true"
        >
          +{internalGain.pts}
        </span>
      )}
    </div>
  );
}
