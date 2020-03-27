<template>
    <client-only placeholder="Loading....">
        <carousel
            :items="carouseltems"
            :dots="false"
            :nav="false"
            :loop="true"
            :autoplay="true"
            :autoplayTimeout="4500"
            :autoplayHoverPause="true"
            :margin="6"
            >

            <img src="/images/example/focus1.jpg">
            <img src="/images/example/focus2.jpg">
            <img src="/images/example/focus3.jpg">
            <img src="/images/example/02.jpg">
        </carousel>
    </client-only>
</template>

<script>
    export default {        
        data () {
            return {
                
            };
        },
        computed: {
            carouseltems() {
                if(this.$mq === 'mobile') { 
                    return 1 
                } else { return 2 }
            }
        },        
        methods: {},
        components: {},
    }

</script>
<style scoped>

</style>