import axios from 'axios'
import { Message } from 'element-ui'
import { baseURL } from '@/config'

// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (token) {
    //   config.headers['token'] = token
    // }
    console.log('config====', config)
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错
     */
    let { msg, code } = response.data
    if (code === 200) {
      return response
    } else {
      msg && Message.error(msg)
      return Promise.reject(response)
    }
  },
  error => {
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      // console.log('网络请求超时，请稍后重试！')
    }
    return Promise.reject(error)
  }
)

export default service
