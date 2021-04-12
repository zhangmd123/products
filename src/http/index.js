import axios from 'axios';
import { getToken } from '../utils/auth';

const instance = axios.create({
    baseURL: 'http://localhost:3009',
    timeout: 3000,
})

// 添加请求拦截器 设置请求头
instance.interceptors.request.use(config => {
    config.headers["authorization"] = 'Bearer ' + getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(response => {
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
* get方法 对应get请求
* @param {string} url 【请求的url地址】
* @param {Object} params 【请求时携带的参数】
*/
export function get(url, params) {
    return new Promise((resolve, reject) => {
        // 异步操作
        instance.get(url, { params }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
* post方法 对应post请求
* @param {string} url 【请求的url地址】
* @param {Object} params 【请求时携带的参数】
*/
export function post(url, params) {
    return new Promise((resolve, reject) => {
        // 异步操作
        instance.post(url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}


// del
export function del(url, params) {
    return new Promise((resolve, reject) => {
        // 异步操作
        instance.delete(url, { params }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

//put
export function put(url, params) {
    return new Promise((resolve, reject) => {
        // 异步操作
        instance.put(url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}