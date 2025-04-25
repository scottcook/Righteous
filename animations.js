// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations immediately when script loads
(function() {
    console.log("Animation script loaded");

    // Create main timeline
    const mainTl = gsap.timeline();

    // Initialize SplitText for all text elements
    console.log("Initializing SplitText");
    const mainLogoText = document.querySelector(".main-logo");
    console.log("Main logo element:", mainLogoText);
    
    if (!mainLogoText) {
        console.error("Main logo element not found!");
        return;
    }

    const mainLogoSplit = new SplitText(".main-logo", {type: "chars"});
    const topLogoSplit = new SplitText(".top-logo", {type: "chars"});
    const citiesTextSplit = new SplitText(".text-block", {type: "chars"});

    console.log("Split text results:", {
        mainLogoChars: mainLogoSplit.chars.length,
        topLogoChars: topLogoSplit.chars.length,
        citiesChars: citiesTextSplit.chars.length
    });

    // Set initial states
    gsap.set([".main-logo", ".top-logo", ".text-block", ".top-navlink"], {
        opacity: 0,
        y: 50
    });

    // Animation Sequence
    mainTl
        // Debug log
        .call(() => console.log("Starting animation sequence"))

        // Animate main logo text characters
        .from(mainLogoSplit.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.03,
            duration: 0.4,
            ease: "back.out(1.7)",
            onStart: () => console.log("Main logo animation started")
        })

        // Animate top logo characters
        .from(topLogoSplit.chars, {
            opacity: 0,
            y: 30,
            rotateX: -60,
            stagger: 0.02,
            duration: 0.3,
            ease: "back.out(1.7)",
            onStart: () => console.log("Top logo animation started")
        }, "-=0.2")

        // Animate cities text characters
        .from(citiesTextSplit.chars, {
            opacity: 0,
            y: 20,
            rotateX: -30,
            stagger: 0.01,
            duration: 0.2,
            ease: "back.out(1.7)",
            onStart: () => console.log("Cities text animation started")
        }, "-=0.1")

        // Fade in navigation elements
        .to(".top-navlink", {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
            onStart: () => console.log("Nav links animation started")
        }, "-=0.2");
})(); 