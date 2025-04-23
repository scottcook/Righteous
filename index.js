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

let split, animation;

// Initialize animation
async function initAnimation() {
  console.log('🎬 Starting animation initialization...');
  await waitForGSAP();
  
  // Register SplitText plugin
  gsap.registerPlugin(SplitText);
  console.log('✅ SplitText plugin registered');
  
  const logoElement = document.querySelector('.main-logo');
  if (!logoElement) {
    console.warn('❌ Logo element not found');
    return;
  }
  console.log('✅ Found logo element:', logoElement.textContent);

  // Clean up previous split if it exists
  if (split) {
    console.log('🧹 Cleaning up previous split');
    split.revert();
  }
  if (animation) {
    console.log('🧹 Cleaning up previous animation');
    animation.revert();
  }

  try {
    // Create a timeline for more control
    const tl = gsap.timeline();

    // Set initial state
    gsap.set(logoElement, {
      opacity: 0,
      y: 30
    });

    // Animate the logo
    tl.to(logoElement, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    });
  } catch (error) {
    console.error('❌ Error during animation setup:', error);
  }
}

// Handle window resize
window.addEventListener("resize", () => {
  console.log('📐 Window resized, reinitializing animation');
  initAnimation();
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimation);
} else {
  initAnimation();
}

// Create the split and animate
function initSplit() {
  const text = document.querySelector('.main-logo');
  
  // If we can't find the element, wait and try again
  if (!text) {
    console.log('Waiting for logo element...');
    setTimeout(initSplit, 100);
    return;
  }

  // Create the split
  let split = new SplitText(text, {
    type: "chars",
    position: "relative"
  });

  // Animate each character
  gsap.from(split.chars, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    stagger: 0.05
  });
}

// Run on page load
window.addEventListener('load', initSplit);

// GSAP animation for .main-logo element on window load
window.addEventListener("load", () => {
  // Create a GSAP timeline
  const timeline = gsap.timeline();

  // Set the initial size of .main-logo
  timeline.set(".main-logo", {
    opacity: 0,
    scale: 0.8,
    y: 0 // Start at original position
  });

  // Set initial state of underline
  timeline.set(".logo-underline", {
    width: 0,
  });

  // First stage: Fade in and scale up
  timeline.to(".main-logo", {
    duration: 1.0,
    opacity: 1,
    scale: 1,
    ease: "circ.out"
  });

  // Pause for dramatic effect
  timeline.to({}, {
    duration: 1
  });

  // Final stage: Slide up and shrink
  timeline.to(".main-logo", {
    duration: 2,
    y: "-46vh", // Slide up by 46% of viewport height
    scale: 0.28, // Shrink to 28% of original size
    ease: "power4.inOut" // Smooth acceleration and deceleration
  });

  // Animate the underline after logo reaches final position
  timeline.to(".logo-underline", {
    width: "90vw",
    duration: 1,
    ease: "circ.out"
  });
});
