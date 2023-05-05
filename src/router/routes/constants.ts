import { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/components/Layout/Layout.vue')

// 常量路由
export const constantRoutes = [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        hidden: true,
        title: '登录页'
      },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/exception/404.vue'),
      meta: {
        hidden: true,
      },
    },
    // {
    //   path: '/500',
    //   name: '500',
    //   component: () => import('@/views/exception/500.vue'),
    //   meta: {
    //     hidden: true,
    //   },
    // },
    // {
    //   path: '/403',
    //   name: '403',
    //   component: () => import('@/views/exception/403.vue'),
    //   meta: {
    //     hidden: true,
    //   },
    // },
]as RouteRecordRaw[]
  