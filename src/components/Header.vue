<script setup>
import gsap from 'gsap';
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { isNavZActive, isNavInverted } from '@/composables/useScrollState';
import SplitText from '@/utils/gsap-premium/src/SplitText';
let logoSplit = null;

const isDesktop = useMediaQuery('(min-width: 1024px)');

const isMenuOpen = ref(false);
const navItems = ref([
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'gear', label: 'Gear' },
    { id: 'contact', label: 'Contact' },
]);

const navWrapper = ref(null);
const logoRef = ref(null);

const toggleNavZ = (show) => {
    const nav = document.querySelector('#nav');
    if (nav) nav.classList.toggle('z-50', show);
};

const toggleNavInvert = (invert) => {
    const nav = document.querySelector('.nav-header-wrapper');
    if (nav) nav.classList.toggle('header-inverted', invert);

    if (invert) {
        const charsToFade = [...logoSplit.chars].slice(1).reverse(); // all but first, reversed
        gsap.to(charsToFade, {
            opacity: 0,
            stagger: 0.01,
            ease: 'cubic.out',
            duration: 0.3,
        });
        gsap.to('.nav-logo-text', {
            x: 12,
            ease: 'cubic.out',
            duration: 0.3,
        });
        gsap.fromTo(
            '.nav-logo-bg',
            { opacity: 0, scale: 0 },
            {
                opacity: 1,
                scale: 1,
                ease: 'back.out',
                duration: 0.3,
            }
        );
    } else {
        const charsToFade = [...logoSplit.chars].slice(1); // same chars, same order
        gsap.to(charsToFade, {
            opacity: 1,
            stagger: 0.03,
            ease: 'cubic.out',
            duration: 0.6,
        });
        gsap.to('.nav-logo-text', {
            x: 0,
            ease: 'cubic.out',
            duration: 0.3,
        });
        gsap.fromTo(
            '.nav-logo-bg',
            { opacity: 1, scale: 1 },
            {
                opacity: 0,
                scale: 0,
                ease: 'back.out',
                duration: 0.5,
            }
        );
    }
};

// 👇 Reactively trigger your header class logic
watch(isNavZActive, toggleNavZ);
watch(isNavInverted, toggleNavInvert);

function toggleMenu() {
    if (!isDesktop.value) {
        isMenuOpen.value = !isMenuOpen.value;
    } else {
        isMenuOpen.value = true;
    }
}

function closeMenu() {
    if (!isDesktop.value) {
        isMenuOpen.value = false;
    }
}

function menuTransitionEnter(el, done) {
    let q = gsap.utils.selector(navWrapper.value);
    gsap.fromTo(
        [q('nav'), q('nav li')],
        {
            x: 60,
            opacity: 0,
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.4,
            delay: !isDesktop.value ? 0.3 : 0,
            stagger: 0.05,
            ease: 'cubic.out',
            onComplete: done,
        }
    );
}

function menuTransitionLeave(el, done) {
    let q = gsap.utils.selector(navWrapper.value);
    gsap.to([q('nav li').reverse(), q('nav')], {
        x: 120,
        opacity: 0,
        duration: 0.3,
        stagger: 0.025,
        ease: 'cubic.in',
        onComplete: done,
    });
}

const showMenu = computed(() => {
    return isMenuOpen.value || isDesktop.value;
});

const setupLogoAnimation = async () => {
    await nextTick();

    logoSplit && logoSplit.revert();

    gsap.set(logoRef.value, { opacity: 1 });

    logoSplit = new SplitText(logoRef.value, { type: 'chars' });
};

onMounted(async () => {
    await setupLogoAnimation();
});
</script>

<template>
    <div class="pointer-events-none fixed top-0 grid h-auto w-full grid-cols-wrapper" id="nav">
        <a href="#maincontent" class="sr-only focus:not-sr-only">Skip to main content</a>
        <div class="col-main">
            <div class="w-full">
                <div class="overlay-menu fixed inset-0 block w-full lg:hidden" :class="isMenuOpen ? 'open' : 'pointer-events-none'"></div>
                <div class="nav-header-wrapper" ref="navWrapper">
                    <header class="py-4 lg:py-7 flex justify-between">
                        <a
                            href=""
                            ref="logoRef"
                            class="relative pointer-events-auto text-[24px] lg:text-[30px] origin-left font-canela font-black transition-colors ease-in-out duration-500 text-black"
                            ><span class="absolute w-[46px] h-[46px] rounded-full bg-brand-cream left-0 nav-logo-bg opacity-0"></span
                            ><span class="relative block whitespace-nowrap nav-logo-text">Righteous</span></a
                        >
                        <Transition @enter="menuTransitionEnter" @leave="menuTransitionLeave" v-bind:css="false">
                            <nav
                                @click="closeMenu"
                                aria-label="Main"
                                class="fixed left-0 top-0 flex min-h-screen w-full flex-col items-center justify-center lg:relative lg:ml-auto lg:min-h-0 lg:w-auto lg:flex-row lg:justify-end"
                                v-show="showMenu"
                            >
                                <ul
                                    class="pointer-events-auto flex w-full flex-col items-center justify-center space-y-12 overflow-hidden lg:ml-auto lg:flex-row lg:justify-end lg:space-y-0 lg:space-x-2"
                                >
                                    <li v-for="navItem in navItems" :key="navItem.id">
                                        <a :href="`#${navItem.id}`" class="header-nav-item"><span v-html="navItem.label"></span></a>
                                    </li>
                                </ul>
                            </nav>
                        </Transition>
                        <div class="pointer-events-auto flex w-7 items-center justify-end" v-if="!isDesktop">
                            <button @click="toggleMenu" type="button" class="nav-menu-toggle relative focus:outline-none" :class="isMenuOpen ? 'text-white' : ''">
                                <svg class="h-7 w-7 fill-current stroke-current" enable-background="new 0 0 40 40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
                                        <path d="m2 8h36" class="origin-20" :class="isMenuOpen ? '-translate-x-1 rotate-[45deg]' : 'rotate-0'" />
                                        <path d="m2 20h36" class="origin-20" :class="isMenuOpen ? 'opacity-0' : 'opacity-100'" />
                                        <path d="m2 32h36" class="origin-20" :class="isMenuOpen ? '-translate-x-1 -rotate-[45deg]' : 'rotate-0'" />
                                    </g>
                                </svg>
                                <span class="sr-only">MENU</span>
                            </button>
                        </div>
                    </header>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
/* Menu Icon */
svg path {
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0s;
}

.overlay-menu {
    z-index: -100;
    visibility: hidden;
    transition: visibility 0s cubic-bezier(0.535, 0.005, 0, 1) 1s;

    &:after {
        width: 100%;
        height: 100%;
        left: 0;
        content: '';
        position: absolute;
        overflow: hidden;
        transform: scaleX(0);
        transform-origin: 100% 50%;
        pointer-events: none;
        background-color: #ea3779;
        transition: transform 0.6s cubic-bezier(0.535, 0.005, 0, 1) 0.3s;
        z-index: 2;
    }

    &.open {
        visibility: visible;
        transition: visibility 0s cubic-bezier(0.535, 0.005, 0, 1) 0s;

        &:after {
            transform: scaleX(1);
            transition: transform 0.6s cubic-bezier(0.535, 0.005, 0, 1) 0s;
        }
    }
}

.nav-header-wrapper nav li > a.header-nav-item {
    @apply relative flex items-center px-3 py-3 font-helveticaDisplay font-medium uppercase leading-none tracking-[0.025em] text-white lg:text-black text-[16px] lg:text-[12px] bg-opacity-10 lg:bg-opacity-100 bg-[#EFECE6];

    border-radius: 2px;
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}

.nav-header-wrapper nav li > a.header-nav-item:hover,
.nav-header-wrapper nav li > a.header-nav-item.active {
    @apply text-white lg:text-white bg-black;
    border-radius: 22px;
}

.nav-header-wrapper.header-inverted nav li > a.header-nav-item {
    @apply lg:bg-opacity-10 lg:text-white;

    border-radius: 2px;
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}

.nav-header-wrapper.header-inverted nav li > a.header-nav-item:hover,
.nav-header-wrapper.header-inverted nav li > a.header-nav-item.active {
    @apply text-white lg:text-black lg:bg-opacity-100 lg:bg-[#EFECE6];
    border-radius: 22px;
}

.nav-header-wrapper .nav-menu-toggle {
    @apply text-brand-charcoal;
}

.nav-header-wrapper.header-inverted .nav-menu-toggle {
    @apply text-white;
}
</style>
