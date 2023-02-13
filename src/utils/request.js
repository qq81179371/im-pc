import axios from 'axios'
import {
  ElMessage
} from 'element-plus'

const instance = axios.create({
  baseURL: 'http://chat.jumper.com.cn/api', // 接口统一域名
  timeout: 6000, // 设置超时
  headers: {
    'Content-Type': 'application/json;charset=UTF-8;'
  }
})

// 请求拦截器
instance.interceptors.request.use((data) => {
  const config = data
  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  // const token = window.localStorage.getItem('token')
  // if (token) {
  //   config.headers.Authorization = token
  // }
  // 若请求方式为post，则将data参数转为JSON字符串
  if (config.method === 'POST') {
    config.data = JSON.stringify(config.data)
  }
  return config
}, (error) => Promise.reject(error))

// 响应拦截器
instance.interceptors.response.use((response) => {
  if (response.data.code === 0) {
    return response.data
  }
  ElMessage.error(response.data.message)
  throw new Error()
}, (error) => {
  // 响应错误
  if (error.response && error.response.code) {
    ElMessage.error(error.response.message)
    return Promise.reject(error)
  }
  return Promise.reject(error)
})

export default instance
