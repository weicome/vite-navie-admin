import type { App } from "vue";
import { Router, createRouter, createWebHashHistory } from "vue-router";
import { asyncRoutes as routes } from "./routes/async";
// import { constantRoutes as routes } from './routes/constants'
import { createPageLoadingGuard } from "./guard/page-loading-guard";
import { createPageTitleGuard } from "./guard/page-title-guard";
import { createPermissionGuard } from "./guard/permission-guard";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = async (app: App) => {
  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
};

const setupRouterGuard = (router: Router) => {
  createPageLoadingGuard(router);
  // createPermissionGuard(router)
  createPageTitleGuard(router);
};

export default router;
