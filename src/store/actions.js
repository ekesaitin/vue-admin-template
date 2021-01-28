import addRoutes from '@/utils/addRoutes'
import router, { resetRouter } from '@/router'
import vm from '@/main'

export default {
  // 动态添加路由
  async addAsyncRoutes ({ commit }) {
    const { data } = await vm.useApi('core/getMenu')
    let rm = addRoutes(data)
    let { routes, menus } = rm
    // return Promise.reject()
    router.addRoutes(routes)
    commit('setRoutes', routes)
    commit('setMenus', menus)
  },
  /**
   * 登录
   * @param {object} form 登录信息
   */  
  async login ({ commit, dispatch }, form) {
    const { data } = await vm.useApi('core/login', form)
    commit('user/setUserInfo', data)
    await dispatch('addAsyncRoutes')
  },
  /**
   * 重置store状态并退出登录
   */
  async logout ({ commit }) {
    commit('user/resetState')
    router.push('/')
    await vm.$nextTick()
    commit('resetState')
    resetRouter()
  }
}
