<script setup>
import Header from './components/Header.vue';
// import Footer from './components/Footer.vue';
// import VideoModal from './components/VideoModal.vue';
</script>

<template>
    <Header />
    <!-- <TalkButton /> -->
    <main id="maincontent" class="">
        <!-- Masthead -->
        <section id="masthead">
            <!-- <div class="grid w-full grid-cols-wrapper bg-brand-gray lg:bg-brand-orange">
                <div class="relative col-full row-start-1 overflow-hidden h-full">
                    <img src="./assets/images/masthead.jpg" alt="Masthead Image" class="absolute w-full h-full object-cover object-center" />
                </div>
                <div class="relative col-main row-start-1 lg:min-h-[750px] flex items-center justify-center">
                    <div class="w-full text-white py-36">
                        <h2 class="text-center uppercase text-[43px] lg:text-[58px] xl:text-[78px] font-myriad-pro leading-[1.05] font-bold">
                            Operators love our machines. Residents love the&nbsp;results.
                        </h2>
                    </div>
                </div>
            </div> -->
        </section>
        <div class="content-wrapper">
            <!-- Service -->
            <!-- <section id="service" class="">
                <div class="grid w-full grid-cols-wrapper bg-brand-gray py-28 lg:py-32 xl:py-36">
                    <div class="col-main">
                        <div class="w-full max-w-prose lg:max-w-none mx-auto flex flex-col flex-wrap lg:flex-row items-center">
                            <div class="w-full lg:w-1/2 pb-8 lg:pb-0 lg:pr-6">
                                <img src="./assets/images/service-1.jpg" alt="Service Image" class="w-full lg:max-w-[565px] shadow-custom" />
                            </div>
                            <div class="w-full lg:w-1/2">
                                <h3 class="mb-4 lg:mb-6 uppercase text-brand-orange text-[28px] lg:text-[36px] xl:text-[48px] font-myriad-pro leading-[1.15]">
                                    Deal with fewer pothole complaints—all&nbsp;around
                                </h3>
                                <p class="font-roboto text-[16px] lg:text-[18px] xl:text-[20px] text-white leading-normal">
                                    Because our equipment patches potholes better, faster, and with longer-lasting results, chances are you will get fewer constituent&nbsp;complaints.
                                </p>
                                <p class="mt-3 font-roboto text-[16px] lg:text-[18px] xl:text-[20px] text-white leading-normal">
                                    Operators love us because our machines are safer and reduce physical strain. Mechanics love how easy our machines are to service. And fleet managers love how
                                    reliable our equipment is, and the lower cost of ownership. So, no complaints from them&nbsp;either.
                                </p>
                            </div>
                        </div>
                        <div class="mt-18 lg:mt-24 xl:mt-32 w-full max-w-prose lg:max-w-none mx-auto flex flex-col flex-wrap lg:flex-row items-center">
                            <div class="order-2 lg:order-1 w-full lg:w-1/2">
                                <h3 class="mb-4 lg:mb-6 uppercase text-brand-orange text-[28px] lg:text-[36px] xl:text-[48px] font-myriad-pro leading-[1.15]">
                                    Buy direct for legendary customer service
                                </h3>
                                <p class="font-roboto text-[16px] lg:text-[18px] xl:text-[20px] text-white leading-normal">
                                    Bergkamp Pothole Patchers are purchased directly from us and that is reflected in our top-tier customer service. You get direct access to technicians who know these
                                    machines inside and out. And since we make many of our parts in-house, we can ship replacements quickly. Plus, we offer up to two days of crew and mechanic training
                                    on new&nbsp;machines.
                                </p>
                            </div>
                            <div class="order-1 lg:order-2 w-full lg:w-1/2 pb-8 lg:pb-0 lg:pl-6">
                                <img src="./assets/images/service-2.jpg" alt="Service Image" class="w-full lg:max-w-[565px] shadow-custom lg:ml-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section> -->
            <!-- Video -->
            <!-- <section id="video" class="">
                <video-modal>
                    <template v-slot:button>
                        <div class="grid w-full grid-cols-wrapper bg-brand-gray h-[440px] md:h-[540px] lg:h-[640px] xl:h-[740px]">
                            <div class="relative col-full row-start-1 overflow-hidden h-full">
                                <img src="./assets/images/video.jpg" alt="Video Image" class="absolute w-full h-full object-cover object-center" />
                                <img
                                    src="./assets/images/icon-play-text.png"
                                    alt="Watch Out Intro Video"
                                    class="transition duration-300 ease-out group-hover:scale-90 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[165px] md:w-[184px] lg:w-[202px] xl:w-[220px]"
                                />
                            </div>
                        </div>
                    </template>
                    <div class="relative w-full aspect-video">
                        <iframe
                            src="https://www.youtube.com/embed/rLAKYTli0oE"
                            class="absolute top-0 left-0 w-full h-full"
                            frameborder="0"
                            webkitAllowFullScreen
                            mozallowfullscreen
                            allowFullScreen
                        ></iframe>
                    </div>
                </video-modal>
            </section> -->
            <!-- Equipment -->
            <!-- <section id="bergkamp-fp5" class="">
                <div class="grid w-full grid-cols-wrapper bg-[#efefef] py-28 lg:py-32 xl:py-36">
                    <div class="col-main">
                        <div class="max-w-prose lg:max-w-none mx-auto flex flex-col flex-wrap lg:flex-row w-full">
                            <div class="w-full lg:w-9/12 pb-4 lg:pr-6">
                                <h3 class="mb-1 uppercase text-brand-type text-[45px] sm:text-[50px] md:text-[67px] lg:text-[90px] font-myriad-pro leading-none font-bold">Bergkamp FP5</h3>
                                <p class="uppercase text-brand-orange text-[22px] md:text-[28px] lg:text-[38px] font-myriad-pro font-bold leading-none">Electric Pothole Patcher</p>
                            </div>
                            <div class="w-full lg:w-3/12">
                                <p class="font-roboto font-medium text-[16px] lg:text-[20px] xl:text-[24px] text-brand-type lg:max-w-[320px] lg:ml-auto leading-[1.05] lg:mt-3">
                                    The greenest patcher on the market, designed with the operator in mind. It’s the patcher crews&nbsp;prefer.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-main">
                        <div class="w-full max-w-prose lg:max-w-none mx-auto pt-6 md:pt-8 lg:pt-12 xl:pt-16">
                            <img src="./assets/images/bergkamp-fp5.jpg" alt="Bergkamp FP5" class="w-full" />
                        </div>
                    </div>
                    <div class="col-main mt-12 lg:mt-24">
                        <div class="video-grid flex flex-wrap justify-center mx-auto max-w-prose lg:max-w-none">
                            <div class="">
                                <video-modal>
                                    <template v-slot:button>
                                        <div class="relative w-full aspect-video">
                                            <img src="./assets/images/poster-the-whole-story.jpg" alt="Electric Personality" class="w-full absolute object-cover object-center h-full" />
                                            <img
                                                src="./assets/images/icon-play.svg"
                                                alt="Play Button"
                                                class="transition transform duration-300 ease-out group-hover:scale-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px]"
                                            />
                                        </div>
                                        <p class="text-[16px] lg:text-[18px] xl:text-[20px] uppercase text-brand-orange font-myriad-pro leading-none font-bold mt-4">Electric Personality</p>
                                    </template>
                                    <div class="relative w-full aspect-video">
                                        <iframe
                                            src="https://www.youtube.com/embed/MyPUWDhetVk"
                                            class="absolute top-0 left-0 w-full h-full"
                                            frameborder="0"
                                            webkitAllowFullScreen
                                            mozallowfullscreen
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </video-modal>
                            </div>
                            <div class="">
                                <video-modal>
                                    <template v-slot:button>
                                        <div class="relative w-full aspect-video">
                                            <img src="./assets/images/poster-lights-camera-auger.jpg" alt="Lights, Camera, Auger" class="w-full absolute object-cover object-center h-full" />
                                            <img
                                                src="./assets/images/icon-play.svg"
                                                alt="Play Button"
                                                class="transition transform duration-300 ease-out group-hover:scale-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px]"
                                            />
                                        </div>
                                        <p class="text-[16px] lg:text-[18px] xl:text-[20px] uppercase text-brand-orange font-myriad-pro leading-none font-bold mt-4">Lights, Camera, Auger</p>
                                    </template>
                                    <div class="relative w-full aspect-video">
                                        <iframe
                                            src="https://www.youtube.com/embed/n3x7KDO7WgM"
                                            class="absolute top-0 left-0 w-full h-full"
                                            frameborder="0"
                                            webkitAllowFullScreen
                                            mozallowfullscreen
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </video-modal>
                            </div>
                            <div class="">
                                <video-modal>
                                    <template v-slot:button>
                                        <div class="relative w-full aspect-video">
                                            <img src="./assets/images/poster-curbside-swing.jpg" alt="Curbside Swing" class="w-full absolute object-cover object-center h-full" />
                                            <img
                                                src="./assets/images/icon-play.svg"
                                                alt="Play Button"
                                                class="transition transform duration-300 ease-out group-hover:scale-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px]"
                                            />
                                        </div>
                                        <p class="text-[16px] lg:text-[18px] xl:text-[20px] uppercase text-brand-orange font-myriad-pro leading-none font-bold mt-4">Curbside Swing</p>
                                    </template>
                                    <div class="relative w-full aspect-video">
                                        <iframe
                                            src="https://www.youtube.com/embed/sV5wTOCk2pA"
                                            class="absolute top-0 left-0 w-full h-full"
                                            frameborder="0"
                                            webkitAllowFullScreen
                                            mozallowfullscreen
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </video-modal>
                            </div>
                            <div class="">
                                <form-modal-alternate>
                                    <template v-slot:button>
                                        <div class="relative w-full aspect-video">
                                            <img src="./assets/images/poster-download-fp5-brochure.jpg" alt="Download FP5 Brochure" class="w-full absolute object-cover object-center h-full" />
                                        </div>
                                        <p class="text-[16px] lg:text-[18px] xl:text-[20px] uppercase text-brand-orange font-myriad-pro leading-none font-bold mt-4">Download FP5 Brochure</p>
                                    </template>
                                    <div class="w-full mx-auto bg-white">
                                        <div class="h-[80vh] overflow-hidden">
                                            <iframe
                                                id="fancybox-frame1701795849711"
                                                title="Download FP5 Brochure"
                                                allowtransparency="true"
                                                src="https://www.bergkampinc.com/request-pdf-form/?title=FP5 Brochure&file_id=7316"
                                                frameborder="0"
                                                class="h-full w-full border-none"
                                                width="100%"
                                                height="100%"
                                                scrolling="auto"
                                            >
                                            </iframe>
                                        </div>
                                    </div>
                                </form-modal-alternate>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="bergkamp-sp5e" class="">
                <div class="grid w-full grid-cols-wrapper bg-[#e6e6e6] py-28 lg:py-32 xl:py-36">
                    <div class="col-main">
                        <div class="max-w-prose lg:max-w-none mx-auto flex flex-col flex-wrap lg:flex-row w-full">
                            <div class="w-full lg:w-9/12 pb-4 lg:pb-0 lg:pr-6">
                                <h3 class="mb-1 uppercase text-brand-type text-[45px] sm:text-[50px] md:text-[67px] lg:text-[90px] font-myriad-pro leading-none font-bold">Bergkamp SP5E</h3>
                                <p class="uppercase text-brand-orange text-[22px] md:text-[28px] lg:text-[38px] font-myriad-pro font-bold leading-none">Spray Injection Pothole Patcher</p>
                            </div>
                            <div class="w-full lg:w-3/12">
                                <p class="font-roboto font-medium text-[16px] lg:text-[20px] xl:text-[24px] text-brand-type lg:max-w-[320px] lg:ml-auto leading-[1.05] lg:mt-3">
                                    The safest and easiest way to patch. A single operator can patch 100 potholes a day without leaving the&nbsp;cab.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-main">
                        <div class="w-full max-w-prose lg:max-w-none mx-auto pt-4 md:pt-5 lg:pt-12">
                            <img src="./assets/images/bergkamp-sp5e.jpg" alt="Bergkamp SP5E" class="w-full" />
                        </div>
                    </div>
                    <div class="col-main mt-12 lg:mt-24">
                        <div class="video-grid flex flex-wrap justify-center mx-auto max-w-prose lg:max-w-none">
                            <div class="">
                                <video-modal>
                                    <template v-slot:button>
                                        <div class="relative w-full aspect-video">
                                            <img src="./assets/images/poster-demo.jpg" alt="SP5E Spray Injection Demo" class="w-full absolute object-cover object-center h-full" />
                                            <img
                                                src="./assets/images/icon-play.svg"
                                                alt="Play Button"
                                                class="transition transform duration-300 ease-out group-hover:scale-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px]"
                                            />
                                        </div>
                                        <p class="text-[16px] lg:text-[18px] xl:text-[20px] uppercase text-brand-orange font-myriad-pro leading-none font-bold mt-4">SP5E Spray Injection Demo</p>
                                    </template>
                                    <div class="relative w-full aspect-video">
                                        <iframe
                                            src="https://www.youtube.com/embed/hokDnw1IKho"
                                            class="absolute top-0 left-0 w-full h-full"
                                            frameborder="0"
                                            webkitAllowFullScreen
                                            mozallowfullscreen
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </video-modal>
                            </div>
                            <div class="">
                                <video-modal>
                                    <template v-slot:button>
                                        <div class="relative w-full aspect-video">
                                            <img src="./assets/images/poster-walkaround.jpg" alt="SP5E Walkaround" class="w-full absolute object-cover object-center h-full" />
                                            <img
                                                src="./assets/images/icon-play.svg"
                                                alt="Play Button"
                                                class="transition transform duration-300 ease-out group-hover:scale-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px]"
                                            />
                                        </div>
                                        <p class="text-[16px] lg:text-[18px] xl:text-[20px] uppercase text-brand-orange font-myriad-pro leading-none font-bold mt-4">SP5E Walkaround</p>
                                    </template>
                                    <div class="relative w-full aspect-video">
                                        <iframe
                                            src="https://www.youtube.com/embed/qz-lztdzAZ4"
                                            class="absolute top-0 left-0 w-full h-full"
                                            frameborder="0"
                                            webkitAllowFullScreen
                                            mozallowfullscreen
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </video-modal>
                            </div>
                            <div class="">
                                <form-modal-alternate>
                                    <template v-slot:button>
                                        <div class="relative w-full aspect-video">
                                            <img src="./assets/images/poster-download-sp5e-brochure.jpg" alt="Download SP5E Brochure" class="w-full absolute object-cover object-center h-full" />
                                        </div>
                                        <p class="text-[16px] lg:text-[18px] xl:text-[20px] uppercase text-brand-orange font-myriad-pro leading-none font-bold mt-4">Download SP5E Brochure</p>
                                    </template>
                                    <div class="w-full mx-auto bg-white">
                                        <div class="h-[80vh] overflow-hidden">
                                            <iframe
                                                id="fancybox-frame1701797919037"
                                                title="Download SP5E Brochure"
                                                allowtransparency="true"
                                                src="https://www.bergkampinc.com/request-pdf-form/?title=SP5E%20Brochure&file_id=831"
                                                frameborder="0"
                                                class="h-full w-full border-none"
                                                width="100%"
                                                height="100%"
                                                scrolling="auto"
                                            >
                                            </iframe>
                                        </div>
                                    </div>
                                </form-modal-alternate>
                            </div>
                        </div>
                    </div>
                </div>
            </section> -->
            <!-- Testimonial -->
            <!-- <section id="testimonial" class="">
                <div class="grid w-full grid-cols-wrapper bg-[#D9D9D9] py-16 lg:py-20 xl:py-24">
                    <div class="col-main text-center lg:text-left">
                        <swiper
                            :slides-per-view="1"
                            :space-between="50"
                            :autoplay="{ delay: 5000, disableOnInteraction: true }"
                            :pagination="{ clickable: true }"
                            :speed="500"
                            :modules="[Pagination, Autoplay]"
                        >
                            <swiper-slide>
                                <div class="pb-12 max-w-prose lg:max-w-none mx-auto flex flex-col flex-wrap lg:flex-row w-full items-center h-full justify-center">
                                    <div class="w-full lg:w-3/12 pb-4 lg:pb-0 lg:pr-6">
                                        <h3 class="uppercase text-brand-orange text-[23px] lg:text-[30px] xl:text-[40px] font-myriad-pro leading-[1.1] font-bold">What Our Customers Say</h3>
                                    </div>
                                    <div class="w-full lg:w-9/12">
                                        <p class="font-pt-serif font-normal italic text-[17px] lg:text-[23px] xl:text-[30px] text-[#222222] lg:max-w-[920px] lg:ml-auto leading-[1.1]">
                                            “We just got the FP5 and the guys love it! They fight over who gets to be on the Bergkamp. We’re going to buy at least one&nbsp;more.”
                                        </p>
                                    </div>
                                </div>
                            </swiper-slide>
                            <swiper-slide>
                                <div class="pb-12 max-w-prose lg:max-w-none mx-auto flex flex-col flex-wrap lg:flex-row w-full items-center h-full justify-center">
                                    <div class="w-full lg:w-3/12 pb-4 lg:pb-0 lg:pr-6">
                                        <h3 class="uppercase text-brand-orange text-[23px] lg:text-[30px] xl:text-[40px] font-myriad-pro leading-[1.1] font-bold">What Our Customers Say</h3>
                                    </div>
                                    <div class="w-full lg:w-9/12">
                                        <p class="font-pt-serif font-normal italic text-[17px] lg:text-[23px] xl:text-[30px] text-[#222222] lg:max-w-[920px] lg:ml-auto leading-[1.1]">
                                            “As a Public Works Manager, I have found that the machine is not only reliable and user friendly but also offers a host of important safety features, and
                                            the support from the sales and service teams at Bergkamp is impeccable. We couldn’t be more pleased with our Bergkamp&nbsp;FP5!”
                                        </p>
                                    </div>
                                </div></swiper-slide
                            >
                            <swiper-slide>
                                <div class="pb-12 max-w-prose lg:max-w-none mx-auto flex flex-col flex-wrap lg:flex-row w-full items-center h-full justify-center">
                                    <div class="w-full lg:w-3/12 pb-4 lg:pb-0 lg:pr-6">
                                        <h3 class="uppercase text-brand-orange text-[23px] lg:text-[30px] xl:text-[40px] font-myriad-pro leading-[1.1] font-bold">What Our Customers Say</h3>
                                    </div>
                                    <div class="w-full lg:w-9/12">
                                        <p class="font-pt-serif font-normal italic text-[17px] lg:text-[23px] xl:text-[30px] text-[#222222] lg:max-w-[920px] lg:ml-auto leading-[1.1]">
                                            “I find the SP5E to be a useful tool that produces very stout patches that hold up incredibly well even in the climate that we're in. As far as training I
                                            couldn't be happier. The Bergkamp trainer was very efficient at training employees and was also available for numerous questions after the truck had been
                                            commissioned. I would recommend this to any municipal government that has the infrastructure and climate to support it. Also the safety factor and reducing
                                            employees to road hazards while accomplishing the maintenance goals that were almost unattainable before this purchase is a huge benefit to
                                            this&nbsp;vehicle.”
                                        </p>
                                    </div>
                                </div></swiper-slide
                            >
                        </swiper>
                    </div>
                </div>
            </section> -->
            <!-- Form -->
            <!-- <section id="book-a-demo" class="relative">
                <div class="grid w-full grid-cols-wrapper bg-brand-orange py-24 lg:py-36">
                    <div class="w-full relative col-main row-start-1">
                        <div class="w-full text-white">
                            <h2 class="text-center uppercase text-[43px] lg:text-[58px] xl:text-[78px] font-myriad-pro leading-[1.05] font-bold">
                                Those potholes won’t fill themselves. <span class="text-[#2B2B2B]">let’s&nbsp;talk.</span>
                            </h2>
                        </div>
                    </div>
                    <div class="w-full relative col-main row-start-2">
                        <div class="w-full max-w-4xl mx-auto h-[500px] sm:h-[450px] md:h-[300px] mt-8 sm:mt-12 lg:mt-16">
                            <iframe
                                id="JotFormIFrame-233154858553059"
                                title="How can we help you?"
                                allowtransparency="true"
                                src="https://form.jotform.com/233154858553059"
                                frameborder="0"
                                class="h-full w-full border-none"
                                width="100%"
                                height="100%"
                                scrolling="no"
                            >
                            </iframe>
                        </div>
                    </div>
                    <div class="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-12 sm:w-16 mb-8">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" class="w-full h-auto">
                            <path
                                fill="#fff"
                                stroke="none"
                                d="M0 6c0-0.128 0.049-0.256 0.146-0.354 0.195-0.195 0.512-0.195 0.707 0l8.646 8.646 8.646-8.646c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-9 9c-0.195 0.195-0.512 0.195-0.707 0l-9-9c-0.098-0.098-0.146-0.226-0.146-0.354z"
                            />
                        </svg>
                    </div>
                </div>
            </section> -->
            <!-- Benefits -->
            <!-- <section id="benefits" class="">
                <div class="grid w-full grid-cols-wrapper bg-brand-gray py-16 lg:py-20 xl:py-24">
                    <div class="col-main">
                        <h2 class="mb-4 lg:mb-6 uppercase text-white max-w-prose text-center mx-auto lg:max-w-[1024px] text-[28px] lg:text-[36px] xl:text-[48px] font-myriad-pro leading-[1.15]">
                            Bergkamp is leading the industry
                        </h2>
                        <div class="mt-8 lg:mt-14 w-full max-w-prose lg:max-w-none mx-auto grid gap-y-12 lg:gap-y-0 gap-x-18 xl:gap-x-28 lg:grid-cols-3">
                            <div class="flex flex-col space-y-4 lg:space-y-6 items-center text-center">
                                <img src="./assets/images/icon-1.svg" alt="Icon 1" class="" />
                                <h4 class="uppercase text-brand-orange text-[20px] xl:text-[24px] font-myriad-pro leading-[1.1] font-bold">The greenest pothole patchers on earth</h4>
                                <p class="font-roboto text-[14px] lg:text-[16px] xl:text-[18px] text-white leading-snug leading-[1.05] lg:mt-3">
                                    Electric heating greatly reduces greenhouse gas emissions. Our FP5 Pothole Patcher uses a flameless, electric heater to keep the material at a consistent
                                    temperature for working and non-working hours. The SP5E Pothole Patcher has no auxiliary engine so there are even fewer&nbsp;emissions.
                                </p>
                            </div>
                            <div class="flex flex-col space-y-4 lg:space-y-6 items-center text-center">
                                <img src="./assets/images/icon-2.svg" alt="Icon 2" class="" />
                                <h4 class="uppercase text-brand-orange text-[20px] xl:text-[24px] font-myriad-pro leading-[1.1] font-bold">Operator-centric design</h4>
                                <p class="font-roboto text-[14px] lg:text-[16px] xl:text-[18px] text-white leading-snug leading-[1.05] lg:mt-3">
                                    Our equipment is designed with the operator in mind. All the tools for the job are placed exactly where they need to be while eliminating heavy lifting. That means
                                    greater efficiency, safety and less strain. Our machines are equipped with lights, cameras, failsafes, and alarms to protect&nbsp;workers.
                                </p>
                            </div>
                            <div class="flex flex-col space-y-4 lg:space-y-6 items-center text-center">
                                <img src="./assets/images/icon-3.svg" alt="Icon 3" class="" />
                                <h4 class="uppercase text-brand-orange text-[20px] xl:text-[24px] font-myriad-pro leading-[1.1] font-bold">The safest way to patch</h4>
                                <p class="font-roboto text-[14px] lg:text-[16px] xl:text-[18px] text-white leading-[1.05] lg:mt-3">
                                    All aspects of our patchers are designed to ensure worker and public safety and keep crews out of oncoming traffic. The SP5E’s remote controlled spray arm means the
                                    operator never leaves the cab. And the FP5 uses an electric heated hopper which is much safer than a flame-heated tank burning diesel, propane or&nbsp;oil.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> -->
            <!-- Campaign -->
            <!-- <section id="campaign" class="">
                <div class="grid w-full grid-cols-wrapper lg:grid-cols-two-col bg-brand-gray h-[630px]">
                    <div class="relative col-full lg:col-full/left row-start-1 h-full">
                        <img src="./assets/images/campaign-1.jpg" alt="Campaign Image" class="absolute w-full h-full object-cover object-center" />
                    </div>
                    <div class="relative col-full lg:col-right/full row-start-2 lg:row-start-1 h-full">
                        <img src="./assets/images/campaign-2.jpg" alt="Campaign Image" class="absolute w-full h-full object-cover object-center" />
                    </div>
                    <div class="relative col-full lg:col-full/left row-start-1 overflow-hidden h-full flex items-center justify-center text-center">
                        <p class="uppercase text-white text-[24px] lg:text-[32px] xl:text-[40px] font-myriad-pro font-bold leading-[1.05] px-6">Pothole complaints before&nbsp;Bergkamp.</p>
                    </div>
                    <div class="relative col-full lg:col-right/full row-start-2 lg:row-start-1 overflow-hidden h-full flex items-center justify-center text-center">
                        <p class="uppercase text-white text-[24px] lg:text-[32px] xl:text-[40px] font-myriad-pro font-bold leading-[1.05] px-6">Pothole complaints after&nbsp;Bergkamp.</p>
                    </div>
                </div>
            </section> -->
            <!-- Join The Movement -->
            <!-- <section id="join-the-movement" class="">
                <div class="grid w-full grid-cols-wrapper bg-brand-gray">
                    <div class="relative col-full row-start-1 overflow-hidden">
                        <img src="./assets/images/survey.jpg" alt="Survey Image" class="absolute w-full h-full object-cover object-bottom" />
                    </div>
                    <div class="col-main row-start-1 relative text-center">
                        <div class="w-full text-white pt-28 lg:pt-32 xl:pt-36 pb-[380px] lg:pb-[360px] xl:pb-[420px]">
                            <h3 class="uppercase text-white font-bold text-[50px] md:text-[67px] lg:text-[90px] xl:text-[120px] font-myriad-pro leading-none">Join the movement</h3>
                            <h4 class="mb-4 uppercase text-brand-gray font-bold text-[35px] md:text-[47px] lg:text-[63px] xl:text-[84px] font-myriad-pro leading-none">No more potholes</h4>
                            <p class="font-roboto text-[16px] lg:text-[18px] xl:text-[24px] text-white leading-tight max-w-[1160px] mx-auto">
                                We’re on a mission to ensure everyone gets home safe. We’re looking for 1,000 agencies to help us explore the causes and solutions of the pothole problem nationwide.
                                Help in one of two ways — take a quick survey, or spend 15 minutes with us. In exchange for your conversation, we will donate $50 to the ATSSA Foundation which is
                                dedicated to roadway safety and supporting the families of fallen road workers.
                            </p>
                            <p class="mt-3 font-roboto text-[16px] lg:text-[18px] xl:text-[24px] text-white leading-tight max-w-[1160px] mx-auto">
                                Plus, we will share the resulting research with those who&nbsp;contribute.
                            </p>
                            <div class="flex flex-col justify-center lg:flex-row lg:space-x-9 max-w-sm lg:max-w-none mx-auto">
                                <a
                                    href="https://www.surveymonkey.com/r/CCS8ZXC"
                                    target="_blank"
                                    class="mt-6 lg:mt-10 uppercase tracking-wide rounded-full border border-brand-orange bg-brand-orange px-10 py-4 text-[16px] lg:text-[18px] font-myriad-pro font-bold leading-none text-white duration-300 ease-out transform transition lg:px-14 lg:py-5 hover:scale-95 hover:bg-white hover:text-brand-orange no-underline"
                                    >Take A Quick Survey</a
                                >
                                <form-modal>
                                    <template v-slot:button>
                                        <div
                                            class="mt-6 lg:mt-10 uppercase tracking-wide rounded-full border border-brand-orange bg-brand-orange px-10 py-4 text-[16px] lg:text-[18px] font-myriad-pro font-bold leading-none text-white duration-300 ease-out transform transition lg:px-14 lg:py-5 hover:scale-95 hover:bg-white hover:text-brand-orange no-underline"
                                        >
                                            Spend 15 Minutes With Us
                                        </div>
                                    </template>
                                    <div class="w-full mx-auto bg-brand-orange">
                                        <div class="text-white bg-black bg-opacity-10 px-6 py-8 sm:px-16 sm:py-12 lg:px-24 lg:py-18">
                                            <h3 class="mt-2 uppercase text-[21px] lg:text-[27px] xl:text-[36px] font-myriad-pro leading-[1.15]">Spend 15 Minutes With Us</h3>
                                            <p class="mt-2 font-roboto text-[16px] lg:text-[18px] xl:text-[20px] leading-snug">
                                                Thank you for your interest in our mission and helping us better understand the pothole&nbsp;problem.
                                            </p>
                                            <p class="mt-2 font-roboto text-[16px] lg:text-[18px] xl:text-[20px] leading-snug">
                                                Please complete the form and a member of our team will contact you&nbsp;soon.
                                            </p>
                                        </div>
                                        <div class="px-4 py-4 sm:px-16 sm:py-10 lg:px-24 lg:py-14 h-[760px] sm:h-[510px] overflow-hidden">
                                            <iframe
                                                id="JotFormIFrame-232346012706144"
                                                title="Spend 15 Minutes With Us"
                                                allowtransparency="true"
                                                src="https://form.jotform.com/232346012706144"
                                                frameborder="0"
                                                class="h-full w-full border-none"
                                                width="100%"
                                                height="100%"
                                                scrolling="auto"
                                            >
                                            </iframe>
                                        </div>
                                    </div>
                                </form-modal>
                            </div>
                            <a href="https://www.atssa.com/" target="_blank"><img src="./assets/images/atssa-logo.png" alt="ATSSA" class="mx-auto w-[86px] mt-8 lg:mt-12" /></a>
                        </div>
                    </div>
                </div>
            </section> -->
            <!-- Programs -->
            <!-- <section id="programs" class="">
                <div class="grid w-full grid-cols-wrapper bg-[#EFEFEF] py-16 lg:py-20 xl:py-24">
                    <div class="col-main">
                        <div class="w-full max-w-prose lg:max-w-none mx-auto flex flex-col flex-wrap lg:flex-row">
                            <div class="w-full lg:w-1/2 pb-12 lg:pb-0 lg:pr-6">
                                <div class="w-full lg:max-w-[565px] lg:mx-auto">
                                    <img src="./assets/images/b-fit-logo.png" alt="B-Fit Logo" class="w-[175px]" />
                                    <h3 class="mt-2 uppercase text-brand-gray text-[21px] lg:text-[27px] xl:text-[36px] font-myriad-pro leading-[1.15]">
                                        Offering A Higher Level of Service and Training.
                                    </h3>
                                    <p class="mt-2 font-roboto text-[16px] lg:text-[18px] xl:text-[20px] text-brand-gray leading-snug">
                                        On-site inspection and training to keep your patcher running perfectly and your crews up to&nbsp;speed.
                                    </p>
                                    <a
                                        href="https://www.bergkampinc.com/bfit/"
                                        target="_blank"
                                        class="block mt-4 font-myriad-pro font-bold uppercase leading-none tracking-[0.0125em] text-brand-orange text-[16px] lg:text-[20px] hover:text-brand-gray transition duration-300 ease-out"
                                        >Learn More</a
                                    >
                                </div>
                            </div>
                            <div class="w-full lg:w-1/2 lg:pl-6">
                                <div class="w-full lg:max-w-[565px] lg:mx-auto">
                                    <img src="./assets/images/in-pave-logo.png" alt="InPave Logo" class="w-[146px]" />
                                    <h3 class="mt-2 uppercase text-brand-gray text-[21px] lg:text-[27px] xl:text-[36px] font-myriad-pro leading-[1.15]">
                                        InPave® lets you monitor pothole patching progress.
                                    </h3>
                                    <p class="mt-2 font-roboto text-[16px] lg:text-[18px] xl:text-[20px] text-brand-gray leading-snug">
                                        Telematics and GPS technology let you monitor real-time performance, progress, location and material&nbsp;usage.
                                    </p>
                                    <a
                                        href="https://www.bergkampinc.com/product/inpave-technology/"
                                        target="_blank"
                                        class="block mt-4 font-myriad-pro font-bold uppercase leading-none tracking-[0.0125em] text-brand-orange text-[16px] lg:text-[20px] hover:text-brand-gray transition duration-300 ease-out"
                                        >Learn More</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> -->
        </div>
    </main>
    <!-- <Footer /> -->
</template>

<style scoped></style>
