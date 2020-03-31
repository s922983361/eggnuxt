<template>
    <div class="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden my-6 p-2">
        <div class="px-4 py-2">
            <p class="text-gray-900 font-bold text-3xl uppercase">NIKE AIR</p>
            <p class="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet consectetur adipisicing voluptatibus</p>
        </div>
        <img class="h-32 w-full object-cover mt-2" src="/images/logos/03.png" alt="NIKE AIR">
        <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
            <span class="text-gray-500">
                <fa-icon :icon="faEye"></fa-icon>&nbsp;22000
            </span>                        
            <button
                @click="$router.push(`/shop/brandList/002?brand=品牌名稱`)"
                class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
                >查看詳情
                </button>
        </div>
    </div>
</template>

<script>
    import { faEye } from '@fortawesome/free-solid-svg-icons'
    export default {
        props:{},
        data () {
            return {

            };
        },
        computed: {
            faEye() { return faEye }
        },
        methods: {},
        components: {},
    }

</script>
<style scoped>

</style>