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

    // ─── 5. Navigation color transition based on section ────────────────────────────
    const topLogo = document.querySelector('.top-logo');
    const toplinks = document.querySelectorAll('.toplink');
    const navtexts = document.querySelectorAll('.navtext');
    
    if (topLogo || toplinks.length > 0 || navtexts.length > 0) {
        // Combine all navigation elements that need color transition
        const navElements = [
            topLogo, 
            ...Array.from(toplinks), 
            ...Array.from(navtexts)
        ].filter(Boolean);
        
        // Set initial color state explicitly
        gsap.set(navElements, { color: '#ffffff' });
        
        // Single ScrollTrigger to handle both color transitions
        const navColorTrigger = ScrollTrigger.create({
            trigger: '#smooth-content', // Target the entire content wrapper instead of specific section
            start: 'top 95%', // Start almost immediately when content begins to enter viewport
            end: 'top 60%',   // End transition sooner
            scrub: 0.6,       // Slightly quicker response while still smooth
            markers: false,
            onUpdate: (self) => {
                // Smoothly transition between white and dark based on scroll progress
                const progress = self.progress;
                gsap.to(navElements, {
                    color: progress > 0 ? '#1A1A1B' : '#ffffff',
                    duration: 0.6,
                    ease: 'power1.inOut',
                    overwrite: 'auto'
                });
            }
        });
        
        // Add a direct check for scrolling past masthead
        ScrollTrigger.create({
            trigger: '.section-masthead',
            start: 'bottom top+=10%', // Just after masthead leaves viewport
            end: 'bottom top',
            onLeave: () => {
                // Force dark color when leaving masthead
                gsap.to(navElements, {
                    color: '#1A1A1B',
                    duration: 0.3,
                    overwrite: true
                });
            },
            onEnterBack: () => {
                // Force white color when returning to masthead
                gsap.to(navElements, {
                    color: '#ffffff',
                    duration: 0.3,
                    overwrite: true
                });
            }
        });
        
        // Refresh ScrollTrigger when window is resized
        window.addEventListener('resize', () => {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        });
    }

    // ─── 6. Scroll reset and refresh on resize ──────────────────────────────────────
    window.addEventListener('resize', () => {
        console.log('[Righteous] Resized — updating buffer and refreshing triggers');
        updateScrollBuffer();
        ScrollTrigger.refresh();
        smoother.scrollTo(0, false);
    });

    // ─── 7. Reset scroll on load and back/forward navigation (Chrome/BFCACHE) ───────
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
