<template>
	<AppProvider>
		<router-view v-slot="{ Component }">
			<component :is="Component"></component>
		</router-view>
	</AppProvider>
</template>
<script setup>
import { onMounted } from "vue"
import AppProvider from "@/components/AppProvider/index.vue"

onMounted(() => {
	$loadingBar.start()
	setTimeout(() => {
		$loadingBar.finish()
		$message.success("加载完成，Perfect~")
	}, 500)
})
</script>
<style lang="scss">
#app {
	height: 100%;
	.n-config-provider {
		height: inherit;
	}
}
</style>
