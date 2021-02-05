<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
      hide-required-asterisk
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwd">
        <el-input v-model="form.passwd"></el-input>
      </el-form-item>
      <el-form-item label-width="0">
        <el-button type="primary" @click="handleLogin" style="width: 100%;">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    const required = process.env.NODE_ENV === 'production'

    return {
      form: {
        username: '',
        passwd: ''
      },
      rules: {
        username: [
          { required, message: '请输入用户名', trigger: 'blur' }
        ],
        passwd: [
          { required, message: '请输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    async handleLogin () {
      try {
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('login', this.form)
        this.$router.push({ name: 'main' })
      } catch (err) {
        console.log('err====', err)
      }
    }
  }
}
</script>

<style scoped>
  .login {
    width: 450px;
    padding: 20px;
    background-color: rgba(255, 255, 255);
  }
</style>
