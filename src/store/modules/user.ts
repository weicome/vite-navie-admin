import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { Storage } from '@/utils/cache'
import { getInfo,getPerm,login,logout } from '@/api';

interface UserState {
    token: string,
    perms: string[],
    menus: MenuOption[],
    userInfo: Partial<UserInfo>,
}
const ACCESS_TOKEN_KEY :string = 'access_token' 

const DURATION :number =  60* 60 * 60

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: Storage.get(ACCESS_TOKEN_KEY, null),
        perms: [],
        menus: [],
        userInfo: {},
    }),
    getters: {
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
            return this.userInfo?.role || ''
        }
    },
    actions: {
         /** 清空token及用户信息 */
        resetToken(): void{
            this.token = ''
            this.userInfo = {}
            this.perms = []
            this.menus = []
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
                const menus = (await getPerm()).data
                this.menus = {...menus}
                return Promise.resolve(userInfo)
            }catch ( error ){
                return Promise.reject(error)
            }
        },

        /** 登出 */
        async logout() {
            await logout();
            this.resetToken();
            // resetRouter();
        },
    }
})