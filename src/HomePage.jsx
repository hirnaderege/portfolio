import { useState } from "react";

const messages = [
    "hello!!",
    "i'm hirna derege",
    "i love making cool things...",
    "thank you for visiting my portfolio!!",
    "want to work together?"
];

export default function HomePage({ onHighlight }) {
    const [messageInd, setMessageInd] = useState(0);
    const [displayedText, setDisplayedText] = useState('');

    function startTyping() {
        const message = messages[messageInd];
        let i = 0;
        let built = '';
        setDisplayedText('');

        function type() {
            if (i < message.length){
                built += message.charAt(i);
                setDisplayedText(built);
                i++;
                setTimeout(type, 120);
            }
        } // end of type
        type();

        if (message === "want to work together?") {
            onHighlight('/contact');
        } else if (message === "i love making cool things...") {
            onHighlight('/projects')
        } 

        setMessageInd((prev) => (prev + 1) % messages.length);
    } // end of startTyping

    return (
        <>
        <div className="hero-block">
            <div className="hero-left">
                <p className="hero-eyebrow"> portfolio - 2026 </p>
                <h1 className="hero-name" onClick={startTyping}>
                    hirna<br />derege
                </h1>
            </div>
            <div className="hero-right">
                <p className="hero-sub" >cs student · seattle university · open to work</p>
            </div>
            <hr className="hero-rule" />
            <p className="hero-intro-text">
                hi! i'm a computer science student (last year!) at Seattle University,
                hoping to find work in healthcare technology — but open to anything.
                feel free to look around and poke things &lt;3
            </p>
            <a 
                href="/portfolio/Hirna%20Derege%20-%20resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="resume-btn"
            >
                view resume ↗
            </a>
        </div>

        <h2 id="my-text" className="typing-text">{displayedText}</h2>
        </>
    )
}