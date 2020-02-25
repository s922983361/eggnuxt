<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ $route.params.id ? '編輯-' : '新增-'}}{{ config.pageTitle }}</h1>
        </header>
        <div class="w-full mt-10">
            <formEdit
                :imageFolder=config.imageFolder
                :serverController=config.serverController
                :form__Models=formModels
                @editData="save"
                @selectValueChanged="selectValueChanged"
                @deleteDynamicForm="deleteDynamicForm"
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
        mixins: [ notify, factory_save, getSelectList ],
        data () {
            return {
                config : {
                    pageTitle: '商品詳情',
                    serverController: 'goods',
                    relatedModel: ['GoodsColor', 'GoodsType', 'GoodsTypeAttr'],

                    afterSavePushTo: 'factory_Goods',//路由名稱
                    uploadImage: true,
                    imageFolder: `${process.env.BASE_URL}/uploads/`,
                },                
                attrData:[],//商品屬性

                formModels: [

                    //description in viewPage
                    {                        
                        label: '商品詳情',
                        prop: 'goods_content',
                        type: 'editor',//['input','select','checkbox','textarea']
                        //elupload Data
                        action: '/api/admin/upload',
                        uploadFile : `goodsContentImg/${this.$store.state.admin.currentBrandId}`,
                        imageFolder: `${process.env.BASE_URL}/uploads/`,
                        //editor Data
                        maxLength: 4000, //the maxlength words in editor you can write
                        placeholder: '請在此輸入.....',
                        position: 'description-response-full',//['other-response-left', 'other-response-right', 'other-response-full','other-response-checkbox']
                    },
                    //other in viewPage
                    {                        
                        label: '商品顏色',
                        prop: 'goods_color',
                        type: 'select',//['input','select','checkbox','textarea'] 
                        placeholder: 'please choose colors',
                        position: 'other-response-left',//['other-response-left', 'other-response-right', 'other-response-full','other-response-checkbox'] 
                        multiple: true,
                        options:[],
                    },

                    //other in viewPage
                    {                        
                        label: '商品屬性',
                        prop: 'goodsType_id',
                        type: 'select',//['input','select','checkbox','textarea'] 
                        placeholder: 'please choose type of Goods',
                        position: 'size-response-left',//['other-response-left', 'other-response-right', 'other-response-full','other-response-checkbox'] 
                        multiple: false,
                        options:[],
                    },
                    //images in viewPage
                    {                        
                        label: '上傳商品副圖',
                        //prop: 'goods_content',
                        type: 'image_list',//['input','select','checkbox','textarea','image_list','editor']
                        //elupload Data
                        action: '/api/admin/upload',
                        uploadFile : `goodsImg/${this.$store.state.admin.currentBrandId}`,
                        imageFolder: `${process.env.BASE_URL}/uploads/`,
                        fileList: [],
                        position: 'images-response-full',//['other-response-left', 'images-response-right', 'images-response-full','images-response-checkbox']
                    },
                ],
            };
        },
        created() {            
            // find Color List
            this.getSelectList('goods_color', this.config.relatedModel[0], 'name')
            // find GoodsType List
            this.getSelectList('goodsType_id', this.config.relatedModel[1], 'name')
        },
        methods:{            
            async selectValueChanged(goodsType_id) {
                this.$refs.form.clearGoodeTypeAttr()
                await this.deleteDynamicForm()
                const { data } = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/common/${this.config.relatedModel[2]}/goodsType_id/${goodsType_id}`)

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
                    if(item.attr_type === '1') obj.type = 'input'
                    if(item.attr_type === '2') obj.type = 'textarea'
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
                this.formModels = this.formModels.concat(arr)
            },
            async deleteDynamicForm() {
                let Arr = this.formModels.filter((item) => {
                    return item.dynamic !== true
                })
                this.formModels = Arr
            }
        },
        components: {
            formEdit
        },
    }

</script>
<style scoped>

</style>