import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAboutScroll() {
    const section = document.querySelector('.section-about');
    if (!section) return;

    console.log('Initializing scroll animation for .section-about');

    // Initial values
    const startRotation = -20;
    const startY = 20;
    const endRotation = 0;
    const endY = 0;

    // Set initial state
    gsap.set(section, {
        scale: 0.85, 
        rotate: startRotation, 
        xPercent: -75, 
        yPercent: startY, 
        opacity: 1,
        transformOrigin: '60% 70%'
    });

    // Create a timeline for the about section entrance animations
    const tl = gsap.timeline({
        defaults: {duration: 5}, // ensure timeline length is normalized
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            markers: false,
            onUpdate: function(self) {
                // Calculate the proportional values based on scroll progress
                const progress = self.progress;
                const currentRotation = startRotation + (endRotation - startRotation) * progress;
                const currentY = startY + (endY - startY) * progress;
                
                // Apply the synchronized values
                gsap.set(section, {
                    rotate: currentRotation,
                    yPercent: currentY,
                    xPercent: -75 + (75 * progress),
                    scale: 0.85 + (0.15 * progress),
                    transformOrigin: progress < 0.5 ? '60% 70%' : '50% 50%'
                });
            }
        }
    });

    // Animate the .team div: rotate from -14deg to 0deg
    const team = section.querySelector('.team');
    if (team) {
        // Set initial position of team div to the left side of the viewport
        gsap.set(team, {
            rotate: -14, 
            opacity: 0, 
            xPercent: -80, // Start from the left side (outside viewport)
            y: 40, 
            scale: 0.5, 
            transformOrigin: '10% 80%'
        });

        // Create a scroll-based animation for the team div container
        ScrollTrigger.create({
            trigger: section,
            start: 'top 60%', // Start a bit after the main section animation begins
            end: 'top 20%',   // End before the main section animation completes
            scrub: true,      // Direct 1:1 synchronization with scroll
            markers: false,
            onUpdate: function(self) {
                // Calculate the proportional values based on scroll progress
                const progress = self.progress;
                
                // Apply the synchronized values
                gsap.set(team, {
                    rotate: -14 + (14 * progress), // Rotate from -14 to 0
                    opacity: progress,
                    xPercent: -80 + (50 * progress), // Move from left to final position
                    y: 40 - (40 * progress), // Move up from 40 to 0
                    scale: 0.5 + (0.5 * progress), // Scale from 0.5 to 1
                });
            }
        });

        // Pre-set team images to be invisible
        const teamImages = [
            team.querySelector('.team1'),
            team.querySelector('.team2'),
            team.querySelector('.team3')
        ];
        gsap.set(teamImages, {opacity: 0, x: -50, y: 60, scale: 0, rotate: -45});
        
        // Create a scroll-synchronized animation for team images
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%', // Start earlier for more scroll distance
            end: 'top 0%',    // End at the top of the viewport
            scrub: true,      // Direct 1:1 synchronization with scroll
            markers: false,
            onUpdate: function(self) {
                const progress = self.progress;
                
                // Define animation stages for each image
                teamImages.forEach((img, i) => {
                    const rotations = [-8, 4, 10]; // Final rotation values
                    
                    // Calculate when this image should start and end animating
                    // Stagger the start points so they animate in sequence
                    const startPoint = 0.2 + (i * 0.15); // Start points: 0.2, 0.35, 0.5
                    const endPoint = startPoint + 0.3;   // End animations over 30% of scroll
                    
                    // Calculate this image's individual progress
                    let imgProgress = 0;
                    if (progress >= startPoint) {
                        imgProgress = Math.min(1, (progress - startPoint) / (endPoint - startPoint));
                    }
                    
                    // Apply properties based on image progress
                    if (imgProgress > 0) {
                        // Starting values
                        const startX = -50;
                        const startY = 60;
                        const startScale = 0;
                        const startRotate = -45;
                        
                        // Ending values
                        const endX = 280;
                        const endY = 0;
                        const endScale = 1;
                        const endRotate = rotations[i];
                        
                        // Calculate current values based on progress
                        const currentX = startX + (endX - startX) * imgProgress;
                        const currentY = startY + (endY - startY) * imgProgress;
                        const currentScale = startScale + (endScale - startScale) * imgProgress;
                        const currentRotate = startRotate + (endRotate - startRotate) * imgProgress;
                        const currentOpacity = Math.min(1, imgProgress * 1.5); // Fade in slightly faster
                        
                        // Apply the values
                        gsap.set(img, {
                            x: currentX,
                            y: currentY,
                            scale: currentScale,
                            rotation: currentRotate,
                            opacity: currentOpacity
                        });
                    }
                });
            }
        });

        // Simplify the reset animation to match the scroll-based approach
        ScrollTrigger.create({
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            onLeaveBack: () => {
                // Reset when scrolling back to masthead
                teamImages.forEach((img, i) => {
                    gsap.to(img, {
                        opacity: 0,
                        x: -50,
                        y: 60,
                        scale: 0,
                        rotation: -45,
                        duration: 0.6,
                        ease: "expo.out",
                        delay: i * 0.2
                    });
                });
                
                // Reset the team container as well
                gsap.to(team, {
                    rotate: -14, 
                    opacity: 0,
                    xPercent: -80,
                    y: 40, 
                    scale: 0.5,
                    duration: 0.7,
                    ease: "expo.out"
                });
            },
            markers: false
        });

        // Remove the original timeline animations for team since we're handling it with ScrollTrigger now
    }

    // Animate the heading with scroll-based animation
    const heading = section.querySelector('.heading');
    if (heading) {
        // Set initial state
        gsap.set(heading, {opacity: 0, y: 60, scale: 1.0});
        
        // Create a scroll-based animation for the heading
        ScrollTrigger.create({
            trigger: section,
            start: 'top 30%', // Start later in the scroll sequence
            end: 'top 5%',   // End near the top of the viewport
            scrub: 1,
            markers: false,
            onUpdate: function(self) {
                // Calculate the proportional values based on scroll progress
                const progress = self.progress;
                
                // Apply the synchronized values
                gsap.set(heading, {
                    opacity: progress,
                    y: 60 - (60 * progress), // Move up from 60 to 0
                    scale: 1.0
                });
            }
        });
    }
}