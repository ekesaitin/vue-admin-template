import { cloneDeep, pick, omit } from 'lodash'

export default {
  methods: {
    /**
     * 使用api方法请求数据
     * @param {string | (...params: any[]) => Promise<any>} apiFn api函数或 @/api 中定义的方法路径 filepath/funcname
     * @param {any[]} [args]
     * @returns {Promise<any>}
     */
    useApi (apiFn, ...args) {
      if (typeof apiFn === 'string') {
        const filepath = apiFn.split('/')
        const funcname = filepath.pop()
        apiFn = require('@/api/' + filepath.join('/'))?.[funcname]
      }
      return apiFn ? apiFn(...args) : Promise.reject('请求方法不存在或者路径错误')
    },
    /**
     * 深拷贝
     * @param {T} value 要深拷贝的值
     * @returns {T} 拷贝后的值
     */
    copy: cloneDeep,
    /**
     * 创建一个从 object 中选中的属性的对象
     * @param {object} object 来源对象
     * @param {...(string|string[])} [props] 要被选择的属性
     * @returns {object} 返回新对象
     */
    pick,
    /**
     * 这个对象由忽略属性之外的object自身和继承的可枚举属性组成。
     * @param {object} object 来源对象
     * @param {...(string|string[])} [props] 要被忽略的属性
     * @returns {object} 返回新对象
     */
    omit,
  }
}
