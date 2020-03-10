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
    import notify from '@/plugins/mixins/admin/notify'

    export default {
        layout: 'admin',
        mixins: [basic, notify],
        meta: {
            title: '管理員權限列表'
        },
        data () {
            return {
                config: {
                    title:'管理員權限列表',
                    serverController: 'access',
                    afterSavePushTo: 'managers_Access'//路由名稱
                },
                //props
                addPushTo: 'managers_Access',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [
                    {
                        prop: 'module_name',
                        label: '模組名稱',
                        align: 'left',
                        width: 50,
                        showIcon: true,
                        icon: 'el-icon-star-off',
                    },                    
                    {
                        prop: 'type',
                        label: '節點',
                        align: 'center',
                        width: 50,
                        showIcon: true,
                        icon: 'el-icon-files',
                        render: (h, params) => {
                            return h('el-tag', {
                                props: {
                                    type: params.row.type === 1 ? 'danger' : params.row.type === 2 ? 'info' : 'succcess'} // 组件的props(使用狀態碼控制顏色)
                            }, params.row.type === 1 ? '頂級模組' : params.row.type === 2 ? '菜單列表': '操作功能')//组件的props(使用狀態碼控制內容)
                        }
                    },
                    {
                        prop: 'action_name',
                        label: '操作',
                        align: 'left',
                        width: 50,
                        showIcon: true,
                        icon: 'el-icon-s-tools',
                    },
                    {
                        prop: 'url',
                        label: '操作URL',
                        align: 'left',
                        width: 100,
                        showIcon: true,
                        icon: 'el-icon-link',
                    }, 
                    {
                        prop: 'sort',
                        label: '排序',
                        align: 'center',
                        width: 50,
                        sortable: true,
                        showIcon: true,
                        icon: 'el-icon-sort',
                    },
                ],
            };
        },
        created() {
            this.handleDataList(this.pagination.pageIndex, this.pagination.pageSize)
        },        
        components: {
            dataTable
        },
    }

</script>
<style scoped>

</style>