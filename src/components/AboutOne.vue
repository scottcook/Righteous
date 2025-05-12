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
    <section ref="sectionRef" class="relative w-screen min-h-screen bg-brand-cream"></section>
</template>

<style scoped></style>
