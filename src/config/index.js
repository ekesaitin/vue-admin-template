/*
 * 全局设置
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2021-01-28 16:36:15
 */

 
/**
 * @constant {object} baseUrlObj 各环境接口url
 * @property {string} development 开发环境
 * @property {string} production 生产环境
 * @property {string} test 测试环境
 */
const baseUrlObj = {
  development: '/mockapi',
  production: '//localhost:3000',
  test: '//localhost:3000'
}

/**
 * @constant 接口地址
 * @type {string}
 */
export const baseURL = baseUrlObj[process.env.VUE_APP_ENV]

/**
 * @constant 导航栏类型, '': 空 / matched: 面包屑导航 / tabs: 标签页导航; 标签页会使用页面缓存
 * @type {'' | 'matched' | 'tabs'} 
 */
export const navigate = 'tabs'


/**
 * @constant 菜单和内容区页面默认布局， theme-LR: 左右 / theme-TB: 上下
 * @type {'theme-LR' | 'theme-TB'}
 */
export const layout = 'theme-LR'


/**
 * @constant {boolean} 是否拆分菜单为左右父子结构，仅在左右布局时有效
 */
const _splitMenu = false
export const splitMenu = layout === 'theme-LR' && _splitMenu

