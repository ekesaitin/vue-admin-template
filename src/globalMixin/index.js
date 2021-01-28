import data from './data'
import directives from './directives'
import methods from './methods'

export default {
  install (Vue) {
    Vue.mixin({
      ...data,
      ...directives,
      ...methods
    })
  }
}