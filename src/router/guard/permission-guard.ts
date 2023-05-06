import { usePermissionStore } from "@/store/modules/permission"
import { useUserStore } from "@/store/modules/user"
import type { RouteRecordRaw, Router } from "vue-router"
import { NOT_FOUND_ROUTE } from "../routes/static"
import { isNull } from '@/utils/is/index';

const WHITE_LIST = ['/login']

// 第一版
export const createPermissionGuard = (router :Router) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    router.beforeEach(async (to, from, next) =>{
        if(!isNull(userStore.token)) {
            if(to.path === '/login'){
                next({path: '/'})
            }else{
                if(userStore.userId){
                    // 已经获取到用户信息
                    next()
                } else{
                    await userStore.getInfo().catch((error) => {
                        window.$message.error(error.message || '获取用户信息失败！')
                        return 
                    })
                    const accessRoutes = permissionStore.generateRoutes(userStore.role)
                    accessRoutes.array.forEach((route: RouteRecordRaw) => {
                        !router.hasRoute(route.name as string) && router.addRoute(route)
                    });
                    router.addRoute(NOT_FOUND_ROUTE)
                    next({...to, replace: true})
                }
            }
        }else{
            if (WHITE_LIST.includes(to.path)){
                next()
            }else{
                next({path : '/login'})
            }
        }
    })
}

const usePremissionGuard = (router: Router)=> {
    router.beforeEach( async (to,form, next)=>{
        if(WHITE_LIST.includes(to.path)){
            next()
        }
        const userStore = useUserStore()
        if(isNull(userStore.token)){
            next({path: '/login', query: {redirect: to.fullPath}})
        }

    }) 
}