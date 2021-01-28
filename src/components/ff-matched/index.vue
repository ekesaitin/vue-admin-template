<template>
  <el-breadcrumb class="ff-matched" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in matched" :key="item.name" :to="{ name: item.name }">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { getHaveNameRoute } from '@/utils/addRoutes'
export default {
  name: 'FfMatched',
  data () {
    return {}
  },
  computed: {
    matched () {
      let matched = []
      let current = getHaveNameRoute(this.flatMenus, this.$route.name)
      this.addMatched(matched, current)
      return matched
    },
    flatMenus () {
      let flatMenus = []
      this.addMenu(flatMenus, this.$store.state.menus)
      return flatMenus
    }
  },
  methods: {
    getParent (name) {
      return this.flatMenus.find(val => val.children && val.children.find(v => v.name === name))
    },
    addMatched (matched, route) {
      matched.unshift(route)
      let parent = this.getParent(route.name)
      if (parent) {
        this.addMatched(matched, parent)
      }
    },
    addMenu (flatMenus, menus) {
      menus.forEach(menu => {
        flatMenus.push(menu)
        if (menu.children && menu.children.length) {
          this.addMenu(flatMenus, menu.children)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .ff-matched {
    padding: 10px;
  }
</style>
