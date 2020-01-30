export default {
    methods: {
        async save(editData) { 
            //extend
            if(!this.$_.isEmpty(this.$route.params.typeId)){ editData.goodsType_id = this.$route.params.typeId }
            
            let res = {}            
            try{
                if(!this.$_.isEmpty(this.$route.params.id)) {
                    res = await this.$axios.$put(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${this.$route.params.id}`, editData) 

                } else if ( !this.$_.isEmpty(this.$route.params.attrId)){
                    res = await this.$axios.$put(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${this.$route.params.attrId}`, editData)
                    
                } else {
                    res = await this.$axios.$post(`${process.env.EGG_API_URL}/admin/${this.config.serverController}`, editData)
                }
                // // special ERROR
                if(res.resCode == 91500) {
                    this.$router.replace('/admin/login')
                    return this.$store.dispatch('auth/logout')
                }

                await this.notifyFunc(res.resCode)

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