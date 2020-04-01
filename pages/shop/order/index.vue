<template>
    <div id="order">
        <div class="antialiased sans-serif min-h-screen bg-white" style="min-height: 900px">
            <div class="border-t-8 border-gray-700 h-2"></div>
            <el-form ref="form" :model="form">

                <div class="flex items-center justify-center mt-8">
                    <div class="container">
                        <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg">
                            <thead class="text-white">
                                <tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                                    <th class="p-3 text-left">Name</th>
                                    <th class="p-3 text-left">Email</th>
                                    <th class="p-3 text-left" width="110px">Actions</th>
                                </tr>                            
                            </thead>
                            <tbody class="flex-1 sm:flex-none">
                                <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                                    <td class="border-grey-light border hover:bg-gray-100 p-3">John Covv</td>
                                    <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">contato@johncovv.com</td>
                                    <td class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
                                </tr>                            
                            </tbody>
                        </table>
                    </div>
                </div>
                <!------------------------------------------------------------------------- Start Wrapper -->
                <div class="container mx-auto py-6 px-4">
                    <div class="flex justify-between">
                        <h2 class="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">訂單資訊</h2>
                        <div>
                            <!-------------------------------------------------------------- Start Print Icon -->
                            <div class="relative mr-4 inline-block">
                                <div class="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" @click="printInvoice()">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                        <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                                        <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                                        <rect x="7" y="13" width="10" height="8" rx="2" />
                                    </svg>				  
                                </div>
                                <div v-show="showTooltip" class="z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs">
                                    Print this invoice!
                                </div>
                            </div><!--End Print Icon -->
                            <!-------------------------------------------------------------- Start Reset Icon -->
                            <div class="relative inline-block">
                                <div class="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" @mouseenter="showTooltip2 = true" @mouseleave="showTooltip2 = false" @click="window.location.reload()">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
                                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
                                    </svg>	  
                                </div>
                                <div v-show="showTooltip2" class="z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs">
                                    Reload Page
                                </div>
                            </div><!--End Reset Icon -->
                        </div>
                    </div>

                    <!----------------------------------------------------------------------- Start Input -->
                    <div class="flex flex-wrap mb-8 ">
                        <div class="w-full md:w-1/2 px-4">
                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice No.</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.name"></el-input>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-date-picker
                                        v-model="form.createDate"
                                        type="datetime"
                                        placeholder="選擇時間日期">
                                        </el-date-picker>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Due date</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-date-picker
                                        v-model="form.dueDate"
                                        type="datetime"
                                        placeholder="選擇到貨時間">
                                        </el-date-picker>
                                </div>
                            </div>
                        </div>
                        <!------------------------------------------------------------Start PictureInput -->
                        <div class="w-full md:w-1/2 px-4">
                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">送貨地址</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.addr"></el-input>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">聯絡人</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.contact "></el-input>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">連絡電話</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.tel"></el-input>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">備註</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.addtion"></el-input>
                                </div>
                            </div>
                        </div><!-- End Picture -->
                    </div><!-- End Input -->

                    <div class="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/4">
                        <div class="flex justify-between mb-3">
                            <div class="text-gray-800 text-right flex-1">Total incl. GST</div>
                            <div class="text-right w-40">
                                <div class="text-gray-800 font-medium" x-html="netTotal"></div>
                            </div>
                        </div>
                        <div class="flex justify-between mb-4">
                            <div class="text-sm text-gray-600 text-right flex-1">GST(18%) incl. in Total</div>
                            <div class="text-right w-40">
                                <div class="text-sm text-gray-600" x-html="totalGST"></div>
                            </div>
                        </div>
                    
                        <div class="py-2 border-t border-b">
                            <div class="flex justify-between">
                                <div class="text-xl text-gray-600 text-right flex-1">Amount due</div>
                                <div class="text-right w-40">
                                    <div class="text-xl text-gray-800 font-bold" x-html="netTotal"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- End Wrapper -->
            </el-form>            
        </div>
    </div>
        <!-- <div class="flex items-center justify-center">
            <div class="container">
                <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg">
                    <thead class="text-white">
                        <tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                            <th class="p-3 text-left">Name</th>
                            <th class="p-3 text-left">Email</th>
                            <th class="p-3 text-left" width="110px">Actions</th>
                        </tr>                            
                    </thead>
                    <tbody class="flex-1 sm:flex-none">
                        <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                            <td class="border-grey-light border hover:bg-gray-100 p-3">John Covv</td>
                            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">contato@johncovv.com</td>
                            <td class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
                        </tr>                            
                    </tbody>
                </table>
            </div>
        </div> -->
                
        <!-- <el-form ref="form" :model="form" label-position="top" label-width="80px">
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
        </el-form> -->
</template>

<script>
    export default {
        layout:'shop',
        data () {
            return {
                showTooltip: false,
                showTooltip2: false,
                form: {
                    name: '',
                    createDate: '',
                    dueDate: '',
                    addr: '',
                    tel: '',
                    contact: '',
                    addtion: '',
                }

            };
        },
        computed: {},
        methods: {},
        components: {},
    }

</script>
<style scoped>
/* @media print {
    .no-printme  {
        display: none;
    }
    .printme  {
        display: block;
    }
    body {
        line-height: 1.2;
    }
}

@page {
    size: A4 portrait;
    counter-increment: page;
} */
</style>