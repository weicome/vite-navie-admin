import { RouteRecordRaw } from "vue-router"

const LAYOUT = () => import("@/components/Layouts/Layout.vue")

// 系统管理路由配置
const systemRoutes = [
	{
		path: "/account",
		name: "account",
		component: LAYOUT,
		meta: {
			title: "账号管理"
		},
		children: [
			{
				path: "admin",
				name: "admin",
				component: () => import("@/views/account/admini/index.vue"),
				meta: {
					title: "管理员列表"
				}
			},
			{
				path: "role",
				name: "role",
				component: () => import("@/views/account/role/index.vue"),
				meta: {
					title: "角色列表"
				}
			},
			{
				path: "menu",
				name: "menu",
				component: () => import("@/views/account/menu/index.vue"),
				meta: {
					title: "菜单列表"
				}
			}
		]
	}
] as RouteRecordRaw[]

export default systemRoutes
