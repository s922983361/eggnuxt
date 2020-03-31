<template>    
    <div id="store">
        <header>
            <navBar 
                @handleBackToTop="handleBackToTop"
                @showShoppingCart="showShoppingCart"
                >
                </navBar>
        </header>
        <!-- AD -->
        <main v-if="!($route.path).startsWith('/store/product/') && !($route.path).startsWith('/store/checkOrder')" class="pb-20">            
            <owlCarousel></owlCarousel>
        </main>
        <!-- Page Content --> 
        <section :class="!($route.path).startsWith('/store/product/') && !($route.path).startsWith('/store/checkOrder')?'-mt-10': ''" class="min-h-screen">
            <!-- Global Search Bar in Page Content -->
            <navIn v-if="!($route.path).startsWith('/store/checkOrder')"></navIn>
            <!-- Main in Page Content -->
            <transition name="page" mode="out-in">
                <nuxt/>
            </transition>
        </section>

        <section>
            <!-- Divider--> 
            <div class="h-24 bg-indigo-700"></div>
        </section>
        <footer>
            <foot></foot>
        </footer> 
        <!-- Back to Top -->
        <div 
            v-show="showBackToTop"
            class="fixed bottom-0 right-0 text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mr-6 mb-6 shadow-lg rounded-full bg-orange-600 text-4xl cursor-pointer" 
            v-scroll-to="{ el: '#store' }">
            <fa-icon :icon="faArrowAltCircleUp"></fa-icon>
        </div>
        <!-- cart Dialog -->
        <el-dialog 
            title="Shopping Cart"             
            :width="$mq === 'mobile'? '90%': '70%'"
            :visible.sync="dialogCartVisible"
            >
            
            <div class="relative flex w-full bg-white shadow-lg rounded-lg overflow-hidden my-2 pr-4" v-for="i in 3" :key="i">
                <div class="w-2 bg-gray-800"></div>
                <div class="flex flex-wrap items-center px-2 py-3">                        
                    <img class="hidden md:block flex-auto w-12 h-12 object-cover rounded-md" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60">
                    <div class="flex-auto mx-4">
                        <h2 class="text-lg font-semibold text-teal-500">型號:Hello</h2>
                    </div>
                    <div class="flex-auto mx-4">
                        <h2 class="text-lg font-semibold text-black">品名:john</h2>
                    </div>                        
                    <div class="flex-auto mx-4">
                        <p class="text-lg font-yen text-black">100*50</p>                            
                    </div>
                    <div class="flex-auto mx-4">
                        <div class="inline-block px-2 py-1 rounded-full text-white" style="background-color:blue;">藍</div>                           
                    </div>
                    <div class="flex-auto mx-4">
                        <p class="inline-block text-md font-yen text-gray-500">數量:</p>
                        <p class="inline-block text-lg font-yen text-black">20</p>
                    </div>
                    <div class="flex-auto mx-4">
                            <p class="inline-block text-md font-yen text-gray-500">單價:</p>
                            <p class="inline-block text-lg font-yen text-black">15</p>
                        </div>
                    <div class="flex-auto mx-4">
                        <p class="inline-block text-md font-yen text-gray-500">金額:</p>
                        <p class="inline-block text-xl font-yen text-teal-500">2020</p>
                    </div>                        
                </div>
                <div class="absolute top-0 right-0 text-lg text-gray-300 hover:text-red-400 cursor-pointer">
                    <fa-icon :icon="faTimesCircle"></fa-icon>
                </div>
            </div>                
            
            <div class="flex justify-end border-t border-gray-500 mt-4 p-4">
                <div class="">
                    <p class="inline-block text-lg">合計:NT </p>
                    <p class="inline-block text-2xl font-semibold text-orange-500"> 1200元</p>
                </div>
            </div>            
            <span slot="footer" class="dialog-footer">
                <div class="flex justify-end">
                    <button class="w-1/2 md:w-1/4 lg:w-1/6 text-gray-500 bg-transparent border border-solid border-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase text-md text-center px-4 py-2  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="dialogCartVisible = false">
                        繼續採購
                    </button>
                    <button class="w-1/2 md:w-1/4 lg:w-1/6 text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-gray-600 font-bold uppercase text-md text-center px-4 py-2  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="checkOrder">
                        確認訂單
                    </button>
                </div>                
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import navBar from '@/components/store/layout/navBar'
    import owlCarousel from '@/components/store/layout/owlCarousel'
    import foot from '@/components/landing/foot'
    import navIn from '@/components/store/layout/navIn'
    import { faFileAlt, faArrowAltCircleUp, faShoppingCart ,faMapSigns, faIndustry, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
    export default {
        data () {
            return {
                showBackToTop: false,
                dialogCartVisible: false
            };
        },
        computed: {
            faArrowAltCircleUp() { return faArrowAltCircleUp },
            faTimesCircle() { return faTimesCircle }            
        },
        methods: {
            handleBackToTop(boolen) {
                this.showBackToTop = boolen
            },
            showShoppingCart() {
                this.dialogCartVisible = !this.dialogCartVisible
            },
            checkOrder() {
                this.dialogCartVisible = false
                this.$router.push('/store/checkOrder')
            }
        },
        components: {
            navBar,
            foot,
            navIn,
            owlCarousel
        },
        transition: {
            name: 'page',
            mode: 'out-in'
        }
    }

</script>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding-right: 8px;
}
#store .el-tree-node__content {
    height: 50px !important
}
#store .el-form-item .el-form-item__label {
    border-bottom: 1px solid #959595;
}

.page-enter,.page-leave-to {
    opacity: 0;
}
.page-enter-active, .page-leave-active { 
    transition: all 0.5s ease; 
}
</style>
