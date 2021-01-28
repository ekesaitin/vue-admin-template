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

<style scoped lang="postcss">
  .ff-switch {
    & >>> .el-switch__core {
      width:54px !important;
      height:20px !important;
      border-radius:32px !important;
    
      &::after {
        width:26px;
        height:26px;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:32px;
        top: -4px;
        left: -1px;
      }
    }
  
    &.is-checked >>> .el-switch__core {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
  
      &::after {
        left: 86% !important;
      }
    }
  }
</style>
