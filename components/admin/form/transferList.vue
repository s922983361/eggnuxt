<template>
    <div class="transferList">
        <el-transfer
            v-model="hasSelectedValue"
            filterable
            :titles="['當前品牌商品', '關聯商品']"            
            :filter-method="filterMethod"
            filter-placeholder="查詢型號或品名"
            :button-texts="['斷開關聯', '關聯']"
            :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
            }"
            :render-content="renderFunc"
            :data="generateData"
            @change="handleChange"
            >
        </el-transfer>
    </div>    
</template>

<script>
    export default {
        props:{
            transferData:{ type:Array }
        },
        data () {
            return {
                config:{
                    serverController: 'goods',
                    modelName: 'Goods',
                    manager_id: this.$store.state.auth.id,
                    brand_id: this.$store.state.admin.currentBrandId,
                },
                data:[],
                hasSelectedValue:[]
            }
        },
        created() {
            this.brandHandleDataList(1, 100)
        },
        computed: {
            generateData () {
                this.hasSelectedValue = this.transferData
                let arr = []
                this.data.forEach((item, index) => {
                    arr.push({
                        label: `${index}-${item.goods_sn}${item.title}`,
                        key: item._id             
                    })
                })
                return arr
            },
            selectedValue() {                
                return this.hasSelectedValue = this.transferData 
            }
        },
        methods: {
            /**
             * @desc Every "Brand" use $axios to fetch data from database
             * @param {*} pageIndex nunber default:1, table index page 
             * @param {*} pageSize nunber default:20, the count of data in table list
             */
            async brandHandleDataList(pageIndex, pageSize) {
                try {                    
                    //res return obj
                    const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/${this.config.serverController}/${this.config.brand_id}/${pageIndex}/${pageSize}`)
                    if(res.resCode !== 90500) {
                        this.data = res.data
                        return
                    }
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
            renderFunc(h, option) {
                return <span>{ option.label }</span>;
            },
            handleChange(value, direction, movedKeys) {
                if(this.hasSelectedValue.length > 5){
                    this.$notify({
                        message: '最多只能關聯5個商品!!',
                        type: 'warning',
                        customClass: 'bg-yellow-200'
                    })
                    value.pop()
                    return 
                } 
                this.$emit('setGoodsVersion', this.hasSelectedValue)
            },
            filterMethod(query, item) {
                return item.label.indexOf(query) > -1
            }
        },
    }

</script>
<style>
.transferList .el-transfer-panel {
    width: 300px;
}
.transferList .el-transfer-panel .el-transfer-panel__header{
    background:#b4f7f1;
}
.transferList .el-transfer div:nth-child(3).el-transfer-panel .el-transfer-panel__item {
    display: block;
    background: aliceblue;
}
</style>