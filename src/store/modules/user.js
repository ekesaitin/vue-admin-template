import { cloneDeep } from 'lodash'

export const initialState = {
  // 用户信息
  userInfo: null
}

export default {
  namespaced: true,
  state: initialState,
  getters: {
    username: state => state.userInfo?.username || ''
  },
  mutations: {
    // 设置用户信息
    setUserInfo (state, info) {
      state.userInfo = info
    },
    resetState (state) {
      Object.assign(state, cloneDeep(initialState))
    }
  },
}