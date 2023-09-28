import type { App } from "vue"
import { Router, createRouter, createWebHashHistory } from "vue-router"
import { constantRoutes as routes } from "./routes/constants"
import { createPageLoadingGuard } from "./guard/page-loading-guard"
import { createPageTitleGuard } from "./guard/page-title-guard"
import { createPermissionGuard } from "./guard/permission-guard"

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

// 路由守卫
const setupRouterGuard = (router: Router) => {
	createPageLoadingGuard(router)
	createPermissionGuard(router)
	createPageTitleGuard(router)
}

export const setupRouter = async (app: App) => {
	app.use(router)
	setupRouterGuard(router)
	await router.isReady()
}

export default router
