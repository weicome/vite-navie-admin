// 管理员业务类型

import { STATUS } from "../business-dict"

type OriginAdmin = Id &  {
    username: string,
    nickname?: string,
    password: string,
    avatar?: string,
    status: STATUS,
} & Datetime