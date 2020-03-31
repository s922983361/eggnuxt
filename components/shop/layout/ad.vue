<template>
    <div id="ad">
        <client-only>               
            <slick ref="slickAd" style="width: 100%;" :options="SlickOptions">
                <div class="relative bg-gray-200 pb-80" v-for="item in AD" :key='item._id'>
                    <nuxt-link v-if="item.link !=''" :to="item.link">
                        <img class="absolute h-full w-full object-cover" :src="item.imgUrl" :alt="item.tittle">
                    </nuxt-link>
                    <img v-else class="absolute h-full w-full object-cover" :src="item.imgUrl" :alt="item.tittle">
                </div>                 
            </slick>
        </client-only>
    </div>
</template>

<script>
    export default {
        props: {},        
        data () {
            return {
                AD:[
                    {
                        _id: '001',
                        link: '/shop/product/id',
                        imgUrl: '/images/example/03.jpg'
                    },
                    {   
                        _id: '002',
                        link: '/shop/product/id',
                        imgUrl: '/images/example/04.jpg'
                    },
                    {   
                        _id: '003',
                        link: '/shop/product/id',
                        imgUrl: '/images/example/02.jpg'
                    },
                ],
                //See https://www.npmjs.com/package/vue-slick
                SlickOptions:{ 
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 3500,
                    centerMode: true,
                    responsive: [                        
                        {
                            breakpoint: 1280,
                            settings: {
                                slidesToShow: 2,
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
        computed: {},
        methods: {
            next() {
            this.$refs.slickAd.next();
            },
    
            prev() {
                this.$refs.slickAd.prev();
            },
    
            reInit() {
                // Helpful if you have to deal with v-for to update dynamic lists
                this.$nextTick(() => {
                    this.$refs.slickAd.reSlick();
                });
            },
        },
        components: {},
    }

</script>
<style scoped>

</style>