/**
 * This file should be loaded from:
 * https://cdn.jsdelivr.net/gh/scottcook/Righteous@main/index.js
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
console.log("GSAP and ScrollTrigger registered");

// Wait for DOM content and web fonts to load
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");
    
    // Full hierarchical selectors
    const mainLogoSelector = ".main-wrapper .hero-area .main-logo-container .main-logo";
    const topLogoSelector = ".main-wrapper .hero-area .nav-bar-main .logo-lockup .top-logo";
    const textBlockSelector = ".main-wrapper .hero-area .cities .text-block";
    const navLinksSelector = ".main-wrapper .hero-area .nav-bar-main .top-navlink";
    
    // Create main timeline
    const mainTl = gsap.timeline();

    // Check if elements exist first
    const mainLogoElement = document.querySelector(mainLogoSelector);
    const topLogoElement = document.querySelector(topLogoSelector);
    const textBlockElement = document.querySelector(textBlockSelector);
    
    if (!mainLogoElement) {
        console.error("Main logo element not found:", mainLogoSelector);
    } else {
        console.log("Main logo found:", mainLogoElement);
    }
    
    if (!topLogoElement) {
        console.error("Top logo element not found:", topLogoSelector);
    } else {
        console.log("Top logo found:", topLogoElement);
    }
    
    if (!textBlockElement) {
        console.error("Text block element not found:", textBlockSelector);
    } else {
        console.log("Text block found:", textBlockElement);
    }

    // Don't run animations if elements aren't found
    if (!mainLogoElement || !topLogoElement || !textBlockElement) {
        console.error("Critical elements missing - not running animations");
        return;
    }

    try {
        console.log("Initializing SplitText");
        
        // Make sure SplitText is available
        if (typeof SplitText === 'undefined') {
            console.error("SplitText plugin not loaded!");
            return;
        }
        
        // Initialize SplitText with more split types for more dramatic effect
        const mainLogoSplit = new SplitText(mainLogoSelector, {type: "chars,words,lines"});
        const topLogoSplit = new SplitText(topLogoSelector, {type: "chars,words,lines"});
        const citiesTextSplit = new SplitText(textBlockSelector, {type: "chars,words,lines"});
        
        console.log("SplitText initialized successfully with:");
        console.log("- Main logo chars:", mainLogoSplit.chars.length);
        console.log("- Top logo chars:", topLogoSplit.chars.length);
        console.log("- Cities text chars:", citiesTextSplit.chars.length);

        // Set initial styles for better split text effect
        gsap.set(mainLogoSplit.chars, { 
            opacity: 0,
            y: 80,
            rotateX: -90
        });
        
        gsap.set(topLogoSplit.chars, { 
            opacity: 0,
            y: 50 
        });
        
        gsap.set(citiesTextSplit.chars, { 
            opacity: 0,
            y: 30 
        });
        
        gsap.set(navLinksSelector, {
            opacity: 0,
            y: 20
        });
        
        console.log("Initial animation states set");

        // Animation Sequence for intro elements
        console.log("Starting animation sequence");
        mainTl
            // Animate main logo text characters
            .to(mainLogoSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.05,
                duration: 1.2,
                ease: "back.out(2)",
                onStart: () => console.log("Main logo animation started")
            })

            // Animate top logo
            .to(topLogoSplit.chars, {
                opacity: 1,
                y: 0,
                stagger: 0.03,
                duration: 0.7,
                ease: "power2.out",
                onStart: () => console.log("Top logo animation started")
            }, "-=0.3")

            // Animate cities text
            .to(citiesTextSplit.chars, {
                opacity: 1,
                y: 0,
                stagger: 0.02,
                duration: 0.5,
                ease: "power2.out",
                onStart: () => console.log("Cities text animation started")
            }, "-=0.3")

            // Fade in navigation elements
            .to(navLinksSelector, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                onStart: () => console.log("Nav links animation started"),
                onComplete: () => console.log("Nav links animation completed")
            }, "-=0.4");

    } catch (error) {
        console.error("Error in animation setup:", error);
    }

    // Set up scroll animations with mask effect
    try {
        console.log("Setting up scroll animations");

        // Get the hero and stack elements
        const heroArea = document.querySelector(".hero-area");
        const stackSection = document.querySelector(".stack-section");
        const mainWrapper = document.querySelector(".main-wrapper");
        
        if (!heroArea || !stackSection) {
            console.error("Hero area or stack section not found");
            return;
        }
        
        // Calculate document height and make sure there's enough space
        const docHeight = Math.max(
            document.body.scrollHeight, 
            document.body.offsetHeight, 
            document.documentElement.clientHeight, 
            document.documentElement.scrollHeight, 
            document.documentElement.offsetHeight
        );
        
        // Calculate viewport height
        const vh = window.innerHeight;
        
        console.log("Document height:", docHeight, "Viewport height:", vh);
        
        // Ensure main wrapper is tall enough
        if (mainWrapper) {
            gsap.set(mainWrapper, {
                minHeight: docHeight + vh  // Add extra viewport height to prevent gap
            });
        }
        
        // Ensure proper positioning for the stack section to create mask effect
        gsap.set(stackSection, {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100vh",
            minHeight: "100vh",
            yPercent: 100,  // Start below the viewport (invisible on page load)
            zIndex: 2  // Higher than hero area
        });
        
        // Set hero area styling
        gsap.set(heroArea, {
            position: "relative", 
            zIndex: 1,
            height: "100vh" // Ensure hero fills viewport
        });
        
        // Create the scroll-based reveal animation
        ScrollTrigger.create({
            trigger: heroArea,
            pin: true,
            pinSpacing: false,
            start: "top top",
            end: "bottom bottom", // Pin until the bottom of the document
            onEnter: () => console.log("Hero area pinned")
        });
        
        // Create the sliding animation for the stack section
        gsap.to(stackSection, {
            yPercent: 0,  // Move to 0 (fully visible)
            ease: "none",
            scrollTrigger: {
                trigger: heroArea,
                start: "top top",
                endTrigger: "html", // Use the entire document as end trigger
                end: "bottom bottom",
                scrub: true,
                markers: false, // Set to true for debugging
                onUpdate: (self) => {
                    if (self.progress > 0.95) {
                        console.log("Near bottom:", self.progress.toFixed(2));
                    }
                }
            }
        });
        
        // Handle browser resize
        window.addEventListener("resize", function() {
            // Force ScrollTrigger to recalculate positions and dimensions
            ScrollTrigger.refresh(true); // true = deep refresh
            console.log("ScrollTrigger refreshed on resize");
        });
        
    } catch (error) {
        console.error("Error in scroll setup:", error);
    }
}); 