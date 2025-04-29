/**
 * This file should be loaded from:
 * https://cdn.jsdelivr.net/gh/scottcook/Righteous@main/index.js
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
console.log("GSAP and ScrollTrigger registered");

// Scroll lock helper functions
function disableScroll() {
    // Get the current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Store current scroll position
    document.body.dataset.scrollTop = scrollTop;
    document.body.dataset.scrollLeft = scrollLeft;
    
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
    const scrollTop = parseInt(document.body.dataset.scrollTop || '0');
    const scrollLeft = parseInt(document.body.dataset.scrollLeft || '0');
    
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
    const navLinksSelector = ".nav-bar-main .top-navlink";
    
    // Create main timeline
    const mainTl = gsap.timeline();

    // Check if elements exist first
    const mainLogoElement = document.querySelector(mainLogoSelector);
    const topLogoElement = document.querySelector(topLogoSelector);
    
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

    // Don't run animations if elements aren't found
    if (!mainLogoElement || !topLogoElement) {
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
        
        console.log("SplitText initialized successfully with:");
        console.log("- Main logo chars:", mainLogoSplit.chars.length);
        console.log("- Top logo chars:", topLogoSplit.chars.length);

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
        
        gsap.set(navLinksSelector, {
            opacity: 0,
            y: 20
        });
        
        // Set the logo underline to always be visible but with lower opacity
        gsap.set(".logo-underline", {
            opacity: 0.6,
            scaleX: 0,
            height: 0.7,
            zIndex: 2000,
            transformOrigin: "left center",
     
        });
        
        console.log("Initial animation states set");

        // Animation Sequence for intro elements
        console.log("Starting animation sequence");
        // Disable scrolling during initial animations
        disableScroll();

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

            // Animate logo underline immediately
            .to(".logo-underline", {
                scaleX: 1,
                duration: 0.5,
                ease: "power2.out",
                onStart: () => console.log("Logo underline animation started")
            }, "-=1.0")

            // Animate top logo almost immediately - start as soon as main logo begins
            .to(topLogoSplit.chars, {
                opacity: 1,
                y: 0,
                stagger: 0.02, // Reduced stagger time
                duration: 0.5, // Reduced duration
                ease: "power2.out",
                onStart: () => console.log("Top logo animation started")
            }, "-=1.15") // Start almost immediately after main logo starts

            // Fade in navigation elements immediately after top logo starts
            .to(navLinksSelector, {
                opacity: 1,
                y: 0,
                duration: 0.6, // Shorter duration
                stagger: 0.1, // Reduced stagger for faster appearance
                ease: "power2.out",
                onStart: () => console.log("Nav links animation started"),
                onComplete: () => {
                    console.log("Nav links animation completed");
                    // The logo animation is now handled directly in the ScrollTrigger onUpdate callback
                    
                    // Enable scrolling after nav links animation completes
                    enableScroll();
                }
            }, "-=0.45"); // Start quickly after top logo animation starts

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
            zIndex: 1000
        });
        
        // Ensure logo-underline stays on top of stack sections
        const logoUnderline = document.querySelector(".logo-underline");
        if (logoUnderline) {
            // Set the logo-underline in a higher stacking context
            gsap.set(logoUnderline, {
                position: "relative",
                zIndex: 2000
            });
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
            start: "top top",
            markers: false
        });

        // Create new spacer for proper scrolling
        const spacer = document.createElement('div');
        spacer.className = "scroll-spacer";
        // Since we only have one active stack-section, use a fixed height instead of multiplying by length
        spacer.style.height = "120vh";
        mainWrapper.appendChild(spacer);

        // Create a master timeline for all sections
        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: spacer,
                start: "top 98%",
                end: `bottom bottom`,
                scrub: 2.1,
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
                    
                    // Get progress value for animations
                    const progress = self.progress;
                    
                    // Add color change for top logo and navigation based on scroll position
                    const topLogo = document.querySelector(".top-logo");
                    const navLinks = document.querySelectorAll(".top-navlink");
                    const logoUnderline = document.querySelector(".logo-underline");
                    
                    // Check if we're in the hero area (progress near 0) or in a stack section
                    if (progress < 0.05) {
                        // In hero area - tween to white
                        gsap.to([topLogo, navLinks], {
                            color: "white",
                            duration: 0.3,
                            ease: "power2.out",
                            overwrite: true
                        });
                        
                        // Logo underline to white with reduced opacity
                        gsap.to(logoUnderline, {
                            backgroundColor: "white",
                            opacity: 0.3,
                            duration: 0.3,
                            ease: "power2.out",
                            overwrite: true
                        });
                    } else {
                        // In a stack section - tween to black
                        gsap.to([topLogo, navLinks], {
                            color: "#0B0B0B",
                            duration: 0.3,
                            ease: "power2.out",
                            overwrite: true
                        });
                        
                        // Logo underline to black with reduced opacity
                        gsap.to(logoUnderline, {
                            backgroundColor: "#0B0B0B",
                            opacity: 0.3,
                            duration: 0.3,
                            ease: "power2.out",
                            overwrite: true
                        });
                    }
                    
                    // Direct logo animation on scroll
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

        // Ensure logo underline remains visible during scroll but with correct opacity
        ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            onUpdate: function(self) {
                // Keep logo underline visible at all times but with reduced opacity
                gsap.set(".logo-underline", { opacity: 0.3 });
            }
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
            // MAJOR CHANGE: Adjust how sections are positioned in the timeline
            // Ensure each section is almost completely visible before the next appears
            // Previously used formula: index === 0 ? 0 : index * progressStep - progressStep * 0.2
            // New formula: Places sections further apart in the timeline
            const timelinePosition = index * progressStep;

            // Animate opacity to 1 very quickly at the start of the section's scroll
            masterTimeline.to(section, {
                opacity: 1,
                duration: progressStep * 0.1, // Even quicker fade-in (previously 0.15)
                ease: "power1.out", // Simpler ease
                immediateRender: false
            }, timelinePosition);

            // Animate in the section (left, yPercent, rotationZ) MUCH FASTER
            masterTimeline.to(section, {
                left: 0,
                yPercent: 0,
                rotationZ: 0,
                duration: progressStep * 0.3, // Very quick transition (previously progressStep * 1.5)
                ease: "power3.out", // Strong ease out for quick entrance
                immediateRender: false
            }, timelinePosition);

            // Animate previous section out (yPercent, brightness)
            if (index > 0) {
                const prevSection = stackSections[index - 1];
                
                // IMPORTANT: Only start transitioning the previous section after it's been fully visible
                // Use a delayed position to make sure previous section stays fully visible longer
                const prevExitPosition = timelinePosition - (progressStep * 0.1); // Only start exit near the end
                
                masterTimeline.to(prevSection, {
                    yPercent: 0, // Keep all sections in place instead of moving up
                    filter: "brightness(0.7)",
                    duration: progressStep * 0.2, // Quick brightness change
                    ease: "power1.in",
                    immediateRender: false
                }, prevExitPosition);
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
            
            // Define the delay between each element in the same group - increased for more visible stagger
            const staggerDelay = 0.22;
            
            // CHANGE: Start animations much earlier - as the section starts coming into view
            // Changed from: timelinePosition + (progressStep * 0.25)
            // To: timelinePosition + (progressStep * 0.05)
            const sectionVisiblePosition = timelinePosition + (progressStep * 0.04);
            
            // Initial state for all animated elements - enhanced with rotation and offsets
            gsap.set(fadeElements, { 
                opacity: 0, 
                x: -100, 
                y: 80, 
                rotationZ: 10, 
                transformOrigin: "left bottom" 
            }); // Changed to slide from lower left with rotation
            gsap.set(slideUpElements, { opacity: 0, y: 80, rotationX: 6 }); // Increased y offset, added X rotation
            gsap.set(slideLeftElements, { opacity: 0, x: -80, rotationZ: -4 }); // Increased x offset, added Z rotation
            gsap.set(slideRightElements, { opacity: 0, x: 80, rotationZ: 4 }); // Increased x offset, added Z rotation
            gsap.set(scaleElements, { opacity: 0, scale: 0.7, rotationY: 8 }); // Smaller scale, added Y rotation
            gsap.set(rotateElements, { opacity: 0, rotation: -8 }); // Increased initial rotation
            
            // Completely reimagined FADE IN ANIMATIONS - now sliding from lower left with exaggerated easing
            if (fadeElements.length) {
                masterTimeline.to(fadeElements, {
                    opacity: 1,
                    x: 0, 
                    y: 0,
                    rotationZ: 0,
                    duration: progressStep * 0.6, // Longer duration for more dramatic effect
                    stagger: staggerDelay * 1.5, // Increased stagger
                    ease: "expo.out(1, 0.7)", // Exaggerated elastic easing for bouncy inertia effect
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // Enhanced SLIDE UP ANIMATIONS with perspective and rotation
            if (slideUpElements.length) {
                masterTimeline.to(slideUpElements, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0, // Return to normal rotation
                    duration: progressStep * 0.45, // Slightly longer for more dramatic effect
                    stagger: staggerDelay,
                    ease: "back.out(1.4)", // Increased back effect for more bounce
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // Enhanced SLIDE LEFT TO RIGHT ANIMATIONS with rotation
            if (slideLeftElements.length) {
                masterTimeline.to(slideLeftElements, {
                    opacity: 1,
                    x: 0,
                    rotationZ: 0, // Return to normal rotation
                    duration: progressStep * 0.45,
                    stagger: staggerDelay,
                    ease: "back.out(1.2)",
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // Enhanced SLIDE RIGHT TO LEFT ANIMATIONS with rotation
            if (slideRightElements.length) {
                masterTimeline.to(slideRightElements, {
                    opacity: 1,
                    x: 0,
                    rotationZ: 0, // Return to normal rotation
                    duration: progressStep * 0.45,
                    stagger: staggerDelay,
                    ease: "back.out(1.2)",
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // Enhanced SCALE ANIMATIONS with rotation
            if (scaleElements.length) {
                masterTimeline.to(scaleElements, {
                    opacity: 1,
                    scale: 1,
                    rotationY: 0, // Return to normal rotation
                    duration: progressStep * 0.45,
                    stagger: staggerDelay,
                    ease: "back.out(1.7)", // Increased elastic effect
                    immediateRender: false
                }, sectionVisiblePosition);
            }
            
            // Enhanced ROTATE ANIMATIONS with more dramatic initial rotation
            if (rotateElements.length) {
                masterTimeline.to(rotateElements, {
                    opacity: 1,
                    rotation: 0,
                    duration: progressStep * 0.45,
                    stagger: staggerDelay,
                    ease: "back.out(1.5)", // Added back effect for more spring
                    immediateRender: false
                }, sectionVisiblePosition);
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
            console.log("Checking for skeleton hand element");
            
            const skelehand = document.querySelector('.skelehand');
            const mainLogo = document.querySelector('.main-logo');
            
            if (skelehand && mainLogo) {
                console.log("Setting up skeleton hand animation");
                // Position the skelehand relative to the main logo
                const logoRect = mainLogo.getBoundingClientRect();
                
                // Add animation code for skeleton hand
                gsap.set(skelehand, {
                    zIndex: 910, // Above the main logo (which is 900)
                    opacity: 0.9
                });
                
                // Create a flicker effect 
                const flickerTl = gsap.timeline({
                    repeat: -1, // Repeat infinitely
                    repeatDelay: gsap.utils.random(5, 12)
                });
                
                flickerTl
                    .set(skelehand, { opacity: 0 })
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
                console.log("Skeleton hand element not found - skipping animation");
            }
        } catch (error) {
            console.error("Error setting up skeleton hand animation:", error);
        }

        // Properly assign to the shared reference
        masterTimelineRef = masterTimeline;
        console.log("Master timeline created and assigned to reference:", !!masterTimelineRef);

        // Handle resize with debounce for better performance
        let resizeTimeout;
        let isResizing = false; // Flag to track active resize
        
        window.addEventListener("resize", () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            
            // Set resizing flag to prevent ScrollTrigger conflicts
            if (!isResizing) {
                isResizing = true;
                
                // Store current scroll progress and position
                const currentProgress = masterTimelineRef ? masterTimelineRef.progress() : 0;
                const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                
                // CRITICAL: Pause the timeline to prevent flickers during resize
                if (masterTimelineRef) {
                    masterTimelineRef.pause();
                }

                console.log(`Resize started: Progress ${currentProgress.toFixed(2)}`);
                
                // Pause all animations immediately
                ScrollTrigger.getAll().forEach(trigger => {
                    trigger.pause();
                });
            }
            
            // Only execute the resize logic after a short debounce
            resizeTimeout = setTimeout(() => {
                try {
                    console.log("Resize handling complete, restoring animation state");
                    
                    // Get current progress and position again in case they changed
                    const currentProgress = masterTimelineRef ? masterTimelineRef.progress() : 0;
                    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // Simplify resize handling - allow ScrollTrigger's built-in resize handling to work
                    // without adding additional complexity
                    
                    // Simply refresh ScrollTrigger
                    ScrollTrigger.refresh();
                    
                    // After refresh, restore timeline progress
                    setTimeout(() => {
                        // First ensure the scroll position is maintained
                        window.scrollTo(0, scrollPosition);
                        
                        // Re-enable and resume all ScrollTrigger instances
                        ScrollTrigger.getAll().forEach(trigger => {
                            trigger.enable();
                            trigger.refresh();
                        });
                        
                        // Then restore the timeline progress if needed
                        if (masterTimelineRef && currentProgress > 0) {
                            masterTimelineRef.progress(currentProgress);
                            masterTimelineRef.resume();
                            console.log("Progress restored:", currentProgress);
                        }
                        
                        // Reset resizing flag
                        isResizing = false;
                    }, 100);
                    
                } catch (error) {
                    // Reset the flag even in case of errors
                    isResizing = false;
                    console.error("Error during resize handling:", error);
                    
                    // Try to recover as best as possible
                    ScrollTrigger.refresh();
                    if (masterTimelineRef) {
                        masterTimelineRef.resume();
                    }
                }
            }, 250); // Debounce delay
        });
        
        // Create a resize check in the ScrollTrigger onUpdate callback
        const originalOnUpdate = masterTimeline.scrollTrigger.onUpdate;
        masterTimeline.scrollTrigger.onUpdate = self => {
            // Skip updates during active resize to prevent glitches
            if (!isResizing) {
                originalOnUpdate(self);
            }
        };

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