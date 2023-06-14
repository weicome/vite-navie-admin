// 菜单业务类型

type OriginRoute = {
	id: number | string
	parentId?: number | string // 父菜单id
	path: string
	name: string // 前端路由命名，后端鉴权,通过 casbin
	url?: string // 前端生成组件路径，后端pathinfo
	title?: string
	icon?: string
	type: number
	children?: Array<OriginRoute>
}

interface RouteType {
	type: "0" | "1" | "2"
}

type RouteTypeKey = NonNullable<RouteType["type"]>
