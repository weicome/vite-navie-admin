import {Router, createRouter,createWebHashHistory} from 'vue-router'
import { basicRoutes as routes } from './routes/static'
import type { App } from 'vue'
import { createPageLoadingGuard } from './guard/page-loading-guard'
import { createPageTitleGuard } from './guard/page-title-guard'
import { createPermissionGuard } from './guard/permission-guard'

const router = createRouter({
    history: createWebHashHistory('/'),
    routes,
    scrollBehavior: ()=> ({left:0, top:0}),
})

export const setupRouter = (app: App) =>{
    app.use(router)
    setupRouterGuard(router)
}

const setupRouterGuard = (router :Router) =>{
    createPageLoadingGuard(router)
    createPermissionGuard(router)
    createPageTitleGuard(router)
}

export default router