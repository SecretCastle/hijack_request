import { _get } from '@/service/xhr_axios'
import { useEffect } from 'react'

function XHRDemo() {
    useEffect(() => {
        _get('/topics').then(res => {
            console.log(res)
        })
    }, [])
    return <div>XHRDemo</div>
}

export default XHRDemo
