import axios from "axios";
import reactCookie from 'universal-cookie';
import {  message } from 'antd';
let baseUrl = '/api'
// 创建axios实例，在这里可以设置请求的默认配置
const instance = axios.create({
    timeout: 20000, // 设置超时时间10s
    // baseURL: baseUrl // 根据自己配置的反向代理去设置不同环境的baseUrl
})

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/MicroMessenger/i)) {
        return true;
    } else {
        return false;
    }
}

const cookies = new reactCookie();

// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.headers.post['Content-Type'] = 'application/json'

/** 添加请求拦截器 **/
instance.interceptors.request.use((config: any) => {
    var token = cookies.get('token')//获取本地存储的token
    // 判断cookie有没有存储token，有的话加入到请求头里
    if (token) {
        config.headers.Authorization = token//在请求头中加入token
    }
    if (!isWeiXin()) {
        config.headers['type'] = 'web'
    }
    // 如果还需要在请求头内添加其他内容可以自己添加 [] 内为自定义的字段名 = 后的内容为字段名对应的内容
    // config.headers['api'] = api
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response.data)
    } else {
        return Promise.reject(response.data.msg)
    }
}, error => {
    // 请求报错的回调可以和后端协调返回什么状态码，在此根据对应状态码进行对应处理
    if (error.response) {
        // 如401我就让用户返回登录页
        if (error.response.status === 401) {
            window.location.href = '/login'
            message.error("登录过期，请重新登录")
        }
        return Promise.reject(error)
    } else {
        return Promise.reject('请求超时, 请刷新重试')
    }
})

/* 统一封装get请求 */
export const get = (url:any, params?:any, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url: any, data: any, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

