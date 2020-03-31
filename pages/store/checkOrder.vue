<template>
    <div id="checkOrder">
        <section class="orderContent">            
            <div class="container mx-auto mt-4 p-8 rounded-lg border border-gray-300">
                <div class="lg:text-center mb-4 border-b border-gray-300 pb-4">
                    <p class="mt-2 max-w-3xl text-xl leading-7 text-black lg:mx-auto">
                        您的採購清單</p>
                </div>

                <div class="relative flex w-full bg-white shadow-lg rounded-lg overflow-hidden my-2 pr-4" v-for="i in 3" :key="i">
                    <div class="w-2 bg-gray-800"></div>
                    <div class="flex flex-wrap items-center px-2 py-3">                        
                        <img class="hidden md:block flex-auto w-12 h-12 object-cover rounded-md" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60">
                        <div class="flex-auto mx-4">
                            <h2 class="text-lg font-semibold text-teal-500">型號:Hell6</h2>
                        </div>
                        <div class="flex-auto mx-4">
                            <h2 class="text-lg font-semibold text-black">品名454545454544545454545:john</h2>
                        </div>                        
                        <div class="flex-auto mx-4">
                            <p class="text-lg font-yen text-black">100*50</p>                            
                        </div>
                        <div class="flex-auto mx-4">
                            <div class="inline-block px-2 py-1 rounded-full text-white" style="background-color:blue;">藍</div>                           
                        </div>
                        <div class="flex-auto mx-4">
                            <p class="inline-block text-md font-yen text-gray-500">數量:</p>
                            <p class="inline-block text-lg font-yen text-black">20</p>
                        </div>
                        <div class="flex-auto mx-4">
                            <p class="inline-block text-md font-yen text-gray-500">單價:</p>
                            <p class="inline-block text-lg font-yen text-black">15</p>
                        </div>
                        <div class="flex-auto mx-4">
                            <p class="inline-block text-md font-yen text-gray-500">金額:</p>
                            <p class="inline-block text-xl font-yen text-teal-500">2020</p>
                        </div>                        
                    </div>
                    <div class="absolute top-0 right-0 text-lg text-gray-300 hover:text-red-400 cursor-pointer">
                        <fa-icon :icon="faTimesCircle"></fa-icon>
                    </div>
                </div>                
                
                <div class="flex justify-end border-t border-gray-500 mt-8 p-4">
                    <div class="">
                        <p class="inline-block text-lg">合計:NT </p>
                        <p class="inline-block text-2xl font-semibold text-orange-500"> 1200元</p>
                    </div>
                </div>
            </div> 
        </section>
        <section class="userDetail">
            <div class="container mx-auto mt-4 p-8 rounded-lg border border-gray-300">
                <div class="lg:text-center mb-4 border-b border-gray-300 pb-4">
                    <p class="mt-2 max-w-3xl text-xl leading-7 text-black lg:mx-auto">
                        請確認您的資訊</p>
                </div>

                
                    <el-form ref="form" :model="form" label-position="top" label-width="80px">
                        <el-container>
                            <el-main>
                                <el-row :gutter="25">
                                    <el-col :sm="24" :md="12">
                                        <el-form-item label="公司名稱:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="24" :md="12">
                                        <el-form-item label="連絡人:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="24" :md="12">
                                        <el-form-item label="送貨地址:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="24" :md="12">
                                        <el-form-item label="聯絡電話:">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="24" :md="12">
                                        <el-form-item label="希望到貨日期:">
                                            <el-date-picker
                                                v-model="form.date"
                                                type="date"
                                                placeholder="選擇到貨日期"
                                                >
                                                </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="24" :md="12">
                                        <el-form-item label="希望到貨時間:">
                                            <el-time-picker
                                                is-range
                                                arrow-control
                                                v-model="form.time"
                                                range-separator="至"
                                                start-placeholder="開始时间"
                                                end-placeholder="结束時間"
                                                placeholder="選擇到貨時間範圍"
                                                >
                                                </el-time-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="24" :md="12">
                                        <el-form-item label="備註:">
                                            <el-input type="textarea" v-model="form.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row> 
                            </el-main>
                        </el-container>                        
                    </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
    export default {
        layout:'store',
        data () {
            return {
                form: {
                    name:'捷士登行銷有限公司',
                    date:'',
                    time:''
                }
            };
        },
        computed: {
            faTimesCircle() { return faTimesCircle }
        },
        methods: {},
        components: {},
    }

</script>
<style scoped>

</style>