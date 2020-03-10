<template>
    <el-form 
        :model="model" 
        ref="Form" 
        label-width="100px" 
        class="demo-ruleForm formEdit"
        >
        <viewPage>
            <template v-for=" item in form__Models"> 
                <template :slot="item.position">
                    <el-form-item
                        v-if="item.type == 'file'"
                        :label="item.label"
                        :prop="item.prop"
                        :key="item.prop"
                        >
                        <el-upload
                            class="avatar-uploader"
                            :list-type="item.listType"
                            :action="item.action"
                            :data="item.data"
                            :multiple="item.multiple" 
                            :limit="item.limit"                       
                            :show-file-list="item.showFileList"
                            :auto-upload="item.autoUpload"

                            :headers="getHeader__Func"
                            :before-upload="beforeUploadFile"
                            :on-success="handleFileSuccess"
                            :on-error="handleFileError"
                            accept="image/png, image/jpeg" 
                            >
                            <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
                            <div slot="tip" class="el-upload__tip">
                                <p><span style="color:#409EFF;">* 點擊 + 上傳圖片</span></p>                                
                            </div>                            
                            <img class="avatar" v-if="model[item.prop]" :src="`${imageFolder}${model[item.prop]}`">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'image_list'"
                        :label="item.label"
                        :prop="item.prop"
                        :key="item.prop"
                        >
                        <imageList
                            :action="item.action"
                            :uploadFile="item.uploadFile"
                            :imageFolder="item.imageFolder"
                            :currentColorList="matchColor__Func"
                            :colorSelectOption="color__SelectOption"
                            >
                            </imageList>
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'colorPicker'"
                        :label="item.label" 
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"                        
                        >

                        <el-color-picker v-model.trim="model[item.prop]" show-alpha></el-color-picker> 
                        </el-form-item>

                    <el-form-item
                        v-if="item.type == 'input'"
                        :label="item.label" 
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <template v-if="item.is_goodeTypeAttr">
                            <el-input :type="item.type" v-model.trim="goodeTypeAttr[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled" @input="change($event)">
                                <template slot="append" v-if="item.popoverShow">
                                    <el-popover
                                        :placement="item.popoverPlacement"
                                        :title="item.popoverTitle"
                                        :width="item.popoverWidth"
                                        :trigger="item.popoverTrigger"
                                        :content="item.popoverContent"
                                        :popper-class="item.popoverPopperClass"
                                        :class="item.popoverClass">
                                        <el-button slot="reference" :icon="item.popoverElIcon"></el-button>
                                    </el-popover>
                                </template>
                            </el-input>
                        </template>
                        <template v-else>
                            <el-input v-if="item.isNumber" :type="item.type" v-model.number="model[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled">
                                <template slot="append" v-if="item.popoverShow">
                                    <el-popover
                                        :placement="item.popoverPlacement"
                                        :title="item.popoverTitle"
                                        :width="item.popoverWidth"
                                        :trigger="item.popoverTrigger"
                                        :content="item.popoverContent"
                                        :popper-class="item.popoverPopperClass"
                                        :class="item.popoverClass">
                                        <el-button slot="reference" :icon="item.popoverElIcon"></el-button>
                                    </el-popover>
                                </template>
                            </el-input>
                            <el-input v-else :type="item.type" v-model.trim="model[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled">
                                <template slot="append" v-if="item.popoverShow">
                                    <el-popover
                                        :placement="item.popoverPlacement"
                                        :title="item.popoverTitle"
                                        :width="item.popoverWidth"
                                        :trigger="item.popoverTrigger"
                                        :content="item.popoverContent"
                                        :popper-class="item.popoverPopperClass"
                                        :class="item.popoverClass">
                                        <el-button slot="reference" :icon="item.popoverElIcon"></el-button>
                                    </el-popover>
                                </template>
                            </el-input>
                        </template>
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'textarea'"
                        :label="item.label" 
                        :prop="item.prop"                        
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <el-input v-if="item.is_goodeTypeAttr" :type="item.type" v-model="goodeTypeAttr[item.prop]" :placeholder="item.placeholder" :disabled="showTextArea__Func" :rows="item.rows" @input="change($event)">
                        </el-input>                        
                        <el-input v-else :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder" :disabled="showTextArea__Func" :rows="item.rows">                            
                        </el-input>                        
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'select'"
                        :label="item.label" 
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <template v-if="item.is_goodeTypeAttr">
                            <el-select v-model="goodeTypeAttr[item.prop]" :placeholder="item.placeholder" @input="change($event)">
                                <template v-for="option in item.options">
                                    <el-option :label="option.label" :value="option.value" :key="option.index" :disabled="option.disabled"></el-option>
                                </template>
                            </el-select>
                        </template>
                        <template v-else>
                            <el-select v-if="item.multiple" v-model="model[item.prop]" :placeholder="item.placeholder" multiple>
                                <template v-for="option in item.options">
                                    <el-option :label="option.label" :value="option.value" :key="option.index" :disabled="option.disabled">
                                        <span v-if="item.prop === 'goods_color'" :style="`background-color:${option.color}`" class="ml-1 rounded-full px-4 text-gray-200 text-center">{{ option.label }}</span>
                                    </el-option>
                                </template>
                            </el-select>
                            <el-select v-else v-model="model[item.prop]" :placeholder="item.placeholder" @change="(value) => valueSelected(value, item.prop)" @visible-change="($event) => beforeSelected($event, item.prop)">
                                <template v-for="option in item.options">
                                    <el-option :label="option.label" :value="option.value" :key="option.index" :disabled="option.disabled"></el-option>
                                </template>
                            </el-select>
                        </template>
                        <el-popover
                            v-if="item.popoverShow"
                            :placement="item.popoverPlacement"
                            :title="item.popoverTitle"
                            :width="item.popoverWidth"
                            :trigger="item.popoverTrigger"
                            :content="item.popoverContent"
                            :popper-class="item.popoverPopperClass"
                            >
                            <span slot="reference" class="text-blue-700 text-lg ml-4 cursor-pointer">
                                <i :class="item.popoverElIcon"></i>
                            </span>
                            
                            <!-- <el-button slot="reference" :icon="item.popoverElIcon" class="text-blue-700 text-lg"></el-button> -->
                        </el-popover>
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'switch'"
                        :label="item.label"
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <el-switch
                            style="display: block"
                            class="mt-2"
                            v-model="model[item.prop]"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="item.active"
                            :inactive-value="item.inactive"
                            active-text="開啟"
                            >
                            </el-switch>

                        </el-form-item>    
                    <el-form-item
                        v-if="item.type == 'radio'"
                        :label="item.label"
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <el-radio-group v-model="model[item.prop]">
                            <el-radio v-for="option in item.options" :label="option.label" :key=" option.label" :disabled="option.disabled">{{option.title}}</el-radio>
                        </el-radio-group>

                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'card-list'"
                        :label="item.label"
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <cardList
                            :cardListData="model[item.prop]"
                            :placeholder="item.placeholder"
                            :placement="item.popoverPlacement"
                            :title="item.popoverTitle"
                            :width="item.popoverWidth"
                            :trigger="item.popoverTrigger"
                            :content="item.popoverContent"
                            :popper-class="item.popoverPopperClass"
                            :qclass="item.popoverClass"
                            :icon="item.popoverElIcon"
                            @setGoodsAttrArr="setGoodsAttrArr"
                        >
                        </cardList>

                        </el-form-item>
                    
                    <el-col :xs="6" :sm="4" :md="3"
                        v-if="item.type == 'checkbox'" 
                        :key="item.prop"
                        style="margin-bottom:10px"
                        >
                        <el-checkbox
                            v-model="model[item.prop]"
                            :border="item.border"
                            :checked="item.checked"
                            :size="item.size"
                            :rules="item.rules"
                            >{{item.label}}
                        </el-checkbox>

                        </el-col>
                    
                    <el-form-item
                        v-if="item.type == 'barcode_list'"
                        :label="item.label"
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <barCodeList
                            :colorSelectOption="color__SelectOption"
                            :currentColorList="matchColor__Func"
                            :currentAttrList="attrsHasInput__Func"
                            >
                            </barCodeList>
                        </el-form-item>
                    <div v-if="item.type == 'editor'" :key="item.prop">
                        <quillEditor                             
                            :editorData="model[item.prop]"
                            :qplaceholder="item.placeholder"
                            :maxLength="item.maxLength"
                            :action="item.action"
                            :uploadFile="item.uploadFile"
                            :imageFolder="item.imageFolder"
                            @quillEditorData="setEditorContent"
                            ref="myQuillEditor"
                            >
                        </quillEditor>
                    </div>
                    <div v-if="item.type == 'transfer'" :key="item.prop">
                        <transferList
                            :transferData="model[item.prop]"
                            @setGoodsVersion="setGoodsVersion"
                        >
                        </transferList>
                    </div>
                </template>  
            </template>
        </viewPage> 
        <div class="clearfix border-t-2">
            <div class="float-right mr-10 mt-4">
                <span>                    
                    <p class="text-xs text-gray-500 mb-2"><i class="el-icon-warning-outline"></i>&nbsp;請確認表單所有選項完整填寫後再送出</p>
                </span>
                <el-button type="primary" @click="submitForm('Form')" icon="el-icon-s-promotion">送出</el-button>
                <el-button @click="resetForm('Form')" icon="el-icon-refresh">表單重置</el-button>
            </div>
        </div>
    </el-form>
</template>

<script>
    import viewPage from '@/components/admin/form/viewPage'    
    import quillEditor from '@/components/admin/form/quillEditor'
    import cardList from '@/components/admin/form/cardList'
    import imageList from '@/components/admin/form/imageList'
    import barCodeList from '@/components/admin/form/barCodeList'
    import transferList from '@/components/admin/form/transferList'
    import notify from '@/plugins/mixins/admin/notify'
    import { showLoading, hideLoading } from '@/plugins/libs/loading'

    export default {
        mixins: [ notify ],
        data () {
            return {
                model: {                    
                    imageUrl: '',       //main image (Just one image in this page)                    
                    editor_content: '', //used by "goods" page
                    goods_attrs: [],    //used by "goods" page
                    attr_type: '',      //used by "goods_Attr" page
                    attr_id_list: [],   //used by "goods" page
                    attr_value_list: [],//used by "goods" page
                },
                //there are Temp Data not DataProp 
                goodeTypeAttr: {},  //used by "goods" page
            }
        },
        props: {
            imageFolder: { type: String, default: '' },
            serverController: { type: String, default: '' },
            form__Models: { type: Array },
            color__SelectOption: { type: Array },
        },
        computed: { 
            getHeader__Func() {  
                const uploadData = this.form__Models.filter((item) => {
                    return item.type === 'file'
                })
                if(uploadData.length > 0) { return { 'Authorization': this.$store.state.auth.token }}
                //default value
                return {}
            },
            showTextArea__Func() {
                // extend 
                //type == textarea && exist prop "attr_type"
                if(this.model.attr_type == '3') return false
                if(this.model.attr_type == '1' || this.model.attr_type == '2') return true
                //default value
                return false
            },
            matchColor__Func() {
                if(!this.$_.isUndefined(this.model.goods_color)) return this.model.goods_color
                return []
            },
            attrsHasInput__Func() {
                if(!this.$_.isUndefined(this.model.goods_attrs)) return this.model.goods_attrs
                return []
            }
        },
        mounted() {
            //_id.vue : To fetch Data first if ID is exsist after mounted 
            if(!this.$_.isEmpty(this.$route.params.id)) {
                this.fetchDetail(this.serverController, this.$route.params.id)
                .then(data =>{
                    this.model = data
                    //pass Data to parent component if usu _id.vue(edit/id) & "add page" does not exist
                    !this.$_.isEmpty(this.model.imageUrl) && this.$emit('getImageFileName', this.model.imageUrl)
                    !this.$_.isEmpty(this.model.goods_Cate) && this.$emit('getGoodsCateId', this.model.goods_Cate)
                    !this.$_.isEmpty(this.model.article_Cate) && this.$emit('getArticleCateId', this.model.article_Cate)
                    //extend init goodeTypeAttr in factory_Goods page
                    this.initGoodeTypeAttrModel(data)                    
                })
                .catch( err =>{
                    this.$message.error('500 服務器錯誤!, 數據導入失敗!');
                })
            }
            //_id.vue : To fetch Data first if ID is exsist after mounted 
            if(!this.$_.isEmpty(this.$route.params.attrId)) {
                this.fetchDetail(this.serverController, this.$route.params.attrId)
                .then(data =>{
                    this.model = data
                    //pass Data to parent component
                    !this.$_.isEmpty(this.model.imageUrl) && this.$emit('getImageFileName', this.model.imageUrl)                    
                })
                .catch( err =>{
                    this.$message.error('500 服務器錯誤!, 數據導入失敗!');
                })
            } 
        },
        methods: {
            // fetch Data from serverController after mounted
            async fetchDetail(serverController, id) { 
                try {
                    const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/${serverController}/${id}`)
                    if(!this.$_.isEmpty(res)) {
                        return res.data
                    }
                    res.resCode == 90500 && await this.notifyFunc(res.resCode)                    
                }               
                catch(err) {
                    this.$message({                        
                        message: '發生不明的錯誤,請聯絡管理員!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
            }, 
            //submit Form After validate Func
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //if goodeTypeAttr obj is not null let keys of obj write in [attr_id_list] && values of obj write in [attr_value_list]
                        if(Object.keys(this.goodeTypeAttr).length > 0) {
                            this.model.attr_id_list = Object.keys(this.goodeTypeAttr)
                            //escape value Array
                            this.model.attr_value_list = Object.values(this.goodeTypeAttr).map((item) => {                                
                                return item = this.$_.escape(item)
                            })
                        }
                        //pass Data to parent component
                        this.$emit('editData', this.model);
                    } else {
                        this.$notify({
                            message: '尚有表單未完成填寫!!',
                            type: 'error',
                            customClass: 'bg-red-200'
                        })
                        return false;
                    }
                });
            },
            //reset all input data in this component
            resetForm(formName) {                
                this.clearGoodeTypeAttr()
                //remove extra form if page includes dynamic form
                this.$emit('deleteDynamicForm');
                this.$refs[formName].resetFields()
            },
            clearGoodeTypeAttr() {
                if(Object.keys(this.goodeTypeAttr).length > 0) {
                    for (const prop of Object.getOwnPropertyNames(this.goodeTypeAttr)) {
                        delete this.goodeTypeAttr[prop];
                    }
                }                
            },                    
            beforeUploadFile(file) { 
                /**
                 * @desc element-ui el-upload component hook
                 * **Do not use async function important!!**
                 * @param file is a promise & need to return after imgCpmpress for next step function 
                 */
                showLoading()
                const isIMAGE = file.type === 'image/jpeg'||'image/png'
                const maxSize = 500000 //500kb
                if(file.size > maxSize) {
                    hideLoading()
                    this.$notify({
                        title: 'Info',
                        type: 'warning',
                        message: '圖片最大不能超過 500kb',
                        customClass: 'bg-yellow-200'
                    })                    
                    return false
                }
                if(!isIMAGE) {
                    hideLoading()
                    this.$notify({
                        title: 'Info',
                        type: 'warning',
                        message: '只能是JPG 或 PNG 格式',
                        customClass: 'bg-yellow-200'
                    })                    
                    return false
                }                
                /**
                * imageCompress(file, maxSizeMB, maxWidthOrHeight)
                * @param {*} file a bold in promise 
                * @param {*} maxSizeMB the sizeMB of file after cpmpressing (Number/mb default:0.1)
                * @param {*} maxWidthOrHeight that will be resized maxWidthOrHeight (Number/px default:300) 
                 */
                                
                return file = this.$imgCompress(file)
            },
            handleFileSuccess(res) {
                /**
                 * @desc element-ui el-upload component hook
                 * **Do not use async function important!!**
                 */
                hideLoading()
                this.model['imageUrl'] = res.file.url             
            },
            handleFileError(err) {
                /**
                 * @desc element-ui el-upload component hook
                 * **Do not use async function important!!**
                 */
                hideLoading()
                this.$notify({
                    title: 'Info',
                    type: 'error',
                    message: '沒有權限!',
                    customClass: 'bg-red-200'
                })
            },
            beforeSelected($event, prop) {
                //option is opened
                if($event === true && prop === 'goodsType_id') alert('變更商品類別將會清空下列已輸入資訊, 是否繼續?')
            },
            valueSelected(value, prop){ 
                //pass Data to parent component
                this.$emit('selectValueChanged', value, prop)
            },            
            setEditorContent(html) {
                this.model.editor_content = html
            },            
            setGoodsAttrArr(GoodsAttrArr) {
                this.model.goods_attrs = GoodsAttrArr
            },
            setGoodsVersion(GoodsVersionArr) {
                this.model.goods_version = GoodsVersionArr
            },
            initGoodeTypeAttrModel(data) {
                let keys = []
                let values = []
                if(!this.$_.isUndefined(data.attr_value_list) && !this.$_.isEmpty(data.attr_value_list)) {
                    keys = data.attr_id_list
                    values = data.attr_value_list
                    let result = values.reduce((result, filed, index) => {
                        result[keys[index]] = filed
                        return result
                    },{})
                    this.$emit('renderGoodsTypeAttr', data.goodsType_id)
                    return this.goodeTypeAttr = result
                }
            },
            //強制刷新
            change(value) {
                this.$forceUpdate()
            },
            handleNodeClick(data) {
                console.log(data);
            }           
        },
        components: {
            viewPage,
            quillEditor,
            imageList,
            cardList,
            barCodeList,
            transferList
        }
    }    
</script>

<style>
.formEdit .avatar-uploader .el-upload {
    
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.formEdit .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.formEdit .avatar-uploader-icon {
    border: 1px dashed #000;
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}
.formEdit .avatar {
    width: 108px;
    height: 108px;
    display: block;
}
.formEdit .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.formEdit .el-form-item__content .el-tree .el-tree-node .el-tree-node__content {
    height: 50px !important
}
.formEdit .el-form-item .el-form-item__label {
    border-bottom: 1px solid #959595;
}
</style>