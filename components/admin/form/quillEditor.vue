<template>    
    <section class="editor_container">
        <el-upload
            v-show="elUpload.display"
            id="quillEditor"

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

        <el-dialog 
            :visible.sync="elDialog.dialogVisible"
            width="70%"
            >
            <div 
                class="ql-editor"
                v-html="$_.isEmpty(qcontent)? '尚未輸入內容': qcontent">
                </div>
            <span slot="footer" class="dialog-footer">                
                <el-button type="primary" @click="elDialog.dialogVisible = false">確定</el-button>
            </span>
        </el-dialog>
        <el-button type="text" @click="elDialog.dialogVisible = true" icon="el-icon-view">預覽</el-button>
        
        <div class="quill-editor" 
            :style="{ height: quillEditorHeight + 'px' }"
            :content="editorContent"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption">
        </div>
        <div :style="countHeightStyle" v-if="countHeightStyle" class="cfpa-quill-wordCount">
            <div class="cfpa-quill-wordCount-text">當前已經輸入<span style="color: red">{{contentLength}}</span>個字符</div>
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
            editorHeight: { type: Number, default: 1000 },
            qplaceholder: { type: String, default: '' },
            action: { type: String, default: '' },
            uploadFile: { type: String, default: '' },
            imageFolder: { type: String, default: '' },
            maxLength: { type: Number, default: 2000 },
        },       
        data () {
            return {
                elUpload: {
                    display: false,
                },
                elDialog: {
                    dialogVisible: false,
                    disabled: false,
                },

                quillEditorHeight: 0,//總高度
                qcontent: '',//內容
                placeholder: this.qplaceholder,
                contentLength: 0,//總字符數
                countHeightStyle: {},//記字器的高度

                allImgPaths: [],//編輯器內所有圖片的path
                currentImgPaths:[],//刪除後當下編輯器圖片的path

                //Doc See https://quilljs.com/docs/quickstart/
                editorOption: {
                    bounds: 'app',
                    theme: 'snow',
                    placeholder: '',
                    modules: { 
                        imageDrop: true,
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
                                        if(this.allImgPaths.length > 5) {
                                            this.$notify({
                                                title: 'Info',
                                                type: 'warning',
                                                message: '最多只能上傳5張圖片!',
                                                customClass: 'bg-yellow-200'
                                            })
                                            return this.myQuillEditor.format('image', false)
                                        }
                                        // 觸發input框選擇圖片文件
                                        return document.querySelector('#quillEditor input').click()             
                                    }
                                    return this.myQuillEditor.format('image', false)
                                },
                                'link': (value) => {
                                    if (value) {
                                        const href = prompt('輸入連結網址:')
                                        this.myQuillEditor.format('link', href)
                                    } else {
                                        this.myQuillEditor.format('link', false)
                                    }
                                },
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
                                /**對齊格式 */
                                [{ align: [] }],
                                /**清除文本格式 */
                                ["clean"],
                                /**超連接link 圖片image 視頻video*/
                                ["link", "image", "video"],
                                /**上標 下標 */
                                [{ script: "sub" }, { script: "super" }],
                                /**引用 代碼塊 */
                                ['blockquote', 'code-block'],
                                // 标题，键值对的形式；1、2表示字体大小
                                [{ 'header': 1 }, { 'header': 2 }],
                                /**字體種類 */
                                [{ font: ['Lato', 'Noto-Sans-TC', 'Noto-Serif-TC', 'Playfair-Display', false] }],
                                /**字體大小 */
                                //[{ size: ["small", false, "large", "huge"] }],
                                [{ size: ['10px', false, '16px', '20px', '26px', '32px'] }],
                                /**標題 */
                                [{ header: [1, 2, 3, 4, false] }],
                            ]
                        }
                    }
                }
            };
        },
        created() {
            //initial allImgPaths Array & currentImgPaths Array            
            this.getEditorImgArray()
            this.quillEditorHeight = document.body.clientHeight - this.editorHeight
        },
        mounted() {
            //countHeight equal toolbarHeight
            let toolbar = document.querySelector('div.ql-toolbar.ql-snow')
            if (toolbar) {
                let toolbarHeight = toolbar.offsetHeight
                this.countHeightStyle = { 'top': `${toolbarHeight}px` }
                return
            }
            this.countHeightStyle = {'top': '42px'}
        },
        computed: {
            getHeader__Func() {
                if(this.$store.state.auth.is_super === true || this.$store.state.auth.memOnly === true) { 
                    return { 'Authorization': this.$store.state.auth.token }
                }                
                return {}
            },
            editorContent() {
                return this.qcontent = this.editorData
            }
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
            onEditorChange({quill, html, text}) {
                this.contentLength = !this.$_.isUndefined(text) ? this.$helper.Trim(text).length : 0

                if(this.contentLength == (this.maxLength) * 0.8 || this.contentLength == (this.maxLength) * 0.85 || this.contentLength == (this.maxLength) * 0.9 || this.contentLength == (this.maxLength) * 0.95) {
                    this.$notify({
                        title: 'Info',
                        type: 'warning',
                        message: `最多只可輸入 '${this.maxLength}' 字 `,
                        customClass: 'bg-yellow-200'
                    })
                }
                if(this.contentLength > this.maxLength) {
                    this.$notify({
                        title: 'Info',
                        type: 'warning',
                        message: `可輸入字數已達上限 `,
                        customClass: 'bg-yellow-200'
                    })
                    return quill.enable(true)
                }
                
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
                    //Use array_Minus to  get image path between allImgPaths Array & currentImgPaths Array, return "Array"
                    let imgPath = this.$helper.array_Minus(this.allImgPaths, this.currentImgPaths) 
                    /** there is BUG here it is necessary to check "imgPath exsit"*/                   
                    if(!this.$_.isEmpty(imgPath)) {
                        this.deletImg(this.$_.toString(imgPath))
                    }
                }
                // let length of allImgPaths Array equal length of currentImgPaths Array
                this.allImgPaths = this.currentImgPaths
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
<style>/***Dont scoped Here **/
       /***Dont scoped Here **/
       /***Dont scoped Here **/
    .editor_container {
        width: 100%;
        margin: 0 auto;
        padding: 10px 0;
    }    
    .editor_container .quill-editor {
        max-width: 100vw;        
        min-height: 200px;
        max-height: 500px;
        overflow-y: auto;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: "12px";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
        content: "10px";
    }    
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
        content: "16px";
    }    
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
        content: "20px";
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="26px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="26px"]::before {
        content: "26px";
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
        content: "32px";
    }


    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: "文本";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: "標題一";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: "標題二";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: "標題三";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: "標題四";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: "標題五";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: "標準字體";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Lato"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Lato"]::before {
        content: "Lato";
        font-family: 'Lato';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Noto-Sans-TC"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Noto-Sans-TC"]::before {
        content: "黑體";
        font-family: "Noto Sans TC";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Noto-Serif-TC"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Noto-Serif-TC"]::before {
        content: "宋體";
        font-family: "Noto Serif TC";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Playfair-Display"]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Playfair-Display"]::before {
        content: "Playfair-Display";
        font-family: "Playfair Display";
    }
    .ql-font-Lato {
        font-family: "Lato";
    }
    .ql-font-Noto-Sans-TC {
        font-family: "Noto Sans TC";
    }
    .ql-font-Noto-Serif-TC {
        font-family: "Noto Serif TC";
    }
    .ql-font-Playfair-Display {
        font-family: "Playfair Display";
    }
    .ql-font-sans-serif {
        font-family: "sans-serif";
    }
    .cfpa-quill-wordCount {
        background-color: #ffffff;
        position: relative;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        line-height: 20px;
        font-size: 12px;
    }
    .cfpa-quill-wordCount .cfpa-quill-wordCount-text{
        text-align: right;
        margin-right: 10px;
        color: #aaa;
    }
    
</style>