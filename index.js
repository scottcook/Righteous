/**
 * This file should be loaded from:
 * https://cdn.jsdelivr.net/gh/scottcook/Righteous@main/index.js
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
console.log("GSAP and ScrollTrigger registered");

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

// Use a different variable name to avoid redeclaration
const baseURL = window.location.href.split('#')[0];

// Clear URL hash on page refresh/unload to prevent automatic scrolling to sections
window.addEventListener("beforeunload", () => {
    // Replace current URL with a clean one (no hash)
    window.history.replaceState({}, document.title, baseURL);
});

// Handle page refresh/load to reset scroll position
window.addEventListener("load", () => {
    // Force reset all scroll positions
    resetScrollPosition();
    
    // Check and fix URL if it contains a hash
    if (window.location.hash) {
        // Remove the hash without causing page jump
        window.history.replaceState({}, document.title, baseURL);
        console.log("Removed hash from URL to prevent auto-scrolling");
    }
});

// Reset scroll position with repeated attempts to ensure it works
function resetScrollPosition() {
    // Immediately scroll to top
    window.scrollTo(0, 0);
    
    // Also use the more compatible version
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Disable smooth scrolling temporarily
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    
    // Force scroll to work even if other scripts interfere
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        // Restore original scroll behavior
        htmlElement.style.scrollBehavior = originalScrollBehavior;
        
        // Safer way to refresh ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            try {
                ScrollTrigger.refresh();
            } catch (e) {
                console.warn("ScrollTrigger refresh error:", e);
            }
        }
    }, 10);
}

// Wait for DOM content and web fonts to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded");
    
    // Full hierarchical selectors
    const mainLogoSelector = ".main-wrapper .hero-area .main-logo-container .main-logo";
    const topLogoSelector = ".nav-bar-main .logo-lockup .top-logo";
    const navLinksSelector = ".nav-bar-main .top-navlink";
    const stackSectionSelector = ".stack-section";
    const skelehandSelector = ".skelehand";
    const logoUnderlineSelector = ".logo-underline";
    
    // Create main timeline
    const mainTl = gsap.timeline();

    // Check if elements exist first
    const mainLogoElement = document.querySelector(mainLogoSelector);
    const topLogoElement = document.querySelector(topLogoSelector);
    const stackSection = document.querySelector(stackSectionSelector);
    
    if (!mainLogoElement) {
        console.error("Main logo element not found:", mainLogoSelector);
        return;
    }
    console.log("Main logo found:", mainLogoElement);
    
    if (!topLogoElement) {
        console.error("Top logo element not found:", topLogoSelector);
        return;
    }
    console.log("Top logo found:", topLogoElement);

    if (!stackSection) {
        console.error("Stack section not found:", stackSectionSelector);
        return;
    }
    console.log("Stack sections found:", document.querySelectorAll(stackSectionSelector).length);

    try {
        console.log("Initializing SplitText");
        
        // Make sure SplitText is available
        if (typeof SplitText === 'undefined') {
            console.error("SplitText plugin not loaded!");
            return;
        }
        
        // Initialize SplitText
        const mainLogoSplit = new SplitText(mainLogoSelector, {type: "chars,words,lines"});
        const topLogoSplit = new SplitText(topLogoSelector, {type: "chars,words,lines"});
        
        console.log("SplitText initialized successfully with:");
        console.log("- Main logo chars:", mainLogoSplit.chars.length);
        console.log("- Top logo chars:", topLogoSplit.chars.length);

        // Set initial styles
        gsap.set(mainLogoSplit.chars, { 
            opacity: 0,
            y: 80,
            rotateX: -90
        });
        
        gsap.set(topLogoSplit.chars, { 
            opacity: 0,
            y: 50 
        });
        
        gsap.set(navLinksSelector, {
            opacity: 0,
            y: 20
        });
        
        gsap.set(logoUnderlineSelector, {
            opacity: 0.6,
            zIndex: 2000,
            transformOrigin: "left center"
        });

        // Set initial state for stack section
        gsap.set(stackSection, {
            opacity: 0,
            y: 50
        });
        
        // Set initial state for skelehand element
        gsap.set(skelehandSelector, {
            opacity: 0,
            y: 200, // Start from below the screen
            transformOrigin: "center bottom"
        });
        
        console.log("Initial animation states set");

        // Disable scrolling during initial animations
        disableScroll();

        // Main animation sequence
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
            // Animate logo underline
            .to(logoUnderlineSelector, {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.out",
                onStart: () => console.log("Logo underline animation started")
            }, "-=0.5")
            // Animate top logo characters
            .to(topLogoSplit.chars, {
                opacity: 1,
                y: 0,
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out(1.7)",
                onStart: () => console.log("Top logo animation started")
            }, "-=0.3")
            // Animate navigation links
            .to(navLinksSelector, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
                onStart: () => console.log("Nav links animation started"),
                onComplete: () => {
                    enableScroll();
                    console.log("Nav links animation completed");
                    console.log("Initial animation sequence complete");
                }
            }, "-=0.4");

        // Animate the skelehand element with exaggerated easing
        mainTl.to(skelehandSelector, {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: "elastic.out(0.5, 0.3)", // Exaggerated bouncy easing
            onStart: () => console.log("Skelehand animation started")
        }, "-=0.2");

        // Create animation for stack section without using ScrollTrigger directly
        const sectionAnimation = gsap.to(stackSection, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            paused: true
        });
        
        // Simple scroll handler for the stack section
        const scrollHandler = () => {
            const rect = stackSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // If section is in view
            if (rect.top < viewportHeight * 0.75 && rect.bottom > 0) {
                sectionAnimation.play();
            }
        };
        
        // Add scroll listener with passive flag for better performance
        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // Check initial position
        setTimeout(scrollHandler, 100);

        // Check for ScrollToPlugin
        if (gsap.plugins && gsap.plugins.ScrollToPlugin) {
            console.log("ScrollToPlugin successfully loaded");
            
            // Handle navigation clicks
            document.querySelectorAll(navLinksSelector).forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetSection = stackSection;
                    
                    if (targetSection) {
                        gsap.to(window, {
                            duration: 1,
                            scrollTo: {
                                y: targetSection,
                                offsetY: 50
                            },
                            ease: "power2.inOut"
                        });
                    }
                });
            });
        } else {
            console.warn("GSAP ScrollToPlugin not loaded. Nav-to-section functionality will not work.");
            
            // Fallback navigation with standard scrolling
            document.querySelectorAll(navLinksSelector).forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetSection = stackSection;
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }

        console.log("Animation setup complete");

    } catch (error) {
        console.error("Error in animation setup:", error);
        enableScroll(); // Ensure scrolling is enabled even if there's an error
    }
}); 