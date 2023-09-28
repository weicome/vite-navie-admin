<template>
	<n-global-style />
	<n-el class="vaw-layout-container">
		<n-space vertical>
			<n-layout has-sider>
				<!--左侧导航-->
				<n-layout-sider
					class="sider"
					bordered
					show-trigger
					collapse-mode="width"
					:collapsed-width="64"
					:width="240"
					:native-scrollbar="false"
				>
					<!--logo放这个-->
					<Logo />
					<Menu />
				</n-layout-sider>

				<!--右侧内容-->
				<n-layout class="right">
					<n-layout-header bordered class="header">
						<Header />
					</n-layout-header>

					<n-layout-content class="main">
						<!--标签组件-->
						<Main />
					</n-layout-content>
				</n-layout>
			</n-layout>
		</n-space>
	</n-el>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.vaw-layout-container {
	height: 100%;
	max-width: 100%;
	overflow-x: hidden;

	.sider {
		height: 100%;
	}

	.right {
		height: 100%;
		width: 100%;
		.header {
			height: 80px;
		}
		.main {
			flex-grow: 1;
		}
	}
}
</style>
