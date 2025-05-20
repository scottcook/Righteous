<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, watch } from 'vue';
import { isNavZActive, isNavInverted, isNoiseActive } from '@/composables/useScrollState';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '@/utils/gsap-premium/src/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// DOM refs
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
const storyImage5CaptionRef = ref(null);
const imageRef = ref(null);
const videoRef = ref(null);
const copyRef = ref(null);
const descriptionRef = ref(null);
const handRef = ref(null);
const logoRef = ref(null);
const teamMember1Ref = ref(null);
const teamMember2Ref = ref(null);
const teamMember3Ref = ref(null);

// GSAP instances
let scrollTriggerInstance = null;
let descriptionSplit = null;
let logoSplit = null;
let taglineSplit = null;

// Injected dependencies
const resizeTick = inject('resizeTick');

// Watchers
watch(resizeTick, () => {
    setupScrollAnimation();
    if (videoRef.value && ScrollTrigger.getById('mastheadTrigger')?.progress <= 0.5) {
        videoRef.value.play();
    }
});

// Helpers
const handleVideoReady = () => {
    gsap.to(imageRef.value, { opacity: 0, duration: 1, ease: 'power2.out' });
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

// Animations
const setupScrollAnimation = async () => {
    await nextTick();

    const { horizontalCropPercent, copyHeight, navHeight } = getClipSettings();

    scrollTriggerInstance?.kill();
    taglineSplit?.revert();
    descriptionSplit?.revert();

    gsap.set(mediaRef.value, { clipPath: 'inset(0px 0px 0px 0px round 0px)', willChange: 'clip-path' });
    gsap.set(imageRef.value, { scale: 1, willChange: 'transform', opacity: 1 });
    gsap.set(descriptionRef.value, { opacity: 1 });
    gsap.set(handRef.value, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    descriptionSplit = new SplitText(descriptionRef.value, { type: 'lines' });
    taglineSplit = new SplitText(taglineRef.value, { type: 'words, chars' });

    // Section 1: Setup + media crop
    tl.add(
        [
            gsap.set(storiesRef.value, { backgroundColor: '#151515' }),
            gsap.to(mediaRef.value, {
                clipPath: `inset(${navHeight}px ${horizontalCropPercent}% ${copyHeight}px ${horizontalCropPercent}% round 8px)`,
                ease: 'power2.out',
                duration: 1,
            }),
            gsap.to(imageRef.value, { scale: 1.1, ease: 'power1.in', duration: 1 }),
            gsap.to(logoRef.value, { yPercent: -7, scale: 0.9, ease: 'power2.out', duration: 1 }),
        ],
        '+=0.0'
    );

    // Section 2: Description & hand
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
            gsap.fromTo(
                handRef.value,
                { opacity: 0, y: 50, rotation: 10 },
                {
                    opacity: 0.75,
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

    // Section 3: Tagline and media fade
    tl.add(
        [
            gsap.fromTo(
                storiesRef.value,
                { yPercent: 200, rotation: -30 },
                {
                    yPercent: 0,
                    rotation: 0,
                    ease: 'power1.inOut',
                    duration: 3,
                }
            ),
            gsap.fromTo(
                taglineRef.value,
                { yPercent: 100, rotation: 0 },
                {
                    yPercent: 0,
                    rotation: 0,
                    ease: 'back.inOut(0.7)',
                    duration: 3,
                    delay: 0.5,
                }
            ),
            gsap.to(mastheadInnerRef.value, { scale: 0.9, opacity: 0.6, ease: 'power1.in', duration: 2 }),

            gsap.to(descriptionRef.value, {
                opacity: 0,
                y: 100,
                rotation: -5,
                xPercent: -50,
                scale: 1.5,
                transformOrigin: '0 0',
                ease: 'power2.inOut',
                duration: 1,
                delay: 0.5,
            }),
            gsap.to(handRef.value, {
                opacity: 0,
                scale: 2,
                y: 50,
                xPercent: 50,
                rotation: 10,
                ease: 'back.out(1.7)',
                duration: 1,
                delay: 0.7,
            }),
        ],
        '+=2.0'
    );

    // Section 4: Highlight text + story entries in
    tl.add(
        [
            gsap.to(taglineSplit.chars, {
                color: 'white',
                stagger: 0.02,
                ease: 'power1.in',
                duration: 0.02,
            }),
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
    // Ensure background rotation is zero as story images come in
    tl.add(
        gsap.to(storiesRef.value, { rotation: 0, duration: 0.6, ease: 'power1.out' })
    );

    // Section 5: Team images in (stacked cards -> spread)
    tl.add([
        // Fade out the earlier story images
        gsap.to([storyImage1Ref.value, storyImage2Ref.value, storyImage3Ref.value, storyImage4Ref.value], {
            opacity: 0,
            yPercent: 60,
            duration: 1.2,
            ease: 'power2.in',
            delay: 0.4,
        }),

        // Team cards animate from stacked / overlapping centre-bottom to final grid spots
        gsap.fromTo(teamMember1Ref.value,
            { y: '100vh', x: 150, scale: 0.8, rotation: -6 },
            { y: 0, x: 0, scale: 1, rotation: 0, ease: 'power3.out', duration: 1.3, delay: 0.15 }
        ),
        gsap.fromTo(teamMember2Ref.value,
            { y: '100vh', x: 0,   scale: 0.8, rotation: 0 },
            { y: 0, x: 0, scale: 1, rotation: 0, ease: 'power3.out', duration: 1.3, delay: 0.35 }
        ),
        gsap.fromTo(teamMember3Ref.value,
            { y: '100vh', x: -150, scale: 0.8, rotation: 6 },
            { y: 0, x: 0, scale: 1, rotation: 0, ease: 'power3.out', duration: 1.3, delay: 0.55 }
        ),
    ], '+=1.4');

    // Section 6: Final color lock
    tl.add([
        gsap.fromTo(
            storiesRef.value,
            { backgroundColor: '#151515' },
            {
                backgroundColor: '#151515',
                ease: 'power1.inOut',
                duration: 1,
                delay: 2,
            }
        ),
    
    ]);

    // Section 7: Add hold/pause to scroll
    tl.add(gsap.to({}, { duration: 0.4 }));

    // ScrollTrigger setup
    scrollTriggerInstance = ScrollTrigger.create({
        id: 'mastheadTrigger',
        trigger: mastheadRef.value,
        start: 'top top',
        end: '+=600%',
        scrub: true,
        pin: true,
        pinSpacing: true,
        animation: tl,
        onUpdate: (self) => {
            isNavZActive.value = self.progress > 0.02;
            isNavInverted.value = self.progress > 0.385;
            isNoiseActive.value = self.progress <= 0.385;

            if (videoRef.value) {
                if (self.progress > 0.385) {
                    videoRef.value.pause();
                } else {
                    videoRef.value.play();
                }
            }
        },
        onLeave: () => {
            isNavZActive.value = true;
            isNoiseActive.value = true;
        },
        onLeaveBack: () => {
            isNavZActive.value = false;
            isNoiseActive.value = false;
        },
    });
};

const setupLogoAnimation = async () => {
    await nextTick();
    logoSplit?.revert();
    gsap.set(logoRef.value, { opacity: 1 });
    logoSplit = new SplitText(logoRef.value, { type: 'chars' });
    gsap.fromTo(
        logoSplit.chars,
        {
            opacity: 0,
            scale: 2,
        },
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
    scrollTriggerInstance?.kill();
    taglineSplit?.revert();
    logoSplit?.revert();
    descriptionSplit?.revert();
});
</script>

<template>
    <section ref="mastheadRef" class="relative w-screen h-screen pointer-events-none z-10">
        <div ref="mastheadInnerRef" class="relative w-screen h-screen">
            <div ref="copyRef" class="absolute bottom-0 left-0 right-0 w-full">
                <div class="w-full grid grid-cols-wrapper">
                    <div class="relative col-main pb-12 pt-9">
                        <p ref="descriptionRef" class="text-brand-gray max-w-[530px] lg:max-w-[700px] font-helveticaDisplay font-medium text-[24px] lg:text-[28px] leading-7 lg:leading-9">
                            <span class="text-black">We're Righteous.</span><br />
                            A small team of product and agency veterans, crafting clean strategy, smart UX, and tight code for brands and startups who want results -- without the pitch theater.
                        </p>
                        <div ref="handRef" class="mix-blend-exclusion absolute right-0 bottom-0 top-0">
                            <img src="@/assets/images/skelehand.png" alt="Skelehand" class="h-full w-auto transform scale-110 opacity-10 md:opacity-100" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="overflow-hidden w-full h-full relative">
                <div ref="mediaRef" class="relative w-full h-full">
                    <video ref="videoRef" autoplay muted loop playsinline @canplay="handleVideoReady" class="absolute inset-0 w-full h-full object-cover object-center">
                        <source src="@/assets/videos/righteous-hero2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <img ref="imageRef" src="@/assets/images/placeholder-image.jpg" alt="Placeholder" class="absolute inset-0 w-full h-full object-cover object-center" />
                    <div class="radial-gradient-overlay"></div>
                    <div ref="logoRef" class="absolute inset-0 w-full h-full flex items-center justify-center">
                        <h2 class="font-canela text-brand-cream text-[13vw] tracking-tight">Righteous</h2>
                    </div>
                </div>
            </div>
        </div>
        <div ref="storiesRef" class="absolute top-0 left-0 right-0 w-screen min-h-screen">
            <div class="absolute top-1/2 right-0 bottom-0 h-1/2 w-[1024px] lg:w-[1440px] left-1/2 transform -translate-x-1/2 lg:translate-y-[20%]">
                <div ref="storyImage1Ref" class="absolute top-0 left-[-5%] rounded-lg overflow-hidden w-[40%] z-20 shadow-2xl">
                    <img src="@/assets/images/britny-fox.jpg" alt="Placeholder" class="w-full h-auto" />
                </div>
                <div ref="storyImage2Ref" class="absolute top-0 left-[25%] rounded-lg overflow-hidden w-[32%] z-30 shadow-2xl">
                    <img src="@/assets/images/stussy.jpg" alt="Placeholder" class="w-full h-auto" />
                </div>
                <div ref="storyImage3Ref" class="absolute top-0 left-[50%] rounded-lg overflow-hidden w-[28%] z-40 shadow-2xl">
                    <img src="@/assets/images/blondie.jpg" alt="Placeholder" class="w-full h-auto" />
                </div>
                <div ref="storyImage4Ref" class="absolute top-0 left-[70%] rounded-lg overflow-hidden w-[36%] z-10 shadow-2xl">
                    <img src="@/assets/images/mtv.jpg" alt="Placeholder" class="w-full h-auto" />
                </div>
            </div>
            <div class="relative w-full grid grid-cols-wrapper mt-8">
                <div class="col-main pt-[12vh] lg:pt-[12vh]">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">
                        <p ref="taglineRef" class="order-0 sm:order-2 text-[#323231] max-w-[650px] font-helveticaDisplay font-light text-[20px] sm:text-[24px] lg:text-[36px] leading-[1.25] tracking-normal sm:text-left">
                            No filler NPCs. Just veteran agency and product leaders, rolling initiative and making bold moves for brands and products that dare. 
                            <br />
                      
                        </p>
                        <p class="order-1 sm:order-1 top-0 text-brand-cream max-w-[850px] font-canela font-light text-[30px] sm:text-[34px] lg:text-[90px] leading-[1.25] tracking-tight sm:text-left">
                            Leadership
                            <br />
                            <span class="inline-block font-grotesk text-[12px] bg-[#323231] px-3 py-1 rounded-sm font-medium tracking-widest">ATLANTA + ST. LOUIS</span>
                        </p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-y-10 sm:gap-y-0 gap-x-8 md:gap-x-12 lg:gap-x-16 mt-14 mb-24 lg:mb-40 w-full">
                        <div ref="teamMember1Ref" class="flex flex-col items-center w-full max-w-[380px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px] opacity-1 justify-self-start">
                            <img src="@/assets/images/member1.png" alt="Ash Warren" class="rounded-2xl w-full object-cover aspect-[1/1.1] mb-6 shadow-none border-0" />
                            <div class="mt-0 text-white px-0 py-0 leading-tight w-full text-center">
                                <p class="font-grotesk text-[1.2rem] md:text-[1.2rem] font-medium text-brand-cream leading-tight mb-2 text-left">Jeff Black</p>
                                <p class="font-grotesk text-[1rem] md:text-[1rem] uppercase tracking-wider text-brand-cream text-left">Partner + Director</p>
                            </div>
                        </div>
                        <div ref="teamMember2Ref" class="flex flex-col items-center w-full max-w-[380px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px] opacity-1 justify-self-center">
                            <img src="@/assets/images/member2.png" alt="Jeff Black" class="rounded-2xl w-full object-cover aspect-[1/1.1] mb-6 shadow-none border-0" />
                            <div class="mt-0 text-white px-0 py-0 leading-tight w-full text-center">
                                <p class="font-grotesk text-[1.2rem] md:text-[1.2rem] font-medium text-brand-cream leading-tight mb-2 text-left">Ash Warren</p>
                                <p class="font-grotesk text-[1rem] md:text-[1rem] uppercase tracking-wider text-brand-cream text-left">Partner + Development</p>
                            </div>
                        </div>
                        <div ref="teamMember3Ref" class="flex flex-col items-center w-full max-w-[380px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px] opacity-1 justify-self-end">
                            <img src="@/assets/images/member3.png" alt="Scott Cook" class="rounded-2xl w-full object-cover aspect-[1/1.1] mb-6 shadow-none border-0" />
                            <div class="mt-0 text-white px-0 py-0 leading-tight w-full text-center">
                                    <p class="font-grotesk text-[1.2rem] md:text-[1.2rem] font-medium text-brand-cream leading-tight mb-2 text-left">Scott Cook</p>
                                <p class="font-grotesk text-[1rem] md:text-[1rem] uppercase tracking-wider text-brand-cream text-left">Partner + Creative</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.radial-gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.33) 0%, rgba(0, 0, 0, 0.1) 100%);
}
</style>
