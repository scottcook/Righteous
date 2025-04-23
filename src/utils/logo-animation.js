import gsap from './animation-setup';

export function animateLogoText() {
    // Select the logo element
    const logoElement = document.querySelector('.main-logo');
    
    if (!logoElement) {
        console.warn('Logo element not found');
        return;
    }

    // Create the SplitText instance
    const split = new gsap.SplitText(logoElement, {
        type: "chars",
        charsClass: "logo-char"
    });

    // Hide all characters initially
    gsap.set(split.chars, { 
        opacity: 0,
        y: 50
    });

    // Create the animation timeline
    const timeline = gsap.timeline({
        defaults: {
            ease: "back.out(1.7)",
            duration: 0.7
        }
    });

    // Animate each character
    timeline.to(split.chars, {
        opacity: 1,
        y: 0,
        stagger: {
            amount: 0.5, // Total time to stagger over
            from: "start" // Start from the first character
        }
    });

    // Optional: Add a subtle bounce effect after the main animation
    timeline.to(split.chars, {
        y: -10,
        stagger: {
            amount: 0.2,
            from: "start"
        }
    }).to(split.chars, {
        y: 0,
        stagger: {
            amount: 0.2,
            from: "start"
        }
    });

    return timeline;
}

// Function to revert the split text (useful for cleanup)
export function revertLogoAnimation() {
    const logoElement = document.querySelector('.main-logo');
    if (logoElement) {
        const split = new gsap.SplitText(logoElement);
        split.revert();
    }
} 