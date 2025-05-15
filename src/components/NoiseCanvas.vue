<template>
    <div class="bg-brand-cream fixed inset-0 pointer-events-none"></div>
    <canvas ref="noiseCanvas" class="fixed inset-0 pointer-events-none"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, inject } from 'vue';
import { isNoiseActive } from '@/composables/useScrollState';

const noiseCanvas = ref(null);
let animationFrameId = null;
let ctx = null;

const resizeTick = inject('resizeTick');

const resizeCanvas = () => {
    const canvas = noiseCanvas.value;
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
};

const generateNoise = (ctx, width, height) => {
    const imageData = ctx.createImageData(width, height);
    const buffer = new Uint32Array(imageData.data.buffer);
    for (let i = 0; i < buffer.length; i++) {
        const gray = Math.random() * 255;
        buffer[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray;
    }
    ctx.putImageData(imageData, 0, 0);
};

const animate = () => {
    const canvas = noiseCanvas.value;
    if (!canvas || !ctx) return;

    generateNoise(ctx, canvas.width, canvas.height);
    animationFrameId = requestAnimationFrame(animate);
};

const stopAnimation = () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
};

const toggleNoiseActive = (activate) => {
    stopAnimation();
    if (activate) {
        animate();
    }
};

onMounted(() => {
    const canvas = noiseCanvas.value;
    ctx = canvas.getContext('2d');

    resizeCanvas();
    if (isNoiseActive.value) {
        animate();
    }
});

onUnmounted(() => {
    stopAnimation();
});

watch(resizeTick, resizeCanvas);
watch(isNoiseActive, toggleNoiseActive);
</script>

<style scoped>
canvas {
    mix-blend-mode: overlay;
}
</style>
