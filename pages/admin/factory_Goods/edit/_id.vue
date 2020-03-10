<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ $route.params.id ? '編輯-' : '新增-'}}{{ config.pageTitle }}</h1>
        </header>
        <div class="w-full mt-2">
            <formEdit
                :imageFolder=config.imageFolder
                :serverController=config.serverController
                :form__Models=formModels
                :color__SelectOption=colorSelectOption
                @editData="save"
                @selectValueChanged="selectValueChanged"
                @deleteDynamicForm="deleteDynamicForm"
                @getGoodsCateId="getGoodsCateId"
                @renderGoodsTypeAttr="renderGoodsTypeAttr"
                ref="form"
            ></formEdit>
        </div>
    </div>
</template>

<script>
    import formEdit from '@/components/admin/form/formEdit'
    import notify from '@/plugins/mixins/admin/notify'
    import factory_save from '@/plugins/mixins/admin/edit/factory_save'
    import getSelectList from '@/plugins/mixins/admin/edit/getSelectList'

    export default {
        layout: 'admin',
        mixins: [ notify, factory_save, getSelectList],
        data () {
            return {
                config : {
                    pageTitle: '商品詳情',
                    serverController: 'goods',
                    relatedModel: ['GoodsColor', 'GoodsType', 'GoodsTypeAttr', 'GoodsCate'],

                    afterSavePushTo: 'factory_Goods',//路由名稱
                    uploadImage: false,
                    imageFolder: `${process.env.BASE_URL}/uploads/`,
                },                
                attrData:[],//商品屬性
                // Using for imageList component & barCodeList component it is created by "getSelectList  GoodsColor " function 
                colorSelectOption:[],

                formModels: [
                    //basic in viewPage
                    {                        
                        label: '商品型號:',
                        prop: 'goods_sn',
                        type: 'input',
                        placeholder: '輸入商品型號',
                        position: 'basic-response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 500,
                        popoverTrigger: 'click',
                        popoverContent: '請輸入您商品型號, 例如: ctx 超好用筆記本請輸入 ctx, 此設定可供您客戶採購時,全站搜尋以及瀏覽器搜尋使用 (此設定為必需)',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverClass: 'text-blue-700 text-lg',
                        popoverElIcon: 'el-icon-question',
                        rules:[
                            { required: true, message: '商品型號必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '商品名稱:',
                        prop: 'title',
                        type: 'input',
                        placeholder: '輸入商品名稱',
                        position: 'basic-response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 300,
                        popoverTrigger: 'click',
                        popoverContent: '請輸入您商品型號, 例如: ctx 超好用筆記本請輸入 "超好用筆記本" (此設定為必需),',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverClass: 'text-blue-700 text-lg',
                        popoverElIcon: 'el-icon-question',
                        rules:[
                            { required: true, message: '商品名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '商品副標題:',
                        prop: 'sub_title',
                        type: 'input',
                        placeholder: '輸入商品副標題',
                        position: 'basic-response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 500,
                        popoverTrigger: 'click',
                        popoverContent: '商品名稱外豐富標題的簡單描述 例如: ---搭載SPIRAL Ｘ進化後的新標準功能！---, 無需要可不用輸入',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverClass: 'text-blue-700 text-lg',
                        popoverElIcon: 'el-icon-question',
                        rules:[                            
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '商品定價:',
                        prop: 'market_price',
                        type: 'input',
                        isNumber: true,
                        placeholder: '輸入商品定價(數字)',
                        position: 'basic-response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 300,
                        popoverTrigger: 'click',
                        popoverContent: '請輸入您商品的建議售價 (無折扣的標準售價, 此設定為必需)',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverClass: 'text-blue-700 text-lg',
                        popoverElIcon: 'el-icon-question',
                        rules:[
                            { required: true, message: '商品定價必須填寫', trigger: 'blur' },                            
                            { type: 'number', message: '只能是數字', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '是否上架:',
                        prop: 'status',
                        type: 'switch',
                        active: 1,    //value of active
                        inactive: 0,  //value of inactive
                        position: 'basic-response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,                        
                    },
                    {                        
                        label: '商品大類:',
                        prop: 'goods_Cate',
                        type: 'select',//['input','select','checkbox','textarea'] 
                        placeholder: '選擇大類',
                        position: 'basic-response-right',//['other-response-left', 'other-response-right', 'other-response-full','other-response-checkbox'] 
                        multiple: false,
                        options:[],                        
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 400,
                        popoverTrigger: 'click',
                        popoverContent: '請選擇您商品要存放的類別,完成選擇後才能選擇細部分類 (此設定為必需)',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverClass: 'text-blue-700 text-lg',
                        popoverElIcon: 'el-icon-question',
                        rules:[
                            { required: true, message: '請選擇大類', trigger: 'change' }, 
                        ]
                    },
                    {                        
                        label: '所屬分類:',
                        prop: 'goodsCate_id',
                        type: 'select',//['input','select','checkbox','textarea'] 
                        placeholder: '選擇分類',
                        position: 'basic-response-right',//['other-response-left', 'other-response-right', 'other-response-full','other-response-checkbox'] 
                        multiple: false,
                        options:[],                        
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 500,
                        popoverTrigger: 'click',
                        popoverContent: '請選擇您商品要存放的分類 ,此設定可將您商品歸類在所屬分類中顯示,全站搜尋以及瀏覽器搜尋使用, 若列表中無符合您所需的類別, 請聯繫管理員將立即為您開設 (此設定為必需)',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverElIcon: 'el-icon-question',
                        rules:[
                            { required: true, message: '請選擇大類後再選擇分類', trigger: 'change' }, 
                        ]
                    },
                    {                        
                        label: '創建時間:',
                        prop: 'create_date',
                        type: 'input',
                        placeholder: '創建時間資料庫自動產生',
                        position: 'basic-response-right',//['response-left', 'response-right', 'response-full']
                        disabled: true                        
                    },
                    {                        
                        label: '修改時間:',
                        prop: 'update_date',
                        type: 'input',
                        placeholder: '修改時間資料庫自動產生',
                        position: 'basic-response-right',//['response-left', 'response-right', 'response-full']
                        disabled: true                        
                    },
                    { 
                        label: 'SEO 關鍵詞:',
                        prop: 'goods_keywords',
                        type: 'textarea',
                        rows: 5,
                        placeholder: '輸入SEO 關鍵詞(搜尋引擎關鍵字)',
                        position: 'basic-response-full',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[                            
                            { max: 100, message: '太長(100個字)', trigger: 'blur' },
                        ]
                    },
                    { 
                        label: 'SEO 描述:',
                        prop: 'goods_desc',
                        type: 'textarea',
                        rows: 5,
                        placeholder: '輸入SEO 描述(搜尋引擎描述)',
                        position: 'basic-response-full',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { max: 100, message: '太長(100個字)', trigger: 'blur' },
                        ]
                    },
                    //description in viewPage
                    {                        
                        label: '商品詳情',
                        prop: 'editor_content',//Editor 數據庫通用字段
                        type: 'editor',//['input','select','checkbox','textarea']
                        //elupload Data
                        action: '/api/admin/upload',
                        uploadFile : `goodsContentImg/${this.$store.state.admin.currentBrandId}/${this.$route.params.id}`,
                        imageFolder: `${process.env.BASE_URL}/uploads/`,
                        //editor Data
                        maxLength: 4000, //the maxlength words in editor you can write
                        placeholder: '請在此輸入.....',
                        position: 'description-response-full',//['other-response-left', 'other-response-right', 'other-response-full','other-response-checkbox']
                    },
                    //other in viewPage
                    {                        
                        label: '商品顏色:',
                        prop: 'goods_color',
                        type: 'select',//['input','select','checkbox','textarea'] 
                        placeholder: 'please choose colors',
                        position: 'other-response-right',//['other-response-left', 'other-response-right', 'other-response-full','other-response-checkbox'] 
                        multiple: true,
                        options:[],
                    },
                    {                        
                        label: '商品規格:',
                        prop: 'goods_attrs',
                        type: 'card-list',//['input','select','checkbox','textarea','radio', 'card-list'] 
                        placeholder: '請輸入商品有哪幾種規格品..',
                        position: 'other-response-left',//['other-response-left', 'other-response-right', 'other-response-full','other-response-checkbox']
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 500,
                        popoverTrigger: 'click',
                        popoverContent: '" 同樣定價 "的商品中,有不同的尺寸規格,例如:16k 18k一本筆記本20元,請分別輸入16k及18k, 此設定可供您客戶採購商品時一併選擇規格以及您輸入商品條碼時使用,如果只有單一規格也可以不用輸入...',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverClass: 'text-blue-700 text-lg',
                        popoverElIcon: 'el-icon-question',
                    },
                     //version in viewPage
                    {                        
                        label: '版本關聯:',
                        prop: 'goods_version',
                        type: 'transfer',
                        position: 'version-response-full',
                        
                    },
                    //other in viewPage
                    {                        
                        label: '商品類別:',
                        prop: 'goodsType_id',
                        type: 'select',//['input','select','checkbox','textarea'] 
                        placeholder: '選擇商品類別',
                        position: 'size-response-left',//['other-response-left', 'other-response-right', 'other-response-full','other-response-checkbox'] 
                        multiple: false,
                        options:[],
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 500,
                        popoverTrigger: 'click',
                        popoverContent: '此設定可將您商品的特有屬性例如:材質/ 重量/ 包裝/ 是否防水....等, 若列表中無符合您所需的欄位供您輸入, 請聯繫管理員將立即為您開設 (此項不是必需, 但建議填寫, 沒輸入的欄位將不會顯示)',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverElIcon: 'el-icon-question',
                    },
                    //images in viewPage
                    {
                        /**
                         * 1.上傳商品圖片不存資料庫商品字段 prop 
                         * 2.使用id取得GoodsImage資料表相關圖片
                         * 3.存入 imageList 給 el-upload file-list渲染
                         * 4.
                         */
                        label: '上傳商品圖片',
                        type: 'image_list',
                        //elupload Data
                        action: '/api/admin/upload',
                        uploadFile : `goodsImg/${this.$store.state.admin.currentBrandId}/${this.$route.params.id}`,
                        imageFolder: `${process.env.BASE_URL}/uploads/`,
                        position: 'images-response-full',//['other-response-left', 'images-response-right', 'images-response-full','images-response-checkbox']
                    },
                    //barcode in viewPage
                    {
                        label: '輸入條碼:',
                        type: 'barcode_list',//['input','select','checkbox','textarea']                         
                        position: 'barCode-response-full',
                        //el-tree Data
                        data: [
                            {
                                label: '規格值',
                                children: [
                                    {
                                        label: '顏色值一',                                        
                                    },
                                    {
                                        label: '顏色值二',                                        
                                    }
                                ]
                            },
                            {
                                label: '規格值',
                                children: [
                                    {
                                        label: '顏色值一',                                        
                                    },
                                    {
                                        label: '顏色值二',                                        
                                    }
                                ]
                            },
                        ],
                        //https://blog.csdn.net/HansExploration/article/details/83010327
                        renderContent: (h,{ node, data, store }) => {
                            if(node.level == 1) {
                                return (
                                    <span class="custom-tree-node">
                                        <span>{node.label}</span>
                                    </span>
                                )
                            }else {
                                return h(
                                    'el-form-item',
                                    {
                                        props: {
                                            label:`${node.label}:`
                                        }
                                    },
                                    [   
                                        h(
                                            'input',
                                            {
                                                attrs: {
                                                    type: 'text',
                                                    maxlength: 13,
                                                    placeholder: '請輸入 EAN-13'
                                                },
                                                class: 'w-full text-sm bg-gray-300 text-gray-700 rounded-full text-center',
                                                domProps:{
                                                    value: this.myValue
                                                },
                                                on:{
                                                    input: val => this.myValue = val
                                                }
                                            },
                                        )
                                    ]
                                )
                            }
                        },
                    }
                ],
            };
        },
        created() {            
            // find Color List
            this.getSelectList('goods_color', this.config.relatedModel[0], 'name')
            // find GoodsType List
            this.getSelectList('goodsType_id', this.config.relatedModel[1], 'name')
            // find goods_Cate List (level = 1)
            this.getSelectList('goods_Cate', this.config.relatedModel[3], 'name')
        },
        methods:{           
            async selectValueChanged(id, prop) {
                
                if(prop === 'goodsType_id') {
                    this.$refs.form.clearGoodeTypeAttr()
                    await this.deleteDynamicForm()
                    await this.renderGoodsTypeAttr(id)
                }
                /** @desc Clear "Children select Value" & reset Option When "Parent Cate Select" changed !
                */
                if(prop === 'goods_Cate') {
                    if(!this.$_.isUndefined(this.$refs.form.model.goodsCate_id)) this.$refs.form.model.goodsCate_id = ''
                    await this.getChildSelectList('goodsCate_id', this.config.relatedModel[3], 'name', 'pid', id)
                    return 
                }
            },
            /**@desc reset "this.formModels" after changing goodsType */
            async deleteDynamicForm() {
                let Arr = this.formModels.filter((item) => {
                    return item.dynamic !== true
                })
                this.formModels = Arr
            },
            /**@desc before mounted if level 1 of Cate exist
            * 1. using "goodsCateId(level = 1)"" to fetch  goodsCate(level = 2)
            */
            async getGoodsCateId(goodsCateId) {
                await this.getChildSelectList('goodsCate_id', this.config.relatedModel[3], 'name', 'pid', goodsCateId)
            },
            async renderGoodsTypeAttr(GoodsTypeId) {
                const { data } = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/common/${this.config.relatedModel[2]}/goodsType_id/${GoodsTypeId}`)
                let arr = data.map((item) => {
                    let obj = {}
                    //標示動態生成的數據格式(表單重置時標示刪除使用)
                    obj.dynamic = true
                    obj.label = item.name
                    //以id當goodeTypeAttr索引值
                    obj.prop = item._id
                    //控制組件值綁定在 goodeTypeAttr
                    obj.is_goodeTypeAttr = true
                    //渲染組件樣式
                    if(item.attr_type === '1') {
                        obj.type = 'input'
                        obj.rules = [                            
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    }
                    if(item.attr_type === '2') {
                        obj.type = 'textarea'
                        obj.rules = [                            
                            { max: 100, message: '太長(100個字)', trigger: 'blur' },
                        ]
                    }
                    if(item.attr_type === '3') {
                        let options = []
                        item.attr_value.split(";").forEach((optionItem) => {
                            let obj = {}
                            obj.value = optionItem
                            obj.label = optionItem
                            options.push(obj)
                        })
                        obj.type = 'select'
                        obj.multiple = false
                        obj.options = options
                    }
                    obj.position = 'size-response-full'                    
                    return obj
                }) 
                
                return this.formModels = this.formModels.concat(arr)
            },
        },
        components: {
            formEdit
        },
    }

</script>
<style scoped>

</style>