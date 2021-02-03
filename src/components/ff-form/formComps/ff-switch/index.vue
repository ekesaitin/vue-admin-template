<template>
  <el-switch
    v-model="model[prop]"
    v-bind="bindProps"
    v-on="events"
    class="ff-switch"
  >
  </el-switch>
</template>

<script>
  /**
   * @param model {Object} 表单数据对象
   * @param prop {string} 表单域 model 字段
   */
  
  import mixin from '../mixin'
  
  export default {
    name: 'FfSwitch',
    mixins: [mixin],
    props: {
      activeValue: {
        type: [Boolean, String, Number],
        default: '1'
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: '0'
      }
    },
    data () {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  
</style>
