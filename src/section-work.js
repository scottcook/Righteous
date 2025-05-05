import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initWorkScroll() {
    const section = document.querySelector('.section-work');
    if (!section) return;

    console.log('Initializing scroll animation for .section-work');

    // Set initial state of the section - only scale is reduced
    gsap.set(section, { scale: 0.9, y: '100vh' }); // Start positioned below the viewport

    // Create the ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom', // Start when the top of section reaches bottom of viewport
        end: 'top 30%',      // End when the top of section is 30% from top of viewport
        scrub: 1,         
        markers: false,
        onUpdate: function(self) {
            // Calculate how much section should move up
            const yProgress = Math.max(0, 1 - self.progress * 2); // Move section up faster in first half
            const yPosition = yProgress * 100; // Convert to vh units
            
            // Scale increases as section moves up
            const scaleValue = 0.9 + (0.1 * self.progress);
            
            // Apply the animation based on progress
            gsap.set(section, {
                scale: scaleValue,
                y: `${yPosition}vh`, // Move from 100vh to 0vh
                opacity: 1           // Always full opacity
            });
            
            // Apply heading animation when section becomes more visible (in upper half of viewport)
            if (self.progress > 0.5) {
                const headingProgress = (self.progress - 0.5) / 0.5; // Rescale for heading
                const heading = section.querySelector('.heading');
                if (heading) {
                    gsap.set(heading, {
                        opacity: headingProgress,
                        scale: 5 - (4 * headingProgress)
                    });
                }
            }
        }
    });

    // Ensure we clean up if needed
    return () => {
        scrollTrigger.kill();
    };
}
