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
        console.log("Main logo split:", mainLogoSplit.chars.length, "chars");

        const topLogoSplit = new SplitText(".logo-lockup .top-logo", {
            type: "chars",
            position: "relative"
        });
        console.log("Top logo split:", topLogoSplit.chars.length, "chars");

        const citiesTextSplit = new SplitText(".text-block", {
            type: "chars",
            position: "relative"
        });

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

        gsap.set(".top-navlink", { 
            opacity: 0, 
            y: 20 
        });

        // Animation Sequence
        mainTl
            // Animate main logo characters
            .to(mainLogoSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.03,
                duration: 0.4,
                ease: "back.out(1.7)"
            })

            // Animate top logo characters with more pronounced effect
            .to(topLogoSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: {
                    each: 0.03,
                    from: "start"
                },
                duration: 0.4,
                ease: "back.out(1.7)"
            }, "-=0.2")

            // Animate cities text
            .to(citiesTextSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.02,
                duration: 0.3,
                ease: "back.out(1.7)"
            }, "-=0.2")

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
        console.log("DOM at time of error:", {
            mainLogo: document.querySelector(".main-logo"),
            topLogo: document.querySelector(".logo-lockup .top-logo"),
            cities: document.querySelector(".text-block")
        });
    }
})(); 