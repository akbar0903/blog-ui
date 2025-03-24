import axios from 'axios'
import { getToken, removeToken } from '@/utils/localstorage.ts'
import router from '@/router'

// 1.根域名，超时时间配置
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 2.请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },

  (err) => {
    return Promise.reject(err)
  }
)

// 3.响应拦截器
request.interceptors.response.use(
  (response) => {
    const { code, msg, data } = response.data
    if (code === 1) {
      return data
    } else {
      return Promise.reject(new Error(msg || '数据获取失败'))
    }
  },

  (err) => {
    // 监控401状态码
    if (err.response.status === 401) {
      removeToken()
      router.navigate('/login')
    }
    return Promise.reject(new Error(err.response?.data?.msg || '服务器错误'))
  }
)

export { request }
