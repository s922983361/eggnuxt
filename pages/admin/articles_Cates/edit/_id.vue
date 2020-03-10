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
            ></formEdit>
        </div>
    </div>
</template>

<script>
    import formEdit from '@/components/admin/form/formEdit'
    import notify from '@/plugins/mixins/admin/notify'
    import basic_save from '@/plugins/mixins/admin/edit/basic_save'
    import getSelectList from '@/plugins/mixins/admin/edit/getSelectList'

    export default {
        layout: 'admin',
        mixins: [ notify, basic_save, getSelectList ],
        data () {
            return {
                config : {
                    pageTitle: '文章分類',
                    serverController: 'articleCate',
                    relatedModel: ['ArticleCate'],
                    afterSavePushTo: 'articles_Cates',//路由名稱
                    uploadImage: true,
                    imageFolder: `${process.env.BASE_URL}/uploads/`,
                },

                formModels: [
                    {                        
                        label: '分類名稱:',
                        prop: 'title',
                        type: 'input',
                        placeholder: '輸入文章分類名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '分類名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },                    
                    {                        
                        label: '放置位置:',
                        prop: 'position',
                        type: 'select',
                        placeholder: '選擇位置',
                        position: 'response-left', 
                        multiple: false,
                        options:[
                            { value: 1, label: '1. 前台文章' },
                            { value: 2, label: '2. 後台文章' },
                        ],
                        rules: [
                            { required: true, message: '請選擇位置', trigger: 'change' }
                        ]                        
                    },
                    {                        
                        label: '上傳圖片:',
                        prop: 'imageUrl',
                        type: 'file',
                        action: '/api/admin/upload', //sever API
                        listType: 'picture', //['text', 'picture', 'picture-card']
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        data: {
                            uploadFile : 'articleCateImg'//custom pic dirName
                        },
                        autoUpload: true,
                        showFileList: false,
                        multiple: false,
                        limit: 1, //Number: have to set value if 'multiple' is true                        
                    },
                    {                        
                        label: '分類等級:',
                        prop: 'type',
                        type: 'select',
                        placeholder: '選擇節點',
                        position: 'response-right', 
                        multiple: false,
                        options:[
                            { value: 1, label: '1.頂級分類' },
                            { value: 2, label: '2.二級分類' },
                        ],
                        rules: [
                            { required: true, message: '請選擇分類等級', trigger: 'change' }
                        ]                        
                    },
                    {                        
                        label: '所屬分類:',
                        prop: 'pid',
                        type: 'select',
                        placeholder: '選擇所屬分類 不選即為創建新頂級分類',
                        position: 'response-right', 
                        multiple: false,
                        options: [],                        
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 300,
                        popoverTrigger: 'click',
                        popoverContent: '不填寫表示 此分類為頂級分類預設值 0',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverClass: 'text-blue-700 text-lg',
                        popoverElIcon: 'el-icon-question',
                    },                    
                    {                        
                        label: '連接位址:',
                        prop: 'link',
                        type: 'input',
                        placeholder: '輸入連接位址',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 300,
                        popoverTrigger: 'click',
                        popoverContent: '頂級分類不需輸入',
                        popoverPopperClass: 'bg-green-200 border-green-500 text-md',
                        popoverClass: 'text-blue-700 text-lg',
                        popoverElIcon: 'el-icon-question',                        
                    },
                    {                        
                        label: '排序:',
                        prop: 'sort',
                        type: 'input',
                        isNumber: true,
                        placeholder: '預設值100',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 300,
                        popoverTrigger: 'click',
                        popoverContent: '排序以4位數 開頭請以放置位置的 "開頭編號" 前台為1 後台為2 ,再依分類順序往下',
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
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,                        
                    },
                    {                        
                        label: '創建時間:',
                        prop: 'create_date',
                        type: 'input',
                        placeholder: '創建時間資料庫自動產生',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: true                        
                    },
                    {                        
                        label: '修改時間:',
                        prop: 'update_date',
                        type: 'input',
                        placeholder: '修改時間資料庫自動產生',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: true                        
                    },
                    {                        
                        label: 'SEO 標題:',
                        prop: 'keywords',
                        type: 'input',
                        placeholder: '輸入SEO 標題',
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { max: 200, message: '太長(200個字)', trigger: 'blur' },
                        ]                        
                    },
                    {                        
                        label: 'SEO 關鍵詞:',
                        prop: 'sub_title',
                        type: 'input',
                        placeholder: '輸入SEO 關鍵詞',
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
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
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { max: 200, message: '太長(200個字)', trigger: 'blur' },
                        ]                        
                    },
                ],
            };
        },
        created() {
            // find goodsCate pid==0 List
            this.getSelectList('pid', this.config.relatedModel[0], 'title')
        },
        components: {
            formEdit
        },
    }

</script>
<style scoped>

</style>