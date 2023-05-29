<template class="main">
<router-view v-slot="{Component, route}">
    <transition :name="appConfig.pageAnim + '-transform'" mode="out-in" appear>
        <keep-alive >
            <component :is="Component" :key="route.fullPath"/>
        </keep-alive>
    </transition>
</router-view>
</template>

<script setup lang="ts">
import useAppConfigStore from '@/store/modules/app-config'

const appConfig = useAppConfigStore()

</script>

<style scoped>
.main{
    padding: 10px 10px;
}
</style>