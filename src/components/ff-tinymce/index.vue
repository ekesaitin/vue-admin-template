<template>
  <editor id="tinymceEditor" :init="init" v-model="content"></editor>
</template>

<script>
/**
 * 必须参数
 * @param {string} value 富文本内容, 也可用v-model
 * @param {number} height 富文本框高度
 * @param {boolean} menubar 是否显示最上方menu
 * @param {boolean} statusbar 是否显示编辑器底部的状态栏
 * @function input 富文本内容变化时触发
 * */
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import { plugins, toolbar } from './plugins'
export default {
  name: 'FfTinymce',
  components: { Editor },
  props: {
    height: {
      type: Number,
      default: 600
    },
    value: {
      type: String,
      default: ''
    },
    menubar: {
      type: Boolean,
      default: true
    },
    statusbar: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      init: {
        skin_url: '/tinymce/skins/ui/oxide',
        language_url: `/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        height: this.height,
        browser_spellcheck: true, // 拼写检查
        branding: false, // 水印
        statusbar: this.statusbar, // 编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        menubar: this.menubar, // 最上方menu
        fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt',
        plugins,
        toolbar,
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      }
    }
  },
  computed: {
    content: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  mounted () {
    tinymce.init({})
  }
}
</script>

<style scoped>
</style>
