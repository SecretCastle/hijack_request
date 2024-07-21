import { _post } from '@/service/fetch_tanstak'
import { useEffect } from 'react'

function FetchDemo() {
    useEffect(() => {
        _post('/post', { page: 1 }).then(res => {
            console.log(res)
        })
    })

    return <div>FetchDemo</div>
}

export default FetchDemo
