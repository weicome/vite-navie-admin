import type { Router } from "vue-router";

// 加载提示
export const createPageLoadingGuard = (router :Router) => {
    router.beforeEach(()=>{
        window.$loadingBar?.start()
    })

    router.afterEach(()=>{
        setTimeout(() => {
            window.$loadingBar?.finish()
        }, 200)
    })

    router.onError(() =>{
        window.$loadingBar?.error()
    })
}