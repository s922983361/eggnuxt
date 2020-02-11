<template>    
    <section class="container">
        <el-upload
            v-show="elUpload.display"
            class="avatar-uploader"

            :action="action"
            :limit="5"
            :auto-upload="true"
            :data="{ uploadFile }"
            :headers="getHeader__Func"
            :before-upload="beforeUploadFile"
            :on-success="handleFileSuccess"
            :on-error="handleFileError"
            accept="image/png, image/jpeg" 
            >            
            <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <div class="quill-editor"            
            :content="qcontent"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption">
        </div>
    </section>
</template>

<script>
    /** require styles */
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    
    //import notify from '@/plugins/mixins/admin/notify'
    import deleteImg from '@/plugins/mixins/admin/deleteImg'
    import { showLoading, hideLoading } from '@/plugins/libs/loading'
    export default {
        mixins: [ deleteImg ], 
        props: {
            editorData: { type: String, default: '' },
            qplaceholder: { type: String, default: '' },
            action: { type: String, default: '' },
            uploadFile: { type: String, default: '' },
            imageFolder: { type: String, default: '' },
        },       
        data () {
            return {
                elUpload: {
                    display: false,
                },
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,

                qcontent: this.editorData,
                placeholder: this.qplaceholder,

                allImgPaths: [],//編輯器內所有圖片的path
                currentImgPaths:[],//刪除後當下編輯器圖片的path
                editorOption: {
                    bounds: 'app',
                    theme: 'snow',
                    placeholder: '',
                    modules: {                        
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'red',
                                color: 'white'
                                // other camelCase styles for size display
                            },                            
                            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                        },
                        toolbar: {
                            handlers: {
                                'image': () => { 
                                    if (this.$store.state.auth.is_super === true || this.$store.state.auth.memOnly === true) {
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click()             
                                    } else {
                                        this.myQuillEditor.format('image', false)
                                    }
                                }
                            },
                            container: [
                                /**粗體 斜體 下划線 刪除線 */
                                ['bold', 'italic', 'underline', 'strike'],
                                /**有序 無序列表 */
                                [{ list: "ordered" }, { list: "bullet" }], 
                                /**縮進 */
                                [{ indent: "-1" }, { indent: "+1" }],
                                /**文本方向 */
                                [{'direction': 'rtl'}],
                                /**字體顏色 字體背景顏色 */
                                [{ color: [] }, { background: [] }],
                                /**字體種類 */
                                //[{ font: [] }],
                                /**對齊格式 */
                                [{ align: [] }],
                                /**清除文本格式 */
                                ["clean"],
                                /**超連接 圖片 */
                                ["link", "image"],
                                /**上標 下標 */
                                [{ script: "sub" }, { script: "super" }],
                                /**引用 代碼塊 */
                                ['blockquote', 'code-block'],
                                /**字體大小 */
                                [{ size: ["small", false, "large", "huge"] }],
                                /**標題 */
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ]
                        }
                    }
                }
            };
        },
        created() {
            //initial allImgPaths Array & currentImgPaths Array
            this.getEditorImgArray()
        },
        computed: {
            getHeader__Func() {
                if(this.$store.state.auth.is_super === true || this.$store.state.auth.memOnly === true) { 
                    return { 'Authorization': this.$store.state.auth.token }
                }                
                return {}
            },           
        },
        methods: {
            /******************************************Edit callback functions *********************/
            onEditorBlur(editor) {
            },
            onEditorFocus(editor) {
                //access deny
                if(this.$store.state.auth.is_super === true || this.$store.state.auth.memOnly === true) {
                    return editor.enable(true)                    
                }
                this.$notify({
                    title: 'Info',
                    type: 'error',
                    message: '沒有權限,無法使用此操作功能!',
                    customClass: 'bg-red-200'
                })
                editor.enable(false)
            },
            onEditorReady(editor) {
            },
            onEditorChange({ editor, html, text }) {
                //listen image is need to delete?
                this.removeImg(html)
                this.qcontent = html
                this.$emit('quillEditorData', this.qcontent)
            },
            /******************************************El upload callback functions *********************/
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
                
                let imageUrl = this.imageFolder + res.file.url
                //get cursor position in editor
                let length = this.myQuillEditor.getSelection().index
                // insert image Path in <img.src> of editor
                this.myQuillEditor.insertEmbed(length, 'image', imageUrl)
                // make cursor position + 1
                this.myQuillEditor.setSelection(length + 1)
                //Insert image Path to allImgPaths Array
                this.allImgPaths.push(res.file.url)
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
            /******************************************other function *********************/
            /**
             * @desc 'Sync' delete image in editor             * 
             * 1.create Element & set HTML in this Element DIV
             * 2.use getElementsByTagName to Find All images 
             * 3.handle src of <img> tag in "currentImgPaths array"
             * 4.listen image is need to delete?
             * 5.if need to delete Use array_Minus to  get image path between allImgPaths Array & currentImgPaths Array
             * 6.let length of allImgPaths Array equal length of currentImgPaths Array
             */
            removeImg(html) {
                //create Element & set HTML in this Element DIV
                let dom = document.createElement('DIV')
                dom.innerHTML = html
                //use getElementsByTagName to Find All images 
                const imgDom = dom.getElementsByTagName('img')
                const url = this.imageFolder
                const arr= []
                for (let i = 0; i < imgDom.length; i++) {
                    //handle src of <img> tag in "currentImgPaths array"
                    if (imgDom[i].src.indexOf(url) > -1) {
                        let path = imgDom[i].src.substring(url.length)
                        arr.push(path)
                    }                    
                }
                this.currentImgPaths = arr
                // listen image is need to delete?
                let hasImgToDelete = (this.allImgPaths.length - this.currentImgPaths.length) > 0                
                if(hasImgToDelete) {
                    //Use array_Minus to  get image path between allImgPaths Array & currentImgPaths Array
                    let imgPath = this.$helper.array_Minus(this.allImgPaths, this.currentImgPaths)                    
                    this.deletImg(imgPath)
                    // let length of allImgPaths Array equal length of currentImgPaths Array
                    this.allImgPaths = this.currentImgPaths
                }
            },
            //initial allImgPaths Array & currentImgPaths Array
            getEditorImgArray() {
                if(!this.$_.isEmpty(this.$route.params.id)) {
                    //create Element & set HTML in this Element DIV
                    let dom = document.createElement('DIV')
                    dom.innerHTML = this.qcontent
                    //use getElementsByTagName to Find All images 
                    const imgDom = dom.getElementsByTagName('img')
                    const url = this.imageFolder
                    const arr= []
                    for (let i = 0; i < imgDom.length; i++) {
                        //handle src of <img> tag in "currentImgPaths array"
                        if (imgDom[i].src.indexOf(url) > -1) {
                            let path = imgDom[i].src.substring(url.length)
                            arr.push(path)
                        }                    
                    }
                    return this.allImgPaths = this.currentImgPaths = arr
                }
            }
        },
    }

</script>
<style scoped>
    .container {
        width: 100%;
        margin: 0 auto;
        padding: 50px 0;
    }    
    .container .quill-editor {
        min-height: 200px;
        max-height: 500px;
        overflow-y: auto;
    }
    
</style>