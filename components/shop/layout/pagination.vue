<template>
    <div class="inline-block border-t-2 border-b-2 border-gray-400 py-4 mb-2">
        <el-pagination
            background
            hide-on-single-page
            prev-text="prev"
            next-text="next"
            layout="prev, pager, next"
            :total="1000"
            >
            </el-pagination>
    </div>
</template>

<script>
    export default {
        props:{},        
        data () {
            return {

            };
        },        
        computed: {},
        methods: {},
        components: {},
    }

</script>
<style scoped>

</style>