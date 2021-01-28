/**
 * 获取 url 中的query参数并格式化为对象，若没有参数则返回null
 * @param {string} url url或者路径
 * @return {object | null} query参数或null
 */
export const getQuery = url => {
  const reg = /([^&=?]+)=([^&=?]+)/g
  if (!reg.test(url)) return null
  const query = {}
  url.replace(reg, (ctx, key, val) => {
    query[key] = val
  })
  return query
}