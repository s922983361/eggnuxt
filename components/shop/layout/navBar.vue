<template>
    <div id="navBar">
        <nav 
            class="top-0 z-50 w-full flex items-center justify-between px-2 py-3 navbar-expand-lg bg-indigo-700">
            <!--------------------------------------------------------------------- Start Nav Wrapper -->
            <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <!------------------------------------------------------------------start Nav left content -->
                <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <!--------------------------------------------------------------------start Logo -->
                    <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
                    href="https://www.creative-tim.com/learning-lab/tailwindcss-starter-project#/presentation"
                    >Tailwind Starter Kit</a><!--End Logo-->

                    <div class="flex items-center px-4 lg:hidden">
                        <ul class="flex items-center list-none mr-auto ">
                            <li 
                                class="relative mr-4 cursor-pointer" 
                                @click="$emit('showShoppingCart')"
                                >                            
                                <fa-icon :icon="faShoppingCart" class="text-xl text-white hover:text-pink-300"></fa-icon>
                                <div class="absolute top-0 right-0 -mt-3 -mr-3 w-5 h-5 rounded-full bg-pink-500 text-center text-white text-xs flex justify-center items-center">20</div>
                            </li>
                            <li class="mr-3 cursor-pointer">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link">
                                        <fa-icon :icon="faUserCheck" class="text-xl text-white hover:text-pink-300">
                                        </fa-icon>
                                        <!-- <fa-icon :icon="faUserTimes" class="text-xl text-white hover:text-orange-400"></fa-icon> -->
                                    </span>                                
                                    
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item icon="el-icon-user-solid">個人中心</el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-success">登入</el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-error">登出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </li>
                            <!-------------------------------------------------------------------- start toggle -->
                            <li class="mr-4 cursor-pointer" @click="showNavMenu = !showNavMenu">
                                <fa-icon :icon="faBars" class="text-xl text-white hover:text-pink-300"></fa-icon>
                            </li><!-- End toggle -->
                        </ul>
                    </div>
                </div><!-- End Nav left content -->

                <!-------------------------------------------------------------------- start Nav Items -->
                <div 
                    class="lg:flex flex-grow items-center bg-gray-600 lg:bg-transparent lg:shadow-none rounded-lg"
                    :class="{'hidden': !showNavMenu, 'block': showNavMenu }">
                    
                    <ul class="flex flex-col lg:flex-row items-center list-none mr-auto">
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg"
                            :class="$route.path === '/shop' || $route.path === '/shop/'? 'bg-pink-500': ''"
                            @click="$router.push('/shop')"
                            >
                            <fa-icon :icon="faShoppingBag"></fa-icon>&nbsp;找商品
                        </li>
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg"
                            :class="$route.path === '/shop/new' || $route.path === '/shop/new/'? 'bg-pink-500': ''"
                            @click="$router.push('/shop/new')"
                            >
                            <fa-icon :icon="faRunning"></fa-icon>&nbsp;找新品
                        </li>
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg"
                            :class="$route.path === '/shop/onSale' || $route.path === '/shop/onSale/'? 'bg-pink-500': ''"
                            @click="$router.push('/shop/onSale')"
                            >
                            <fa-icon :icon="faHandHoldingUsd"></fa-icon>&nbsp;找特價
                        </li>
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg"
                            :class="$route.path === '/shop/activity' || $route.path === '/shop/activity/'? 'bg-pink-500': ''"
                            @click="$router.push('/shop/activity')"
                            >
                            <fa-icon :icon="faCommentsDollar"></fa-icon>&nbsp;找活動
                        </li>
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg"
                            :class="$route.path === '/shop/article' || $route.path === '/shop/article/'? 'bg-pink-500': ''"
                            @click="$router.push('/shop/article')"
                            >
                            <fa-icon :icon="faRssSquare"></fa-icon>&nbsp;新動態
                        </li>
                    </ul>

                    <ul class="hidden lg:flex items-center list-none ml-auto">
                        <li 
                            class="relative mr-6 cursor-pointer" 
                            @click="$emit('showShoppingCart')"
                            >                            
                            <fa-icon :icon="faShoppingCart" class="text-xl text-white hover:text-pink-300"></fa-icon>
                            <div class="absolute top-0 right-0 -mt-3 -mr-3 w-5 h-5 rounded-full bg-pink-500 text-center text-white text-xs flex justify-center items-center">20</div>
                        </li>
                        <li class="mr-6 cursor-pointer">
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    <fa-icon :icon="faUserCheck" class="text-xl text-white hover:text-pink-300">
                                    </fa-icon>
                                    <!-- <fa-icon :icon="faUserTimes" class="text-xl text-white hover:text-orange-400"></fa-icon> -->
                                </span>                                
                                
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-user-solid">個人中心</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-success">登入</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-error">登出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                        <!-------------------------------------------------------------------- start toggle -->
                        <li class="mr-6 cursor-pointer lg:hidden" @click="showNavMenu = !showNavMenu">
                            <fa-icon :icon="faBars" class="text-xl text-white hover:text-pink-300"></fa-icon>
                        </li><!-- End toggle -->
                    </ul>

                </div><!--End Nav Items -->
            </div><!-- End Nav Wrapper -->
            </nav>            
    </div>
</template>

<script>
    import { faUserCheck, faUserTimes, faShoppingCart, faBars, faShoppingBag , faRunning, faCommentsDollar, faHandHoldingUsd, faRssSquare } from '@fortawesome/free-solid-svg-icons'
    // import { faShopify, } from '@fortawesome/free-brands-svg-icons'
    export default {        
        data () {
            return {
                showNavMenu: false,
                dropdownPopoverShow: false
            };
        },
        props:[''],
        computed: {
            faShoppingBag() { return faShoppingBag },
            faRunning() { return faRunning },
            faCommentsDollar() { return faCommentsDollar },
            faHandHoldingUsd() { return faHandHoldingUsd },
            faRssSquare() { return faRssSquare },
            faBars() { return faBars },
            faUserCheck() { return faUserCheck },
            faUserTimes() { return faUserCheck },
            faShoppingCart() { return faShoppingCart }
        },
        methods: {
        },
        components: {},
    }

</script>
<style scoped>

</style>