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
            <span slot="footer" class="dialog-footer">
                <div class="flex justify-end">
                    <button class="w-1/2 md:w-1/4 lg:w-1/6 text-gray-500 bg-transparent border border-solid border-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase text-md text-center px-4 py-2  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="dialogCartVisible = false">
                        繼續採購
                    </button>
                    <button class="w-1/2 md:w-1/4 lg:w-1/6 text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-gray-600 font-bold uppercase text-md text-center px-4 py-2  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                        確認訂單
                    </button>
                </div>                
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import navBar from '@/components/shop/layout/navBar'
    import foot from '@/components/landing/foot'
    export default {
        data () {
            return {
                dialogCartVisible: false //對話開關
            };
        },
        computed: {},
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

.page-enter,.page-leave-to {
    opacity: 0;
}
.page-enter-active, .page-leave-active { 
    transition: all 0.5s ease; 
}
</style>