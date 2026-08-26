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

        if (message === "want to work together") {
            onHighlight('/contact');
        } else if (message === "i love making cool things...") {
            onHighlight('/projects')
        } 

        setMessageInd((prev) => (prev + 1) % message.length);
    } // end of startTyping

    return (
        <>
        <header> welcome to my portfolio </header>
        <div className="layered-profile" onClick={startTyping}>
            <img src="images/subset/mememe.jpeg" alt="Profile" className="profile-overlay" />
        </div>

        <h1 id="my-text">{displayedText}</h1>

        <section>
            <p>hi! i am a computer science student at Seattle University</p>
            <p>and am hoping to find work in healthcare technology but am open to anything!</p>
            <p>feel free to look around and poke things &lt;3</p>

            <a
            href="resume.pdf"
            download="HirnaDerege_Resume.pdf"
            className="resume-btn"
            >
            download resume ↓
            </a>

            <section className="skills-section">
                <h2 className="skills-title">things i know ( ˶ˆᗜˆ˵ )</h2>
                <div className="skills-grid">
                    {[
                    { name: "React", emoji: "⚛️" },
                    { name: "C++", emoji: "⚙️" },
                    { name: "CUDA", emoji: "🖥️" },
                    { name: "Python", emoji: "🐍" },
                    { name: "TypeScript", emoji: "📘" },
                    { name: "React Native", emoji: "📱" },
                    { name: "Node.js", emoji: "🟢" },
                    { name: "Git", emoji: "🌿" },
                    { name: "Java", emoji: "☕" },
                    { name: "SQL", emoji: "🗄️" },
                    ].map((skill) => (
                    <div key={skill.name} className="skill-chip">
                        <span className="skill-emoji">{skill.emoji}</span>
                        <span>{skill.name}</span>
                    </div>
                    ))}
                </div>
            </section>

        </section>




        </>
    )
}