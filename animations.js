// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for both DOM and Webflow
window.Webflow = window.Webflow || [];
window.Webflow.push(function() {
    console.log("Animation script initializing after Webflow ready");

    try {
        // First, ensure nav bar and background are visible
        gsap.set(".nav-bar-main", { opacity: 1 });
        gsap.set(".background-video-wrapper", { opacity: 0 }); // Start background hidden
        gsap.set(".nav-underline", { 
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
            // Background video fade in
            .to(".background-video-wrapper", {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut"
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
            }, "-=1.5")

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

            // Nav underline animation
            .to(".nav-underline", {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut"
            }, "-=0.3");

        // Log the current state of key elements
        console.log("Element visibility check:", {
            navBar: document.querySelector(".nav-bar-main")?.style.opacity,
            background: document.querySelector(".background-video-wrapper")?.style.opacity,
            underline: document.querySelector(".nav-underline")?.style.transform,
            topLogo: document.querySelector(".top-logo")?.style.opacity
        });

    } catch (error) {
        console.error("Error in animation setup:", error);
        console.log("Elements check:", {
            mainLogo: document.querySelector(".main-logo")?.innerHTML,
            topLogo: document.querySelector(".top-logo")?.innerHTML,
            cities: document.querySelector(".text-block")?.innerHTML,
            navLinks: Array.from(document.querySelectorAll(".top-navlink")).map(el => el.innerHTML),
            navBar: document.querySelector(".nav-bar-main"),
            background: document.querySelector(".background-video-wrapper"),
            underline: document.querySelector(".nav-underline")
        });
    }
}); 