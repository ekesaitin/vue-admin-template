<template>
  <el-select
    v-model="value"
    v-bind="bindProps"
    v-on="events"
    class="ff-select"
  >
    <el-option
      v-for="(item, idx) in opts"
      v-bind="getItemProps(item)"
      :key="idx"
    >
    </el-option>
  </el-select>
</template>

<script>
  /**
   * @param model {Object} 表单数据对象
   * @param prop {string} 表单域 model 字段
   * @param placeholder {string} 输入框占位文本
   * @param opts {Array} Option 选项列表
   * @param props {Object} opts
   */
  
  import mixin from '../mixin'

  // 默认props
  const props = {
    value: 'value',
    label: 'label',
    disabled: 'disabled'
  }
  
  export default {
    name: 'FfSelect',
    mixins: [mixin],
    props: {
      opts: Array,
      props:  Object,
      multiple: { // 是否多选
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        value: '',
        unwatch: null
      }
    },
    watch: {
      value (value) {
        this.watchValueSyncModel(value)
      }
    },
    created () {
      this.initWatched()
      this.unwatch = this.$watch(
        () => this.model[this.prop],
        value => {
          if (this.multiple) {
            this.value = this.getStrValue(value)
          }
          else this.value = value
        },
        { immediate: true }
      )
    },
    beforeDestroy() {
      this.unwatch && this.unwatch()
    }
  }
</script>

<style scoped>
  .ff-select {
    width: 100%;
  }
</style>
