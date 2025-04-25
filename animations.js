// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for both DOM and Webflow
window.Webflow = window.Webflow || [];
window.Webflow.push(function() {
    // Give Webflow a moment to finish any final setup
    setTimeout(() => {
        console.log("Animation script initializing after Webflow ready");
        
        // Debug: Log all elements on the page to find correct classes
        console.log("All elements with classes:", Array.from(document.querySelectorAll('*'))
            .filter(el => el.className && typeof el.className === 'string' && el.className.length > 0)
            .map(el => ({
                element: el.tagName,
                classes: el.className,
                text: el.textContent?.trim()
            }))
        );

        try {
            // Find main logo - try multiple possible selectors
            const mainLogoElement = document.querySelector('.main-logo') || 
                                  document.querySelector('[class*="main-logo"]') ||
                                  document.querySelector('[class*="mainlogo"]');
            
            console.log("Main logo found:", mainLogoElement);

            if (!mainLogoElement) {
                throw new Error("Main logo element not found - available classes logged above");
            }

            // Find top logo - try multiple possible selectors
            const topLogoElement = document.querySelector('.nav-bar-main .logo-lockup .top-logo') ||
                                 document.querySelector('.top-logo') ||
                                 document.querySelector('[class*="top-logo"]') ||
                                 document.querySelector('[class*="toplogo"]');

            console.log("Top logo found:", topLogoElement);

            if (!topLogoElement) {
                throw new Error("Top logo element not found - available classes logged above");
            }

            // Initialize SplitText
            const mainLogoSplit = new SplitText(mainLogoElement, {
                type: "chars",
                position: "relative"
            });
            console.log("Main logo split into", mainLogoSplit.chars.length, "chars");

            const topLogoSplit = new SplitText(topLogoElement, {
                type: "chars",
                position: "relative"
            });
            console.log("Top logo split into", topLogoSplit.chars.length, "chars");

            // Find cities text
            const citiesElement = document.querySelector('.text-block') ||
                                document.querySelector('[class*="cities"]');
            
            if (!citiesElement) {
                console.warn("Cities text element not found - skipping this animation");
            }

            const citiesTextSplit = citiesElement ? new SplitText(citiesElement, {
                type: "chars",
                position: "relative"
            }) : null;

            // Set initial states
            gsap.set(mainLogoSplit.chars, { 
                opacity: 0,
                y: 50,
                rotateX: -90
            });

            if (topLogoSplit.chars && topLogoSplit.chars.length > 0) {
                gsap.set(topLogoSplit.chars, {
                    opacity: 0,
                    y: 30,
                    rotateX: -60
                });
            }

            if (citiesTextSplit) {
                gsap.set(citiesTextSplit.chars, {
                    opacity: 0,
                    y: 20,
                    rotateX: -30
                });
            }

            // Create and run animation timeline
            const mainTl = gsap.timeline();

            mainTl
                // Main logo animation
                .to(mainLogoSplit.chars, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: 0.03,
                    duration: 0.4,
                    ease: "back.out(1.7)",
                    onStart: () => console.log("Starting main logo animation")
                })

                // Top logo animation
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
                }, "-=0.2");

            // Only add cities animation if element exists
            if (citiesTextSplit) {
                mainTl.to(citiesTextSplit.chars, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: 0.02,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                }, "-=0.2");
            }

        } catch (error) {
            console.error("Error in animation setup:", error);
            // Log all relevant elements for debugging
            console.log("Available elements:", {
                allLogos: document.querySelectorAll('[class*="logo"]'),
                allText: document.querySelectorAll('[class*="text"]'),
                navElements: document.querySelectorAll('[class*="nav"]'),
                backgroundVideo: document.querySelector('[class*="background"]')
            });
        }
    }, 500); // Increased delay to ensure everything is ready
}); 