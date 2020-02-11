import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'

import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)

Vue.use(VueQuillEditor)