<template>
  <el-input
    v-model.trim="model[prop]"
    v-bind="bindProps"
    v-on="events"
    class="ff-input"
    :type="inpType"
    autocomplete="new-password"
    :resize="resize"
  >
    <span v-if="prefix" class="prefix" slot="prefix">{{prefix}}</span>
    <span v-if="suffix" class="suffix" slot="suffix">{{suffix}}</span>
    <span v-if="prepend" slot="prepend">{{prepend}}</span>
    <span v-if="append" slot="append">{{append}}</span>
  </el-input>
</template>

<script>
  /**
   * @param model {Object} 表单数据对象
   * @param prop {string} 表单域 model 字段
   * @param placeholder {string} 输入框占位文本
   * @param kind {string} 类型, text，textarea 和其他 原生 input 的 type 值
   * @param prefix {string} 输入框头部内容
   * @param suffix {string} 输入框尾部内容
   * @param prepend {string} 输入框前置内容
   * @param append {string} 输入框后置内容
   *
   * 其他属性同element Input Attributes
   * */
  
  import mixin from '../mixin'
  
  export default {
    name: 'FfInput',
    mixins: [mixin],
    props: {
      kind: {
        type: String,
        default: 'text'
      },
      prefix: String,
      suffix: String,
      prepend: String,
      append: String,
      resize: String
    },
    data() {
      return {
        inpWatch: null //监听器，限制输入数字
      }
    },
    computed: {
      // 是否是限制数字输入框
      isIntInput() {
        const {kind} = this
        return kind === 'int' || kind === 'intstr'
      },
      // 输入框类型
      inpType() {
        const {kind} = this
        if (this.isIntInput) return 'text'
        else return kind
      }
    },
    methods: {
      /**
       * 将字符串转成字符串或纯数字字符串
       * @param {string} str 当前值
       * @returns {string|number|*} 转换后的字符串或数字
       */
      str2numStr(str) {
        const hasNumReg = /\d+/
        const allNumReg = /^\d+$/
        const {kind} = this
        if (!hasNumReg.test(str)) return ''
        else if (allNumReg.test(str)) return kind === 'int' ? parseInt(str) : str.toString()
        else {
          let resarr = hasNumReg.exec(str)
          let res = resarr ? resarr[0] : ''
          return kind === 'int' ? parseInt(res) : res
        }
      },
      /**
       * 监听输入框值限制输入数字
       * @param {string} str 当前值
       */
      watchNum(str) {
        this.setValue(this.str2numStr(str))
      }
    },
    mounted() {
      if (this.isIntInput) {
        this.inpWatch = this.$watch(
          () => this.model[this.prop],
          this.watchNum,
          {immediate: true}
        )
      }
    },
    beforeDestroy() {
      this.inpWatch && this.inpWatch()
    }
  }
</script>

<style scoped lang="scss">
  .prefix {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    white-space: nowrap;
  }
  
  .suffix {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    white-space: nowrap;
  }
</style>
