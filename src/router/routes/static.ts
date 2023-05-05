import { isArray } from "@/utils/is";
import { resolve } from "path";
import { isExternal } from "util/types";
import { RouteRecordRaw } from "vue-router";
// 包含方法文件
const LAYOUT = () => import('@/components/Layout/Layout.vue')
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
}

const modules = import.meta.glob('../modules/*.ts')
const asyncRoutes :RouteRecordRaw[] = []
Object.keys(modules).forEach( (key: string)=>{
    asyncRoutes.push(...modules[key].default as RouteRecordRaw[])
})
export default asyncRoutes

// 生成路由表
export const generatorRoutes = (res: Array<OriginRoute>): RouteRecordRaw[] => {
    const tempRoutes: Array<RouteRecordRaw> = []
    res.forEach((it) => {
        const isMenuFlag = it.children && it.children.length > 0
        const localRoute = isMenuFlag ? filterRoutesFromLocalRoutes(it, asyncRoutes) : null
        if(localRoute) {
            tempRoutes.push(localRoute as RouteRecordRaw)
        }else{
            const route: RouteRecordRaw = {
                path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
                name: it.routeName || getNameByUrl(it.menuUrl),
                component: isMenuFlag ? LAYOUT : getComponent(it),
                meta: {
                    hidden: !!it.hidden,
                    title: it.menuName,
                    affix: !!it.affix,
                    cacheable: !!it.cacheable,
                    icon: it.icon || 'menu',
                    iconPrefix: it.iconPrefix || 'iconfont',
                    badge: it.badge,
                    isRootPath: !!it.isRootPath,
                    isSingle: !!it.isSingle
                },
                children: []
            }
            if (it.children){
                route.children = generatorRoutes(it.children)
            }
            tempRoutes.push(route)
        }
    })

    return tempRoutes
}

// 从本地路由过滤出来
export const filterRoutesFromLocalRoutes = (route: OriginRoute, localRoutes: Array<RouteRecordRaw>, path :string='/'): RouteRecordRaw | null => {
    const filterRoute = localRoutes.find((it) => {
        return resolve(path, it.path) === route.menuUrl
    })
    if( filterRoute) {
        filterRoute.meta = {
            title: route.menuName,
            affix: !!route.affix,
            cacheable: !!route.affix,
            icon: route.icon || 'menu',
            iconPrefix: route.iconPrefix || 'iconfont',
            badge: route.badge,
            hidden: !!route.hidden,
            isRootPath: !!route.isRootPath,
            isSingle: !!route.isSingle,
            ...filterRoute.meta
        }
        const parentPath = resolve(path, filterRoute.path)
        if(isArray(route.children) && route.children.length > 0 && filterRoute.children!.length > 0){
            const tempChildren: RouteRecordRaw[] = []
            route.children.forEach((it) => {
                const childFilterRoute = filterRoutesFromLocalRoutes (it, filterRoute.children!, parentPath)
                childFilterRoute && tempChildren.push(childFilterRoute)
            })
            filterRoute.children = tempChildren
        }
    }
    return filterRoute as RouteRecordRaw
}


export function loadComponents() {
    return import.meta.glob('/src/views/**/*.vue')
  }
  
  export const asynComponents = loadComponents()
  
  export function getComponent(it: OriginRoute) {
    // return defineAsyncComponent({
    //   loader: asynComponents[getFilePath(it)],
    //   loadingComponent: LoadingComponent,
    // })
    return asynComponents[getFilePath(it)]
  }
  
  export function getFilePath(it: OriginRoute) {
    if (!it.localFilePath) {
      it.localFilePath = it.menuUrl
    }
    it.localFilePath = resolve('/', it.localFilePath)
    return '/src/views' + it.localFilePath + '.vue'
  }