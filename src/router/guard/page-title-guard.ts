import type { Router } from "vue-router"

const baseTitle = import.meta.env.VITE_APP_TITLE

// 生成页面的title
export const createPageTitleGuard = (router: Router) => {
    router.afterEach((to) => {
        const pageTitle = to.meta?.title
        if ( pageTitle ){
            document.title = `${pageTitle} | ${baseTitle}`
        }else{
            document.title = baseTitle
        }
    })
}