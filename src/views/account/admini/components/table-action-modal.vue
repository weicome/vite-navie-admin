<template>
	<n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
		<n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
			<n-grid :cols="24" :x-gap="18">
				<n-form-item-grid-item :span="12" label="用户名" path="userName">
					<n-input v-model:value="formModel.username" />
				</n-form-item-grid-item>
			</n-grid>

			<n-space class="w-full pt-16px" :size="24" justify="end">
				<n-button class="w-72px" @click="closeModal">取消</n-button>
				<n-button class="w-72px" type="primary" @click="handleSubmit">确定</n-button>
			</n-space>
		</n-form>
	</n-modal>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue"
import type { AccountManagement } from "@/typings/business/admin"
import type { FormItemRule } from "naive-ui"

export interface Props<T = null> {
	/**弹窗可见性 */
	visible: boolean
	/**
	 * 弹窗类型
	 * add: 新增
	 * edit: 编辑
	 */
	type?: "add" | "edit"
	data?: T
}
export type ModalType = NonNullable<Props["type"]>

const porps = withDefaults(defineProps<Props>(), {
	type: "add",
	editData: null
})
interface Emits {
	(e: "update:visible", visible: boolean): void
}
const emit = defineEmits<Emits>()
const modalVisible = computed({
	get() {
		return porps.visible
	},
	set(visible) {
		emit("update:visible", visible)
	}
})
const title = computed(() => {
	const titles: Record<ModalType, string> = {
		add: "添加用户",
		edit: "编辑用户"
	}
	return titles[porps.type]
})
const closeModal = () => {
	modalVisible.value = false
}

const formModel = reactive<AccountManagement.OriginAdmin>({
	username: "",
	nickname: "",
	password: "",
	avatar: "",
	status: 1
} as AccountManagement.OriginAdmin)

const rules: Record<keyof AccountManagement.OriginAdmin, FormItemRule | FormItemRule[]> = {
	id: { required: false, message: "" },
	username: { required: true, message: "请输入用户名" },
	password: { required: true, message: "请输入密码" },
	nickname: { required: true, message: "请输入昵称" },
	avatar: { required: false, message: "请输入头像" },
	status: { required: true, message: "请选择状态" },
	create_at: { required: false, message: "" },
	update_at: { required: false, message: "" },
	delete_at: { required: false, message: "" }
}

const handleSubmit = () => {
	// closeModal()
}
</script>

<style scoped></style>
