<template>
    <div id="shop">
        <header>
            <navBar
                @showShoppingCart="showShoppingCart"
                ></navBar>
        </header>
        <!-- Page Content --> 
        <main>
            <transition name="page" mode="out-in">
                <nuxt/>
            </transition>
        </main>
        <section>
            <!-- Divider--> 
            <div class="h-24 bg-indigo-700"></div>
        </section>
        <footer>
            <foot></foot>
        </footer>
        <!-- cart Dialog -->
        <el-dialog 
            title="Shopping Cart"             
            :width="$mq === 'mobile'? '90%': '70%'"
            :visible.sync="dialogCartVisible"
            >
            <template v-slot:title>                
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
                            <fa-icon :icon="faList" class="text-teal-600"></fa-icon>
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                採購清單</h3>
                            <div class="mt-2">
                                <p class="text-sm leading-5 text-gray-500">
                                Are you sure you want to deactivate your account? All of your data will be permanantly removed. This action cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>           

            <span class="flex items-center justify-center">
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
            </span>

            <span slot="footer" class="dialog-footer">                
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button @click="dialogCartVisible = false; $router.push('/shop/order')" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        確認訂單
                        </button>
                    </span>
                    <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button @click="dialogCartVisible = false;" type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        繼續採購
                        </button>
                    </span>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import navBar from '@/components/shop/layout/navBar'
    import foot from '@/components/landing/foot'
    import { faList, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
    export default {
        data () {
            return {
                dialogCartVisible: false //對話開關
            };
        },
        computed: {
            faList() { return faList },
            faExclamationTriangle() { return faExclamationTriangle }
        },
        methods: {
            /**
             * @desc 顯示購物資訊對話框 
             * 組件: navBar
             */
            showShoppingCart() {
                this.dialogCartVisible = !this.dialogCartVisible
            },
        },
        components: {
            navBar,
            foot
        },
    }

</script>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding-right: 8px;
}
#shop .el-tree-node__content {
    height: 50px !important
}
#shop .el-form-item .el-form-item__label {
    border-bottom: 1px solid #959595;
}
/** */
@media (min-width: 640px) {
    #shop table {
        display: inline-table !important;
    }

    #shop thead tr:not(:first-child) {
        display: none;
    }
}

#shop td:not(:last-child) {
    border-bottom: 0;
}

#shop th:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, .1);
}
/**tranition */
.page-enter,.page-leave-to {
    opacity: 0;
}
.page-enter-active, .page-leave-active { 
    transition: all 0.5s ease; 
}
</style>