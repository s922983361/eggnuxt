<template>
    <dataTable
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
</template>

<script>
    import dataTable from '@/components/admin/table/dataTable'
    import factory from '@/plugins/mixins/admin/table/factory'
    import deleteImg from '@/plugins/mixins/admin/deleteImg'
    import notify from '@/plugins/mixins/admin/notify'

    export default {
        layout: 'admin',
        mixins: [factory, deleteImg, notify],
        meta: {
            title: '管理員列表'
        },
        data () {
            return {
                config: {
                    title:'品牌列表',
                    serverController: 'brand',
                    afterSavePushTo: 'factory_Brands',//路由名稱
                    manager_id: this.$store.state.auth.id,
                    superAdminOpen: false
                },
                //props
                addPushTo: 'factory_Brands',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                imageFolder: `${process.env.BASE_URL}/uploads/`,
                columns: [
                    {
                        prop: 'imageUrl',
                        label: 'LOGO',
                        align: 'center',
                        width: 50,
                        is_image: true, //to show image 
                        showIcon: true,
                        icon: 'el-icon-picture', 
                    },
                    {
                        prop: 'name',
                        label: '品牌名稱',
                        align: 'left',
                        width: 50,
                        showIcon: true,
                        icon: 'el-icon-star-off',
                    },
                    {
                        prop: 'manager_id',
                        label: '所屬廠商',
                        align: 'left',
                        width: 100, 
                        render: (h, params) => {
                            return h('p', {
                                class: 'font-sans text-gray-800'
                            }, params.row.manager_id.name)
                        }                       
                    }, 
                    {
                        prop: 'create_date',
                        label: '創建時間',
                        align: 'center',
                        width: 50,
                        sortable: true,
                        showIcon: true,
                        icon: 'el-icon-time',
                    },   
                ],
            };
        },
        created() {
            this.roleHandleDataList(this.pagination.pageIndex, this.pagination.pageSize)
        },
        components: {
            dataTable
        },
    }

</script>
<style scoped>

</style>