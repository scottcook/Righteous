/**
   * Animate header elements color based on scroll position
   * @param {number} progress - Animation progress from 0 to 1
   */
function animateHeaderColor(progress) {
    const { logoLink, topLogo, navLinks, menuButton } = window.righteousElements || {};
    
    // Define configuration for the header animation if not already in config
    const headerConfig = {
      startPoint: 0.7,
      endPoint: 0.9,
      lightColor: "#ffffff",
      darkColor: "#000000",
      duration: 0.3
    };
    
    // Determine target color based on animation thresholds
    let colorProgress = 0;
    
    // Calculate color transition progress
    if (progress >= headerConfig.startPoint && progress <= headerConfig.endPoint) {
      // Map progress from start-end range to 0-1 range
      colorProgress = (progress - headerConfig.startPoint) / 
                      (headerConfig.endPoint - headerConfig.startPoint);
    } else if (progress > headerConfig.endPoint) {
      // After end point, fully transitioned to dark
      colorProgress = 1;
    }
    
    // If we have no progress, elements should be light (white)
    // If we have full progress, elements should be dark (black)
    const targetColor = colorProgress >= 1 ? 
      headerConfig.darkColor : 
      colorProgress <= 0 ? 
        headerConfig.lightColor : 
        interpolateColor(
          headerConfig.lightColor, 
          headerConfig.darkColor, 
          colorProgress
        );
    
    // Apply colors to elements
    if (logoLink) {
      gsap.to(logoLink, {
        color: targetColor,
        duration: headerConfig.duration,
        ease: "power1.out"
      });
    }
    
    if (topLogo) {
      gsap.to(topLogo, {
        fill: targetColor,
        stroke: targetColor,
        duration: headerConfig.duration,
        ease: "power1.out"
      });
    }
    
    if (navLinks && navLinks.length) {
      navLinks.forEach(link => {
        gsap.to(link, {
          color: targetColor,
          duration: headerConfig.duration,
          ease: "power1.out"
        });
      });
    }
    
    if (menuButton) {
      gsap.to(menuButton, {
        color: targetColor,
        duration: headerConfig.duration,
        ease: "power1.out"
      });
      
      // Also animate the menu button lines if they exist
      const menuLines = menuButton.querySelectorAll('.line, .menu-line');
      if (menuLines.length) {
        menuLines.forEach(line => {
          gsap.to(line, {
            backgroundColor: targetColor,
            duration: headerConfig.duration,
            ease: "power1.out"
          });
        });
      }
    }
  }
  
  /**
   * Helper function to interpolate between two colors
   * @param {string} color1 - Starting color in hex format
   * @param {string} color2 - Ending color in hex format
   * @param {number} factor - Interpolation factor from 0 to 1
   * @returns {string} - Interpolated color in hex format
   */
  function interpolateColor(color1, color2, factor) {
    // Convert hex to RGB
    const hex2rgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };
    
    // Convert RGB to hex
    const rgb2hex = (rgb) => {
      return "#" + rgb.map(v => {
        const hex = Math.round(v).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }).join("");
    };
    
    // Interpolate
    const rgb1 = hex2rgb(color1);
    const rgb2 = hex2rgb(color2);
    
    const result = rgb1.map((v, i) => {
      return v + factor * (rgb2[i] - v);
    });
    
    return rgb2hex(result);
  }/**
 * Righteous Animation Library
 * https://cdn.jsdelivr.net/gh/scottcook/Righteous@main/index.js
 * Optimized version with best practices
 */

(() => {
  // Configuration object for easy adjustments
  const config = {
    animationDuration: 0.8,
    scrollScrubFactor: 1,
    elementStaggerDelay: 0.1,
    scrollSpacerHeight: '200vh',  // Height of scrollable area
    defaultEasing: "power2.out",
    resizeUpdateDelay: 200,
    scrollPositionRefreshDelay: 50,
    positionRecalculationThreshold: 0.05,
    initialRotation: 6,     // Initial rotation angle in degrees (reduced for entire section)
    rotationEasing: "power1.inOut", // Easing for rotation effect
    childAnimations: {
      staggerAmount: 0.08,   // Time between each child animation
      duration: 0.7,         // Duration of child animations
      easing: "back.out(1.7)"  // Bouncy easing for child elements
    },
    headerAnimation: {
      startPoint: 0.7,      // When to start changing color (0-1, percentage of animation progress)
      endPoint: 0.9,        // When color change should be complete (0-1)
      lightColor: "#ffffff", // White color
      darkColor: "#000000",  // Black color
      duration: 0.3         // Duration of color transition
    },
    // Debug mode (automatically enabled with ?debug=true in URL)
    debug: window.location.search.includes('debug=true')
  };

  // Store references to ScrollTrigger instances for proper cleanup
  let scrollTriggers = [];
  
  // Store original element styles for restoration
  const originalStyles = {};
  
  // Core DOM elements
  let heroArea, stackSection, mainWrapper, bgVideo, spacer, navBar;
  
  /**
   * Force scroll position to top of page
   */
  function resetScrollPosition() {
    window.scrollTo(0, 0);
  }
  
  /**
   * Check if required libraries are loaded
   * @returns {boolean} Whether all required libraries are available
   */
  function checkDependencies() {
    if (typeof gsap === 'undefined') {
      console.error("Righteous: GSAP not loaded!");
      return false;
    }
    
    if (typeof ScrollTrigger === 'undefined') {
      console.error("Righteous: ScrollTrigger plugin not available!");
      return false;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (typeof SplitText !== 'undefined') {
      gsap.registerPlugin(SplitText);
    }
    
    return true;
  }
  
  /**
   * Get and cache DOM elements
   * @returns {boolean} Whether all required elements were found
   */
  function cacheElements() {
    heroArea = document.querySelector(".hero-area");
    stackSection = document.querySelector(".stack-section");
    mainWrapper = document.querySelector(".main-wrapper");
    navBar = document.querySelector(".nav-bar-main");
    
    // Get logo and navigation elements
    const logoLink = document.querySelector(".logo-link");
    const topLogo = document.querySelector(".top-logo");
    const navLinks = document.querySelectorAll(".nav-link");
    const menuButton = document.querySelector(".menu-button");
    
    // Store these elements on the window for easy access
    window.righteousElements = {
      logoLink,
      topLogo,
      navLinks,
      menuButton
    };
    
    if (heroArea) {
      bgVideo = heroArea.querySelector(".bg-video");
      
      // Store original styles
      originalStyles.heroArea = {
        position: heroArea.style.position,
        top: heroArea.style.top,
        left: heroArea.style.left,
        width: heroArea.style.width,
        height: heroArea.style.height,
        zIndex: heroArea.style.zIndex
      };
    }
    
    if (stackSection) {
      originalStyles.stackSection = {
        position: stackSection.style.position,
        top: stackSection.style.top,
        left: stackSection.style.left,
        width: stackSection.style.width,
        zIndex: stackSection.style.zIndex,
        opacity: stackSection.style.opacity
      };
    }
    
    // Store original colors of nav elements
    if (logoLink || topLogo || navLinks.length) {
      originalStyles.header = {
        logoColor: logoLink ? window.getComputedStyle(logoLink).color : null,
        logoFill: topLogo ? window.getComputedStyle(topLogo).fill : null,
        navLinkColors: []
      };
      
      if (navLinks.length) {
        navLinks.forEach(link => {
          originalStyles.header.navLinkColors.push(window.getComputedStyle(link).color);
        });
      }
    }
    
    return heroArea && stackSection && mainWrapper;
  }
  
  /**
   * Set up initial element positioning and styles
   */
  function setupElements() {
    const viewportHeight = window.innerHeight;
    
    // Create a single GSAP timeline for better performance
    const setupTimeline = gsap.timeline();
    
    // Set up hero area
    setupTimeline.set(heroArea, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      zIndex: 1
    });
    
    // Make sure stack section is perfectly positioned at the bottom edge of the viewport
    // and initially invisible
    setupTimeline.set(stackSection, {
      position: "fixed", 
      top: viewportHeight, // Exactly at the bottom edge of viewport
      left: 0,
      width: "100%",
      zIndex: 2,
      opacity: 0, // Start with opacity 0 to prevent flashing
      visibility: "hidden", // Initially hidden to prevent flashing
      rotation: config.initialRotation,
      transformPerspective: 1000,
      transformOrigin: "center top",
      willChange: "transform", 
      backfaceVisibility: "hidden"
    });
    
    // Only hide child elements initially if we're doing a fresh load
    // (not after a resize operation)
    if (window.scrollY < 10) {
      const childElements = stackSection.querySelectorAll(
        "h1, h2, h3, p, .text-block-2, .section-fade, .section-slide-up, img, .button, .link-block"
      );
      
      childElements.forEach(el => {
        // Only set initial state for elements that haven't been animated yet
        const currentOpacity = window.getComputedStyle(el).opacity;
        if (currentOpacity === "0" || el.style.visibility === "hidden") {
          gsap.set(el, { 
            opacity: 0,
            visibility: "hidden" 
          });
        }
      });
    }
    
    // Set up video if it exists
    if (bgVideo) {
      setupTimeline.set(bgVideo, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden"
      });
    }
    
    // Set up navbar if it exists
    if (navBar) {
      setupTimeline.set(navBar, {
        position: "fixed",
        width: "100%",
        zIndex: 3
      });
    }
    
    // Force immediate rendering of timeline
    setupTimeline.progress(1).progress(0).play();
  }
  
  /**
   * Create or update the scroll spacer element
   */
  function createScrollSpacer() {
    // Remove existing spacer if present
    const existingSpacer = document.querySelector(".scroll-spacer");
    if (existingSpacer) {
      existingSpacer.remove();
    }
    
    // Create new spacer
    spacer = document.createElement("div");
    spacer.className = "scroll-spacer";
    
    // Apply styles via cssText for better performance
    spacer.style.cssText = `
      height: ${config.scrollSpacerHeight}; 
      position: relative; 
      z-index: 0;
      margin: 0;
      padding: 0;
      pointer-events: none;
    `;
    
    // Insert at the beginning of mainWrapper to avoid affecting layout
    if (mainWrapper.firstChild) {
      mainWrapper.insertBefore(spacer, mainWrapper.firstChild);
    } else {
      mainWrapper.appendChild(spacer);
    }
  }
  
  /**
   * Create text animation for the main logo
   */
  function animateMainLogo() {
    const mainLogo = document.querySelector(".main-logo");
    
    if (mainLogo && typeof SplitText !== 'undefined') {
      const splitText = new SplitText(mainLogo, { type: "chars" });
      
      gsap.from(splitText.chars, {
        opacity: 0,
        y: 30,
        stagger: 0.03,
        duration: config.animationDuration,
        ease: "back.out(1.5)"
      });
    }
  }
  
  /**
   * Create scroll-triggered animations
   */
  function createScrollAnimations() {
    // Clear existing scroll triggers
    cleanupScrollTriggers();
    
    const viewportHeight = window.innerHeight;
    
    // Add a marker to track scroll progress for debugging
    let markers = false;
    if (window.location.search.includes('debug=true')) {
      markers = true;
    }
    
    // Ensure stack section is properly positioned before creating scroll animations
    // but keep it invisible until the scroll animation begins
    gsap.set(stackSection, {
      top: viewportHeight,
      opacity: 0,
      rotation: config.initialRotation,
      visibility: "hidden"
    });
    
    // Stack section scroll animation with rotation effect
    const stackAnimation = gsap.fromTo(stackSection, 
      { 
        top: viewportHeight,
        opacity: 0,
        rotation: config.initialRotation,
        transformPerspective: 1000,
        transformOrigin: "center top",
        willChange: "transform",
        backfaceVisibility: "hidden"
      },
      {
        scrollTrigger: {
          trigger: spacer,
          start: "top top", 
          end: `top+=${viewportHeight} top`,
          scrub: config.scrollScrubFactor,
          markers: markers,
          invalidateOnRefresh: true,
          onEnter: () => {
            // Only make visible when scroll animation actually starts
            gsap.set(stackSection, { visibility: "visible", opacity: 1 });
          },
          onUpdate: (self) => {
            // Update header color based on scroll progress
            animateHeaderColor(self.progress);
          },
          onRefresh: (self) => {
            // This handles responsive updates when ScrollTrigger refreshes
            if (self.progress === 0) {
              gsap.set(stackSection, { 
                top: viewportHeight,
                opacity: 0,
                rotation: config.initialRotation,
                visibility: "hidden"
              });
              
              // Reset header to light color
              animateHeaderColor(0);
            } else if (self.progress === 1) {
              gsap.set(stackSection, { 
                top: 0,
                opacity: 1,
                rotation: 0,
                visibility: "visible"
              });
              
              // Set header to dark color
              animateHeaderColor(1);
            } else {
              // Calculate interim values - ensure precise positioning
              const newTop = Math.round(viewportHeight * (1 - self.progress));
              const newRotation = config.initialRotation * (1 - self.progress);
              const newOpacity = self.progress;
              
              gsap.set(stackSection, { 
                top: newTop,
                opacity: newOpacity,
                rotation: newRotation,
                visibility: "visible"
              });
              
              // Update header colors based on progress
              animateHeaderColor(self.progress);
            }
          }
        },
        top: 0,
        opacity: 1,
        rotation: 0,
        ease: config.rotationEasing,
        immediateRender: true
      }
    );
    
    scrollTriggers.push(stackAnimation.scrollTrigger);
    
    // Pin the hero area
    const pinTrigger = ScrollTrigger.create({
      trigger: spacer,
      start: "top top",
      end: "bottom bottom", 
      pin: heroArea,
      pinSpacing: false,
      invalidateOnRefresh: true
    });
    
    scrollTriggers.push(pinTrigger);
    
    // Force an immediate update to ensure correct positioning
    ScrollTrigger.refresh();
  }
  
  /**
   * Animate individual elements within the stack section
   * with fun GSAP effects
   */
  function animateStackElements() {
    if (!stackSection) return;
    
    // Define different animation types for variety
    const animationTypes = [
      // Fade up with bounce
      {
        initial: { opacity: 0, y: 80, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1, ease: "back.out(1.7)" }
      },
      // Slide in from right
      {
        initial: { opacity: 0, x: 80, rotationZ: 5 },
        animate: { opacity: 1, x: 0, rotationZ: 0, ease: "power2.out" }
      },
      // Slide in from left
      {
        initial: { opacity: 0, x: -80, rotationZ: -5 },
        animate: { opacity: 1, x: 0, rotationZ: 0, ease: "power2.out" }
      },
      // Zoom in
      {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1, ease: "elastic.out(1, 0.3)" }
      },
      // Flip in
      {
        initial: { opacity: 0, rotationX: 90, transformOrigin: "center top", transformPerspective: 1000 },
        animate: { opacity: 1, rotationX: 0, ease: "back.out(1.4)" }
      }
    ];
    
    // Select all elements to animate
    const elements = stackSection.querySelectorAll(
      "h1, h2, h3, p, .text-block-2, .section-fade, .section-slide-up, img, .button, .link-block"
    );
    
    // Prepare a Timeline to stagger animations
    const masterTimeline = gsap.timeline();
    
    elements.forEach((el, i) => {
      // Choose a random animation type for variety
      const animType = animationTypes[i % animationTypes.length];
      
      // Create animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=100", 
          toggleActions: "play none none none"
        }
      });
      
      // Set initial state
      tl.set(el, {
        ...animType.initial,
        visibility: "visible",
        willChange: "transform, opacity"
      });
      
      // Animate to final state with stagger
      tl.to(el, {
        ...animType.animate,
        duration: config.childAnimations.duration,
        delay: i * config.childAnimations.staggerAmount,
      });
      
      // Add some randomized secondary micro-animations for extra flair
      if (i % 3 === 0) { // Only on some elements
        tl.to(el, {
          y: 10,
          duration: 0.3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1
        }, ">-0.1"); // Slight overlap
      }
      
      // Store the ScrollTrigger for cleanup
      if (tl.scrollTrigger) {
        scrollTriggers.push(tl.scrollTrigger);
      }
    });
    
    // Special animations for specific element types
    
    // Images with hover effects
    const images = stackSection.querySelectorAll("img:not(.icon)");
    images.forEach(img => {
      gsap.set(img, { overflow: "hidden" });
      
      // Hover effect
      img.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.05, duration: 0.3, ease: "power1.out" });
      });
      
      img.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 0.3, ease: "power1.out" });
      });
    });
    
    // Button hover effects
    const buttons = stackSection.querySelectorAll(".button");
    buttons.forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "power1.out" });
      });
      
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
      });
    });
  }
  
  /**
   * Create and initialize custom cursor effect for interactive elements
   */
  function initializeInteractiveEffects() {
    // Find all interactive elements inside stack section
    const interactiveElements = stackSection.querySelectorAll('a, button, .button, .link-block, [data-cursor="pointer"]');
    
    interactiveElements.forEach(el => {
      // Add hover scale effect
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      // Add click effect
      el.addEventListener('mousedown', () => {
        gsap.to(el, {
          scale: 0.98,
          duration: 0.1,
          ease: "power2.in"
        });
      });
      
      el.addEventListener('mouseup', () => {
        gsap.to(el, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    });
    
    // Add text highlight effects
    const textElements = stackSection.querySelectorAll('h1, h2, h3, p');
    
    textElements.forEach(el => {
      // Add subtle hover effect
      el.addEventListener('mouseenter', () => {
        if (!el.closest('a') && !el.closest('button') && !el.closest('.button')) {
          gsap.to(el, {
            color: 'currentColor',
            duration: 0.3
          });
        }
      });
      
      el.addEventListener('mouseleave', () => {
        if (!el.closest('a') && !el.closest('button') && !el.closest('.button')) {
          gsap.to(el, {
            color: 'currentColor',
            duration: 0.3
          });
        }
      });
    });
  }
  
  /**
   * Clean up all scroll triggers
   */
  function cleanupScrollTriggers() {
    scrollTriggers.forEach(trigger => {
      if (trigger && typeof trigger.kill === 'function') {
        trigger.kill();
      }
    });
    
    scrollTriggers = [];
    
    // Additional ScrollTrigger cleanup
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ScrollTrigger.clearMatchMedia();
    }
  }
  
  /**
   * Restore original styles to elements
   */
  function restoreOriginalStyles() {
    if (heroArea && originalStyles.heroArea) {
      Object.entries(originalStyles.heroArea).forEach(([prop, value]) => {
        heroArea.style[prop] = value;
      });
    }
    
    if (stackSection && originalStyles.stackSection) {
      Object.entries(originalStyles.stackSection).forEach(([prop, value]) => {
        stackSection.style[prop] = value;
      });
    }
    
    // Restore original header colors
    if (originalStyles.header) {
      const { logoLink, topLogo, navLinks } = window.righteousElements || {};
      
      if (logoLink && originalStyles.header.logoColor) {
        logoLink.style.color = originalStyles.header.logoColor;
      }
      
      if (topLogo && originalStyles.header.logoFill) {
        topLogo.style.fill = originalStyles.header.logoFill;
      }
      
      if (navLinks && navLinks.length && originalStyles.header.navLinkColors.length) {
        navLinks.forEach((link, index) => {
          if (originalStyles.header.navLinkColors[index]) {
            link.style.color = originalStyles.header.navLinkColors[index];
          }
        });
      }
    }
  }
  
  /**
   * Handle window resize
   */
  function handleResize() {
    let resizeTimeout;
    
    return () => {
      // Clear previous timeout
      clearTimeout(resizeTimeout);
      
      // Store current scroll progress
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      
      // Immediate positioning update based on scroll progress
      if (stackSection) {
        // If at the top (no scroll yet)
        if (window.scrollY < 10) {
          gsap.set(stackSection, { 
            top: window.innerHeight,
            opacity: 0, // Start with 0 opacity
            rotation: config.initialRotation,
            visibility: "hidden" // Keep hidden until scrolling starts
          });
          
          // Reset header to light color
          animateHeaderColor(0);
        } 
        // If in middle of animation (partially scrolled)
        else if (scrollProgress < 0.5) {
          const progress = window.scrollY / window.innerHeight;
          const newTop = window.innerHeight * (1 - progress);
          const newRotation = config.initialRotation * (1 - progress);
          
          gsap.set(stackSection, {
            top: newTop,
            opacity: progress, // Fade in based on scroll progress
            rotation: newRotation,
            visibility: "visible" // Only visible when scrolling has started
          });
          
          // Update header colors based on progress
          animateHeaderColor(progress);
        }
        // If already scrolled past animation point
        else {
          gsap.set(stackSection, {
            top: 0,
            opacity: 1,
            rotation: 0,
            visibility: "visible"
          });
          
          // Set header to dark color
          animateHeaderColor(1);
        }
      }
      
      // Debounced full refresh with scroll position preservation
      resizeTimeout = setTimeout(() => {
        // Clean up existing animations
        cleanupScrollTriggers();
        
        // Temporarily save scroll progress
        const savedScrollProgress = scrollProgress;
        
        // Reset scroll spacer with new dimensions
        createScrollSpacer();
        
        // Update element positioning
        setupElements();
        
        // Recreate scroll animations
        createScrollAnimations();
        
        // Preserve animation state of child elements
        preserveChildElementStates();
        
        // Allow a brief moment for new heights to be calculated
        setTimeout(() => {
          // Restore scroll position proportionally
          const newScrollTarget = savedScrollProgress * (document.body.scrollHeight - window.innerHeight);
          window.scrollTo(0, newScrollTarget);
          
          // Force ScrollTrigger to update based on new scroll position
          ScrollTrigger.update();
          
          // Special case handling for small scroll amounts
          if (savedScrollProgress < config.positionRecalculationThreshold) {
            gsap.set(stackSection, { 
              top: window.innerHeight,
              opacity: 0, // Hidden at top
              rotation: config.initialRotation,
              visibility: "hidden" // Hidden until scrolling begins
            });
            
            // Reset header to light color
            animateHeaderColor(0);
          } else if (savedScrollProgress > 0.8) {
            // If we've scrolled past the trigger point for header animation
            animateHeaderColor(1);
          }
        }, config.scrollPositionRefreshDelay);
      }, config.resizeUpdateDelay);
    };
  }
  
  /**
   * Preserve the animation state of child elements during resize
   */
  function preserveChildElementStates() {
    if (!stackSection) return;
    
    const childElements = stackSection.querySelectorAll(
      "h1, h2, h3, p, .text-block-2, .section-fade, .section-slide-up, img, .button, .link-block"
    );
    
    childElements.forEach(el => {
      const computedStyle = window.getComputedStyle(el);
      const currentOpacity = parseFloat(computedStyle.opacity);
      
      // If element is already visible, keep it visible
      if (currentOpacity > 0.1) {
        gsap.set(el, {
          opacity: currentOpacity,
          visibility: "visible",
          // Preserve any current transforms
          x: el._gsTransform ? el._gsTransform.x : 0,
          y: el._gsTransform ? el._gsTransform.y : 0,
          rotation: el._gsTransform ? el._gsTransform.rotation : 0,
          scale: el._gsTransform ? el._gsTransform.scale : 1
        });
      }
    });
  }
  
  /**
   * Initialize all animations and setup
   */
  function initialize() {
    console.log("Righteous: Initializing animations");
    
    // Disable scroll behavior temporarily
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.overflow = 'hidden';
    
    // Force scroll reset
    resetScrollPosition();
    
    // Check required dependencies
    if (!checkDependencies()) return;
    
    // Get and cache DOM elements
    if (!cacheElements()) {
      console.error("Righteous: Required elements not found");
      return;
    }
    
    // Create scroll spacer
    createScrollSpacer();
    
    // Immediately set up core elements to avoid flash of unstyled content
    if (heroArea) {
      gsap.set(heroArea, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 1
      });
    }
    
    if (stackSection) {
      // Position stack section correctly from the start but make it invisible
      gsap.set(stackSection, { 
        position: "fixed",
        top: window.innerHeight, // Position exactly at bottom of viewport
        left: 0,
        width: "100%",
        zIndex: 2,
        visibility: "hidden", // Start hidden to prevent flashing
        opacity: 0, // Start with zero opacity
        rotation: config.initialRotation,
        transformPerspective: 1000,
        transformOrigin: "center top"
      });
    }
    
    // Run full setup with a slight delay to ensure DOM is fully ready
    setTimeout(() => {
      setupElements();
      
      // Ensure logo and navigation start with light color
      animateHeaderColor(0);
      
      // Create main animations
      animateMainLogo();
      createScrollAnimations();
      animateStackElements();
      initializeInteractiveEffects();
      
      // Re-enable scrolling
      document.body.style.overflow = '';
      
      // Re-enable smooth scrolling
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = '';
      }, 200);
      
      // Add a manual update for ScrollTrigger after everything is initialized
      setTimeout(() => {
        ScrollTrigger.refresh();
        
        // Make absolutely sure stack section is positioned correctly and invisible
        if (window.scrollY < 10 && stackSection) {
          gsap.set(stackSection, { 
            top: window.innerHeight,
            opacity: 0,
            rotation: config.initialRotation,
            visibility: "hidden"
          });
          
          // Ensure header has light color on initial load
          animateHeaderColor(0);
        }
      }, 300);
    }, 100);
    
    // Set up event listeners
    const resizeHandler = handleResize();
    window.addEventListener("resize", resizeHandler, { passive: true });
    
    // Additional safeguard for orientation changes on mobile
    window.addEventListener("orientationchange", () => {
      // Delay execution to ensure dimensions have updated
      setTimeout(() => {
        resizeHandler();
        
        // Force ScrollTrigger to completely refresh
        ScrollTrigger.refresh(true);
      }, 200);
    }, { passive: true });
    
    // Handle page refresh/navigation
    window.addEventListener("beforeunload", () => {
      // Store scroll position in session storage
      window.sessionStorage.setItem('scrollReset', 'true');
      resetScrollPosition();
      
      // Clean up
      cleanupScrollTriggers();
      restoreOriginalStyles();
    });
    
    // Check for scroll reset flag
    if (window.sessionStorage.getItem('scrollReset') === 'true') {
      resetScrollPosition();
      window.sessionStorage.removeItem('scrollReset');
    }
    
    console.log("Righteous: All animations initialized");
  }
  
  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM already loaded, initialize immediately
    initialize();
  }
})();