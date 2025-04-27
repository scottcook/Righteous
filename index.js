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
                // Start animation with almost no scrolling required
                start: "top 80%", 
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
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                yPercent: 100, // Start below the viewport
                xPercent: 25,  // Offset to the left by 25% of viewport
                rotationZ: 0,  // No angle at start
                opacity: 1,
                zIndex: 2 + index,
                transformOrigin: "top right"
            });
        });

        // Also set hero area to viewport width
        gsap.set(heroArea, {
            width: "100vw"
        });

        // Add each section to the master timeline with precise timing
        const sectionCount = stackSections.length;
        const progressStep = 1 / sectionCount;

        stackSections.forEach((section, index) => {
            // Animate current section in
            masterTimeline.fromTo(
                section,
                { yPercent: 100, xPercent: 25, rotationZ: 0, opacity: 1 },
                {
                    yPercent: 0,
                    xPercent: 0,
                    rotationZ: -6, // Subtle angle as it comes in
                    opacity: 1,
                    ease: "power4.out",
                    duration: progressStep,
                    immediateRender: false
                },
                index * progressStep
            );

            // Animate previous sections up/left as new one comes in
            if (index > 0) {
                masterTimeline.to(
                    stackSections[index - 1],
                    {
                        xPercent: -10,
                        yPercent: -10,
                        opacity: 0.7,
                        ease: "power2.out",
                        duration: progressStep * 0.8,
                        immediateRender: false
                    },
                    index * progressStep
                );
            }
        });

        // Create a master timeline for all sections with updated ScrollTrigger
        masterTimeline.scrollTrigger && masterTimeline.scrollTrigger.kill();
        masterTimeline.scrollTrigger = ScrollTrigger.create({
            trigger: spacer,
            start: "top bottom", // Next section appears as soon as user scrolls
            end: `bottom top`,
            scrub: 0.7, // Fluid, not too fast
            markers: true,
            id: "master-timeline",
            onUpdate: self => {
                console.log(`Progress: ${self.progress.toFixed(2)}`);
            }
        });

        // Handle resize with debounce for better performance
        let resizeTimeout;
        window.addEventListener("resize", () => {
            // Clear the timeout if it exists
            if (resizeTimeout) clearTimeout(resizeTimeout);
            
            // Set a new timeout to handle resize after a brief delay
            resizeTimeout = setTimeout(() => {
                // Force update width during resize to prevent gaps
                gsap.set([heroArea, ...stackSections], {
                    width: "100vw",
                    left: 0
                });
                
                ScrollTrigger.update();
                console.log("Resize handled - ScrollTriggers updated");
            }, 100);
        });
        
    } catch (error) {
        console.error("Error in scroll setup:", error);
        console.log("Stack sections found:", document.querySelectorAll(".stack-section").length);
    }
}); 