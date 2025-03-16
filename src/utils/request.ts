import axios from 'axios'

// 1.根域名
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 2.请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 3.响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    return Promise.reject(err)
  }
)

export { request }
