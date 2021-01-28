/*
 * @Description: 路由守卫
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2021-01-25 11:15:14
 */


import store from '@/store'

export default router => {
  // 页面跳转同时改变title
  router.beforeEach((to, from, next) => {
    let title = to.meta.title
    if (title) document.title = title
    next()
  })



  // 跳转时根据登录状态重定向
  router.beforeEach((to, from, next) => {
    // 无需登录的路由 name 白名单
    const noAuthRouteNames = ['home', '404']

    const { userInfo } = store.state.user
    
    if (userInfo && to.name === 'home') {
      if (!from.name) return next({name: 'main'})
      else return next(false)
    }

    if (!userInfo && !noAuthRouteNames.includes(to.name)) return next('/')

    next()
  })
}