import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router"
import { NOT_FOUND_ROUTE } from "../routes/constants"
import { useUserStore } from "@/store/modules"
const LAYOUT = () => import("@/components/Layouts/Layout.vue")

// 根据菜单按钮生成路由
export const generatorRoutes = (menus: OriginRoute[]): Array<RouteRecordRaw> => {
	const generator = (menus: OriginRoute[]): RouteRecordRaw[] => {
		return menus.map((item): RouteRecordRaw => {
			console.log(item.type == "0")
			const itemRouter = {
				path: item.path,
				name: item.name,
				component: item.type == "0" ? LAYOUT : item.type == "1" ? () => import("@/views/" + item.url) : LAYOUT,
				meta: {
					title: item.title,
					icon: item.icon
				}
			} as RouteRecordRaw
			if (item.children && item.children.length > 0) {
				itemRouter.children = generator(item.children)
			}
			return itemRouter
		})
	}
	console.log("menus", menus)
	const routes = generator(menus)
	// 添加miss路由
	// routes && routes.push(NOT_FOUND_ROUTE)
	return routes
}

// 跳过跟路由
export const jumpRoot = (to: RouteLocationNormalized, next: NavigationGuardNext, menus: RouteRecordRaw[]) => {
	if (to.path === "/") {
		next({ ...menus[0], replace: true })
	} else {
		next()
	}
}
