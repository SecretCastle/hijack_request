const origin_fetch = window.fetch

/**
 *
 * @param stream
 * @description ReadableStream -> blob
 * @returns
 */
const read_stream = async (stream: ReadableStream): Promise<Blob> => {
    const chunks = []
    const reader = stream.getReader()
    let done, value
    while ((({ done, value } = await reader.read()), !done)) {
        chunks.push(value)
    }
    const blob = new Blob(chunks)
    return blob
}

const handle = {
    async apply(target: any, thisArg: any, argArray: any) {
        const [input, init] = argArray
        console.log('fetch_hijack: Before request:', { input })
        let request: any = null
        try {
            const body = await read_stream(input.body)
            const header: Record<string, string> = {}
            input.headers.forEach((v: string, k: string) => {
                header[k] = v
            })
            request = new Request(input.url, {
                ...input,
                method: input.method || 'GET',
                body: body,
                headers: header
            })
        } catch (error) {
            console.error('fetch_hijack: Request error:', error)
        }

        return origin_fetch(request, init).then((response: any) => {
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
            return new Response(response.body, {
                ...response,
                status: 200,
                headers: header
            })
        })
    }
}

window.fetch = new Proxy(origin_fetch, handle)
