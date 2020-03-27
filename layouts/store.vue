<template>    
    <div id="store">
        <header>
            <navBar @handleBackToTop="handleBackToTop"></navBar>
        </header>
        <!-- AD -->
        <main v-if="!($route.path).startsWith('/store/product/')" class="pb-20">            
            <owlCarousel></owlCarousel>
        </main>
        <!-- Page Content --> 
        <section :class="!($route.path).startsWith('/store/product/')?'-mt-10': ''" class="min-h-screen">
            <!-- Global Search Bar in Page Content -->
            <navIn></navIn>
            <!-- Main in Page Content -->
            <nuxt/>
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
    </div>    
    
</template>
<script>
    import navBar from '@/components/store/layout/navBar'
    import owlCarousel from '@/components/store/layout/owlCarousel'
    import foot from '@/components/landing/foot'
    import navIn from '@/components/store/layout/navIn'
    import { faFileAlt, faArrowAltCircleUp, faShoppingCart ,faMapSigns, faIndustry } from '@fortawesome/free-solid-svg-icons'
    export default {
        data () {
            return {
                showBackToTop: false,
            };
        },
        computed: {
            faArrowAltCircleUp() { return faArrowAltCircleUp },            
        },
        methods: {
            handleBackToTop(boolen) {
                this.showBackToTop = boolen
            },
        },
        components: {
            navBar,
            foot,
            navIn,
            owlCarousel
		},
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
</style>
