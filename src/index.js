window.history.scrollRestoration = 'manual';

// Then import your scroll logic:
import {initGlobalScroll} from './global.js';
import {initMastheadScroll} from './section-masthead.js';
import {initOfferingsScroll} from './section-offerings.js';
import {initWorkScroll} from './section-work.js';
import {initAboutScroll} from './section-about.js';
import {initAbout2Scroll} from './section-about-2.js';
import {initHowWeWorkScroll} from './section-how-we-work.js';
import {initGearScroll} from './section-gear.js';

function init() {
    console.log('[Righteous] ✅ Running scroll inits');
    initGlobalScroll();
    initMastheadScroll();
    initOfferingsScroll();
    initWorkScroll();
    initAboutScroll();
    initAbout2Scroll();
    initHowWeWorkScroll();
    initGearScroll();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    init();
}

// Add this to webflow footer code:
// <script>
//   (function () {
//     const devMode = window.location.search.includes('dev=1');
//     console.log('[Righteous] Dev mode:', devMode);

//     const scriptUrl = devMode
//       ? 'http://localhost:5500/dist/bundle.js'
//       : 'https://cdn.jsdelivr.net/gh/scottcook/Righteous@latest/dist/bundle.js';

//     const loadScript = () => {
//       const script = document.createElement('script');
//       script.src = scriptUrl;
//       script.onload = () => {
//         console.log('[Righteous] Script loaded successfully:', script.src);
//       };
//       script.onerror = () => {
//         console.error('[Righteous] Failed to load script:', script.src);
//       };
//       document.body.appendChild(script);
//     };

//     if (document.readyState === 'loading') {
//       document.addEventListener('DOMContentLoaded', loadScript);
//     } else {
//       loadScript();
//     }
//   })();
// </script>
