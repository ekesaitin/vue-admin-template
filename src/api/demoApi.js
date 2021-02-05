import axios from '@/utils/axios'

// testApi
export const testApi = (params) => {
   return axios.get(`/test`, { params }).then(res => res.data)
} 

// list
export const getList = (params) => {
    return axios.get(`/list`, { params }).then(res => res.data)
}

// pageList
export const getPageList = (params) => {
    return axios.get(`pageList`, { params }).then(res => res.data.data)
}
