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

        // Be more specific with the top logo selector
        const topLogoElement = document.querySelector(".logo-lockup .top-logo");
        console.log("Found top logo element:", topLogoElement);
        
        if (!topLogoElement) {
            throw new Error("Top logo element not found");
        }

        const topLogoSplit = new SplitText(topLogoElement, {
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

        // Ensure we're setting initial state for top logo chars
        if (topLogoSplit.chars && topLogoSplit.chars.length > 0) {
            console.log("Setting initial state for top logo chars");
            gsap.set(topLogoSplit.chars, {
                opacity: 0,
                y: 30,
                rotateX: -60
            });
        }

        gsap.set(citiesTextSplit.chars, {
            opacity: 0,
            y: 20,
            rotateX: -30
        });

        // Set initial states for navigation elements
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

            // Show nav-bar-main container first
            .to(".nav-bar-main", {
                opacity: 1,
                duration: 0.1
            })

            // Then animate top logo characters - ensure we're animating the chars
            .to(topLogoSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: {
                    each: 0.03,
                    from: "start"
                },
                duration: 0.4,
                ease: "back.out(1.7)",
                onStart: () => console.log("Starting top logo animation", {
                    chars: topLogoSplit.chars,
                    length: topLogoSplit.chars.length
                })
            })

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
            navBar: document.querySelector(".nav-bar-main"),
            topLogo: document.querySelector(".logo-lockup .top-logo"),
            cities: document.querySelector(".text-block")
        });
    }
})(); 