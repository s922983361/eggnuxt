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
    import factory_save from '@/plugins/mixins/admin/edit/factory_save'
    import getSelectList from '@/plugins/mixins/admin/edit/getSelectList'

    export default {
        layout: 'admin',
        mixins: [ notify, factory_save, getSelectList ],
        data () {
            return {
                config : {
                    pageTitle: '品牌名稱及LOGO',
                    serverController: 'brand',
                    //relatedModel: ['Role'],

                    afterSavePushTo: 'factory_Brands',//路由名稱
                    uploadImage: true,
                    imageFolder: `${process.env.BASE_URL}/uploads/`,
                },

                formModels: [
                    {                        
                        label: '上傳LOGO:',
                        prop: 'imageUrl',
                        type: 'file',
                        action: '/api/admin/upload', //sever API
                        listType: 'picture', //['text', 'picture', 'picture-card']
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
                        data: {
                            uploadFile : 'brandLogo'//custom pic dirName
                        },
                        autoUpload: true,
                        showFileList: false,
                        multiple: false,
                        limit: 1, //Number: have to set value if 'multiple' is true                        
                    },
                    {                        
                        label: '品牌名稱:',
                        prop: 'name',
                        type: 'input',
                        placeholder: '輸入管理員名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '品牌名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
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
            // find Role List
            //this.getSelectList('role_id', this.config.relatedModel[0], 'title')
        },
        components: {
            formEdit
        },
    }

</script>
<style scoped>

</style>