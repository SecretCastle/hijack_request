# Hijack Request

> purpose

* hijack xhr/fetch catch request or response before any third part lib's interceptors
* eg: `axios` basic on `XMLHttpRequest`, hijack `xhr.send` & `xhr.open` before `axios.interceptor.request` and `axios.interceptor.response` dispatch
