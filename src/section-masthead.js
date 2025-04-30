import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {SplitText} from './gsap-premium/src/SplitText.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initMastheadScroll() {
    const masthead = document.querySelector('.section-masthead');
    const nextSection = document.querySelector('.section-about');
    if (!masthead || !nextSection) return;

    console.log('Initializing masthead transition');

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

    // Animate the section itself
    tl.to(masthead, {opacity: 0.5, y: '-=25%', ease: 'none'});

    // This will be based on the duration above so till start at 0s and animate the last 2s.
    const split = new SplitText(masthead.querySelector('.heading'), {type: 'words, chars'});

    tl.to(split.chars, {stagger: 0.2, opacity: 0, scale: 5.0, duration: 2}, 0);
}
