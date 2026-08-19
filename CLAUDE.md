# CLAUDE.md — isabela-de-moraes

Reference for AI assistants working on this repository.

## Project overview

Personal portfolio SPA for Isabela Moraes, a Brazilian advertising and live marketing professional.

- **Live site:** https://isabela-de-moraes.netlify.app/
- **Language:** Portuguese (all UI content and code comments)

## Tech stack

| Tool | Version | Role |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool and dev server |
| Framer Motion | 12 | Scroll-driven transforms and sidebar animation |
| GSAP + ScrollTrigger | 3 | Element reveal animations on scroll |
| react-icons | 5 | Icon components |
| CSS (plain) | — | All styling, no preprocessor or utility framework |

## Dev commands

```bash
npm run dev      # local dev server (HMR)
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
npm run lint     # ESLint (flat config v9, targets *.{js,jsx})
```

> Note: the README mentions `npm start` — that script does not exist. Use `npm run dev`.

There are no tests and no test script.

## Architecture

The codebase is intentionally monolithic — do not split it into components unless explicitly asked.

```
src/
  main.jsx     # entry point — mounts <App /> in StrictMode, do not modify
  App.jsx      # entire application (~399 lines): all sections, state, refs, animations, data
  App.css      # all styles (~819 lines)
  index.css    # empty — leave empty
public/
  *.png/svg    # brand and project images
  isabela.svg  # personal portrait
  ISABELADEMORAES.pdf  # résumé (linked from contact section)
  video.mp4    # hero background video
```

`App.jsx` contains: state (`windowHeight`, `isMenuOpen`, `currentCard`), refs (`revealSection`, `titleRef`, `carouselRef`), inline data arrays (project cards), all JSX sections (video hero → bio → services → experience → education → projects carousel → contact), and all animation setup.

## Animation conventions

Two libraries coexist with distinct responsibilities — do not swap them:

- **Framer Motion** — scroll-driven `top`/`fontSize` transforms on the parallax title; `opacity` for the menu overlay; `AnimatePresence` + slide for the sidebar nav.
- **GSAP + ScrollTrigger** — reveal animations on `.exp` and `.educ` blocks (class toggling on scroll).

GSAP ScrollTrigger must be refreshed after media loads (e.g., the background video). See the `onLoadedMetadata` handler in `App.jsx`.

## CSS conventions

**Design tokens** (defined on `:root`):
```css
--red, --yellow, --blue   /* brand colours */
--title-font              /* League Spartan */
--body-font               /* Roboto */
```

**Class naming:** descriptive, section-scoped (`video-section`, `bio-section`, `exp-container`, `carousel-wrapper`).

**IDs** are used for one-off overrides on specific elements (`#exp1`, `#exp2`, `#nota`, `#sp`, `#isabela`).

**Responsive breakpoints** (all in `App.css`):
| Range | Target |
|---|---|
| 320px – 374px | Small phones |
| 768px – 1023px | Tablets |
| 1024px+ | Desktop |
| 1440px+ | Large desktop |

Google Fonts (League Spartan, Roboto) are loaded via `@import` in `index.html`, not from CSS.

## Data conventions

Project cards are a hardcoded array of objects inside `App.jsx`. When adding or editing projects, update that array directly — there is no separate data file.

## Assets

All static assets live in `public/`. Reference them from the root path:

```jsx
<img src="/isabela.svg" />
<video src="/video.mp4" />
<a href="/ISABELADEMORAES.pdf" />
```

## Deployment

Deployed on Netlify with auto-detection for Vite. No `netlify.toml` is needed — Netlify infers the build command (`vite build`) and publish directory (`dist/`) automatically.

## Git conventions

- Commit prefixes in English: `fix:`, `style:`, `feat:`, `chore:`
- Commit descriptions in Portuguese
- Example: `style: ajuste de margens na seção de contato`
