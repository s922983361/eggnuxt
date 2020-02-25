/**
 * @desc quill editor
 * Doc https://quilljs.com/docs/quickstart/
 */

import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'

import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module'
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

let Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '16px', '20px', '26px', '32px']
Quill.register(Size, true)

var fonts = ['Lato', 'Noto-Sans-TC', 'Noto-Serif-TC', 'Playfair-Display', 'sans-serif']
var Font = Quill.import('formats/font')
Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)

Vue.use(VueQuillEditor)