import React from 'react';
import { StoryPage } from '../data/words';
import { SceneTheme } from '../utils/sceneTheme';
import { usePollinationsImage } from '../utils/usePollinationsImage';

interface Props {
  page: StoryPage;
  theme: SceneTheme;
  pageKey: number;
  sceneVars: React.CSSProperties;
}

function buildPrompt(page: StoryPage): string {
  const scene = page.en.replace(/[.,!?]/g, '').trim();
  return `${scene}, colorful cute kids illustration, storybook art, bright colors, simple background`;
}

export default function StoryIllustration({ page, pageKey, sceneVars }: Props): React.ReactElement {
  const prompt = buildPrompt(page);
  const pollUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=780&height=360&nologo=true&seed=${pageKey}`;
  const imgResult = usePollinationsImage(pollUrl);

  const photoActive = imgResult !== 'loading' && imgResult !== 'blocked';
  const hasPhoto = photoActive;

  return (
    <div
      className={`story-illustration story-illustration--transition${hasPhoto ? ' story-illustration--photo' : ''}`}
      style={{
        ...sceneVars,
        ...(hasPhoto ? {
          backgroundImage: `url(${imgResult})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        } : {}),
      }}
    >
      {/* Overlay for readability over photo */}
      {hasPhoto && <div className="story-photo-overlay" />}

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
