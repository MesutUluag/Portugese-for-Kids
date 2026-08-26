import React from 'react';
import { useWikiImage } from '../utils/useWikiImage';
import { emojiToSearchTerm } from './sceneTheme';

interface Props {
  emoji: string;
  className: string;
  size: number;
}

export default function SceneProp({ emoji, className, size }: Props): React.ReactElement {
  const term = emojiToSearchTerm[emoji] ?? '';
  const imgUrl = useWikiImage(term);

  if (imgUrl) {
    return (
      <img
        src={imgUrl}
        alt={term}
        className={className}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: 10,
          display: 'block',
        }}
      />
    );
  }

  return <span className={className}>{emoji}</span>;
}
