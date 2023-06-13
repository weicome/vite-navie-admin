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
}
