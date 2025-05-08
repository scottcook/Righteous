<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { ref, onMounted } from 'vue';

const isActive = ref(false);

onMounted(() => {
    ScrollTrigger.create({
        trigger: '.content-wrapper',
        start: 'top top',
        bottom: 'top bottom',
        markers: false,
        onToggle: (self) => {
            isActive.value = self.isActive;
            // console.log('toggled, isActive:', isActive.value);
        },
    });
});
</script>

<template>
    <div class="fixed z-10 right-0 top-1/2 -translate-y-1/2 duration-300 ease-out transform transition" :class="isActive ? 'translate-x-0 shadow-talk' : 'translate-x-full shadow-none'">
        <a href="#book-a-demo" class="block no-underline hover:scale-95 duration-300 ease-out transform transition origin-right"
            ><span class="sr-only">Let's Talk</span><img src="./../assets/images/talk-button.png" alt="Let's Talk" class="w-[47px] lg:w-[67px] h-auto m-0"
        /></a>
    </div>
</template>

<style scoped lang="postcss"></style>
