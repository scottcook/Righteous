<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, watch } from 'vue';

const sectionRef = ref(null);

const resizeTick = inject('resizeTick');

watch(resizeTick, () => {
    setupScrollAnimation();
});

const setupScrollAnimation = async () => {
    await nextTick();
};

onMounted(async () => {
    await setupScrollAnimation();
});

onUnmounted(() => {});
</script>

<template>
    <section ref="sectionRef" class="relative w-screen min-h-screen bg-brand-charcoal"></section>
</template>

<style scoped></style>
