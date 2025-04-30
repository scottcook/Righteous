# Righteous Webflow Scroll Animation Project

This repository contains the custom Webflow-enhanced scroll experience powered by GSAP, ScrollTrigger, and ScrollSmoother. It provides full-screen pinned sections, smooth scrolling, scroll snapping, and modular animation logic per section.

## 🔧 Setup

1. Clone the repository:

```bash
git clone https://github.com/scottcook/Righteous.git
cd Righteous
```

2. Install dependencies:

```bash
npm install
```

## 🚀 Development

1. Start the development server:

```bash
npm run dev
```

2. Or use watch-only mode:

```bash
npm run watch
```

3. Make changes to files in the `src/` directory

4. Open `index.html` with Live Server (or similar) to preview animations

> ✅ Tip: Your build outputs to `dist/bundle.js`, which is injected into Webflow or your local page.
> ⚠️ Make sure Live Server is running **before** opening your Webflow site to test the animations locally.
> 🧪 Add `?dev=1` to your Webflow site URL to load your local `bundle.js` instead of the production CDN version for live development.

## 🧱 Project Structure

- `src/`
    - `index.js` — Entry point, initializes all scroll sections
    - `global.js` — Global scroll smoothing, pinning, and snapping setup
    - `section-*.js` — One module per scroll section, each exporting a `init[Section]Scroll()` function

## 🎨 Styling

- Smooth scrolling uses GSAP's `ScrollSmoother` plugin
- Masthead is positioned outside the smoother content, and a dynamic buffer ensures proper scroll length
- Additional visual effects can be layered via timelines in each section file

## 🧹 Code Quality

- Lint your code:

```bash
npm run lint
```

- Format your code:

```bash
npm run format
```

## 📦 Build for Production

```bash
npm run build
```

This outputs an optimized `dist/bundle.js` ready for injection into Webflow or CDN.

## 🛠️ Tech Used

- [GSAP 3](https://gsap.com)
- ScrollTrigger
- ScrollSmoother
- Webpack 5
- Babel + Prettier + ESLint

## 🔄 Notes

- Scroll animations use `scrub` to stay in sync with ScrollSmoother
- A dynamic scroll buffer is added to account for pinned masthead height
- All resize events trigger ScrollTrigger refresh + buffer recalculation

## 👋 Questions?

For issues or help, open an issue or contact Scott Cook.
