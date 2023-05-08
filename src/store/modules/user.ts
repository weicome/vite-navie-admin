import { defineStore } from 'pinia'
import { Storage } from '@/utils/cache'
import { getInfo,getRole,login,logout } from '@/api';
import { asyncRoutes } from '@/router/routes/async'
import {generatorRoutes} from '@/router/helper'
interface UserState {
    token: string,
    userInfo: Partial<UserInfo>,
    role: Partial<UserRole>,
}

const ACCESS_TOKEN_KEY :string = 'access_token' 

const DURATION :number =  60 * 60 * 60

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: Storage.get(ACCESS_TOKEN_KEY, true),
        userInfo: {},
        role: {},
    }),
    getters: {
        token(): string|null{
            return this.token || null
        },
        userId():string|number {
            return this.userInfo?.id as number;
        },
        name(): string{
            return this.userInfo?.name as string;
        },
        avatar(): string{
            return this.avatar as string;
        },
        role(): string {
            return this.role?.name || ''
        },
        menus() { // 这里先直接返回路由组, 后面修改菜单生成方式
            return asyncRoutes 
            // const menus = this.role?.menus as OriginRoute[]
            // return generatorRoutes(menus)
        }
    },
    actions: {
         /** 清空token及用户信息 */
        resetToken(): void{
            this.token = ''
            this.userInfo = {}
            this.role = ''
            Storage.clear()
        },
         /** 登录成功保存token */
        setToken(token: string): void{
          this.token = token || ''
          Storage.set(ACCESS_TOKEN_KEY, this.token, DURATION)  
        },

        /** 登录 */
        async login(params :LoginParams) {
            try{
                const {token} = await (await login(params)).data
                this.setToken(token)
                return this.getInfo()
            }catch (error){
                return Promise.reject(error)
            }
        },

        /** 登录成功之后, 获取用户信息以及生成权限路由 */
        async getInfo(){
            try{
                const userInfo = (await getInfo()).data
                this.userInfo = {...userInfo}
                const role = (await getRole()).data as UserRole
                // this.role = {...role}
                this.userInfo.id = 1
                this.role.id = role.id
                this.role.name = role.name
                this.role.menus = role.menus
                return Promise.resolve(userInfo)
            }catch ( error ){
                return Promise.reject(error)
            }
        },
        update(){
            this.userInfo = {}
            this.role = ''
            this.getInfo()
        },
        /** 登出 */
        async logout() {
            await logout();
            this.resetToken();
            // resetRouter();
        },
    }
})
export default useUserStore