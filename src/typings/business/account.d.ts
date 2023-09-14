// 管理员业务类型

/** 后台账号类型 */
declare namespace AccountManagement {
	interface AdminData {
		data: Admin[]
		meta: pagination
	}
	/** 管理员 */
	interface Admin extends Id, Datetime, STATUS {
		account: string
		username?: string
		ip_address?: string
		role?: string | string[]
		password?: string
	}

	interface RoleData {
		data: Role[]
		meta: pagination
	}
	/** 角色 */
	interface Role extends Id, STATUS {
		name: string
		symbol: string
		remark?: string
	}
	interface MenuData {
		data: Menu[]
		meta: pagination
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
