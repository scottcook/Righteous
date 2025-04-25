// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations immediately when script loads
(function() {
    console.log("Animation script loaded");

    // Debug: Log all elements with relevant classes
    console.log("All logo-related elements:", {
        heroArea: document.querySelector('.hero-area'),
        navBar: document.querySelector('.nav-bar-main'),
        logoLockup: document.querySelector('.logo-lockup'),
        fullPath: document.querySelector('.hero-area .nav-bar-main .logo-lockup .top-logo')
    });

    // Create main timeline
    const mainTl = gsap.timeline();

    try {
        // Initialize SplitText for text elements
        const mainLogoSplit = new SplitText(".main-logo", {
            type: "chars",
            position: "relative"
        });
        console.log("Main logo split:", mainLogoSplit.chars.length, "chars");

        // Use the full path for the top logo selector
        console.log("Searching for top logo with full path");
        const topLogoElement = document.querySelector(".hero-area .nav-bar-main .logo-lockup .top-logo");
        console.log("Found top logo element:", topLogoElement);
        console.log("Top logo element details:", {
            element: topLogoElement,
            parentNode: topLogoElement?.parentNode,
            classList: topLogoElement?.classList,
            innerHTML: topLogoElement?.innerHTML
        });
        
        if (!topLogoElement) {
            throw new Error("Top logo element not found - please check class names in Webflow");
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

        // Set initial state for nav bar container
        gsap.set(".nav-bar-main", {
            opacity: 0
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

            // Immediately show nav-bar-main container with minimal duration
            .to(".nav-bar-main", {
                opacity: 1,
                duration: 0.01
            })

            // Small pause to ensure container is visible
            .addLabel("navVisible")

            // Then animate top logo characters
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
                    length: topLogoSplit.chars.length,
                    containerOpacity: document.querySelector(".nav-bar-main").style.opacity
                })
            }, "navVisible+=0.01")

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
        // Log the complete DOM structure for debugging
        console.log("Complete DOM structure for debugging:", {
            heroArea: document.querySelector(".hero-area"),
            navBar: document.querySelector(".nav-bar-main"),
            logoLockup: document.querySelector(".logo-lockup"),
            topLogo: document.querySelector(".hero-area .nav-bar-main .logo-lockup .top-logo"),
            cities: document.querySelector(".text-block")
        });
    }
})(); 