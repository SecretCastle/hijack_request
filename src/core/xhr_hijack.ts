import { formatHeaders } from './utils'

const originalXhr = window.XMLHttpRequest

const handler = {
    construct(target: any, args: any) {
        const xhrInstance = new target(...args)

        // 代理 open 方法
        const originalOpen = xhrInstance.open
        xhrInstance.open = function (method: string, url: string) {
            this._method = method
            this._url = url
            // eslint-disable-next-line prefer-rest-params
            return originalOpen.apply(this, arguments)
        }

        // 代理 send 方法
        const originalSend = xhrInstance.send
        xhrInstance.send = function (body: any) {
            // 请求前劫持逻辑
            console.log('hijack: Before request:', {
                method: this._method,
                url: this._url,
                body: body
            })

            // 代理 onreadystatechange 回调
            this.addEventListener('readystatechange', () => {
                if (this.readyState === XMLHttpRequest.DONE) {
                    const headers = formatHeaders(this.getAllResponseHeaders())
                    console.log('hijack: headers', headers)
                    // 响应后劫持逻辑
                    console.log('hijack: After response:', {
                        status: this.status,
                        response: this.responseText
                    })
                    if (this.status === 401) {
                        if (headers.location) {
                            window.location.href = headers.location
                        }
                    }
                }
            })

            // eslint-disable-next-line prefer-rest-params
            return originalSend.apply(this, arguments)
        }

        return xhrInstance
    }
}

window.XMLHttpRequest = new Proxy(originalXhr, handler)
