<template>
<n-config-provider :theme="darkTheme" :locale="zhCN" style="height:100%">
    <n-global-style/>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <n-el class="vaw-layout-container">
                
            </n-el>
        </n-dialog-provider>
    </n-loading-bar-provider>
</n-config-provider>
</template>

<script name="Layout" setup lang="ts">
import {darkTheme, zhCN} from 'naive-ui'
</script>
<style scoped>
.vaw-layout-container{
    height: 100%;
    max-width: 100%;
    overflow-x: hidden;
}
</style>