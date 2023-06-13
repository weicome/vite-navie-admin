// 菜单业务类型

type OriginRoute = {
	id: number | string
	parentId?: number | string // 父菜单id
	path: string
	name: string // 前端路由命名，后端鉴权,通过 casbin
	url?: string // 前端生成组件路径，后端pathinfo
	title?: string
	icon?: string
	type: number | RouteType
	children?: Array<OriginRoute>
}
enum RouteType {
	director = 0,
	menu = 1,
	action = 2
}
