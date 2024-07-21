import axios from 'axios'

const $axios = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10 * 1000,
    adapter: 'fetch'
})

$axios.interceptors.request.use(
    config => {
        console.log('触发axios请求拦截')
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

$axios.interceptors.response.use(
    response => {
        console.log('触发axios响应拦截')
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

const _get = (url: string, params?: Record<string, any>) =>
    $axios.request({
        method: 'get',
        url,
        params,
        withCredentials: true
    })

const _post = (url: string, params?: Record<string, any>) =>
    $axios.request({
        method: 'post',
        url,
        data: params,
        withCredentials: true
    })

export { _get, _post }
