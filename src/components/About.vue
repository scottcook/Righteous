<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, watch } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let scrollTriggerInstance = null;

const resizeTick = inject('resizeTick');

watch(resizeTick, () => {
    setupScrollAnimation();
});

const setupScrollAnimation = async () => {
    await nextTick();

    scrollTriggerInstance?.kill();
};

onMounted(async () => {
    await setupScrollAnimation();
});

onUnmounted(() => {
    scrollTriggerInstance?.kill();
});
</script>

<template>
    <section ref="aboutRef" class="relative w-screen min-h-screen">
        <div ref="aboutInnerRef" class="relative w-screen h-screen bg-brand-cream">
            <div class="relative w-full grid grid-cols-wrapper">
                <div class="relative col-main pt-[12vh] lg:pt-[24vh]">
                    <p ref="taglineRef" class="text-brand-charcoal max-w-[700px] font-helveticaDisplay font-light text-[30px] sm:text-[34px] lg:text-[40px] leading-[1.25] tracking-tight">
                        We’ve done time inside big agencies and product monoliths. We’ve sat through the 90-slide decks.<br /><span class="font-medium mt-10 block"
                            >We formed Righteous to be the antidote.</span
                        >
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
