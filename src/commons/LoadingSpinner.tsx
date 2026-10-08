import React from 'react';

export default function LoadingSpinner(): React.ReactElement {
  return (
    <div className="loading" role="status" aria-label="Loading">
      <div className="loading__dots">
        <span className="loading__dot" />
        <span className="loading__dot" />
        <span className="loading__dot" />
      </div>
      <p className="loading__text">Loading…</p>
    </div>
  );
}
