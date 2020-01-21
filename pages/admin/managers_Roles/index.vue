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
            title: '管理員角色列表'
        },
        data () {
            return {
                config: {
                    title:'管理員角色列表',
                    serverController: 'role',
                    afterSavePushTo: 'managers_Roles'//路由名稱
                },
                //props
                addPushTo: 'managers_Roles',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [
                    {
                        prop: '_id',
                        label: '管理員角色id',
                        align: 'left',
                        width: 100,                        
                    },                    
                    {
                        prop: 'title',
                        label: '管理員角色名稱',
                        align: 'left',
                        width: 100,                        
                    },
                    {
                        prop: 'status',
                        label: '狀態',
                        align: 'center',
                        width:  50,
                        render: (h, params) => {
                            return h('el-tag', {
                                props: {
                                    type: params.row.status === 0 ? 'danger' : params.row.status === 1 ? 'info' : 'succcess'} // 组件的props(使用狀態碼控制顏色)
                            }, params.row.status === 0 ? '啟用中' : params.row.status === 1 ? '停用中': '未知')//组件的props(使用狀態碼控制內容)
                        }
                    },
                    
                ],
                
                operates: {                    
                    list: [ 
                        {
                            label: '權限',
                            type: 'info',
                            icon: 'el-icon-setting',
                            plain: true,                            
                            method: (row) => {
                                this.handleAuth(row)
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
        created() {
            this.handleDataList()
        },
        methods: {
            async handleAuth (row) {
                this.$router.push(`/admin/managers_Roles/auth/${row._id}`)
            }
        },
        components: {
            dataTable
        },
    }

</script>
<style scoped>

</style>