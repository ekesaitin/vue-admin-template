export default {
  data () {
    return {
    }
  },
  computed: {
    // 父组件传入的所有参数
    allProps () {
      return { ...this.$attrs, ...this.$props }
    }
  }
}

