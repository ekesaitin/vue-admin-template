import { mock } from 'mockjs'
import { baseURL } from '@/config'
import { coreApi } from './core'
import { testApi } from './test'

export const getResData = (data, msg, code = 200) => {
  if (msg === undefined && code === 200) msg = 'success'
  return { data, msg, code }
}

/**
 * 将 mockMap 中的键值对注册到 Mockjs 中，路径中的key为mock拦截的方法及路径，如果方法为get可省略,方法不区分大小写
 * @param {object} mockMap mock路径和返回结果组成的数组
 * @example
 * useMockMap({
 *  '/url1': (opts?: object) => any,
 * 'get /url2': (opts?: object) => any, get可省略
 * 'post /url3': (opts?: object) => any,
 * })
 */
const useMockMap = (mockMap) => {
  Object.entries(mockMap).forEach(([key, value]) => {
    key = key.replace(/^\//, 'get /')
    const [type, url] = key.split(/\s+/)
    const rurl = new RegExp('^' + baseURL + url)
    const rtype = type.toLowerCase()
    mock(rurl, rtype, value)
  })
}




useMockMap(coreApi)
useMockMap(testApi)