<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, watch } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '@/utils/gsap-premium/src/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const mediaRef = ref(null);
const mastheadRef = ref(null);
const mastheadInnerRef = ref(null);
const storiesRef = ref(null);
const taglineRef = ref(null);
const storyImage1Ref = ref(null);
const storyImage2Ref = ref(null);
const storyImage3Ref = ref(null);
const storyImage4Ref = ref(null);
const storyImage5Ref = ref(null);
const imageRef = ref(null);
const copyRef = ref(null);
const descriptionRef = ref(null);
const handRef = ref(null);
const logoRef = ref(null);

let scrollTriggerInstance = null;
let descriptionSplit = null;
let logoSplit = null;
let taglineSplit = null;

const resizeTick = inject('resizeTick');

watch(resizeTick, () => {
    setupScrollAnimation();
});

const toggleNavZ = (show) => {
    const nav = document.querySelector('#nav');
    if (nav) nav.classList.toggle('z-50', show);
};

const toggleNavInvert = (invert) => {
    const nav = document.querySelector('.nav-header-wrapper');
    if (nav) nav.classList.toggle('header-inverted', invert);
};

const getClipSettings = () => {
    const screenWidth = window.innerWidth;
    const maxWidth = 1440;
    const targetWidth = screenWidth > maxWidth ? maxWidth : screenWidth - 40;
    const horizontalCropPercent = ((screenWidth - targetWidth) / 2 / screenWidth) * 100;
    const copyHeight = copyRef.value?.offsetHeight || 0;
    const navHeight = screenWidth >= 1024 ? 102 : 70;

    return { horizontalCropPercent, copyHeight, navHeight };
};

const setupScrollAnimation = async () => {
    await nextTick();

    const { horizontalCropPercent, copyHeight, navHeight } = getClipSettings();

    scrollTriggerInstance?.kill();
    taglineSplit && taglineSplit.revert();
    descriptionSplit && descriptionSplit.revert();

    gsap.set(mediaRef.value, { clipPath: 'inset(0px 0px 0px 0px round 0px)', willChange: 'clip-path' });
    gsap.set(imageRef.value, { scale: 1, willChange: 'transform' });
    gsap.set(descriptionRef.value, { opacity: 1 });
    gsap.set(handRef.value, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    descriptionSplit = new SplitText(descriptionRef.value, { type: 'lines' });
    taglineSplit = new SplitText(taglineRef.value, { type: 'words, chars' });

    tl.add(
        [
            //
            gsap.to(mediaRef.value, {
                clipPath: `inset(${navHeight}px ${horizontalCropPercent}% ${copyHeight}px ${horizontalCropPercent}% round 8px)`,
                ease: 'power2.out',
                duration: 1,
            }),

            //
            gsap.to(imageRef.value, { scale: 1.1, ease: 'power1.in', duration: 1 }),

            //
            gsap.to(logoRef.value, { yPercent: -7, scale: 0.9, ease: 'power2.out', duration: 1 }),
        ],
        '+=0.0'
    );

    tl.add(
        [
            gsap.fromTo(
                descriptionSplit.lines,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    ease: 'power2.out',
                    duration: 0.5,
                }
            ),

            //
            gsap.fromTo(
                handRef.value,
                { opacity: 0, y: 50, rotation: 10 },
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    ease: 'back.inOut(1.7)',
                    duration: 1,
                    delay: 0.5,
                }
            ),
        ],
        '-=0.4'
    );

    tl.add(
        [
            //
            gsap.fromTo(
                storiesRef.value,
                { yPercent: 200, rotation: -30 },
                {
                    yPercent: 0,
                    rotation: 1,
                    ease: 'power1.inOut',
                    duration: 3,
                }
            ),

            gsap.fromTo(
                taglineRef.value,
                { yPercent: 100, rotation: -30 },
                {
                    yPercent: 0,
                    rotation: 1,
                    ease: 'back.inOut(0.7)',
                    duration: 3,
                    delay: 0.5,
                }
            ),

            //
            gsap.to(mastheadInnerRef.value, {
                scale: 0.9,
                opacity: 0.6,
                ease: 'power1.in',
                duration: 2,
            }),
        ],
        '+=1.0'
    );

    tl.add(
        [
            //
            gsap.to(taglineSplit.chars, {
                color: 'white',
                stagger: 0.02,
                ease: 'power1.in',
                duration: 0.02,
            }),

            //
            gsap.fromTo(
                storyImage1Ref.value,
                { yPercent: 120, rotation: -40, opacity: 0 },
                {
                    yPercent: 20,
                    rotation: -10,
                    opacity: 1,
                    ease: 'back.out(0.7)',
                    duration: 1.6,
                    delay: 0.2,
                }
            ),

            //
            gsap.fromTo(
                storyImage2Ref.value,
                { yPercent: 100, rotation: -20, opacity: 0 },
                {
                    yPercent: 0,
                    rotation: 10,
                    opacity: 1,
                    ease: 'back.out(0.7)',
                    duration: 1.6,
                    delay: 0.4,
                }
            ),

            //
            gsap.fromTo(
                storyImage3Ref.value,
                { yPercent: 110, rotation: -30, opacity: 0 },
                {
                    yPercent: 10,
                    rotation: -10,
                    opacity: 1,
                    ease: 'back.out(0.7)',
                    duration: 1.6,
                    delay: 0.6,
                }
            ),

            //
            gsap.fromTo(
                storyImage4Ref.value,
                { yPercent: 125, rotation: -40, opacity: 0 },
                {
                    yPercent: 25,
                    rotation: -2,
                    opacity: 1,
                    ease: 'back.out(0.7)',
                    duration: 1.6,
                    delay: 0.8,
                }
            ),
        ],
        '-=0.6'
    );

    tl.add(
        [
            //
            gsap.to(storyImage1Ref.value, {
                xPercent: -60,
                rotation: -16,
                ease: 'back.out(0.7)',
                duration: 1.6,
                delay: 0.0,
            }),

            //
            gsap.to(storyImage2Ref.value, {
                xPercent: -55,
                rotation: 2,
                ease: 'back.out(0.7)',
                duration: 1.6,
                delay: 0.2,
            }),

            //
            gsap.to(storyImage3Ref.value, {
                xPercent: 60,
                rotation: -4,
                ease: 'back.out(0.7)',
                duration: 1.6,
                delay: 0.0,
            }),

            //
            gsap.to(storyImage4Ref.value, {
                xPercent: 45,
                rotation: 4,
                ease: 'back.out(0.7)',
                duration: 1.6,
                delay: 0.2,
            }),

            //
            gsap.fromTo(
                storyImage5Ref.value,
                { yPercent: 85, rotation: -40, opacity: 0 },
                {
                    yPercent: -12,
                    rotation: 2,
                    opacity: 1,
                    ease: 'back.out(0.7)',
                    duration: 1.6,
                    delay: 0.6,
                }
            ),
        ],
        '+=1.0'
    );

    scrollTriggerInstance = ScrollTrigger.create({
        trigger: mastheadRef.value,
        start: 'top top',
        end: '+=400%',
        scrub: true,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
            // These will have to change based on timeline changing.
            toggleNavZ(self.progress > 0.025);
            toggleNavInvert(self.progress > 0.5);
        },
        animation: tl,
        onLeave: () => toggleNavZ(true),
        onLeaveBack: () => toggleNavZ(false),
    });
};

const setupLogoAnimation = async () => {
    await nextTick();

    logoSplit && logoSplit.revert();

    gsap.set(logoRef.value, { opacity: 1 });

    logoSplit = new SplitText(logoRef.value, { type: 'chars' });

    gsap.fromTo(
        logoSplit.chars,
        { opacity: 0, scale: 2 },
        {
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            ease: 'back.inOut(1.2)',
            duration: 0.9,
        },
        '0.2'
    );
};

onMounted(async () => {
    await setupScrollAnimation();
    await setupLogoAnimation();
});

onUnmounted(() => {
    taglineSplit && taglineSplit.revert();
    logoSplit && logoSplit.revert();
    descriptionSplit && descriptionSplit.revert();
});
</script>

<template>
    <section ref="mastheadRef" class="relative w-screen h-screen pointer-events-none">
        <div ref="mastheadInnerRef" class="relative w-screen h-screen">
            <div ref="copyRef" class="absolute bottom-0 left-0 right-0 w-full">
                <div class="w-full grid grid-cols-wrapper">
                    <div class="relative col-main pb-12 pt-9 bg-brand-cream">
                        <p ref="descriptionRef" class="text-brand-gray max-w-[530px] lg:max-w-[700px] font-helveticaDisplay font-medium text-[24px] lg:text-[28px] leading-7 lg:leading-9">
                            <span class="text-black">We’re Righteous.</span><br />
                            A small team of product and agency veterans, crafting clean strategy, smart UX, and tight code for brands and startups who want results -- without the pitch theater.
                        </p>
                        <div ref="handRef" class="mix-blend-exclusion absolute right-0 bottom-0 top-0">
                            <img src="@/assets/images/skelehand.png" alt="Skelehand" class="h-full w-auto transform scale-110 opacity-10 md:opacity-100" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="overflow-hidden w-full h-full relative">
                <div ref="mediaRef" class="w-full h-full">
                    <img ref="imageRef" src="@/assets/images/placeholder-image.jpg" alt="Placeholder" class="w-full h-full object-cover object-center" />
                    <div ref="logoRef" class="absolute inset-0 w-full h-full flex items-center justify-center">
                        <h2 class="font-canela text-brand-cream text-[13vw] tracking-tight">Righteous</h2>
                    </div>
                </div>
            </div>
        </div>
        <div ref="storiesRef" class="absolute top-0 left-0 right-0 w-screen min-h-screen bg-brand-charcoal">
            <div class="absolute top-1/2 right-0 bottom-0 w-full h-1/2 min-w-[1024px] lg:min-w-[1440px] left-1/2 transform -translate-x-1/2 lg:translate-y-[20%]">
                <div ref="storyImage1Ref" class="absolute top-0 left-0 rounded-lg overflow-hidden w-[40%] z-20">
                    <img src="@/assets/images/britny-fox.png" alt="Placeholder" class="w-full h-auto" />
                </div>
                <div ref="storyImage2Ref" class="absolute top-0 left-[25%] rounded-lg overflow-hidden w-[34%] z-30">
                    <img src="@/assets/images/stussy.png" alt="Placeholder" class="w-full h-auto" />
                </div>
                <div ref="storyImage5Ref" class="absolute top-0 left-[50%] w-[45%] sm:w-[50%] z-50">
                    <div class="transform -translate-x-1/2 rounded-lg overflow-hidden">
                        <img src="@/assets/images/team.png" alt="Placeholder" class="w-full h-auto" />
                        <div class="bg-[#FD26B7] absolute inset-0 mix-blend-multiply"></div>
                        <div
                            class="absolute top-1/2 left-1/2 sm:translate-x-0 -translate-x-1/2 sm:left-0 w-3/5 transform sm:-translate-y-1/2 flex gap-1 sm:gap-4 flex-col sm:flex-row sm:w-full p-4 tracking-wider"
                        >
                            <div class="bg-brand-charcoal flex-1 rounded-md text-white px-2 py-2 leading-tight sm:leading-snug font-grotesk text-[12px] transform sm:translate-x-0 -translate-x-1/4">
                                <p>Ash Warren</p>
                                <p class="text-[10px]">Development</p>
                                <p class="uppercase text-brand-pink mt-1">Hosoi</p>
                            </div>
                            <div class="bg-brand-charcoal flex-1 rounded-md text-white px-2 py-2 leading-tight sm:leading-snug font-grotesk text-[12px]">
                                <p>Jeff Black</p>
                                <p class="text-[10px]">Director</p>
                                <p class="uppercase text-brand-pink mt-1">Roskopp</p>
                            </div>
                            <div class="bg-brand-charcoal flex-1 rounded-md text-white px-2 py-2 leading-tight sm:leading-snug font-grotesk text-[12px] transform sm:translate-x-0 translate-x-1/4">
                                <p>Scott Cook</p>
                                <p class="text-[10px]">Creative</p>
                                <p class="uppercase text-brand-pink mt-1">Hawk</p>
                            </div>
                        </div>
                    </div>
                    <div class="absolute top-0 transform -translate-y-full py-2 tracking-wider w-[37.5%] sm:w-1/2 text-right">
                        <div class="text-white leading-snug font-grotesk text-[8px] sm:text-[10px]">
                            <p class="uppercase text-brand-pink">Close, But No Cigar</p>
                            <p class="mt-1">This is what AI thinks we look like. 👎🏻 <br />This is why you still need us.</p>
                        </div>
                    </div>
                </div>
                <div ref="storyImage3Ref" class="absolute top-0 left-[50%] rounded-lg overflow-hidden w-[28%] z-40">
                    <img src="@/assets/images/blondie.png" alt="Placeholder" class="w-full h-auto" />
                </div>
                <div ref="storyImage4Ref" class="absolute top-0 left-[75%] rounded-lg overflow-hidden w-[36%] z-10">
                    <img src="@/assets/images/mtv.png" alt="Placeholder" class="w-full h-auto" />
                </div>
            </div>
            <div class="relative w-full grid grid-cols-wrapper">
                <div class="relative col-main pt-[12vh] lg:pt-[18vh]">
                    <p
                        ref="taglineRef"
                        class="text-[#323231] max-w-[650px] font-helveticaDisplay font-light text-[30px] sm:text-[34px] lg:text-[40px] leading-[1.125] lg:leading-[1.25] tracking-tight"
                    >
                        We've got more stories than Blockbuster had late fees, but we aim to make this one the most memorable.
                        <br />
                        <span class="inline-block font-grotesk text-[12px] bg-[#323231] px-3 py-1 rounded-sm font-medium tracking-widest">ATLANTA + ST. LOUIS</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
