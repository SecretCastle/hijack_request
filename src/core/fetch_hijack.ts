const origin_fetch = window.fetch

const handle = {
    apply(target: any, thisArg: any, argArray: any) {
        const [input, init] = argArray
        console.log('fetch_hijack: Before request:', {
            input,
            init
        })
        return origin_fetch(input, init).then((response: any) => {
            const header: Record<string, string> = {}
            response.headers.forEach((v: string, k: string) => {
                header[k] = v
            })
            console.log('fetch_hijack: After response:', {
                status: response.status,
                response: response
            })
             // TODO 如何阻止原生 fetch 的继续执行 ？不让后续的拦截器拦截到错误
            if (response.status === 401) {
                header.location && (window.location.href = header.location)
            }
           
            return response
        })
    }
}

window.fetch = new Proxy(origin_fetch, handle)
