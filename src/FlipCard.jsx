import { useState } from 'react';

export default function flipCard({ image, alt, text, href }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-front">
        <img src={image} alt={alt} className="smiski-pic" />
      </div>
      <div className="flip-card-back">
        <a className="flip-text" href={href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
          {text}
        </a>
      </div>
    </div>
  );
}