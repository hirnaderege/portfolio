import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "GPU ALLOCATOR\n+ VISUALIZER",
    image: "images/subset/_ (1).jpeg",
    description: "Lock-free slab allocator for concurrent GPU workloads — no mutex, O(1) alloc/free. Comes with a live trace visualizer built from the allocator's own execution logs.",
    stack: ["C++ / CUDA", "Canvas API", "Python"],
    visitHref: "/portfolio/#/visualizer",
    visitNewTab: false,
    repoHref: "https://github.com/hirnaderege/research",
    caseStudy: {
      problem: "GPU threads all need memory at once. a global lock makes them wait in line — wasting the parallelism you paid for.",
      built: "Atomic CAS operations, no mutex. Every alloc, free, and retry event gets logged to a trace file, then replayed in a custom browser visualizer so you can see contention happening in real time.",
      learned: "Why lock-free doesn't mean wait-free. How to read contention patterns in an execution trace. 4,096 threads fighting over memory looks exactly as chaotic as it sounds.",
    }
  },
  {
    id: 2,
    title: "ANTHILL",
    image: "images/subset/036fb4a6-660a-46ea-be7e-e0b9f9b8fc79.jpeg",
    description: "GPS app that finds the flattest route between two points and shows you the elevation profile before you commit. Walk, bike, or drive.",
    stack: ["React Native", "TypeScript", "Expo"],
    visitHref: "https://hirnaderege.github.io/anthill/",
    repoHref: "https://github.com/hirnaderege/anthill",
    caseStudy: {
      problem: "Most navigation apps optimize for speed, not effort. If you're walking or biking, getting routed up a steep hill isn't efficient — it's just annoying.",
      built: "A React Native app (iOS + Android) that pulls up to 3 alternative routes from OpenRouteService, sorts them by elevation gain, and shows an SVG elevation profile chart before you commit. Includes in-app GPS navigation with auto-advancing turn instructions.",
      learned: "How to wrangle async state without stale closures, the Haversine formula for real GPS distance, and why platform-specific file splits (.native.tsx / .web.tsx) exist.",
    }
  },
  {
    id: 3,
    title: "LEETCODE",
    image: "images/subset/54e20151-db2d-43b1-b7b0-7a167ea548e9.jpeg",
    description: "Solutions organized by topic and difficulty. Written to be understood, not just to pass.",
    stack: ["Python", "Java"],
    repoHref: "https://github.com/hirnaderege/myLeetcode",
  }
];


export default function ProjectsPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="projects-page">
      <div className="projects-header">
        <span className="projects-eyebrow"> my projects </span>
      </div>

      { projects.map((p) => (
        <div key={p.id} className="project-row">
          <div
            className="project-main"
            onClick={() => p.caseStudy && setExpanded(expanded === p.id ? null : p.id)}
            style={{ cursor: p.caseStudy ? 'pointer' : 'default' }}
          >
            <div className="project-left">
              <div className="project-watermark">0{p.id}</div>
              <div className="project-number"> 0{p.id} </div>
              <h2 className="project-title">
                {p.title.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </h2>
              <p className="project-description">{p.description}</p>
              <div className="project-stack">
                {p.stack.map((tag) => (
                  <span key={tag} className="stack-tag">{tag}</span>
                ))}
              </div>
              {p.caseStudy && (
                <span className="case-toggle">
                  {expanded === p.id ? 'close ↑' : 'case study ↓'}
                </span>
              )}
            </div>

            <div className="project-links" onClick={(e) => e.stopPropagation()}>
              {p.visitHref && (

                <a
                  href={p.visitHref}
                  target={p.visitNewTab === false ? "_self" : "_blank"}
                  rel="noreferrer"
                  className="project-link-primary"
                >
                  visit →
                </a>
              )}
              {p.repoHref && (
                <a
                  href={p.repoHref}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link-secondary"
                >
                  repo →
                </a>
              )}
            </div>
          </div>

          {p.caseStudy && expanded === p.id && (
            <div className="case-study-panel">
              <div className="case-study-grid">
                <div className="case-item">
                  <div className="case-label">the problem</div>
                  <p className="case-text">{p.caseStudy.problem}</p>
                </div>
                <div className="case-item">
                  <div className="case-label">what i built</div>
                  <p className="case-text">{p.caseStudy.built}</p>
                </div>
                <div className="case-item">
                  <div className="case-label">what i learned</div>
                  <p className="case-text">{p.caseStudy.learned}</p>
                </div>
              </div>
            </div>
          )}
          </div>
      ))}
    </div>
  );
}