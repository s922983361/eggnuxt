<template>
    <div class="navIn w-full flex flex-wrap items-center justify-between px-2 py-3 border-black-300 border-t-2 border-b-2 h-16 md:justify-center">
        <button
            v-if="$route.path === '/store'"
            class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none md:hidden"
            type="button" @click="$store.dispatch('showCateListBar')">
            <fa-icon :icon="faBars" class="text-indego-500"></fa-icon>
        </button>

        <div class="relative text-gray-600">
            <input type="search" name="serch" placeholder="Search" class="bg-indigo-200 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none">
            <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
    import { faBars } from '@fortawesome/free-solid-svg-icons'
    export default {       
        data () {
            return {
                
            };
        },
        computed: {
            faBars() { return faBars }
        },
        methods: {
        },
        components: {},
    }

</script>
<style scoped>

</style>