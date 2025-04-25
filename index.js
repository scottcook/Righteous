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
        
        // Initialize SplitText
        const mainLogoSplit = new SplitText(mainLogoSelector, {type: "chars, words"});
        const topLogoSplit = new SplitText(topLogoSelector, {type: "chars, words"});
        const citiesTextSplit = new SplitText(textBlockSelector, {type: "chars, words"});
        
        console.log("SplitText initialized successfully with:");
        console.log("- Main logo chars:", mainLogoSplit.chars.length);
        console.log("- Top logo chars:", topLogoSplit.chars.length);
        console.log("- Cities text chars:", citiesTextSplit.chars.length);

        // Set initial states - start with opacity 0
        gsap.set([mainLogoSelector, topLogoSelector, textBlockSelector, navLinksSelector], {
            opacity: 0
        });
        console.log("Initial states set to opacity 0");

        // Set initial state for stack-section
        gsap.set(".stack-section", {
            yPercent: 100  // Start below the viewport
        });

        // Animation Sequence
        console.log("Starting animation sequence");
        mainTl
            // Animate main logo text characters
            .from(mainLogoSplit.chars, {
                opacity: 0,
                y: 50,
                rotateX: -90,
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.7)",
                onStart: () => console.log("Main logo animation started")
            })
            .to(mainLogoSelector, {
                opacity: 1,
                duration: 0.1,
                onComplete: () => console.log("Main logo opacity set to 1")
            })

            // Animate top logo
            .from(topLogoSplit.chars, {
                opacity: 0,
                y: 30,
                stagger: 0.03,
                duration: 0.5,
                ease: "power2.out",
                onStart: () => console.log("Top logo animation started")
            })
            .to(topLogoSelector, {
                opacity: 1,
                duration: 0.1,
                onComplete: () => console.log("Top logo opacity set to 1")
            })

            // Animate cities text
            .from(citiesTextSplit.chars, {
                opacity: 0,
                y: 20,
                stagger: 0.02,
                duration: 0.4,
                ease: "power2.out",
                onStart: () => console.log("Cities text animation started")
            })
            .to(textBlockSelector, {
                opacity: 1,
                duration: 0.1,
                onComplete: () => console.log("Cities text opacity set to 1")
            })

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

    // Add scroll animations separately
    try {
        console.log("Setting up scroll animations");
        ScrollTrigger.create({
            trigger: ".hero-area",
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            onEnter: () => console.log("Hero area pinned")
        });

        gsap.to(".stack-section", {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-area",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                markers: true,
                onEnter: () => console.log("Stack section animation triggered")
            }
        });
    } catch (error) {
        console.error("Error in scroll setup:", error);
    }
}); 