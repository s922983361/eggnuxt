export default {
    methods: {
        async getParentDetail(parentModelName, id) { 
            try{
                const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/common/${parentModelName}/${id}`) 
                return res

            }catch(err){
                //Browser ERROR 
                console.log(err)                  
                this.$message({                        
                    message: '瀏覽器不明錯誤,請重新操作!!',
                    type: 'error',
                    customClass: 'bg-red-200'
                })
            }
        }
    },
}