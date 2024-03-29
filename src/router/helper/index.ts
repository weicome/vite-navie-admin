import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router"

const LAYOUT = () => import(`@/components/Layouts/Layout.vue`)

// 根据菜单按钮生成路由
export const generatorRoutes = (menus: OriginRoute[]): Array<RouteRecordRaw> => {
	const generator = (menus: OriginRoute[]): RouteRecordRaw[] => {
		return menus.map((item): RouteRecordRaw => {
			const itemRouter = {
				path: item.path,
				name: item.name,
				component:
					item.type == "0"
						? LAYOUT
						: item.type == "1"
						? () => import(`@/views/${item.url}/index.vue`)
						: LAYOUT,
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
	const routes = generator(menus)
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
