<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, watch } from 'vue';
import { isNavInverted } from '@/composables/useScrollState';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '@/utils/gsap-premium/src/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const aboutRef = ref(null);
const taglineRef = ref(null);

let scrollTriggerInstance = null;
let taglineSplit = null;

const resizeTick = inject('resizeTick');

watch(resizeTick, () => {
    setupScrollAnimation();
});

const setupScrollAnimation = async () => {
    await nextTick();

    scrollTriggerInstance?.kill();
    taglineSplit && taglineSplit.revert();

    const tl = gsap.timeline({ paused: true });

    taglineSplit = new SplitText(taglineRef.value, { type: 'lines' });

    tl.add(
        [
            //
            gsap.fromTo(
                taglineSplit.lines,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    ease: 'power2.out',
                    duration: 0.5,
                }
            ),
        ],
        '+=0.0'
    );

    scrollTriggerInstance = ScrollTrigger.create({
        trigger: aboutRef.value,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: true,
        pinSpacing: true,
        animation: tl,
        onUpdate: (self) => {
            // isNavInverted.value = self.progress > 0.385;
        },
        onEnter: () => {
            isNavInverted.value = false;
        },
        // onLeave: () => {
        //     isNavZActive.value = true;
        // },
        onLeaveBack: () => {
            isNavInverted.value = true;
        },
    });
};

onMounted(async () => {
    await setupScrollAnimation();
});

onUnmounted(() => {
    scrollTriggerInstance?.kill();

    taglineSplit && taglineSplit.revert();
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
