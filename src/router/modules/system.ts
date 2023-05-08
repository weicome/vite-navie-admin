import { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/components/Layouts/Layout.vue')

// 系统管理路由配置
 const systemRoutes = [
    {
      path: '/system',
      name: 'system',
      component: LAYOUT,
      meta: {
        title: '系统管理',
        hidden: true,
      },
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/system/user.vue'),
          meta: {
            title: '管理员列表',
          },
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('@/views/system/role.vue'),
          meta: {
            title: '角色列表',
          },
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('@/views/system/menu.vue'),
          meta: {
            title: '菜单列表',
          },
        },
      ],
    },
] as RouteRecordRaw[]

export default systemRoutes