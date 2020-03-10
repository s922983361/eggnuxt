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
                @selectValueChanged="selectValueChanged"
                @getArticleCateId="getArticleCateId"
                @editData="save"
                ref="form"
            ></formEdit>
        </div>
    </div>
</template>

<script>
    import formEdit from '@/components/admin/form/formEdit'
    import notify from '@/plugins/mixins/admin/notify'
    import basic_save from '@/plugins/mixins/admin/edit/basic_save'
    import getSelectList from '@/plugins/mixins/admin/edit/getSelectList'
    import deleteImg from '@/plugins/mixins/admin/deleteImg'

    export default {
        layout: 'admin',
        mixins: [ notify, basic_save, getSelectList, deleteImg ],
        data () {
            return {
                config : {
                    pageTitle: '文章詳情',
                    serverController: 'article',
                    relatedModel: ['ArticleCate'],
                    afterSavePushTo: 'articles',//路由名稱
                    uploadImage: true,
                    imageFolder: `${process.env.BASE_URL}/uploads/`,
                },

                formModels: [
                    {                        
                        label: '文章標題:',
                        prop: 'title',
                        type: 'input',
                        placeholder: '輸入文章標題',
                        position: 'basic-response-left',
                        disabled: false,
                        rules:[
                            { required: true, message: '分類名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '上傳圖片:',
                        prop: 'imageUrl',
                        type: 'file',
                        action: '/api/admin/upload', //sever API
                        listType: 'picture', //['text', 'picture', 'picture-card']
                        position: 'basic-response-left',
                        data: {
                            uploadFile : 'articleImg'//custom pic dirName
                        },
                        autoUpload: true,
                        showFileList: false,
                        multiple: false,
                        limit: 1, //Number: have to set value if 'multiple' is true                        
                    },
                    {                        
                        label: '所屬大類:',//找尋大類不存儲數據庫
                        prop: 'article_Cate',
                        type: 'select',
                        placeholder: '選擇所屬分類 不選即為創建新頂級分類',
                        position: 'basic-response-right', 
                        multiple: false,
                        options: [],
                        rules:[
                            { required: true, message: '選擇大類後才能選擇分類', trigger: 'change' },
                        ]
                    },
                    
                    {                        
                        label: '所屬分類:',
                        prop: 'articleCate_id',
                        type: 'select',
                        placeholder: '選擇所屬分類 不選即為創建新頂級分類',
                        position: 'basic-response-right', 
                        multiple: false,
                        options: [],
                        rules:[
                            { required: true, message: '必須選擇分類', trigger: 'change' },
                        ]
                    },
                    {                        
                        label: '連接位址:',
                        prop: 'link',
                        type: 'input',
                        placeholder: '輸入連接位址',
                        position: 'basic-response-right',
                        disabled: false,
                        rules:[
                            { required: true, message: '連接位址必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '排序:',
                        prop: 'sort',
                        type: 'input',
                        isNumber: true,
                        placeholder: '預設值100',
                        position: 'basic-response-right',
                        disabled: false,
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 300,
                        popoverTrigger: 'click',
                        popoverContent: '排序以3位數 開頭請以放置位置的 "開頭編號" 依序往下',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverClass: 'text-blue-700 text-lg',
                        popoverElIcon: 'el-icon-question',
                        rules:[
                            { type: 'number', message: '只能是數字', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '是否顯示:',
                        prop: 'status',
                        type: 'switch',
                        active: 1,    //value of active
                        inactive: 0,  //value of inactive
                        position: 'basic-response-left',
                        disabled: false,                        
                    },
                    {                        
                        label: '創建時間:',
                        prop: 'create_date',
                        type: 'input',
                        placeholder: '創建時間資料庫自動產生',
                        position: 'basic-response-right',
                        disabled: true                        
                    },
                    {                        
                        label: '修改時間:',
                        prop: 'update_date',
                        type: 'input',
                        placeholder: '修改時間資料庫自動產生',
                        position: 'basic-response-right',
                        disabled: true                        
                    },
                    {                        
                        label: 'SEO 標題:',
                        prop: 'sub_title',
                        type: 'input',
                        placeholder: '輸入SEO 標題',
                        position: 'basic-response-full',
                        disabled: false,
                        rules:[
                            { max: 200, message: '太長(200個字)', trigger: 'blur' },
                        ]                        
                    },
                    {                        
                        label: 'SEO 關鍵詞:',
                        prop: 'keywords',
                        type: 'input',
                        placeholder: '輸入SEO 關鍵詞',
                        position: 'basic-response-full',
                        disabled: false,
                        rules:[
                            { max: 200, message: '太長(200個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: 'SEO 描述:',
                        prop: 'description',
                        type: 'textarea',
                        row: 5,
                        placeholder: '輸入SEO 描述',
                        position: 'basic-response-full',
                        disabled: false,
                        rules:[
                            { max: 200, message: '太長(200個字)', trigger: 'blur' },
                        ]                        
                    },
                    //description in viewPage
                    {                        
                        label: '商品詳情',
                        prop: 'editor_content',
                        type: 'editor',
                        action: '/api/admin/upload',
                        uploadFile : `articleContentImg/${this.$route.params.id}`,
                        imageFolder: `${process.env.BASE_URL}/uploads/`,
                        //editor Data
                        maxLength: 4000, //the maxlength words in editor you can write
                        placeholder: '請在此輸入.....',
                        position: 'description-response-full',
                    },
                ],
            };
        },
        created() {
            // find goodsCate pid==0 List
            this.getSelectList('article_Cate', this.config.relatedModel[0], 'title')
        },
        methods: {
            /**
            * @desc Clear "Children select Value" & reset Option When "Parent Cate Select" changed !
            */
            async selectValueChanged(id, prop) {
                if(prop === 'article_Cate') {
                    if(!this.$_.isUndefined(this.$refs.form.model.articleCate_id))  this.$refs.form.model.articleCate_id = ''
                    
                    await this.getChildSelectList('articleCate_id', this.config.relatedModel[0], 'title', 'pid', id)
                    return 
                }
            },
            /**
            * @desc before mounted if level 1 of Cate exist
            * 1. using "ArticleCateId(level = 1)"" to fetch  ArticleCate(level = 2)
            */
            async getArticleCateId(articleCateId) {
                await this.getChildSelectList('articleCate_id', this.config.relatedModel[0], 'title', 'pid', articleCateId)
            },
        },
        components: {
            formEdit
        },
    }

</script>
<style scoped>

</style>