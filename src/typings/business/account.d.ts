// 管理员业务类型

/** 后台账号类型 */
declare namespace AccountManagement {
	/** 管理员 */
	interface Admin extends Id, Datetime, STATUS {
		username: string
		nickname?: string
		password?: string
		avatar?: string
	}

	/** 角色 */
	interface Role extends Id, STATUS {
		name: string
		symbol: string
		description?: string
	}
	/** 菜单 */
	interface Menu extends Id, STATUS {
		parentId?: number | string // 父菜单id
		path: string // 前端路由命名，后端鉴权,通过 casbin
		name: string
		url?: string // 前端生成组件路径，后端pathinfo
		title?: string
		icon?: string
		type: RouteTypeKey
		children?: Array<Menu>
	}
}
