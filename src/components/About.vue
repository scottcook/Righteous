<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, watch } from 'vue';
import { isNavInverted } from '@/composables/useScrollState';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '@/utils/gsap-premium/src/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const aboutRef = ref(null);
const taglineRef = ref(null);
const cardRef = ref(null);
const cardInnerRef = ref(null);
const cardShadowRef = ref(null);
const glareRef = ref(null);

let scrollTriggerInstance = null;
let taglineSplit = null;

const resizeTick = inject('resizeTick');
const tiltEffectEnabled = ref(false);
let bounds = null;

const enableCardTilt = () => {
    if (!cardInnerRef.value || !glareRef.value || tiltEffectEnabled.value) return;

    const $card = cardInnerRef.value;
    const $glare = glareRef.value;
    const $shadow = cardShadowRef.value;

    const moveToMouse = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2,
        };

        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
        const rotationX = center.y / 50;
        const rotationY = -center.x / 50;
        const shadowOffsetX = -rotationY * 5;
        const shadowOffsetY = rotationX * 5;
        const shadowBlur = 20 + distance / 120;

        gsap.to($card, {
            scale: 1.1,
            rotationX,
            rotationY,
            transformPerspective: 500,
            ease: 'power2.out',
            boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 6px rgba(72, 65, 56, 0.4)`,
        });

        gsap.to($shadow, {
            rotationX: rotationX,
            rotationY: rotationY,
            scale: 1.05,
            transformPerspective: 500,
            ease: 'power2.out',
            duration: 0.4,
        });

        gsap.to($glare, {
            autoAlpha: 1,
            backgroundImage: `
        radial-gradient(
          circle at
          ${center.x * 2 + bounds.width / 2}px
          ${center.y * 2 + bounds.height / 2}px,
          rgba(255, 255, 255, 0.33),
          rgba(0, 0, 0, 0.06)
        )
      `,
        });
    };

    const handleMouseEnter = () => {
        bounds = $card.getBoundingClientRect();
        document.addEventListener('mousemove', moveToMouse);
        gsap.to($card, {
            scale: 1.1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
        });
    };

    const handleMouseLeave = () => {
        document.removeEventListener('mousemove', moveToMouse);
        gsap.to($card, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            ease: 'power2.out',
        });

        gsap.to($shadow, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
        });

        gsap.to($glare, {
            autoAlpha: 0,
            duration: 0.6,
        });
    };

    const handleCardClick = () => {
        gsap.to($card, {
            rotationY: '+=360',
            ease: 'back.inOut(0.7)',
            duration: 1.2,
        });
    };

    $card.addEventListener('mouseenter', handleMouseEnter);
    $card.addEventListener('mouseleave', handleMouseLeave);
    $card.addEventListener('click', handleCardClick);

    tiltEffectEnabled.value = true;
};

const disableCardTilt = () => {
    if (!cardInnerRef.value || !tiltEffectEnabled.value) return;
    cardInnerRef.value.removeEventListener('mouseenter', () => {});
    cardInnerRef.value.removeEventListener('mouseleave', () => {});
    cardInnerRef.value.removeEventListener('click', () => {});
    document.removeEventListener('mousemove', () => {});
    tiltEffectEnabled.value = false;
};

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
            gsap.fromTo(
                taglineRef.value,
                { yPercent: 100, rotation: -17 },
                {
                    yPercent: 0,
                    rotation: -2,
                    ease: 'back.inOut(0.7)',
                    duration: 1.5,
                }
            ),
            gsap.fromTo(
                taglineSplit.lines,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    ease: 'power2.out',
                    duration: 0.5,
                    delay: 0.5,
                }
            ),
        ],
        '+=0.0'
    );

    tl.add(
        [
            //
            gsap.fromTo(
                cardInnerRef.value,
                { yPercent: -105, rotation: 23, opacity: 0, transformOrigin: '50% 50%' },
                {
                    yPercent: -5,
                    rotation: 3,
                    opacity: 1,
                    ease: 'back.out(0.7)',
                    duration: 1.5,
                    transformOrigin: '50% 50%',
                    onComplete: () => {
                        enableCardTilt();
                    },
                }
            ),

            //
            gsap.fromTo(
                cardShadowRef.value,
                { yPercent: 105, rotation: -23, opacity: 0, transformOrigin: '50% 50%' },
                {
                    yPercent: 10,
                    xPercent: 3,
                    rotation: -5,
                    opacity: 1,
                    ease: 'back.out(0.7)',
                    duration: 1.5,
                    transformOrigin: '50% 50%',
                }
            ),
        ],
        '-=0.8'
    );

    scrollTriggerInstance = ScrollTrigger.create({
        trigger: aboutRef.value,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: true,
        pinSpacing: true,
        animation: tl,
        onEnter: () => {
            isNavInverted.value = false;
        },
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
    disableCardTilt();
});
</script>

<template>
    <section ref="aboutRef" class="relative w-screen min-h-screen">
        <div ref="aboutInnerRef" class="relative w-screen h-screen bg-brand-cream">
            <div class="relative w-full grid grid-cols-wrapper">
                <div class="relative col-main pt-[12vh] lg:pt-[24vh] flex justify-between">
                    <p
                        ref="taglineRef"
                        class="text-brand-charcoal max-w-[700px] font-helveticaDisplay font-light text-[30px] sm:text-[34px] lg:text-[40px] leading-[1.25] tracking-tight flex-shrink-0 ml-12"
                    >
                        We’ve done time inside big agencies and product monoliths. We’ve sat through the 90-slide decks.<br /><span class="font-medium mt-10 block"
                            >We formed Righteous to be the antidote.</span
                        >
                    </p>
                    <div ref="cardRef" class="relative flex-shrink-0 w-[256px] h-[360px] mr-12">
                        <div
                            ref="cardInnerRef"
                            class="relative rounded-xl overflow-hidden text-center py-12 leading-none bg-brand-charcoal text-white font-grotesk uppercase text-[28px] flex flex-col justify-between items-center w-full h-full"
                        >
                            <div class="absolute top-5 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white"></div>
                            <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white"></div>
                            <div class="absolute top-1/2 left-5 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white"></div>
                            <div class="absolute top-1/2 right-5 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white"></div>
                            <div class="flex flex-col gap-6">
                                <p>Product</p>
                                <p>Marketing</p>
                                <p>Kickflips</p>
                            </div>
                            <div class="inline-flex items-center justify-center bg-[#E336AB] rounded-full w-[64px] h-[64px] mt-auto">
                                <span class="font-canela font-black text-[38px] text-black">R</span>
                            </div>
                            <div ref="glareRef" class="absolute w-full h-full inset-0"></div>
                        </div>
                        <div
                            ref="cardShadowRef"
                            class="relative rounded-xl overflow-hidden w-full h-full blur"
                            style="background-image: linear-gradient(to bottom, rgba(21, 21, 21, 0.1) 0%, rgba(21, 21, 21, 0) 30%)"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
