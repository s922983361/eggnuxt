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
                    pageTitle: '商品顏色',
                    serverController: 'goodsColor',
                    //relatedController: ['Role'],
                    afterSavePushTo: 'goods_Colors',//路由名稱
                    uploadImage: false,
                },

                formModels: [
                    {                        
                        label: '顏色名稱:',
                        prop: 'name',
                        type: 'input',
                        placeholder: '輸入商品分類名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '分類名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '選擇顏色:',
                        prop: 'value',
                        type: 'colorPicker',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '顏色的值必須輸入', trigger: 'blur' },
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
            //this.getSelectList('role_id', this.config.relatedController[0], 'title')
        },
        components: {
            formEdit
        },
    }

</script>
<style scoped>

</style>