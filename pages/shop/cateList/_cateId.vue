<template>
    <div id="shopCateList">
        <!-- AD -->
        <ad></ad>
        <search>
            <template v-slot:pageContent>
                <prodCard>
                    <template v-slot:cateTitle>
                        <div class="bg-teal-200 text-teal-700 px-6 py-4 rounded-lg relative" role="alert">
                            <div class="mr-4">
                                <strong class="font-bold">{{ $route.query.cate }}</strong>
                                <span class="block sm:inline text-sm"> 搜尋結果: 共120個商品符合</span>
                                
                            </div>

                            <span class="cursor-pointer absolute top-0 bottom-0 right-0 bg-teal-100 w-10 h-10 rounded-full inline-flex items-center justify-center mt-2 mr-3">
                                <fa-icon :icon="faCheck" class="text-teal-300 text-2xl"></fa-icon>
                            </span>
                        </div>
                        <!-- <div class="bg-red-200 text-red-700 px-6 py-4 rounded-lg relative" role="alert">
                            <div class="mr-4">
                                <strong class="font-bold">{{ $route.query.cate }}</strong>
                                <span class="block sm:inline text-sm"> 搜尋結果: 共 0 個商品符合</span>
                                
                            </div>

                            <span class="cursor-pointer absolute top-0 bottom-0 right-0 bg-red-100 w-10 h-10 rounded-full inline-flex items-center justify-center mt-2 mr-3">
                                <fa-icon :icon="faTimes" class="text-red-300 text-2xl"></fa-icon>
                            </span>
                        </div> -->
                    </template>
                </prodCard>
            </template>
            <template v-slot:pagination>
                <pagination></pagination>
            </template>
        </search> 
    </div>
</template>

<script>
    import ad from '@/components/shop/layout/ad'
    import search from '@/components/shop/layout/search'
    import pagination from '@/components/shop/layout/pagination'
    import prodCard from '@/components/shop/content/prodCard'
    import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
    export default {
        layout: 'shop',
        scrollToTop: true,
        head(){
            return{
                title:'分類名稱',
                meta:[
                    {
                        'name':'description',
                        'content': '分類名稱描述細項'
                    }
                ]
            }
        },
        data () {
            return {

            };
        },
        computed: {
            faCheck() { return faCheck },
            faTimes() { return faTimes }
        },
        methods: {},
        components: {
            ad,
            search,
            pagination,
            prodCard
        },
    }

</script>
<style scoped>

</style>