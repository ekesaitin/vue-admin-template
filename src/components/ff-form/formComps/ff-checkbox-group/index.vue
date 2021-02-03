<template>
  <el-checkbox-group
    v-model="value"
    v-bind="bindProps"
    v-on="events"
    class="ff-checkbox-group"
  >
    <el-checkbox
      v-for="(item, idx) in opts"
      v-bind="getItemProps(item, true)"
      :key="idx"
    >{{getItemPropValue(item, 'label')}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
  import mixin from '../mixin'
  
  export default {
    name: 'FfCheckboxGroup',
    mixins: [mixin],
    props: {
      opts: Array,
      props:  Object
    },
    data () {
      return {
        value: [],
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
          this.value = this.getStrValue(value)
        },
        { immediate: true }
      )
    },
    beforeDestroy() {
      this.unwatch && this.unwatch()
    }
  }
</script>

<style scoped lang="scss">
  .ff-checkbox-group {
    position: relative;
    display: inline-block;
    width: 100%;
  }
</style>
