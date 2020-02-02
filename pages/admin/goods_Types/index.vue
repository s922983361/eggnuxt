<template>
    <dataTable
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
</template>

<script>
    import dataTable from '@/components/admin/table/dataTable'
    import basic from '@/plugins/mixins/admin/table/basic'
    import changeStatus from '@/plugins/mixins/admin/table/changeStatus'
    import notify from '@/plugins/mixins/admin/notify'

    import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

    export default {
        layout: 'admin',
        mixins: [basic, changeStatus, notify],
        meta: {
            title: '管理員列表'
        },
        data () {
            return {
                config: {
                    title:'商品類型列表',
                    serverController: 'goodsType',
                    modelName: 'GoodsType',
                    afterSavePushTo: 'goods_Types'//路由名稱
                },
                //props
                addPushTo: 'goods_Types',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [
                    {
                        prop: 'name',
                        label: '類型名稱',
                        align: 'left',
                        width: 100,                        
                    },
                    {
                        prop: 'description',
                        label: '類型描述',
                        align: 'left',
                        width: 200,                        
                    },
                    {
                        prop: 'status',
                        label: '是否啟用',
                        align: 'center',
                        width: 70,
                        render: (h, params) => {
                            return h('fa-icon', {
                                props:{
                                    icon: params.row.status === 0 ? faCheckCircle : faTimesCircle,
                                },
                                class:params.row.status === 0 ? 'cursor-pointer text-green-600 text-xl' : 'cursor-pointer text-red-600 text-xl',
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
                    {
                        prop: 'create_date',
                        label: '創建日期',
                        align: 'center',
                        width: 100,
                        sortable: true
                    }, 
                ],
                operates: {                    
                    list: [ 
                        {
                            label: '屬性列表',
                            type: 'info',
                            icon: 'el-icon-setting',
                            plain: true,                            
                            method: (row) => {
                                this.handleAttrs(row)
                            }
                        },
                        {
                            label: '編輯',
                            type: 'warning',
                            icon: 'el-icon-edit',
                            plain: true,                            
                            method: (row) => {
                                this.handleEdit(row)
                            }
                        },
                        {
                            label: '删除',
                            type: 'danger',
                            icon: 'el-icon-delete',
                            show: true,
                            plain: false,                            
                            method: (row) => {
                                this.handleDel(row)
                            }
                        }
                    ],                    
                },
            };
        },
        computed: {
            faCheckCircle() {
                return faCheckCircle
            },
            faTimesCircle() {
                return faTimesCircle
            },
        },
        created() {
            this.handleDataList(this.pagination.pageIndex, this.pagination.pageSize)
        },
        methods: {
            async handleAttrs (row) {
                this.$router.push(`/admin/goods_Types/attrs/${row._id}`)
            },            
        },
        components: {
            dataTable
        },
    }

</script>
<style scoped>
</style>