import { useState } from 'react';

export default function FlipCard({ image, alt, text, href, newTab = true, repoHref }) {
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
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '10px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="flip-text">{text}</p>
          <a
            href={href}
            target={newTab ? "_blank" : "_self"}
            rel={newTab ? "noreferrer" : ""}
            className="flip-btn"
          >
            visit →
          </a>

          {repoHref && (
            <a
              href={repoHref}
              target="_blank"
              rel="noreferrer"
              className="flip-btn flip-btn-secondary"
            >
              visit repo →
            </a>
          )}

        </div>
      </div>
    </div>
  );
}