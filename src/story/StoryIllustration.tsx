import React from 'react';
import { StoryPage } from '../data/words';

interface Props {
  page: StoryPage;
  pageKey?: number;
  sceneVars: React.CSSProperties;
  /** Pre-fetched blob URL from the prefetch cache. Undefined = still loading. */
  prefetchedImageUrl?: string;
}

export default function StoryIllustration({ page, pageKey, sceneVars, prefetchedImageUrl }: Props): React.ReactElement {
  // Image comes exclusively from the prefetch cache — no in-component fetch.
  // The emoji placeholder is shown until the cache entry arrives via state update.
  const imgResult = prefetchedImageUrl ?? 'loading';

  const photoActive = imgResult !== 'loading' && imgResult !== 'blocked';

  return (
    <div
      className={`story-illustration story-illustration--transition${photoActive ? ' story-illustration--photo' : ''}`}
      style={{
        ...sceneVars,
        ...(photoActive ? {
          backgroundImage: `url(${imgResult})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        } : {}),
      }}
    >
      {/* Overlay for readability over photo */}
      {photoActive && <div className="story-photo-overlay" />}

      {/* CSS scene shown while AI photo hasn't loaded yet */}
      {!photoActive && <>
        <span className="story-cloud" style={{ top: '12px', left: '-40px' }} />
        <span className="story-cloud c2" style={{ left: '-30px' }} />
        <span className="story-sun" />
        <span className="story-grass">🌿🌱🌿🌱🌿🌱🌿</span>
        <span className="story-bg-left">{page.bgLeft}</span>
        <span className="story-bg-right">{page.bgRight}</span>
      </>}

      {/* Character emoji while AI photo hasn't loaded */}
      {!photoActive && (
        <span key={`main-${pageKey}`} className="story-main-emoji story-main-emoji--enter">
          {page.mainEmoji}
        </span>
      )}
    </div>
  );
}
