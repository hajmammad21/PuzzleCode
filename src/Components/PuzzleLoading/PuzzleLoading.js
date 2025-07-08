import React from 'react';
import './PuzzleLoading.css';

export default function PuzzleLoading({ text = "" }) {
  return (
    <div className="puzzle-loading-container">
      <div className="puzzle-loading-bg">
        {[...Array(6)].map((_, i) => (
          <div className={`puzzle-piece puzzle-piece-${i + 1}`} key={i} />
        ))}
        <div className="puzzle-loading-text">{text}</div>
      </div>
    </div>
  );
}