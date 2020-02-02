/**
 * @desc common mixin in factory Table List Component
 */
export default {
    data() {
        return { 
            operates: { /**控制按鈕 */                    
                list: [ 
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
            total: 0,/**數據總數量 default:0 */ 
            pagination: {
                pageIndex: this.$store.state.admin.currentPageIndex,/**第幾頁 default:1 */ 
                pageSize: this.$store.state.admin.currentPageSize /**每頁最多數據量 default:20 */ 
            },
        }
    },
    methods: {
        /**
         * @desc "Super Admin" use $axios to fetch  All data from database
         * @param {*} pageIndex nunber default:1, table index page 
         * @param {*} pageSize nunber default:20, the count of data in table list
         */
        async handleDataList(pageIndex, pageSize) { 
            this.config.superAdminOpen = true
            try {
                //res return obj
                const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${pageIndex}/${pageSize}`)

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
         * @desc Every "Role" use $axios to fetch data from database
         * @param {*} pageIndex nunber default:1, table index page 
         * @param {*} pageSize nunber default:20, the count of data in table list
         */
        async roleHandleDataList(pageIndex, pageSize) {
            try {
                //res return obj
                const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${this.config.manager_id}/${pageIndex}/${pageSize}`)

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
         * @desc rediect to edit Page (FOR edit data)
         * Function is binded 'operates.list.methods' on table component
         * @param {*} row scope row data form Datatable component
         */        
        async handleEdit (row) {
            this.$store.dispatch('admin/setCurrentPageIndex', this.pagination.pageIndex)
            this.$store.dispatch('admin/setCurrentPageSize', this.pagination.pageSize)
            this.$router.push(`/admin/${this.addPushTo}/edit/${row._id}`)
        },
        /**
         * @desc use $axios to delete data of this row form database
         * Function is binded 'operates.list.methods' on table component
         * @param {*} row scope row data form Datatable component
         */
        handleDel (row) {
            let tips = ''
            if(this.config.serverController === 'brand'){
                tips = '如果您的品牌已經建立過商品, 刪除此品牌將會一併刪除相關的所有商品, 確定要刪除?'
            }
            
            this.$confirm(`是否刪除 "${row.name ? row.name : row.title }"? ${tips}`, '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'error'
            })
            .then( async () => {
                try {
                    const res = await this.$axios.$delete(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${row._id}/${this.$store.state.auth.id}`)
                    
                    if(res.resCode !== 90500) this.roleHandleDataList(this.pagination.pageIndex, this.pagination.pageSize)
                    if(!this.$_.isEmpty(row.imageUrl)) await this.deletImg(row.imageUrl)
                    await this.notifyFunc(res.resCode)
                }catch (err){
                    //Browser ERROR
                    this.$message({                        
                        message: '瀏覽器不明錯誤,請重新操作!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
                
            })                
            .catch(()=> {
                //Do Something after cancelButton
            })
        },        
        /**
         * @desc toggle the count of every page
         * @param {*} pagination number , it is binded table component ,it is setted up by component
         */
        async handleSizeChange (pagination) {
            this.pagination = pagination
            if(this.config.superAdminOpen === true){
                return this.handleDataList(this.pagination.pageIndex, this.pagination.pageSize)    
            }
            this.roleHandleDataList(this.pagination.pageIndex, this.pagination.pageSize)
        }, 
        /**
        * @desc toggle which page to show
        * @param {*} pagination number , it is binded table component ,it is setted up by component
        */
        async handleIndexChange (pagination) {
            this.pagination = pagination
            if(this.config.superAdminOpen === true){
                return this.handleDataList(this.pagination.pageIndex, this.pagination.pageSize)    
            }
            this.roleHandleDataList(this.pagination.pageIndex, this.pagination.pageSize)
        },        
    },
    components: {        
        expandDom: {
            props: {
                column: {
                    required: true
                },
                row: {
                    required: true
                }
            },
            render (h) {
            return h('div', {}, ([this.column.render(this.row, this.column)]))
            }
        }
    },    
}