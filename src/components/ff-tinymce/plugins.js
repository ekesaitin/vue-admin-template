import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'

export const plugins = 'advlist table lists paste preview fullscreen link image'
export const toolbar = [
  'undo redo | ' +
  'fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough | ' +
  'alignleft aligncenter alignright alignjustify | ' +
  'imageUpload quicklink blockquote table numlist bullist image link unlink | ' +
  'preview fullscreen',
  ''
]
