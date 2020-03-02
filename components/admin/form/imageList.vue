<template>
    <div class="imageList" >
        <el-upload            
            :action="action"
            list-type="picture-card"
            :limit="10"
            :auto-upload="true"
            :data="{ uploadFile }"
            :headers="getHeader__Func"

            :file-list="imageDataForElUpload"

            :before-upload="beforeUploadFile"
            :on-success="handleFileSuccess"
            :on-error="handleFileError"            
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            accept="image/png, image/jpeg"
            >
            <i slot="default" class="el-icon-camera"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" :alt="file.name">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
                <el-select v-model="color[file.uid]" placeholder="請選擇對應顏色" @focus="checkOptionAndIsRepeat" @change="(value)=>{ ajaxUploadColor( value, file.uid) }">
                    <el-option
                        v-for="item in colorOption__Func"
                        :key="item._id"
                        :value="item._id"
                        :label="item.label"
                        >
                        <span :style="`background-color:${item.color}`" class="ml-1 rounded-full px-4 text-gray-200 text-center">{{ item.label }}</span>
                    </el-option>
                </el-select>
            </div>           
        </el-upload>
        
        <el-dialog :visible.sync="elDialog.dialogVisible">
            <img width="100%" :src="elDialog.dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import deleteImg from '@/plugins/mixins/admin/deleteImg'
    import notify from '@/plugins/mixins/admin/notify'
    import { showLoading, hideLoading } from '@/plugins/libs/loading'

    export default {
        mixins: [ deleteImg, notify ],
        props: {            
            action: { type: String, default: '' },
            uploadFile: { type: String, default: '' },
            imageFolder: { type: String, default: '' },
            currentColorList: { type: Array }, //colors are choosed 
            colorSelectOption: { type: Array },//All color SelectOption 
        },
        data () {
            return {
                elDialog :{
                    dialogImageUrl: '',
                    dialogVisible: false
                },
                disabled: false,// toggle to remove image in el-upload
                /**
                 * @desc for el-upload file-list, "file.url format" of slot-scope="{file} is "http://....jpeg"
                 * but we just need "uploadFile" to extend in the future ,so make Array just for el-upload file-list is "imageDataForElUpload" to show images & "imageList" is origin data From db
                 */
                imageList:[],
                imageDataForElUpload: [],
                /**
                 * 
                 */
                color:{},
                colorHasSelected: [],
            };
        },
        created() {
            this.getImageFiles()
        },
        computed: {
            getHeader__Func() {
                if(this.$store.state.auth.is_super === true || this.$store.state.auth.memOnly === true) { 
                    return { 'Authorization': this.$store.state.auth.token }
                }                
                return {}
            },
            /*** @desc let colorOption equal current ColorList*/
            colorOption__Func () {
                let arr = []
                if(!this.$_.isEmpty(this.currentColorList)) {
                    arr = this.colorSelectOption.filter((item) => {
                        return (this.currentColorList.indexOf(item._id) != -1)
                    })
                }
                return arr
            },
        },
        methods: {
            /**@desc get All Imagescurrent goods_id*/
            async getImageFiles() {
                try {
                    const res = await this.$axios.$get(`${process.env.EGG_API_URL}/admin/common/GoodsImage/goods_id/${this.$route.params.id}`)
                    if(!this.$_.isEmpty(res)) {
                        this.imageList = res.data
                        this.imageDataForElUpload = this.initDataForElUpload(this.imageList)
                        this.color = this.initColorInModel(this.imageList)
                        return 
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
            /*** @desc add "imageFolder" + file.url to show images in el-upload component*/
            initDataForElUpload (array) {
                if(array.length > 0) {                
                    array.forEach((item) => {
                        if(!item.url.startsWith(this.imageFolder)) {
                            item.url = this.imageFolder + item.url
                        }
                    })
                }
                return array
            },
            initColorInModel (array) {
                let keys = []
                let values = []
                array.forEach((item) => { 
                    keys.push(item.uid)
                    values.push(item.color_id)
                })
                let result = values.reduce((result, filed, index) => {
                    result[keys[index]] = filed
                    return result
                },{})
                return result
                //console.log(result)
            },
            async ajaxUploadImage(data) {
                try {
                    const res = await this.$axios.$post(`${process.env.EGG_API_URL}/admin/common/GoodsImage`, data)                    
                }catch(err) {
                    this.$message({                        
                        message: '發生不明的錯誤,請聯絡管理員!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }                
            },
            async ajaxDeleteImage(field, value) {
                try{
                    const res = await this.$axios.$delete(`${process.env.EGG_API_URL}/admin/common/GoodsImage/${field}/${value}`)                    
                }catch(err) {
                    this.$message({                        
                        message: '發生不明的錯誤,請聯絡管理員!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
            },
            async ajaxUploadColor(value, uid) {
                const count = Object.values(this.color).filter((item) => {
                    return item == value
                })
                if(count.length > 1) {
                    this.$notify({
                        message: '一個顏色,只能對應一張圖片!!',
                        type: 'warning',
                        customClass: 'bg-yellow-200'
                    })
                    try{
                        const res = await this.$axios.$put(`${process.env.EGG_API_URL}/admin/common/GoodsImage/uid/${uid}`, { color_id: '' })
                        
                    }catch(err) {
                        this.$message({                        
                            message: '發生不明的錯誤,請聯絡管理員!!',
                            type: 'error',
                            customClass: 'bg-red-200'
                        })
                    }
                    return this.color[uid] = ''
                }

                try{
                    const res = await this.$axios.$put(`${process.env.EGG_API_URL}/admin/common/GoodsImage/uid/${uid}`, { color_id: value })
                    
                }catch(err) {
                    this.$message({                        
                        message: '發生不明的錯誤,請聯絡管理員!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
            },
            checkOptionAndIsRepeat() {
                if(this.$_.isEmpty(this.currentColorList)) {
                    this.$notify({
                        title: '尚未選擇商品顏色!!',
                        message: '如果只有單一商品顏色,或無須對應,此設定可以忽略',
                        type: 'warning',
                        customClass: 'bg-yellow-200'
                    })
                    return
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
            handleFileSuccess(res, file, fileList) {
                /**
                 * @desc element-ui el-upload component hook
                 * **Do not use async function important!!**
                 */
                hideLoading()                
                // for showing images && path is necessary if u want to DeleteImg 
                this.imageDataForElUpload.push({uid: file.uid, name: file.name, url: this.imageFolder + res.file.url, delPath: res.file.url})
                this.$set(this.color, file.uid.toString(), '')
                
                const data = {
                    goods_id: this.$route.params.id,
                    uid: file.uid,
                    name: file.name,
                    url: res.file.url,
                    delPath: res.file.url
                }
                this.ajaxUploadImage(data)
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
                    message: '瀏覽器不明錯誤!',
                    customClass: 'bg-red-200'
                })
            },
            handleRemove(file, fileList) {
                // To find file & delete image by using file.uid
                for(let i in this.imageDataForElUpload) {
                    if(this.imageDataForElUpload[i].uid == file.uid) {
                        // To delete image from nuxt Server Static Folder
                        this.deletImg(this.imageDataForElUpload[i].delPath)
                        // Remove data From imageDataForElUpload
                        this.imageDataForElUpload.splice(i, 1)                        
                        break
                    }
                }
                this.ajaxDeleteImage('uid', file.uid)
            },
            handlePictureCardPreview(file) {
                this.elDialog.dialogImageUrl = file.url;
                this.elDialog.dialogVisible = true;
            },
            handleExceed(files, fileList) {
                alert("最多只能10張圖!")
            },            
        },
    }

</script>
<style scoped>

</style>