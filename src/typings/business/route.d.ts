// 菜单业务类型

type OriginRoute = {
	id: number | string
	name: string
	title?: string
	pid?: number | string // 父菜单id
	path: string // 前端路由命名，后端鉴权,通过 casbin
	url?: string // 前端生成组件路径，后端pathinfo
	icon?: string
	type: RouteTypeKey
	children?: Array<OriginRoute>
}

interface RouteType {
	type: "0" | "1" | "2"
}

type RouteTypeKey = NonNullable<RouteType["type"]>
