import { RouteRecordRaw } from "vue-router"
import systemRoutes from "../modules/account"
import phone from "../modules/phone"
const LAYOUT = () => import("@/components/Layouts/Layout.vue")

// miss路由
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
	name: "NotFound",
	path: "/:pathMatch(.*)*",
	redirect: "/404"
}

// 常量路由
export const constantRoutes = [
	{
		path: "/",
		name: "Layout",
		redirect: "/dashboard",
		component: LAYOUT,
		meta: {
			title: "首页"
		},
		children: [
			{
				path: "/dashboard",
				name: "Index",
				component: import("@/views/dashboard/index.vue"),
				meta: {
					title: "工作台",
					icon: "icon-shouye"
				}
			}
		]
	},
	...systemRoutes,
	...phone,
	{
		name: "Login",
		path: "/login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录页"
		}
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/exception/404.vue"),
		meta: {}
	},
	NOT_FOUND_ROUTE
] as RouteRecordRaw[]
