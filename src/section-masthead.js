import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {SplitText} from './gsap-premium/src/SplitText.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initMastheadScroll() {
    const masthead = document.querySelector('.section-masthead');
    const nextSection = document.querySelector('.section-offerings');
    if (!masthead || !nextSection) return;

    console.log('Initializing masthead transition');

    // Create the entrance animation for the heading
    const heading = masthead.querySelector('.heading');
    const entranceSplit = new SplitText(heading, {type: 'words, chars'});

    // Set initial state
    gsap.set(entranceSplit.chars, {opacity: 0, y: 50});

    // Create entrance timeline
    gsap.timeline().to(entranceSplit.chars, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.02,
        ease: 'back.out(1.7)'
    });

    // Create the entrance animation for the top logo
    const logo = document.querySelector('.top-nav-bar .top-logo .nav-links');
    if (logo) {
        const logoSplit = new SplitText(logo, {type: 'chars'});

        // Set initial state for logo
        gsap.set(logoSplit.chars, {opacity: 0, x: -20});

        // Create logo entrance timeline
        gsap.timeline().to(logoSplit.chars, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power2.out',
            delay: 0.2 // Slight delay after the heading animation starts
        });
    }

    // Animate the divider
    const divider = document.querySelector('.divider');
    if (divider) {
        // Set initial state
        gsap.set(divider, {
            scaleX: 0,
            transformOrigin: 'left center'
        });

        // Animate divider
        gsap.timeline().to(divider, {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            delay: 0.4 // Delay after logo animation starts
        });
    }

    // Ensure masthead starts at y:0 and rotation:0
    gsap.set(masthead, {y: 0, rotate: 0});

    // Original scroll animation code
    const tl = gsap.timeline({
        defaults: {duration: 5}, // ensure timeline length is normalized
        scrollTrigger: {
            trigger: nextSection,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            markers: false
        }
    });

    // Animate the section itself: tilt right as next section scrolls in
    tl.to(masthead, {opacity: 0.5, y: '-=15%', rotate: 10, scale: 1.15, ease: 'none'});

    // This will be based on the duration above so till start at 0s and animate the last 2s.
    const split = new SplitText(masthead.querySelector('.heading'), {type: 'words, chars'});
    tl.to(split.chars, {stagger: 0.2, opacity: 0, scale: 5.0, duration: 2}, 0);

    // Ensure masthead rotates back to 0º when revealed again
    ScrollTrigger.create({
        trigger: masthead,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => gsap.to(masthead, {rotate: 0, duration: 0.5, scale: 1, ease: 'power2.out'}),
        onEnterBack: () => gsap.to(masthead, {rotate: 0, duration: 0.5, scale: 1, ease: 'power2.out'}),
        markers: false
    });
}
