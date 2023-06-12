import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from "vite-plugin-vue-setup-extend"

// rollup 打包分析插件
import { visualizer } from "rollup-plugin-visualizer"
import { configHtmlPlugin } from "./html"
import { unocss } from "./unocss"
/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import { configMockPlugin } from "./mock"

export function createVitePlugins(viteEnv, isBuild) {
	const plugins = [
		vue(),
		vueJsx(),
		VueSetupExtend(),
		configHtmlPlugin(viteEnv, isBuild),
		unocss(),
		Components({
			resolvers: [NaiveUiResolver()]
		})
	]
	if (isBuild) {
		plugins.push(
			visualizer({
				open: true,
				gzipSize: true,
				brotliSize: true
			})
		)
	}
	console.log("env", viteEnv?.VITE_APP_USE_MOCK)
	if (viteEnv?.VITE_APP_USE_MOCK) {
		plugins.push(configMockPlugin(isBuild))
	}
	return plugins
}
