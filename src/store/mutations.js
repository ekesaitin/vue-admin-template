import { initialRootState } from './state'
import { cloneDeep } from 'lodash'

export default {
  /**
   * 设置路由
   * @param {object} state 
   * @param {object[]} routes 
   */
  setRoutes (state, routes) {
    state.routes = routes
  },
  /**
   * 设置菜单
   * @param {object} state 
   * @param {object[]} menus 
   */
  setMenus (state, menus) {
    state.menus = menus
  },
  /**
   * 添加标签
   * @param {object} state 
   * @param {object} newTab 新的标签
   */
  addTab (state, newTab) {
    state.tabs.push(newTab)
  },
  /**
   * 用合并对象的方式修改标签
   * @param {object} state 
   * @param {object} payload
   * @param {number} payload.index 要修改的标签索引
   * @param {object} payload.data 要修改的标签值
   */
  modifyTab (state, { index, data }) {
    const oldTab = state.tabs[index]
    state.tabs[index] = { ...oldTab, ...data }
  },
  /**
   * 删除标签
   * @param {object} state 
   * @param {string} name 要删除标签的标签name
   */
  removeTab (state, name) {
    if (state.tabs.length) {
      let idx = state.tabs.findIndex(tab => tab.name === name)
      if (idx !== -1) state.tabs.splice(idx, 1)
    }
  },
  /**
   * 重置state根级的数据
   * @param {object} state
   */  
  resetState (state) {
    // Object.keys(initialRootState).forEach(key => {
    //   state[key] = cloneDeep(initialRootState[key])
    // })
    Object.assign(state, cloneDeep(initialRootState))
  }
}
