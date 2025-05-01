import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {SplitText} from './gsap-premium/src/SplitText.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.registerPlugin(ScrollTrigger);

export function initContactScroll() {
    const section = document.querySelector('.section-contact');
    if (!section) return;

    console.log('Initializing scroll animation for .section-contact');

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
    gsap.delayedCall(0.5, () => {
        const el = section.querySelector('.slant-text');

        // Step 1: temporarily split into words so we can uppercase
        const tempSplit = new SplitText(el, {type: 'words'});

        tempSplit.words.forEach((word) => {
            if (Math.random() < 0.5) {
                word.textContent = word.textContent.toUpperCase();
            }
        });

        // Manually unwrap the tempSplit words (instead of revert)
        tempSplit.words.forEach((word) => {
            const span = document.createTextNode(word.textContent);
            word.parentNode.replaceChild(span, word);
        });

        // Step 2: now split fresh with final layout
        const split = new SplitText(el, {type: 'lines, words, chars'});

        // To get a perfect slope effect leave off the multiplier
        const total = split.lines.length;

        gsap.set(split.lines, {
            transformOrigin: 'left center',
            yPercent: (i) => -i * 3,
            rotation: (i) => gsap.utils.mapRange(0, total - 1, 1, -1)(i) + gsap.utils.random(-1, 1)
            // skewX: (i) => gsap.utils.mapRange(0, total - 1, 18, -18)(i) + gsap.utils.random(-1.5, 1.5)
        });

        tl.from(
            split.lines,
            {
                opacity: 0,
                scale: 5.0,
                stagger: 0.1,
                duration: 1.5,
                ease: 'power2.out',
                transformOrigin: '50% 50%'
            },
            3
        );

        tl.from(section.querySelector('.heading'), {opacity: 0, scale: 5.0, duration: 2}, 3);

        // Track mouse and skew lines based on horizontal offset from center
        const center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        const maxSkewX = 50;

        const skewXSetters = split.lines.map((line) => gsap.quickTo(line, 'skewX', {duration: 0.4, ease: 'power2.out'}));

        // On mousemove
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const localX = e.clientX - rect.left;
            const centerX = rect.width / 2;
            const dx = (localX - centerX) / centerX;

            const skewX = gsap.utils.clamp(-maxSkewX, maxSkewX, dx * maxSkewX);

            skewXSetters.forEach((setX, index) => {
                gsap.delayedCall(index * 0.1, () => setX(-skewX));
            });
        });
    });
}
