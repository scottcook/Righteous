<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, watch } from 'vue';
import { isNavZActive, isNavInverted, isNoiseActive } from '@/composables/useScrollState';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '@/utils/gsap-premium/src/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// DOM refs
const aboutRef = ref(null);
const aboutInnerRef = ref(null);
const taglineRef = ref(null);
const cardRef = ref(null);
const cardInnerRef = ref(null);
const cardShadowRef = ref(null);
const glareRef = ref(null);
const logoCircleRef = ref(null);
const logoCircleInnerRef = ref(null);
const cassetteRef = ref(null);
const cassetteInnerRef = ref(null);
const cassetteImageRef = ref(null);
const cassetteHeaderRef = ref(null);
const cassetteDescriptionRef = ref(null);

// GSAP instances
let scrollTriggerInstance = null;
let taglineSplit = null;
let tagline2Split = null;
let headerSplit = null;
let descriptionSplit = null;
let rotationTween = null;

// State
const isRotating = ref(true);
const tiltEffectEnabled = ref(false);
const cassetteScrollDistance = ref(0);
let bounds = null;

// Injected dependencies
const resizeTick = inject('resizeTick');

// === Watchers ===
watch(resizeTick, () => {
    updateCassetteScrollDistance();
    setupScrollAnimation();
});

watch(isRotating, (val) => {
    val ? startRotation() : stopRotation();
});

// === Helpers ===
const updateCassetteScrollDistance = () => {
    nextTick(() => {
        const height = cassetteInnerRef.value?.offsetHeight || 0;
        const viewport = window.innerHeight;
        cassetteScrollDistance.value = -(height - viewport);
    });
};

// === Animations ===
// Rotating logos in a circular layout
const startRotation = () => {
    if (rotationTween) return;
    const logos = logoCircleInnerRef.value?.querySelectorAll('.rotating-logo') || [];

    rotationTween = gsap.to(
        {},
        {
            duration: 60,
            repeat: -1,
            ease: 'linear',
            onUpdate: () => {
                const angle = (performance.now() / 1000 / 60) * 360;
                logos.forEach((el, index) => {
                    const baseAngle = (360 / logos.length) * index;
                    const totalAngle = angle + baseAngle;
                    const radiusX = logoCircleInnerRef.value.offsetWidth / 2;
                    const radiusY = logoCircleInnerRef.value.offsetHeight / 2;
                    const x = Math.cos((totalAngle * Math.PI) / 180) * radiusX;
                    const y = Math.sin((totalAngle * Math.PI) / 180) * radiusY;
                    const depthScale = gsap.utils.mapRange(-radiusY, radiusY, 1, 0.0, y);

                    gsap.set(el, {
                        x,
                        y,
                        scale: depthScale,
                        zIndex: Math.round(depthScale * 100),
                        rotation: 0,
                    });
                });
            },
        }
    );
};

const stopRotation = () => {
    rotationTween?.kill();
    rotationTween = null;
};

// Card tilt effect on hover
const enableCardTilt = () => {
    if (!cardInnerRef.value || !glareRef.value || tiltEffectEnabled.value) return;

    const $card = cardInnerRef.value;
    const $glare = glareRef.value;
    const $shadow = cardShadowRef.value;

    const moveToMouse = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2,
        };

        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
        const rotationX = center.y / 50;
        const rotationY = -center.x / 50;
        const shadowOffsetX = -rotationY * 5;
        const shadowOffsetY = rotationX * 5;
        const shadowBlur = 20 + distance / 120;

        gsap.to($card, {
            scale: 1.1,
            rotationX,
            rotationY,
            transformPerspective: 500,
            ease: 'power2.out',
            boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 6px rgba(72, 65, 56, 0.4)`,
        });

        gsap.to($shadow, {
            rotationX,
            rotationY,
            scale: 1.05,
            transformPerspective: 500,
            ease: 'power2.out',
            duration: 0.4,
        });

        gsap.to($glare, {
            autoAlpha: 1,
            backgroundImage: `radial-gradient(circle at ${center.x * 2 + bounds.width / 2}px ${center.y * 2 + bounds.height / 2}px, rgba(255, 255, 255, 0.33), rgba(0, 0, 0, 0.06))`,
        });
    };

    const handleMouseEnter = () => {
        bounds = $card.getBoundingClientRect();
        document.addEventListener('mousemove', moveToMouse);
        gsap.to($card, { scale: 1.1, rotationX: 0, rotationY: 0, duration: 0.6 });
    };

    const handleMouseLeave = () => {
        document.removeEventListener('mousemove', moveToMouse);
        gsap.to($card, { scale: 1, rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power2.out' });
        gsap.to($shadow, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.6, ease: 'power2.out' });
        gsap.to($glare, { autoAlpha: 0, duration: 0.6 });
    };

    $card.addEventListener('mouseenter', handleMouseEnter);
    $card.addEventListener('mouseleave', handleMouseLeave);
    tiltEffectEnabled.value = true;
};

const disableCardTilt = () => {
    if (!cardInnerRef.value || !tiltEffectEnabled.value) return;
    cardInnerRef.value.removeEventListener('mouseenter', () => {});
    cardInnerRef.value.removeEventListener('mouseleave', () => {});
    document.removeEventListener('mousemove', () => {});
    tiltEffectEnabled.value = false;
};

// === Scroll-triggered animation timeline ===
const setupScrollAnimation = async () => {
    await nextTick();
    scrollTriggerInstance?.kill();
    taglineSplit?.revert();
    tagline2Split?.revert();
    headerSplit?.revert();
    descriptionSplit?.revert();

    const tl = gsap.timeline({ paused: true });

    taglineSplit = new SplitText(taglineRef.value, { type: 'lines' });
    tagline2Split = new SplitText(taglineRef.value, { type: 'words, chars' });
    headerSplit = new SplitText(cassetteHeaderRef.value, { type: 'words, chars' });
    descriptionSplit = new SplitText(cassetteDescriptionRef.value, { type: 'lines' });

    // Section 1: Intro tagline
    tl.add(
        [
            gsap.fromTo(taglineRef.value, { yPercent: 100, rotation: -17 }, { yPercent: 0, rotation: -2, ease: 'back.inOut(0.7)', duration: 2.5 }),
            gsap.fromTo(taglineSplit.lines, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.5, ease: 'power2.out', duration: 1, delay: 1 }),
        ],
        '+=0.0'
    );

    // Section 2: Tilt card
    tl.add(
        [
            gsap.fromTo(
                cardInnerRef.value,
                { yPercent: -105, rotation: 23, opacity: 0 },
                {
                    yPercent: -5,
                    rotation: 3,
                    opacity: 1,
                    ease: 'back.out(0.7)',
                    duration: 1.5,
                }
            ),
            gsap.fromTo(
                cardShadowRef.value,
                { yPercent: 105, rotation: -23, opacity: 0 },
                {
                    yPercent: 10,
                    xPercent: 3,
                    rotation: -5,
                    opacity: 1,
                    ease: 'back.out(0.7)',
                    duration: 1.5,
                }
            ),
        ],
        '-=0.8'
    );

    // Section 3: Circle logos
    tl.add([gsap.fromTo(logoCircleRef.value, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power2.out', duration: 2 })], '-=0.5');

    // Section 4: Cassette overlay & image
    tl.add(
        [
            gsap.fromTo(cassetteRef.value, { yPercent: 200, rotation: 30 }, { yPercent: 0, rotation: -1, ease: 'power1.inOut', duration: 3 }),
            gsap.fromTo(
                cassetteImageRef.value,
                { yPercent: 100, rotation: 30, scale: 0.8 },
                {
                    yPercent: 0,
                    rotation: -1,
                    scale: 1,
                    ease: 'back.inOut(0.7)',
                    duration: 3,
                    delay: 0.5,
                }
            ),
            gsap.to(aboutInnerRef.value, { scale: 0.9, opacity: 0.6, ease: 'power1.in', duration: 2 }),

            gsap.to(tagline2Split.chars, {
                color: '#F5F4EB',
                stagger: 0.02,
                ease: 'power1.in',
                duration: 0.02,
                delay: 0.0,
            }),
            gsap.to(cardInnerRef.value, {
                xPercent: 105,
                rotation: 23,
                opacity: 0,
                ease: 'back.inOut(0.7)',
                duration: 1.5,
                delay: 0.5,
            }),

            gsap.to(cardShadowRef.value, {
                xPercent: 105,
                rotation: 23,
                opacity: 0,
                ease: 'back.inOut(0.7)',
                duration: 1.5,
                delay: 0.5,
            }),
        ],
        '+=2.4'
    );

    // Section 5: Scroll cassette content upward
    tl.add(
        [
            gsap.to(cassetteInnerRef.value, {
                y: () => cassetteScrollDistance.value,
                ease: 'sine.inOut',
                duration: 3,
            }),
            gsap.to(headerSplit.chars, {
                color: 'white',
                stagger: 0.025,
                ease: 'power1.in',
                duration: 0.025,
            }),
            gsap.fromTo(
                descriptionSplit.lines,
                { opacity: 0, y: 100, rotation: 5 },
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    stagger: 0.15,
                    ease: 'power2.out',
                    duration: 0.5,
                    delay: 2.0,
                }
            ),
        ],
        '+=1.0'
    );

    // Section 6: Add hold/pause to scroll
    tl.add(gsap.to({}, { duration: 2 }));

    let lastTiltState = null;

    scrollTriggerInstance = ScrollTrigger.create({
        trigger: aboutRef.value,
        start: 'top top',
        end: '+=600%',
        scrub: true,
        pin: true,
        pinSpacing: true,
        animation: tl,
        onUpdate: (self) => {
            const progress = self.progress;

            // Toggle nav and noise state
            isNavInverted.value = progress > 0.6;
            isNoiseActive.value = progress <= 0.6;

            // Start or stop rotation
            progress > 0.6 ? stopRotation() : startRotation();

            // Only call tilt methods when state changes
            if (progress > 0.6 && lastTiltState !== 'disabled') {
                disableCardTilt();
                lastTiltState = 'disabled';
            } else if (progress > 0.23 && progress <= 0.6 && lastTiltState !== 'enabled') {
                enableCardTilt();
                lastTiltState = 'enabled';
            }
        },
        onEnter: () => (isNavInverted.value = false),
        onLeaveBack: () => {
            isNavInverted.value = true;
            stopRotation();
            disableCardTilt();
            lastTiltState = 'disabled';
        },
    });
};

onMounted(async () => {
    nextTick(() => {
        updateCassetteScrollDistance();
        setupScrollAnimation();
    });
});

onUnmounted(() => {
    scrollTriggerInstance?.kill();
    taglineSplit?.revert();
    tagline2Split?.revert();
    headerSplit?.revert();
    descriptionSplit?.revert();
    disableCardTilt();
    stopRotation();
});
</script>

<template>
    <section ref="aboutRef" class="relative w-screen min-h-screen">
        <div ref="aboutInnerRef" class="relative w-screen h-auto min-h-screen flex flex-col justify-between overflow-hidden">
            <div class="relative w-full grid grid-cols-wrapper">
                <div class="relative col-main pt-[12vh] lg:pt-[24vh] flex flex-col lg:flex-row justify-between lg:gap-8 h-[66vh] z-20">
                    <p
                        ref="taglineRef"
                        class="text-brand-charcoal max-w-[540px] lg:max-w-[700px] font-helveticaDisplay font-light text-[24px] md:text-[34px] lg:text-[3\6px] xl:text-[40px] leading-[1.25] tracking-tight flex-shrink-0 lg:ml-6 xl:ml-12"
                    >
                        We’ve done time inside big agencies and product monoliths. We’ve sat through the 90-slide decks.<br /><span class="font-medium mt-10 block"
                            >We formed Righteous to be the antidote.</span
                        >
                    </p>
                    <div ref="cardRef" class="relative flex-shrink-0 w-[204px] lg:w-[256px] h-[280px] lg:h-[360px] mt-12 md:mt-auto ml-auto mr-6 xl:mr-12">
                        <div
                            ref="cardInnerRef"
                            class="relative rounded-xl overflow-hidden text-center py-12 leading-none bg-brand-charcoal text-white font-grotesk uppercase text-[20px] lg:text-[28px] flex flex-col justify-between items-center w-full h-full"
                        >
                            <div class="absolute top-5 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white"></div>
                            <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white"></div>
                            <div class="absolute top-1/2 left-5 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white"></div>
                            <div class="absolute top-1/2 right-5 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white"></div>
                            <div class="flex flex-col gap-6">
                                <p>Product</p>
                                <p>Marketing</p>
                                <p>Kickflips</p>
                            </div>
                            <div class="inline-flex items-center justify-center bg-[#E336AB] rounded-full w-[48px] h-[48px] lg:w-[64px] lg:h-[64px] mt-auto">
                                <span class="font-canela font-black text-[28px] lg:text-[38px] text-black">R</span>
                            </div>
                            <div ref="glareRef" class="absolute w-full h-full inset-0"></div>
                        </div>
                        <div
                            ref="cardShadowRef"
                            class="relative rounded-xl overflow-hidden w-full h-full blur-sm"
                            style="background-image: linear-gradient(to bottom, rgba(21, 21, 21, 0.1) 0%, rgba(21, 21, 21, 0) 30%)"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="relative col-main">
                <div class="relative w-full min-w-[1024px] max-w-[1280px] h-[33vh] mx-auto">
                    <div ref="logoCircleRef" class="absolute w-full h-[600px] mx-auto z-10 top-12">
                        <div ref="logoCircleInnerRef" class="absolute inset-0 flex items-center justify-center w-full h-full">
                            <div
                                v-for="(logo, index) in 10"
                                :key="index"
                                class="rotating-logo"
                                :style="{
                                    position: 'absolute',
                                }"
                            >
                                <img src="@/assets/images/logo-example.png" alt="Logo" class="min-w-[150px] max-w-[300px] w-[20vw] h-autos" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute w-full h-[100px] bottom-0 left-0 right-0" style="background-image: linear-gradient(to bottom, rgba(245, 244, 235, 0) 0%, rgba(245, 244, 235, 1) 50%)"></div>
        <div ref="cassetteRef" class="absolute top-0 left-0 right-0 w-screen h-screen overflow-hidden bg-[#FF63CC]">
            <div class="absolute inset-0 w-full h-full mix-blend-hard-light opacity-10"><img src="@/assets/images/band.jpg" alt="Placeholder" class="w-full h-full object-cover object-bottom" /></div>
            <div ref="cassetteInnerRef" class="relative w-full h-auto min-h-screen">
                <div class="relative w-full grid grid-cols-wrapper">
                    <div class="relative col-main py-[12vh] lg:py-[24vh] flex items-center justify-center flex-col text-center">
                        <div ref="cassetteImageRef" class="w-full h-auto max-w-[480px] lg:max-w-[640px] xl:max-w-[720px] rounded-lg overflow-hidden shadow-2xl z-10">
                            <img src="@/assets/images/cassette.jpg" alt="Placeholder" class="w-full h-auto" width="1481" height="899" />
                        </div>
                        <h2
                            ref="cassetteHeaderRef"
                            class="text-[#FF8AD9] max-w-[640px] lg:max-w-[860px] xl:max-w-[970px] font-grotesk font-bold text-[36px] lg:text-[51px] xl:text-[66px] leading-[1.05] tracking-tight mt-10 lg:mt-18"
                        >
                            If you want to vibe with the Walkman crowd, hire the kids who had that Ratt cassette.
                        </h2>
                        <p
                            ref="cassetteDescriptionRef"
                            class="text-[#1F1F1F] max-w-[740px] lg:max-w-[990px] xl:max-w-[1120px] font-helveticaDisplay font-medium text-[18px] lg:text-[25px] xl:text-[32px] leading-[1.375] lg:leading-[1.25] tracking-snug mt-5 lg:mt-8"
                        >
                            We grew up taping songs off the radio, blowing dust out of cartridges, and side‑eyeing every “new and improved” ad that forgot who paid for the cable. Today we channel that
                            same hacker spirit into building products and experiences that work as hard as they look good. Righteous is run by creatives who’ve logged 20+ years sharpening brands and
                            shipping launches before “unboxing” was a verb. We don’t study the 50‑plus audience -- we pass them the aux cord. The only way we know to do it is to crank it to 11.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
