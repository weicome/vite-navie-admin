import { RouteRecordRaw } from "vue-router"

const LAYOUT = () => import("@/components/Layouts/Layout.vue")

// 系统管理路由配置
const systemRoutes = [
	{
		path: "/admin",
		name: "Admin",
		component: LAYOUT,
		meta: {
			title: "账号管理"
		},
		children: [
			{
				path: "user",
				name: "AdminUser",
				component: () => import("@/views/administrator/user/index.vue"),
				meta: {
					title: "管理员列表"
				}
			},
			{
				path: "role",
				name: "AdminRole",
				component: () => import("@/views/administrator/role/index.vue"),
				meta: {
					title: "角色列表"
				}
			},
			{
				path: "menu",
				name: "AdminMenu",
				component: () => import("@/views/administrator/menu/index.vue"),
				meta: {
					title: "菜单列表"
				}
			}
		]
	}
] as RouteRecordRaw[]

export default systemRoutes
