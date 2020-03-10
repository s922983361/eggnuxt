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
    import basic from '@/plugins/mixins/admin/table/basic'
    import changeStatus from '@/plugins/mixins/admin/table/changeStatus'
    import notify from '@/plugins/mixins/admin/notify'    
    import deleteImg from '@/plugins/mixins/admin/deleteImg'

    import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
    
    export default {
        layout: 'admin',
        mixins: [basic, notify, changeStatus, deleteImg],
        
        data () {
            return {
                config: {
                    title:'文章分類列表',
                    serverController: 'articleCate',
                    modelName: 'ArticleCate',
                    afterSavePushTo: 'articles_Cates'//路由名稱
                },
                //props
                addPushTo: 'articles_Cates',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],                
                imageFolder: `${process.env.BASE_URL}/uploads/`,
                columns: [                    
                    {
                        prop: 'imageUrl',
                        label: '圖片',
                        align: 'center',
                        width: 70,
                        is_image: true, //to show image
                        showIcon: true,
                        icon: 'el-icon-picture',
                    },
                    {
                        prop: 'position',
                        label: '位置',
                        align: 'left',
                        width: 70,
                        showIcon: true,
                        icon: 'el-icon-map-location',
                        render: (h, params) => {
                            return h('el-tag', 
                                {
                                    props: {
                                        type: params.row.position === 1 ? '': 'danger'
                                    },
                                },
                                params.row.position === 1 ? '前台': '後台' 
                            )
                        }
                    },
                    {
                        prop: 'title',
                        label: '名稱',
                        align: 'left',
                        width: 100,
                        showIcon: true,
                        icon: 'el-icon-star-off',
                        showTip: false,
                        tipContent: '',
                    },                                        
                    {
                        prop: 'type',
                        label: '分類等級',
                        align: 'center',
                        width: 70,
                        showIcon: true,
                        icon: 'el-icon-files',
                        render: (h, params) => {
                            return h('el-tag', 
                                {
                                    props: {
                                        type: params.row.type === 1 ? '' : 'info'
                                        }
                                }, 
                                params.row.type === 1 ? '一級分類' : '二級分類'
                            )
                        }
                    }, 
                    {
                        prop: 'status',
                        label: '狀態',
                        align: 'center',
                        width:  70,
                        showIcon: true,
                        icon: 'el-icon-check',
                        //https://blog.csdn.net/HansExploration/article/details/83010327
                        render: (h, params) => {
                            return h('fa-icon', {
                                props:{
                                    icon: faCheckCircle,
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
                total: 0,/**數據總數量 default:0 */ 
                pagination: {
                    pageIndex: this.$store.state.admin.currentPageIndex,/**第幾頁 default:1 */ 
                    pageSize: this.$store.state.admin.currentPageSize /**每頁最多數據量 default:20 */ 
                }, 
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
        components: {
            dataTable
        },
    }

</script>
<style scoped>

</style>