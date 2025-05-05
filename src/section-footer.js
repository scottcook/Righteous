import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initFooterScroll() {
    const section = document.querySelector('.section-footer');
    if (!section) return;

    console.log('Initializing scroll animation for .section-footer');

    const tl = gsap.timeline({
        defaults: {duration: 5}, // ensure timeline length is normalized
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            markers: false
        }
    });

    // Animate the section itself
    tl.fromTo(section, {scale: 0.9}, {scale: 1, ease: 'none'});

    // This will be based on the duration above so till start at 3s and animate the last 2s.
    // tl.from(section.querySelector('.heading'), {opacity: 0, scale: 5.0, duration: 2}, 3);
}
