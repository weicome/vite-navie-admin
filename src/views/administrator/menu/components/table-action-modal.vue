<template>
	<n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
		<n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
			<n-grid :cols="24" :x-gap="18">
				<n-form-item-grid-item :span="20" label="类型" path="type">
					<n-input v-model:value="formModel.type" />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="12" label="标题" path="title">
					<n-input v-model:value="formModel.title" />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="12" label="路径" path="path">
					<n-input v-model:value="formModel.path" />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="12" label="名称" path="name">
					<n-input v-model:value="formModel.name" />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="12" label="地址" path="url">
					<n-input v-model:value="formModel.url" />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="12" label="图标" path="icon">
					<n-input v-model:value="formModel.icon" />
				</n-form-item-grid-item>
				<n-form-item-grid-item :span="12" label="状态" path="userName">
					<n-select v-model:value="formModel.status" :options="StatusOptions" />
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
import { computed, reactive, watch } from "vue"

import type { FormItemRule } from "naive-ui"
import { StatusOptions } from "@/constants"

export interface Props<T = null> {
	/**弹窗可见性 */
	visible: boolean
	/**
	 * 弹窗类型
	 * add: 新增
	 * edit: 编辑
	 */
	type: "add" | "edit"
	data?: T
}
export type ModalType = NonNullable<Props["type"]>

const props = withDefaults(defineProps<Props<AccountManagement.Menu | null>>(), {
	type: "add",
	data: null
})
interface Emits {
	(e: "update:visible", visible: boolean): void
}
const emit = defineEmits<Emits>()
const modalVisible = computed({
	get() {
		return props.visible
	},
	set(visible) {
		emit("update:visible", visible)
	}
})
const title = computed(() => {
	const titles: Record<ModalType, string> = {
		add: "添加菜单",
		edit: "编辑菜单"
	}
	return titles[props.type]
})
const closeModal = () => {
	modalVisible.value = false
}

const formModel = reactive<AccountManagement.Menu>(createDefaultFormModel())

const rules: Record<keyof AccountManagement.Menu, FormItemRule | FormItemRule[]> = {
	id: { required: false, message: "" },
	pid: { required: true, message: "请输入父级菜单" },
	path: { required: true, message: "请输入路径" },
	name: { required: true, message: "请输入名称" },
	url: { required: false, message: "请输入地址" },
	title: { required: true, message: "请输入标题" },
	icon: { required: false, message: "请输入图标" },
	type: { required: true, message: "请选择类型" },
	status: { required: true, message: "请选择状态" },
	sort: {},
	children: { required: false, message: "" }
}

const handleSubmit = () => {
	// closeModal()
}
function createDefaultFormModel(): AccountManagement.Menu {
	return {
		id: "",
		pid: "",
		path: "",
		name: "",
		url: "",
		title: "",
		icon: "",
		type: "0",
		sort: 0,
		status: "1"
	}
}

/** 处理新增和编辑时的表单数据 */
function handleUpdateFormModel(model: Partial<AccountManagement.Menu>) {
	Object.assign(formModel, model)
}
function handleUpdateFormModelByModalType() {
	const handles: Record<ModalType, () => void> = {
		add: () => {
			const defaultFormModel = createDefaultFormModel()
			handleUpdateFormModel(defaultFormModel)
		},
		edit: () => {
			if (props.data) {
				handleUpdateFormModel(props.data)
			}
		}
	}
	return handles[props.type]()
}
watch(
	() => props.visible,
	(newValue) => {
		if (newValue) {
			handleUpdateFormModelByModalType()
		}
	}
)
</script>

<style scoped></style>
