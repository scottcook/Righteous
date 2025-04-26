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

    // Set up scroll animations with mask effect for multiple sections
    try {
        console.log("Setting up scroll animations for multiple sections");

        // Get all the necessary elements
        const heroArea = document.querySelector(".hero-area");
        const stackSections = document.querySelectorAll(".stack-section");
        const mainWrapper = document.querySelector(".main-wrapper");
        
        if (!heroArea || !stackSections.length) {
            console.error("Hero area or stack sections not found");
            return;
        }

        // Set initial styles for main wrapper
        gsap.set(mainWrapper, {
            height: "auto",
            overflow: "hidden"
        });

        // Pin the hero section
        ScrollTrigger.create({
            trigger: heroArea,
            pin: true,
            pinSpacing: false,
            start: "top top"
        });

        // Create spacer for proper scrolling
        const totalHeight = (stackSections.length + 1) * window.innerHeight;
        const spacer = document.createElement('div');
        spacer.style.height = `${totalHeight}px`;
        mainWrapper.appendChild(spacer);

        // Set up each stack section
        stackSections.forEach((section, index) => {
            console.log(`Setting up stack section ${index + 1}`);
            
            // Initial setup for each section
            gsap.set(section, {
                position: "fixed",
                width: "100%",
                height: "100vh",
                top: 0,
                left: 0,
                yPercent: 100,
                zIndex: 2 + index
            });

            // Calculate trigger points based on section index
            // First section starts immediately, others maintain their spacing
            const startPosition = index === 0 ? 0 : index * 100;
            const endPosition = startPosition + 100;

            // Create scroll-linked animation
            ScrollTrigger.create({
                trigger: spacer,
                start: `top+=${startPosition}vh top`,
                end: `top+=${endPosition}vh top`,
                animation: gsap.to(section, {
                    yPercent: 0,
                    ease: "none"
                }),
                scrub: true,
                invalidateOnRefresh: true,
                markers: true, // Remove in production
                onEnter: () => console.log(`Section ${index + 1} entering`),
                onLeave: () => console.log(`Section ${index + 1} leaving`),
                onEnterBack: () => console.log(`Section ${index + 1} entering back`),
                onLeaveBack: () => console.log(`Section ${index + 1} leaving back`)
            });
        });

        // Handle resize
        window.addEventListener("resize", () => {
            const newHeight = (stackSections.length + 1) * window.innerHeight;
            spacer.style.height = `${newHeight}px`;
            ScrollTrigger.refresh();
            console.log("Resize handled - ScrollTriggers refreshed");
        });
        
    } catch (error) {
        console.error("Error in scroll setup:", error);
        console.log("Stack sections found:", document.querySelectorAll(".stack-section").length);
    }
}); 