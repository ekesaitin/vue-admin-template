<template>
  <fragment>
    <el-submenu v-if="sub.children && sub.children.length" :index="isUrl(sub.path) ? sub.path : sub.name">
      <template slot="title">
        <i v-if="sub.meta && sub.meta.icon" :class="sub.meta.icon"></i>
        <span slot="title">{{sub.meta && sub.meta.title || sub.name}}</span>
      </template>
      <subMenu v-for="ch in sub.children" :key="ch.name" :sub="ch"></subMenu>
    </el-submenu>
    <el-menu-item v-else :index="isUrl(sub.path) ? sub.path : sub.name">
      <i v-if="sub.meta && sub.meta.icon" :class="sub.meta.icon"></i>
      <span slot="title">{{sub.meta && sub.meta.title || sub.name}}</span>
    </el-menu-item>
  </fragment>
</template>

<script>
import { url } from '@/utils/regexp'

export default {
  name: 'subMenu',
  props: {
    sub: {
      type: Object,
      default: () => ({})
    },
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    isUrl (str) {
      return url.test(str)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
