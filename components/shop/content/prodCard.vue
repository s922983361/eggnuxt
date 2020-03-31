<template>
    <div id="shopProdCard" class="p-4">
        <slot name="cateTitle"></slot>
        <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 lg:w-1/3 mt-4 p-2" v-for="item in goodsData" :key="item.sn">

                <div class="rounded-lg hover:border-black">

                    <div class="relative bg-gray-200 pb-48">
                        <img class="absolute h-full w-full object-cover rounded-lg shadow-md" v-lazy="item.imgUrl" :alt="item.title">
                    </div>                    

                    <div class="relative px-4 -mt-12">
                        <div class="p-6 bg-white rounded-lg shadow-lg hover:bg-teal-100">
                            <div class="absolute top-0 right-0 -mt-4 text-right">
                                <span v-if="item.is_new === 1" class=" inline-block text-md bg-red-600 text-white px-2 py-1 rounded-full shadow-lg"> New !</span>
                                <span v-if="item.is_onSale === 1" class=" inline-block text-md bg-pink-600 text-white px-2 py-1 rounded-full shadow-lg"> Off {{ ((1-(item.special_price/ item.market_price))*100).toFixed(1) }} %</span>
                                <span class=" inline-block text-md bg-orange-300 text-orange-700 px-2 py-1 rounded-full shadow-lg"> Hot !</span>
                            </div>
                            
                            <h4 class="-mt-1 font-kaitext-md text-teal-500 text-lg font-yen font-bold">{{ item.goods_sn }} &bull; {{ item.title}}</h4>

                            <div class="text-md text-black font-yen border-b border-gray-500 pb-4">
                                {{ item.sub_title }}
                            </div>
                            <div class="mt-1 text-right text-gray-600 font-yen">
                                <span>
                                    <p class="inline-block text-xs">建議售價:</p >&nbsp;
                                    <del v-if="item.is_onSale === 1" class="inline-block text-md">{{ item.market_price }}</del>
                                    <p v-if="item.is_onSale === 0" class="inline-block text-md">{{ item.market_price }}</p>

                                </span> 
                                <span v-if="item.is_onSale === 1">
                                    <p class="inline-block text-red-600 text-md">特價:</p> 
                                    <p class="inline-block text-red-600 text-3xl font-black">{{ item.special_price }}</p>
                                </span>
                            </div>
                            <div class="flex items-center text-xs">
                                <!-- <svg 
                                    v-for="i in 5" :key="i" viewBox="0 0 24 24" 
                                    :class="i <= item.rating ? 'text-teal-500' : 'text-gray-400'" 
                                    class="h-4 w-4 fill-current">   
                                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" 
                                        />
                                    </svg> -->
                                <span class="text-teal-500">
                                    {{ item.click_count }}<fa-icon :icon="faEye" class="ml-2"></fa-icon>
                                </span>
                                <span class="border-l-2 border-gray-500 ml-2 pl-2 text-teal-500">
                                    {{ item.click_count }}<fa-icon :icon="faShoppingBag" class="ml-2"></fa-icon>
                                </span>
                            </div>
                            <!-- <div class='p-2 text-white bg-orange-500 rounded-lg m-2 font-serif'>商品詳情</div> -->
                            <div 
                                class="absolute bottom-0 right-0 -mb-4 p-2 cursor-pointer"
                                @click="$router.push(`/shop/product/${item._id}`)"
                                >                                
                                <div class="inline-flex items-center bg-white leading-none text-pink-600 rounded-full px-2  py-1 shadow text-sm  border hover:border-indigo-600">
                                    <span class="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center">
                                        <fa-icon :icon="faShoppingCart"></fa-icon>
                                    </span>
                                    <span class="inline-flex px-2 text-indigo-600 font-yen text-md">商品詳情</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { faEye, faShoppingCart, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
    export default {
        data () {
            return {
                goodsData: [
                    {
                        _id:'001',
                        title: '商品名稱',
                        sub_title: '一些有的沒得商品描述',
                        imgUrl: '/images/example/03.jpg',
                        goods_sn: 'A-105',
                        market_price: 100,
                        special_price: 65,
                        click_count: 22000,
                        is_new: 1,
                        is_onSale: 1,
                        status: 0,
                        rating: 2
                    },
                    {   
                        _id:'002',
                        title: '商品名稱',
                        sub_title: '一些有的沒得商品描述一些有的沒得一些有的沒得',
                        imgUrl: '/images/example/02.jpg',
                        goods_sn: 'A-105',
                        market_price: 100,
                        special_price: 70,
                        click_count: 22000,
                        is_new: 0,
                        is_onSale: 1,
                        status: 0,
                        rating: 3
                    },
                    {
                        _id:'003',
                        title: '商品名稱',
                        sub_title: '一些有的沒得商品描述',
                        imgUrl: '/images/example/01.jpg',
                        goods_sn: 'A-105',
                        market_price: 100,
                        special_price: 70,
                        click_count: 22000,
                        is_new: 0,
                        is_onSale: 0,
                        status: 0,
                        rating: 5
                    },
                    {
                        _id:'003',
                        title: '商品名稱',
                        imgUrl: '/images/example/04.jpg',
                        goods_sn: 'A-105',
                        market_price: 100,
                        special_price: 70,
                        click_count: 22000,
                        is_new: 1,
                        is_onSale: 0,
                        status: 0,
                        rating: 4
                    },
                    
                    {
                        _id:'004',
                        title: '商品名稱',
                        sub_title: '一些有的沒得商品描述',
                        imgUrl: '/images/example/01.jpg',
                        goods_sn: 'A-105',
                        market_price: 100,
                        special_price: 70,
                        click_count: 22000,
                        is_new: 1,
                        is_onSale: 1,
                        status: 0,
                        rating: 5
                    },
                    {
                        _id:'005',
                        title: '商品名稱',
                        imgUrl: '/images/example/04.jpg',
                        goods_sn: 'A-105',
                        market_price: 100,
                        special_price: 70,
                        click_count: 22000,
                        is_new: 0,
                        is_onSale: 0,
                        status: 0,
                        rating: 4
                    },
                ]
            };
        },
        computed: {
            faEye() { return faEye },
            faShoppingBag() { return faShoppingBag },
            faShoppingCart() { return faShoppingCart },
        },
        methods: {},
        components: {},
    }

</script>
<style scoped>

</style>