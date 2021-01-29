/*
 * @Description: 将 @/components下的index.vue 自动注册全局组件，组件名为index.vue所在文件夹名
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2021-01-29 11:24:54
 */
import Vue from 'vue'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

const requireComponent = require.context('./', true, /index.vue$/)

const reg = /\.\/(\S+)\/index\.vue$/

requireComponent.keys().forEach(c => {
  let fileName = c.match(reg)[1]
  let componentName = upperFirst(camelCase(fileName))
  let component = requireComponent(c).default || requireComponent(c)
  Vue.component(componentName, component)
})
