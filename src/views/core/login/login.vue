<template>
  <div class="login">
    <ff-form
      ref="loginForm"
      :model="form"
      :config="config"
      labelWidth="0"
      :hideRequiredAsterisk="false"
    >
      <template #prependBtn>
        <el-button type="primary" @click="handleLogin" style="width: 100%;">登 录</el-button>
      </template>
    </ff-form>
  </div>
</template>

<script>
import { formatSingleConfig } from '@/components/ff-form/index'
export default {
  name: 'login',
  data () {
    const required = process.env.NODE_ENV === 'production'

    return {
      form: {
        username: '',
        passwd: ''
      },
      config: formatSingleConfig([
        { type: 'input', prop: 'username', placeholder: '请输入用户名', required, errMsg: '请输入用户名' },
        { type: 'input', prop: 'passwd', placeholder: '请输入用户密码', kind: 'password', required, errMsg: '请输入用户密码' }
      ]),
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
