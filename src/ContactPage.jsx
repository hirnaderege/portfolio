import { useRef, useState } from "react";

export default function ContactPage() {
  const [pos, setPos] = useState({x: 0, y: 0});
  const [clicked, setClicked] = useState(false);
  const btnRef = useRef(null);

  function dodge(e) {
    if (clicked || !btnRef.current)
      return;

    const btn = btnRef.current.getBoundingClientRect();
    const centerX = btn.left + btn.width / 2;
    const centerY = btn.top + btn.height / 2;

    // move away!
    const dx = centerX - e.clientX;
    const dy = centerY - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    if (dist > 80)
      return;

    const moveX = (dx / dist) * 40;
    const moveY = (dy / dist) * 40;

    setPos(prev => ({
      x: Math.max(-80, Math.min(80, prev.x + moveX * 0.3)), 
      y: Math.max(-60, Math.min(60, prev.y + moveY * 0.3)),
    }));
  } // end of dodge

  function catchMe() {
    setClicked(true);
    setPos({x: 0, y: 0});
    window.location.href = "mailto:hirnadereg@gmail.com"
  } // end of catchMe

  return (
    <div className="contact-page">
      <div className="contact-header">
        <p className="contact-eyebrow">get in touch - 2026</p>
        <h1 className="contact-title">LET'S<br />TALK</h1>
        <hr className="hero-rule" />
      </div>

      <div className="contact-body">
        <div className="contact-links-block">
          
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/hirna-derege-399977227/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-link-label">linkedin</span>
            <span className="contact-link-arrow">→</span>
          </a>

          <a
            className="contact-link"
            href="https://www.github.com/hirnaderege"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-link-label">github</span>
            <span className="contact-link-arrow">→</span>
          </a>
        </div>

        <div className="contact-dodge-block">
          <p className="contact-dodge-label">
            {clicked ? 'got me! ✨ check your mail client' : 'try to click me >ᴗ<'}
          </p>
          <div className="dodge-wrapper" onMouseMove={dodge}>
            
            <a
              ref={btnRef}
              className="dodge-btn"
              href="mailto:hirnadereg@gmail.com"
              target="_blank"
              rel="noreferrer"
              style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
              onClick={() => { setClicked(true); setPos({ x: 0, y: 0 }); }}
            >
              email me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}