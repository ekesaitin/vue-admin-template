/*
 * @Author: 贰伍伍
 * @Email: ouhuangff@163.com
 * @LastEditTime: 2021-01-28 17:09:05
 */

 import { cloneDeep, omit } from 'lodash'


// 获取@/views下所有.vue文件的上下文
const requireComponent = require.context('@/views', true, /.vue$/)

// 获取文件名
export const getDirName = route => {
  let sp = route.split('/')
  let fileName = sp[sp.length - 1]
  return fileName.substring(0, fileName.length - 4)
}

// 获取列表中第一个没有子节点的路由
export const getFirstChild = (routes, childrenProp = 'children') => {
  let firstChild
  const getBosomItem = routes => {
    let firstItem = routes[0]
    if (firstItem.children && firstItem.children.length) {
      getBosomItem(firstItem.children)
    } else {
      firstChild = firstItem
    }
  }
  getBosomItem(routes)
  return firstChild
}

// 设置重定向为第一个子路由
export const setRedirect = (routes, deep = false) => {
  routes.forEach(route => {
    if (!route.redirect) {
      let child = routes.find(r => r.meta.pname === route.name)
      if (deep && child) route.redirect = child
    }
  })
}

// 获取某个name的路由
export const getHaveNameRoute = (routes, name) => {
  let resultRoute
  const eachRoutes = routes => {
    routes.forEach(route => {
      if (route.name === name) {
        resultRoute = route
        return
      }
      if (route.children && route.children.length) {
        eachRoutes(route.children)
      }
    })
  }
  eachRoutes(routes)
  return resultRoute
}

// 获取懒加载方法
export const getImportFunc = name => {
  let dirname = requireComponent.keys().find(v => getDirName(v) === name)
  let importDir = dirname ? dirname.replace('.', 'views') : 'views/core/404/NotFound'
  return _ => import(`@/${importDir}`)
}

// 设置component
export const setComponent = routes => {
  return routes.map(route => {
    route.component = getImportFunc(route.name)
    if (route.children && route.children.length) setComponent(route.children)
    return route
  })
}

// 整理路由对象
export const mapRoutes = routes => {
  return routes.map(route => {
    let name = route.name
    let path = route.path || name
    let title = route.title || name
    let hidden = route.hidden ?? false
    let keepAlive = route.keepAlive ?? true
    let pname = route.pname
    let icon = route.icon || 'el-icon-menu'
    return {
      name,
      path,
      meta: { title, hidden, keepAlive, pname, icon }
    }
  })
}

// 菜单数组转对象
export const menus2object = menus => {
  return menus.reduce((prev, curr) => {
    prev[curr.name] = curr
    return prev
  }, Object.create(null))
}

// 匹配父菜单
export const matchParentMenu = (menusMap, menus) => {
  menus.forEach(menu => {
    let pname = menu.meta.pname
    let pmenu = menusMap[pname]
    if (pmenu) {
      if (!pmenu.children) pmenu.children = []
      pmenu.children.push(menu)
    }
  })
  return menusMap
}

// 获取路由数组
export const getRoutes = routes => {
  let children = setComponent(mapRoutes(routes))
  let mainRoutes = [{
    path: '/main',
    name: 'main',
    redirect: { name: children[0].name },
    component: _ => import('@/views/core/main/main'),
    meta: { title: 'main' },
    children
  }]
  setRedirect(children, true)
  return mainRoutes
}

// 获取菜单数组
export const getMenus = routes => {
  let flatMenus = mapRoutes(routes)
  let menus = []
  let menusMap = matchParentMenu(menus2object(flatMenus), flatMenus)
  Object.values(menusMap).forEach(menu => {
    if (!menu.meta.pname) {
      menus.push(menu)
    }
  })
  return menus
}

// 展平树形菜单
export const flatRoutes = routes => {
  const res = []
  const addRoute = (arr, pname) => {
    arr.forEach(r => {
      if (pname) r = {...r, pname}
      res.push(omit(r, 'children'))
      const ch = r.children
      if (ch && ch.length) addRoute(ch, r.name??r.path)
    })
  }
  addRoute(routes)
  return res
}

// 判断菜单是否是树形结构,树形菜单原有的pname属性无效，而是会会根据菜单结构生成
export const isTreeRouter = routes => {
  return routes.some(route => Reflect.has(route, 'children'))
}

// 获取路由和菜单数组
const addRoutes = serverRoutes => {
  if (isTreeRouter(serverRoutes)) serverRoutes = flatRoutes(serverRoutes)
  else serverRoutes = cloneDeep(serverRoutes)
  let routes = getRoutes(serverRoutes)
  let menus = getMenus(serverRoutes)
  return { routes, menus }
}

export default addRoutes
