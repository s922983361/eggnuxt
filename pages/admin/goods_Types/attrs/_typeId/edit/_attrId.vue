<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ $route.params.id || $route.params.attrId ? '編輯-' : '新增-'}}{{ `'${config.pageSubTitle}'${config.pageTitle}` }}</h1>
        </header>
        <div class="w-full mt-10">
            <formEdit
                :serverController=config.serverController
                :form__Models=formModels
                @editData="save"
            ></formEdit>
        </div>
    </div>
</template>

<script>
    import formEdit from '@/components/admin/form/formEdit'
    import notify from '@/plugins/mixins/admin/notify'
    import basic_save from '@/plugins/mixins/admin/edit/basic_save'
    import getSelectList from '@/plugins/mixins/admin/edit/getSelectList'
    import parentDetail from '@/plugins/mixins/admin/parentDetail'

    export default {
        layout: 'admin',
        mixins: [ notify, basic_save, getSelectList, parentDetail ],
        data () {
            return {
                config : {
                    pageTitle: '商品類型屬性',
                    pageSubTitle: '',
                    serverController: 'goodsTypeAttr',
                    parentModelName: 'GoodsType',
                    //relatedController: ['Role'],
                    afterSavePushTo: `goods_Types/attrs/${this.$route.params.typeId}`,//路由名稱
                    uploadImage: false,
                },

                formModels: [
                    {                        
                        label: '屬性名稱:',
                        prop: 'name',
                        type: 'input',
                        placeholder: '輸入屬性名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '類型名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '狀態:',
                        prop: 'status',
                        type: 'switch',
                        active: 0,    //value of active
                        inactive: 1,  //value of inactive
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,                        
                    },
                    {                        
                        label: '輸入方式:',
                        prop: 'attr_type',
                        type: 'radio',//['input','select','checkbox','textarea']
                        position: 'response-full',//['response-left', 'response-right', 'response-full', 'response-checkbox']
                        options:[
                            {                                   
                                label: '1',//radio value
                                title: 'input 單行文本框',
                                disabled: false,
                                checked: true
                            },
                            {
                                label: '2',//radio value
                                title: 'textarea 多行文本框',
                                disabled: false
                            },
                            {
                                label: '3',//radio value
                                title: 'select下拉選單,從下面列表中選擇(一行代表一個可選值)',
                                disabled: false
                            },
                        ],
                        rules: [
                            { required: true, message: '請選擇輸入方式', trigger: 'change' }
                        ]
                    },
                    {                        
                        label: '可選值列表',
                        prop: 'attr_value',
                        type: 'textarea',//['input','select','checkbox','textarea']
                        placeholder: '選擇select下拉選單才需填寫, 輸入可選值, 一行代表一個可選值',
                        rows: 20,
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
                        rules:[                            
                            { max: 100, message: '最多100個字', trigger: 'blur' }
                        ] 
                    },
                ],
            };
        },
        created() {
            // find Role List
            //this.getSelectList('role_id', this.config.relatedController[0], 'title')
            this.fetchGoodsTypeDetail()
        },
        methods:{
            /**
             * @desc fetch name of GoodsTypeDetail to set subTitle
             */
            async fetchGoodsTypeDetail() {
                const { data } = await this.getParentDetail(this.config.parentModelName, this.$route.params.typeId)
                this.config.pageSubTitle = data.name
            },
        },
        components: {
            formEdit
        },
    }

</script>
<style scoped>

</style>