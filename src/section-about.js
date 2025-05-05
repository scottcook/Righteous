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
            xPercent: -40, // Start from less far left side
            y: 40, 
            scale: 0.75, // Increased from 0.5 to make scale animation less dramatic
            transformOrigin: '10% 80%'
        });

        // Create a scroll-based animation for the team div container
        // Modify the trigger points to delay animation start
        ScrollTrigger.create({
            trigger: section,
            start: 'top 40%', // Delay start point (was 60%)
            end: 'top -10%',  // Extend end point for slower animation (was 20%)
            scrub: 2,         // Slow down animation by increasing scrub value (was 1)
            markers: false,
            onUpdate: function(self) {
                // Calculate the proportional values based on scroll progress
                const progress = self.progress;
                
                // Apply the synchronized values
                gsap.set(team, {
                    rotate: -14 + (14 * progress), // Rotate from -14 to 0
                    opacity: progress,
                    xPercent: -40 + (10 * progress), // Move from -40 to -30 (original final position)
                    y: 40 - (40 * progress), // Move up from 40 to 0
                    scale: 0.75 + (0.25 * progress), // Scale from 0.75 to 1 (less dramatic)
                });
            }
        });

        // Pre-set team images to be invisible
        const teamImages = [
            team.querySelector('.team1'),
            team.querySelector('.team2'),
            team.querySelector('.team3')
        ];
        gsap.set(teamImages, {opacity: 0, x: 0, y: 60, scale: 0.3, rotate: -45}); // Increased scale from 0 to 0.3
        
        // Create a scroll-synchronized animation for team images
        // Adjust timing to match the delayed team container animation
        ScrollTrigger.create({
            trigger: section,
            start: 'top 30%', // Delay start (was 50%)
            end: 'top -20%',  // Extend end for slower animation (was 0%)
            scrub: 2,         // Slow down animation (was 1)
            markers: false,
            onUpdate: function(self) {
                const progress = self.progress;
                
                // Define animation stages for each image
                teamImages.forEach((img, i) => {
                    const rotations = [-8, 4, 10]; // Final rotation values
                    
                    // Calculate when this image should start and end animating
                    // Stagger the start points so they animate in sequence
                    // Add more delay between images
                    const startPoint = 0.25 + (i * 0.2); // Increased delays (was 0.2 + i * 0.15)
                    const endPoint = startPoint + 0.35;   // Extend animation time (was 0.3)
                    
                    // Calculate this image's individual progress
                    let imgProgress = 0;
                    if (progress >= startPoint) {
                        imgProgress = Math.min(1, (progress - startPoint) / (endPoint - startPoint));
                    }
                    
                    // Apply properties based on image progress
                    if (imgProgress > 0) {
                        // Starting values
                        const startX = 0; 
                        const startY = 60;
                        const startScale = 0.3; // Increased from 0 to 0.3
                        const startRotate = -45;
                        
                        // Ending values
                        const endX = 280; // Reset to original value
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
                        x: 0,
                        y: 60,
                        scale: 0.3, // Increased from 0 to 0.3
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
                    xPercent: -40,
                    y: 40, 
                    scale: 0.75, // Increased from 0.5 to 0.75
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
    
    // Add new animation for transition to next section
    // This triggers an independent animation of elements inside section-about when section-work scrolls in
    const nextSection = document.querySelector('.section-work');
    if (nextSection) {
        // Create a scroll trigger that watches for the next section
        ScrollTrigger.create({
            trigger: nextSection,
            start: 'top 60%', // When section-work is 40% into the viewport
            markers: false,
            onEnter: function() {
                
                // Animate the team section upward
                if (team) {
                    gsap.to(team, {
                        y: "-=125", // Increased movement (was 40px)
                        duration: 1.4,
                        ease: "power2.out"
                    });
                    
                    // Also animate team images slightly
                    teamImages.forEach((img, i) => {
                        gsap.to(img, {
                            y: "-=45", // Increased movement (was 25px)
                            duration: 1.6,
                            delay: 0.1 * i, // Stagger the animations
                            ease: "power2.out"
                        });
                    });
                }
            },
            onLeaveBack: function() {
                // Reset when scrolling back up
    
                
                if (team) {
                    gsap.to(team, {
                        y: "+=125", // Match the upward movement
                        duration: 1.4,
                        ease: "power2.out"
                    });
                    
                    teamImages.forEach((img, i) => {
                        gsap.to(img, {
                            y: "+=45", // Match the upward movement
                            duration: 1.6,
                            delay: 0.1 * i,
                            ease: "power2.out"
                        });
                    });
                }
            }
        });
    }
}