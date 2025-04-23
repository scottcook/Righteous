import gsap from './utils/animation-setup';

// Example fade in animation
export function fadeInElement(element) {
    return gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });
}

// Example scroll trigger animation
export function createScrollAnimation(element) {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top center",
            end: "bottom center",
            scrub: true
        },
        y: 100,
        opacity: 0
    });
}

// Example motion path animation
export function createMotionPathAnimation(element, path) {
    gsap.to(element, {
        duration: 5,
        motionPath: {
            path: path,
            align: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },
        ease: "none",
        repeat: -1
    });
} 