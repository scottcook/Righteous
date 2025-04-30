/**
 * This file should be loaded from:
 * https://cdn.jsdelivr.net/gh/scottcook/Righteous@338e1c2/index.js
 */

console.log('Script loaded - Starting initialization');

// Define selectors at the top level
const selectors = {
    mainLogo: ".main-wrapper .hero-area .main-logo-container .main-logo",
    topLogo: ".nav-bar-main .logo-lockup .top-logo",
    navLinks: ".nav-bar-main .top-navlink",
    stackSection: ".stack-section",
    skelehand: ".skelehand",
    logoUnderline: ".logo-underline"
};

// Scroll lock helper functions
function disableScroll() {
    // Get the current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Store current scroll position
    document.body.dataset.scrollTop = scrollTop.toString();
    document.body.dataset.scrollLeft = scrollLeft.toString();
    
    // Lock scroll position
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.left = `-${scrollLeft}px`;
    document.body.style.width = '100%';
    
    console.log("Scrolling disabled during animation");
}

function enableScroll() {
    // Get the stored scroll position
    const scrollTop = parseInt(document.body.dataset.scrollTop || '0', 10);
    const scrollLeft = parseInt(document.body.dataset.scrollLeft || '0', 10);
    
    // Restore normal scroll behavior
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    
    // Restore scroll position
    window.scrollTo(scrollLeft, scrollTop);
    
    console.log("Scrolling enabled after animation complete");
}

// Initialize GSAP and handle animations
function initializeGSAP() {
    console.log('initializeGSAP called');
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP not loaded! Please ensure GSAP is loaded before this script.');
        console.log('Window object keys:', Object.keys(window));
        return;
    }
    console.log('GSAP found:', gsap.version);

    // Check for required plugins
    const requiredPlugins = {
        ScrollTrigger: typeof ScrollTrigger !== 'undefined',
        ScrollToPlugin: typeof ScrollToPlugin !== 'undefined',
        SplitText: typeof SplitText !== 'undefined'
    };

    console.log('Plugin status:', requiredPlugins);

    // Log missing plugins
    const missingPlugins = Object.entries(requiredPlugins)
        .filter(([, loaded]) => !loaded)
        .map(([name]) => name);

    if (missingPlugins.length > 0) {
        console.error(`Missing required GSAP plugins: ${missingPlugins.join(', ')}`);
        console.error('Please ensure all required plugins are loaded before this script.');
        console.log('Available GSAP plugins:', gsap.plugins ? Object.keys(gsap.plugins) : 'No plugins found');
        return;
    }

    try {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        console.log("GSAP plugins registered successfully");
        console.log("Registered plugins:", gsap.plugins ? Object.keys(gsap.plugins) : 'No plugins found');
    } catch (error) {
        console.error("Error registering GSAP plugins:", error);
        return;
    }

    try {
        console.log("Starting animation setup");
        
        // Check if elements exist first
        Object.entries(selectors).forEach(([name, selector]) => {
            const element = document.querySelector(selector);
            if (element) {
                console.log(`✓ Found ${name}:`, selector);
            } else {
                console.error(`✗ Missing ${name}:`, selector);
            }
        });

        // Initialize SplitText
        console.log("Creating SplitText instances");
        const mainLogoSplit = new SplitText(selectors.mainLogo, {type: "chars,words,lines"});
        const topLogoSplit = new SplitText(selectors.topLogo, {type: "chars,words,lines"});
        
        console.log("SplitText created successfully:");
        console.log("- Main logo chars:", mainLogoSplit.chars.length);
        console.log("- Top logo chars:", topLogoSplit.chars.length);

        // Set initial states with logging
        console.log("Setting initial states");
        
        gsap.set(mainLogoSplit.chars, { 
            opacity: 0,
            y: 80,
            rotateX: -90,
            immediateRender: true
        });
        
        gsap.set(topLogoSplit.chars, { 
            opacity: 0,
            y: 50,
            immediateRender: true
        });
        
        gsap.set(selectors.navLinks, {
            opacity: 0,
            y: 20,
            immediateRender: true
        });
        
        gsap.set(selectors.logoUnderline, {
            opacity: 0.6,
            scaleX: 0,
            transformOrigin: "left center",
            immediateRender: true
        });

        gsap.set(selectors.stackSection, {
            opacity: 0,
            y: 50,
            immediateRender: true
        });
        
        gsap.set(selectors.skelehand, {
            opacity: 0,
            y: 200,
            transformOrigin: "center bottom",
            immediateRender: true
        });
        
        console.log("Initial states set");

        // Disable scrolling during initial animations
        disableScroll();
        console.log("Scroll disabled for animations");

        // Create and configure main timeline
        console.log("Creating main timeline");
        const mainTl = gsap.timeline({
            onStart: () => console.log("Main timeline started"),
            onComplete: () => console.log("Main timeline completed"),
            defaults: {
                ease: "power2.out"
            }
        });

        // Build the animation sequence
        console.log("Building animation sequence");
        mainTl
            .to(mainLogoSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.05,
                duration: 1.2,
                ease: "back.out(2)",
                onStart: () => console.log("Main logo animation started"),
                onComplete: () => console.log("Main logo animation completed")
            })
            .to(selectors.logoUnderline, {
                scaleX: 1,
                duration: 0.8,
                onStart: () => console.log("Logo underline animation started"),
                onComplete: () => console.log("Logo underline animation completed")
            }, "-=0.5")
            .to(topLogoSplit.chars, {
                opacity: 1,
                y: 0,
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out(1.7)",
                onStart: () => console.log("Top logo animation started"),
                onComplete: () => console.log("Top logo animation completed")
            }, "-=0.3")
            .to(selectors.navLinks, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
                onStart: () => console.log("Nav links animation started"),
                onComplete: () => {
                    console.log("Nav links animation completed");
                    enableScroll();
                    console.log("Scroll enabled");
                }
            }, "-=0.4")
            .to(selectors.skelehand, {
                opacity: 1,
                y: 0,
                duration: 1.8,
                ease: "elastic.out(0.5, 0.3)",
                onStart: () => console.log("Skelehand animation started"),
                onComplete: () => console.log("Skelehand animation completed")
            }, "-=0.2");

        // Set up ScrollTrigger for stack section
        console.log("Setting up ScrollTrigger");
        
        // Verify stack section element exists before creating ScrollTrigger
        const stackSection = document.querySelector(selectors.stackSection);
        if (!stackSection) {
            console.error("Stack section element not found for ScrollTrigger");
            return;
        }
        console.log("Stack section element found:", stackSection);

        // Create a wrapper div for the animation
        console.log("Creating animation wrapper");
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position: relative; width: 100%; height: 100%; will-change: transform;';
        
        // Move all children into the wrapper
        while (stackSection.firstChild) {
            wrapper.appendChild(stackSection.firstChild);
        }
        stackSection.appendChild(wrapper);
        
        // Reset any Webflow transforms on the section
        stackSection.style.transform = 'none';
        stackSection.style.opacity = '1';
        stackSection.style.willChange = 'transform';
        
        // Set initial state of wrapper
        gsap.set(wrapper, {
            y: '100vh', // Start from below the viewport
            opacity: 0,
            scale: 0.8,
            force3D: true
        });

        // Create the scroll animation
        ScrollTrigger.create({
            trigger: stackSection,
            start: "top bottom", // Start when the top of the section hits the bottom of the viewport
            end: "top center", // End when the top of the section hits the center of the viewport
            scrub: 1,
            markers: true,
            onEnter: () => console.log("Stack section entering view"),
            onLeave: () => console.log("Stack section leaving view"),
            onEnterBack: () => console.log("Stack section entering back"),
            onLeaveBack: () => console.log("Stack section leaving back"),
            onUpdate: (self) => console.log("Scroll progress:", self.progress.toFixed(2)),
            animation: gsap.timeline()
                .to(wrapper, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out"
                })
        });

        // Add a parallax effect to enhance the movement
        gsap.to(wrapper, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: stackSection,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                markers: false
            }
        });

        // Force a refresh of ScrollTrigger
        ScrollTrigger.refresh();

        // Log active ScrollTriggers
        const triggers = ScrollTrigger.getAll();
        console.log("Active ScrollTriggers:", triggers);
        triggers.forEach(trigger => {
            console.log("ScrollTrigger details:", {
                id: trigger.vars.id,
                trigger: trigger.trigger,
                start: trigger.vars.start,
                end: trigger.vars.end,
                scrub: trigger.vars.scrub
            });
        });

        console.log("Animation setup complete");

    } catch (error) {
        console.error("Error in animation setup:", error);
        console.error("Error stack:", error.stack);
        enableScroll(); // Ensure scrolling is enabled even if there's an error
    }
}

// Log the current readyState
console.log('Current document.readyState:', document.readyState);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    console.log('Document still loading, adding DOMContentLoaded listener');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded fired');
        initializeGSAP();
    });
} else {
    console.log('Document already loaded, initializing immediately');
    initializeGSAP();
} 