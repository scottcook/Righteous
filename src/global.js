import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function initGlobalScroll() {
    console.log('[Righteous] Global scroll setup starting');

    // ─── 1. Initialize ScrollSmoother ───────────────────────────────────────────────
    const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: true
    });

    const content = document.querySelector('#smooth-content');
    let buffer;

    // ─── 2. Utility: Add scroll buffer matching masthead height ─────────────────────
    function updateScrollBuffer() {
        const masthead = document.querySelector('.section-masthead');
        if (!masthead || !content) return;

        if (buffer) buffer.remove();

        buffer = document.createElement('div');
        buffer.style.height = `${masthead.offsetHeight}px`;
        buffer.classList.add('scroll-buffer');
        content.appendChild(buffer);
    }

    updateScrollBuffer();

    // ─── 3. Create pinned ScrollTriggers for each section ───────────────────────────
    const panels = ['.section-masthead', '.section-about', '.section-work', '.section-clients', '.section-contact'];

    panels.forEach((selector) => {
        const el = document.querySelector(selector);
        if (!el) return;

        ScrollTrigger.create({
            trigger: el,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: 1,
            anticipatePin: 1,
            markers: false
        });
    });

    // ─── 4. Enable snap-to-section behavior ─────────────────────────────────────────
    ScrollTrigger.create({
        snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.8,
            ease: 'power2.inOut',
            delay: 0.1
        }
    });

    // ─── 5. Scroll reset and refresh on resize ──────────────────────────────────────
    window.addEventListener('resize', () => {
        console.log('[Righteous] Resized — updating buffer and refreshing triggers');
        updateScrollBuffer();
        ScrollTrigger.refresh();
        smoother.scrollTo(0, false);
    });

    // ─── 6. Reset scroll on load and back/forward navigation (Chrome/BFCACHE) ───────
    window.history.scrollRestoration = 'manual';

    window.addEventListener('load', () => {
        console.log('[Righteous] Forcing scroll to top on load');
        smoother.scrollTo(0, false);
    });

    window.addEventListener('pageshow', (event) => {
        if (event.persisted || performance.getEntriesByType('navigation')[0]?.type === 'back_forward') {
            console.log('[Righteous] Forcing scroll to top on pageshow');
            smoother.scrollTo(0, false);
        }
    });
}
