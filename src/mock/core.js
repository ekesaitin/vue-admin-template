// import { routes } from '@/mock/routes.json'
import { routes } from '@/mock/routesTree.json'
import { getResData } from './index'

export const coreApi = {
  'post /login': opts => {
    const { username } = JSON.parse(opts.body)
    return getResData({ username: username || 'admin' })
  },
  '/getMenu': () => getResData(routes),
}