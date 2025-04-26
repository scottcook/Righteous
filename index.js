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

        // Create spacer for proper scrolling - each section 100vh
        const spacer = document.createElement('div');
        spacer.className = "scroll-spacer";
        // Reduce the height to require less scrolling (from 100vh per section to 70vh per section)
        spacer.style.height = `${stackSections.length * 70}vh`;
        mainWrapper.appendChild(spacer);

        // Create a master timeline for all sections
        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: spacer,
                // Start the animation sooner (before spacer reaches top of viewport)
                start: "top 90vh", 
                end: `bottom bottom`,
                scrub: 0.3,
                markers: true,
                id: "master-timeline",
                onUpdate: self => {
                    console.log(`Progress: ${self.progress.toFixed(2)}`);
                }
            }
        });

        // Set initial state for all sections
        stackSections.forEach((section, index) => {
            gsap.set(section, {
                position: "fixed",
                width: "100%",
                height: "100vh",
                top: 0,
                left: 0,
                yPercent: 100, // Start below the viewport
                zIndex: 2 + index
            });
        });

        // Add each section to the master timeline with precise timing
        // The total scroll distance is divided into equal segments for each section
        const sectionCount = stackSections.length;
        const progressStep = 1 / sectionCount;
        
        stackSections.forEach((section, index) => {
            console.log(`Adding section ${index + 1} to timeline at position ${index * progressStep}`);
            
            // Each section animates from 100% (off screen) to 0% (fully visible)
            masterTimeline.fromTo(
                section, 
                { yPercent: 100 }, 
                { 
                    yPercent: 0, 
                    ease: "none", 
                    duration: progressStep, // Each section takes an equal portion of the timeline
                    immediateRender: false  // Don't render until scrolled into view
                }, 
                index * progressStep // Position in the timeline (0, 0.25, 0.5, 0.75 for 4 sections)
            );
        });

        // Handle resize
        window.addEventListener("resize", () => {
            ScrollTrigger.update();
            console.log("Resize handled - ScrollTriggers updated");
        });
        
    } catch (error) {
        console.error("Error in scroll setup:", error);
        console.log("Stack sections found:", document.querySelectorAll(".stack-section").length);
    }
}); 