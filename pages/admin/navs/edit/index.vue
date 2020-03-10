<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ $route.params.id ? '編輯-' : '新增-'}}{{ config.pageTitle }}</h1>
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

    export default {
        layout: 'admin',
        mixins: [ notify, basic_save, getSelectList ],
        data () {
            return {
                config : {
                    pageTitle: '導航資訊',
                    serverController: 'nav',
                    //relatedController: ['Role'],
                    afterSavePushTo: 'navs',//路由名稱
                    uploadImage: false,
                },

                formModels: [
                    {                        
                        label: '導航名稱:',
                        prop: 'title',
                        type: 'input',
                        placeholder: '輸入導航名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '導航名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '連接位址:',
                        prop: 'link',
                        type: 'input',
                        placeholder: '輸入路由URL',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '跳轉路由必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },                    
                    {                        
                        label: '排序:',
                        prop: 'sort',
                        type: 'input',
                        isNumber: true,                        
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        popoverShow: true,
                        popoverPlacement: 'top',
                        popoverTitle: '--提示--',
                        popoverWidth: 300,
                        popoverTrigger: 'click',
                        popoverContent: '排序以4位數 開頭請以放置位置的 "開頭編號" 依序往下',
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
                        label: '放置位置:',
                        prop: 'position',
                        type: 'select',
                        placeholder: '選擇位置',
                        position: 'response-right', 
                        multiple: false,
                        options:[
                            { value: 1, label: '1. 前台頂部' },
                            { value: 2, label: '2. 前台中間' },
                            { value: 3, label: '3. 前台底部' },
                            { value: 4, label: '4. 後台頂部' },
                            { value: 5, label: '5. 後台底部' },
                        ],
                        rules: [
                            { required: true, message: '請選擇位置', trigger: 'change' }
                        ]                        
                    },
                    {                        
                        label: '開啟窗口:',
                        prop: 'is_opennew',
                        type: 'select',
                        placeholder: '是否開啟',
                        position: 'response-right', 
                        multiple: false,
                        options:[
                            { value: 1, label: '1. 本窗口' },
                            { value: 2, label: '2. 新窗口' },
                        ],
                        rules: [
                            { required: true, message: '請選擇', trigger: 'change' }
                        ]                        
                    },
                    {                        
                        label: '描述:',
                        prop: 'description',
                        type: 'textarea',
                        placeholder: '簡單描述',
                        row: 5,
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
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
                ],
            };
        },
        created() {
            
        },
        components: {
            formEdit
        },
    }

</script>
<style scoped>

</style>