import React from 'react';
import { useWikiImage } from '../utils/useWikiImage.ts';

interface Props {
  en: string;
  emoji: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function WordImage({ en, emoji, size = 100, className, onClick }: Props): React.ReactElement {
  const imgUrl = useWikiImage(en);

  if (imgUrl) {
    return (
      <img
        src={imgUrl}
        alt={en}
        className={className}
        onClick={onClick}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: 12,
          cursor: onClick ? 'pointer' : 'default',
          display: 'block',
          margin: '8px auto',
        }}
      />
    );
  }

  return (
    <div
      className={className}
      onClick={onClick}
      style={{ fontSize: size * 0.6, lineHeight: 1, cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}
    >
      {emoji}
    </div>
  );
}
