<template>
  <div class="Header">
    <slot name="left"></slot>
    <div class="right">
      <el-dropdown>
        <div class="el-dropdown-link">
          <Avatar :username="username" :size="28"></Avatar>
          <span class="name">{{username}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar'

export default {
  name: 'Header',
  components: {
    Avatar
  },
  computed: {
    ...mapGetters('user', ['username'])
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped lang="scss">
  .Header {
    width: 100%;
    height: 60px;
    min-height: 60px;
    background-color: #212330;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    .right {
      display: flex;
      align-items: center;
      .el-dropdown-link {
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;

        .name {
          margin-left: 10px;
        }
      }
      .tools-icon {
        font-size: 16px !important;
        color: #ffffff;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>
