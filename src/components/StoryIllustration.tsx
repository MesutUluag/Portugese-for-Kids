import React, { useState } from 'react';
import { StoryPage } from '../data/words';
import { SceneTheme } from '../utils/sceneTheme';

interface Props {
  page: StoryPage;
  theme: SceneTheme;
  pageKey: number;
  sceneVars: React.CSSProperties;
}

function buildPrompt(page: StoryPage): string {
  // Strip punctuation, add a consistent kids-illustration style suffix
  const scene = page.en.replace(/[.,!?]/g, '').trim();
  return `${scene}, colorful cute kids illustration, storybook art, bright colors, simple background`;
}

export default function StoryIllustration({ page, pageKey, sceneVars }: Props): React.ReactElement {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const prompt = buildPrompt(page);
  const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=480&height=240&nologo=true&seed=${pageKey}`;

  const photoActive = loaded && !errored;

  return (
    <div
      className={`story-illustration story-illustration--transition${photoActive ? ' story-illustration--photo' : ''}`}
      style={{
        ...sceneVars,
        ...(photoActive ? {
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        } : {}),
      }}
    >
      {/* Preload the image silently; once loaded flip background */}
      <img
        key={imgUrl}
        src={imgUrl}
        alt=""
        style={{ display: 'none' }}
        onLoad={() => { setLoaded(true); setErrored(false); }}
        onError={() => setErrored(true)}
      />

      {/* Dark gradient overlay on photo for readability */}
      {photoActive && <div className="story-photo-overlay" />}

      {/* CSS fallback elements shown while loading or on error */}
      {!photoActive && <>
        <span className="story-cloud" style={{ top: '12px', left: '-40px' }} />
        <span className="story-cloud c2" style={{ left: '-30px' }} />
        <span className="story-sun" />
        <span className="story-grass">🌿🌱🌿🌱🌿🌱🌿</span>
        <span className="story-bg-left">{page.bgLeft}</span>
        <span className="story-bg-right">{page.bgRight}</span>
      </>}

      {/* Main character only shown when no photo (CSS scene fallback) */}
      {!photoActive && (
        <span key={`main-${pageKey}`} className="story-main-emoji story-main-emoji--enter">
          {page.mainEmoji}
        </span>
      )}
    </div>
  );
}
