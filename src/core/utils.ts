export const formatHeaders = (ipt: string) => {
    console.log(ipt)
    const _arr = ipt.trim().split('\r\n')
    const result: Record<string, string> = {}

    _arr.forEach((item: string) => {
        const key = item.substring(0, item.indexOf(':')).trim()
        const value = item.substring(item.indexOf(':') + 1).trim()
        result[key] = value
    })

    return result
}
