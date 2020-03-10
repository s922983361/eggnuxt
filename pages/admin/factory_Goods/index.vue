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
            @createGoods="handleCreateGoods"
        >
        </dataTable>
    </div>    
</template>

<script>
    import dataTable from '@/components/admin/table/dataTable'
    import factory_goods from '@/plugins/mixins/admin/table/factory_goods'
    import deleteImg from '@/plugins/mixins/admin/deleteImg'
    import changeStatus from '@/plugins/mixins/admin/table/changeStatus'
    import getBrandsList from '@/plugins/mixins/admin/table/getBrandsList'
    import notify from '@/plugins/mixins/admin/notify'

    import { faCheckCircle, faEye, faCartPlus } from '@fortawesome/free-solid-svg-icons'
    export default {
        layout: 'admin',
        mixins: [factory_goods, deleteImg, notify, getBrandsList, changeStatus],
        meta: {
            title: '管理員列表'
        },
        data () {
            return {
                config: {
                    title:'商品列表',
                    serverController: 'goods',
                    afterSavePushTo: 'factory_Goods',//路由名稱
                    modelName: 'Goods',
                    manager_id: this.$store.state.auth.id,
                    bradnIdList:[],
                    brand_id: this.$store.state.admin.currentBrandId,
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
                    {
                        prop: 'goods_sn',
                        label: '型號',
                        align: 'left',
                        width: 50,
                        showIcon: true,
                        icon: 'el-icon-bank-card',
                    },
                    {
                        prop: 'title',
                        label: '商品名稱',
                        align: 'left',
                        width: 150,
                        showIcon: true,
                        icon: 'el-icon-postcard',
                        render: (h, params) => {
                            if(this.$_.isEmpty(params.row.title)) {
                                return h('p', {
                                    class: 'text-red-600 text-xs'
                                }, '無內容檔案,將被自動刪除!')
                            }
                            return h('p', {}, params.row.title)
                        }
                    },
                    {
                        prop: 'click_count',
                        label: '被瀏覽數',
                        align: 'left',
                        width: 80,
                        showIcon: true,
                        icon: 'el-icon-view',
                        showTip: true,
                        tipContent: '進入商品頁面瀏覽,並停留10秒後 "+ 1"',
                        render: (h, params) => {
                            return h('span', {
                                    class:'text-green-600',                                
                                },
                                [                                
                                    h('fa-icon',{ props:{ icon: faEye,}}),
                                    ` ${params.row.click_count}`,                            
                                ]
                            )
                        }
                    },
                    {
                        prop: 'has_buy',
                        label: '已採購數',
                        align: 'left',
                        width: 80,
                        showIcon: true,                        
                        icon: 'el-icon-sold-out',
                        showTip: true,
                        tipContent: '已被加入採購清單且成交 "+ 加採購數量"',
                    },
                    {
                        prop: 'status',
                        label: '上架中',
                        align: 'center',
                        width:  80,
                        showIcon: true,                        
                        icon: 'el-icon-check',
                        showTip: true,
                        tipContent: '綠色顯示為正在架上',
                        render: (h, params) => {
                            return h('fa-icon', {
                                props:{
                                    icon: faCheckCircle,
                                },
                                class:params.row.status === 0 ? 'cursor-pointer text-gray-300  text-xl' : 'cursor-pointer text-green-600 text-xl',
                                on: {                                    
                                    click: async() => {                                        
                                        const res = await this.changeIconAndUpdate(this.config.modelName, params.row._id, 'status', params.row.status)
                                        if(res.success){
                                            if(params.row.status == 0) {
                                                params.row.status = 1
                                            }else {
                                                params.row.status = 0
                                            }
                                        }
                                    }
                                },
                            },)
                        }
                    },
                ],
            };
        },
        computed:{
            faCheckCircle() {
                return faCheckCircle
            },
            faEye() {
                return faEye
            },
            faCartPlus() {
                return faCartPlus
            }
        },
        methods: {
            /**To create goods Id page without add Page*/
            async handleCreateGoods() {
                try{
                    const { id } = await this.$axios.$post(`${process.env.EGG_API_URL}/admin/${this.config.serverController}`,{ brand_id: this.$store.state.admin.currentBrandId })
                    this.$router.push(`/admin/factory_Goods/edit/${id}`) 
                }catch (err) {
                    //Browser ERROR 
                    console.log(err)                  
                    this.$message({                        
                        message: '新增失敗,請聯絡管理員!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
            },
            async showProductsList(currentBrandId) {
                //set current brand_id in brand of store
                this.$store.dispatch('admin/setCurrentBrandId', currentBrandId)
                this.brandHandleDataList(this.pagination.pageIndex, this.pagination.pageSize)
            }
        },
        created() {
            //get All Brands this Manager own
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