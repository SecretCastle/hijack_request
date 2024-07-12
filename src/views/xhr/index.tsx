import { _get } from '@/service/xhr_axios'
import { useEffect } from 'react'

function XHRDemo() {
    useEffect(() => {
        _get('/401').then(res => {
            console.log(res)
        })
    }, [])
    return <div>XHRDemo</div>
}

export default XHRDemo
