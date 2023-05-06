import { RouteRecordRaw } from "vue-router"
import { defineStore } from "pinia";
import router from '@/router'
import { getPerm } from "@/api";
import {constantRoutes} from "@/router/routes/constants";

export const usePermissionStore = defineStore('permission', {
    state: () => ({
        accessRoutes: [] as  RouteRecordRaw[],
    }),
    getters: {
        getPermissionSideBar(): RouteRecordRaw[]{
            return this.accessRoutes.filter((it)=>{
                return  it.meta && !it.meta.hidden
            })
        },
        getPerMissionSplitTabs(): RouteRecordRaw[] {
            return this.accessRoutes.filter( (it) => {
                return it.meta && !it.meta.hidden && it.children && it.children.length > 0
            })
        }
    },
    actions: {
        async getRoutes( data: {userId: number; roleId: number}) {
            const res = await getPerm()
            return generatorRoutes(res.data)
        },
        async initPermissionRoute() {
            const accessRoutes = await this.getRoutes({userId:1,roleId:1,})
            const mapRoutes = mapTwoLevelRouter(accessRoutes)
            mapRoutes?.forEach((it: any) =>{
                router.addRoute(it)
            })
            router.addRoute({
                path: '/',
                redirect: findRootPathRoute(accessRoutes),
                meta: {
                    hidden: true,
                }
            })
            router.addRoute({
                path: '/:pathMatch(.*)*',
                redirect: '/404',
                meta: {
                    hidden:true
                }
            })
            this.accessRoutes = [...constantRoutes, ...accessRoutes]
        },
        isEmptyPermissionRoute(): boolean {
            return !this.accessRoutes || this.accessRoutes.length === 0
        },
        reset() : void{
            this.$reset()
        } 
    }
})

export default usePermissionStore