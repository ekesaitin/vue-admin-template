<template>
  <el-dialog
    v-bind.sync="dialogProps"
    v-on="dialogEvents"
    class="form-dialog"
    :title="_title"
    :visible.sync="_visible"
    :before-close="beforeClose"
    @opened="dialogOpened"
    @closed="dialogClosed"
  >
    <ff-form
      v-bind="formProps"
      v-on="formEvents"
      ref="form"
      :model="model"
      :disabled="type === 3"
      :cancel="_cancel"
      :confirm="_confirm"
      @model-change="modelChange"
      @cancel="handleCancel"
    >
      <template v-for="(h, scopedSlot) in $scopedSlots" #[scopedSlot]="scope">
        <slot v-bind="scope" :name="scopedSlot"></slot>
      </template>
    </ff-form>
  </el-dialog>
</template>

<script>
// Dialog 对话框属性名
const dialogPropKeys = ['visible', 'title', 'width', 'fullscreen', 'top', 'modal', 'modal-append-to-body', 'append-to-body', 'ock-scro', 'custom-class', 'close-on-click-modal', 'Close-on-press-escape', 'show-close', 'center', 'destroy-on-close', 'before-close']
// Dialog 对话框事件名
const dialogEventKeys = ['open', 'opened', 'close', 'closed']

export default {
  name: 'FormDialog',
  props: {
    // 标题
    title: String,
    // 表单操作类型，仅用来更改弹窗标题 1:新增； 2:编辑； 3:查看
    type: Number,
    // 表单数据
    model: {
      type: Object,
      required: true
    },
    // 是否显示dialog
    visible: Boolean,
    // 初始表单数据
    initialModel: Object,
    // 是否显示取消按钮
    cancel: {
      type: Boolean,
      default: true
    },
    // 是否显示确定按钮
    confirm: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      // 关闭前是否提示保存
      prompt: false,
      // 表单初始值
      _initialModel: {},
      _cancel: true,
      _confirm: true,
    }
  },
  computed: {
    // dialog标题
    _title () {
      let prefix = ''
      switch (this.type) {
        case 1:
          prefix = '新增'
          break;
        case 2:
          prefix = '编辑'
          break;
        case 3:
          prefix = '查看'
          break;
      }
      return prefix + this.title
    },
    // 是否显示dialog
    _visible: {
      get () {
        return this.visible
      },
      set (v) {
        this.$emit('update:visible', v)
      }
    },
    // Dialog 对话框属性
    dialogProps () {
      return this.pick(this.allProps, dialogPropKeys)
    },
    // Dialog 对话框事件
    dialogEvents () {
      return this.pick(this.$listeners, dialogEventKeys)
    },
    // ff-form 属性
    formProps () {
      return this.omit(this.allProps, dialogPropKeys)
    },
    // ff-form 事件
    formEvents () {
      return this.omit(this.$listeners, dialogEventKeys)
    }
  },
  watch: {
    cancel: {
      handler (b) {
        this._cancel = b
      },
      immediate: true
    },
    confirm: {
      handler (b) {
        this._confirm = b
      },
      immediate: true
    },
    type: {
      handler (t) {
        switch (t) {
          case 1:
          case 2:
            this._confirm = true
            this._cancel = true
            break;
          case 3:
            this._confirm = false
            this._cancel = false
            break
        }
      },
      immediate: true
    }
  },
  methods: {
    // 关闭前的回调，会暂停 Dialog 的关闭
    beforeClose (done) {
      if (!this.prompt) return done()
      this.$confirm('现在关闭不会保存已编辑内容，是否确认关闭？').then(_ => {
        done()
      }).catch(_ => { })
    },
    // 表单数据改变的回调
    modelChange () {
      this.prompt = true
    },
    handleCancel () {
      this.beforeClose(() => {
        this._visible = false
      })
    },
    // 初始化组件
    init () {
      this._initialModel = this.copy(this.initialModel ?? this.model)
      this.resetPrompt()
    },
    // 重置提示判断
    resetPrompt () {
      this.prompt = false
    },
    // 重置表单数据
    resetForm () {
      this.$refs.form?.resetFieldsAll(this._initialModel)
    },
    // Dialog 打开时的回调
    dialogOpened () {
      this.resetPrompt()
    },
    // Dialog 关闭动画结束时的回调
    async dialogClosed () {
      this.resetForm()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
</style>