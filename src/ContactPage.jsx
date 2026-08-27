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
    <>
      <h2>get in touch!</h2>

      <img
        src="images/subset/cupcake.png"
        alt="little cupcake girl cutie"
        className="right-image shake-on-hover"
      />

      <a 
      className="body" href="https://www.linkedin.com/in/hirna-derege-399977227/" 
      target="_blank" 
      rel="noreferrer"
      >
        linkedin
      </a>

      <a 
      className="body" 
      href="https://www.github.com/hirnaderege" 
      target="_blank" 
      rel="noreferrer"
      >
        github
      </a>

      <div 
        className="dodge-wrapper"
        onMouseMove={dodge}
      >

        <p className="dodge-hint">
          {clicked ? "got me! ✨" : "try to click me >ᴗ<"}
        </p>
        <a
          ref={btnRef}
          className="dodge-btn"
          href="mailto:hirnadereg@gmail.com"
          target="_blank"
          rel="noreferrer"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          onClick={(e) => {
            if (!clicked) {
              e.stopPropagation();
              setClicked(true);
              setPos({ x: 0, y: 0 });
            }
          }}
        >
          email me
        </a>
      </div>

    </>
  );
}