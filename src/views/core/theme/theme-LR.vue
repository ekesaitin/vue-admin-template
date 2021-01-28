<template>
  <div class="theme-LR">
    <div class="nav">
      <el-scrollbar class="scrollbar">
        <ff-menu
          class="menu"
          :navs="menus"
          :default-active="activeMenu"
          :collapse="collapse"
          :onlyRoot="splitMenu"
        ></ff-menu>
      </el-scrollbar>
    </div>
    <div
      class="main-container"
      :style="{ width: collapse ? 'calc(100% - 64px)' : 'calc(100% - 200px)' }"
    >
      <Header>
        <template #left>
          <i
            class="collapse-icon"
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="collapse = !collapse"
          ></i>
        </template>
      </Header>
      <div
        v-if="splitMenu && subMenu"
        class="sub-menu-wrapper"
        :style="{height: subMenu ? 'auto' : 0}"
      >
        <ff-menu
          class="sub-menu"
          mode="horizontal"
          :navs="subMenu"
          active-text-color="#FF734A"
        ></ff-menu>
      </div>
      <div v-if="emptyMenuShow" class="emptyMenu"></div>
      <div class="tab-bar" :class="collapse ? 'big' : 'small'" v-if="navigate">
        <ff-matched v-if="navigate === 'matched'" />
        <ff-tabs v-if="navigate === 'tabs'" />
      </div>
      <div class="main">
        <div class="main-content" v-if="navigate === 'tabs'">
          <keep-alive :include="tabsName">
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </div>
        <router-view v-else />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import mixin from './mixin'

export default {
  name: 'themeLR',
  mixins: [mixin],
  data () {
    return {
      // 是否收起菜单
      collapse: false,
      // 是否在没有子菜单时显示填充div
      emptyMenuShow: false
    }
  },
  computed: {
    // 菜单名和对应一级菜单名组成的对象
    MenuWithParnetMap () {
      const obj = {}
      const addObjProp = (menus, rootname) => {
        menus.forEach(menu => {
          const { name, children, meta: { pname } } = menu
          const nameValue = rootname ? rootname : pname ? pname : name
          obj[name] = nameValue
          if (children && children.length) addObjProp(children, nameValue)
        })
      }
      addObjProp(this.menus)
      return obj
    },
    // 主菜单当前选中项
    activeMenu () {
      const rname = this.$route.name
      if (!this.splitMenu) return rname
      else return this.MenuWithParnetMap[rname]
    },
    // 子菜单数据
    subMenu () {
      const lv1name = this.MenuWithParnetMap[this.$route.name]
      return this.menus.find(m => m.name === lv1name)?.children
    }
  },
  watch: {
    subMenu: {
      handler (val) {
        if (this.splitMenu) {
          if (val) this.emptyMenuShow = false
          else this.$nextTick(() => {
            this.emptyMenuShow = true
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @Description 根据屏幕宽度改变菜单收起/展开
     */
    changeCollapse () {
      let w = window.innerWidth
      if (w > 1180 && this.collapse) this.collapse = false
      if (w <= 1180 && !this.collapse) this.collapse = true
    }
  },
  mounted () {
    this.changeCollapse()
    this.changeCollapse = debounce(this.changeCollapse, 300)
    window.addEventListener('resize', this.changeCollapse)
  },
  destroyed () {
    window.removeEventListener('resize', this.changeCollapse)
  }
}
</script>

<style scoped lang="scss">
  .theme-LR {
    width: 100%;
    display: flex;
    .nav {
      height: 100vh;
      background-color: #545c64;
      .menu {
        min-height: 100vh;
        border: none;
      }
      .scrollbar {
        height: 100%;
      }
    }
    .main-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      .collapse-icon {
        font-size: 28px !important;
        color: #ffffff;
        cursor: pointer;
      }

      .emptyMenu {
        height: 61px;
        background-color: #212330;
      }
      .main {
        padding: 20px;
        flex: 1 1 auto;
        overflow: auto;
      }
      .tab-bar {
        &.small {
          width: calc(100vw - 205px);
        }
        &.big {
          width: calc(100vw - 69px);
        }
      }
    }
  }
</style>

<style>
  .theme-LR .nav .el-scrollbar__wrap,
  .theme-LR .main-container .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .theme-LR .nav .el-scrollbar__view {
    max-width: 200px;
  }
</style>
