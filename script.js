// Import GSAP
import { gsap } from 'gsap';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    gsap.set('.main-logo', { opacity: 0 });
    
    // Create fade-in animation
    gsap.to('.main-logo', {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out'
    });
}); 