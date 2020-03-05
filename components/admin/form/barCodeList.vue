<template>
    <div class="barCodeList">
        <el-tree
            empty-text="規格和顏色都必需填入一個或一個以上的值!"
            :node-key="$route.params.id"
            :data="attrAndColorData__Func"
            :highlight-current="true"
            :default-expand-all="true"
            :render-content="renderContent"
        >
        </el-tree>
    </div>
</template>

<script>
    import notify from '@/plugins/mixins/admin/notify'
    import { showLoading, hideLoading } from '@/plugins/libs/loading'

    export default {
        mixins: [ notify ],
        props: {
            colorSelectOption: { type: Array }, //All color SelectOption 
            currentColorList: { type: Array }, //colors are choosed 
            currentAttrList: { type: Array },//attr has input            
        },
        data () {
            return {
                barcode: {},//record barcode in instance
                barcodeDb: {},//record barcode from Db
                buttonHasUpload: {}
            };
        },
        mounted() {
            /** @desc be sure this.barcode Model ready!!*/
            this.$nextTick(() => {
                this.getBarcodeAndInit()
            })
        },        
        computed: {
            /**
             * @desc init data model
             * 1.init colorArr with current color has choose
             * 2.set rule of barcodeList component
             * 3.set data in el-tree with 'currentColorList & currentAttrList' of props
             * 4.rule: level 1 is attr , level 2 is color
             * 5.set 'buttonHasUpload' data to change style of 'upload Button' 
             */          
            attrAndColorData__Func() {                
                let data = []
                let colorArr = []
                /**1.init colorArr with current color has choose */
                if(!this.$_.isEmpty(this.currentColorList)) {
                    colorArr = this.colorSelectOption.filter((item) => {
                        return (this.currentColorList.indexOf(item._id) != -1)
                    })
                }
                /**2.set rule of barcodeList component */
                /**3.set data in el-tree with 'currentColorList & currentAttrList' of props */
                if(!this.$_.isEmpty(this.currentAttrList) && !this.$_.isEmpty(colorArr)) {
                    /** 4.rule: level 1 is attr , level 2 is color */
                    this.currentAttrList.forEach((item) => {
                        let level1 = {} 
                        let arr = []
                        level1.label = item
                        colorArr.forEach((color) => { 
                            let level2 = {}
                            level2.label = color.name
                            level2.colorId = color._id
                            level2.attr = item
                            // if this barcode key has set
                            if(this.$_.isUndefined(this.barcode[`${item}-${color._id}`])) {
                                this.$set(this.barcode, `${item}-${color._id}`, '')
                            }                            
                            arr.push(level2)
                            /**5.set 'buttonHasUpload' data to change style of 'upload Button' */
                            if(this.$_.isUndefined(this.buttonHasUpload[`${item}-${color._id}`])) {
                                this.$set(this.buttonHasUpload, `${item}-${color._id}`, false)
                            } 
                        })
                        level1.children = arr
                        data.push(level1)                        
                    })
                    /** "this.barcode" will NOT be render in First time So i set sync Function here be sure sync tree Models*/ 
                    //this.syncBarcodeAndButtonHasUploadModel()
                    return data
                }
            },
        },
        methods: {
            renderContent( h, { node, data, store }) {
                if(node.level == 1 && node.childNodes.length > 0) {
                    return (
                        <span class="custom-tree-node border-b-2 border-gray-500">
                            <span class="text-lg pl-6">{node.label}</span>
                        </span>
                    )
                } else {
                    return h(
                        'el-form-item',
                        {
                            props: {
                                label:`${node.label}:`
                            },
                            class: 'w-full text-md py-1'
                        },
                        [   
                            h(
                                'div',{
                                    class: 'flex items-center'
                                },
                                [
                                    h(
                                        'input',
                                        {
                                            attrs: {
                                                type: 'text',
                                                maxlength: 12,
                                                placeholder: 'EAN-13',
                                            },
                                            class: 'w-1/3 text-md bg-gray-200 text-gray-700 rounded-full text-center',
                                            domProps:{
                                                value: this.barcode[`${data.attr}-${data.colorId}`]
                                            },
                                            on:{
                                                /**it must set key in 'this.borcode' first when bind value to 'this.borcode' */                                          
                                                input: (e) => {
                                                    this.barcode[`${data.attr}-${data.colorId}`] = e.target.value
                                                },
                                                /** Number only & 12 only*/
                                                blur: (e) => {                                            
                                                    if(!this.$_.isEmpty(e.target.value) && !this.$helper.IsNumber(e.target.value)) {
                                                        this.$notify({
                                                            message: '只能是數字!!',
                                                            type: 'warning',
                                                            customClass: 'bg-yellow-200'
                                                        })
                                                        e.target.value = ''
                                                        this.barcode[`${data.attr}-${data.colorId}`] = ''
                                                        return 
                                                    }
                                                    if(e.target.value.length > 0 && e.target.value.length < 12) {
                                                        this.$notify({
                                                            message: '只能是12位數!!',
                                                            type: 'warning',
                                                            customClass: 'bg-yellow-200'
                                                        })
                                                        e.target.value = ''
                                                        this.barcode[`${data.attr}-${data.colorId}`] = ''
                                                        return 
                                                    }
                                                }
                                            }
                                        },
                                    ),
                                    h(
                                        'el-button',{
                                            props: {
                                                circle: true,
                                                type: this.buttonHasUpload[`${data.attr}-${data.colorId}`] === false ? 'success': 'warning',
                                                icon: this.buttonHasUpload[`${data.attr}-${data.colorId}`] === false ? 'el-icon-upload2': 'el-icon-edit' 
                                            },
                                            class: 'ml-6',
                                            on:{
                                                click: async ()=> {
                                                    if(this.$_.isEmpty(this.barcode[`${data.attr}-${data.colorId}`])) {
                                                        this.$notify({
                                                            message: '尚未輸入條碼數據!!',
                                                            type: 'warning',
                                                            customClass: 'bg-yellow-200'
                                                        })
                                                        return
                                                    }
                                                    /**set post data */
                                                    let obj = {}
                                                    obj.attr = data.attr
                                                    obj.goods_id = this.$route.params.id
                                                    obj.color_id = data.colorId
                                                    obj.uid = `${data.attr}-${data.colorId}`
                                                    obj.barcode = this.barcode[`${data.attr}-${data.colorId}`]

                                                    try{
                                                        let res = {}
                                                        /** POST or PUT */
                                                        if(this.$_.isUndefined(this.barcodeDb[`${data.attr}-${data.colorId}`])) {
                                                            res = await this.$axios.$post(`${process.env.EGG_API_URL}/admin/common/GoodsBarcode`, obj)
                                                            this.buttonHasUpload[`${data.attr}-${data.colorId}`] = true
                                                        } else {
                                                            if(!this.$_.isEmpty(this.barcodeDb[`${data.attr}-${data.colorId}`].barcode) && this.barcodeDb[`${data.attr}-${data.colorId}`].barcode !== this.barcode[`${data.attr}-${data.colorId}`]) {
                                                                res = await this.$axios.$put(`${process.env.EGG_API_URL}/admin/common/GoodsBarcode/${this.barcodeDb[`${data.attr}-${data.colorId}`].id}`, { barcode: obj.barcode})
                                                            } else {
                                                                return false
                                                            }
                                                        }
                                                        /**Success to refresh All data */
                                                        if(res) {                                                            
                                                            await this.getBarcodeAndInit()
                                                            this.$notify({
                                                                message: '上傳成功!!',
                                                                type: 'success',
                                                                customClass: 'bg-green-200'
                                                            })
                                                        }
                                                    }catch(err) {
                                                        this.$message({
                                                            message: '發生不明的錯誤,請聯絡管理員!!',
                                                            type: 'error',
                                                            customClass: 'bg-red-200'
                                                        })
                                                    }                                            
                                                } 
                                            }
                                        },
                                    ),
                                    h(
                                        'el-button',{
                                            props: {
                                                circle: true,
                                                type: 'danger',
                                                icon: 'el-icon-delete'
                                            },
                                            class: 'ml-6',
                                            on: {
                                                click: async() => {
                                                    if(!this.$_.isEmpty(this.barcode[`${data.attr}-${data.colorId}`])) {
                                                        if(this.buttonHasUpload[`${data.attr}-${data.colorId}`] === true) {
                                                            try{
                                                                const res = await this.$axios.$delete(`${process.env.EGG_API_URL}/admin/common/GoodsBarcode/${this.barcodeDb[`${data.attr}-${data.colorId}`].id}`)
                                                                if(res) {
                                                                    delete this.barcodeDb[`${data.attr}-${data.colorId}`]
                                                                    this.buttonHasUpload[`${data.attr}-${data.colorId}`] = false
                                                                    this.$notify({
                                                                        message: '刪除成功!!',
                                                                        type: 'success',
                                                                        customClass: 'bg-green-200'
                                                                    })
                                                                }
                                                            }catch(err) {
                                                                this.$message({                        
                                                                    message: '發生不明的錯誤,請聯絡管理員!!',
                                                                    type: 'error',
                                                                    customClass: 'bg-red-200'
                                                                })
                                                            }
                                                        }
                                                        this.barcode[`${data.attr}-${data.colorId}`] = ''
                                                    }
                                                    return false
                                                }
                                            }
                                        },
                                    ),
                                    h(  
                                        'barcode',{
                                            //https://github.com/lindell/JsBarcode/wiki/Options
                                            props: {
                                                value: this.barcode[`${data.attr}-${data.colorId}`],
                                                format: "EAN13",
                                                width: 1,
                                                height: 25,                                        
                                            },
                                            class: 'inline-block ml-16'
                                        }
                                    )
                                ]
                            )
                        ]
                    )
                }
            },
            /**@desc get All Barcodes current goods_id*/
            async getBarcodeAndInit() {
                try {
                    const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/common/GoodsBarcode/goods_id/${this.$route.params.id}`)
                    if(!this.$_.isEmpty(res)) {
                        this.barcodeDb = await this.initBarcodeDbModel(res.data)
                        /** "this.barcode" will NOT be render in First time */ 
                        this.syncBarcodeAndButtonHasUploadModel()
                        return 
                    }
                    res.resCode == 90500 && await this.notifyFunc(res.resCode)                    
                }               
                catch(err) {
                    console.log(err)
                    this.$message({                        
                        message: '發生不明的錯誤,請聯絡管理員!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
            },
            async initBarcodeDbModel(array) {
                /** @desc create BarcodeDbModel to save data from db*/
                let keys = []
                let values = []
                array.forEach((item) => { 
                    let obj = {}
                    obj.id = item._id //_id for update
                    obj.barcode = item.barcode
                    keys.push(item.uid)
                    values.push(obj)
                })
                let result = values.reduce((result, filed, index) => {
                    result[keys[index]] = filed
                    return result
                },{})
                return result
                //console.log(result)
            },
            syncBarcodeAndButtonHasUploadModel() {
                let arr = Object.keys(this.barcode)
                Object.keys(this.barcodeDb).map((key, index) => {
                    if(arr.indexOf(key) != -1) {
                        this.barcode[key] = this.barcodeDb[key].barcode                        
                        this.buttonHasUpload[key] = true
                    }
                })                
            }
        },
        components: {},
    }

</script>
<style scoped>

</style>