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
  // Wait for GSAP to be ready
  await waitForGSAP();
  
  // Register SplitText plugin
  gsap.registerPlugin(SplitText);
  
  // Create a GSAP timeline
  const timeline = gsap.timeline();

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
  }, "+=0.4"); // Start 0.4 seconds after the background video begins
});
