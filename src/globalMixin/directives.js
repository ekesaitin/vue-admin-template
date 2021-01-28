const directives = {
  /**
   * 图片加载失败显示404图片
   * v-img-err="图片url（可省略，默认@/assets/404.gif）"
   * */
  errImg (el, binding, vnode) {
    let errimg = binding.value || require('@/assets/404.gif')
    el.addEventListener('error', e => {
      e.target.src = errimg
    })
  },
  /**
   * 点击el及其子元素以外区域时执行，若使用self修饰符则不包括子元素
   * v-click-outside.self="方法名"
   * */
  clickOutside: {
    clickOutsideValue: {},
    bind: (el, binding, vnode) => {
      directives.clickOutside.clickOutsideValue[binding.expression] = (e) => {
        if (binding.modifiers && binding.modifiers.self) {
          if (e.target !== el && binding.value) binding.value()
        } else {
          if (!el.contains(e.target) && binding.value) binding.value()
        }
      }
      document.addEventListener('click', directives.clickOutside.clickOutsideValue[binding.expression])
    },
    unbind: (el, binding, vnode) => {
      document.removeEventListener('click', directives.clickOutside.clickOutsideValue[binding.expression])
      Reflect.deleteProperty(directives.clickOutside.clickOutsideValue, [binding.expression])
      console.log(directives.clickOutside.clickOutsideValue)
    }
  }
}

export default { directives }
