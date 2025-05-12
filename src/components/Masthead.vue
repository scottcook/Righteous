<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, watch } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '@/utils/gsap-premium/src/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const mediaRef = ref(null);
const mastheadRef = ref(null);
const storiesRef = ref(null);
const taglineRef = ref(null);
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

    gsap.set(mediaRef.value, { clipPath: 'inset(0% 0% 0% 0% round 0px)', willChange: 'clip-path' });
    gsap.set(imageRef.value, { scale: 1, willChange: 'transform' });
    gsap.set(descriptionRef.value, { opacity: 1 });
    gsap.set(handRef.value, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    descriptionSplit = new SplitText(descriptionRef.value, { type: 'lines' });
    taglineSplit = new SplitText(taglineRef.value, { type: 'words, chars' });

    tl.to(mediaRef.value, {
        clipPath: `inset(${navHeight}px ${horizontalCropPercent}% ${copyHeight}px ${horizontalCropPercent}% round 8px)`,
        ease: 'power2.out',
    });
    tl.to(
        imageRef.value,
        {
            scale: 1.1,
            ease: 'power1.in',
        },
        '<'
    );
    tl.to(
        logoRef.value,
        {
            yPercent: 7,
            ease: 'power1.out',
        },
        '<'
    );

    tl.fromTo(
        descriptionSplit.lines,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: 'power1.inOut',
        },
        '>-0.2'
    );

    tl.fromTo(
        handRef.value,
        { opacity: 0, y: 50, rotation: 10 },
        {
            opacity: 1,
            y: 0,
            rotation: 0,
            ease: 'back.inOut',
        },
        '>-0.4'
    );

    tl.fromTo(
        [storiesRef.value, taglineRef.value],
        { yPercent: 100, rotation: -30 },
        {
            yPercent: 0,
            rotation: 1,
            ease: 'power1.in',
            duration: 2.8,
            stagger: 0.2,
        },
        '>'
    );

    tl.to(
        taglineSplit.chars,
        {
            color: 'white',
            stagger: 0.01,
            ease: 'power1.in',
            duration: 0.01,
        },
        '-=0.4'
    );

    console.log('Timeline duration:', tl.duration());

    scrollTriggerInstance = ScrollTrigger.create({
        trigger: mastheadRef.value,
        start: 'top top',
        end: '+=300%',
        scrub: true,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
            toggleNavZ(self.progress > 0.15);
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
    </section>

    <section ref="storiesRef" class="fixed bottom-0 left-0 right-0 w-screen min-h-screen bg-brand-charcoal">
        <div class="w-full grid grid-cols-wrapper">
            <div class="relative col-main pt-[18vh]">
                <p ref="taglineRef" class="text-brand-gray max-w-[530px] lg:max-w-[650px] font-helveticaDisplay font-light text-[24px] lg:text-[40px] leading-7 lg:leading-[1.25] tracking-tight">
                    We've got more stories than Blockbuster had late fees, but we aim to make this one the most memorable.
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
