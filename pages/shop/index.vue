<template>
    <div id="shopIndex">
        <!-- AD -->
        <ad></ad>
        <search>
            <template v-slot:pageContent>
                <brandCard></brandCard>
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
    import brandCard from '@/components/shop/content/brandCard'
    
    export default {
        layout: 'shop',
        scrollToTop: true,
        head(){
            return{
                title:'採購中心首頁',
                meta:[
                    {
                        'name':'description',
                        'content': '文具分類查詢, 文具品牌查詢, 文具關鍵字搜尋及查詢'
                    }
                ]
            }
        },
        data () {
            return {

            };
        },
        computed: {
            
        },
        methods: {},
        components: {
            ad,
            search,
            pagination,
            brandCard
        },
    }

</script>
<style scoped>

</style>