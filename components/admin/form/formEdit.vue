<template>
    <el-form 
        :model="model" 
        ref="Form" 
        label-width="100px" 
        class="demo-ruleForm"
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
                        <el-input v-if="item.is_goodeTypeAttr" :type="item.type" v-model.trim="goodeTypeAttr[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled" @input="change($event)"></el-input>
                        <el-input v-else :type="item.type" v-model.trim="model[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
                        
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'textarea'"
                        :label="item.label" 
                        :prop="item.prop"
                        :rows="item.rows"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <el-input v-if="item.is_goodeTypeAttr" :type="item.type" v-model="goodeTypeAttr[item.prop]" :placeholder="item.placeholder" :disabled="showTextArea__Func" @input="change($event)"></el-input>

                        <el-input v-else :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder" :disabled="showTextArea__Func"></el-input>

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
                                    <el-option :label="option.label" :value="option.value" :key="option.index" :disabled="option.disabled"></el-option>
                                </template>
                            </el-select>
                            <el-select v-else v-model="model[item.prop]" :placeholder="item.placeholder" @change="valueSelected">
                                <template v-for="option in item.options">
                                    <el-option :label="option.label" :value="option.value" :key="option.index" :disabled="option.disabled"></el-option>
                                </template>
                            </el-select>
                        </template>
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
                        v-if="item.type == 'editor'"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <quillEditor                             
                            :editorData="model[item.prop]"
                            :qplaceholder="item.placeholder"
                            :action="item.action"
                            :uploadFile="item.uploadFile"
                            :imageFolder="item.imageFolder"
                            @quillEditorData="setGoodsContent"
                            ref="myQuillEditor" />
                        </el-form-item>
                </template>  
            </template>
        </viewPage>    
        <el-form-item>
            <el-button type="primary" @click="submitForm('Form')">{{ $route.params.id || $route.params.attrId ? `編輯` : `新增`}}</el-button>
            <el-button @click="resetForm('Form')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import viewPage from '@/components/admin/form/viewPage'    
    import quillEditor from '@/components/admin/form/quillEditor'
    import notify from '@/plugins/mixins/admin/notify'
    import { showLoading, hideLoading } from '@/plugins/libs/loading'

    export default {
        mixins: [ notify ],
        data () {
            return {
                model: {                    
                    imageUrl: '',
                    goods_content: '',
                    goods_content_images: [],
                    attr_type: '',
                    attr_id_list: [],
                    attr_value_list: []
                },               
                goodeTypeAttr: {},                
            }
        },
        props: {
            imageFolder: { type: String, default: '' },
            serverController: { type: String, default: '' },
            form__Models: { type: Array, default: [] },
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
        },
        mounted() {
            //_id.vue : To fetch Data first if ID is exsist after mounted 
            if(!this.$_.isEmpty(this.$route.params.id)) {
                this.fetchDetail(this.serverController, this.$route.params.id)
                .then(data =>{
                    this.model = data
                    //pass Data to parent component
                    !this.$_.isEmpty(this.model.imageUrl) && this.$emit('getImageFileName', this.model.imageUrl)                    
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
            //submit Form After validate Func
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //if goodeTypeAttr obj is not null let keys of obj write in [attr_id_list] && values of obj write in [attr_value_list]
                        if(Object.keys(this.goodeTypeAttr).length !== 0) {
                            this.attr_id_list = Object.keys(this.goodeTypeAttr)
                            this.attr_value_list = Object.values(this.goodeTypeAttr)
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
                if(Object.keys(this.goodeTypeAttr).length !== 0) {
                    for (const prop of Object.getOwnPropertyNames(this.goodeTypeAttr)) {
                        delete this.goodeTypeAttr[prop];
                    }
                }                
            },
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
            async valueSelected(value){                
                //pass Data to parent component
                this.$emit('selectValueChanged', value);
            },
            setGoodsContent(html) {
                this.model.goods_content = html
            },
            setGoodsContentImages(url) {
                this.model.goods_content_images.push(url)
            },
            //強制刷新
            change(e) {
                this.$forceUpdate()
            }
            
        },
        components: {
            viewPage,
            quillEditor,
        }
    }    
</script>

<style scoped>
.avatar-uploader .el-upload {
    
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    border: 1px dashed #000;
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}
.avatar {
    width: 108px;
    height: 108px;
    display: block;
}
</style>