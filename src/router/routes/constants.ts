import { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/components/Layouts/Layout.vue')

// 常量路由
export const constantRoutes = [
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
