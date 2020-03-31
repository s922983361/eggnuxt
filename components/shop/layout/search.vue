<template>
    <div id="search">
        <!-- This is an example component -->
        <div class="flex">
            <div class="md:hidden">
                <!-- black overlay -->
                <div 
                    @click="sidemenu = false" 
                    class="fixed inset-0 z-30 bg-gray-600 opacity-0 transition-opacity ease-linear duration-300" 
                    :class="{'opacity-75 pointer-events-auto': sidemenu, 'opacity-0 pointer-events-none': !sidemenu}"></div>

                <!-- Small Screen Menu --> 
                <div 
                    class="fixed inset-y-0 left-0 flex flex-col z-40 max-w-xs w-full bg-white transform ease-in-out duration-300" 
                    :class="{'translate-x-0': sidemenu, '-translate-x-full': !sidemenu}">

                    <!-- Brand Logo / Name -->
                    <div class="flex items-center px-6 py-3 h-16">
                        <div class="text-2xl font-bold tracking-tight text-gray-800">商品分類</div>
                    </div>
                    <!-- @end Brand Logo / Name -->

                    <div class="px-4 py-2 flex-1 h-0 overflow-y-auto">
                        <client-only>
                            <cateTree></cateTree>
                        </client-only>                        
                    </div>                    
                </div>
                <!-- @end Small Screen Menu -->
            </div>
            <!-- Menu Above Medium Screen -->
            <div class="bg-white w-64 min-h-screen overflow-y-auto hidden md:block shadow relative z-30">

                <!-- Brand Logo / Name -->
                <div class="flex items-center px-6 py-3 h-16">
                    <div class="text-2xl font-bold tracking-tight text-gray-800 ">商品分類</div>
                </div>
                <!-- @end Brand Logo / Name -->

                <div class="px-4 py-2">
                    <client-only>
                        <cateTree></cateTree>
                    </client-only>
                </div>
            </div>
            <!-- @end Menu Above Medium Screen -->

            <!-- right section -->
            <div class="flex-1 flex-col z-0">
                <div class="px-4 md:px-8 py-2 h-16 flex justify-between items-center shadow-sm bg-white">
                    <div class="flex items-center w-2/3">
                        <input class="bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-white border border-transparent focus:border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal hidden md:block placeholder-gray-700 mr-10" type="text" placeholder="Search...">

                        <div class="p-2 rounded-full hover:bg-gray-200 cursor-pointer md:hidden" @click="sidemenu = !sidemenu">
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-600"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </div>
                        <div class="text-xl font-bold tracking-tight text-gray-800 md:hidden ml-2">商品分類</div>
                    </div>
                    <div class="flex items-center">
                        
                        <a href="#" class="text-gray-500 p-2 rounded-full hover:text-blue-600 hover:bg-gray-200 cursor-pointer mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                            </svg>						  
                        </a>
                        
                    </div>
                </div>
            
                <div class="flex flex-wrap md:max-w-6xl md:mx-auto px-4 py-8">
                    <slot name="pageContent"></slot>
                </div>

                <div class="flex justify-end">
                    <slot name="pagination"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cateTree from '@/components/shop/layout/cateTree'
    export default {
        data () {
            return {
                sidemenu: true
            };
        },
        mounted() {
            document.addEventListener( "keydown", (e) => {
                //使用 esc 關閉分類搜尋欄
                if (e.keyCode == 27 && this.sidemenu == true) {
                    this.sidemenu = false
                }
            })
        },
        props:[''],
        computed: {
            
        },
        methods: {},
        components: {
            cateTree
        },
    }

</script>
<style scoped>

</style>