export default {
    methods: {
        /** 
         * @desc use Brand fetchAllwithRole() Api, "1/20"  has not used but still necessary !!
         * @param {*} manager_id string : 
         */
        async getBrandsList(manager_id) {            
            try {
                // get brands List 
                const { data } = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/brand/${manager_id}/1/20`)
                this.config.bradnIdList = data
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