<template>
  <el-input-number
    v-model="model[prop]"
    v-bind="bindProps"
    v-on="events"
    class="ff-input-number"
  ></el-input-number>
</template>

<script>
  import mixin from '../mixin'
  export default {
    name: 'FfInputNumber',
    mixins: [mixin],
    props: {
      model: Object,
      prop: String
    }
  }
</script>

<style scoped lang="postcss">
  .ff-input-number {
    width: 100%;
    
    & >>> .el-input-number__decrease,
    & >>> .el-input-number__increase {
      border: none;
      width:24px;
      height:24px;
      line-height:24px;
      background:var(--text-color-05);
      border-radius:50%;
      top: 8px;
      
      & i {
        color: var(--text-color-5);
        font-weight: bold;
      }
    }
  
    & >>> .el-input-number__decrease {
      left: 5px;
    }
  
    & >>> .el-input-number__increase {
      right: 5px;
    }
  
    & >>> .el-input__inner {
      border-radius: 0;
      border: none;
      border-bottom: 1px solid rgba(225,225,229,1);
    }
    
    & >>> .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled),
    & >>> .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
      border-color: var(--primary-color);
    }
  }
</style>
