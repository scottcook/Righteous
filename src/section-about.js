import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAboutScroll() {
    const section = document.querySelector('.section-about');
    if (!section) return;

    console.log('Initializing scroll animation for .section-about');

    const tl = gsap.timeline({
        defaults: {duration: 5}, // ensure timeline length is normalized
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            markers: false
        }
    });

    // Animate the section itself
    tl.fromTo(section, 
        {
            scale: 0.85, 
            rotate: -20, 
            xPercent: -75, 
            yPercent: 20, 
            opacity: 1,
            transformOrigin: '60% 70%'
        }, 
        {
            rotate: 0, 
            xPercent: 0, 
            yPercent: 0, 
            scale: 1, 
            opacity: 1,
            ease: 'power2.out', 
            transformOrigin: '50% 50%'
        }
    );

    // Animate the .team div: rotate from -14deg to 0deg
    const team = section.querySelector('.team');
    if (team) {
        tl.fromTo(team, 
            {rotate: -14, opacity: 0, y: 40, scale: 0.5, transformOrigin: '10% 80%'},
            {rotate: 0, opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out'},
            2.7 // Increased delay for team animation
        );

        // Animate each team image with unique final rotation (like fanned cards)
        const teamImages = [
            team.querySelector('.team1'),
            team.querySelector('.team2'),
            team.querySelector('.team3')
        ];
        const rotations = [-8, 4, 10];
        tl.from(teamImages, {
            opacity: 0,
            y: 60,
            x: 280,
            scale: 0.95,
            duration: 1.8,
            stagger: 1.6,
            delay: 0.5, // Add base delay for all images including the first one
            ease: 'power2.out',
            onComplete: () => {
                teamImages.forEach((img, i) => {
                    gsap.to(img, {rotate: rotations[i], duration: 0.6, ease: 'power2.out'});
                });
            }
        }, 3.2); // Increased start time to be well after team div animation

        // Animate images back to original position when scrolling back to masthead
        ScrollTrigger.create({
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            onLeaveBack: () => {
                // Reset when scrolling back to masthead
                teamImages.forEach((img) => {
                    gsap.to(img, {
                        y: 60,
                        opacity: 0,
                        scale: 0.95,
                        rotate: 0,
                        duration: 0.9,
                        ease: 'power4.inOut'
                    });
                });
                
                // Reset the team container as well
                gsap.to(team, {
                    rotate: -14, 
                    opacity: 0, 
                    y: 40, 
                    scale: 0.5,
                    duration: 0.9,
                    ease: 'power4.inOut'
                });
            },
            onEnter: () => {
                // First animate the team container
                gsap.to(team, {
                    rotate: 0, 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 1.2,
                    ease: 'power2.out'
                });
                
                // Then animate each image with staggered delay
                teamImages.forEach((img, i) => {
                    gsap.to(img, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotate: rotations[i],
                        duration: 0.7,
                        ease: 'power4.out',
                        delay: 0.8 + (i * 1) // Increased delay after team container animates
                    });
                });
            },
            markers: false
        });
    }

    // This will be based on the duration above so till start at 3s and animate the last 2s.
    tl.from(section.querySelector('.heading'), {opacity: 1, scale: 1.0, y: 60, duration: 2, ease: 'power2.out', delay: 1}, 4);
}
