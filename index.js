// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM content and web fonts to load
document.addEventListener("DOMContentLoaded", function() {
    // Create main timeline
    const mainTl = gsap.timeline();

    // Initialize SplitText
    const mainLogoSplit = new SplitText(".main-logo", {type: "chars, words"});
    const topLogoSplit = new SplitText(".top-logo", {type: "chars, words"});
    const citiesTextSplit = new SplitText(".text-block", {type: "chars, words"});

    // Set initial states
    gsap.set([".main-logo", ".top-logo", ".text-block", ".top-navlink"], {
        opacity: 0
    });

    // Animation Sequence
    mainTl
        // Animate main logo text characters
        .from(mainLogoSplit.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.05,
            duration: 0.8,
            ease: "back.out(1.7)"
        })

        // Animate top logo
        .from(topLogoSplit.chars, {
            opacity: 0,
            y: 30,
            stagger: 0.03,
            duration: 0.5,
            ease: "power2.out"
        })

        // Animate cities text
        .from(citiesTextSplit.chars, {
            opacity: 0,
            y: 20,
            stagger: 0.02,
            duration: 0.4,
            ease: "power2.out"
        })

        // Fade in navigation elements
        .to(".top-navlink", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4");

    // Stack Section Scroll Animation
    gsap.to(".stack-section", {
        scrollTrigger: {
            trigger: ".hero-area",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false
        },
        y: 0,
        ease: "none"
    });
}); 