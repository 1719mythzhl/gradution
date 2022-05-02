import axios from "axios";

// 创建 axios 实例
const service = axios.create({
    baseURL: 'http://127.0.0.1:80',
    timeout: 6000// 请求超时时间
})

//请求拦截
service.interceptors.request.use((config) => {
    // console.log('请求拦截')
    if(sessionStorage.getItem('token')) {
        config.headers["Authorization"] = sessionStorage.getItem('token')
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

//响应拦截
service.interceptors.response.use((response) => {
    // console.log('响应拦截')
    // console.log(response)
    return response
}, (error) => {
    return Promise.reject(error)
})

export default {
    service
  }