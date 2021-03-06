// 导入axios
import axios from 'axios'
import local from '../utils/local'
import router from 'vue-router'
import JSONBIG from 'json-bigint'
// 设置默认路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
if (local.getUser()) {
  axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
}

axios.defaults.transformResponse = [(data) => {
  // 后台的原始数据   理想情况 json字符串
  try {
    const result = JSONBIG.parse(data)
    return result
  } catch (e) {
    return data
  }
}]

// 请求拦截器
axios.interceptors.request.use(config => {
  // 1. 获取token
  const user = local.getUser() || {}
  // 2. 头部设置token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})

// 请求拦截器
// axios.interceptors.request.use(config => {
//   // 1. 获取token
//   const user = local.getUser() || {}
//   // 2. 头部设置token
//   config.headers.Authorization = `Bearer ${user.token}`
//   return config
// }, err => {
//   return Promise.reject(err)
// })

axios.interceptors.request.use(config => {
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})

// axios.interceptors.response.use(res => res, err => {
//   // 请求失败
//   if (err.response.status === 401) {
//     // 跳转登录页面  http://localhost:8080/#/login
//     // window.location.href = 'http://localhost:8080/#/login'
//     // window.location.hash = '#/login'
//     // 建议使用 vue-router 来跳转 , push是router实例的函数
//     return router.push('/login')
//   }
//   return Promise.reject(err)
// })

axios.interceptors.response.use(res => res, err => {
  if (err.response.status === '401') {
    return router.push('/login')
  }
  return Promise.reject(err)
})
// 导出axios
export default axios
