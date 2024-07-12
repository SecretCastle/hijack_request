import { _get } from "@/service/fetch_tanstak"
import { useEffect } from "react"

function FetchDemo() {
    useEffect(() => {
        _get("/401").then(res => {
            console.log(res);
        })
    })

    return <div>FetchDemo</div>
}

export default FetchDemo
