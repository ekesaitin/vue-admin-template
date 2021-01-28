import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { setComponent } from '@/utils/addRoutes'
import routerGuards from './routerGuards'

Vue.use(Router)

// 创建路由实例
const createRouter = () => new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: _ => import('@/views/core/home/home') },
    { path: '/404', name: '404', component: _ => import('@/views/core/404/NotFound'), meta: { title: '404' } },
    { path: '*', redirect: '/404' }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) savedPosition
    else return { x: 0, y: 0 }
  }
})

const router = createRouter()

// 重置路由实例
export const resetRouter = () => {
  router.matcher = createRouter().matcher
}

// 刷新页面时动态添加路由
const { routes } = store.state
if (routes.length) {
  let asyncRoutes = setComponent(routes)
  router.addRoutes(asyncRoutes)
}

// 解决跳转重复路径报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

routerGuards(router)

export default router
