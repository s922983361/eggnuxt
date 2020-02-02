<template>
    <div class="w-full">
        <header class="border-b-2 border-teal-300 py-4 ">
            <h1 class="text-base text-black inline-block">請選擇您旗下品牌 : &nbsp;</h1>
            <div class="inline-block">
                <el-select v-model="config.brand_id" placeholder="請選擇" @change="showProductsList">
                    <el-option
                        v-for="item in config.bradnIdList"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"                        
                        >
                    </el-option>
                </el-select>
            </div>            
        </header>
        <dataTable
            v-show="!$_.isEmpty(config.brand_id)"        
            :imageFolder="imageFolder"
            :listLoading="listLoading"

            :page__list="list"
            :page__title="config.title"
            :page__addPushTo="addPushTo"
            :page__columns="columns"
            :page__operates="operates"        
            :page__total="total"
            :page__pagination="pagination"
            :page__statusFilter="statusFilter"
            :page__statusArray="statusArray"
            :page__timeFilter="timeFilter"

            @handleSizeChange="handleSizeChange"
            @handleIndexChange="handleIndexChange"
            @superFetchAll="handleDataList"
        >
        </dataTable>
    </div>    
</template>

<script>
    import dataTable from '@/components/admin/table/dataTable'
    import factory_goods from '@/plugins/mixins/admin/table/factory_goods'
    import deleteImg from '@/plugins/mixins/admin/deleteImg'
    import getBrandsList from '@/plugins/mixins/admin/table/getBrandsList'
    import notify from '@/plugins/mixins/admin/notify'

    export default {
        layout: 'admin',
        mixins: [factory_goods, deleteImg, notify, getBrandsList],
        meta: {
            title: '管理員列表'
        },
        data () {
            return {
                config: {
                    title:'商品列表',
                    serverController: 'goods',
                    afterSavePushTo: 'factory_Goods',//路由名稱
                    manager_id: this.$store.state.auth.id,
                    bradnIdList:[],
                    brand_id:'',
                    superAdminOpen: false
                },
                //props
                addPushTo: 'factory_Goods',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                imageFolder: `${process.env.BASE_URL}/uploads/`,
                columns: [
                ],
            };
        },
        methods: {
            async showProductsList(currentBrandId) {
                //set current brand_id in brand of store
                this.$store.dispatch('admin/setCurrentBrandId', currentBrandId)
                this.brandHandleDataList(this.pagination.pageIndex, this.pagination.pageSize)
            }
        },
        created() {
            this.getBrandsList(this.config.manager_id)
            !this.$_.isEmpty(this.config.brand_id) && this.brandHandleDataList(this.pagination.pageIndex, this.pagination.pageSize)
        },
        components: {
            dataTable
        },
    }

</script>
<style scoped>

</style>