// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for both DOM and Webflow
window.Webflow = window.Webflow || [];
window.Webflow.push(function() {
    console.log("Animation script initializing after Webflow ready");

    try {
        // First, ensure nav bar is visible immediately
        gsap.set(".nav-bar-main", { opacity: 1 });
        
        // Set initial states for background and underline
        gsap.set(".bg-video", { 
            opacity: 0,
            visibility: "visible"
        });
        
        gsap.set(".logo-underline", { 
            opacity: 1,
            scaleX: 0,
            transformOrigin: "left center"
        });
        
        console.log("Set initial visibility states");

        // Initialize SplitText for main logo
        const mainLogoSplit = new SplitText(".main-logo", {
            type: "chars",
            position: "relative"
        });
        console.log("Main logo split:", mainLogoSplit.chars.length, "chars");

        // Initialize SplitText for top logo
        const topLogoSplit = new SplitText(".top-logo", {
            type: "chars",
            position: "relative"
        });
        console.log("Top logo split:", topLogoSplit.chars.length, "chars");

        // Initialize SplitText for cities text
        const citiesTextSplit = new SplitText(".text-block", {
            type: "chars",
            position: "relative"
        });
        console.log("Cities text split:", citiesTextSplit.chars.length, "chars");

        // Set initial states for animations
        gsap.set(mainLogoSplit.chars, { 
            opacity: 0,
            y: 50,
            rotateX: -90
        });

        gsap.set(topLogoSplit.chars, {
            opacity: 0,
            y: 30,
            rotateX: -60
        });

        gsap.set(citiesTextSplit.chars, {
            opacity: 0,
            y: 20,
            rotateX: -30
        });

        gsap.set(".top-navlink", {
            opacity: 0,
            y: 20
        });

        // Create and run animation timeline
        const mainTl = gsap.timeline();

        mainTl
            // Background video fade in first
            .to(".bg-video", {
                opacity: 1,
                duration: 1.5,
                ease: "power2.inOut",
                onStart: () => console.log("Starting background fade in")
            })

            // Main logo animation
            .to(mainLogoSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.03,
                duration: 0.4,
                ease: "back.out(1.7)",
                onStart: () => console.log("Starting main logo animation")
            }, "-=0.8")

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
            }, "-=0.2")

            // Cities text animation
            .to(citiesTextSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.02,
                duration: 0.3,
                ease: "back.out(1.7)"
            }, "-=0.2")

            // Nav links animation
            .to(".top-navlink", {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "power2.out"
            }, "-=0.1")

            // Logo underline animation
            .to(".logo-underline", {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                    // Double check final states
                    console.log("Animation sequence complete, checking final states");
                    console.log("Final visibility check:", {
                        bgVideo: document.querySelector(".bg-video")?.style.opacity,
                        underline: document.querySelector(".logo-underline")?.style.transform
                    });
                }
            }, "-=0.3");

        // Log the current state of key elements
        console.log("Element visibility check:", {
            navBar: document.querySelector(".nav-bar-main")?.style.opacity,
            background: document.querySelector(".bg-video")?.style.opacity,
            underline: document.querySelector(".logo-underline")?.style.transform,
            topLogo: document.querySelector(".top-logo")?.style.opacity
        });

        // Initialize stacking sections AFTER hero animation
        mainTl.eventCallback("onComplete", () => {
            console.log("Hero animation complete, initializing section animations");
            initStackingSections();
        });

    } catch (error) {
        console.error("Error in animation setup:", error);
        console.log("Elements check:", {
            mainLogo: document.querySelector(".main-logo")?.innerHTML,
            topLogo: document.querySelector(".top-logo")?.innerHTML,
            cities: document.querySelector(".text-block")?.innerHTML,
            navLinks: Array.from(document.querySelectorAll(".top-navlink")).map(el => el.innerHTML),
            navBar: document.querySelector(".nav-bar-main"),
            background: document.querySelector(".bg-video"),
            underline: document.querySelector(".logo-underline")
        });
    }
});

// Stacking Sections Animation
function initStackingSections() {
    console.log("Initializing stacking sections");

    // Debug DOM structure
    console.log("Main wrapper exists:", !!document.querySelector('.main-wrapper'));
    console.log("Hero area exists:", !!document.querySelector('.hero-area'));
    console.log("Stack sections found:", document.querySelectorAll('.stack-section').length);
    console.log("DOM Structure:", document.body.innerHTML);

    // Add scroll spacer if it doesn't exist
    if (!document.querySelector('.scroll-spacer')) {
        const spacer = document.createElement('div');
        spacer.className = 'scroll-spacer';
        document.querySelector('.main-wrapper').appendChild(spacer);
        console.log("Added scroll spacer");
    }

    const sections = gsap.utils.toArray('.stack-section');
    console.log("Found stack sections:", sections.length);

    // Debug section positions
    sections.forEach((section, i) => {
        console.log(`Section ${i + 1} initial z-index:`, getComputedStyle(section).zIndex);
    });

    // Set initial states with explicit z-indexing
    sections.forEach((section, i) => {
        gsap.set(section, {
            yPercent: 100,
            rotateX: 15,
            opacity: 1,
            zIndex: i + 2,
            transformPerspective: 1000
        });
        console.log(`Set initial state for section ${i + 1}`);
    });

    // Create the main timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main-wrapper",
            start: "top top",
            end: "+=400%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            markers: true,
            onUpdate: (self) => {
                console.log("Scroll progress:", self.progress.toFixed(2));
            },
            onToggle: (self) => {
                console.log("ScrollTrigger toggled:", self.isActive);
            }
        }
    });

    // Add each section to the timeline with logging
    sections.forEach((section, i) => {
        console.log(`Adding section ${i + 1} to timeline`);
        tl.to(section, {
            yPercent: 0,
            rotateX: 0,
            ease: "none",
            duration: 1,
            onStart: () => console.log(`Section ${i + 1} animation starting`),
            onComplete: () => console.log(`Section ${i + 1} animation complete`)
        }, i);
    });

    // Pin hero area separately
    ScrollTrigger.create({
        trigger: ".hero-area",
        start: "top top",
        endTrigger: ".main-wrapper",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        onToggle: (self) => {
            console.log("Hero pin state:", self.isActive);
        }
    });

    // Force a refresh of ScrollTrigger
    ScrollTrigger.refresh();
    console.log("ScrollTrigger refreshed");

    // Create and append mask containers
    sections.forEach((section, index) => {
        // Create and append mask container
        const maskContainer = document.createElement('div');
        maskContainer.className = 'mask-container';
        maskContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #000;
            transform: translateY(100%);
        `;
        
        // Wrap section content in the mask container
        section.appendChild(maskContainer);
        
        // Move original content into mask container
        while (section.firstChild !== maskContainer) {
            maskContainer.appendChild(section.firstChild);
        }
        
        // Create animation for each section
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            markers: true, // Helpful for debugging, remove in production
            onEnter: () => {
                gsap.to(maskContainer, {
                    y: '0%',
                    duration: 1.5,
                    ease: 'power4.inOut'
                });
            },
            onLeaveBack: () => {
                gsap.to(maskContainer, {
                    y: '100%',
                    duration: 1.5,
                    ease: 'power4.inOut'
                });
            }
        });
    });
}

// Initialize all animations
window.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Content Loaded");
  
  // Initialize existing animations
  try {
    // ... existing initialization code ...
    
    // Initialize stacking sections
    initStackingSections();
    console.log("Stack sections initialization complete");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}); 