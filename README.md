# hirnaDerege.com 🍮

> my corner of the internet — built from scratch, deployed live

a personal portfolio site i built and maintain myself. started as plain HTML/CSS, migrated to React + Vite, then redesigned into a cleaner editorial layout. deployed on GitHub Pages.

**[→ visit the site](https://hirnaderege.github.io/portfolio/)**

---

## what's on it

- **home** — typing effect, profile photo, intro, a resume download button, and a "things i know" skills section
- **projects** — an editorial list of my work: numbered rows, tech stack tags, thumbnails, visit + repo links, and a case study you can expand under each project
- **contact** — linkedin, github, and an "email me" button that runs away from your cursor (catch it if you can ( ͡° ͜ʖ ͡°))
- **GPU allocator visualizer** — embedded directly in the site, no new tab needed
- **footer + ticker** — shared across every page
- **page transitions** — each page fades and slides in when you navigate

---

## featured projects

- **GPU allocator + visualizer** — lock-free slab allocator for concurrent GPU workloads, with a browser visualizer that replays its execution traces
- **anthill** — a React Native GPS app that finds the flattest route and shows the elevation profile before you go

---

## the stack

| piece | what it is |
|---|---|
| React + Vite | component-based UI, fast dev/build tooling |
| React Router (HashRouter) | client-side routing, GitHub Pages compatible |
| lifted state + props | shared state across pages (nav highlight effect) |
| plain CSS + custom properties | design tokens, transitions, no CSS framework |
| GitHub Pages + gh-pages | free hosting, deploys straight from `dist/` |

---

## notable things

**the projects page** is data-driven. each project is an object in one array (title, description, stack, links, and a `caseStudy` with *the problem / what i built / what i learned*). the page maps over it, so adding a project means adding one object. clicking a row toggles its case study open with a single `expanded` state.

**the dodging email button** measures its own position with `getBoundingClientRect()`, finds the direction from your cursor to its center, normalizes that vector, and pushes itself away with a CSS `transform`. the mouse tracking lives on a wrapper div rather than the button. once the button moved, the cursor was no longer over it, so it would stop dodging.

**the page transitions** started out using framer-motion, which broke the site because of a Content Security Policy error. i replaced it with a tiny `PageWrapper` component that flips a class after mount, and CSS handles the fade and slide. no dependency, same effect.

**the typing effect** taught me about React's state-timing gotchas. `setTimeout` callbacks can read stale state if you're not careful. the fix was building the string in a plain local variable instead of relying on `setState` + `prev`.

**the nav highlight** uses lifted state. `HomePage` calls a function prop when a relevant message appears, and `App.jsx` owns the state and highlights the right nav link. two components coordinate without either one knowing the other's internals.

**the visualizer** is plain HTML/JS embedded in an iframe inside a React route. it's the cleanest way to include a non-React page without rebuilding it from scratch.

---

## running locally

```bash
git clone https://github.com/hirnaderege/portfolio
cd portfolio
npm install
npm run dev
```

opens at `http://localhost:5173/portfolio/`

---

## deploying

```bash
npm run deploy
```

that's it. `predeploy` runs `npm run build` automatically, then `gh-pages` pushes `dist/` to the `gh-pages` branch and GitHub Pages serves it.

---

## structure

```
src/
  App.jsx             shared layout: routing, nav, footer, ticker
  PageWrapper.jsx     fade/slide transition around each page
  HomePage.jsx        intro, typing effect, resume button, skills
  ProjectsPage.jsx    editorial project list + expandable case studies
  ContactPage.jsx     links + dodging email button
  VisualizerPage.jsx  iframe embed for the GPU visualizer
  Footer.jsx          name, links, year
  index.css           global styles + design tokens
public/
  images/             photos + project images
  visualizer/         standalone GPU trace visualizer
  resume.pdf          downloadable resume
```

---

built by hirna derege, seattle university CS '26 ✨
