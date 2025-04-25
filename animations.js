// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations immediately when script loads
(function() {
    console.log("Animation script loaded");

    // Create main timeline
    const mainTl = gsap.timeline();

    try {
        // Initialize SplitText for text elements
        const mainLogoSplit = new SplitText(".main-logo", {
            type: "chars",
            position: "relative"
        });
        const topLogoSplit = new SplitText(".top-logo", {
            type: "chars",
            position: "relative"
        });
        const citiesTextSplit = new SplitText(".text-block", {
            type: "chars",
            position: "relative"
        });

        // Set initial states
        gsap.set(".main-logo", { opacity: 0 });
        gsap.set(".top-logo", { opacity: 0 });
        gsap.set(".text-block", { opacity: 0 });
        gsap.set(".top-navlink", { opacity: 0, y: 20 });
        
        // Set initial states for split characters
        gsap.set(mainLogoSplit.chars, { 
            opacity: 0,
            y: 50,
            rotateX: -90
        });
        gsap.set(topLogoSplit.chars, {
            opacity: 0,
            y: 30,
            rotateX: -60
        });
        gsap.set(citiesTextSplit.chars, {
            opacity: 0,
            y: 20,
            rotateX: -30
        });

        // Animation Sequence
        mainTl
            // First show main logo container
            .to(".main-logo", {
                opacity: 1,
                duration: 0.1
            })
            // Then animate main logo characters
            .to(mainLogoSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.03,
                duration: 0.4,
                ease: "back.out(1.7)"
            })

            // Show top logo container
            .to(".top-logo", {
                opacity: 1,
                duration: 0.1
            }, "-=0.2")
            // Animate top logo characters
            .to(topLogoSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.02,
                duration: 0.3,
                ease: "back.out(1.7)"
            }, "-=0.1")

            // Animate cities text
            .to(".text-block", {
                opacity: 1,
                duration: 0.1
            })
            .to(citiesTextSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.01,
                duration: 0.2,
                ease: "back.out(1.7)"
            })

            // Fade in navigation elements
            .to(".top-navlink", {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.out"
            }, "-=0.1");

    } catch (error) {
        console.error("Error in animation setup:", error);
    }
})(); 