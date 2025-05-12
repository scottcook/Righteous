<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '@/utils/gsap-premium/src/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const mediaRef = ref(null);
const sectionRef = ref(null);
const imageRef = ref(null);
const copyRef = ref(null);
const descriptionRef = ref(null);
const handRef = ref(null);
const logoRef = ref(null);

let resizeTimeout = null;
let descriptionSplit = null;
let logoSplit = null;

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

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    descriptionSplit && descriptionSplit.revert();

    gsap.set(mediaRef.value, { clipPath: 'inset(0% 0% 0% 0% round 0px)' });
    gsap.set(imageRef.value, { scale: 1 });
    gsap.set(descriptionRef.value, { opacity: 1 });
    gsap.set(handRef.value, { opacity: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top top',
            end: '+=100%',
            scrub: true,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const nav = document.querySelector('#nav');
                if (self.progress < 0.1 && nav?.classList.contains('z-50')) {
                    nav.classList.remove('z-50');
                }
                if (self.progress > 0.15) {
                    nav.classList.add('z-50');
                }
            },
            onLeave: () => {
                const nav = document.querySelector('#nav');
                nav?.classList.add('z-50');
            },
            onLeaveBack: () => {
                const nav = document.querySelector('#nav');
                nav?.classList.remove('z-50');
            },
        },
    });

    tl.to(mediaRef.value, {
        clipPath: `inset(${navHeight}px ${horizontalCropPercent}% ${copyHeight}px ${horizontalCropPercent}% round 8px)`,
        ease: 'power2.out',
    })
        .to(
            imageRef.value,
            {
                scale: 1.1,
                ease: 'power1.in',
            },
            '<'
        )
        .to(
            logoRef.value,
            {
                yPercent: 7,
                ease: 'power1.out',
            },
            '<'
        );

    descriptionSplit = new SplitText(descriptionRef.value, { type: 'lines' });

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

const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setupScrollAnimation();
        ScrollTrigger.refresh();
    }, 250);
};

onMounted(async () => {
    await setupScrollAnimation();
    await setupLogoAnimation();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
    descriptionSplit && descriptionSplit.revert();
});

defineExpose({ updateClipAndScale: setupScrollAnimation });
</script>

<template>
    <section ref="sectionRef" class="relative w-screen h-screen pointer-events-none min-h-[720px]">
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
                <div ref="logoRef" class="absolute inset-0 w-full h-full flex items-center justify-center"><h2 class="font-canela text-brand-cream text-[13vw] tracking-tight">Righteous</h2></div>
            </div>
        </div>
    </section>
</template>

<style scoped>
[ref='mediaWrapper'] {
    will-change: clip-path;
}

[ref='imageRef'] {
    will-change: transform;
}
</style>
