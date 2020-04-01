<template>
    <div id="product" class="">
        <div class="flex flex-wrap">
            <section class="imgList w-full lg:w-7/12 xl:w-1/2 p-4 hover:bg-gray-200">                
                <client-only>               
                <slick ref="slick" class="slider-for" style="width: 95%; margin-left:1rem;" :options="slickOptions">
                    <a href="javascript:void(0)" v-for=" img in item.imgUrl" :key="img.id">
                        <img :src="`${img.url}`" alt="">
                    </a>
                </slick>
                </client-only>
                <client-only>               
                <slick ref="slick" class="slider-nav" style="width: 95%; margin-left:1rem;" :options="thumbSlickOptions">
                    <a href="javascript:void(0)" v-for=" img in item.imgUrl" :key="img.id">
                        <img :src="`${img.url}`" alt="">
                    </a>
                </slick>
                </client-only>
            </section>
            <section class="detail relative py-8 px-4 w-full lg:w-5/12 xl:w-1/2">
                <!-----------------------------------------------------------------start tags wrapper -->
                <div class="absolute top-0 right-0 -mt-4 text-right">
                    <span v-if="item.is_new === 1" class=" inline-block text-md bg-red-600 text-white px-2 py-1 rounded-full shadow-lg"> New !</span>
                    <span v-if="item.is_onSale === 1" class=" inline-block text-md bg-pink-600 text-white px-2 py-1 rounded-full shadow-lg"> Off {{ ((1-(item.special_price/ item.market_price))*100).toFixed(1) }} %</span>
                    <span class=" inline-block text-md bg-orange-300 text-orange-700 px-2 py-1 rounded-full shadow-lg"> Hot !</span>
                </div><!-- End tags wrapper -->
                
                <!------------------------------------------------------------start Goods_title wrapper -->
                <div class="">
                    <h1 v-show="false">{{ item.goods_sn }} {{ item.title }}</h1>
                    <!------------------------------------------------------------ start Goods_sn--> 
                    <span class="px-4 py-1 bg-teal-500 rounded-full text-white font-sans font-bold text-2xl">{{ item.goods_sn }}</span>
                    <!-----------------------------------------------------------  start Goods_title -->
                    <span class="text-2xl font-yen text-teal-500 ml-2">{{ item.title }}</span>
                    
                </div><!-- End Goods_title wrapper --> 

                <!----------------------------------------------------------------start sub_title wrapper -->
                <div class="mt-4 pb-4">                    
                    <!--------------------------------------------------------------- start sub_title -->
                    <span class="text-black font-yen text-lg">{{ item.sub_title }}</span>
                    
                    <div class="flex items-center mt-4">
                        <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="i <= item.rating ? 'text-teal-500' : 'text-gray-400'" class="h-4 w-4 fill-current">   
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                        </svg>
                        <span class="border-l-2 border-gray-500 ml-4 pl-4 text-teal-500">
                            {{ item.click_count }}<fa-icon :icon="faEye" class="ml-2"></fa-icon>
                        </span>
                        <span class="border-l-2 border-gray-500 ml-4 pl-4 text-teal-500">
                            {{ item.click_count }}<fa-icon :icon="faShoppingBag" class="ml-2"></fa-icon>
                        </span>
                    </div>
                </div><!-- End sub_title wrapper -->

                <!----------------------------------------------------------------start version wrapper -->
                <div class="flex flex-wrap mt-4">
                    <div class="text-md text-black w-full mb-2">
                        <label class="py-1  border-b-2 border-teal-500 text-black font-yen text-lg">選擇其他版本/包裝:</label>                        
                    </div>
                    <!--------------------------------------------------------------- start version -->
                    <div class="w-1/2 md:w-1/3 lg:w-1/2 p-2 cursor-pointer" @click="$router.push(`/store/product/versionId`)">
                        <div 
                            class="border border-gray-500 px-6 py-3 text-sm font-sans hover:border-orange-500 hover:text-orange-500"
                            style="transition: all .3s ease"
                            >
                            <span>a-105</span>
                            <span>商品名稱</span>
                            <span>商品價</span>
                        </div>                        
                    </div>
                    <div class="w-1/2 md:w-1/3 lg:w-1/2 p-2 cursor-pointer" @click="$router.push(`/store/product/versionId`)">
                        <div 
                            class="border border-gray-500 px-6 py-3 text-sm font-sans hover:border-orange-500 hover:text-orange-500"
                            style="transition: all .3s ease"
                            >
                            <span>a-105</span>
                            <span>商品名稱</span>
                            <span>商品價</span>
                        </div>                        
                    </div>
                    <div class="w-1/2 md:w-1/3 lg:w-1/2 p-2 cursor-pointer" @click="$router.push(`/store/product/versionId`)">
                        <div 
                            class="border border-gray-500 px-6 py-3 text-sm font-sans hover:border-orange-500 hover:text-orange-500"
                            style="transition: all .3s ease"
                            >
                            <span>a-105</span>
                            <span>商品名稱</span>
                            <span>商品價</span>
                        </div>                        
                    </div>
                </div><!-- End version wrapper --> 

                <!----------------------------------------------------------------start color & size wrapper -->
                <div class="flex flex-wrap mt-4">
                    <div class="w-full md:w-1/2 lg:w-full mb-4">
                        <div class="text-md text-black w-full mb-2"> 
                            <label class="py-1  border-b-2 border-teal-500 text-black font-yen text-lg">選擇商品顏色:</label>
                        </div>
                        <!---------------------------------------------------------------start color -->
                        <div class="inline-block cursor-pointer p-1" v-for="i in 7" :key="i">
                            <div 
                                class="flex items-center justify-center w-10 h-10 border-2 border-white rounded-full hover:border-black"                                
                                style="transition: all .3s ease"
                                >
                                <div class="w-8 h-8 rounded-full " style="background-color:blue"></div>
                            </div> 
                        </div> 
                    </div>
                    <div class="w-full md:w-1/2 lg:w-full mb-4">
                        <div class="text-md text-black w-full mb-2">                            
                            <label class="py-1  border-b-2 border-teal-500 text-black font-yen text-lg">選擇尺寸/規格:</label>                        
                        </div>
                        <!--------------------------------------------------------------- start Size -->
                        <div class="inline-block p-1 cursor-pointer">
                            <div 
                                class="border border-gray-500 px-4 py-2 text-sm font-sans hover:border-3 hover:border-gray-500 hover:bg-gray-800 hover:text-white text-center rounded-lg"
                                style="transition: all .3s ease"
                                >
                                <span>100x50</span>
                            </div>
                        </div>
                        <div class="inline-block p-1 cursor-pointer">
                            <div 
                                class="border border-gray-500 px-4 py-2 text-sm font-sans hover:border-3 hover:border-gray-500 hover:bg-gray-800 hover:text-white text-center rounded-lg"
                                style="transition: all .3s ease"
                                >
                                <span>S</span>
                            </div>
                        </div>
                        <div class="inline-block p-1 cursor-pointer">
                            <div 
                                class="border border-gray-500 px-4 py-2 text-sm font-sans hover:border-3 hover:border-gray-500 hover:bg-gray-800 hover:text-white text-center rounded-lg"
                                style="transition: all .3s ease"
                                >
                                <span>M</span>
                            </div>
                        </div>
                        <div class="inline-block p-2 cursor-pointer">
                            <div 
                                class="border border-gray-500 px-4 py-2 text-sm font-sans hover:border-3 hover:border-gray-500 hover:bg-gray-800 hover:text-white text-center rounded-lg"
                                style="transition: all .3s ease"
                                >
                                <span>L</span>
                            </div>
                        </div>
                    </div><!-- End size wrapper -->
                </div><!-- End color & size wrapper -->

                <!------------------------------------------------------------start count & price wrapper -->
                <div class="flex flex-wrap mt-4">                    
                    <!----------------------------------------------------------------start count wrapper -->
                    <div class="w-1/2">
                        <div class="text-md text-black w-full mb-2"> 
                            <label class="py-1  border-b-2 border-teal-500 text-black font-yen text-lg">選擇數量:</label>
                        </div>
                        <!--------------------------------------------------------------- start count -->
                        <div class="flex flex-row h-10 w-2/3 rounded-lg relative bg-transparent mt-1">
                            <el-input-number 
                                v-model="num" 
                                controls-position="right" 
                                @change="handleChange" 
                                :min="1" 
                                :max="999"
                                >
                                </el-input-number>
                        </div>                        
                    </div><!-- End size wrapper -->
                    <!----------------------------------------------------------------start price wrapper -->
                    <div class="w-1/2 mb-4">                       
                        <!--------------------------------------------------------------- start price -->
                        <div class="text-gray-600 font-yen pt-4">
                            <span>
                                <p class="inline-block text-md">建議售價:</p >&nbsp;
                                <del v-if="item.is_onSale === 1" class="inline-block text-xl">{{ item.market_price }}</del>
                                <p v-if="item.is_onSale === 0" class="inline-block text-4xl text-teal-500">{{ item.market_price }}</p>
                            </span> 
                            <span v-if="item.is_onSale === 1">
                                <p class="inline-block text-red-600 text-xl">特價:</p> 
                                <p class="inline-block text-red-600 text-5xl font-black">{{ item.special_price }}</p>
                            </span>
                        </div>
                    </div><!-- End price wrapper -->
                </div>
                <!-- End size & count wrapper -->

                <!------------------------------------------------------------start cart Button wrapper -->
                <div class="flex flex-wrap mt-4 md:justify-end" @click="addToCart">
                    <button class="w-full md:w-1/2 lg:w-full text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-md text-center px-6 py-3  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                        <fa-icon :icon="faShoppingCart" class="mr-2"></fa-icon> 加入採購清單
                    </button>
                </div><!-- End cart Button wrapper -->
            </section>
            <section class="desc container mx-auto p-4 w-full">
                <!------------------------------------------------------- start Goods description wrapper  -->
                <el-tabs type="card">
                    <el-tab-pane label="商品介紹">
                        <div class="border border-gray-300 rounded-lg p-4">
                            {{ item.content }}
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="商品規格參數">
                        <div class="p-4">                            
                            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div class="flex px-4 py-5 border-b border-gray-200 sm:px-6">
                                    <div class="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 md:w-14 md:h-14">
                                        <fa-icon :icon="faCogs" class="text-teal-600 text-md md:text-xl"></fa-icon>
                                    </div>
                                    <div class="inline-block ml-4 mt-2">
                                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        商品規格以及其他特殊參數
                                        </h3>
                                        <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                                        Personal details and application.
                                        </p>
                                    </div>                                    
                                </div>
                                <div>
                                    <dl>
                                        <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-blue-100">
                                            <dt class="text-sm leading-5 font-medium text-gray-500">
                                            是否防水
                                            </dt>
                                            <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                            是
                                            </dd>
                                        </div>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-blue-100">
                                            <dt class="text-sm leading-5 font-medium text-gray-500">夾具</dt>
                                            <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">文書夾</dd>
                                        </div>                                        
                                        <!-- <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm leading-5 font-medium text-gray-500">
                                            Attachments
                                            </dt>
                                            <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                            <ul class="border border-gray-200 rounded-md">
                                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                                                <div class="w-0 flex-1 flex items-center">
                                                    <svg class="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"/>
                                                    </svg>
                                                    <span class="ml-2 flex-1 w-0 truncate">
                                                    resume_back_end_developer.pdf
                                                    </span>
                                                </div>
                                                <div class="ml-4 flex-shrink-0">
                                                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                                                    Download
                                                    </a>
                                                </div>
                                                </li>
                                                <li class="border-t border-gray-200 pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                                                    <div class="w-0 flex-1 flex items-center">
                                                        <svg class="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"/>
                                                        </svg>
                                                        <span class="ml-2 flex-1 w-0 truncate">
                                                        coverletter_back_end_developer.pdf
                                                        </span>
                                                    </div>
                                                    <div class="ml-4 flex-shrink-0">
                                                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                                                        Download
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                            </dd>
                                        </div> -->
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="評價(1)">                       
                        <div class="flex flex-wrap border border-gray-300 rounded-lg p-4">
                            <!------------------------------------------------------ start review warpper -->
                            <div class="w-full md:w-1/2">
                                <div class="lg:text-center mt-4">
                                    <p class="mt-4 max-w-2xl text-xl leading-7 text-black lg:mx-auto">
                                        使用者評價
                                    </p>
                                </div>
                                
                                <div class="p-4">
                                    <!------------------------------------------start User rates-->
                                    <div class="flex items-center">
                                        <img class="w-10 h-10 rounded-full mr-4" src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink">
                                        <div class="text-sm">
                                            <p class="inline text-black leading-none">Jonathan Reinink</p>
                                            <p class="inline text-grey-dark">Aug 18</p>

                                            <div class="flex items-center mt-1">
                                                <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="i <= item.rating ? 'text-teal-500' : 'text-gray-400'" class="h-4 w-4 fill-current">   
                                                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                                                </svg>
                                            </div>
                                        </div>                                        
                                    </div><!--End User rates-->
                                    <!------------------------------------------start User content -->
                                    <div class="border border-gray-300 rounded-lg p-4 mt-2">
                                        <p class="text-base leading-6 text-black">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
                                    </div><!--End User content -->
                                </div>
                            </div><!-- End review warpper -->
                            <!------------------------------------------------------ start rate warpper -->
                            <div class="w-full md:w-1/2">
                                <div class="lg:text-center my-4">                                    
                                    <p class="mt-2 max-w-2xl text-xl leading-7 text-indigo-600 lg:mx-auto">
                                        您的評價是我們改進及創新的最大動力
                                    </p>
                                </div>
                                <!----------------------------------------------------start My rate warpper -->
                                <div class="mb-4">
                                    <label class="text-lg font-yen">我的評分:</label>
                                    <div class="inline-block ml-2">                                    
                                        <el-rate
                                            v-model="value2"
                                            :show-text="true"
                                            :texts="['不好用', '勉強可以用', '普通', '品質滿意', '持續愛用']"
                                            :colors="colors">
                                        </el-rate>
                                    </div>
                                </div> <!--End My rate warpper -->
                                <!--------------------------------------------------start My review warpper -->
                                <div class="mb-4">                                    
                                    <label class="text-lg font-yen">我的評論:</label>
                                    <div class="mt-4">
                                        <el-input 
                                            type="textarea"
                                            :rows="3"
                                            maxlength="50"
                                            :show-word-limit="true"
                                            v-model="textarea"
                                            >
                                            </el-input>
                                    </div>
                                </div><!--End My review warpper -->
                                <!-----------------------------------------start send review Button wrapper -->
                                <div class="flex flex-wrap mt-4 justify-end" @click="sendReview">
                                    <button class="w-1/4 text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-md text-center px-6 py-3  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                                        <fa-icon :icon="faShoppingCart" class="mr-2"></fa-icon>送出
                                    </button>
                                </div><!-- End cart Button wrapper -->
                            </div><!-- End rate warpper -->                            
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </section>
            <section class="mayLike container mx-auto p-4 w-full">
                <div class="flex item-cemter justify-center my-4 border-b border-gray-300 pb-4 mx-auto">
                    <div class="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 md:w-14 md:h-14">
                        <fa-icon :icon="faThumbsUp" class="text-indigo-600 text-md md:text-xl"></fa-icon>
                    </div>
                    <div class="ml-4 mt-3">
                        <p class="max-w-3xl text-xl leading-7 text-black">
                        你也許會喜歡</p>
                    </div> 
                </div>
                <!----------------------------------------------------------- strat Like product wrapper -->
                <div >
                    <client-only>               
                        <slick ref="slick" class="slider-nav" style="width: 95%; margin-left:1rem;" :options="likeSlickOptions">
                            <!-----------------------------------------------------------strat Like product-->
                            <div 
                                v-for=" i in 5" :key="i"
                                class="bg-white shadow-lg rounded-lg overflow-hidden my-6 p-2"
                                >
                                <div class="px-4 py-2">
                                    <p class="text-gray-900 font-bold text-3xl uppercase">NIKE AIR</p>
                                    <p class="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet consectetur adipisicing voluptatibus</p>
                                </div>
                                <img class="h-56 w-full object-cover mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="NIKE AIR">
                                <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
                                    <p class="text-gray-200 font-bold text-xl">$129</p>
                                    <button
                                        @click="$router.push(`/store/product/${i}`)"
                                        class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
                                        >查看詳情
                                        </button>
                                </div>
                            </div>
                            
                            <!-- strat Like product-->
                        </slick>
                    </client-only>
                </div><!-- strat Like product wrapper -->
            </section>
        </div>
    </div>
</template>

<script>
    import { faEye, faShoppingCart, faShoppingBag, faCogs, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
    import '~/node_modules/slick-carousel/slick/slick.css'
    export default {
        layout: 'shop',
        scrollToTop: true,
        data () {
            return {
                textarea:'',
                value2: null,
                num:1,
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
                item:{                    
                    _id:'001',
                    title: '商品名稱',
                    sub_title: '一些有的沒得商品描述When an unknown printer specimen book.',
                    imgUrl: [
                        {
                            id:'1111',
                            url:`${process.env.BASE_URL}/images/example/01.jpg`
                        },
                        {
                            id:'1112',
                            url:`${process.env.BASE_URL}/images/example/02.jpg`
                        },
                        {
                            id:'1113',
                            url:`${process.env.BASE_URL}/images/example/03.jpg`
                        },
                        {
                            id:'1114',
                            url:`${process.env.BASE_URL}/images/example/04.jpg`
                        },
                    ],
                    goods_sn: 'A-105',
                    market_price: 100,
                    special_price: 65,
                    click_count: 22000,
                    is_new: 1,
                    is_onSale: 0,
                    status: 0,
                    rating: 2,
                    content:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus ad et cum nesciunt. Nemo velit accusantium provident. Impedit animi placeat quis tenetur commodi sed sint suscipit nulla esse? Quisquam, molestias?'
                },                
                slickOptions: {
                    slidesToShow: 1,//顯示幾張
                    //slidesToScroll: 1,//一次滑行幾張
                    arrows:false,
                    fade: true,
                    asNavFor: '.slider-nav'
                },
                thumbSlickOptions: {
                    slidesToShow: 3,//顯示幾張
                    slidesToScroll: 1,//一次滑行幾張
                    dots:true,
                    centerMode: true,
                    focusOnSelect: true,
                    asNavFor: '.slider-for',
                },
                likeSlickOptions:{
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots:true,
                    arrows: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    centerMode: true,
                    responsive: [                        
                        {
                            breakpoint: 1280,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                    ],
                }
            };
        },
        computed: {
            faCogs() { return faCogs },
            faEye() { return faEye },
            faThumbsUp() { return faThumbsUp },
            faShoppingBag() { return faShoppingBag },
            faShoppingCart() { return faShoppingCart },
        },
        created() {},
        methods: {
            next() {
                this.$refs.slick.next();
            },
            prev() {
                this.$refs.slick.prev();
            },    
            reInit() {
                // Helpful if you have to deal with v-for to update dynamic lists
                this.$nextTick(() => {
                    this.$refs.slick.reSlick();
                });
            },
            async addToCart() {
                alert(1)
            },
            async sendReview() {
                alert(send)
            },
            handleChange(value) {
                console.log(value)
            }
        },
        components: {},
    }

</script>
<style>
</style>