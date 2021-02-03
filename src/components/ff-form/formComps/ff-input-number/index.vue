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

<style scoped lang="scss">
  .ff-input-number {
    width: 100%;
  }
</style>
