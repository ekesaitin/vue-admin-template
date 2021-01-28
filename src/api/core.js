import axios from '@/utils/axios'

// 登录
export const login = (params) => {
   return axios.post(`/login`, params).then(res => res.data)
}

// 获取菜单
export const getMenu = (params) => {
    return axios.get(`/getMenu`, { params, baseURL: '/mockapi' }).then(res => res.data)
}