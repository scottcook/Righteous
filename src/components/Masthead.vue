<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mediaRef = ref(null);
const sectionRef = ref(null);
const imageRef = ref(null);
const copyRef = ref(null);

let resizeTimeout = null;

const getClipSettings = () => {
    const screenWidth = window.innerWidth;
    const maxWidth = 1440;
    const targetWidth = screenWidth > maxWidth ? maxWidth : screenWidth - 40;
    const horizontalCropPercent = ((screenWidth - targetWidth) / 2 / screenWidth) * 100;
    const copyHeight = copyRef.value?.offsetHeight || 0;

    // Match your original nav height logic
    const navHeight = screenWidth >= 1024 ? 102 : 70;

    return { horizontalCropPercent, copyHeight, navHeight };
};

const clearTriggers = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

const setupScrollAnimation = () => {
    const { horizontalCropPercent, copyHeight, navHeight } = getClipSettings();

    gsap.set(mediaRef.value, { clipPath: 'inset(0% 0% 0% 0% round 0px)' });
    gsap.set(imageRef.value, { scale: 1 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top top',
            end: '+=100%',
            scrub: true,
            pin: true,
            pinSpacing: true,
        },
    });

    tl.to(mediaRef.value, {
        clipPath: `inset(${navHeight}px ${horizontalCropPercent}% ${copyHeight}px ${horizontalCropPercent}% round 8px)`,
        ease: 'power2.out',
    }).to(
        imageRef.value,
        {
            scale: 1.1,
            ease: 'power1.in',
        },
        '<'
    );
};

const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        clearTriggers();
        setupScrollAnimation();
        ScrollTrigger.refresh();
    }, 200);
};

onMounted(async () => {
    await nextTick();
    requestAnimationFrame(setupScrollAnimation);
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
});

defineExpose({ updateClipAndScale: setupScrollAnimation });
</script>

<template>
    <section ref="sectionRef" class="relative w-screen h-screen pointer-events-none">
        <div ref="copyRef" class="absolute bottom-0 left-0 right-0 w-full">
            <div class="w-full grid grid-cols-wrapper">
                <div class="col-main pb-12 pt-9">
                    <p class="text-brand-gray max-w-[680px] font-helveticaDisplay font-medium text-[28px] leading-9">
                        <span class="text-black">We’re Righteous.</span><br />A small team of product and agency veterans, crafting clean strategy, smart UX, and tight code for brands and startups who
                        want results -- without the pitch theater.
                    </p>
                </div>
            </div>
        </div>
        <div class="overflow-hidden w-full h-full relative">
            <div ref="mediaRef" class="w-full h-full">
                <img ref="imageRef" src="@/assets/images/placeholder-image.jpg" alt="Placeholder" class="w-full h-full object-cover object-center" />
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
