import type { Router } from "vue-router";

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