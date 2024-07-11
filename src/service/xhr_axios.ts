import axios from 'axios'

const $axios = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10 * 1000
})

$axios.interceptors.request.use(
    config => {
        console.log("触发axios请求拦截")
        config.headers.set("X-Request-Id", "1234567890")
        config.headers.set("cache-store", "no-store")
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

$axios.interceptors.response.use(
    response => {
        console.log("触发axios响应拦截")
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

const _get = (url: string) =>
    $axios.request({
        method: 'get',
        url
    })

export { _get }
