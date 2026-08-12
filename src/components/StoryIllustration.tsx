import React, { useState } from 'react';
import { StoryPage } from '../data/words';
import { SceneTheme } from '../utils/sceneTheme';

interface Props {
  page: StoryPage;
  theme: SceneTheme;
  pageKey: number;
  sceneVars: React.CSSProperties;
  lastPhotoUrl: string | null;
  onPhotoLoaded: (url: string) => void;
}

function buildPrompt(page: StoryPage): string {
  const scene = page.en.replace(/[.,!?]/g, '').trim();
  return `${scene}, colorful cute kids illustration, storybook art, bright colors, simple background`;
}

export default function StoryIllustration({ page, pageKey, sceneVars, lastPhotoUrl, onPhotoLoaded }: Props): React.ReactElement {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const prompt = buildPrompt(page);
  const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=480&height=240&nologo=true&seed=${pageKey}`;

  // Current photo ready, or fall back to last known good photo while loading
  const photoActive = loaded && !errored;
  const displayUrl = photoActive ? imgUrl : lastPhotoUrl;
  const hasPhoto = !!displayUrl;

  return (
    <div
      className={`story-illustration story-illustration--transition${hasPhoto ? ' story-illustration--photo' : ''}`}
      style={{
        ...sceneVars,
        ...(hasPhoto ? {
          backgroundImage: `url(${displayUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        } : {}),
      }}
    >
      {/* Silently preload the new image */}
      <img
        key={imgUrl}
        src={imgUrl}
        alt=""
        style={{ display: 'none' }}
        onLoad={() => { setLoaded(true); setErrored(false); onPhotoLoaded(imgUrl); }}
        onError={() => setErrored(true)}
      />

      {/* Overlay for readability over photo */}
      {hasPhoto && <div className="story-photo-overlay" />}

      {/* CSS scene shown only when no photo at all (very first load) */}
      {!hasPhoto && <>
        <span className="story-cloud" style={{ top: '12px', left: '-40px' }} />
        <span className="story-cloud c2" style={{ left: '-30px' }} />
        <span className="story-sun" />
        <span className="story-grass">🌿🌱🌿🌱🌿🌱🌿</span>
        <span className="story-bg-left">{page.bgLeft}</span>
        <span className="story-bg-right">{page.bgRight}</span>
      </>}

      {/* Character emoji only when no photo */}
      {!hasPhoto && (
        <span key={`main-${pageKey}`} className="story-main-emoji story-main-emoji--enter">
          {page.mainEmoji}
        </span>
      )}
    </div>
  );
}
