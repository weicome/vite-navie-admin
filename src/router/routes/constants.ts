import { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/components/Layouts/Layout.vue')

// 常量路由
export const constantRoutes = [
    {
      path: '/',
      name: 'Layout',
      redirect: '/dashboard/welcome',
      component: LAYOUT,
      meta: {
        title: '首页',
      },
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        title: '登录页'
      },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/exception/404.vue'),
      meta: {
      },
    },
]as RouteRecordRaw[]

// miss路由
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
}

