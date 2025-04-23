import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(
    ScrollTrigger,
    Draggable,
    MotionPathPlugin,
    SplitText
);

// Default configuration for animations
gsap.defaults({
    ease: "power2.out",
    duration: 0.7
});

// Export configured gsap instance
export default gsap; 