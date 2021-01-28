<template>
  <el-menu
    v-bind="allProps"
    v-on="$listeners"
    class="ff-menu"
    :default-active="$_defaultActive"
    :router="false"
    @select="handleSelect"
  >
    <subMenu v-for="(route, idx) in filteredNavs" :key="idx" :sub="route" :onlyRoot="onlyRoot"></subMenu>
  </el-menu>
</template>

<script>
/**
 * 必须参数
 * @param {Array} navs 导航数据
 * @param {boolean} onlyRoot 是否仅展示一级菜单
 * *
 * @function select 菜单激活回调
 * @param index 选中菜单项的 index
 * @param indexPath 选中菜单项的 index path
* */

/**
 * 导航数据
 * navs
 * @param {string} path 唯一标识
 * @param {string} name 导航跳转的路由name,
 * @param {Object} meta 其他信息； { title: 显示的标题，没有的话取name值； hidden: 是否在菜单中隐藏 }
 * */
import { url } from '@/utils/regexp'
import { omit } from 'lodash'

export default {
  name: 'FfMenu',
  components: {
    'subMenu': _ => import('./subMenu')
  },
  props: {
    defaultActive: String,
    navs: {
      type: Array,
      default: _ => this.$router.options.routes
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    router: {
      type: Boolean,
      default: true
    },
    collapse: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#212330'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    activeTextColor: {
      type: String,
      default: '#378AE9'
    },
    onlyRoot: Boolean
  },
  data () {
    return {}
  },
  computed: {
    // 筛选除菜单中不隐藏的项
    filteredNavs () {
      const { onlyRoot, navs, filterNavs } = this
      if (onlyRoot) return navs.map(nav => omit(nav, 'children'))
      return filterNavs(navs)
    },
    $_defaultActive () {
      const { defaultActive, router } = this
      if (!defaultActive && router) return this.$route.name
      else return defaultActive
    }
  },
  methods: {
    handleSelect (index, indexPath) {
      if (this.router) {
        if (url.test(index)) {
          window.open(index)
        } else {
          this.$router.push({ name: index })
        }
      }
    },
    filterNavs (navs) {
      return navs.filter(nav => {
        let children = nav.children
        if (children && children.length) {
          nav.children = this.filterNavs(children)
        }
        if (nav.meta) return !nav.meta.hidden
        else return true
      })
    }
  }
}
</script>

<style lang="scss">
  .ff-menu:not(.el-menu--collapse):not(.el-menu--horizontal) {
    width: 200px;
    height: 100%;
  }
  .el-menu--collapse .el-tooltip {
    line-height: 56px;
  }
</style>
