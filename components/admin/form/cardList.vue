<template>
    <div>
        <el-input :placeholder="placeholder" v-model="addValue">
            <el-button slot="append" icon="el-icon-circle-plus-outline" @click="addToTemp">輸入</el-button>
            <template slot="prepend">
                <el-popover
                    :placement="placement"
                    :title="title"
                    :width="width"
                    :trigger="trigger"
                    :content="content"
                    :popper-class="popperClass"
                    :class="qclass">
                    <el-button slot="reference" :icon="icon"></el-button>
                </el-popover>
            </template>
        </el-input>
        <div v-show="cardList.length > 0">
            <ul v-for="(item, index) in cardList" :key="index" class="text-lg">
                <li>
                    <p class="ml-6">{{ item }} 
                        <i class="el-icon-circle-close text-md float-right text-red-300 hover:text-red-700 cursor-pointer mr-5 mt-4" @click="remove(index)"></i></p> 
                    <div class="border-t-2"></div>
                </li>              
            </ul>
        </div>
    </div>
</template>

<script>    
    export default {
        props:{
            cardListData:   { type: Array },
            placeholder:    { type: String, default: '' },
            placement :     { type: String, default: '' },
            title :         { type: String, default: '' },
            width :         { type: Number, default: 200 },
            trigger :       { type: String, default: '' },
            content :       { type: String, default: '' },
            popperClass:    { type: String, default: '' },
            qclass :        { type: String, default: '' },
            icon :          { type: String, default: '' },
        },
        data () {
            return {
                addValue: '',
                temp:[]
            };
        },
        computed: {
            cardList() {
                return this.temp = this.cardListData
            }
        },
        methods: {
            async addToTemp() {
                if(!this.$_.isEmpty(this.addValue)) {
                    this.temp.push(this.$_.escape(this.$_.toString(this.addValue)))
                    this.addValue = ''
                    this.$emit('setGoodsAttrArr', this.temp)
                    return
                }
                this.$message({
                    message: '尚未輸入內容!',
                    type: 'warning'
                })
            },
            async remove(index) {
                this.temp.splice(index, 1)
                this.$emit('setGoodsAttrArr', this.temp)
                this.$message({
                    message: '成功刪除一條數據!',
                    type: 'success'
                })
            }
        },
    }

</script>
<style scoped>

</style>