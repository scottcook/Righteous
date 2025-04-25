/*
 * This file should be hosted at:
 * https://cdn.jsdelivr.net/gh/scottcook/Righteous@main/index.js
 */

// Wait for GSAP and SplitText to be available
function waitForGSAP() {
  return new Promise((resolve) => {
    const check = () => {
      if (window.gsap && window.SplitText && window.ScrollTrigger) {
        console.log('✅ GSAP, SplitText, and ScrollTrigger loaded');
        resolve();
      } else {
        console.log('⏳ Waiting for GSAP plugins...');
        setTimeout(check, 100);
      }
    };
    check();
  });
}

// Create our section transition function
function setupSectionTransitions() {
  const sections = document.querySelectorAll('.section-mask');
  
  sections.forEach((section, index) => {
    // Set initial state - rotated up and out of view
    gsap.set(section, {
      rotationX: 90,
      transformOrigin: "center top",
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden"
    });

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.parentElement,
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5, // Increased scrub for more inertia
        markers: false,
        onEnter: () => {
          section.style.willChange = "transform";
          gsap.set(section, { visibility: "visible" });
        },
        onLeave: () => {
          section.style.willChange = "auto";
        }
      }
    });

    // Main rotation animation
    tl.to(section, {
      rotationX: 0,
      duration: 2,
      ease: "power2.out",
    })
    // Subtle push effect
    .from(section, {
      y: "100%",
      scale: 0.95,
      duration: 2,
    }, 0);
  });

  // Ensure hero area stays above other sections initially
  gsap.set('.hero-area', {
    zIndex: 1
  });
}

// Initialize all animations
window.addEventListener('load', async () => {
  console.log('🚀 Starting animation setup...');
  
  // Wait for GSAP to be ready
  await waitForGSAP();
  
  // Register plugins
  gsap.registerPlugin(SplitText, ScrollTrigger);
  
  // Set initial states before creating timeline
  gsap.set('.hero-area', {
    visibility: 'visible',
    opacity: 0
  });

  // Set initial states for background video
  gsap.set(".bg-video", {
    width: "100vw",
    height: "100vh",
    opacity: 0,
    position: "fixed",
    top: 0,
    left: 0
  });

  // Set initial states for navigation
  gsap.set(".nav-bar-main", {
    y: -88,
    opacity: 0
  });

  gsap.set([".Nav Menu", ".Brand", ".top-navlink", ".Menu Button"], {
    opacity: 0
  });

  gsap.set([".main-logo", ".top-logo", ".cities-label"], {
    opacity: 0
  });
  
  // Create and play the main timeline
  const mainTimeline = gsap.timeline();
  setupHeroAnimations(mainTimeline);
  
  // Set up section transitions
  setupSectionTransitions();
  
  console.log('✅ All animations initialized');
});

// Hero animations setup
function setupHeroAnimations(timeline) {
  console.log('🎭 Setting up hero animations...');

  // Calculate center position (50% of viewport width)
  const centerPos = 50;
  
  // Animate the background video first
  timeline.to(".bg-video", {
    opacity: 1,
    duration: 0.5
  })
  .fromTo(".bg-video", {
    clipPath: `polygon(${centerPos}% 0, ${centerPos}% 100%, ${centerPos}% 100%, ${centerPos}% 0)`
  }, {
    clipPath: "polygon(0% 0, 0% 100%, 100% 100%, 100% 0)",
    duration: 2,
    ease: "power4.inOut"
  }, "<");

  // Get the main logo element
  const mainLogo = document.querySelector('.main-logo');
  if (mainLogo) {
    // Create the split text for main logo
    const mainLogoSplit = new SplitText(mainLogo, {
      type: "chars",
      position: "relative"
    });

    // Animate main logo
    timeline.to(".main-logo", {
      opacity: 1,
      duration: 0.5
    }, "-=1.5")
    .fromTo(mainLogoSplit.chars, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, "<");
  }

  // Animate nav-bar-main
  timeline.to(".nav-bar-main", {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.inOut"
  }, "-=0.5");

  // Set up top logo animation
  const topLogo = document.querySelector('.top-logo');
  if (topLogo) {
    const topLogoSplit = new SplitText(topLogo, {
      type: "chars,words",
      position: "relative"
    });

    timeline.to(".top-logo", {
      opacity: 1,
      duration: 0.5
    }, "-=0.8")
    .fromTo(topLogoSplit.chars, {
      opacity: 0,
      scale: 0,
      rotationX: -90
    }, {
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      stagger: {
        each: 0.05,
        from: "random"
      },
      ease: "back.out(1.7)"
    }, "<");
  }

  // Animate nav items
  timeline.to([".Nav Menu", ".Brand", ".top-navlink", ".Menu Button"], {
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.5");

  // Animate cities label
  timeline.to(".cities-label", {
    opacity: 1,
    duration: 1.2,
    ease: "power2.out"
  }, "-=0.5");

  // Animate the sticker
  timeline.fromTo('.sticker', 
    {
      opacity: 0,
      rotation: 180,
      scale: 0.5,
      y: -20
    },
    {
      opacity: 1,
      rotation: 0,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, "-=0.5"
  ).to('.sticker', {
    opacity: 0,
    rotation: 360,
    scale: 0.5,
    duration: 0.8,
    ease: 'back.in(1.7)',
    delay: 2,
    onComplete: () => {
      const sticker = document.querySelector('.sticker');
      if (sticker) sticker.remove();
    }
  });

  // Play the timeline
  timeline.play();
  
  return timeline;
}

