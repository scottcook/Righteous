<script setup>
import { onMounted, onUnmounted, provide } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from '@/utils/gsap-premium/src/ScrollSmoother';

import Header from './components/Header.vue';
import Masthead from './components/Masthead.vue';
import About from './components/About.vue';
import { useResizeBus } from './composables/useResizeBus';
import NoiseCanvas from './components/NoiseCanvas.vue';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const { resizeTick, triggerResize } = useResizeBus();
provide('resizeTick', resizeTick); // Make the reactive tick available to children

let resizeTimeout;

const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        triggerResize(); // Notify children
        ScrollTrigger.refresh();
    }, 250);
};

onMounted(() => {
    window.history.scrollRestoration = 'manual';
    ScrollTrigger.clearScrollMemory('manual');

    if (!ScrollSmoother.get()) {
        ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.25,
            effects: false,
            normalizeScroll: true,
            ease: 'power3.out',
            smoothTouch: 0.1,
        });
    }

    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <Header />
    <div id="smooth-wrapper" class="z-20">
        <NoiseCanvas />
        <div id="smooth-content">
            <main id="maincontent" class="">
                <Masthead />
                <div class="h-[150px] lg:h-[300px]"></div>
                <About />
            </main>
        </div>
    </div>
    <!-- <Footer /> -->
</template>

<style scoped lang="postcss"></style>
