// 管理员业务类型

import { STATUS } from "../business-dict"

declare namespace AccountManagement {
	type OriginAdmin = Id & {
		username: string
		nickname?: string
		password?: string
		avatar?: string
		status: STATUS
	} & Datetime?
}
