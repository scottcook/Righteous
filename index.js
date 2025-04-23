// Wait for GSAP and SplitText to be available
function waitForGSAP() {
  return new Promise((resolve) => {
    const check = () => {
      if (window.gsap && window.SplitText) {
        console.log('✅ GSAP and SplitText loaded');
        resolve();
      } else {
        console.log('⏳ Waiting for GSAP and SplitText...');
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
  
  // Register SplitText plugin
  gsap.registerPlugin(SplitText);
  
  // Kill any existing animations
  gsap.killTweensOf(".main-logo");
  gsap.killTweensOf(".bg-video");
  gsap.killTweensOf(".top-logo");
  console.log('🧹 Killed any existing animations');

  // Create a GSAP timeline
  const timeline = gsap.timeline();
  
  // Log initial position
  const logo = document.querySelector('.main-logo');
  const rect = logo.getBoundingClientRect();
  console.log('📏 Initial logo position:', {
    top: rect.top,
    left: rect.left,
    transform: window.getComputedStyle(logo).transform
  });

  // Force the logo to stay in its original position and set initial opacity
  gsap.set(".main-logo", {
    clearProps: "all", // Clear all GSAP-controlled properties
    opacity: 0 // Ensure we start from 0 opacity
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

  // Calculate center position (50% of viewport width)
  const centerPos = 50;
  
  // Set initial state of background video container
  timeline.set(".bg-video", {
    width: "90vw", // Set full width immediately
    height: "45vw", // Set full height immediately
    opacity: 1,
    clipPath: `polygon(${centerPos}% 0, ${centerPos}% 100%, ${centerPos}% 100%, ${centerPos}% 0)` // Start as a vertical line in the center
  });

  // Create the split text for main logo
  const split = new SplitText(text, {
    type: "chars",
    position: "relative"
  });

  // Set initial state of split characters
  gsap.set(split.chars, {
    y: 50,
    opacity: 0
  });

  // Animate the background video container by expanding from center line
  timeline.to(".bg-video", {
    clipPath: "polygon(0% 0, 0% 100%, 100% 100%, 100% 0)", // Expand to full width
    duration: 2,
    ease: "power4.inOut"
  }, 0);

  // Animate the main logo to full opacity first
  timeline.to(".main-logo", {
    opacity: 1,
    duration: 1,
    ease: "power2.inOut"
  }, 0);

  // Animate split text characters
  timeline.to(split.chars, {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.05,
    ease: "back.out(1.7)",
  }, "+=0");

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
  }, "-=0.5");

  // Log final position after animation setup
  const finalRect = logo.getBoundingClientRect();
  console.log('📏 Final logo position after setup:', {
    top: finalRect.top,
    left: finalRect.left,
    transform: window.getComputedStyle(logo).transform
  });

  // Monitor for any position changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'style' || mutation.type === 'attributes') {
        const currentRect = logo.getBoundingClientRect();
        console.log('🔄 Logo position changed:', {
          top: currentRect.top,
          left: currentRect.left,
          transform: window.getComputedStyle(logo).transform
        });
      }
    });
  });

  observer.observe(logo, {
    attributes: true,
    attributeFilter: ['style', 'class'],
    subtree: false
  });
});

