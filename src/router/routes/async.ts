import { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/components/Layout/Layout.vue')

// 异步路由
export const asyncRoutes = [
    {
        path: '/index',
        component: LAYOUT,
        name: 'Index',
        meta: {
          title: 'Dashboard',
          iconPrefix: 'iconfont',
          icon: 'dashboard',
        },
        children: [
          {
            path: 'home',
            name: 'Home',
            component: () => import('@/views/dashboard/index.vue'),
            meta: {
              title: '主控台',
              affix: true,
              cacheable: true,
              iconPrefix: 'iconfont',
              icon: 'menu',
            },
          },
        //   {
        //     path: 'work-place',
        //     name: 'WorkPlace',
        //     component: () => import('@/views/index/work-place.vue'),
        //     meta: {
        //       title: '工作台',
        //       affix: true,
        //       iconPrefix: 'iconfont',
        //       icon: 'menu',
        //     },
        //   },
        ],
    }
] as RouteRecordRaw[]