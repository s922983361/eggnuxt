<template>
    <div id="webIndex">
        <header>
            <navBar></navBar>
        </header>
        <section>
            <nuxt />
        </section>        
        <footer>
            <foot></foot>
        </footer>
    </div>
</template>
<script>
    import navBar from '@/components/web/layout/navBar'
    import foot from '@/components/web/layout/foot'
    export default {
        name:'web',
        data () {
            return {
            };
        },
        computed: {},
        methods: {},
        components: {
            navBar,
            foot
		},
    }

</script>
<style>

.__flex-wrap-center-between {
    @apply flex flex-wrap items-center justify-between;
}

</style>
