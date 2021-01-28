<template>
  <div class="index">
    <h1>xxx后台管理系统</h1>
    <login></login>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    'login': _ => import('../login/login')
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  .index {
    width: 100%;
    height: 100vh;
    background: url("~@/assets/home-bg.jpeg") no-repeat center / cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      width: 450px;
      font-size: 30px;
      font-weight: bold;
      padding: 20px;
      background-color: #ffffff;
      text-align: center;
    }
  }
</style>
