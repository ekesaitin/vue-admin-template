import { getQuery } from '@/utils/funcs'
import { getResData } from './index'
import { mock } from 'mockjs'

export const testApi = {
  '/test': () => getResData(123),
  '/list': () => getResData(mock({
    'data|5-20': [{
      'name': '@cname',
      'age|1-100': 1,
      'email': '@email'
    }]
  }).data),
  '/pageList': opts => {
    const { current, size } = getQuery(opts.url)
    return getResData({
      current: parseInt(current),
      total: 100,
      records: mock({
        [`data|${size}`]: [{
          'name': '@cname',
          'age|1-100': 1,
          'email': '@email'
        }]
      }).data
    })
  }
}