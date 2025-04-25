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
  
  // Kill any existing animations
  gsap.killTweensOf(".main-logo");
  gsap.killTweensOf(".bg-video");
  gsap.killTweensOf(".top-logo");
  gsap.killTweensOf(".sticker");
  gsap.killTweensOf(".nav-bar-main");
  gsap.killTweensOf(".Nav Menu");
  console.log('🧹 Killed any existing animations');

  // Create a GSAP timeline for hero animations
  const timeline = gsap.timeline();
  
  // Set up hero animations
  setupHeroAnimations(timeline);
  
  // Set up section transitions
  setupSectionTransitions();
  
  console.log('✅ All animations initialized');
});

// Hero animations setup
function setupHeroAnimations(timeline) {
  // Create separate timeline for nav bar animation
  const navTimeline = gsap.timeline();
  
  // Set initial state of nav bar and animate it
  gsap.set(".nav-bar-main", {
    y: -88,
    opacity: 1
  });

  gsap.set([".Nav Menu", ".Brand", ".top-navlink", ".Menu Button"], {
    opacity: 0
  });

  gsap.set(".top-logo", {
    opacity: 0
  });

  gsap.set(".cities-label", {
    opacity: 0
  });

  // Get the main logo element
  const mainLogo = document.querySelector('.main-logo');
  if (mainLogo) {
    const rect = mainLogo.getBoundingClientRect();
    console.log('📏 Initial logo position:', {
      top: rect.top,
      left: rect.left,
      transform: window.getComputedStyle(mainLogo).transform
    });

    // Force the logo to stay in its original position and set initial opacity
    gsap.set(".main-logo", {
      clearProps: "all",
      opacity: 1
    });

    // Create the split text for main logo
    const mainLogoSplit = new SplitText(mainLogo, {
      type: "chars",
      position: "relative"
    });

    // Set initial state of split characters
    gsap.set(mainLogoSplit.chars, {
      y: 50,
      opacity: 0
    });

    // Animate main logo split text characters
    timeline.to(mainLogoSplit.chars, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "back.out(1.7)",
    }, "+=0");
  }

  // Set up top logo animation
  const topLogo = document.querySelector('.top-logo');
  if (topLogo) {
    const topLogoSplit = new SplitText(topLogo, {
      type: "chars,words",
      position: "relative"
    });
    
    // Set initial state for top logo characters
    gsap.set(topLogoSplit.chars, {
      opacity: 0,
      scale: 0,
      rotationX: -90,
      transformOrigin: "50% 50%"
    });

    // Make sure the top logo container is visible
    gsap.set(".top-logo", {
      opacity: 1
    });

    // Animate top logo characters
    timeline.to(topLogoSplit.chars, {
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      stagger: {
        each: 0.05,
        from: "random"
      },
      ease: "back.out(1.7)"
    }, 1.2);
  }

  // Set initial state for sticker
  gsap.set('.sticker', {
    opacity: 0,
    rotation: 180,
    transformOrigin: 'center center',
    y: 0
  });

  // Calculate center position (50% of viewport width)
  const centerPos = 50;
  
  // Set initial state of background video container
  timeline.set(".bg-video", {
    width: "100vw",
    height: "100vh",
    opacity: 1,
    position: "fixed",
    top: 0,
    left: 0,
    clipPath: `polygon(${centerPos}% 0, ${centerPos}% 100%, ${centerPos}% 100%, ${centerPos}% 0)`
  });

  // Animate the background video container
  timeline.to(".bg-video", {
    clipPath: "polygon(0% 0, 0% 100%, 100% 100%, 100% 0)",
    duration: 2,
    ease: "power4.inOut"
  }, 0);

  // Animate nav-bar-main
  timeline.to(".nav-bar-main", {
    y: 0,
    duration: 1.2,
    ease: "power3.inOut"
  }, 0.5);

  // Animate nav items
  timeline.to([".Nav Menu", ".Brand", ".top-navlink", ".Menu Button"], {
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
  }, 1.3);

  // Animate cities label
  timeline.to(".cities-label", {
    opacity: 1,
    duration: 1.2,
    ease: "power2.out"
  }, ">");

  // Animate the sticker
  timeline.to('.sticker', {
    opacity: 1,
    rotation: 0,
    y: '2px',
    duration: 1.2,
    ease: 'power3.out'
  }, "-=0.5")
  .to('.sticker', {
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

  return timeline;
}

