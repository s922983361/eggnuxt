<template>
    <viewPage>
        <template slot="left-field">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" plain v-if="$route.path === '/admin/factory_Goods'" @click="createGoods">新增</el-button>

            <el-button 
                type="primary" 
                icon="el-icon-circle-plus-outline" 
                size="medium" 
                plain 
                v-else-if="$route.path === '/admin/articles'" 
                @click="createIdPage
                ">新增
                </el-button>

            <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" plain v-else @click="$router.push(`/admin/${ page__addPushTo}/edit`)">新增</el-button>
        </template>

        <template slot="search-field">
            <el-input v-model="tablefunc.searchStr" suffix-icon="el-icon-search" placeholder="要搜尋的內容"></el-input>
        </template>

        <template slot="filter-field">
            <el-select v-if="page__statusFilter" v-model="tablefunc[filterStatus]" placeholder="使用狀態過濾">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(status, index) in page__statusArray" :key="status" :label="status" :value="index"></el-option>
            </el-select>
            <el-date-picker v-if="page__timeFilter" type="daterange" start-placeholder="起始時間" end-placeholder="結束時間"></el-date-picker>
        </template>

        <template slot="right-field">            
            <el-button                 
                type="info" 
                icon="el-icon-printer" 
                size="small" 
                round >列印本頁
                </el-button>
            <el-button                 
                type="warning" 
                icon="el-icon-upload2" 
                size="small" 
                round>導入 EXCEL
                </el-button>
            <el-button 
                type="success" 
                icon="el-icon-download" 
                size="small" 
                round 
                :loading="downloadLoading"
                >導出 EXCEL
                </el-button>
            <el-button
                v-if="$store.state.auth.is_super && $route.path === '/admin/factory_Brands' || $route.path === '/admin/factory_Goods'"
                type="primary" 
                icon="el-icon-s-grid" 
                size="small" 
                round 
                :loading="downloadLoading"
                @click="superFetchAll"
                >列出所有資訊
                </el-button>    
        </template>

        <el-table 
            id="printTableListData"
            :data="filterData__Func"
            :default-sort = "{ prop: 'date', order: 'descending' }"
            :header-cell-style="tableHeaderColor"
            fit
            highlight-current-row
            >
            <template v-for=" column in page__columns">
                <el-table-column
                    :prop="column.prop"
                    :label="column.label"
                    :align="column.align"
                    :min-width="column.width"
                    :sortable="column.sortable"
                    :key="column._id"
                    >
                    <template v-if="column.showIcon" slot="header">
                        <i :class="column.icon"></i>
                        <span>{{ column.label }}</span>
                        <span v-if="column.showTip">
                            <el-tooltip effect="light" :content="column.tipContent" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>                            
                        </span>                        
                    </template>
                    <template  v-else slot="header">                        
                        {{ column.label }}
                    </template>                    
                    
                    <template slot-scope="scope">
                        <template v-if="!column.render">
                            <template v-if="column.is_image">
                                <img :src="`${imageFolder}${scope.row[column.prop]}`" :alt="scope.row[column.label]" style="height:3rem; margin:0 auto">
                            </template>
                            <template v-else-if="column.is_color">
                                <span :style="{background:scope.row[column.prop]}">{{scope.row[column.prop]}}</span>
                            </template>
                            <template v-else>
                                {{scope.row[column.prop]}}
                            </template>
                        </template>
                        <template v-else>
                            <expand-dom :column="column" :row="scope.row" :render="column.render"></expand-dom>
                        </template>
                        
                    </template>
                </el-table-column>
            </template>

            <el-table-column 
                label="操作" 
                width="200" 
                align="center"
                fixed="right" 
                v-if="page__operates.list.length > 0">
                <template slot-scope="scope">
                    <template v-for="(btn, key) in page__operates.list">
                        <el-button                             
                            size="mini"
                            :type="btn.type"  
                            :icon="btn.icon"
                            :plain="btn.plain" 
                            :key="key"
                            @click.native.prevent="btn.method(scope.row)"
                            >                            
                            </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination mt-4 float-right">
            <el-pagination v-if="page__pagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleIndexChange"
                :page-sizes="this.tableCurrentPagination.pageArray"
                :page-size="tableCurrentPagination.pageSize"
                :current-page="tableCurrentPagination.pageIndex"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page__total"
                >
            </el-pagination>
        </div>
    </viewPage>
</template>

<script>
    import viewPage from '@/components/admin/table/viewPage'
    const __pageArray = [20, 50, 100] // 每頁展示條數控制

    export default {
        name:'',
        data () {
            return {
                data: [],
                tablefunc : {
                    searchStr: '',//搜尋欄位
                    filterStatus: '',//狀態欄位
                    filterDate: null,//時間間格
                },
                                
                statuses: [],//當前表格內的狀態結構
                statusColor: [],//狀態顏色
                //pageIndex: 1,//分頁預設值:當前頁面
                tableCurrentPagination: {}, //當前分頁的數據結構
                downloadLoading: false,
            };
        },
        props:{
            //if this page has image
            imageFolder: { type: String, default: '' },
            //table data
            page__list:      { type: Array, default:[] },
            page__title:     { type: String, default:'' },
            page__addPushTo: { type: String, default:'' },

            //table fields & operates
            page__columns:  { type: Array, default: [] },
            page__operates: { type: Object, default: {} },

            // is needed Filter?
            page__statusFilter: { type: Boolean, default: false },
            page__statusArray:  { type: Array, default: [] },
            page__timeFilter:   { type: Boolean, default: false },

            // pagination setting
            page__total: { type: Number, default: 0 },
            // 分页参数 === pageSize:每页展示的条数，pageIndex:当前页，pageArray: 每页展示条数的控制集合，默认 _page_array
            page__pagination: { type: Object, default: null }
        },
        computed: {
            filterData__Func() {
                return this.page__list.filter((item) => {
                    let reg = new RegExp(this.tablefunc.searchStr, 'i')
                    let props = this.page__columns.map( prop => Object.values(prop)[0])//取出資料庫查詢字段
                    
                    return !this.tablefunc.searchStr || reg.test(item[props[0]]) || reg.test(item[props[1]]) || reg.test(item[props[2]]) || reg.test(item[props[3]])
                })
                .filter((item) => {
                    return this.tablefunc.filterStatus === '' || item.status === this.tablefunc.filterStatus
                })
                .filter((item) => {
                    return !this.tablefunc.filterDate || (this.tablefunc.filterDate[0] <= new Date(item.completeDate) && this.tablefunc.filterDate[1] >= new Date(item.completeDate))
                })
            }
        },
        created () {
            // 每一頁展示條數控制
            if (this.page__pagination && !this.page__pagination.pageSizes) {
                this.page__pagination.pageArray = __pageArray 
            }
            // 判斷是否需要分頁
            this.tableCurrentPagination = this.page__pagination || {
                pageSize: this.page__total,
                pageIndex: 1
            } 
        },        
        methods: {
            createGoods () {
                this.$emit('createGoods')
            },
            createIdPage () {
                this.$emit('createIdPage')
            },
            superFetchAll () {
                this.$emit('superFetchAll');
            },
            // 切換每頁顯示的數量
            handleSizeChange (size) {
                if (this.page__pagination) {
                this.tableCurrentPagination = {
                    pageIndex: 1,
                    pageSize: size
                }
                this.$emit('handleSizeChange', this.tableCurrentPagination)
                }
            },
            // 切換頁碼
            handleIndexChange (currnet) {
                if (this.page__pagination) {
                this.tableCurrentPagination.pageIndex = currnet
                this.$emit('handleIndexChange', this.tableCurrentPagination)
                }
            },
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #bfe7ff; color: #000; font-weight: 500;'
                }
            },
            tableRenderHeader ( h, { column }) {
                return h(
                    'span',
                    [
                        h('span', column.label),
                        h('i',{
                            class: column.icon
                        })
                    ]
                )
            }
        },
        components: {
            viewPage,
            expandDom: {
                functional: true,
                props: {
                    row: Object,
                    render: Function,
                    index: Number,
                    column: {
                        type: Object,
                        default: null
                    }
                },
                render: (h, ctx) => {
                    const params = {
                        row: ctx.props.row,
                        index: ctx.props.index
                    }
                    if (ctx.props.column) params.column = ctx.props.column
                    return ctx.props.render(h, params)
                }
            }
        },
    }

</script>
<style scoped>

</style>