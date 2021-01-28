<template>
  <el-cascader
    v-model="model[prop]"
    v-bind="bindProps"
    v-on="events"
    class="ff-cascader"
    :options="opts"
  ></el-cascader>
</template>

<script>
  import mixin from '../mixin'
  
  export default {
    name: 'FfCascader',
    mixins: [mixin],
    props: {
      model: Object,
      collapseTags: {
        type: Boolean,
        default: true
      },
      prop: String,
      opts: Array
    }
  }
</script>

<style scoped lang="postcss">
  .ff-cascader {
    width: 100%;
  }
</style>
