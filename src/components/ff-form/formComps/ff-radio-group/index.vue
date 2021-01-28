<template>
  <el-radio-group
    v-model="model[prop]"
    v-bind="bindProps"
    v-on="events"
    class="ff-radio-group"
  >
    <el-radio
      v-for="(item, idx) in opts"
      v-bind="getItemProps(item, true)"
      :key="idx"
    >
      {{getItemPropValue(item, 'label')}}
    </el-radio>
  </el-radio-group>
</template>

<script>
  import mixin from '../mixin'

  // 默认props
  const props = {
    value: 'value',
    label: 'label',
    disabled: 'disabled',
    border: 'border',
    size: 'size',
    name: 'name',
  }
  
  export default {
    name: 'FfRadioGroup',
    mixins: [mixin],
    props: {
      opts: Array,
      props:  Object
    }
  }
</script>

<style scoped lang="postcss">
 .ff-radio-group {
   & >>> .is-checked {
     & .el-radio__inner {
       border:3px solid var(--primary-color);
       background-color: #fff;
      
       &::after {
         width:14px;
         height:14px;
         background:var(--primary-color);
         border-radius:20px;
       }
     }
   }
  
   & >>> .el-radio__inner {
     width:30px;
     height:30px;
     border:3px solid var(--primary-color-4);
     border-radius:20px;
   }
  
   & >>> .el-radio__label {
     font-size: 15px;
   }
   
   & >>> .el-radio__input.is-checked+.el-radio__label {
     color: var(--text-color);
   }
 }
</style>
