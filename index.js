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

// GSAP animation for .main-logo element on window load
window.addEventListener("load", async () => {
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

  // Create a GSAP timeline
  const timeline = gsap.timeline();
  
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
  const rect = mainLogo.getBoundingClientRect();
  console.log('📏 Initial logo position:', {
    top: rect.top,
    left: rect.left,
    transform: window.getComputedStyle(mainLogo).transform
  });

  // Force the logo to stay in its original position and set initial opacity
  gsap.set(".main-logo", {
    clearProps: "all", // Clear all GSAP-controlled properties
    opacity: 1 // Ensure we start from 0 opacity
  });

  // Set initial state for sticker
  gsap.set('.sticker', {
    opacity: 0,
    rotation: 180,
    transformOrigin: 'center center',
    y: 0 // Ensure we start from original position
  });

  // Set up top logo animation
  const topLogo = document.querySelector('.top-logo');
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

  // Calculate center position (50% of viewport width)
  const centerPos = 50;
  
  // Set initial state of background video container
  timeline.set(".bg-video", {
    width: "100vw", // Set full width immediately
    // height: "45vh",  Set full height immediately
    opacity: 1,
    clipPath: `polygon(${centerPos}% 0, ${centerPos}% 100%, ${centerPos}% 100%, ${centerPos}% 0)` // Start as a vertical line in the center
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

  // Animate the background video container by expanding from center line
  timeline.to(".bg-video", {
    clipPath: "polygon(0% 0, 0% 100%, 100% 100%, 100% 0)", // Expand to full width
    duration: 2,
    ease: "power4.inOut"
  }, 0);

  // Animate nav-bar-main first
  timeline.to(".nav-bar-main", {
    y: 0,
    duration: 1.2,
    ease: "power3.inOut"
  }, 0.5);

  // Animate top logo characters after nav starts sliding
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
  }, 1.2); // Increased delay

  // Animate all nav items together
  timeline.to([".Nav Menu", ".Brand", ".top-navlink", ".Menu Button"], {
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
  }, 1.3); // Increased delay

  // Animate the main logo to full opacity first
  timeline.to(".main-logo", {
    opacity: 1,
    duration: 1,
    ease: "power2.inOut"
  }, 0);

  // Animate main logo split text characters
  timeline.to(mainLogoSplit.chars, {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.05,
    ease: "back.out(1.7)",
  }, "+=0");

  // Animate cities label after main logo
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
      // Remove the sticker element from DOM
      const sticker = document.querySelector('.sticker');
      if (sticker) sticker.remove();
    }
  });

  // Log final position after animation setup
  const finalRect = mainLogo.getBoundingClientRect();
  console.log('📏 Final logo position after setup:', {
    top: finalRect.top,
    left: finalRect.left,
    transform: window.getComputedStyle(mainLogo).transform
  });

  // Monitor for any position changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'style' || mutation.type === 'attributes') {
        const currentRect = mainLogo.getBoundingClientRect();
        console.log('🔄 Logo position changed:', {
          top: currentRect.top,
          left: currentRect.left,
          transform: window.getComputedStyle(mainLogo).transform
        });
      }
    });
  });

  observer.observe(mainLogo, {
    attributes: true,
    attributeFilter: ['style', 'class'],
    subtree: false
  });

  // Set up scroll-triggered animations for secondary section
  gsap.set(".skeleton-hand", {
    rotation: -25,
    transformOrigin: "left bottom"
  });

  gsap.set(".about-blurb", {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
  });

  // Create rotation animation for skeleton hand
  gsap.to(".skeleton-hand", {
    rotation: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".secondary",
      start: "top 75%",
      end: "top 25%",
      scrub: 1
    }
  });

  // Create reveal animation for about blurb
  gsap.to(".about-blurb", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    duration: 1.5,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: ".secondary",
      start: "top 70%",
      end: "top 20%",
      scrub: 1
    }
  });
});

