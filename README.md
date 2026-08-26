# hirnaDerege.com 🍮
 
> my corner of the internet — built from scratch, deployed live
 
a personal portfolio site i built and maintain myself. started as plain HTML/CSS, migrated to React + Vite, deployed on GitHub Pages.
 
**[→ visit the site](https://hirnaderege.github.io/portfolio/)**
 
---
 
## what's on it
 
- **home** — typing effect, profile photo, intro
- **projects** — flip cards for each project with visit + repo links
- **contact** — linkedin, github, a photo that shakes when you hover it
- **GPU allocator visualizer** — embedded directly in the site, no new tab needed
---
 
## the stack
 
| piece | what it is |
|---|---|
| React + Vite | component-based UI, fast dev/build tooling |
| React Router (HashRouter) | client-side routing, GitHub Pages compatible |
| React Context | shared state across pages (nav highlight effect) |
| plain CSS + custom properties | design tokens, no CSS framework |
| GitHub Pages + gh-pages | free hosting, auto-deploy from `dist/` |
 
---
 
## notable things
 
**the flip cards** are a reusable `FlipCard` component — write the structure once, pass different data each time. fixing a bug or adding a feature updates all cards at once.
 
**the typing effect** taught me about React's state-timing gotchas — `setTimeout` callbacks can read stale state if you're not careful. the fix was building the string in a plain local variable instead of relying on `setState` + `prev`.
 
**the nav highlight** uses lifted state — `HomePage` calls a function prop when a relevant message appears, `App.jsx` owns the state and applies the highlight class to the right nav link. two components coordinating without either one knowing about the other's internals.
 
**the visualizer** is plain HTML/JS embedded in an iframe inside a React route — the cleanest way to include a non-React page without rebuilding it from scratch.
 
---
 
## running locally
 
```bash
git clone https://github.com/hirnaderege/portfolio
cd portfolio-react
npm install
npm run dev
```
 
opens at `http://localhost:5173`
 
---
 
## deploying
 
```bash
npm run build
npx gh-pages -d dist
```
 
that's it. `predeploy` runs the build automatically, `gh-pages` pushes `dist/` to the `gh-pages` branch, GitHub Pages serves it.
 
---
 
## structure
 
```
src/
  App.jsx           shared layout: routing, nav, ticker
  HomePage.jsx      home page + typing effect
  ProjectsPage.jsx  flip card grid
  ContactPage.jsx   links + shake photo
  VisualizerPage.jsx  iframe embed for the GPU visualizer
  FlipCard.jsx      reusable flip card component
  index.css         global styles + design tokens
public/
  images/           photos + project images
  visualizer/       standalone GPU trace visualizer
```
 
---
 
built by hirna derege, seattle university CS '26 ✨
 
