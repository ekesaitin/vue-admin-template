<template>
  <el-checkbox
    v-model="model[prop]"
    v-bind="bindProps"
    v-on="events"
    class="ff-checkbox"
  >{{text}}</el-checkbox>
</template>

<script>
  import mixin from '../mixin'
  
  export default {
    name: 'FfCheckbox',
    mixins: [mixin],
    props: {
      text: String,
      trueLabel: {
        type: [String, Number]
      },
      falseLabel: {
        type: [String, Number]
      },
    },
    created () {
      if (this.model[this.prop] == null) this.$set(this.model, this.prop, this.falseLabel)
    }
  }
</script>

<style scoped lang="postcss">
</style>
