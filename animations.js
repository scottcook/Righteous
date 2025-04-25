// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Wait for DOM content and web fonts to load
document.addEventListener("DOMContentLoaded", function() {
    // Create main timeline
    const mainTl = gsap.timeline();

    // Initialize SplitText
    const mainLogoSplit = new SplitText(".main-logo", {type: "chars, words"});
    const topLogoSplit = new SplitText(".top-logo", {type: "chars, words"});
    const citiesTextSplit = new SplitText(".cities .Text-Block", {type: "chars, words"});

    // Set initial states
    gsap.set([".hero-area", ".main-logo-container", ".logo-underline", ".nav-bar-main", 
              ".logo-lockup", ".cities", ".Navbar", ".sticker"], {
        opacity: 0
    });

    // Set initial state for bg-video mask
    gsap.set(".bg-video", {
        clipPath: "circle(0% at center)",
        opacity: 1
    });

    // Animation Sequence
    mainTl
        // First: Unmask the background video
        .to(".bg-video", {
            clipPath: "circle(100% at center)",
            duration: 2,
            ease: "power2.inOut"
        })

        // Fade in main container
        .to(".hero-area", {
            opacity: 1,
            duration: 0.5
        })

        // Animate main logo container
        .to(".main-logo-container", {
            opacity: 1,
            duration: 0.5
        })
        
        // Animate main logo text characters
        .from(mainLogoSplit.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.05,
            duration: 0.8,
            ease: "back.out(1.7)"
        })

        // Animate logo underline
        .to(".logo-underline", {
            opacity: 1,
            width: "100%",
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")

        // Animate top logo in logo-lockup
        .to(".logo-lockup", {
            opacity: 1,
            duration: 0.5
        })
        .from(topLogoSplit.chars, {
            opacity: 0,
            y: 30,
            stagger: 0.03,
            duration: 0.5,
            ease: "power2.out"
        })

        // Animate cities text
        .to(".cities", {
            opacity: 1,
            duration: 0.5
        })
        .from(citiesTextSplit.chars, {
            opacity: 0,
            y: 20,
            stagger: 0.02,
            duration: 0.4,
            ease: "power2.out"
        })

        // Fade in navigation elements
        .to([".nav-bar-main", ".Navbar"], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4")

        // Finally, animate in the sticker
        .to(".sticker", {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.2");
}); 