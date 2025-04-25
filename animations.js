// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM content and Webflow to be ready
window.addEventListener('DOMContentLoaded', (event) => {
    // Add a small delay to ensure Webflow's own initializations are complete
    setTimeout(() => {
        console.log("Animation script initializing");
        
        // Debug: Check if Webflow is loaded
        console.log("Webflow object:", window.Webflow);
        
        // Debug: Log all elements with relevant classes
        console.log("All logo-related elements:", {
            heroArea: document.querySelector('.hero-area'),
            navBar: document.querySelector('.nav-bar-main'),
            logoLockup: document.querySelector('.nav-bar-main .logo-lockup'),
            topLogo: document.querySelector('.nav-bar-main .logo-lockup .top-logo'),
            mainLogo: document.querySelector('.main-logo'),
            backgroundVideo: document.querySelector('.background-video')
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

            // Use simpler selector path first to debug
            const topLogoElement = document.querySelector('.nav-bar-main .logo-lockup .top-logo');
            console.log("Found top logo element:", topLogoElement);
            
            if (!topLogoElement) {
                throw new Error("Top logo element not found - checking parent elements...");
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

            // Ensure nav bar is visible first
            gsap.set(".nav-bar-main", {
                opacity: 1
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
                // Animate main logo characters first
                .to(mainLogoSplit.chars, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: 0.03,
                    duration: 0.4,
                    ease: "back.out(1.7)",
                    onStart: () => console.log("Starting main logo animation")
                })

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
                    onStart: () => console.log("Starting top logo animation")
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
            // Log the complete DOM structure for debugging
            console.log("DOM structure at time of error:", {
                heroArea: document.querySelector(".hero-area"),
                navBar: document.querySelector(".nav-bar-main"),
                logoLockup: document.querySelector(".nav-bar-main .logo-lockup"),
                topLogo: document.querySelector(".nav-bar-main .logo-lockup .top-logo"),
                mainLogo: document.querySelector(".main-logo"),
                backgroundVideo: document.querySelector(".background-video")
            });
        }
    }, 100); // Small delay to ensure Webflow is ready
}); 