import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function initGlobalScroll() {
    console.log('Global scroll setup starting');

    ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: true
    });

    const content = document.querySelector('#smooth-content');
    let buffer;

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

    ScrollTrigger.create({
        snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.8,
            ease: 'power2.inOut',
            delay: 0.1
        }
    });

    window.addEventListener('resize', () => {
        updateScrollBuffer();
        ScrollTrigger.refresh();
    });
}
