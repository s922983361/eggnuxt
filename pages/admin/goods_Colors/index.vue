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
            title: '管理員列表'
        },
        data () {
            return {
                config: {
                    title:'商品顏色列表',
                    serverController: 'goodsColor',
                    afterSavePushTo: 'goods_Colors'//路由名稱
                },
                //props
                addPushTo: 'goods_Colors',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [
                    {
                        prop: 'name',
                        label: '顏色名稱',
                        align: 'center',
                        width: 70,                        
                    },
                    {
                        prop: 'value',
                        label: '顯示的顏色值',
                        align: 'left',
                        width: 100,
                        is_color: true
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