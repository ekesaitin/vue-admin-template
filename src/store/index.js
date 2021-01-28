import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import * as modules from './modules'

Vue.use(Vuex)

const sessionStore = new VuexPersistence({
  key: 'ff_store',
  storage: window.sessionStorage,
})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: [sessionStore.plugin]
})
