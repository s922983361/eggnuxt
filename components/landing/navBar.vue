<template>
    <nav 
        class="fixed top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
        :class="{'bg-gray-700': isScrollTop }"        
        >
        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <!-- start logo -->
            <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
                href="https://www.creative-tim.com/learning-lab/tailwindcss-starter-project#/presentation"
                >Tailwind Starter Kit</a>
                <button
                    class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    v-on:click="toggleNavbar()">
                    <fa-icon :icon="faBars" class="text-white"></fa-icon>
                </button>
            </div><!-- End logo -->
            <!-- start nav-item -->
            <div class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
                v-bind:class="{'hidden': !showMenu, 'block': showMenu}">
                <!-- start LEFT nav-item -->
                <ul class="flex flex-col lg:flex-row list-none mr-auto">
                    <li class="flex items-center hover:bg-orange-400">
                        <a 
                            class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#"
                            @click="showMenu = !showMenu"
                            v-scroll-to="{ 
                                el: '#Feature',
                                easing: [.6, .80, .30, 1.9],
                                duration: 2000,
                                offset: -63
                            }"
                            >
                            <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> Docs</a>
                            
                    </li>
                    <li class="flex items-center hover:bg-orange-400">
                        <a 
                            class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#"
                            @click="showMenu = !showMenu"
                            v-scroll-to="{ 
                                el: '#User',
                                easing: [.6, .80, .30, 1.9],
                                duration: 2000,
                                offset: -63
                            }"
                            >
                            <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> Docs</a>
                            
                    </li>
                    <li class="flex items-center hover:bg-orange-400">
                        <a 
                            class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#"
                            @click="showMenu = !showMenu"
                            v-scroll-to="{ 
                                el: '#Shop',
                                easing: [.6, .80, .30, 1.9],
                                duration: 2000,
                                offset: -63 
                            }"
                            >
                            <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> Docs</a>
                            
                    </li>
                    <li class="flex items-center hover:bg-orange-400">
                        <a 
                            class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#"
                            @click="showMenu = !showMenu"
                            v-scroll-to="{ 
                                el: '#Factory',
                                easing: [.6, .80, .30, 1.9],
                                duration: 2000,
                                offset: -63 
                            }"
                            >
                            <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> Docs</a>
                            
                    </li>
                </ul><!-- END LEFT nav-item -->

                <!-- start RIGHT nav-item -->
                <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li class="flex items-center">
                        <a
                            class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            href="#pablo">
                            <fa-icon :icon="faFacebook" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> 
                            <span class="lg:hidden inline-block ml-2">Share</span></a>
                    </li>
                    <li class="flex items-center">
                        <a
                            class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            href="#pablo">
                            <fa-icon :icon="faTwitter" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon>
                            <span class="lg:hidden inline-block ml-2">Tweet</span></a>
                    </li>
                    <li class="flex items-center">
                        <a
                            class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            href="#pablo">
                            <fa-icon :icon="faGithub" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon>
                            <span class="lg:hidden inline-block ml-2">Star</span></a>
                    </li>
                    <li class="flex items-center">
                        <button
                            class="bg-gray-400 text-gray-800 active:bg-gray-100 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none hover:bg-orange-500 hover:text-white focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                            type="button"
                            style="transition: all 0.15s ease 0s;"
                            >
                            <nuxt-link to="/shop">
                                <fa-icon :icon="faHandPointRight" class="text-lg"></fa-icon> &nbsp; 進入採購中心
                            </nuxt-link>
                            </button>
                    </li>
                </ul><!-- End RIGHT nav-item -->
            </div>
            <!-- End nav-item -->
        </div>
    </nav>
</template>

<script>
    import { faFileAlt, faHandPointRight, faBars} from '@fortawesome/free-solid-svg-icons'
    import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
    export default {
        data () {
            return {
                scrollTop: null,
                showMenu: false,
                isScrollTop: false,
            };
        },
        mounted() {
            window.addEventListener('scroll', this.handlescroll, true)
        },
        destroyed() {
            window.removeEventListener('scroll', this.handlescroll, true)
        }, 
        computed: {            
            faFileAlt() { return faFileAlt },
            faFacebook() { return faFacebook },
            faTwitter() { return faTwitter },
            faGithub() { return faGithub },
            faBars() { return faBars},
            faHandPointRight() { return faHandPointRight }
        },
        methods: {
            toggleNavbar: function(){
                this.showMenu = !this.showMenu;
            },
            handlescroll(e) {
                this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
                if(this.scrollTop > 270) {
                    this.isScrollTop = true
                    this.$emit('handleBackToTop', true)
                }
                if(this.scrollTop < 270) {
                    this.isScrollTop = false
                    this.$emit('handleBackToTop', false)
                }
            }            
        },
        components: {},
    }

</script>
<style scoped>

</style>