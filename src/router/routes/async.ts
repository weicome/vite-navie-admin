import { RouteRecordRaw } from "vue-router";

const LAYOUT = () => import("@/components/Layouts/Layout.vue");

// 异步路由
export const asyncRoutes = [
  {
    path: "/dashboard",
    name: "Index",
    component: LAYOUT,
    meta: {
      title: "首页",
      icon: "dashboard",
    },
    children: [
      {
        path: "welcome",
        name: "Welcome",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "工作台",
          icon: "icon-shouye",
        },
      },
    ],
  },
  {
    path: "/test-page",
    name: "Unocss",
    redirect: "/test-page",
    component: LAYOUT,
    meta: {
      title: "Unocss",
      icon: "dashboard",
    },
  },
] as RouteRecordRaw[];

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  name: "NotFound",
  path: "/:pathMatch(.*)*",
  redirect: "/404",
};

const modules = import.meta.glob<Recordable>("./../modules/*.ts", {
  eager: true,
});
Object.keys(modules).forEach((key: string) => {
  asyncRoutes.push(...(modules[key].default as RouteRecordRaw[]));
});

import { constantRoutes } from "./constants";

asyncRoutes.push(...constantRoutes);

asyncRoutes.push(NOT_FOUND_ROUTE);

export default asyncRoutes;
