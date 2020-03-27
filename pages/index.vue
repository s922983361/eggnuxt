<template>
    <div  id="landing">
        <header>
            <navBar @handleBackToTop="handleBackToTop"></navBar>
        </header>
        <main>
            <div class="relative pt-16 pb-32 flex content-center items-center justify-center"
                style="min-height: 75vh;">
                <client-only>
                    <!-- style='background-image: url("http://localhost:3000/landingImgs/_1057385.jpg");' -->
                <div class="absolute top-0 w-full h-full bg-center bg-cover" v-lazy:background-image="'http://localhost:3000/landingImgs/_1057385.jpg'" >
                    <span id="blackOverlay" class="w-full h-full absolute opacity-25 bg-black"></span>
                </div>
                </client-only>
                

                <div class="container relative mr-auto">
                    <div class="items-center flex flex-wrap">
                        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div class="pr-12">
                                <h1 class="text-white font-semibold text-5xl">
                                Your story starts with us.
                                </h1>
                                <p class="mt-4 text-lg text-gray-300">
                                This is a simple example of a Landing Page you can build using
                                Tailwind Starter Kit. It features multiple CSS components
                                based on the Tailwindcss design system.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden" style="height: 70px; transform: translateZ(0px);">
                    <svg
                        class="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                        >
                        <polygon class="text-gray-300 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </div>
        </main>

        <section id="Feature" class="pb-20 bg-gray-300 -mt-24">
            <div class="container mx-auto px-4">
                <div class="flex flex-wrap">
                    
                    <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                            <div class="px-4 py-5 flex-auto">
                                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400 text-3xl">                                
                                    <fa-icon :icon="faShoppingCart"></fa-icon>
                                </div>
                                <h6 class="text-xl font-semibold">採購人員-商品經銷商</h6>
                                <p class="mt-2 mb-4 text-gray-600">
                                    Divide details about your product or agency work into parts.
                                    Keep you user engaged by providing meaningful information.
                                    Remember that by this time, the user is curious.
                                </p>
                                <div class="-mt-10">
                                    <img src="/landingImgs/_931549.jpg" alt="Sunset in the mountains">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-4/12 px-4 text-center">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                            <div class="px-4 py-5 flex-auto">
                                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400 text-3xl">
                                    <fa-icon :icon="faMapSigns"></fa-icon>
                                </div>
                                <h6 class="text-xl font-semibold font-yen">商品經銷商</h6>
                                <p class="mt-2 mb-4 text-gray-600">
                                    Keep you user engaged by providing meaningful information.
                                    Remember that by this time, the user is curious.Keep you user engaged by providing meaningful information.
                                    Remember that by this time, the user is curious.
                                </p>
                                <div class="-mt-10">
                                    <img src="/landingImgs/work4209000.png" alt="Sunset in the mountains">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-6 w-full md:w-4/12 px-4 text-center">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                            <div class="px-4 py-5 flex-auto">
                                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400 text-3xl">
                                    <fa-icon :icon="faIndustry"></fa-icon>
                                </div>
                                <h6 class="text-xl font-semibold">生產廠商</h6>
                                <p class="mt-2 mb-4 text-gray-600">
                                    Write a few lines about each one. A paragraph describing a
                                    feature will be enough. Keep you user engaged!
                                </p>
                                <div class="-mt-10">
                                    <img src="/landingImgs/stock4064880.png" alt="Sunset in the mountains">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </section>

        <section id="User" class="relative py-10">
            <div class="flex flex-wrap items-center">
                <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
                    <div class="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                        <i class="fas fa-user-friends text-xl"></i>
                    </div>
                    <h3 class="text-3xl mb-2 font-semibold leading-normal">
                        Working with us is a pleasure
                    </h3>
                    <p class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                        Don't let your uses guess by attaching tooltips and popoves to
                        any element. Just make sure you enable them first via
                        JavaScript.
                    </p>
                    <p class="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                        The kit comes with three pre-built pages to help you get started
                        faster. You can change the text and images and you're good to
                        go. Just make sure you enable them first via JavaScript.
                    </p>
                    <nuxt-link to="/web">
                        <p class="font-bold text-gray-800 mt-8 cursor-pointer hover:text-blue-500">>> 立即註冊採購更便利</p>
                    </nuxt-link>                
                </div>
                <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                        <img
                            alt="..."
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1051&amp;q=80"
                            class="w-full align-middle rounded-t-lg"
                        />
                        <blockquote class="relative p-8 mb-4">
                            <svg
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 583 95"
                                class="absolute left-0 w-full block"
                                style="height: 95px; top: -94px;"
                            >
                                <polygon
                                points="-30,95 583,95 583,65"
                                class="text-pink-600 fill-current"
                                ></polygon>
                            </svg>
                            <h4 class="text-xl font-bold text-white">
                                Top Notch Services
                            </h4>
                            <p class="text-md font-light mt-2 text-white">
                                The Arctic Ocean freezes every winter and much of the
                                sea-ice then thaws every summer, and that process will
                                continue whatever happens.
                            </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>

        <section id="Shop" class="relative py-10 bg-gray-300">            
            <div class="container mx-auto px-4">
                <div class="items-center flex flex-wrap">
                    <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
                        <img alt="..." class="max-w-full rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"/>
                    </div>
                    <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
                        <div class="md:pr-12">
                            <div class="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                                <i class="fas fa-rocket text-xl"></i>
                            </div>
                            <h3 class="text-3xl font-semibold">A growing company</h3>
                            <p class="mt-4 text-lg leading-relaxed text-gray-600">
                                The extension comes with three pre-built pages to help you get
                                started faster. You can change the text and images and you're
                                good to go.
                            </p>
                            <ul class="list-none mt-6">
                                <li class="py-2">
                                    <div class="flex items-center">
                                        <div>
                                            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                                <i class="fas fa-fingerprint"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <h4 class="text-gray-600">
                                            Carefully crafted components
                                            </h4>
                                        </div>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="flex items-center">
                                        <div>
                                            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                                <i class="fab fa-html5"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <h4 class="text-gray-600">Amazing page examples</h4>
                                        </div>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="flex items-center">
                                        <div>
                                            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                                <i class="far fa-paper-plane"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <h4 class="text-gray-600">Dynamic components</h4>
                                        </div>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="flex items-center">
                                        <div>
                                            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                                <i class="far fa-paper-plane"></i>
                                            </span>
                                        </div>
                                        <div>
                                            <nuxt-link to="/admin/login">
                                                <h4 class="font-bold text-gray-800 cursor-pointer hover:text-blue-500">立即註冊接單更快速</h4>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="Factory" class="relative py-10">
            <div class="container mx-auto px-4">
                <div class="flex flex-wrap justify-center text-center mb-24">
                    <div class="w-full lg:w-6/12 px-4">
                        <h2 class="text-4xl font-semibold">合作文具廠商</h2>
                        <p class="text-lg leading-relaxed m-4 text-gray-600">
                            目前合作商家數 10200 ,不需費用立即參與與各地辦公室經銷商一同開發市場
                        </p>
                        <nuxt-link to="/admin/login">
                            <h4 class="font-bold text-gray-800 cursor-pointer hover:text-blue-500">>>立即註冊讓商品曝光</h4>
                        </nuxt-link>                        
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                    <div class="px-6">
                        <img
                        alt="..."
                        src="/images/example/avatar1.png"
                        class="shadow-lg rounded-full max-w-full mx-auto"
                        style="max-width: 120px;"
                        />
                        <div class="pt-6 text-center">
                        <h5 class="text-xl font-bold">Ryan Tompson</h5>
                        <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                            Web Developer
                        </p>
                        <div class="mt-6">
                            <button
                            class="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-twitter"></i></button
                            ><button
                            class="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-facebook-f"></i></button
                            ><button
                            class="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-dribbble"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                    <div class="px-6">
                        <img
                        alt="..."
                        src="/images/example/avatar2.png"
                        class="shadow-lg rounded-full max-w-full mx-auto"
                        style="max-width: 120px;"
                        />
                        <div class="pt-6 text-center">
                        <h5 class="text-xl font-bold">Romina Hadid</h5>
                        <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                            Marketing Specialist
                        </p>
                        <div class="mt-6">
                            <button
                            class="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-google"></i></button
                            ><button
                            class="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-facebook-f"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                    <div class="px-6">
                        <img
                        alt="..."
                        src="/images/example/avatar3.png"
                        class="shadow-lg rounded-full max-w-full mx-auto"
                        style="max-width: 120px;"
                        />
                        <div class="pt-6 text-center">
                        <h5 class="text-xl font-bold">Alexa Smith</h5>
                        <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                            UI/UX Designer
                        </p>
                        <div class="mt-6">
                            <button
                            class="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-google"></i></button
                            ><button
                            class="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-twitter"></i></button
                            ><button
                            class="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-instagram"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                    <div class="px-6">
                        <img
                        alt="..."
                        src="/images/example/avatar4.png"
                        class="shadow-lg rounded-full max-w-full mx-auto"
                        style="max-width: 120px;"
                        />
                        <div class="pt-6 text-center">
                        <h5 class="text-xl font-bold">Jenna Kardi</h5>
                        <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                            Founder and CEO
                        </p>
                        <div class="mt-6">
                            <button
                            class="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-dribbble"></i></button
                            ><button
                            class="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-google"></i></button
                            ><button
                            class="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-twitter"></i></button
                            ><button
                            class="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            >
                            <i class="fab fa-instagram"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </section>

        <footer>
            <foot></foot>
        </footer>
        <!-- Back to Top -->
        <div 
            v-show="showBackToTop"
            class="fixed bottom-0 right-0 text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mr-6 mb-6 shadow-lg rounded-full bg-orange-600 text-4xl cursor-pointer" 
            v-scroll-to="{ el: '#landing' }">
            <fa-icon :icon="faArrowAltCircleUp"></fa-icon>
        </div>

    </div>
</template>

<script>
    import navBar from '@/components/landing/navBar'
    import foot from '@/components/landing/foot'
    import { faFileAlt, faArrowAltCircleUp, faShoppingCart ,faMapSigns, faIndustry } from '@fortawesome/free-solid-svg-icons'

    export default {
        data () {
            return {
                showMenu: false,
                open: true,
                showBackToTop: false
            };
        },
        props:[''],
        computed: {
            faFileAlt() { return faFileAlt },
            faArrowAltCircleUp() { return faArrowAltCircleUp },
            faShoppingCart() { return faShoppingCart },
            faMapSigns() { return faMapSigns },
            faIndustry() { return faIndustry }
        },
        methods: {
            toggleNavbar: function(){
                this.showMenu = !this.showMenu;
            },
            handleBackToTop(boolen) {
                this.showBackToTop = boolen
            }
        },
        components: {
            navBar,
            foot
        },
    }

</script>

<style> 
</style>
