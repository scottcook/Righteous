/**
 * This file should be loaded from:
 * https://cdn.jsdelivr.net/gh/scottcook/Righteous@main/index.js
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
console.log("GSAP and ScrollTrigger registered");

// Save original URL without hash to prevent scroll position restoration
const originalURL = window.location.href.split('#')[0];

// Clear URL hash on page refresh/unload to prevent automatic scrolling to sections
window.addEventListener("beforeunload", function() {
    // Replace current URL with a clean one (no hash)
    window.history.replaceState({}, document.title, originalURL);
});

// Handle page refresh/load to reset scroll position - more aggressive approach
window.addEventListener("load", function() {
    // Force reset all scroll positions
    resetScrollPosition();
    
    // Check and fix URL if it contains a hash
    if (window.location.hash) {
        // Remove the hash without causing page jump
        window.history.replaceState({}, document.title, originalURL);
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
    setTimeout(function() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        // Restore original scroll behavior
        htmlElement.style.scrollBehavior = originalScrollBehavior;
        
        // Force all ScrollTrigger instances to update with the new position
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh(true);
            ScrollTrigger.update();
            console.log("Scroll position forcibly reset to top");
        }
    }, 10);
}

// Wait for DOM content and web fonts to load
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded");
    
    // Declare shared variables at the top level of the function scope
    let masterTimelineRef = null; // Timeline reference accessible to all handlers
    const stackSectionsArr = Array.from(document.querySelectorAll('.stack-section'));
    
    // Full hierarchical selectors (updated for new structure)
    const mainLogoSelector = ".main-wrapper .hero-area .main-logo-container .main-logo";
    const topLogoSelector = ".nav-bar-main .logo-lockup .top-logo";
    const textBlockSelector = ".stack-section .text-block-2";
    const navLinksSelector = ".nav-bar-main .top-navlink";
    
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
                onComplete: () => {
                    console.log("Nav links animation completed");
                    // The logo animation is now handled directly in the ScrollTrigger onUpdate callback
                }
            }, "-=0.4");

    } catch (error) {
        console.error("Error in animation setup:", error);
    }

    // Set up scroll animations with mask effect for multiple sections
    try {
        console.log("Setting up scroll animations for multiple sections");

        // Reset all animations on load/refresh - more thorough approach
        function resetPageState() {
            // Reset scroll position and clear history
            window.history.scrollRestoration = "manual";
            
            // Clear browser scroll memory - more aggressive approach
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            
            // Force scroll to top immediately
            resetScrollPosition();
            
            // Get all necessary elements
            const heroArea = document.querySelector(".hero-area");
            const stackSections = document.querySelectorAll(".stack-section");
            const mainLogo = document.querySelector(".main-logo");
            const mainWrapper = document.querySelector(".main-wrapper");
            
            // Reset main wrapper
            if (mainWrapper) {
                // Kill any animations on wrapper
                gsap.killTweensOf(mainWrapper);
                
                // Reset styles that may affect scrolling
                gsap.set(mainWrapper, {
                    clearProps: "transform,position,height",
                    height: "auto",
                    overflow: "hidden"
                });
            }
            
            // Reset hero area
            if (heroArea) {
                // Kill any animations
                gsap.killTweensOf(heroArea);
                
                gsap.set(heroArea, {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    autoAlpha: 1,
                    zIndex: 1,
                    clearProps: "transform,filter"
                });
            }
            
            // Reset all stack sections to their initial hidden state
            stackSections.forEach((section, index) => {
                // Kill any animations
                gsap.killTweensOf(section);
                
                // Reset to initial state
                gsap.set(section, {
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    top: 0,
                    left: "-16vw",
                    yPercent: 100,
                    zIndex: 2 + index,
                    rotationZ: 12,
                    opacity: 0,
                    filter: "brightness(1)"
                });
            });
            
            // Reset main logo
            if (mainLogo) {
                // Kill any animations
                gsap.killTweensOf(mainLogo);
                
                // Reset to initial state
                gsap.set(mainLogo, {
                    clearProps: "all"
                });
            }
            
            // Also reset the master timeline if it exists
            if (typeof masterTimelineRef !== 'undefined' && masterTimelineRef) {
                masterTimelineRef.progress(0).pause();
                console.log("Master timeline reset to beginning");
            }
            
            // Reset all ScrollTrigger instances
            if (typeof ScrollTrigger !== 'undefined') {
                // Kill and recreate all triggers
                ScrollTrigger.getAll().forEach(trigger => {
                    trigger.kill(true);
                });
                
                // Force complete refresh
                ScrollTrigger.refresh(true);
                ScrollTrigger.update();
            }
            
            console.log("Page state completely reset - aggressive approach");
        }
        
        // Run the reset function on page load
        resetPageState();
        
        // Get all the necessary elements
        const heroArea = document.querySelector(".hero-area");
        const stackSections = document.querySelectorAll(".stack-section");
        const mainWrapper = document.querySelector(".main-wrapper");
        const navBar = document.querySelector(".nav-bar-main");
        const logoLink = document.querySelector(".logo-link");
        
        if (!heroArea || !stackSections.length) {
            console.error("Hero area or stack sections not found");
            return;
        }

        // Add console log to confirm elements found
        console.log("Elements found:", {
            heroArea: !!heroArea,
            stackSections: stackSections.length,
            mainWrapper: !!mainWrapper,
            navBar: !!navBar,
            logoLink: !!logoLink
        });

        // Ensure nav bar stays on top and fixed
        gsap.set(navBar, {
            position: "fixed",
            top: 0,
            width: "100%", 
            zIndex: 999 // Very high z-index
        });

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
            start: "top top",
            markers: false
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
                start: "top 98%",
                end: `bottom bottom`,
                scrub: 1.5,
                markers: false,
                id: "master-timeline",
                onUpdate: self => {
                    console.log(`Progress: ${self.progress.toFixed(2)}`);
                    // Ensure nav stays visible during scroll
                    gsap.set(navBar, { 
                        opacity: 1, 
                        y: 0,
                        autoAlpha: 1,
                        visibility: "visible"
                    });
                    
                    // Direct logo animation on scroll - synced with stack section movement
                    const mainLogo = document.querySelector(".main-logo");
                    
                    if (mainLogo) {
                        // Get real-time progress value (0 to 1)
                        const progress = self.progress;
                        
                        // Simplified animation approach - directly tie logo position to scroll progress
                        // Rather than using complex state flags that can get stuck
                        if (progress <= 0.05) {
                            // At the beginning of scroll - logo stays in original position
                            // Completely clear any animation and restore to original state
                            gsap.killTweensOf(mainLogo);
                            gsap.set(mainLogo, {
                                clearProps: "all"
                            });
                            
                            console.log("Scroll near top: Logo at original position");
                        } 
                        else if (progress > 0.05 && progress < 0.95) {
                            // During scroll - fix the logo position and move it up
                            // Get the position only if we haven't already set it to fixed
                            if (mainLogo.style.position !== "fixed") {
                                console.log("Starting logo animation for scroll");
                                
                                // Get current position before making any changes
                                const logoRect = mainLogo.getBoundingClientRect();
                                
                                // Set to fixed position and immediately start animating 
                                // without initial delay by combining the two steps
                                gsap.set(mainLogo, {
                                    position: "fixed",
                                    top: logoRect.top + "px",
                                    left: "50%", 
                                    xPercent: -50,
                                    zIndex: 900
                                });
                                
                                // Now animate to target position - with faster start
                                gsap.to(mainLogo, {
                                    top: "-340px", // Move above viewport
                                    rotateZ: -5,
                                    duration: 1.2,
                                    ease: "expo.out",
                                    overwrite: true, // Force overwrite any existing animations
                                    immediateRender: true // Start rendering immediately
                                });
                            }
                        } 
                        else if (progress >= 0.95) {
                            // At the end of scroll - restore original position
                            console.log("Scroll near end: Restoring logo position");
                            
                            // Only reset if currently fixed (avoid redundant resets)
                            if (mainLogo.style.position === "fixed") {
                                gsap.killTweensOf(mainLogo);
                                
                                // Animate back with clean finish
                                gsap.to(mainLogo, {
                                    top: "auto",
                                    rotateZ: 0,
                                    duration: 0.6,
                                    ease: "power2.inOut",
                                    onComplete: function() {
                                        // Complete reset of styling
                                        gsap.set(mainLogo, {
                                            clearProps: "all"
                                        });
                                    }
                                });
                            }
                        }
                    }
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
                left: "-16vw",
                yPercent: 100,
                zIndex: 2 + index,
                rotationZ: 12,
                opacity: 0,
                filter: "brightness(1)"
            });
        });

        // Also set hero area to viewport width
        gsap.set(heroArea, {
            width: "100vw"
        });

        // Add each section to the master timeline with precise timing
        // The total scroll distance is divided into equal segments for each section
        const sectionCount = stackSections.length;
        const progressStep = 1 / sectionCount;
        
        stackSections.forEach((section, index) => {
            const timelinePosition = index === 0 ? 0 : index * progressStep - progressStep * 0.2;

            // Animate opacity to 1 quickly at the start of the section's scroll
            masterTimeline.to(section, {
                opacity: 1,
                duration: progressStep * 0.15, // reach full opacity in the first 15% of the scroll
                ease: "sine.out",
                immediateRender: false
            }, timelinePosition);

            // Animate in the section (left, yPercent, rotationZ)
            masterTimeline.to(section, {
                left: 0,
                yPercent: 0,
                rotationZ: 0,
                duration: progressStep,
                ease: "power2.out",
                immediateRender: false
            }, timelinePosition);

            // Animate previous section out (yPercent, brightness)
            if (index > 0) {
                const prevSection = stackSections[index - 1];
                
                // For all sections, we'll only change filter/brightness without y-movement
                masterTimeline.to(prevSection, {
                    yPercent: 0, // Keep all sections in place instead of moving up
                    filter: "brightness(0.7)",
                    duration: progressStep,
                    ease: "none",
                    immediateRender: false
                }, timelinePosition);
            }
            
            // Create animations for child elements within each section
            animateSectionChildren(section, index, timelinePosition, progressStep);
        });
        
        // Function to handle child element animations within sections
        function animateSectionChildren(section, sectionIndex, timelinePosition, progressStep) {
            // Find all child elements with animation classes
            const fadeElements = section.querySelectorAll('.section-fade');
            const slideUpElements = section.querySelectorAll('.section-slide-up');
            const slideLeftElements = section.querySelectorAll('.section-slide-right');
            const slideRightElements = section.querySelectorAll('.section-slide-left');
            const scaleElements = section.querySelectorAll('.section-scale');
            const rotateElements = section.querySelectorAll('.section-rotate');
            
            // Define the delay between each element in the same group
            const staggerDelay = 0.1;
            
            // Calculate when the section is fully visible (25% into its segment)
            const sectionVisiblePosition = timelinePosition + (progressStep * 0.25);
            
            // Initial state for all animated elements (set before any animation starts)
            gsap.set(fadeElements, { opacity: 0 });
            gsap.set(slideUpElements, { opacity: 0, y: 50 });
            gsap.set(slideLeftElements, { opacity: 0, x: -50 });
            gsap.set(slideRightElements, { opacity: 0, x: 50 });
            gsap.set(scaleElements, { opacity: 0, scale: 0.8 });
            gsap.set(rotateElements, { opacity: 0, rotation: -5 });
            
            // FADE IN ANIMATIONS
            if (fadeElements.length) {
                masterTimeline.to(fadeElements, {
                    opacity: 1,
                    duration: progressStep * 0.4,
                    stagger: staggerDelay,
                    ease: "power2.out",
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // SLIDE UP ANIMATIONS
            if (slideUpElements.length) {
                masterTimeline.to(slideUpElements, {
                    opacity: 1,
                    y: 0,
                    duration: progressStep * 0.4,
                    stagger: staggerDelay,
                    ease: "back.out(1.2)",
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // SLIDE LEFT TO RIGHT ANIMATIONS
            if (slideLeftElements.length) {
                masterTimeline.to(slideLeftElements, {
                    opacity: 1,
                    x: 0,
                    duration: progressStep * 0.4,
                    stagger: staggerDelay,
                    ease: "power2.out",
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // SLIDE RIGHT TO LEFT ANIMATIONS
            if (slideRightElements.length) {
                masterTimeline.to(slideRightElements, {
                    opacity: 1,
                    x: 0,
                    duration: progressStep * 0.4,
                    stagger: staggerDelay,
                    ease: "power2.out",
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // SCALE ANIMATIONS
            if (scaleElements.length) {
                masterTimeline.to(scaleElements, {
                    opacity: 1,
                    scale: 1,
                    duration: progressStep * 0.4,
                    stagger: staggerDelay,
                    ease: "back.out(1.4)",
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // ROTATE ANIMATIONS
            if (rotateElements.length) {
                masterTimeline.to(rotateElements, {
                    opacity: 1,
                    rotation: 0,
                    duration: progressStep * 0.4,
                    stagger: staggerDelay,
                    ease: "power2.out",
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // If not the last section, animate all elements out when leaving the section
            if (sectionIndex < stackSections.length - 1) {
                // Calculate when the section should start exiting (75% through its segment)
                const sectionExitPosition = timelinePosition + (progressStep * 0.75);
                
                // Group all animated elements for exit animation
                const allAnimatedElements = [
                    ...fadeElements, 
                    ...slideUpElements, 
                    ...slideLeftElements,
                    ...slideRightElements,
                    ...scaleElements,
                    ...rotateElements
                ];
                
                if (allAnimatedElements.length) {
                    // Animate out - fade out with slight movement
                    masterTimeline.to(allAnimatedElements, {
                        opacity: 0,
                        y: -20,
                        duration: progressStep * 0.3,
                        ease: "power1.in",
                        immediateRender: false
                    }, sectionExitPosition);
                }
            }
        }
        
        // Helper function to find all properly formatted section children
        function findSectionAnimatableElements() {
            const animationClasses = [
                '.section-fade',
                '.section-slide-up',
                '.section-slide-right',
                '.section-slide-left',
                '.section-scale',
                '.section-rotate'
            ];
            
            console.log('Looking for animatable elements in sections');
            stackSections.forEach((section, index) => {
                console.log(`Checking section ${index + 1}:`);
                animationClasses.forEach(className => {
                    const elements = section.querySelectorAll(className);
                    if (elements.length) {
                        console.log(`  - ${elements.length} ${className} elements found`);
                    }
                });
            });
        }
        
        // Log which elements will be animated
        findSectionAnimatableElements();

        // Skeleton hand animation - flickering effect
        try {
            console.log("Setting up skeleton hand animation");
            
            const skelehand = document.querySelector('.skelehand');
            const mainLogo = document.querySelector('.main-logo');
            
            if (skelehand && mainLogo) {
                // Position the skelehand relative to the main logo
                // Specifically above the 'e' and 'o' characters
                const logoRect = mainLogo.getBoundingClientRect();
                
                // Position the skeleton hand as shown in the screenshot - on the right side of the TV
                // Maintain the existing absolute positioning from Webflow, just add animation properties
                gsap.set(skelehand, {
                    zIndex: 910, // Above the main logo (which is 900)
                    opacity: 0.9
                    // Don't override the position values already set in Webflow
                });
                
                // Create a flicker effect 
                const flickerTl = gsap.timeline({
                    repeat: -1, // Repeat infinitely
                    repeatDelay: gsap.utils.random(5, 12) // Much longer delay between appearances
                });
                
                // Using random values for the flicker animation for more organic feel
                flickerTl
                    // Start invisible
                    .set(skelehand, {
                        opacity: 0
                    })
                    // Quick flicker sequence with complete disappearance
                    .to(skelehand, {
                        opacity: gsap.utils.random(0.7, 0.9),
                        duration: 0.08,
                        ease: "power1.inOut"
                    })
                    .to(skelehand, {
                        opacity: 0, // Completely disappear
                        duration: 0.06,
                        ease: "power1.in"
                    })
                    .to(skelehand, {
                        opacity: gsap.utils.random(0.8, 1),
                        duration: 0.03,
                        ease: "power1.out"
                    })
                    .to(skelehand, {
                        opacity: 0, // Completely disappear
                        duration: 0.05,
                        ease: "power1.in"
                    })
                    // Brief appearance
                    .to(skelehand, {
                        opacity: 1,
                        duration: 0.2,
                        ease: "none"
                    })
                    // Then disappear again
                    .to(skelehand, {
                        opacity: 0,
                        duration: 0.1,
                        ease: "power1.in",
                        delay: 0.3 // Short delay before disappearing
                    })
                    // Add subtle rotation during the animation
                    .to(skelehand, {
                        rotation: gsap.utils.random(-3, 3),
                        duration: 0.7,
                        ease: "sine.inOut"
                    }, "<0.2");
                
                // Create a separate timeline for occasional "glitch" effects
                const glitchTl = gsap.timeline({
                    repeat: -1,
                    repeatDelay: gsap.utils.random(8, 15) // Much less frequent than before
                });
                
                glitchTl
                    // Quick distortion effect
                    .to(skelehand, {
                        scale: gsap.utils.random(1.05, 1.1),
                        skewX: gsap.utils.random(-5, 5),
                        duration: 0.1,
                        ease: "power2.inOut",
                        opacity: gsap.utils.random(0.7, 0.9) // May be visible during glitch
                    })
                    .to(skelehand, {
                        scale: 1,
                        skewX: 0,
                        duration: 0.2,
                        ease: "elastic.out(1, 0.3)",
                        opacity: 0 // Always disappear after glitch
                    });
                
                console.log("Skeleton hand animation setup complete");
            } else {
                console.error("Skeleton hand or main logo element not found", {
                    skelehand: !!skelehand,
                    mainLogo: !!mainLogo
                });
            }
        } catch (error) {
            console.error("Error setting up skeleton hand animation:", error);
        }

        // Properly assign to the shared reference
        masterTimelineRef = masterTimeline;
        console.log("Master timeline created and assigned to reference:", !!masterTimelineRef);

        // Handle resize with debounce for better performance
        let resizeTimeout;
        window.addEventListener("resize", () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);

            // Store current scroll progress before resetting
            const currentProgress = masterTimelineRef ? masterTimelineRef.progress() : 0;
            
            // Store current scroll position
            const scrollPos = window.scrollY || window.pageYOffset;
            
            // Get existing elements before resetting
            const stackSections = document.querySelectorAll('.stack-section');
            const heroArea = document.querySelector('.hero-area');
            const mainWrapper = document.querySelector('.main-wrapper');
            const navBar = document.querySelector('.nav-bar-main');
            
            // Pause animations while resizing to avoid glitches
            if (masterTimelineRef) {
                masterTimelineRef.pause();
            }
            
            // Kill all ScrollTrigger instances to rebuild them
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.getAll().forEach(trigger => {
                    trigger.kill(true);
                });
            }
            
            // Kill any animations on elements
            gsap.killTweensOf([heroArea, ...stackSections, mainWrapper]);
            
            // Remove existing spacer if it exists (will be recreated)
            const oldSpacer = document.querySelector('.scroll-spacer');
            if (oldSpacer && oldSpacer.parentNode) {
                oldSpacer.parentNode.removeChild(oldSpacer);
            }
            
            // Only do the complete refresh/rebuild after a short debounce
            resizeTimeout = setTimeout(() => {
                try {
                    // Set common properties for all elements
                    gsap.set([heroArea, ...stackSections], {
                        width: "100vw",
                        height: "100vh"
                    });
                    
                    if (mainWrapper) {
                        gsap.set(mainWrapper, {
                            width: "100vw",
                            height: "auto",
                            overflow: "hidden"
                        });
                    }
                    
                    // Reset hero area
                    gsap.set(heroArea, {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        autoAlpha: 1,
                        zIndex: 1
                    });
                    
                    // Pin the hero section
                    ScrollTrigger.create({
                        trigger: heroArea,
                        pin: true,
                        pinSpacing: false,
                        start: "top top",
                        markers: false
                    });
                    
                    // Create new spacer for proper scrolling
                    const spacer = document.createElement('div');
                    spacer.className = "scroll-spacer";
                    // Reduce the height to require less scrolling (from 100vh per section to 70vh per section)
                    spacer.style.height = `${stackSections.length * 70}vh`;
                    mainWrapper.appendChild(spacer);
                    
                    // Create a master timeline for all sections
                    const masterTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: spacer,
                            start: "top 98%",
                            end: `bottom bottom`,
                            scrub: 1.5,
                            markers: false,
                            id: "master-timeline",
                            onUpdate: self => {
                                // Ensure nav stays visible during scroll
                                gsap.set(navBar, { 
                                    opacity: 1, 
                                    y: 0,
                                    autoAlpha: 1,
                                    visibility: "visible"
                                });
                                
                                // Direct logo animation on scroll
                                const mainLogo = document.querySelector(".main-logo");
                                
                                if (mainLogo) {
                                    const progress = self.progress;
                                    
                                    if (progress <= 0.05) {
                                        gsap.killTweensOf(mainLogo);
                                        gsap.set(mainLogo, {
                                            clearProps: "all"
                                        });
                                    } 
                                    else if (progress > 0.05 && progress < 0.95) {
                                        if (mainLogo.style.position !== "fixed") {
                                            const logoRect = mainLogo.getBoundingClientRect();
                                            
                                            gsap.set(mainLogo, {
                                                position: "fixed",
                                                top: logoRect.top + "px",
                                                left: "50%", 
                                                xPercent: -50,
                                                zIndex: 900
                                            });
                                            
                                            gsap.to(mainLogo, {
                                                top: "-340px",
                                                rotateZ: -5,
                                                duration: 1.2,
                                                ease: "expo.out",
                                                overwrite: true,
                                                immediateRender: true
                                            });
                                        }
                                    } 
                                    else if (progress >= 0.95) {
                                        if (mainLogo.style.position === "fixed") {
                                            gsap.killTweensOf(mainLogo);
                                            
                                            gsap.to(mainLogo, {
                                                top: "auto",
                                                rotateZ: 0,
                                                duration: 0.6,
                                                ease: "power2.inOut",
                                                onComplete: function() {
                                                    gsap.set(mainLogo, {
                                                        clearProps: "all"
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }
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
                            left: "-16vw",
                            yPercent: 100,
                            zIndex: 2 + index,
                            rotationZ: 12,
                            opacity: 0,
                            filter: "brightness(1)"
                        });
                    });
                    
                    // Add each section to the master timeline
                    const sectionCount = stackSections.length;
                    const progressStep = 1 / sectionCount;
                    
                    stackSections.forEach((section, index) => {
                        const timelinePosition = index === 0 ? 0 : index * progressStep - progressStep * 0.2;
                        
                        // Animate opacity to 1 quickly at the start of the section's scroll
                        masterTimeline.to(section, {
                            opacity: 1,
                            duration: progressStep * 0.15,
                            ease: "sine.out",
                            immediateRender: false
                        }, timelinePosition);
                        
                        // Animate in the section (left, yPercent, rotationZ)
                        masterTimeline.to(section, {
                            left: 0,
                            yPercent: 0,
                            rotationZ: 0,
                            duration: progressStep,
                            ease: "power2.out",
                            immediateRender: false
                        }, timelinePosition);
                        
                        // Animate previous section out (yPercent, brightness)
                        if (index > 0) {
                            const prevSection = stackSections[index - 1];
                            
                            // For all sections, we'll only change filter/brightness without y-movement
                            masterTimeline.to(prevSection, {
                                yPercent: 0,
                                filter: "brightness(0.7)",
                                duration: progressStep,
                                ease: "none",
                                immediateRender: false
                            }, timelinePosition);
                        }
                        
                        // Recreate child element animations
                        animateSectionChildren(section, index, timelinePosition, progressStep);
                    });
                    
                    // Assign to shared reference
                    masterTimelineRef = masterTimeline;
                    window.masterTimelineRef = masterTimelineRef;
                    
                    // Try to restore progress
                    if (currentProgress > 0) {
                        // Set the timeline to the previous progress position
                        masterTimeline.progress(currentProgress);
                        
                        // Also restore the scroll position
                        window.scrollTo(0, scrollPos);
                    }
                    
                    // Final refresh
                    ScrollTrigger.refresh(true);
                    console.log("Full animation rebuild complete after resize");
                } catch (error) {
                    console.error("Error during resize rebuild:", error);
                }
            }, 100);
        });
        
    } catch (error) {
        console.error("Error in scroll setup:", error);
        console.log("Stack sections found:", document.querySelectorAll(".stack-section").length);
    }

    // === NAVIGATION SCROLL & ACTIVE STATE LOGIC ===
    // Remove duplicate declarations - we already defined these at the top
    // const stackSectionsArr = Array.from(document.querySelectorAll('.stack-section'));
    // let masterTimelineRef = null; // Only declare this variable once, globally
    
    // Add click event for logo link - outside the ScrollToPlugin check
    document.addEventListener('click', function(e) {
        let logoLink = e.target.closest('');
        
        if (logoLink) {
            e.preventDefault();
            console.log('Logo link clicked - returning to hero area');
            console.log('Timeline reference available:', !!masterTimelineRef);
            
            // Check if we have stack sections
            if (stackSectionsArr.length === 0) {
                console.error("No stack sections found for animation");
                return;
            }
            
            // Get visible sections (those that have been animated in)
            const visibleSections = stackSectionsArr.filter(section => {
                const style = window.getComputedStyle(section);
                return style.opacity > 0.1 && style.visibility !== 'hidden';
            });
            
            console.log("Animating sections away:", visibleSections.length);
            
            // First kill all existing tweens to prevent conflicts
            gsap.killTweensOf(stackSectionsArr);
            
            // Also get the hero area for ensuring its visibility
            const heroArea = document.querySelector(".hero-area");
            if (!heroArea) {
                console.error("Hero area not found");
                return;
            }
            
            // Make sure hero area is visible and properly positioned
            gsap.set(heroArea, { 
                autoAlpha: 1,
                clearProps: "filter,transform"
            });
            
            // Create a seamless transition back to hero
            const exitTl = gsap.timeline({
                paused: true,
                onStart: () => {
                    // Disable ScrollTrigger at animation start
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.getAll().forEach(trigger => {
                            trigger.disable();
                        });
                    }
                    console.log("Starting reset animation");
                },
                onComplete: () => {
                    console.log("Animation complete, scrolling to top");
                    
                    // Scroll back to top with smooth behavior
                    window.scrollTo({
                        top: 0,
                        behavior: 'auto' // Use 'auto' instead of 'smooth' to avoid conflicts
                    });
                    
                    // After a small delay to ensure scroll is complete
                    setTimeout(() => {
                        try {
                            // Reset sections to their initial state with proper visibility
                            stackSectionsArr.forEach((section, index) => {
                                gsap.set(section, {
                                    position: "fixed",
                                    width: "100vw",
                                    height: "100vh",
                                    top: 0,
                                    left: "-16vw",
                                    yPercent: 100,
                                    rotationZ: 12,
                                    opacity: 0,
                                    filter: "brightness(1)",
                                    clearProps: "visibility,display",
                                    zIndex: 2 + index,
                                    display: "block"
                                });
                            });
                            // Reset hero area stacking
                            gsap.set(heroArea, {
                                zIndex: 1,
                                position: "relative"
                            });
                            
                            // Reset timeline progress for fresh animations next time
                            if (masterTimelineRef) {
                                masterTimelineRef.progress(0);
                                masterTimelineRef.pause();
                                console.log('Reset masterTimeline to beginning');
                            }
                            
                            // Re-enable ScrollTrigger with a refresh
                            if (typeof ScrollTrigger !== 'undefined') {
                                ScrollTrigger.getAll().forEach(trigger => {
                                    trigger.enable();
                                });
                                
                                // Force full refresh of all ScrollTrigger instances
                                ScrollTrigger.refresh(true);
                                ScrollTrigger.update();
                                console.log("Reset complete, ScrollTrigger re-enabled");
                            }
                        } catch (error) {
                            console.error('Error during reset:', error);
                        }
                    }, 200);
                }
            });
            
            // Now build the animation sequence for visible sections:
            if (visibleSections.length > 0) {
                // First animate rotation and fade
                exitTl.to(visibleSections, {
                    rotationZ: -5, // Slight counter-rotation
                    opacity: 0.8,
                    duration: 0.3,
                    ease: "power1.inOut",
                    stagger: 0.05
                })
                // Then animate sections moving out
                .to(visibleSections, {
                    yPercent: 100, // Move down
                    opacity: 0,
                    filter: "brightness(0.9)",
                    duration: 0.5,
                    ease: "power3.in",
                    stagger: 0.08
                }, "-=0.1")
                // After animation, hide stack sections and reveal hero area
                .add(() => {
                    visibleSections.forEach(section => {
                        gsap.set(section, {
                            display: "none",
                            zIndex: 0
                        });
                    });
                    gsap.set(heroArea, {
                        autoAlpha: 1,
                        zIndex: 1,
                        position: "relative"
                    });
                })
                // Make sure the hero area is properly shown
                .to(heroArea, {
                    autoAlpha: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }, "-=0.2");
            } else {
                // If no visible sections, just make sure hero is shown
                exitTl.to(heroArea, {
                    autoAlpha: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            // Play the animation
            exitTl.play();

            // Reset logo animation state when returning to hero via logo click
            const mainLogo = document.querySelector('.main-logo');
            if (mainLogo) {
                // Ensure all animations are killed
                gsap.killTweensOf(mainLogo);
                
                // Complete reset of logo state
                gsap.set(mainLogo, {
                    clearProps: "all",
                    opacity: 0
                });
                
                // Simple fade in
                gsap.to(mainLogo, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.inOut"
                });
            }
        }
    });
    
    // Ensure GSAP ScrollToPlugin is loaded
    if (typeof gsap !== 'undefined' && gsap.utils && gsap.plugins && gsap.plugins.ScrollToPlugin) {
        console.log('GSAP ScrollToPlugin is loaded:', typeof gsap.plugins.ScrollToPlugin !== 'undefined');
        // Get all nav links and stack sections
        const navLinks = document.querySelectorAll('.nav-bar-main .top-navlink');
        console.log('Nav links found:', navLinks);
        
        navLinks.forEach(link => {
            console.log('Nav link:', link, 'ID:', link.getAttribute('id'));
        });
        stackSectionsArr.forEach(section => {
            console.log('Section:', section, 'ID:', section.getAttribute('id'));
        });
    } else {
        console.warn('GSAP ScrollToPlugin not loaded. Nav-to-section and active state will not work.');
    }

    // Now the logo animation is handled directly in the ScrollTrigger onUpdate callback
    // When setting up masterTimeline, assign to window for access elsewhere if needed
    window.masterTimelineRef = masterTimelineRef;
}); 