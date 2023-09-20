type UserInfo = {
	id: number
	username: string
	account: string
	avatar: string
	ip_address?: string
	roles?: UserRole
	menus: AccountManagement.Menu[]
}

type UserRole = {
	id: number
	name: string
}

/** 登录参数 */
type LoginParams = {
	// captchaId: string;
	password: string
	account: string
	remember?: boolean
	// verifyCode: string;
}

/** 登录成功结果 */
type LoginResult = {
	type: string
	token: string
	expires_at: number
}

/** 获取验证码参数 */
type CaptchaParams = {
	width?: number
	height?: number
}

/** 获取验证码结果 */
type CaptchaResult = {
	img: string
	id: string
}
