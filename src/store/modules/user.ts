import { defineStore } from "pinia"
import { Storage } from "@/utils/cache"
import { getInfo, login, logout } from "@/api"
import { asyncRoutes } from "@/router/routes/async"
import { generatorRoutes } from "@/router/helper"
interface UserState {
	token: string
	userInfo: Partial<UserInfo>
	menus: Partial<AccountManagement.Menu[]>
}

const ACCESS_TOKEN_KEY = "access_token"

const DURATION: number = 60 * 60 * 60

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		// token: Storage.get(ACCESS_TOKEN_KEY, true),
		token: "",
		userInfo: {},
		menus: []
	}),
	getters: {
		tokens(): string | null {
			return this.token || null
		},
		userId(): string | number {
			return this.userInfo?.id as number
		},
		name(): string {
			return this.userInfo?.username as string
		},
		avatar(): string {
			return this.userInfo.avatar as string
		},
		roles(): string {
			return this.userInfo.roles?.name || ""
		},
		menus() {
			// 这里先直接返回路由组, 后面修改菜单生成方式
			return asyncRoutes
			// const menus = this.role?.menus as OriginRoute[]
			// return generatorRoutes(menus)
		}
	},
	actions: {
		/** 清空token及用户信息 */
		resetToken(): void {
			this.token = ""
			this.userInfo = {}
			this.menus = []
			Storage.clear()
		},
		/** 登录成功保存token */
		setToken(token: string, expires_at: number): void {
			this.token = token || ""
			Storage.set(ACCESS_TOKEN_KEY, this.token, expires_at)
		},

		/** 登录 */
		async login(params: LoginParams) {
			try {
				const { token, expires_at } = await (await login(params)).data
				this.setToken(token, expires_at)
				return this.getInfo()
			} catch (error) {
				return Promise.reject(error)
			}
		},

		/** 登录成功之后, 获取用户信息以及生成权限路由 */
		async getInfo() {
			try {
				const userInfo = (await getInfo()).data
				this.userInfo = { ...userInfo }
				this.menus = userInfo.menus
				return Promise.resolve(userInfo)
			} catch (error) {
				return Promise.reject(error)
			}
		},
		update() {
			this.userInfo = {}
			this.menus = []
			// this.getInfo()
		},
		/** 登出 */
		async logout() {
			await logout()
			this.resetToken()
			// resetRouter();
		}
	}
})
export default useUserStore
