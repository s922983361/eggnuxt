export default {
    methods: {
        async save(editData) {
            //image filed 'imageUrl' is exist
            if(this.uploadImage === true && this.$_.isEmpty(editData.imageUrl)) {
                this.$notify({
                    message: '圖片尚未上傳',
                    type: 'error',
                    customClass: 'bg-red-200'
                })
                return
            }
            
            let res = {}
            try{
                if(!this.$_.isEmpty(this.$route.params.id)) {
                    res = await this.$axios.$put(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${this.$route.params.id}`, editData) 
                } else {
                    res = await this.$axios.$post(`${process.env.EGG_API_URL}/admin/${this.config.serverController}`, editData)
                }
                // // special ERROR
                if(res.resCode == 91500) return this.$router.replace('/admin')

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