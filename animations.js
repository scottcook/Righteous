// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for both DOM and Webflow
window.Webflow = window.Webflow || [];
window.Webflow.push(function() {
    console.log("Animation script initializing after Webflow ready");

    try {
        // Initialize SplitText for main logo - exact class from Webflow
        const mainLogoSplit = new SplitText(".main-logo", {
            type: "chars",
            position: "relative"
        });
        console.log("Main logo split:", mainLogoSplit.chars.length, "chars");

        // Initialize SplitText for top logo - exact class from Webflow
        const topLogoSplit = new SplitText(".top-logo", {
            type: "chars",
            position: "relative"
        });
        console.log("Top logo split:", topLogoSplit.chars.length, "chars");

        // Initialize SplitText for cities text - exact class from Webflow
        const citiesTextSplit = new SplitText(".text-block", {
            type: "chars",
            position: "relative"
        });
        console.log("Cities text split:", citiesTextSplit.chars.length, "chars");

        // Set initial states
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

        // Set initial state for nav links
        gsap.set(".top-navlink", {
            opacity: 0,
            y: 20
        });

        // Create and run animation timeline
        const mainTl = gsap.timeline();

        mainTl
            // Main logo animation
            .to(mainLogoSplit.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: 0.03,
                duration: 0.4,
                ease: "back.out(1.7)",
                onStart: () => console.log("Starting main logo animation")
            })

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
            }, "-=0.1");

    } catch (error) {
        console.error("Error in animation setup:", error);
        // Log all elements we're trying to animate
        console.log("Elements check:", {
            mainLogo: document.querySelector(".main-logo")?.innerHTML,
            topLogo: document.querySelector(".top-logo")?.innerHTML,
            cities: document.querySelector(".text-block")?.innerHTML,
            navLinks: Array.from(document.querySelectorAll(".top-navlink")).map(el => el.innerHTML)
        });
    }
}); 