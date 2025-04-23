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

  // Force the logo to stay in its original position
  gsap.set(".main-logo", {
    clearProps: "all" // Clear all GSAP-controlled properties
  });

  // Set initial state of background video
  timeline.set(".bg-video", {
    width: "0rem",
    height: "0rem",
    opacity: 0
  });

  // Create the split text
  const text = document.querySelector('.main-logo');
  const split = new SplitText(text, {
    type: "chars",
    position: "relative"
  });

  // Set initial state of split characters
  gsap.set(split.chars, {
    y: 50,
    opacity: 0
  });

  // Animate the background video immediately
  timeline.to(".bg-video", {
    width: "90vw",
    height: "45vw",
    opacity: 1,
    duration: 2,
    ease: "power4.inOut"
  }, 0);

  // Animate split text characters with a slight delay
  timeline.to(split.chars, {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.05,
    ease: "back.out(1.7)",
  }, "+=0.4");

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
