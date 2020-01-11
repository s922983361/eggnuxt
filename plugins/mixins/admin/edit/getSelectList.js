export default {
    methods: {
        /** 
         * @param {*} id string : 
         * @param {*} modelName string :  
         * @param {*} field string :
         */
        async getSelectList(id, modelName, field) {
            //find the obj you want to set value in 
            const obj = this.formModels.find((o)=>{
                return o.prop == id
            }) 
            try {
                // get selectList 
                const { resCode, data } = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/common/getList/${modelName}`)
                if(resCode !== 90500) {
                    if(!this.$_.isEmpty(data)) {
                        //add select obj key in 
                        data.forEach(item => {
                            item['value'] = item._id
                            item['label'] = item[field]
                        }) 
                        obj.options = data
                    }
                    return
                }
                //Server ERROR
                await this.notifyFunc(resCode)
            }catch (err){
                //Browser ERROR 
                this.$message({                        
                    message: '瀏覽器不明錯誤,請重新操作!!',
                    type: 'error',
                    customClass: 'bg-red-200'
                })
            }
        }
    },
}