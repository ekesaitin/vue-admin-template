<template>
  <el-tabs
    class="ff-tabs"
    :value="$route.name"
    type="card"
    :closable="tabs.length > 1"
    @tab-click="handleClick"
    @tab-remove="handleRemove"
  >
    <el-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.meta.title"
      :name="item.name"
    ></el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getHaveNameRoute } from '@/utils/addRoutes'

export default {
  name: 'FfTabs',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['routes', 'tabs'])
  },
  watch: {
    '$route': {
      handler (currentRoute) {
        const { fullPath, name, meta: {keepAlive} } = currentRoute
        const index = this.tabs.findIndex(v => v.name === name)
        if (index === -1) {
          if (keepAlive) {
            let route = getHaveNameRoute(this.routes, name)
            this.addTab({ ...route, fullPath })
          }
        } else {
          this.modifyTab({ index, data: { fullPath } })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations(['addTab', 'modifyTab', 'removeTab']),
    handleClick (tab) {
      if (tab.name !== this.$route.name) {
        const route = this.tabs.find(val => val.name === tab.name)
        const path = route.fullPath ?? route.path
        this.$router.push({ path })
      }
    },
    handleRemove (name) {
      if (this.tabs.length > 1) {
        let index = this.tabs.findIndex(v => v.name === name)
        this.removeTab(name)
        if (this.$route.name === name) {
          let toIndex = index === 0 ? index : index - 1
          this.$router.push({ name: this.tabs[toIndex].name })
        }
      }
    },
  }
}
</script>

  <style>
  .ff-tabs .el-tabs__header {
    margin: 0;
  }
</style>
