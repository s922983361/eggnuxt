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
    >
    </dataTable>
</template>

<script>
    import dataTable from '@/components/admin/table/dataTable'
    import basic from '@/plugins/mixins/admin/table/basic'
    import changeStatus from '@/plugins/mixins/admin/table/changeStatus'
    import notify from '@/plugins/mixins/admin/notify'

    import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
    
    export default {
        layout: 'admin',
        mixins: [basic, notify, changeStatus],
        meta: {
            title: '網站導航列表'
        },
        data () {
            return {
                config: {
                    title:'網站導航列表',
                    serverController: 'nav',
                    modelName: 'Nav',
                    afterSavePushTo: 'navs'//路由名稱
                },
                //props
                addPushTo: 'navs',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [
                    {
                        prop: 'title',
                        label: '導航名稱',
                        align: 'left',
                        width: 100,
                        showIcon: true,
                        icon: 'el-icon-star-off',
                    },
                    {
                        prop: 'link',
                        label: '跳轉路由',
                        align: 'left',
                        width: 100,
                        showIcon: true,
                        icon: 'el-icon-link',                        
                    },
                    {
                        prop: 'position',
                        label: '放置位置',
                        align: 'left',
                        width: 100,
                        showIcon: true,
                        icon: 'el-icon-map-location',
                        render: (h, params) => {
                            return h('el-tag', 
                                {
                                    props: {
                                        type: params.row.position === 1 ? '': params.row.position === 2 ? 'success' : params.row.position === 3 ? 'info' : params.row.position === 4 ? 'warning' : 'danger'
                                    },
                                },
                                params.row.position === 1 ? '前台頂部': params.row.position === 2 ? '前台中間' : params.row.position === 3 ? '前台底部' : params.row.position === 4 ? '後台頂部' : '後台底部'
                            )
                        }                       
                    },
                    {
                        prop: 'status',
                        label: '狀態',
                        align: 'center',
                        width:  50,
                        showIcon: true,
                        icon: 'el-icon-check',
                        render: (h, params) => {
                            return h('fa-icon', {
                                props:{
                                    icon: faCheckCircle
                                },
                                class:params.row.status === 0 ? 'cursor-pointer text-gray-200 text-xl' : 'cursor-pointer text-green-600 text-xl',
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
                        prop: 'sort',
                        label: '排序',
                        align: 'center',
                        width: 70,
                        showIcon: true,
                        icon: 'el-icon-sort',
                    },
                ],
            };
        },
        created() {
            this.handleDataList(this.pagination.pageIndex, this.pagination.pageSize)
        },
        computed:{
            faCheckCircle() {
                return faCheckCircle
            },
        },
        methods: {            
        },
        components: {
            dataTable
        },
    }

</script>
<style scoped>

</style>