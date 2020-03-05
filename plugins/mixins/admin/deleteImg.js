export default {
    methods: {
        async deletImg(imgPath) {
            try {
                await this.$axios.$post(`/api/admin/deleteImg`,{ imgPath })
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
        async deletAllImg(folderPath) {
            try {
                await this.$axios.$post(`/api/admin/deleteFolder`,{ folderPath })
            }catch (err){
                //Browser ERROR 
                console.log(err)                  
                this.$message({                        
                    message: '瀏覽器不明錯誤,請重新操作!!',
                    type: 'error',
                    customClass: 'bg-red-200'
                })
            }            
        }
    }
}    