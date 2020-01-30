export default {
    methods: {
        
        async changeIconAndUpdate(modelName, row_id, field, value) {
            let val = 0
            if (value === 0) val = 1
            if (value === 1) val = 0
            const res = await this.changeStatus(modelName, row_id, { [field]: val })
            return res
        },

        async changeStatus(modelName, id , obj) {
            try {
                const res = await this.$axios.$put(`${process.env.EGG_API_URL}/admin/common/${modelName}/${id}`, obj)
                return res
            }catch (err){
                //Browser ERROR 
                console.log(err)                  
                this.$message({                        
                    message: '瀏覽器不明錯誤,請重新操作!!',
                    type: 'error',
                    customClass: 'bg-red-200'
                })
            }            
        },
    }
}  