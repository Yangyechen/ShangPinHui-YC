// 对axios进行二次封装
import axios from "axios";

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// start 进度条开始 done 进度条结束

// 在当前模块中引入store
import stroe from '@/store'
import store from "@/store";

// 利用axios对象的方法创建axios实例
let requests = axios.create({
    // 配置对象
    // 基础路径 发送请求的时候路径中会自动添加/api
    baseURL: "/api",
    // 请求超时的时间 5s
    timeout: 5000,
})

// 请求拦截器 在发送请求之前，可以进行检测，变更在请求发送之前做一些事情 interceptors拦截器
requests.interceptors.request.use((config) => {
    // console.log(stroe)
    if (stroe.state.detail.uuid_token) {
        // 给请求头添加字段 这个字段是后台定义好的 userTempId
        config.headers.userTempId = stroe.state.detail.uuid_token
    }
    // 需要携带token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    // 进度条开始
    nprogress.start()
    // config是一个配置对象 有一个属性很重要 header 请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done()
    // 成功的回调
    return res.data
}, (error) => {
    // 服务器响应失败的回调函数
    // 终结promise链
    return Promise.reject(new Error('faile'))
})


// 对外暴露
export default requests
