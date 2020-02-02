<template>
    <div class="w-full"> 
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-xl font-bold text-black">{{ `${config.subTitle}-${config.title}` }}</h1>
        </header>       
        <dataTable
            class="mt-2"
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
    import basic from '@/plugins/mixins/admin/table/basic'
    import changeStatus from '@/plugins/mixins/admin/table/changeStatus'
    import notify from '@/plugins/mixins/admin/notify'
    import parentDetail from '@/plugins/mixins/admin/parentDetail'

    import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

    export default {
        layout: 'admin',
        mixins: [basic, notify, parentDetail, changeStatus],
        meta: {
            title: '管理員列表'
        },
        data () {
            return {
                config: {
                    title:'商品類型屬性列表',
                    subTitle:'',
                    serverController: 'goodsTypeAttr',
                    modelName: 'GoodsTypeAttr',
                    parentModelName: 'GoodsType',
                    afterSavePushTo: `goods_Types/attrs/${this.$route.params.typeId}`//路由名稱
                },
                //props
                addPushTo: `goods_Types/attrs/${this.$route.params.typeId}`,//新增的路由目標
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
            this.fetchGoodsTypeDetail()
        },
        methods: {
            /**
             * @custom this is custom handleDataList not equal handleDataList() in mixins basic.js 
             * @desc use $axios to fetch data from database
             * @param {*} pageIndex nunber default:1, table index page 
             * @param {*} pageSize nunber default:20, the count of data in table list
             */
            async handleDataList(pageIndex, pageSize) {
                try {
                    //res return obj
                    const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${this.$route.params.typeId}/${pageIndex}/${pageSize}`)

                    if(res.resCode !== 90500) {
                        this.list = res.data
                        this.total = res.total
                        this.$store.dispatch('admin/resetPagination')
                        return
                    }
                    await this.notifyFunc(res.resCode)
                }
                catch(err) {
                    //Browser ERROR 
                    this.$message({                        
                        message: '瀏覽器不明錯誤,請重新操作!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                    console.log(err)
                } 
            },

            /**
             * @desc fetch name of GoodsTypeDetail to set subTitle
             */
            async fetchGoodsTypeDetail() {
                const { data } = await this.getParentDetail(this.config.parentModelName, this.$route.params.typeId)
                this.config.subTitle = data.name
            },
        },
        components: {
            dataTable
        },
    }

</script>
<style scoped>
</style>