// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations immediately when script loads
(function() {
    // Create main timeline
    const mainTl = gsap.timeline();

    // Initialize SplitText for all text elements
    const mainLogoSplit = new SplitText(".main-logo", {type: "chars"});
    const topLogoSplit = new SplitText(".top-logo", {type: "chars"});
    const citiesTextSplit = new SplitText(".text-block", {type: "chars"});

    // Set initial states
    gsap.set([".main-logo", ".top-logo", ".text-block", ".top-navlink"], {
        opacity: 0,
        y: 50
    });

    // Animation Sequence
    mainTl
        // Animate main logo text characters
        .from(mainLogoSplit.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.03,
            duration: 0.4,
            ease: "back.out(1.7)"
        })

        // Animate top logo characters
        .from(topLogoSplit.chars, {
            opacity: 0,
            y: 30,
            rotateX: -60,
            stagger: 0.02,
            duration: 0.3,
            ease: "back.out(1.7)"
        }, "-=0.2")

        // Animate cities text characters
        .from(citiesTextSplit.chars, {
            opacity: 0,
            y: 20,
            rotateX: -30,
            stagger: 0.01,
            duration: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.1")

        // Fade in navigation elements
        .to(".top-navlink", {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
        }, "-=0.2");
})(); 