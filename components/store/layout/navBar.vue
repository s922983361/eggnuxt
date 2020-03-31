<template>
    <div id="navBar">        
        <nav 
            class="top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-indigo-700"
            :class="{'bg-gray-700': isScrollTop }"        
            >
            <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <!------------------------------------------------------------------- start logo -->
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
                <!------------------------------------------------------------------- start nav-item -->
                <div class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
                    v-bind:class="{'hidden': !showMenu, 'block': showMenu}">
                    <!--------------------------------------------------------------- start LEFT nav-item -->
                    <ul class="flex flex-col lg:flex-row list-none mr-auto">
                        <li class="flex items-center hover:bg-orange-400">
                            <a 
                                class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"                                @click="$router.push('/store')"
                                >
                                <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> 找商品</a>
                                
                        </li>
                        <li class="flex items-center hover:bg-orange-400">
                            <a 
                                class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"                                @click="$router.push('/store/testlayout')"
                                >
                                <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> 最新活動</a>
                                
                        </li>
                        <li class="flex items-center hover:bg-orange-400">
                            <a 
                                class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"                                @click="showMenu = !showMenu"
                                >
                                <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> 新品展示</a>
                                
                        </li>
                        <li class="flex items-center hover:bg-orange-400">
                            <a 
                                class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"                                @click="showMenu = !showMenu"
                                >
                                <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> 新品展示</a>
                                
                        </li>
                        <li class="flex items-center hover:bg-orange-400">
                            <a 
                                class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"                                @click="showMenu = !showMenu"
                                >
                                <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> 新聞</a>
                                
                        </li>
                    </ul><!-- END LEFT nav-item -->

                    <!--------------------------------------------------------------- start RIGHT nav-item -->
                    <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
                        <li class="flex items-center">
                            <a 
                                class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"                                @click="$emit('showShoppingCart')"
                                >
                                <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> 找商品</a>
                        </li>                        
                    </ul><!-- End RIGHT nav-item -->
                </div>
                <!-- End nav-item -->
            </div>
        </nav>
    </div>
</template>


<script>    
    import { faFileAlt, faBars} from '@fortawesome/free-solid-svg-icons'
    export default {
        name:'',
        data () {
            return {
                scrollTop: null,
                showMenu: false,
                isScrollTop: false,
                open: true,                
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
            faBars() { return faBars},
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