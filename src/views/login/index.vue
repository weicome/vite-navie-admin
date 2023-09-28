<template>
	<div flex h-full>
		<div m-auto bg-gray-100 w-350 flex flex-col items-center border border-gray-300 p-30 rounded-10>
			<h5 text-24 font-normal color="#6a6a6a">
				{{ title }}
			</h5>
			<div mt-30 w-full>
				<n-input
					v-model:value="loginInfo.account"
					autofocus
					class="text-16 items-center h-50 pl-10"
					placeholder="admin"
					:maxlength="20"
				>
				</n-input>
			</div>
			<div mt-30 w-full>
				<n-input
					v-model:value="loginInfo.password"
					class="text-16 items-center h-50 pl-10"
					type="password"
					show-password-on="mousedown"
					placeholder="123456"
					:maxlength="20"
					@keydown.enter="handleLogin"
				/>
			</div>

			<div mt-20 w-full>
				<n-checkbox
					:checked="isRemember"
					label="记住我"
					:on-update:checked="(val: boolean) => (isRemember = val)"
				/>
			</div>

			<div mt-20 w-full>
				<n-button w-full h-50 rounded-5 text-16 type="primary" @click="handleLogin">登录</n-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "@/store/modules"
import { useRouter } from "vue-router"
const title = import.meta.env.VITE_APP_TITLE
const loginInfo = ref({
	account: "",
	password: "",
	remember: false
})
const isRemember = ref(false)
const router = useRouter()
function handleLogin() {
	loginInfo.value.remember = isRemember.value
	try {
		useUserStore()
			.login(loginInfo.value)
			.then(() => {
				router.replace({ path: "/" })
			})
	} catch (error: any) {
		// window.$message.error(error?.message)
	}
}
</script>

<style scoped></style>
