<template>
<n-menu :options="menus"/>
</template>

<script setup lang="ts">
import { useUserStore} from '@/store/modules'
import { h } from 'vue';
import { RouteRecordRaw, RouterLink } from 'vue-router';
import icons from '@vicons/ionicons5'

const menuOptions = useUserStore().menus

// 组装菜单
const generatorMenu = (routerMap: Array<RouteRecordRaw>): MenuOption[] => {
    return routerMap.map((item):MenuOption => {
        const currentMenu: MenuOption = {
            label: () => h(RouterLink, {to:{name: item.name}},{default: ()=> item?.meta?.title}),
            key: item!.name as string,
            // icon: ()=> h(icons[item?.meta?.icon | 'LogOutOutline'])
        }
        if(item.children && item.children.length > 0){
            currentMenu.children = generatorMenu(item.children)
        }
        return currentMenu 
    }) 
}
const menus = generatorMenu(menuOptions)
</script>

<style scoped>

</style>