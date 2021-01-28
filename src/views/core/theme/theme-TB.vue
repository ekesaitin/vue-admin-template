<template>
  <div class="theme-TB">
    <div class="theme-TB-header">
      <div class="nav">
        <el-scrollbar class="scrollbar">
          <ff-menu class="menu" :navs="menus" mode="horizontal"></ff-menu>
        </el-scrollbar>
      </div>
      <Header class="config"></Header>
    </div>
    <div class="tab-bar" v-if="navigate">
      <ff-matched v-if="navigate === 'matched'" />
      <ff-tabs v-if="navigate === 'tabs'" />
    </div>
    <div class="main-container" v-if="navigate === 'tabs'">
      <div class="main">
        <keep-alive :include="tabsName">
          <router-view v-if="$route.meta.keepAlive"  />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
    <div class="main-container" v-else>
      <el-scrollbar class="scrollbar">
        <router-view />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'theme-TB',
  mixins: [mixin]
}
</script>

<style scoped lang="scss">
  .theme-TB {
    .theme-TB-header {
      width: 100%;
      display: flex;
      .nav {
        width: calc(100% - 130px);
        .scrollbar {
          width: 100%;
        }
        .menu {
          display: flex;
        }
      }
      .config {
        width: 130px;
      }
    }
    .tab-bar {
      width: 100vw;
    }
    .main-container {
      width: 100%;
      height: calc(100vh - 102px);
      box-sizing: border-box;
      .main {
        height: 100%;
        overflow: auto;
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }
</style>

<style>
  .theme-TB .nav .el-scrollbar__wrap {
    overflow-y: hidden;
  }
  .theme-TB .main-container .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
