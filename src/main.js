import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// Fragment
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

// 全局组件
import './components'
import './style/reset.css'

// 自定义插件
import globalMixin from './globalMixin'
Vue.use(globalMixin)

// 使用mock数据
import './mock'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vm
